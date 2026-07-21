# Repository Structure & Health Audit — Recommendations

**Repo:** `aiCoding_Course` (CS 7180: Vibe Coding — AI-Assisted Software Engineering, Northeastern)
**Date:** 2026-07-20
**Author:** Repo structure audit (automated)
**Context:** Replanning for Fall 2026 + a new 8-hour workshop. Goal: a clean, well-organized, AI-coding-optimized reference repository.

---

## Executive Summary

The repository is **content-rich and already has strong AI-coding bones** — a solid root `CLAUDE.md`, nested/scoped `CLAUDE.md` files (`course/`, `slides/`, `examples/workshop-claude-code/`), four tracked `.claude/skills`, and a `spring-2026-final` tag. The course content itself (14 weeks of slides, 24 assessments, 3 projects, 5 homeworks, Canvas MCP tooling) is comprehensive.

However, the repo has accumulated the drift and cruft typical of a fast-moving single-maintainer teaching repo, and it is **not yet a clean reference**. The most serious issues:

1. **The root `README.md` is badly out of date and actively contradicts `CLAUDE.md`** — it describes the wrong slide engine (Marp vs. reveal-md), the wrong IDE modality (Cursor vs. Antigravity), an HW6 that no longer exists, and links to five homework files that do not exist. This is the single highest-impact fix because the README is the first thing a human or agent reads.
2. **`.git` is 81 MB and the 636 MB working tree is bloated** — driven by large binaries committed directly (a 15.7 MB PDF, ~50 MB of preview-night PNGs, a 6.6 MB `.docx`).
3. **No CI/CD at all** (`.github/` is absent) even though the course *teaches* GitHub Actions, and there is already a Playwright test suite + overflow-detection tool that could gate builds.
4. **Repo hygiene cruft**: a tracked `.DS_Store`, orphaned `_old`/`_v2`/`_bk` files, a junk-drawer `other/` directory, and a stale local worktree + 8 stale branches.
5. **A live secret exists on disk** (`other/preview-night/.env` with a real `GEMINI_API_KEY`) — currently protected only by `.gitignore`.

None of these are catastrophic; most are quick wins. The repo can become a genuinely exemplary AI-coding reference with roughly a day of focused cleanup plus one CI workflow.

---

## 1. Structure & Organization

### Findings

**Real top-level tree (tracked):**
```
CLAUDE.md, README.md, LICENSE, package.json, package-lock.json, .gitignore, .prettierignore
course/     (36 files) — syllabus, schedule, readings, COURSE_MEMORY, projects, assignments, assessments, handouts
slides/     (52 files) — reveal-md decks W01–15 + T01–03 workshop + W01–04 workshop + css/js/tests
examples/   (16 files) — international_students, workshop-claude-code, workshop-claude-web
docs/       (3 files)  — planning/ (1 orphan), research/ (2)
other/      (17 files) — presentation drafts, preview-night
tools/      (3 files)  — canvas-extras-mcp
.claude/    (5 files)  — settings.json + 4 skills
website ->  symlink to /Users/aguerra/workspace/homepageJohnGuerra/...
```

**Drift between `CLAUDE.md`'s documented structure and reality:**
- `CLAUDE.md` documents `course/handouts/public-api-guide.md` and the project/assignment layout accurately — good.
- `CLAUDE.md` does **not** mention `course/assessments/` (24 quiz + answer-key files), `course/generate-*.py`/`generate-syllabus.js`, or the top-level `tools/` directory in its structure diagram. These are real and load-bearing but undocumented.
- `CLAUDE.md`'s tree omits `.claude/skills/` and the `examples/` subdirectories.

**Naming / placement problems:**
- `slides/02_LLMs_fundamentals/index_old.md` — orphaned old version committed alongside the live `index.md`.
- `course/CS7180_VibeCoding_Syllabus_v2.docx` and `course/CS7180_VibeCoding_Syllabus_v2.md` coexist with `course/syllabus.md` and `course/CS7180_VibeCoding_Syllabus.docx`/`.pdf` — **four** syllabus artifacts, unclear which is canonical.
- `other/preview-night/images/image_3_bk.png` — a "bk" (backup) image committed.
- `other/preview-night/CS7180_Preview_Night_Fall2026 copy.pptx` — a literal " copy" file (gitignored, but present locally).
- `other/` is a junk drawer: `vibe_coding_pres_1/2/3.md`, `mids-assignments-timeline.tgz`, and the entire `preview-night/` workshop live here with no README explaining what any of it is or whether it's current.
- `docs/planning/` contains a single orphan, `CS7180_Week2_Compact_Memory.md` (Jan 2026), with no index. `docs/research/` has 2 files (one actively being edited — do not touch).
- Slide-deck numbering skips 09 (`08_Advanced_IDE_Features` → `10_Claude_Code_Foundations`), which matches the curriculum's W9 = no-lecture week but is not documented anywhere in `slides/`.

**Missing READMEs:** `course/`, `slides/`, `examples/`, `tools/`, `other/`, and `tools/canvas-extras-mcp/` have no README. `examples/workshop-claude-code/` and `examples/international_students/nu_students/` do have READMEs (good).

**Website symlink:** `website` points to an **absolute path** (`/Users/aguerra/workspace/homepageJohnGuerra/...`) outside the repo and is `.gitignore`d. This breaks for any other clone/contributor and for CI. The `CLAUDE.md` "Course Website" workflow (edit `index.pug`, regenerate) cannot be executed by anyone who doesn't have that exact local checkout.

### Recommendations

- **Delete orphans** (quick win): `slides/02_LLMs_fundamentals/index_old.md`, `other/preview-night/images/image_3_bk.png`. If history preservation matters, they already live in git history.
- **Consolidate the syllabus** to one canonical source. Recommend keeping `course/syllabus.md` (markdown) as source of truth and `course/CS7180_VibeCoding_Syllabus.pdf` as the generated distributable; delete or archive the `_v2` and `.docx` variants. Document the generation path (`course/generate-syllabus.js` / `generate-syllabus-pdf.py`) in a `course/README.md`.
- **Reorganize `other/`**: rename to `drafts/` or `archive/` and add an `other/README.md` (or `archive/README.md`) that states, per subfolder, what it is and whether it's live. Move `preview-night/` (a real Fall-2026 deliverable) either into `slides/` as a proper deck or into a clearly-named `workshops/preview-night/`.
- **Add per-directory READMEs** (see §4) so each top-level folder is self-describing.
- **Document the missing pieces in `CLAUDE.md`'s structure diagram**: add `course/assessments/`, `course/generate-*` scripts, `tools/canvas-extras-mcp/`, and `.claude/skills/`.
- **Make the website relationship portable**: document in `CLAUDE.md`/README that `website/` is an external repo expected at a sibling path, and provide the actual GitHub URL so a contributor can clone it. Consider a `WEBSITE.md` with the exact clone/symlink command:
  ```bash
  git clone <homepageJohnGuerra-url> ../homepageJohnGuerra
  ln -s ../homepageJohnGuerra/classes/aiCoding_spring_2026 website
  ```

---

## 2. Repo Hygiene

### Findings

**`.git` = 81 MB; working tree = 636 MB.** The 636 MB is dominated by untracked `node_modules` (present in **four** locations: root, `course/`, `slides/`, `examples/workshop-claude-code/`, `tools/canvas-extras-mcp/`) plus `.playwright-mcp/` (82 screenshot entries, gitignored). None of these are tracked — good — but they inflate local disk and `du`.

**The 81 MB `.git` is driven by committed binaries.** Largest blobs in history:
| Size | Path | Tracked now? |
|------|------|--------------|
| 15.7 MB | `slides/01_Introduction/index.pdf` | **Yes** |
| 7.7 MB | `other/preview-night/images/image_5.png` | **Yes** |
| 7.3 MB | `other/preview-night/images/image_2.png` | **Yes** |
| 7.0 MB | `other/preview-night/images/image_3_bk.png` | **Yes** (backup!) |
| 6.8 MB | `other/preview-night/images/image_3.png` | **Yes** |
| 6.7 MB | `other/preview-night/images/image_1.png` | **Yes** |
| 6.6 MB | `course/CS7180_VibeCoding_Syllabus.docx` | **Yes** |
| 6.1 / 5.8 MB | `other/preview-night/images/image_4/6.png` | **Yes** |
| 5.0 MB | `slides/01_Introduction/images/yonofui-interface.png` | **Yes** |

Roughly **65–70 MB of the 81 MB repo is generated/binary artifacts** that shouldn't be in git: a build-output PDF, AI-generated preview-night PNGs, and a `.docx` that is itself generated from markdown.

**`.gitignore` quality is good** — comprehensive, and notably already ignores sensitive items: `slides/update.sh` (SSH key paths), `course/assessments/*-answer-key.md` (instructor keys), `.env`, `*.pptx`, `course/*.pdf`, `.playwright-mcp/`, and the overflow debug PNGs. This is above-average discipline.

**But a tracked `.DS_Store` slipped through:** `examples/international_students/nu_students/.DS_Store` is committed even though `.gitignore` lists `.DS_Store` (it was added before the ignore rule). Several other `.DS_Store` files exist on disk (root, `.claude/`, `docs/`, `other/`) but are correctly untracked.

**Secret risk:** `other/preview-night/.env` exists on disk and contains a **real `GEMINI_API_KEY`**. It is *not* tracked (protected by `.env` in `.gitignore`) — but a single `git add -f` or a future `.gitignore` edit would expose it. The answer-key ignore (`course/assessments/*-answer-key.md`) similarly protects 12 instructor answer keys that are present on disk but untracked.

**Commit message quality is good** — imperative mood, descriptive, scoped (e.g. "Restructure W13-W16: redistribute content, add finals week"). 77 commits total.

**Branch/worktree state is messy:**
- 8 stale local branches, 3–6 months old: `feat/w13-w16-restructure`, `feature/canvas-mcp`, `feature/playwright-title-slide-tests`, `feature/reveal-md`, `optimize-claude-md-hierarchy`, `talk-2h`, `title-slide-experiment-v1`, `workshop-8h`. Most appear already merged into `main`.
- A leftover git worktree: `.claude/worktrees/snuggly-pondering-crown` (branch `worktree-snuggly-pondering-crown`, at an old commit `c89eb1d`).
- Only 3 of 8 local branches have remote tracking counterparts.

### Recommendations

- **Rotate the exposed key now** (highest urgency in this section): regenerate `GEMINI_API_KEY`, since it sits in plaintext on disk. Add `other/preview-night/.env.example` with a placeholder so the workflow is documented without the secret. Confirm it never entered history: `git log --all --full-history -- other/preview-night/.env` (expected: empty).
- **Stop committing generated/large binaries going forward.** Add to `.gitignore`:
  ```gitignore
  # Generated slide exports
  slides/**/index.pdf
  slides/**/*.pdf
  # AI-generated presentation image assets (regenerate from prompts)
  other/preview-night/images/
  ```
  Regenerate `slides/01_Introduction/index.pdf` on demand instead of tracking it (it's build output; `dist/` is already ignored).
- **Untrack the `.DS_Store`** (quick win): `git rm --cached examples/international_students/nu_students/.DS_Store`.
- **Consider a history rewrite** to reclaim ~65 MB *only if* clone speed matters and the maintainer is comfortable force-pushing (single-maintainer repo makes this low-risk). Tool: `git filter-repo --strip-blobs-bigger-than 1M` or target the preview-night images + the PDF specifically. Because `spring-2026-final` is tagged, do this on a copy and re-verify the tag first. **If unsure, skip** — the bloat is cosmetic, not functional.
- **Prune stale branches** (quick win): after confirming merge status (`git branch --merged main`), delete merged locals; keep only `main` + whatever Fall-2026 work is live. Remove the stale worktree: `git worktree remove .claude/worktrees/snuggly-pondering-crown` then delete its branch.
- **Move large binary storage to Git LFS** if any images *must* be versioned (e.g. brand/seal assets like `slides/img/seal_logotype-768x252.png`).

---

## 3. AI-Coding Readiness

### Findings — Strengths (keep these)

- **Root `CLAUDE.md` is strong** (8.3 KB): documents build commands, the three-modality philosophy, Canvas MCP server split (`canvas-lms` vs `canvas-extras`) with a precise quiz-creation workflow, a **content-sync table** (excellent — tells agents which 8 artifacts must stay consistent), a "Canvas API gap policy," a safety rule against modifying submitted work, and current curriculum state (W10–W16). This is above the quality bar for most repos.
- **Scoped/nested memory exists**: `course/CLAUDE.md` (28 lines), `slides/CLAUDE.md` (41 lines), `examples/workshop-claude-code/CLAUDE.md` (66 lines) — good use of directory-local context so agents get the right rules without loading everything.
- **Four tracked skills** in `.claude/skills/`: `deploy-slides`, `slide-layout`, `sync-course`, `verify-references` — these encode real workflows (overflow prevention, artifact sync, reference auditing) and are committed so they travel with the repo.
- **`.claude/settings.json` is tracked** while `settings.local.json`, `projects/`, and `worktrees/` are correctly `.gitignore`d — the right split of shared vs. local config.
- MCP tooling is real and documented: `tools/canvas-extras-mcp/index.js` supplements the third-party `canvas-lms` server, with a stated policy that Canvas API gaps get implemented here rather than via ad-hoc `fetch`.

### Findings — Gaps

- **No `AGENTS.md`.** The emerging cross-tool convention (used by non-Claude agents) is absent. `CLAUDE.md` is Claude-specific; an `AGENTS.md` (even a thin one that points to `CLAUDE.md`) broadens agent compatibility — fitting for a course that teaches multiple AI tools.
- **Skills/commands are undiscoverable to humans.** Nothing in the README or a top-level doc lists the 4 skills or the MCP tools; a co-instructor wouldn't know they exist.
- **No `.claude/commands/`** (slash commands). The `sync-course` and `verify-references` skills are referenced in `CLAUDE.md` as `/sync-course` and `/verify-references`, implying slash-command usage, but there's no committed command definitions dir — only skills. Worth confirming the mapping is intentional.
- **MCP server config lives in `~/.claude.json` (global), not the repo.** `CLAUDE.md` says the two servers are "configured globally." A new contributor can't reproduce the Canvas setup. Add a `.mcp.json` (project-scoped MCP config) or document the exact server entries in `tools/canvas-extras-mcp/README.md`.
- **`CLAUDE.md` "Current Curriculum State (April 2026)" is dated** and still frames everything as Spring 2026. For the Fall-2026 replan it will need a pass.

### Recommendations

- **Add a minimal `AGENTS.md`** at root that defers to `CLAUDE.md`:
  ```markdown
  # AGENTS.md
  This repo's agent guidance lives in [CLAUDE.md](./CLAUDE.md).
  Key rules: run the content-sync table when changing weekly topics/dates;
  never modify Canvas content with student submissions; go through
  canvas-extras MCP tools (never raw fetch) for Canvas API gaps.
  ```
- **Add a project-scoped `.mcp.json`** (or document server entries in `tools/canvas-extras-mcp/README.md`) so the Canvas MCP setup is reproducible from a fresh clone.
- **Surface skills + MCP tools in the README** and/or a `docs/TOOLING.md`, so humans discover them.
- **Refresh `CLAUDE.md` for Fall 2026** as part of the replan: update the "Current Curriculum State" heading/date, term references, and the structure diagram gaps noted in §1.
- **Write a `tools/canvas-extras-mcp/README.md`** documenting each tool, the `course_id=246270` default, and the pagination gotcha already noted in `CLAUDE.md`.

---

## 4. Documentation & Onboarding

### Findings

**The root `README.md` is the biggest documentation liability — it is stale and self-contradictory.** Concrete errors (all in `/Users/aguerra/workspace/aiCoding_Course/README.md`):

| Line(s) | README says | Reality (per `CLAUDE.md` / files) |
|---------|-------------|-----------------------------------|
| 70 | slides are **Marp** | slides are **reveal-md** (`reveal-md.json`, `slides/package.json`) |
| 39 | **Cursor IDE**, Weeks 5–6 | **Antigravity**, Weeks 6–8 (`CLAUDE.md`) |
| 38, 40 | Claude Web = Week 2; Claude Code = Week 7+ | Claude Web = Weeks 4–5; Claude Code = Weeks 10–15 |
| 27–28 | HW1 links to `hw2-…`, HW2 links to `hw1-…` | Links are swapped |
| 30–32 | HW4 `hw4-tdd-cicd-evals.md`, HW5 `hw5-parallel-agents.md`, **HW6** `hw6-production-readiness.md` | Files **don't exist**; actual: `hw4-claude-code-workflow-tdd.md`, `hw5-custom-skill-mcp.md`; **HW6 was removed** (`CLAUDE.md`) |
| 48 | Homeworks (**6**) 25% | **5** homeworks (`CLAUDE.md`) |
| 22–24 | P3 due Week 15 | P3 due **Apr 21, finals week / W16** (`CLAUDE.md`) |
| 62–73 | structure omits `tools/`, `.claude/`, `course/assessments/` | those exist |
| 81–82 | `npm run build:watch` | actual script is `npm run serve` (`slides/package.json`) |

A student or co-instructor following this README would be misled on nearly every operational detail. Note the README's own build command (`cd slides && npm install && npm run build`) does work — the drift is in the *descriptions and links*, which is worse because it looks authoritative.

**No onboarding path for a co-instructor.** There's no "how this repo is organized / how to run each piece / how the website relates" doc. `COURSE_MEMORY.md` (1,600 lines) is the de-facto master doc but is a reference, not an onboarding guide, and isn't framed as the entry point.

### Recommendations

- **Rewrite the root `README.md`** (high impact, low effort — ~1 hour) to match `CLAUDE.md`. Fix the modality table, homework list/links, HW count, project due dates, slide engine, structure diagram, and build commands. Suggested skeleton:
  ```markdown
  # CS 7180: Vibe Coding — AI-Assisted Software Engineering
  > Northeastern · Khoury · Spring 2026 (replanning Fall 2026)

  ## What's here
  | Dir | Contents |
  |-----|----------|
  | course/ | syllabus, schedule, readings, COURSE_MEMORY, projects, assignments, assessments, handouts |
  | slides/ | reveal-md decks (W01–W15 + workshops) |
  | tools/  | canvas-extras MCP server |
  | examples/ | student-facing example projects |
  | docs/   | research + planning notes |

  ## Quick start
  cd slides && npm install && npm run serve   # live slide preview

  ## For AI agents
  See CLAUDE.md (build commands, Canvas MCP, content-sync rules) and the
  .claude/skills/ (deploy-slides, slide-layout, sync-course, verify-references).

  ## Deliverables
  - Projects: P1 (15%), P2 (20%), P3 (20%)
  - Homeworks: HW1–HW5 (5% each)
  - Quizzes 10%, Participation 15%

  ## Versions
  - `spring-2026-final` tag = as-delivered Spring 2026 snapshot.
  ```
- **Add lightweight per-directory READMEs** (`course/README.md`, `slides/README.md`, `tools/README.md`, `examples/README.md`, `other/README.md`) — 5–15 lines each, stating purpose + how to build/use.
- **Add a `docs/README.md`** indexing `planning/` and `research/`, and either promote or delete the lone `docs/planning/CS7180_Week2_Compact_Memory.md`.
- **Consider a `CONTRIBUTING.md`** capturing the content-sync rule (from `CLAUDE.md`) and the "never edit `website/index.html`, edit `index.pug`" rule so human contributors follow the same discipline agents do.

---

## 5. Engineering Practices for a Teaching Repo

### Findings

- **No CI/CD.** There is no `.github/` directory. This is notable because: (a) the course explicitly teaches GitHub Actions and CI/CD as core content, so the repo should model it; and (b) there's already testable infrastructure sitting unused in CI:
  - `slides/tests/title-slides.spec.ts` + `slides/playwright.config.ts` — a Playwright suite (`npm test` in `slides/`).
  - `slides/js/overflow-check.js` — the overflow-detection tool (recent commits show active use to fix W14/W15 slide overflows).
  - `tools/canvas-extras-mcp/` — an MCP server with no test/lint.
- **No link-checking**, despite `verify-references` being a documented workflow and slides/readings containing many URLs. This is manual today.
- **No slide-build validation** — nothing catches a broken reveal-md build or a slide overflow before it's presented; the overflow tool must be run by hand.
- **Versioning is nascent but present** — the `spring-2026-final` tag is a good start and should be the model going forward (tag each term's as-delivered state). No `CHANGELOG` or release notes yet.
- **Content vs. tooling separation is partial.** Course content (`course/`, `slides/`) and tooling (`tools/`, `.claude/`, `slides/tests`, generation scripts) coexist without a clear boundary. This is fine at current scale but will blur as the workshop variant grows.

### Recommendations

- **Add a `.github/workflows/ci.yml`** that (at minimum) builds slides and runs the Playwright/overflow checks on PRs — and doubles as a live teaching example:
  ```yaml
  name: CI
  on: [push, pull_request]
  jobs:
    slides:
      runs-on: ubuntu-latest
      defaults: { run: { working-directory: slides } }
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with: { node-version: 20, cache: npm, cache-dependency-path: slides/package-lock.json }
        - run: npm ci
        - run: npx playwright install --with-deps chromium
        - run: npm run build          # fails if any deck won't compile
        - run: npm test               # title-slide + (extend to overflow) checks
  ```
- **Add a link-check job** (e.g. `lycheeverse/lychee-action`) over `course/**/*.md` and `slides/**/*.md` to automate what `verify-references` does by hand.
- **Wire the overflow tool into CI** so slide overflow regressions (the subject of several recent commits) are caught automatically rather than via manual screenshot passes.
- **Adopt a per-term tagging convention** now that `spring-2026-final` exists: e.g. `fall-2026-final`, `workshop-8h-v1`. Optionally a short `CHANGELOG.md` at root summarizing what changed each term — itself a teaching artifact.
- **Formalize content/tooling separation** as the workshop grows: keep all executable tooling under `tools/` + `.claude/` + `slides/tests/`, and consider moving `course/generate-*.py`/`generate-syllabus.js` into `tools/` (or a `course/scripts/`) with a README, so `course/` is pure content.
- **Add a `.markdownlint`/formatting note** — `.prettierignore` already excludes `slides/**/*.md` (to preserve reveal-md separators), which is a thoughtful, correct exclusion; document *why* so no one "fixes" it later.

---

## Prioritized: Quick Wins vs. Larger Efforts

| # | Recommendation | Impact | Effort | Type |
|---|----------------|--------|--------|------|
| 1 | **Rewrite root `README.md`** to match `CLAUDE.md` (fix Marp→reveal-md, Cursor→Antigravity, HW6/broken HW links, weeks, structure, build cmd) | **High** | Low | Quick win |
| 2 | **Rotate the `GEMINI_API_KEY`** in `other/preview-night/.env`; add `.env.example` | **High** | Low | Quick win |
| 3 | Delete orphans: `slides/02_LLMs_fundamentals/index_old.md`, `image_3_bk.png`; untrack `.DS_Store` | Med | Low | Quick win |
| 4 | Prune 8 stale branches + remove `snuggly-pondering-crown` worktree | Med | Low | Quick win |
| 5 | Add `AGENTS.md` (thin, defers to `CLAUDE.md`) | Med | Low | Quick win |
| 6 | Consolidate 4 syllabus artifacts → 1 canonical `course/syllabus.md` + generated PDF | Med | Low | Quick win |
| 7 | Stop tracking generated binaries: `.gitignore` slide PDFs + preview-night images | **High** | Low | Quick win |
| 8 | Add per-directory READMEs (`course/`, `slides/`, `tools/`, `examples/`, `other/`) + `tools/canvas-extras-mcp/README.md` | Med | Med | Quick win |
| 9 | **Add `.github/workflows/ci.yml`** (build slides + Playwright + overflow check) — also a teaching example | **High** | Med | Larger |
| 10 | Add link-check CI over `course/` + `slides/` markdown (automate `verify-references`) | Med | Med | Larger |
| 11 | Add project-scoped `.mcp.json` / document Canvas MCP setup for reproducibility | Med | Med | Larger |
| 12 | Reorganize `other/` → `archive/`/`workshops/` with README; index `docs/planning/` | Med | Med | Larger |
| 13 | Refresh `CLAUDE.md` "Current Curriculum State" + structure diagram for Fall 2026 | Med | Med | Larger |
| 14 | History rewrite (`git filter-repo`) to reclaim ~65 MB from committed binaries — optional | Low | High | Larger |
| 15 | Establish per-term tagging (`fall-2026-final`) + optional `CHANGELOG.md` | Med | Low | Ongoing |
| 16 | Move `course/generate-*` scripts to `tools/` for clean content/tooling split | Low | Med | Larger |

**Single highest-impact recommendation:** **Rewrite the root `README.md` to match `CLAUDE.md` (item #1).** It is low-effort, and today the README misdescribes the slide engine, the IDE modality, the homework structure, and links to five nonexistent files — actively misleading every human and agent that opens the repo first. Fixing it is the fastest way to make this a trustworthy reference repository.

---

*Audit performed read-only. The only file created is this document (`docs/planning/repo_structure_recommendations.md`). `docs/research/` was intentionally left untouched.*
