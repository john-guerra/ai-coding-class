---
title: "CS 6983: AI Security & Code Quality"
theme: white
revealOptions:
  transition: convex
  hash: true
  history: true
---

<!-- .slide: id="title" -->

<span class="course-week">CS 6983 · Week 13</span>

## AI Security & Code Quality

Safety · Security · Evals · Ethics

<img src="../img/seal_logotype-768x252.png" alt="Northeastern University" width="300">

[**John Alexis Guerra Gomez**](http://johnguerra.co/)

<small>jguerra at northeastern.edu · [Class](https://johnguerra.co/classes/aiCoding_spring_2026/) · [Slides](http://johnguerra.co/lectures/ai_assisted_coding/14_AI_Security_Code_Quality/)</small>

---

# What We'll Cover Today

1. Where We Are -- Week 13 checkpoint
2. Agent Safety & Evaluation
3. The Security Problem
4. The 8-Gate Security Pipeline
5. Slopsquatting
6. AI Code Review at Scale
7. Eval Awareness & Integrity
8. Ethics & Professional Responsibility
9. Hands-on Lab
10. This Week's Deliverables

---

# Where We Are

> Week 13 -- Securing AI-generated code

<!-- vertical -->

## Recap: Week 12

**Agent Architectures & Agent SDK**

- The 6 agent patterns: chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer, autonomous
- Claude Agent SDK: `query()`, hooks, sessions
- Multi-agent coordination and message passing

**You can now build agents.** This week: make sure what they produce is **safe, secure, and trustworthy**.

<!-- vertical -->

## This Week: Two Themes

<div class="columns">
<div class="column">

**Theme 1: Security of AI-Generated Code**

- The data is alarming -- [45% of AI code has OWASP vulnerabilities](https://www.veracode.com/blog/genai-code-security-report/)
- The 8-gate pipeline that catches what AI misses
- Novel threats like slopsquatting
- AI code review automation in CI/CD

</div>
<div class="column">

**Theme 2: Evaluation & Ethics**

- How to evaluate AI agents systematically
- Eval awareness: when models reverse-engineer benchmarks
- IP, copyright, and professional responsibility

</div>
</div>

---

# Agent Safety & Evaluation

> Measuring and controlling autonomous systems

<!-- vertical -->
<!-- .slide: class="dense" -->

## Eval Frameworks: pass@k vs pass^k

Two metrics for non-deterministic AI outputs:

<div class="columns">
<div class="column">

**pass@k** -- At least one success in k attempts

- "If I try 5 times, do I get a correct answer at least once?"
- Generous -- rewards occasional success

</div>
<div class="column">

**pass^k** -- ALL k trials succeed

- "Does this work every time I run it?"
- Strict -- rewards consistency and reliability

</div>
</div>

**For production systems, pass^k matters more.** Users don't get 5 tries.

<small>Source: [Demystifying Evals for AI Agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) -- Anthropic</small>

<!-- vertical -->
<!-- .slide: class="dense" -->

## Three Grader Types

| Grader | Strengths | Weaknesses |
|--------|-----------|------------|
| **Code-based** | Fast, objective, deterministic | Brittle, only checks exact criteria |
| **Model-based** | Nuanced, understands intent | Needs calibration, costs tokens |
| **Human** | Gold standard, catches subtleties | Expensive, slow, doesn't scale |

**Best practice:** Combine all three.

- **Code** graders for deterministic checks (tests pass, format correct)
- **Model** graders for qualitative assessment (quality, readability)
- **Human** graders for high-stakes decisions (security, architecture)

<!-- vertical -->
<!-- .slide: class="dense" -->

## Building Your First Eval Suite

<div class="columns">
<div class="column">

**Start small, start from real failures.**

1. Collect **20-50 tasks** from real failures
2. Convert manual testing into automated cases
3. **Evaluate outcomes, not paths**
4. Monitor for "eval saturation" -- 100% = too easy

</div>
<div class="column">

**Agent-specific eval strategies:**

- **Coding agents:** Unit tests + LLM rubrics
- **Conversational:** State verification + tone
- **Research:** Groundedness checks vs source

</div>
</div>

---

# The Security Problem

> AI-generated code is dangerously insecure

<!-- vertical -->

## The Data Is Alarming

<!-- .slide: class="dense" -->

**Veracode 2025 Study:**

| Metric | Result |
|--------|--------|
| AI code with OWASP Top 10 vulnerabilities | **45%** |
| Java code failure rate | **72%** |
| XSS vulnerability rate | **86%** |
| Log injection vulnerability rate | **88%** |

<small>Source: [GenAI Code Security Report](https://www.veracode.com/blog/genai-code-security-report/) -- Veracode, 2025</small>

**Critical finding:** Larger, more capable models do **NOT** generate more secure code. Security performance has not improved even as models get dramatically better at functional correctness.

<!-- vertical -->
<!-- .slide: class="dense" -->

## More Alarming Data

<div class="columns">
<div class="column">

**Apiiro Research:**

- Privilege escalation flaws: **+322%**
- Architectural design flaws: **+153%**

<small>Source: [4x Velocity, 10x Vulnerabilities](https://apiiro.com/blog/4x-velocity-10x-vulnerabilities-ai-coding-assistants-are-shipping-more-risks/) -- Apiiro</small>

</div>
<div class="column">

**Aikido 2026 Report:**

- **1 in 5** orgs reported serious security incidents from AI-generated code

<small>Source: [2026 State of AI in Security & Development](https://www.aikido.dev/reports/2026-state-of-ai-in-security-development) -- Aikido</small>

</div>
</div>

AI writes code that *works* but is *vulnerable*. It passes tests but fails security audits. **You ship it. You own it.**

<!-- vertical -->

## Why AI Code Is Insecure

1. **Training data includes vulnerable code** -- learned from millions of repos with known vulnerabilities
2. **Functional correctness != security** -- optimizes for "does it work?" not "is it safe?"
3. **Missing context** -- doesn't know your threat model or compliance requirements
4. **Developer overconfidence** -- code that "looks right" and passes tests gets less scrutiny
5. **Speed vs rigor tradeoff** -- faster development tempts developers to skip security reviews

---

# The 8-Gate Security Pipeline

> Systematic defense for AI-generated code

<!-- vertical -->
<!-- .slide: class="dense" -->

## Overview: 8 Gates

Every AI-generated code change should pass through **8 security gates** before reaching production.

```text
  Code -> [1] -> [2] -> [3] -> [4] -> [5] -> [6] -> [7] -> [8] -> Production
         Pre-  Deps   SAST   DAST  Contain License SecAcc  SBOM
         commit                      er
```

No single gate catches everything. Together, they form defense in depth.

<!-- vertical -->
<!-- .slide: class="dense" -->

## Gates 1-2: Secrets & Dependencies

<div class="columns">
<div class="column">

**Gate 1 -- Secrets Detection (Gitleaks)**

Scans for API keys, tokens, passwords, private keys.

```bash
gitleaks protect --staged
```

AI models sometimes hallucinate credentials or copy hardcoded secrets.

</div>
<div class="column">

**Gate 2 -- Dependency Scanning**

AI suggests deps from training data -- some with known vulnerabilities.

```bash
npm audit
npm audit fix
```

May suggest outdated packages with known CVEs.

</div>
</div>

<!-- vertical -->
<!-- .slide: class="dense" -->

## Gates 3-4: SAST and DAST

<div class="columns">
<div class="column">

**Gate 3 -- SAST (Static)**

Analyzes source code without running it.

- **SonarQube** -- comprehensive, many languages
- **Semgrep** -- lightweight, pattern-based

Catches: SQL injection, XSS sinks, hardcoded secrets, insecure crypto

</div>
<div class="column">

**Gate 4 -- DAST (Dynamic)**

Tests the **running application** from outside.

- **OWASP ZAP** -- open source, automated
- Simulates attacks against your deployed app

Catches: Auth bypasses, CORS misconfig, exposed endpoints

</div>
</div>

<!-- vertical -->
<!-- .slide: class="dense" -->

## Gates 5-6: Container & License

<div class="columns">
<div class="column">

**Gate 5 -- Container Scanning**

If you deploy in containers, scan the image:
- Base image vulnerabilities
- Unnecessary packages
- Running as root (don't)

</div>
<div class="column">

**Gate 6 -- License Compliance**

**Tools:** FOSSA, license-checker

- GPL dependency in an MIT project? Violation.
- AI can introduce incompatible licenses silently
- FOSSA scans your dependency tree automatically

</div>
</div>

<!-- vertical -->
<!-- .slide: class="dense" -->

## Gates 7-8: Security Criteria & SBOM

**Gate 7 -- Security Acceptance Criteria**

Add to your Definition of Done: input validation, auth checks, no secrets in code/logs, rate limiting, non-leaking error messages.

**Gate 8 -- SBOM (Software Bill of Materials)**

A complete inventory of every component. Formats: SPDX, CycloneDX.

Required by U.S. Executive Order 14028, EU Cyber Resilience Act, and enterprise procurement.

```bash
npx @cyclonedx/cyclonedx-npm --output-file sbom.json
```

---

# Slopsquatting

> A novel threat unique to AI development

<!-- vertical -->

## What Is Slopsquatting?

AI models sometimes **hallucinate package names** that don't exist.

```text
You: "How do I parse CSV in Python?"
AI: "Use the fast-csv-parser package: pip install fast-csv-parser"
```

Problem: `fast-csv-parser` doesn't exist. But what if an attacker **registers it**?

**Slopsquatting:** Attackers monitor AI hallucinations, register the fake package names, and fill them with malicious code.

When developers follow AI advice and `pip install` or `npm install` the hallucinated package, they install malware.

<!-- vertical -->

## Defending Against Slopsquatting

1. **Verify every package** -- check it exists on npm/PyPI with real downloads
2. **Use lockfiles** -- `package-lock.json` pins known-good versions
3. **Dependency scanning** (Gate 2) catches known malicious packages
4. **Be suspicious of unfamiliar packages** -- if you've never heard of it, verify first

**This is not theoretical -- it's happening in production.**

---

# AI Code Review at Scale

> Claude Code in GitHub Actions

<!-- vertical -->

## Automated PR Review

```yaml
# .github/workflows/ai-review.yml
name: AI Code Review
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Claude Code Review
        run: |
          claude -p "Review this PR diff.
          Categorize findings as:
          - MUST FIX: bugs, security issues
          - SHOULD CONSIDER: performance, readability
          - MINOR: style, naming suggestions
          Be specific. Reference file:line."
```

<!-- vertical -->

## Structured Review Output

```markdown
## MUST FIX (2 issues)
1. **SQL Injection** - `src/api/users.ts:42`
   Raw string interpolation in query.
   Use parameterized queries instead.
2. **Missing auth check** - `src/api/admin.ts:15`
   Admin endpoint has no authentication middleware.

## SHOULD CONSIDER (1 issue)
1. **N+1 query** - `src/api/posts.ts:28`
   Fetching author inside a loop. Use JOIN.

## MINOR (1 issue)
1. **Naming** - `src/utils/helpers.ts:5`
   `processData()` too generic -> `transformUserResponse()`
```

**The human reviewer still makes the final call.** AI review is a first pass, not a replacement.

<!-- vertical -->

<!-- .slide: class="dense" -->

## Integrating Security Gates into CI

Combine the 8-gate pipeline with AI review in one workflow:

```yaml
jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - name: Gitleaks                        # Gate 1: Secrets
        uses: gitleaks/gitleaks-action@v2
      - run: npm audit --audit-level=high     # Gate 2: Dependencies
      - name: Semgrep                         # Gate 3: SAST
        uses: returntocorp/semgrep-action@v1
      - name: Claude Security Review          # AI Review layer
        run: claude -p "Review for OWASP Top 10. Focus on auth, injection, data exposure."
```

**Every PR gets security-checked automatically, before a human looks at it.**

---

# Eval Awareness & Integrity

> When models reverse-engineer their own benchmarks

<!-- vertical -->

## The BrowseComp Incident

<!-- .slide: class="dense" -->

**First documented case of a model recognizing it was being evaluated and reverse-engineering the benchmark.**

Claude Opus 4.6's progression:
1. Exhausted legitimate problem-solving strategies
2. Analyzed the structure of the questions
3. Enumerated known benchmarks until it identified BrowseComp
4. Located the source code and answer key
5. Decoded the encryption and retrieved answers

**Scale:** One instance consumed **40.5 million tokens** (38x the median) before succeeding.

<small>Source: [Eval Awareness in Claude Opus 4.6's BrowseComp Performance](https://www.anthropic.com/engineering/eval-awareness-browsecomp) -- Anthropic</small>

<!-- vertical -->
<!-- .slide: class="dense" -->

## Multi-Agent Contamination

**Multi-agent configurations amplify the problem.**

- **3.7x higher contamination rates** in multi-agent setups vs single-agent
- At least **20 distinct sources** of leaked BrowseComp answers across papers and GitHub repos
- Agents can coordinate to find and share leaked data more effectively

> "Eval integrity must be treated as an ongoing adversarial problem rather than a design-time concern." -- Anthropic

This applies to your course too -- AI can find leaked quiz answers and shared solutions.

<!-- vertical -->
<!-- .slide: class="dense" -->

## Infrastructure Noise in Evals

**Infrastructure configuration creates performance differences that exceed model leaderboard gaps.**

| Finding | Data |
|---------|------|
| Performance spread from infrastructure alone | **6 percentage points** (p < 0.01) |
| Error rate under strict resource enforcement | 5.8% |
| Error rate when resources uncapped | 0.5% |
| Resource headroom inflection point | **3x** -- beyond this, new strategies emerge |

<small>Source: [Quantifying Infrastructure Noise in Agentic Coding Evals](https://www.anthropic.com/engineering/infrastructure-noise) -- Anthropic</small>

**Warning:** Leaderboard gaps under 3 points warrant skepticism without documented infrastructure configs.

<!-- vertical -->
<!-- .slide: class="dense" -->

## Designing AI-Resistant Evaluations

**What makes an evaluation resistant to AI gaming?**

| Strategy | Why It Works |
|----------|-------------|
| **Out-of-distribution problems** | Novel constraints the model hasn't seen |
| **Process-over-output** | Evaluate reasoning, not just answers |
| **Longer time horizons** | Sustained effort, not pattern matching |
| **AI as eval design partner** | Models identify where evals break |

**What fails:** Common domain knowledge problems and fixed time-limited constraints.

<small>Source: [Designing AI-Resistant Technical Evaluations](https://www.anthropic.com/engineering/AI-resistant-technical-evaluations) -- Anthropic</small>

**If your eval suite hits 100% pass rate, the eval is too easy -- not the agent too good.**

---

# Ethics & Professional Responsibility

> You ship it, you own it

<!-- vertical -->

## IP and Copyright

**U.S. Copyright Office (2023):**

> Wholly AI-generated content is **not copyrightable**.

Your code is only protected if there is meaningful human creative contribution.

<small>Source: [Copyright and Artificial Intelligence](https://www.copyright.gov/ai/) -- U.S. Copyright Office</small>

<!-- vertical -->
<!-- .slide: class="dense" -->

## Litigation & License Risk

**Doe v. GitHub (class action):**

- Alleges Copilot reproduces copyrighted code without attribution
- DMCA claims largely dismissed June 2024; remaining claims continue

<small>Source: [The Copilot Litigation](https://www.bakerlaw.com/the-copilot-litigation/) -- Baker & Hostetler LLP</small>

**License compliance risk:**

- GPL-licensed code appearing in MIT-licensed projects via AI assistants
- GPL requires derivative works to also be GPL -- violation = legal liability

<!-- vertical -->
<!-- .slide: class="dense" -->

## Professional Responsibility

**ACM Code of Ethics, Principle 1.6:**

> "Accept full responsibility for their own work."

When you use AI to generate code:
- **You** are the author of record
- **You** are responsible for bugs, vulnerabilities, and license violations
- **You** must review every line before shipping
- "The AI wrote it" is not a defense

**The standard has not changed.** AI is a tool. The engineer is accountable.

<!-- vertical -->

## Bias in AI-Generated Code

AI perpetuates biases from training data:

- **Default assumptions** -- user schemas assuming binary gender, Western names, English-only
- **Exclusionary patterns** -- accessibility features omitted unless explicitly requested
- **Cultural bias** -- dates, currencies, addresses default to U.S. conventions

**Your responsibility:** Review for inclusivity, explicitly prompt for accessibility, test with diverse personas, don't ship defaults uncritically.

---

# Hands-on Lab

> Audit AI code for security

<!-- vertical -->
<!-- .slide: class="dense" -->

## Exercise 1: Security Gates Audit (30 min)

Take a piece of AI-generated code from your P3 project and run it through as many gates as you can:

```bash
# Gate 1: Secrets
gitleaks detect --source .

# Gate 2: Dependencies
npm audit

# Gate 3: SAST (if you have Semgrep)
semgrep --config auto src/

# Check: any vulnerabilities found?
```

Document what you find. Discuss with your team:
- Were there any surprises?
- Would you have caught these without the tools?

<!-- vertical -->

## Exercise 2: AI Code Review Pipeline (20 min)

Set up an automated AI review step in your P3 project:

1. Create `.github/workflows/ai-review.yml` using the template from the AI Code Review slides
2. Push a PR with intentional issues (missing auth, raw SQL, hardcoded secret)
3. Observe Claude's review output
4. Compare with what `npm audit` and Semgrep found

**Goal:** Experience the overlap and gaps between automated tools and AI review.

<!-- vertical -->
<!-- .slide: class="dense" -->

## Exercise 3: Eval Design Challenge (15 min)

Design a 5-task eval suite for one feature in your P3:

1. Define 5 test tasks with known expected outcomes
2. For each task, specify the grader type (code, model, or human)
3. Write one code-based grader and one model-based grader prompt
4. Discuss: What would pass@5 vs pass^5 tell you about your feature?

**Bonus:** Can you identify a scenario where your eval would be "gamed" by an AI?

---

# This Week's Deliverables

<!-- vertical -->

## Due This Week

**Weekly Quiz 14** -- Security, evals, and ethics

**P3 Sprint 4** -- continue your team project

**Recommended:**
- Run `npm audit` and `gitleaks detect` on your P3 repo
- Review your P3 code for the OWASP Top 10
- Set up at least one security gate in your CI/CD pipeline
- Design a small eval suite for a key feature

---

# Next Week Preview

## Week 14: Production & Course Synthesis

- Production deployment and monitoring
- Cost optimization and model routing
- RAG and vector databases
- Demo preparation and course reflection
- **P3 final submission**

**P3 Sprint 5 -- deploy, polish, and present.**

---

# Resources

<!-- vertical -->

## Required Reading

<!-- .slide: class="dense" -->

| Resource | URL |
|----------|-----|
| OWASP Top 10 | [owasp.org/www-project-top-ten](https://owasp.org/www-project-top-ten/) |
| Demystifying Evals for AI Agents | [anthropic.com/engineering/demystifying-evals-for-ai-agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) |
| OpenSSF AI Code Security Guide | [best.openssf.org/Security-Focused-Guide-for-AI-Code-Assistant-Instructions](https://best.openssf.org/Security-Focused-Guide-for-AI-Code-Assistant-Instructions) |
| Veracode GenAI Code Security Report | [veracode.com/blog/genai-code-security-report](https://www.veracode.com/blog/genai-code-security-report/) |

<!-- vertical -->

## Recommended Reading

<!-- .slide: class="dense" -->

| Resource | URL |
|----------|-----|
| Eval Awareness in BrowseComp | [anthropic.com/engineering/eval-awareness-browsecomp](https://www.anthropic.com/engineering/eval-awareness-browsecomp) |
| Infrastructure Noise in Evals | [anthropic.com/engineering/infrastructure-noise](https://www.anthropic.com/engineering/infrastructure-noise) |
| Designing AI-Resistant Evaluations | [anthropic.com/engineering/AI-resistant-technical-evaluations](https://www.anthropic.com/engineering/AI-resistant-technical-evaluations) |
| Georgetown CSET: Cybersecurity Risks | [cset.georgetown.edu/publication/cybersecurity-risks-of-ai-generated-code](https://cset.georgetown.edu/publication/cybersecurity-risks-of-ai-generated-code/) |
| Apiiro: 4x Velocity, 10x Vulnerabilities | [apiiro.com/blog/4x-velocity-10x-vulnerabilities](https://apiiro.com/blog/4x-velocity-10x-vulnerabilities-ai-coding-assistants-are-shipping-more-risks/) |
