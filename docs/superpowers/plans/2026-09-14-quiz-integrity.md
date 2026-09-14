# Quiz Integrity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the answer-length tell from every quiz in the course, split the Week 12 quiz so each week tests only what that week taught, and leave behind a skill, an adversarial reviewer, and a linter so the defect cannot silently return.

**Architecture:** Three artifacts with strictly separated jobs. `course/verify-quizzes.py` measures deterministically (length ratios, letter spread, header point sums). The `quiz-integrity` skill carries the authoring standards and loads when anyone touches a quiz. The `quiz-adversary` subagent reviews in an isolated context that never saw the author's reasoning. The skill orchestrates the other two; neither collapses into it.

**Tech Stack:** Python 3 stdlib only (matching `course/verify-syllabus.py`), Markdown skill/agent definitions, `canvas-extras` MCP for Canvas writes.

**Spec:** `docs/superpowers/specs/2026-09-14-quiz-integrity-design.md`

## Global Constraints

- **Source first, always.** Fix `course/assessments/*.md` then push to Canvas. Never edit quiz content in Canvas alone (`COURSE_MEMORY.md` §7).
- **Both sections, every time.** Oakland `270068` and San Jose `270077`. `canvas-extras` takes `section: "oak" | "sj"`.
- **Never trim the correct answer.** Lengthen distractors. Trimming buys parity by giving up precision.
- **Never touch Week 2.** Published, due Sep 15, six submissions in. Already at 0/14.
- **Never modify anything under `slides/`.** Another session (`audit-slide-fragments`) owns those files. Read only.
- **Ground truth order:** decks → `quiz-integrity` skill → `slides_ground_truth_review.md` → `schedule.md`/`readings.md` → `/verify-references` for statistics.
- **Deck numbering is 1:1 with weeks.** `slides/NN_*` = week NN. `slides_ground_truth_review.md` uses the old numbering; its deck 13 = `slides/12_`, deck 14 = `slides/13_`, deck 15 = `slides/14_`.
- **Thresholds:** correct-is-longest ≤ 40%, mean length ratio ≤ 1.15, header points must equal the sum of question points.
- **Python:** stdlib only, no new dependencies, `#!/usr/bin/env python3`, exit 0 pass / 1 fail.

---

## File Structure

| File | Responsibility |
| --- | --- |
| `course/verify-quizzes.py` | Parse quizzes + answer keys, measure tells, check header point sums, exit non-zero past threshold |
| `course/test_verify_quizzes.py` | Unit tests over inline fixtures |
| `.claude/skills/quiz-integrity/SKILL.md` | Authoring standards + workflow, loads when a quiz is touched |
| `.claude/agents/quiz-adversary.md` | Read-only adversarial reviewer subagent |
| `course/assessments/week*-quiz.md` | Quiz sources (modified per audit pass) |
| `course/assessments/week*-answer-key.md` | Answer keys, gitignored (point columns updated) |
| `course/assessments/week13-ai-security-quiz.md` | New W13 quiz (Task 8) |
| `course/COURSE_MEMORY.md` | §7 demoted to incident record + pointer to the skill |

---

## Task 1: Quiz parser

**Files:**
- Create: `course/verify-quizzes.py`
- Test: `course/test_verify_quizzes.py`

**Interfaces:**
- Produces: `parse_quiz(path: Path) -> list[Question]` where `Question` is a
  `NamedTuple(qid: str, points: int, options: dict[str, str])`; `load_key(path: Path) -> dict[str, str]`
  mapping `"Q1" -> "B"`.

- [ ] **Step 1: Write the failing test**

```python
#!/usr/bin/env python3
"""Tests for verify-quizzes.py. Run: python3 course/test_verify_quizzes.py"""
import sys, tempfile, unittest, importlib.util
from pathlib import Path

HERE = Path(__file__).parent
spec = importlib.util.spec_from_file_location("vq", HERE / "verify-quizzes.py")
vq = importlib.util.module_from_spec(spec)
spec.loader.exec_module(vq)

QUIZ = """# Week 99: Test Quiz

| **Points** | 3 points |

## Questions

#### Q1: First Thing (1 point)
**Type:** Multiple Choice

What is the thing?

- A) Short one
- B) The correct and considerably longer option here
- C) Also short
- D) Brief

---

#### Q2: Second Thing (2 points)
**Type:** Multiple Choice

Which is it?

- A) An option of moderate length here
- B) Another option of moderate length
- C) A third option of moderate size
- D) A fourth option of moderate len
"""

KEY = """# Week 99 ANSWER KEY

| Question | Answer | Points | Topic |
|----------|--------|--------|-------|
| Q1 | B | 1 | First Thing |
| Q2 | A | 2 | Second Thing |
"""


def write(tmp, name, body):
    p = Path(tmp) / name
    p.write_text(body)
    return p


class TestParse(unittest.TestCase):
    def test_parses_questions_options_and_points(self):
        with tempfile.TemporaryDirectory() as tmp:
            qs = vq.parse_quiz(write(tmp, "q.md", QUIZ))
        self.assertEqual([q.qid for q in qs], ["Q1", "Q2"])
        self.assertEqual([q.points for q in qs], [1, 2])
        self.assertEqual(qs[0].options["A"], "Short one")
        self.assertEqual(set(qs[1].options), {"A", "B", "C", "D"})

    def test_loads_answer_key(self):
        with tempfile.TemporaryDirectory() as tmp:
            key = vq.load_key(write(tmp, "k.md", KEY))
        self.assertEqual(key, {"Q1": "B", "Q2": "A"})


if __name__ == "__main__":
    unittest.main(verbosity=2)
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python3 course/test_verify_quizzes.py`
Expected: FAIL — `FileNotFoundError` / `AttributeError: module 'vq' has no attribute 'parse_quiz'`

- [ ] **Step 3: Write minimal implementation**

```python
#!/usr/bin/env python3
"""Measure quiz answer-design defects across course/assessments/.

Catches the answer-length tell fixed in Week 2 (a85d8dc) and the header/points
mismatch found in Weeks 9 and 10: a correct answer that is reliably the longest
option lets a student score without knowing the material.

Usage: python3 course/verify-quizzes.py [week ...]
Exit:  0 all checks pass, 1 any quiz exceeds threshold.
"""
import re
import sys
from pathlib import Path
from typing import NamedTuple

HERE = Path(__file__).parent
ASSESSMENTS = HERE / "assessments"

MAX_LONGEST_RATE = 0.40
MAX_LENGTH_RATIO = 1.15


class Question(NamedTuple):
    qid: str
    points: int
    options: dict


def parse_quiz(path: Path) -> list:
    text = path.read_text()
    parts = re.split(r"^#### (Q\d+):[^\n(]*\((\d+) points?\)\s*$", text, flags=re.M)
    out = []
    for i in range(1, len(parts), 3):
        qid, pts, body = parts[i], int(parts[i + 1]), parts[i + 2]
        options = dict(re.findall(r"^-\s*([A-D])\)\s*(.+?)\s*$", body, flags=re.M))
        if len(options) >= 3:
            out.append(Question(qid, pts, options))
    return out


def load_key(path: Path) -> dict:
    if not path.exists():
        return {}
    return {
        m.group(1): m.group(2)
        for line in path.read_text().splitlines()
        if (m := re.match(r"\|\s*(Q\d+)\s*\|\s*([A-D])\s*\|", line.strip()))
    }
```

- [ ] **Step 4: Run test to verify it passes**

Run: `python3 course/test_verify_quizzes.py`
Expected: PASS, 2 tests

- [ ] **Step 5: Commit**

```bash
git add course/verify-quizzes.py course/test_verify_quizzes.py
git commit -m "Add quiz source and answer-key parsers"
```

---

## Task 2: Tell measurement

**Files:**
- Modify: `course/verify-quizzes.py`
- Test: `course/test_verify_quizzes.py`

**Interfaces:**
- Consumes: `parse_quiz`, `load_key`, `Question` from Task 1.
- Produces: `measure(questions, key) -> Metrics`, a
  `NamedTuple(n: int, longest_hits: int, longest_rate: float, mean_ratio: float, letter_spread: dict)`.

- [ ] **Step 1: Write the failing test**

Append to `course/test_verify_quizzes.py`:

```python
class TestMeasure(unittest.TestCase):
    def test_flags_correct_answer_that_is_longest(self):
        with tempfile.TemporaryDirectory() as tmp:
            qs = vq.parse_quiz(write(tmp, "q.md", QUIZ))
            key = vq.load_key(write(tmp, "k.md", KEY))
        m = vq.measure(qs, key)
        self.assertEqual(m.n, 2)
        # Q1's correct answer (B) is the longest; Q2's (A) is not.
        self.assertEqual(m.longest_hits, 1)
        self.assertAlmostEqual(m.longest_rate, 0.5)
        self.assertGreater(m.mean_ratio, 1.0)

    def test_letter_spread_counts_correct_letters(self):
        with tempfile.TemporaryDirectory() as tmp:
            qs = vq.parse_quiz(write(tmp, "q.md", QUIZ))
            key = vq.load_key(write(tmp, "k.md", KEY))
        m = vq.measure(qs, key)
        self.assertEqual(m.letter_spread, {"A": 1, "B": 1, "C": 0, "D": 0})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python3 course/test_verify_quizzes.py`
Expected: FAIL — `AttributeError: module 'vq' has no attribute 'measure'`

- [ ] **Step 3: Write minimal implementation**

Append to `course/verify-quizzes.py`:

```python
class Metrics(NamedTuple):
    n: int
    longest_hits: int
    longest_rate: float
    mean_ratio: float
    letter_spread: dict


def measure(questions: list, key: dict) -> Metrics:
    hits, ratios, letters = 0, [], []
    for q in questions:
        correct = key.get(q.qid)
        if not correct or correct not in q.options:
            continue
        letters.append(correct)
        clen = len(q.options[correct])
        others = [len(v) for k, v in q.options.items() if k != correct]
        if clen > max(others):
            hits += 1
        ratios.append(clen / (sum(others) / len(others)))
    n = len(ratios)
    return Metrics(
        n=n,
        longest_hits=hits,
        longest_rate=(hits / n) if n else 0.0,
        mean_ratio=(sum(ratios) / n) if n else 0.0,
        letter_spread={L: letters.count(L) for L in "ABCD"},
    )
```

- [ ] **Step 4: Run test to verify it passes**

Run: `python3 course/test_verify_quizzes.py`
Expected: PASS, 4 tests

- [ ] **Step 5: Commit**

```bash
git add course/verify-quizzes.py course/test_verify_quizzes.py
git commit -m "Measure the answer-length tell and letter spread"
```

---

## Task 3: Header point-sum check

This is the check that would have caught Weeks 9 and 10 both claiming 22 points while their questions summed to 21.

**Files:**
- Modify: `course/verify-quizzes.py`
- Test: `course/test_verify_quizzes.py`

**Interfaces:**
- Consumes: `parse_quiz` from Task 1.
- Produces: `check_header_points(path, questions) -> tuple[int | None, int]` returning `(claimed, actual)`; `claimed` is `None` when the header declares no total.

- [ ] **Step 1: Write the failing test**

Append to `course/test_verify_quizzes.py`:

```python
MISMATCHED = QUIZ.replace("| **Points** | 3 points |", "| **Points** | 22 points |")


class TestHeaderPoints(unittest.TestCase):
    def test_matching_header_returns_equal_values(self):
        with tempfile.TemporaryDirectory() as tmp:
            p = write(tmp, "q.md", QUIZ)
            claimed, actual = vq.check_header_points(p, vq.parse_quiz(p))
        self.assertEqual((claimed, actual), (3, 3))

    def test_detects_the_week9_week10_mismatch_shape(self):
        with tempfile.TemporaryDirectory() as tmp:
            p = write(tmp, "q.md", MISMATCHED)
            claimed, actual = vq.check_header_points(p, vq.parse_quiz(p))
        self.assertEqual(claimed, 22)
        self.assertEqual(actual, 3)
        self.assertNotEqual(claimed, actual)
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python3 course/test_verify_quizzes.py`
Expected: FAIL — `AttributeError: module 'vq' has no attribute 'check_header_points'`

- [ ] **Step 3: Write minimal implementation**

Append to `course/verify-quizzes.py`:

```python
def check_header_points(path: Path, questions: list) -> tuple:
    m = re.search(r"\|\s*\*\*Points\*\*\s*\|\s*(\d+)\s*points?\s*\|", path.read_text())
    claimed = int(m.group(1)) if m else None
    return claimed, sum(q.points for q in questions)
```

- [ ] **Step 4: Run test to verify it passes**

Run: `python3 course/test_verify_quizzes.py`
Expected: PASS, 6 tests

- [ ] **Step 5: Commit**

```bash
git add course/verify-quizzes.py course/test_verify_quizzes.py
git commit -m "Check header point totals against the sum of question points"
```

---

## Task 4: CLI report and exit code

**Files:**
- Modify: `course/verify-quizzes.py`

**Interfaces:**
- Consumes: everything from Tasks 1-3.
- Produces: `main(argv) -> int`, and a `__main__` guard calling `sys.exit(main(sys.argv[1:]))`.

- [ ] **Step 1: Write the failing test**

Append to `course/test_verify_quizzes.py`:

```python
class TestMain(unittest.TestCase):
    def test_real_assessments_directory_is_scannable(self):
        # Week 2 was fixed in a85d8dc and must stay clean; it is the regression guard.
        quiz = vq.ASSESSMENTS / "week2-llm-fundamentals-quiz.md"
        key = vq.ASSESSMENTS / "week2-answer-key.md"
        if not quiz.exists() or not key.exists():
            self.skipTest("week2 source or gitignored answer key not present")
        m = vq.measure(vq.parse_quiz(quiz), vq.load_key(key))
        self.assertGreater(m.n, 0)
        self.assertLessEqual(m.longest_rate, vq.MAX_LONGEST_RATE)
        self.assertLessEqual(m.mean_ratio, vq.MAX_LENGTH_RATIO)
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python3 course/test_verify_quizzes.py`
Expected: FAIL — `AttributeError: module 'vq' has no attribute 'ASSESSMENTS'` is already defined, so this fails only if the parser regex does not match the real file. Fix the regex until it passes; do not relax the assertion.

- [ ] **Step 3: Write minimal implementation**

Append to `course/verify-quizzes.py`:

```python
def week_of(path: Path) -> str:
    return re.match(r"(week\d+)", path.name).group(1)


def main(argv: list) -> int:
    quizzes = sorted(ASSESSMENTS.glob("week*-quiz.md"))
    if argv:
        wanted = {a.lstrip("w").lstrip("eek").zfill(2) for a in argv}
        quizzes = [q for q in quizzes if week_of(q)[4:].zfill(2) in wanted]
    failed = False
    print(f"{'quiz':<8} {'n':>3} {'longest':>12} {'ratio':>8}  {'pts':>9}  spread")
    print("-" * 74)
    for quiz in quizzes:
        week = week_of(quiz)
        questions = parse_quiz(quiz)
        key = load_key(ASSESSMENTS / f"{week}-answer-key.md")
        if not key:
            print(f"{week:<8} answer key missing — skipped")
            continue
        m = measure(questions, key)
        claimed, actual = check_header_points(quiz, questions)
        pts_ok = claimed is None or claimed == actual
        bad = m.longest_rate > MAX_LONGEST_RATE or m.mean_ratio > MAX_LENGTH_RATIO or not pts_ok
        failed = failed or bad
        pts = f"{actual}" if pts_ok else f"{actual}!={claimed}"
        print(
            f"{week:<8} {m.n:>3} {m.longest_hits:>4}/{m.n:<3}({m.longest_rate*100:>3.0f}%)"
            f" {m.mean_ratio:>7.2f}x {pts:>9}  {m.letter_spread}"
            f"{'  <-- FAIL' if bad else ''}"
        )
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
```

- [ ] **Step 4: Run tests and the real scan**

Run: `python3 course/test_verify_quizzes.py`
Expected: PASS, 7 tests

Run: `python3 course/verify-quizzes.py; echo "exit=$?"`
Expected: the §1 table reproduced, `week2` passing, every other week marked `<-- FAIL`, `exit=1`

- [ ] **Step 5: Commit**

```bash
git add course/verify-quizzes.py course/test_verify_quizzes.py
git commit -m "Report per-quiz metrics and fail past threshold"
```

---

## Task 5: The `quiz-integrity` skill

**Files:**
- Create: `.claude/skills/quiz-integrity/SKILL.md`
- Modify: `course/COURSE_MEMORY.md` (§7 quiz standards block → incident record + pointer)

**Interfaces:**
- Consumes: `course/verify-quizzes.py` from Task 4.
- Produces: the `quiz-integrity` skill name, referenced by Task 6's agent and every audit task.

- [ ] **Step 1: Read the sibling skill for house style**

Run: `cat .claude/skills/verify-references/SKILL.md`
Note its frontmatter shape (`name`, `description`) and heading structure. Match it.

- [ ] **Step 2: Write the skill**

Frontmatter exactly:

```markdown
---
name: quiz-integrity
description: Use when creating, editing, or reviewing any quiz in course/assessments/ — enforces distractor length parity, answer-key ground truth, and source-first Canvas sync
---
```

Body must contain, each as its own section:
1. **Source first** — edit `course/assessments/` then push to both Canvas sections; never Canvas alone; cite the W9/W10 Q15 drift as the worked example of what goes wrong.
2. **The tell and its fix direction** — lengthen distractors, never trim the correct answer, and why (trimming trades a fairness defect for a correctness one).
3. **Ground truth hierarchy** — the five ranks from spec §3, both traps verbatim (deck renumbering table; the three non-errors: C.L.E.A.R. in W11, LLM-as-Judge and property/mutation testing in W10).
4. **Budgets** — 15 q / 22 pts standard; 10 q / 14 pts for W5 and W6.
5. **Workflow** — `python3 course/verify-quizzes.py <week>` → dispatch `quiz-adversary` → apply → re-run → push both sections.

- [ ] **Step 3: Demote COURSE_MEMORY §7**

Replace the instruction list under "Quiz authoring standards" with the incident record (the Week 2 measurements and the structural cause) plus one line: `**Operational reference:** the `quiz-integrity` skill. Instructions live there because they must load when a quiz is being written, not when this file is being read.`

- [ ] **Step 4: Verify the skill loads**

Run: `/quiz-integrity`
Expected: the skill body loads. If it does not appear in the skills list, check frontmatter YAML validity.

- [ ] **Step 5: Commit**

```bash
git add .claude/skills/quiz-integrity/SKILL.md course/COURSE_MEMORY.md
git commit -m "Add quiz-integrity skill and demote COURSE_MEMORY section 7"
```

---

## Task 6: The `quiz-adversary` subagent

**Files:**
- Create: `.claude/agents/quiz-adversary.md`

**Interfaces:**
- Consumes: the `quiz-integrity` skill from Task 5 for standards; `course/verify-quizzes.py` for measurements.
- Produces: the `quiz-adversary` agent type, dispatched by every audit task (7, 9, 10).

- [ ] **Step 1: Write the agent definition**

Frontmatter:

```markdown
---
name: quiz-adversary
description: Adversarially reviews one week's quiz for unfair or incorrect answers. Proposes distractor rewrites; never writes files.
tools: Read, Grep, Glob, Bash
---
```

`tools` deliberately excludes Edit and Write. The agent proposes; a human applies. Reviewing in the same context that authored the text is self-certification.

Body specifies: input is a week number; read `course/assessments/weekNN-*-quiz.md`, `weekNN-answer-key.md`, `slides/NN_*/index.md`; **never modify anything under `slides/`**; emit per-question findings at three severities:

- **blocker** — keyed answer wrong, or a distractor that is defensibly true
- **major** — length tell, two options both arguably correct
- **minor** — letter spread, absolute qualifiers ("always"/"never"/"only")

Every proposed distractor must: state a specific false mechanism, land within ±15% of the correct answer's length, and cite the slide heading it was checked against. Statistics route to `/verify-references` rather than being argued inline.

- [ ] **Step 2: Smoke-test against the already-fixed Week 2**

Run: dispatch `quiz-adversary` with "week 2".
Expected: **no** `major` length findings — Week 2 measures 0/14 at 1.01x. Findings that contradict the linter mean the agent's rubric is miscalibrated. Fix the agent, not the linter.

- [ ] **Step 3: Commit**

```bash
git add .claude/agents/quiz-adversary.md
git commit -m "Add read-only quiz-adversary reviewer subagent"
```

---

## Task 7: Week 3 audit — the exemplar

W3 is due **Sep 22**, the nearest unpublished deadline, and has the worst length ratio in the course at 2.26x.

**Files:**
- Modify: `course/assessments/week3-prompt-engineering-quiz.md`
- Read: `slides/03_Prompt_Engineering/index.md`

**Interfaces:**
- Consumes: Tasks 4, 5, 6.
- Produces: the reviewed-and-applied pattern that Tasks 9 and 10 repeat.

- [ ] **Step 1: Measure before**

Run: `python3 course/verify-quizzes.py 3`
Expected: `13/15 (87%) 2.26x <-- FAIL`

- [ ] **Step 2: Dispatch the adversary**

Dispatch `quiz-adversary` with "week 3". Collect findings by severity.

- [ ] **Step 3: STOP — instructor checkpoint**

Present the proposed rewrites to the user before applying. This is the gate the spec requires: re-measuring catches length regressions but cannot catch a distractor that is subtly true. Do not proceed without approval.

- [ ] **Step 4: Apply approved rewrites**

Edit `course/assessments/week3-prompt-engineering-quiz.md` only. Correct answers unchanged.

- [ ] **Step 5: Measure after**

Run: `python3 course/verify-quizzes.py 3`
Expected: `longest_rate` ≤ 40%, `mean_ratio` ≤ 1.15, no `<-- FAIL`

- [ ] **Step 6: Push to both Canvas sections**

Oakland quiz `816751`, San Jose `816758`. For each changed question use `canvas_update_quiz_question` with the full `answers` array.

Note: a question `PUT` returns `position: null` and ignores a `position` argument. Verify ordering with `canvas_list_quiz_questions` afterwards rather than trusting the response.

- [ ] **Step 7: Commit**

```bash
git add course/assessments/week3-prompt-engineering-quiz.md
git commit -m "Remove the answer-length tell from the Week 3 quiz"
```

---

## Task 8: W12/W13 split — BLOCKED

> **Blocked on `audit-slide-fragments`.** That session has uncommitted edits to
> `slides/12_Agent_Architectures/index.md` and `slides/13_AI_Security_Code_Quality/index.md`,
> which are rank-1 ground truth for the 15 new questions. A coordination request is
> outstanding. Do not start until it confirms those decks are stable, or confirms its
> edits are presentational only.

**Files:**
- Modify: `course/assessments/week12-agent-architectures-quiz.md` (drop 5, add 5)
- Create: `course/assessments/week13-ai-security-quiz.md`
- Modify: `course/assessments/week12-answer-key.md`; Create: `week13-answer-key.md`
- Read: `slides/12_Agent_Architectures/index.md`, `slides/13_AI_Security_Code_Quality/index.md`

**Interfaces:**
- Consumes: Tasks 4, 5, 6.

- [ ] **Step 1: Move the five security questions to W13**

Q5 (Veracode, 2), Q6 (Slopsquatting, 1), Q10 (8-Gate, 2), Q13 (Copyright, 2), Q15 (Professional Responsibility, 1) → 5 q / 8 pts. Q11 "Agent Safety" **stays in W12**: `slides/12_` teaches Safety Challenge / Sandboxing / Testing Agents Systematically.

- [ ] **Step 2: Author 5 new W12 questions** (3×2 + 2×1 = 8 pts)

Message passing between agents (2), subagents vs agent teams (2), choosing a pattern under constraints (2), `query()` mechanics (1), built-in tools vs `--allowedTools` (1). Write to standard from the start: mechanism-bearing distractors within ±15%, correct letter spread across A/B/C/D.

- [ ] **Step 3: Author 10 new W13 questions** (4×2 + 6×1 = 14 pts)

pass@k vs pass^k (2), three grader types (1), eval-suite design (2), why AI code is insecure (1), SAST vs DAST (2), security criteria & SBOM (1), defending against slopsquatting (2), structured review tiers (1), BrowseComp incident (1), infrastructure noise / AI-resistant evals (1).

- [ ] **Step 4: Verify both land on 15 q / 22 pts**

Run: `python3 course/verify-quizzes.py 12 13`
Expected: both `n=15`, `pts` column showing `22` with no mismatch, no `<-- FAIL`

- [ ] **Step 5: Adversary pass on both, then checkpoint**

Dispatch `quiz-adversary` for weeks 12 and 13. Present findings. New questions are the highest risk for accidentally-true distractors because nothing has reviewed them before.

- [ ] **Step 6: Canvas — amend W12, create W13**

W12: oak `816746`, sj `816756` — remove the 5 moved questions, add the 5 new.
W13: `canvas_create_quiz` in both sections, then `canvas_create_quiz_question` ×15.

| Section | Due |
| --- | --- |
| oak `270068` | `2026-12-01T18:35:00Z` |
| sj `270077` | `2026-12-02T21:00:00Z` |

Settings to match siblings: 15 min, 1 attempt, shuffle on, one question at a time, cant_go_back, unpublished.

- [ ] **Step 7: Grant Najib Mosquera (`409148`) double time on the new W13 Oakland quiz**

`canvas_set_quiz_extension` section `oak`, `extra_time: 15`. Every other Oakland quiz already carries his accommodation; a newly created quiz will not inherit it.

- [ ] **Step 8: Sync course docs**

`schedule.md`, `readings.md`, `COURSE_MEMORY.md` reference a Week 13 quiz; confirm they now match reality. Run `/sync-course`.

- [ ] **Step 9: Commit**

```bash
git add course/assessments/week12-agent-architectures-quiz.md course/assessments/week13-ai-security-quiz.md
git commit -m "Split the Week 12 quiz so each week tests what it taught"
```

---

## Task 9: Weeks 9 and 10 — audit plus point-drift repair

**Files:**
- Modify: `course/assessments/week09-claude-code-foundations-quiz.md:226`, `week10-claude-code-workflows-quiz.md:225`
- Modify: `course/assessments/week09-answer-key.md`, `week10-answer-key.md`

- [ ] **Step 1: Repair the source drift**

Both Q15 headings read `(1 point)` but Canvas was changed to 2 earlier, against the source-first rule. Change both to `(2 points)` and update the `Points` column for Q15 in each answer key.

- [ ] **Step 2: Confirm the linter now agrees**

Run: `python3 course/verify-quizzes.py 9 10`
Expected: `pts` column shows `22` for both with no `!=` mismatch.

- [ ] **Step 3: Audit both** — repeat Task 7 steps 1-7. Oakland `816748`/`816743`, San Jose `816754`/`816761`.

- [ ] **Step 4: Commit**

```bash
git add course/assessments/week09-*.md course/assessments/week10-*.md
git commit -m "Sync Q15 point values to source and remove the tell from Weeks 9 and 10"
```

---

## Task 10: Remaining weeks

Repeat Task 7 for each, in due-date order. One commit per week.

| Week | Due | Oak | SJ |
| --- | --- | --- | --- |
| 4 | Sep 29 | `816747` | `816755` |
| 5 | Oct 6 | `816745` | `816753` |
| 6 | Oct 13 | `816752` | `816764` |
| 7 | Oct 20 | `816744` | `816762` |
| 8 | Oct 27 | `816741` | `816760` |
| 11 | Nov 17 | `816749` | `816763` |
| 14 | Dec 8 | `816742` | `816759` |

W5 and W6 are 10 q / 14 pts. W14 has B correct 14/15 — worth fixing the letter spread opportunistically while rewriting.

- [ ] **Step 1: Full clean scan**

Run: `python3 course/verify-quizzes.py; echo "exit=$?"`
Expected: every week passing, `exit=0`

- [ ] **Step 2: Commit**

```bash
git commit -m "Complete the course-wide quiz answer audit"
```

---

## Self-review notes

**Spec coverage:** §4 skill → Task 5. §5 adversary → Task 6. §6 lint → Tasks 1-4. §7 split → Task 8. §8 rollout → Tasks 7, 9, 10. §9 debt → Task 9 step 1. §10 risks → checkpoints in Tasks 7 and 8.

**Deviation from spec:** the linter ships as `course/verify-quizzes.py`, not `tools/quiz-lint/`. `course/verify-syllabus.py` is the established pattern for verifying course content with stdlib-only Python; `tools/` holds the MCP server. Naming matches its sibling.

**Not covered, by design:** open questions §11 (commit gating, letter-spread priority, the missing Week 1 quiz, San Jose's W12 due date inside Fall Break) remain open and are not implemented here.
