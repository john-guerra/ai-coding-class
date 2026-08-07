#!/usr/bin/env python3
"""Verify the built syllabus .docx against the reference style contract.

Guards the regression that broke generate-syllabus.js: it silently dropped
Title IX, the Disability Resource Center notice, and sections 8-11.

Usage: python3 course/verify-syllabus.py
Exit:  0 all checks pass, 1 any check fails.
"""
import re
import sys
import zipfile
from pathlib import Path

HERE = Path(__file__).parent
BUILT = HERE / "CS6983_VibeCoding_Syllabus_f26.docx"
REFERENCE = HERE / "templates" / "syllabus-reference.docx"

SECTIONS = [
    "1. Objectives and Course Description",
    "2. Proposed Schedule",
    "3. Course Assessment",
    "4. Course Materials",
    "5. General Policies",
    "6. Project Requirements Summary",
    "7. The Three Harnesses",
    "8. Homework Assignments",
    "9. Key Course Features",
    "10. Success in This Course",
    "11. Learning Resources and Support",
]

BOILERPLATE = [
    "Title IX",
    "Disability Resource Center",
    "Reasonable Accommodations",
    "Academic Integrity",
    "Attendance",
]

# "No-AI Challenge" is deliberately absent: the Version History table records
# that it was removed in v2.0, which is a legitimate mention.
FORBIDDEN = ["modality", "modalities", "multi-modal", "CS 7180", "Spring 2026"]

failures = []


def check(label, ok, detail=""):
    print(f"{'PASS' if ok else 'FAIL'}  {label}{'  -- ' + detail if detail else ''}")
    if not ok:
        failures.append(label)


def document_text(path):
    xml = zipfile.ZipFile(path).read("word/document.xml").decode("utf-8")
    xml = re.sub(r"</w:p>", "\n", xml)
    return re.sub(r"<[^>]+>", "", xml)


def para_styles(path):
    xml = zipfile.ZipFile(path).read("word/document.xml").decode("utf-8")
    return re.findall(r'<w:pStyle w:val="([^"]+)"', xml)


def style_props(path, style_id):
    """Return (fonts, colors, sizes) for a style -- serialization-independent."""
    xml = zipfile.ZipFile(path).read("word/styles.xml").decode("utf-8")
    m = re.search(r'w:styleId="%s".*?</w:style>' % style_id, xml, re.S)
    if not m:
        return None
    body = m.group(0)
    return (
        tuple(sorted(set(re.findall(r'w:ascii="([^"]+)"', body)))),
        tuple(sorted(set(re.findall(r'<w:color w:val="([^"]+)"', body)))),
        tuple(sorted(set(re.findall(r'<w:sz w:val="([^"]+)"', body)))),
    )


def style_ids(path):
    xml = zipfile.ZipFile(path).read("word/styles.xml").decode("utf-8")
    return set(re.findall(r'w:styleId="([^"]+)"', xml))


if not BUILT.exists():
    print(f"FAIL  build output missing: {BUILT}")
    sys.exit(1)

text = document_text(BUILT)

# Check 1: all eleven top-level sections present
missing = [s for s in SECTIONS if s not in text]
check("1. all 11 sections present", not missing, f"missing: {missing}" if missing else "")

# Check 2: required NU boilerplate survived
gone = [b for b in BOILERPLATE if b not in text]
check("2. NU boilerplate present", not gone, f"missing: {gone}" if gone else "")

# Check 2b: stale terminology is gone from the BODY.
# The Version History table legitimately names what changed ("CS 7180 -> CS 6983",
# "Replaced No-AI Challenge"), so it is excluded from this check.
body = text.split("Version History")[0]
stale = [f for f in FORBIDDEN if f.lower() in body.lower()]
check("2b. no stale terminology in body", not stale, f"found: {stale}" if stale else "")

# Check 3: style fidelity -- semantic, not byte-wise.
# pandoc reserializes XML (attribute order, self-closing whitespace) and appends
# its own syntax-highlighting styles, so the files are never byte-identical.
style_ok = True
details = []
for sid in ("Normal", "Heading1", "Heading2"):
    built_props, ref_props = style_props(BUILT, sid), style_props(REFERENCE, sid)
    if built_props != ref_props:
        style_ok = False
        details.append(f"{sid}: {built_props} != {ref_props}")
dropped = style_ids(REFERENCE) - style_ids(BUILT)
if dropped:
    style_ok = False
    details.append(f"dropped styles: {sorted(dropped)[:5]}")
check("3. style fidelity vs reference", style_ok, "; ".join(details))

# Check 4: heading mapping -- section N is Heading1, N.N is Heading2, no Heading3
styles = para_styles(BUILT)
h1, h2, h3 = styles.count("Heading1"), styles.count("Heading2"), styles.count("Heading3")
check("4. heading mapping", h1 == 11 and h2 > 0 and h3 == 0,
      f"Heading1={h1} (want 11), Heading2={h2} (want >0), Heading3={h3} (want 0)")

print()
if failures:
    print(f"{len(failures)} check(s) failed.")
    sys.exit(1)
print("All checks passed.")
