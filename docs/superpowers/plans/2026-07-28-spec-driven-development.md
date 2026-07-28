# Spec-Driven Development Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **This repository's user has directed that subagents NOT be dispatched.** Execute inline with `superpowers:executing-plans`.

**Goal:** Add the spec-authoring step that precedes Explore → Plan → Implement → Commit to the 4-session workshop and Week 10 of CS 6983, backed by a new sourced research document, and propagate the change through every course artifact that must stay in sync.

**Architecture:** Spec-driven development is taught as a **feature-level outer loop** (interview → `SPEC.md` → `PLAN.md` → verify diff against spec) that **wraps** the existing task-level EPIC inner loop, rather than as a fifth phase in a linear pipeline. The trigger rule — "if you could describe the diff in one sentence, skip it" — is carried on every surface so students do not write a `SPEC.md` to fix a typo. Research lands first so the slides can cite it.

**Tech Stack:** Markdown (reveal-md decks, `---` horizontal / `<!-- vertical -->` vertical separators), Mermaid via `<pre class="mermaid">`, Node `marked` for handout HTML, Pug for the course website.

## Global Constraints

- **Design system:** "Ink & Ochre" — paper `#F7F6F2`, navy structure, exactly **one orange spark** (`#F5811F`) per slide. Red is retired; emphasis is ink-bold. See `docs/design/DESIGN_GUIDELINES.md`.
- **Slide budget:** 960×700px. Follow the `slide-layout` skill. Dense slides need `<!-- .slide: class="dense" -->`.
- **Markdown tables must NOT be column-aligned** — one space around each cell. reveal-md collapses alignment padding into newlines and the table renders as raw `| ... |` text. Tables also do not parse inside raw HTML blocks like `<div class="split-text">`; use an HTML `<table>` there.
- **Separators:** `---` on its own line = horizontal slide. `<!-- vertical -->` on its own line = vertical slide. Never `----`.
- **Never edit `website/index.html` directly** — edit `website/index.pug` and regenerate.
- **Never push `homepageJohnGuerra`** (the `website/` symlink target) without explicit approval.
- **Citation style in research docs:** `[primary]` / `[secondary]` tags with bare URLs, matching `docs/research/ai_coding_course_sota_2026.md`.
- **Four spec criteria — copy verbatim wherever quoted:** a good spec is self-contained; it **names the files and interfaces involved**, **states what is out of scope**, and **ends with an end-to-end verification step** that proves the feature works.
- **Böckeler levels — exact names:** `spec-first` → `spec-anchored` → `spec-as-source`. Article dated **2025-10-15**, author **Birgitta Böckeler**.
- **Spec Kit commands are namespaced:** `/speckit.constitution`, `/speckit.specify`, `/speckit.plan`, `/speckit.tasks`, `/speckit.implement`. Do **not** cite a version number — it could not be verified.
- **Correct best-practices URL:** `https://code.claude.com/docs/en/best-practices` (the `docs.anthropic.com/en/docs/claude-code/best-practices` form is stale).

---

## File Structure

| File | Responsibility | Action |
|---|---|---|
| `docs/research/spec-driven-development.md` | The sourced reference every slide cites | Create |
| `docs/research/ai_coding_course_sota_2026.md` | §2.2 corrections + cross-link | Modify |
| `docs/research/AI-CODING-READINESS-CHECKLIST.md` | Tier-2 SDD checklist items | Modify |
| `slides/workshop/session3/index.md` | New Part 1 · Spec; renumber 2–5; verify-vs-spec slide; wrap-up | Modify |
| `slides/workshop/session2/index.md` | Preview slide + pre-work | Modify |
| `slides/workshop/handouts/spec-card.md` | Printable spec reference card | Create |
| `slides/workshop/handouts/README.md` | Card table row; "Six" → "Seven" | Modify |
| `slides/workshop/README.md` | S3 focus row; handout count | Modify |
| `slides/workshop/facilitator-guide.md` | S3 run-of-show + cut-line | Modify |
| `slides/09_Claude_Code_Foundations/index.md` | Forward pointer only | Modify |
| `slides/10_Claude_Code_Workflows/index.md` | New "Specs Before Plans" section; agenda; URL fixes | Modify |
| `course/COURSE_MEMORY.md` | W10 topics; HW4 deliverable + rubric | Modify |
| `course/assignments/hw4-claude-code-workflow-tdd.md` | `SPEC.md` deliverable, reweighted inside Part 2 | Modify |
| `course/schedule.md` | W10 topic row | Modify |
| `course/readings.md` | W10 required readings | Modify |
| `website/timeline.js` | W10 `weeklyFocus` | Modify |
| `website/index.pug` → `index.html` | W10 schedule row; regenerate | Modify |

**Ordering rationale:** research (T1–T3) → workshop (T4–T7) → course (T8–T11) → verification (T12). Slides cite the research doc, so research must exist first. The website regeneration is last because it is the only step touching a separate git repo.

---

### Task 1: Research doc — `docs/research/spec-driven-development.md`

**Files:**
- Create: `docs/research/spec-driven-development.md`

**Interfaces:**
- Produces: the canonical citation target for every slide added in T4–T9. Section anchors other docs will link to: `#the-two-altitude-model`, `#anatomy-of-a-good-spec`, `#teaching-notes`.

- [ ] **Step 1: Write the eight sections**

Section order and required content:

1. **Why a spec step exists** — the two failures: solving the wrong problem, and the agent grading its own work. Quote the harness article: agents *"confidently praise the work—even when, to a human observer, the quality is obviously mediocre."*
2. **The two-altitude model** — the ASCII/Mermaid diagram; the trigger rule; the ownership split (human owns outer *what*, agent owns inner *how*), tied to the 400k-session finding (~70% planning / ~80% execution) already cited in `sota_2026.md` §2.6.
3. **Anthropic-native SDD** — the interview prompt verbatim; the four criteria verbatim; "start a fresh session to execute it"; the adversarial-review prompt with its over-engineering caveat; `ultraplan` (labeled **research preview**) with section-level comments, plan-as-file, and *Start new session*; `showClearContextOnPlanAccept`; `Ctrl+G`.
4. **Evidence from harness design** — Planner / Generator / Evaluator; the **sprint contract**; file-based inter-agent communication; context resets vs compaction ("context anxiety"); and the evaluator-became-optional finding with the quote *"every component in a harness encodes an assumption about what the model can't do on its own."* Close with the distinction: components that compensate for **model** limits dissolve as models improve; components that transfer **information only the human has** do not.
5. **The ecosystem** — Spec Kit (namespaced commands; "Focus on the *what* and *why*, not the tech stack"; 124.3k stars; MIT), Kiro (EARS-notation acceptance criteria + steering memory bank), Böckeler's three levels verbatim + the MDD warning verbatim.
6. **Anatomy of a good spec** — the four criteria as a checklist; anti-patterns: over-specified implementation detail (the harness article's own warning that over-specification "could propagate errors downstream"), specs that restate the code, specs with no verification step, stale specs nobody retired.
7. **Teaching notes** — a table mapping each claim to Workshop S3 / W10 / W12, so nothing is taught three times at the same depth. W12 owns Planner/Generator/Evaluator.
8. **Sources** — `[primary]`/`[secondary]` table with access date 2026-07-28.

- [ ] **Step 2: Verify every URL resolves**

Run: `for u in https://code.claude.com/docs/en/best-practices https://code.claude.com/docs/en/ultraplan https://www.anthropic.com/engineering/harness-design-long-running-apps https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html https://github.com/github/spec-kit; do echo -n "$u "; curl -s -o /dev/null -w "%{http_code}\n" -L "$u"; done`

Expected: `200` for all six.

- [ ] **Step 3: Commit**

```bash
git add docs/research/spec-driven-development.md
git commit -m "Research: spec-driven development reference"
```

---

### Task 2: Correct `ai_coding_course_sota_2026.md` §2.2

**Files:**
- Modify: `docs/research/ai_coding_course_sota_2026.md:103-108` (§2.2)

**Interfaces:**
- Consumes: `docs/research/spec-driven-development.md` from Task 1 (cross-link target).

- [ ] **Step 1: Rewrite §2.2**

Four required changes:
1. Add a **first** bullet citing the Anthropic-native source (`code.claude.com/docs/en/best-practices`, "Let Claude interview you") — this is the gap; it must lead.
2. Spec Kit bullet: namespaced commands; drop `v0.13.0, July 2026`; stars → `124.3k`.
3. Böckeler bullet: date `2025-10-15`, author attribution to Böckeler, and the verbatim "Inflexibility *and* non-determinism" warning.
4. Add a pointer line: `→ Full treatment: docs/research/spec-driven-development.md`.

- [ ] **Step 2: Check the §5 recommendation line stays consistent**

Run: `grep -n "spec-driven\|Spec Kit" docs/research/ai_coding_course_sota_2026.md`
Expected: line ~251 ("Add spec-driven development as a first-class practice") must no longer read as un-actioned — append `[implemented: W10 + workshop S3, 2026-07-28]`.

- [ ] **Step 3: Commit**

```bash
git add docs/research/ai_coding_course_sota_2026.md
git commit -m "Research: correct SDD sourcing in sota_2026 2.2"
```

---

### Task 3: Extend the readiness checklist

**Files:**
- Modify: `docs/research/AI-CODING-READINESS-CHECKLIST.md:162-175` (Tier 2 → "Spec-driven development")

- [ ] **Step 1: Add four checklist items above the existing lifecycle items**

Keep the existing `specs/` / `plans/` / `completed_plans/` and bidirectional-citation items. Add, in the same `- [ ] **Bold lead** — body. **[S]**/**[M]**` format:
- Interview-to-`SPEC.md` habit before any multi-file feature. **[S]**
- The four spec criteria as an acceptance gate on the spec itself. **[S]**
- Execute from a **fresh session** with the spec as the only context. **[S]**
- Review the **diff against the spec** with a fresh reviewer that reports gaps, not style. **[M]**

- [ ] **Step 2: Commit**

```bash
git add docs/research/AI-CODING-READINESS-CHECKLIST.md
git commit -m "Checklist: add SDD authoring and verification items"
```

---

### Task 4: Workshop S3 — new Part 1 · Spec

**Files:**
- Modify: `slides/workshop/session3/index.md:26-34` (agenda), `:56-62` (insert before current Part 1), `:439` (wrap-up)

**Interfaces:**
- Produces: the section numbering all later S3 edits depend on — **Part 1 Spec, Part 2 EPIC, Part 3 TDD, Part 4 Reviewing AI Output, Part 5 Extensibility I**.

- [ ] **Step 1: Update the agenda slide**

Replace the 5-item list at `:28-32` with 6 items, spec first, keeping the existing goal line but widening it:

```markdown
1. Recap — the CLAUDE.md we wrote last session
2. **Spec** — deciding what to build, in writing
3. **Explore → Plan → Implement → Commit** (EPIC)
4. **TDD** with Claude Code — the quality thesis
5. Reviewing AI output — the **70% problem**
6. Extensibility I — **skills + hooks** (solo lab)

<small>Session 3 goal: run the full **spec → EPIC → TDD → verify** loop without letting the agent grade its own work.</small>
```

- [ ] **Step 2: Insert the six spec slides before the current `# Part 1` divider**

New divider `# Part 1 — Spec: Decide What to Build`, then five vertical/horizontal slides per the spec doc's D3 table. Required beats, one per slide:

1. **Why a spec** — name the vocabulary collision head-on: "spec" means three things this session (the written `SPEC.md`, the failing test, the plan). A test encodes behavior *already decided*; the spec is where you decide it.
2. **Two altitudes** — Mermaid diagram, outer loop wrapping inner, plus the trigger rule in a blockquote: *"If you could describe the diff in one sentence, skip it."*
3. **The interview** — the official prompt verbatim in a `text` code block.
4. **Spec anatomy** — the four criteria as a 4-row table students score their own `SPEC.md` against.
5. **`/clear` → build** — fresh session, spec as only context; explicit callback to S2's document-then-implement.
6. **Lab (15 min)** — the five lab steps.

- [ ] **Step 3: Renumber the four existing part dividers**

Run: `grep -n "^# Part " slides/workshop/session3/index.md`
Expected after edit: Part 1 Spec, Part 2 EPIC, Part 3 TDD, Part 4 Reviewing AI Output, Part 5 Extensibility I — five dividers, ascending, no duplicates.

- [ ] **Step 4: Add the verify-against-spec slide**

Insert as a `<!-- vertical -->` slide in Part 4, immediately **before** "Hunt the Planted Bug". Content: the adversarial-review prompt adapted to Linkstash, the fresh-context rationale ("it sees only the diff and the criteria, not the reasoning that produced the change"), and the over-engineering caveat as a blockquote. This gives the planted-bug hunt a written criterion.

- [ ] **Step 5: Update the wrap-up**

At `:439`, make the list five items with spec first; keep EPIC, TDD, 70%, skills/hooks.

- [ ] **Step 6: Verify the deck builds and slides fit**

```bash
cd slides && npm run build:workshop
```
Expected: exit 0, `handout →` lines printed, no reveal-md errors.

Then with `claude-in-chrome` (NOT Playwright — see `CLAUDE.md`): serve with `npm run serve:workshop`, open `http://localhost:8890/session3/?overflow`, and confirm no dashed-orange overflow outlines and no raw `| ... |` table text on the new slides.

- [ ] **Step 7: Commit**

```bash
git add slides/workshop/session3/index.md
git commit -m "Workshop S3: add Part 1 spec authoring + verify-against-spec"
```

---

### Task 5: Workshop S2 — set up the promise

**Files:**
- Modify: `slides/workshop/session2/index.md` (end of Part 2 modes tour), `:663-667` (pre-work)

- [ ] **Step 1: Add one preview slide at the end of the modes tour**

A `<!-- vertical -->` slide showing that plan mode's output is an artifact, not a chat reply — `Ctrl+G` edits it, and `Cancel` in ultraplan saves it to a file. One line forward: *"Next session: where that artifact comes from."* This makes the S2 closing card earned rather than a surprise.

- [ ] **Step 2: Fix the pre-work**

Replace the third bullet at `:666` and keep the rest:

```markdown
- Make sure your **Linkstash `CLAUDE.md`** is committed.
- Bring **one feature you'd like to add** — and *don't* design it yet. We'll do that together.
- Try one task in **plan mode** before next time.

> Next time: **spec → EPIC → tests → let the agent build to green.**
```

- [ ] **Step 3: Verify no other S2 slide contradicts the new framing**

Run: `grep -n "Next time\|Session 3\|Spec-Driven" slides/workshop/session2/index.md`
Expected: the closing card's *"Spec-Driven Development: TDD with the Agent"* now matches what S3 delivers. Leave that card's text unchanged.

- [ ] **Step 4: Commit**

```bash
git add slides/workshop/session2/index.md
git commit -m "Workshop S2: preview the spec artifact; fix S3 pre-work"
```

---

### Task 6: Handout — `spec-card.md`

**Files:**
- Create: `slides/workshop/handouts/spec-card.md`
- Modify: `slides/workshop/handouts/README.md`
- Modify: `slides/workshop/README.md`

**Interfaces:**
- Consumes: `build-handouts.mjs` auto-discovers any `*.md` in `handouts/` except `README.md` — **no script change needed**. The template requires an `# H1` on the first line and treats the **first paragraph after the H1** as an uppercase mono subtitle.

- [ ] **Step 1: Write the card**

Structure matching the other six cards: `# Spec Card`, italic subtitle line, then — the trigger rule; the interview prompt in a fenced block; the four criteria as a checkable list; the two-altitude loop as a fenced ASCII diagram; the verify-the-diff prompt; a "when NOT to write a spec" note. Source links on every borrowed claim.

- [ ] **Step 2: Add the README row**

In `handouts/README.md`, change `Six printable one-page reference cards` → `Seven`, and insert after the `memory-and-modes.md` row:

```markdown
| [`spec-card.md`](spec-card.md) | S3 | The interview prompt, the four spec criteria, the two-altitude loop, verify-the-diff |
```

- [ ] **Step 3: Update the workshop README**

In `slides/workshop/README.md`: S3 focus cell gains `Spec authoring ·` before `Explore-Plan-Implement-Commit`, hands-on cell gains `spec lab +`; and `handouts/*.md — six participant reference cards` → `seven`.

- [ ] **Step 4: Verify the handout renders**

```bash
cd slides && npm run build:workshop && ls dist-workshop/handouts/
```
Expected: `spec-card.html` present; console shows `Rendered 7 handouts to printable HTML.`

- [ ] **Step 5: Commit**

```bash
git add slides/workshop/handouts/spec-card.md slides/workshop/handouts/README.md slides/workshop/README.md
git commit -m "Workshop: add printable spec card"
```

---

### Task 7: Facilitator guide — re-time S3

**Files:**
- Modify: `slides/workshop/facilitator-guide.md:84-99` (Session 3 block)

- [ ] **Step 1: Rewrite the S3 goal and timing rows**

New goal line: run the full **spec → EPIC → TDD → verify** loop without letting the agent grade its own work.

Timing: `0:00–0:05` recap; **`0:05–0:20` spec** (new); `0:20–1:00` EPIC → TDD → review (was `0:05–1:00`); break unchanged; extensibility unchanged; wrap unchanged.

The spec row must name the load-bearing beat: the **four criteria** applied to the student's own `SPEC.md`, and the `/clear` before implementing.

- [ ] **Step 2: Update the cut-lines paragraph**

Add: the spec lab can shrink to a 5-minute live demo of the interview. **Protect** the four-criteria beat and the existing TDD "do not modify the tests" beat — those are the spine.

- [ ] **Step 3: Verify the guide is still excluded from the public build**

Run: `grep -n "facilitator-guide" slides/package.json`
Expected: `rm -f dist-workshop/facilitator-guide.html` present in `build:workshop`.

- [ ] **Step 4: Commit**

```bash
git add slides/workshop/facilitator-guide.md
git commit -m "Workshop: re-time S3 for the spec segment"
```

---

### Task 8: Course W9 — forward pointer only

**Files:**
- Modify: `slides/09_Claude_Code_Foundations/index.md:847-862` (Step 4 EPIC slide), `:888-895` (next-week preview)

- [ ] **Step 1: Add one line to the EPIC step slide**

After "This is the workflow you'll use daily in P3.", add:

```markdown
<small>For features too big to describe in one sentence, a **written spec** sits one altitude above this loop — next week.</small>
```

- [ ] **Step 2: Add a bullet to the Week 10 preview**

Insert as the **first** bullet at `:891`:

```markdown
- **Specs before plans** -- writing the spec the plan is generated from
```

- [ ] **Step 3: Verify slide budget**

Run: `cd slides && npm run build` then check `09_Claude_Code_Foundations` in `?overflow` mode via claude-in-chrome. The Step 4 slide is already `class="dense"`; confirm the added `<small>` does not overflow.

- [ ] **Step 4: Commit**

```bash
git add slides/09_Claude_Code_Foundations/index.md
git commit -m "W9: forward-point to specs"
```

---

### Task 9: Course W10 — "Specs Before Plans" section

**Files:**
- Modify: `slides/10_Claude_Code_Workflows/index.md:33-46` (agenda), insert new section before `:79` (`# Explore -> Plan -> Implement -> Commit`), `:117` and `:238` (stale URLs)

- [ ] **Step 1: Update the agenda**

Insert `2. Specs Before Plans` and renumber the rest to 11 items. If 11 items overflow, merge `9. Evaluation Systems` into the TDD line rather than dropping the new entry.

- [ ] **Step 2: Insert the new section before the EPIC section**

`# Specs Before Plans` divider plus vertical slides covering, in order:
1. The two-altitude diagram + trigger rule (same frame as the workshop — deliberate repetition across the two audiences).
2. The interview prompt + the four criteria.
3. **Böckeler's maturity ladder** — spec-first → spec-anchored → spec-as-source, as a 3-row table, with the MDD warning as a blockquote. *Workshop does not get this slide.*
4. **The artifact lifecycle** — `specs/` (durable why) → `plans/` (spent on merge) → `completed_plans/` (history); bidirectional spec↔code citation; a stale entry point is worse than none.
5. **Spec Kit** — the pattern productized; namespaced commands; "focus on the *what* and *why*, not the tech stack". Awareness, not a lab.
6. **ultraplan** (labeled research preview) — section-level comments on a plan, plan-as-file, *Start new session* as a shipped context reset; `showClearContextOnPlanAccept`.
7. **When not to write a spec** — the one-sentence rule; over-specification propagates errors downstream.
8. A one-line pointer that Planner/Generator/Evaluator multi-agent harnesses are **Week 12**.

Every slide carries a `<small>Source: [...](...)</small>` line, matching the deck's existing convention.

- [ ] **Step 3: Fix the two stale best-practices URLs**

Run: `grep -n "docs.anthropic.com/en/docs/claude-code/best-practices" slides/10_Claude_Code_Workflows/index.md`
Expected before: 2 hits (`:117`, `:238`). Replace both with `https://code.claude.com/docs/en/best-practices`. Expected after: 0 hits.

- [ ] **Step 4: Add the spec framing to the TDD section**

At `:247` the deck says "Tests are the **specification**." Extend it so the two senses of "spec" are reconciled rather than left colliding: the written spec decides the behavior, the test encodes it, and the test is what the agent cannot argue with.

- [ ] **Step 5: Verify build + overflow**

```bash
cd slides && npm run build
```
Then via claude-in-chrome open `http://localhost:1948/10_Claude_Code_Workflows/?overflow` (after `npm run serve`) and confirm no overflow outlines on the eight new slides.

- [ ] **Step 6: Commit**

```bash
git add slides/10_Claude_Code_Workflows/index.md
git commit -m "W10: add Specs Before Plans section; fix stale best-practices URLs"
```

---

### Task 10: Course artifacts — memory, HW4, schedule, readings

**Files:**
- Modify: `course/COURSE_MEMORY.md:107` (W10 row), `:484-522` (HW4)
- Modify: `course/assignments/hw4-claude-code-workflow-tdd.md:22-33` (Part 2), `:54-69` (deliverables + rubric)
- Modify: `course/schedule.md:55`
- Modify: `course/readings.md:253-270`

- [ ] **Step 1: `COURSE_MEMORY.md` W10 topic bullets**

Insert `• **Spec-driven development** (interview → SPEC.md → plan; spec-first/anchored/as-source; Spec Kit)` as the **first** bullet in the W10 Topics cell, before `• Explore → Plan → Implement → Commit workflow`.

- [ ] **Step 2: `COURSE_MEMORY.md` HW4 section**

In "Part 2: Explore → Plan → Implement → Commit (30%)", retitle to `Part 2: Spec → Explore → Plan → Implement → Commit (30%)` and add as the first sub-bullet:

```markdown
- **Spec:** Run the interview prompt, commit `SPEC.md` **before** any implementation commit
```

Add to the reflection questions: `- Did the written spec change what you built, compared to going straight to a plan?`

Rubric line `Explore→Plan→Implement→Commit workflow: 30%` → `Spec→Explore→Plan→Implement→Commit workflow: 30%`. **Total weight unchanged at 5%.**

- [ ] **Step 3: `hw4-claude-code-workflow-tdd.md`**

Same three edits in the assignment file: Part 2 heading and first requirement, a `SPEC.md` line in Deliverables, and the rubric row rename. Add the four criteria as the grading standard for the spec sub-part.

- [ ] **Step 4: `schedule.md` W10 row**

Prepend `Spec-driven development (interview → SPEC.md → plan, spec-first/anchored/as-source), ` to the W10 topics cell. Keep the row on one line (the file uses single-line pipe rows).

- [ ] **Step 5: `readings.md` Week 10**

Add a `**Spec-Driven Development**` table before `**TDD & CI/CD**` with three rows:

```markdown
| Resource | Description | URL |
|----------|-------------|-----|
| Claude Code Best Practices — "Let Claude interview you" | The interview prompt and what makes a spec self-contained | https://code.claude.com/docs/en/best-practices |
| Harness Design for Long-Running Apps | Planner/generator/evaluator, sprint contracts, context resets | https://www.anthropic.com/engineering/harness-design-long-running-apps |
| Böckeler, "Spec-driven development: 3 levels" | spec-first → spec-anchored → spec-as-source, and the MDD warning | https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html |
```

- [ ] **Step 6: Verify the four artifacts agree**

Run: `grep -rn "Spec" course/schedule.md course/COURSE_MEMORY.md | grep -i "week 10\|^course/schedule.md:55\|Spec→"`
Expected: W10 topic strings mention spec-driven development in both files.

- [ ] **Step 7: Commit**

```bash
git add course/COURSE_MEMORY.md course/assignments/hw4-claude-code-workflow-tdd.md course/schedule.md course/readings.md
git commit -m "Course: add SDD to W10 topics, HW4, schedule, readings"
```

---

### Task 11: Website timeline + regenerate

**Files:**
- Modify: `website/timeline.js` (W10 `weeklyFocus`)
- Modify: `website/index.pug` (W10 schedule row)
- Regenerate: `website/index.html`

**⚠️ `website/` is a symlink into the `homepageJohnGuerra` repo. Pull before editing. Commit there with explicit pathspecs. DO NOT PUSH.**

- [ ] **Step 1: Pull the website repo first**

```bash
cd /Users/aguerra/workspace/homepageJohnGuerra && git pull --ff-only
```
Expected: up to date or fast-forwarded. It receives student-PR merges, so a stale checkout is likely.

- [ ] **Step 2: Update `weeklyFocus[10]`**

```javascript
    10: {
      topic: "Claude Code Workflows & TDD",
      project: "P3: Sprint 1",
      action: "Complete HW4, spec-driven TDD with Claude Code",
    },
```

- [ ] **Step 3: Update the W10 row in `index.pug`**

Run: `grep -n "Claude Code Workflows" website/index.pug` to locate, then add spec-driven development to the topics text. **Do not edit `index.html`.**

- [ ] **Step 4: Regenerate**

```bash
cd /Users/aguerra/workspace/aiCoding_Course && npx pug website/index.pug --out website/ --pretty
```
Expected: `rendered website/index.html`.

- [ ] **Step 5: Verify the regenerated HTML contains the change**

Run: `grep -c "spec-driven\|Spec-Driven" website/index.html`
Expected: ≥ 1.

- [ ] **Step 6: Commit in the website repo — no push**

```bash
cd /Users/aguerra/workspace/homepageJohnGuerra
git add classes/aiCoding_fall_2026/timeline.js classes/aiCoding_fall_2026/index.pug classes/aiCoding_fall_2026/index.html
git commit -m "aiCoding fall 2026: add spec-driven development to W10"
```
**Stop here. Do not push — CLAUDE.md requires explicit approval.**

---

### Task 12: Cross-artifact verification

**Files:** none modified unless a check fails.

- [ ] **Step 1: Run the sync skill**

Invoke the `sync-course` skill. Expected: W10 topics consistent across `schedule.md`, `readings.md`, `COURSE_MEMORY.md`, `timeline.js`, `index.pug`, and `slides/10_*`.

- [ ] **Step 2: Run the reference verifier**

Invoke the `verify-references` skill against `docs/research/spec-driven-development.md` and the edited `ai_coding_course_sota_2026.md` §2.2. Expected: all URLs 200; every numeric claim (124.3k stars, ~70%/~80%) carries a source.

- [ ] **Step 3: Full build of both deck sets**

```bash
cd slides && npm run build && npm run build:workshop
```
Expected: both exit 0.

- [ ] **Step 4: Visual overflow pass**

Via **claude-in-chrome** (never Playwright — `CLAUDE.md`), check `?overflow` on workshop S2, S3 and course deck 10. Expected: no dashed-orange outlines, no raw `| ... |` tables on any slide added in T4–T9.

- [ ] **Step 5: Report**

State plainly which checks passed, which failed with their output, and anything left undone. Do not claim completion for a step whose command was not run.

---

## Self-Review

**Spec coverage:** D1 → T1. D2 → T2, T3. D3 → T4. D4 → T5, T6, T7. D5 → T8, T9, T10, T11. D6 → T12. All six deliverables have tasks.

**Out-of-scope respected:** No task installs Spec Kit, teaches Planner/Generator/Evaluator beyond a pointer (T9 Step 2.8), or touches S2's permission-modes table.

**Naming consistency:** "two altitudes", "the four criteria", "trigger rule", `SPEC.md`, Part numbering 1–5 in S3 — used identically across T4, T5, T6, T7, T9.

**Known deviation from the skill's default:** this repo has no unit-test harness for prose, so each task's verification step is a build, a `grep` invariant, a URL status check, or a browser overflow check rather than a red/green test cycle. Every task still ends with an independently checkable deliverable and a commit.

**Risk carried forward from the spec:** S3 timing. T7 handles it with an explicit cut-line rather than assuming the 15 minutes are free.
