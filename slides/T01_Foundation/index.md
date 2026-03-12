---
title: "AI-Assisted Coding: From Hype to Practice"
theme: white
revealOptions:
  transition: convex
  hash: true
  history: true
---

<!-- .slide: id="title" -->

# AI-Assisted Coding

## From Hype to Practice

**[Your Name]**

[Your Title / Affiliation]

<!-- Note: Welcome the audience. Briefly introduce yourself — background in software engineering + AI tooling. Today is a 2-hour hands-on workshop; this foundation section sets the mental models before we get into live demos. -->

---

# What We'll Cover Today

**Part 1 — Foundation (45 min):** Mental models, the landscape, which tool when

**Part 2 — Hands-On (45 min):** Live demos, artifacts, IDE workflow

**Part 3 — Advanced Practice (30 min):** Agentic coding, real workflows

---

# Let's Start with a Question

> "Have you tried using AI for coding?"

<div class="r-fit-text">

Raise your hand if you have.

Keep it up if it worked the way you expected.

</div>

<!-- Note: Pause here. This is a good calibration moment — gauge the room's experience level. The gap between "tried it" and "it worked as expected" is usually large, and that gap is what this talk addresses. -->

---

# The Promise

## What the hype says:

- Build complete apps in minutes with no coding experience
- "Anyone can be a developer now"
- 10x productivity gains overnight
- Just describe what you want — AI does the rest

**Sounds amazing. And it's partly true.**

<!-- Note: Don't dismiss the hype entirely — there are real gains here. The question is under what conditions and with what expectations. -->

---

# The Reality Check

<!-- vertical -->

## What actually happens

- Code that works... until it doesn't
- Technical debt accumulates faster than you can see it
- Hallucinations go undetected until they cause bugs
- Security vulnerabilities get shipped quietly
- "It works on my machine" at a whole new scale

<!-- vertical -->

## The deeper problem

No tests → bugs reach production

No understanding → you can't debug when it breaks

No review process → quality varies wildly

No systematic evaluation → you don't know what you actually shipped

<!-- Note: This is the "vibe coding trap" — the AI can generate code that looks correct and passes a quick sanity check, but has subtle issues. Without engineering discipline wrapping the AI usage, you end up with beautiful-looking debt. -->

---

# The Right Framing

> AI is a **powerful collaborator**, not a magic wand.

<!-- vertical -->

## The Contractor Analogy

Think of AI as a skilled contractor:

- Fast, capable, and willing to work
- Needs clear requirements to do good work
- Can miss context you haven't provided
- Makes confident mistakes sometimes
- You are still the architect and quality owner

**The better you communicate, the better the output.**

<!-- vertical -->

## What Actually Changes

| Old Workflow | AI-Assisted Workflow |
|---|---|
| Write every line yourself | Describe goals, review output |
| Google syntax constantly | Ask in natural language |
| Hours to scaffold a feature | Minutes to a working draft |
| Bug = debug from scratch | Bug = explain & iterate with AI |
| One task at a time | Parallel exploration possible |

The skill shifts from *typing code* to *directing, reviewing, and validating* code.

<!-- Note: This table is worth dwelling on. The bottleneck moves from "can I write this?" to "can I clearly specify what I want and recognize when it's wrong?" — those are learnable skills. -->

---

# The Three Modalities

## Three different ways to use AI for coding

<!-- Note: This is the core framework of the talk. These aren't competing tools — they're different modes of collaboration, each suited to different moments in your workflow. Most people only discover one or two. -->

<!-- vertical -->

## Overview

<!-- .slide: class="dense" -->

| | **Claude Web** | **IDE AI** | **Claude Code** |
|---|---|---|---|
| **Interface** | Browser | Your editor | Terminal |
| **Analogy** | Whiteboard with a mentor | Pair programmer at your side | Autonomous build crew |
| **Best For** | Architecture, learning, prototyping | Production code, daily flow | Multi-file tasks, automation |
| **You control** | The conversation | Each edit or block | Goals and approval |

Each builds on the last — you don't stop using earlier modalities.

---

# Modality 1: Claude Web

## The Whiteboard with a Senior Mentor

<!-- vertical -->

## What It Is

Go to [claude.ai](https://claude.ai) and start a conversation.

No setup. No environment. Just describe what you're building and start thinking through it together.

<!-- vertical -->

## What It's Best For

**Architecture and design**
- "What's the right database schema for this feature?"
- "Should I use REST or GraphQL here?"
- "Help me think through the tradeoffs of these two approaches"

**Learning**
- "Explain how JWT authentication works"
- "Show me the difference between these two patterns with examples"

**Rapid prototyping**
- Interactive HTML/JS apps in seconds (Artifacts)
- Data visualizations you can share immediately
- UI mockups without touching your codebase

<!-- Note: Demo opportunity: if time allows, show creating a quick artifact — a data viz or simple interactive tool — directly in claude.ai. This takes 2-3 minutes and usually gets an "oh wow" reaction from audiences who haven't seen it. -->

<!-- vertical -->

## Claude Projects

Upload your documents, give Claude persistent context:

- Architecture decisions
- Design mockups
- API documentation
- Your coding conventions

**Claude remembers everything across conversations in the project.**

<!-- vertical -->

## Artifacts: Instant Prototypes

Claude can generate interactive apps that run directly in the browser:

- React components with live preview
- Data dashboards with real interactivity
- Games, tools, calculators — fully functional
- Share with a link — no deployment needed

```
"Build me an interactive budget tracker with
a monthly chart and category breakdown"
```

<!-- Note: Show an actual artifact if demoing — the visual impact is significant. Key point: this is useful for validating ideas with stakeholders BEFORE writing any production code. -->

<!-- vertical -->

## When to Use Claude Web

- Starting a new project or feature (think before you type)
- Learning a new technology
- Exploring architectural options
- Creating quick prototypes to validate ideas
- Data analysis and visualization
- When you want to have a conversation, not just get code

---

# Modality 2: IDE AI

## The Pair Programmer in Your Editor

<!-- Note: Tools in this category: Cursor, GitHub Copilot, Antigravity, Windsurf. The underlying experience is similar — AI integrated directly into your editing environment. -->

<!-- vertical -->

## What It Is

AI built directly into your code editor. It sees your code, understands your project, and helps you write production code in your real workflow.

Tools: **Cursor**, **GitHub Copilot**, **Antigravity**, **Windsurf**

<!-- vertical -->

## Core Capabilities

**Tab completion**
AI suggests the next line, block, or function as you type. Accept with Tab.

**Inline edit (Cmd+K / Ctrl+K)**
Select code, describe the change, get a targeted edit in place.

**Chat panel**
Ask questions about your codebase. Reference files with `@filename`.

**Agent / Composer mode**
Give a larger task — it reads relevant files and makes coordinated changes across your project.

<!-- vertical -->

## What It's Best For

- Writing production-quality code in your actual codebase
- Refactoring existing code with full context
- Generating tests for functions you've already written
- Filling in boilerplate (API routes, form handlers, etc.)
- Explaining unfamiliar code in your own codebase

<!-- Note: The key difference from Claude Web is context — IDE AI sees your actual files, your imports, your conventions. It produces code that fits your project, not generic examples. -->

<!-- vertical -->

## The Rules File

Most IDE AI tools support a configuration file that sets permanent context:

```markdown
## Tech Stack
- React 18, TypeScript, Tailwind CSS
- PostgreSQL with Prisma ORM
- Jest for unit tests

## Conventions
- All components use TypeScript strict mode
- API routes return { data, error } shape
- Never use `any` — use `unknown` and narrow

## Do NOT
- Skip writing tests for new API routes
- Use client components unless interactivity requires it
```

**This file is read every session.** It's how you onboard the AI to your codebase.

<!-- vertical -->

## When to Use IDE AI

- Daily coding work
- Anywhere you're already in your editor
- When you need code that fits your existing codebase
- Production features with tests and CI/CD

---

# Modality 3: Claude Code

## The Autonomous Agent in Your Terminal

<!-- Note: This is the newest and most powerful modality. It's also the one that most fundamentally changes the developer role — from driver to supervisor. -->

<!-- vertical -->

## What It Is

A terminal-based AI agent that can read your entire codebase, run commands, edit files, and work autonomously until a task is complete.

```bash
cd ~/your-project
claude
> Add input validation to all API endpoints and write tests
```

It reads files, edits code, runs tests, fixes failures, and keeps going.

<!-- vertical -->

## The Agentic Loop

Claude Code doesn't wait for you after every step.

```
Your goal → Think → Use tools → Observe results → Done?
                ↑                                    |
                └──────────── keep going ────────────┘
```

It chains tool calls — read a file, edit it, run the tests, fix the failures — until the task is done or it needs your input.

<!-- vertical -->

## What It's Best For

- **Multi-file tasks** — changes that touch 10+ files simultaneously
- **Refactoring** — restructuring code across a whole module
- **Automation** — setting up CI/CD, generating test suites, migrations
- **Exploration** — "explain the architecture of this project" runs against your actual code
- **Complex debugging** — traces across multiple files and runs the code to verify

<!-- Note: The demo that usually lands best: show Claude Code being asked to "add a complete test suite for the auth module" and watch it read the source files, generate tests, run them, fix failures, and commit — without you typing a single line of code. -->

<!-- vertical -->

## The Mental Model Shift

| | Chat | IDE AI | Claude Code |
|---|---|---|---|
| **You are** | Driver | Co-pilot | Supervisor |
| **AI does** | Responds | Assists | Acts |
| **Your skill** | Prompting | Reviewing inline | Writing clear goals |
| **Intervention** | Each turn | Each suggestion | When needed |

**You shift from writing code to directing and reviewing outcomes.**

<!-- vertical -->

## The New Skills You Need

With Claude Code, the limiting factor isn't typing — it's:

1. **Writing clear goals** — not step-by-step instructions, but clear intent and acceptance criteria
2. **Reviewing changes** — reading diffs critically, understanding what changed and why
3. **Knowing when to intervene** — recognizing when the agent is going down the wrong path

These are learnable skills. They get better with practice.

<!-- Note: Reassure the audience — this isn't harder, it's different. Many people find it easier once they internalize the shift. The key anxiety is "but what if it does something wrong?" — address this with the permission model. -->

<!-- vertical -->

## Safety: You Stay in Control

Claude Code asks before doing anything risky:

```
Claude wants to run: npm run migrate
Allow? (y/n/always)
```

You can configure what it can do automatically vs. what requires approval. Start conservative — read-only tools are safe, shell commands need review.

<!-- vertical -->

## When to Use Claude Code

- Tasks that touch many files at once
- When you want to describe *what* you want, not *how* to do it
- Automation and scripting tasks
- Large refactors you've been putting off
- When IDE AI isn't quite autonomous enough

---

# The Decision Framework

## Which modality, when?

<!-- vertical -->

## Quick Reference

<!-- .slide: class="dense" -->

| Task | Use |
|---|---|
| "I'm not sure how to approach this" | Claude Web (think first) |
| "Build me a quick prototype to test this idea" | Claude Web (Artifacts) |
| "Add this function to my existing service" | IDE AI |
| "Fix this specific bug in my code" | IDE AI |
| "Refactor the entire auth module" | Claude Code |
| "Write tests for every route in the API" | Claude Code |
| "Set up CI/CD for this project" | Claude Code |
| "What database schema should I use?" | Claude Web |
| "Generate boilerplate for a new endpoint" | IDE AI |

<!-- vertical -->

## The Rule of Thumb

**Claude Web** — when you need to think before you type

**IDE AI** — when you're already in your editor doing real work

**Claude Code** — when the task is bigger than a few files or you want true autonomy

**They complement each other.** A typical session might start with Claude Web to plan, IDE AI to implement, and Claude Code to generate the test suite.

<!-- Note: This is the key insight — these aren't competing products. Professionals use all three. The mistake is treating them as alternatives rather than a toolkit. -->

---

# The Mental Model Shift

## How AI coding changes the developer role

<!-- vertical -->

## Three Stages of Adoption

Most people go through predictable stages:

**Stage 1: Skeptic**
"It's just autocomplete. I can type faster myself."

**Stage 2: Enthusiast**
"This is amazing! I'm shipping so fast!" *(then hits a wall)*

**Stage 3: Practitioner**
"I know when to use it, how to guide it, and when to take back the wheel."

<!-- Note: Where is your audience? Most practitioners in the room are probably in Stage 2. The goal of this talk is to help them reach Stage 3. -->

<!-- vertical -->

## What You're Actually Learning

AI coding tools don't reduce the need for engineering judgment — they amplify it.

The skills that matter more now:

- **System thinking** — understanding how pieces fit together
- **Code review** — reading and evaluating code you didn't write
- **Specification** — writing clear requirements and acceptance criteria
- **Security awareness** — AI-generated code has real vulnerability patterns
- **Testing instincts** — knowing what to verify and how

<!-- vertical -->

## The Quality Bar Doesn't Lower

AI generates code faster. It doesn't automatically make good code.

- 45% of AI-generated code contains security vulnerabilities (Veracode 2025)
- AI PRs have 1.57x more security issues than human-written PRs
- Tests still need to be written (or generated and verified)
- Code review is more important than ever, not less

**Speed without quality isn't a win. Speed with quality is.**

<!-- Note: This is a good moment to name the risk: developers who use AI to skip engineering discipline are building faster toward technical debt. The professional move is to use AI to do engineering-quality work faster. -->

<!-- vertical -->

## The Workflow That Works

```
1. THINK    — Use Claude Web to plan before writing
2. BUILD    — Use IDE AI for production code with tests
3. AUTOMATE — Use Claude Code for scale and repetition
4. REVIEW   — Always review AI changes with a critical eye
5. COMMIT   — Commit code you understand and can defend
```

This isn't slower than "just vibe coding." It's faster long-term.

---

# What's Next in This Talk

<!-- vertical -->

## Part 2: Hands-On (45 min)

- **Live demo:** Claude Web Artifacts — build something real in 10 minutes
- **Live demo:** IDE AI workflow — daily coding with Cursor/Copilot
- **Practice:** You try it with a guided exercise

<!-- vertical -->

## Part 3: Advanced Practice (30 min)

- **Claude Code in action** — live agentic demo
- **Writing good goals** — the skill that unlocks everything
- **Common failure modes** — what goes wrong and how to recover
- **Your questions**

<!-- Note: Set expectations for the rest of the session. Make sure everyone has an account at claude.ai before moving on. Free tier works for everything in Part 2. -->

---

# Quick Setup Check

Before we go hands-on:

1. Go to [claude.ai](https://claude.ai) and sign in (free account works)
2. If you want to follow along with IDE AI: install Cursor (cursor.com) or GitHub Copilot
3. If you want to try Claude Code: `npm install -g @anthropic-ai/claude-code`

**You don't need everything installed. Claude Web is enough to follow Part 2.**

<!-- Note: This is a natural break point. Give people 2 minutes to get claude.ai open. -->

---

# Foundation Summary

<!-- vertical -->

## The Core Ideas

1. **AI coding is real and valuable** — but requires engineering judgment to use well

2. **Three modalities** — Claude Web, IDE AI, Claude Code — each suited to different work

3. **You shift from driver to supervisor** — the skill is in directing, reviewing, and knowing when to intervene

4. **Quality discipline matters more, not less** — AI amplifies your habits, good and bad

5. **It gets better with practice** — the learning curve is real but worth it

<!-- vertical -->

## The One Thing to Remember

> The developers who get the most value from AI tools are the ones who stayed good engineers.

Fast feedback loops. Tests. Clear thinking. Code review. These don't go away — they become your competitive advantage.

<!-- Note: End the foundation section on a positive note. The audience should feel: "I can do this, and I understand what I'm signing up for." Ready to see it in action. -->
