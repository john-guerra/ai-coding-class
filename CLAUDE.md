# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Complete course materials for **CS 6983: Vibe Coding - AI-Assisted Software Engineering** at Northeastern University (Fall 2026; inaugural offering was Spring 2026 as CS 7180). The course teaches AI-assisted development with professional engineering standards.

## Build Commands

All commands run from the `slides/` directory:

```bash
# Install dependencies
cd slides && npm install

# Development server (live reload)
npm run serve

# Build all slides to dist/
npm run build

# Deploy slides to production server
npm run deploy
```

## Browser Automation

**Always use `claude-in-chrome` (`mcp__claude-in-chrome__*`) for browser automation. Do NOT use Playwright.** Invoke the `claude-in-chrome` skill first, then use its tools for everything: checking rendered slides (the reveal dev server at `http://localhost:1948`), screenshots, console reads, and overflow checks (`?overflow` on a deck, or evaluate the overflow script). It reuses the user's Chrome session and is far more token-efficient than Playwright's per-navigation snapshots.

This applies to **all** browser work, including verifying Claude Design artifacts — open the `render_preview` `serve_url` in claude-in-chrome. Only fall back to Playwright if claude-in-chrome is genuinely unavailable in the session, and say so explicitly first.

## Slide Design System

Slide look-and-feel follows the **"Ink & Ochre"** system — documented in `docs/design/DESIGN_GUIDELINES.md` (canonical, agent-readable reference) and `docs/design/slide-design-system.html` (rendered visual guide). Grounded in johnguerra.co: **Playfair Display + Lato + IBM Plex Mono**, a warm **paper** ground (`#F7F6F2`), **navy** structure, and a **single orange spark** per slide (`#F5811F`; red is retired, emphasis is ink-bold). Implemented in `slides/css/style.css` (tokens + chrome) and `slides/js/mermaid-init.js` (mermaid theme). When creating or editing slides/diagrams, follow it. The `slide-layout` skill still governs layout & overflow budgets — use both.

## Repository Structure

```
aiCoding_Course/
├── course/                        # Course definition (shared memory)
│   ├── COURSE_MEMORY.md          # Master reference (1700+ lines)
│   ├── syllabus.md               # Policies, grading, academic integrity
│   ├── schedule.md               # 15-week + finals schedule
│   ├── readings.md               # Required readings by week
│   ├── projects/                 # Project specifications
│   │   ├── project1-personal-utility.md
│   │   ├── project2-full-stack.md
│   │   └── project3-team-app.md
│   ├── handouts/                 # Supplementary handouts (PDF + source)
│   │   └── public-api-guide.md   # P2 Public API requirements guide
│   └── assignments/              # Homework specifications
│       ├── hw1-mom-test.md
│       ├── hw2-prompt-engineering.md
│       ├── hw3-context-engineering.md
│       ├── hw4-claude-code-workflow-tdd.md
│       └── hw5-custom-skill-mcp.md
│
├── slides/                        # Lecture slides (reveal-md)
│   ├── 01_Introduction/          # Week 1 slides
│   ├── 02_LLMs_fundamentals/     # Week 2 slides
│   ├── css/style.css             # Custom branding (Northeastern red)
│   ├── reveal-md.json            # Reveal.js configuration
│   ├── dist/                     # Compiled HTML output
│   └── package.json              # reveal-md config
│
├── examples/                      # Example projects for class
├── docs/                          # Supporting documentation
│   ├── research/                 # Research notes
│   └── planning/                 # Planning documents
├── other/                         # Presentation drafts
└── website -> [symlink]          # Course website (external repo)
```

## Course Context

**Philosophy:** "Vibe Coding" done right—AI-assisted speed with engineering quality (TDD, CI/CD, evals).

**Three AI Harnesses:**
1. Claude Web (Weeks 4-5) - Architecture, learning, brainstorming
2. Antigravity (Weeks 6-8) - Production code, daily workflow
3. Claude Code (Weeks 9-14) - Agentic coding, automation, extensibility, agent architectures, production

**Key Elements:**
- Weekly Quizzes: 10% of grade, concept-focused assessments
- Evals: Systematic quality measurement for AI-generated code
- 3 portfolio-worthy projects with increasing complexity

**Tech Stack (for student projects):** React/Next.js, Node.js/Express, PostgreSQL/MongoDB, Jest/Vitest, Playwright, GitHub Actions

## Course Website

`website/` is a **symlink to a SEPARATE git repo** — the instructor's live personal site:
- Target: `/Users/aguerra/workspace/homepageJohnGuerra/classes/aiCoding_fall_2026/`
- That repo's remote: `git@github.com:john-guerra/homepageJohnGuerra.git` (branch `main`).
- Website files are **not tracked in this (ai-coding-class) repo**; commits/pushes for them happen in the `homepageJohnGuerra` repo. The `website` symlink itself is local-only (not tracked).
- **Per-semester folders:** each offering has its own `classes/<course>_<term>_<year>/` folder. `aiCoding_spring_2026/` is the **legacy Spring 2026 (CS 7180)** site — keep it as-is. `aiCoding_fall_2026/` is the current **Fall 2026 (CS 6983)** site the symlink points to.
- Fall folder's own URLs use `aiCoding_fall_2026` / `slidesBase = .../aiCoding_fall2026/`. The slides deploy path in `slides/package.json` now targets `aiCoding_fall2026` (matches the website `slidesBase` — done in commit `aadf85e`), so the lecture links resolve; run `npm run deploy` to publish the lectures there. Still open: the Fall folder carries the old `CS7180_VibeCoding_Syllabus.docx` — regenerate a CS 6983 version.

**⚠️ Pushing this repo publishes the instructor's live website. Do NOT push `homepageJohnGuerra` without explicit approval.** Also pull it before editing — it receives student-PR merges, so a local checkout may be stale.

Editing workflow (in `website/`, i.e. the symlinked dir):
1. Edit `website/index.pug` (schedule/readings/projects) and/or `website/timeline.js` (the D3 timeline widget: `totalWeeks`, `phases`, `projects`, `weeklyFocus`).
2. Regenerate HTML: `npx pug website/index.pug --out website/ --pretty` — **never edit `website/index.html` directly.**
3. Commit in the `homepageJohnGuerra` repo with explicit pathspecs (avoid its untracked `.env`/`.vscode`); push only with approval.

## Canvas LMS Integration

**Course ID:** 246270 (Spring 2026 AI Coding CS7180)
**Canvas Domain:** northeastern.instructure.com

Two MCP servers are configured globally at `~/.claude.json`:

**`canvas-lms`** (`canvas-mcp-server@2.2.3`) — primary server for:
- Assignments and quizzes
- Modules and pages
- Announcements and discussions
- Grades and rubrics

**`canvas-extras`** (`tools/canvas-extras-mcp/`) — supplements with missing endpoints:
- `canvas_create_discussion_topic` — create discussion topics
- `canvas_create_quiz` — create quizzes (preferred over `canvas-lms` for quiz creation)
- `canvas_create_quiz_question` — add questions to quizzes
- `canvas_list_quiz_questions` — list questions in a quiz
- `canvas_list_quizzes` — list all quizzes in a course
- `canvas_update_quiz_question` — update existing quiz questions
- `canvas_create_rubric` — create a rubric and associate it with an assignment for grading
- `canvas_update_assignment` — update assignment fields not supported by `canvas-lms` (e.g. `assignment_group_id`, `position`)
- `canvas_list_group_categories` — list all group categories (group sets) in a course
- `canvas_create_group` — create a group inside a group category (group set)
- `canvas_update_group` — update an existing group (e.g. rename it)

**Quiz creation workflow:** Use `canvas-extras` (not `canvas-lms`) for creating quizzes and adding questions. The `canvas-extras` server provides the full quiz creation pipeline: `canvas_create_quiz` → `canvas_create_quiz_question` (repeat) → `canvas_list_quiz_questions` (verify). Note: `canvas_list_quiz_questions` paginates at 10 results by default.

All tools default to `course_id = 246270`.

**Safety rule:** Never delete or modify Canvas content (assignments, quizzes, discussions) that already has student submissions.

**Canvas API gap policy:** When `canvas-lms` does not support a needed Canvas API feature (missing parameters, endpoints, etc.), implement the missing functionality as a new tool in `canvas-extras` (`tools/canvas-extras-mcp/index.js`). Never call the Canvas API directly via `fetch`/`node` scripts — always go through an MCP tool.

## Course Content Sync

When modifying weekly topics, dates, or course structure, ALL of these must stay in sync:

| Artifact | File(s) | What to update |
|----------|---------|---------------|
| Schedule | `course/schedule.md` | Overview table, detailed schedule, key dates |
| Readings | `course/readings.md` | Week headers, reading lists, summary table |
| Course Memory | `course/COURSE_MEMORY.md` | Schedule table, key dates, P3 due |
| Timeline | `website/timeline.js` | `weeklyFocus`, `totalWeeks`, phases, projects |
| Website | `website/index.pug` | Schedule table, readings accordion, project badges |
| Slides | `slides/XX_Topic/index.md` | Title slide week number and topic |
| Projects | `course/projects/*.md` | Due dates |
| Research | `docs/research/*.md` | If topics shifted between weeks |

After website changes: `npx pug website/index.pug --out website/ --pretty`
**Never edit `website/index.html` directly** — always edit `index.pug` and regenerate.

Use `/sync-course` skill to verify all artifacts are in sync.

## Current Curriculum State (Fall 2026)

> **Fall 2026 renumber:** The Spring 2026 15-week schedule (with a Spring Break week) was mapped onto the Fall 2026 calendar as **14 teaching weeks + Finals** (no full-week break). Old weeks 10–15 shifted down to 9–14; Finals replaces the old Week 16. Course code changed **CS 7180 → CS 6983**. Two sections: Oakland/Online (Tu/Fri) and San Jose (Wed).

### W9–Finals Structure (Claude Code block)
- **W9**: Claude Code Foundations (agentic loop, CLAUDE.md, tools, context, thinking) — **P2 due, P3 team formation**
- **W10**: Claude Code Workflows & Dev Practices (Explore→Plan→Implement→Commit, TDD, CI/CD, GitHub)
- **W11**: Claude Code Extensibility (skills, hooks, MCP, sub-agents, plugins, parallel sessions)
- **W12**: Agent Architectures & SDK (6 patterns, SDK, multi-agent coordination)
- **W13**: AI Security & Code Quality (OWASP, 8-gate pipeline, slopsquatting, ethics, AI code review, evals)
- **W14**: Production & Course Synthesis (deployment, monitoring, cost optimization, RAG, demo prep)
- **Finals**: Finals Week — P3 Due (Dec 14–20, 2026)

### Homework Assignments (5 total, 5% each = 25%)
- HW1 (W4): Prompt Engineering Battle
- HW2 (W5): Mom Test Interviews + User Stories
- HW3 (W8): Context Engineering (Rules + Scrum)
- HW4 (W10): Claude Code Workflow & TDD
- HW5 (W12): Custom Skill + MCP Integration
- No HW6 — removed to reduce load during P3 sprints

### Research Reference
`docs/research/claude_code_course_research.md` contains pedagogical research for W10-W15.
- **"Updated Research" section** (Anthropic blog 2025-2026) — all claims verified with source URLs
- **Original W10-W14 section** — some claims lack clickable source URLs (known debt)
- Use `/verify-references` skill to audit references

## When talking to me always include a ⭐️ at the beginning of the message

Unless of course you are writing a message that requires a different format.


