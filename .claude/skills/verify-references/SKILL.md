---
name: verify-references
description: Use when adding research, citations, or factual claims to course materials — verifies all URLs work and all numeric claims have proper sourced references
---

# Verify References

## Overview

Audit course materials for broken URLs and unsourced factual claims. Every specific number, percentage, or data point must have a clickable source URL.

## When to Use

- After adding or updating research content (docs/research/)
- After adding or updating class readings or slides
- After adding factual claims with specific numbers to any course file
- After editing readings/resources sections in schedule, slides, or handouts
- On-demand with `/verify-references` to check the full repo

## Core Pattern

```
For each file in scope:
  1. Extract NEW URLs → WebFetch each → report broken ones. Save last date of checking.
  2. Extract ALL numeric claims (percentages, counts, multipliers)
     → check each has a [source](url) within 5 lines
     → flag unsourced claims
  3. For sourced claims: spot-check that the linked page
     actually contains the claimed data point
```

## Quick Reference

| Check | What to look for | Tool |
|-------|-----------------|------|
| Broken URL | HTTP 404, 403, redirects to wrong page | WebFetch |
| Unsourced claim | Number/% without a nearby `[source](url)` or `**Source:**` block | Grep + Read |
| Mismatched claim | Source page doesn't contain the stated number | WebFetch with targeted prompt |
| Stale reference | "2024 report" linked to page now showing 2025 data | WebFetch |

## Scope

Default file patterns to check:

```
docs/research/**/*.md
course/**/*.md
slides/**/index.md (readings sections only)
```

## Output Format

Report using this structure:

```markdown
## Reference Verification Report

### Broken URLs
| File:Line | URL | Error |
|-----------|-----|-------|

### Unsourced Claims
| File:Line | Claim | Attributed to | Fix needed |
|-----------|-------|---------------|------------|

### Mismatched Claims
| File:Line | Claim in file | What source says |
|-----------|--------------|-----------------|

### Summary
- X URLs checked, Y broken
- Z numeric claims found, W unsourced
```

## Common Mistakes

- **Checking only new content** — older sections accumulate link rot. Check the full file.
- **Skipping non-Anthropic URLs** — external references (Veracode, OWASP, HumanLayer) break more often than first-party links.
- **Accepting named attribution as "sourced"** — "Veracode 2025 found 45%" is NOT properly sourced without a clickable URL. The standard is: reader can click and verify.
- **Not spot-checking content** — a working URL that doesn't contain the claimed number is worse than a broken URL (implies fabrication).