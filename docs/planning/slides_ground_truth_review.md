# Slides Ground-Truth Review

**Date:** 2026-07-20
**Author:** Slide-deck audit (automated)
**Scope:** The 14 canonical lecture decks (`slides/NN_Topic/index.md`) are treated as the authoritative record of what was actually delivered in the course. This document extracts what each deck actually teaches and compares it against the course-definition docs (`course/schedule.md`, `readings.md`, `COURSE_MEMORY.md`, `syllabus.md`, `assignments/*.md`, `projects/*.md`).

**Deliberately excluded per audit scope (known, being handled elsewhere):** term label (Spring→Fall 2026), course code (CS 7180→CS 6983), semester dates, and week-number renumbering (old W10–15 → 9–14, Spring Break removed). Every deck's title slide still says "CS 7180" and Spring-2026 week numbers; that is expected and **not** reported below. Findings focus only on **topic / tool / concept substance**.

**Decks reviewed:** 14 (01–08, 10–15). Experimental `T01_*` / `W01_*` / `W02_*` folders and `index_old.md` / `*_Planning.md` files were noted but treated as non-canonical.

---

## Per-Deck Findings

| Deck (file) | Key topics actually taught | Notable gaps / mismatches vs course docs |
|---|---|---|
| **01_Introduction** | Course philosophy (vibe coding + SE rigor); 3 modalities (Claude Web / Antigravity / Claude Code); 3 projects; assessment overview; quizzes; tech stack; required books; academic integrity | **Stale assessment table:** slide shows Participation **20%**, Homeworks(**6**) 25%, P1 15 / P2 20 / P3 20, with Quizzes 10% listed separately (doesn't sum). Current `syllabus.md` = Participation **15%**, Quizzes 10%, Homeworks **25% (5 HW)**, Projects 50% (P1 **13** / P2 **18** / P3 **19**). **Stale HW roster:** slide lists 6 HWs incl. "Context Engineering Lab", "TDD + CI/CD + Evals Suite", "Parallel Agent Orchestration" (HW5) and "Production Readiness Checklist" (HW6) — the last two don't exist; current spec = 5 HW ending in HW5 "Custom Skill + MCP". **P3 "Team of 2–3"** vs `project3` spec "Team size: 2 (pairs)". Modality-2 slide uses Cursor terms ("Composer", ".gemini/workflows"). *These are the intro deck being out of date; the docs are current. Later decks (11/12) reference the correct 5-HW structure.* |
| **02_LLMs_fundamentals** | Karpathy SW 1.0/2.0/3.0; NN/gradient descent; transformers/attention; tokens & tokenization (tiktokenizer demo); temperature/top-p; weights as compressed knowledge; bias; embeddings (projector demo); context windows & "lost in middle"; RAG concept; hallucinations (~20% fake APIs/pkgs); "lazy genius" model | Strong match to `readings.md` Week 2. Minor: examples are Cursor-centric (`.cursorrules`, `@codebase`) rather than the course's primary Antigravity — acceptable for a fundamentals lecture. |
| **03_Prompt_Engineering** | Prompt anatomy (context/task/format/constraints/examples); Claude 4 best practices; zero/few-shot; chain-of-thought; role prompting; structured output; system vs user prompts; Artifacts intro; hands-on lab | Clean match to schedule W3 / readings W3. References both `.cursorrules` and `.antigravityrules`. |
| **04_User_Research_Prototyping** | Mom Test (3 rules, 5 golden questions); Design Thinking 5 phases; Artifacts for prototyping; context windows / Claude Projects / personalization; user stories, INVEST, MoSCoW, PRD structure | Match to schedule W4. Minor internal inconsistency: "Looking Ahead" points to "Antigravity IDE & TDD Introduction" next week, but deck 05 is Claude Web Deep Dive (no TDD). Modality timing table differs deck-to-deck (week-number noise, excluded). |
| **05_Claude_Web_Projects** | Full projects with Artifacts; mockup/vision input; sandbox storage constraints & artifact storage (20MB, published-only); AI-powered artifacts (`fetch` to Anthropic API, `window.claude`-style); artifact limitations (single-file, no backend); debugging artifacts | Match to schedule W5 / readings W4-5. Confirms **P1 = Claude Web Artifact** framing, consistent with `project1` spec. |
| **06_IDE_AI_Coding** | How IDE AI works (context pipeline, indexing, embeddings, **Fill-in-the-Middle**, GitHub embedding-model stats); tab completion; inline edit (Cmd+K); chat; Ask/Write/Agent/Plan modes; rules files (incl. **Windsurf `.windsurfrules`**); @-mentions; Antigravity vs Copilot vs Cursor comparison; **P2 pair formation** | Match to schedule W6. Antigravity is correctly the course tool. FIM and the GitHub embedding-model metrics are taught but not surfaced in schedule/readings (minor). |
| **07_Advanced_IDE_Agile** | Agile/Scrum (roles, sprint cycle, ceremonies); GitHub Issues/Projects/labels/milestones as scrumboard; PRD→backlog; branch-per-issue; PRs & partner code review; pair workflow ("scrum for two"); async standups | Clean match to schedule W7 / readings W7. |
| **08_Advanced_IDE_Features** | Agent memory / memory files; MCP servers (concept + practical table); browser mode; mockup-to-code; AI debugging (stack traces, rubber-duck); shared rules files for pairs; P2 sprint workflow | Match to schedule W8. "Looking Ahead" references "After Spring Break" (week-structure noise, excluded). |
| **10_Claude_Code_Foundations** | Agentic loop; built-in tools (Read/Edit/Write/Bash/Glob/Grep/WebFetch); install/setup; CLAUDE.md deep dive (@imports, hierarchy, auto-memory, `/init`); tool-use & permission model, allowlists, sandboxing; context mgmt (`/clear`, `/compact`, `/rewind`, `--continue`, `/context`, `/model`); document-then-implement; thinking/plan modes | Strong match to schedule W9 (Foundations) / readings W10. |
| **11_Claude_Code_Workflows** | Explore→Plan→Implement→Commit; **TDD** (red-green-refactor); **property-based testing (fast-check)**; **mutation testing (Stryker)**; risks of AI tests; Git/GitHub via CC; CI/CD + `claude-code-action`; **Hooks** (Pre/Post/Stop); visual debugging; non-interactive `claude -p` / fan-out; **Evaluation Systems (LLM-as-Judge)** — pointwise/pairwise, judge biases, human-label validation | **Biggest content-vs-doc gap.** Schedule's Workflows row lists only EPIC, TDD, Git, CI/CD, visual debugging, non-interactive mode. The deck **also** teaches a full **LLM-as-Judge evals unit** (schedule places evals only in the Agent/Security weeks) plus **property-based & mutation testing** (nowhere in schedule; only a P3 bonus). Hooks are taught here a week before the Extensibility week. |
| **12_Claude_Code_Extensibility** | Skills (`.claude/skills/`); Hooks deep dive; MCP (add servers, `.mcp.json`, build a server, Tool Search); **Playwright E2E + Vitest visual-regression testing**; sub-agents (`isolation: worktree`); parallel dev with worktrees; agent teams (experimental flag); **AI code review + C.L.E.A.R. framework**; writer/reviewer pattern; PR AI-disclosure metadata | Match to schedule W11 core (skills/hooks/MCP/sub-agents/parallel). **But:** deck introduces the **C.L.E.A.R. framework** (reused in decks 14/15 and `project3` spec) — absent from schedule & readings. Also teaches **Playwright E2E + visual-regression testing** (a testing topic not named in the extensibility row). Schedule lists **"Plugins & plugin marketplace"** for this week — the deck only links plugins in Recommended Reading, never teaches them. |
| **13_Agent_Architectures** | Augmented LLM; workflows vs agents; Anthropic's 6 patterns (chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer, autonomous); Claude Agent SDK (`Agent`/`query()`, built-in tools, hooks, `allowed_tools`); multi-agent coordination, writer/reviewer, model routing; agent safety, sandboxing, systematic testing | Clean, thorough match to schedule W12 / readings W13. |
| **14_AI_Security_Code_Quality** | Eval frameworks (pass@k vs pass^k, 3 grader types, building eval suites); security data (Veracode 45%, Apiiro, Aikido); why AI code is insecure; **8-gate security pipeline** (Gitleaks, npm audit, SAST/DAST, container, license, sec-criteria, SBOM); **slopsquatting**; AI code review in CI; **eval awareness (BrowseComp), infra noise, AI-resistant evals**; ethics/IP/copyright/ACM/bias | Strong match to schedule W13 / readings W14. Note the eval-frameworks + eval-suite material overlaps the evals already taught in deck 11 (see cross-cutting note). |
| **15_Production_Synthesis** | Vercel deploy; env vars; full CI/CD pipeline (9 stages); monitoring (**Sentry**, structured logging, uptime); performance (Lighthouse+CC, lazy loading); cost optimization (**prompt caching**, **model routing**, budget limits); **harness design** (Planner/Generator/Evaluator, one-feature-per-session, 4 failure modes); **RAG & vector DBs** (pgvector/Chroma/Pinecone/Weaviate, embeddings, chunking); future trends; demo prep; meta-reflection | Match to schedule W14/Production. Two doc mismatches: schedule names **"OpenTelemetry"** for monitoring, but the deck teaches **Sentry + structured logging only** (no OpenTelemetry). Schedule compresses a large **harness-design + vector-DB unit** into "RAG patterns for codebases" / "future of AI engineering" — under-described vs what's actually taught (readings W15 does cover harness design). |

---

## Recommended Course-Doc Adjustments (ranked by importance)

1. **Reconcile where "evals" are taught.** Deck 11 (Workflows) delivers a complete **LLM-as-Judge evaluation unit** (pointwise/pairwise scoring, judge biases, 30–50-example human-label validation) that the schedule attributes only to the Agent/Security weeks. Either add an "Evaluation systems (LLM-as-Judge)" line to the Workflows week in `schedule.md`/`readings.md`, or move it — but the docs currently under-report the workflows week. (Also add the LLM-as-Judge source to readings W11.)

2. **Fix the Intro deck (`01_Introduction`) to match current specs.** Its assessment table (Participation 20%, **6** homeworks, P1 15/P2 20/P3 20) and HW roster ("Parallel Agent Orchestration", "Production Readiness Checklist") contradict the current `syllabus.md` (15% participation, 10% quizzes, **5** HW, P1 13/P2 18/P3 19) and the current HW list ending in HW5 "Custom Skill + MCP". This is the only deck whose homework/grading content is flatly wrong relative to the docs. Also correct P3 "Team of 2–3" → "2 (pairs)".

3. **Document the C.L.E.A.R. AI-code-review framework.** It is a named, load-bearing concept introduced in deck 12 and reused in decks 14, 15 and the `project3` spec, yet it appears in **no** course-definition doc. Add it to `schedule.md` (Extensibility and/or Security row), `readings.md`, and `COURSE_MEMORY.md`.

4. **Add property-based & mutation testing to the docs.** Deck 11 teaches **fast-check (property-based)** and **Stryker (mutation testing)** with research claims. They currently appear only as a P3 bonus. Add them to the Workflows week in `readings.md` (deck already cites fast-check + Stryker links there) and note in `schedule.md`.

5. **Correct the Production/monitoring row.** `schedule.md` lists **OpenTelemetry** for monitoring, but deck 15 teaches **Sentry + structured logging** (no OpenTelemetry). Replace "OpenTelemetry, Sentry" with "Sentry, structured logging" (or add OTel to the deck). Also expand the row to name the **harness-design (Planner/Generator/Evaluator, one-feature-per-session)** and **vector-DB/RAG** material that the deck actually covers, since readings W15 already includes the harness-design sources.

6. **Remove or teach "Plugins & plugin marketplace."** Schedule's Extensibility row lists it as a taught topic, but deck 12 only links it under Recommended Reading. Either drop it from the schedule's topic list or add a plugins slide.

7. **Note visual/E2E testing placement.** Deck 12 teaches Playwright E2E + Vitest visual-regression testing (a testing topic folded into the extensibility lecture). Schedule doesn't mention it in that week — add a brief mention so readings/testing coverage is traceable.

---

## Content Taught in Slides but Undocumented in Course Docs

- **LLM-as-Judge evaluation systems** (pointwise/pairwise, position/verbosity/self-enhancement biases, human-label validation thresholds) — deck 11, "Evaluation Systems (LLM-as-Judge)".
- **Property-based testing (fast-check)** and **mutation testing (Stryker)** — deck 11 (docs list only as P3 bonus).
- **C.L.E.A.R. framework** for reviewing AI-generated code + PR AI-disclosure metadata — deck 12, "The C.L.E.A.R. Framework" / "PR Metadata for AI Code".
- **Playwright E2E + Vitest visual-regression testing** — deck 12, "E2E Testing with Playwright MCP" / "Visual Regression Testing with Vitest".
- **Harness design** — Planner/Generator/Evaluator, one-feature-per-session, "Four Failure Modes of Long-Running Agents", solo-agent-vs-harness cost/quality tables — deck 15 (schedule row doesn't name it; readings W15 does).
- **RAG internals** — embeddings, embedding-model comparison, vector DBs (pgvector/Chroma/Pinecone/Weaviate), chunking strategies (AST-based, etc.) — deck 15 (schedule says only "RAG patterns for codebases").
- **Fill-in-the-Middle (FIM)** and GitHub embedding-model metrics — deck 06.
- **Tool Search auto-activation** and **agent-teams experimental flag** (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`) — deck 12 (agent teams is in `project3` spec but not schedule/readings).
- **Windsurf `.windsurfrules`** as an additional rules-file tool — deck 06.

## Documented in Course Docs but Not Taught in Slides

- **OpenTelemetry** — named in `schedule.md` (Production week); deck 15 teaches Sentry + structured logging only.
- **Plugins & plugin marketplace** — listed as a taught topic in `schedule.md` (Extensibility week); deck 12 only links it in Recommended Reading.
- **HW5 "Parallel Agent Orchestration" and HW6 "Production Readiness Checklist"** — these appear on the intro deck's roster but are *removed* in current docs (this is the reverse case: the stale item lives in a slide, not a doc, but flagged for completeness).

---

## Cross-Cutting Notes

- **Modality naming is consistent and correct** across teaching decks: Claude Web → **Antigravity** (not Cursor) → Claude Code. Only the intro deck (01) leaks Cursor-specific vocabulary ("Composer"). Fundamentals decks (02/03) use `.cursorrules`/`@codebase` as generic examples, which is reasonable.
- **Evals appear in three decks** (11 workflows, 13 agents, 14 security) with escalating depth. The docs only anticipate evals in the latter two — the W11 appearance is the notable omission.
- **Project framing is consistent** between later decks and specs: P1 = Claude Web Artifact (deck 05 ↔ `project1`), P2 = pair full-stack, all 3 modalities (decks 06–08 ↔ `project2`), P3 = 2-person Claude Code mastery (decks 10–15 ↔ `project3`). Only the **intro deck** misrepresents project weights/team sizes.
- **HW references in the teaching decks are correct:** deck 03→HW1 (Prompt Eng), deck 04→HW2 (Mom Test), deck 07/08→HW3 (Context Eng), deck 10/11→HW4 (CC Workflow & TDD), deck 11/12→HW5 (Custom Skill + MCP). Only the **intro deck's** summary roster is stale.
