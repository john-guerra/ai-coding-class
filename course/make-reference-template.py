#!/usr/bin/env python3
"""Regenerate course/templates/syllabus-reference.docx.

The template is the instructor's original Word document (Cambria body, Calibri
headings, embedded fonts, Northeastern theme) PLUS the handful of paragraph and
table styles pandoc's docx writer emits but that document never defined.

Why this is needed: pandoc uses the reference document's styles.xml wholesale.
It writes `<w:pStyle w:val="Compact"/>` on every list item, `FirstParagraph`
after headings, and `Table` on tables. When those styles are undefined the
paragraphs fall back to defaults -- bullets lose their marker and indent, and
tables lose their borders. Grafting the definitions in fixes it while leaving
every visual style of the original untouched.

Usage: python3 course/make-reference-template.py
"""
import re
import shutil
import subprocess
import sys
import tempfile
import zipfile
from pathlib import Path

HERE = Path(__file__).parent
ORIGINAL = HERE / "archive" / "spring2026" / "CS7180_VibeCoding_Syllabus.docx"
TEMPLATE = HERE / "templates" / "syllabus-reference.docx"

# Paragraph styles pandoc's docx writer references. Any of these missing from
# the original document is copied verbatim from pandoc's default reference.docx.
REQUIRED = ["Compact", "FirstParagraph", "BodyText"]

# Pandoc writes <w:tblStyle w:val="Table"/> on every table but emits no borders
# of its own. The original document's tables used a custom table style (bold
# first row, blue banding) plus directly-applied borders. Deriving "Table" from
# that style -- and folding the borders into it -- reproduces the original look
# without pandoc needing to emit anything extra.
TABLE_BORDERS = (
    "<w:tblBorders>"
    '<w:top w:val="single" w:sz="8" w:space="0" w:color="4F81BD"/>'
    '<w:left w:val="single" w:sz="8" w:space="0" w:color="4F81BD"/>'
    '<w:bottom w:val="single" w:sz="8" w:space="0" w:color="4F81BD"/>'
    '<w:right w:val="single" w:sz="8" w:space="0" w:color="4F81BD"/>'
    '<w:insideH w:val="single" w:sz="8" w:space="0" w:color="4F81BD"/>'
    '<w:insideV w:val="single" w:sz="8" w:space="0" w:color="4F81BD"/>'
    "</w:tblBorders>"
)


def style_ids(styles_xml):
    return set(re.findall(r'w:styleId="([^"]+)"', styles_xml))


def extract_style(styles_xml, style_id):
    m = re.search(r'<w:style [^>]*w:styleId="%s".*?</w:style>' % re.escape(style_id),
                  styles_xml, re.S)
    return m.group(0) if m else None


def source_style_id(definition):
    return re.search(r'w:styleId="([^"]+)"', definition).group(1)


def original_table_style(styles_xml, document_xml):
    """The table style the original document's own tables actually reference.

    Do NOT guess by scanning styles.xml -- Word documents carry every built-in
    table style (LightShading, MediumGrid2, ...), and picking the first one with
    conditional formatting lands on a grey built-in rather than the document's
    own blue-banded style.
    """
    m = re.search(r'<w:tblStyle w:val="([^"]+)"', document_xml)
    if not m:
        return None, None
    return extract_style(styles_xml, m.group(1)), m.group(1)


def main():
    if not ORIGINAL.exists():
        print(f"error: original not found: {ORIGINAL}")
        return 1

    with tempfile.TemporaryDirectory() as tmp:
        default = Path(tmp) / "pandoc-default.docx"
        with open(default, "wb") as fh:
            subprocess.run(["pandoc", "--print-default-data-file", "reference.docx"],
                           stdout=fh, check=True)
        default_styles = zipfile.ZipFile(default).read(
            "word/styles.xml").decode("utf-8")

        src = zipfile.ZipFile(ORIGINAL)
        styles = src.read("word/styles.xml").decode("utf-8")
        have = style_ids(styles)

        grafted = []
        for sid in REQUIRED:
            if sid in have:
                continue
            definition = extract_style(default_styles, sid)
            if not definition:
                print(f"error: {sid} not found in pandoc's default reference.docx")
                return 1
            styles = styles.replace("</w:styles>", definition + "</w:styles>")
            grafted.append(sid)

        if "Table" not in have:
            source, source_id = original_table_style(
                styles, src.read("word/document.xml").decode("utf-8"))
            if not source:
                print("error: could not resolve the original's table style")
                return 1
            table = source.replace('w:styleId="%s"' % source_id,
                                   'w:styleId="Table"')
            table = re.sub(r"<w:name w:val=\"[^\"]*\"/>", "", table)
            table = table.replace("<w:basedOn",
                                  '<w:name w:val="Table"/><w:basedOn', 1)
            # Fold the directly-applied borders into the style itself.
            if "<w:tblPr>" in table:
                table = table.replace("<w:tblPr>", "<w:tblPr>" + TABLE_BORDERS, 1)
            # Pandoc emits tblLook with noVBand="0", which turns on vertical
            # banding the original never used -- it shaded column 1 grey and
            # boxed alternating cells. Drop the column-oriented conditional
            # formatting so only the bold first row and horizontal banding
            # survive, which is how the original tables actually looked.
            for kind in ("firstCol", "lastCol", "lastRow", "band1Vert", "band2Vert"):
                table = re.sub(
                    r'<w:tblStylePr w:type="%s">.*?</w:tblStylePr>' % kind,
                    "", table, flags=re.S)
            styles = styles.replace("</w:styles>", table + "</w:styles>")
            grafted.append("Table (derived from the original's table style)")

        TEMPLATE.parent.mkdir(parents=True, exist_ok=True)
        tmp_out = TEMPLATE.with_suffix(".docx.tmp")
        with zipfile.ZipFile(tmp_out, "w", zipfile.ZIP_DEFLATED) as dst:
            for item in src.infolist():
                data = src.read(item.filename)
                if item.filename == "word/styles.xml":
                    data = styles.encode("utf-8")
                dst.writestr(item, data)
        src.close()
        shutil.move(str(tmp_out), str(TEMPLATE))

    print(f"Template rebuilt from {ORIGINAL.name}")
    print(f"Grafted styles: {', '.join(grafted) if grafted else '(none needed)'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
