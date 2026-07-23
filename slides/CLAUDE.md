# Slides (reveal-md)

Each lecture folder contains:
- `index.md` - Reveal.js markdown with YAML frontmatter
- `images/` - Lecture-specific images

## Slide Template

```markdown
---
title: "Lecture Title"
theme: white
revealOptions:
  transition: convex
  hash: true
  history: true
---

## Slide Title

Content here

---

# New Section (horizontal)

<!-- vertical -->

## Sub-slide (vertical)
```

## Separators

This project overrides reveal-md's defaults (see `reveal-md.json`:
`separator: "^---$"`, `verticalSeparator: "^<!-- vertical -->$"`):

- `---` (on its own line) creates a new horizontal slide (new topic)
- `<!-- vertical -->` (on its own line) creates a vertical slide (subtopic
  under the current section) — **not** `----`, which is the reveal-md default
  and does nothing here

## Reveal.js Built-in Classes

- `r-fit-text` - Auto-scales text to fit slide
- `r-stretch` - Makes element fill remaining vertical space
- `r-stack` - Centers/layers elements for progressive disclosure

## Markdown Tables — do NOT column-align

Write tables **compact**, one space around each cell — never pad columns to
align them:

```markdown
| Task | Harness |
| --- | --- |
| Project ideation | Claude Web |
```

reveal-md collapses long internal space runs (the alignment padding) into
newlines, which splits a table row across lines and makes the whole table
render as raw `| ... |` text. `js/overflow-check.js` auto-detects this on load
(console warning; dashed orange outline in `?overflow` mode). If a markdown
table still misbehaves, use a plain HTML `<table>` instead — it always renders
and still picks up the design-system table styling. (Note: markdown tables also
do **not** parse inside a raw HTML block like `<div class="split-text">` — use
an HTML `<table>` there.)
