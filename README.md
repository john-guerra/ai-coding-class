# CS 7180: Vibe Coding - AI-Assisted Software Engineering

> **Northeastern University, Khoury College of Computer Sciences**
> Spring 2026 | Oakland Campus

## Course Overview

"Vibe Coding" done right: AI-assisted development speed combined with professional engineering quality. Students learn to build fast AND build right using TDD, CI/CD, and evaluation-driven development.

**Instructor:** John Alexis Guerra Gomez ([jguerra@northeastern.edu](mailto:jguerra@northeastern.edu))

## Quick Links

| Resource | Description |
|----------|-------------|
| [Syllabus](course/syllabus.md) | Policies, grading, academic integrity |
| [Schedule](course/schedule.md) | 15-week schedule with deliverables |
| [Readings](course/readings.md) | Required readings by week |
| [Full Course Plan](course/COURSE_MEMORY.md) | Complete reference document |

### Projects
- [Project 1: Personal Utility App](course/projects/project1-personal-utility.md) (15%) - Due Week 6
- [Project 2: Full-Stack Application](course/projects/project2-full-stack.md) (20%) - Due Week 11
- [Project 3: Team Application](course/projects/project3-team-app.md) (20%) - Due Week 15

### Assignments
- [HW1: Mom Test Interviews](course/assignments/hw1-mom-test.md) - Week 2
- [HW2: Prompt Engineering](course/assignments/hw2-prompt-engineering.md) - Week 3
- [HW3: Context Engineering](course/assignments/hw3-context-engineering.md) - Week 7
- [HW4: TDD + CI/CD + Evals](course/assignments/hw4-tdd-cicd-evals.md) - Week 10
- [HW5: Parallel Agents](course/assignments/hw5-parallel-agents.md) - Week 12
- [HW6: Production Readiness](course/assignments/hw6-production-readiness.md) - Week 13

## The Three AI Modalities

| Modality | When | Best For |
|----------|------|----------|
| **Claude Web** | Week 2 | Architecture planning, learning, brainstorming |
| **Cursor IDE** | Weeks 4-5 | Production code, daily development workflow |
| **Claude Code** | Week 6+ | Automation, multi-file refactoring, DevOps |

## Assessment

| Component | Weight |
|-----------|--------|
| Participation | 20% |
| Homeworks (6) | 25% |
| Projects (3) | 55% |
| **No-AI Challenge** | Pass/Fail (60% required) |

## Tech Stack

- **Languages:** JavaScript, TypeScript
- **Frontend:** React, Next.js, TailwindCSS
- **Backend:** Node.js, Express
- **Database:** PostgreSQL or MongoDB (Prisma ORM)
- **Testing:** Jest/Vitest, Playwright
- **CI/CD:** GitHub Actions

## Repository Structure

```
aiCoding_Course/
├── course/                # Course definition files
│   ├── syllabus.md
│   ├── schedule.md
│   ├── readings.md
│   ├── projects/          # Project specifications
│   └── assignments/       # Homework specifications
├── slides/                # Lecture slides (Marp)
├── examples/              # Example projects
├── docs/                  # Supporting documentation
└── other/                 # Presentation drafts
```

## Building Slides

```bash
cd slides
npm install
npm run build        # Build all slides
npm run build:watch  # Watch mode
```

## Required Tools

**Paid (~$40/month):**
- Cursor IDE (~$20/month)
- Claude.ai Pro ($20/month)

**Free:**
- GitHub account
- Node.js 18+
- Git

## License

Apache 2.0

---

*For questions, reach out on Slack or during office hours (Tuesdays 2-4PM)*
