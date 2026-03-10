# Week 14: Production Readiness & Emerging AI Engineering Quiz

## Quiz Settings (Configure in Canvas)

| Setting | Value |
|---------|-------|
| **Quiz Type** | Graded Quiz |
| **Points** | 22 points |
| **Time Limit** | 15 minutes |
| **Allowed Attempts** | 1 |
| **Shuffle Answers** | Yes |
| **Show One Question at a Time** | Yes |
| **Lock Questions After Answering** | Yes |
| **Due Date** | Tuesday, Week 14 at 2:59 PM PT |
| **Available From** | After Week 14 lecture |
| **Published** | No (until ready) |

---

## Quiz Instructions

This quiz assesses your understanding of production readiness and emerging AI engineering concepts covered in Week 14 lectures and readings.

**Instructions:**
- **Time Limit:** 15 minutes
- **Questions:** 15 questions (22 points total)
- **Attempts:** One attempt only

**Topics Covered:**
- Production deployment (Vercel, environment variables, preview deployments)
- Full CI/CD pipeline stages (lint through production deploy)
- Monitoring and observability (Sentry, structured logging)
- Performance optimization with AI (Lighthouse + Claude)
- Prompt caching mechanics and when to use it
- Model routing (Opus vs Sonnet vs Haiku)
- Cost optimization (`max_budget_usd`, token budgets)
- AI code review at scale (structured review categories)
- RAG patterns for codebases
- The future of AI engineering (emerging trends)
- Demo preparation structure
- Course synthesis (four SE practices across W10-W14)

**Academic Integrity:** This is an individual assessment. Do not use AI assistants to answer questions. Questions are designed to test your understanding, not your ability to look up answers.

---

## Questions

### Section 1: Foundational Concepts (Q1-Q6, mix of 1-2 points)

---

#### Q1: Production Deployment Gates (1 point)
**Type:** Multiple Choice

What is the purpose of tying production deployment to CI/CD pipeline status?

- A) To speed up deployments by skipping manual testing
- B) To ensure that only code which passes all automated checks (lint, tests, security scan) reaches production
- C) To allow developers to deploy directly from their local machines
- D) To replace the need for code review entirely

---

#### Q2: Environment Variable Management (1 point)
**Type:** Multiple Choice

Your P3 team needs to store a database connection string that differs between development and production. What is the correct approach?

- A) Commit the connection string to `.env` in the git repository so all team members have it
- B) Use `.env.local` (gitignored) for local development and Vercel's environment variable settings for preview and production
- C) Hardcode the production connection string in the source code with a comment saying "don't change this"
- D) Store all connection strings in the README so the team can copy-paste them

---

#### Q3: CI/CD Pipeline Order (2 points)
**Type:** Multiple Choice

In the full production CI/CD pipeline covered in the slides, what is the correct order of stages?

- A) Unit tests -> Lint -> Typecheck -> E2E tests -> Security scan -> Deploy
- B) Lint -> Typecheck -> Unit tests -> Integration tests -> E2E tests -> Security scan -> AI PR review -> Preview deploy -> Production deploy
- C) Security scan -> Lint -> Unit tests -> Deploy -> E2E tests -> AI review
- D) AI PR review -> Lint -> Unit tests -> Typecheck -> Deploy -> Security scan

---

#### Q4: Monitoring Pillars (1 point)
**Type:** Multiple Choice

What are the three pillars of observability discussed in the slides?

- A) Speed, reliability, and scalability
- B) Logs, metrics, and errors
- C) Frontend, backend, and database monitoring
- D) Unit tests, integration tests, and E2E tests

---

#### Q5: Structured Logging (1 point)
**Type:** Multiple Choice

Why should production applications use structured logging (JSON format with named fields) instead of `console.log()` with plain strings?

- A) Structured logs run faster than console.log
- B) Structured logs are searchable, filterable, and machine-readable, making it possible to query and analyze production behavior
- C) console.log is deprecated in modern JavaScript
- D) Structured logs are required by Vercel for deployment

---

#### Q6: Prompt Caching Basics (2 points)
**Type:** Multiple Choice

How does prompt caching reduce costs when making repeated API calls to Claude?

- A) It stores the AI's previous responses and returns them without calling the API again
- B) It caches the processed system prompt prefix so that subsequent calls with the same prefix skip reprocessing those tokens, reducing cost by up to 90%
- C) It compresses the prompt text to use fewer characters
- D) It batches multiple requests into a single API call

---

### Section 2: Applied Knowledge (Q7-Q12, mix of 1-2 points)

---

#### Q7: Model Routing (2 points)
**Type:** Multiple Choice

Your team needs to run three tasks: (1) classify 10,000 support tickets by category, (2) implement a new authentication flow, and (3) redesign the database schema for multi-tenancy. Which model routing strategy is most cost-effective?

- A) Use Opus for all three tasks to ensure maximum quality
- B) Use Haiku for ticket classification, Sonnet for the auth flow, and Opus for the database redesign
- C) Use Sonnet for all three tasks as a balanced choice
- D) Use Haiku for all three tasks to minimize cost

---

#### Q8: Cost Control in Automation (1 point)
**Type:** Multiple Choice

What does the `--max-budget-usd` flag do when running Claude Code in a CI/CD pipeline?

- A) It sets the maximum monthly billing limit for your Anthropic account
- B) It caps the total token spend for that specific Claude Code invocation, preventing runaway costs in automated tasks
- C) It limits the number of files Claude Code can read during the session
- D) It sets a budget alert that sends an email when exceeded

---

#### Q9: AI Code Review Categories (2 points)
**Type:** Multiple Choice

When configuring Claude Code for automated PR review in GitHub Actions, the slides recommend categorizing findings into three tiers. What are they?

- A) Critical, Warning, Info
- B) Must Fix, Should Consider, Minor
- C) Blocker, Major, Trivial
- D) Security, Performance, Style

---

#### Q10: Lighthouse + Claude Code (1 point)
**Type:** Multiple Choice

What is the workflow for using Lighthouse reports with Claude Code to optimize performance?

- A) Claude Code runs Lighthouse automatically on every commit
- B) Generate a Lighthouse JSON report, then pipe it to Claude Code with a prompt asking for specific improvements
- C) Install a Lighthouse MCP server that Claude Code queries in real-time
- D) Copy the Lighthouse score number and ask Claude to improve it

---

#### Q11: RAG and Claude Code (2 points)
**Type:** Multiple Choice

The slides explain that Claude Code's context management is a form of RAG (Retrieval-Augmented Generation). Which Claude Code tools correspond to the "retrieval" step?

- A) Edit and Write — they modify files which is a form of retrieval
- B) Glob, Grep, and Read — they search for and load relevant files into context on demand
- C) Bash — it runs commands that output information
- D) /compact and /clear — they manage the context window

---

#### Q12: Preview Deployments (1 point)
**Type:** Multiple Choice

What is the benefit of Vercel's preview deployments for pull requests?

- A) They replace the need for a staging environment entirely
- B) Each PR gets its own live URL so reviewers can test changes without pulling the branch locally
- C) They automatically merge the PR if the preview looks correct
- D) They only work for static sites, not Next.js applications

---

### Section 3: Scenario-Based (Q13-Q15, mix of 1-2 points)

---

#### Q13: Production Incident Response (2 points)
**Type:** Multiple Choice

Your P3 app is deployed to Vercel and users report seeing a blank page. You have Sentry configured with a Sentry MCP server connected to Claude Code. What is the most effective diagnostic approach?

- A) Redeploy the app — it's probably a transient Vercel issue
- B) Ask Claude Code to query Sentry for recent errors, review the stack traces and breadcrumbs, then suggest a fix with specific file and line references
- C) Open Chrome DevTools in your local development environment and try to reproduce the issue
- D) Roll back to the previous deployment without investigating the cause

---

#### Q14: Demo Day Preparation (1 point)
**Type:** Multiple Choice

According to the demo preparation guidelines, what should the "AI Workflow Showcase" portion of your presentation include?

- A) A live coding session where you write code with Claude Code in front of the audience
- B) Specific examples of how AI helped build the project — such as a complex feature implementation, a bug diagnosis, or your evolving CLAUDE.md
- C) A comparison of all AI tools you tried, with benchmarks
- D) Screenshots of every Claude Code conversation during the project

---

#### Q15: Course Synthesis (2 points)
**Type:** Multiple Choice

The slides identify four software engineering practices threaded across Weeks 10-14. Which of the following correctly lists all four?

- A) Testing & CI/CD, Code Review & Refactoring, System Design, Ethical AI Development
- B) Prompt Engineering, Context Engineering, Agent Architecture, Deployment
- C) Frontend Development, Backend Development, Database Design, DevOps
- D) Agile/Scrum, Pair Programming, TDD, Code Review

---

## Canvas Import Instructions

1. **Create New Quiz** in Canvas under "Quizzes" using `canvas-extras` MCP tools
2. **Configure Settings** as shown in the Settings table above
3. **Add Questions** using `canvas_create_quiz_question` for each question
4. **Set Correct Answers** (see answer key - instructor only)
5. **Save and Preview** before publishing

## Anti-Cheating Measures Implemented

1. **Time pressure** - 15 minutes for 15 questions limits research time
2. **Answer shuffling** - Different order for each student
3. **Scenario-based** - Requires understanding and application, not just recall
4. **Single attempt** - No retakes
5. **Locked questions** - Can't go back and change answers
6. **Progressive difficulty** - Easier concepts first, harder application last
