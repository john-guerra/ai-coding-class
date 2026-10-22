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
| **Due Date** | Before the week's first class: Tue 10:35 AM PT (Oak/Hybrid) · Wed 1:00 PM PT (San Jose) |
| **Available From** | Start of the week (quiz + readings are pre-class) |
| **Published** | No (until ready) |

---

## Quiz Instructions

This pre-class quiz assesses your understanding of IDE AI coding concepts from this week's required readings and Weeks 2–5.

**Instructions:**
- **Time Limit:** 10 minutes
- **Questions:** 10 questions (14 points total)
- **Attempts:** One attempt only

**Topics Covered:**
- IDE AI architecture pipeline (context collection, LLM inference)
- Context collection strategies (cursor, open tabs, imports, semantic index)
- Tab completion best practices
- Interaction modes (suggestions, inline edit, chat, agent)
- Plan mode vs. other autonomy modes
- Agent mode risks and scope management
- Rules files and scoped instruction files
- @ context references
- Transferable concepts across IDE AI tools

**Academic Integrity:** This is an individual assessment. Do not use AI assistants to answer questions. Questions are designed to test your understanding, not your ability to look up answers.

---

## Questions

### Section 1: Foundational Concepts (Q1-Q5, mix of 1-2 points)

---

#### Q1: IDE AI Architecture Pipeline (1 point)
**Type:** Multiple Choice

In the IDE AI architecture pipeline, what happens immediately **AFTER** the editor extension collects context from your project?

- A) The context is written to a local database so later sessions can reuse it without calling the LLM
- B) The assembled context is sent to an LLM, which returns a suggestion, edit, or chat response
- C) The editor shows you a diff of the collected context to approve before any of it reaches the model
- D) The extension fine-tunes a local copy of the model on the collected files, then uses that copy

---

#### Q2: Context Collection — Semantic Index (1 point)
**Type:** Multiple Choice

Which context collection strategy allows the IDE AI tool to answer questions about files you have **never opened**, by finding semantically related code across your entire project?

- A) Cursor context (the lines just above and below your cursor)
- B) Open tabs (the files currently open in your editor's tabs)
- C) Import graph (files linked to the current one by imports)
- D) Embeddings index (vector representations of code chunks)

---

#### Q3: Tab Completion Best Practices (1 point)
**Type:** Multiple Choice

Which practice will **MOST** improve the quality of AI autocomplete suggestions?

- A) Write a descriptive function signature and a comment explaining intent before letting the AI complete the body
- B) Type quickly without pausing, since the model weights each prediction by how many recent keystrokes it has seen
- C) Accept every suggestion in full and fix it afterward, since each acceptance retrains the model on your style
- D) Leave no code below the cursor, since the model predicts best when it sees only the prefix and not a suffix

---

#### Q4: Choosing the Right Interaction Mode (1 point)
**Type:** Multiple Choice

You have a working function but want to add null-input error handling to just that function. Which interaction mode is the best fit?

- A) Suggestions — put the cursor in the function body and keep typing until autocomplete adds the checks
- B) Chat Panel — open the sidebar and ask "add error handling for null input" with the file attached
- C) Inline Edit — select the function, press Cmd+K, describe "add error handling for null input"
- D) Agent Mode — ask it to "add error handling for null input" and let it plan and apply the edits

---

#### Q5: Plan Mode (1 point)
**Type:** Multiple Choice

You want the AI to research a database migration and lay out the steps it would take, with **no files changed** until you approve those steps. Which mode fits, and why?

- A) Plan mode — it researches with read-only tools and drafts a plan, then waits for your approval
- B) Ask mode — it answers questions about the code, then applies the migration once you reply "go"
- C) Agent mode — it plans and executes in one pass, and you review the full diff once it finishes
- D) Write mode — it edits the files directly, then lists the steps it took so you can undo any you dislike

---

### Section 2: Application & Scenario Questions (Q6-Q10, mix of 1-2 points)

---

#### Q6: Agent Mode Risks (2 points)
**Type:** Multiple Choice

You ask Agent mode to "refactor the authentication module to use JWT tokens." The AI modifies 12 files, installs two new npm packages, and updates environment variables. Three unrelated features break. What is the most likely root cause and best preventive practice?

- A) The model sampled too randomly and hallucinated parts of the JWT flow; lower the temperature setting in the IDE before re-running the task
- B) The model lacked JWT knowledge and guessed at the library's API; paste the JWT library docs into chat so it stops guessing on the next run
- C) Agent mode's changes cascaded across the project in ways hard to review; scope Agent tasks narrowly and review the plan before execution
- D) The new packages overwrote shared builds in node_modules, breaking other features; run a clean npm ci after every Agent run to restore them

---

#### Q7: Rules Files — Deep Dive (2 points)
**Type:** Multiple Choice

Your team starts a Next.js/TypeScript/Tailwind project and creates the project's rules file for its IDE AI assistant. Which **BEST** represents what should go in it, and why?

- A) Just the project name and a README link — the AI follows the link on each request, so the README stays the single source of truth for all conventions
- B) Full tutorials on Next.js, TypeScript, and Tailwind so the AI learns the stack — length doesn't matter, since the file is read only once when the project opens
- C) A copy of your ESLint and Prettier configs — the AI parses them as its rules, and those configs already define every convention your team needs to follow
- D) Tech stack, naming conventions, architectural patterns, testing requirements, and explicit "don'ts" — kept concise because it is injected into every prompt

---

#### Q8: Scoped Instructions (2 points)
**Type:** Multiple Choice

Your repo already has a repo-wide `.github/copilot-instructions.md`. Its TypeScript frontend and Python backend need different coding conventions in GitHub Copilot Chat in VS Code. Per the Copilot docs, what setup works?

- A) Keep both in copilot-instructions.md under headings, since Copilot applies each heading only to that language's files
- B) Add NAME.instructions.md files with applyTo globs; a matching file then replaces the repo-wide instructions for it
- C) Add NAME.instructions.md files with applyTo globs; Copilot uses a matching file together with the repo-wide one
- D) Attach the conventions to each chat with @file, since instruction files are read only when attached to a chat

---

#### Q9: @ Context References (1 point)
**Type:** Multiple Choice

You're debugging an auth bug that spans multiple files but you don't know which ones. Which `@` reference is the best **FIRST** step?

- A) @codebase how is JWT authentication handled? — search the entire project semantically
- B) @file src/auth/login.ts — load the login file, where the app's auth requests enter
- C) @web JWT authentication best practices — compare your code with known-good JWT patterns
- D) @git recent changes to auth — @git indexes every file's contents, so it finds all auth code

---

#### Q10: Transferable Concepts (2 points)
**Type:** Multiple Choice

A developer using Cursor with a project rules file and Cmd+K switches to a job using GitHub Copilot. What must they **COMPLETELY** relearn vs. what transfers?

- A) Almost everything — each tool trains its own model on its own rules format, so context strategies, rules files, interaction modes, and autonomy levels don't carry over between editors
- B) Core concepts (context hierarchy, rules files, interaction modes, autonomy levels) transfer; mostly they need new keybindings, @-reference names, and the rules file location (.github/copilot-instructions.md)
- C) Only tab completion transfers, since it is built into VS Code itself; inline edit, chat, agent mode, and rules files are proprietary to each vendor and have to be relearned from scratch
- D) Prompting habits don't transfer: Copilot runs different models, and context written for one model's tokenizer degrades on another's, so they must relearn how to write signatures and comments

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
