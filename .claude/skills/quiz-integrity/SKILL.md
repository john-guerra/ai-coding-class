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
still say 1 point, so each header's claimed 22-point total no longer matches
its own question sum (`verify-quizzes.py` reports `21!=22` for both weeks).
Canvas now disagrees with the repo, and nothing in Canvas will tell you that —
only the source file and the linter catch it. Fix the source first, re-verify,
then push to **both** Canvas sections (Oakland and San Jose have separate
courses; a source fix pushed to only one still leaves the other silently
wrong).

## 2. Per-Answer Feedback

Every option can carry the rationale a student sees after answering it, as an
indented blockquote directly under the option it explains:

```markdown
- A) Background clue given
  > "Background clue given" restates Context, one of the five components
  > under Anatomy of a Good Prompt — it's not the odd one out, it belongs
  > on the list.
```

**Why indented and blockquoted, specifically:** `verify-quizzes.py`'s
`parse_quiz` matches options with `^-\s*([A-D])\)\s*(.+?)\s*$` — a line that
must *start* with `-`. A feedback line indented two spaces and led with `>`
can never match that anchor, so it is structurally invisible to the option
parser — not "usually skipped," but incapable of matching regardless of
content. Never write feedback as an unindented `- ` line, and never put it on
the same line as the option text; either would risk the parser measuring
feedback prose as if it were the option, corrupting every length ratio in the
bank (see §3 below). This is proven by a regression test
(`TestPerAnswerFeedbackIsInert` in `course/test_verify_quizzes.py`), not just
by inspection — it constructs a deliberately-broken parser variant that folds
the blockquote into the option text and confirms the test fails against it.

Only `course/assessments/week3-prompt-engineering-quiz.md` carries this field
so far (backfilled after the loss below). The other eleven quizzes still rely
solely on Canvas for feedback text — treat that as a known gap, not a
model to copy from, until they are backfilled too.

**Hard rule: never push `answers` to `canvas_update_quiz_question` without
`answer_comment` for every option.** On 2026-09-14, a Canvas push for Week 3
sent only `answer_text` and `answer_weight` for each option and silently
cleared every per-answer feedback comment in both sections — the push itself
wasn't reverted or reviewed for this side effect because Canvas gave no
warning that omitting `answer_comment` deletes existing feedback rather than
leaving it alone. The comment field is not additive: whatever the call
doesn't send, Canvas erases. If a question's source has no `> ` feedback
lines yet (any of the other eleven quizzes), the fix is to read the current
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
   quiz exceeds threshold (correct-is-longest > 40%, mean length ratio > 1.15)
   or has a header/points mismatch.
2. Dispatch the `quiz-adversary` subagent (`.claude/agents/quiz-adversary.md`)
   to review the quiz. It is content-aware, not a blind guesser: it reads
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
5. Push to **both** Canvas sections — never one.
