---
title: "CS 7180: IDE-Centric AI Coding"
theme: white
revealOptions:
  transition: convex
  hash: true
  history: true
---

<!-- .slide: id="title" -->

## CS 7180: IDE-Centric AI Coding

<img src="../img/seal_logotype-768x252.png" alt="Northeastern University" width="300">

[**John Alexis Guerra Gomez**](http://johnguerra.co/)

jguerra at northeastern.edu

Class: [johnguerra.co/classes/aiCoding_spring_2026](https://johnguerra.co/classes/aiCoding_spring_2026/)

Slides: [johnguerra.co/lectures/ai_assisted_coding](http://johnguerra.co/lectures/ai_assisted_coding/06_IDE_AI_Coding/)

---

# What We'll Cover Today

1. Where We Are -- Modality Shift
2. How IDE AI Tools Work
3. Code Suggestions & Tab Completion
4. Ways to Call AI in Your Editor
5. Modes: Ask / Write / Agent / Plan
6. Rules Files & Project Context
7. Referencing Context with @ Mentions
8. Tool Comparison: Antigravity vs Copilot vs Cursor

---

# Where We Are

> Week 6 -- From the whiteboard to the editor

<!-- vertical -->

## The Three Modalities

<!-- .slide: class="dense" -->

| | **Claude Web** | **Antigravity** | **Claude Code** |
|---|---|---|---|
| **When** | Weeks 2-5 | Weeks 6-8 (intro), 8-11 (daily use) | Weeks 10+ |
| **Best For** | Architecture, research, prototyping | Production code, daily workflow | Automation, multi-file refactoring |
| **Analogy** | Whiteboard with a mentor | Pair programmer in your editor | Build crew that follows blueprints |

Each modality builds on the last -- you don't stop using Claude Web when you start Antigravity.

<!-- vertical -->

<!-- .slide: class="dense" -->

## The Modality Shift

**From whiteboard to pair programmer**

| Claude Web | IDE AI |
|---|---|
| You describe what you want | AI sees your actual code |
| One conversation at a time | AI is always running beside you |
| Copy-paste between chat and editor | Suggestions appear in-place |
| Great for planning | Great for building |

**This week:** You learn to work _with_ AI inside the editor, not _through_ a chat window.

<!-- vertical -->

## From Prototyping to Production

**What changes when you move into the IDE:**

- **Files, not artifacts** -- Real project structure, version control, tests
- **Code context, not conversation** -- The AI reads your codebase
- **Incremental, not generative** -- Edits in context rather than full rewrites
- **Reviewable, not ephemeral** -- Diffs, PRs, and commit history

**P1 is done.** Now the engineering standards go up.

---

# How IDE AI Tools Work

> What happens between your keystroke and the suggestion

<!-- vertical -->

## The Architecture Pipeline

```
Your Code
   ↓
Editor Extension (Antigravity / Copilot / Cursor)
   ↓
Context Collection
   • Current file & cursor position
   • Open tabs & recent files
   • Project-wide index / embeddings
   • Rules files & custom instructions
   ↓
LLM (Claude, GPT, etc.)
   ↓
Suggestion / Edit / Chat Response
   ↓
You review, accept, or reject
```

<!-- vertical -->

## Context Collection Strategies

<!-- .slide: class="dense" -->

| Strategy | What It Captures | Example |
|---|---|---|
| **Cursor context** | Lines around your cursor | 50 lines above/below |
| **Open tabs** | Files you have open | Related components |
| **Import graph** | Files connected by imports | Dependencies of current file |
| **Embeddings index** | Semantic search across project | "Find similar functions" |
| **Rules files** | Your explicit instructions | `.antigravityrules`, `.cursorrules` |

Different tools use different mixes of these strategies.

<!-- vertical -->

## Indexing & Embeddings

**How the AI "knows" your whole project:**

1. **On project open** -- Tool scans your codebase
2. **Chunks files** -- Splits code into meaningful segments
3. **Creates embeddings** -- Vector representations of each chunk
4. **Stores locally** -- Index lives on your machine
5. **Queries on demand** -- When you ask a question or trigger a suggestion, the tool searches this index for relevant context

This is why first-open of a large project takes a moment -- the tool is building its mental map.

<!-- vertical -->

## What the Model Actually Sees

**You might think the AI sees your whole project. It doesn't.**

The model receives a **prompt** assembled from:

- Your current file (often truncated)
- A few relevant snippets from other files
- Your rules file (if present)
- Your explicit references (@ mentions)
- Recent conversation history (in chat mode)

**Total context is limited** -- typically 32K-200K tokens depending on the tool and model.

Understanding this is the key to getting better results.

---

# Code Suggestions & Tab Completion

> The most frequent interaction you'll have

<!-- vertical -->

## How Tab Autocomplete Works

```
You type:  function validateEma|
                                ↑ cursor here

AI suggests (grayed out):
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

Press Tab → Accept
Press Esc  → Dismiss
```

This happens **constantly** as you type. The AI watches your keystrokes and predicts what comes next.

<!-- vertical -->

<!-- .slide: class="dense" -->

## Getting Better Suggestions

**The AI reads your code like a colleague reading over your shoulder.**

Tips for better autocomplete:

- **Name things well** -- `calculateTotalPrice` gets better suggestions than `calc`
- **Write the signature first** -- Parameters and return types guide the model
- **Add a comment first** -- `// Sort users by last login date` then let the AI write it
- **Use partial accept** -- Accept word-by-word (Cmd+Right) to stay in control
- **Context matters** -- Open related files so the AI sees the patterns

---

# Ways to Call AI in Your Editor

> Three interaction modes, each for different tasks

<!-- vertical -->

## The Three Modes

<!-- .slide: class="dense" -->

| Mode | How to Invoke | Best For |
|---|---|---|
| **Suggestions** | Just type -- AI offers completions | Writing new code, boilerplate, repetitive patterns |
| **Inline Edit (Cmd+K)** | Select code → Cmd+K → describe change | Targeted edits, refactoring a specific block |
| **Chat Panel** | Open sidebar or Cmd+Shift+I | Longer discussions, architecture questions, debugging |

All three modes are available simultaneously. Switching between them is part of the workflow.

<!-- vertical -->

## Inline Edit Workflow

**The most powerful daily tool:**

1. **Select** the code you want to change
2. **Cmd+K** to open the inline prompt
3. **Describe** the change: "add error handling for null input"
4. **Review** the diff that appears
5. **Accept** or **reject** the change

Inline edits are scoped -- the AI only changes what you selected. This is safer than chat-based generation.

<!-- vertical -->

## Chat Panel Usage

**When inline edit isn't enough:**

- **Multi-file questions** -- "How does auth work in this project?"
- **Architecture guidance** -- "What's the best way to add caching here?"
- **Debugging** -- "Why is this test failing?" with error pasted
- **Learning** -- "Explain what this regex does"

The chat panel sees your current file and can reference others with @ mentions.

---

# Modes: Ask, Write, Agent, Plan

> Different levels of AI autonomy in the IDE

<!-- vertical -->

## Four Modes Compared

<!-- .slide: class="dense" -->

| Mode | Autonomy | What AI Does | You Control |
|---|---|---|---|
| **Ask** | Lowest | Answers questions, explains code | Everything -- AI never touches files |
| **Write** | Medium | Generates or edits code you review | Accept/reject each change |
| **Agent** | High | Plans and executes multi-step tasks | Approve or stop the plan |
| **Plan** | Guided | Creates a step-by-step plan first | Review plan before execution |

**Antigravity** exposes these as Ask, Write, and Agent. **Cursor** calls them similarly.

<!-- vertical -->

<!-- .slide: class="dense" -->
<!-- make this a two column grid -->

## Agent Mode: Power & Risks

**Agent mode lets the AI:**

- Read and write multiple files
- Run terminal commands
- Install packages
- Create new files and directories

**The risks:**

- AI may change files you didn't expect
- Terminal commands can have side effects
- Changes can cascade across the project
- Harder to review than a single inline edit

**Rule of thumb:** Use Agent mode for well-scoped tasks. Review the plan before letting it execute.

<!-- vertical -->

## Plan Mode & Simulating It

**Plan mode** (where available) asks the AI to outline its approach before making changes.

**If your tool doesn't have a dedicated Plan mode, simulate it:**

> "Before making any changes, outline what files you'll modify and what changes you'll make in each. Wait for my approval."

This simple prompt turns any chat interaction into a plan-first workflow. Practice this -- it's a professional habit.

---

# Rules Files

> Teaching the AI your project's conventions

<!-- vertical -->

## What Are Rules Files?

A rules file is a **plaintext file** in your project root that the AI reads every time it generates code.

Think of it as **onboarding documentation for your AI pair programmer.**

It answers: "How do we do things around here?"

<!-- vertical -->

## Tool-by-Tool Names

<!-- .slide: class="dense" -->

| Tool | File Name | Scope |
|---|---|---|
| **Antigravity** | `.antigravityrules` | Project root |
| **GitHub Copilot** | `.github/copilot-instructions.md` | Repository |
| **Cursor** | `.cursorrules` | Project root |
| **Claude Code** | `CLAUDE.md` | Project root + subdirectories |
| **Windsurf** | `.windsurfrules` | Project root |

Same concept, different file names. The content is similar across all tools.

<!-- vertical -->

## What to Include

**A good rules file covers:**

- **Tech stack** -- "This project uses Next.js 14, TypeScript, Tailwind"
- **Patterns** -- "Use server components by default, client components only when needed"
- **Naming** -- "Use camelCase for variables, PascalCase for components"
- **Testing** -- "Write tests with Vitest, use Testing Library for components"
- **Architecture** -- "API routes go in `/app/api/`, shared utilities in `/lib/`"
- **Don'ts** -- "Never use `any` type. Never import from `@internal`."

**Keep it concise.** The rules file is injected into every prompt -- long rules waste context.

---

# Referencing Context

> Telling the AI exactly what to look at

<!-- vertical -->

## @ Mentions

<!-- .slide: class="dense" -->

Most IDE AI tools support **@ mentions** to pull specific context into the conversation:

| Reference | What It Does | Example |
|---|---|---|
| `@file` | Includes a specific file | `@src/auth/login.ts` |
| `@folder` | Includes files in a directory | `@src/components/` |
| `@docs` | Searches official documentation | `@docs Next.js routing` |
| `@codebase` | Searches your project index | `@codebase how is auth handled?` |
| `@web` | Searches the internet | `@web React 19 new features` |
| `@git` | References git history | `@git recent changes to auth` |

Not all tools support all references. Check your tool's docs.

<!-- vertical -->

## Referencing Lines & Selections

**Beyond @ mentions, you can reference specific code:**

- **Select code** before opening chat -- the selection is included as context
- **Highlight a function** and ask "What does this do?"
- **Copy an error message** and paste it into chat with "Fix this"
- **Reference line ranges** -- "Look at lines 45-60 in `api/users.ts`"

**The more specific your reference, the better the response.**

Vague: "Why is my app broken?"

Specific: "The `getUserProfile` function in `@src/api/users.ts` returns null when the user has no avatar. How should I handle this?"

---

# Providing the Right Context

> Context hierarchy and best practices

<!-- vertical -->

## The Context Hierarchy

**The AI assembles context in this priority order:**

```
1. Rules files           (always included, highest priority)
2. Explicit references   (@ mentions you provide)
3. Current file          (file open in editor)
4. Open tabs             (other files you have open)
5. Project index         (embeddings search results)
```

**Implication:** Your rules file always wins. Your explicit references come next. Everything else is best-effort.

This is why rules files and @ mentions are so powerful -- you control what the AI prioritizes.

<!-- vertical -->

## Best Practices

- **Open related files** before asking questions -- they become context
- **Close unrelated tabs** to reduce noise in the context window
- **Use @ mentions** for files the AI should definitely see
- **Keep rules files updated** as your project evolves
- **Break big questions into small ones** -- each question gets its own context budget
- **State what you want explicitly** -- don't assume the AI infers your intent

**Context engineering in the IDE is the same skill you learned for prompt engineering -- just applied to a different interface.**

---

# Tool Comparison

> Antigravity vs GitHub Copilot vs Cursor

<!-- .slide: class="dense" -->

| Feature | **Antigravity** | **GitHub Copilot** | **Cursor** |
|---|---|---|---|
| **Base Editor** | VS Code fork | VS Code extension | VS Code fork |
| **Default Model** | Gemini (Google) | GPT-4o / Claude | Claude / GPT-4o |
| **Tab Completion** | Yes | Yes | Yes |
| **Inline Edit** | Cmd+K | Cmd+I | Cmd+K |
| **Chat Panel** | Yes | Yes | Yes |
| **Agent Mode** | Yes | Yes (Copilot Agent) | Yes (Composer) |
| **Rules File** | `.antigravityrules` | `.github/copilot-instructions.md` | `.cursorrules` |
| **@ References** | @file, @folder, @docs, @codebase, @web | @file, @workspace | @file, @folder, @docs, @codebase, @web, @git |
| **Project Indexing** | Yes | Yes (workspace) | Yes |
| **Price** | ~$20/mo | $10/mo (individual) | $20/mo (Pro) |
| **Unique Strength** | Google ecosystem, Gemini integration | GitHub integration, broad adoption | Multi-model support, Composer UX |

All three are capable. We use **Antigravity** in this course, but the concepts transfer.

---

# P2 Launch: Working in Pairs

> Your next project is a team effort -- pairs of two

<!-- vertical -->

## P2 is a Pair Project

**Starting this week, form pairs for Project 2.**

- **Find a partner** -- someone with complementary skills or interests
- **Create a Canvas group** by end of Week 6 (one submission per pair)
- **Set up a shared GitHub repo** -- both partners need push access
- **Start your shared rules file** -- `.antigravityrules` with conventions you both agree on

**Why pairs?** Professional developers rarely work alone. Pair programming with AI is a skill worth practicing.

<!-- vertical -->

## Pair Programming with AI

**The driver/navigator model, augmented:**

| Role | Responsibility |
|---|---|
| **Driver** | Types, uses AI suggestions, writes code |
| **Navigator** | Reviews, directs strategy, catches issues |
| **AI** | Generates suggestions, answers questions, runs tasks |

**Rotate roles** every 30-60 minutes or per issue.

The navigator keeps the big picture while the driver and AI handle implementation details.

<!-- vertical -->

## Getting Started This Week

**Before next class:**

1. **Find your partner** and agree on a project idea
2. **Create your Canvas group** (instructions on Canvas)
3. **Create a shared GitHub repo** with both partners as collaborators
4. **Start a shared rules file** with your tech stack and conventions

**Both partners must have meaningful commits throughout the project.**

---

# What to Remember

1. **IDE AI tools see your code** -- not just your description of it. That changes everything.
2. **Context is assembled, not magical** -- the AI gets a prompt built from your files, rules, and references.
3. **Rules files are your highest-priority context** -- treat them like onboarding docs for a new team member.
4. **Three interaction modes** -- suggestions, inline edit, and chat. Learn when to use each.
5. **Agent mode is powerful but risky** -- always review the plan before letting it execute.
6. **These concepts transfer** -- Antigravity, Copilot, and Cursor all work the same way underneath.

---

# Looking Ahead

## Next Week: Agile/Scrum + Pair Workflow

**Week 7 -- Process for working in pairs**

- **Agile/Scrum crash course** -- Sprints, ceremonies, and roles for P2
- **GitHub as your scrumboard** -- Issues, Projects board, milestones
- **From PRD to sprint backlog** -- Turning your Weeks 3-4 PRD into actionable issues
- **Pair programming with AI** -- Driver/navigator + AI, splitting work via issues
- **Partner code review** -- PR-based review workflow between partners

---

# Resources

<!-- vertical -->

## Required Reading

<!-- .slide: class="dense" -->

| Resource | URL |
|----------|-----|
| Antigravity Docs (Getting Started) | [antigravity.google/docs/get-started](https://antigravity.google/docs/get-started) |
| GitHub Copilot Guide | [docs.github.com/copilot](https://docs.github.com/copilot) |
| Cursor Documentation | [docs.cursor.com](https://docs.cursor.com) |

<!-- vertical -->

## Recommended Reading

<!-- .slide: class="dense" -->

| Resource | URL |
|----------|-----|
| Inside GitHub Copilot (GitHub Blog) | [github.blog](https://github.blog/ai-and-ml/github-copilot/inside-github-copilot-how-github-copilot-works/) |
| cursor.directory (Community Rules Files) | [cursor.directory](https://cursor.directory/) |
| OpenSSF Guide for AI Code Assistants | [best.openssf.org](https://best.openssf.org/Security-Focused-Guide-for-AI-Code-Assistant-Instructions) |
