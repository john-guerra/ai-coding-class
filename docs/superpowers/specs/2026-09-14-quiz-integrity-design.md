# Quiz integrity — design

**Date:** 2026-09-14
**Status:** draft, pending review
**Ships as:** a `quiz-integrity` skill, a `quiz-adversary` subagent, a `quiz-lint`
measurement harness, a W12/W13 content split, and a per-quiz audit rollout across
11 quizzes.

---

## 1. What this is

Three related problems, one pipeline.

**The tell.** The Week 2 quiz shipped with the correct answer being the longest
option in 13 of 14 questions. Students noticed and told the instructor: you could
score 93% by picking the longest option without knowing any LLM content. That was
fixed in `a85d8dc`. Measuring the rest of the course shows Week 2 was not special —
it was just the one someone checked.

```
quiz       n  correct-is-longest  len ratio   letter spread
------------------------------------------------------------------
week2     14        0/14  (   0%)      1.01x   {A:2, B:7, C:5, D:0}   ← fixed
week3     15       13/15  (  87%)      2.26x   {A:0, B:7, C:6, D:2}
week4     15       14/15  (  93%)      1.48x   {A:0, B:7, C:8, D:0}
week5     10        7/10  (  70%)      1.50x   {A:1, B:8, C:1, D:0}
week6     10        9/10  (  90%)      2.10x   {A:0, B:8, C:0, D:2}
week7     15       12/15  (  80%)      1.85x   {A:3, B:12,C:0, D:0}
week8     15       13/15  (  87%)      1.97x   {A:2, B:13,C:0, D:0}
week09    15       14/15  (  93%)      1.95x   {A:1, B:11,C:3, D:0}
week10    15       13/15  (  87%)      1.65x   {A:0, B:13,C:2, D:0}
week11    15       14/15  (  93%)      1.73x   {A:0, B:12,C:3, D:0}
week12    15       15/15  ( 100%)      1.69x   {A:1, B:11,C:3, D:0}
week14    15       14/15  (  93%)      1.76x   {A:1, B:14,C:0, D:0}
```

Against 25% by chance. A second tell rides alongside it: **D is never correct** in
8 of 12 quizzes, and B is correct 11–14 times out of 15 in the late quizzes.

**The misplaced week.** The Week 12 quiz tests Week 13 security material and is due
**Nov 24**, six days before that material is taught (W13 runs Nov 30–Dec 4). Canvas
has no Week 13 quiz at all.

**No independent check.** Nothing verifies that a keyed answer is right, that a
distractor is actually false, or that the tell has not crept back.

### Non-goals

- **Not a rewrite of quiz content.** Questions keep their stems and their correct
  answers. Distractors change; the assessed concept does not.
- **Not a schedule/readings reconciliation.** `slides_ground_truth_review.md`
  already ranks those gaps. This design *consumes* that doc; it does not act on it.
- **Not the missing Week 1 quiz.** `schedule.md` lists a Week 1 quiz that has never
  existed in Canvas. Flagged, out of scope.
- **Not Week 2.** Published, due Sep 15, six submissions already in. Untouched.

---

## 2. Why the tell happens

From the `a85d8dc` commit message, and worth restating because it determines the fix:

> The cause is structural. A correct answer accretes qualifiers so it is
> unambiguously true, while distractors get written quickly and stay short.

So the fix direction is fixed: **lengthen the distractors, never trim the correct
answer.** Trimming the correct answer buys length parity by giving up precision,
which converts a fairness defect into a correctness defect.

Answer shuffling does not help. Canvas shuffles options, but the length cue travels
with the text. The letter-spread cue *is* masked by shuffling — it only bites in the
source file and any printed version — which is why it is a secondary priority here.

---

## 3. Ground truth hierarchy

The single most important design decision. The agent resolves conflicts in this
order:

| Rank | Source | Authority |
| --- | --- | --- |
| 1 | `slides/NN_*/index.md` | **What was actually taught.** Authoritative. |
| 2 | `quiz-integrity` skill (§4) | Quiz-authoring standards, carried forward from the W2 failure. |
| 3 | `docs/planning/slides_ground_truth_review.md` | Known deck-vs-doc divergences. |
| 4 | `course/schedule.md`, `course/readings.md` | May lag the decks. Mismatch = flag, not defect. |
| 5 | Cited statistics | Route to `/verify-references`. Never re-argue inline. |

### Two traps that would otherwise generate false positives

**Deck numbering shifted.** `slides_ground_truth_review.md` (2026-07-20) reviewed
"decks 01–08, 10–15" under the old Spring numbering. Decks have since been
renumbered 1:1 with weeks. Its findings still hold, shifted:

| That doc says | Now reads | Week |
| --- | --- | --- |
| deck 11 | `slides/10_Claude_Code_Workflows/` | W10 |
| deck 12 | `slides/11_Claude_Code_Extensibility/` | W11 |
| deck 13 | `slides/12_Agent_Architectures/` | W12 |
| deck 14 | `slides/13_AI_Security_Code_Quality/` | W13 |
| deck 15 | `slides/14_Production_Synthesis/` | W14 |

**Three quiz "errors" are not errors.** These topics are tested in quizzes and
taught in the corresponding decks, but appear in neither `schedule.md` nor
`readings.md`:

| Topic | Quiz | Taught in | Already ranked as a doc gap |
| --- | --- | --- | --- |
| C.L.E.A.R. review framework | W11 | `slides/11_` | recommendation #3 |
| LLM-as-Judge evaluation | W10 | `slides/10_` | recommendation #1 |
| Property-based / mutation testing | W10 | `slides/10_` | recommendation #4 |

The agent cites the review doc for these and moves on. Without this, it re-reports
the same four findings on every run and the report stops being read.

---

## 4. The `quiz-integrity` skill

`.claude/skills/quiz-integrity/SKILL.md`, alongside the existing `verify-references`,
`sync-course`, `slide-layout` and `deploy-slides` skills. Its closest sibling is
`verify-references`: an authoring-time standard, not a one-off task.

**This is the artifact that addresses the actual root cause.** The quiz-authoring
standards already exist — `COURSE_MEMORY.md` §7 has carried them since the Week 2 fix
in `a85d8dc`, including length parity, mechanism-bearing distractors, letter spread,
and "measure before publishing". Every quiz from Week 3 to Week 14 still measures at
70–100%. The rules did not fail because they were wrong; they failed because prose at
line 625 of a 1,643-line reference file is not loaded at the moment someone writes a
distractor. This session is itself evidence: the source-first rule was violated in
Canvas hours before the rule was discovered.

A skill's `description` is the trigger that closes that gap.

```
---
name: quiz-integrity
description: Use when creating, editing, or reviewing any quiz in course/assessments/ —
  enforces distractor length parity, answer-key ground truth, and source-first Canvas sync
---
```

**Carries:** the ground-truth hierarchy (§3) including both false-positive traps; the
lengthen-never-trim rule and why (§2); the source-first mandate and the Canvas push
procedure for both sections; when to run `quiz-lint` and when to dispatch
`quiz-adversary`; and the point/question budgets (15 q / 22 pts, or 10 q / 14 pts for
the short quizzes).

**Supersedes** `COURSE_MEMORY.md` §7 as the operational reference. That section stays,
reduced to the incident record and a pointer to the skill — the history is worth
keeping, the instructions belong where they load.

### What the skill deliberately does not absorb

| Artifact | Job | Why it cannot be the skill |
| --- | --- | --- |
| `quiz-adversary` subagent | Adversarial review | Needs a context that never saw the author's reasoning. Reviewing in-context is self-certification — the Writer/Reviewer anti-pattern taught in Week 11. |
| `quiz-lint` script | Measurement | Length ratios and point sums are deterministic arithmetic. Making them a judgment call reintroduces the drift being fixed. |

The skill orchestrates both; it does not replace either.

---

## 5. The `quiz-adversary` subagent

`.claude/agents/quiz-adversary.md`. **Read-only tools only** — it proposes, it never
writes.

That separation is the point. The course teaches the Writer/Reviewer pattern in W11;
a model that authors a distractor and then certifies its own work is the failure mode
that pattern exists to prevent. The adversary never sees its own prior output as
authoritative, and a human applies what it proposes.

**Input:** a week number.
**Reads:** `course/assessments/weekNN-*-quiz.md`, `weekNN-answer-key.md` (gitignored,
holds the correct letters), `slides/NN_*/index.md`, plus the ground-truth sources above.

**Returns, per question:**

| Check | Looks for |
| --- | --- |
| **Keyed answer defensible** | Is the correct answer actually correct, per the deck? |
| **Accidentally-true distractor** | A "wrong" option that is defensibly right. The dangerous one: it makes a fair question unfair and silently penalises the students who know most. |
| **Length parity** | Correct-answer length vs each distractor, target ±15%. |
| **Giveaway phrasing** | Absolute qualifiers ("always", "never", "only", "all") that mark an option as wrong on sight. |
| **Option overlap** | Two options that could both be argued correct. |
| **Unsourced numeric** | Any claim resting on a statistic → route to `/verify-references`. |
| **Proposed rewrite** | New distractor text, mechanism-bearing, length-matched. Correct answer untouched. |

**Severity, so the report is triageable:**

- **blocker** — accidentally-true distractor, or a wrong answer key. Fix before publish.
- **major** — the length tell, option overlap.
- **minor** — letter spread, giveaway qualifiers, style.

---

## 6. `quiz-lint` measurement harness

`tools/quiz-lint/`. Promotes the throwaway script used to produce the table in §1
into something that runs before and after every pass, so improvement is measured
rather than asserted.

**Reports:** correct-is-longest rate, mean length ratio, letter spread, and a
**header-consistency check** — does the header's claimed point total equal the sum of
per-question points?

That last check is not hypothetical. It would have caught the W9 and W10 quizzes both
claiming 22 points while their questions summed to 21, which is how this session found
them.

**Thresholds** (non-zero exit past any): correct-is-longest ≤ 40%, mean length ratio
≤ 1.15x, header points must match exactly.

Deliberately *not* wired into a git hook yet. It earns that after it has run against
all 12 quizzes without false positives.

---

## 7. The W12/W13 split

Per `COURSE_MEMORY` §7: **source files first, Canvas second.** Never Canvas alone.

**Question allocation**, decided by what each deck teaches, not by `schedule.md`:

| | Questions | Has | Needs |
| --- | --- | --- | --- |
| **W12** agents / SDK / safety | Q1, Q2, Q3, Q4, Q7, Q8, Q9, **Q11**, Q12, Q14 | 10 q / 14 pts | +5 q / +8 pts (3×2 + 2×1) |
| **W13** security / evals / ethics | Q5, Q6, Q10, Q13, Q15 | 5 q / 8 pts | +10 q / +14 pts (4×2 + 6×1) |

**Q11 "Agent Safety" stays in W12.** `slides/12_Agent_Architectures/` teaches *Agent
Safety & Evaluation → The Safety Challenge / Sandboxing Strategies / Testing Agents
Systematically*. The W13 deck has a similarly-named section, but its content is the
**evaluation** half: pass@k vs pass^k, three grader types, eval-suite design.
`schedule.md` attributing "agent safety & evaluation" to W13 is the doc lagging the deck.

**Ten new W13 questions**, all sourced from `slides/13_AI_Security_Code_Quality/`:

| # | Topic | Pts |
| --- | --- | --- |
| 1 | pass@k vs pass^k | 2 |
| 2 | Three grader types | 1 |
| 3 | Building an eval suite / success criteria | 2 |
| 4 | Why AI code is insecure | 1 |
| 5 | Gates 3–4: SAST vs DAST | 2 |
| 6 | Gates 7–8: security criteria & SBOM | 1 |
| 7 | Defending against slopsquatting | 2 |
| 8 | Structured review output tiers | 1 |
| 9 | The BrowseComp eval-awareness incident | 1 |
| 10 | Infrastructure noise / AI-resistant evals | 1 |

Five new W12 questions from `slides/12_Agent_Architectures/`: message passing between
agents (2), subagents vs agent teams (2), choosing a pattern under constraints (2),
`query()` mechanics (1), built-in tools vs `--allowedTools` (1).

**Canvas due dates**, matching the pre-class pattern:

| Section | Quiz | Due |
| --- | --- | --- |
| Oakland `270068` | W13 (new) | Dec 1, 18:35 UTC |
| San Jose `270077` | W13 (new) | Dec 2, 21:00 UTC |

W12 keeps its existing dates in both sections.

---

## 8. Rollout

Ordered by due date, since an unpublished quiz due sooner is the one that matters.
**W3 is due Sep 22, eight days out.**

Per quiz: `quiz-lint` → `quiz-adversary` → apply proposals to the source file and
answer key → `quiz-lint` again → push to **both** Canvas sections.

| Order | Quiz | Due | Note |
| --- | --- | --- | --- |
| 1 | W3 | Sep 22 | urgent; worst length ratio at 2.26x |
| 2 | W4 | Sep 29 | |
| 3 | W5, W6 | Oct 6, 13 | 10-question quizzes |
| 4 | W7, W8 | Oct 20, 27 | |
| 5 | W9, W10 | Nov 3, 10 | also sync the Q15 point drift (§9) |
| 6 | W11 | Nov 17 | |
| 7 | **W12 + W13** | Nov 24, Dec 1 | the split, §7 |
| 8 | W14 | Dec 8 | B correct 14/15 |

**Checkpoint:** after W3, the proposed rewrites get reviewed by the instructor before
the remaining quizzes are processed at scale. The failure this design most needs to
catch in itself is the adversary writing a distractor that is subtly true — and
re-measuring catches length regressions, not that.

---

## 9. Debt this repairs along the way

**Q15 point drift.** Canvas was edited directly earlier today to make W9 Q15 and W10
Q15 worth 2 points each, resolving a 21-vs-22 mismatch. The source files were not
updated, so `week09-...-quiz.md:226` and `week10-...-quiz.md:225` still read
"(1 point)". This is precisely what `COURSE_MEMORY` §7 warns against:

> Never edit quiz content in Canvas alone; it will be overwritten and the repo will
> silently disagree with what students see.

Fixed in the W9/W10 pass, along with their answer-key point columns.

---

## 10. Risks

| Risk | Mitigation |
| --- | --- |
| Adversary writes a subtly-true distractor | Instructor checkpoint after W3; `blocker` severity for accidentally-true options; adversary never reviews its own output |
| Rewrites drift from what was taught | Deck is rank-1 ground truth; proposals cite the slide they rest on |
| Canvas and source diverge again | Source-first is mandatory; `quiz-lint` header check; push to both sections in the same pass |
| Length parity achieved by trimming correct answers | Explicitly forbidden; lint measures ratio, and a shrinking correct answer shows up as a stem change in review |
| 400 rewrites exhausts attention before W14 | Rollout is due-date ordered, so the highest-value quizzes are done first even if the tail slips |

---

## 11. Open questions

1. Should `quiz-lint` eventually gate commits touching `course/assessments/`, or stay
   a manual command? Deferred until it has run clean against all 12.
2. The letter-spread tell is invisible in Canvas (shuffle is on). Fix opportunistically
   during rewrites, or leave it? Current plan: opportunistic, never its own pass.
3. Week 1 quiz: `schedule.md` promises one, Canvas has none. Create, or drop it from
   the schedule?
4. San Jose's **W12 quiz is due Nov 25, inside Fall Break** (Nov 25–29). `schedule.md`
   already flags that SJ's Wednesday meeting falls in the break. Creating the W13 quiz
   is the natural moment to decide whether the W12 date moves earlier.
