---
name: quiz-integrity
description: Use when creating, editing, or reviewing any quiz in course/assessments/ — enforces distractor length parity, answer-key ground truth, and source-first Canvas sync
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
- Reviewing a quiz before it is pushed to Canvas
- Auditing the bank on demand (`python3 course/verify-quizzes.py`)

## 1. Source First

`course/assessments/weekNN-*-quiz.md` is the source of truth. Its
`weekNN-answer-key.md` sibling is gitignored instructor material —
**never commit an answer key.** Canvas is downstream of both; it is never
edited directly for content or points.

The live worked example of getting this wrong: on 2026-09-14, Canvas was
edited directly to bump two questions' point values (week09 Q15 "Extended
Thinking" and week10 Q15 "Hook Design") from 1 point to 2. Both source files
still say 1 point, so each header's claimed 22-point total no longer matches
its own question sum (`verify-quizzes.py` reports `21!=22` for both weeks).
Canvas now disagrees with the repo, and nothing in Canvas will tell you that —
only the source file and the linter catch it. Fix the source first, re-verify,
then push to **both** Canvas sections (Oakland and San Jose have separate
courses; a source fix pushed to only one still leaves the other silently
wrong).

## 2. The Tell and Its Fix Direction

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

## 3. Ground Truth Hierarchy

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

**Two traps that produce false positives** — check these before flagging a
quiz question as wrong:

- **Deck renumbering.** `docs/planning/slides_ground_truth_review.md` reviewed
  "decks 01-08, 10-15" under a numbering scheme that predates the Fall 2026
  renumber; decks are now 1:1 with week numbers. Its deck 13 = `slides/12_`,
  deck 14 = `slides/13_`, deck 15 = `slides/14_`. The findings still hold —
  shift the deck number by the offset before treating them as stale.
- **Three quiz topics are taught and tested but absent from `schedule.md` and
  `readings.md` on purpose-by-omission, not by quiz error** — they are already
  ranked as doc gaps in that same review: **C.L.E.A.R.** (W11 quiz, taught in
  `slides/11_`, review recommendation #3), **LLM-as-Judge** (W10 quiz, taught
  in `slides/10_`, recommendation #1), and **property-based/mutation testing**
  (W10 quiz, taught in `slides/10_`, recommendation #4). If a question on one
  of these three shows up in an audit, cite the review doc and move on — do
  not re-report it as a quiz defect or a doc gap on every run.

## 4. Budgets

| Weeks | Questions | Points |
|-------|-----------|--------|
| Standard (most weeks) | 15 | 22 |
| W5, W6 | 10 | 14 |

`verify-quizzes.py` checks the header's claimed points against the sum of
question points; it does not check question/point *counts* against this
table, so confirm the budget by eye when adding or removing a question.

## 5. Workflow

```bash
python3 course/verify-quizzes.py <week>     # e.g. 9, or week09
```

1. Run the linter on the week you touched. Exit 0 = clean; exit 1 = a scanned
   quiz exceeds threshold (correct-is-longest > 40%, mean length ratio > 1.15)
   or has a header/points mismatch.
2. Dispatch the `quiz-adversary` subagent to attempt the quiz using only the
   tells (length, letter position, phrasing) — no course content. A quiz it
   beats above chance has a defect the linter's thresholds didn't catch.
3. Apply fixes to the source file (§1, §2).
4. Re-run the linter until it exits 0.
5. Push to **both** Canvas sections — never one.
