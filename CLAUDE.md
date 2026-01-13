# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Complete course materials for **CS 7180: Vibe Coding - AI-Assisted Software Engineering** at Northeastern University (Spring 2026). The course teaches AI-assisted development with professional engineering standards.

## Build Commands

All commands run from the `slides/` directory:

```bash
# Install dependencies
cd slides && npm install

# Build all slides to dist/
npm run build

# Watch mode (auto-rebuild on changes)
npm run build:watch
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
├── slides/                        # Lecture slides (Marp)
│   ├── 01_Introduction/          # Week 1 slides
│   ├── 02_LLMs_fundamentals/     # Week 2 slides
│   ├── css/marp-theme.css        # Northeastern-branded theme
│   ├── dist/                     # Compiled HTML output
│   └── package.json              # Marp CLI config
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

## Creating Slides (Marp Format)

Each lecture folder contains:
- `index.md` - Marp source with YAML frontmatter
- `images/` - Lecture-specific images

Marp slide template:
```markdown
---
marp: true
theme: default
paginate: true
---

<style>
@import '../css/marp-theme.css';
</style>

# Slide Title

Content here

---

# Next Slide
```

## Course Context

**Philosophy:** "Vibe Coding" done right—AI-assisted speed with engineering quality (TDD, CI/CD, evals).

**Three AI Modalities:**
1. Claude Web (Week 2) - Architecture, learning, brainstorming
2. Cursor IDE (Weeks 4-5) - Production code, daily workflow
3. Claude Code (Week 6+) - Automation, multi-file refactoring

**Key Elements:**
- No-AI Challenge (Week 10): 90-min coding exam without AI, must pass 60%+
- Evals: Systematic quality measurement for AI-generated code
- 3 portfolio-worthy projects with increasing complexity

**Tech Stack (for student projects):** React/Next.js, Node.js/Express, PostgreSQL/MongoDB, Jest/Vitest, Playwright, GitHub Actions
