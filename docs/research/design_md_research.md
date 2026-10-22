# DESIGN.md for AI coding agents: research notes

Researched 2026-10-22 for CS 6983 (Fall 2026). Sources were fetched on that date unless noted. Quotes are verbatim from the fetched page. **UNVERIFIED** marks anything I could not confirm from a primary source.

---

## TL;DR

- **The Frank Bentley talk:** NOT FOUND publicly. I could confirm who he is (Material Design UX research lead at Google). I found no video, slides, blog post or event listing that ties him to DESIGN.md. Nothing here describes what the talk said.
- **An official Google format exists**, but it comes from **Google Labs / Stitch**, not from the Material Design team. It is an Apache-2.0 spec plus a CLI (`@google/design.md`) with lint, diff, export (including **Tailwind v4**) and spec commands. Its status is **alpha**. It has 8 ordered sections: Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, and Do's and Don'ts. YAML tokens cover colors, typography, rounded, spacing and components.
- **Official Material Design DESIGN.md:** none found. The Material 3 DESIGN.md generators and skills I found are community projects.
- **Relation to AGENTS.md:** the Google spec does not mention AGENTS.md. In practice DESIGN.md is a **separate file at the repo root** that AGENTS.md or CLAUDE.md points to (or imports). It is not a section inside AGENTS.md.
- **Counter-evidence worth teaching:** Atlassian published a DESIGN.md and found it good for prototypes but worse than MCP or skills for production work, with about 92% more tokens on one task.

---

## 1. The Frank Bentley talk

**Result: not found.** I made five searches, two of them extended: Bentley + design.md, Bentley + Material + AI agents, Bentley + talk 2026, and others. I also checked his two primary pages.

What I could verify about the speaker:

- Google Research profile: "Frank leads User Research for the Google Design Platform, including Material Design, Google Fonts/Icons, and Design System Management." https://research.google/people/107993/
- Personal site: "I'm currently the Director of UX Research at Google for Material Design and an adjunct lecturer at Stanford University." https://frankbentley.com/
- His listed publications that are closest to the topic are not about DESIGN.md:
  - "AI is Not Enough: A Hybrid Technical Approach to AI Adoption in UI Linting with Heuristics" (UI linting against design-system guidelines with LLMs plus heuristics).
  - "Usability Hasn't Peaked..." (CHI '26, Material 3 Expressive).
  - Both are listed on the Research profile above.
- Neither page lists any talks. Search snippets mention a LinkedIn post about a CHI 2026 talk on Material 3 Expressive usability. **UNVERIFIED**: I did not open LinkedIn, and the snippet does not mention DESIGN.md.

**What is still open:** the talk may have been internal, a meetup without a recording, or listed under another title. To recover it, ask the instructor for the venue and date, or ask Bentley directly. **Do not attribute any specific DESIGN.md claim to Bentley or to "Material Design" in course materials until the talk is found.** The documented Google origin is Google Labs / Stitch (section 2).

---

## 2. Google's official DESIGN.md (Google Labs / Stitch)

### Primary sources

| Source | What it is |
|---|---|
| https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/ | Announcement. Title: "Stitch's DESIGN.md format is now open-source so you can use it across platforms". April 21, 2026, by Cassia Xu. |
| https://github.com/google-labs-code/design.md | Spec repo plus CLI. Apache-2.0. The repo was created 2026-04-10 (GitHub API `created_at`). |
| https://github.com/google-labs-code/design.md/blob/main/docs/spec.md | The normative spec, generated header `version: alpha`. |
| https://github.com/google-labs-code/design.md/blob/main/PHILOSOPHY.md | Design intent ("prose over tokens"). |
| https://stitch.withgoogle.com/docs/design-md/specification | Spec homepage, linked from the repo. It is a JS-rendered page, so WebFetch got only the title, and its content is **not verified directly**. The GitHub `spec.md` is the source I read. |

Key quotes:

- Blog: "Today, we're open-sourcing the draft specification for DESIGN.md, so it can be used across any single tool or platform."
- README: "A format specification for describing a visual identity to coding agents."
- README: "The tokens are the normative values. The prose provides context for how to apply them."
- README: "The DESIGN.md format is at version `alpha`." and "Expect changes to the format as it matures."
- PHILOSOPHY: "The quality of a generated design is determined less by the precision of its values than by how clearly the intent is described."
- PHILOSOPHY: "Adjectives describe a region. A specific reference describes a point."

### Structure (from `docs/spec.md`)

**Tokens** go in YAML front matter (`---` fences) and/or in fenced `yaml` blocks inside sections. They are merged into one tree, and "Each top-level schema key may be defined at most once". The schema:

```yaml
version: <string>          # optional, current version: "alpha"
name: <string>
description: <string>      # optional
colors:      { <token-name>: <Color> }
typography:  { <token-name>: { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, ... } }
rounded:     { <scale-level>: <Dimension> }
spacing:     { <scale-level>: <Dimension | number> }
components:  { <component-name>: { backgroundColor, textColor, typography, rounded, padding, size, height, width } }
```

- References use `{colors.primary}` syntax, and the spec says the token concept is "inspired by the Design Token JSON spec" (W3C DTCG).
- The Colors section has one hard rule: "At least the `primary` color palette must be defined".
- State variants are separate keys, for example `button-primary` and `button-primary-hover`.

**Sections**, which use `##` headings: "Sections can be omitted if they're not relevant to your project, but those present should appear in the sequence listed below."

1. Overview (alias "Brand & Style"): personality, audience, emotional response.
2. Colors
3. Typography
4. Layout (alias "Layout & Spacing")
5. Elevation & Depth (alias "Elevation")
6. Shapes
7. Components: buttons, chips, lists, tooltips, checkboxes, radios, inputs. The spec says "The components specification is actively evolving."
8. Do's and Don'ts: "These act as guardrails when creating designs."

**Not in the official sections** (the request listed these): **voice/tone** and **accessibility** have no dedicated section. Accessibility shows up as the `contrast-ratio` lint rule (WCAG AA 4.5:1) and as an example Do ("Do maintain WCAG AA contrast ratios"). The spec says unknown sections are preserved: "Unknown section heading | Preserve; do not error". PHILOSOPHY.md says motion, iconography and similar areas are left "yours to define".

**CLI** (README):

- `npx @google/design.md lint DESIGN.md`: structure, broken refs, contrast, section order. Outputs JSON.
- `diff`: compares two versions for regressions.
- `export --format css-tailwind`: Tailwind v4 `@theme` block. `json-tailwind` gives a v3 `theme.extend`, and `dtcg` gives W3C tokens.
- `spec [--rules]`: prints the spec "for injecting spec context into agent prompts".

**Hands-on check (2026-10-22):** I linted the template in section 4 with `npx -y @google/design.md@latest`, which reports CLI version 0.4.0.

- Lint result: 0 errors, plus 1 `orphaned-tokens` warning.
- An extra `## Accessibility` section after Do's and Don'ts produced no error.
- `export --format css-tailwind` emitted `@theme { --color-primary: #1f3a5f; ... }`.
- So the Tailwind path works for a Next.js + Tailwind v4 project.

### Material Design specifically

I found **no official Material Design DESIGN.md**. The blog post and repo do not mention Material, and searches for material.io plus DESIGN.md returned nothing official. The Material 3 items that do exist are community projects:

- https://github.com/hamen/material-3-skill (a Claude Code skill)
- https://github.com/darlanrod/material-design-md (a DESIGN.md generator)

I did not inspect either one in depth.

---

## 3. Other public practice

### VoltAgent/awesome-design-md (community, very popular)

https://github.com/VoltAgent/awesome-design-md

- Created 2026-03-31, with 122,918 stars when I checked via the GitHub API on 2026-10-22.
- The repo calls itself "A collection of DESIGN.md files analysis by popular brand design systems. Drop one into your project and let coding agents generate a matching UI."
- It frames the two files as complementary:

  | File | Who reads it | What it defines |
  |---|---|---|
  | `AGENTS.md` | Coding agents | How to build the project |
  | `DESIGN.md` | Design agents | How the project should look and feel |

- Usage: "Copy a site's `DESIGN.md` into your project root" and "Tell your AI agent to use it."
- It claims to follow the Stitch format "with extended sections": Visual Theme & Atmosphere, Color Palette & Roles, Typography Rules, Component Stylings, Layout Principles, Depth & Elevation, Do's and Don'ts, Responsive Behavior, and Agent Prompt Guide.
  - Note: these names and this order differ from the official spec, where Layout comes before Components.
  - **UNVERIFIED** whether these files pass `lint` without section-order findings.
- **Teaching caution (my opinion):** the files are reverse-engineered from real brands' sites. Students should write their own DESIGN.md rather than ship a clone of another company's look.

### Atlassian (vendor, primary source)

https://www.atlassian.com/blog/ai-at-work/atlassians-design-md-is-here-what-we-learned-testing-portable-design-context-in-practice (June 15, 2026, by Kylor Hall and Andrew Campbell)

- They published `https://atlassian.design/DESIGN.md`. I fetched it: HTTP 200, about 80 KB, front matter `version: alpha`, `name: Atlassian`.
- They found it works well for one-shot prototypes. On a login-screen task it used "~92% more tokens" than their ADS MCP setup.
- On cost: "A DESIGN.md file, by comparison, loads everything, every time."
- Agents tended to re-implement components instead of importing `@atlaskit/button`.
- They position it as a portable snapshot for prototyping and design-tool interop. For production they recommend MCP or skills plus lint rules.
- Takeaway for students: **keep DESIGN.md short, and tell the agent to import existing components rather than rebuild them.**

### Anthropic / Claude Code

- I found **no Anthropic doc that endorses DESIGN.md by name.**
- Anthropic's own approach to frontend design is a skill. `anthropics/claude-code` ships `plugins/frontend-design/skills/frontend-design/SKILL.md`, which gives aesthetic guidance and is not a project token file.
- The relevant mechanism is CLAUDE.md imports, documented at https://code.claude.com/docs/en/memory:
  - "CLAUDE.md files can import additional files using `@path/to/import` syntax."
  - Caveat from the same page: imports "don't reduce its context cost, because imported files also load at launch".
  - Claude Code can read `AGENTS.md` directly, and `@path` imports inside AGENTS.md are expanded.
  - The same page documents path-scoped `.claude/rules/` with a `paths:` field. A rule scoped to `app/**/*.tsx` or `components/**` could load the design guidance only for UI work, which addresses Atlassian's "loads everything" cost. That pairing is my synthesis and has not been tested.

### Vercel / v0, Cursor

- I searched and found **no official Vercel or Cursor documentation** about DESIGN.md.
- Several third-party blogs suggest putting a line in `.cursor/rules`, AGENTS.md or CLAUDE.md telling the agent to read DESIGN.md before UI work. Those are secondary sources, not vendor guidance.

### How DESIGN.md relates to AGENTS.md (summary of the evidence)

- **Separate file at the repo root.** The VoltAgent README and the Atlassian file both do this, and the Google spec treats DESIGN.md as self-contained.
- **AGENTS.md or CLAUDE.md points to it**, either with an instruction line or with an `@DESIGN.md` import in Claude Code. No primary vendor doc prescribes this, but it follows from the documented import mechanism.
- **Not a section inside AGENTS.md.** I found no source recommending that.

---

## 4. Recommended minimal DESIGN.md for a student pair (Next.js + Tailwind)

**What is sourced and what is synthesis:**

- **Sourced from the Google spec:** the structure (front matter tokens, the 8 sections in order), the token names (`primary`, `surface`, `on-surface`, `headline-lg`, `body-md`, and so on, from the spec's "Recommended Token Names"), `{token}` references, and the `lint` and `export --format css-tailwind` commands.
- **My synthesis:**
  - The specific values.
  - The "use existing components, don't re-implement" line, which is motivated by the Atlassian findings.
  - The "one accent per screen" rule, which echoes a spec example ("Do use the primary color only for the single most important action per screen").
  - The extra Accessibility section.
  - The AGENTS.md wiring.
  - The size budget.
- **Lint result:** this template passes `lint` with 0 errors (CLI 0.4.0).

```markdown
---
version: alpha
name: <App name>
description: <one line: what the app is and for whom>
colors:
  primary: "#1F3A5F"      # headings, primary buttons
  secondary: "#5B6472"    # borders, captions, metadata
  tertiary: "#E07A1F"     # the single accent: one per screen
  neutral: "#F7F6F2"      # page background
  surface: "#FFFFFF"      # cards
  on-surface: "#1A1C1E"   # body text
  error: "#B3261E"
typography:
  headline-lg: { fontFamily: Inter, fontSize: 32px, fontWeight: 700, lineHeight: 1.2 }
  body-md:     { fontFamily: Inter, fontSize: 16px, fontWeight: 400, lineHeight: 1.5 }
  label-md:    { fontFamily: Inter, fontSize: 14px, fontWeight: 600, lineHeight: 1.2 }
rounded: { sm: 4px, md: 8px, full: 9999px }
spacing: { xs: 4px, sm: 8px, md: 16px, lg: 32px }
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.on-surface}"
---

## Overview
<One specific reference, not adjectives. e.g. "A calm kitchen notebook for
busy grad students planning a week of cheap meals.">

## Colors
- **Primary** {colors.primary}: headings and primary buttons.
- **Tertiary** {colors.tertiary}: the one accent per screen.

## Typography
Inter only; three levels above. No other font sizes.

## Layout
Mobile-first; max width 1200px; spacing only from the scale above.

## Shapes
{rounded.md} on cards and buttons; {rounded.full} only for tags.

## Components
Use existing primitives in `components/ui/` (e.g. shadcn/ui). Never
re-implement a Button, Input or Dialog. Add new variants there.

## Do's and Don'ts
- Do keep WCAG AA contrast (4.5:1 for body text).
- Don't add gradients, glows, or a second accent color.
- Don't hard-code hex values in components; use Tailwind theme tokens.

## Accessibility
Visible focus rings; every icon button has an aria-label; respect
prefers-reduced-motion.
```

**Wiring (synthesis).**

- In `AGENTS.md`, add: `UI work: follow DESIGN.md (tokens are in its front matter).`
- In `CLAUDE.md`, add `@DESIGN.md` to import it, or scope it via `.claude/rules/` with `paths:` for UI files.
- Generate the Tailwind theme from the file instead of hand-copying: `npx @google/design.md export --format css-tailwind DESIGN.md > app/theme.css`.
- Add `npx @google/design.md lint DESIGN.md` to CI.
- Keep the file to about a page. Atlassian's 80 KB file is the cautionary example.

**Caveats for teaching.**

- The format is alpha, and the README says to "Expect changes".
- Pin the CLI version in the project (`npm i -D @google/design.md@0.4.0`) so a class cohort doesn't hit format churn mid-semester.
- Spec drift is likely. Atlassian already diverges from the spec and "has sent feedback" (paraphrase from their post).

---

## Source list

**Primary**

- https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/
- https://github.com/google-labs-code/design.md (README, `docs/spec.md`, `PHILOSOPHY.md`)
- https://www.atlassian.com/blog/ai-at-work/atlassians-design-md-is-here-what-we-learned-testing-portable-design-context-in-practice
- https://atlassian.design/DESIGN.md
- https://code.claude.com/docs/en/memory
- https://research.google/people/107993/
- https://frankbentley.com/

**Community**

- https://github.com/VoltAgent/awesome-design-md
- https://github.com/hamen/material-3-skill
- https://github.com/darlanrod/material-design-md

**Secondary (context only, not relied on for facts above)**

- https://dev.to/aws-builders/agentsmd-skillmd-designmd-how-ai-instructions-split-into-three-layers-d0g. It treats AGENTS.md, SKILL.md and DESIGN.md as separate, "complementary, not competing" layers.
