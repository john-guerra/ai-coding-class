# Syllabus Consolidation (Fall 2026, CS 6983) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Collapse two colliding syllabus lineages into one markdown master that builds to the instructor's exact Word format, carrying correct Fall 2026 / CS 6983 content.

**Architecture:** `course/syllabus.md` is rewritten into the instructor's §1–§11 Northeastern structure and becomes the single source of truth. `pandoc --reference-doc` inherits `styles.xml`, the theme, and the embedded fonts from a frozen copy of the instructor's own Word document, so the visual design is never regenerated — only inherited. A Python verification script guards the exact regression that broke the previous generator (silently dropping Title IX and DRC boilerplate). PDF export stays manual in Word.

**Tech Stack:** pandoc 3.x (installed at `/opt/homebrew/bin/pandoc`), Python 3 stdlib (`zipfile`, `re`) for verification, bash.

**Spec:** `docs/superpowers/specs/2026-08-07-syllabus-consolidation-design.md`

## Global Constraints

- Course code is **CS 6983** (not CS 7180). Term is **Fall 2026**. Term dates **September 9 – December 13, 2026**; Finals **December 14–20, 2026**.
- No-class dates: **Oct 12** (Indigenous Peoples' Day), **Nov 11** (Veterans Day), **Nov 25–29** (Fall Break; classes resume Mon Nov 30).
- Two sections: **Oakland / Online** Tuesday & Friday 10:35 AM–12:15 PM PT; **San Jose** Wednesday 1:00–4:20 PM PT. Rooms **TBD** — do not invent room numbers.
- The word **"modality" / "modalities" must not appear** in the new syllabus. Use **"harness" / "harnesses"**.
- Grade scale: `C- 65.00–68.99`, **`F 0.00–64.99`**. There must be no unmapped band.
- Assessment weights: Participation **15%**, Weekly Quizzes **10%**, Homeworks **25%** (5 × 5%), Projects **50%** (P1 **13%**, P2 **18%**, P3 **19%**). These must sum to 100%.
- Office hours: **"By appointment via Slack."** No fixed weekly slot. No "AI debugging clinics (Fridays)".
- Never hand-edit `course/templates/syllabus-reference.docx`. It exists only to supply styles.
- Do **not** modify `course/schedule.md`, `course/readings.md`, `website/`, or `slides/`. Out of scope.
- Never `git push`. Local commits only.

---

## File Structure

| File | Responsibility |
|---|---|
| `course/syllabus.md` | **Single source of truth.** Full §1–§11 syllabus content in the instructor's structure |
| `course/templates/syllabus-reference.docx` | Frozen style contract: `styles.xml`, theme, embedded fonts. Never edited |
| `course/build-syllabus.sh` | One pandoc invocation, md → docx |
| `course/verify-syllabus.py` | Four assertions guarding completeness, boilerplate, style fidelity, heading mapping |
| `course/CS6983_VibeCoding_Syllabus_f26.docx` | Build output (committed, so the shipped artifact is in history) |
| `course/archive/spring2026/` | The six Spring 2026 artifacts that went to real students |

---

### Task 1: Build harness — reference template, build script, verification script

Establishes the pipeline against the *existing stale* markdown, so the pipeline is proven working before any content changes. This decouples "does the format survive" from "is the content right".

**Files:**
- Create: `course/templates/syllabus-reference.docx`
- Create: `course/build-syllabus.sh`
- Create: `course/verify-syllabus.py`

**Interfaces:**
- Consumes: nothing.
- Produces: `bash course/build-syllabus.sh` writes `course/CS6983_VibeCoding_Syllabus_f26.docx` from `course/syllabus.md`. `python3 course/verify-syllabus.py` exits 0 on success, 1 on failure, printing one `PASS`/`FAIL` line per check.

- [ ] **Step 1: Freeze the reference template**

```bash
cd /Users/aguerra/workspace/aiCoding_Course
mkdir -p course/templates
cp course/CS7180_VibeCoding_Syllabus.docx course/templates/syllabus-reference.docx
```

- [ ] **Step 2: Write the build script**

Create `course/build-syllabus.sh`:

```bash
#!/usr/bin/env bash
# Build the CS 6983 syllabus .docx from the markdown master.
#
# Visual design is INHERITED from course/templates/syllabus-reference.docx
# (the instructor's own Word document) via pandoc --reference-doc. Nothing
# about the look is defined here -- do not add styling flags.
#
# PDF: open the output in Word and File -> Save as PDF. LibreOffice is not
# installed and Word export is the fidelity baseline.
set -euo pipefail

cd "$(dirname "$0")"

pandoc syllabus.md \
  --reference-doc=templates/syllabus-reference.docx \
  --from=markdown+pipe_tables \
  -o CS6983_VibeCoding_Syllabus_f26.docx

echo "Built: course/CS6983_VibeCoding_Syllabus_f26.docx"
```

Then: `chmod +x course/build-syllabus.sh`

- [ ] **Step 3: Write the verification script (the failing test)**

Create `course/verify-syllabus.py`:

```python
#!/usr/bin/env python3
"""Verify the built syllabus .docx against the reference style contract.

Guards the regression that broke generate-syllabus.js: it silently dropped
Title IX, the Disability Resource Center notice, and sections 8-11.

Usage: python3 course/verify-syllabus.py
Exit:  0 all checks pass, 1 any check fails.
"""
import re
import sys
import zipfile
from pathlib import Path

HERE = Path(__file__).parent
BUILT = HERE / "CS6983_VibeCoding_Syllabus_f26.docx"
REFERENCE = HERE / "templates" / "syllabus-reference.docx"

SECTIONS = [
    "1. Objectives and Course Description",
    "2. Proposed Schedule",
    "3. Course Assessment",
    "4. Course Materials",
    "5. General Policies",
    "6. Project Requirements Summary",
    "7. The Three Harnesses",
    "8. Homework Assignments",
    "9. Key Course Features",
    "10. Success in This Course",
    "11. Learning Resources and Support",
]

BOILERPLATE = [
    "Title IX",
    "Disability Resource Center",
    "Reasonable Accommodations",
    "Academic Integrity",
    "Attendance",
]

# "No-AI Challenge" is deliberately absent: the Version History table records
# that it was removed in v2.0, which is a legitimate mention.
FORBIDDEN = ["modality", "modalities", "multi-modal", "CS 7180", "Spring 2026"]

failures = []


def check(label, ok, detail=""):
    print(f"{'PASS' if ok else 'FAIL'}  {label}{'  -- ' + detail if detail else ''}")
    if not ok:
        failures.append(label)


def document_text(path):
    xml = zipfile.ZipFile(path).read("word/document.xml").decode("utf-8")
    xml = re.sub(r"</w:p>", "\n", xml)
    return re.sub(r"<[^>]+>", "", xml)


def para_styles(path):
    xml = zipfile.ZipFile(path).read("word/document.xml").decode("utf-8")
    return re.findall(r'<w:pStyle w:val="([^"]+)"', xml)


def style_props(path, style_id):
    """Return (fonts, colors, sizes) for a style -- serialization-independent."""
    xml = zipfile.ZipFile(path).read("word/styles.xml").decode("utf-8")
    m = re.search(r'w:styleId="%s".*?</w:style>' % style_id, xml, re.S)
    if not m:
        return None
    body = m.group(0)
    return (
        tuple(sorted(set(re.findall(r'w:ascii="([^"]+)"', body)))),
        tuple(sorted(set(re.findall(r'<w:color w:val="([^"]+)"', body)))),
        tuple(sorted(set(re.findall(r'<w:sz w:val="([^"]+)"', body)))),
    )


def style_ids(path):
    xml = zipfile.ZipFile(path).read("word/styles.xml").decode("utf-8")
    return set(re.findall(r'w:styleId="([^"]+)"', xml))


if not BUILT.exists():
    print(f"FAIL  build output missing: {BUILT}")
    sys.exit(1)

text = document_text(BUILT)

# Check 1: all eleven top-level sections present
missing = [s for s in SECTIONS if s not in text]
check("1. all 11 sections present", not missing, f"missing: {missing}" if missing else "")

# Check 2: required NU boilerplate survived
gone = [b for b in BOILERPLATE if b not in text]
check("2. NU boilerplate present", not gone, f"missing: {gone}" if gone else "")

# Check 2b: stale terminology is gone
stale = [f for f in FORBIDDEN if f.lower() in text.lower()]
check("2b. no stale terminology", not stale, f"found: {stale}" if stale else "")

# Check 3: style fidelity -- semantic, not byte-wise.
# pandoc reserializes XML (attribute order, self-closing whitespace) and appends
# its own syntax-highlighting styles, so the files are never byte-identical.
style_ok = True
details = []
for sid in ("Normal", "Heading1", "Heading2"):
    built_props, ref_props = style_props(BUILT, sid), style_props(REFERENCE, sid)
    if built_props != ref_props:
        style_ok = False
        details.append(f"{sid}: {built_props} != {ref_props}")
dropped = style_ids(REFERENCE) - style_ids(BUILT)
if dropped:
    style_ok = False
    details.append(f"dropped styles: {sorted(dropped)[:5]}")
check("3. style fidelity vs reference", style_ok, "; ".join(details))

# Check 4: heading mapping -- section N is Heading1, N.N is Heading2, no Heading3
styles = para_styles(BUILT)
h1, h2, h3 = styles.count("Heading1"), styles.count("Heading2"), styles.count("Heading3")
check("4. heading mapping", h1 == 11 and h2 > 0 and h3 == 0,
      f"Heading1={h1} (want 11), Heading2={h2} (want >0), Heading3={h3} (want 0)")

print()
if failures:
    print(f"{len(failures)} check(s) failed.")
    sys.exit(1)
print("All checks passed.")
```

- [ ] **Step 4: Run verification against the current stale `syllabus.md` to confirm it fails**

```bash
cd /Users/aguerra/workspace/aiCoding_Course
bash course/build-syllabus.sh
python3 course/verify-syllabus.py
```

Expected: **exit 1**. Checks 1 and 4 fail — the current `syllabus.md` uses the short-form structure, so none of the eleven numbered sections exist and `Heading1` count is not 11. Check 3 should already PASS (the reference-doc inheritance works today). This confirms the script measures content, not just that a file exists.

- [ ] **Step 5: Commit the harness**

```bash
cd /Users/aguerra/workspace/aiCoding_Course
git add course/templates/syllabus-reference.docx course/build-syllabus.sh course/verify-syllabus.py
git commit -m "$(cat <<'EOF'
Add syllabus build harness: pandoc reference-doc pipeline + verifier

Style comes from a frozen copy of the instructor's own Word document
rather than being regenerated. verify-syllabus.py guards the regression
that made generate-syllabus.js drop Title IX and the DRC notice.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
EOF
)"
```

Do **not** commit the build output yet — the content is still wrong.

---

### Task 2: Rewrite `course/syllabus.md` into the §1–§11 Fall 2026 master

**Files:**
- Modify: `course/syllabus.md` (full rewrite)

**Interfaces:**
- Consumes: `course/build-syllabus.sh` and `course/verify-syllabus.py` from Task 1.
- Produces: a markdown file where `#` maps to Word `Heading1` (exactly 11 occurrences, §1–§11) and `##` maps to `Heading2`. No `###`, and **no document-title `#` heading** — the title/instructor block is plain paragraphs.

**Source material:** `course/CS7180_VibeCoding_Syllabus_v2.md` is the structural template. Copy its prose **verbatim** except where the table below specifies a change. That file is archived in Task 4, so read it before then.

- [ ] **Step 1: Write the header block (plain paragraphs, no `#`)**

The original Word doc has no title heading — the title is Normal-styled text. Reproduce that:

```markdown
**CS 6983: Special Topics in AI**
**Vibe Coding — AI-Assisted Software Engineering**

Graduate Course, Khoury College of Computer Sciences
Northeastern University, Oakland Campus
Fall 2026 Semester

**Term:** September 9 – December 13, 2026. **Finals:** December 14–20, 2026 (no class meetings; Project 3 is submitted during finals week).

**Sections:**

- **Oakland / Online:** Tuesday & Friday, 10:35 AM–12:15 PM PT — room TBD
- **San Jose:** Wednesday, 1:00 PM–4:20 PM PT — room TBD

**No class:** Oct 12 (Indigenous Peoples' Day), Nov 11 (Veterans Day), Nov 25–29 (Fall Break; classes resume Mon Nov 30).

**Instructor:** John Alexis Guerra Gomez
**Email:** jguerra@northeastern.edu
```

- [ ] **Step 2: Write §1 and §2**

`# 1. Objectives and Course Description` — copy the three intro paragraphs verbatim from `CS7180_VibeCoding_Syllabus_v2.md:20-36`, then the topic bullets with these edits:

- Replace the `**Multi-Modal AI Development.**` bullet with:
  `- **Three AI Harnesses.** Mastering three AI coding harnesses: conversational coding (Claude Web), IDE-integrated AI (Antigravity), and agentic coding (Claude Code).`
- Append three bullets:
  - `- **Agent Architectures and the Agent SDK.** Building on Anthropic's six agent patterns and coordinating multi-agent systems.`
  - `- **Extensibility.** Custom skills, hooks, MCP servers, and sub-agents that adapt AI tooling to a codebase.`
  - `- **AI Security and Code Quality.** OWASP risks in AI-generated code, slopsquatting, and multi-gate quality pipelines.`
- Delete the `**Parallel Agentic Programming.**` bullet (absorbed by the agent architectures bullet).

`## 1.1 Course Outcomes` — copy verbatim, changing "master three AI coding modalities" to "master three AI coding **harnesses**", and appending:

```markdown
- Students will design agent architectures and extend AI tooling with custom skills, hooks, and MCP servers
- Students will audit AI-generated code for security vulnerabilities and quality defects
```

`## 1.2 Course Prerequisites` — copy verbatim.

`# 2. Proposed Schedule` — keep the lead sentence, replace the table with the 14-week table sourced from `course/schedule.md:24-38`:

```markdown
| Week | Dates | Topic Area |
|------|-------|------------|
| 1 | Sep 9–11 | Foundations — classes begin Wed Sep 9 |
| 2 | Sep 14–18 | LLM Fundamentals + Harness 1: Claude Web |
| 3 | Sep 21–25 | Prompt Engineering |
| 4 | Sep 28–Oct 2 | User Research & Prototyping — HW1 due |
| 5 | Oct 5–9 | Claude Web Deep Dive — HW2 due |
| 6 | Oct 12–16 | IDE-Centric AI Coding — **Project 1 due**; no class Mon Oct 12 |
| 7 | Oct 19–23 | Agile/Scrum + Pair Workflow |
| 8 | Oct 26–30 | Advanced IDE AI Features — HW3 due |
| 9 | Nov 2–6 | Claude Code Foundations — **Project 2 due**; Project 3 teams form |
| 10 | Nov 9–13 | Claude Code Workflows & Dev Practices — HW4 due; no class Wed Nov 11 |
| 11 | Nov 16–20 | Claude Code Extensibility |
| 12 | Nov 23–24 | Agent Architectures & SDK — HW5 due; Fall Break Nov 25–29 |
| 13 | Nov 30–Dec 4 | AI Security & Code Quality |
| 14 | Dec 7–11 | Production & Course Synthesis |
| Finals | Dec 14–20 | No class meetings — **Project 3 due** |
```

Then add below the table:

```markdown
Week 12 is shortened by Fall Break (Nov 25–29): only Monday and Tuesday are class days, and the San Jose Wednesday meeting falls inside the break. That week's Agent Architectures module runs partly asynchronously; announcements on Slack.
```

- [ ] **Step 3: Write §3**

Copy `CS7180_VibeCoding_Syllabus_v2.md:78-155` verbatim with three edits:

1. The assessment block line `**Homeworks (25%):** 6 assignments building toward projects` → `**Homeworks (25%):** 5 assignments (5% each) building toward projects`
2. In `## 3.6 Grade Calculations`, the last table row `| F | 0.00–59.99 |` → `| F | 0.00–64.99 |`
3. Demote all `###` subsection headings to `##` (`### 3.1` → `## 3.1`, and `### Considerations` → `## Considerations`), since `#` is now §N.

- [ ] **Step 4: Write §4 and §5**

Copy `CS7180_VibeCoding_Syllabus_v2.md:156-255` verbatim, demoting `###` → `##`, with two edits:

1. `## 4.3 Technologies` — move `Claude Code (agentic terminal tool)` from **Recommended Tools** into **Required Tools**, and add `Claude Code subscription or API access` context. Required Tools becomes:

```markdown
**Required Tools:**

- Antigravity IDE (free)
- Claude.ai account (Pro recommended, $20/month)
- Claude Code (agentic terminal tool)
- GitHub account (free, Pro for students)
- Node.js 18+ and npm
- Git installed locally
```

2. `## 5.4 Student Feedback` — replace the first sentence. New text:

```markdown
Office hours are by appointment via Slack — message the instructor to arrange a time. Your opinions are very important. All students are strongly encouraged to use the TRACE system near the end of the course.
```

Leave §5.1, §5.2, §5.3, §5.5, §5.6 Title IX, §5.7 Students with Disabilities, and §5.8 **fully intact** — dropping these is the exact defect being fixed.

- [ ] **Step 5: Write §6 and §7**

```markdown
# 6. Project Requirements Summary

## Project 1: Personal Utility App — Claude Web Artifact (13%) — Due Week 6

- 5+ user stories, Claude Web harness focus
- 50%+ test coverage, basic CI/CD
- Deployed application
- 5-min video, 500-word reflection

## Project 2: Full-Stack Application (18%) — Due Week 9

- Full-stack with auth, built as a pair, integrating multiple harnesses
- 80%+ coverage, TDD, comprehensive evals
- Advanced CI/CD with deploy previews
- Public API (see the Public API guide handout)
- 2+ Agile sprints
- 10-min video, 1500-word blog

## Project 3: Team Application (19%) — Due Finals Week (Dec 14–20, 2026)

- Team of 2–3, production-grade, demonstrating Claude Code mastery
- Agent architectures and custom extensibility (skills, hooks, MCP)
- Enterprise CI/CD, monitoring
- LLM-as-judge evals
- 3+ sprints, security audit
- 20-min presentation, blog

# 7. The Three Harnesses

## Harness 1: Claude Web (Weeks 4–5)

**Best for:** Architecture planning, learning, brainstorming, rapid prototyping with Artifacts

## Harness 2: Antigravity IDE (Weeks 6–8)

**Best for:** Professional day-to-day development, production code, pair workflows

## Harness 3: Claude Code (Weeks 9–14)

**Best for:** Agentic coding, automation, refactoring, DevOps, extensibility
```

- [ ] **Step 6: Write §8 through §11 and the Version History**

```markdown
# 8. Homework Assignments

Five assignments scaffold toward project success. Each is worth 5% of the final grade.

- **HW1 (5%, Week 4):** Prompt engineering battle with 3 challenges
- **HW2 (5%, Week 5):** Mom Test interviews, user stories, PRD
- **HW3 (5%, Week 8):** Context engineering — rules files and Scrum integration
- **HW4 (5%, Week 10):** Claude Code workflow and TDD
- **HW5 (5%, Week 12):** Custom skill and MCP integration

# 9. Key Course Features

## Weekly Quizzes (10%)

Weekly concept quizzes on Canvas verify understanding of course material. Topics include LLM fundamentals, prompt engineering, TDD principles, CI/CD workflows, agent architectures, AI security, and evaluation methodology. 14 quizzes total, lowest 2 dropped.

## LLM Fundamentals (Week 2)

Critical module covering transformer architecture, tokens, context windows, hallucinations, model comparison, and when to trust AI outputs.

# 10. Success in This Course

- Start early - projects take longer than expected
- Document everything - save prompts, track learnings
- Test continuously - embrace TDD with AI
- Understand your code - never commit unexplained code
- Engage with peers - share prompts, help others
- Build portfolio pieces - make interview-worthy projects
- Stay current - AI tools evolve rapidly

# 11. Learning Resources and Support

## Getting Help

- Pre-class questions on Canvas
- Slack for quick questions
- Office hours by appointment via Slack
- TA hours (posted on Slack)

## Wellness

This demanding course requires strong time management. Don't hesitate to ask for help. Extensions available for legitimate reasons. Mental health resources through university counseling.

By the end of this course, you will have a portfolio of 3 production-ready applications, mastery of AI-assisted development tools, and the professional engineering practices needed to succeed in Silicon Valley. Let's build something amazing!

**Version History**

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | January 2026 | Initial syllabus with No-AI Challenge (pass/fail midterm) |
| v2.0 | January 22, 2026 | Replaced No-AI Challenge with Weekly Quizzes (10%). Adjusted grading: Participation 20%→15%, Projects 55%→50% |
| v3.0 | August 7, 2026 | Fall 2026 offering. CS 7180 → CS 6983. 14 weeks + Finals. Three modalities reframed as three harnesses. Homeworks 6 → 5 (5% each). Grade scale corrected: F is 0.00–64.99, closing an unmapped 60–64.99 band. Cursor replaced by Antigravity. Two sections (Oakland/Online, San Jose) |
```

Note the "Version History" line is **bold text, not a heading** — the `Heading1` count must stay at exactly 11.

- [ ] **Step 7: Verify the heading count before building**

```bash
cd /Users/aguerra/workspace/aiCoding_Course
grep -c '^# ' course/syllabus.md    # expect 11
grep -c '^### ' course/syllabus.md  # expect 0
grep -ciE 'modalit|multi-modal' course/syllabus.md  # expect 0
```

If `^# ` is not exactly 11, fix before proceeding.

- [ ] **Step 8: Commit the rewritten master**

```bash
cd /Users/aguerra/workspace/aiCoding_Course
git add course/syllabus.md
git commit -m "$(cat <<'EOF'
Rewrite syllabus.md as the Fall 2026 CS 6983 master in NU section format

Restructures into the instructor's sections 1-11, updates to CS 6983 /
Fall 2026 / 14 weeks + Finals, reframes modalities as harnesses, moves
to 5 homeworks at 5%, and closes the unmapped 60-64.99 grade band.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Build and verify the Fall 2026 `.docx`

**Files:**
- Create: `course/CS6983_VibeCoding_Syllabus_f26.docx`

**Interfaces:**
- Consumes: `course/build-syllabus.sh`, `course/verify-syllabus.py`, rewritten `course/syllabus.md`.
- Produces: the shippable `.docx`.

- [ ] **Step 1: Build**

```bash
cd /Users/aguerra/workspace/aiCoding_Course
bash course/build-syllabus.sh
```

- [ ] **Step 2: Run verification**

```bash
python3 course/verify-syllabus.py
```

Expected: **exit 0**, five `PASS` lines, `All checks passed.`

If check 4 reports `Heading1` ≠ 11, the markdown heading levels are wrong — return to Task 2 Step 7.
If check 3 reports dropped styles, the reference template was corrupted — re-copy it from `course/CS7180_VibeCoding_Syllabus.docx`.

- [ ] **Step 3: Confirm the output is not lossy**

```bash
python3 -c "
import zipfile, re
d = zipfile.ZipFile('course/CS6983_VibeCoding_Syllabus_f26.docx').read('word/document.xml').decode('utf8')
print('text chars:', len(re.sub(r'<[^>]+>', '', d)))
"
```

Expected: **> 15000**. The lossy `_v2.docx` was 7,526 chars; the good original was 16,825. Anything near 7,500 means sections were dropped again.

- [ ] **Step 4: Commit the built artifact**

```bash
cd /Users/aguerra/workspace/aiCoding_Course
git add course/CS6983_VibeCoding_Syllabus_f26.docx
git commit -m "$(cat <<'EOF'
Build Fall 2026 CS 6983 syllabus docx

All four verification checks pass: 11 sections present, Title IX and DRC
boilerplate intact, styles match the reference, heading mapping correct.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Archive Spring 2026 artifacts and delete the dead generators

Runs after Task 3 so `CS7180_VibeCoding_Syllabus_v2.md` stays readable while Task 2 needs it.

**Files:**
- Move to `course/archive/spring2026/`: `CS7180_VibeCoding_Syllabus.docx`, `CS7180_VibeCoding_Syllabus.pdf`, `CS7180_VibeCoding_Syllabus_v2.docx`, `CS7180_VibeCoding_Syllabus_v2.md`, `CS7180_VibeCoding_Syllabus_v2.pdf`, `CS7180_VibeCoding_Syllabus_v3.pdf`
- Delete: `course/generate-syllabus.js`, `course/generate-syllabus-pdf.py`, `course/package.json`, `course/package-lock.json`, `course/node_modules/`, `course/CS6983_VibeCoding_Syllabus_v1.pdf`

**Interfaces:**
- Consumes: a verified build from Task 3.
- Produces: a `course/` directory with exactly one syllabus source.

- [ ] **Step 1: Confirm the template is independent of what is about to move**

```bash
cd /Users/aguerra/workspace/aiCoding_Course
ls -la course/templates/syllabus-reference.docx
```

Must exist. It is a copy, not a link — moving the original is safe.

- [ ] **Step 2: Archive**

```bash
cd /Users/aguerra/workspace/aiCoding_Course
mkdir -p course/archive/spring2026
git mv course/CS7180_VibeCoding_Syllabus.docx course/archive/spring2026/
git mv course/CS7180_VibeCoding_Syllabus.pdf course/archive/spring2026/
git mv course/CS7180_VibeCoding_Syllabus_v2.docx course/archive/spring2026/
git mv course/CS7180_VibeCoding_Syllabus_v2.md course/archive/spring2026/
git mv course/CS7180_VibeCoding_Syllabus_v2.pdf course/archive/spring2026/
git mv course/CS7180_VibeCoding_Syllabus_v3.pdf course/archive/spring2026/
```

- [ ] **Step 3: Write the archive README**

Create `course/archive/spring2026/README.md`:

```markdown
# Spring 2026 (CS 7180) syllabus artifacts — archived

These are the syllabus files distributed during the inaugural Spring 2026
offering as CS 7180. They are kept as a record of what students actually
received and are **not** maintained.

The current syllabus is `course/syllabus.md`, built with
`course/build-syllabus.sh`. See
`docs/superpowers/specs/2026-08-07-syllabus-consolidation-design.md`.

| File | Notes |
|---|---|
| `CS7180_VibeCoding_Syllabus.docx` / `.pdf` | The hand-authored Word original. Its styles live on in `course/templates/syllabus-reference.docx` |
| `CS7180_VibeCoding_Syllabus_v2.md` | Complete markdown mirror of the Word structure |
| `CS7180_VibeCoding_Syllabus_v2.docx` | ⚠️ Lossy. Generated by the since-deleted `generate-syllabus.js`, which silently dropped §3.2, §3.3, §3.5, all of §4 and §5 (including Title IX and the DRC notice), and §8–§11 |
| `CS7180_VibeCoding_Syllabus_v2.pdf` / `_v3.pdf` | Output of the since-deleted `generate-syllabus-pdf.py`. Unrelated to `_v2.docx` despite the shared version number — a different document lineage |
```

- [ ] **Step 4: Delete the dead generators**

```bash
cd /Users/aguerra/workspace/aiCoding_Course
git rm course/generate-syllabus.js course/generate-syllabus-pdf.py
git rm course/package.json course/package-lock.json
git rm --cached -r course/node_modules 2>/dev/null || true
rm -rf course/node_modules
rm -f course/CS6983_VibeCoding_Syllabus_v1.pdf
git rm --cached course/CS6983_VibeCoding_Syllabus_v1.pdf 2>/dev/null || true
```

- [ ] **Step 5: Confirm nothing else referenced the deleted files**

```bash
cd /Users/aguerra/workspace/aiCoding_Course
grep -rn "generate-syllabus\|CS7180_VibeCoding_Syllabus\|CS6983_VibeCoding_Syllabus_v1" \
  --include="*.md" --include="*.json" --include="*.js" --include="*.pug" \
  . 2>/dev/null | grep -v "^./course/archive/" | grep -v "^./docs/superpowers/"
```

Expected: no output. Any hit must be updated before committing.

- [ ] **Step 6: Commit**

```bash
cd /Users/aguerra/workspace/aiCoding_Course
git add -A course/
git commit -m "$(cat <<'EOF'
Archive Spring 2026 syllabus artifacts, delete the dead generators

generate-syllabus.js silently dropped Title IX, the DRC notice, and
sections 8-11 from its output; generate-syllabus-pdf.py produced a
format that was never the one in use. Both are replaced by
build-syllabus.sh. The course/ npm package existed only for the
deleted JS generator.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: Collateral numeric fixes

**Files:**
- Modify: `course/COURSE_MEMORY.md:84`, `course/COURSE_MEMORY.md:192`
- Rename: `course/assignments/hw1-mom-test.md` → `hw2-mom-test.md`
- Rename: `course/assignments/hw2-prompt-engineering.md` → `hw1-prompt-engineering.md`
- Modify: all five files in `course/assignments/` (weight 4% → 5%)
- Modify: `CLAUDE.md` (repository structure block)

**Interfaces:**
- Consumes: the corrected figures now authoritative in `course/syllabus.md`.
- Produces: repository-wide agreement on P1 = 13%, HW = 5% each, F = 0–64.

- [ ] **Step 1: Fix the grade scale in COURSE_MEMORY.md**

Change line 84 from `- F: 0-59` to `- F: 0-64`.

- [ ] **Step 2: Fix the P1 weight in COURSE_MEMORY.md**

Change line 192 from
`### Project 1: Personal Utility App — Claude Web Artifact (15%) - Due Week 6`
to
`### Project 1: Personal Utility App — Claude Web Artifact (13%) - Due Week 6`

- [ ] **Step 3: Confirm the weights now sum**

```bash
cd /Users/aguerra/workspace/aiCoding_Course
grep -n "^### Project [123]" course/COURSE_MEMORY.md
```

Expected: 13% + 18% + 19% = 50%.

- [ ] **Step 4: Rename the mis-numbered homework files**

The file *contents* are correct and match `schedule.md`; only the filenames are swapped.

```bash
cd /Users/aguerra/workspace/aiCoding_Course
git mv course/assignments/hw1-mom-test.md course/assignments/hw2-mom-test.md
git mv course/assignments/hw2-prompt-engineering.md course/assignments/hw1-prompt-engineering.md
```

- [ ] **Step 5: Fix homework weights**

Each of the five files in `course/assignments/` has a line `**Weight:** 4% of final grade`. Change every one to `**Weight:** 5% of final grade`.

```bash
cd /Users/aguerra/workspace/aiCoding_Course
grep -rn "Weight:" course/assignments/
```

Verify all five now read 5%. 5 × 5% = 25%, matching §3.

- [ ] **Step 6: Update the CLAUDE.md structure block**

In the repository-structure tree, change:

```
│       ├── hw1-mom-test.md
│       ├── hw2-prompt-engineering.md
```

to:

```
│       ├── hw1-prompt-engineering.md
│       ├── hw2-mom-test.md
```

Also, in the "Homework Assignments (5 total, 5% each = 25%)" list, confirm HW1 is Prompt Engineering Battle and HW2 is Mom Test Interviews — it already is; no change needed if so.

- [ ] **Step 7: Confirm nothing referenced the old homework filenames**

```bash
cd /Users/aguerra/workspace/aiCoding_Course
grep -rn "hw1-mom-test\|hw2-prompt-engineering" --include="*.md" --include="*.pug" --include="*.js" . 2>/dev/null
```

Expected: no output.

- [ ] **Step 8: Re-run syllabus verification**

Nothing in this task touches `syllabus.md`, but confirm the build is still green:

```bash
cd /Users/aguerra/workspace/aiCoding_Course
python3 course/verify-syllabus.py
```

Expected: exit 0.

- [ ] **Step 9: Commit**

```bash
cd /Users/aguerra/workspace/aiCoding_Course
git add -A course/ CLAUDE.md
git commit -m "$(cat <<'EOF'
Fix numeric conflicts the syllabus depends on

- COURSE_MEMORY: P1 15% -> 13% so projects sum to 50%
- COURSE_MEMORY: F 0-59 -> 0-64, closing the unmapped band
- assignments: weight 4% -> 5% each so homeworks sum to 25%
- rename hw1-mom-test.md / hw2-prompt-engineering.md, whose filenames
  contradicted their own contents and schedule.md

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Manual step for the instructor (not automated)

Open `course/CS6983_VibeCoding_Syllabus_f26.docx` in Word, review, then **File → Save as PDF** to produce `course/CS6983_VibeCoding_Syllabus_f26.pdf`. Copy both to `~/My Drive/2026/NU/Fall2026_VibeCoding/`.

## Self-Review

**Spec coverage:** Every spec section maps to a task — build pipeline and verification → Task 1 and 3; the §1–§11 content table → Task 2; archive/delete list → Task 4; collateral fixes → Task 5; the four verification checks → `verify-syllabus.py`. The manual PDF step is called out explicitly as out-of-automation.

**Placeholder scan:** No TBD/TODO except "room TBD", which is intentional per the spec and the instructor's confirmation. All code steps carry real code.

**Consistency:** `verify-syllabus.py` asserts `Heading1 == 11`; Task 2 Step 7 checks `grep -c '^# ' == 11`; §7 in Task 2 Step 5 is titled "7. The Three Harnesses", matching the `SECTIONS` list in the verifier. The "Version History" block is deliberately bold text rather than a `#` heading so the count stays at 11.

**Two gaps found and closed:**

1. `FORBIDDEN` originally included "No-AI Challenge", which would have failed check 2b against the Version History table's legitimate record that v2.0 removed it. Removed from the list, with a comment explaining why.
2. `FORBIDDEN` checked "modality"/"modalities" but not "multi-modal", which appears in §1's original prose as "Multi-Modal AI Development". Added, and the Task 2 Step 7 grep widened to match.
