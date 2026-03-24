# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Complete course materials for **CS 7180: Vibe Coding - AI-Assisted Software Engineering** at Northeastern University (Spring 2026). The course teaches AI-assisted development with professional engineering standards.

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

## Repository Structure

```
aiCoding_Course/
├── course/                        # Course definition (shared memory)
│   ├── COURSE_MEMORY.md          # Master reference (1700+ lines)
│   ├── syllabus.md               # Policies, grading, academic integrity
│   ├── schedule.md               # 15-week schedule
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

**Three AI Modalities:**
1. Claude Web (Weeks 4-5) - Architecture, learning, brainstorming
2. Antigravity (Weeks 6-8) - Production code, daily workflow
3. Claude Code (Weeks 10-14) - Agentic coding, automation, extensibility, agent architectures

**Key Elements:**
- Weekly Quizzes: 10% of grade, concept-focused assessments
- Evals: Systematic quality measurement for AI-generated code
- 3 portfolio-worthy projects with increasing complexity

**Tech Stack (for student projects):** React/Next.js, Node.js/Express, PostgreSQL/MongoDB, Jest/Vitest, Playwright, GitHub Actions

## Course Website

The course website is in `website/` (symlink to external repo).

**Important:** Don't modify `website/index.html` directly. Instead:
1. Edit `website/index.pug`
2. Regenerate HTML: `npx pug website/index.pug --out website/ --pretty`

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

## Website Updates

When updating course content (schedule, readings, HWs, etc.), the **website must also be updated**:

1. **Edit `website/index.pug`** — schedule table (~lines 179-246), grading section, readings accordion (~lines 327-510)
2. **Edit `website/timeline.js`** — `courseData` object: phases, homeworks array, and weekly `weeks` array
3. **Regenerate HTML**: `npx pug website/index.pug --out website/ --pretty`
4. **Never edit `website/index.html` directly** — always edit `index.pug` and regenerate

## Current Curriculum State (March 2026)

### W10-W14 Structure (Redesigned March 2026)
- **W10**: Claude Code Foundations (agentic loop, CLAUDE.md, tools, context, thinking)
- **W11**: Claude Code Workflows & Dev Practices (Explore→Plan→Implement→Commit, TDD, CI/CD, GitHub)
- **W12**: Claude Code Extensibility (skills, hooks, MCP, sub-agents, plugins, parallel sessions)
- **W13**: Agent Architectures & Agent SDK (6 patterns, SDK, multi-agent, safety)
- **W14**: Emerging AI Engineering (code review automation, caching, RAG, model routing, monitoring)
- **W15**: Project Due Date only (no lecture)

### Homework Assignments (5 total, 5% each = 25%)
- HW1 (W4): Prompt Engineering Battle
- HW2 (W5): Mom Test Interviews + User Stories
- HW3 (W8): Context Engineering (Rules + Scrum)
- HW4 (W11): Claude Code Workflow & TDD
- HW5 (W12): Custom Skill + MCP Integration
- No HW6 — removed to reduce load during P3 sprints

### Research Reference
`docs/research/claude_code_course_research.md` contains detailed pedagogical research for W10-W14 with data-backed insights, practical exercises, and additional readings. Key findings to incorporate into slides:
- CLAUDE.md: HumanLayer data — <200 lines = >92% rule-application, 400+ = ~71%
- 45% of AI-generated code contains OWASP vulnerabilities (Veracode 2025)
- LLM-as-judge aligns with human judgment at 85% (vs 81% human-to-human)
- AI PRs have 1.57x more security issues, 2.74x more XSS (ClackyAI)
- C.L.E.A.R. framework for reviewing AI code
- Property-based testing with fast-check: 23-37% improvement in pass rates
- Slopsquatting: AI hallucinating package names that attackers register

## When talking to me always include a ⭐️ at the beginning of the message

Unless of course you are writing a message that requires a different format.


