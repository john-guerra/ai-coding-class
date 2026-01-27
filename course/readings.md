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
| Managing Context Windows | Understanding Claude's working memory | https://platform.claude.com/docs/en/build-with-claude/context-windows |
| Real World Prompting Course | Practical prompting patterns | https://github.com/anthropics/courses/tree/master/real_world_prompting |
| Prompt Evaluations Course | Testing and evaluating prompts | https://github.com/anthropics/courses |

---

## Week 4: User Research & Prototyping

### 📚 Required

**Claude Web & Artifacts**
| Resource | Description | URL |
|----------|-------------|-----|
| Claude Artifacts Guide | Creating & iterating AI apps without code | https://support.claude.com/en/articles/11649427-use-artifacts-to-visualize-and-create-ai-apps-without-ever-writing-a-line-of-code |

> **Why Artifacts?** Artifacts let you create interactive apps, visualizations, and documents directly in Claude Web—essential for rapid prototyping before moving to code editors.

**Books**
| Book | Author | Focus |
|------|--------|-------|
| The Mom Test | Rob Fitzpatrick | Customer validation, requirements gathering |
| Designing for Growth | Liedtka & Ogilvie | Design thinking toolkit |

---

## Week 5-6: Antigravity IDE & TDD

### 📚 Required

**Antigravity Documentation**
| Topic | URL |
|-------|-----|
| Antigravity Docs (Official) | https://docs.antigravity.dev/ |
| Getting Started | https://docs.antigravity.dev/get-started/migrate-from-vscode |

**Test-Driven Development**
| Resource | URL |
|----------|-----|
| Jest Documentation | https://jestjs.io/docs/getting-started |
| Vitest Documentation | https://vitest.dev/guide/ |
| Testing Library | https://testing-library.com/docs/ |

---

## Week 7: Claude Code & Terminal AI

### 📚 Required

| Resource | URL |
|----------|-----|
| Claude Code Documentation | https://docs.anthropic.com/en/docs/claude-code |
| Anthropic Tool Use Course | https://github.com/anthropics/courses |

---

## Week 8-9: Advanced Prompting & Context Engineering

### 📚 Required

**Chain-of-Thought & Advanced Techniques**
| Resource | URL |
|----------|-----|
| Anthropic: Extended Thinking | https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking |
| Prompt Chaining Guide | https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-prompts |

#### 📄 Reference

**Anthropic Research (Understanding Claude)**
| Paper | URL |
|-------|-----|
| Mapping the Mind of a Large Language Model | https://www.anthropic.com/research/mapping-mind-language-model |
| Tracing the Thoughts of a Large Language Model | https://www.anthropic.com/research/tracing-thoughts-language-model |
| Constitutional AI | https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback |

---

## Week 10-11: Evaluations (Evals)

### 📚 Required

| Resource | Description | URL |
|----------|-------------|-----|
| Define Success Criteria | Building measurable success metrics | https://platform.claude.com/docs/en/test-and-evaluate/define-success |
| Anthropic Prompt Evaluations Course | Systematic prompt testing | https://github.com/anthropics/courses |
| HumanEval Benchmark | Code generation evaluation | https://github.com/openai/human-eval |

> **Why Success Criteria First?** Before building evals, you need clear, measurable definitions of what "good" looks like. This documentation covers quantitative metrics, qualitative scales, and multi-dimensional evaluation.

#### 📄 Reference

**Guardrails & Quality**
| Resource | Description | URL |
|----------|-------------|-----|
| Reduce Hallucinations | Verification strategies and guardrails | https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations |

**Benchmark Research**
| Paper | URL |
|-------|-----|
| HumanEval Pro (ACL 2025) | https://aclanthology.org/2025.findings-acl.686/ |
| Cybersecurity Risks of AI-Generated Code (Georgetown CSET) | https://cset.georgetown.edu/publication/cybersecurity-risks-of-ai-generated-code/ |

---

## Week 12-13: Agile & Parallel Agents

### 📚 Required Books

| Book | Author | Focus |
|------|--------|-------|
| Scrum | Jeff Sutherland | Agile methodology |

### 📖 Recommended

| Resource | URL |
|----------|-----|
| LangChain RAG Tutorial | https://python.langchain.com/docs/tutorials/rag/ |
| LangGraph Code Assistant | https://langchain-ai.github.io/langgraph/tutorials/code_assistant/langgraph_code_assistant/ |

---

## Week 14: Production & CI/CD

### 📚 Required

**CI/CD & DevOps**
| Resource | URL |
|----------|-----|
| GitHub Actions Documentation | https://docs.github.com/en/actions |
| Vercel Deployment Docs | https://vercel.com/docs |

**Security**
| Resource | URL |
|----------|-----|
| OpenSSF AI Code Security Guide | https://best.openssf.org/Security-Focused-Guide-for-AI-Code-Assistant-Instructions |
| OWASP Top 10 | https://owasp.org/www-project-top-ten/ |

#### 📄 Reference

**AI Code Quality Research**
| Resource | URL |
|----------|-----|
| When to Trust AI-Generated Code (Graphite) | https://graphite.com/guides/when-to-trust-ai-code |
| GitHub Copilot Research | https://github.blog/news-insights/research/does-github-copilot-improve-code-quality-heres-what-the-data-says/ |
| Veracode AI Security Analysis | https://www.veracode.com/blog/ai-generated-code-security-risks/ |

---

## General Resources (All Semester)

### Official Documentation

| Tool | URL |
|------|-----|
| Anthropic Claude Docs | https://docs.anthropic.com |
| Antigravity Docs | https://docs.antigravity.dev |
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
| 4 | User Research & Prototyping | Artifacts guide, Mom Test, Designing for Growth |
| 5-6 | Antigravity & TDD | Antigravity docs, testing frameworks |
| 7 | Claude Code | Tool use documentation |
| 8-9 | Context Engineering | Advanced prompting, Anthropic research |
| 10-11 | Evaluations | Success criteria, eval courses, hallucination reduction |
| 12-13 | Agile + Agents | Required books, LangChain tutorials |
| 14 | Production | CI/CD docs, security guides |

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
