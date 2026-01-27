const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ShadingType,
  convertInchesToTwip,
} = require("docx");
const fs = require("fs");

// Helper function to create a styled paragraph
function createParagraph(text, options = {}) {
  const {
    bold = false,
    italic = false,
    size = 24, // 12pt
    heading = null,
    alignment = AlignmentType.LEFT,
    spacingAfter = 200,
    bullet = false,
    color = "000000",
  } = options;

  const config = {
    children: [
      new TextRun({
        text,
        bold,
        italic,
        size,
        color,
        font: "Arial",
      }),
    ],
    alignment,
    spacing: { after: spacingAfter },
  };

  if (heading) {
    config.heading = heading;
  }

  if (bullet) {
    config.bullet = { level: 0 };
  }

  return new Paragraph(config);
}

// Helper for section headers (blue colored like the original)
function createSectionHeader(text, level = 1) {
  const sizes = { 1: 32, 2: 28, 3: 26 };
  const headings = {
    1: HeadingLevel.HEADING_1,
    2: HeadingLevel.HEADING_2,
    3: HeadingLevel.HEADING_3,
  };

  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: true,
        size: sizes[level] || 28,
        color: "2E74B5", // Blue color like original
        font: "Arial",
      }),
    ],
    heading: headings[level],
    spacing: { before: 400, after: 200 },
  });
}

// Helper to create bullet points
function createBullet(text, level = 0) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        size: 24,
        font: "Arial",
      }),
    ],
    bullet: { level },
    spacing: { after: 100 },
  });
}

// Helper to create a simple table
function createTable(headers, rows) {
  const columnCount = headers.length;
  const columnWidth = Math.floor(9360 / columnCount); // Distribute evenly

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      // Header row
      new TableRow({
        children: headers.map(
          (header) =>
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: header, bold: true, size: 22, font: "Arial" }),
                  ],
                }),
              ],
              shading: { type: ShadingType.CLEAR, fill: "E7E6E6" },
              width: { size: columnWidth, type: WidthType.DXA },
            })
        ),
      }),
      // Data rows
      ...rows.map(
        (row) =>
          new TableRow({
            children: row.map(
              (cell) =>
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: cell, size: 22, font: "Arial" }),
                      ],
                    }),
                  ],
                  width: { size: columnWidth, type: WidthType.DXA },
                })
            ),
          })
      ),
    ],
  });
}

async function generateSyllabus() {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "Arial",
            size: 24,
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(1),
              right: convertInchesToTwip(1),
              bottom: convertInchesToTwip(1),
              left: convertInchesToTwip(1),
            },
          },
        },
        children: [
          // Title
          new Paragraph({
            children: [
              new TextRun({
                text: "CS 7180: Special Topics in AI",
                bold: true,
                size: 36,
                color: "2E74B5",
                font: "Arial",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Vibe Coding - AI-Assisted Software Engineering",
                bold: true,
                size: 32,
                color: "2E74B5",
                font: "Arial",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),

          // Version info
          new Paragraph({
            children: [
              new TextRun({
                text: "Version 2.0 - January 22, 2026",
                italic: true,
                size: 20,
                font: "Arial",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 50 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Changes from v1: Replaced No-AI Challenge with Weekly Quizzes (10% of grade)",
                italic: true,
                size: 20,
                color: "666666",
                font: "Arial",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
          }),

          // Institution info
          createParagraph("Graduate Course, Khoury College of Computer Sciences", {
            alignment: AlignmentType.CENTER,
          }),
          createParagraph("Northeastern University, Oakland Campus", {
            alignment: AlignmentType.CENTER,
          }),
          createParagraph("Spring 2026 Semester", {
            alignment: AlignmentType.CENTER,
            spacingAfter: 400,
          }),

          // Class details
          new Paragraph({
            children: [
              new TextRun({ text: "Class Hours: ", bold: true, size: 24, font: "Arial" }),
              new TextRun({ text: "Tu,Th 3:00PM-4:40PM PST", size: 24, font: "Arial" }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Class Location: ", bold: true, size: 24, font: "Arial" }),
              new TextRun({ text: "Lucie Stern 035 Oakland Campus", size: 24, font: "Arial" }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Instructor: ", bold: true, size: 24, font: "Arial" }),
              new TextRun({ text: "John Alexis Guerra Gomez", size: 24, font: "Arial" }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Email: ", bold: true, size: 24, font: "Arial" }),
              new TextRun({ text: "jguerra@northeastern.edu", size: 24, font: "Arial" }),
            ],
            spacing: { after: 400 },
          }),

          // Section 1
          createSectionHeader("1. Objectives and Course Description"),
          createParagraph(
            "This course trains master's level computer science students to become Silicon Valley-ready software engineers in the age of AI. Students will master AI-assisted development tools while maintaining professional engineering standards, learning to build high-quality, production-ready full-stack applications using cutting-edge AI technologies."
          ),
          createParagraph(
            "Building successful software with AI requires more than good prompting—it demands understanding how Large Language Models work, when to use which tools, how to evaluate AI-generated code systematically, and how to integrate AI into professional development workflows. This class will explore these topics throughout the entire software development lifecycle, with particular focus on Test-Driven Development, Continuous Integration/Continuous Deployment (CI/CD), evaluation systems (evals), and Agile methodologies adapted for AI-assisted development."
          ),
          createParagraph("This class will serve as an introduction to vibe coding, covering key topics such as:"),

          // Topics bullets
          createBullet("LLM Fundamentals and Limitations. Understanding how AI models work, why they hallucinate, and when to trust their outputs."),
          createBullet("Multi-Modal AI Development. Mastering three different AI coding paradigms: conversational coding (Claude Web), IDE-integrated AI (Antigravity), and autonomous agents (Claude Code)."),
          createBullet("Prompt and Context Engineering. Writing effective prompts and managing context to optimize AI code generation quality."),
          createBullet("Evaluation Systems (Evals). Building systematic evaluation frameworks to measure and improve AI-generated code quality."),
          createBullet("Test-Driven Development with AI. Writing tests first and using AI to implement features that pass those tests."),
          createBullet("Professional CI/CD Pipelines. Creating automated testing and deployment workflows for AI-assisted projects."),
          createBullet("Agile Practices with AI. Applying Scrum, Design Thinking, and the Mom Test to validate and build software with AI tools."),
          createBullet("Parallel Agentic Programming. Coordinating multiple AI agents to work on complex features simultaneously."),

          // Course Outcomes
          createSectionHeader("1.1 Course Outcomes", 2),
          createBullet("Students will understand how Large Language Models work and their fundamental capabilities and limitations"),
          createBullet("Students will master three AI coding modalities and know when to use each appropriately"),
          createBullet("Students will engineer sophisticated prompts using advanced techniques like chain-of-thought and meta-prompting"),
          createBullet("Students will implement comprehensive evaluation systems to systematically measure AI code quality"),
          createBullet("Students will practice Test-Driven Development integrated with CI/CD pipelines for AI-generated code"),
          createBullet("Students will apply Agile methodologies including Scrum ceremonies and Design Thinking in AI workflows"),
          createBullet("Students will orchestrate parallel AI agents for complex development tasks"),
          createBullet("Students will design and deploy three portfolio-worthy full-stack applications demonstrating professional practices"),

          // Prerequisites
          createSectionHeader("1.2 Course Prerequisites", 2),
          createParagraph("Graduate level CS 5010 Minimum Grade of D or Graduate level CS 5004 Minimum Grade of C or Graduate level CS 5010 Minimum Grade of C"),

          // Section 2 - Schedule
          createSectionHeader("2. Proposed Schedule"),
          createParagraph("This schedule could be adjusted during the semester depending on the student's progress on the course concepts."),

          createTable(
            ["Week", "Topic Area"],
            [
              ["1", "Introduction, Mom Test, Design Thinking, LLM Fundamentals"],
              ["2", "Modality 1: Claude Web, Requirements Gathering"],
              ["3", "Prompt Engineering Basics"],
              ["4", "User Research & Prototyping, Mom Test Workshop"],
              ["5", "Modality 2: Antigravity IDE (Part 1), TDD Introduction"],
              ["6", "Antigravity Advanced, CI/CD Fundamentals"],
              ["7", "Project 1 Demos, Modality 3: Claude Code & Terminal AI"],
              ["8", "Advanced Prompt Engineering"],
              ["9", "Context Engineering"],
              ["10", "Evaluations (Evals) Part 1"],
              ["11", "TDD + CI/CD Integration, Evals Part 2"],
              ["12", "Project 2 Demos, Agile/Scrum with AI, Team Formation"],
              ["13", "Parallel Agentic Programming"],
              ["14", "Advanced Full-Stack Patterns, Production Best Practices"],
              ["15", "Demo Day - Final Project Presentations"],
            ]
          ),

          // Section 3 - Assessment
          createSectionHeader("3. Course Assessment"),
          new Paragraph({
            children: [
              new TextRun({ text: "Participation (15%): ", bold: true, size: 24, font: "Arial" }),
              new TextRun({ text: "7% pre-class questions + 8% lottery points", size: 24, font: "Arial" }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Weekly Quizzes (10%): ", bold: true, size: 24, font: "Arial" }),
              new TextRun({ text: "Concept quizzes on Canvas (2 lowest dropped)", size: 24, font: "Arial" }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Homeworks (25%): ", bold: true, size: 24, font: "Arial" }),
              new TextRun({ text: "6 assignments building toward projects", size: 24, font: "Arial" }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Projects (50%): ", bold: true, size: 24, font: "Arial" }),
              new TextRun({ text: "Project 1 (13%), Project 2 (18%), Project 3 (19%)", size: 24, font: "Arial" }),
            ],
            spacing: { after: 300 },
          }),

          createSectionHeader("Considerations", 3),
          createBullet("Participation will be computed as the average of your pre-class posts and lottery grades."),
          createBullet("Your lottery grade will be computed with reference to the class median. If you have the same or more points than the class median, you will get [100%, 110%]. If you have less, you will get [-100%, 100%) proportionally."),
          createBullet("Lottery will be computed on a [-100%, 110%] interval, so your grade can be negative."),
          createBullet("Weekly quizzes test conceptual understanding and count toward your final grade (10%)."),

          createSectionHeader("3.1 Late/Makeup Policy", 2),
          createBullet("Homeworks: 10% off per day late (maximum 3 days, then 0)"),
          createBullet("Projects: 5% off per day late (maximum 5 days, then 0)"),
          createBullet("Weekly quizzes: Cannot be made up (but 2 lowest scores dropped)"),
          createBullet("Extensions: Available with 48-hour notice and valid reason"),

          createSectionHeader("3.4 Weekly Quizzes (10%)", 2),
          createParagraph("Students will complete short, auto-graded quizzes (5-10 questions) on Canvas covering course concepts. These assessments verify understanding of key topics including LLM fundamentals, prompt engineering, TDD, CI/CD, and evaluation methodology."),
          createBullet("Open for 48 hours after each week's lectures"),
          createBullet("10 minutes to complete"),
          createBullet("Can be taken twice, higher score counts"),
          createBullet("14 total quizzes, lowest 2 scores dropped"),
          createBullet("Average of best 12 contributes to final grade (10%)"),

          createSectionHeader("3.6 Grade Calculations", 2),
          createParagraph("Grades will be calculated on an absolute basis: there will be no overall curving. A weighted average will be calculated according to the percentages attributed to each assessment method listed in section 3."),

          createTable(
            ["Grade", "Range"],
            [
              ["A", "93.00–100.00"],
              ["A-", "90.00–92.99"],
              ["B+", "86.00–89.99"],
              ["B", "82.00–85.99"],
              ["B-", "77.00–81.99"],
              ["C+", "73.00–76.99"],
              ["C", "69.00–72.99"],
              ["C-", "65.00–68.99"],
              ["F", "0.00–59.99"],
            ]
          ),

          // Section 6 - Projects
          createSectionHeader("6. Project Requirements Summary"),

          createSectionHeader("Project 1: Personal Utility App (13%) - Due Week 7", 2),
          createBullet("5+ user stories, ONE modality focus"),
          createBullet("50%+ test coverage, basic CI/CD"),
          createBullet("Deployed application"),
          createBullet("5-min video, 500-word reflection"),

          createSectionHeader("Project 2: Full-Stack Application (18%) - Due Week 12", 2),
          createBullet("Full-stack with auth, 3 modalities"),
          createBullet("80%+ coverage, TDD, comprehensive evals"),
          createBullet("Advanced CI/CD with deploy previews"),
          createBullet("2+ Agile sprints"),
          createBullet("10-min video, 1500-word blog"),

          createSectionHeader("Project 3: Team Application (19%) - Due Week 15", 2),
          createBullet("Team of 2-3, production-grade"),
          createBullet("Parallel agentic programming"),
          createBullet("Enterprise CI/CD, monitoring"),
          createBullet("LLM-as-judge evals"),
          createBullet("3+ sprints, security audit"),
          createBullet("20-min presentation, blog"),

          // Section 7 - The Three Modalities
          createSectionHeader("7. The Three Modalities"),

          createSectionHeader("Modality 1: Claude Web (Week 2)", 2),
          new Paragraph({
            children: [
              new TextRun({ text: "Best for: ", bold: true, size: 24, font: "Arial" }),
              new TextRun({ text: "Architecture planning, learning, brainstorming", size: 24, font: "Arial" }),
            ],
            spacing: { after: 200 },
          }),

          createSectionHeader("Modality 2: Antigravity IDE (Weeks 5-6)", 2),
          new Paragraph({
            children: [
              new TextRun({ text: "Best for: ", bold: true, size: 24, font: "Arial" }),
              new TextRun({ text: "Professional development, production code", size: 24, font: "Arial" }),
            ],
            spacing: { after: 200 },
          }),

          createSectionHeader("Modality 3: Claude Code (Week 7)", 2),
          new Paragraph({
            children: [
              new TextRun({ text: "Best for: ", bold: true, size: 24, font: "Arial" }),
              new TextRun({ text: "Automation, refactoring, DevOps", size: 24, font: "Arial" }),
            ],
            spacing: { after: 300 },
          }),

          // Version History
          createSectionHeader("Version History"),
          createTable(
            ["Version", "Date", "Changes"],
            [
              ["v1.0", "January 2025", "Initial syllabus with No-AI Challenge (pass/fail midterm)"],
              ["v2.0", "January 22, 2026", "Replaced No-AI Challenge with Weekly Quizzes (10%). Adjusted grading: Participation 20%→15%, Projects 55%→50%"],
            ]
          ),

          // Closing
          new Paragraph({
            children: [
              new TextRun({
                text: "By the end of this course, you will have a portfolio of 3 production-ready applications, mastery of AI-assisted development tools, and the professional engineering practices needed to succeed in Silicon Valley. Let's build something amazing!",
                bold: true,
                size: 24,
                font: "Arial",
              }),
            ],
            spacing: { before: 400 },
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync("CS7180_VibeCoding_Syllabus_v2.docx", buffer);
  console.log("Generated CS7180_VibeCoding_Syllabus_v2.docx");
}

generateSyllabus().catch(console.error);
