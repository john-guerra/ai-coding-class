# Workshop — "Agentic Engineering: Speed With Quality"

A hands-on workshop on AI-assisted software engineering for **professional developers**, distilled
from the CS 7180 "Vibe Coding" course. Delivered as **4 sessions × 2 hours**.

## Structure

| Session | Title | Focus | Hands-on |
|---|---|---|---|
| **1** | Fundamentals & Prompting | LLM basics by doing · the 3 harnesses compared (≥30 min) · prompt engineering | Prompt lab (no setup needed) |
| **2** | Context, Memory & Modes | CLAUDE.md hierarchy · `@`-mentions · `/clear`/`/compact` · modes tour incl. **auto mode** | CLAUDE.md build-along |
| **3** | Build & Verify + Skills/Hooks | Spec authoring (interview → `SPEC.md`) · Explore-Plan-Implement-Commit · TDD ("do not modify the tests") · the 70% problem | Spec lab + TDD build-along + skills/hooks lab |
| **4** | MCP, Subagents & Security | MCP servers · subagents · plugins (awareness) · security audit + lethal trifecta | MCP build-along + oral-defense capstone |

**Through-line:** the *buildable* Claude Code layer, with strong fundamentals up front and
verification discipline throughout. **Session 1 needs no setup**; Sessions 2–4 build one small
project ("Linkstash") end to end.

## Files

- `index.html` — the **landing hub** (hand-authored, self-contained; deployed as the site root).
- `session1/index.md` … `session4/index.md` — reveal-md decks (one per session).
- `handouts/*.md` — seven participant reference cards, published as **standalone printable HTML** (via `build-handouts.mjs`), not reveal.js decks.
- `build-handouts.mjs` — renders the handout Markdown into the Ink & Ochre printable template.
- `facilitator-guide.md` — run-of-show with timings, talking points, and cut-lines. **Facilitator-only — stripped from the public build** (see Deploying).
- Reference: `../../docs/research/claude_code_modes_2026.md` — modes / auto mode grounding.

## Running the slides

From `slides/`:

```bash
npm run serve      # live-reload dev server (reveal-md . --watch)
npm run build      # static build to dist/
```

Decks use the repo's shared reveal-md config (`slides/reveal-md.json`) and branding
(`slides/css/style.css`). Slide separators: `---` (horizontal), `<!-- vertical -->` (vertical).

## Deploying

**Live:** https://johnguerra.co/lectures/aiCoding_workshop/

From `slides/`:

```bash
npm run build:workshop    # self-contained static build → dist-workshop/ (assets bundled under _assets/)
npm run deploy:workshop   # build + rsync to johnguerra:/var/www/lectures/aiCoding_workshop/
```

The build serves the `workshop/` folder as its own root. The hand-authored `index.html` hub is
copied in as the site root; sessions live at `/session1/` … `/session4/` and handouts render as
printable HTML at `/handouts/`. Deck links use directory-style paths (`session1/`) that resolve in
both the dev server and the static build, and the facilitator guide + internal READMEs are
**stripped** so they never ship publicly.

## Done

- **[Linkstash starter repo](https://github.com/john-guerra/linkstash)** — small link-saver with a
  built-in lethal-trifecta surface, a tested URL-validation core, real dependencies, an
  `npm run setup` smoke test, and one planted subtle bug. Students clone it directly.
- **Participant handouts** (6, printable HTML) — harness fundamentals · prompt-anatomy · memory &
  modes · security card · slopsquatting checklist · personal AI-use framework worksheet.
- **Landing hub** — `index.html`, linking sessions · handouts · the Linkstash repo.
