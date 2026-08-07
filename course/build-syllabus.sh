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

pandoc syllabus.md \
  --reference-doc=templates/syllabus-reference.docx \
  --from=markdown+pipe_tables \
  -o CS6983_VibeCoding_Syllabus_f26.docx

echo "Built: course/CS6983_VibeCoding_Syllabus_f26.docx"
