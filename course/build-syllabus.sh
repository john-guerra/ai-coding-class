#!/usr/bin/env bash
# Build the CS 6983 syllabus .docx from the markdown master.
#
# Visual design is INHERITED from course/templates/syllabus-reference.docx
# (the instructor's own Word document) via pandoc --reference-doc. Nothing
# about the look is defined here -- do not add styling flags.
#
# PDF: open the output in Word and File -> Save as PDF. LibreOffice is not
# installed and Word export is the fidelity baseline.
set -euo pipefail

cd "$(dirname "$0")"

OUT=CS6983_VibeCoding_Syllabus_f26.docx

pandoc syllabus.md \
  --reference-doc=templates/syllabus-reference.docx \
  --from=markdown+pipe_tables+raw_attribute \
  -o "$OUT"

# Pandoc injects Symbol-font U+F0B7 as the bullet glyph. Word renders it;
# LibreOffice and most PDF viewers render nothing, so bullets vanish. Swap in
# the glyph the reference document actually uses.
python3 fix-bullets.py "$OUT" templates/syllabus-reference.docx

echo "Built: course/$OUT"

# Render a PDF for visual review when LibreOffice is available. Word's own
# "Save as PDF" remains the fidelity baseline for the shipped file.
if command -v soffice >/dev/null 2>&1; then
  soffice --headless --convert-to pdf --outdir . "$OUT" >/dev/null 2>&1
  echo "Preview PDF: course/${OUT%.docx}.pdf"
fi
