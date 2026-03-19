# CS 7180: Vibe Coding - Required Readings & Resources
## AI-Assisted Software Engineering - Spring 2026

**Course:** CS 7180 - Special Topics in AI  
**Instructor:** John Alexis Guerra Gomez  
**Last Updated:** January 12, 2026

---

## How to Use This Document

This document contains all required and recommended readings for the course, organized by week. Resources are categorized as:

- 📚 **Required** — Must complete before class
- 📖 **Recommended** — Strongly suggested for deeper understanding
- 🔧 **Tools** — Interactive tools to use during/after class
- 📄 **Reference** — Keep handy for future reference

All URLs have been verified as of January 2026.

---

## Week 2: LLM Fundamentals for AI Coding

### Understanding How LLMs Work

#### 📚 Required Viewing (Before Class)

**Neural Network Foundations (3Blue1Brown)**
| Video | Duration | URL |
|-------|----------|-----|
| But what is a Neural Network? | 19 min | https://www.3blue1brown.com/lessons/neural-networks |
| Gradient descent, how neural networks learn | 21 min | https://www.3blue1brown.com/lessons/gradient-descent |

**Transformer Architecture (3Blue1Brown)**
| Video | Duration | URL |
|-------|----------|-----|
| Attention in transformers, step-by-step | 27 min | https://www.3blue1brown.com/lessons/attention |

> **Why these videos?** Grant Sanderson (3Blue1Brown) provides the clearest visual explanations of neural networks and transformers available. These build the mental model you need before using AI coding tools.

#### 📖 Recommended Viewing

**Deeper Dives (Andrej Karpathy)**
| Video | Duration | URL |
|-------|----------|-----|
| Let's build GPT: from scratch, in code | 1h 56m | https://karpathy.ai/zero-to-hero.html |
| Let's build the GPT Tokenizer | 2h 13m | https://karpathy.ai/zero-to-hero.html |

> **Note:** Karpathy's videos are longer but show actual implementation. Great for students who learn through code.

**Visual Guides (Jay Alammar)**
| Article | URL |
|---------|-----|
| The Illustrated Transformer | https://jalammar.github.io/illustrated-transformer/ |
| The Illustrated GPT-2 | https://jalammar.github.io/illustrated-gpt2/ |
| The Illustrated Word2vec | https://jalammar.github.io/illustrated-word2vec/ |

> **Note:** Jay Alammar's illustrated guides are referenced in courses at Stanford, Harvard, MIT, and CMU. Excellent for visual learners and review.

#### 🔧 Interactive Tools (Use During/After Class)

| Tool | Purpose | URL |
|------|---------|-----|
| Tiktokenizer | Visualize how text tokenizes across models | https://tiktokenizer.vercel.app/ |
| TensorFlow Embedding Projector | Explore embeddings in 3D space | https://projector.tensorflow.org/ |
| OpenAI Tokenizer | Official OpenAI token counter | https://platform.openai.com/tokenizer |

#### 📄 Reference Reading

**Understanding Hallucinations**
| Paper/Article | URL |
|---------------|-----|
| Why Language Models Hallucinate (arXiv) | https://arxiv.org/abs/2509.04664 |
| LLM Hallucinations in Practical Code Generation (ACM) | https://arxiv.org/pdf/2409.20550 |
| Package Hallucinations (USENIX Security) | https://www.usenix.org/publications/loginonline/we-have-package-you-comprehensive-analysis-package-hallucinations-code |

**Context Windows & Memory**
| Resource | URL |
|----------|-----|
| IBM - Context Window Explained | https://www.ibm.com/think/topics/context-window |
| DataCamp - Context Window Guide | https://www.datacamp.com/blog/context-window |

---

## Week 3: Prompt Engineering Basics

### 📚 Required

**Anthropic Documentation**
| Topic | Description | URL |
|-------|-------------|-----|
| Prompt Engineering Overview | Comprehensive guide to prompting techniques | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview |
| Claude 4 Prompting Best Practices | Specific guidance for Claude 4.x models | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-4-best-practices |
| Prompt Library | Example prompts for common tasks | https://docs.anthropic.com/en/resources/prompt-library/library |
| System Prompts | Understanding Claude's system prompts | https://docs.anthropic.com/en/release-notes/system-prompts |

**Anthropic Courses (GitHub)**
| Course | Description | URL |
|--------|-------------|-----|
| Prompt Engineering Interactive Tutorial | 9-chapter comprehensive guide | https://github.com/anthropics/courses/tree/master/prompt_engineering_interactive_tutorial |
| API Fundamentals | Working with Claude SDK | https://github.com/anthropics/courses |

#### 📖 Recommended

| Resource | Description | URL |
|----------|-------------|-----|
| Real World Prompting Course | Practical prompting patterns | https://github.com/anthropics/courses/tree/master/real_world_prompting |
| Prompt Evaluations Course | Testing and evaluating prompts | https://github.com/anthropics/courses |

---

## Weeks 4-5: Claude Web & Artifacts

### 📚 Required

**Claude Web & Artifacts**
| Resource | Description | URL |
|----------|-------------|-----|
| Claude Artifacts Guide | Creating & iterating AI apps without code | https://support.claude.com/en/articles/11649427-use-artifacts-to-visualize-and-create-ai-apps-without-ever-writing-a-line-of-code |
| Prototype AI-Powered Apps | Building AI-powered artifacts with `window.claude.complete()` | https://support.claude.com/en/articles/11649438-prototype-ai-powered-apps-with-claude-artifacts |
| Claude-Powered Artifacts Announcement | Official announcement of AI features in artifacts | https://www.anthropic.com/news/claude-powered-artifacts |

> **Why Artifacts?** Artifacts let you create interactive apps, visualizations, and documents directly in Claude Web—essential for rapid prototyping before moving to code editors.

**Context & Memory**
| Resource | Description | URL |
|----------|-------------|-----|
| Context Windows | How Claude's working memory works and how to manage it | https://platform.claude.com/docs/en/build-with-claude/context-windows |
| What Are Projects? | Persistent knowledge bases for Claude Web conversations | https://support.claude.com/en/articles/9517075-what-are-projects |

**Books**
| Book | Author | Focus |
|------|--------|-------|
| The Mom Test | Rob Fitzpatrick | Customer validation, requirements gathering |

#### 📖 Recommended

| Resource | Description | URL |
|----------|-------------|-----|
| How to Create and Manage Projects | Step-by-step guide to Claude Projects | https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects |
| RAG for Projects | How retrieval-augmented generation works in Claude Projects | https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects |
| Personalization Features | Profile, instructions, and styles in Claude Web | https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features |
| How to Use Claude Artifacts (Zapier) | Step-by-step guide to building web apps with artifacts | https://zapier.com/blog/how-to-use-claude-artifacts-to-create-web-apps/ |
| Claude Artifacts 101 (DataCamp) | Types, use cases, sharing, and more | https://www.datacamp.com/blog/claude-artifacts-introduction |
| Everything I built with Claude Artifacts (Simon Willison) | Real-world examples of artifact projects | https://simonwillison.net/2024/Oct/21/claude-artifacts/ |
| Fixing Claude Artifact Issues | Troubleshooting common artifact problems | https://christinasouch.com/blog/fixing-claude-artifact-creation-issues |

| Book | Author | Focus |
|------|--------|-------|
| Designing for Growth | Liedtka & Ogilvie | Design thinking toolkit |

---

## Week 6: IDE-Centric AI Coding

### 📚 Required

**IDE AI Tools**
| Resource | Description | URL |
|----------|-------------|-----|
| Antigravity Docs (Getting Started) | Official setup and usage guide | https://antigravity.google/docs/get-started |
| GitHub Copilot Guide | GitHub's AI coding assistant documentation | https://docs.github.com/copilot |
| Cursor Documentation | Cursor IDE docs and features | https://docs.cursor.com |

### 📖 Recommended

| Resource | Description | URL |
|----------|-------------|-----|
| How GitHub Copilot Understands Your Code (GitHub Blog) | How Copilot uses context and retrieval to improve suggestions | https://github.blog/ai-and-ml/github-copilot/how-github-copilot-is-getting-better-at-understanding-your-code/ |
| cursor.directory | Community-maintained rules files for various tech stacks | https://cursor.directory/ |
| OpenSSF Guide for AI Code Assistants | Security-focused best practices for AI coding tools | https://best.openssf.org/Security-Focused-Guide-for-AI-Code-Assistant-Instructions |

---

## Week 7: Agile/Scrum + Pair Workflow

### 📚 Required

**Agile/Scrum**
| Resource | Description | URL |
|----------|-------------|-----|
| The Scrum Guide (official) | Definitive guide to Scrum framework | https://scrumguides.org/ |
| GitHub Projects Documentation | Setting up and using project boards | https://docs.github.com/en/issues/planning-and-tracking-with-projects |
| GitHub Issues Documentation | Creating and managing issues | https://docs.github.com/en/issues |

**Required Book**
| Book | Author | Focus |
|------|--------|-------|
| Scrum | Jeff Sutherland | Agile methodology (start reading this week) |

### 📖 Recommended

| Resource | Description | URL |
|----------|-------------|-----|
| Atlassian Agile Coach | Comprehensive Agile/Scrum guide | https://www.atlassian.com/agile |
| GitHub Flow Guide | Branch-based workflow | https://docs.github.com/en/get-started/using-github/github-flow |

---

## Week 8: Advanced IDE AI Features

### 📚 Required

| Resource | Description | URL |
|----------|-------------|-----|
| MCP Specification | Model Context Protocol docs | https://modelcontextprotocol.io/ |
| Antigravity Advanced Docs | Agent memory, MCP, browser mode | https://antigravity.google/docs/get-started |

### 📖 Recommended

| Resource | Description | URL |
|----------|-------------|-----|
| MCP GitHub Repository | Reference implementation and examples | https://github.com/modelcontextprotocol |
| Chrome DevTools Debugging Guide | Browser debugging techniques | https://developer.chrome.com/docs/devtools/ |
| Node.js Debugging Guide | Server-side debugging | https://nodejs.org/en/learn/getting-started/debugging |

---

## Week 10: Claude Code Foundations

### 📚 Required (Before Class)

**Anthropic "Claude Code in Action" Course — Introduction, Setup & Context**
| Lecture | Topic | URL |
|---------|-------|-----|
| Introduction | What is a coding assistant? Claude Code in action | https://anthropic.skilljar.com/claude-code-in-action |
| Setup | Claude Code setup, project setup | https://anthropic.skilljar.com/claude-code-in-action |
| Adding Context & Controlling Context | Managing context effectively | https://anthropic.skilljar.com/claude-code-in-action |

**Claude Code Documentation**
| Resource | Description | URL |
|----------|-------------|-----|
| Claude Code Overview | What Claude Code is and how to get started | https://code.claude.com/docs/en/overview |
| CLAUDE.md — Project Instructions | How to write effective CLAUDE.md files | https://code.claude.com/docs/en/memory#claude-md-files |
| Context Management | Managing context window, /clear, /compact, checkpoints | https://code.claude.com/docs/en/context-management |
| Permissions & Security | Permission model, allowlists, sandboxing | https://code.claude.com/docs/en/permissions |
| Settings & Configuration | CLI flags, config files, settings hierarchy | https://code.claude.com/docs/en/settings |

### 📖 Recommended

| Resource | Description | URL |
|----------|-------------|-----|
| Claude Code Best Practices | Anthropic's recommended workflows | https://code.claude.com/docs/en/best-practices |
| Writing a Good CLAUDE.md | HumanLayer research on rule-application rates | https://humanlayer.dev/blog/writing-a-good-claude-md |
| Effective Context Engineering for AI Agents | Anthropic's context engineering guide | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents |
| My AI Coding Workflow (Addy Osmani) | Spec → plan → implement → test workflow | https://addyosmani.com/blog/ai-coding-workflow |
| Trail of Bits: claude-code-config | Security-focused CLAUDE.md templates | https://github.com/trailofbits/claude-code-config |
| Extended Thinking | How thinking modes work in Claude | https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking |

---

## Week 11: Claude Code Workflows & Development Practices

### 📚 Required

**Anthropic "Claude Code in Action" Course — Custom Commands & GitHub**
| Lecture | Topic | URL |
|---------|-------|-----|
| Custom Commands | Creating reusable command workflows | https://anthropic.skilljar.com/claude-code-in-action |
| GitHub Integration | Automated PR reviews and issue handling | https://anthropic.skilljar.com/claude-code-in-action |

**TDD & CI/CD**
| Resource | Description | URL |
|----------|-------------|-----|
| Jest Documentation | Unit testing framework | https://jestjs.io/docs/getting-started |
| Vitest Documentation | Fast Vite-native testing | https://vitest.dev/guide/ |
| GitHub Actions Documentation | CI/CD pipeline setup | https://docs.github.com/en/actions |
| Claude Code in GitHub Actions | Running Claude Code in CI for PR review | https://code.claude.com/docs/en/github-actions |

### 📖 Recommended

| Resource | Description | URL |
|----------|-------------|-----|
| Claude Code CLI Reference | Non-interactive mode, `claude -p`, output formats | https://code.claude.com/docs/en/cli-reference |
| Testing Library | React component testing | https://testing-library.com/docs/ |

---

## Week 12: Claude Code Extensibility

### 📚 Required

**Anthropic "Claude Code in Action" Course — MCP, Hooks & SDK**
| Lecture | Topic | URL |
|---------|-------|-----|
| MCP Servers | Connecting external tools and services | https://anthropic.skilljar.com/claude-code-in-action |
| Hooks and the SDK | Writing hooks, Claude Code SDK | https://anthropic.skilljar.com/claude-code-in-action |

**Claude Code Extensibility Docs**
| Resource | Description | URL |
|----------|-------------|-----|
| Skills | Creating custom slash commands | https://code.claude.com/docs/en/skills |
| Hooks | Deterministic automation at lifecycle points | https://code.claude.com/docs/en/hooks |
| MCP Servers | Connecting external tools and data | https://code.claude.com/docs/en/mcp |
| Sub-agents | Custom agent definitions (.claude/agents/) | https://code.claude.com/docs/en/sub-agents |

**MCP Protocol**
| Resource | Description | URL |
|----------|-------------|-----|
| MCP Specification | Model Context Protocol official docs | https://modelcontextprotocol.io/ |
| MCP GitHub Repository | Reference implementations and examples | https://github.com/modelcontextprotocol |

### 📖 Recommended

| Resource | Description | URL |
|----------|-------------|-----|
| Playwright MCP Server | Browser testing via MCP | https://github.com/anthropics/mcp-servers/tree/main/playwright |
| Claude Code Plugins | Plugin marketplace and community extensions | https://code.claude.com/docs/en/plugins |

---

## Week 13: Agent Architectures & Agent SDK

### 📚 Required

**Anthropic Research & Documentation**
| Resource | Description | URL |
|----------|-------------|-----|
| Building Effective Agents | Anthropic's guide to the 6 agent patterns | https://www.anthropic.com/engineering/building-effective-agents |
| Claude Agent SDK Overview | Official SDK documentation | https://platform.claude.com/docs/en/agent-sdk/overview |
| Claude Agent SDK — Quick Start | Getting started with the Agent SDK | https://platform.claude.com/docs/en/agent-sdk/quickstart |
| Tool Use (Function Calling) | How agents use tools | https://platform.claude.com/docs/en/build-with-claude/tool-use/overview |

### 📖 Recommended

| Resource | Description | URL |
|----------|-------------|-----|
| Anthropic Courses — Tool Use | Interactive tutorial on tool use | https://github.com/anthropics/courses |
| Claude Agent SDK Demos | Example agents (code reviewer, bug fixer, etc.) | https://github.com/anthropics/claude-agent-sdk-demos |
| Prompt Chaining Guide | Sequential processing patterns | https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-prompts |

#### 📄 Reference

**Anthropic Research (Understanding Claude)**
| Paper | URL |
|-------|-----|
| Mapping the Mind of a Large Language Model | https://www.anthropic.com/research/mapping-mind-language-model |
| Tracing the Thoughts of a Large Language Model | https://www.anthropic.com/research/tracing-thoughts-language-model |
| Constitutional AI | https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback |

---

## Week 14: Emerging AI Engineering & Production

### 📚 Required

| Resource | Description | URL |
|----------|-------------|-----|
| Prompt Caching | How prompt caching works and when to use it | https://platform.claude.com/docs/en/build-with-claude/prompt-caching |
| Define Success Criteria | Building measurable success metrics for evals | https://platform.claude.com/docs/en/test-and-evaluate/define-success |
| OWASP Top 10 | Security best practices for web applications | https://owasp.org/www-project-top-ten/ |

**CI/CD & DevOps**
| Resource | Description | URL |
|----------|-------------|-----|
| GitHub Actions Documentation | CI/CD pipeline reference | https://docs.github.com/en/actions |
| Vercel Deployment Docs | Production deployment | https://vercel.com/docs |

### 📖 Recommended

| Resource | Description | URL |
|----------|-------------|-----|
| OpenSSF AI Code Security Guide | Security-focused best practices | https://best.openssf.org/Security-Focused-Guide-for-AI-Code-Assistant-Instructions |
| Reduce Hallucinations | Verification strategies and guardrails | https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations |
| When to Trust AI-Generated Code (Graphite) | Guidelines for code trust | https://graphite.com/guides/when-to-trust-ai-code |

#### 📄 Reference

**AI Code Quality Research**
| Resource | URL |
|----------|-----|
| GitHub Copilot Research | https://github.blog/news-insights/research/does-github-copilot-improve-code-quality-heres-what-the-data-says/ |
| Veracode AI Security Analysis | https://www.veracode.com/blog/ai-generated-code-security-risks/ |
| Cybersecurity Risks of AI-Generated Code (Georgetown CSET) | https://cset.georgetown.edu/publication/cybersecurity-risks-of-ai-generated-code/ |
| HumanEval Pro (ACL 2025) | https://aclanthology.org/2025.findings-acl.686/ |

---

## General Resources (All Semester)

### Official Documentation

| Tool | URL |
|------|-----|
| Anthropic Claude Docs | https://docs.anthropic.com |
| Antigravity Docs | https://antigravity.google/docs/get-started |
| GitHub Copilot Guide | https://docs.github.com/copilot |
| Next.js Documentation | https://nextjs.org/docs |
| React Documentation | https://react.dev |
| Node.js Documentation | https://nodejs.org/docs |

### Anthropic Courses Repository

| Course | Description |
|--------|-------------|
| Main Repository | https://github.com/anthropics/courses |
| Prompt Engineering Tutorial | https://github.com/anthropics/prompt-eng-interactive-tutorial |

### Learning Platforms

| Platform | URL |
|----------|-----|
| Karpathy Neural Networks: Zero to Hero | https://karpathy.ai/zero-to-hero.html |
| 3Blue1Brown Neural Networks Series | https://www.3blue1brown.com/topics/neural-networks |
| Jay Alammar's Blog | https://jalammar.github.io/ |
| Google Machine Learning Crash Course | https://developers.google.com/machine-learning/crash-course |

### Research & Papers

| Topic | URL |
|-------|-----|
| Attention Is All You Need (Original Transformer Paper) | https://arxiv.org/abs/1706.03762 |
| Anthropic Research Page | https://www.anthropic.com/research |
| Harvard NLP Annotated Transformer | http://nlp.seas.harvard.edu/2018/04/03/attention.html |

---

## Reading Schedule Summary

| Week | Primary Focus | Key Readings |
|------|---------------|--------------|
| 2 | LLM Fundamentals | 3Blue1Brown videos, Jay Alammar guides |
| 3 | Prompt Engineering | Claude 4 best practices, prompt engineering docs |
| 4-5 | Claude Web & Artifacts | Artifacts guide, context windows, Projects, Mom Test |
| 6 | IDE-Centric AI Coding | Antigravity, Copilot, Cursor docs, OpenSSF guide |
| 7 | Agile/Scrum + Pair Workflow | Scrum Guide, GitHub Projects/Issues, Scrum book, pair workflow |
| 8 | Advanced IDE AI Features | MCP Specification, debugging guides, Antigravity advanced docs |
| 10 | Claude Code Foundations | Claude Code docs, Skilljar (Intro, Setup, Context), CLAUDE.md, context management |
| 11 | Claude Code Workflows & Dev Practices | Skilljar (Custom Commands, GitHub), TDD frameworks, GitHub Actions, CI/CD |
| 12 | Claude Code Extensibility | Skilljar (MCP, Hooks, SDK), Skills, Hooks, MCP, Sub-agents |
| 13 | Agent Architectures & Agent SDK | Building Effective Agents, Agent SDK docs, tool use |
| 14 | Emerging AI Engineering | Prompt caching, OWASP, production deployment, security |

---

## Notes on Resource Quality

### Tier 1: Primary Sources (Most Reliable)
- Official documentation (Anthropic, Antigravity, GitHub)
- Peer-reviewed papers (arXiv, ACL, USENIX)
- Educational content from recognized experts (Karpathy, 3Blue1Brown)

### Tier 2: High-Quality Secondary Sources
- Jay Alammar's illustrated guides (widely cited in academia)
- Industry reports (Georgetown CSET, OpenSSF)
- Official company blogs (Google Research, Anthropic)

### Tier 3: Supplementary Resources
- Tutorial sites (DataCamp, tutorials)
- Community resources (GitHub repos, Medium articles)
- Tool-specific documentation

**Always verify information from Tier 3 sources against Tier 1 sources.**

---

*This document is maintained as part of the CS 7180 course materials. Report broken links to jguerra@northeastern.edu*
