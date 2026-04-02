---
name: sync-course
description: Use when weekly topics, dates, due dates, or course structure have been modified — verifies all course artifacts (schedule, readings, timeline, website, slides, projects) are consistent with each other
---

# Sync Course

## Overview

Verify that all course artifacts agree on weekly topics, due dates, and structure. Catches drift caused by updating one file but forgetting others.

## When to Use

- After changing weekly topics, module names, or due dates
- After adding/removing weeks or restructuring the schedule
- After modifying readings, slides, or project specs
- Periodically as a sanity check before deploying

## Artifacts to Check

| Artifact | File | Key fields |
|----------|------|-----------|
| Schedule | `course/schedule.md` | Module names, topics, deliverables per week |
| Readings | `course/readings.md` | Week headers, summary table at bottom |
| Course Memory | `course/COURSE_MEMORY.md` | Schedule table (~line 100), key dates (~line 1460) |
| Timeline | `website/timeline.js` | `weeklyFocus` entries, `totalWeeks`, phase ranges, project `endWeek` |
| Website table | `website/index.pug` | Schedule table rows, readings accordion sections |
| Slides | `slides/XX_*/index.md` | `course-week` span, title, "What We'll Cover" |
| Projects | `course/projects/*.md` | Due dates (line ~4 of each) |

## Verification Steps

1. **Extract week count**: Read `totalWeeks` from `timeline.js`, count rows in `schedule.md` table, count weeks in pug table. All must match.
2. **For each week with a slide deck**: Compare the module name in `schedule.md` vs the slide title vs `weeklyFocus[N].topic` vs the pug table row.
3. **Check key dates**: P1/P2/P3 due weeks and HW due weeks must match across `schedule.md`, `COURSE_MEMORY.md`, `timeline.js` (project `endWeek`), `index.pug` badges, and `projects/*.md`.
4. **Check readings alignment**: Each week header in `readings.md` should match the module name in `schedule.md`. The summary table at the bottom of `readings.md` must include all lecture weeks.
5. **Flag missing slide decks**: Any lecture week (not Spring Break, not Finals) without a `slides/XX_*/` folder.

## Output Format

```markdown
## Course Sync Report

### Mismatches Found
| Week | File A | File B | Field | A says | B says |
|------|--------|--------|-------|--------|--------|

### Missing Content
- [ ] Week X: No slide deck at slides/XX_*/

### Summary
X weeks checked, Y mismatches, Z missing items
```

## Common Drift Patterns

- Updated `schedule.md` but forgot `readings.md` week headers or summary table
- Changed due date in one file but not `timeline.js` project `endWeek`
- Renamed a module in schedule but slide title still shows old name
- Added a new week to schedule but no `weeklyFocus` entry in `timeline.js`
- Updated pug schedule table but forgot the readings accordion
