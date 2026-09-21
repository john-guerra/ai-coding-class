# Project 2: Full-Stack Application

**Weight:** 18% of final grade
**Due:** Week 9

## Objective

Build a complete full-stack application as a pair, applying AI-assisted development in the IDE harness with professional engineering practices: TDD, CI/CD, and Agile sprints.

## Team Structure

- **P2 is a pair project** (2 students)
- Form pairs in **Week 6**, create a Canvas group by end of Week 6
- **One submission per pair** via Canvas group
- Both partners must have **meaningful commits** throughout the project
- Grades may be adjusted individually for unbalanced contributions (see Rubric)

## Requirements

### Functional Requirements
- Complete full-stack (frontend + backend + database)
- User authentication (JWT or OAuth)
- 3+ distinct features/roles
- Real-time updates OR complex state management
- Public API with documentation
- Professional UI/UX

### Technical Requirements

**AI Harness:**
- Primary harness: the AI IDE (Antigravity, Weeks 6–8), guided by your shared rules file (HW3)

**Tech Stack:**
- Frontend: React/Next.js + TailwindCSS
- Backend: Node.js/Express OR Next.js API routes
- Database: PostgreSQL or MongoDB
- Auth: JWT or OAuth

**Test-Driven Development:**
- TDD workflow (red-green-refactor): failing tests committed before implementation
- Unit + Integration + E2E tests (Playwright/Cypress)

**Advanced CI/CD:**
- Multi-stage pipeline
- Deploy previews for PRs
- Tests run on every PR
- Security scanning in CI
- Automated deployment
- Environment management

### Pair Requirements

- **Shared GitHub repo** with both partners having push access
- **Shared rules file** (`.antigravityrules` or equivalent) maintained by both partners
- **Branch-per-issue workflow** -- PRs reviewed by partner before merge
- **Minimum 5 PR reviews per partner** (visible in GitHub)
- Both partners must have **substantial commit history** (no single-partner projects)

### Agile Process
- 2+ documented sprints
- Sprint planning done jointly (both partners)
- Partner standups (at least 3 per sprint from each partner)
- Sprint retrospectives including partner feedback
- User stories with acceptance criteria
- Task estimation

### Documentation Requirements
- Comprehensive README
- API documentation (OpenAPI/Swagger)
- Architecture diagram
- Database schema diagram
- Setup/deployment guide
- Sprint retrospectives
- 10-minute demo video
- Partner contribution log (who did what)
- Individual 300-word reflection from each partner (separate submissions)

## Deliverables

1. GitHub repository (with visible commit history from both partners)
2. Deployed app (production URL)
3. Complete documentation package
4. Demo video
5. Individual reflections (one per partner, submitted separately)

## Rubric (200 points)

| Category | Points | Description |
|----------|--------|-------------|
| **Functionality** | 45 | Features complete, authentication working, API functional |
| **Technical Excellence** | 60 | Code quality, architecture, TDD workflow |
| **AI Mastery** | 30 | Effective use of the IDE harness: shared rules file, context engineering, AI-assisted TDD |
| **CI/CD & DevOps** | 30 | Pipeline quality, deployment |
| **Agile Process & Pair Workflow** | 20 | Sprint docs, pair standups, PR reviews, contribution balance |
| **Documentation** | 15 | README, API docs, reflections quality |

### Functionality Breakdown (45 pts)
- User authentication: 10 pts
- Core features (3+): 20 pts
- API quality: 10 pts
- UI/UX polish: 5 pts

### Technical Excellence Breakdown (60 pts)
- Code architecture: 20 pts
- TDD workflow (tests before code; unit + integration + E2E): 20 pts
- Database design: 10 pts
- Security practices: 10 pts

### CI/CD Breakdown (30 pts)
- Multi-stage pipeline: 10 pts
- Deploy previews: 5 pts
- Tests run in CI: 5 pts
- Security scanning: 5 pts
- Automated deployment: 5 pts

### Agile Process & Pair Workflow Breakdown (20 pts)
- Sprint planning & retros: 5 pts
- Partner standups (3+ per sprint each): 5 pts
- PR reviews (5+ per partner): 4 pts
- Contribution balance (both partners with substantial commits): 4 pts
- Shared rules file maintained: 2 pts

**Note:** Individual grades may be adjusted up to ±10% based on contribution balance. If commit history or PR reviews show significantly unbalanced work, the less-contributing partner's grade may be reduced.

---

*For full course details, see [../COURSE_MEMORY.md](../COURSE_MEMORY.md)*
