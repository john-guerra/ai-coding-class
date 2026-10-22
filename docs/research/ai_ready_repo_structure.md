# AI-Ready Repo Structure for Project 2 — Research Reference

**Compiled:** 2026-10-22 · **Course:** CS 6983 Vibe Coding (Fall 2026) · **For:** P2 pairs (full-stack, Antigravity first, Claude Code later, partners possibly on Cursor / VS Code Copilot / Windsurf)
**Builds on:** [`AI-CODING-READINESS-CHECKLIST.md`](AI-CODING-READINESS-CHECKLIST.md) (tiered harness checklist — this doc does not repeat it) ·
[`spec-driven-development.md`](spec-driven-development.md) (spec → plan lifecycle, `specs/` / `plans/` / `completed_plans/`) ·
`ai-coding-readiness` design doc (`/Users/aguerra/workspace/ai-coding-readiness/docs/specs/2026-08-15-ai-coding-readiness-design.md`, checks `guide.exists`, `guide.commands`, `guide.context-budget`, and its §8 "mechanical rules gate, model judgment advises").

**Labels used below.**
- **[SOURCED]** — a vendor/standard page states it; URL + short quote given (fetched 2026-10-22).
- **[SYNTHESIS]** — my recommendation, derived from sourced facts and the local docs above.
- **[UNVERIFIED]** — I could not confirm it on a current primary page.

**How quotes were captured.** Claude Code quotes come from the raw page text (saved fetch). Quotes for the other vendors were extracted by the fetch tool from the live page; they are short and were requested verbatim, but treat them as "quoted via fetch," and re-open the URL before putting one on a slide.

---

## 0. TL;DR

1. **`AGENTS.md` at the repo root is the one shared memory file.** Every tool the pair might use reads it natively today (Antigravity, Cursor, VS Code Copilot, GitHub Copilot cloud agent, Windsurf/Devin Desktop, and Claude Code ≥ v2.1.277). [SOURCED, §1]
2. **Don't copy it into tool-specific files.** No `GEMINI.md`, no `.github/copilot-instructions.md`, no duplicate in `.agents/rules/`, unless a file holds something genuinely tool-specific. Several tools *add up* every file they find, so a copy costs context twice and the two copies drift apart. [SYNTHESIS from SOURCED additive-loading quotes]
3. **The one thin pointer worth adding is `CLAUDE.md` containing `@AGENTS.md`**, plus any Claude-only notes, added in W9 when the pair moves to Claude Code. [SOURCED + SYNTHESIS, §1.4]
4. **Project docs (PRD, design, ADRs, sprints) go under `docs/`, not in memory files.** Memory files *point* to them. Only rules every session needs are loaded on every turn. [SYNTHESIS, grounded in size guidance §2.3]
5. **Change memory files through PRs, like code**, and review them at every sprint retro. [SYNTHESIS, §3]

---

## 1. What each tool actually loads (verified 2026-10-22)

### 1.1 Summary table

| Tool | Reads root `AGENTS.md`? | Nested `AGENTS.md`? | Tool-specific location | Size guidance |
|---|---|---|---|---|
| **Antigravity** | Yes | Yes. Walks up from the file's folder to the workspace root | `.agents/rules/*.md` (frontmatter required); `GEMINI.md`; legacy `.agent/rules/` | 24,000 bytes per file; 20,000-token shared budget |
| **Cursor** | Yes | Yes, combined with parents, more specific wins | `.cursor/rules/*.mdc` | "under 500 lines" per rule |
| **VS Code Copilot** | Yes (on by default) | Experimental, **off by default** | `.github/copilot-instructions.md`, `*.instructions.md` | No number; "short and self-contained" |
| **GitHub Copilot (github.com / cloud agent)** | Yes | Yes, nearest wins | `.github/copilot-instructions.md`, `.github/instructions/**/*.instructions.md` | No general limit stated |
| **Claude Code** | Yes, **only if there is no CLAUDE.md** (v2.1.277+) | Yes, on demand | `CLAUDE.md`, `.claude/rules/`, `.claude/skills/` | "under 200 lines per CLAUDE.md file" |
| **Windsurf / Devin Desktop** | Yes (always on at root) | Yes, as a `<dir>/**` glob rule | `.devin/rules/*.md` (legacy `.windsurf/rules/`, `.windsurfrules`) | 12,000 chars per workspace rule file |

### 1.2 Antigravity [SOURCED] — https://antigravity.google/docs/rules

- AGENTS.md and GEMINI.md in any folder: "You can place an AGENTS.md or GEMINI.md file" (and "a .agents/rules/ directory") "in any subdirectory of your project."
- Nested resolution: "it walks up the directory tree from that file's folder to the workspace root, loading rules at each level"; "Antigravity combines all discovered rules across global, workspace, and directory scopes into the prompt"; "When instructions conflict, more specific directory rules take priority."
- No frontmatter in AGENTS.md: "AGENTS.md and GEMINI.md do not use frontmatter." By contrast: "Every .md file inside rules/ must start with YAML frontmatter declaring a valid trigger."
- Only the top level of `.agents/rules/` is scanned: "Antigravity scans only immediate .md children inside .agents/rules/"; "Antigravity ignores files nested in subdirectories" (unless registered in `.agents/rules.json`).
- Legacy path still read: "(and legacy `<dir>/.agent/rules/*.md`)".
- Activation modes: always_on ("injects the full content into the system prompt on every turn"), model_decision ("injects only the rule's path and description upfront"), glob, manual ("never loads these rules automatically").
- Limits: "Antigravity truncates any single rule file that exceeds 24,000 bytes"; "All active global and always_on rules share a 20,000-token budget"; "Antigravity automatically demotes the largest rule files from inline text to lightweight pointers".
- Rule vs skill: "Write a rule for constraints and invariants," "Write a skill for multi-step workflows." And: "Prefer placing `always_on` rules directly in `AGENTS.md` when you do not need frontmatter."
- Global (personal, never committed): "~/.gemini/AGENTS.md, ~/.gemini/GEMINI.md, …" and "~/.gemini/config/rules/*.md".
- Skills — https://antigravity.google/docs/skills: "`<workspace-root>/.agents/skills/<skill-folder>/`" and "Antigravity defaults to `.agents/skills`, but still maintains backward compatibility for `.agent/skills`."
- **No mention of `.antigravityrules`** on the rules page (consistent with commit `fd02cc9`).
- [UNVERIFIED] What Antigravity does when `AGENTS.md` and `GEMINI.md` sit in the same folder and conflict. The page says only that rules are combined.

### 1.3 Cursor [SOURCED] — https://cursor.com/docs/context/rules

- "Stored in `.cursor/rules`, version-controlled and scoped to your codebase."
- "Project rules must use the `.mdc` extension." "A plain `.md` file in `.cursor/rules` is ignored by the rules system because it has no frontmatter".
- "Cursor supports AGENTS.md in the project root and subdirectories." "Instructions from nested `AGENTS.md` files are combined with parent directories," "with more specific instructions taking precedence."
- Size: "Keep rules under 500 lines"; "Split large rules into multiple, composable rules".
- User Rules are personal: "User Rules are global preferences defined in **Customize → Rules** that apply across all projects."
- [UNVERIFIED] Status of legacy `.cursorrules`. The current page does not mention it.

### 1.4 Claude Code [SOURCED] — https://code.claude.com/docs/en/memory

- **Native AGENTS.md (new):** "Claude Code can read `AGENTS.md` as your project instructions, so a repository already set up for other coding agents works without adding a `CLAUDE.md`, an import, or a setting." "Reading `AGENTS.md` directly requires Claude Code v2.1.277 or later."
- **But it's either/or by default:** "By default, Claude reads `AGENTS.md` only when you have no `CLAUDE.md` in your working directory or above it." `CLAUDE.md`, `.claude/CLAUDE.md` and `CLAUDE.local.md` all count.
- **Gotcha for pairs:** "Because `CLAUDE.local.md` counts, adding one to keep your own uncommitted instructions in a project that relies on `AGENTS.md` stops Claude from reading `AGENTS.md` for you."
- **The robust pattern:** "putting an `@AGENTS.md` import in a `CLAUDE.md` next to it … Add any Claude-specific instructions below the import". "Keeping the import never makes Claude read `AGENTS.md` twice". A symlink also works: "A `CLAUDE.md` symlinked to `AGENTS.md`: nothing, or delete the symlink. Either way Claude reads the content once."
- Pointer in prose is weak: "A `CLAUDE.md` that tells Claude in words to read `AGENTS.md`: Claude sees `AGENTS.md` only if it decides to open the file."
- Nested files: "CLAUDE.md and CLAUDE.local.md files in the directory hierarchy above the working directory are loaded at launch. Files in subdirectories load on demand." "All discovered files are concatenated into context rather than overriding each other."
- Size: "target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence." "Imports help you organize a long file but don't reduce its context cost, because imported files also load at launch."
- Path-scoped rules: `.claude/rules/*.md` with a `paths:` field. "Rules without a `paths` field are loaded unconditionally"; "A path-scoped rule loads when Claude uses the Read, Write, or Edit tool on a matching file."
- Not enforcement: "Claude treats them as context, not enforced configuration. To block an action regardless of what Claude decides, use a PreToolUse hook".
- When to add: "Claude makes the same mistake a second time"; "A code review catches something Claude should have known about this codebase".
- Personal file: "`./CLAUDE.local.md` | Personal project-specific preferences; add to `.gitignore`".
- Hygiene: "Review your CLAUDE.md files … periodically to remove outdated or conflicting instructions"; `/doctor prompt-audit` "looks for problems such as instructions written for older models, references to files or commands that don't exist, and files that contradict each other."
- Skills — https://code.claude.com/docs/en/skills: project skills live at "`.claude/skills/<skill-name>/SKILL.md` … Commit it so your team gets it too". "**Custom commands have been merged into skills.**" Skills "follow the Agent Skills open standard".

### 1.5 VS Code Copilot [SOURCED] — https://code.visualstudio.com/docs/copilot/customization/custom-instructions

- "Place the primary file at the repository root." `chat.useAgentsMdFile` "is enabled by default."
- Nested: "**Nested AGENTS.md files** is experimental and might change or be removed." "The nested-file setting is disabled by default."
- Additive, with no ordering: "Applicable instruction sources are additive." "there is no general precedence order between these files." "Do not depend on a file order or precedence rule to resolve conflicts."
- VS Code also reads `CLAUDE.md`: "For Anthropic Claude sessions, use `CLAUDE.md` at the repository root" (controlled by `chat.useClaudeMdFile`; default not stated, **[UNVERIFIED]**).
- [UNVERIFIED] Whether VS Code expands Claude's `@AGENTS.md` import syntax inside `CLAUDE.md`. Assume it does not. A thin `CLAUDE.md` then adds only its few Claude-specific lines to Copilot's context, which is harmless if they stay short.
- What to leave out: "Focus on non-obvious rules. Skip conventions that standard linters or formatters already enforce." "Keep your instructions short and self-contained."

### 1.6 GitHub Copilot on github.com / cloud agent [SOURCED] — https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions

- `AGENTS.md` files can be "stored anywhere within the repository"; "the nearest `AGENTS.md` file in the directory tree will take precedence."
- Alternatives: "a single `CLAUDE.md` or `GEMINI.md` file stored in the root of the repository."
- Size: no general limit. GitHub's own sample prompt says "Instructions must be no longer than 2 pages" and "Instructions must not be task specific."

### 1.7 Windsurf / Devin Desktop [SOURCED]

Windsurf docs now redirect to docs.devin.ai (observed: `docs.windsurf.com/...` → 307 → `docs.devin.ai/desktop/...`).
- https://docs.devin.ai/desktop/cascade/agents-md: "All `AGENTS.md` files within your workspace and its subdirectories are discovered". At the root, "the full content is included in Cascade's system prompt on every message." A subdirectory file is "Treated as a glob rule with an auto-generated pattern of `<directory>/**`". The page "feeds it into the same Rules engine that powers `.devin/rules/` (and the legacy `.windsurf/rules/`)". "Both `AGENTS.md` and `agents.md` are recognized".
- https://docs.devin.ai/desktop/cascade/memories: "`.devin/rules/*.md` (preferred) or `.windsurf/rules/*.md` (fallback)". "Workspace rule files are limited to 12,000 characters each." Global: "Limited to 6,000 characters." Advice: "Keep rules simple, concise, and specific." "There's no need to add generic rules". Auto-memories "are not committed to your repository", which is the reason shared knowledge must live in `AGENTS.md`.

### 1.8 The AGENTS.md standard [SOURCED] — https://agents.md/

- "A simple, open format for guiding coding agents." "AGENTS.md is just standard Markdown." No required fields.
- Suggested sections: "Project overview", "Build and test commands", "Code style guidelines", "Testing instructions", "Security considerations", plus PR guidelines and deployment steps.
- Nested: "The closest AGENTS.md to the edited file wins; explicit user chat prompts override everything."
- Migration: "Rename existing files to AGENTS.md and create symbolic links for backward compatibility."
- Governance: "AGENTS.md is now stewarded by the Agentic AI Foundation under the Linux Foundation."

### 1.9 GitHub repo plumbing [SOURCED]

- Workflows: "Workflows are defined in the `.github/workflows` directory in a repository." "Workflows are defined by a YAML file checked in to your repository" — https://docs.github.com/en/actions/writing-workflows/about-workflows
- Issue templates and forms: "create a file called `.github/ISSUE_TEMPLATE/FORM-NAME.yml`". Config goes in "`.github/ISSUE_TEMPLATE/config.yml`" — https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository
- PR template: "name the pull request template `.github/pull_request_template.md`" (root and `docs/` also allowed) — https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository
- ADRs (Nygard): "We will keep ADRs in the project repository under doc/arch/adr-NNN.md". "The whole document should be one or two pages long." "If a decision is reversed, we will keep the old one around, but mark it as superseded." "Numbers will not be reused." — https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions

---

## 2. Recommended P2 repo tree [SYNTHESIS]

The tree is tool-neutral. `AGENTS.md` is the shared source. Tool-specific files exist only when they hold tool-specific content. Paths and filenames under `docs/` are a **course convention** I'm proposing, not a vendor requirement (except where a § reference is given).

```
p2-<app-name>/
├── AGENTS.md                      # THE shared memory file (§1). ≤ ~150 lines. Read natively by
│                                  #   Antigravity, Cursor, Copilot, Windsurf, Claude Code (if no CLAUDE.md).
├── CLAUDE.md                      # Add in W9: "@AGENTS.md" + Claude-only notes (§1.4). Or omit/symlink.
├── README.md                      # For humans: what it is, live URL, setup, scripts, links into docs/.
├── .gitignore                     # .env*, CLAUDE.local.md, .claude/settings.local.json, node_modules, .next, coverage
├── .env.example                   # Names of required env vars, NO values. (Real values: host + GH secrets.)
├── package.json / lockfile        # One-command scripts: dev, test, test:e2e, lint, build (readiness Tier 0)
│
├── .agents/                       # Antigravity (§1.2) — only if you need scoped/optional rules
│   ├── rules/                     #   flat; each file needs `trigger:` frontmatter
│   │   └── api-routes.md          #   e.g. trigger: glob, globs: src/app/api/**  (NOT a copy of AGENTS.md)
│   └── skills/<name>/SKILL.md     #   multi-step workflows (e.g. "add an endpoint end-to-end")
├── .cursor/rules/*.mdc            # Cursor-only partner: scoped rules if needed; else rely on AGENTS.md
├── .claude/                       # Claude Code (W9+)
│   ├── settings.json              #   shared permission baseline/hooks (committed)
│   ├── rules/*.md                 #   path-scoped rules with `paths:` frontmatter
│   └── skills/<name>/SKILL.md     #   same Agent Skills format as .agents/skills
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                 # lint → unit → integration → build → E2E; security scan
│   │   └── deploy.yml             # preview per PR + production on main (or host's Git integration)
│   ├── ISSUE_TEMPLATE/
│   │   ├── user-story.yml         # "As a… I want… so that…" + acceptance criteria + estimate
│   │   ├── bug.yml                # repro steps, expected vs actual
│   │   └── config.yml
│   ├── pull_request_template.md   # Closes #, what/why, tests added (red first?), AI usage note, checklist
│   ├── dependabot.yml
│   └── CODEOWNERS                 # optional: both partners on AGENTS.md / docs/
│
├── docs/
│   ├── PRD.md                     # Product: problem, personas, user stories, out of scope (the "what")
│   ├── research/                  # Mom Test notes + summary (HW2), raw interview notes
│   ├── design/
│   │   ├── design.md              # UI system: tokens, components, screens; links mockups
│   │   └── mockups/               # images/Figma exports the agent can be pointed at
│   ├── architecture.md            # diagram (Mermaid) + DB schema diagram (P2 doc requirements)
│   ├── api/openapi.yaml           # Public API docs (P2 requirement)
│   ├── decisions/                 # ADRs: 0001-use-postgres.md … (Nygard format, never renumber)
│   ├── specs/                     # per-feature SPEC.md when a feature needs one (spec-driven-development.md)
│   ├── plans/ → completed_plans/  # agent plans; move on merge (spec-driven-development.md §6)
│   ├── sprints/
│   │   ├── sprint-1/planning.md   # goal, committed issues, estimates
│   │   ├── sprint-1/standups.md   # dated entries, 3+ per partner
│   │   └── sprint-1/retro.md      # incl. "memory-file changes" section (§4)
│   ├── contributions.md           # partner contribution log (P2 requirement)
│   └── AGENT-NOTES.md             # optional: traps & gotchas too long for AGENTS.md (readiness Tier 1)
│
├── src/ (or app/ + server/)       # code; a nested AGENTS.md only if a subtree truly has different rules
│   └── server/AGENTS.md           #   e.g. backend-only conventions (note: VS Code nested is off by default)
├── tests/unit/  tests/integration/
└── e2e/                           # Playwright specs
```

**Why this shape:**
- **One shared file, no copies.** Antigravity "combines all discovered rules," VS Code says sources "are additive," and Claude Code "concatenate[s]." A copy in `.agents/rules/` (always_on) plus `AGENTS.md` loads twice in Antigravity and drifts later. [SYNTHESIS from §1 quotes]
- **Tool dirs hold only what `AGENTS.md` can't express.** That means glob- or path-scoped rules, skills, and permissions. A rule for `src/app/api/**` is the typical case. [SYNTHESIS]
- **`docs/` is linked, not loaded.** Every tool charges always-on context against a budget: Antigravity 20,000 tokens, Claude "under 200 lines", Cursor "under 500 lines", Windsurf 12,000 chars. A PRD and sprint logs would blow it, so `AGENTS.md` names *where* they are and agents open them on demand, or students @-mention them. [SYNTHESIS from §1 limits; same reasoning as the readiness design doc's `guide.context-budget`]
- **Nested `AGENTS.md` is a P2 edge case.** VS Code ignores nested files by default, so a rule that only lives in `server/AGENTS.md` silently disappears for a Copilot partner. Prefer root `AGENTS.md` plus scoped tool rules, or accept the gap. [SYNTHESIS from §1.5]
- **Do not add `GEMINI.md` or `.github/copilot-instructions.md`.** They are allowed, but redundant once `AGENTS.md` exists, and VS Code warns there is "no general precedence order." [SYNTHESIS]
- **Claude Code transition (W9):** create `CLAUDE.md` = `@AGENTS.md` + a short "Claude Code" section. This is more robust than relying on native reading, because a partner's personal `CLAUDE.local.md` would otherwise switch `AGENTS.md` off for them (§1.4 quote). [SYNTHESIS from SOURCED]

---

## 3. What goes in each file — and what must not

| File | Put in | Keep out | Size |
|---|---|---|---|
| `AGENTS.md` | 1-paragraph overview + live URL · stack and versions · exact commands (`npm test`, `npm run test:e2e`, `npm run lint`) · folder map · 5–10 non-obvious conventions (API error shape, auth middleware location, DB access layer) · TDD rule ("commit failing test first") · git/PR rules (branch-per-issue naming, "Closes #N") · guardrails (never touch `.env`, never run migrations against prod, never disable tests) · "Where docs live" links | Secrets, tokens, connection strings · personal prefs ("be concise with me") → personal global file · things the linter enforces (VS Code: "Skip conventions that standard linters or formatters already enforce") · generic advice (Windsurf: "no need to add generic rules") · the PRD, tutorials, pasted docs · task-specific instructions (GitHub: "must not be task specific") · facts that rot (current version number, "we're on sprint 2") | Target ≤ 150–200 lines. Strictest sourced bound: Claude "under 200 lines"; Antigravity truncates at 24,000 bytes |
| `CLAUDE.md` | `@AGENTS.md` + Claude-only items (plan-mode triggers, hooks, skill names) | Anything that applies to all tools (put it in AGENTS.md) | A few lines |
| `.agents/rules/*.md`, `.cursor/rules/*.mdc`, `.claude/rules/*.md` | Path- or glob-scoped rules (frontend vs API vs tests) | A duplicate of AGENTS.md; nested subfolders under `.agents/rules/` (ignored) | Cursor "under 500 lines"; Windsurf 12,000 chars |
| `.agents/skills/`, `.claude/skills/` | Repeatable multi-step workflows ("Write a skill for multi-step workflows") | One-line rules | — |
| `docs/PRD.md` | Problem, personas, user stories with acceptance criteria, non-goals | Implementation detail (that's the plan) | 1–3 pages [SYNTHESIS] |
| `docs/design/design.md` | Tokens, component inventory, screen list, mockup links | Code | — |
| `docs/decisions/NNNN-*.md` | Context / Decision / Status / Consequences | Edits to accepted ADRs; supersede instead (Nygard) | "one or two pages" |
| `docs/sprints/*` | Planning, standups, retro | Duplicating issue bodies; link issues | — |
| `.env.example` | Variable names + comment | Any real value | — |

**Secrets rule [SYNTHESIS, consistent with readiness checklist Tier 1 "No secrets in the repo"]:** memory files are committed and are read into third-party model context on every turn. A secret in `AGENTS.md` is a secret leaked twice. Real values go in the host dashboard and GitHub Actions secrets only.

**Rules that must hold mechanically [SOURCED + SYNTHESIS]:** Claude's docs say memory is "not enforced configuration". The readiness design doc's §8 says "Mechanical rules gate. Model judgment advises." So "tests must pass" and "lint clean" belong in CI and branch protection, with `AGENTS.md` merely stating them. Don't rely on the prose alone.

---

## 4. Keeping the files current (pair workflow) [SYNTHESIS]

1. **Edit by PR only.** Memory-file changes go through a branch and a partner review like code. Use the PR label `agent-memory`, and optionally list both partners in `CODEOWNERS` for `AGENTS.md`, `.agents/`, `.claude/`, `.cursor/` and `docs/decisions/`. This makes "Shared rules file maintained by both partners" (P2 rubric, 2 pts) visible in GitHub.
2. **Trigger: the second mistake.** Add a line when an agent repeats an error, or when a PR review catches something it should have known. This is Claude Code's own rule ("Claude makes the same mistake a second time"; "A code review catches something…"). Put the fix in the same PR that fixes the bug.
3. **Sprint retro has a fixed agenda item, "memory-file review"** (~10 min):
   - Delete stale lines: renamed commands, removed folders, finished decisions.
   - Promote repeated chat corrections into the file.
   - Move anything that grew long into `docs/` or a scoped rule.
   - Re-check the size budget (`wc -l AGENTS.md`).
   - Record the diff in `retro.md`.
   - Anthropic recommends periodic review ("remove outdated or conflicting instructions"). Claude users can run `/doctor prompt-audit`.
4. **Decisions become ADRs, not memory lines.** `AGENTS.md` holds the one-line rule ("Use Prisma for all DB access, see ADR-0003"). The ADR holds the why.
5. **Plans and specs move on merge** (`plans/` → `completed_plans/`), per spec-driven-development.md §6. A stale "what's next" folder misleads agents.
6. **Personal stuff stays personal:**
   - Antigravity: `~/.gemini/AGENTS.md`.
   - Cursor: User Rules.
   - Claude: `~/.claude/CLAUDE.md`. Prefer this over `CLAUDE.local.md` if relying on native AGENTS.md (§1.4 gotcha).
   - Windsurf: `global_rules.md`.

---

## 5. Worked examples: the instructor's own repos (read via `gh api`, 2026-10-22)

| Repo | Memory files | Project docs | CI / quality |
|---|---|---|---|
| **john-guerra/vis-paper-planner** (Antigravity, Feb 2026, Next.js/Vercel) | `AGENTS.md` (41 lines) is a **symlink** (git mode 120000) to `.agents/rules/rules.md` (corrected 2026-10-22; an earlier `diff` compared the resolved content). The file starts with `trigger: always_on` frontmatter | `project_memory/PRD.md`, `mom_test_notes.md`, `mom_test_summary.md`, dataset CSV | `.husky/pre-commit` (`npx lint-staged`), `e2e/`, vitest + playwright configs; **no `.github/workflows/`** |
| **john-guerra/feedback-town** (Antigravity, Feb 2026, Next.js + Supabase) | `.agent/rules/agents.md` (legacy singular `.agent/`); **no root `AGENTS.md`** | `.agent/prd.md` (status + last-updated header) | `.github/workflows/ci.yml` + `playwright.yml`; `supabase/migrations/` |
| **john-guerra/autoPhotoOrganizer** (summer 2026, Claude Code) | `CLAUDE.md` (438 lines) `@`-imports `docs/UI-CONTRACTS.md` (400), `docs/AGENT-NOTES.md` (619), `docs/TESTING.md` (164); `AGENTS.md` (71) is a summary that points to CLAUDE.md as authoritative | `docs/ROADMAP.md`, dated reviews, `docs/superpowers/{specs,plans,completed_plans}`, CHANGELOG | `.claude/settings.json` (read-only allowlist), `.claude/skills/working-issues/`, workflows ci/codeql/release/pr-closeout, `dependabot.yml` |

**What each gets right:**
- vis-paper-planner keeps product discovery in the repo: the PRD and Mom Test notes and summary sit next to the code, so the agent can be pointed at them. This is the P2 pattern to copy. In the recommended tree it moves to `docs/PRD.md` and `docs/research/`.
- feedback-town has real CI (two workflows) and versioned DB migrations, and its PRD carries a "Status / Last Updated" header that fights staleness.
- autoPhotoOrganizer shows the mature end of the range: a shared `.claude/settings.json`, a checked-in skill, CodeQL plus Dependabot, a plan lifecycle, and the explicit rationale for importing *binding* docs while leaving history as links.

**What a P2 pair should not copy (each judged against §1):**
- **vis-paper-planner symlink.** `AGENTS.md` is a symlink to `.agents/rules/rules.md`, so the two cannot drift, but Antigravity may load the same rules twice ("combines all discovered rules") **[UNVERIFIED whether it dedupes a symlinked file]**. Also, Antigravity says "AGENTS.md and GEMINI.md do not use frontmatter," so the `trigger: always_on` block in `AGENTS.md` is unneeded at best. Other tools would read it as literal text **[UNVERIFIED how each tool treats it]**.
- **feedback-town `.agent/` vs `.agents/`.** Current Antigravity docs default to `.agents/` and list `.agent/rules/` only as "legacy" ("backward compatibility for `.agent/skills`"). And because there is no root `AGENTS.md`, a Cursor, Copilot, Windsurf or Claude partner gets **none** of these rules: `.agent/rules/` is Antigravity-only. The PRD inside a tool's hidden config dir is also invisible to humans and other tools. Put it in `docs/`.
- **autoPhotoOrganizer budget and direction.** About 1,600 always-loaded lines against Claude's "under 200 lines" target ("Imports … don't reduce its context cost"). It was a deliberate trade-off in a solo, Claude-only, multi-agent repo, and it is wrong for a P2 pair on mixed tools. Its `AGENTS.md` → `CLAUDE.md` direction also inverts the portable pattern. Non-Claude partners get only the 71-line summary. Under Claude Code's new native reading, the presence of `CLAUDE.md` means `AGENTS.md` itself is not read directly (fine here, since CLAUDE.md is the superset). For P2, invert it: substance in `AGENTS.md`, `CLAUDE.md` = `@AGENTS.md` + extras.

---

## 6. Student checklist — repo setup "Done when…" [SYNTHESIS]

- [ ] `AGENTS.md` exists at the root, with no frontmatter. It has overview, stack, exact commands, folder map, conventions, TDD + PR rules, guardrails, and "where docs live". It is **under 200 lines**, and both partners have commits on it.
- [ ] No duplicate copies: no `GEMINI.md`, no `copilot-instructions.md`, and nothing in `.agents/rules/` that repeats `AGENTS.md`. Tool dirs hold only scoped rules or skills.
- [ ] Any `.agents/rules/*.md` has `trigger:` frontmatter and sits directly in `.agents/rules/` (not a subfolder). Any Cursor rule is `.mdc`.
- [ ] Each partner has opened the repo in their own tool and confirmed it loaded `AGENTS.md`. For example, ask the agent "What test command does this repo use?" and get the exact answer. In Claude Code, `/context` lists it under Memory files.
- [ ] `.gitignore` covers `.env*` (except `.env.example`), `CLAUDE.local.md`, `.claude/settings.local.json`, and build output. `git grep -i "secret\|password\|api_key"` finds nothing real.
- [ ] `npm test`, `npm run test:e2e`, `npm run lint` and `npm run build` each work from a fresh clone, and are named verbatim in `AGENTS.md`.
- [ ] `docs/PRD.md` with user stories + acceptance criteria, `docs/research/` (Mom Test), `docs/design/design.md`, `docs/architecture.md` (diagram + schema), and `docs/decisions/0001-*.md` for your DB/auth choice all exist.
- [ ] `.github/ISSUE_TEMPLATE/` (user story + bug), `.github/pull_request_template.md`, and `.github/workflows/ci.yml` running lint → tests → build → E2E + security scan on every PR exist. Deploy previews are wired.
- [ ] Branch protection on `main` requires a green CI and one partner review.
- [ ] `docs/sprints/sprint-1/` has planning, standups and retro files, and the retro template contains a "memory-file review" item.
- [ ] (W9) `CLAUDE.md` containing `@AGENTS.md` is added via PR when the pair starts Claude Code.

---

## 7. Gaps vs. current course materials (for the instructor)

- **`course/projects/project2-full-stack.md` still says** "Shared rules file (`.antigravityrules` or equivalent)". **`course/assignments/hw3-context-engineering.md`** (lines 36, 88) says "`.antigravityrules` (or `CLAUDE.md` / `.cursorrules`)". Antigravity's rules page no longer mentions `.antigravityrules`, and decks 06/08 now teach `AGENTS.md`. The specs disagree with the decks. (Not edited here, per scope.)
- **Deck claim "AGENTS.md works in all the IDE tools above"** (06, line 417) holds for **root** files. **Nested** AGENTS.md is off by default in VS Code Copilot (§1.5), so a subdirectory claim would need a caveat.
- **Claude Code reading AGENTS.md natively** (v2.1.277+) is newer than the "even a thin `AGENTS.md` that points to your `CLAUDE.md`" advice in `AI-CODING-READINESS-CHECKLIST.md` (Portability). The direction should now be reversed: substance in AGENTS.md, CLAUDE.md imports it. Watch the `CLAUDE.local.md` gotcha.
- Deck 06 line 411 says Antigravity reads "`AGENTS.md`, `GEMINI.md`, `.agents/rules/`". That is correct, and decks could add that `.agent/` (singular) is legacy.
- Cursor's current page says project rules "must use the `.mdc` extension". Deck 06 line 413 says just `.cursor/rules/`, which is fine but could name `.mdc`.

---

## 8. Sources (all fetched 2026-10-22)

| # | Source | URL |
|---|---|---|
| 1 | Antigravity — Rules | https://antigravity.google/docs/rules |
| 2 | Antigravity — Skills | https://antigravity.google/docs/skills |
| 3 | Cursor — Rules | https://cursor.com/docs/context/rules |
| 4 | VS Code — Custom instructions | https://code.visualstudio.com/docs/copilot/customization/custom-instructions |
| 5 | GitHub Docs — Repository custom instructions for Copilot | https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions |
| 6 | Claude Code — Memory (CLAUDE.md, AGENTS.md, rules) | https://code.claude.com/docs/en/memory |
| 7 | Claude Code — Skills | https://code.claude.com/docs/en/skills |
| 8 | Devin Desktop (ex-Windsurf) — AGENTS.md | https://docs.devin.ai/desktop/cascade/agents-md |
| 9 | Devin Desktop (ex-Windsurf) — Memories & Rules | https://docs.devin.ai/desktop/cascade/memories |
| 10 | AGENTS.md standard | https://agents.md/ |
| 11 | GitHub Docs — About workflows | https://docs.github.com/en/actions/writing-workflows/about-workflows |
| 12 | GitHub Docs — Issue templates | https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository |
| 13 | GitHub Docs — PR template | https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository |
| 14 | Nygard, "Documenting Architecture Decisions" (2011) | https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions |
| 15 | Example repos (read-only, `gh api`) | github.com/john-guerra/{vis-paper-planner, feedback-town, autoPhotoOrganizer} |

**Numbers in this doc:** 24,000 bytes and 20,000 tokens (src 1); 500 lines (src 3); 200 lines and v2.1.277 (src 6); 12,000 and 6,000 chars (src 9); "2 pages" (src 5); line counts of the example repos' files (src 15, `wc -l` on 2026-10-22). Everything else is unnumbered or labeled [SYNTHESIS].
