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

----

## Sub-slide (vertical)
```

## Separators

- `---` creates a new horizontal slide (new topic)
- `----` creates a vertical slide (subtopic under current section)

## Reveal.js Built-in Classes

- `r-fit-text` - Auto-scales text to fit slide
- `r-stretch` - Makes element fill remaining vertical space
- `r-stack` - Centers/layers elements for progressive disclosure
