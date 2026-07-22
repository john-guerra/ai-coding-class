---
title: "Workshop S2 — Context, Memory & Modes"
theme: white
revealOptions:
  transition: convex
  hash: true
  history: true
---

<!-- .slide: id="title" -->

<span class="course-week">Workshop · Session 2 of 4</span>

## Driving Claude Code

### Context, Memory & Modes

Set up memory · choose a mode *deliberately*

[**John Alexis Guerra Gomez**](http://johnguerra.co/)

<small>A hands-on workshop on AI-assisted software engineering</small>

---

# What We'll Cover Today

1. Recap, setup & the **agentic loop**
2. **Context engineering** — memory & the context hierarchy
3. **Agent engineering** — the modes tour
4. **Build-along** — a real `CLAUDE.md` for Linkstash

<small>Today needs Claude Code installed — we start driving.</small>

---

# Part 0 — Recap & Setup

> Last time: prompting. Today: make the agent **remember your project**.

---

## Setup Check (2 min)

Confirm Claude Code is installed and authenticated:

```bash
claude --version     # installed?
cd linkstash         # the project we use all workshop
claude               # start a session
/init                # generate a first CLAUDE.md
```

**Stuck?** Grab a neighbor or flag me now — everything today builds on this.

<!-- vertical -->

## Meet Linkstash

A tiny **link-saver** app we drive all workshop.

- Save a URL with a title + tags
- List and search saved links
- Small enough to hold in your head, real enough to break

> One project, four sessions. Today we teach the agent about it.

---

## Claude Code Is an Agent

<pre class="mermaid">
flowchart LR
  P[Your prompt] --> T[Think]
  T --> A[Act: use a tool]
  A --> O[Observe result]
  O --> D{Done?}
  D -- No --> T
  D -- Yes --> R[Respond]
</pre>

Not a chatbot — an **agent** that loops on its own. Your job shifts from **driving** to
**supervising**.

<!-- vertical -->

## Driving → Supervising

| Chatbot | Agent |
|---|---|
| You type every step | It plans its own steps |
| You paste in context | It reads files & runs tools |
| You copy output back | It writes files directly |

> The skill changes: from *typing* to **steering and verifying**.

---

# Part 1 — Context Engineering

> The model only knows what's in its context. Curate it.

---

## Prompt → Context → Loop

One rung up the Session 1 ladder:

```text
prompt engineering  →  context engineering  →  loop engineering
word ONE message       decide what the model     optimize the
well                   sees AT ALL               surrounding loop
                       include · retrieve ·      (Sessions 3–4)
                       compress · order
```

> Wording a message well is prompting. Deciding what the model gets to see *at all* is where real agent quality comes from.

---

<!-- .slide: class="dense" -->

## What the Harness Assembles Every Turn

```text
┌──────────── CONTEXT WINDOW · rebuilt every request ────────────┐
│                                                                │
│  1. SYSTEM PROMPT         "You are Claude Code…" identity,     │
│                           tool-use policy, safety rules        │
│                                                                │
│  2. PROJECT INSTRUCTIONS  ← CLAUDE.md / .cursorrules / AGENTS  │
│                           "Use TypeScript. Tests required."    │
│                                                                │
│  3. TOOL SCHEMAS          read_file, write_file, run_bash …    │
│                                                                │
│  4. RETRIEVED CONTEXT     @-mentioned files, search results    │
│                                                                │
│  5. CONVERSATION HISTORY  every prior msg + tool result        │
│                                                                │
│  6. CURRENT MESSAGE       "fix the failing test"               │
│                                                                │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                       predict next token
```

> Six sources, **one finite window**, assembled fresh every turn. Deciding what goes in it is context engineering.

---

<!-- .slide: class="dense" -->

## Three Layers, One Token Stream

| Layer | Who writes it | Scope |
|---|---|---|
| **System prompt** | Tool builder (Anthropic) | Every chat in the product |
| **Project instructions** (`CLAUDE.md`) | You, per repo | Every request in this project |
| **User message** | You, per turn | This one turn |

All three get **concatenated into one window**. The model doesn't truly separate "system" from "user" — the split is a **harness convention**, collapsed into one stream at send time.

> Same stream. Different authors, different scope.

---

## Memory: The CLAUDE.md Hierarchy

<pre class="mermaid">
flowchart TB
  G["~/.claude/CLAUDE.md<br/>(global · you)"] --> P["./CLAUDE.md<br/>(project root)"]
  P --> S["subdir/CLAUDE.md<br/>(local overrides)"]
</pre>

All three are loaded. On conflicts, **most specific wins** — the subdir overrides the root
overrides the global.

<!-- vertical -->

## What Goes in CLAUDE.md

- **Tech stack + versions** — "Node 20, React 18, Vitest"
- **Build / test commands** — how to run and verify
- **Architecture** — the 3-sentence tour
- **Conventions** — naming, structure, style
- **A "Do NOT" list** — the guardrails that matter

> **The test for every line:** would removing it make the model make a mistake? If not, cut it. Keep it under **~200 lines** — a briefing, not a manual.

<!-- vertical -->

## CLAUDE.md Is Not Magic Config

It's not a settings file the model "loads." It is **text prepended to your prompt** — item #2 in the context window, on every request.

- The model reads it exactly like the system prompt
- It "works" only because it's *in the window*
- It competes for the same token budget as your code

> No hidden mechanism. Just text, pasted in, every turn.

<!-- vertical -->

## Re-Sent Every Turn

The model is **stateless** — no memory between turns. The only way it obeys your rules on turn 12 is if they're in the window *on turn 12*.

```text
Turn 1:  [system][CLAUDE.md][tools][history][msg 1]  → response
Turn 2:  [system][CLAUDE.md][tools][history][msg 2]  → response
Turn 3:  [system][CLAUDE.md][tools][history][msg 3]  → response
          ▲          ▲
          └──────────┴── re-sent EVERY turn; the model
                         remembers nothing on its own
```

> The "session" is an illusion — the harness re-stuffs the window each round trip.

<!-- vertical -->

## Split with @imports

Keep the root file lean; pull in detail on demand:

```markdown
# CLAUDE.md
See @docs/architecture.md for the system tour.
Follow the style rules in @.config/conventions.md.
```

**Referenced files load only when relevant** — the root stays scannable.

---

<!-- .slide: class="dense" -->

## Same Concept, Different Filename

Every serious harness has a rules file:

| Tool | Rules file |
|---|---|
| **Claude Code** | `CLAUDE.md` |
| **Cursor** | `.cursorrules` |
| **Antigravity** | `.antigravityrules` |
| **Copilot** | `.github/copilot-instructions.md` |
| **Windsurf** | `.windsurfrules` |

<small>Learn the concept once; the filename is the only thing that changes.</small>

---

## The Context Hierarchy

What the agent sees, in priority order:

| # | Source | Weight |
|---|---|---|
| 1 | **Rules files** (CLAUDE.md) | Always included · highest |
| 2 | **Explicit @-references** | You pointed at it |
| 3 | **Current file** | What you're on |
| 4 | **Open tabs** | Ambient signal |
| 5 | **Project index / embeddings** | Best-effort recall |

> You control the top of the list. **Be explicit.**

<!-- vertical -->

<!-- .slide: class="dense" -->

## Retrieval, Not Dumping

The harness doesn't paste the whole repo — it **retrieves only relevant slices**.

- **Vector index** — code embedded as vectors; nearest-neighbor pulls the files that match your query (Cursor does exactly this)
- **Ordering matters** — models attend to the **start and end** more than the middle ("lost in the middle"). Put critical rules first or last.
- **Compression** — when history overflows, the harness **summarizes** old turns instead of dropping them blindly

> Curate and place — not dump.

---

<!-- .slide: class="dense" -->

## @-mentions

Pull exactly what you need into context:

| Mention | Pulls in |
|---|---|
| `@file` | A specific file |
| `@folder` | A directory of files |
| `@docs` | Documentation |
| `@codebase` | Semantic search over the repo |
| `@web` | A live web fetch |
| `@git` | Diffs, history, blame |

<small>Explicit beats ambient — an `@file` outranks a merely open tab.</small>

> `@file` is **you doing manual context engineering** — telling the harness exactly what to retrieve.

---

## Managing Context

| Command | Does | Metaphor |
|---|---|---|
| `/clear` | Throw everything away | Close all browser tabs |
| `/compact` | Keep only what matters | Tidy the desk |
| `/context` | Show what's loaded now | Check your tabs |

> Context is a **budget**, not a bucket. Spend it deliberately.

<small>`/compact` is **summarization** — the same move the harness makes automatically when history overflows the window.</small>

<!-- vertical -->

## Document-Then-Implement

Findings persist in **files**, not in context:

<pre class="mermaid">
flowchart LR
  E[Explore] --> W[Write findings<br/>to a doc]
  W --> C1[/clear/]
  C1 --> Pl[Plan<br/>from the doc]
  Pl --> C2[/clear/]
  C2 --> I[Implement]
</pre>

Each `/clear` resets the noise; the **doc** carries the signal forward.

<!-- vertical -->

## Anti-Pattern: Context Stuffing

> "I'll just paste the whole repo in so it has everything."

- More tokens ≠ more understanding.
- Every extra line **competes with your code** for the same finite window — on *every* request.
- Signal drowns in noise → **"lost in the middle"** (S1).
- Slower, pricier, *worse* answers.

**Instead:** curate. A tight `CLAUDE.md` + targeted `@mentions`.

---

# Part 2 — The Modes Tour

> A **mode is a leash setting** — same model, different harness config.

---

<!-- .slide: class="dense" -->

## IDE Autonomy Modes (the on-ramp)

| Mode | Autonomy | Does | Your control |
|---|---|---|---|
| **Ask** | Lowest | Explains code · never edits | Read-only |
| **Write** | Medium | Edits you review | Accept / reject |
| **Agent** | High | Multi-step, multi-file | Approve the plan |
| **Plan** | Guided | Plans *first* | Review before run |

<small>Antigravity & Cursor expose these. Good intuition before Claude Code's model.</small>

---

<!-- .slide: class="dense" -->

## Claude Code Permission Modes

Autonomy = **which actions need a "yes":**

| Mode | Behavior | When |
|---|---|---|
| **Ask each time** | Prompts `y/n/always` | New / untrusted repo |
| **Allowlist** | Pre-approve safe cmds | Known repo |
| **Plan mode** | No edits until approved | Risky / >3 files |
| **Auto mode** | Approve safe, surface risky | Trusted env |
| **YOLO / bypass** | Approve ~everything | Sandboxes / CI only |

> **Start restrictive, widen as trust builds.**

<!-- vertical -->

## Plan Mode Is the Pro Habit

`Shift+Tab` → the agent explores and proposes a plan, **makes no edits** until you approve.

- Separates the **what** (yours) from the **how** (the agent's)
- A review checkpoint *before* any file changes
- Highest-leverage habit for unfamiliar or risky work

> Pair a wide leash with `claude --sandbox` — autonomy ≠ unbounded blast radius.

---

## Auto Mode (NEW, 2026)

**The problem it solves:** Claude Code users approve **~93%** of permission prompts.

<pre class="mermaid">
flowchart LR
  A[93% approved] --> F[Approval fatigue]
  F --> R[Rubber-stamping<br/>= less oversight]
</pre>

An oversight feature that inverts into *less* oversight, because people stop reading what they
authorize.

<!-- vertical -->

## Auto Mode — 3 Tiers

Not "approve everything" — **triage**:

| Tier | Actions | Handling |
|---|---|---|
| 1 | Reads, navigation, todos | **Safe allowlist** |
| 2 | In-project file edits | Reviewable via version control |
| 3 | Shell, external, outside project | → **Transcript classifier** |

The classifier sees **only user messages + the executable payload** — not the agent's reasoning. So
the agent **can't talk itself into approval**.

<!-- vertical -->

## Auto Mode — The Honest Caveat

> **~17% false-negative rate** on real over-eager actions — about **1 in 6** dangerous actions slip
> through.

- Mostly: it can't verify how far your consent extends.
- **Not a drop-in replacement for careful human review** on high-stakes infrastructure.
- Enable: `claude auto-mode defaults`.

**Land it as calibrated trust — not maximal trust.**

---

## The Leash, End to End

<pre class="mermaid">
flowchart LR
  K[Ask each time] --> L[Allowlist]
  L --> Pl[Plan mode]
  Pl --> Au[Auto mode]
  Au --> Y[YOLO / sandbox]
</pre>

Slide **rightward as trust builds** — and keep oversight where the **blast radius is large**.

> The goal is **appropriate reliance**, not maximal trust.

---

# Part 3 — Build-Along

> Let's write a real `CLAUDE.md` for Linkstash — together.

---

## A Concrete CLAUDE.md

```markdown
# Linkstash

## Stack
Node 20 · Express · SQLite · Vitest · vanilla JS frontend

## Commands
- Install:  npm install
- Dev:      npm run dev      (http://localhost:3000)
- Test:     npm test         (Vitest, must pass before commit)

## Architecture
REST API in src/routes/ → services in src/services/ → SQLite via src/db.js.
Frontend in public/ talks to /api.

## Conventions
- ES modules, named exports
- One route file per resource

## Do NOT
- Do NOT commit secrets or edit .env
- Do NOT push directly to main
```

<!-- vertical -->

## Write It Live (10 min)

1. Ask Claude Code to draft it: *"Read the repo and propose a CLAUDE.md."*
2. **Edit it by hand** — you own the guardrails, especially the *Do NOT* list.
3. Keep it under ~200 lines. Cut anything the agent can infer.

> The agent can draft; **you** curate.

<!-- vertical -->

## Feel Each Leash (10 min)

Toggle **one** live action through every mode — e.g. "add a `/health` endpoint":

| Step | Mode | What you feel |
|---|---|---|
| 1 | **Ask** | It explains, edits nothing |
| 2 | **Allowlist** | Safe cmds run; edits still prompt |
| 3 | **Plan** | A plan appears; no edits yet |
| 4 | **Auto** | Safe steps flow; risky ones surface |

<!-- vertical -->

## Commit It

Lock in your project memory:

```bash
git add CLAUDE.md
git commit -m "Add Linkstash project memory for Claude Code"
```

**Now every future session starts already knowing the project.**

---

# Wrap-Up

<!-- vertical -->

## What to Remember

1. **Memory** — a tight `CLAUDE.md`; most-specific wins.
2. **Context is a budget** — curate, `/clear`, `/compact`, document-then-implement.
3. **A mode is a leash** — start restrictive, widen with trust.
4. **Auto mode** — calibrated trust, not maximal trust (the ~17%).

<!-- vertical -->

## Before Session 3 (pre-work)

- Make sure your **Linkstash `CLAUDE.md`** is committed.
- Skim the current Linkstash features — bring one you'd like to add.
- Try one task in **plan mode** before next time.

> Next time: **spec → tests → let the agent build to green.**

---

<!-- .slide: id="thanks" -->

## See you in Session 3

**Spec-Driven Development: TDD with the Agent**

<small>[johnguerra.co](http://johnguerra.co/)</small>
