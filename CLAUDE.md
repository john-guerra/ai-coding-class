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
│   └── assignments/              # Homework specifications
│       ├── hw1-mom-test.md
│       ├── hw2-prompt-engineering.md
│       ├── hw3-context-engineering.md
│       ├── hw4-tdd-cicd-evals.md
│       ├── hw5-parallel-agents.md
│       └── hw6-production-readiness.md
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

## Key Course Files

| File | Purpose |
|------|---------|
| `course/COURSE_MEMORY.md` | Complete course plan, rubrics, policies |
| `course/syllabus.md` | Official syllabus |
| `course/schedule.md` | 15-week schedule with deliverables |
| `course/readings.md` | Required readings by week |

## Creating Slides (reveal-md Format)

Each lecture folder contains:
- `index.md` - Reveal.js markdown with YAML frontmatter
- `images/` - Lecture-specific images

Slide template:
```markdown
---
title: "Lecture Title"
theme: white
revealOptions:
  transition: convex
  hash: true
  history: true
---

## Slide Title

Content here

---

# New Section (horizontal)

----

## Sub-slide (vertical)
```

**Slide separators:**
- `---` creates a new horizontal slide (new topic)
- `----` creates a vertical slide (subtopic under current section)

**Reveal.js built-in classes:**
- `r-fit-text` - Auto-scales text to fit slide
- `r-stretch` - Makes element fill remaining vertical space
- `r-stack` - Centers/layers elements for progressive disclosure

## Course Context

**Philosophy:** "Vibe Coding" done right—AI-assisted speed with engineering quality (TDD, CI/CD, evals).

**Three AI Modalities:**
1. Claude Web (Week 2) - Architecture, learning, brainstorming
2. Antigravity (Weeks 5-6) - Production code, daily workflow
3. Claude Code (Week 7+) - Automation, multi-file refactoring

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

**Quiz creation workflow:** Use `canvas-extras` (not `canvas-lms`) for creating quizzes and adding questions. The `canvas-extras` server provides the full quiz creation pipeline: `canvas_create_quiz` → `canvas_create_quiz_question` (repeat) → `canvas_list_quiz_questions` (verify). Note: `canvas_list_quiz_questions` paginates at 10 results by default.

All tools default to `course_id = 246270`.

**Safety rule:** Never delete or modify Canvas content (assignments, quizzes, discussions) that already has student submissions.

**Canvas API gap policy:** When `canvas-lms` does not support a needed Canvas API feature (missing parameters, endpoints, etc.), implement the missing functionality as a new tool in `canvas-extras` (`tools/canvas-extras-mcp/index.js`). Never call the Canvas API directly via `fetch`/`node` scripts — always go through an MCP tool.
