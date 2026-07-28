# Spec-Driven Development in the Workshop and Course — Design

**Date:** 2026-07-28
**Status:** Approved, ready for implementation plan
**Author:** John Alexis Guerra Gómez (with Claude)

---

## Problem

The workshop and the Week 10 lecture teach **Explore → Plan → Implement → Commit** (EPIC)
as the top-level workflow for agentic coding. That is still correct, but it is no longer
complete. Both leave out the step that precedes planning: **deciding and writing down what
to build.**

Three concrete symptoms:

1. **Workshop S2 advertises a lesson S3 does not teach.** The S2 closing card reads
   *"Spec-Driven Development: TDD with the Agent"* and its pre-work says *"Next time:
   spec → tests → let the agent build to green."* S3 delivers EPIC and TDD. There is no
   spec-authoring step anywhere in the deck. The only definition of "spec" offered is
   "the failing test."
2. **"The failing test is the specification" is true but incomplete.** A test encodes
   behavior that has *already been decided*. It cannot capture scope boundaries, rejected
   alternatives, or the reason a constraint exists — and it gives the student no method for
   getting those out of their own head in the first place.
3. **The research docs have the practice but not the sourcing.** `ai_coding_course_sota_2026.md`
   §2.2 recommends adding spec-driven development and cites GitHub Spec Kit, AWS Kiro, and
   Böckeler — but no Anthropic-native source, because at the time none was cited. One now
   exists, and it is prescriptive.

---

## Research findings that shape this design

### Anthropic now documents a spec step directly

`code.claude.com/docs/en/best-practices` contains a section titled **"Let Claude interview
you"**, separate from and preceding the four-phase workflow. It supplies a verbatim prompt:

> I want to build [brief description]. Interview me in detail using the AskUserQuestion tool.
>
> Ask about technical implementation, UI/UX, edge cases, concerns, and tradeoffs. Don't ask
> obvious questions, dig into the hard parts I might not have considered.
>
> Keep interviewing until we've covered everything, then write a complete spec to SPEC.md.

And four criteria for a good spec:

> The most useful specs are self-contained: they **name the files and interfaces involved,
> state what is out of scope, and end with an end-to-end verification step** that proves the
> feature works. **Time spent making the spec precise pays off more than time spent watching
> the implementation.**

Plus an execution instruction that is itself a teaching point:

> Once the spec is complete, **start a fresh session to execute it.** The new session has
> clean context focused entirely on implementation, and you have a written spec to reference.

The same page adds **"Add an adversarial review step"**, which closes the loop by checking the
diff back against the written artifact:

> Use a subagent to review the rate limiter diff against PLAN.md. Check that every requirement
> is implemented, the listed edge cases have tests, and nothing outside the task's scope
> changed. Report gaps, not style preferences.

With a caveat worth teaching alongside it:

> A reviewer prompted to find gaps will usually report some, even when the work is sound,
> because that is what it was asked to do. Chasing every finding leads to over-engineering.

### The four-phase loop is explicitly scoped, not universal

The same page bounds EPIC:

> Plan mode is useful, but also adds overhead. For tasks where the scope is clear and the fix
> is small (like fixing a typo, adding a log line, or renaming a variable) ask Claude to do it
> directly. **If you could describe the diff in one sentence, skip the plan.**

This is the load-bearing justification for the two-altitude framing below: spec and EPIC are
not competing loops and not a single pipeline. They are **different altitudes with different
trigger conditions.**

### The plan artifact is now a shipped product feature

`code.claude.com/docs/en/ultraplan` (research preview) hands planning to a Claude Code on the
web session. It matters here for three details, each of which is a technique this course
already teaches, now productized:

- **Section-level review** — "highlight any passage and leave a comment for Claude to address,"
  with an outline sidebar. Plan review as an artifact review, not a chat reply.
- **Plan as a file** — the *Cancel* option "save[s] the plan to a file without executing it;
  Claude prints the file path so you can return to it later."
- **Context reset on handoff** — *Start new session* "clear[s] the current conversation and
  begin[s] fresh with only the plan as context."

Plan mode itself has the same idea as a setting: `showClearContextOnPlanAccept` adds an option
that "approves the plan and clears the planning context." `Ctrl+G` opens the proposed plan in
the user's text editor for direct editing before Claude proceeds.

### The harness article supplies the evidence, and the caveat

`anthropic.com/engineering/harness-design-long-running-apps` describes a three-agent system:

- **Planner** — expands a 1–4 sentence prompt into a detailed product spec with 10+ features.
  Deliberately prompted "to stay focused on product context and high level technical design
  rather than detailed technical implementation," because over-specification propagates errors
  downstream.
- **Generator** and **Evaluator** — negotiate a **"sprint contract"** defining deliverables and
  success criteria *before* implementation.
- **File-based communication** between agents: "one agent would write a file, another agent
  would read it and respond either within that file or with a new file."
- **Context resets** (clearing entirely) rather than compaction, to avoid "context anxiety"
  where models prematurely wrap up work.

Why separation is the point: agents "confidently praise the work — even when, to a human
observer, the quality is obviously mediocre," so "separating the agent doing the work from the
agent judging it proves to be a strong lever."

And the finding that should be taught *with* the pattern rather than after it: when Opus 4.6
shipped, the evaluator became optional. "On 4.6, the model's raw capability increased, so the
boundary moved outward… **every component in a harness encodes an assumption about what the
model can't do on its own.**"

**The pedagogical consequence, which is the thesis of this whole change:** the evaluator was
compensating for a *model* limitation, so a better model dissolved it. The spec step is not
compensating for a model limitation — it transfers information that exists only in the human's
head. That is why it survives model upgrades and the evaluator did not. Students should be able
to tell those two kinds of harness component apart.

### Corrections to existing course research

| Where | Current claim | Correction |
|---|---|---|
| `sota_2026.md` §2.2 | Böckeler/Fowler cited within "the fastest-moving 2026 practice area" | The article is dated **2025-10-15**; author **Birgitta Böckeler** |
| `sota_2026.md` §2.2 | Spec Kit "Constitution → Specify → Plan → Tasks → Implement" | Commands are **namespaced**: `/speckit.constitution`, `/speckit.specify`, `/speckit.plan`, `/speckit.tasks`, `/speckit.implement` |
| `sota_2026.md` §2.2 | "v0.13.0, July 2026; ~123k stars" | Version **could not be verified — drop it**. Stars now **124.3k**, MIT confirmed |
| `slides/10` ×2 | `docs.anthropic.com/en/docs/claude-code/best-practices` | Moved to `code.claude.com/docs/en/best-practices` |

Böckeler's three levels, verbatim, for accurate paraphrase downstream:

- **spec-first** — "A well thought-out spec is written first, and then used in the AI-assisted
  development workflow for the task at hand."
- **spec-anchored** — "The spec is kept even after the task is complete, to continue using it
  for evolution and maintenance of the respective feature."
- **spec-as-source** — "The spec is the main source file over time, and only the spec is edited
  by the human, the human never touches the code."

Her warning is stronger than the current paraphrase: spec-as-source risks combining "the
downsides of both MDD and LLMs: **Inflexibility *and* non-determinism**."

---

## Design

### The organizing frame: two altitudes

```
OUTER LOOP · feature altitude · human-heavy · runs once per feature

   INTERVIEW ──► SPEC.md ──► PLAN.md
                    │           │
                    │           ▼
                    │   ┌── INNER LOOP · task altitude ──┐
                    │   │  Explore → Plan                │
                    │   │       ↓                        │  × N plan items
                    │   │  Implement → Commit            │
                    │   └────────────┬───────────────────┘
                    │                ▼
                    └──────► VERIFY diff against SPEC
                             (fresh subagent, reports gaps)
```

Two rules carried on every teaching surface:

- **Trigger:** run the outer loop when you cannot describe the finished feature in one
  sentence. Skip it when you can. (Direct from the docs' "skip the plan" callout, generalized
  one level up.)
- **Ownership:** the human owns the outer loop's *what*; the agent owns the inner loop's *how*.
  This is the same split the course already teaches via TDD, extended from "the failing test"
  to "the written spec." It is also the split Anthropic's 400k-session study measured — humans
  make ~70% of planning decisions, agents ~80% of execution decisions.

### Why this frame rather than a five-phase loop

A `Spec → Explore → Plan → Implement → Commit` pipeline is simpler to draw and would slot into
the existing slides with less work, but it teaches the wrong thing: it implies every task needs
a spec, which the official docs explicitly warn against, and it hides the fact that the inner
loop runs **many times** per spec. The two-altitude version costs one extra diagram and buys the
trigger condition, the iteration count, and the verification arrow back to the spec.

---

## Deliverables

### D1 — New research doc: `docs/research/spec-driven-development.md`

Eight sections:

1. **Why a spec step exists** — the two failures it catches: solving the wrong problem, and the
   agent grading its own work. Grounded in the harness article's self-evaluation finding.
2. **The two-altitude model** — the diagram above, the trigger rule, the ownership split.
3. **Anthropic-native SDD** — the interview prompt, the four spec criteria, fresh-session
   execution, adversarial review against the artifact (with the over-engineering caveat),
   ultraplan, `showClearContextOnPlanAccept`, `Ctrl+G`.
4. **Evidence from harness design** — Planner/Generator/Evaluator, the sprint contract,
   file-based inter-agent communication, context resets vs compaction, and the
   evaluator-became-optional finding with its "what the model can't do on its own" reading.
5. **The ecosystem** — Spec Kit (namespaced commands, "focus on the *what* and *why*, not the
   tech stack"), Kiro, Böckeler's three levels with the MDD warning verbatim.
6. **Anatomy of a good spec** — the four criteria as a checklist, plus anti-patterns:
   over-specified implementation detail (the harness article's own warning), specs that
   restate the code, specs with no verification step, stale specs nobody retired.
7. **Teaching notes** — an explicit map of which claim belongs in the workshop, in W10, and in
   W12, so the material does not get taught three times at the same depth.
8. **Sources** — a table tagged `[primary]` / `[secondary]` in the same style as
   `ai_coding_course_sota_2026.md`, with access dates.

### D2 — Edits to existing research docs

- `ai_coding_course_sota_2026.md` §2.2: rewrite with the Anthropic-native sourcing, apply all
  four corrections from the table above, and cross-link D1.
- `AI-CODING-READINESS-CHECKLIST.md`, Tier 2 "Spec-driven development": add checklist items for
  the interview-to-`SPEC.md` habit, the four spec criteria, fresh-session execution, and
  review-diff-against-spec. Keep the existing `specs/` → `plans/` → `completed_plans/`
  lifecycle items.

### D3 — Workshop S3: new Part 1 · Spec

Six new slides ahead of the current Part 1, which becomes Part 2. Existing parts renumber
2/3/4/5.

| Slide | Content |
|---|---|
| Why a spec | The wrong-problem failure; a test specifies decided behavior, a spec decides it |
| Two altitudes | Mermaid diagram; the trigger rule ("one sentence → skip it") |
| The interview | The official prompt verbatim; why `AskUserQuestion` beats a blank page |
| Spec anatomy | The four criteria as a checklist students apply to their own output |
| `/clear` → build | Fresh session with the spec as only context; ties to S2's document-then-implement |
| **Lab (15 min)** | Interview on a Linkstash feature → read `SPEC.md` against the four criteria → `/clear` → implement |

Plus one slide added to the existing Part "Reviewing AI Output": **verify the diff against the
spec** using a fresh subagent, with the over-engineering caveat. This lands immediately before
the planted-bug hunt and gives that exercise a written criterion to check against.

Wrap-up "What to Remember" gains the spec point; the list stays at five items or fewer.

### D4 — Workshop S2, handout, facilitator guide, README

- **S2:** one new slide at the end of the modes tour previewing the spec artifact, so the
  closing promise is set up rather than unearned. Pre-work changes to *"bring a feature you'd
  like to add — don't design it yet."*
- **New handout** `slides/workshop/handouts/spec-card.md` — the interview prompt, the four
  criteria as a checkable list, the two-altitude diagram in text form, the trigger rule. Auto-
  discovered by `build-handouts.mjs`; needs a row in `handouts/README.md` and "Six" → "Seven".
- **`facilitator-guide.md`:** re-time the S3 block to open with a 15-minute spec segment, and
  add a cut-line (the spec lab can shrink to a live demo; protect the four-criteria beat).
- **`workshop/README.md`:** S3 focus row and the handout count.

### D5 — Course W9 / W10

- **W9 (`slides/09_Claude_Code_Foundations`):** one forward pointer on the EPIC slide — specs
  live one altitude up, covered next week. No structural change.
- **W10 (`slides/10_Claude_Code_Workflows`):** new section **"Specs Before Plans"** placed
  between "Where We Are" and the existing EPIC section, carrying the two-altitude frame plus the
  material too heavy for a workshop: Böckeler's maturity ladder with the MDD warning, Spec Kit
  as the productized form, ultraplan and section-level plan review, and the
  `specs/` → `plans/` → `completed_plans/` lifecycle. Also fix the two stale
  `docs.anthropic.com` best-practices URLs.
- **`course/COURSE_MEMORY.md`:** W10 topic bullets; **HW4 gains a `SPEC.md` deliverable**
  committed *before* implementation and graded on the four criteria. Reweighted inside the
  existing 30% EPIC portion — total HW4 weight unchanged.
- **`course/schedule.md`:** W10 row.
- **`course/readings.md`:** W10 readings — best-practices, the harness-design article, Böckeler.
- **`website/timeline.js`:** W10 `weeklyFocus`, then regenerate `index.html` from `index.pug`.

### D6 — Verification

`/sync-course` to confirm artifact consistency, `/verify-references` on the new and edited
research docs, and a build of the workshop decks with an overflow check on the new S3 slides.

---

## Out of scope

- **The Planner/Generator/Evaluator multi-agent harness** belongs in **W12 Agent Architectures**,
  where multi-agent coordination is already the topic. W10 and the workshop get a one-line
  pointer only. Teaching a three-agent system inside an 8-hour workshop would swamp the spec
  idea it is meant to support.
- **GitHub Spec Kit as a hands-on lab.** It is taught as *the productized form of the pattern*
  in W10, not installed. A Python CLI install would consume workshop time that the interview
  prompt does not require.
- **Workshop S2's permission-modes table**, which has drifted from current docs (lists
  "Allowlist" as a mode when it is a permission *rule*; omits `acceptEdits` and `dontAsk`; the
  CLI now labels `default` as **Manual**). Real, but unrelated to SDD. Tracked as a follow-up.

## Risks

- **Workshop time.** S3 is already full. The spec segment takes 15 minutes from the existing
  55-minute spec→TDD→build block, which is why the facilitator guide gets an explicit cut-line
  rather than an optimistic re-time.
- **Vocabulary collision.** Students will now hear "spec" meaning three things: the written
  `SPEC.md`, the failing test, and the plan. The slides must name this collision directly rather
  than hope it resolves — handled on the "Why a spec" slide.
- **Research-preview churn.** Ultraplan is explicitly a research preview. It is presented as a
  direction-of-travel example, labeled as preview, never as a required tool.
