---
title: "CS 6983: Advanced IDE AI Features"
theme: white
revealOptions:
  transition: convex
  hash: true
  history: true
---

<!-- .slide: id="title" -->

<span class="course-week">CS 6983 · Week 8 · [Class](https://johnguerra.co/classes/aiCoding_fall_2026/) · [Slides](https://johnguerra.co/lectures/aiCoding_fall2026/08_Advanced_IDE_Features/)</span>

## Advanced IDE AI Features

### Building P2 from Zero · Memory · MCP · Browser · Debugging

<div class="title-footer">

**John Alexis Guerra Gómez** · [johnguerra.co](http://johnguerra.co/)

<small>jguerra at northeastern.edu · Northeastern University · Khoury College</small>

<img src="../img/seal_logotype-768x252.png" alt="Northeastern University" class="nu-seal">

<small class="cc-license">© 2026 John A. Guerra Gómez · Licensed <a href="https://creativecommons.org/licenses/by-nc/4.0/">CC BY-NC 4.0</a></small>

</div>

---

# What We'll Cover Today

1. Where We Are -- Week 8 checkpoint
2. Building P2 from Zero -- the pipeline and the repo
3. Steps 0-7 -- one checklist each, with memory files, MCP, and browser mode where you use them
4. Debugging with AI
5. Pitfalls -- and what P2 also requires

---

# Where We Are

> Week 8 -- Start P2 the right way

<!-- vertical -->

## Recap: Weeks 6-7

**Week 6:** IDE fundamentals -- how AI tools work, modes, rules files, context references

**Week 7:** Process -- Agile/Scrum, GitHub scrumboard, pair workflow, partner code review

**You have the tools and the process.** Today you put them together: an empty folder to a deployed full-stack app, one checklist at a time.

---

# Building P2 from Zero

> The whole course pipeline, end to end

<!-- vertical -->

## The Pipeline

<pre class="mermaid">
%%{init: {'theme': 'default', 'flowchart': {'nodeSpacing': 20, 'rankSpacing': 30}}}%%
flowchart TB
    subgraph plan["Plan"]
        direction LR
        A["0-1 · Idea, research, PRD"] --> B["2 · DESIGN.md"] --> C["3 · AGENTS.md"]
    end
    subgraph build["Build, every sprint"]
        direction LR
        D["4 · Board"] --> E["5 · CI"] --> F["6 · Feature, test-first"] --> G["7 · Deploy"]
    end
    plan --> build
</pre>

**Plan before code:** the PRD, `DESIGN.md`, and `AGENTS.md` exist before the first feature does.

Worked example: [vis-paper-planner](https://github.com/john-guerra/vis-paper-planner), a Next.js + Supabase app built with Antigravity.

<!-- vertical -->

<!-- .slide: class="dense" -->

## The Repo It Produces

```text
p2-your-app/
├── AGENTS.md              # shared rules -- every IDE tool reads it
├── CLAUDE.md              # W9: "@AGENTS.md" + Claude-only notes
├── DESIGN.md              # UI tokens and rules (Step 2)
├── README.md   .env.example     # names only, never values
├── .agents/ .cursor/ .claude/   # only scoped rules and skills
├── .github/
│   ├── workflows/ci.yml
│   └── ISSUE_TEMPLATE/   pull_request_template.md
├── docs/
│   ├── PRD.md   research/   design/
│   ├── api/openapi.yaml   architecture.md
│   ├── decisions/         # one file per big choice
│   └── sprints/sprint-1/  # planning, standups, retro
└── src/   tests/   e2e/
```

**Memory files point to `docs/`; they don't paste it.** Everything in `AGENTS.md` loads on every request.

---

<!-- .slide: class="dense" -->

## Steps 0-1: Idea, Research, PRD

<style>
.reveal li:has(> input[type="checkbox"]) { list-style: none; }
.reveal li > input[type="checkbox"] { transform: scale(1.5); margin: 0 0.6em 0 -1em; }
</style>

- [ ] Brainstorm 2-3 ideas with Claude Web; pick one a real user would want (Weeks 4-5)
- [ ] _Optional for P2:_ 3+ Mom Test conversations, notes in `docs/research/`
- [ ] `docs/PRD.md`: problem, personas, user stories, non-goals
- [ ] Every user story has acceptance criteria you could write a test for
- [ ] Stack picked from the P2 list: React/Next.js + Tailwind, Express or Next.js API routes, PostgreSQL or MongoDB, JWT or OAuth

**See it:** [PRD](https://github.com/john-guerra/vis-paper-planner/blob/step-1-plan/docs/prd.md) · [Mom Test summary](https://github.com/john-guerra/vis-paper-planner/blob/step-1-plan/docs/research/mom-test-summary.md) · [idea snapshot](https://github.com/john-guerra/vis-paper-planner/tree/step-0-idea)

---

<!-- .slide: class="dense" -->

## Step 2: DESIGN.md

- [ ] A mockup in `docs/design/` -- a Claude Web artifact, Figma export, or sketch
- [ ] `DESIGN.md` at the repo root: tokens (colors, type, spacing) + sections from Overview to Do's and Don'ts
- [ ] `npx @google/design.md lint DESIGN.md` passes
- [ ] Tailwind theme generated from it (`export --format css-tailwind`), not hand-copied
- [ ] `AGENTS.md` says "UI work follows `DESIGN.md`"

Format: [Google Labs DESIGN.md spec](https://github.com/google-labs-code/design.md) (alpha, open source). It loads like any context file, so keep it short.

**See it:** [DESIGN.md](https://github.com/john-guerra/vis-paper-planner/blob/step-2-design/DESIGN.md) · [mockup](https://github.com/john-guerra/vis-paper-planner/blob/step-2-design/docs/design/mockup.png)

<!-- vertical -->

<!-- .slide: class="dense" -->

## What a DESIGN.md Looks Like

```markdown
--- 
name: Paper Planner
colors:
  primary: "#1F3A5F"     # headings, primary buttons
  tertiary: "#E07A1F"    # the single accent: one per screen
  surface: "#FFFFFF"
typography:
  body-md: { fontFamily: Inter, fontSize: 16px, lineHeight: 1.5 }
spacing: { sm: 8px, md: 16px, lg: 32px }
--- 
## Overview
Calm, research-tool feel. Content first, no decoration.
## Do's and Don'ts
- Do reuse components in src/components before making new ones
- Don't use the accent color for more than one action per screen
```

Tokens up top for machines, prose below for judgment.

<!-- vertical -->

<!-- .slide: class="dense" -->

## Mockup-to-Code: The Workflow

**Turn a design into working code:**

1. **Get a mockup** -- Figma export, screenshot, hand-drawn sketch, or text description
2. **Share it with your IDE AI** -- Drag the image into the chat panel
3. **Prompt for implementation** -- "Build this UI using React and Tailwind CSS, following `DESIGN.md`"
4. **Iterate** -- "Make the header sticky" / "Add responsive breakpoints"

---

<!-- .slide: class="dense" -->

## Step 3: Rules & Memory Files

- [ ] One `AGENTS.md` at the root, written together -- no copies in tool folders
- [ ] Stack + versions, exact commands, conventions, testing rule, security don'ts, where docs live
- [ ] Your workflow: roles rotate each sprint, one branch per issue, partner review
- [ ] Under ~200 lines; it links to `docs/` instead of pasting it
- [ ] Tool folders (`.agents/`, `.cursor/`) hold only path-scoped rules or skills
- [ ] Changed through PRs, revisited at every retro

`AGENTS.md` counts as your shared rules file for HW3 and P2.

**See it:** [AGENTS.md](https://github.com/john-guerra/vis-paper-planner/blob/step-3-rules/AGENTS.md) <small>(one shared file; <code>CLAUDE.md</code> just imports it)</small>

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
| --- | --- | --- |
| **Antigravity** | `AGENTS.md` / `.agents/rules/` | Project patterns, conventions, do's/don'ts |
| **Claude Code** | `CLAUDE.md` | Build commands, architecture, project context |
| **Cursor** | `.cursor/rules/` / `AGENTS.md` | Same as above |

`AGENTS.md` is read by Antigravity, Cursor, Copilot, and Claude Code -- one file your whole pair's toolchain shares.

<!-- vertical -->

<!-- .slide: class="dense" -->

## What Makes a Good Memory File


- **Tech stack and versions** -- "Next.js 16, TypeScript 5, Tailwind 4"
- **Architecture decisions** -- "Server components by default, client only for interactivity"
- **Code patterns** -- "Use Zod for validation, Prisma for DB access"
- **Common pitfalls** -- "Never use `any` type, always handle null cases"

Think of it as onboarding docs that your AI reads before every interaction.

<!-- vertical -->

<!-- .slide: class="dense" -->

## Evolving Rules as a Pair

**Your `AGENTS.md` is the single source of truth** -- both partners contribute and maintain it.

```text
## Tech Stack
- Next.js 16, TypeScript, Tailwind, Prisma, PostgreSQL
## Conventions
- Components: PascalCase, one per file
- API routes: kebab-case; database: snake_case columns
## Pair Workflow
- Product Owner / Scrum Master rotate each sprint
- Branch naming: feature/[issue#]-[description]
- Commit messages: "Verb description (#issue)"
- Failing test committed before the code
- All PRs need partner review before merge
```

<!-- vertical -->

## Rules as Single Source of Truth

**When partners disagree on a convention, the rules file is the tiebreaker.**

- **Before starting P2:** Agree on initial rules together during sprint planning
- **During development:** Update rules when you discover new patterns or pain points
- **In code review:** Reference the rules file -- "This doesn't match our convention in `AGENTS.md` line 12"

**Tip:** Commit rules file changes in their own PR so both partners can review and approve convention changes.

---

<!-- .slide: class="dense" -->

## Step 4: Backlog & Board

- [ ] User stories become GitHub issues from an issue template: story, acceptance criteria, estimate
- [ ] One milestone per sprint; labels `feature`, `bug`, `chore`
- [ ] Board columns: Todo · In Progress · In Review · Done
- [ ] `docs/sprints/sprint-1/planning.md`: goal, issues, estimates, who is PO and SM
- [ ] PR template: `Closes #N`, how it was tested, partner-review checkbox
- [ ] Per issue: branch → implement in Agent mode → self-review with AI → PR → partner review → merge → Done

**See it:** [Sprint 1 milestone and issues](https://github.com/john-guerra/vis-paper-planner/milestone/1) · [sprint docs](https://github.com/john-guerra/vis-paper-planner/tree/step-4-board/docs/sprints/sprint-1)

---

<!-- .slide: class="dense" -->

## Step 5: CI

- [ ] `.github/workflows/ci.yml` runs on every PR
- [ ] Stages: lint + format → unit + integration → build → E2E (Playwright)
- [ ] A security-scan job (for example `npm audit`, CodeQL)
- [ ] PRs merge only when CI is green (branch protection)
- [ ] A pre-commit hook runs lint and format locally (Husky + lint-staged)
- [ ] CI never uses production secrets; tests hit a local or test database

Set this up **before** the first feature: a red CI run on day one is cheap; on day ten it is a week of debugging.

**See it:** [CI workflow](https://github.com/john-guerra/vis-paper-planner/blob/step-5-ci/.github/workflows/ci.yml) · [pre-commit hook](https://github.com/john-guerra/vis-paper-planner/blob/step-5-ci/.husky/pre-commit)

---

<!-- .slide: class="dense" -->

## Step 6: First Feature, Test-First

- [ ] Pick a thin vertical slice: one page → one API route → one table
- [ ] Commit the failing test first (red), then the code (green), then refactor
- [ ] Schema lives in a migration file, not clicked together in a dashboard
- [ ] A seed script, so your partner and CI get the same data
- [ ] Error paths tested: empty input, bad input, database down
- [ ] The endpoint documented in `docs/api/openapi.yaml`
- [ ] The page checked against the mockup in browser mode

Two tools help most here: **MCP** to read the real schema, and **browser mode** to see the real page.

**See it:** [test-first commits](https://github.com/john-guerra/vis-paper-planner/compare/step-5-ci...step-6-slice)

<!-- vertical -->

## What Is MCP?

**Model Context Protocol (MCP)** lets AI tools connect to external data sources and services.

```text
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
| --- | --- | --- |
| **Database** | PostgreSQL, MongoDB | "What's the schema for the users table?" |
| **GitHub** | Issues, PRs, Actions | "What's failing in CI right now?" |
| **Docs** | API documentation | "How does the Stripe webhook API work?" |
| **File system** | Local files | "Find all files that import this module" |
| **Browser** | Running web app | "What does the login page look like?" |

MCP is still evolving, but it's the direction all AI tools are heading -- your AI becomes a connected assistant, not an isolated chatbot.

<!-- vertical -->

## Browser Mode

**Browser mode** lets the AI interact with your running application:

- Take screenshots of your app and analyze UI issues
- Navigate through user flows to find bugs
- Compare your implementation to a design mockup
- Debug visual regressions

**Workflow:** Run your dev server, point the AI's browser at `localhost:3000`, then ask it to evaluate what it sees.

Useful for: "Does this match the Figma design?", "Why is the layout broken on mobile?", "Walk through the signup flow and find issues."

---

# Debugging with AI

> Your AI partner for finding and fixing bugs

<!-- vertical -->

## The AI Debugging Workflow

**When you hit an error, follow this pattern:**

```text
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

```text
TypeError: Cannot read properties of undefined (reading 'map')
    at UserList (src/components/UserList.tsx:15:22)
    at renderWithHooks (node_modules/react-dom/...)
```

**Good prompt:** "This error occurs in UserList.tsx line 15. The `users` prop is sometimes undefined. Show me how to add a safe check and a loading state."

**Bad prompt:** "Fix this error" (too vague -- AI might add a generic try-catch instead of addressing the root cause)

<!-- vertical -->

<!-- .slide: class="dense" -->

## Rubber Duck Debugging with AI

**Sometimes the best debugging is explaining the problem out loud.**

Use the AI as your rubber duck:

- "Walk me through what happens when a user submits the form. I think the issue is somewhere between the form handler and the API call."
- "I expect this function to return an array of users, but it returns undefined. Here's the code -- what am I missing?"
- "This test passes locally but fails in CI. What could cause environment-specific test failures?"

**Watch for hallucinated fixes:** AI may confidently suggest changes that _sound_ right but don't address the actual bug. Always verify by running the code.

---

<!-- .slide: class="dense" -->

## Step 7: Deploy

- [ ] Production deploys from `main`; every PR gets a preview deploy
- [ ] Env vars set per environment in the host; `.env.example` lists names only
- [ ] Database migrations run against production as a written-down step
- [ ] Previews use a test database (or you know they share production data)
- [ ] One health-check URL that proves the app _and_ the database are up
- [ ] README: live URL, run locally, deploy steps

Deploy the empty starter on day one -- [vis-paper-planner](https://vis-paper-planner.vercel.app) did -- so deploying is never the risky last step.

**See it:** [deploy notes](https://github.com/john-guerra/vis-paper-planner/blob/step-7-deploy/docs/deploy.md)

<!-- vertical -->

<!-- .slide: class="dense" -->

## Where to Deploy (Pick What Fits Your Stack)

| You have | Options | What the docs say |
| --- | --- | --- |
| Next.js, with API routes | [Vercel](https://vercel.com/docs/deployments/environments), [Netlify](https://docs.netlify.com/frameworks/next-js/overview/) | Vercel creates a preview deployment when you "Create a pull request"; Netlify lists Route Handlers as "Full Support" |
| A separate Express server | [Render](https://render.com/docs/deploys) | You link a branch, and Render "runs this command to start your service" |
| PostgreSQL | [Supabase](https://supabase.com/docs/guides/platform/billing-on-supabase) | Free projects can be paused; on Pro, "no projects ... will be paused" |
| MongoDB | MongoDB Atlas | Hosted MongoDB with a free tier |

**Every host needs the same five things:** a build command, env vars, migrations, preview vs. production, and a health check.

---

<!-- .slide: class="dense" -->

## Pitfalls

- **A `CLAUDE.md` turns off `AGENTS.md` in Claude Code** -- Claude reads it "only when you have no `CLAUDE.md`" (a personal `CLAUDE.local.md` counts). Fix: `CLAUDE.md` = `@AGENTS.md`
- **Rules copied into several tool folders** -- loaded twice, then they drift
- **Growing memory files** -- "Longer files consume more context and reduce adherence"
- **Nested `AGENTS.md`** -- VS Code Copilot ignores them by default
- **A brand's DESIGN.md from a gallery** -- your app looks like someone else's
- **A committed `.env`** -- deleting it isn't enough; rotate the keys

<small>Quotes: [Claude Code memory docs](https://code.claude.com/docs/en/memory) · [VS Code custom instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)</small>

---

<!-- .slide: class="dense" -->

## P2 Also Requires

The checklists get you started. The [P2 spec](https://github.com/john-guerra/ai-coding-class/blob/main/course/projects/project2-full-stack.md) also grades:

| Area | Required |
| --- | --- |
| **Features** | Auth (JWT or OAuth) · 3+ features · real-time updates or complex state · a public API |
| **Testing** | Unit + integration + E2E, failing tests committed first |
| **CI/CD** | Multi-stage pipeline · deploy previews · security scanning · automated deploy |
| **Process** | 2+ sprints, each a milestone with 5+ issues · planning + retros · 3+ standups per partner per sprint · 5+ PR reviews per partner · estimates |
| **Docs** | README · OpenAPI docs · architecture + DB-schema diagrams · setup guide · 10-min demo video · contribution log · 300-word reflection each |

---

# What to Remember

1. **Plan before code** -- the PRD, `DESIGN.md`, and `AGENTS.md` come before the first feature.
2. **One shared `AGENTS.md` is your pair's contract** -- every IDE tool reads it; change it through PRs.
3. **Memory files point to `docs/`** -- they don't paste it.
4. **Start with a thin slice, test first** -- one page, one route, one table, then widen.
5. **MCP and browser mode let the AI check real data and the real UI.**
6. **CI and deploys from day one** -- and always verify AI fixes by running the code.

---

<!-- .slide: class="dense" -->

# Looking Ahead

## Coming Up Next: Claude Code (Harness 3)

**Week 9 -- AI in the terminal**

- **P2 is due** at the beginning of Week 9
- **Claude Code** -- The third AI harness: autonomous agents in your terminal
- **Agentic coding** -- Multi-file edits, automated refactoring
- **CLAUDE.md deep dive** -- Persistent context for CLI-based AI
- **P3 pair formation** -- Form your P3 pairs in Week 9

**HW3 (Context Engineering) is due this week.** Your rules file and Scrum board should be in great shape by now.

---

# Resources

<!-- vertical -->

## Required Reading

<!-- .slide: class="dense" -->

| Resource | URL |
| ---------- | ----- |
| What is MCP? | [modelcontextprotocol.io/docs/getting-started/intro](https://modelcontextprotocol.io/docs/getting-started/intro) |
| MCP Architecture Overview | [modelcontextprotocol.io/docs/learn/architecture](https://modelcontextprotocol.io/docs/learn/architecture) |
| Antigravity Docs: Browser | [antigravity.google/docs/ide/browser](https://antigravity.google/docs/ide/browser/) |

<!-- vertical -->

## Recommended Reading

<!-- .slide: class="dense" -->

| Resource | URL |
| ---------- | ----- |
| MCP GitHub Repository | [github.com/modelcontextprotocol](https://github.com/modelcontextprotocol) |
| Chrome DevTools Debugging Guide | [developer.chrome.com/docs/devtools](https://developer.chrome.com/docs/devtools/) |
| Node.js Debugging Guide | [nodejs.org/en/learn/getting-started/debugging](https://nodejs.org/en/learn/getting-started/debugging) |

<!-- vertical -->

## Sources for Today's Section

<!-- .slide: class="dense" -->

| Topic | Source |
| --- | --- |
| DESIGN.md format | [github.com/google-labs-code/design.md](https://github.com/google-labs-code/design.md) |
| AGENTS.md standard | [agents.md](https://agents.md/) |
| Antigravity rules | [antigravity.google/docs/rules](https://antigravity.google/docs/rules) |
| Claude Code memory | [code.claude.com/docs/en/memory](https://code.claude.com/docs/en/memory) |
| Worked example | [github.com/john-guerra/vis-paper-planner](https://github.com/john-guerra/vis-paper-planner) |
