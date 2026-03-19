---
title: "Claude Code: Agentic AI in Your Terminal"
theme: white
revealOptions:
  transition: convex
  hash: true
  history: true
---

<!-- .slide: id="title" -->

# Claude Code

## Agentic AI in Your Terminal

*1:15 – 2:00 (45 min)*

---

# What We'll Cover

1. How Claude Code works (the agentic loop)
2. CLAUDE.md — your project's constitution
3. Live demo: feature addition with TDD
4. The Explore → Plan → Implement → Commit workflow
5. What to try first + Resources

---

# How Claude Code Works

> An agent, not a chatbot

<!-- Note: This is the biggest mindset shift. Ask the audience: "What's the difference between a chatbot and an agent?" -->

<!-- vertical -->

## The Agentic Loop

Claude Code runs in a **continuous loop** — reads, thinks, acts, verifies.

<pre class="mermaid">
%%{init: {'theme': 'default', 'flowchart': {'nodeSpacing': 20, 'rankSpacing': 30}}}%%
flowchart LR
    A["Your Prompt"] --> B["Think"]
    B --> C["Use a Tool"]
    C --> D["Observe Result"]
    D --> E{"Done?"}
    E -- No --> B
    E -- Yes --> F["Response"]
</pre>

It keeps going until the task is complete — or it hits a blocker and asks you.

<!-- vertical -->

## Built-in Tools

<!-- .slide: class="dense" -->

| Tool | What it does |
|------|-------------|
| **Read** | Read any file in your project |
| **Edit** | Make targeted, precise edits |
| **Write** | Create new files from scratch |
| **Bash** | Run shell commands (`npm test`, `git status`) |
| **Glob** | Find files by pattern (`**/*.test.ts`) |
| **Grep** | Search inside files |
| **WebFetch** | Pull docs, check an API |

Claude Code chains these automatically. You describe the goal — it figures out the steps.

<!-- vertical -->

## IDE Chat vs Claude Code

<!-- .slide: class="dense" -->

| | IDE Chat (Copilot/Cursor) | Claude Code |
|---|---|---|
| **Interface** | Editor sidebar | Terminal |
| **Interaction** | Turn-by-turn | Agentic loop |
| **File access** | Current file + context | Full project via tools |
| **Shell access** | None | Full Bash |
| **You do** | Drive each step | Set goal, approve changes |
| **Best for** | Focused inline edits | Multi-file, automation |

<!-- vertical -->

## The Key Insight

**Claude Code is an _agent_, not a chatbot.**

- A chatbot waits after every response
- An agent takes initiative — reads files, writes tests, fixes errors, keeps going

You shift from **driving** to **supervising**.

This requires new skills:
- Writing clear goals (not step-by-step instructions)
- Reviewing changes (not writing code yourself)
- Knowing when to intervene vs. let it continue

---

# CLAUDE.md

> Your project's constitution

<!-- Note: CLAUDE.md is the single most important concept. A well-written CLAUDE.md is the difference between Claude Code doing great work and going sideways. -->

<!-- vertical -->

## What is CLAUDE.md?

A plain text file at the root of your project that Claude Code reads on every startup.

Think of it as the **onboarding doc you'd give a new engineer** — except Claude Code actually follows it.

```text
my-project/
├── CLAUDE.md        ← Claude reads this first
├── src/
├── tests/
└── package.json
```

<!-- vertical -->

## What Goes in CLAUDE.md

```markdown
# My Project

## Overview
A Node.js REST API for managing todo items.
Uses Express, in-memory storage, Jest for tests.

## Build Commands
- `npm install` — install dependencies
- `npm test` — run tests
- `npm start` — start server on port 3000

## Architecture
- src/app.js — Express app, routes, in-memory store
- src/app.test.js — test suite

## Code Style
- Use async/await (no raw promises)
- Tests before implementation (TDD)
- Descriptive variable names, no abbreviations
```

<!-- vertical -->

## The CLAUDE.md Effect

Data from HumanLayer (2025):

| CLAUDE.md length | Rule-application rate |
|---|---|
| **< 200 lines** | **> 92%** |
| 200–400 lines | ~81% |
| **400+ lines** | **~71%** |

**Less is more.** Focused rules followed > comprehensive rules ignored.

*Start small. Grow it over time as you discover what Claude needs to know.*

<!-- vertical -->

## CLAUDE.md is a Living Document

After every session, ask yourself:

> "What did I have to correct Claude Code on? Should that be in CLAUDE.md?"

Add your team's conventions, testing strategy, branch naming, anything that would go into a team onboarding doc.

<!-- Note: Reference the W10 slide content: participants should treat CLAUDE.md as an evolving artifact, not a one-time setup. -->

---

# Live Demo

> Adding a feature with Claude Code + TDD

<!-- Note: DEMO - 15 minutes. Have the terminal open with the workshop starter app ready. -->

<!-- vertical -->

## The Setup

We have a simple todos API:

```bash
GET    /todos          # list all todos
POST   /todos          # create a todo
PUT    /todos/:id      # update a todo
DELETE /todos/:id      # delete a todo
```

Tests are already passing. Now we want to **add priority support**.

<!-- Note: DEMO - Show the running app: `curl http://localhost:3000/todos` -->

<!-- vertical -->

## Step 1: Start Claude Code

```bash
cd workshop-starter
claude
```

Claude Code scans the project, reads CLAUDE.md, shows a prompt.

<!-- Note: DEMO - Show claude starting up, reading CLAUDE.md -->

<!-- vertical -->

## Step 2: Give It a Goal

```text
> Add a "priority" field to todos (low/medium/high).
  GET /todos should support ?priority=high filtering.
  Use TDD — write the tests first.
```

Watch what happens:

1. It reads `src/app.js` to understand the data model
2. It writes tests in `src/app.test.js`
3. It runs `npm test` — tests fail (expected!)
4. It implements the feature
5. It runs `npm test` — tests pass
6. It reports what it did

<!-- Note: DEMO - Let it run. Point out each step as it happens. -->

<!-- vertical -->

## Step 3: Review the Changes

Claude Code shows you exactly what it changed.

```bash
git diff
```

Your job: **review, not rewrite**.

- Does the logic make sense?
- Are the tests meaningful?
- Any edge cases missed?

If something's wrong: *tell Claude Code what to fix*, don't fix it yourself.

<!-- Note: DEMO - Walk through the diff. Ask audience: "What would you check first?" -->

<!-- vertical -->

## What Just Happened

- No manual test writing
- No manual implementation
- No manual debugging (it fixed its own failures)
- You described the *what* — it handled the *how*

This is the shift. You become the **architect and reviewer**, not the typist.

---

# The Workflow

> Explore → Plan → Implement → Commit

<!-- vertical -->

## Four Phases for Every Feature

<pre class="mermaid">
%%{init: {'theme': 'default', 'flowchart': {'nodeSpacing': 20, 'rankSpacing': 30}}}%%
flowchart LR
    A["EXPLORE"] --> B["PLAN"]
    B --> C["IMPLEMENT"]
    C --> D["COMMIT"]
</pre>

Anthropic's recommended pattern. Each phase has a different mental mode.

<!-- vertical -->

## EXPLORE

Understand the codebase before changing anything.

```text
> Explore the authentication system. What middleware
  is used? How are sessions managed? Where are the
  route guards?
```

Claude Code reads, traces, summarizes. You get a mental model without touching code.

```text
> Save your findings to docs/auth-analysis.md
> /clear
```

*Always explore with a fresh context window before a complex task.*

<!-- vertical -->

## PLAN

Design before you build.

```text
> Based on docs/auth-analysis.md, plan how to add
  OAuth login. List the files to change and why.
  Don't write any code yet.
```

Review the plan. Ask for changes. Only proceed when you're happy.

```text
> Looks good. Now implement it.
```

*The plan lives in context — or save it to a file for large tasks.*

<!-- vertical -->

## IMPLEMENT

Let Claude Code do the work. Your role: supervise and approve.

- Watch the agentic loop run
- Approve tool use when prompted
- Intervene when it goes sideways
- Don't micro-manage — let it think

<!-- vertical -->

## COMMIT

Claude Code writes commit messages too.

```text
> Commit the changes with a descriptive message
```

Or it does it automatically if CLAUDE.md says to.

Check the diff before committing. The commit message is a record of what happened and why.

---

# What to Try This Week

> Three concrete next steps

<!-- vertical -->

## This Week

**1. Build an artifact in claude.ai**

Go to claude.ai, start a new conversation:
```text
Build me a personal expense tracker. I can add expenses
with a category and amount. Show me a pie chart of
spending by category.
```
Spend 20 minutes iterating on it.

<!-- vertical -->

## This Week (cont.)

**2. Install Claude Code**

```bash
npm install -g @anthropic-ai/claude-code
```

Open a project you're already working on:
```bash
cd my-project
claude
```

Ask it: `"Explain the architecture of this project"`

<!-- vertical -->

## This Week (cont.)

**3. Write a CLAUDE.md**

In your current project:

```bash
touch CLAUDE.md
```

Add:
- What the project does (2 sentences)
- How to run it and test it
- One code convention you care about

That's it. Start there. Grow it as you use it.

---

# Wrap-up

<!-- vertical -->

## The Bigger Picture

AI coding tools exist on a spectrum:

```text
Autocomplete → Chat → Pair programmer → Autonomous agent
```

We're moving quickly toward the **right end** of that spectrum.

The engineers who thrive aren't the ones who fight this shift — they're the ones who get good at:

- **Writing clear goals** (prompting is a skill)
- **Reviewing AI output** (critical thinking > typing speed)
- **Building quality systems** (TDD, CI/CD, evals — still matter, maybe more than before)

<!-- vertical -->

## It's Not About Replacing Skill

> "It's not about replacing coding skill — it's about amplifying it."

A doctor who uses diagnostic AI well is *more* valuable, not less.

An engineer who uses AI coding tools well ships faster, catches more bugs, and handles more complexity.

The skill floor lowers. The ceiling rises.

<!-- vertical -->

## Resources

| Resource | URL |
|---|---|
| **Claude Web** | claude.ai |
| **Claude Code docs** | code.claude.com/docs |
| **Claude Code install** | `npm install -g @anthropic-ai/claude-code` |
| **Prompt engineering guide** | docs.anthropic.com/en/docs/build-with-claude/prompt-engineering |
| **Claude Code best practices** | code.claude.com/docs/best-practices |

<!-- vertical -->

## Q&A

**Suggested questions to get started:**

- "What's the biggest mistake people make with Claude Code?"
- "How do you know when to intervene vs. let it continue?"
- "What about security — is it safe to give an AI shell access?"
- "Does this work for non-JavaScript projects?"

<!-- Note: Keep Q&A focused. If a question needs a demo, do it — that's often the most memorable part. -->
