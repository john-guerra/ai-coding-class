# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a lecture slides repository for **CS 7180: Vibe Coding - AI-Assisted Software Engineering** at Northeastern University. The course teaches AI-assisted software development using reveal.js presentations with both Pug templates and Marp markdown.

## Slide Formats

The repository uses two presentation systems:

1. **Marp (Markdown)** - Newer format used in `01_Introduction/`
   - Files: `*.md` with YAML frontmatter (`marp: true`)
   - Theme: `css/marp-theme.css` (Northeastern branding)
   - Slides separated by `---`

2. **reveal.js + Pug** - Legacy format
   - Templates: `partials/reveal_header.pug` and `partials/reveal_footer.pug`
   - Output: `index.html` files in each lecture folder
   - Theme: `lib/theme/white.css` with `css/style.css` customizations

## Lecture Structure

Each lecture lives in a numbered folder (e.g., `01_Introduction/`):
- `index.md` or `index.pug` - Slide source
- `index.html` - Compiled output (for Pug-based slides)
- `images/` - Lecture-specific images

## Dependencies

```bash
npm install
```

Key packages: `reveal.js`, `jstransformer-markdown-it` for markdown processing in Pug templates.

## Course Context

### Course Philosophy
"Vibe Coding" done right: AI-assisted development speed combined with professional engineering quality (TDD, CI/CD, evals). Students learn to build fast AND build right.

### The Three AI Modalities
1. **Claude Web** (Week 2) - Architecture planning, learning, brainstorming
2. **Cursor IDE** (Weeks 4-5) - Production code, daily development workflow
3. **Claude Code** (Week 6+) - Automation, multi-file refactoring, DevOps

### 15-Week Curriculum Overview
| Weeks | Focus |
|-------|-------|
| 1-3 | Foundations: LLM fundamentals, Mom Test, prompt engineering |
| 4-6 | Cursor IDE, TDD intro, CI/CD basics, **Project 1 due** |
| 7-10 | Advanced prompting, context engineering, evals, **No-AI Challenge** |
| 11-13 | Agile, parallel agents, advanced CI/CD, **Project 2 due** |
| 14-15 | Production readiness, monitoring, **Project 3 due** |

### Tech Stack
- **Languages:** JavaScript, TypeScript
- **Frontend:** React, Next.js, TailwindCSS
- **Backend:** Node.js, Express
- **Database:** PostgreSQL or MongoDB (Prisma ORM)
- **Testing:** Jest/Vitest, Playwright
- **CI/CD:** GitHub Actions

### Key Course Elements
- **No-AI Challenge** (Week 10): 90-min coding exam without AI tools, must pass 60%+
- **Evals**: Systematic quality measurement for AI-generated code (correctness, quality, semantic, performance, security)
- **Projects**: 3 portfolio-worthy apps with increasing complexity

### Detailed Reference
For complete details (rubrics, homework specs, policies), see `.claude/CS7180_Project_Memory.md`.
