# Syllabus Consolidation — Fall 2026 (CS 6983)

**Date:** 2026-08-07
**Status:** Approved, ready for implementation planning

## Problem

The repository holds two unrelated syllabus lineages whose version numbers collide, and
neither one carries Fall 2026 content in the instructor's required format.

### Lineage A — the instructor's Word format (§1–§11, NU boilerplate)

| Artifact | State |
|---|---|
| `~/My Drive/2026/NU/Spring2026_VibeCoding/CS7180_VibeCoding_Syllabus.docx` | Word-authored, Cambria body / Calibri headings, Spring 2026. Text is byte-identical to the repo copy |
| `course/CS7180_VibeCoding_Syllabus.docx` | Repo mirror of the above |
| `course/CS7180_VibeCoding_Syllabus_v2.md` | Complete 11-section markdown mirror of the format. Content stale |
| `course/generate-syllabus.js` | Hardcodes its content; emits `CS7180_VibeCoding_Syllabus_v2.docx` |
| `course/CS7180_VibeCoding_Syllabus_v2.docx` | **Lossy** — 7,526 chars of text vs 16,825 in the original |

### Lineage B — a different, shorter syllabus

| Artifact | State |
|---|---|
| `course/syllabus.md` | `## Course Information` structure. The only Fall 2026 / CS 6983 content in the repo |
| `course/generate-syllabus-pdf.py` | reportlab; reads `syllabus.md` → PDF |
| `CS7180_..._v2.pdf`, `CS7180_..._v3.pdf`, `CS6983_..._v1.pdf` | All Lineage B output |

The "v3" in the folder is **not** a newer version of `_v2.docx`. It is an unrelated
Lineage B PDF that happens to share a version number.

### Defects

1. **`generate-syllabus.js` silently drops required boilerplate.** Its output omits
   §3.2 Bonus Points, §3.3 Pre-class Work, §3.5 Participation, all of §4 Course
   Materials, all of §5 General Policies (Attendance, Academic Integrity,
   Reasonable Accommodations, **Title IX**, **Students with Disabilities**,
   Generative AI Tools), and §8–§11. This shipped as an official syllabus.
2. **Grade scale gap.** The original Word doc had `C- 65.00–68.99` / `F 0.00–64.99`.
   The v2 rewrite changed F to `0–59`, leaving **60.00–64.99 mapped to no letter
   grade**. Present in `syllabus.md`, `COURSE_MEMORY.md`, `CS7180_..._v2.md`, and the
   shipped `_v2.docx`.
3. **Project weights do not sum.** `COURSE_MEMORY.md:192` gives P1 = 15%; with
   P2 18% + P3 19% that totals 52%, not the stated 50%.
4. **Homework weights do not sum.** Every file in `course/assignments/` states
   "Weight: 4%"; five assignments × 4% = 20%, but the syllabus states 25%.
5. **Homework filenames inverted.** `hw1-mom-test.md` contains `# HW2: Mom Test`;
   `hw2-prompt-engineering.md` contains `# HW1: Prompt Engineering Battle`. The file
   *contents* agree with `schedule.md`; only the filenames are wrong.
6. **No Fall 2026 content in the instructor's format.** `CS7180_..._v2.md` still says
   CS 7180, Spring 2026, Tu/Th 3:00 PM, Lucie Stern 035, "modalities", six homeworks,
   fifteen weeks, P1 due Week 6.

## Approach

Prior attempts failed because markdown was rendered through a PDF library
(reportlab) that reinvented the visual design from scratch. The fix is to stop
reinventing it and **inherit** it: pandoc's `--reference-doc` takes styles, theme,
and embedded fonts from an existing `.docx`.

**Feasibility verified.** Running

```
pandoc course/CS7180_VibeCoding_Syllabus_v2.md \
  --reference-doc=course/CS7180_VibeCoding_Syllabus.docx -o spike.docx
```

produced a 6.9 MB `.docx` whose `styles.xml` matches the original: Cambria body font,
Calibri Heading 1 bold `#366091` at 14 pt, Calibri Heading 2 bold `#4F81BD` at 13 pt,
all 14 embedded font files carried over, and no reference style dropped. Pandoc
reserializes the XML and appends syntax-highlighting styles, so the file is not
byte-identical — see Verification, check 3.

The one discrepancy is heading depth. Markdown `#` maps to Word `Heading1`, `##` to
`Heading2`, `###` to `Heading3`; the original document uses `Heading1` for §N (11
occurrences) and `Heading2` for §N.N (31 occurrences), with no `Heading3` and no
document-title heading. The master markdown therefore uses `#` for §N and `##` for
§N.N, and renders the title/instructor block as plain paragraphs. No
`--shift-heading-level-by` is needed.

Northeastern's Word theme is preserved because it is never regenerated — only copied.

## Design

### File layout

**Create**

- `course/templates/syllabus-reference.docx` — copy of the GDrive Word document,
  retained solely for its `styles.xml`, theme, and embedded fonts. Never hand-edited;
  it is the style contract.
- `course/build-syllabus.sh` — a single pandoc invocation producing
  `course/CS6983_VibeCoding_Syllabus_f26.docx`.

**Rewrite**

- `course/syllabus.md` — becomes the single source of truth, restructured into the
  §1–§11 Word format. Replaces the current short-form structure.

**Archive** to `course/archive/spring2026/`

`CS7180_VibeCoding_Syllabus.docx`, `.pdf`, `_v2.docx`, `_v2.md`, `_v2.pdf`, `_v3.pdf`.
These were distributed to Spring 2026 students and are kept as a record.

**Delete**

- `course/generate-syllabus.js` — the source of defect 1.
- `course/generate-syllabus-pdf.py` — produces a format the instructor does not want.
- `course/package.json`, `course/package-lock.json`, `course/node_modules/` — the
  `docx` dependency exists only for the deleted JS generator.
- `course/CS6983_VibeCoding_Syllabus_v1.pdf` — never distributed, wrong format.

### Build pipeline

```
course/syllabus.md
   │  pandoc --reference-doc=course/templates/syllabus-reference.docx
   ▼
course/CS6983_VibeCoding_Syllabus_f26.docx
   │  Word → File → Save as PDF   (manual)
   ▼
course/CS6983_VibeCoding_Syllabus_f26.pdf
```

PDF generation stays manual. LibreOffice is not installed, and the Word export step
coincides with the review pass the instructor performs before publishing anyway.

### Naming

The `_v1` / `_v2` / `_v3` suffixes are retired — they collided across two lineages and
carried no reliable ordering. Filenames carry the term (`_f26`); the version number
lives in the §Version History table inside the document.

### Content changes to `course/syllabus.md`

| Section | Change |
|---|---|
| Header | CS 7180 → **CS 6983**; Spring 2026 → **Fall 2026**. Replace the single class time with two sections: Oakland/Online Tu & Fri 10:35 AM–12:15 PM PT; San Jose Wed 1:00–4:20 PM PT. Rooms TBD. Add term dates Sep 9 – Dec 13, 2026 and no-class dates: Oct 12 (Indigenous Peoples' Day), Nov 11 (Veterans Day), Nov 25–29 (Fall Break, classes resume Nov 30) |
| §1, §1.1 | "three AI coding **modalities**" → "**harnesses**" throughout. Add agent architectures, extensibility (skills, hooks, MCP, sub-agents), and AI security to the topic bullets and course outcomes |
| §1.2 | Prerequisites unchanged: CS 5010 (min D) or CS 5004 (min C) |
| §2 | Replace the 15-week table with **14 weeks + Finals**, including week dates, sourced from `course/schedule.md`. Retain the Week 12 / Fall Break collision note |
| §3 | Participation 15% · Weekly Quizzes 10% · Homeworks 25% (**five** assignments, not six) · Projects 50% (13/18/19) |
| §3.6 | **F = 0.00–64.99**, closing the 60–64.99 gap |
| §4.2 | Cursor documentation → **Antigravity documentation** |
| §4.3 | Antigravity (free) replaces Cursor IDE; Claude Code moves from *recommended* to **required** |
| §5.2, §5.8 | Remove all remaining No-AI Challenge references |
| §5.4, §11 | Office hours → **by appointment via Slack**. Remove "Tuesdays 2–4 PM" and "AI debugging clinics (Fridays)" — Friday is now a class day for the Oakland/Online section |
| §6 | P1 13% due Week 6 · P2 18% due Week 9 · P3 19% due **Finals Week (Dec 14–20, 2026)** |
| §7 | "The Three Modalities" → **"The Three Harnesses"**: Claude Web (W4–5), Antigravity (W6–8), Claude Code (W9–14) |
| §8 | **Five** homeworks at **5%** each: HW1 Prompt Engineering (W4), HW2 Mom Test (W5), HW3 Context Engineering (W8), HW4 Claude Code Workflow + TDD (W10), HW5 Custom Skill + MCP (W12) |
| §9 | Weekly Quizzes; LLM Fundamentals moves to **Week 2** (Week 1 is Foundations) |
| Version History | Add v3.0 — Fall 2026, CS 6983 renumber, 14 weeks + Finals, harness reframe, five homeworks, grade-scale fix |

### Collateral fixes

- `course/COURSE_MEMORY.md:192` — Project 1 weight 15% → **13%**
- `course/COURSE_MEMORY.md:84` — F `0-59` → **`0-64`**
- `course/assignments/hw1-mom-test.md` → rename to `hw2-mom-test.md`
- `course/assignments/hw2-prompt-engineering.md` → rename to `hw1-prompt-engineering.md`
- All five files in `course/assignments/` — "Weight: 4%" → **"Weight: 5%"**
- `CLAUDE.md` — update the repository-structure block for the two renamed files

### Out of scope

`course/schedule.md`, `course/readings.md`, `website/timeline.js`, `website/index.pug`,
and the slide decks are not modified. No `/sync-course` sweep is run. Any additional
drift found during implementation is reported, not fixed.

## Verification

The build is not complete until all four checks pass against
`course/CS6983_VibeCoding_Syllabus_f26.docx`:

1. **Section completeness** — extract `word/document.xml` text and assert all eleven
   top-level sections are present, by number and title.
2. **Boilerplate regression guard** — assert the strings "Title IX" and
   "Disability Resource Center" appear. This is the exact regression that
   `generate-syllabus.js` introduced.
3. **Style fidelity** — compare `word/styles.xml` *semantically*, not byte-wise.
   Pandoc reserializes the XML (attribute order changes, `<w:b/>` becomes `<w:b />`)
   and appends its own syntax-highlighting styles (`AlertTok`, `CharTok`, …), so the
   files are never byte-identical even though the formatting is unchanged. The check
   parses `docDefaults`, `Normal`, `Heading1`, and `Heading2` and asserts the
   effective properties match: Cambria body at 11 pt, Calibri Heading 1 bold `#366091`
   at 14 pt, Calibri Heading 2 bold `#4F81BD` at 13 pt. It also asserts pandoc dropped
   no styles that the reference defines.
4. **Heading mapping** — assert the output uses `Heading1` for §N and `Heading2` for
   §N.N, with no `Heading3`.

Checks 1–4 are scripted. A manual visual pass in Word follows before the PDF export.

## Decisions made

| Question | Decision |
|---|---|
| What "the design I want" refers to in `_v2.docx` | The §1–§11 content and structure, not the generated Arial/blue typography. Original Cambria/Calibri look is retained |
| Grade scale gap | **F = 0.00–64.99**. No D band introduced |
| PDF production | Manual export from Word. No LibreOffice dependency |
| P1 weight | **13%**, so projects total exactly 50% |
| Office hours | By appointment via Slack |
| Cleanup scope | Syllabus plus the numeric conflicts it depends on. No full course sync |
