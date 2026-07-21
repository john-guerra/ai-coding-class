# Memory, Context & Modes — Quick Card

*Agentic Engineering workshop · Session 2*

## Memory: the CLAUDE.md hierarchy

`~/.claude/CLAUDE.md` (global) → `./CLAUDE.md` (project) → `subdir/CLAUDE.md` (local).
**All are loaded; most specific wins.** Keep it under ~200 lines — a briefing, not a manual.

**Put in it:** tech stack + versions · build/test commands · architecture (3 sentences) ·
conventions · a **"Do NOT"** list. Split detail out with `@imports`.

**Same concept, different filename:**

| Tool | Rules file |
|---|---|
| Claude Code | `CLAUDE.md` |
| Cursor | `.cursorrules` |
| Antigravity | `.antigravityrules` |
| Copilot | `.github/copilot-instructions.md` |
| Windsurf | `.windsurfrules` |

## Context engineering

**Priority order (what the agent sees):** 1) rules files (always, highest) → 2) explicit
`@`-references → 3) current file → 4) open tabs → 5) project index/embeddings.

**`@`-mentions:** `@file` `@folder` `@docs` `@codebase` `@web` `@git`.

**Manage the budget:** `/clear` (wipe it) · `/compact` (keep what matters) · `/context` (show it).
**Document-then-implement:** explore → write findings to a doc → `/clear` → plan → `/clear` →
implement. *Signal lives in files, not in chat history.*

> Context is a **budget, not a bucket.** Curate. Avoid context-stuffing.

## Modes = leash settings (same model, different config)

**IDE autonomy:** Ask (read-only) → Write (edits you approve) → Agent (multi-step) → Plan (plan first).

**Claude Code permission modes:**

| Mode | Behavior | When |
|---|---|---|
| Ask each time | prompts `y/n/always` | new / untrusted repo |
| Allowlist | pre-approve safe cmds | known repo |
| **Plan mode** (Shift+Tab) | no edits until approved | risky / >3 files |
| **Auto mode** | classifiers approve safe, surface risky | trusted env |
| YOLO / bypass | approve ~everything | sandboxes / CI only |

**Start restrictive; widen as trust builds.**

## Auto mode (2026) — calibrated trust, not maximal trust

- **Why:** ~**93%** of permission prompts get approved → approval fatigue. [source](https://www.anthropic.com/engineering/claude-code-auto-mode)
- **How:** 3 tiers — (1) safe allowlist, (2) in-project file ops (VCS-reviewable), (3) everything
  else → a transcript classifier that sees *only your messages + the action* (so the agent can't
  rationalize itself into approval).
- **Caveat:** ~**17% false-negative** rate — ~1 in 6 risky actions slip through. *Not a
  replacement for human review on high-stakes infra.*
- **Enable:** `claude auto-mode defaults`.
