# CS 7180: Special Topics in AI
## Vibe Coding - AI-Assisted Software Engineering

**Version 2.0** - January 22, 2026
*Changes from v1: Replaced No-AI Challenge with Weekly Quizzes (10% of grade)*

---

Graduate Course, Khoury College of Computer Sciences
Northeastern University, Oakland Campus
Spring 2026 Semester

**Class Hours:** Tu,Th 3:00PM-4:40PM PST
**Class Location:** Lucie Stern 035 Oakland Campus
**Instructor:** John Alexis Guerra Gomez
**Email:** jguerra@northeastern.edu

---

## 1. Objectives and Course Description

This course trains master's level computer science students to become Silicon Valley-ready software engineers in the age of AI. Students will master AI-assisted development tools while maintaining professional engineering standards, learning to build high-quality, production-ready full-stack applications using cutting-edge AI technologies.

Building successful software with AI requires more than good prompting—it demands understanding how Large Language Models work, when to use which tools, how to evaluate AI-generated code systematically, and how to integrate AI into professional development workflows. This class will explore these topics throughout the entire software development lifecycle, with particular focus on Test-Driven Development, Continuous Integration/Continuous Deployment (CI/CD), evaluation systems (evals), and Agile methodologies adapted for AI-assisted development.

This class will serve as an introduction to vibe coding, covering key topics such as:

- **LLM Fundamentals and Limitations.** Understanding how AI models work, why they hallucinate, and when to trust their outputs.
- **Multi-Modal AI Development.** Mastering three different AI coding paradigms: conversational coding (Claude Web), IDE-integrated AI (Antigravity), and autonomous agents (Claude Code).
- **Prompt and Context Engineering.** Writing effective prompts and managing context to optimize AI code generation quality.
- **Evaluation Systems (Evals).** Building systematic evaluation frameworks to measure and improve AI-generated code quality.
- **Test-Driven Development with AI.** Writing tests first and using AI to implement features that pass those tests.
- **Professional CI/CD Pipelines.** Creating automated testing and deployment workflows for AI-assisted projects.
- **Agile Practices with AI.** Applying Scrum, Design Thinking, and the Mom Test to validate and build software with AI tools.
- **Parallel Agentic Programming.** Coordinating multiple AI agents to work on complex features simultaneously.

### 1.1 Course Outcomes

- Students will understand how Large Language Models work and their fundamental capabilities and limitations
- Students will master three AI coding modalities and know when to use each appropriately
- Students will engineer sophisticated prompts using advanced techniques like chain-of-thought and meta-prompting
- Students will implement comprehensive evaluation systems to systematically measure AI code quality
- Students will practice Test-Driven Development integrated with CI/CD pipelines for AI-generated code
- Students will apply Agile methodologies including Scrum ceremonies and Design Thinking in AI workflows
- Students will orchestrate parallel AI agents for complex development tasks
- Students will design and deploy three portfolio-worthy full-stack applications demonstrating professional practices

### 1.2 Course Prerequisites

Graduate level CS 5010 Minimum Grade of D or Graduate level CS 5004 Minimum Grade of C or Graduate level CS 5010 Minimum Grade of C

---

## 2. Proposed Schedule

This schedule could be adjusted during the semester depending on the student's progress on the course concepts.

| Week | Topic Area |
|------|------------|
| 1 | Introduction, Mom Test, Design Thinking, LLM Fundamentals |
| 2 | Modality 1: Claude Web, Requirements Gathering |
| 3 | Prompt Engineering Basics |
| 4 | Modality 2: Antigravity IDE (Part 1), TDD Introduction |
| 5 | Antigravity Advanced, CI/CD Fundamentals |
| 6 | Project 1 Demos, Modality 3: Claude Code & Terminal AI |
| 7 | Advanced Prompt Engineering |
| 8 | Context Engineering |
| 9 | Evaluations (Evals) Part 1 |
| 10 | TDD + CI/CD Integration, Evals Part 2 |
| 11 | Project 2 Demos, Agile/Scrum with AI, Team Formation |
| 12 | Parallel Agentic Programming |
| 13 | Advanced Full-Stack Patterns, Advanced CI/CD |
| 14 | Production Best Practices, Monitoring, Portfolio Building |
| 15 | Demo Day - Final Project Presentations |

---

## 3. Course Assessment

**Participation (15%):** 7% pre-class questions + 8% lottery points
**Weekly Quizzes (10%):** Concept quizzes on Canvas (2 lowest dropped)
**Homeworks (25%):** 6 assignments building toward projects
**Projects (50%):** Project 1 (13%), Project 2 (18%), Project 3 (19%)

### Considerations

- Participation will be computed as the average of your pre-class posts and lottery grades.
- Your lottery grade will be computed with reference to the class median. If you have the same or more points than the class median, you will get [100%, 110%]. If you have less, you will get [-100%, 100%) proportionally.
- Lottery will be computed on a [-100%, 110%] interval, so your grade can be negative.
- Weekly quizzes test conceptual understanding and count toward your final grade (10%).

### 3.1 Late/Makeup Policy

- **Homeworks:** 10% off per day late (maximum 3 days, then 0)
- **Projects:** 5% off per day late (maximum 5 days, then 0)
- **Weekly quizzes:** Cannot be made up (but 2 lowest scores dropped)
- **Extensions:** Available with 48-hour notice and valid reason

### 3.2 Bonus Points

The professor might adjust any of the grade categories by providing bonus points or other mechanisms to offer students chances to catch up with points. This might be handled as a courtesy, to compensate for minor mistakes in the TAs grading or other situations. However, policies might apply for each one of these bonuses, for example they might be lost in case a regrading is necessary. These bonuses and their policies would be advertised on Slack.

### 3.3 Pre-class Work

Before every class, students must submit to Canvas a smart question about something they learned from the readings. The questions should be original, shouldn't repeat what was said before, and demonstrate the proficiency of the required reading.

Then, students must answer two of their peers' questions in a constructive way. Students must make sure to answer a question from a peer that hasn't been answered yet more than once. i.e. the third answer to the same question won't be counted.

These questions are going to be considered for the class participation grade. Each question will be rated as follows:

- **2 points:** An interesting and original question that demonstrates reading the materials and thinking about them
- **1 point:** An interesting question but that was proposed before by another student
- **0 points:** A non-interesting question

Each interesting and respectful answer to a question will be worth 1 point. Remember, only the first two answers to the same question will be counted. Don't answer more than two questions per class. Therefore, there will be a maximum of 4 points per class for each student (2 for the question and 2 for the answers).

### 3.4 Weekly Quizzes (10%)

Students will complete short, auto-graded quizzes (5-10 questions) on Canvas covering course concepts. These assessments verify understanding of key topics including LLM fundamentals, prompt engineering, TDD, CI/CD, and evaluation methodology.

- Open for 48 hours after each week's lectures
- 10 minutes to complete
- Can be taken twice, higher score counts
- 14 total quizzes, lowest 2 scores dropped
- Average of best 12 contributes to final grade (10%)

### 3.5 Participation

You are required to pay attention and to participate actively in the class. For this the professor would use among other techniques a lottery that randomly selects a student to ask them a question. The points would be assigned at the professor's discretion, but most of the time would be:

- **-1 points:** The student wasn't in class or wasn't paying attention
- **0 points:** Wrong answer
- **1 point:** Regular answer
- **2 points:** Great answer

For computing the participation grades, the median of the number of points of the class will be used. Students' grades would be proportional to their difference to the median, i.e. if the student is on the median, it will obtain 100%, if it is below less than 100%.

### 3.6 Grade Calculations

Grades will be calculated on an absolute basis: there will be no overall curving. A weighted average will be calculated according to the percentages attributed to each assessment method listed in section 3. The mapping of the weighted average to letter grades is given below. Please note that these grade boundaries may move slightly at the discretion of the instructor, but the grade boundary for A is unlikely to change.

| Grade | Range |
|-------|-------|
| A | 93.00–100.00 |
| A- | 90.00–92.99 |
| B+ | 86.00–89.99 |
| B | 82.00–85.99 |
| B- | 77.00–81.99 |
| C+ | 73.00–76.99 |
| C | 69.00–72.99 |
| C- | 65.00–68.99 |
| F | 0.00–59.99 |

---

## 4. Course Materials

Our main communication channel will be Slack (workspace link provided in Canvas). I recommend downloading Slack on your computer and your phone and turning on notifications. Students are encouraged to use Slack to ask questions, coordinate their work and collaborate.

Some guidelines:

- Use #general for general issues, questions etc.
- Use #projects for proposing projects and requesting approval. All projects must be approved by the teacher.
- Use #resources for sharing useful links, tools, and learning materials.
- Only the teaching assistants and the professor should create threads on #announcements. This channel is used for major announcements.
- Use #random for sharing random stuff.
- Use #classchat for the class conversation.

There is also an associated Canvas site for this course. We will use it to help keep track of the deadlines. Please make sure to submit both to Canvas and the class submission form (please see the Canvas welcoming message).

### 4.1 Required Books

- Fitzpatrick, Rob. *The Mom Test: How to talk to customers & learn if your business is a good idea when everyone is lying to you.* Robfitz Ltd, 2013.
- Liedtka, Jeanne, and Tim Ogilvie. *Designing for Growth: A design thinking tool kit for managers.* Columbia University Press, 2011.
- Sutherland, Jeff, and J. J. Sutherland. *Scrum: the art of doing twice the work in half the time.* Crown Currency, 2014.

### 4.2 Online Documentation and Readings

Vibe coding is a rapidly evolving field, and the most current information comes from online sources. Students will be required to complete weekly readings including:

- Anthropic Claude Documentation - https://docs.anthropic.com
- Antigravity Documentation - https://docs.antigravity.dev
- GitHub Copilot Guide - https://docs.github.com/copilot
- Research papers on LLMs, prompt engineering, and AI-assisted development
- Case studies and blog posts from industry practitioners
- Community-contributed best practices and prompt libraries

A complete reading list with specific assignments for each week will be available on Canvas.

### 4.3 Technologies

Our main programming languages for the class will be JavaScript and TypeScript. The class will also cover technologies such as React, Next.js, Node.js, Express, PostgreSQL/MongoDB, and various AI tools. It is fundamental that students setup their working computers with a good IDE (Integrated Development Environment), with support for linting tools (ESLint and Prettier).

**Required Tools:**

- Antigravity IDE (free)
- Claude.ai account (Pro recommended, $20/month)
- GitHub account (free, Pro for students)
- Node.js 18+ and npm
- Git installed locally

**Recommended Tools:**

- Claude Code (agentic terminal tool)
- Postman or Insomnia (API testing)
- Sentry (error tracking - free tier)
- Vercel / Railway / Render (deployment)
- CodeCov (coverage reporting)

### 4.4 Handing in Assignments

Students will submit their homeworks and projects using Canvas and the class submission form found on the class website. We will also be using GitHub for code repositories and YouTube/Loom for demo videos. For each project students will need to create video demonstrations and presentations apart from well-documented GitHub repositories published under the MIT License. More of this will be explained as we move forward during the semester. The instructor can modify elements of this process.

---

## 5. General Policies

### 5.1 Attendance

Students are expected to attend classes regularly, take tests, and submit assignments and other work at the times specified by the instructor.

Students who are absent repeatedly from class will be evaluated by faculty responsible for the course to ascertain their ability to achieve the course objectives and to continue in the course.

Instructors may include, as part of the semester's grades, marks for the quality and quantity of the student's participation in class.

### 5.2 Academic Integrity

This class has very strict standards for academic integrity, with special considerations for AI-assisted development. Students must document all AI tool usage, understand all code submitted, and follow attribution rules. Weekly quizzes verify conceptual understanding. See full policy details in Canvas.

### 5.3 Reasonable Accommodations

One goal of instructors is that every student should be able to participate in this course. If you require any special accommodations, let me know immediately so that we can work out appropriate arrangements.

### 5.4 Student Feedback

The instructor's weekly office hours are Tuesdays 2-4PM. You can also request office hours on demand using Slack. Your opinions are very important. All students are strongly encouraged to use the TRACE system near the end of the course.

### 5.5 Classroom Environment

All participants share responsibility in creating a civil and non-disruptive forum. Students are expected to conduct themselves respectfully at all times. Repeated unprofessional conduct may result in grade consequences.

### 5.6 Title IX

Title IX protects individuals from sex or gender-based discrimination. Faculty are required employees. Confidential resources available through UHCS, SVRC. Report to titleix@northeastern.edu or NUPD (844) 688-6287. Full policy at Office for University Equity and Compliance.

### 5.7 Students with Disabilities

Students with disabilities should visit the Disability Resource Center or call (844) 688-6287. Please provide your DRC letter to the instructor early in the semester.

### 5.8 Generative AI Tools

This course REQUIRES AI tool use. Students must document usage, understand all code, demonstrate mastery through weekly quizzes, exercise caution, and share learnings. Goal: become expert AI-assisted engineers.

---

## 6. Project Requirements Summary

### Project 1: Personal Utility App (13%) - Due Week 7

- 5+ user stories, ONE modality focus
- 50%+ test coverage, basic CI/CD
- Deployed application
- 5-min video, 500-word reflection

### Project 2: Full-Stack Application (18%) - Due Week 12

- Full-stack with auth, 3 modalities
- 80%+ coverage, TDD, comprehensive evals
- Advanced CI/CD with deploy previews
- 2+ Agile sprints
- 10-min video, 1500-word blog

### Project 3: Team Application (19%) - Due Week 15

- Team of 2-3, production-grade
- Parallel agentic programming
- Enterprise CI/CD, monitoring
- LLM-as-judge evals
- 3+ sprints, security audit
- 20-min presentation, blog

---

## 7. The Three Modalities

### Modality 1: Claude Web (Week 2)
**Best for:** Architecture planning, learning, brainstorming

### Modality 2: Antigravity IDE (Weeks 5-6)
**Best for:** Professional development, production code

### Modality 3: Claude Code (Week 7)
**Best for:** Automation, refactoring, DevOps

---

## 8. Homework Assignments

Six assignments scaffold toward project success:

- **HW1 (4%):** Prompt engineering battle with 3 challenges
- **HW2 (4%):** Mom Test interviews, user stories, PRD
- **HW3 (4%):** Context engineering lab, .antigravityrules creation
- **HW4 (5%):** TDD + CI/CD + comprehensive evals suite
- **HW5 (4%):** Parallel agent orchestration
- **HW6 (4%):** Production readiness checklist

---

## 9. Key Course Features

### Weekly Quizzes (10%)

Weekly concept quizzes on Canvas verify understanding of course material. Topics include LLM fundamentals, prompt engineering, TDD principles, CI/CD workflows, and evaluation methodology. 14 quizzes total, lowest 2 dropped.

### LLM Fundamentals (Week 1)

Critical 2-hour module covering transformer architecture, tokens, context windows, hallucinations, model comparison, and when to trust AI outputs.

---

## 10. Success in This Course

- Start early - projects take longer than expected
- Document everything - save prompts, track learnings
- Test continuously - embrace TDD with AI
- Understand your code - never commit unexplained code
- Engage with peers - share prompts, help others
- Build portfolio pieces - make interview-worthy projects
- Stay current - AI tools evolve rapidly

---

## 11. Learning Resources and Support

### Getting Help

- Pre-class questions on Canvas
- Slack for quick questions
- Office hours: Tuesdays 2-4 PM
- TA hours (posted on Slack)
- Pair programming sessions
- AI debugging clinics (Fridays)

### Wellness

This demanding course requires strong time management. Don't hesitate to ask for help. Extensions available for legitimate reasons. Mental health resources through university counseling.

---

By the end of this course, you will have a portfolio of 3 production-ready applications, mastery of AI-assisted development tools, and the professional engineering practices needed to succeed in Silicon Valley. Let's build something amazing!

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | January 2025 | Initial syllabus with No-AI Challenge (pass/fail midterm) |
| v2.0 | January 22, 2026 | Replaced No-AI Challenge with Weekly Quizzes (10% of grade). Adjusted grading: Participation 20%→15%, Projects 55%→50% |
