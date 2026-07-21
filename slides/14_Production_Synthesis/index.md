---
title: "CS 6983: Production & Course Synthesis"
theme: white
revealOptions:
  transition: convex
  hash: true
  history: true
---

<!-- .slide: id="title" -->

<span class="course-week">CS 6983 · Week 14</span>

## Production & Course Synthesis

Deploy · Monitor · Optimize · Reflect

<img src="../img/seal_logotype-768x252.png" alt="Northeastern University" width="300">

[**John Alexis Guerra Gomez**](http://johnguerra.co/)

<small>jguerra at northeastern.edu · [Class](https://johnguerra.co/classes/aiCoding_spring_2026/) · [Slides](http://johnguerra.co/lectures/ai_assisted_coding/15_Production_Synthesis/)</small>

---

<!-- .slide: class="dense" -->

# What We'll Cover Today

1. Where We Are -- Week 14 checkpoint
2. Production Deployment
3. Monitoring & Observability
4. Performance Optimization with AI
5. Cost Optimization
6. Harness Design for Production
7. RAG & Vector Databases
8. The Future of AI Engineering
9. Demo Preparation
10. Meta-Reflection & Course Synthesis

---

# Where We Are

> Week 14 -- Final week

<!-- vertical -->

## Recap: Week 13

**Emerging AI Engineering**

- AI code review at scale: automated PR reviews with Claude Code in GitHub Actions
- Structured review output: MUST FIX / SHOULD CONSIDER / MINOR
- Security: 45% of AI-generated code contains OWASP vulnerabilities
- C.L.E.A.R. framework for reviewing AI code

**You can now review code with AI.** This week: ship everything to production.

<!-- vertical -->

## This Week: Ship & Reflect

**Session 1:** Production-ready P3

- Deployment pipelines, monitoring, performance and cost optimization

**Session 2:** Prepare for Demo Day

- Harness design, RAG, future trends
- Demo rehearsal and meta-reflection

---

# Production Deployment

> From localhost to production

<!-- vertical -->

## Why Deployment Matters

**Your P3 is not done until it's deployed.**

- A project that only runs on localhost is a homework exercise
- A deployed project is a portfolio piece
- Employers check live URLs

**The gap between "it works on my machine" and "it works in production" is where engineering happens.**

<!-- vertical -->

## Vercel for Next.js

**Why Vercel?** Built by the Next.js team. Zero-config, automatic HTTPS, CDN, edge functions, generous free tier.

```text
npm i -g vercel
vercel login
vercel          # deploys to preview
vercel --prod   # deploys to production
```

**Every PR gets its own preview URL automatically:**

```text
PR #42: add-login-page
  -> https://myapp-pr-42.vercel.app
```

Reviewers test the PR live before merging. No branch pulling needed.

<!-- vertical -->

<!-- .slide: class="dense" -->

## Environment Variable Management

**Never commit secrets to git.**

| Environment | Where secrets live |
|---|---|
| Local dev | `.env.local` (gitignored) |
| Preview | Vercel dashboard > Settings > Env Vars |
| Production | Vercel dashboard > Settings > Env Vars |

```text
# .env.local (gitignored)
DATABASE_URL=postgres://localhost:5432/myapp_dev

# Vercel Production (configured in dashboard)
DATABASE_URL=postgres://prod-server:5432/myapp
```

<!-- vertical -->

## Production Deployment Gates

**Never deploy directly. Let the pipeline decide.**

```text
main branch push -> CI/CD runs -> All pass? -> Deploy
                                  Fail?     -> Block + notify
```

**The rule:** If CI fails, production doesn't update. Period.

---

# The Full CI/CD Pipeline

> Every step between `git push` and production

<!-- vertical -->

## Pipeline Stages

<!-- .slide: class="dense" -->

| Stage | Tool | What it catches |
|---|---|---|
| 1. Lint | ESLint, Prettier | Style violations, unused imports |
| 2. Typecheck | `tsc --noEmit` | Type errors tests might miss |
| 3. Unit Tests | Jest / Vitest | Logic bugs in isolated functions |
| 4. Integration | API route tests | API contract violations |
| 5. E2E Tests | Playwright | Broken user workflows |
| 6. Security Scan | `npm audit`, OWASP | Known vulnerable dependencies |
| 7. AI PR Review | Claude Code | Architectural issues, edge cases |
| 8. Preview Deploy | Vercel preview URL | Build failures, runtime errors |
| 9. Prod Deploy | Vercel production | Final destination |

**Catching bugs earlier is cheaper. Lint is free. Production bugs cost reputation.**

<!-- vertical -->

## GitHub Actions Workflow

```yaml
name: CI/CD Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test
      - run: npx playwright test
      - run: npm audit --audit-level=high
```

**Each step must pass before the next runs.**

---

# Monitoring & Observability

> Knowing what's happening in production

<!-- vertical -->

## The Three Pillars

| Pillar | What it tells you | Tool |
|---|---|---|
| **Logs** | What happened | Structured logging (JSON) |
| **Metrics** | How much / how fast | Uptime monitors |
| **Errors** | What went wrong | Sentry |

**Without monitoring, you only find bugs when users complain.**

<!-- vertical -->

<!-- .slide: class="dense" -->

## Error Tracking with Sentry

```javascript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV,
});
```

**What you get:** stack traces with source maps, user context, breadcrumbs (what happened before the error), release tracking (which deploy introduced it).

**With a Sentry MCP server, Claude Code can query your errors directly:**

```text
> "What are the top 5 errors in production this week?"
Claude reads Sentry API -> summarizes -> suggests fixes
```

<!-- vertical -->

## Structured Logging

**Don't:** `console.log("user logged in")`

**Do:**

```javascript
logger.info("user.login", {
  userId: user.id, method: "oauth", duration_ms: 142
});

logger.error("payment.failed", {
  userId: user.id, amount: 49.99, error: err.message
});
```

**Structured logs are searchable, filterable, and machine-readable.**

<!-- vertical -->

## Hooks: Block Bad Actions

**PreToolUse hooks prevent mistakes before they happen.**

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash(gh pr merge*)",
      "command": "check-ci-status.sh",
      "action": "block"
    }]
  }
}
```

**If CI hasn't passed, the merge is blocked automatically.**

<!-- vertical -->

## Hooks: Automate Good Actions

**PostToolUse hooks trigger automation after events.**

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Bash(git tag*)",
      "command": "generate-release-notes.sh"
    }]
  }
}
```

**Every `git tag` automatically generates release notes.**

---

# Performance Optimization with AI

> Using AI to make your app faster

<!-- vertical -->

## Lighthouse + Claude Code

**Pipe performance reports directly to Claude.**

```bash
# Generate Lighthouse report
npx lighthouse https://myapp.vercel.app \
  --output=json --output-path=./report.json

# Ask Claude to analyze it
cat report.json | claude -p \
  "Identify the top 3 performance improvements.
   For each: issue, expected impact, exact code changes."
```

**AI reads the 5000-line JSON so you don't have to.**

<!-- vertical -->

<!-- .slide: class="dense" -->

## Common Performance Patterns

| Pattern | Problem | AI-Assisted Fix |
|---|---|---|
| **DB queries** | N+1 queries, missing indexes | Claude analyzes query logs, suggests indexes |
| **Bundle size** | Large JS bundles | Claude identifies heavy imports, suggests tree-shaking |
| **Images** | Unoptimized images | Claude suggests next/image, WebP conversion |
| **Lazy loading** | Everything loads upfront | Claude identifies below-fold components for `dynamic()` |
| **Caching** | Repeated API calls | Claude suggests cache headers, stale-while-revalidate |

<!-- vertical -->

## Lazy Loading Example

```javascript
// Before: imported on every page load
import HeavyChart from './HeavyChart';

// After: loaded only when needed
const HeavyChart = dynamic(
  () => import('./HeavyChart'),
  { loading: () => <Skeleton /> }
);
```

**AI identifies below-fold components and suggests `dynamic()` imports to reduce bundle size.**

---

# Cost Optimization

> Managing AI costs in production workflows

<!-- vertical -->

## Prompt Caching: How It Works

**Problem:** Repeated API calls with similar prompts waste tokens.

```text
First call:
  [System prompt: 2000 tokens] + [User query: 50 tokens]
  -> Full processing, result cached

Second call (same system prompt):
  [Cached: 2000 tokens] + [New query: 50 tokens]
  -> 90% cheaper, 85% faster
```

**When to use:** Long system prompts reused across calls, RAG with stable document context, batch processing with shared instructions.

<!-- vertical -->

## Prompt Caching Mechanics

<!-- .slide: class="dense" -->

| Aspect | Detail |
|---|---|
| **Cache hit** | System prompt matches exactly -> reuse |
| **Cache miss** | Any change to cached prefix -> recompute |
| **TTL** | ~5 minutes of inactivity |
| **Savings** | Up to 90% cost reduction on cached tokens |
| **Latency** | Up to 85% faster on cache hit |
| **Minimum** | 1024 tokens for caching to activate |

**Key insight:** Structure prompts so the stable part comes first (system prompt, docs) and the variable part comes last (user query).

<!-- vertical -->

<!-- .slide: class="dense" -->

## Model Routing

**Not every task needs the most powerful model.**

| Model | Best for | Cost | Speed |
|---|---|---|---|
| **Opus** | Complex architecture, multi-file refactoring | $$$ | Slower |
| **Sonnet** | Daily coding, PR reviews, standard features | $$ | Medium |
| **Haiku** | Simple tasks, classification, batch processing | $ | Fast |

```text
"Fix this typo in the README"         -> Haiku  ($0.001)
"Implement login following auth pattern" -> Sonnet ($0.01)
"Redesign DB schema for multi-tenancy"  -> Opus   ($0.10)
```

**Route tasks to the cheapest model that can handle them.**

<!-- vertical -->

## Managing Costs with Claude Code

**Set budget limits for automated tasks:**

```bash
claude -p "Review this codebase for security issues" \
  --max-budget-usd 5.00
```

**`max_budget_usd` prevents runaway costs in:** CI/CD pipeline reviews, batch processing, automated security scans, fan-out agent tasks.

<!-- vertical -->

## Choosing the Right Model

- **Development:** Sonnet (good balance)
- **Code review CI:** Sonnet (quality matters)
- **Log classification:** Haiku (volume is high)
- **Architecture decisions:** Opus (stakes are high)

**Route tasks to the cheapest model that can handle them.**

---

# Harness Design for Production

> Multi-agent architectures for real applications

<!-- vertical -->

<!-- .slide: class="dense" -->

## The Planner / Generator / Evaluator Pattern

**GAN-inspired architecture for building production applications.**

<pre class="mermaid">
%%{init: {'theme': 'default', 'flowchart': {'nodeSpacing': 20, 'rankSpacing': 30}}}%%
flowchart LR
    A["Planner<br/>(prompts → specs)"] --> B["Generator<br/>(implements code)"]
    B --> C["Evaluator<br/>(tests with Playwright)"]
    C -->|"Feedback"| B
</pre>

<!-- vertical -->

## Three Roles, Separate Agents

- **Planner:** Converts high-level prompts into detailed specifications
- **Generator:** Implements with React/Vite/FastAPI using the spec
- **Evaluator:** Tests with browser automation (Playwright), not just unit tests

**Separating roles prevents the "lenient bias" problem.** The code author should not be the only reviewer.

<!-- vertical -->

<!-- .slide: class="dense" -->

## Self-Evaluation Shows Lenient Bias

**Models are bad at evaluating their own work.**

When a model generates code and then evaluates it:

- It gives itself the benefit of the doubt
- It marks features as "complete" prematurely
- It overlooks bugs it introduced

**Solution:** Separate generation from evaluation. Different agent sessions, different roles, different prompts.

This maps directly to your CI/CD pipeline: **the code author should not be the only reviewer.**

<!-- vertical -->

## Solo Agent vs Full Harness

<!-- .slide: class="dense" -->

| Approach | Time | Cost | Quality |
|---|---|---|---|
| **Solo agent** | 20 min | $9 | Broken mechanics, incomplete features |
| **Full harness** (Planner + Generator + Evaluator) | 6 hrs | $200 | Functional gameplay, polished output |
| **Opus 4.6 harness** (DAW example) | 3 hrs 50 min | $125 | Eliminated sprint decomposition, maintained quality |

**Key insight:** *"Every component in a harness encodes an assumption about what the model can't do independently."* As models improve, less scaffolding is necessary.

**Tradeoff:** Not every task needs a harness. Match investment to complexity.

<!-- vertical -->

<!-- .slide: class="dense" -->

## One-Feature-Per-Session Pattern

**Agents attempting comprehensive implementation in single sessions exhaust context mid-feature.**

The pattern:

1. **Initializer agent** creates `init.sh`, `claude-progress.txt`, and a feature list (JSON)
2. **Coding agent** follows startup: read context -> review progress -> consult feature list -> run tests -> work -> commit
3. **One feature per session** -- prevents context exhaustion and premature completion

<!-- vertical -->

## Feature Lists as Guardrails

```json
{
  "feature": "User Authentication",
  "steps": ["Create login form", "Add OAuth", "Session management"],
  "verification": ["Can log in with email", "OAuth redirects work"],
  "status": "incomplete"
}
```

Structured verification criteria prevent agents from declaring victory early.

<!-- vertical -->

<!-- .slide: class="dense" -->

## Four Failure Modes of Long-Running Agents

| Failure Mode | Prevention |
|---|---|
| **Early victory declarations** — Agent claims "done" with broken output | Feature list with verification criteria |
| **Undocumented broken states** — Tests fail silently, agent moves on | Browser automation (Puppeteer/Playwright) |
| **Premature feature completion** — Marks complete without testing | Separate evaluator agent |
| **Setup time waste** — Each session re-discovers project structure | `init.sh` + `claude-progress.txt` |

**Browser automation (Puppeteer MCP) dramatically improved outcomes over unit tests alone.**

---

# RAG & Vector Databases

> Retrieval-augmented generation for AI-powered apps

<!-- vertical -->

## The Context Problem at Scale

| Codebase | Files | Tokens |
|---|---|---|
| Small project | ~50 files | ~100K tokens |
| Medium project | ~500 files | ~1M tokens |
| Enterprise monorepo | ~50,000 files | ~100M tokens |

**You can't feed 100M tokens into a 200K context window.** Solution: retrieve only what's relevant.

<!-- vertical -->

## RAG: Retrieve What's Relevant

<pre class="mermaid">
%%{init: {'theme': 'default', 'flowchart': {'nodeSpacing': 20, 'rankSpacing': 30}}}%%
flowchart LR
    A["User Query"] --> B["Embed"]
    B --> C["Search Index"]
    C --> D["Top-k Results"]
    D --> E["Augment Prompt"]
    E --> F["LLM Generates"]
</pre>

**Retrieval-Augmented Generation:** find the relevant chunks, add them to the prompt, then generate.

<!-- vertical -->

## Claude Code's Context Management IS RAG

**You've been using RAG without knowing it.**

When Claude Code processes your request:

1. **Reads your CLAUDE.md** -- cached project context
2. **Uses Glob/Grep** -- just-in-time file retrieval
3. **Reads specific files** -- targeted context loading
4. **Compacts when full** -- summarizes to free space

<!-- vertical -->

## Claude Code = RAG in Practice

- **Retrieval:** Glob, Grep, Read tools
- **Augmentation:** Adding retrieved files to context
- **Generation:** Producing code with that context

**The tools you already know are a RAG pipeline.** Understanding this pattern lets you build your own.

<!-- vertical -->

## What Are Embeddings?

**Embeddings turn text into numbers that capture meaning.**

```text
"authentication middleware" -> [0.82, -0.15, 0.43, ...]  (1536 dims)
"login security check"     -> [0.79, -0.12, 0.41, ...]  (similar!)
"database migration"       -> [0.11, 0.67, -0.33, ...]  (different)
```

**Key insight:** Similar meaning = nearby vectors. This enables **semantic search** -- finding relevant content even when keywords don't match.

<!-- vertical -->

## Embedding Models

| Embedding Model | Dimensions | Best For |
|---|---|---|
| OpenAI text-embedding-3-small | 1536 | General purpose, good quality/cost |
| Voyage Code 3 | 1024 | Code-specific, understands syntax |
| Nomic Embed | 768 | Open source, self-hostable |

<!-- vertical -->

## Vector Databases

**Where embeddings live so you can search them fast.**

| Database | Type | Best For |
|---|---|---|
| **pgvector** | Postgres extension | Already using Postgres, simple setup |
| **Chroma** | Lightweight, local | Prototyping, small projects |
| **Pinecone** | Managed cloud | Production scale, zero ops |
| **Weaviate** | Self-hosted or cloud | Hybrid search (vector + keyword) |

<!-- vertical -->

## pgvector Example

```sql
-- pgvector: add vector column to existing table
ALTER TABLE docs ADD COLUMN embedding vector(1536);

-- Find 5 most similar documents
SELECT content, 1 - (embedding <=> query_vec) AS similarity
FROM docs ORDER BY embedding <=> query_vec LIMIT 5;
```

**pgvector is the easiest starting point** -- no new infrastructure, just a Postgres extension.

<!-- vertical -->

<!-- .slide: class="dense" -->

## Chunking Strategies

**How you split your data determines retrieval quality.**

| Strategy | How it works | Best for |
|---|---|---|
| **Fixed-size** | Split every N tokens with overlap | Documents, articles |
| **Semantic** | Split at paragraph/section boundaries | Structured docs, markdown |
| **AST-based** | Split at function/class boundaries | Source code |
| **Sliding window** | Overlapping chunks for context continuity | Long narratives |

**For code:** AST-based chunking preserves function boundaries.

<!-- vertical -->

## Chunking: Good vs Bad

```text
// Good: one chunk per function
chunk_1: function authenticate(user, pass) { ... }
chunk_2: function validateToken(token) { ... }

// Bad: split mid-function
chunk_1: function authenticate(user, pass) { if (user
chunk_2: === null) { return false; } ... }
```

A function split across two chunks loses meaning.

<!-- vertical -->

## Building a RAG Pipeline

<pre class="mermaid">
%%{init: {'theme': 'default', 'flowchart': {'nodeSpacing': 15, 'rankSpacing': 20}}}%%
flowchart LR
    subgraph Indexing ["Indexing (offline)"]
        A["Source Data"] --> B["Chunk"] --> C["Embed"] --> D["Vector DB"]
    end
    subgraph Query ["Query (runtime)"]
        E["Question"] --> F["Embed"] --> G["Search"] --> H["Top-k"] --> I["Augment"] --> J["LLM"]
    end
    D -.-> G
</pre>

<!-- vertical -->

## RAG Pitfalls

| Pitfall | Problem |
|---|---|
| **Chunks too large** | Noisy results dilute relevance |
| **Chunks too small** | Missing context, incomplete answers |
| **No overlap** | Missed boundaries between chunks |
| **Stale index** | Data changed but embeddings didn't |

**Keep your index fresh and your chunks right-sized.**

---

# The Future of AI Engineering

> Where this is all heading

<!-- vertical -->

## The Trajectory

<pre class="mermaid">
%%{init: {'theme': 'default', 'flowchart': {'nodeSpacing': 20, 'rankSpacing': 30}}}%%
flowchart LR
    A["Individual Coding (2024)"] --> B["Team Workflows (2025)"]
    B --> C["Autonomous Systems (2027+)"]
</pre>

**You are learning the middle column right now.**

<!-- vertical -->

## Emerging Trends

**Computer Use Agents** -- AI that uses a browser, clicks buttons, fills forms. Testing: "Verify the signup flow works end-to-end."

**Multi-Modal Agents** -- Screenshots + code + logs + docs in one context. "Here's the Figma design, here's the current page, make them match."

**Agent Marketplaces** -- Pre-built agents for specific tasks (security audit, migration, i18n). Plug into your CI/CD pipeline.

**AI as Infrastructure** -- AI becomes a standard pipeline stage, not a tool you invoke manually.

<!-- vertical -->

## Career Implications

| Old World | New World |
|---|---|
| Write code from scratch | Direct AI to write code, review output |
| Memorize syntax | Understand architecture and systems |
| Individual productivity | Orchestrate AI agents and human teams |
| Debug by reading code | Debug by asking the right questions |

**Your advantage:** You understand both engineering fundamentals AND AI tooling. That combination is rare and valuable.

---

# Demo Preparation

> Presenting your P3 to the class

<!-- vertical -->

## Demo Day Structure

**Each team gets 8-10 minutes.**

| Section | Time | Focus |
|---|---|---|
| Problem Statement | 1 min | What problem? Who cares? |
| Architecture Overview | 2 min | Mermaid diagram, tech stack |
| Live Demo | 3 min | Core user flow, working app |
| AI Workflow Showcase | 2 min | How AI helped build this |
| Q&A | 2 min | Peer questions |

<!-- vertical -->

## Problem Statement (1 min)

**Answer three questions:**

1. **What problem does this solve?** Be specific: "Students can't find study partners for specific courses" -- not "We built a social app"
2. **Who has this problem?** Your target user, from Mom Test research
3. **Why does your solution matter?**

<!-- vertical -->

## Architecture Overview (2 min)

**Show a Mermaid diagram:**

```text
graph LR
  A[React Frontend] --> B[Next.js API]
  B --> C[PostgreSQL]
  B --> D[Auth0]
  F[GitHub Actions] --> G[Vercel]
```

Highlight tech stack choices, key decisions, where AI agents fit.

<!-- vertical -->

## Live Demo Tips (3 min)

1. **Script it.** Know exactly what you'll click, type, show
2. **Use real data.** Not "test test test"
3. **Show the core flow.** Login -> main feature -> result
4. **Have a backup.** Record a video in case WiFi fails
5. **Practice at least 3 times.**

<!-- vertical -->

## AI Workflow Showcase (2 min)

- A complex feature where Claude Code wrote the implementation
- A bug where AI diagnosis saved hours
- Your CLAUDE.md and how it evolved
- Your CI/CD pipeline with AI review

<!-- vertical -->

## Peer Evaluation Rubric

<!-- .slide: class="dense" -->

| Criterion | Excellent (5) | Good (3-4) | Needs Work (1-2) |
|---|---|---|---|
| **Clarity** | Problem and solution immediately clear | Mostly clear, minor confusion | Hard to understand |
| **Technical Depth** | Architecture well-explained | Some depth, some hand-waving | Surface level only |
| **Demo Quality** | Smooth, real data, core flow | Minor hiccups, mostly smooth | Broken, unprepared |
| **AI Workflow** | Clear integration story, specific examples | Some AI usage shown | No AI workflow discussed |
| **Q&A** | Confident, knowledgeable | Reasonable answers | Unable to answer |

---

# Meta-Reflection

> The most important exercise of the semester

<!-- vertical -->

## Why Reflect?

**Learning without reflection is just experience.**

Students who reflect on their learning retain information 23% better, transfer skills to new contexts more effectively, and develop stronger metacognitive abilities.

<small>Source: [Learning by Thinking](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2414478) -- Di Stefano et al., Harvard Business School</small>

**This is not a "soft" exercise. It's a learning multiplier.**

<!-- vertical -->

## Reflect: Your Growth

**About your coding abilities:**
- What did you learn about your own strengths and weaknesses?
- How has your relationship with code changed?

**About AI as a tool:**
- When did AI help you most? When did it hinder you?
- How did your prompting evolve from Week 1 to Week 14?
- What would you never let AI do? What do you always let it do?

<!-- vertical -->

## Reflect: Quality & Hindsight

**About software quality:**
- How has your understanding of "good code" changed?
- What engineering practices will you carry forward?

**Hindsight:** If you restarted P1 today, what would you change? Which AI harness was most valuable for which tasks? What's the biggest mistake you made?

---

# Course Synthesis

> Connecting the threads across Weeks 9-14

<!-- vertical -->

## The Four SE Practices

<!-- .slide: class="dense" -->

| Practice | W10 | W11 | W12 | W13 | W14 | W15 |
|---|---|---|---|---|---|---|
| **Testing & CI/CD** | Tool permissions | TDD, GitHub Actions | Hooks enforce CI | Agent evals | Security review | Full pipeline deploy |
| **Code Review** | CLAUDE.md standard | PR workflow via CC | Writer/reviewer agents | Multi-agent review | AI review at scale | Production monitoring |
| **System Design** | Agentic loop | Explore-Plan-Implement | Skills, hooks, MCP | 6 agent patterns | Model routing | Harness design, RAG |
| **Ethical AI Dev** | Permission modes | Human review of AI | Hooks as guardrails | Agent safety | Security scanning | Production responsibility |

<!-- vertical -->

## The Learning Arc

```text
Weeks 1-3: Understanding AI
  "What are LLMs? How do prompts work?"

Weeks 4-5: Using AI (Claude Web)
  "I can build prototypes with AI!"

Weeks 6-8: Coding with AI (IDE)
  "AI is my pair programmer"

Weeks 9-11: Engineering with AI (Claude Code)
  "AI is part of my development infrastructure"

Weeks 12-14: Architecting with AI (Agents & Production)
  "I can design and deploy AI-powered systems"
```

**You went from user to architect in 15 weeks.**

<!-- vertical -->

## From Individual to Production

```text
P1: Individual Mastery
  Solo project, Claude Web, basic engineering
  "Can I build something useful with AI?"

P2: Team Development
  Pair project, IDE AI, Agile/Scrum, code review
  "Can I build with a partner and maintain quality?"

P3: Production Responsibility
  Team project, Claude Code, agents, CI/CD, deployment
  "Can I ship a production-quality application?"
```

**Each project raised the stakes and the standards.**

<!-- vertical -->

## What You Take With You

**Technical skills:** Prompt engineering, context engineering (CLAUDE.md, rules files), TDD with AI, CI/CD with AI review, agent architecture patterns, harness design.

**Engineering judgment:** When to trust AI output and when to verify, how to review AI-generated code, when to use which harness, how to manage costs and quality tradeoffs.

**These are career-defining skills, not just course material.**

---

# Deliverables

> What's due

<!-- vertical -->

<!-- .slide: class="dense" -->

## This Week

| Deliverable | Due | Details |
|---|---|---|
| **Project 3 Final** | End of Week 14 | Final submission with deployed URL |
| **Demo Videos** | End of Week 14 | Async demo submissions |

**P3 Final Submission Checklist:**

- [ ] App deployed to production (Vercel or similar)
- [ ] CI/CD pipeline passing all stages
- [ ] Environment variables properly configured
- [ ] Error monitoring set up (Sentry or equivalent)
- [ ] README with setup instructions and live URL
- [ ] Demo video recorded
- [ ] Architecture diagram (Mermaid) in repo

---

# Resources

> Readings and references

<!-- vertical -->

## Production & Deployment

<!-- .slide: class="dense" -->

| Resource | Description | URL |
|---|---|---|
| Vercel Deployment Docs | Production deployment | vercel.com/docs |
| GitHub Actions Docs | CI/CD pipeline reference | docs.github.com/en/actions |
| Sentry for Next.js | Error monitoring setup | docs.sentry.io/platforms/javascript/guides/nextjs/ |
| Prompt Caching | How caching works, when to use it | platform.claude.com/docs/en/build-with-claude/prompt-caching |

<!-- vertical -->

## Harness Design & RAG

<!-- .slide: class="dense" -->

| Resource | Description | URL |
|---|---|---|
| Harness Design for Long-Running Apps | Planner/Generator/Evaluator architecture | anthropic.com/engineering/harness-design-long-running-apps |
| Effective Harnesses for Long-Running Agents | One-feature-per-session, feature lists | anthropic.com/engineering/effective-harnesses-for-long-running-agents |
| OWASP Top 10 | Security best practices for web apps | owasp.org/www-project-top-ten/ |
| Define Success Criteria | Building measurable success metrics | platform.claude.com/docs/en/test-and-evaluate/define-success |

---

# Thank You

**Last lecture of the semester.**

You started this course wondering if "vibe coding" was real engineering.

Now you know: **it is, when you do it right.**

Good luck with your demos and final submissions.

Build something you're proud of.
