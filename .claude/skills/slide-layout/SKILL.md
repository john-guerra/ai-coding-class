---
name: slide-layout
description: Use when creating or editing reveal-md lecture slides — guides layout selection, content budgets, CSS class usage, and overflow prevention for 960x700px slides
---

# Slide Layout Reference

Reveal.js slides are **960x700px** (default). Content exceeding 700px vertical space **overflows and is invisible**. This guide prevents that. Always verify with `Shift+O`. Check `Reveal.getConfig().height` if resolution changes.

## Layout Selection

| Content type | Layout | Classes/syntax |
|---|---|---|
| Sequential points (up to 8) | Single column | (none) |
| Sequential points (9-12) | Single column | `.dense` |
| Sequential points (13+) | Split into vertical slides | `<!-- vertical -->` |
| Comparison / pros-cons | Two columns | `.columns` + `.column` |
| Diagram + explanation | Two columns | `.columns` (mermaid in one column) |
| Image + text | Background image | `![bg right:40% fit]` |
| Code + explanation | Two columns or stacked | `.columns` or `.dense` |
| Process / flow | Mermaid diagram | `<pre class="mermaid">` |
| Data / statistics | Table | `.compact` if rows > 5 |
| Triple comparison (rare) | Three columns | `.columns` with 3 `.column` divs |
| Title / section divider | Single h1 or h2 | `id="title"` for deck title |

## Content Budgets

Approximate guidelines for 960x700px. Always verify with `Shift+O`.

### Single Column

| Elements | Default | With `.dense` |
|---|---|---|
| Bullets (no other content) | 8 | 12 |
| Bullets + h2 | 7 | 10 |
| Bullets + code block (~8 lines) | 4 | 6 |
| Bullets + table (~4 rows) | 4 | 6 |
| Bullets + blockquote | 6 | 8 |
| Code block lines (+ h2) | 18 | 24 |
| Table rows (+ h2) | 8 | 10 |

### Two Columns (`.columns`)

| Elements per column | Default | With `.dense` |
|---|---|---|
| Bullets per column | 6 | 8 |
| Code lines per column | 14 | 18 |
| Mermaid + bullets (other col) | 5 | 7 |

### Background Image + Text

| Layout | Max bullets |
|---|---|
| `![bg right:40%]` | 7 |
| `![bg right:50%]` | 6 |
| `![bg left:35%]` | 8 |

## Slide Patterns

### 1. Standard Slide

```markdown
## Slide Title

- First point about the topic
- Second point with **emphasis**
- Third point with detail
- Fourth supporting point

> Key takeaway in a blockquote
```

### 2. Dense Slide

```markdown
<!-- .slide: class="dense" -->

## Slide Title

- Point one through twelve fit here
- Use when content is heavy but logically belongs on one slide
```

### 3. Two-Column Comparison

```markdown
## Comparison Title

<div class="columns">
<div class="column">

**Option A**

- Pro one
- Pro two
- Pro three

</div>
<div class="column">

**Option B**

- Pro one
- Pro two
- Pro three

</div>
</div>
```

**Blank lines before/after markdown inside `<div>` are required for parsing.**

### 4. Dense Two-Column with Table

```markdown
<!-- .slide: class="dense" -->

## Title

<div class="columns">
<div class="column">

- Explanation one
- Explanation two
- Explanation three

</div>
<div class="column">

| Col A | Col B |
|-------|-------|
| data  | data  |
| data  | data  |

</div>
</div>
```

### 5. Mermaid + Explanation

```markdown
## Process Title

<div class="columns">
<div class="column">

<pre class="mermaid">
%%{init: {'theme': 'default', 'flowchart': {'nodeSpacing': 20, 'rankSpacing': 30}}}%%
flowchart LR
    A["Step 1"] --> B["Step 2"]
    B --> C["Step 3"]
</pre>

</div>
<div class="column">

**How it works:**
- Step 1 does X
- Step 2 does Y
- Step 3 does Z

</div>
</div>
```

### 6. Standalone Mermaid

```markdown
## Process Title

<pre class="mermaid">
%%{init: {'theme': 'default', 'flowchart': {'nodeSpacing': 15, 'rankSpacing': 20}}}%%
flowchart TD
    A["Start"] --> B{"Decision"}
    B -->|"Yes"| C["Path A"]
    B -->|"No"| D["Path B"]
    C --> E["End"]
    D --> E
</pre>

Brief explanation (1-2 lines max).
```

### 7. Image + Text (Background)

```markdown
## Visual Concept

![bg right:40% fit](images/diagram.png)

- Explanation of the visual
- Key point about the concept
- Supporting detail
```

Text goes on the left; image fills the right 40%.

### 8. Image + Text (Inline)

```markdown
## Visual Concept

![Descriptive alt text](images/diagram.svg) <!-- .element: style="max-height: 450px;" -->

Brief explanation (1-2 lines only with constrained image).
```

### 9. Compact Table

```markdown
<!-- .slide: class="dense" -->

## Data Title

| Column A | Column B | Column C |
|----------|----------|----------|
| data | data | data |
| data | data | data |
| data | data | data |
| data | data | data |
| data | data | data |
```

For even tighter tables, use `<table class="compact">` with HTML.

### 10. Vertical Slide Split

When content exceeds capacity:

```markdown
## Topic Title

First 4-5 points here

<!-- vertical -->

## Topic Title (cont.)

Remaining points here
```

### 11. Title Slide

```markdown
<!-- .slide: id="title" -->

<span class="course-week">CS 7180 · Week N</span>

## Lecture Title

Subtitle · Topics · Listed

<img src="../img/seal_logotype-768x252.png" alt="Northeastern University" width="300">

[**John Alexis Guerra Gomez**](http://johnguerra.co/)

<small>jguerra at northeastern.edu · [Class](https://johnguerra.co/classes/aiCoding_spring_2026/) · [Slides](http://johnguerra.co/lectures/ai_assisted_coding/NN_Topic/)</small>
```

### 12. Section Divider

```markdown
---

# Section Name

> Brief description of the section
```

Section dividers (h1 only, no h2-h6) do NOT get auto-fragments.

## Font Size Classes

| Class | Applied to | Size | Use for |
|---|---|---|---|
| (default) | -- | p/li: 0.8em, pre: 0.55em, table: 0.7em | Normal slides |
| `.dense` | slide | p/li: 0.75em, h2: 1.2em, pre: 0.45em, table: 0.6em | Heavy-content slides |
| `.small` | element | 0.7em | Captions, column text |
| `.smaller` | element | 0.5em | Source attributions |
| `.compact` | table | 0.65em + tight padding | Dense data tables |

Apply to slide: `<!-- .slide: class="dense" -->`
Apply to element: `<small>Text</small>` or `<div class="column small">`

## Mermaid Rules

1. **Always `<pre class="mermaid">`** — never triple-backtick mermaid blocks
2. **Always include init directives:**
   ```
   %%{init: {'theme': 'default', 'flowchart': {'nodeSpacing': 20, 'rankSpacing': 30}}}%%
   ```
3. **Max nodes:** 8-10 standalone, 5-7 when paired with text in columns
4. **Reduce spacing** for complex diagrams: `nodeSpacing: 15, rankSpacing: 20`
5. **SVGs capped** at `max-height: 65vh` by CSS
6. **Prefer LR** for process flows, **TD** for hierarchies

## Slide Structure

- `---` = horizontal slide (new section)
- `<!-- vertical -->` = vertical slide (sub-topic within section)
- Fragments auto-applied to top-level `p`, `li`, `table`, `blockquote`, `pre`
- NOT applied to title slides (`id="title"`) or section dividers (h1-only)

## Common Mistakes

| Mistake | Fix |
|---|---|
| 10+ bullets on one slide | Split with `<!-- vertical -->` or use `.dense` |
| Code block + 6 bullets | Use columns or separate vertical slides |
| Table 10+ rows | `.dense` + `.compact`, or split across slides |
| Mermaid 15+ nodes | Simplify or split into multiple diagrams |
| Nested bullets (3 levels) | Flatten to 2 levels max |
| Missing blank lines in column divs | Blank line after `<div>` and before `</div>` |
| Triple-backtick mermaid | Use `<pre class="mermaid">` instead |
| Large image without constraint | Use `max-height: 450px` or `![bg right:40% fit]` |
| `.dense` on 3+ consecutive slides | Section has too much content — add more slides |

## Pedagogical Guidelines

- **One idea per slide.** If you need "and also...", make a new vertical slide.
- **Comparisons always use columns.** Side-by-side is faster to parse than sequential.
- **Lead with the visual.** Diagram first, explain second.
- **Code examples need context.** Always pair with h2 and 1-2 bullets.
- **Tables for structured data, bullets for narrative.** Don't table-ify what bullets convey.
- **Progressive disclosure.** Fragments auto-apply — write content in reveal order.

## Overflow Verification

After authoring or editing slides:

1. Run `cd slides && npm run serve`
2. Navigate to the lecture
3. Press **Shift+O** to toggle overflow detection (red outlines)
4. Or add `?overflow` before the `#` in the URL
5. Fix flagged slides using techniques from this guide
