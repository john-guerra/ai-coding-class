---
title: "AI-Assisted Coding: A Full-Day Workshop"
theme: white
revealOptions:
  transition: convex
  hash: true
  history: true
---

# AI-Assisted Coding

## A Full-Day Workshop

_From zero to building with AI — in 8 hours_

---

# Welcome

**What you'll do today:**

- Build a real personal tool using Claude Web
- Set up and use Claude Code as an autonomous agent
- Ship a working app to the web

No prior AI experience required. Bring curiosity and a laptop.

---

# Today's Agenda

| Block | Time | Topic |
|-------|------|-------|
| **W01** | 0:00–1:00 | Foundation: What AI coding actually is |
| **W02** | 1:15–3:45 | Claude Web: Build a personal tool |
| **W03** | 4:15–6:15 | Claude Code: Agentic workflows |
| **W04** | 6:30–8:00 | Ship it: Deploy, reflect, next steps |

_Breaks are built in. We'll stay on schedule._

---

# What You'll Have by the End

- A working personal app built with Claude Web
- Claude Code installed and configured
- A mental model for picking the right AI tool
- The habits that separate effective AI users from frustrated ones

---

# What AI Coding Actually Is

> _"You see something, say something, run it,_
> _and then fix it based on vibes."_
> — Andrej Karpathy

The ability to build software by _describing what you want_ and iterating.

<!-- vertical -->

## The Hype

Every week someone builds something impressive in 10 minutes.

- "Shipped a startup in a weekend"
- "Anyone can be a developer now"
- "10x productivity gains"

**All of these things have happened.**

<!-- vertical -->

## The Reality Check

Most "10 minute" demos:
- Took hours of iteration
- Don't handle real-world edge cases
- Have security vulnerabilities baked in
- Break the moment requirements change

The hype isn't wrong. The framing is wrong.

<!-- vertical -->

## The Right Framing

AI coding is powerful **when you know what you're doing.**

| Misconception | Reality |
|--------------|---------|
| AI writes the code, you just ask | You direct; AI drafts |
| One good prompt = working app | Fast iteration beats perfect prompts |
| Anyone can skip learning | Judgment still requires knowledge |
| AI replaces you | AI amplifies you |

<!-- vertical -->

## Turn to Your Neighbor

**Quick discussion (2 minutes):**

What's the most impressive thing you've seen someone do with AI?

What went wrong when you tried it yourself?

---

# The Three AI Modalities

Not all AI tools are the same. The best developers use them differently for different jobs.

<!-- vertical -->

## Modality 1: Claude Web

**The whiteboard with a mentor**

- Talk through problems conversationally
- Get full-page prototypes instantly
- Brainstorm, research, and plan
- No code editor required

**Best for:** New ideas, quick prototypes, learning something new

_We'll use this in blocks W02–W03 this morning._

<!-- vertical -->

## What Claude Web Looks Like

1. You open [claude.ai](https://claude.ai)
2. You describe what you want to build
3. Claude generates a working React app as an **Artifact**
4. You iterate: "add a search bar," "make it dark mode"
5. You keep refining until it does what you want

The whole thing runs in the browser. No setup required.

<!-- vertical -->

## Modality 2: IDE AI (Pair Programmer)

**AI lives inside your code editor**

- Autocomplete that understands your whole file
- Inline editing: select code → describe the change
- AI chat panel while you code
- Knows your project's context

Tools: GitHub Copilot, Cursor, Windsurf, Antigravity

**Best for:** Production code, projects with existing structure

_We'll mention this but won't focus on it today._

<!-- vertical -->

## Modality 3: Claude Code

**The autonomous agent in your terminal**

- You give it a goal, it figures out the steps
- Reads files, writes code, runs tests — on its own
- Loops until the task is done or it needs your input
- Full access to your project and shell

**Best for:** Multi-file changes, refactoring, automation, setup tasks

_We'll use this in block W03 this afternoon._

<!-- vertical -->

## The Decision Framework

```
"What am I actually trying to do?"
        |
        +---> Exploring an idea?        --> Claude Web
        |
        +---> Writing code in an editor?  --> IDE AI
        |
        +---> Changing many files at once? --> Claude Code
        |
        +---> Not sure yet?              --> Claude Web first
```

When in doubt, start with Claude Web. It's the fastest way to understand a problem.

<!-- vertical -->

## These Are Not Replacements

You don't stop using Claude Web when you add an IDE tool.
You don't stop using your IDE when you add Claude Code.

They stack. Each one handles a different layer of the work.

---

# The Mental Model Shift

This is the part that takes the most time to internalize.

<!-- vertical -->

## Chat Model

You type a message. You get a message back.

```
You: "Write me a function that sorts a list"
AI: "Here's a function: ..."
You: "Can you make it work for objects too?"
AI: "Updated version: ..."
```

You control every step. AI is a smart autocomplete.

<!-- vertical -->

## Pair Programmer Model

AI is sitting next to you. It can see your screen.

```
You select a function and press Cmd+K:
"Rewrite this to use async/await"

AI rewrites it inline.
You review the diff.
You accept or reject.
```

You still drive. AI handles the typing.

<!-- vertical -->

## Autonomous Agent Model

You describe a goal. AI runs a loop until it's done.

```
You: "Add user authentication to this Express app.
      Use JWT, add tests, update the README."

AI reads the codebase → plans → writes code →
runs tests → fixes failures → commits → done.
```

You supervise. AI drives.

<!-- vertical -->

## The New Skills

Moving from chat to agent requires different habits:

**Chat thinking:** "What should I say next?"
**Agent thinking:** "Is this going where I want? When should I step in?"

| Old habit | New habit |
|-----------|-----------|
| Writing code | Writing clear goals |
| Reading code | Reviewing diffs |
| Debugging | Knowing when to redirect |
| Doing the steps | Approving the plan |

<!-- vertical -->

## Turn to Your Neighbor

**Quick discussion (2 minutes):**

Think of a task you do regularly that involves editing files or running commands.

Which modality would you reach for? Why?

---

# Setup Check

Let's make sure everyone has what they need before we start building.

<!-- vertical -->

## What You Need for This Morning (W02)

**Claude.ai account** — free tier works

1. Go to [claude.ai](https://claude.ai)
2. Sign up or log in
3. You should see the main chat interface

_Raise your hand if you hit a problem_

<!-- vertical -->

## Create a Project

Claude Projects give your conversation persistent context.

1. In Claude Web, click **"Projects"** in the sidebar
2. Click **"New Project"**
3. Name it: `Workshop — Personal Tool`

This is where you'll build your app today.

<!-- vertical -->

## What You Need for This Afternoon (W03)

**Terminal access** + **Node.js 18+**

```bash
# Check your Node version
node --version
# Should show v18.x.x or higher
```

If you don't have Node.js: [nodejs.org/en/download](https://nodejs.org/en/download)

We'll install Claude Code together at the start of W03.

<!-- vertical -->

## Quick Orientation Poll

Raise your hand if:

- You've used Claude, ChatGPT, or a similar AI before
- You've used AI to help you write code
- You've built a web app before
- You've used a terminal/command line

_No wrong answers — this helps me calibrate the pace_

---

# What's Next

**Coming up in 15 minutes: W02 — Claude Web Exercise**

You'll pick a project, set up your Claude Project with context, and start building.

The goal is not a perfect app. The goal is to learn the iteration loop.

---

# One More Thing

The most common mistake in AI-assisted coding:

**Trying to get it perfect in one prompt.**

The developers who get the most out of AI tools iterate fast. They prompt → review → refine → repeat.

Today is practice for exactly that.

_See you back here in 15 minutes._
