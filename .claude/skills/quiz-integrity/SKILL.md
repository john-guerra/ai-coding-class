---
name: quiz-integrity
description: Use when creating, editing, reviewing, or publishing any quiz in course/assessments/ — including checking a quiz against the week's readings or lecture, its pedagogy, answer keys, distractor fairness, or syncing it to Canvas
---

# Quiz Integrity

## Overview

A quiz bank had the correct answer be the longest option in 70-100% of questions
across 11 of 12 quizzes, against 25% by chance — a student could score ~90% by
always picking the longest option without knowing any course content. Students
noticed. The cause is structural, not carelessness: a correct answer accretes
qualifiers to be unambiguously true, while a distractor gets written fast and
stays short. Every quiz drifts this way unless a question is checked at the
moment it is written. That is what this skill is for — not a record of the
incident (see `COURSE_MEMORY.md` §7 for that), but the standard applied live.

## When to Use

- Writing a new question or quiz in `course/assessments/`
- Editing an existing quiz's questions, options, or points
- Reviewing a quiz before it is pushed to Canvas or published
- Checking whether a quiz matches the week's readings, or is fair to students
  taking it before the lecture
- Auditing the bank on demand (`python3 course/verify-quizzes.py`)

## 1. Source First

`course/assessments/week*-quiz.md` is the source of truth. Its
`week*-answer-key.md` sibling is gitignored instructor material —
**never commit an answer key.** Canvas is downstream of both; it is never
edited directly for content or points.

**Filename padding is inconsistent — never construct a `weekNN` path.**
Weeks 2-8 are unpadded (`week3-prompt-engineering-quiz.md`,
`week3-answer-key.md`); weeks 9-14 are zero-padded
(`week09-claude-code-foundations-quiz.md`, `week09-answer-key.md`). Glob
`course/assessments/week*-quiz.md` (or `week*-answer-key.md`) and match the
week number out of the result instead of building `week03-*` for week 3 —
that pattern matches nothing and can read as "quiz missing" rather than a
path bug. Deck filenames under `slides/` don't have this problem; they are
consistently two-digit padded (`01`-`14`).

The live worked example of getting this wrong: on 2026-09-14, Canvas was
edited directly to bump two questions' point values (week09 Q15 "Extended
Thinking" and week10 Q15 "Hook Design") from 1 point to 2. Both source files
still said 1 point, so each header's claimed 22-point total no longer matched
its own question sum (`verify-quizzes.py` reported `21!=22` for both weeks).
Canvas disagreed with the repo for eleven days, and nothing in Canvas said so —
only the source file and the linter caught it. (The source was brought back in
line on 2026-09-25.) Worse, the direct question edit did not refresh the
quiz-level total: three of the four quizzes still showed 21 points while their
questions summed to 22, so read the per-question points, not the quiz header. Fix the source first, re-verify,
then push to **both** Canvas sections (Oakland and San Jose have separate
courses; a source fix pushed to only one still leaves the other silently
wrong).

## 2. Per-Answer Feedback

**The repo is public (`github.com/john-guerra/ai-coding-class`). Per-answer
feedback names the right answer, so it lives only in the gitignored
`week*-answer-key.md` — never in `week*-quiz.md`.** In the key, put it under a
`## Per-Answer Feedback` section: one `### Qn` heading per question, each
option as `- **A)** text`, then its feedback on an indented `> ` line.

Worked example of getting this wrong: weeks 3, 4 and 6 carried feedback as
`  > ` blockquotes under each option in the public quiz file, and on
2026-10-02 the Week 5 rewrite followed that pattern and was pushed four days
before the quiz was due. Every correct answer was readable on GitHub. The
feedback was moved into the keys and stripped from all four sources the same
day, but it stays in git history. `verify-quizzes.py` now fails any quiz
whose source has an indented `> ` line or a `**Correct:` marker
(`find_answer_leaks`, tested by `TestAnswerLeaks`), so exit 0 also means no
answers leak from the source.

**Commit messages are public too.** `be46145` says which letter Week 6 Q8 was
re-keyed to and why. Describe quiz fixes by defect type ("re-keyed a question
the deck contradicted") and keep the letters and answer content in the
gitignored key.

(The option parser in `verify-quizzes.py` still ignores `  > ` lines —
`TestPerAnswerFeedbackIsInert` — so a stray one won't corrupt length ratios.
That only shows the line is harmless to the linter; it can still leak answers.)

**Hard rule: never push `answers` to `canvas_update_quiz_question` without
`answer_comment` for every option.** On 2026-09-14, a Canvas push for Week 3
sent only `answer_text` and `answer_weight` for each option and silently
cleared every per-answer feedback comment in both sections — the push itself
wasn't reverted or reviewed for this side effect because Canvas gave no
warning that omitting `answer_comment` deletes existing feedback rather than
leaving it alone. The comment field is not additive: whatever the call
doesn't send, Canvas erases. If a week's answer key has no Per-Answer Feedback
section yet, the fix is to read the current
comments back from Canvas first and round-trip them in the same call — not to
send `answers` alone and assume the rest is untouched.

## 3. The Tell and Its Fix Direction

Measure every question: does the correct answer's length exceed every
distractor's? Compare its length to the mean of the distractors. If the
correct answer is reliably the longest, or averages far more than ~1.15x
distractor length, the question is gameable independent of content knowledge.

**Fix by lengthening the distractors, never by trimming the correct answer.**
Trimming trades a fairness defect for a correctness one: a correct answer
usually carries the qualifiers it needs to be unambiguously true, so shortening
it risks making it ambiguous or wrong. A short distractor is under-specified,
not incorrect — add a plausible, mechanism-bearing clause to it instead
(e.g. turn "It's faster" into "It skips the permission check, so it's faster
but bypasses sandboxing" — false, but for a stated reason a half-informed
student could believe). Also spread the correct letter across A/B/C/D;
shuffling in Canvas does not fix a skewed source-file pattern, since students
comparing notes see the underlying skew.

### Meaning outranks parity — the Q9 rule

**Length parity never justifies removing content that lets a student identify the answer.**
If closing a band would strip the discriminating substance from an option, widen the other
three instead, or accept the residual ratio and document it.

Worked example, from a real pilot failure. Week 3 Q9 asks which prompt component is most
critically lacking in `"Make a function that handles data"`. Its correct answer read
`Task — "handles data" is too vague to act on` against three bare labels (Format, Examples,
Constraints) — a 5.28x ratio, the worst in the bank. The clause was stripped to bare `Task`
to close that band.

That looked like the sanctioned "remove a bolted-on explanation" move. It was not. The
clause carried the discrimination: "make a function" *is* an action, so without the
explanation a student reasonably concludes the Task is present and the gap must be Format
or Constraints. **The instructor piloted the quiz and answered it wrong.**

The fix was to give all four options comparable explanatory weight rather than strip the
one that had it — which restored the meaning and measured better than the stripped version
(1.01x, correct answer no longer longest, all options within 15%).

Before removing any clause from a correct answer, ask what a student loses. If the answer
gets harder to identify for someone who *knows the material*, the clause was load-bearing,
not decoration. A quiz that measures 1.00x and cannot be answered by someone who studied is
worse than one that measures 1.5x and can.

---

## 4. Ground Truth Hierarchy

When checking whether a question's claim is actually correct, rank sources —
but the ranking **splits by claim type**. Decks are authoritative on what was
taught, not on what is required.

**Concepts taught** (a technique, tool, framework, mechanism):
1. That week's deck, `slides/NN_*/index.md` — read heading TEXT, not level; all
   14 decks are `##`-dominant for content, with `#` reserved for dividers and a
   few title slides.
2. `course/schedule.md`, `course/readings.md`

**Logistics** (project requirements, due dates, sprint counts, coverage
thresholds): `course/projects/*.md`, `course/schedule.md`, `course/syllabus.md`
are rank 1. **Decks are not authoritative here.** Commit `ba11e10` is the
worked example of why: deck 01 claimed P1 needed 50%+ coverage and CI/CD, deck
07 said P3 requires 4 sprints, deck 14 dated P3 to "End of Week 14" — all stale
against the current specs. A question validated against a deck on a logistics
question can certify a wrong answer as correct.

**Product behavior (vendor docs outrank the deck).** A claim about how a tool
*currently behaves* — what Claude.ai does at the context limit, whether Project
files use context — goes stale as the product ships. Check it against the
vendor's current docs (support.claude.com, platform.claude.com) before trusting
the deck. Worked example, 2026-09-25: the Week 4 deck taught "Projects don't
consume your per-conversation context window" and "oldest turns are dropped
first (FIFO)". Anthropic's own RAG-for-Projects and usage-limits articles say
Project files do load into context until the Project nears the limit, and that
Claude.ai (code execution on) summarizes old turns rather than only dropping
them. Q5's keyed answer was false as written. Fix the deck, the quiz, and the
reading list together, and add the vendor page to the week's readings so the
quiz never tests a claim students had no source for.

**Product behavior drifts, so make it re-checkable.** Every question whose
key rests on how a product behaves gets a row in its answer key's
`## Volatile Claims (re-verify before reuse)` table: `| Qn | source URL |
verbatim quote |`. `python3 course/verify-quiz-sources.py <week>` fetches each
source and fails on any quote no longer on the page. Run it before every Canvas
push and before reusing a quiz in a new term. A `CHANGED` row means the key may
be stale; re-check that question against the page rather than assuming it is
still right. Week 5 (2026-10-02) is the first quiz with this table: its storage,
sharing and plan-usage keys come from a product redesign that was two weeks old.

**Cited statistics (rank 5).** Any claim resting on a statistic — Veracode's
45%, LLM-as-Judge's 85% vs. 81% human agreement, the 23-37% property-testing
figure — routes to `/verify-references`. Do not re-argue the number inline;
that skill owns URL and source-match verification.

**Tool-computed values (rank 1, above the answer key itself).** When a
question's answer is whatever a named tool actually outputs — a tokenizer's
token count, a command's exit code, a library call's return value — run the
tool and use its real output. It outranks the answer key, the deck, and the
quiz's own stated answer, because none of those can be trusted to check
themselves. Worked example: week 2 Q9 asked how many `cl100k_base` tokens a
snippet uses, and the answer key disagreed with itself (11 in the summary
table, 8 in the per-question breakdown). Only running `tiktoken` settled it
at 8 — no other source in the hierarchy could have, since the key was the
thing in question.

**Two traps that produce false positives** — check these before flagging a
quiz question as wrong:

- **Deck renumbering.** `docs/planning/slides_ground_truth_review.md` reviewed
  "decks 01-08, 10-15" under a numbering scheme that predates the Fall 2026
  renumber; decks are now 1:1 with week numbers. Note there is **no old deck
  09** — the old numbering skipped it, which is the entire reason the offset
  exists. General rule: old deck **01-08** maps unchanged to
  `slides/01_`-`slides/08_`; old deck **N ≥ 10** maps to `slides/(N-1)_` —
  10→`slides/09_`, 11→`slides/10_`, 12→`slides/11_`, 13→`slides/12_`,
  14→`slides/13_`, 15→`slides/14_`. The findings still hold — shift the deck
  number by the offset before treating them as stale. **When looking up a
  week in that doc, compute the old deck number first** (week N ≥ 9 → old
  deck N+1) and search for that — searching by the current week number or
  current path misses the row (e.g. the C.L.E.A.R. exception below lives
  under the review's `12_Claude_Code_Extensibility` row, not anything
  labeled "11").
- **Three quiz topics are taught and tested but absent from `schedule.md` and
  `readings.md` on purpose-by-omission, not by quiz error** — they are already
  ranked as doc gaps in that same review: **C.L.E.A.R.** (W11 quiz, taught in
  `slides/11_`, review recommendation #3), **LLM-as-Judge** (W10 quiz, taught
  in `slides/10_`, recommendation #1), and **property-based/mutation testing**
  (W10 quiz, taught in `slides/10_`, recommendation #4). If a question on one
  of these three shows up in an audit, cite the review doc and move on — do
  not re-report it as a quiz defect or a doc gap on every run.

## 5. Budgets

| Weeks | Questions | Points |
|-------|-----------|--------|
| Standard (most weeks) | 15 | 22 |
| W5, W6 | 10 | 14 |

`verify-quizzes.py` checks the header's claimed points against the sum of
question points; it does not check question/point *counts* against this
table, so confirm the budget by eye when adding or removing a question.

## 6. Workflow

```bash
python3 course/verify-quizzes.py <week>     # e.g. 9, or week09
```

1. Run the linter on the week you touched. Exit 0 = clean; exit 1 = a scanned
   quiz exceeds threshold (correct-is-longest > 40%, mean length ratio > 1.15),
   has a header/points mismatch, or leaks answers (feedback or a correct-answer
   marker in the public source — §2).
2. Dispatch **two independent reviewers in parallel**, in one message, as
   background agents. Don't give either one the other's findings or your own
   opinion of the quiz: their value comes from not being anchored.
   - **`quiz-pedagogy`** (`.claude/agents/quiz-pedagogy.md`) checks whether
     each question is answerable from what students can access when they take
     the quiz. Most weekly quizzes are **pre-class**, so that means the
     required readings, not that week's deck. It also checks what each question
     tests (recall or application) and which readings and topics go untested.
     It quotes the readings from the fetched page.
     *Why it exists:* on 2026-10-02, `quiz-adversary` cleared the Week 5 quiz
     twice ("every question tests something on a deck slide"). That quiz was
     due before the Week 5 lecture, and several questions could only be
     answered from that lecture's slides. A correctness reviewer reads the deck
     as ground truth, so it can't see this.
   - **`quiz-adversary`** (`.claude/agents/quiz-adversary.md`) is described below.

   Then, before applying anything, check every reading quote and URL the
   reviewers cite against the primary page yourself. Reviewer reports are
   secondhand: grep the fetched HTML **and** the Markdown version before you
   accept or reject a quote. Sort the findings: apply fixes that are wrong or
   blocked, apply high-impact fixes within scope, and list judgment calls (for
   example, making a quiz post-class, or adding a reading) for the
   instructor. Don't decide those yourself.

   The `quiz-adversary` subagent reviews the quiz. It is content-aware, not a blind guesser: it reads
   the quiz, the (gitignored) answer key, that week's deck, and the
   logistics docs; runs `verify-quizzes.py` and, where a question's answer
   is a tool's actual output, the tool itself; and reports blocker/major/minor
   findings — including keyed answers that are factually wrong or a
   distractor that is defensibly true, which the linter cannot see at all.
   It is read-only and proposes rewrites for a human to apply; it never
   edits the quiz, the key, or anything under `slides/`.
   *"I wrote these distractors carefully, a review is redundant" is
   self-certification — the author is the one person who cannot audit their
   own blind spot, which is exactly the Writer/Reviewer split this course
   teaches in Week 11.*

   **Deferred, not built:** a blind-guess mode — attempting the quiz using
   only tells (length, letter position, phrasing) with no course content —
   would measure actual exploitability directly, which is strictly more
   informative than the linter's length ratios for the letter-position and
   phrasing tells the linter can't gate on. It is not implemented because it
   would be scope creep on top of the content-aware review above, and for
   the length tell specifically the linter already answers the question a
   blind guesser would ask (e.g. a 93% correct-is-longest rate already tells
   you longest-picking scores ~93%). Recorded here as a future enhancement,
   not a defect.
3. Apply fixes to the source file (§1, §3).
4. Re-run the linter until it exits 0.
   *"I applied the fixes, it's obviously better now" is not verification —
   lengthening three distractors can still leave the correct answer longest;
   the ratio is arithmetic, not a judgment call. Exit 0 is the claim;
   anything else is an assertion.*
5. Run `python3 course/verify-quiz-sources.py <week>`; it must exit 0.
6. Push to **both** Canvas sections — never one.
