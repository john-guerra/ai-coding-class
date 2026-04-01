# Project 3: Production Application with Claude Code Mastery

**Weight:** 19% of final grade | **Points:** 200
**Due:** Week 15 (Demo Day)

## Objective

**Team size:** 2 (pairs)

Build a production-grade, deployed application as a pair, demonstrating mastery of Claude Code's extensibility features, professional AI-assisted workflows, and production engineering practices taught in W10-W14.

## Approval Requirement

**Project idea must be approved by the professor on the #projects Slack channel at least one week before the deadline.**

## Requirements

### Functional Requirements
- Production-ready application solving a real problem
- 2+ user roles or distinct feature areas
- Real-world use case (new idea)
- Portfolio/interview-worthy quality
- Deployed and accessible via public URL

### Technical Requirements

**Architecture:**
- Next.js full-stack application (App Router or Pages Router) or equivalent
- Database (PostgreSQL recommended, or equivalent)
- Authentication (Auth.js/NextAuth, Clerk, or equivalent)
- Deployed on Vercel (or equivalent platform with preview deploys)

**Claude Code Mastery (core of this project):**

Each of the following Claude Code concepts must be demonstrated with evidence in your repository:

_CLAUDE.md & Memory (W10):_
- Comprehensive CLAUDE.md with @imports for modular organization
- Auto-memory usage for persistent project context
- Evidence of CLAUDE.md evolution across the project (visible in git history)
- Project conventions, architecture decisions, and testing strategy documented

_Custom Skills (W12) — minimum 2:_
- At least 2 skills in `.claude/skills/` (e.g., `/fix-issue`, `/add-feature`, `/deploy`, `/create-pr`)
- Evidence of team usage (session logs or screenshots)
- At least one skill iterated from v1 to v2 based on real usage

_Hooks (W12) — minimum 2:_
- At least 2 hooks configured in `.claude/settings.json`
- At least one PreToolUse or PostToolUse hook (e.g., auto-format, block protected files, lint-on-edit)
- At least one quality-enforcement hook (e.g., Stop hook that runs tests)

_MCP Servers (W12) — minimum 1:_
- At least 1 MCP server integrated (database, Playwright, GitHub, or other)
- Configuration shared via `.mcp.json` in repository
- Evidence of use in development workflow (session logs or screenshots)

_Agents (W12-W13) — minimum 1 (choose any):_
- Custom sub-agents in `.claude/agents/` (e.g., security-reviewer, test-writer, docs-updater), OR
- Agent teams with `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` for multi-agent coordination, OR
- Agent SDK feature built into the application (applying W13 patterns)
- Evidence of use (session log, PR, or screenshots showing agent output)

_Parallel Development (W12):_
- Evidence of worktree usage for parallel feature development
- At least 2 features developed in parallel (visible in git branch history)

_Writer/Reviewer Pattern + C.L.E.A.R. (W12):_
- At least 2 PRs using the writer/reviewer pattern (one agent writes, another reviews)
- C.L.E.A.R. framework applied in PR reviews (visible in PR comments)
- AI disclosure metadata in PRs (% AI-generated, tool used, human review applied)

**Test-Driven Development (W11):**
- TDD workflow (red-green-refactor) for at least 3 features
- Git history showing failing tests committed before implementation
- Unit + integration tests (Vitest or Jest)
- At least 1 E2E test (Playwright)
- 70%+ test coverage

**CI/CD Pipeline (W14) — GitHub Actions:**
- Lint (ESLint + Prettier)
- Type checking (tsc --noEmit)
- Unit and integration tests
- E2E tests (Playwright)
- Security scan (npm audit)
- AI PR review (claude-code-action or claude -p)
- Preview deploy (Vercel)
- Production deploy on merge to main

**Security (W13) — minimum 4 gates from the 8-gate pipeline:**
- Pre-commit secrets detection (Gitleaks or equivalent)
- Dependency scanning (npm audit in CI)
- At least one SAST tool or security-focused sub-agent
- Security acceptance criteria in Definition of Done
- OWASP top 10 awareness documented in CLAUDE.md

### Team Process
- 2 sprints documented (sprint planning + retrospective each)
- GitHub Issues with acceptance criteria as testable specifications
- Branch-per-issue workflow with PR reviews
- Async standups (minimum 3 per sprint per partner)
- C.L.E.A.R. framework applied in PR reviews
- Peer evaluations

### Deliverables

1. GitHub repository with full `.claude/` configuration (skills, hooks, agents, MCP)
2. Deployed application (Vercel production URL)
3. CI/CD pipeline (GitHub Actions, all stages passing)
4. Technical blog post (team effort, published on Medium, dev.to, or similar)
6. Screencast video demonstration (5-10 minutes, showcasing app + Claude Code workflow)
7. Live demo (8-10 minutes on Demo Day, structure per W14)
8. Individual reflections (one per partner, 500 words)
9. Showcase submission via Google Form (project name, URLs, thumbnail, video, blog)

---

## Rubric (200 points)

| Category | Points | Description |
|----------|--------|-------------|
| **Application Quality** | 40 | Production-ready, deployed, polished, real use case |
| **Claude Code Mastery** | 55 | Skills, hooks, MCP, agents, CLAUDE.md/memory, worktrees, C.L.E.A.R. |
| **Testing & TDD** | 30 | TDD workflow, coverage, test pyramid |
| **CI/CD & Production** | 35 | Pipeline stages, AI review, Vercel deploy, security gates |
| **Team Process** | 25 | Sprints, PRs, C.L.E.A.R. reviews, async standups, peer evals |
| **Documentation & Demo** | 15 | README, blog post, screencast, reflections, live demo |

### Application Quality Breakdown (40 pts)

| Criterion | Pts | Excellent | Good | Satisfactory | Needs Improvement |
|-----------|-----|-----------|------|--------------|-------------------|
| Feature completeness & use case | 15 | 2+ user roles, complete flows, solves real problem | Core features work, minor gaps | Basic features functional | Incomplete or toy problem |
| User experience & polish | 10 | Professional UI, responsive, error states handled | Functional but rough edges | Usable with issues | Unstyled or broken flows |
| Production deployment | 15 | Live on Vercel, clean URL, env vars managed | Deployed with minor issues | Partially deployed | Not deployed or broken |

### Claude Code Mastery Breakdown (55 pts)

| Criterion | Pts | Excellent | Good | Satisfactory | Needs Improvement |
|-----------|-----|-----------|------|--------------|-------------------|
| CLAUDE.md & memory | 8 | Rich CLAUDE.md with @imports, memory usage, clear iteration in git | Functional CLAUDE.md, some iteration | Basic CLAUDE.md, minimal evolution | Minimal or static |
| Custom skills (2+) | 10 | 2+ skills with clear instructions, team usage evidence, v1→v2 iteration | 2 skills created, limited usage evidence | 1 skill created | No skills |
| Hooks (2+) | 8 | 2+ hooks enforcing quality (formatting, linting, protection) | 2 hooks configured, basic functionality | 1 hook configured | No hooks |
| MCP integration (1+) | 8 | MCP server actively used, shared via .mcp.json, clear productivity gain | MCP configured, some usage evidence | MCP configured but minimal use | Not configured |
| Agents (1+) | 8 | Sub-agents/agent teams/SDK with clear role, evidence in PRs | Agent created, limited usage shown | Agent created but no evidence of use | No agents |
| Parallel development | 5 | Multiple features in parallel worktrees, clean git history | Some worktree usage shown | Minimal parallel work | No evidence |
| Writer/reviewer + C.L.E.A.R. | 8 | 2+ PRs with pattern applied, AI disclosure metadata | Some C.L.E.A.R. usage in reviews | Basic PR reviews | No structured review |

### Testing & TDD Breakdown (30 pts)

| Criterion | Pts | Excellent | Good | Satisfactory | Needs Improvement |
|-----------|-----|-----------|------|--------------|-------------------|
| TDD workflow evidence | 12 | 3+ features with red-green-refactor visible in git | TDD for some features | Some tests written after code | No TDD evidence |
| Test coverage & pyramid | 10 | 70%+ coverage, unit + integration + E2E | Adequate coverage, some types missing | Low coverage | Minimal tests |
| Test quality | 8 | Tests verify behavior, edge cases covered | Functional tests, some edge cases | Happy-path only | Trivial or broken tests |

### CI/CD & Production Breakdown (35 pts)

| Criterion | Pts | Excellent | Good | Satisfactory | Needs Improvement |
|-----------|-----|-----------|------|--------------|-------------------|
| Pipeline completeness | 15 | All 8 stages green on main | 5-7 stages working | 3-4 stages | Fewer than 3 |
| AI PR review in CI | 10 | claude-code-action with structured output, actionable feedback | AI review configured, basic output | Partially configured | No AI review |
| Security gates (4+) | 10 | 4+ gates (secrets, deps, SAST, criteria), OWASP in CLAUDE.md | 3 gates implemented | 2 gates | Fewer than 2 |

### Team Process Breakdown (25 pts)

| Criterion | Pts | Excellent | Good | Satisfactory | Needs Improvement |
|-----------|-----|-----------|------|--------------|-------------------|
| Sprint process | 8 | 2 sprints with planning + retrospectives, clear velocity | 2 sprints documented, some gaps | Minimal sprint docs | No sprint documentation |
| GitHub workflow | 8 | Branch-per-issue, PRs reviewed, AI disclosure, 5+ PRs/partner | Branch workflow, some reviews | Basic branching | No structured workflow |
| Async standups | 4 | 3+ standups per sprint per partner | Some standups documented | Minimal communication trail | No standups |
| Peer evaluation | 5 | Thoughtful evaluation completed | Completed but minimal | Late submission | Not completed |

### Documentation & Demo Breakdown (15 pts)

| Criterion | Pts | Excellent | Good | Satisfactory | Needs Improvement |
|-----------|-----|-----------|------|--------------|-------------------|
| README & architecture | 3 | Clear README with Mermaid diagram, setup instructions | README present, basic architecture | Minimal README | Missing |
| Blog post | 3 | Published, insightful, covers AI workflow and technical decisions | Published, adequate depth | Draft or shallow | Missing |
| Screencast video (5-10 min) | 3 | Polished video showing app + Claude Code workflow, clear narration | Video present, covers main points | Video present but minimal | Missing |
| Individual reflections | 3 | 500 words/partner, specific Claude Code insights, honest assessment | Meets word count, some reflection | Shallow or short | Missing |
| Live demo (8-10 min) | 3 | Follows W14 structure, smooth live demo, AI workflow showcase | Mostly follows structure | Over/under time, unprepared | No demo |

**Note:** Individual grades adjusted by peer evaluations (±10%)

### Bonus Opportunities (up to 10 extra points)
- Property-based testing with fast-check (+3)
- Mutation testing with Stryker (+3)
- Agent SDK feature in app applying W13 patterns (+4)

---

*For full course details, see [../COURSE_MEMORY.md](../COURSE_MEMORY.md)*
