---
title: "Claude Code Exercise: Agentic AI in Action"
theme: white
revealOptions:
  transition: convex
  hash: true
  history: true
---

<!-- .slide: id="title" -->

# Claude Code Exercise

## Agentic AI in Action

*4:30 – 7:30 (3 hours)*

---

# Afternoon Agenda

| Time | Block |
|------|-------|
| 4:30 – 4:40 | Install Claude Code |
| 4:40 – 4:55 | CLAUDE.md walkthrough |
| 4:55 – 5:00 | Exercise brief |
| 5:00 – 5:10 | Setup: fill in CLAUDE.md |
| 5:10 – 6:30 | Build: add priority support |
| 6:30 – 7:00 | Iterations: go deeper |
| 7:00 – 7:30 | Debrief + wrap-up |

---

# Install Claude Code

> One command. That's it.

<!-- vertical -->

## Installation

```bash
npm install -g @anthropic-ai/claude-code
```

Requires: **Node.js 18+**

Check your version:
```bash
node --version
# Should show v18.x.x or higher
```

<!-- Note: Give people 5 minutes here. Walk the room to help anyone with issues. -->

<!-- vertical -->

## Verify It Works

```bash
claude --version
```

That's all you need. Claude Code auto-updates in the background.

**Alternative:** VS Code extension (search "Claude Code") or the Claude Desktop app — same engine, different interface.

<!-- vertical -->

## What You'll Need

- Node.js 18+ ✓
- Claude Code installed ✓
- A claude.ai account ✓ (same credentials)
- The workshop starter app ✓

*Already have all of these? Help your neighbor.*

---

# CLAUDE.md

> Your project's constitution

<!-- vertical -->

## What is CLAUDE.md?

A plain text file at the root of your project.

Claude Code reads it on every startup — before doing anything else.

```text
my-project/
├── CLAUDE.md        ← Claude reads this first
├── src/
└── package.json
```

Think of it as the onboarding doc you'd write for a new team member. Except this team member actually reads it.

<!-- vertical -->

## The Starter CLAUDE.md

Open `examples/workshop-claude-code/CLAUDE.md`:

```markdown
# Workshop Todos App

## Project Overview
<!-- TODO: fill this in -->

## Build Commands
- npm install, npm test, npm start

## Architecture
- src/app.js — Express app, routes, in-memory store
- src/app.test.js — test suite

## Code Style
<!-- TODO: fill this in -->

## Testing Strategy
<!-- TODO: fill this in -->
```

<!-- vertical -->

## What Goes in Each Section

**Project Overview:** What does this do? 2-3 sentences. No jargon.

**Build Commands:** How to run it, test it, build it. Copy exact commands.

**Architecture:** What are the main files and what do they do?

**Code Style:** TDD? async/await? naming conventions? linting rules?

**Testing Strategy:** Where do tests live? What should always be tested?

<!-- vertical -->

## The CLAUDE.md Effect

From HumanLayer research (2025):

| Length | Rule-application rate |
|--------|----------------------|
| **< 200 lines** | **> 92%** |
| 200–400 lines | ~81% |
| 400+ lines | ~71% |

**Less is more.** Start small, grow it over time.

<!-- vertical -->

## CLAUDE.md is a Living Document

After every session, ask:

> "What did I correct Claude Code on? Should that be in CLAUDE.md?"

Add conventions as you discover them. Remove rules that don't matter.

*The best CLAUDE.md is the one you actually maintain.*

---

# The Agentic Loop

> How Claude Code works under the hood

<!-- vertical -->

## Think → Tool → Observe → Repeat

<pre class="mermaid">
%%{init: {'theme': 'default', 'flowchart': {'nodeSpacing': 20, 'rankSpacing': 30}}}%%
flowchart LR
    A["Your Prompt"] --> B["Think"]
    B --> C["Use a Tool"]
    C --> D["Observe Result"]
    D --> E{"Done?"}
    E -- No --> B
    E -- Yes --> F["Response to You"]
</pre>

You describe the goal. Claude Code figures out the steps.

<!-- vertical -->

## Built-in Tools

<!-- .slide: class="dense" -->

| Tool | What it does |
|------|-------------|
| **Read** | Read any file |
| **Edit** | Make targeted edits |
| **Write** | Create new files |
| **Bash** | Run commands (`npm test`, `git status`) |
| **Glob** | Find files by pattern |
| **Grep** | Search inside files |

For the exercise: you'll see it use Read → Write (tests) → Bash (npm test) → Edit → Bash (npm test again).

<!-- vertical -->

## You Shift from Driving to Supervising

| Before | After |
|--------|-------|
| Write tests | Review tests Claude wrote |
| Write implementation | Review implementation |
| Debug failures | Describe what's wrong |
| Google solutions | Ask Claude Code to explain |

Your most important skill: **knowing when to intervene vs. let it continue.**

---

# Exercise Brief

> Add priority support to the todos API

<!-- vertical -->

## The Starter App

A simple todos REST API. 10 tests, all passing.

```bash
cd examples/workshop-claude-code
npm install
npm test
```

Routes:
```text
GET    /todos       list all todos
POST   /todos       create a todo  { title }
PUT    /todos/:id   update a todo  { title?, completed? }
DELETE /todos/:id   delete a todo
```

<!-- vertical -->

## Your Task

**Add a `priority` field to todos.**

Requirements:
- New todos accept `priority`: `"low"`, `"medium"`, or `"high"`
- Default priority: `"medium"`
- `GET /todos?priority=high` filters by priority
- Invalid priority values return 400

**The prompt to use:**

```text
Add a "priority" field to todos (values: low, medium, high;
default: medium). GET /todos should support filtering by
?priority=high. Validate the priority value.
Use TDD — write the failing tests first, then implement.
```

<!-- vertical -->

## What Claude Code Will Do

1. Read `src/app.js` — understand the data model
2. Write failing tests for priority in `src/app.test.js`
3. Run `npm test` — tests fail (that's correct!)
4. Implement the priority field and filtering
5. Run `npm test` — tests pass
6. Report what it did

**Your role:** watch, approve tool calls, and review the result.

---

# Setup Phase

*5:00 – 5:10 (10 min)*

<!-- vertical -->

## Step 1: Navigate to the Starter

```bash
cd examples/workshop-claude-code
```

<!-- vertical -->

## Step 2: Fill in Your CLAUDE.md

Open `CLAUDE.md` and complete the three TODO sections:

1. **Project Overview** — what is this app?
2. **Code Style** — what do you care about?
3. **Testing Strategy** — how should tests work?

*Keep it under 200 lines. Focused > comprehensive.*

**5 minutes. Go.**

<!-- Note: Timer slide — give 5 minutes. Walk the room. Help people who are stuck on what to write. Remind them: write for a new engineer joining the team. -->

<!-- vertical -->

## Step 3: Start Claude Code

```bash
claude
```

Warm-up prompt to verify your CLAUDE.md is working:

```text
Explore this project and summarize its architecture.
```

Does Claude Code's summary match what you wrote? If not, update CLAUDE.md.

---

# Build Phase

*5:10 – 6:30 (80 min)*

<!-- Note: This slide stays up during the build phase. Walk the room. -->

<!-- vertical -->

## Give Claude Code the Task

```text
Add a "priority" field to todos (values: low, medium, high;
default: medium). GET /todos should support filtering by
?priority=high. Validate the priority value.
Use TDD — write the failing tests first, then implement.
```

Then: **watch and supervise.**

<!-- vertical -->

## What to Watch For

- **Which files does it read first?** (Should be src/app.js)
- **Does it write tests before the implementation?**
- **Does it run `npm test`?** (Should fail first, then pass)
- **Does it explain its decisions?**

<!-- Note: CHECKPOINT at 45 min — use the next slide -->

<!-- vertical -->

<!-- .slide: data-background="#fff3cd" -->

## ⏱ 45-Minute Check-In

**Turn to your neighbor:**

1. Did Claude Code follow your CLAUDE.md conventions?
2. What did it do that you didn't expect?
3. Did you intervene? Why?

*2 minutes, then continue.*

---

# Iteration Phase

*6:30 – 7:00 (30 min)*

<!-- vertical -->

## Go Deeper

Try one of these:

**Stats endpoint:**
```text
Add GET /todos/stats — returns count of todos by priority
({ low: 2, medium: 5, high: 1 }) and completion rate.
```

**Input sanitization:**
```text
Sanitize todo titles — strip leading/trailing whitespace
and reject titles over 200 characters.
```

**Completion shortcut:**
```text
Add PATCH /todos/:id/complete as a shortcut for marking
a todo complete. Should work alongside PUT /todos/:id.
```

---

# Debrief

*7:00 – 7:30*

<!-- Note: Use the next few slides to structure the debrief conversation -->

<!-- vertical -->

## What Surprised You?

*Full group share — 5 min*

- "I didn't expect it to..."
- "It wrote tests I wouldn't have thought of, like..."
- "I had to intervene when..."

<!-- vertical -->

## CLAUDE.md Retrospective

*Pairs — 3 min, then share*

1. Did your CLAUDE.md actually guide Claude Code?
2. What would you **add** now that you've used it?
3. What would you **remove** (too prescriptive, irrelevant)?

*Update your CLAUDE.md now, while it's fresh.*

<!-- vertical -->

## The Bigger Picture

You just experienced the shift:

| | Writing Code | Using Claude Code |
|---|---|---|
| **Time spent** | Typing | Reviewing |
| **Skill used** | Syntax | Judgment |
| **Bottleneck** | Typing speed | Clarity of goals |
| **Error source** | Bugs you write | Goals you under-specify |

**The skill that matters most:** writing clear goals and reviewing the result critically.

<!-- vertical -->

## What to Do This Week

1. **Install Claude Code** on a project you already work on
2. **Write a real CLAUDE.md** — spend 20 minutes on it
3. **Give Claude Code one real task** — not a toy
4. **Update CLAUDE.md** after that session based on what you had to correct
