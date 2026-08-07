#!/usr/bin/env python3
"""Rewrite pandoc's injected bullet glyph to the one the reference document uses.

Pandoc appends its own bullet list definitions to numbering.xml using
Symbol-font U+F0B7, a private-use codepoint. Word renders it; LibreOffice,
Google Docs, and most PDF viewers render nothing at all, so every bullet
silently disappears.

The instructor's original document uses U+25CF BLACK CIRCLE in Noto Sans
Symbols. This script copies that glyph and font onto every bullet level
pandoc generated, so the built document uses the same marker the original did.

Usage: python3 course/fix-bullets.py <built.docx> <reference.docx>
"""
import re
import shutil
import sys
import zipfile
from pathlib import Path

LVL_TEXT = re.compile(r'(<w:lvlText w:val=")([^"]*)(")')


def reference_bullet(reference):
    """Return (lvlText, ascii_font) of the first bullet level in the reference."""
    xml = zipfile.ZipFile(reference).read("word/numbering.xml").decode("utf-8")
    for lvl in re.findall(r"<w:lvl [^>]*>.*?</w:lvl>", xml, re.S):
        if '<w:numFmt w:val="bullet"' not in lvl:
            continue
        text = re.search(r'<w:lvlText w:val="([^"]*)"', lvl)
        font = re.search(r'w:ascii="([^"]*)"', lvl)
        if text:
            return text.group(1), (font.group(1) if font else None)
    return None, None


def patch_bullets(xml, glyph, font):
    """Set every bullet level's glyph and font. Returns (xml, count)."""
    count = 0
    out = []
    pos = 0
    for m in re.finditer(r"<w:lvl [^>]*>.*?</w:lvl>", xml, re.S):
        lvl = m.group(0)
        if '<w:numFmt w:val="bullet"' not in lvl:
            continue
        new = LVL_TEXT.sub(lambda mm: mm.group(1) + glyph + mm.group(3), lvl)
        if font:
            if "<w:rFonts" in new:
                # Replace ascii/hAnsi/cs together -- leaving hAnsi="Symbol"
                # makes renderers pick Symbol for the glyph and draw nothing.
                new = re.sub(r'<w:rFonts[^>]*/>',
                             f'<w:rFonts w:ascii="{font}" w:hAnsi="{font}" '
                             f'w:cs="{font}" w:hint="default"/>', new)
            else:
                new = new.replace(
                    "</w:lvl>",
                    f'<w:rPr><w:rFonts w:ascii="{font}" w:hAnsi="{font}" '
                    f'w:cs="{font}"/></w:rPr></w:lvl>')
        out.append(xml[pos:m.start()])
        out.append(new)
        pos = m.end()
        count += 1
    out.append(xml[pos:])
    return "".join(out), count


def main():
    if len(sys.argv) != 3:
        print(__doc__)
        return 1
    built, reference = Path(sys.argv[1]), Path(sys.argv[2])

    glyph, font = reference_bullet(reference)
    if not glyph:
        print(f"error: no bullet level found in {reference}")
        return 1

    src = zipfile.ZipFile(built)
    if "word/numbering.xml" not in src.namelist():
        print("note: no numbering.xml in output; nothing to patch")
        return 0

    patched, count = patch_bullets(
        src.read("word/numbering.xml").decode("utf-8"), glyph, font)

    tmp = built.with_suffix(".docx.tmp")
    with zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as dst:
        for item in src.infolist():
            data = src.read(item.filename)
            if item.filename == "word/numbering.xml":
                data = patched.encode("utf-8")
            dst.writestr(item, data)
    src.close()
    shutil.move(str(tmp), str(built))

    print(f"Bullets: patched {count} level(s) to U+{ord(glyph):04X} "
          f"in {font or 'inherited font'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
