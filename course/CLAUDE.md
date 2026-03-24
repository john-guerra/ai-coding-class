# Course Content

## Key Course Files

| File | Purpose |
|------|---------|
| `COURSE_MEMORY.md` | Complete course plan, rubrics, policies |
| `syllabus.md` | Official syllabus |
| `schedule.md` | 15-week schedule with deliverables |
| `readings.md` | Required readings by week |

## Document Versioning

When generating syllabus or course documents:
- Keep all versions (v1, v2, v3...) — never overwrite previous versions
- Name pattern: `CS7180_VibeCoding_Syllabus_v{N}.pdf`
- Source of truth: `course/syllabus.md`
- Generate with: `python course/generate-syllabus-pdf.py` (auto-increments version)

## Handouts

Supplementary handouts live in `course/handouts/` as markdown source + generated PDF.

Generate with: `python course/generate-handout-pdf.py <markdown-file> [--subtitle "..."] [--footer "..."]`

Example: `python course/generate-handout-pdf.py course/handouts/public-api-guide.md --subtitle "CS 7180 — Project 2 Handout"`

Handouts are idempotent (no versioning — PDF is overwritten on regeneration).
