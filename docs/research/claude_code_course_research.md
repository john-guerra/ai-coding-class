# Weeks 10–14: High-quality software engineering with AI assistance

**Students arrive at week 10 as competent AI-assisted developers; they must leave at week 14 as production-ready AI software engineers.** This five-week arc transforms intermediate Claude Code users into professionals who can architect, test, secure, and ship full-stack applications with AI assistance—while understanding exactly what they're shipping and why. The curriculum threads four SE practices (testing/CI-CD, code review/refactoring, system design, and ethical AI development) through a progressive team project culminating in Demo Day at week 15.

The design draws on Anthropic's own engineering practices (where ~90% of Claude Code's codebase is written by Claude Code itself), current research showing **45% of AI-generated code contains security vulnerabilities**, and pedagogical frameworks like FACT (Fundamentals, Applied, Conceptual, Thinking) that address assessment in the AI era. Each week maps to a clear milestone in Project 3, ensuring classroom concepts translate directly into the team's production application.

---

## Week-by-week overview at a glance

| Week | Theme | Key SE Practice | Project 3 Milestone | Homework |
|------|-------|----------------|---------------------|----------|
| **10** | Claude Code foundations and team architecture | System design & architecture | Team formed, repo initialized, CLAUDE.md written, architecture documented | — |
| **11** | Test-driven development and evaluation systems | Testing & CI/CD with AI | Sprint 1: Core MVP with TDD, evaluation suite, GitHub Actions CI | HW4 |
| **12** | Parallel agentic programming and code review | Code review & refactoring with AI | Sprint 2: Features built via parallel agents, peer code review | HW5 |
| **13** | Security, ethics, and production hardening | Ethical AI development & responsible use | Security audit passed, monitoring deployed, production CI/CD | HW6 |
| **14** | Integration, polish, and reflection | All four practices synthesized | Final submission, demo rehearsal, AI usage documentation | — |

---

## Week 10: Claude Code foundations and architectural thinking

### Learning objectives

Students will master Claude Code's core workflow (Explore → Plan → Code → Commit), configure project memory through CLAUDE.md files, use context engineering strategies for multi-file projects, and produce a documented system architecture for their team application. This week bridges the transition from IDE-based AI coding (Modality 2) to terminal-based agentic coding (Modality 3), while forming Project 3 teams and establishing shared engineering practices.

### Session 1 (Tuesday): Claude Code deep dive

The session opens with the "Explore → Plan → Code → Commit" workflow that Anthropic's own engineering blog identifies as the canonical Claude Code pattern. Students should have completed the Anthropic "Claude Code in Action" Skilljar course as pre-work, covering architecture fundamentals, tool system, context management, custom commands, MCP servers, GitHub integration, hooks, and the SDK. Class time focuses on the concepts that separate intermediate from advanced users.

**CLAUDE.md mastery** is the centerpiece. CLAUDE.md loads at the start of every conversation, serving as Claude's project memory. Research from HumanLayer shows that files under **200 lines achieve >92% rule-application rates**, while files over 400 lines drop to ~71%. The hierarchical loading system supports global (`~/.claude/CLAUDE.md`), project-root, parent-directory, child-directory, and local-override scopes. Students learn the WHAT/WHY/HOW structure: technology stack and project structure (WHAT), purpose and domain context (WHY), build/test/lint commands and workflow conventions (HOW). A critical insight from HumanLayer's research: Claude Code wraps CLAUDE.md in a system reminder stating "this context may or may not be relevant"—so non-universal instructions get deprioritized. Only include instructions that apply to every session.

**Context engineering** receives dedicated treatment. Anthropic defines this as "curating and maintaining the optimal set of tokens during LLM inference." The core strategies are just-in-time retrieval (using `glob`, `grep`, and Bash rather than pre-loading everything), aggressive use of `/clear` between tasks, compaction awareness (Claude summarizes when context fills), and structured note-taking to persist state across context resets. Students practice the document-then-implement workflow: explore the codebase, write findings to a markdown file, `/clear`, plan from that document, `/clear`, implement.

**Extended thinking** is now enabled by default with a 31,999-token budget. The historical "ultrathink" keyword is deprecated as of January 2026; instead, students learn to use the `/effort` command for granular control. Extended thinking is best for architectural decisions, complex debugging, and multi-step planning—but counterproductive for simple edits or pattern-matching tasks.

### Session 2 (Thursday): Team formation and architectural design

Teams of 2–3 form around approved project proposals. Each team completes four deliverables before leaving class: (1) a GitHub repository with branch protection rules, (2) a team CLAUDE.md committed to the repo, (3) an architecture document with Mermaid diagrams generated via Claude Code, and (4) a team working agreement specifying AI tool usage norms, role rotation schedule, and code review commitments.

**System design with AI** follows Nick Tune's approach (O'Reilly Radar): students instruct Claude Code to map all flows from UI actions through APIs to databases, documented in Mermaid format for both AI and human consumption. Claude also drafts initial **Architecture Decision Records (ADRs)** for key choices (database selection, authentication strategy, API design). Students must verify and correct Claude's output—Tune warns of "significant inaccuracies" in AI-generated architecture maps. The exercise teaches that AI is powerful for generating first drafts of architectural artifacts but requires human verification of every claim.

**Custom slash commands** are introduced as team-shared tooling. Teams create `.claude/commands/review.md`, `.claude/commands/test.md`, and `.claude/commands/deploy.md` with appropriate frontmatter (`allowed-tools`, `description`). These become the team's standardized workflows, ensuring consistency across team members interacting with Claude Code independently.

### Key Claude Code features for week 10

- CLAUDE.md hierarchical loading (project, directory, local, global)
- `/init` for starter generation (with guidance to hand-refine)
- Extended thinking via `/effort` control
- Plan mode ("Analyze this and propose a plan. Don't code yet.")
- Custom slash commands in `.claude/commands/`
- Skills system (`.claude/skills/`) for auto-invoked domain-specific instructions
- `@file` imports in CLAUDE.md for modular documentation

### Suggested readings and resources

- Anthropic Engineering Blog: "Claude Code Best Practices" (anthropic.com/engineering/claude-code-best-practices)
- HumanLayer: "Writing a Good CLAUDE.md" (humanlayer.dev/blog/writing-a-good-claude-md)
- Anthropic: "Effective Context Engineering for AI Agents" (anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- Claude Code official documentation: Memory system, Best practices sections (code.claude.com/docs)
- Nick Tune: "Reverse Engineering Software Architecture with Claude Code" (O'Reilly Radar)
- Trail of Bits: claude-code-config repository (github.com/trailofbits/claude-code-config)
- Addy Osmani: "My AI Coding Workflow" (addyosmani.com/blog/ai-coding-workflow) — for the spec.md → plan → implement → test workflow

### Practical exercises

1. **CLAUDE.md workshop**: Each team writes and iterates on their project CLAUDE.md. They then swap with another team—the receiving team runs Claude Code with the foreign CLAUDE.md and attempts to implement a small feature, noting where instructions were unclear or missing. Teams refine based on feedback.
2. **Context engineering challenge**: Given a medium-sized codebase (~30 files), students must use Claude Code to add a feature without pre-reading any files. They practice just-in-time retrieval, using `/clear` between exploration and implementation phases, and measure how context management affects output quality.
3. **Architecture generation and verification**: Teams have Claude Code generate a full system architecture (Mermaid diagrams, component descriptions, API contracts). They then manually audit the output against actual project requirements, documenting every inaccuracy Claude produced.

### Connection to Project 3

This week produces the project's foundation: repository, CLAUDE.md, architecture documents, team agreements, and initial slash commands. Every subsequent week builds on these artifacts. The architecture documents become the reference against which all implementation is validated.

---

## Week 11: Test-driven development, evaluation systems, and CI/CD

### Learning objectives

Students will implement test-driven development with AI assistance, build LLM-as-judge evaluation systems for automated code quality assessment, set up GitHub Actions CI/CD pipelines with Claude Code integration, and complete Sprint 1 of their team project with **80%+ test coverage** on the core MVP.

### Session 1 (Tuesday): TDD with AI — the renaissance

Anthropic's internal teams call TDD the "write tests, commit; code, iterate, commit" workflow—and it is their most recommended practice. The pedagogical logic is clear: when AI writes code, **tests become the specification**. TDD constrains Claude's output to verifiable behavior rather than plausible-looking code.

The session covers the TDD+AI workflow in three layers. **Unit testing with AI** uses Jest/Vitest: students write test cases first (with Claude's help drafting edge cases), commit the failing tests, then instruct Claude Code to implement code that makes all tests pass. **Property-based testing** introduces `fast-check` (the primary JS/TS library), where students define invariants and let the framework generate hundreds of random inputs. Research from the Property-Generated Solver framework shows **23–37% improvement in pass rates** over traditional TDD when property-based testing validates AI-generated code. **Mutation testing** with Stryker evaluates test suite quality by introducing small code mutations and checking if tests catch them—a critical practice when AI-generated tests may be superficially comprehensive but miss actual fault detection.

The specific risks of testing AI-generated code get dedicated attention. Testkube's analysis identifies three categories: **business logic gaps** (AI doesn't know unwritten domain rules), **dependency drift** (AI trained on outdated APIs), and **subtle logic errors** (statistically plausible but incorrect code). The recommendation: apply higher coverage thresholds for AI-generated code than human-written code, especially for business logic and edge cases.

### Session 2 (Thursday): Evaluation systems and CI/CD

**LLM-as-judge evaluation** is both a Project 3 requirement and an advanced engineering skill. Students learn to build automated code quality pipelines where Claude evaluates code against rubrics. Research shows judge models align with human judgment up to **85%** (higher than human-to-human agreement at 81%). Two patterns are taught: pointwise scoring (evaluate individual code against a 1–5 rubric) and pairwise comparison (compare two implementations). Students implement both using the Claude Agent SDK (formerly Claude Code SDK), with JSON-schema structured output.

Known biases receive explicit treatment: **position bias** (LLMs favor the first option presented), **verbosity bias** (longer responses scored higher), **self-enhancement bias** (models rate their own output higher), and **wrong logic analysis** (52.8% of judge failures involve incorrect behavior inference). Students learn mitigation: require chain-of-thought reasoning before scores, use binary yes/no sub-questions, provide 3–5 few-shot examples, and build validation sets of **30–50 human-labeled examples** minimum.

**CI/CD with Claude Code** introduces `anthropics/claude-code-action` (GA at v1), Anthropic's official GitHub Action. Students configure automated PR review with a structured prompt covering Must Fix, Should Consider, and Minor categories. The security review action (`anthropics/claude-code-security-review`) provides OWASP-aligned vulnerability analysis. Additional automation patterns include AI-generated test additions (Claude reads new PR code and writes tests) and documentation sync (Claude updates docs affected by code changes).

**Hooks for quality enforcement** are introduced as deterministic guardrails. Unlike CLAUDE.md instructions (which are advisory), hooks guarantee execution. The key patterns: PostToolUse hooks that run Prettier/ESLint after every edit, PreToolUse hooks that block edits to sensitive files (`.env`, `package-lock.json`), and PreToolUse hooks that require test passes before PR creation. Students configure hooks in `.claude/settings.json` with the exit code system (0 = continue, 2 = block action with feedback).

### Key Claude Code features for week 11

- Claude Code headless mode (`claude -p`) for CI/CD integration
- `anthropics/claude-code-action@v1` for GitHub PR automation
- `anthropics/claude-code-security-review` for security scanning
- Hooks: PreToolUse (blocking gates), PostToolUse (auto-formatting, auto-linting)
- Claude Agent SDK (`@anthropic-ai/claude-agent-sdk`) for programmatic evaluation pipelines
- Structured JSON output for evaluation results
- `--allowedTools` for scoping permissions in automated contexts

### Suggested readings and resources

- Jest documentation (jestjs.io), Vitest documentation (vitest.dev)
- Testing Library (testing-library.com/docs)
- fast-check documentation (fast-check.dev) for property-based testing
- StrykerJS documentation (stryker-mutator.io) for mutation testing
- GitHub Actions documentation (docs.github.com/en/actions)
- Evidently AI: "LLM as a Judge" guide (evidentlyai.com/llm-guide/llm-as-a-judge)
- Claude Code Hooks guide (code.claude.com/docs/en/hooks-guide)
- Claude Agent SDK overview (platform.claude.com/docs/en/agent-sdk/overview)
- Eric Elliott: "Better AI-Driven Development with TDD" (Medium)
- Kiro blog: Property-based testing for AI code (kiro.dev/blog/property-based-testing)

### Practical exercises

1. **TDD kata with Claude Code**: Students receive a specification for a complex data transformation function (e.g., a scheduling algorithm). They must write failing tests first, commit them, then instruct Claude to implement. They measure: how many iterations to pass all tests, what edge cases Claude missed, and test quality via mutation testing with Stryker.
2. **LLM-as-judge pipeline**: Each team builds an evaluation system that scores code quality on four dimensions (correctness, readability, security, test coverage). They validate against 10 human-labeled code samples and measure agreement rate. This system becomes part of their Project 3 deliverable.
3. **CI/CD setup lab**: Teams configure their Project 3 repository with GitHub Actions running: lint, typecheck, test suite, Claude code review on PRs, and security scan. All must pass before merge.

### Homework 4

Design and implement an LLM-as-judge evaluation suite for your team's Project 3. The suite must include: (a) at least 3 evaluation dimensions with rubrics, (b) chain-of-thought prompting for the judge, (c) a validation set of 10+ labeled examples, and (d) measured agreement with human judgment. Submit the evaluation code, validation data, and a report analyzing judge accuracy and biases observed.

### Connection to Project 3

Sprint 1 delivers the core MVP with TDD (80%+ coverage), an operational evaluation suite, and a CI/CD pipeline. The evaluation system becomes a permanent fixture of the team's workflow—used in every subsequent sprint to assess code quality automatically.

---

## Week 12: Parallel agentic programming and code review

### Learning objectives

Students will implement parallel agentic coding workflows using git worktrees and multiple Claude Code instances, apply structured code review practices for AI-generated code, practice team coordination patterns for multi-agent development, and complete Sprint 2 with features built through parallel agents.

### Session 1 (Tuesday): Parallel agents and multi-agent patterns

This session covers the technique that most distinguishes professional AI-assisted development from individual coding: **running multiple Claude Code instances simultaneously on different parts of the same project**. Git worktrees create separate working directories that share repository history while allowing independent branches—the foundation for parallel agentic work.

Claude Code natively supports worktrees as of v2.1.50. The `--worktree` flag creates an isolated working directory: `claude --worktree feature-auth` creates `.claude/worktrees/feature-auth/` with branch `worktree-feature-auth`. Teams practice the four parallel patterns. **Pattern 1 (multiple terminals)**: each team member runs Claude Code in a separate worktree on different features simultaneously. **Pattern 2 (competitive solutions)**: spawn 2–3 agents with the same specification but different worktrees, producing varied implementations to review and merge the best. **Pattern 3 (background orchestration)**: a main agent delegates to background subagents (using `Task` tool with `run_in_background: true`), continues working, and syncs results upon completion. **Pattern 4 (specialist subagents)**: define agents in `.claude/agents/*.md` with specific roles (backend-architect, test-writer, security-reviewer) and tool permissions.

**Subagent architecture** receives dedicated treatment. Subagents spawn within a session with their own fresh context window, returning only condensed summaries—achieving separation of concerns without context bloat. For team projects, subagent isolation can use worktrees via `isolation: worktree` in agent frontmatter. The experimental **Agent Teams** feature (enabled via `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS`) allows multiple Claude Code instances to work together with a team lead, each with independent context windows and direct inter-agent communication. Best practice is **3–5 teammates with 5–6 tasks each**.

**MCP server integration** expands Claude Code's capabilities. Students configure servers for their project: GitHub (issues, PRs), PostgreSQL or SQLite (database queries), Playwright (browser automation for E2E testing), and optionally Sentry (error monitoring) or Semgrep (security scanning). Configuration lives in `.mcp.json` at the project root, committed to git for team sharing. Key technical detail: when MCP tool definitions exceed 10% of context window, Tool Search auto-activates for on-demand loading.

### Session 2 (Thursday): Code review for AI-generated code

Every PR of AI-generated code must be reviewed by a teammate who was not the prompter. This structural requirement prevents the "AI bubble" where one person generates and accepts without external validation. The session teaches the **C.L.E.A.R. framework** for reviewing AI-generated code:

- **Context**: Review the original prompt, understand the generation process, assess system integration
- **Logic**: Deep examination beyond surface syntax and style
- **Evidence**: Demonstrated behavior (test results) over perceived correctness
- **Architecture**: Alignment with existing patterns and conventions
- **Risk**: Security implications assessment

Three AI-specific pitfalls demand extra vigilance. **False confidence**: well-formatted, professional-looking code creates a false sense of security—AI code *looks* right even when wrong. **Hallucinated APIs**: Claude may reference non-existent functions or deprecated methods; Simon Willison notes these are "the least dangerous" mistakes because they cause visible errors, while code that runs but is subtly wrong is far more dangerous. **Duplicate logic**: AI doesn't know that `formatCurrency()` already exists in your utils folder—one practitioner documented finding **11 different email validation implementations** in a single AI-assisted codebase.

Quantitative evidence supports heightened scrutiny: research from ClackyAI found AI-generated PRs contain **1.57× more security issues**, are **2.74× more likely to introduce XSS vulnerabilities**, and **1.91× more likely to include insecure object references**.

Students practice team review protocols: PRs include an "% AI-generated" field, complexity thresholds determine review depth (solo review for utilities, pair review for business logic, architecture review for security-critical code), and PRs that are >80% AI-generated require mandatory pair review.

### Key Claude Code features for week 12

- `--worktree` flag for parallel development
- `.claude/agents/*.md` for specialist subagent definitions
- Agent Teams (experimental) for coordinated multi-agent work
- `Task` tool with `run_in_background: true` for background delegation
- MCP server configuration via `.mcp.json`
- `claude mcp add` for adding servers from CLI
- Writer/Reviewer pattern: one agent writes, another with fresh context reviews

### Suggested readings and resources

- Claude Code worktree documentation (code.claude.com/docs/en/common-workflows)
- Claude Code Agent Teams documentation (code.claude.com/docs/en/agent-teams)
- MCP specification and server registry (modelcontextprotocol.io, github.com/modelcontextprotocol/servers)
- Incident.io: "Shipping Faster with Claude Code and Git Worktrees"
- GitHub Docs: "Review AI-generated code" (docs.github.com/en/copilot/tutorials/review-ai-generated-code)
- Vibe Coding Framework: C.L.E.A.R. review guidelines (docs.vibe-coding-framework.com)
- CodeIntelligently: AI code review checklist (codeintelligently.com/blog/ai-code-review-checklist)
- Daniel Weinshenker: "Learnings from Using Claude for PR Reviews" (Medium)

### Practical exercises

1. **Parallel development sprint**: Teams divide Sprint 2 work into 3+ independent features. Each team member runs Claude Code in a separate worktree simultaneously for 45 minutes. Then teams reconvene to merge branches, resolve conflicts, and discuss coordination challenges. Debrief covers what worked, what diverged, and how CLAUDE.md/architecture docs helped (or didn't) maintain consistency.
2. **AI code review workshop**: Teams exchange PRs with another team. Reviewers apply the C.L.E.A.R. framework and the AI-specific review checklist (checking for hardcoded secrets, missing auth checks, duplicate logic, hallucinated APIs, unsanitized inputs). Each review must identify at least 3 findings with severity ratings.
3. **Competitive agents exercise**: For a well-specified function, spawn 3 Claude Code instances in different worktrees with the same prompt. Compare the 3 implementations on correctness, performance, readability, and test coverage. Select and merge the best, documenting why.

### Homework 5

Refactor a designated module of your Project 3 codebase using Claude Code's parallel agent capabilities. Requirements: (a) use at least 2 simultaneous worktrees, (b) define at least 1 custom subagent in `.claude/agents/`, (c) have your LLM-as-judge evaluation system score both the pre- and post-refactoring code, (d) document the parallel workflow with screenshots or terminal recordings, and (e) have a teammate conduct a C.L.E.A.R. review of the refactored code. Submit the PR, review comments, evaluation scores, and a 500-word reflection on how parallel agents affected code quality and development speed.

### Connection to Project 3

Sprint 2 produces the application's advanced features, built through parallel agentic programming. The peer code review process established this week becomes permanent practice. Teams now have a mature workflow: parallel development → AI + human code review → evaluation system scoring → merge.

---

## Week 13: Security, ethics, and production hardening

### Learning objectives

Students will conduct security audits of AI-generated code using OWASP frameworks, understand intellectual property and licensing implications of AI-assisted development, implement production-grade monitoring and error handling, apply professional ethics frameworks to AI-assisted software engineering, and pass a security audit on their Project 3 application.

### Session 1 (Tuesday): Security of AI-generated code

This session confronts students with the data: Veracode's 2025 analysis of 100+ LLMs found **45% of AI-generated code contains OWASP Top 10 vulnerabilities**. Java had a 72% failure rate. Cross-Site Scripting failed in 86% of cases. Log injection failed in 88%. Critically, **security performance has not improved** even as models get better at functional code—and larger models do not generate more secure code. Apiiro's research on Fortune 50 enterprises found privilege escalation paths jumped **322%** and architectural design flaws spiked **153%** in AI-assisted codebases. Aikido Security's 2026 report found **1-in-5 organizations reported serious incidents** from AI-generated code causing material business impact.

Students implement an **8-gate security pipeline** for their Project 3: (1) pre-commit secrets detection with Gitleaks, (2) dependency vulnerability scanning with `npm audit` and Dependabot, (3) SAST analysis with SonarQube or Semgrep, (4) DAST testing with OWASP ZAP, (5) container scanning if applicable, (6) license compliance scanning with FOSSA, (7) security-specific acceptance criteria defined before AI code generation, and (8) SBOM generation in SPDX or CycloneDX format. The OpenSSF "Security-Focused Guide for AI Code Assistant Instructions" provides copy-paste security prompts for CLAUDE.md covering input validation, secrets management, parameterized queries, and output encoding.

**Slopsquatting** (AI hallucinating non-existent package names that attackers register with malicious code) receives specific attention, as it represents a novel threat category unique to AI-assisted development. Students learn to verify every dependency Claude suggests against official registries.

### Session 2 (Thursday): Ethics, IP, and professional responsibility

This session addresses the non-technical dimensions that distinguish responsible engineers from fast coders. Four topics are covered in depth.

**Intellectual property and copyright** is in rapid flux. The U.S. Copyright Office affirmed in January 2025 that material generated wholly by AI is not copyrightable—only works with sufficient human contribution qualify. The Doe v. GitHub/Copilot litigation (now before the 9th Circuit) alleges training on billions of lines of open-source code without complying with license attribution requirements, with potential DMCA damages exceeding **$9 billion**. Red Hat confirmed 17 incidents where Copilot added GPL-licensed code to MIT-licensed projects in 2024. Students learn practical implications: tag AI-generated code in commits, use license scanning tools, understand the difference between permissive (MIT/Apache) and copyleft (GPL/AGPL) licenses, and never assume AI output is license-free.

**Professional responsibility** centers on the ACM Code of Ethics and the ACM/IEEE Software Engineering Code. The critical clause: "Accept full responsibility for their own work" and "approve software only if they have a well-founded belief that it is safe, meets specifications, passes appropriate tests, and does not diminish quality of life." The ACM's 2024 Principles for Generative AI explicitly notes that AI-generated code presents "substantial security risks." The core message: **you are 100% accountable for what you ship**, regardless of whether a human or AI produced the code.

**Bias in AI-generated code** manifests through default assumptions (binary gender, English-only, US date formats), proxy discrimination in algorithms, accessibility gaps, and skewed naming conventions from male-dominated training data. Students examine real cases: Amazon's hiring tool that penalized women's resumes, healthcare algorithms that underestimated care needs of Black patients, and credit algorithms that offered women lower limits. They audit their own Project 3 code for similar patterns.

**AI documentation and transparency** follows Northeastern's own CPS AI Pledge (August 2025), which requires documenting: tools used, explanation of how AI was used, detailed summary of AI contributions, and how students modified and verified output. Teams formalize this as their project's AI documentation standard, applying it retroactively to Sprint 1 and 2 work.

### Key Claude Code features for week 13

- PreToolUse hooks for security gates (blocking writes to sensitive files, requiring tests before PR)
- `anthropics/claude-code-security-review` for automated vulnerability scanning
- OpenSSF security-focused prompt templates for CLAUDE.md
- MCP integration with Semgrep for SAST
- Headless mode (`claude -p`) for automated security scanning in CI
- Budget limits (`max_budget_usd`) for cost-controlled automated scanning

### Suggested readings and resources

- OWASP Top 10 (owasp.org/www-project-top-ten) and OWASP Top 10 for LLM Applications (genai.owasp.org)
- OpenSSF: "Security-Focused Guide for AI Code Assistant Instructions" (best.openssf.org)
- Georgetown CSET: "Cybersecurity Risks of AI-Generated Code" (cset.georgetown.edu)
- Veracode: 2025 GenAI Code Security Report (veracode.com)
- U.S. Copyright Office AI Reports Parts 2–3 (copyright.gov/ai)
- ACM Code of Ethics (acm.org/code-of-ethics)
- ACM/IEEE Software Engineering Code of Ethics
- Northeastern CPS AI Pledge (August 2025)
- Anthropic: Claude Code security best practices (from Backslash Security analysis)
- FOSSA blog: AI-generated code license compliance

### Practical exercises

1. **Security audit lab**: Teams run the full 8-gate security pipeline on their Project 3 codebase. They must find and fix at least 5 security issues. For each issue, they document: what the vulnerability is, how it was introduced (which AI prompt generated it), the OWASP category, and the fix. A writeup analyzes patterns in what types of security mistakes their AI assistant tends to make.
2. **License compliance exercise**: Teams run license scanning on all dependencies in their Project 3. They identify any copyleft-licensed transitive dependencies, assess compliance obligations, and document a license compliance plan. They also review whether any AI-generated code snippets closely match open-source code.
3. **Bias audit**: Each team reviews their application's UI, data models, and algorithms for bias. They test with at least 3 diverse user personas (varying demographics, abilities, cultural contexts) and document findings. At least one bias must be identified and corrected.
4. **Ethics case study debate**: Two teams argue opposing sides of a real scenario (e.g., "A startup ships an MVP built entirely with AI assistance without security review to beat a competitor to market—is this professionally responsible?"), referencing the ACM Code of Ethics and real incident data.

### Homework 6

Produce a comprehensive security and ethics report for your Project 3: (a) results of the 8-gate security pipeline with all findings and remediations, (b) an SBOM for the project, (c) a license compliance analysis, (d) a bias audit with findings and fixes, (e) a complete AI usage log for Sprints 1 and 2 following the Northeastern CPS documentation template, and (f) a 1,000-word essay arguing whether AI-assisted development creates a higher or lower duty of care for software engineers, referencing the ACM Code of Ethics and at least 3 empirical sources on AI code security.

### Connection to Project 3

The security audit is a hard requirement—Project 3 must pass to receive full credit. The ethics and documentation work establishes practices that carry through to Demo Day, where teams present not just what they built but how they built it responsibly.

---

## Week 14: Integration, polish, and production readiness

### Learning objectives

Students will integrate all four SE practices into a coherent production workflow, deploy and monitor their application in a production environment, conduct final quality assurance across functionality, security, and performance, prepare effective technical demonstrations, and reflect on their growth as AI-assisted software engineers.

### Session 1 (Tuesday): Production deployment and monitoring

This session covers the "last mile" skills that separate demo projects from production applications. **Deployment** uses Vercel (for Next.js applications) or equivalent PaaS, with environment variable management, preview deployments for PRs, and production deployment gates tied to CI/CD passing. **Monitoring** introduces error tracking (Sentry MCP integration), basic uptime monitoring, and structured logging. Students configure Claude Code hooks that enforce deployment standards: a PreToolUse hook blocks merges to main without passing CI, and a PostToolUse hook automatically generates release notes when tags are created.

**Performance optimization with AI** teaches students to use Claude Code for profiling analysis. Students pipe lighthouse reports or performance profiles into Claude (`lighthouse-report.json | claude -p "identify the top 3 performance improvements"`) and implement fixes. The session covers common AI-assisted performance patterns: database query optimization, bundle size reduction, image optimization, and lazy loading.

**The full production CI/CD pipeline** that teams must have operational by end of session includes: lint → typecheck → unit tests → integration tests → E2E tests (Playwright) → security scan → Claude Code PR review → preview deployment → production deployment. This represents the complete synthesis of all four SE practices: testing, code review, architectural consistency, and security.

### Session 2 (Thursday): Demo rehearsal and meta-reflection

Teams conduct **dry-run presentations** (10 minutes each) with structured peer feedback. Each presentation must include: problem statement, architecture overview (the Mermaid diagrams from week 10), live demo, AI workflow showcase (showing parallel agents, evaluation results, CI/CD in action), security audit results, and key technical decisions explained. Peers evaluate using a standardized rubric scoring clarity, technical depth, demo quality, and ability to answer questions.

The session concludes with a structured **meta-reflection** that is perhaps the most pedagogically important exercise of the arc. Students write individual reflections addressing: (1) What did you learn about your own coding abilities by working with AI? (2) When did AI help most and when did it hinder? (3) How did your prompting strategy evolve over the 5 weeks? (4) What would you do differently if starting over? (5) How has your understanding of software quality changed? This reflection captures the "intermediate to advanced" transition and develops the meta-cognitive skills that research identifies as the key differentiator between novice and expert AI-assisted developers.

### Key Claude Code features for week 14

- Headless mode for deployment automation scripts
- MCP integration with Sentry for error monitoring
- Release notes automation via GitHub Actions
- Performance analysis through piped reports
- The complete hook ecosystem enforcing production standards
- SDK integration for custom deployment tooling

### Suggested readings and resources

- Vercel deployment documentation (vercel.com/docs)
- GitHub Actions deployment guides
- Sentry documentation and MCP server
- OWASP Application Security Verification Standard (ASVS) for final checklist
- Google Lighthouse documentation for performance auditing

### Practical exercises

1. **Bug bash**: Teams dedicate 60 minutes to a structured bug bash. Each team member uses Claude Code to find and fix bugs in another teammate's code. Track: bugs found, time to fix, whether Claude Code identified the root cause correctly.
2. **Production deployment race**: Teams deploy their application to production (Vercel/similar) with full CI/CD passing. First team with a clean, monitored production deployment earns bonus participation points.
3. **Demo rehearsal with peer feedback**: Structured 10-minute presentations with written peer evaluations on a standardized rubric.
4. **Final AI documentation compilation**: Teams compile their complete AI usage log across all sprints, producing the definitive record of how AI was used throughout the project.

### Connection to Project 3

This week produces the final submission-ready application. All technical work converges into a deployed, monitored, tested, reviewed, and documented production application ready for Demo Day in week 15.

---

## Assessment criteria for the final full-stack application (Project 3)

The rubric synthesizes all five perspectives—software engineering rigor, technical depth, pedagogical assessment of learning, AI management skill, and ethical responsibility—into six weighted dimensions.

| Dimension | Weight | Criteria |
|-----------|--------|----------|
| **Code quality and architecture** | 25% | Clean, maintainable TypeScript codebase; consistent architectural patterns aligned with documented ADRs; proper separation of concerns; effective database design; well-designed API contracts; no duplicate logic across modules |
| **Testing and evaluation systems** | 20% | 80%+ test coverage via TDD; property-based tests for critical logic; mutation testing results showing test effectiveness; operational LLM-as-judge evaluation system with documented accuracy metrics and validation set; E2E tests covering core user flows |
| **CI/CD and production readiness** | 15% | Complete GitHub Actions pipeline (lint, typecheck, test, security scan, Claude review); automated PR reviews with structured findings; deployed to production with monitoring; error tracking operational; preview deployments for PRs |
| **AI workflow and team process** | 15% | Demonstrated parallel agentic programming (visible in commit history across worktrees); effective CLAUDE.md and custom commands; documented sprint retrospectives; clear role rotation; evidence of iterate-not-accept practices; quality of prompts and context management |
| **Understanding and explanation** | 15% | Oral defense performance (each team member can explain any module); Demo Day presentation quality; technical decisions justified with evidence; ability to identify AI's contributions vs. own design choices; response quality during Q&A |
| **Security, ethics, and documentation** | 10% | Security audit passed (all critical/high findings remediated); SBOM generated; license compliance verified; bias audit conducted; complete AI usage documentation following CPS template; bias mitigation documented |

### Grading modifiers

- **Parallel agents evidence** (required): Commit history must show simultaneous development across worktrees. Absence results in a 10% penalty to AI workflow score.
- **AI documentation completeness** (required): Incomplete AI usage logs result in a 5% penalty to the overall project grade, consistent with the course policy of documenting all AI usage.
- **Individual accountability**: During Demo Day, the instructor may ask any team member to explain any part of the codebase. Inability to explain code that was committed under their name triggers an academic integrity review, per the course policy "never commit code you cannot explain."
- **Bonus (up to 5%)**: Exceptional work on any dimension—particularly innovative evaluation systems, novel parallel workflow patterns, or unusually thorough security auditing—earns up to 5% bonus.

---

## How the four SE practices thread across all five weeks

Each week foregrounds one SE practice while maintaining all four:

**Testing and CI/CD** peaks in week 11 but persists through hooks enforcement (week 12), security scanning integration (week 13), and the complete production pipeline (week 14). By Demo Day, teams have practiced TDD in every sprint.

**Code review and refactoring** peaks in week 12 with the C.L.E.A.R. framework but starts in week 10 (architecture review), continues through security review (week 13), and concludes with the final bug bash (week 14). The writer/reviewer agent pattern reinforces that AI code should always be reviewed by a fresh context.

**System design and architecture** peaks in week 10 but reverberates through architectural coherence checks in code review (week 12), the bias audit of design decisions (week 13), and production architecture validation (week 14). ADRs written in week 10 are referenced in every subsequent sprint.

**Ethical AI development** peaks in week 13 but is present from week 10 (CLAUDE.md establishes responsible AI norms), through week 11 (evaluation systems prevent unchecked AI output), week 12 (code review catches AI-specific risks), and week 14 (final documentation and reflection). The course's core principle—"never commit code you cannot explain"—is the ethical through-line of every week.

This design ensures students don't experience these practices as isolated topics but as integrated dimensions of professional software engineering in the AI era. The progression from individual Claude Code mastery (week 10) through team-based agentic development (weeks 11–12) to production responsibility (weeks 13–14) mirrors the trajectory from junior developer to engineering lead—precisely the career arc this master's program targets.