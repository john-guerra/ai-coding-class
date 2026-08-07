# Course Content

## Key Course Files

| File | Purpose |
|------|---------|
| `COURSE_MEMORY.md` | Complete course plan, rubrics, policies |
| `syllabus.md` | Official syllabus |
| `schedule.md` | 14-week + Finals schedule with deliverables |
| `readings.md` | Required readings by week |

## Syllabus

- **Source of truth:** `course/syllabus.md` — the full §1–§11 Northeastern
  syllabus. Edit only this file.
- **Build:** `bash course/build-syllabus.sh` → `course/CS6983_VibeCoding_Syllabus_f26.docx`
- **Verify:** `python3 course/verify-syllabus.py` — must exit 0 before shipping.
  It guards the regression that made the old generator silently drop Title IX
  and the DRC notice.
- **PDF:** `build-syllabus.sh` renders a preview PDF via LibreOffice when
  `soffice` is on PATH — use it to eyeball layout without opening Word. The
  **shipped** PDF should still come from Word → File → Save as PDF; Word is the
  fidelity baseline. Preview PDFs are gitignored.
- **Style:** inherited from `course/templates/syllabus-reference.docx`, a frozen
  copy of the instructor's own Word document. **Never hand-edit that template.**
- **Structure rule:** `#` maps to Word `Heading1` (exactly 11 — §1 through §11),
  `##` maps to `Heading2`. No `###`, and no document-title `#`.
- **Versioning:** no `_vN` filenames — they previously collided across two
  unrelated document lineages — and **no changelog inside the syllabus**. Git
  history is the record. Superseded terms are archived under
  `course/archive/<term>/`.
- **Regenerating the template:** `python3 course/make-reference-template.py`.
  It rebuilds the template from the archived original plus the paragraph and
  table styles pandoc needs (`Compact`, `FirstParagraph`, `Table`). Without
  those grafts, list bullets lose their marker and indent and tables lose
  their borders.

## Handouts

Supplementary handouts live in `course/handouts/` as markdown source + generated PDF.

Generate with: `python course/generate-handout-pdf.py <markdown-file> [--subtitle "..."] [--footer "..."]`

Example: `python course/generate-handout-pdf.py course/handouts/public-api-guide.md --subtitle "CS 6983 — Project 2 Handout"`

Handouts are idempotent (no versioning — PDF is overwritten on regeneration).
