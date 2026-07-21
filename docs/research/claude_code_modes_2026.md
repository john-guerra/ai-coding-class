# Claude Code Modes — Reference (2026)

**Purpose:** grounding doc for the "agent engineering / modes" segment of the 4×2h workshop
(Session 2) and for the W10-adjacent course slides. Consolidates the *autonomy/permission* controls
across AI-coding harnesses, with the new **Claude Code auto mode** as the centerpiece.

**Date:** 2026-07-20 · **Primary source for auto mode:**
https://www.anthropic.com/engineering/claude-code-auto-mode

---

## The one idea to teach

**A "mode" is a leash setting — it sets how much the agent may do before a human is asked.** The
model is the same; the *mode* is harness configuration. Two related-but-distinct control families:

- **Autonomy modes** (IDE tools): how many steps the agent takes on its own — *Ask → Write → Agent → Plan*.
- **Permission modes** (Claude Code): which *actions* need approval — *ask each time → allowlist →
  plan mode → auto mode → "YOLO"*.

Teaching frame: **you slide autonomy rightward as trust builds, and you keep oversight where the
blast radius is large.** Auto mode is the 2026 attempt to make that slider *smart* instead of manual.

---

## 1. IDE autonomy modes (for contrast) — Ask / Write / Agent / Plan

Source: course W06 (`slides/06_IDE_AI_Coding`). How editor-based harnesses (Antigravity, Cursor,
Copilot) expose autonomy. Useful as the on-ramp before Claude Code's permission model.

| Mode | Autonomy | What it does | Human control |
|---|---|---|---|
| **Ask** | Lowest | Answers questions, explains code. **Never touches files.** | N/A (read-only) |
| **Write** | Medium | Generates/edits code you review | Accept/reject each change |
| **Agent** | High | Plans + executes multi-step tasks (multi-file, terminal, installs) | Approve or stop the plan |
| **Plan** | Guided | Produces a step-by-step plan *first* | Review plan before execution |

- Antigravity exposes Ask / Write / Agent; Cursor names them similarly.
- **Agent-mode risk framing:** can read/write many files, run terminal commands, install packages —
  risks are unexpected changes, side effects, cascading edits, harder review. **Rule of thumb: use
  Agent mode for well-scoped tasks; review the plan before letting it execute.**
- **Simulate Plan mode** (if a tool lacks it) — a reusable prompt:
  > "Before making any changes, outline what files you'll modify and what changes you'll make in
  > each. Wait for my approval."

---

## 2. Claude Code permission modes

Source: course W10 (`slides/10_Claude_Code_Foundations`). Claude Code frames autonomy as **which
actions require a human "yes"**, not as a single autonomy dial.

| Level | Behavior | When to use |
|---|---|---|
| **Ask every time** | Every consequential tool call prompts `Allow? (y/n/always)` | New/untrusted repo; learning |
| **Allowlist** | Pre-approve safe commands via `permissions.allow` (e.g. `Bash(npm test)`, `Read`, `Edit`) | Steady work in a known repo |
| **Plan mode** | Agent explores + proposes a plan; makes **no edits** until you approve (Shift+Tab / `(plan)` prefix) | >3 files, unfamiliar area, risky change |
| **Auto mode** | AI classifiers auto-approve safe actions, surface only risky ones (see §3) | Trusted env; want throughput without rubber-stamping |
| **"YOLO" / bypass** | Auto-approve nearly everything | Sandboxes/CI only; never on high-stakes infra |

Guidance taught in the course: **"Start restrictive, widen as trust builds."** Pair a wide leash
with **sandboxing** (`claude --sandbox`; OS-level isolation) so autonomy ≠ unbounded blast radius.

**Plan mode is the highest-leverage habit for pros** — it separates the *what* (human-owned) from
the *how* (agent-owned) and gives a review checkpoint before any file changes.

---

## 3. Auto mode (NEW, 2026) — permissions without fatigue

Source (primary): https://www.anthropic.com/engineering/claude-code-auto-mode

### Why it exists
**Claude Code users approve ~93% of permission prompts.** That high acceptance rate creates
**approval fatigue** — an oversight feature that inverts into *less* oversight because people stop
reading what they authorize. Auto mode sits between manual approval (fatigue) and unrestricted
execution (unsafe): it **automates the approvals that would pass human review anyway** and reserves
human attention for genuinely risky actions.

### How it works — two defensive layers
1. **Input protection (prompt-injection probe):** a server-side probe scans tool outputs (file
   reads, web requests, shell output) *before the agent sees them*. On hostile content, "the probe
   adds a warning to the agent's context," anchoring the agent on actual user intent. (Directly
   relevant to the workshop's lethal-trifecta / prompt-injection content.)
2. **Output protection (transcript classifier):** each action is evaluated against approval
   criteria on a **stripped-down view — "only user messages and the executable payload remain."**
   The classifier sees **neither the agent's reasoning nor the tool outputs** that prompted the
   action, so the agent **can't talk itself into approval** through persuasive rationalization.
   - **Stage 1:** fast single-token yes/no filter (~8.5% false-positive rate on real traffic).
   - **Stage 2:** chain-of-thought reasoning *only if* Stage 1 flags concern (drops false positives
     to ~0.4%).

### Risk tiering (what reaches a human)
1. **Safe-tool allowlist** — file reads, code navigation, todo transitions + user always-allow rules.
2. **In-project file operations** — changes are reviewable via version control.
3. **Everything else** — shell commands, external services, filesystem ops *outside* the project →
   these go to the transcript classifier.

Note: entering auto mode **drops broad rules** like "allow arbitrary shell execution" that would
otherwise bypass the classifier entirely.

### Threat model (what the classifier blocks)
- **Destroy or exfiltrate** — force-pushes, mass deletion, unauthorized data transmission.
- **Degrade security** — disabling logging, installing persistence.
- **Cross trust boundaries** — running external code, scanning credential stores.
- **Bypass review or affect others** — direct pushes to `main`, prod deploys on shared infra.

Real blocked examples: deleting remote branches from vague instructions, prod DB migrations without
authorization, uploading credentials to unauthorized locations.

### The honest caveat (teach this — it's the trust-calibration moment)
> **~17% false-negative rate on real over-eager actions** — about **1 in 6 dangerous actions slip
> through**, mostly because the classifier can't verify whether user consent extends to an action's
> full blast radius. "Auto mode **is not a drop-in replacement for careful human review on
> high-stakes infrastructure**." Users must "stay aware of residual risk."

### Enabling
- `claude auto-mode defaults` — view the baseline config.
- Ships with conservative defaults across three customizable areas: **trusted environments, block
  rules, exceptions** — usable immediately without configuration.

---

## 4. How to teach it (Session 2 — "modes tour", ~30 min)

Suggested arc, moving left→right along the leash:

1. **Ask/Write/Agent/Plan** (IDE) — the autonomy on-ramp everyone already has intuition for. (5 min)
2. **Claude Code permission modes** — reframe autonomy as *which actions need a yes*; demo an
   allowlist and **plan mode** live. (10 min)
3. **Auto mode** — the 93% fatigue problem → classifiers + 3 tiers → the **17% caveat**. Land it as
   *calibrated trust*: automate the boring approvals, keep humans on the irreversible ones. (10 min)
4. **Trust calibration takeaway** — "the goal is appropriate reliance, not maximal trust." Tie to
   sandboxing (autonomy is only safe with a bounded blast radius). (5 min)

**Build-along tie-in:** after writing the Linkstash `CLAUDE.md`, toggle a live action through
ask → allowlist → plan → auto to *feel* each leash setting on the same command.

---

## Sources
- **Claude Code auto mode** (primary, all §3 figures): https://www.anthropic.com/engineering/claude-code-auto-mode
- **Claude Code sandboxing** (primary): https://www.anthropic.com/engineering/claude-code-sandboxing
- **Approval-fatigue / trust framing** (research brief §3.3): `docs/research/ai_coding_course_sota_2026.md`
- **IDE Ask/Write/Agent/Plan + permission modes** (course): `slides/06_IDE_AI_Coding`, `slides/10_Claude_Code_Foundations`

*Note: verify auto-mode figures (93% / 17% / 8.5% / 0.4% / 3 tiers) against the primary page at
teaching time — 2026 AI-tooling pages update frequently.*
