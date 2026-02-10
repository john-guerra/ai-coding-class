---
title: "CS 7180: Advanced IDE AI Features"
theme: white
revealOptions:
  transition: convex
  hash: true
  history: true
---

<!-- .slide: id="title" -->

## CS 7180: Advanced IDE AI Features

<img src="../img/seal_logotype-768x252.png" alt="Northeastern University" width="300">

[**John Alexis Guerra Gomez**](http://johnguerra.co/)

jguerra at northeastern.edu

Class: [johnguerra.co/classes/aiCoding_spring_2026](https://johnguerra.co/classes/aiCoding_spring_2026/)

Slides: [johnguerra.co/lectures/ai_assisted_coding](http://johnguerra.co/lectures/ai_assisted_coding/08_Advanced_IDE_Features/)

---

# What We'll Cover Today

1. Where We Are -- Week 8 checkpoint
2. Agent Memory & Persistent Context
3. MCP Servers
4. Browser Mode
5. Mockup-to-Code in the IDE
6. Debugging with AI
7. Shared Rules Files for Pairs

---

# Where We Are

> Week 8 -- Power features for your P2 sprint

<!-- vertical -->

## Recap: Weeks 6-7

**Week 6:** IDE fundamentals -- how AI tools work, modes, rules files, context references

**Week 7:** Process -- Agile/Scrum, GitHub scrumboard, pair programming, partner code review

**You have the tools and the process.** Now you unlock the _power features_ that make IDE AI truly productive.

<!-- vertical -->

## This Week: Power Features

**Today's focus: features that multiply your effectiveness**

- **Agent memory** -- AI that remembers your project across sessions
- **MCP servers** -- AI that connects to external tools and data
- **Browser mode** -- AI that sees your running app
- **Mockup-to-code** -- AI that turns designs into code
- **Debugging with AI** -- AI that helps you find and fix bugs
- **Shared rules files** -- Conventions that both you and your partner follow

All of these directly apply to your **P2 sprint work right now**.

---

# Agent Memory & Persistent Context

> How AI tools remember across sessions

<!-- vertical -->

## The Memory Problem

**Every time you open a new chat, the AI starts fresh.**

It doesn't remember:
- What you discussed yesterday
- Your project's architecture decisions
- Bugs you've already fixed
- Patterns you've established

**Solution:** Give the AI persistent project knowledge through _memory files_.

<!-- vertical -->

## Memory Files in Practice

<!-- .slide: class="dense" -->

| Tool | Memory File | What to Include |
|---|---|---|
| **Antigravity** | `.antigravityrules` | Project patterns, conventions, do's/don'ts |
| **Claude Code** | `CLAUDE.md` | Build commands, architecture, project context |
| **Cursor** | `.cursorrules` | Same as above |

**What makes a good memory file:**

- **Tech stack and versions** -- "Next.js 14, TypeScript 5, Tailwind"
- **Architecture decisions** -- "Server components by default, client only for interactivity"
- **Code patterns** -- "Use Zod for validation, Prisma for DB access"
- **Common pitfalls** -- "Never use `any` type, always handle null cases"

Think of it as onboarding docs that your AI reads before every interaction.

---

# MCP Servers

> Connecting your AI to the outside world

<!-- vertical -->

## What Is MCP?

**Model Context Protocol (MCP)** lets AI tools connect to external data sources and services.

```
Your IDE AI
    ↓
MCP Client (built into the tool)
    ↓
MCP Server (connects to a service)
    ↓
External Service (database, API, docs, etc.)
```

**Without MCP:** You copy-paste information between tools and chat.

**With MCP:** The AI can directly query your database, read your docs, check your CI status.

<!-- vertical -->

## Practical MCP Examples

<!-- .slide: class="dense" -->

| MCP Server | What It Connects To | Use Case |
|---|---|---|
| **Database** | PostgreSQL, MongoDB | "What's the schema for the users table?" |
| **GitHub** | Issues, PRs, Actions | "What's failing in CI right now?" |
| **Docs** | API documentation | "How does the Stripe webhook API work?" |
| **File system** | Local files | "Find all files that import this module" |
| **Browser** | Running web app | "What does the login page look like?" |

MCP is still evolving, but it's the direction all AI tools are heading -- your AI becomes a connected assistant, not an isolated chatbot.

---

# Browser Mode

> AI that sees your running app

**Browser mode** lets the AI interact with your running application:

- Take screenshots of your app and analyze UI issues
- Navigate through user flows to find bugs
- Compare your implementation to a design mockup
- Debug visual regressions

**Workflow:** Run your dev server, point the AI's browser at `localhost:3000`, then ask it to evaluate what it sees.

Useful for: "Does this match the Figma design?", "Why is the layout broken on mobile?", "Walk through the signup flow and find issues."

---

# Mockup-to-Code in the IDE

> From design to implementation with AI assistance

<!-- vertical -->

## The Workflow

**Turn a design into working code:**

1. **Get a mockup** -- Figma export, screenshot, hand-drawn sketch, or text description
2. **Share it with your IDE AI** -- Drag the image into the chat panel
3. **Prompt for implementation** -- "Build this UI using React and Tailwind CSS"
4. **Iterate** -- "Make the header sticky" / "Add responsive breakpoints"

**AI image understanding** varies by tool. Claude and GPT-4o are strongest at interpreting designs.

<!-- vertical -->

## Connecting to Your P2 Workflow

**Practical approach for Project 2:**

1. **Design first** (Weeks 6-7) -- Use Claude Web Artifacts to create a quick mockup
2. **Export/screenshot** the mockup
3. **Feed to IDE AI** -- "Implement this design as a React component following @.antigravityrules"
4. **Iterate in code** -- Refine with inline edit and chat

This bridges the gap between prototyping (Claude Web) and implementation (IDE AI).

---

# Debugging with AI

> Your AI partner for finding and fixing bugs

<!-- vertical -->

## The AI Debugging Workflow

**When you hit an error, follow this pattern:**

```
1. Copy the error message / stack trace
2. Paste it into your IDE AI chat
3. Ask: "Explain this error and suggest a fix"
4. Review the explanation -- does it make sense?
5. Apply the fix
6. Verify the fix works (run the test / reload the app)
```

**Key insight:** The AI is excellent at _pattern matching_ on error messages. It's seen thousands of similar errors in its training data.

<!-- vertical -->

## Reading Stack Traces with AI

**Stack traces tell you _where_ the error happened. AI helps you understand _why_.**

```
TypeError: Cannot read properties of undefined (reading 'map')
    at UserList (src/components/UserList.tsx:15:22)
    at renderWithHooks (node_modules/react-dom/...)
```

**Good prompt:** "This error occurs in UserList.tsx line 15. The `users` prop is sometimes undefined. Show me how to add a safe check and a loading state."

**Bad prompt:** "Fix this error" (too vague -- AI might add a generic try-catch instead of addressing the root cause)

<!-- vertical -->

## Rubber Duck Debugging with AI

**Sometimes the best debugging is explaining the problem out loud.**

Use the AI as your rubber duck:

- "Walk me through what happens when a user submits the form. I think the issue is somewhere between the form handler and the API call."
- "I expect this function to return an array of users, but it returns undefined. Here's the code -- what am I missing?"
- "This test passes locally but fails in CI. What could cause environment-specific test failures?"

**Watch for hallucinated fixes:** AI may confidently suggest changes that _sound_ right but don't address the actual bug. Always verify by running the code.

---

# Shared Rules Files for Pairs

> Your rules file is a living contract between partners

<!-- vertical -->

## Evolving Rules as a Pair

**Your `.antigravityrules` is the single source of truth** -- both partners contribute and maintain it.

Example sections for a pair project:

```
## Tech Stack
- Next.js 14, TypeScript, Tailwind, Prisma, PostgreSQL

## Conventions
- Components: PascalCase, one per file
- API routes: kebab-case
- Database: snake_case columns

## Pair Workflow
- Branch naming: feature/[issue#]-[description]
- Commit messages: "Verb description (#issue)"
- All PRs need partner review before merge
```

<!-- vertical -->

## Rules as Single Source of Truth

**When partners disagree on a convention, the rules file is the tiebreaker.**

- **Before starting P2:** Agree on initial rules together during sprint planning
- **During development:** Update rules when you discover new patterns or pain points
- **In code review:** Reference the rules file -- "This doesn't match our convention in `.antigravityrules` line 12"

**Tip:** Commit rules file changes in their own PR so both partners can review and approve convention changes.

---

# P2 Sprint Workflow

> Tying everything together

**Complete workflow for a P2 feature:**

```
1. PRD → User Story → GitHub Issue (sprint planning)
2. Assign issue to one partner
3. Create feature branch (feature/42-add-login)
4. Use Agent mode to implement (rules file guides AI)
5. Self-review with AI before creating PR
6. Create PR → Partner reviews
7. Address feedback → Partner approves → Merge
8. Move issue to Done on scrumboard
```

Every step is supported by the tools you've learned across Weeks 6-8.

---

# What to Remember

1. **Memory files are your most valuable context** -- invest time in `.antigravityrules` / `CLAUDE.md`.
2. **MCP connects your AI to real data** -- databases, APIs, docs, and more.
3. **Browser mode lets AI see your running app** -- powerful for UI debugging and validation.
4. **Mockup-to-code bridges design and implementation** -- from Figma/sketch to working components.
5. **AI is a powerful debugger** -- but always verify its fixes by running the code.
6. **Shared rules files are a living contract** -- both partners maintain them, and they evolve with your project.

---

# Looking Ahead

## After Spring Break: Claude Code (Modality 3)

**Week 10 -- AI in the terminal**

- **P2 is due** at the beginning of Week 10 -- submit before spring break if you can
- **Claude Code** -- The third AI modality: autonomous agents in your terminal
- **Agentic coding** -- Multi-file edits, automated refactoring
- **CLAUDE.md deep dive** -- Persistent context for CLI-based AI
- **P3 team formation** -- Form your P3 teams in Week 10

**HW3 (Context Engineering) is due this week.** Your rules file and Scrum board should be in great shape by now.

---

# Resources

<!-- vertical -->

## Required Reading

<!-- .slide: class="dense" -->

| Resource | URL |
|----------|-----|
| MCP Specification | [modelcontextprotocol.io](https://modelcontextprotocol.io/) |
| Antigravity Advanced Docs | [antigravity.google/docs/get-started](https://antigravity.google/docs/get-started) |

<!-- vertical -->

## Recommended Reading

<!-- .slide: class="dense" -->

| Resource | URL |
|----------|-----|
| MCP GitHub Repository | [github.com/modelcontextprotocol](https://github.com/modelcontextprotocol) |
| Chrome DevTools Debugging Guide | [developer.chrome.com/docs/devtools](https://developer.chrome.com/docs/devtools/) |
| Node.js Debugging Guide | [nodejs.org/en/learn/getting-started/debugging](https://nodejs.org/en/learn/getting-started/debugging) |
