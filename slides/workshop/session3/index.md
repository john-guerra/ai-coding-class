---
title: "Workshop S3 — Build & Verify + Skills & Hooks"
theme: white
revealOptions:
  transition: convex
  hash: true
  history: true
---

<!-- .slide: id="title" -->

<span class="course-week">Workshop · Session 3 of 4</span>

## Build & Verify

### Speed *with* Quality

Build & Verify + Extensibility I

[**John Alexis Guerra Gomez**](http://johnguerra.co/)

<small>A hands-on workshop on AI-assisted software engineering</small>

---

# What We'll Cover Today

1. Recap — the CLAUDE.md we wrote last session
2. **Explore → Plan → Implement → Commit** (EPIC)
3. **TDD** with Claude Code — the quality thesis
4. Reviewing AI output — the **70% problem**
5. Extensibility I — **skills + hooks** (solo lab)

<small>Session 3 goal: run the core **spec → TDD → build** loop without letting the agent grade its own work.</small>

---

# Recap — From S2

> Last time we made Claude Code **remember your project**.

<!-- vertical -->

## We Wrote a CLAUDE.md

For **Linkstash** — our small link-saver app — we captured:

- Project structure and stack
- Commands (test, lint, dev server)
- Conventions the agent should always follow

**Today we don't write it. We *use* it.** Every prompt in this session runs against a project the agent already understands.

---

# Part 1 — Explore → Plan → Implement → Commit

> The core workflow. Slow down to speed up.

---

## The EPIC Loop

<pre class="mermaid">
%%{init: {'theme': 'default', 'flowchart': {'nodeSpacing': 20, 'rankSpacing': 30}}}%%
flowchart LR
  A["EXPLORE"] --> B["PLAN"]
  B --> C["IMPLEMENT"]
  C --> D["COMMIT"]
</pre>

Each phase is a **checkpoint** — a chance to catch the agent before a mistake compounds.

<!-- vertical -->

## Why Four Phases

| Phase | Catches the wrong... |
|---|---|
| **Explore** | assumptions |
| **Plan** | approaches |
| **Implement** | code |
| **Commit** | scope |

> Redirecting a plan is far cheaper than fixing shipped code.

---

## Phase 1 — Explore

Let the agent build a mental model **before** it touches anything.

```text
> Explore the codebase and explain the project structure
```

- Read-only — no edits yet.
- Ask follow-ups: "Where does saved-link state live?"
- Correct wrong assumptions **now**, while they're cheap.

<!-- vertical -->

## Phase 2 — Plan

Ask for a plan, then **read it like a code review**.

```text
> (plan) Add tag filtering to the saved-links list
```

The agent proposes a step-by-step approach. You **review and approve** — or redirect the approach before a single line is written.

<!-- vertical -->

## Phase 3 — Implement

Approve the plan, then let it build.

- Claude Code creates/modifies files and runs the tests.
- It fixes issues along the way.
- You watch the checkpoints, not every keystroke.

<!-- vertical -->

## Phase 4 — Commit

Ship a clean, atomic commit.

```text
> Create a commit for the tag-filtering feature
```

Claude Code stages the relevant files and writes a descriptive message. One feature = one reviewable commit.

<!-- vertical -->

## The `/clear` Trick

<pre class="mermaid">
%%{init: {'theme': 'default', 'flowchart': {'nodeSpacing': 15, 'rankSpacing': 20}}}%%
flowchart LR
  A["EXPLORE"] -->|"save to file"| B["PLAN"]
  B -->|"save to file"| C["/clear"]
  C --> D["IMPLEMENT"]
</pre>

`/clear` between phases resets the context window. Your **findings and plans persist in files**, not in chat history — so you tackle tasks bigger than the context window.

---

# Part 2 — TDD with Claude Code

> The heart of the quality thesis.

---

## Tests Are the Specification

Don't ask the AI to write code *and* the tests that judge it.

> The failing test becomes the **specification**. You own the spec; the AI owns the implementation — so it **can't validate its own bugs**.

<!-- vertical -->

## RED → GREEN → REFACTOR

<pre class="mermaid">
%%{init: {'theme': 'default', 'flowchart': {'nodeSpacing': 20, 'rankSpacing': 30}}}%%
flowchart LR
  A["RED: you write a failing test"] --> B["GREEN: agent implements to pass"]
  B --> C["REFACTOR: clean up, tests stay green"]
  C --> A
</pre>

The division of labor is the whole point: **human writes the spec, AI writes the code.**

<!-- vertical -->

## The Workflow

1. **You** write a failing test — `url-validator.test.js`
2. **Commit** the failing test
3. **Claude Code** implements the code
4. Tests pass → commit
5. Refactor → tests still green → commit

<!-- vertical -->

## The Load-Bearing Prompt

Say this **verbatim** — the last sentence is doing the work:

```text
> The tests in url-validator.test.js are failing.
  Implement the code to make them pass.
  Do not modify the tests.
```

Without *"Do not modify the tests,"* a stuck agent may "fix" the failure by weakening your spec.

<!-- vertical -->

## The Verification Gap

The agent will often **declare done before the suite confirms it**.

```text
Agent: "Done! The validator now handles all cases."
You:   npm test
       ✗ 2 failing
```

> The scarce skill isn't typing. It's **verification under throughput pressure.** Trust the green bar, not the agent's summary.

<!-- vertical -->

## Going Further (optional)

- **Property-based testing** — generate hundreds of random inputs instead of a handful of examples.
- **Mutation testing** — deliberately break the code and check your tests *catch* it.

<small>Both attack the same weakness: tests that pass without actually verifying behavior.</small>

---

# Part 3 — Reviewing AI Output

> Where the real work lives.

---

## The 70% Problem

<div class="columns">
<div class="column">

**AI nails the first 70%**

- Scaffolding
- Happy path
- Boilerplate
- *Fast, and it looks done*

</div>
<div class="column">

**The last 30% is the work**

- Edge cases
- Security
- Integration
- *Where cost hides*

</div>
</div>

> "Looks done" and "is done" are separated by exactly the part the demo never shows.

<!-- vertical -->

## Sampling vs Comprehensive

| Review style | When | Risk |
|---|---|---|
| **Sampling** — skim, spot-check | Low-stakes, throwaway | Misses the 30% |
| **Comprehensive** — read every line | Auth, money, data, migrations | Slower, but the only safe choice |

**Rule:** the more autonomous the agent was, the more comprehensive your review must be.

<!-- vertical -->

## Hunt the Planted Bug (10 min)

The Linkstash starter ships with **one subtle planted bug**.

1. Open the starter and read the diff comprehensively.
2. Don't run it yet — find it by **reading**.
3. Then write a **failing test** that exposes it.
4. Hand the failing test to Claude Code to fix.

> This is the whole session in miniature: *read → spec → let the agent fix.*

---

# Part 4 — Extensibility I: Skills + Hooks

> Teach the agent your recipes; enforce your rules.

---

## What Are Skills?

A skill is a folder in `.claude/skills/<name>` that becomes a `/name` command — a **reusable recipe** your whole team shares.

```text
your-project/
  .claude/skills/
    fix-issue/SKILL.md      <-- "/fix-issue"
    deploy/SKILL.md         <-- "/deploy"
```

Type `/fix-issue`, and Claude Code loads the recipe and follows it.

<!-- vertical -->

## Anatomy of a Skill

<!-- .slide: class="dense" -->

<pre><code class="yaml">---​
name: fix-issue
description: "Fix a GitHub issue: branch, implement, test, PR."
disable-model-invocation: true
---​
Fix GitHub issue $ARGUMENTS:
1. Read issue details
2. Create branch fix/{issue-number}
3. Implement following project conventions
4. Write/update tests
5. Run the test suite
6. Create a PR linking the issue

Constraints:
- Never modify unrelated files
- Always include a test for the fix
</code></pre>

`disable-model-invocation: true` means it runs **only** when you type `/fix-issue` — good for anything destructive.

---

## What Are Hooks?

Hooks run **shell commands** at lifecycle points. Unlike CLAUDE.md (advisory), hooks are **deterministic** — they always fire.

| Event | Fires... |
|---|---|
| **PreToolUse** | before a tool runs |
| **PostToolUse** | after a tool completes |
| **Stop** | before the agent's final reply |

<!-- vertical -->

## Exit Codes

| Exit code | Effect |
|---|---|
| **0** | Continue normally |
| **2** | **Block** the tool; stdout is fed back to Claude |
| other | Error reported, execution continues |

> Exit code **2** is the power move — a hook can *reject* an action and explain why.

<!-- vertical -->

## Wiring Two Hooks

`.claude/settings.json`:

```json
{ "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "command": "npx prettier --write $CLAUDE_FILE_PATH"
    }],
    "PreToolUse": [{
      "matcher": "Edit|Write",
      "command": "bash .claude/hooks/check-protected.sh"
    }]
} }
```

Auto-format on every edit; guard protected files before every edit.

<!-- vertical -->

## The Protected-File Guard

`.claude/hooks/check-protected.sh`:

```bash
#!/bin/bash
PROTECTED=(".env" "secrets.json")
for p in "${PROTECTED[@]}"; do
  if [[ "$CLAUDE_FILE_PATH" == *"$p"* ]]; then
    echo "BLOCKED: cannot edit $p"; exit 2
  fi
done
exit 0
```

`exit 2` blocks the edit and tells Claude *why*. `exit 0` lets it through.

---

## Advisory vs Deterministic

<!-- .slide: class="dense" -->

| | CLAUDE.md | Hook |
|---|---|---|
| **Enforcement** | Advisory — AI *should* follow | Deterministic — always runs |
| **Reliability** | ~90% (can be forgotten) | 100% (guaranteed) |
| **Mechanism** | Natural-language instruction | Shell command + exit code |
| **Best for** | Conventions, style, context | Formatting, access control |

> If you'd be **upset when the rule is broken**, use a hook. If Claude should **always know** it, put it in CLAUDE.md.

---

## Lab — Build Your Toolkit (30 min)

<!-- .slide: class="dense" -->

Solo, on **Linkstash**:

1. **Skill** — create `.claude/skills/add-link-feature/SKILL.md` with a description, steps, and constraints. Invoke it with a slash command.
2. **Hooks** — add the Prettier PostToolUse hook and the protected-file PreToolUse guard.
3. **Test them** — edit a file, confirm Prettier runs; try to edit `.env`, confirm the edit is **blocked** (exit 2).

<small>Success = a slash command that works and a `.env` edit that gets rejected.</small>

---

# Wrap-Up

<!-- vertical -->

## What to Remember

1. **EPIC** — Explore, Plan, Implement, Commit. Checkpoints catch mistakes early.
2. **TDD** — you own the spec, the AI owns the code; mind the **verification gap**.
3. **70% problem** — the last 30% is the real work; review comprehensively.
4. **Skills = recipes**; **hooks = rules** you can't afford to have forgotten.

<!-- vertical -->

## Before Session 4

- Keep your Linkstash skill and hooks committed — we build on them.
- Skim the MCP docs so the term isn't brand new.

> Next time: **connect real tools with MCP, delegate to subagents, then secure it all.**

---

<!-- .slide: id="thanks" -->

## See you in Session 4

**MCP, Subagents & Security**

<small>[johnguerra.co](http://johnguerra.co/)</small>
