# Week 5: Building with Claude Web Artifacts Quiz

## Quiz Settings (Configure in Canvas)

| Setting | Value |
|---------|-------|
| **Quiz Type** | Graded Quiz |
| **Points** | 14 points |
| **Time Limit** | 10 minutes |
| **Allowed Attempts** | 1 |
| **Shuffle Answers** | Yes |
| **Show One Question at a Time** | Yes |
| **Lock Questions After Answering** | Yes |
| **Due Date** | Tuesday, Week 5 at 2:59 PM PT |
| **Available From** | After Week 5 lecture |
| **Published** | No (until ready) |

---

## Quiz Instructions

This quiz assesses your understanding of Claude Web Artifacts concepts covered in Week 5 lectures and readings.

**Instructions:**
- **Time Limit:** 10 minutes
- **Questions:** 10 questions (14 points total)
- **Attempts:** One attempt only

**Topics Covered:**
- Artifact sandbox constraints and storage
- Artifact limitations (single-file architecture)
- AI-powered artifacts (calling Claude API from artifacts)
- Mockup-to-artifact workflow
- Debugging artifacts with DevTools
- Claude Projects for persistent context
- Pre-bundled libraries (React, Tailwind, shadcn/ui, Recharts)
- Iterative development loop

**Academic Integrity:** This is an individual assessment. Do not use AI assistants to answer questions. Questions are designed to test your understanding, not your ability to look up answers.

---

## Questions

### Section 1: Foundational Concepts (Q1-Q5, mix of 1-2 points)

---

#### Q1: Artifact Sandbox Constraints (1 point)
**Type:** Multiple Choice

Which standard browser storage API is **BLOCKED** inside Claude Artifacts due to the sandboxed iframe?

- A) localStorage
- B) useState from React
- C) JavaScript variables and arrays
- D) JSON.stringify()

---

#### Q2: Artifact Data Persistence (1 point)
**Type:** Multiple Choice

When does artifact data storage actually persist across sessions?

- A) During development previews in the Claude conversation
- B) Only after the artifact is published
- C) Whenever you save the conversation
- D) Only if you use indexedDB instead of the artifact storage API

---

#### Q3: Artifact Limitations (1 point)
**Type:** Multiple Choice

Which of the following is a key limitation of Claude Artifacts that affects how you structure your Project 1?

- A) Artifacts can only use Python, not JavaScript
- B) All code must live in a single file — components, styles, and logic together
- C) Artifacts cannot use any external libraries at all
- D) Artifacts are limited to 100 lines of code

---

#### Q4: AI-Powered Artifacts (2 points)
**Type:** Multiple Choice

A student wants to add a "smart search" feature to their P1 artifact that uses natural language to filter a list of items. What is the correct approach for calling Claude from inside an artifact?

- A) Import the Anthropic SDK and configure it with your API key
- B) Use fetch() to call the Anthropic API directly — the sandbox intercepts the request, so no API key is needed
- C) Use window.claude.complete() — a special sandbox-only function
- D) Artifacts cannot call any external APIs, including Claude's own API

---

#### Q5: Mockup-to-Artifact Workflow (1 point)
**Type:** Multiple Choice

What is the recommended first step when turning a design into a Claude Artifact?

- A) Write detailed HTML/CSS code and paste it into Claude
- B) Upload a sketch or mockup image and ask Claude to build it as an interactive artifact
- C) Describe the entire application in a single long prompt
- D) Ask Claude to generate a design from scratch without any visual reference

---

### Section 2: Application & Scenario Questions (Q6-Q10, mix of 1-2 points)

---

#### Q6: Debugging Artifacts (2 points)
**Type:** Multiple Choice

Your artifact renders a blank screen with no visible error message. What is the **MOST** effective debugging strategy?

- A) Delete the artifact and start over from scratch
- B) Right-click the artifact, open browser DevTools, check the Console tab for runtime errors, then describe the expected vs actual behavior to Claude
- C) Increase the max_tokens parameter in your Claude conversation
- D) Switch to a different Claude model for better code generation

---

#### Q7: Claude Projects for P1 (2 points)
**Type:** Multiple Choice

You're building your P1 artifact across multiple Claude conversations. What should you upload to your Claude Project's knowledge base to maintain consistent context?

- A) Only your final code, since Claude can figure out everything else
- B) PRD, user stories, architecture decisions, design mockups, and coding conventions
- C) A copy of the entire Claude documentation website
- D) Your personal resume and course transcript

---

#### Q8: Available Libraries (1 point)
**Type:** Multiple Choice

Which UI library comes pre-bundled with Claude Artifacts and does **NOT** require any special imports or CDN links?

- A) Material UI (MUI)
- B) Bootstrap
- C) shadcn/ui with Tailwind
- D) Ant Design

---

#### Q9: AI-Powered Artifact Best Practices (2 points)
**Type:** Multiple Choice

You're building an artifact that classifies user-entered text into categories using Claude's API. Users report the app feels slow and sometimes shows errors. Which combination of best practices would **MOST** improve the experience?

- A) Increase max_tokens to 4096 and add retry logic that calls the API 5 times on failure
- B) Add loading states during API calls, cache results for repeated inputs, and implement graceful fallback when calls fail
- C) Switch to a larger model for more accurate classifications
- D) Remove the AI feature and use keyword matching instead

---

#### Q10: Iterative Development Loop (1 point)
**Type:** Multiple Choice

What is the key insight about the artifact development workflow emphasized in the lecture?

- A) Speed comes from writing perfect prompts that generate correct code on the first try
- B) Speed comes from fast iteration — plan, mockup, upload, build, test, iterate
- C) You should fully plan every detail before writing any code
- D) Each artifact conversation should be completed in a single prompt

---

## Canvas Import Instructions

1. **Create New Quiz** in Canvas under "Quizzes" using `canvas-extras` MCP tools
2. **Configure Settings** as shown in the Settings table above
3. **Add Questions** using `canvas_create_quiz_question` for each question
4. **Set Correct Answers** (see answer key - instructor only)
5. **Save and Preview** before publishing

## Anti-Cheating Measures Implemented

1. **Time pressure** - 10 minutes for 10 questions limits research time
2. **Answer shuffling** - Different order for each student
3. **Scenario-based** - Requires understanding and application, not just recall
4. **Single attempt** - No retakes
5. **Locked questions** - Can't go back and change answers
6. **Progressive difficulty** - Easier concepts first, harder application last
