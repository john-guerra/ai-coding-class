# Slide Design System — "Ink & Ochre"

The look-and-feel for the Vibe Coding / Agentic Engineering decks. Grounded in
**johnguerra.co**: the calm precision of a good information visualization, in service of
*speed **with** quality*.

- **Visual guide (rendered):** [`slide-design-system.html`](slide-design-system.html) — open in a browser for swatches, type specimens, and the template gallery.
- **Where it lives:** `slides/css/style.css` (tokens + chrome), `slides/js/mermaid-init.js` (mermaid theme).
- **Companion:** the `slide-layout` skill governs *layout & overflow* (960×700 budgets); this doc governs *look & feel*. Use both.

---

## 1. Principles (CRAP + 2)

| | Principle | On a slide |
|---|---|---|
| **C** | Contrast | One thing is biggest, darkest, or orange — never two. |
| **R** | Repetition | Same eyebrow, rule, and margins on every slide → one voice. |
| **A** | Alignment | A single left edge for text; nothing floats. |
| **P** | Proximity | Group what belongs together; white space is structure. |
| **H** | Hierarchy | Serif title → large statement → quiet caption = the reading order. |
| **·** | Restraint | One idea per slide, few words, generous space. **Sparse, presenter-support** — the talk carries detail. |

---

## 2. Color

A warm paper ground and a navy anchor carry ~95% of every slide. **Orange is the single spark** —
used *once* per slide, where the eye must land. Blue is for links only. Red is retired.

| Token (`--var`) | Hex | Role |
|---|---|---|
| `--paper` | `#F7F6F2` | Slide ground — light, **not** white |
| `--surface` | `#FFFFFF` | Cards / panels that float on paper |
| `--panel` | `#F2F1EC` | Subtle fills: table rows, callouts, plain-text code |
| `--ink` | `#1D2733` | Titles & body text; **bold = ink** (weight, not color) |
| `--navy` | `#16202E` | Dividers, footers, diagram structure, the spine |
| `--muted` | `#626B77` | Captions, secondary text |
| `--line` | `#E7E5DE` | Hairlines, borders |
| `--accent` | `#F5811F` | **Orange spark** — one mark per slide, blockquote bar, eyebrow |
| `--accent-dark` | `#D96F12` | Orange hover |
| `--link` | `#1257C9` | Hyperlinks only |
| `--link-dark` | `#0E469E` | Link hover |

**InfoVis categorical** (diagrams & charts only — echoes the johnguerra.co bubble charts):
`--v-blue #5A6E8C` · `--v-green #5C9E5A` · `--v-gold #E3B23C` · `--v-orange #E2812E` · `--v-plum #8A5FA6`.

> **The orange test:** if a slide has two orange marks, one is wrong. Emphasis in body text is
> **ink bold**, not orange.

### Accessibility (non-negotiable)

- **Links are distinguishable by more than color** (WCAG 1.4.1): every `<a>` is **underlined**
  (`text-decoration: underline`, `text-underline-offset: .15em`), not color-only. The title byline
  uses an ink-bold link with an **orange underline** so it reads as a link without a blue swap.
- **Contrast:** ink `#1D2733` and navy `#16202E` on paper clear AAA; link `#1257C9` and orange
  `#F5811F`(as text) clear AA for large/bold text. Keep `--muted` for secondary text only, not for
  long-form body.
- Don't rely on color alone to carry meaning in diagrams — pair the orange spark with position,
  label, or weight.

---

## 3. Typography

The johnguerra.co pairing: a serif that thinks, a sans that speaks, a mono for machines.

| Face | Role | Notes |
|---|---|---|
| **Playfair Display** | Headings / display | 800; academic-editorial elegance. Heavy weights so hairlines survive a projector. |
| **Lato** | Body, lists, captions | 400 / 700. Plain and legible. |
| **IBM Plex Mono** | Code, tokens, eyebrows | 400 / 600. Eyebrows are uppercase, tracked, orange. |

**Type scale (@ 960×700):**

| Role | Face | Size | Weight |
|---|---|---|---|
| Cover title | Playfair Display | 76–96 | 900 |
| Slide title (h2) | Playfair Display | 44–52 | 800 |
| Lead statement | Lato | 28–31 | 400 |
| Body / list | Lato | 22–24 | 400 |
| Eyebrow / label (`.course-week`) | IBM Plex Mono | 15–17 | 600, uppercase, `letter-spacing .18em`, orange |
| Caption / credit | Lato | 15–17 | 400 |
| Code / data | IBM Plex Mono | 18–20 | 400 |

Loaded via one Google Fonts `@import` at the top of `style.css`.

---

## 4. Space & grid

- **8px base unit** — all spacing is a multiple of 8 (8 / 16 / 24 / 32 / 48 / 64).
- **64px slide margin** — content never touches the bezel; the eyebrow marks the top-left origin.
- **One left edge** — eyebrow, title, and body share a single left alignment. Centered layout is
  reserved for **title**, **section divider**, and **quote** slides.

---

## 5. Slide templates

One job per slide. (Layout mechanics & overflow budgets: see the `slide-layout` skill.)

| Type | Treatment |
|---|---|
| **Title** | Paper. Mono orange eyebrow → huge Playfair title → Lato subtitle → byline + small NU credit. |
| **Section divider** | Full-bleed **navy**; giant orange index (`01`) + white Playfair title. Resets attention between parts. |
| **Statement (sparse)** | Eyebrow + Playfair title + one large Lato lead + an orange accent rule. The default. |
| **Stat / anchor** | Giant orange Playfair number + one line of context (e.g. the METR / Veracode anchors). |
| **Diagram** | Inline SVG (see §6) — paper/navy structure, one orange spark. |
| **Code** | Navy block, IBM Plex Mono, light text. Plain-text/ASCII callouts use the light `--panel` fill. |
| **Data table** | Rules, not a grid: ink header on a `--panel` row, hairline row separators. |
| **Two-column** | Playfair sub-heads, Lato lists; compare / contrast. |
| **Quote / takeaway** | Centered Playfair pull-quote with the key phrase in orange; closes a beat. |

---

## 6. Diagram conventions

Diagrams are **inline SVG** with `<g class="fragment">` groups so they build step-by-step in reveal.
Wrap in `<div class="svg-diagram">` (shared font rules live in `style.css`).

- **Structure** (cards, borders, arrows, boxes, number chips, headers): `--navy #16202E`, `--ink`, `--muted`, `--line`.
- **One orange spark** per diagram on the focal element (the new/changing/critical thing): `--accent #F5811F`, orange-tint `#FDECD9`.
- **Fonts:** `IBM Plex Mono` for labels; add `class="sans"` on a `<text>` for Lato.
- **Keep the source:** paste the original ASCII diagram as an `<!-- ASCII reference … -->` comment immediately **before** the SVG, so the intent stays readable in the markdown.
- **Sizing:** constrain by `height` (e.g. `style="height:360px;width:auto;max-width:100%"`), then verify with the overflow checker (`?overflow` / Shift+O).

**Mermaid** is themed globally in `js/mermaid-init.js` (`theme:'base'` + Ink & Ochre `themeVariables`):
paper nodes, navy borders, Lato labels, navy-grey edges. For a single orange node, add a `classDef`
in that diagram: `classDef spark fill:#f5811f,color:#fff,stroke:#f5811f;` then `class NodeId spark`.

---

## 6b. Background texture (generative flow field)

A **faint generative flow-field** grounds every paper slide — *"noise, not wallpaper"*: ~760
streamlines traced through a fractal-noise vector field, drawn as **navy at 2.3% opacity** so the
title always wins. Implemented in **`slides/js/flow-texture.js`** and painted onto each slide's
**`.slide-background`** element (a few cycled seeds), so the texture **moves with the slide
transition**. **Navy dividers are excluded** (they keep a clean navy ground). Marble veining is the
documented reserve fallback. (Source of truth: the Claude Design `background-textures.html` appendix.)

## 6c. Templates are class-driven

Invoke a template with a class in the slide directive — never by hand-editing content:

| Template | Invocation |
|---|---|
| Title | automatic on the `#title` slide |
| Section divider (navy + auto `01/02/03` index) | `<!-- .slide: class="divider" -->` |
| Stat / anchor (giant orange number = the `h2`) | `<!-- .slide: class="stat" -->` |
| Quote / takeaway (big centered Playfair) | `<!-- .slide: class="quote" -->` |
| Statement (sparse, large lead) | `<!-- .slide: class="statement" -->` |
| Table / two-column | automatic (styled globally) |

Sizes are set in **px** (a reveal slide *is* the 960×700 artboard, so px map straight to the mockup;
`em` gets scaled unpredictably). Full-height templates use `box-sizing: border-box`. Divider
backgrounds are pure CSS (`.slide-background.divider`) — reveal mirrors the slide class onto its
background element.

**Navigation arrows** are muted (`--muted`, low opacity), orange on hover — subtle, on-palette.

## 7. Applying / extending

- Global chrome (fonts, palette, background, links, blockquote, tables, progress, eyebrow,
  templates, arrows) is in `slides/css/style.css` `:root` + rules. Runtime: `slides/js/mermaid-init.js`
  (mermaid theme) and `slides/js/flow-texture.js` (flow background). Legacy `--primary` / `--neu-red`
  / `--link-blue` aliases are kept so older decks don't break.
- The stylesheet is **shared by every lecture** in the repo, so changes here are course-wide.
- After font/palette edits, re-run the overflow sweep on affected decks (fonts change text metrics).

> Not yet swept for overflow under this system: the credit-course lectures (`slides/01_*`…`14_*`).
> They inherit the new fonts/palette; check them before building/deploying.
