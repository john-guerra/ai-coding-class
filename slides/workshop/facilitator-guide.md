# Facilitator Guide — "Agentic Engineering: Speed With Quality"

**Format:** 4 sessions × 2 hours · **Audience:** professional developers · **Style:** hands-on, not
theory-heavy · **Primary tool:** Claude Code (CLI).

This guide is the run-of-show for facilitators. Each session has: timing, goals, talking points,
the live-demo / lab steps, and **cut-lines** (what to drop first if you're behind). Slides live in
`slides/workshop/sessionN/index.md`.

> **Design in one line:** teach the *buildable* Claude Code layer pros can't easily self-teach —
> with strong fundamentals up front and verification discipline throughout. A "harness" = model +
> its scaffolding; a "mode" = a leash setting.

---

## Before you start (setup & logistics)

- **Session 1 needs NO setup** — deliberately, to lower the barrier to the first sitting. It runs on
  a browser (tiktokenizer, Claude Web) only.
- **Pre-work before Session 2** (send after S1): install & authenticate **Claude Code**; clone the
  **Linkstash** starter repo; run `npm run setup` smoke test. Offer a 15-min
  office-hours slot before S2 to catch install failures — this is the #1 derailer.
- **Room:** each participant on their own machine; you on a projector. Have a **backup recording**
  of each live demo in case a tool misbehaves.
- **The continuous project — Linkstash:** a tiny link-saver that *by design* contains the **lethal
  trifecta** (private notes + fetches untrusted URLs + share/export), a testable URL-validation
  core, real dependencies, and **one planted subtle bug**. It threads Sessions 2→4.

### The two "humility anchors" (recurring callbacks)
Use these to keep the room honest about *why quality matters*:
1. **METR result** — experienced devs were **~19% slower** with early-2025 AI tools while believing
   they were 20% faster. *Speed ≠ speedup; self-perception is unreliable.*
2. **Veracode gap** — only **~55%** of AI-generated code passes security checks despite **>95%**
   syntactic correctness. *Functional ≠ secure.*

---

## SESSION 1 — Fundamentals & Prompting  *(standalone; no setup)*

**Goal:** everyone leaves able to (a) reason about what an LLM is doing, (b) pick the right harness
for a task, (c) write a structured prompt and iterate it.

| Time | Segment | Notes |
|---|---|---|
| 0:00–0:05 | Welcome + the promise | "Speed *with* quality." Drop the two humility anchors as a hook. |
| 0:05–0:25 | **LLM fundamentals by doing** | Live: tiktokenizer (code vs prose vs whitespace). Context window. Why models hallucinate → seeds slopsquatting (S4). The **"lazy genius"** model. |
| 0:25–1:00 | **The three harnesses compared** *(≥30 min — instructor priority)* | Claude Web = "whiteboard with a mentor"; IDE (Antigravity/Cursor) = "pair programmer"; Claude Code = "build crew that follows blueprints". Axes: interaction surface × autonomy. Walk the **"which tool for which task"** table. **Micro-hands-on:** everyone does one tiny task in Claude Web *and* peeks at Claude Code to feel the leash difference. |
| 1:00–1:50 | **Prompt engineering** | The **5-component anatomy** (Context·Task·Format·Constraints·Examples). The 4 patterns (zero/few-shot, chain-of-thought, role, structured output). The iteration loop ("expect 2–5 rounds"). **Solo lab (20 min):** email-validator prompt → run → find issues → add constraints → re-run → document iterations. Share 2–3 best prompts. |
| 1:50–2:00 | Wrap + pre-work | Assign S2 pre-work (install Claude Code, clone Linkstash). Preview: "next time we make the agent remember your project." |

**Cut-lines:** if behind, shorten the micro-hands-on in the harness segment (make it a demo), and
cap prompt-lab sharing at 2 examples. **Never cut** the harness comparison below 30 min.

**Common questions:** "Which tool should I actually use?" → the decision table; the honest answer is
"most pros run Claude Code as the spine and reach for Web for ideation." Defer extensibility to S3–4.

---

## SESSION 2 — Driving Claude Code: Context, Memory & Modes

**Goal:** everyone can set up project memory and choose a mode deliberately — including *when not to
trust auto mode*. First contact with Linkstash.

| Time | Segment | Notes |
|---|---|---|
| 0:00–0:15 | Recap + setup check | Confirm installs (triage failures fast — pair up anyone broken with a neighbor). `claude`, `/init` on Linkstash. |
| 0:15–0:50 | **Context engineering** | Memory files: **CLAUDE.md hierarchy** (global→project→subdir, "most specific wins"). The cross-tool rules-file table (`CLAUDE.md` / `.cursorrules` / `.antigravityrules` / copilot-instructions — "same concept, different filename"). Context hierarchy, `@`-mentions, `/clear`, `/compact`, **document-then-implement**. Framing: *context is assembled, not magical.* |
| 0:50–1:00 | **Break** | |
| 1:00–1:30 | **Agent engineering — the modes tour** | Ref: `docs/research/claude_code_modes_2026.md`. IDE Ask/Write/Agent/Plan → CC permission modes → **auto mode**: the **93%** approval-fatigue problem, classifiers + **3 tiers**, and the **17% false-negative** caveat = *calibrated trust, not maximal trust.* |
| 1:30–1:55 | **Build-along** | Hand-write a real CLAUDE.md for Linkstash (tech stack, commands, conventions, "do NOT"). Then toggle one live action through **ask → allowlist → plan → auto** to feel each leash. Commit the CLAUDE.md. |
| 1:55–2:00 | Wrap + preview | "Next time: spec → tests → let the agent build to green." |

**Cut-lines:** drop the auto-mode Stage-1/Stage-2 internals (keep the 3 tiers + 17% caveat); make
the mode-toggle a demo instead of everyone doing it. **Protect** the CLAUDE.md build-along — it's
the payoff.

**Watch for:** context-stuffing anti-pattern (pre-reading everything). Teach *trust the agentic
loop*. Keep CLAUDE.md under ~200 lines.

---

## SESSION 3 — Build & Verify + Extensibility I

**Goal:** run the full spec→EPIC→TDD→verify loop without letting the agent grade its own work; build
a first real extension (a skill + hooks).

| Time | Segment | Notes |
|---|---|---|
| 0:00–0:05 | Recap | Callback to CLAUDE.md; today we *use* it. |
| 0:05–0:20 | **Spec** *(new)* | Name the vocabulary collision first — `SPEC.md` / the plan / the failing test are three different things. **Two altitudes**: the spec loop runs once per feature, EPIC runs once per plan item inside it. Trigger rule: *"if you could describe the diff in one sentence, skip it."* Run the **interview prompt** live, then have participants score their own `SPEC.md` against the **four criteria** (self-contained · names files & interfaces · states out-of-scope · ends in an end-to-end verification step). Commit the spec, `/clear`, then implement. |
| 0:20–1:00 | **EPIC → TDD → review** | **Explore-Plan-Implement-Commit** on the specced Linkstash feature. TDD: write a failing test, then *"implement to green — do not modify the tests."* The load-bearing rule: *you own the spec, the AI owns the implementation, so it can't validate its own bugs.* Then review AI output → **review the diff against `SPEC.md`** with a subagent (and the don't-chase-every-finding caveat) → the **70% problem** → hunt the **planted bug**. |
| 1:00–1:10 | **Break** | |
| 1:10–1:55 | **Extensibility I: Skills + Hooks** *(solo lab)* | Build a **skill** (`fix-issue`-style, `.claude/skills/`). Wire a **PostToolUse** Prettier hook + a **PreToolUse** protected-file block (`.env`, exit code 2). Test both. Framing: **CLAUDE.md is advisory (~90%); a hook is deterministic (100%)** — "if you'd be upset when the rule is broken, use a hook." |
| 1:55–2:00 | Wrap + preview | "Next: connect the agent to real tools (MCP) + delegate to subagents, then secure it all." |

**Cut-lines:** the spec lab can shrink to a 5-min live demo of the interview (participants watch, then
reuse the prompt at home); the planted-bug hunt can shrink to a 3-min demo; the hook lab can drop the
protected-file block and keep just Prettier. **Protect** two beats — the **four criteria** applied to
the participant's own spec, and the TDD "do not modify the tests" line. Those are the spine of the
whole workshop's quality thesis: the human owns the criteria, the agent owns the code, and the agent
never grades itself.

**Timing risk:** this session is the fullest of the four. The 15 minutes for the spec segment come out
of what used to be a 55-minute build block — if the room is slow on setup, cut the spec *lab*, not the
four-criteria explanation.

---

## SESSION 4 — Extensibility II + Security Capstone

**Goal:** connect real tools and delegate; then audit and *defend* the code the agent wrote.

| Time | Segment | Notes |
|---|---|---|
| 0:00–0:05 | Recap | |
| 0:05–0:55 | **Extensibility II: MCP + subagents** *(build-along)* | `claude mcp add` a real server + `.mcp.json` ("MCP = USB-C of AI"). Use it live. Then a **security-reviewer subagent** (`.claude/agents/`) and/or a `--worktree` parallel task (**Writer/Reviewer** pattern). **Plugins awareness (~5 min):** a plugin = a shareable bundle of skill+hook+MCP — show the `.claude/` layout, don't build one. |
| 0:55–1:05 | **Break** | |
| 1:05–1:40 | **Security audit** | On their own Linkstash: `gitleaks` / `npm audit` / `semgrep`. **Slopsquatting** check on deps (callback to S1 hallucination). Map the **lethal trifecta** in Linkstash (it's there by design) and apply the **Rule of Two** to gate the share/export action behind a human checkpoint. Anchor: Veracode ~55%. |
| 1:40–1:55 | **Oral-defense capstone** | Pairs. Each participant gives a **5-min defense** of a piece of agent-written code: *what it does, why, and where it could bite.* Models "never ship code you can't explain." |
| 1:55–2:00 | **Close** | Personal AI-use framework worksheet. Further study: plugins, Agent SDK, production (deploy/monitoring/RAG/cost). Resources. |

**Cut-lines (protect the capstone!):** the MCP+subagents block is the flex — if behind, make the
subagent a demo and keep MCP hands-on, or vice-versa. The **oral-defense capstone must run** even if
short; it's the emotional and pedagogical payoff.

---

## Materials checklist
- [ ] `slides/workshop/session{1,2,3,4}/index.md` (reveal-md decks)
- [ ] Linkstash starter repo (with planted bug + lethal-trifecta surface)
- [ ] Handouts: prompt-anatomy card · memory-file/modes cheat-sheet · lethal-trifecta/Rule-of-Two
      card · slopsquatting checklist · personal AI-use framework
- [ ] Reference: `docs/research/claude_code_modes_2026.md` (modes/auto mode)

## Sources feeding each session
- **S1:** course W02 (fundamentals), W01/W05 (harnesses), W03 (prompt engineering)
- **S2:** W06 (rules files, modes), W08 (memory files), W10 (CLAUDE.md, permissions) + modes doc
- **S3:** W10 (EPIC), W11 (TDD, hooks), W12 (skills/hooks)
- **S4:** W12 (MCP, subagents), W14 (security), research brief (lethal trifecta, Rule of Two, slopsquatting)

---

## Linkstash reference — FACILITATOR ONLY (keep out of the student clone)

**Repo:** `github.com/john-guerra/linkstash` (students clone this) · **Setup:** `npm run setup` → `npm test` (5 green) → `npm run dev` (:3000).
Stack: Node 20+ · Express · SQLite · Vitest. A fresh clone tests green.

### The lethal trifecta, by design
| Leg | Location |
|---|---|
| **Private data** | SQLite store; links flagged `is_private` (seed includes a private "Comp notes" link) |
| **Untrusted content** | `src/lib/fetchTitle.js` fetches arbitrary saved URLs to read their `<title>` |
| **External comms** | `shareDigest()` / `POST /api/links/share` exports links outward |

### Planted issues (the "answers" — don't reveal to students)
1. **Privacy leak — S3 "hunt the bug".** `src/services/linkService.js` → `shareDigest()` omits the
   `is_private` filter, so private links leak into the digest. Its docstring (and the student
   README) state the contract it violates. The seeded suite is **green** — the bug lives in an
   untested path, which *is* the verification-gap lesson. **Fix:** filter out `l.is_private`.
2. **Hardcoded secret — S4 gitleaks.** `src/config.js` → `shareApiKey: "sk_live_…"`, committed, so
   `gitleaks detect --source .` fires on it.
3. **SSRF — S4 semgrep / Rule of Two.** `src/lib/fetchTitle.js` fetches any URL with no host
   allowlist (can hit `localhost`/metadata IPs). `npm audit` *also* flags axios's own SSRF
   advisories (dep pinned to `axios@0.21.1`). Use it to motivate gating the fetch/share behind a
   human checkpoint (Rule of Two).

### TDD target — S3
`src/lib/urlValidator.js` `isValidUrl()` currently accepts **any** parseable scheme (incl.
`javascript:` / `data:`). The exercise: write a *failing* test that those are rejected, then
`> implement the code to make them pass — do not modify the tests`. (Bonus: this also hardens the
`href` the frontend renders.)

### Quick verification (run before the session)
- `npm test` → 5 passing.
- `npm audit` → axios advisories incl. SSRF (the S4 lab has real findings).
- `node -e` on `shareDigest()` → the seeded private link is present (S3 bug is live).
