# Spec-Driven Development — Research Reference

**Compiled:** 2026-07-28 · **Course:** CS 6983 Vibe Coding (Fall 2026) + the 8-hour workshop
**Companion docs:** [`ai_coding_course_sota_2026.md`](ai_coding_course_sota_2026.md) §2.2 ·
[`AI-CODING-READINESS-CHECKLIST.md`](AI-CODING-READINESS-CHECKLIST.md) Tier 2 ·
[`claude_code_modes_2026.md`](claude_code_modes_2026.md)

> **Scope of this doc.** Why a written spec earns a place ahead of Explore → Plan → Implement →
> Commit, what Anthropic now documents about it, what the evidence says, and which claim belongs in
> which week. All URLs verified 2026-07-28.

---

## 1. Why a spec step exists

Two distinct failures motivate it. They are worth separating, because they have different fixes and
different lifespans.

**Failure 1 — solving the wrong problem.** Anthropic's own framing: "Letting Claude jump straight to
coding can produce code that solves the wrong problem." Plan mode fixes this *within* a task. It does
not fix it *across* a feature, because the plan is derived from whatever the human happened to type
in the prompt. If the prompt underspecifies, the plan faithfully elaborates an underspecified idea.
[primary] https://code.claude.com/docs/en/best-practices

**Failure 2 — the agent grading its own work.** From Anthropic's harness research: agents
"confidently praise the work—even when, to a human observer, the quality is obviously mediocre."
The countermeasure is structural, not motivational: "Separating the agent doing the work from the
agent judging it proves to be a strong lever." Separation requires *written criteria that predate the
work* — which is what a spec is.
[primary] https://www.anthropic.com/engineering/harness-design-long-running-apps

**Why "the failing test is the spec" is necessary but not sufficient.** A test encodes behavior that
has already been decided. It cannot express scope boundaries, rejected alternatives, or the reason a
constraint exists, and it offers no method for extracting those from a human who has not yet
articulated them. The course keeps the TDD framing and adds the step that precedes it.

---

## 2. The two-altitude model

```
OUTER LOOP · feature altitude · human-heavy · once per feature

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
                             (fresh reviewer, reports gaps)
```

**Trigger rule.** Anthropic bounds the inner loop explicitly: "For tasks where the scope is clear and
the fix is small (like fixing a typo, adding a log line, or renaming a variable) ask Claude to do it
directly… **If you could describe the diff in one sentence, skip the plan.**" The same test applied one
altitude up gives the spec trigger: *if you can describe the finished feature in one sentence, you do
not need a spec.* [primary] https://code.claude.com/docs/en/best-practices

**Ownership split.** The human owns the outer loop's *what*; the agent owns the inner loop's *how*.
This is the same division of labor the course already teaches through TDD, generalized from "the
failing test" to "the written spec" — and it matches what Anthropic measured across ~400k sessions:
humans make ~70% of planning decisions, agents ~80% of execution decisions.
[primary] https://www.anthropic.com/research/claude-code-expertise

**Why not a five-phase pipeline.** `Spec → Explore → Plan → Implement → Commit` is easier to draw but
teaches two wrong things: that every task needs a spec (contradicting the callout above), and that the
inner loop runs once (it runs once *per plan item*). The extra diagram buys the trigger condition, the
iteration count, and the verification arrow back to the spec.

---

## 3. Anthropic-native spec-driven development

### 3.1 The interview prompt

The "Let Claude interview you" section supplies a verbatim prompt. Reproduce it exactly — students
should copy it, not paraphrase it:

```text
I want to build [brief description]. Interview me in detail using the AskUserQuestion tool.

Ask about technical implementation, UI/UX, edge cases, concerns, and tradeoffs. Don't ask
obvious questions, dig into the hard parts I might not have considered.

Keep interviewing until we've covered everything, then write a complete spec to SPEC.md.
```

The stated rationale: "Claude asks about things you might not have considered yet, including technical
implementation, UI/UX, edge cases, and tradeoffs." The mechanism matters pedagogically — a structured
interview is a better elicitation instrument than a blank file, which is the same reason user-research
interviews beat surveys (a link worth making back to Week 4's Mom Test material).
[primary] https://code.claude.com/docs/en/best-practices

### 3.2 The four criteria

> "The most useful specs are self-contained: they **name the files and interfaces involved, state what
> is out of scope, and end with an end-to-end verification step** that proves the feature works. **Time
> spent making the spec precise pays off more than time spent watching the implementation.**"

As a checklist: (1) self-contained, (2) names files and interfaces, (3) states out-of-scope,
(4) ends with an end-to-end verification step. The fourth is the one students skip and the one that
makes the spec *checkable* rather than merely descriptive.
[primary] https://code.claude.com/docs/en/best-practices

### 3.3 Execute from a fresh session

> "Once the spec is complete, start a fresh session to execute it. The new session has clean context
> focused entirely on implementation, and you have a written spec to reference."

This is the course's existing document-then-implement pattern with a better document. The interview
transcript — questions, rejected options, dead ends — is exactly the noise that would otherwise compete
with source code for the context window.
[primary] https://code.claude.com/docs/en/best-practices

### 3.4 Verify the diff against the artifact

The "Add an adversarial review step" section closes the loop:

```text
Use a subagent to review the rate limiter diff against PLAN.md. Check that every requirement is
implemented, the listed edge cases have tests, and nothing outside the task's scope changed.
Report gaps, not style preferences.
```

Rationale: "A reviewer running in a fresh subagent context sees only the diff and the criteria you give
it, not the reasoning that produced the change, so it evaluates the result on its own terms."

**Teach the caveat with it**, or students will over-correct:

> "A reviewer prompted to find gaps will usually report some, even when the work is sound, because that
> is what it was asked to do. Chasing every finding leads to over-engineering: extra abstraction layers,
> defensive code, and tests for cases that can't happen."

[primary] https://code.claude.com/docs/en/best-practices

### 3.5 The plan as a reviewable artifact

Plan mode already treats the plan as a document, not a chat reply: `Ctrl+G` "open[s] the proposed plan
in your default text editor and edit[s] it directly before Claude proceeds," and the
`showClearContextOnPlanAccept` setting adds an approve option that "approves the plan and clears the
planning context."
[primary] https://code.claude.com/docs/en/permission-modes

**ultraplan** (research preview — label it as such) pushes this further and is the clearest evidence
that the artifact-plus-context-reset technique is now product, not folklore:

- **Section-level review** — "highlight any passage and leave a comment for Claude to address," with an
  outline sidebar. Plan review as document review.
- **Plan as a file** — the *Cancel* option "save[s] the plan to a file without executing it; Claude
  prints the file path so you can return to it later."
- **Context reset on handoff** — *Start new session* "clear[s] the current conversation and begin[s]
  fresh with only the plan as context."

[primary] https://code.claude.com/docs/en/ultraplan

---

## 4. Evidence from harness design

Anthropic's `harness-design-long-running-apps` builds a three-agent system for autonomous full-stack
development, and it is the strongest available evidence for why specs and separation work.

| Agent | Role |
|---|---|
| **Planner** | Expands a 1–4 sentence prompt into a detailed product spec with 10+ features |
| **Generator** | Builds the application in one continuous session |
| **Evaluator** | Drives the live app via Playwright, scores against criteria, files bugs |

**Deliberate under-specification.** The planner was prompted "to be ambitious about scope and to stay
focused on product context and high level technical design rather than detailed technical
implementation," because over-specification "could propagate errors downstream." This is the direct
counterweight to students who treat "more spec" as strictly better.

**The sprint contract.** Generator and evaluator negotiate deliverables and success criteria *before*
implementation — a bridge between the high-level spec and testable behavior. This is the same object as
a well-formed acceptance criterion, arrived at from the agent-architecture direction.

**File-based communication.** "One agent would write a file, another agent would read it and respond
either within that file or with a new file." Durable artifacts, not conversation, are the coordination
substrate.

**Context resets over compaction.** Clearing context entirely between sessions rather than summarizing,
to avoid "context anxiety" where models prematurely wrap up work. Consistent with §3.3.

### 4.1 The finding that should be taught *with* the pattern

When Opus 4.6 shipped, the harness could be simplified and the evaluator became optional: "On 4.6, the
model's raw capability increased, so the boundary moved outward… **every component in a harness encodes
an assumption about what the model can't do on its own.**"

**The pedagogical consequence — this is the thesis worth making students able to state:**

- The evaluator compensated for a **model limitation** (poor self-assessment). A better model dissolved
  it.
- The spec transfers **information that exists only in the human's head**. No model improvement
  dissolves it, because the missing information was never in the model to begin with.

Students who can classify a harness component into those two buckets can predict which of their
scaffolding will still be worth maintaining next year. Students who cannot will either keep dead
scaffolding forever or delete the load-bearing parts.

[primary] https://www.anthropic.com/engineering/harness-design-long-running-apps

### 4.2 The sibling article

`effective-harnesses-for-long-running-agents` describes an initializer agent plus a coding agent across
many context windows, coordinating through `claude-progress.txt` and a `feature_list.json` in which each
feature carries step-by-step instructions and a `passes` boolean. Two rules transfer directly to student
projects: "It is unacceptable to remove or edit tests because this could lead to missing or buggy
functionality," and "Only mark features as 'passing' after careful testing." A machine-checkable spec
with an explicit pass flag is the most literal form of "the spec ends with a verification step."
[primary] https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

---

## 5. The ecosystem

### 5.1 GitHub Spec Kit — the pattern, productized

MIT-licensed toolkit, 124.3k stars (2026-07-28), supporting 30+ agents. Workflow as **namespaced slash
commands**, each producing committed markdown:

`/speckit.constitution` → `/speckit.specify` → `/speckit.plan` → `/speckit.tasks` → `/speckit.implement`

Its rule for the spec phase is the same separation this doc argues for: "Focus on the **what** and
**why**, not the tech stack" — technology choices are deferred to the plan phase.
[primary] https://github.com/github/spec-kit

> **Citation warning:** an earlier version of `ai_coding_course_sota_2026.md` cited bare commands
> (`/specify`) and a version string ("v0.13.0, July 2026") that could not be verified. Use the
> namespaced commands; do not cite a version.

### 5.2 Amazon Kiro

Spec-native IDE using EARS-notation acceptance criteria plus a "steering" memory bank; broad GA May
2026. Useful as a contrast case — acceptance criteria in a constrained grammar rather than prose.
[secondary] https://www.developersdigest.tech/blog/aws-kiro-developer-guide-2026

### 5.3 Böckeler's maturity ladder — the conceptual frame

**Birgitta Böckeler, 2025-10-15**, on martinfowler.com. Three levels, verbatim:

| Level | Definition |
|---|---|
| **spec-first** | "A well thought-out spec is written first, and then used in the AI-assisted development workflow for the task at hand." |
| **spec-anchored** | "The spec is kept even after the task is complete, to continue using it for evolution and maintenance of the respective feature." |
| **spec-as-source** | "The spec is the main source file over time, and only the spec is edited by the human, the human never touches the code." |

Her warning about the third level is sharper than most paraphrases: earlier model-driven development
"sits at an awkward abstraction level and just creates too much overhead and constraints," and an
LLM-based spec-as-source risks combining "the downsides of both MDD and LLMs: **Inflexibility *and*
non-determinism**."

Teach the ladder as a choice with costs, not a staircase to climb. The course targets **spec-first**,
with **spec-anchored** as the team practice for P3.
[primary] https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html

---

## 6. Anatomy of a good spec

**The checklist** (§3.2): self-contained · names files and interfaces · states out-of-scope · ends with
an end-to-end verification step.

**Anti-patterns:**

| Anti-pattern | Why it fails |
|---|---|
| **Over-specified implementation** | Premature detail "propagate[s] errors downstream" (§4). The spec owns *what*, the plan owns *how*. |
| **Restates the code** | Adds no information; a diff would be shorter and always current. |
| **No verification step** | Nothing to check the diff against — §3.4 has no criteria to run on. |
| **Stale, unretired spec** | A shipped or abandoned spec left in the "what to build next" folder makes that folder untrustworthy. Enforce a lifecycle. |
| **Spec written by the agent alone** | Then it is a plan, not a spec — the human contributed no information the agent lacked. |

**Artifact lifecycle** (carried over from the readiness checklist): `specs/` holds the durable *why*;
`plans/` holds executable plans, spent on merge; `completed_plans/` holds history. Source files cite
their spec, and the spec index marks which specs are overtaken. A stale entry point is worse than none.

---

## 7. Teaching notes — what goes where

| Claim | Workshop S3 | W10 | W12 |
|---|---|---|---|
| Vocabulary: `SPEC.md` vs test vs plan | ✅ lead | recap | — |
| Two-altitude model + trigger rule | ✅ | ✅ | — |
| Interview prompt (verbatim) | ✅ lab | ✅ HW4 | — |
| The four criteria | ✅ graded in lab | ✅ graded in HW4 | — |
| Fresh-session execution | ✅ | ✅ | — |
| Verify diff against spec | ✅ | ✅ | — |
| Böckeler maturity ladder + MDD warning | — | ✅ | — |
| Artifact lifecycle (`specs/`/`plans/`) | — | ✅ | — |
| Spec Kit (awareness, not a lab) | handout only | ✅ | — |
| ultraplan (research preview) | S2 one-liner | ✅ | — |
| Sprint contract | — | mention | ✅ |
| Planner/Generator/Evaluator harness | — | pointer only | ✅ owns it |
| "Every component encodes an assumption" | — | mention | ✅ owns it |

**Deliberate repetition:** the two-altitude model and the four criteria appear in both the workshop and
W10. Different audiences (professional developers vs graduate students), and it is the load-bearing
idea. Everything else appears once.

**Do not install Spec Kit in the workshop.** A Python CLI install consumes time the interview prompt
does not require, and the pattern — not the tool — is the transferable part.

---

## 8. Sources

| # | Source | Type | URL |
|---|---|---|---|
| 1 | Claude Code best practices — "Let Claude interview you", four-phase workflow, adversarial review | [primary] | https://code.claude.com/docs/en/best-practices |
| 2 | Harness design for long-running application development — planner/generator/evaluator, sprint contract, context resets | [primary] | https://www.anthropic.com/engineering/harness-design-long-running-apps |
| 3 | Effective harnesses for long-running agents — `feature_list.json`, progress notes | [primary] | https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents |
| 4 | ultraplan (research preview) — cloud plan drafting, section comments, plan-as-file | [primary] | https://code.claude.com/docs/en/ultraplan |
| 5 | Permission modes — plan mode, `Ctrl+G`, `showClearContextOnPlanAccept` | [primary] | https://code.claude.com/docs/en/permission-modes |
| 6 | Böckeler, "Spec-driven development: 3 levels" (2025-10-15) | [primary] | https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html |
| 7 | GitHub Spec Kit — MIT, 124.3k stars, namespaced commands | [primary] | https://github.com/github/spec-kit |
| 8 | Anthropic ~400k-session expertise study — 70%/80% planning/execution split | [primary] | https://www.anthropic.com/research/claude-code-expertise |
| 9 | AWS Kiro developer guide — EARS acceptance criteria, steering | [secondary] | https://www.developersdigest.tech/blog/aws-kiro-developer-guide-2026 |

**Verification:** all URLs returned HTTP 200 on 2026-07-28. The only numeric claims in this document are
Spec Kit's star count (source 7) and the 70%/80% split (source 8); both are attributed inline.
