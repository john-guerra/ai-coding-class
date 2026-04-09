#!/usr/bin/env python3
"""
Generate a professionally formatted PDF handout from a markdown file.

Usage:
    pip install reportlab
    python course/generate-handout-pdf.py course/handouts/public-api-guide.md

Options:
    --subtitle "Custom Subtitle"   (default: "CS 7180 - Course Handout")
    --footer "Custom Footer"       (default: derived from document title)
    --output path/to/output.pdf    (default: same directory as input, .pdf extension)

Output: PDF file in the same directory as the input markdown file.
"""

import re
import sys
import argparse
from pathlib import Path

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    Preformatted
)
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY


# Northeastern University brand colors
NU_RED = HexColor('#C8102E')
NU_BLACK = HexColor('#000000')
NU_GRAY = HexColor('#4A4A4A')


def create_styles():
    """Create custom paragraph styles for the handout."""
    styles = getSampleStyleSheet()

    # Title style (document name)
    styles.add(ParagraphStyle(
        name='DocTitle',
        parent=styles['Heading1'],
        fontSize=20,
        textColor=NU_RED,
        alignment=TA_CENTER,
        spaceAfter=4,
        fontName='Helvetica-Bold'
    ))

    # Subtitle style
    styles.add(ParagraphStyle(
        name='Subtitle',
        parent=styles['Normal'],
        fontSize=12,
        textColor=NU_GRAY,
        alignment=TA_CENTER,
        spaceAfter=14,
        fontName='Helvetica-Oblique'
    ))

    # Section heading (##)
    styles.add(ParagraphStyle(
        name='SectionHeading',
        parent=styles['Heading2'],
        fontSize=13,
        textColor=NU_RED,
        spaceBefore=12,
        spaceAfter=6,
        fontName='Helvetica-Bold',
        borderColor=NU_RED,
        borderWidth=0,
        borderPadding=0
    ))

    # Subsection heading (###)
    styles.add(ParagraphStyle(
        name='SubsectionHeading',
        parent=styles['Heading3'],
        fontSize=11,
        textColor=NU_BLACK,
        spaceBefore=8,
        spaceAfter=4,
        fontName='Helvetica-Bold'
    ))

    # Body text
    styles['BodyText'].fontSize = 10
    styles['BodyText'].textColor = NU_BLACK
    styles['BodyText'].alignment = TA_JUSTIFY
    styles['BodyText'].spaceAfter = 4
    styles['BodyText'].leading = 13
    styles['BodyText'].fontName = 'Helvetica'

    # Bullet point style
    styles.add(ParagraphStyle(
        name='BulletText',
        parent=styles['Normal'],
        fontSize=10,
        textColor=NU_BLACK,
        leftIndent=20,
        spaceAfter=2,
        leading=12,
        fontName='Helvetica'
    ))

    # Code block style
    styles.add(ParagraphStyle(
        name='CodeBlock',
        parent=styles['Code'],
        fontSize=7,
        textColor=NU_BLACK,
        backColor=HexColor('#F5F5F5'),
        leftIndent=10,
        rightIndent=10,
        spaceBefore=4,
        spaceAfter=4,
        fontName='Courier',
        leading=9,
    ))

    return styles


def parse_markdown_table(lines: list) -> tuple:
    """Parse markdown table into headers and rows."""
    headers = []
    rows = []

    for line in lines:
        if '|' not in line:
            continue

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


def create_table(headers: list, rows: list) -> Table:
    """Create a formatted table with Northeastern branding."""
    data = [headers] + rows

    col_count = len(headers)
    available_width = 6.5 * inch
    col_widths = [available_width / col_count] * col_count

    # Adjust column widths for common handout table patterns
    if col_count == 4:
        # Method/Endpoint/Description/Auth pattern
        col_widths = [0.7 * inch, 1.8 * inch, 2.5 * inch, 1.5 * inch]
    elif col_count == 3:
        col_widths = [1.0 * inch, 2.5 * inch, 3.0 * inch]
    elif col_count == 2:
        col_widths = [3.25 * inch, 3.25 * inch]

    # Wrap cell content in Paragraphs for text wrapping
    cell_style = ParagraphStyle(
        name='TableCell',
        fontSize=8.5,
        leading=11,
        fontName='Helvetica',
        textColor=NU_BLACK,
    )
    header_style = ParagraphStyle(
        name='TableHeader',
        fontSize=9,
        leading=12,
        fontName='Helvetica-Bold',
        textColor=HexColor('#FFFFFF'),
    )

    wrapped_data = []
    for row_idx, row in enumerate(data):
        wrapped_row = []
        for cell in row:
            cell_text = process_inline_formatting(cell)
            if row_idx == 0:
                wrapped_row.append(Paragraph(cell_text, header_style))
            else:
                wrapped_row.append(Paragraph(cell_text, cell_style))
        wrapped_data.append(wrapped_row)

    table = Table(wrapped_data, colWidths=col_widths)

    table.setStyle(TableStyle([
        # Header row
        ('BACKGROUND', (0, 0), (-1, 0), NU_RED),
        ('TEXTCOLOR', (0, 0), (-1, 0), HexColor('#FFFFFF')),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 9),
        ('ALIGN', (0, 0), (-1, 0), 'CENTER'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 6),
        ('TOPPADDING', (0, 0), (-1, 0), 6),

        # Body rows
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -1), 9),
        ('ALIGN', (0, 1), (-1, -1), 'LEFT'),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 4),
        ('TOPPADDING', (0, 1), (-1, -1), 4),

        # Alternating row colors
        ('ROWBACKGROUNDS', (0, 1), (-1, -1),
         [HexColor('#FFFFFF'), HexColor('#F8F8F8')]),

        # Grid
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor('#CCCCCC')),
        ('BOX', (0, 0), (-1, -1), 1, NU_RED),

        # Valign
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))

    return table


def process_inline_formatting(text: str) -> str:
    """Convert markdown inline formatting to reportlab markup."""
    # Escape ampersands for XML (must come first, before adding XML tags)
    text = text.replace('&', '&amp;')
    # Bold: **text** -> <b>text</b>
    text = re.sub(r'\*\*([^*]+)\*\*', r'<b>\1</b>', text)
    # Italic: *text* -> <i>text</i> (but not inside bold)
    text = re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)', r'<i>\1</i>', text)
    # Inline code: `text` -> <font name="Courier">text</font>
    text = re.sub(r'`([^`]+)`', r'<font name="Courier" size="8">\1</font>', text)
    # Links: [text](url) -> text
    text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)
    return text


def parse_markdown(md_content: str, styles, subtitle: str) -> list:
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
                code_text = '\n'.join(code_block_lines)
                flowables.append(Preformatted(code_text, styles['CodeBlock']))
                flowables.append(Spacer(1, 3))
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
            headers, rows = parse_markdown_table(table_lines)
            if headers and rows:
                flowables.append(create_table(headers, rows))
                flowables.append(Spacer(1, 8))
            in_table = False
            table_lines = []
            continue

        # Skip horizontal rules
        if line.strip() == '---':
            flowables.append(Spacer(1, 8))
            i += 1
            continue

        # Skip empty lines
        if not line.strip():
            i += 1
            continue

        # H1 - Document title
        if line.startswith('# '):
            title = line[2:].strip()
            flowables.append(Paragraph(title, styles['DocTitle']))
            flowables.append(Paragraph(subtitle, styles['Subtitle']))
            i += 1
            continue

        # H2 - Section heading
        if line.startswith('## '):
            heading = line[3:].strip()
            flowables.append(Spacer(1, 4))
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
            flowables.append(
                Paragraph(f"\u2022 {bullet_text}", styles['BulletText'])
            )
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
            flowables.append(create_table(headers, rows))

    return flowables


def make_header_footer(footer_text: str):
    """Create a header/footer function with custom footer text."""
    def add_header_footer(canvas, doc):
        canvas.saveState()

        # Footer
        canvas.setFont('Helvetica', 8)
        canvas.setFillColor(NU_GRAY)
        canvas.drawCentredString(
            letter[0] / 2,
            0.5 * inch,
            f"{footer_text} \u2014 Page {doc.page}"
        )

        # Header line (pages after first)
        if doc.page > 1:
            canvas.setStrokeColor(NU_RED)
            canvas.setLineWidth(0.5)
            canvas.line(
                inch, letter[1] - 0.5 * inch,
                letter[0] - inch, letter[1] - 0.5 * inch
            )

        canvas.restoreState()

    return add_header_footer


def generate_pdf(md_path: Path, output_path: Path, subtitle: str,
                 footer_text: str):
    """Generate PDF from markdown file."""
    with open(md_path, 'r', encoding='utf-8') as f:
        md_content = f.read()

    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=letter,
        rightMargin=0.75 * inch,
        leftMargin=0.75 * inch,
        topMargin=0.75 * inch,
        bottomMargin=0.75 * inch
    )

    styles = create_styles()
    flowables = parse_markdown(md_content, styles, subtitle)

    header_footer = make_header_footer(footer_text)
    doc.build(flowables, onFirstPage=header_footer, onLaterPages=header_footer)

    print(f"Generated: {output_path}")
    return output_path


def main():
    parser = argparse.ArgumentParser(
        description='Generate a branded PDF handout from a markdown file.'
    )
    parser.add_argument(
        'input', type=Path,
        help='Path to the markdown file'
    )
    parser.add_argument(
        '--subtitle', default='CS 7180 \u2014 Course Handout',
        help='Subtitle shown below the document title (default: "CS 7180 - Course Handout")'
    )
    parser.add_argument(
        '--footer', default=None,
        help='Footer text (default: derived from document title)'
    )
    parser.add_argument(
        '--output', type=Path, default=None,
        help='Output PDF path (default: same directory as input, .pdf extension)'
    )

    args = parser.parse_args()

    md_path = args.input
    if not md_path.exists():
        print(f"Error: {md_path} not found")
        return 1

    # Determine output path
    output_path = args.output or md_path.with_suffix('.pdf')

    # Determine footer text from document title if not specified
    footer_text = args.footer
    if footer_text is None:
        with open(md_path, 'r', encoding='utf-8') as f:
            for line in f:
                if line.startswith('# '):
                    footer_text = f"CS 7180: {line[2:].strip()}"
                    break
        if footer_text is None:
            footer_text = "CS 7180: Course Handout"

    print(f"Generating handout PDF from {md_path}...")
    generate_pdf(md_path, output_path, args.subtitle, footer_text)

    print(f"\nSuccess! Created: {output_path.name}")
    return 0


if __name__ == "__main__":
    exit(main())
