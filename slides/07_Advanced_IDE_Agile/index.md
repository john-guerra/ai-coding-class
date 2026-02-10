---
title: "CS 7180: Advanced IDE AI + Agile/Scrum"
theme: white
revealOptions:
  transition: convex
  hash: true
  history: true
---

<!-- .slide: id="title" -->

## CS 7180: Advanced IDE AI + Agile/Scrum

<img src="../img/seal_logotype-768x252.png" alt="Northeastern University" width="300">

[**John Alexis Guerra Gomez**](http://johnguerra.co/)

jguerra at northeastern.edu

Class: [johnguerra.co/classes/aiCoding_spring_2026](https://johnguerra.co/classes/aiCoding_spring_2026/)

Slides: [johnguerra.co/lectures/ai_assisted_coding](http://johnguerra.co/lectures/ai_assisted_coding/07_Advanced_IDE_Agile/)

---

# What We'll Cover Today

1. Where We Are -- Week 7 checkpoint
2. Agile/Scrum Crash Course
3. GitHub as Your Scrumboard
4. From PRD to Sprint Backlog
5. Branches, PRs, and Code Review
6. Agent Memory & Persistent Context
7. MCP Servers
8. Browser Mode & Mockup-to-Code

---

# Where We Are

> Week 7 -- Going deeper with process and tools

<!-- vertical -->

## Recap: Week 6 Foundations

**Last week you learned:**

- How IDE AI tools work (context collection, indexing, embeddings)
- Code suggestions, inline edit (Cmd+K), chat panel
- Modes: Ask / Write / Agent / Plan
- Rules files and @ context references
- Tool comparison: Antigravity vs Copilot vs Cursor

**You have the tools.** Now you need the _process_ to use them effectively on a team project.

<!-- vertical -->

## This Week: Process + Power Features

**Two themes today:**

1. **Agile/Scrum** -- How professional teams organize work (you'll need this for P2 and P3)
2. **Advanced IDE features** -- Agent memory, MCP servers, browser mode, mockup-to-code

Both come together: Agile gives you the _structure_, advanced AI features give you the _speed_.

---

# Agile/Scrum Crash Course

> The minimum you need to run effective sprints

<!-- vertical -->

## Why Agile for AI Projects?

**AI changes the speed of coding, not the need for process.**

- You can generate code faster than ever -- but _what_ should you build?
- Without process, AI speed leads to building the wrong thing faster
- Agile gives you **short feedback loops** to course-correct
- Perfect fit: sprints align with project milestones in this course

**P2 requires 2 documented sprints. P3 requires 4.**

<!-- vertical -->

## Scrum Roles

<!-- .slide: class="dense" -->

| Role | Responsibility | In This Course |
|---|---|---|
| **Product Owner** | Decides _what_ to build, prioritizes backlog | You (P1/P2) or team lead (P3) |
| **Scrum Master** | Facilitates process, removes blockers | Rotating role in P3 teams |
| **Development Team** | Builds the product | You + your AI tools |

In a solo project (P2), you wear all three hats. In P3, you'll split responsibilities.

<!-- vertical -->

## The Sprint Cycle

```
Sprint Planning (start of sprint)
    ↓
Daily Work (build, test, commit)
    ↓
Sprint Review (demo what you built)
    ↓
Sprint Retrospective (what to improve)
    ↓
Next Sprint Planning...
```

**Sprint length in this course:** 1-2 weeks per sprint.

The key insight: you commit to a _small, achievable_ set of work each sprint.

<!-- vertical -->

## Scrum Ceremonies

<!-- .slide: class="dense" -->

| Ceremony | When | Duration | Purpose |
|---|---|---|---|
| **Sprint Planning** | Start of sprint | 30-60 min | Pick issues for this sprint |
| **Daily Standup** | Every day | 5-15 min | What did I do? What will I do? Blockers? |
| **Sprint Review** | End of sprint | 30 min | Demo working software |
| **Retrospective** | After review | 15-30 min | What went well? What to improve? |

For P2/P3: Document your planning and retro in your README or project wiki.

---

# GitHub as Your Scrumboard

> Issues, Projects, and Labels -- everything you need

<!-- vertical -->

## GitHub Issues = Backlog Items

**Each piece of work becomes a GitHub Issue:**

- **Title:** Short, action-oriented ("Add user login page")
- **Description:** Acceptance criteria, design notes, links
- **Labels:** `feature`, `bug`, `chore`, `sprint-1`, `sprint-2`
- **Assignee:** Who's working on it
- **Milestone:** Which sprint or release

**Issues are your single source of truth** for what needs to be built.

<!-- vertical -->

## GitHub Projects = Sprint Board

**GitHub Projects (Board view) gives you a Kanban board:**

| Backlog | Sprint Todo | In Progress | In Review | Done |
|---|---|---|---|---|
| Future work | This sprint's work | Actively coding | PR open | Merged & deployed |

**Setup:**
1. Create a Project in your repo (Board layout)
2. Add columns: Backlog, Todo, In Progress, Review, Done
3. Drag issues between columns as work progresses
4. Filter by sprint milestone to see current sprint only

<!-- vertical -->

## Labels & Milestones for Sprint Tracking

**Labels** categorize work:
- `feature` / `bug` / `chore` / `docs`
- `priority: high` / `priority: low`
- `sprint-1` / `sprint-2`

**Milestones** group issues into time-boxed sprints:
- Create a milestone for each sprint with a due date
- Assign issues to milestones during sprint planning
- Track progress via the milestone's completion percentage

**For P2:** Create at least 2 milestones (Sprint 1, Sprint 2). Each should have 5+ issues.

---

# From PRD to Sprint Backlog

> Connecting what you learned in Weeks 3-4 to how you build in Weeks 7+

<!-- vertical -->

## Revisiting the PRD

**Remember your PRD from Weeks 3-4?** It contains:

- Problem statement and target users
- User stories ("As a ___, I want ___ so that ___")
- Acceptance criteria for each story
- Technical architecture decisions

**Now it's time to turn that PRD into actionable work items.**

Your PRD is the _what_. Your sprint backlog is the _when_ and _how_.

<!-- vertical -->

## Breaking PRD into GitHub Issues

**Each user story becomes one or more GitHub Issues:**

```
PRD User Story:
  "As a user, I want to log in with email
   so that my data is saved across sessions"

GitHub Issues:
  #1  Set up authentication library (chore)
  #2  Create login page UI (feature)
  #3  Implement email/password auth endpoint (feature)
  #4  Add session persistence (feature)
  #5  Write login flow tests (chore)
```

**Rule of thumb:** Each issue should be completable in 1-4 hours. If it's bigger, break it down further.

<!-- vertical -->

## Sprint Planning: Picking Issues

**In sprint planning, you:**

1. Review the backlog (all open issues)
2. Estimate effort (small / medium / large)
3. Pick issues that fit the sprint's capacity
4. Assign them to the sprint milestone
5. Move them to "Sprint Todo" on your board

**For Sprint 1 of P2**, aim for:

- Core data model and API setup
- 1-2 key features (login, main CRUD operation)
- Basic test suite setup
- CI pipeline (GitHub Actions)

---

# Branches, PRs, and Code Review

> Professional workflow with AI assistance

<!-- vertical -->

## Branch-per-Issue Workflow

**Every issue gets its own branch:**

```bash
# Create branch from issue number
git checkout -b feature/42-add-login-page

# Work on the feature...
git add .
git commit -m "Add login page UI (#42)"

# Push and create PR
git push -u origin feature/42-add-login-page
```

**Naming convention:** `type/issue#-short-description`

- `feature/42-add-login-page`
- `fix/57-null-avatar-crash`
- `chore/63-update-dependencies`

<!-- vertical -->

## PRs, Code Review, and AI

**Pull Request best practices:**

- **Link to issue:** "Closes #42" in the PR description auto-closes the issue on merge
- **Small PRs:** Easier to review, fewer conflicts, faster to merge
- **PR template:** Add a template in `.github/pull_request_template.md`
- **AI-assisted review:** Use your IDE AI to review diffs before pushing

**Code review with AI tools:**

```
"Review this diff for bugs, security issues, and style violations.
 Our project uses TypeScript, React, and follows the patterns in
 @.antigravityrules"
```

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

1. **Design first** (Week 6-7) -- Use Claude Web Artifacts to create a quick mockup
2. **Export/screenshot** the mockup
3. **Feed to IDE AI** -- "Implement this design as a React component following @.antigravityrules"
4. **Iterate in code** -- Refine with inline edit and chat

This bridges the gap between prototyping (Claude Web) and implementation (IDE AI).

---

# What to Remember

1. **Agile isn't bureaucracy** -- it's short feedback loops to build the right thing faster.
2. **GitHub Issues + Projects = your scrumboard** -- no extra tools needed.
3. **PRD maps to issues** -- every user story becomes actionable GitHub Issues.
4. **Branch-per-issue** keeps your work organized and reviewable.
5. **Memory files are your most valuable context** -- invest time in `.antigravityrules` / `CLAUDE.md`.
6. **MCP and browser mode are multipliers** -- they connect your AI to real project context.

---

# Looking Ahead

## Next Week: Claude Code (Modality 3)

**Week 8 -- AI in the terminal**

- **Claude Code** -- The third AI modality: autonomous agents in your terminal
- **Agentic coding** -- Multi-file edits, automated refactoring
- **CLAUDE.md deep dive** -- Persistent context for CLI-based AI
- **Chain-of-thought & meta-prompting** -- Advanced prompting techniques
- **Context window optimization** -- Getting the most from limited context

**HW3 (Context Engineering) is due Week 8.** It builds directly on what you learned today -- create your P2 rules file and Scrum board. Start now.

---

# Resources

<!-- vertical -->

## Required Reading

<!-- .slide: class="dense" -->

| Resource | URL |
|----------|-----|
| The Scrum Guide (official) | [scrumguides.org](https://scrumguides.org/) |
| GitHub Projects Documentation | [docs.github.com/issues/planning-and-tracking-with-projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects) |
| GitHub Issues Documentation | [docs.github.com/issues](https://docs.github.com/en/issues) |
| Antigravity Docs | [antigravity.google/docs/get-started](https://antigravity.google/docs/get-started) |

<!-- vertical -->

## Recommended Reading

<!-- .slide: class="dense" -->

| Resource | URL |
|----------|-----|
| Scrum by Jeff Sutherland (course textbook) | Required book for the course |
| Atlassian Agile Coach | [atlassian.com/agile](https://www.atlassian.com/agile) |
| GitHub Flow Guide | [docs.github.com/get-started/using-github/github-flow](https://docs.github.com/en/get-started/using-github/github-flow) |
| MCP Specification | [modelcontextprotocol.io](https://modelcontextprotocol.io/) |
