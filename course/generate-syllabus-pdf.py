#!/usr/bin/env python3
"""
Generate a professionally formatted PDF syllabus from syllabus.md

Usage:
    pip install reportlab markdown
    python course/generate-syllabus-pdf.py

Output: course/CS6983_VibeCoding_Syllabus_v{N}.pdf (auto-increments version)
"""

import re
import glob
import os
from pathlib import Path

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, ListFlowable, ListItem, Preformatted
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY


# Northeastern University brand colors
NU_RED = HexColor('#C8102E')
NU_BLACK = HexColor('#000000')
NU_GRAY = HexColor('#4A4A4A')


def get_next_version(output_dir: Path) -> int:
    """Find the next version number based on existing PDFs."""
    pattern = str(output_dir / "CS6983_VibeCoding_Syllabus_v*.pdf")
    existing = glob.glob(pattern)

    # Also check for the original non-versioned file
    original = output_dir / "CS6983_VibeCoding_Syllabus.pdf"

    if not existing and not original.exists():
        return 1

    versions = [0]  # Start with 0 to handle case where only original exists
    for f in existing:
        match = re.search(r'_v(\d+)\.pdf$', f)
        if match:
            versions.append(int(match.group(1)))

    # If original exists without version, count it as v1
    if original.exists() and 1 not in versions:
        versions.append(1)

    return max(versions) + 1


def create_styles():
    """Create custom paragraph styles for the syllabus."""
    styles = getSampleStyleSheet()

    # Title style (course name)
    styles.add(ParagraphStyle(
        name='CourseTitle',
        parent=styles['Heading1'],
        fontSize=20,
        textColor=NU_RED,
        alignment=TA_CENTER,
        spaceAfter=6,
        fontName='Helvetica-Bold'
    ))

    # Subtitle style
    styles.add(ParagraphStyle(
        name='Subtitle',
        parent=styles['Normal'],
        fontSize=12,
        textColor=NU_GRAY,
        alignment=TA_CENTER,
        spaceAfter=20,
        fontName='Helvetica-Oblique'
    ))

    # Section heading (##)
    styles.add(ParagraphStyle(
        name='SectionHeading',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=NU_RED,
        spaceBefore=16,
        spaceAfter=8,
        fontName='Helvetica-Bold',
        borderColor=NU_RED,
        borderWidth=0,
        borderPadding=0
    ))

    # Subsection heading (###)
    styles.add(ParagraphStyle(
        name='SubsectionHeading',
        parent=styles['Heading3'],
        fontSize=12,
        textColor=NU_BLACK,
        spaceBefore=12,
        spaceAfter=6,
        fontName='Helvetica-Bold'
    ))

    # Body text (override default)
    styles['BodyText'].fontSize = 10
    styles['BodyText'].textColor = NU_BLACK
    styles['BodyText'].alignment = TA_JUSTIFY
    styles['BodyText'].spaceAfter = 6
    styles['BodyText'].leading = 14
    styles['BodyText'].fontName = 'Helvetica'

    # Bullet point style
    styles.add(ParagraphStyle(
        name='BulletText',
        parent=styles['Normal'],
        fontSize=10,
        textColor=NU_BLACK,
        leftIndent=20,
        spaceAfter=3,
        leading=13,
        fontName='Helvetica'
    ))

    # Code block style
    styles.add(ParagraphStyle(
        name='CodeBlock',
        parent=styles['Code'],
        fontSize=8,
        textColor=NU_BLACK,
        backColor=HexColor('#F5F5F5'),
        leftIndent=10,
        rightIndent=10,
        spaceBefore=6,
        spaceAfter=6,
        fontName='Courier'
    ))

    return styles


def parse_markdown_table(lines: list) -> tuple:
    """Parse markdown table into headers and rows."""
    headers = []
    rows = []

    for i, line in enumerate(lines):
        if '|' not in line:
            continue

        # Split by | and clean up
        cells = [cell.strip() for cell in line.split('|')]
        cells = [c for c in cells if c]  # Remove empty strings

        # Skip separator line (contains dashes)
        if all(set(cell.strip()) <= set('-:') for cell in cells):
            continue

        # Remove markdown bold markers
        cells = [re.sub(r'\*\*([^*]+)\*\*', r'\1', cell) for cell in cells]

        if not headers:
            headers = cells
        else:
            rows.append(cells)

    return headers, rows


def create_table(headers: list, rows: list, styles) -> Table:
    """Create a formatted table."""
    data = [headers] + rows

    # Calculate column widths based on content
    col_count = len(headers)
    available_width = 6.5 * inch
    col_widths = [available_width / col_count] * col_count

    # Adjust for common table patterns
    if col_count == 3 and 'Component' in headers[0]:
        col_widths = [1.5*inch, 0.8*inch, 4.2*inch]
    elif col_count == 2 and 'Grade' in headers[0]:
        col_widths = [1*inch, 1*inch]

    table = Table(data, colWidths=col_widths)

    table.setStyle(TableStyle([
        # Header row
        ('BACKGROUND', (0, 0), (-1, 0), NU_RED),
        ('TEXTCOLOR', (0, 0), (-1, 0), HexColor('#FFFFFF')),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 10),
        ('ALIGN', (0, 0), (-1, 0), 'CENTER'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 8),
        ('TOPPADDING', (0, 0), (-1, 0), 8),

        # Body rows
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -1), 9),
        ('ALIGN', (0, 1), (-1, -1), 'LEFT'),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 6),
        ('TOPPADDING', (0, 1), (-1, -1), 6),

        # Alternating row colors
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [HexColor('#FFFFFF'), HexColor('#F8F8F8')]),

        # Grid
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#CCCCCC')),
        ('BOX', (0, 0), (-1, -1), 1, NU_RED),

        # Valign
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))

    return table


def process_inline_formatting(text: str) -> str:
    """Convert markdown inline formatting to reportlab markup."""
    # Bold: **text** -> <b>text</b>
    text = re.sub(r'\*\*([^*]+)\*\*', r'<b>\1</b>', text)
    # Italic: *text* -> <i>text</i> (but not inside bold)
    text = re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)', r'<i>\1</i>', text)
    # Inline code: `text` -> <font name="Courier">text</font>
    text = re.sub(r'`([^`]+)`', r'<font name="Courier" size="9">\1</font>', text)
    # Links: [text](url) -> text
    text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)
    return text


def parse_syllabus(md_content: str, styles) -> list:
    """Parse markdown content and return list of flowables."""
    flowables = []
    lines = md_content.split('\n')

    i = 0
    in_code_block = False
    code_block_lines = []
    in_table = False
    table_lines = []

    while i < len(lines):
        line = lines[i]

        # Handle code blocks
        if line.strip().startswith('```'):
            if in_code_block:
                # End code block
                code_text = '\n'.join(code_block_lines)
                flowables.append(Preformatted(code_text, styles['CodeBlock']))
                flowables.append(Spacer(1, 6))
                code_block_lines = []
                in_code_block = False
            else:
                in_code_block = True
            i += 1
            continue

        if in_code_block:
            code_block_lines.append(line)
            i += 1
            continue

        # Handle tables
        if '|' in line and not line.strip().startswith('```'):
            if not in_table:
                in_table = True
                table_lines = []
            table_lines.append(line)
            i += 1
            continue
        elif in_table:
            # End of table
            headers, rows = parse_markdown_table(table_lines)
            if headers and rows:
                flowables.append(create_table(headers, rows, styles))
                flowables.append(Spacer(1, 12))
            in_table = False
            table_lines = []
            # Don't increment i, process current line
            continue

        # Skip horizontal rules
        if line.strip() == '---':
            flowables.append(Spacer(1, 12))
            i += 1
            continue

        # Skip empty lines
        if not line.strip():
            i += 1
            continue

        # H1 - Course title
        if line.startswith('# '):
            title = line[2:].strip()
            flowables.append(Paragraph(title, styles['CourseTitle']))
            flowables.append(Paragraph(
                "Northeastern University • Fall 2026",
                styles['Subtitle']
            ))
            i += 1
            continue

        # H2 - Section heading
        if line.startswith('## '):
            heading = line[3:].strip()
            flowables.append(Spacer(1, 8))
            flowables.append(Paragraph(heading, styles['SectionHeading']))
            i += 1
            continue

        # H3 - Subsection heading
        if line.startswith('### '):
            heading = line[4:].strip()
            flowables.append(Paragraph(heading, styles['SubsectionHeading']))
            i += 1
            continue

        # Bullet points
        if line.strip().startswith('- '):
            bullet_text = line.strip()[2:]
            bullet_text = process_inline_formatting(bullet_text)
            flowables.append(Paragraph(f"• {bullet_text}", styles['BulletText']))
            i += 1
            continue

        # Regular paragraph
        text = process_inline_formatting(line.strip())
        if text:
            flowables.append(Paragraph(text, styles['BodyText']))

        i += 1

    # Handle any remaining table
    if in_table and table_lines:
        headers, rows = parse_markdown_table(table_lines)
        if headers and rows:
            flowables.append(create_table(headers, rows, styles))

    return flowables


def add_header_footer(canvas, doc):
    """Add header and footer to each page."""
    canvas.saveState()

    # Footer
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(NU_GRAY)
    canvas.drawCentredString(
        letter[0] / 2,
        0.5 * inch,
        f"CS 6983: Vibe Coding — Page {doc.page}"
    )

    # Header line
    if doc.page > 1:
        canvas.setStrokeColor(NU_RED)
        canvas.setLineWidth(0.5)
        canvas.line(inch, letter[1] - 0.5*inch, letter[0] - inch, letter[1] - 0.5*inch)

    canvas.restoreState()


def generate_pdf(md_path: Path, output_path: Path):
    """Generate PDF from markdown file."""
    # Read markdown content
    with open(md_path, 'r', encoding='utf-8') as f:
        md_content = f.read()

    # Create document
    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=letter,
        rightMargin=0.75*inch,
        leftMargin=0.75*inch,
        topMargin=0.75*inch,
        bottomMargin=0.75*inch
    )

    # Create styles and parse content
    styles = create_styles()
    flowables = parse_syllabus(md_content, styles)

    # Build PDF
    doc.build(flowables, onFirstPage=add_header_footer, onLaterPages=add_header_footer)

    print(f"Generated: {output_path}")
    return output_path


def main():
    # Determine paths
    script_dir = Path(__file__).parent
    md_path = script_dir / "syllabus.md"

    if not md_path.exists():
        print(f"Error: {md_path} not found")
        return 1

    # Get next version number
    version = get_next_version(script_dir)
    output_path = script_dir / f"CS6983_VibeCoding_Syllabus_v{version}.pdf"

    print(f"Generating syllabus PDF version {version}...")
    generate_pdf(md_path, output_path)

    print(f"\nSuccess! Created: {output_path.name}")
    print(f"Version history preserved (v1-v{version})")

    return 0


if __name__ == "__main__":
    exit(main())
