# CS 7180: Vibe Coding — AI-Assisted Software Engineering

> **Northeastern University, Khoury College of Computer Sciences**
> Spring 2026 · Oakland Campus

## Course Overview

"Vibe Coding" done right: AI-assisted development **speed** combined with professional engineering **quality**. Students learn to build fast *and* build right — using TDD, CI/CD, evals, and security practices alongside modern AI coding tools.

**Instructor:** John Alexis Guerra Gómez ([jguerra@northeastern.edu](mailto:jguerra@northeastern.edu))

> 🛠️ **Maintainers & AI agents:** [`CLAUDE.md`](CLAUDE.md) is the authoritative operational guide (build commands, Canvas MCP integration, content-sync rules, current curriculum state). When README and `CLAUDE.md` disagree, `CLAUDE.md` wins.

## Quick Links

| Resource | Description |
|----------|-------------|
| [Syllabus](course/syllabus.md) | Policies, grading, academic integrity |
| [Schedule](course/schedule.md) | 15-week + finals schedule with deliverables |
| [Readings](course/readings.md) | Required readings by week |
| [Course Memory](course/COURSE_MEMORY.md) | Complete master reference (1700+ lines) |

## The Three AI Harnesses

The course progresses through three AI coding *harnesses* (the agent runtime/interface around a model), from conversational to fully agentic:

| Harness | Weeks | Best For |
|---------|-------|----------|
| **Claude Web** | 4–5 | Architecture planning, learning, brainstorming, rapid Artifact prototyping |
| **Antigravity (IDE)** | 6–8 | Production code, daily development workflow, in-editor agents |
| **Claude Code (CLI)** | 10–15 | Agentic coding, automation, extensibility, multi-agent architectures |

## Projects (50%)

| Project | Weight | Due |
|---------|--------|-----|
| [Project 1: Personal Utility App](course/projects/project1-personal-utility.md) (Claude Web Artifact) | 13% | Week 6 |
| [Project 2: Full-Stack Application](course/projects/project2-full-stack.md) | 18% | Week 10 |
| [Project 3: Production App with Claude Code Mastery](course/projects/project3-team-app.md) | 19% | Finals Week (Apr 21, 2026) |

## Homework (25%)

Five scaffolding assignments that feed directly into the projects:

| # | Assignment | Week |
|---|-----------|------|
| HW1 | [Prompt Engineering Battle](course/assignments/hw2-prompt-engineering.md) | 4 |
| HW2 | [Mom Test Interviews + User Stories](course/assignments/hw1-mom-test.md) | 5 |
| HW3 | [Context Engineering (Rules + Scrum)](course/assignments/hw3-context-engineering.md) | 8 |
| HW4 | [Claude Code Workflow & TDD](course/assignments/hw4-claude-code-workflow-tdd.md) | 11 |
| HW5 | [Custom Skill + MCP Integration](course/assignments/hw5-custom-skill-mcp.md) | 12 |

> ℹ️ File names (`hw1-mom-test.md`, `hw2-prompt-engineering.md`) are swapped relative to their HW numbers for historical reasons — the links above point to the correct content.

## Assessment

| Component | Weight |
|-----------|--------|
| Participation | 15% |
| Weekly Quizzes | 10% |
| Homeworks (5) | 25% |
| Projects (3) | 50% |

## Tech Stack (student projects)

- **Languages:** JavaScript, TypeScript
- **Frontend:** React, Next.js, TailwindCSS
- **Backend:** Node.js, Express
- **Database:** PostgreSQL or MongoDB
- **Testing:** Jest/Vitest, Playwright
- **CI/CD:** GitHub Actions

## Repository Structure

```
aiCoding_Course/
├── course/          # Course definition (syllabus, schedule, readings, projects, assignments, COURSE_MEMORY.md)
├── slides/          # Lecture slides (reveal-md) + build tooling
├── examples/        # Example projects for class
├── docs/            # Research (docs/research/) and planning (docs/planning/) notes
├── tools/           # Tooling, incl. canvas-extras MCP server
├── other/           # Presentation drafts
├── website -> …     # Course website (symlink to external repo)
└── CLAUDE.md        # Authoritative guide for maintainers & AI agents
```

## Building the Slides

All commands run from the `slides/` directory:

```bash
cd slides
npm install
npm run serve    # Live-reload dev server (http://localhost:1948)
npm run build    # Build all slides to dist/
npm run deploy   # Deploy to production server
```

## Required Tools

**Paid (~$40/month):**
- Antigravity IDE
- Claude.ai Pro ($20/month) + Claude Code

**Free:**
- GitHub account
- Node.js 18+
- Git

## License

Apache 2.0

---

*Questions? Reach out on Slack (office hours by appointment).*
