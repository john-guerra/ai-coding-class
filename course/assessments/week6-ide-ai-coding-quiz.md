# Week 6: IDE AI Coding Quiz

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
| **Due Date** | Tuesday, Week 6 at 2:59 PM PT |
| **Available From** | After Week 6 lecture |
| **Published** | No (until ready) |

---

## Quiz Instructions

This quiz assesses your understanding of IDE AI coding concepts covered in Week 6 lectures and readings.

**Instructions:**
- **Time Limit:** 10 minutes
- **Questions:** 10 questions (14 points total)
- **Attempts:** One attempt only

**Topics Covered:**
- IDE AI architecture pipeline (context collection, LLM inference)
- Context collection strategies (cursor, open tabs, imports, embeddings)
- Tab completion best practices
- Interaction modes (suggestions, inline edit, chat, agent)
- Autonomy modes (Ask, Write, Plan, Agent)
- Agent mode risks and scope management
- Rules files (.antigravityrules, .cursorrules)
- Context hierarchy and priority
- @ context references (@file, @codebase, @web, @git)
- Transferable concepts across IDE AI tools

**Academic Integrity:** This is an individual assessment. Do not use AI assistants to answer questions. Questions are designed to test your understanding, not your ability to look up answers.

---

## Questions

### Section 1: Foundational Concepts (Q1-Q5, mix of 1-2 points)

---

#### Q1: IDE AI Architecture Pipeline (1 point)
**Type:** Multiple Choice

In the IDE AI architecture pipeline, what happens immediately **AFTER** the editor extension collects context from your project?

- A) The context is saved to a local database for future sessions
- B) The assembled context is sent to an LLM, which returns a suggestion, edit, or chat response
- C) The editor displays a diff for you to review before any AI processing
- D) The extension fine-tunes the model on your codebase

---

#### Q2: Context Collection — Embeddings (1 point)
**Type:** Multiple Choice

Which context collection strategy allows the IDE AI tool to answer questions about files you have **never opened**, by finding semantically related code across your entire project?

- A) Cursor context (lines around your cursor)
- B) Open tabs (files currently visible in the editor)
- C) Import graph (files connected by imports)
- D) Embeddings index (vector representations of code chunks)

---

#### Q3: Tab Completion Best Practices (1 point)
**Type:** Multiple Choice

Which practice will **MOST** improve the quality of AI autocomplete suggestions?

- A) Type as fast as possible so the AI sees more keystrokes
- B) Write a descriptive function signature and a comment explaining intent before letting the AI complete the body
- C) Accept every suggestion fully, then edit afterward
- D) Close all other files to reduce distractions

---

#### Q4: Choosing the Right Interaction Mode (1 point)
**Type:** Multiple Choice

You have a working function but want to add null-input error handling to just that function. Which interaction mode is the best fit?

- A) Suggestions (just type and wait for autocomplete)
- B) Inline Edit — select the function, press Cmd+K, describe "add error handling for null input"
- C) Chat Panel — ask "Can you add null checks?"
- D) Agent Mode — let the AI plan and execute changes

---

#### Q5: Four Autonomy Modes (1 point)
**Type:** Multiple Choice

In which autonomy mode does the AI create a step-by-step outline of proposed changes and wait for your approval before modifying any files?

- A) Ask Mode
- B) Write Mode
- C) Agent Mode
- D) Plan Mode

---

### Section 2: Application & Scenario Questions (Q6-Q10, mix of 1-2 points)

---

#### Q6: Agent Mode Risks (2 points)
**Type:** Multiple Choice

You ask Agent mode to "refactor the authentication module to use JWT tokens." The AI modifies 12 files, installs two new npm packages, and updates environment variables. Three unrelated features break. What is the most likely root cause and best preventive practice?

- A) The AI hallucinated the JWT implementation; use a lower temperature setting
- B) Agent mode's changes cascaded across the project in ways hard to review; scope Agent tasks narrowly and review the plan before execution
- C) The AI doesn't understand JWT; provide documentation in the chat
- D) The new packages are incompatible; always lock package versions

---

#### Q7: Rules Files — Deep Dive (2 points)
**Type:** Multiple Choice

Your team starts a Next.js/TypeScript/Tailwind project and creates an `.antigravityrules` file. Which **BEST** represents what should go in it, and why?

- A) A complete tutorial on Next.js, TypeScript, and Tailwind so the AI can learn these technologies
- B) Tech stack, naming conventions, architectural patterns, testing requirements, and explicit "don'ts" — kept concise because it is injected into every prompt
- C) Only the project name and a link to the README
- D) A copy of your ESLint and Prettier config files

---

#### Q8: Context Hierarchy (2 points)
**Type:** Multiple Choice

Your `.antigravityrules` says "Always use `fetch` for HTTP requests." In chat, you write: "Use `axios` for this API call, referencing `@src/api/client.ts`." That file uses `axios` throughout. What will the AI most likely do?

- A) Use fetch, because the rules file always overrides everything
- B) Use axios, because your explicit instruction and the @ reference both point to axios, giving strong specific signals that override the general rules file convention
- C) Refuse to generate code due to conflicting instructions
- D) Randomly choose between fetch and axios

---

#### Q9: @ Context References (1 point)
**Type:** Multiple Choice

You're debugging an auth bug that spans multiple files but you don't know which ones. Which `@` reference is the best **FIRST** step?

- A) @file src/auth/login.ts — start with the login file
- B) @codebase how is JWT authentication handled? — search the entire project semantically
- C) @web JWT authentication best practices
- D) @git recent changes to auth

---

#### Q10: Transferable Concepts (2 points)
**Type:** Multiple Choice

A developer using Cursor with `.cursorrules` and Cmd+K switches to a job using GitHub Copilot. What must they **COMPLETELY** relearn vs. what transfers?

- A) They must relearn everything — each tool is fundamentally different
- B) Core concepts (context hierarchy, rules files, interaction modes, autonomy levels) all transfer; they only need new keybindings and the Copilot-specific rules file location (.github/copilot-instructions.md)
- C) Only tab completion transfers; inline editing and chat differ completely
- D) Different AI models mean no prompting strategies will work

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
