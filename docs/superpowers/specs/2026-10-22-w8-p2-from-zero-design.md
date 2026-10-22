# W8 "Building P2 from Zero" — Design

**Date:** 2026-10-22 · **Status:** reviewed (builder check done), awaiting instructor approval
**Teaching dates:** Week 8 — Oakland Tue Oct 27 (one 100-min session), San Jose Wed Oct 28 (half of the 3h20m session). Five days from this doc.

## Intent

Students are about to start Project 2 (`course/projects/project2-full-stack.md`), a pair-built full-stack app due Week 9. The spec says *what* to build; nothing in the course shows *how the pieces fit*, from an idea to a deployed app with rules files, a board, tests and CI. Most pairs have not started yet, so the first files they write (rules, memory, design) will set how the rest of P2 goes.

This session walks the whole course pipeline once, end to end, as a series of **checklists** (students like checklists), each backed by a real public repo they can open and copy: the instructor's **`john-guerra/vis-paper-planner`**.

## Goals

1. Students leave with a step-by-step checklist they can run against their own P2 repo, each step with "Done when…" items.
2. Every checklist step links to a git tag in vis-paper-planner showing that step finished.
3. Show the repo/memory-file layout for AI-assisted coding: one shared `AGENTS.md`, `CLAUDE.md` importing it, `DESIGN.md`, `docs/` for PRD, research, decisions and sprints.
4. Show the course's adapted Scrum encoded in the rules file and the GitHub board, not just on slides.
5. Give project-agnostic deployment pointers.
6. Fold the existing W8 topics (memory files, MCP, browser mode, debugging) into the step where each is used.

## Non-goals

- Building vis-paper-planner's real features (semantic search with transformers.js, UMAP scatterplot, reading lists, auth). They become open issues on the board.
- Requiring the Mom Test for P2. It is shown as optional.
- Changing P2 requirements or grading, beyond naming `AGENTS.md` in the rules-file wording.
- A live build from an empty folder in class.

## Anti-goals (failure even if it "works")

- Checklists that only make sense for this one app. Every item must be phrased for any P2.
- A reference repo that models the mistakes the slides warn against (duplicated rules files, Antigravity-only frontmatter in `AGENTS.md`, oversized memory files, secrets in git).
- Slides that overflow 960×700 or drop existing content silently (slide-layout skill rules apply).
- Claims about tool behavior or hosts with no current vendor source.

## Constraints

- Stack follows P2 and the existing PRD: Next.js (App Router) + TypeScript + Tailwind, **Supabase (Postgres)**, Vitest, Playwright, GitHub Actions, Vercel (already linked: https://vis-paper-planner.vercel.app).
- `john-guerra/vis-paper-planner` is public. **Instructor decision (2026-10-22): push the branch and each step's tag as it is finished**, before the PR merges. Rewriting issues, creating the board and creating the Supabase project still get a heads-up at the time. Nothing lands on `main` until the instructor approves the PR.
- **Instructor decision (2026-10-22): `AGENTS.md` counts as the shared rules file for HW3 and P2 grading.** The checklist and handout say so; the P2 spec and HW3 wording (`.antigravityrules` "or equivalent") get updated to name `AGENTS.md` while still accepting older names.
- Supabase keys and the Vercel env vars never go in git. `.env.example` lists names only.
- Course repo rules: decks follow Ink & Ochre + slide-layout; `website/` changes go through `index.pug`; don't push `homepageJohnGuerra` without approval.
- Facts come from the two research docs written today, which the slides cite:
  - `docs/research/design_md_research.md` (Google Labs DESIGN.md spec, alpha, Apache-2.0)
  - `docs/research/ai_ready_repo_structure.md` (folder tree; per-tool loading rules; the `CLAUDE.md`/`AGENTS.md` precedence trap, verified on code.claude.com/docs/en/memory)

## Part A — Reference repo (vis-paper-planner)

Current state (checked 2026-10-22): 4 commits on 2026-02-20; Next.js scaffold with Vitest, Playwright, ESLint, Prettier, Husky; `project_memory/` with `PRD.md`, `mom_test_notes.md`, `mom_test_summary.md`, `mockup.png` and the VisPubData CSV; `AGENTS.md` is a **symlink** to `.agents/rules/rules.md` (git mode 120000), whose content carries Antigravity `trigger: always_on` frontmatter. GitHub already has milestone "Sprint 1: Core Features" with open issues #1–#7 (Feb 2026; not in user-story format; #1 "Home / Search View" overlaps the slice). No Projects board, app features, database or CI.

One commit (or a few) per step, each ending at an annotated tag. The tags are what the slides link to.

| Tag | Checklist step | Changes |
|---|---|---|
| `step-0-idea` | Idea & brainstorm | Tag the existing initial commit. If a brainstorm transcript exists (instructor to check), add it as `docs/research/brainstorm.md`; otherwise the slide shows a prompt template only. |
| `step-1-plan` | Mom Test (optional) + PRD + user stories | `project_memory/` → `docs/prd.md`, `docs/research/mom-test-notes.md`, `docs/research/mom-test-summary.md`, `docs/design/mockup.png`, `data/` for the CSV. User stories with acceptance criteria in the PRD (add if missing). |
| `step-2-design` | DESIGN.md | `DESIGN.md` at the root in Google Labs format, derived from the mockup, passing `npx @google/design.md lint` (exact CLI per the research doc). Export its Tailwind theme. |
| `step-3-rules` | Rules & memory files | One `AGENTS.md` (no frontmatter, < ~200 lines): stack, commands, conventions, testing rule (failing test first), security don'ts, pointer to `DESIGN.md` and `docs/prd.md`, and a **Workflow** section encoding the course Scrum (rotating PO/SM per sprint, 1–2 week sprints, branch per issue, partner PR review, standups in `docs/sprints/`). Replace the symlink with a real `AGENTS.md` holding the contents (minus frontmatter) **before** removing `.agents/rules/rules.md`, or the link breaks; keep `.agents/` only for path-scoped rules if any. `CLAUDE.md` = `@AGENTS.md` + nothing Claude-specific yet. |
| `step-4-board` | Backlog & board | `.github/ISSUE_TEMPLATE/user-story.md` and `bug.md`, `.github/pull_request_template.md`, `docs/sprints/sprint-1/planning.md`. On GitHub *(my call)*: reuse the existing milestone and issues #1–#7, rewriting them as user stories with acceptance criteria; narrow #1 to the keyword-search slice (semantic search moves to #2). Add a Project board with Todo / In Progress / In Review / Done (deck 07's names). |
| `step-5-ci` | CI | `.github/workflows/ci.yml` as separate jobs/stages: lint + format → unit/integration → build → Playwright E2E, plus a security-scan job (dependency audit and/or CodeQL; P2 grades it). Runs on PRs and `main`. |
| `step-6-slice` | First feature, test-first | Issue "Keyword search over papers": Supabase table + migration + seed script loading the CSV; Next.js route handler `GET /api/papers?q=`; a search page styled from `DESIGN.md`. Commit order visible in history: failing unit/integration test → implementation → E2E test. *(my call)* Add `docs/api/openapi.yaml` for the one endpoint and `docs/sprints/sprint-1/retro.md` stub, since P2 grades both. Uses Supabase CLI locally; Supabase MCP or browser mode shown where natural. |
| `step-7-deploy` | Deploy | Vercel production + PR preview deploys; Supabase env vars set in Vercel; migration step documented; README "Run locally" and "Deploy" sections; `.env.example`. |

Deferred features stay as open issues so the board looks like a real project.

**Publishing *(my call)*:** merge the PR with a merge commit (not squash), so the tags stay on `main`'s history and the test-first commit order survives. Tags capture files only; issue and board state are shown by linking to GitHub directly.

**Supabase *(my call)*:** free tier. Slides rely on the tags, not the live URL; the README notes that a free project can be paused when idle and how to restore it (verify the current pause policy on Supabase's docs before writing it).

**Left to the builder:** table/column names, seed approach (script vs. SQL), test file layout, exact Prettier/ESLint fixes, README wording.

## Part B — W8 deck section (`slides/08_Advanced_IDE_AI/index.md`)

A new section **"Building P2 from Zero"**, about 75–85 minutes of a 100-minute Oakland session:

- **Overview slide:** the pipeline as one diagram (idea → research → PRD → design → rules → board → CI → slice → deploy), with the folder tree it produces.
- **Eight checklist slides, one per tag** (step 0 and step 1 can share a slide). Format: 4–7 "Done when…" checkbox items, written for any P2, then one line "See it: `step-N-…`" linking to the tag. Vertical sub-slides for any detail.
- **"P2 also requires" box** on the slides and handout *(my call)*: everything P2 grades that the reference repo doesn't show — auth, 2+ sprints with standups/retros/estimation, architecture and DB-schema diagrams, demo video, contribution log, individual reflections — so the checklist is never mistaken for the whole rubric.
- **Repo layout slide:** the tool-neutral tree from `ai_ready_repo_structure.md`.
- **Pitfalls slide:**
  - `CLAUDE.md` present ⇒ Claude Code ignores `AGENTS.md`, so import it instead.
  - Rules split across copies that drift (a symlink, as in vis-paper-planner, avoids drift but some tools may then load it twice — unverified).
  - Memory files over ~200 lines.
  - Copying brand DESIGN.md files from galleries.
  - Secrets in git.
- **Deployment slide (host-agnostic):** what every deploy needs (build command, env vars/secrets, DB migrations, preview vs. production, health check, rollback). A short table of 3–4 hosts suited to Next.js + Postgres, each row cited to the host's current docs.
- **Existing W8 topics re-homed:**
  - memory files → step 3
  - MCP → step 6 (DB schema)
  - browser mode → step 6 (checking the page against the mockup)
  - mockup-to-code → steps 2 + 6
  - debugging → step 5/6 (a failing CI run)
  - shared rules for pairs → step 3
  - P2 sprint workflow → step 4

  **Which existing slides get cut or merged is proposed to the instructor as a list before any are removed** (content-preservation rule).
- **San Jose:** the same section fills half the session. The other half keeps the remaining W8 content as is (instructor's call how to split).
- A one-page **student checklist handout** (`course/handouts/p2-from-zero-checklist.md`), the same items as the slides, so pairs can tick it off in their repo. Optional to also publish as a PDF like `public-api-guide`.

Overflow-checked in claude-in-chrome on the dev server; every edited slide ≤ 704 px.

## Sequencing & deadline

Repo steps 0–5 are low-risk and come first. Step 6 (Supabase) and step 7 (deploy) depend on the instructor creating or approving the Supabase project. Slides can be written in parallel, linking to the tag names. If step 6 or 7 isn't done by Mon Oct 26, those slides link to the issue instead and the tag is added after class.

## After approval

Plan with superpowers:writing-plans, then build. Commit the two research docs and this spec to the course repo.
