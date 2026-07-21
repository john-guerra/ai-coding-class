# State of the Art in AI-Assisted Software Engineering — 2026

**Research brief for the CS 7180 "Vibe Coding" redesign (Fall 2026) and a new 8-hour workshop**
**Date:** 2026-07-20
**Author:** Research synthesis for J. Guerra (Northeastern)

---

## How to read this document

Every substantive external claim carries a clickable source URL inline. Sources are graded so the course team does not inherit the "unsourced claim" debt of the existing research docs:

- **[primary]** — vendor docs/blogs, standards bodies, peer-reviewed or preprint papers, retrieved directly.
- **[secondary]** — reputable engineering blogs / news summarizing a primary event; the URL is real but numbers should be re-checked before quoting.
- **[unverified]** — appeared only in commercial SEO/marketing content or in future-dated identifiers that could not be independently confirmed. **Do not quote as fact.**
- **[inference]** — my own synthesis/opinion, not a sourced claim.

A critical mid-2026 caveat surfaced repeatedly during research: **many "2026 AI coding leaderboard/comparison" pages are SEO content farms publishing internally inconsistent and apparently fabricated model names and scores** (e.g., "Claude Mythos 5," "GPT-5.6 Sol"). For any live benchmark number in slides, pull from the authoritative leaderboards at teaching time — [tbench.ai](https://www.tbench.ai/leaderboard/terminal-bench/2.0), [Scale SWE-bench Pro](https://labs.scale.com/leaderboard/swe_bench_pro_public), [Epoch AI](https://epoch.ai/benchmarks/swe-bench-verified) — never from comparison blogs.

---

## Executive summary

1. **"Modalities" is now the wrong word; the field says "harnesses."** A harness is the runtime scaffolding around a model — loop, tools, context management, guardrails ("Agent = Model + Harness"). Anthropic popularized the term in its March/April 2026 engineering posts, OpenAI ships "the Codex harness," and there is now an academic definition (arXiv:2606.10106, June 2026) and an emerging "harness engineering" discipline. The course's three "modalities" (Claude Web / Antigravity / Claude Code) should be reframed as **harnesses**, and — more importantly — reorganized around the axis the field actually uses: **interaction surface × autonomy/loop position**, not vendor identity. [primary] https://www.anthropic.com/engineering/harness-design-long-running-apps · https://arxiv.org/html/2606.10106v1

2. **The unit of work shifted from "chat turn" to "delegated task → PR."** Async cloud agents went mainstream across every vendor in 2026: Claude Code on the web, GitHub Copilot coding agent (runs in GitHub Actions), Cursor Cloud Agents, OpenAI Codex app/cloud, Google Jules. This is the single biggest product change since the existing research doc was written. [primary] https://claude.com/blog/claude-code-on-the-web · https://docs.github.com/copilot/concepts/agents/coding-agent/about-coding-agent

3. **MCP matured into cross-vendor infrastructure.** It is now supported first-party by Anthropic, OpenAI, Google, Microsoft, and GitHub, moved to neutral (Linux-Foundation-adjacent) governance, and has a major stateless-core spec release candidate finalizing 2026-07-28. [primary] https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/

4. **The standards landscape formally split "LLM app" risk from "agent" risk.** OWASP published a dedicated **Top 10 for Agentic Applications (ASI01–ASI10)** in Dec 2025 alongside the LLM Top 10 (2025). Prompt injection moved from theoretical to documented in-the-wild (Palo Alto Unit 42, Mar 2026), and slopsquatting graduated from hypothesis to quantified supply-chain risk. [primary] https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/

5. **AI-generated code security is empirically NOT improving even as capability soars** — Veracode's Spring 2026 update still finds only ~55% of generated code passes security checks despite >95% syntactic correctness. This "functional-but-insecure" gap is the central pedagogical tension of the course and validates its "engineering quality" thesis. [primary] https://www.veracode.com/blog/spring-2026-genai-code-security/

6. **The engineer's role is now "verify and orchestrate," not "type."** Anthropic's study of ~400k Claude Code sessions found humans make ~70% of planning ("what") decisions while the agent makes ~80% of execution ("how") decisions. The scarce, teachable skill is *verification under throughput pressure*. [primary] https://www.anthropic.com/research/claude-code-expertise

7. **Over-reliance and deskilling are now evidence-backed risks to teach against.** The METR RCT found experienced developers were 19% *slower* with early-2025 AI tools while believing they were 20% faster; MIT's "cognitive debt" EEG study and the Microsoft/CMU CHI 2025 survey both link heavy AI use to reduced critical engagement. These belong in the curriculum as first-class content, not caveats. [primary] https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/

8. **Assessment is converging on process + oral defense.** Utah State's CS1-CR weighted 15-minute oral code-review interviews at 70% of the assignment grade; a four-pillar "AI-resilient assessment" framework (process docs + oral viva + authentic tasks + graduated AI-use policy) is emerging in the education literature. This directly supports the course's "never commit code you can't explain" rule. [primary] https://arxiv.org/html/2605.21374 · https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2026.1841682/full

---

## 1. State of the art in AI coding tools & harnesses (mid-2026)

### 1.1 What a "harness" is (and why the term matters)

The field's working definition is **Agent = Model + Harness** — the harness is "everything in an AI agent except the model itself": the loop, tools, context management, and guardrails. [primary] Böckeler/Thoughtworks on Martin Fowler's site: https://martinfowler.com/articles/harness-engineering.html · Anthropic's phrasing ("the software scaffolding around a model: the loop, tools, context management, and guardrails that turn raw intelligence into a working agent"): https://claude.com/blog/harnessing-claudes-intelligence

The most rigorous definition is academic: "An agent harness is the runtime engineering layer that wraps one or more language models and turns them into an agent able to accomplish tasks over an external environment," via four couplings — an agent loop, a tool interface, context management, and at least one control mechanism independent of model obedience (the paper's **T1–T4 test**). [primary] de Macedo, "What makes a harness a harness," arXiv:2606.10106v1 (June 2026): https://arxiv.org/html/2606.10106v1

**Etymology worth teaching:** the term descends from the horse's *tack/harness* ("channel a brute force safely to produce work") through the **software test harness** (scripts/mocks/stubs that run code observably) and the **ML eval harness**, to the runtime **agent harness**. The key shift: eval harnesses observe from the outside *after* the work; the agent harness acts *during* execution. [primary] https://arxiv.org/html/2606.10106v1 · test-harness lineage: https://en.wikipedia.org/wiki/Test_harness

**A genuine, teachable terminology conflict exists.** Böckeler/Osmani use *harness = everything except the model* (so "scaffold" is inside the harness). Hugging Face's glossary instead treats **harness** (the run-loop) and **scaffold** (system prompt, tool descriptions, context management) as *siblings* around the model. Teach both and anchor on the arXiv T1–T4 definition. [primary] https://huggingface.co/blog/agent-glossary · https://martinfowler.com/articles/harness-engineering.html

Vendors confirm the concept is load-bearing: Anthropic describes the **Claude Agent SDK** as "the same harness that powers Claude Code, exposed as a library," and OpenAI states "all Codex experiences are powered by the same Codex harness." [primary] https://claude.com/blog/building-agents-with-the-claude-agent-sdk · [secondary, page 403'd on direct fetch] https://openai.com/index/unlocking-the-codex-harness/

### 1.2 The current harness landscape

**CLI / terminal-native (synchronous "conductor") agents:**
- **Claude Code** remains the reference CLI agent; its harness now also ships as a reusable library (Claude Agent SDK). [primary] https://claude.com/blog/building-agents-with-the-claude-agent-sdk
- **OpenAI Codex** — one shared harness surfaced three ways (Codex CLI, Codex Cloud, VS Code extension) with suggest / auto-edit / full-auto modes that cleanly demonstrate that *harness config, not the model,* sets the leash length. A dedicated Codex app and long-horizon "Goal mode" were reported in 2026. [secondary; OpenAI primary page 403'd] https://openai.com/index/unlocking-the-codex-harness/ · https://www.solidaitech.com/2026/07/openai-codex.html
- **Gemini CLI free/consumer tier was discontinued (reported 2026-06-18) and folded into Google's Antigravity platform** — a major change directly relevant to the course's current W6–8 tool. Treat Gemini CLI as legacy/transition, not a stable recommendation. [secondary, consistent across sources] https://thenextweb.com/news/google-antigravity-2-desktop-cli-sdk-io-2026

**IDE agents:**
- **Cursor** became agent-centric — "Cursor 3" moved agents into a dedicated Agents Window; "Cursor 3.5" made **Cloud Agents** (isolated cloud VMs, multi-repo parallelism) the headline. [secondary] https://www.digitalapplied.com/blog/cursor-3-agents-window-complete-guide
- **GitHub Copilot** now cleanly separates **agent mode** (synchronous, in-IDE) from the **coding agent** (asynchronous, cloud). [primary] https://docs.github.com/copilot/concepts/agents/coding-agent/about-coding-agent
- **Google Antigravity** — Google's agent-first IDE/platform (public preview 2025-11-20), built around a "Manager Surface" for orchestrating multiple async agents and "Artifacts" (screenshots, task lists, recordings) for verification instead of raw logs; **Antigravity 2.0** at Google I/O 2026 rebuilt it as desktop app + CLI + SDK + managed agent service. [primary] https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/ · https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/

**Async / background / cloud agents (the biggest 2026 shift):**
- **Claude Code on the web** (2025-10-20) — browser delegation on Anthropic-managed cloud, per-session sandboxes, parallel tasks across repos, auto-PR creation, iOS app. [primary] https://claude.com/blog/claude-code-on-the-web
- **GitHub Copilot coding agent** runs in an ephemeral GitHub Actions environment (59-minute session cap), assigned via issues, produces draft PRs, with GitHub MCP + Playwright MCP enabled by default. [primary] https://docs.github.com/copilot/concepts/agents/coding-agent/about-coding-agent
- **Devin, Google Jules, OpenAI Codex Cloud, Cursor Background Agents** occupy the same "spec in → PR out" category. [secondary] https://www.aitidbits.ai/p/cloud-coding-agents
- **Sandboxing became a first-class autonomy enabler**: Anthropic's OS-level isolation (Linux bubblewrap, macOS seatbelt) reduces permission prompts and is open-sourced for other agents. [primary] https://www.anthropic.com/engineering/claude-code-sandboxing (Note: the widely-cited "~84% fewer prompts" figure appeared in secondary summaries; verify against the primary page before quoting.)

### 1.3 Agent SDKs

- **Claude Agent SDK** — the Claude Code harness as a Python/TS library; the **Sept 2025 rename** from "Claude Code SDK" to "Claude Agent SDK" is itself the clearest signal of the harness-as-product trend (the same harness now powers Anthropic's research, video, and notes agents, not just coding). [primary] https://code.claude.com/docs/en/agent-sdk/overview
- **OpenAI Agents SDK** — open-source multi-agent orchestration (successor to Swarm); OpenAI even publishes a "migrate from Claude Agent SDK" cookbook, signaling direct competition. [primary] https://developers.openai.com/cookbook/examples/agents_sdk/migrate-from-claude-agent-sdk/readme
- **Google ADK / Antigravity SDK** plus **Managed Agents in the Gemini API** (spin up a tool-using agent in one API call). [primary] https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/
- **Managed/hosted agent runtimes** (Anthropic Managed Agents beta, Gemini Managed Agents) are the 2026 maturity frontier — the lab runs the agent infrastructure for you. [secondary] https://www.infoq.com/news/2026/05/code-with-claude/

### 1.4 MCP ecosystem maturity

- MCP is now **cross-vendor** (Anthropic, OpenAI/ChatGPT, Google Gemini, Microsoft Copilot Studio, GitHub, VS Code, Cursor) and moved to neutral multi-vendor governance (Linux-Foundation-hosted Agentic AI Foundation), de-risking single-vendor lock-in. [secondary] https://www.digitalapplied.com/blog/mcp-adoption-statistics-2026-model-context-protocol
- **A major stateless-core spec RC is finalizing 2026-07-28**: drops the `initialize` handshake / session IDs, adds a governed Extensions framework, "MCP Apps" (servers ship interactive HTML in sandboxed iframes), OAuth 2.0/OIDC hardening, and a formal deprecation policy. [primary] https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/
- MCP **security** is now an active research area (e.g., MCPSecBench), reflecting maturity and scrutiny. [primary] https://arxiv.org/pdf/2508.13220
- Adoption scale figures (~97M monthly SDK downloads, ~9,600–10,000 registry servers) come from secondary trackers — cite directionally, not precisely. [secondary] https://www.digitalapplied.com/blog/mcp-97-million-downloads-model-context-protocol-mainstream

### 1.5 Model capabilities & benchmark regime change

- **SWE-bench Verified is saturating** (top models cluster ~80%+) and losing signal value; the community moved to the contamination-resistant **SWE-bench Pro** (much lower scores) and **Terminal-Bench 2.x** (Stanford + Laude Institute, curated to stay hard) for agentic terminal work. [secondary/leaderboards] https://epoch.ai/benchmarks/swe-bench-verified · https://labs.scale.com/leaderboard/swe_bench_pro_public · https://www.tbench.ai/leaderboard/terminal-bench/2.0
- **Long-horizon autonomy (hours→days) is the frontier axis of 2026.** Anthropic's harness work names the failure modes blocking it: "context anxiety" (premature completion near context limits, solved by full context resets) and self-evaluation bias (solved by separating a Generator from an Evaluator agent). One data point: a game-maker example cost ~$200 with a full multi-agent harness vs ~$9 solo, for "noticeably better" quality — a clean quality/cost teaching illustration. [primary] https://www.anthropic.com/engineering/harness-design-long-running-apps

---

## 2. Modern software-engineering standards for AI-assisted development

### 2.1 TDD with agents — tests as the specification

Anthropic's guidance calls TDD "the single strongest pattern for working with agentic coding tools," because each red→green cycle gives the agent unambiguous, machine-checkable feedback. Because Claude defaults to writing implementation first, TDD must be *explicitly* prompted (write tests → confirm they fail → implement to green without modifying tests). [secondary/vendor docs] https://code.claude.com/docs/en/best-practices

The load-bearing principle: "the failing test becomes the specification… you own the spec, the AI owns the implementation, so it can't validate its own bugs." The most common reliability failure in multi-session agent work is the **"verification gap"** — an agent declaring a feature done before the suite confirms it. [secondary] https://mcp.directory/blog/claude-code-best-practices

### 2.2 Spec-driven development (the fastest-moving 2026 practice area)

- **GitHub Spec Kit** — most-adopted open-source SDD toolkit (MIT, Python CLI): Constitution → Specify → Plan → Tasks → Implement, all as committed markdown, supporting 30+ agents. Very active (v0.13.0, July 2026; ~123k stars). [primary] https://github.com/github/spec-kit
- **Amazon Kiro** — spec-native IDE using EARS-notation acceptance criteria plus a "steering" memory bank; broad GA May 2026. [secondary] https://www.developersdigest.tech/blog/aws-kiro-developer-guide-2026
- **Martin Fowler / Birgitta Böckeler** give the best conceptual frame: three maturity levels — **spec-first** → **spec-anchored** → **spec-as-source** — with an explicit warning that spec-as-source risks repeating Model-Driven Development's inflexibility. This is the authoritative primary analysis to assign. [primary] https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html

### 2.3 Evals for AI-generated code

- **pass@k** (probability ≥1 of k attempts succeeds) corrects the single-sample view — a model 40% at k=1 can reach ~78% at k=3. [secondary] https://rajeevraibhatia.com/blog/pass-at-k-evaluation-metric-explained/ (The pass@k vs pass^k distinction is also covered in Anthropic's "Demystifying Evals," already cited in the existing research doc.)
- **LLM-as-a-judge** remains the workhorse but carries documented biases (position, verbosity, self-enhancement). [secondary] https://deepeval.com/guides/guides-llm-as-a-judge
- **Agent-as-a-judge** is the 2026 evolution — agentic judges using planning, tool-augmented verification, and memory report higher alignment with human experts than plain LLM-judges on code-gen benchmarks. Foundational paper (arXiv:2410.10934, confirmed 2024 ID): https://arxiv.org/abs/2410.10934 [primary] (Note: 2026 follow-on IDs surfaced but could not be verified — do not cite them.)

### 2.4 CI/CD and code review of AI output

- **Cloudflare's CI-native multi-agent reviewer** (Apr 2026) is the strongest primary case study: up to 7 specialized agents (security, performance, quality, docs, release, compliance, AGENTS.md verification) + a coordinator. One-month metrics: 131,246 reviews across 48,095 MRs, median $0.98/review, median 3m39s, 85.7% cache hit; humans retained a "break glass" override used in 0.6% of cases. [primary] https://blog.cloudflare.com/ai-code-review/
- The 2026 direction is "from a tool that posts comments → an agent that takes actions" (writes the missing test, opens a follow-up PR). Consensus best practice is **hybrid**: AI flags obvious defects/policy violations; humans own architecture, testing judgment, and final approval. [secondary] https://sourcegraph.com/blog/ai-code-review · academic framing at ICSE 2026's "Toward Agentic Code Review" workshop https://conf.researchr.org/details/icse-2026/jaws-2026-papers/58/Toward-Agentic-Code-Review-Reimagining-the-Process-in-the-AI-Era

### 2.5 Security — the biggest standards shift of 2026

- **OWASP Top 10 for LLM Applications 2025** is the current LLM-app list (LLM01 Prompt Injection, LLM02 Sensitive Info Disclosure, LLM03 Supply Chain, … LLM06 Excessive Agency, etc.). [primary] https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/
- **NEW: OWASP Top 10 for Agentic Applications (ASI01–ASI10)** — released 2025-12-09, a separate agent-specific list: ASI01 Agent Goal Hijack, ASI02 Tool Misuse, ASI03 Identity/Privilege Abuse, ASI04 Agentic Supply Chain, ASI05 Unexpected Code Execution, ASI06 Memory/Context Poisoning, ASI07 Insecure Inter-Agent Comms, ASI08 Cascading Failures, ASI09 Human-Agent Trust Exploitation, ASI10 Rogue Agents. **This is the single biggest change to the standards landscape since the existing research doc.** [primary] https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ · names cross-checked https://www.giskard.ai/knowledge/owasp-top-10-for-agentic-application-2026
- **Prompt injection went from theoretical to documented in the wild:** Palo Alto Unit 42 (Mar 2026) catalogued 12 distinct real-world indirect-injection cases (SEO poisoning, DB destruction, forced transactions, data exfiltration) using 22 payload techniques. [primary] https://unit42.paloaltonetworks.com/ai-agent-prompt-injection/
- Two defense frameworks worth teaching directly: **Simon Willison's "lethal trifecta"** (private data + untrusted content + external comms = exfiltration risk) https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/ and **Meta's "Agents Rule of Two"** (an agent should satisfy at most two of those three without human approval) https://ai.meta.com/blog/practical-ai-agent-security/ [both primary]
- **Slopsquatting is now quantified, not hypothetical.** CSA (Apr 2026), citing a USENIX Security 2025 study of 2.23M samples across 16 models: 19.7% contained hallucinated package names; open-source models hallucinated ~21.7% vs commercial ~5.2%; 43% of hallucinated names recurred across identical re-runs (predictable ⇒ exploitable). Defenses: registry verification, lockfile pinning + hash checks in CI, allowlists for autonomous agents, flag packages registered in the last 30–90 days. [primary] https://labs.cloudsecurityalliance.org/research/csa-research-note-slopsquatting-ai-supply-chain-20260419-csa/
- **AI-generated code security is empirically flat.** Veracode Spring 2026: ~55% security pass rate despite >95% syntactic correctness — Java worst (29%), XSS failing ~85% of the time. Reasoning models reach only ~70–72%. This is the course's core thesis, now with fresh data. [primary] https://www.veracode.com/blog/spring-2026-genai-code-security/

### 2.6 "Agentic engineering" — the role shift

Anthropic's ~400k-session study grounds the new division of labor: **humans make ~70% of planning ("what") decisions; the agent makes ~80% of execution ("how") decisions**; verified success rises sharply with domain expertise (15% novice → 28–33% expert). Practitioners reframe this as "orchestrating agents through a research → plan → execute → review → ship loop, with the human as oversight rather than typist," with **verification-first** and **explicit guardrails** (documented action boundaries, human checkpoints) as the recurring pillars. [primary] https://www.anthropic.com/research/claude-code-expertise

---

## 3. Human–Computer Interaction principles for AI coding

### 3.1 Collaboration patterns & levels of automation

- **HITL / HOTL / out-of-the-loop** is the core taxonomy: human-in-the-loop = human is a required step (approves each consequential action); human-on-the-loop = supervisory control with discretionary intervention; out-of-the-loop = no planned intervention. [primary] https://arxiv.org/pdf/2602.13745
- **The self-driving (SAE L0–L5) analogy is the dominant framing** for coding autonomy (L0 human writes all code → L1 single-line assist → L3 autonomous within well-defined bounds). [secondary] https://tessl.io/blog/the-5-levels-of-ai-agent-autonomy-learning-from-self-driving-cars/
- **Karpathy's "autonomy slider"** is the most-cited practitioner model: the fundamental unit of work is a *generation–verification loop*, and you slide autonomy rightward *gradually* while keeping effective oversight (the "Iron Man suit" augmentation framing). [primary] https://www.latent.space/p/s3
- **Addy Osmani's Conductor → Orchestrator** framing maps cleanly to the harness taxonomy: a *conductor* manages one agent in real time (synchronous, ~100% engagement); an *orchestrator* oversees multiple autonomous agents in parallel (front-loaded spec, back-loaded review). [primary] https://addyo.substack.com/p/conductors-to-orchestrators-the-future
- Classic HCI foundations still apply and are worth citing for gravitas: **Bainbridge's "Ironies of Automation" (1983)** (automating the easy parts leaves humans worse at the monitoring they're now responsible for) https://www.sciencedirect.com/science/article/abs/pii/0005109883900468 and **Parasuraman/Sheridan/Wickens** levels-of-automation model (higher automation trades routine workload against situation awareness and failure recovery) https://journals.sagepub.com/doi/10.1518/155723405783703082 [both primary]

### 3.2 Trust calibration

- **The target is appropriate/calibrated reliance, not maximal trust** — rely when the system is accurate, disengage when it isn't, avoiding both *misuse* (over-reliance) and *disuse*. [primary] https://arxiv.org/html/2604.23896v1
- **Automation bias** (over-reliance on automated recommendations) is a critical failure mode; transparency + trust-calibration feedback measurably improves reliance. [primary] https://link.springer.com/article/10.1007/s00146-025-02422-7 · https://www.tandfonline.com/doi/full/10.1080/10447318.2025.2487861
- Practitioner signal: favorable developer views of AI coding fell (~70% → ~60% over two years), with ~30% expressing little/no trust in AI-generated code — adoption rising while trust declines. [secondary] https://addyo.substack.com/p/avoiding-skill-atrophy-in-the-age

### 3.3 Cognitive load, oversight & agentic UX

- **Approval fatigue is quantified by Anthropic's own data: users approve 93% of Claude Code permission prompts** — an oversight feature inverting into *less* oversight. Their "auto mode" mitigation delegates approvals to model-based classifiers so only risky actions surface. [primary] https://www.anthropic.com/engineering/claude-code-auto-mode
- **Oversight is real, cognitively demanding work.** An interview study of developers using agents found oversight is labor-intensive, agents are opaque, logs overload reviewers, and developers fall back on *sampling* strategies rather than comprehensive review — the concrete "verification burden." [primary, preprint] https://arxiv.org/pdf/2606.05391
- The **"70% problem"**: AI produces ~70% of a solution fast, but the last 30% (edge cases, security, integration) still demands full human effort — where the hidden cost lives. [secondary] https://zed.dev/blog/ai-70-problem-addy-osmani
- Emerging skill (Simon Willison): developing intuition for *when you don't need to review every line* an agent produces — explicitly "deeply uncomfortable," capturing the throughput/oversight tension. [primary/practitioner] https://x.com/simonw/status/1976989054240800798
- **Design pattern to teach: risk-tiered approval gates** — DENY (block) → ALLOW (auto-approve low-risk to cut noise) → HUMAN gate (irreversible/financial/PII), targeting only ~10–15% of calls at a human. Plus 7 UX principles for agentic tools (clarity of intent, transparency-as-affordance, visible override, progress feedback, operational ethics/guardrails, collaboration-over-replacement). [secondary] https://changkun.de/blog/ideas/human-in-the-loop-agents/ · https://www.uxmatters.com/mt/archives/2025/12/designing-for-autonomy-ux-principles-for-agentic-ai.php

### 3.4 Over-reliance, deskilling & skill atrophy (teach against these)

- **METR RCT (headline study): experienced open-source developers were 19% SLOWER with early-2025 AI tools** — despite forecasting a 24% speedup and, even after finishing, still believing AI made them 20% faster. Teach it as "AI ≠ automatic speedup + self-perception is unreliable," honoring METR's own caveats (early-2025 tools, experienced devs on familiar codebases). [primary] https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ · paper https://arxiv.org/abs/2507.09089
- **MIT "Your Brain on ChatGPT" (2025) — the "cognitive debt" study:** EEG on 54 participants; LLM users showed weakest neural connectivity, lowest ownership, and reduced engagement when later moved to no-AI. Pair it with the published critique (small-n, EEG methodology) to teach critical appraisal rather than overclaiming. [primary] https://arxiv.org/abs/2506.08872 · critique https://arxiv.org/pdf/2601.00856
- **Microsoft + CMU (Lee et al., CHI 2025):** survey of 319 knowledge workers / 936 use cases — higher confidence *in the AI* correlated with *less* critical thinking; effort shifts from doing to verifying/stewarding output; authors warn of self-deskilling. [primary] https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/
- **GitClear code-quality trends (211M+ lines through 2024):** rising code churn, ~39.9% drop in refactoring, ~8× more duplicated blocks — over-reliance manifesting in the *artifact*, not just the developer. [secondary] https://www.gitclear.com/ai_assistant_code_quality_2025_research
- **Directly teachable anti-deskilling curriculum (Osmani):** scheduled no-AI periods, attempt-first-then-AI, mandatory human review, post-hoc "explain the solution / why" prompts, learning journals — "collaborator, not a crutch." [primary/practitioner] https://addyo.substack.com/p/avoiding-skill-atrophy-in-the-age
- **Nuance to teach:** a 12-week study found students taught to delegate only *lower-order* work to AI (keeping higher-order work) showed *greater* critical-thinking gains — structured, metacognitive delegation can help. [secondary — verify primary before quoting numbers] https://www.sciencedirect.com/science/article/pii/S2451958826001764

---

## 4. Pedagogy — how AI-assisted engineering is being taught (2026)

### 4.1 University & program landscape

- **CMU 15-113 "Effective Coding with AI" (Spring 2026)** — a dedicated course teaching AI as a "force multiplier": build ambitious projects faster *while maintaining quality*, critically evaluate AI output (correctness/security/performance/maintainability), choose appropriate tools, and articulate a personal framework for when/how to use AI. Grading: Projects 40%, HW 20%, Participation 20%, Exams/Quizzes 20%. [primary] https://www.cs.cmu.edu/~113
- **Stanford CS 224G "Building and Scaling LLM Applications"** (production AI apps: agentic workflows, context engineering, RAG, safety) https://cs224g.stanford.edu/ and **CS 329A "Self-Improving AI Agents"** https://cs329a.stanford.edu/ [both primary]
- **CMU 17-445 "AI Engineering / ML in Production"** — full lifecycle of ML-powered products including responsible AI and MLOps. [primary] https://mlip-cmu.github.io/s2025/
- **Harvard CS50 (2026)** publicly "embracing AI" (its "rubber duck" AI tutor); exact written AI policy could not be verified — do not cite specific CS50 allow/prohibit rules without the primary honesty page. [primary, policy unverified] https://cs50.harvard.edu/x/2026/syllabus/

### 4.2 Company / vendor training

- **Anthropic Academy** (launched Mar 2026) — ~18 free courses across AI Fluency, product, and developer tracks, including a Claude Code path (Skills, sub-agents, context management). [primary] https://anthropic.skilljar.com/ · https://www.anthropic.com/learn
- **DeepLearning.AI "Claude Code: A Highly Agentic Coding Assistant"** (with Anthropic) — 10 lessons on agentic-coding best practices across three real projects. [primary] https://www.deeplearning.ai/courses/claude-code-a-highly-agentic-coding-assistant

### 4.3 Learning outcomes that matter

Industry and academic sources converge on: **precise specification/prompting, code auditing & verification of AI output, and multi-tool orchestration** as the core 2026 skills, with verification described as non-negotiable. The **NUS–Google "Graduate Profile" whitepaper** adds critical thinking/metacognition, human+AI collaboration, professional responsibility/liability awareness, communication of design intent, and verification competence spanning informal testing to formal proof. Karpathy's widely-cited framing: value shifts from syntax/implementation toward "judgment, taste, and oversight," and from "vibe coding" toward disciplined "agentic engineering." [primary] https://arxiv.org/html/2606.07545v2 · https://thenewstack.io/vibe-coding-is-passe/

### 4.4 Assessment when AI writes the code

- **Utah State CS1-CR (arXiv:2605.21374, May 2026)** is the strongest primary model: removed AI restrictions but required mandatory **15-minute oral code-review interviews within 48h**, weighted at **70% of the assignment grade** vs 30% for the code. Results: no significant exam-score change; 72% wanted reviews to continue; 90% reported increased motivation to understand code; 65% felt it reduced AI over-reliance. [primary] https://arxiv.org/html/2605.21374
- **Four-pillar "AI-resilient assessment" (Frontiers in AI, July 2026):** (1) process-based documentation (drafts, revision logs); (2) oral defense / structured viva; (3) authentic tasks resisting generic AI output; (4) transparent graduated AI-use policies (Prohibited / Guided / Permitted). Suggested weighting: reasoning + oral defense ~25–35% each, process 20–30%, product 10–20%; random-sample 30–40% of a large cohort. [primary] https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2026.1841682/full
- Oral exams/viva are argued to be the most AI-resistant format but **don't scale** (a cited example: ~30 staff-hours for 36 students); best results come from layering 2–3 strategies. [secondary] https://scientect.org/2025/10/27/the-oral-defence-higher-educations-shield-in-the-generative-ai-world/
- **SIGCSE TS 2026** has a Birds-of-a-Feather on "Alternative Assessment in the Era of AI" (oral exams, mastery assessment) — a venue signal that this is the field's live debate. [primary] https://sigcse2026.sigcse.org/details/sigcse-ts-2026-birds-of-a-feather/12/Alternative-Assessment-in-the-Era-of-AI

### 4.5 Academic integrity

- **CMU 15-113's policy is a model "explain your code" approach**: document all significant AI usage; explain AI-generated code in your own words; modify and test suggestions (no blind copy-paste). Prohibited: "submitting AI code you can't explain reasonably well." Core principle: "You must understand and be able to explain all submitted code." This directly validates CS 7180's existing **"never commit code you cannot explain"** rule. [primary] https://www.cs.cmu.edu/~113
- The policy landscape shifted from "AI banned" to "AI rules must be explicit," with disclosure required to be specific enough to distinguish human vs AI contribution. (Several policy-tracker sources are commercial SEO blogs — verify against primary university pages before quoting.) [secondary] https://www.thesify.ai/blog/generative-ai-policies-top-universities-2026

### 4.6 The fundamentals-vs-tools debate & data

- The **NUS–Google whitepaper** is the richest primary synthesis: shift toward higher-order skills (system architecting, specification & verification, AI-native competencies, ethics) while *preserving* fundamentals because humans must verify AI code. Cited data points: a reported 16% employment decline for developers aged 22–25 since late 2022; ~55% faster task completion with Copilot in controlled experiments vs the METR field finding of experienced devs being *slower*; students with unrestricted AI showed a ~17% exam-score drop when AI was removed, while *guardrailed hints* preserved learning. [primary — but trace embedded stats to their own sources before publishing] https://arxiv.org/html/2606.07545v2
- Consensus is explicitly *not* either/or: AI can offload low-level syntax to free students for decomposition — "but only after mastering foundations." [primary] https://arxiv.org/html/2606.07545v2

---

## 5. The "harnesses" framing — a conceptual model for the course

### 5.1 The core mental model to teach

Teach **Agent = Model + Harness** as the organizing equation, then the design principle that makes it powerful: **"Every component in a harness encodes an assumption about what the model can't do on its own"** — so as models improve, harness components expire and become overhead. [primary] https://addyosmani.com/blog/agent-harness-engineering/ · Anthropic's version: "as models improve, less scaffolding is necessary" https://www.anthropic.com/engineering/harness-design-long-running-apps

Corollaries worth teaching:
- "A decent model with a great harness beats a great model with a bad harness." [primary] https://addyosmani.com/blog/agent-harness-engineering/
- Harnesses are **technical debt with a ~90-day half-life** — "Thin Harness, Fat Skills"; RAG pipelines, orchestrator-worker decomposition, and elaborate supervisor-critic graphs have each dissolved as models improved. [primary] https://leehanchung.github.io/blogs/2026/05/08/hidden-technical-debt-agent-harness/

### 5.2 The axes the field actually uses

- **Synchronous vs. asynchronous** is the dominant 2026 axis; "autonomy isn't a 'web' feature, it's an agent capability." [primary] https://www.aitidbits.ai/p/cloud-coding-agents
- **Inner / middle / outer developer loops** (Gene Kim & Steve Yegge): Inner (seconds–minutes, synchronous), Middle (hours–days, cross-session memory/handoff), Outer (weeks–months, architecture). Match the tool to the loop timescale. [primary] https://itrevolution.com/articles/the-three-developer-loops-a-new-framework-for-ai-assisted-coding/
- **Conductor vs. orchestrator** (§3.1) supplies the human-role vocabulary on top of these axes. [primary] https://addyo.substack.com/p/conductors-to-orchestrators-the-future

### 5.3 Recommended course taxonomy — 5 harness categories **[inference — my synthesis, grounded in the sources above]**

Organize by **interaction surface × autonomy/loop position** (monotonic in autonomy and loop timescale, so one diagram carries both axes):

1. **Inline / inner-loop assistants** — live in the editor, keystroke-to-minutes cadence, human is the loop. *Copilot autocomplete, Cursor Tab.*
2. **Synchronous "conductor" harnesses** — terminal/IDE agents you steer turn-by-turn; run the full inner loop but stay attached. *Claude Code (CLI), Codex CLI, Cursor Agent mode.*
3. **Asynchronous background/cloud harnesses** — spec in → the agent spins up its own environment → PR out. *Devin, Jules, Codex Cloud, Copilot coding agent, Claude Code on the web.*
4. **Long-running / multi-context autonomous harnesses** — sustain coherence across many context windows via planner/generator/evaluator splits and git-committed handoffs. *Anthropic's long-running harness patterns.*
5. **Orchestration / meta-harnesses** — a control layer *above* individual harnesses that fans out, schedules, and grades multiple agents. (Matches the arXiv paper's "Agent Framework sits above the harness" boundary.) *CI-driven outer loops, conductor/squad orchestrators.*

The teachable payoff: **the same harness now appears across CLI + IDE + cloud** (Codex and Claude Code both do), so the *interface* and the *leash length* are the variables while the harness is the constant. [primary basis] https://arxiv.org/html/2606.10106v1 · https://www.aitidbits.ai/p/cloud-coding-agents

---

## 6. Implications for the CS 7180 redesign + 8-hour workshop

### 6.1 Reframe "modalities" → "harnesses" (the headline change)

The course currently teaches **three "modalities": Claude Web (W4–5), Antigravity (W6–8), Claude Code (W10+)** (see `course/COURSE_MEMORY.md` §4 and `course/schedule.md`). Recommended changes:

1. **Rename "modality" → "harness" throughout**, and open the harness unit with the *Agent = Model + Harness* equation and the "harness encodes assumptions / gets thinner as models improve" principle. This is now standard, sourced field vocabulary, not a rebrand. [primary] https://martinfowler.com/articles/harness-engineering.html · https://www.anthropic.com/engineering/harness-design-long-running-apps
2. **Reorganize the progression by capability axis, not vendor.** The current sequence (web → IDE → terminal) still works, but relabel it as **inline/inner-loop → synchronous conductor → asynchronous orchestrator/long-running**, which is where the field is and which survives vendor churn. Add an explicit **async cloud-agent** unit (Claude Code on web, Copilot coding agent) — this is the biggest capability the current curriculum under-weights. [primary] https://claude.com/blog/claude-code-on-the-web
3. **De-risk the Antigravity dependency.** Google discontinued the free Gemini CLI tier and rebuilt Antigravity as a platform in 2026; teach the IDE-agent *concepts* (context collection, rules files, agent/plan modes, verification artifacts) tool-agnostically so the course isn't hostage to one vendor's roadmap. [secondary] https://thenextweb.com/news/google-antigravity-2-desktop-cli-sdk-io-2026 · https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/
4. **Add a "which harness for which task" decision unit** using the conductor/orchestrator + loop-timescale heuristics (e.g., "if a task takes >15 min and you don't need to watch, async wins"). [primary] https://addyo.substack.com/p/conductors-to-orchestrators-the-future · https://itrevolution.com/articles/the-three-developer-loops-a-new-framework-for-ai-assisted-coding/

### 6.2 Curriculum content updates (what to add/refresh)

- **Security unit: adopt the OWASP Top 10 for Agentic Applications (ASI01–ASI10)** alongside the LLM Top 10, and update the "45% of AI code is vulnerable" framing to Veracode's **Spring 2026 ~55%-pass** data (security flat while capability rises). Teach the **lethal trifecta** and **Rule of Two** as concrete, memorable defenses, and treat **slopsquatting** with the now-quantified USENIX/CSA numbers. [primary] https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ · https://www.veracode.com/blog/spring-2026-genai-code-security/ · https://ai.meta.com/blog/practical-ai-agent-security/
- **Add spec-driven development** as a first-class practice (GitHub Spec Kit hands-on + Fowler's spec-first/anchored/as-source maturity model). This is the fastest-moving 2026 SE practice and pairs naturally with the course's TDD emphasis (spec → tests → agent implements to green). [primary] https://github.com/github/spec-kit · https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html
- **Refresh evals** from LLM-as-judge to include **agent-as-judge**, and teach benchmark literacy (SWE-bench Verified saturated → SWE-bench Pro / Terminal-Bench; pull live numbers from authoritative leaderboards, never SEO blogs). [primary] https://arxiv.org/abs/2410.10934 · https://www.tbench.ai/leaderboard/terminal-bench/2.0
- **Add HCI/human-factors content as its own thread** — the autonomy slider, HITL/HOTL/off-the-loop, trust calibration, approval fatigue (93% figure), and risk-tiered approval gates. This is currently absent from the curriculum and is exactly the "quality" half of the course thesis. [primary] https://www.latent.space/p/s3 · https://www.anthropic.com/engineering/claude-code-auto-mode
- **Make deskilling a taught topic, not a caveat.** Assign the METR study, the MIT cognitive-debt study + its critique, and Osmani's anti-atrophy practices; build "attempt-first-then-AI" and "explain-the-why" habits into assignments. [primary] https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ · https://arxiv.org/abs/2506.08872 · https://addyo.substack.com/p/avoiding-skill-atrophy-in-the-age
- **MCP unit: teach it as cross-vendor infrastructure** and flag the 2026-07-28 stateless-core spec so examples don't go stale. [primary] https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/

### 6.3 Assessment & integrity (strongly supported by 2026 evidence)

- **Formalize oral code-review interviews / viva** as a graded component. The Utah State model (oral weighted 70% of the assignment) and the four-pillar framework give you defensible, published precedent for the course's "never commit code you can't explain" rule and its Demo-Day oral defense. [primary] https://arxiv.org/html/2605.21374 · https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2026.1841682/full
- **Grade process, not just product** — AI-usage logs, drafts/revision history, and a reflective checkpoint (the course already does AI documentation; weight it more and sample it in oral defense). [primary] https://arxiv.org/html/2606.07545v2
- **Adopt a graduated AI-use policy** (Prohibited / Guided / Permitted per assessment) rather than one blanket rule — the emerging field standard. [primary] https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2026.1841682/full

### 6.4 The 8-hour workshop — a concrete spine **[inference, grounded in the above]**

A one-day workshop can't cover a semester; it should deliver the *one durable mental model* (harnesses) plus hands-on verification discipline. Suggested arc:

1. **Hour 1 — Harness literacy:** Agent = Model + Harness; the 5-category taxonomy; "which harness for which task." (§5) [primary basis] https://martinfowler.com/articles/harness-engineering.html
2. **Hours 2–3 — Synchronous conductor + spec-driven TDD:** one hands-on feature via Spec Kit → tests → agent-to-green in Claude Code / Codex CLI. [primary] https://github.com/github/spec-kit
3. **Hour 4 — Async delegation:** dispatch a task to a cloud agent (Copilot coding agent or Claude Code on web), review the returned PR. [primary] https://docs.github.com/copilot/concepts/agents/coding-agent/about-coding-agent
4. **Hour 5 — Verification & code review of AI output:** hybrid human/AI review, the "70% problem," reviewing for the AI-specific pitfalls. [secondary] https://zed.dev/blog/ai-70-problem-addy-osmani
5. **Hour 6 — Security:** OWASP Agentic Top 10 speed-run, lethal trifecta, Rule of Two, slopsquatting check on the workshop's own dependencies. [primary] https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/
6. **Hour 7 — Human factors:** autonomy slider, trust calibration, approval fatigue, deskilling; the METR result as the "humility anchor." [primary] https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/
7. **Hour 8 — Oral-defense capstone:** each participant explains code an agent produced for them (models the assessment reform). [primary basis] https://arxiv.org/html/2605.21374

---

## 7. What has CHANGED vs the existing `claude_code_course_research.md`

That doc (Jan–Apr 2026) remains largely valid; this brief updates and extends it:

| Area | Existing doc | Mid-2026 update in this brief |
|---|---|---|
| **Core vocabulary** | "Modalities"; "harness" used only in the W15 Anthropic-blog appendix | "Harness" is now the field-wide organizing concept with an academic definition (arXiv:2606.10106) and a "harness engineering" discipline; recommend reframing modalities → harnesses |
| **Tool landscape** | Claude Code–centric; parallel worktrees; Agent Teams | Async **cloud agents** are now mainstream across all vendors; Cursor/Codex/Google all ship one harness across CLI+IDE+cloud; Gemini CLI free tier discontinued |
| **SDKs** | "Claude Agent SDK (formerly Claude Code SDK)" noted | Now a competitive field: OpenAI Agents SDK (+ migration cookbook), Google ADK, and **managed/hosted agent runtimes** as the frontier |
| **MCP** | `.mcp.json`, tool search, code-execution-with-MCP | MCP is cross-vendor, under neutral governance, with a **stateless-core spec RC finalizing 2026-07-28** |
| **Security standards** | OWASP Top 10 + OWASP LLM Top 10; slopsquatting introduced | **NEW OWASP Top 10 for Agentic Applications (ASI01–ASI10, Dec 2025)**; prompt injection **documented in the wild** (Unit 42); slopsquatting **quantified** (USENIX/CSA/Sonatype); Veracode Spring 2026 confirms security is **flat** |
| **Evals** | LLM-as-judge; pass@k vs pass^k; eval integrity | **Agent-as-judge**; SWE-bench Verified **saturated** → SWE-bench Pro / Terminal-Bench 2.x; SEO-farm benchmark fabrication is a live hazard |
| **SE practices** | TDD, CI/CD, code review (C.L.E.A.R.) | Adds **spec-driven development** (Spec Kit, Kiro, Fowler maturity model) and **CI-native multi-agent review** (Cloudflare case study) |
| **HCI / human factors** | Largely absent (mentioned only via approval-fatigue in auto-mode) | New dedicated thread: autonomy levels, trust calibration, **METR slowdown**, **MIT cognitive debt**, deskilling curriculum |
| **Pedagogy / assessment** | FACT framework, "explain your code," AI-resistant evals | Concrete 2026 precedents: **CMU 15-113**, **Utah State oral-review-at-70%**, **four-pillar AI-resilient assessment**, **NUS–Google graduate profile** |

---

## 8. Sources appendix

**Note on grading:** URLs below are grouped by confidence. "Primary" = retrieved directly from vendor/standards/academic source. "Secondary" = reputable summary; re-check numbers. "Do NOT cite" = surfaced during research but flagged unreliable/unverifiable.

### Primary — vendor, standards bodies, academic
- Anthropic — Harness design for long-running apps: https://www.anthropic.com/engineering/harness-design-long-running-apps
- Anthropic — Effective harnesses for long-running agents: https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- Anthropic — Agent harness design / "Harnessing Claude's intelligence": https://claude.com/blog/harnessing-claudes-intelligence
- Anthropic — Building agents with the Claude Agent SDK: https://claude.com/blog/building-agents-with-the-claude-agent-sdk
- Anthropic — Claude Agent SDK overview (docs): https://code.claude.com/docs/en/agent-sdk/overview
- Anthropic — Claude Code on the web: https://claude.com/blog/claude-code-on-the-web
- Anthropic — Claude Code sandboxing: https://www.anthropic.com/engineering/claude-code-sandboxing
- Anthropic — Claude Code auto mode (93% approval): https://www.anthropic.com/engineering/claude-code-auto-mode
- Anthropic — Claude Code expertise / division of labor study: https://www.anthropic.com/research/claude-code-expertise
- Anthropic — How AI is transforming work at Anthropic: https://www.anthropic.com/research/how-ai-is-transforming-work-at-anthropic
- Anthropic — Economic Index (Mar 2026): https://www.anthropic.com/research/economic-index-march-2026-report
- Claude Code best practices (docs): https://code.claude.com/docs/en/best-practices
- OpenAI — Unlocking the Codex harness (403 on direct fetch; content via search): https://openai.com/index/unlocking-the-codex-harness/
- OpenAI — Migrate from Claude Agent SDK to OpenAI Agents SDK (cookbook): https://developers.openai.com/cookbook/examples/agents_sdk/migrate-from-claude-agent-sdk/readme
- GitHub — Copilot coding agent (docs): https://docs.github.com/copilot/concepts/agents/coding-agent/about-coding-agent
- GitHub — Spec Kit: https://github.com/github/spec-kit
- Google — Build with Antigravity: https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/
- Google — I/O 2026 developer highlights: https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/
- Model Context Protocol — 2026-07-28 release candidate: https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/
- MCPSecBench (arXiv): https://arxiv.org/pdf/2508.13220
- OWASP — Top 10 for LLM Applications 2025: https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/
- OWASP — Top 10 for Agentic Applications 2026: https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/
- OWASP agentic list cross-check (Giskard): https://www.giskard.ai/knowledge/owasp-top-10-for-agentic-application-2026
- OWASP state-of-agentic-security summary (Help Net): https://www.helpnetsecurity.com/2026/06/11/owasp-prompt-injection-ai-security-failures/
- Palo Alto Unit 42 — real-world prompt injection: https://unit42.paloaltonetworks.com/ai-agent-prompt-injection/
- Simon Willison — the lethal trifecta: https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/
- Meta — Agents Rule of Two: https://ai.meta.com/blog/practical-ai-agent-security/
- CSA — slopsquatting research note: https://labs.cloudsecurityalliance.org/research/csa-research-note-slopsquatting-ai-supply-chain-20260419-csa/
- Veracode — Spring 2026 GenAI Code Security: https://www.veracode.com/blog/spring-2026-genai-code-security/
- Veracode — 2025 GenAI Code Security Report: https://www.veracode.com/resources/analyst-reports/2025-genai-code-security-report/
- Cloudflare — AI code review (multi-agent CI): https://blog.cloudflare.com/ai-code-review/
- Agent-as-a-Judge (arXiv:2410.10934): https://arxiv.org/abs/2410.10934
- Martin Fowler — Harness engineering (Böckeler): https://martinfowler.com/articles/harness-engineering.html
- Martin Fowler — SDD with three tools (Böckeler): https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html
- Hugging Face — agent glossary (model/scaffold/harness/agent): https://huggingface.co/blog/agent-glossary
- "What makes a harness a harness" (arXiv:2606.10106): https://arxiv.org/html/2606.10106v1
- Test harness (Wikipedia, etymology): https://en.wikipedia.org/wiki/Test_harness
- METR — AI dev productivity RCT (blog): https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/
- METR — RCT paper (arXiv:2507.09089): https://arxiv.org/abs/2507.09089
- MIT — Your Brain on ChatGPT (arXiv:2506.08872): https://arxiv.org/abs/2506.08872
- MIT study critique (arXiv:2601.00856): https://arxiv.org/pdf/2601.00856
- Microsoft/CMU — GenAI & critical thinking (CHI 2025): https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/
- Automation bias review (AI & Society 2025): https://link.springer.com/article/10.1007/s00146-025-02422-7
- Trust calibration feedback (HCI journal): https://www.tandfonline.com/doi/full/10.1080/10447318.2025.2487861
- From Trust to Appropriate Reliance (arXiv): https://arxiv.org/html/2604.23896v1
- Human oversight of agents in practice (arXiv preprint 2606.05391): https://arxiv.org/pdf/2606.05391
- HITL/HOTL taxonomy (arXiv 2602.13745): https://arxiv.org/pdf/2602.13745
- Bainbridge — Ironies of Automation (1983): https://www.sciencedirect.com/science/article/abs/pii/0005109883900468
- Parasuraman/Sheridan/Wickens — levels of automation: https://journals.sagepub.com/doi/10.1518/155723405783703082
- Wickens et al. — stages/levels meta-analysis: https://journals.sagepub.com/doi/10.1177/154193121005400425
- Karpathy — Software 3.0 (Latent Space): https://www.latent.space/p/s3
- Kim & Yegge — Three Developer Loops (IT Revolution): https://itrevolution.com/articles/the-three-developer-loops-a-new-framework-for-ai-assisted-coding/
- CMU 15-113 — Effective Coding with AI: https://www.cs.cmu.edu/~113
- CMU 17-445 — AI Engineering: https://mlip-cmu.github.io/s2025/
- Stanford CS224G: https://cs224g.stanford.edu/
- Stanford CS329A: https://cs329a.stanford.edu/
- Harvard CS50 2026 syllabus (AI policy not verified): https://cs50.harvard.edu/x/2026/syllabus/
- Anthropic Academy: https://anthropic.skilljar.com/ · https://www.anthropic.com/learn
- DeepLearning.AI — Claude Code course: https://www.deeplearning.ai/courses/claude-code-a-highly-agentic-coding-assistant
- NUS–Google — graduate profile whitepaper (arXiv:2606.07545): https://arxiv.org/html/2606.07545v2
- Utah State — CS1-CR oral code reviews (arXiv:2605.21374): https://arxiv.org/html/2605.21374
- Four-pillar AI-resilient assessment (Frontiers in AI, 2026): https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2026.1841682/full
- SIGCSE TS 2026 — Alternative Assessment BoF: https://sigcse2026.sigcse.org/details/sigcse-ts-2026-birds-of-a-feather/12/Alternative-Assessment-in-the-Era-of-AI
- ICSE 2026 JAWs — Toward Agentic Code Review: https://conf.researchr.org/details/icse-2026/jaws-2026-papers/58/Toward-Agentic-Code-Review-Reimagining-the-Process-in-the-AI-Era

### Secondary — reputable summaries (verify specific numbers before quoting)
- Addy Osmani — Agent harness engineering: https://addyosmani.com/blog/agent-harness-engineering/
- Addy Osmani — Conductors to Orchestrators: https://addyo.substack.com/p/conductors-to-orchestrators-the-future
- Addy Osmani — Avoiding Skill Atrophy: https://addyo.substack.com/p/avoiding-skill-atrophy-in-the-age
- Addy Osmani — AI's 70% problem (Zed): https://zed.dev/blog/ai-70-problem-addy-osmani
- Han Lee — Hidden technical debt of the agent harness: https://leehanchung.github.io/blogs/2026/05/08/hidden-technical-debt-agent-harness/
- HumanLayer — Harness engineering for coding agents: https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents
- awesome-harness-engineering (index): https://github.com/ai-boost/awesome-harness-engineering
- Sahar Mor — Cloud coding agents (AI Tidbits): https://www.aitidbits.ai/p/cloud-coding-agents
- Techsy — background coding agents compared: https://techsy.io/en/blog/background-coding-agents-compared
- UXmatters — Designing for autonomy: https://www.uxmatters.com/mt/archives/2025/12/designing-for-autonomy-ux-principles-for-agentic-ai.php
- Changkun — Confirmation fatigue / risk-tiered gates: https://changkun.de/blog/ideas/human-in-the-loop-agents/
- Tessl — 5 levels of agent autonomy: https://tessl.io/blog/the-5-levels-of-ai-agent-autonomy-learning-from-self-driving-cars/
- Knight Columbia — Levels of autonomy for AI agents: https://knightcolumbia.org/content/levels-of-autonomy-for-ai-agents-1
- GitClear — AI code quality 2025: https://www.gitclear.com/ai_assistant_code_quality_2025_research
- DeepEval — LLM-as-a-judge guide: https://deepeval.com/guides/guides-llm-as-a-judge
- pass@k explainer: https://rajeevraibhatia.com/blog/pass-at-k-evaluation-metric-explained/
- Epoch AI — SWE-bench Verified: https://epoch.ai/benchmarks/swe-bench-verified
- Scale — SWE-bench Pro leaderboard: https://labs.scale.com/leaderboard/swe_bench_pro_public
- tbench.ai — Terminal-Bench 2.0: https://www.tbench.ai/leaderboard/terminal-bench/2.0
- Cursor 3 Agents Window guide: https://www.digitalapplied.com/blog/cursor-3-agents-window-complete-guide
- MCP adoption statistics 2026: https://www.digitalapplied.com/blog/mcp-adoption-statistics-2026-model-context-protocol
- InfoQ — Code with Claude (managed agents): https://www.infoq.com/news/2026/05/code-with-claude/
- The Next Web — Antigravity 2.0 / Gemini CLI change: https://thenextweb.com/news/google-antigravity-2-desktop-cli-sdk-io-2026
- SolidAI — OpenAI Codex 2026: https://www.solidaitech.com/2026/07/openai-codex.html
- AWS Kiro developer guide: https://www.developersdigest.tech/blog/aws-kiro-developer-guide-2026
- Sourcegraph — AI code review: https://sourcegraph.com/blog/ai-code-review
- The New Stack — "Vibe coding is passé" (Karpathy on agentic engineering): https://thenewstack.io/vibe-coding-is-passe/
- Oral defence analysis (Scientect): https://scientect.org/2025/10/27/the-oral-defence-higher-educations-shield-in-the-generative-ai-world/
- AI overdependence & cognition (ScienceDirect): https://www.sciencedirect.com/science/article/pii/S2451958826001764
- Sonatype SSCR 2026 (supply chain): https://www.sonatype.com/hubfs/1-2025_Website-Assets/SSCR_2025/SSCR_2026_final.pdf

### Do NOT cite (surfaced but flagged unreliable/unverifiable)
- AI-coding benchmark SEO farms with fabricated model names/scores: codeant.ai/blogs/swe-bench-scores, morphllm.com/swe-bench-pro, benchlm.ai/benchmarks/terminalBench2
- aimagicx.com prompt-injection "340% surge" / "LiteLLM hackerbot-claw" incident — no primary confirmation
- Future-dated arXiv IDs for a 2026 "agent-as-judge survey" and "AJ-Bench" — could not confirm the papers exist
- DEV.to "Opus 4.6 upgrade made scaffolding redundant" anecdote — attribute, do not assert; "Opus 4.6" not confirmed against a primary Anthropic source

---

*Prepared 2026-07-20. Distinct sources cited: 99 URLs across the five research areas (including a small set explicitly flagged "do NOT cite"). This brief is designed to be merged into `course/COURSE_MEMORY.md` and to drive the Fall 2026 schedule/readings updates via the `/sync-course` workflow.*
