# Week 8: Advanced IDE AI Quiz

## Quiz Settings (Configure in Canvas)

| Setting | Value |
|---------|-------|
| **Quiz Type** | Graded Quiz |
| **Points** | 22 points |
| **Time Limit** | 15 minutes |
| **Allowed Attempts** | 1 |
| **Shuffle Answers** | Yes |
| **Show One Question at a Time** | Yes |
| **Lock Questions After Answering** | Yes |
| **Due Date** | Before the week's first class: Tue 10:35 AM PT (Oak/Hybrid) · Wed 1:00 PM PT (San Jose) |
| **Available From** | Start of the week (quiz + readings are pre-class) |
| **Published** | No (until ready) |

---

## Quiz Instructions

This pre-class quiz assesses your understanding of advanced IDE AI concepts from this week's required readings and Weeks 2–7.

**Instructions:**
- **Time Limit:** 15 minutes
- **Questions:** 15 questions (22 points total)
- **Attempts:** One attempt only

**Topics Covered:**
- Agent memory files (AGENTS.md, CLAUDE.md, tool-specific rules files)
- What makes a good memory file
- Memory files across different tools
- MCP (Model Context Protocol) architecture
- MCP practical use cases (Database, GitHub, Docs servers)
- Browser mode for UI debugging
- Mockup-to-code workflow
- AI debugging (good vs. bad prompts)
- AI debugging workflow (copy, paste, explain, review, fix, verify)
- Rubber duck debugging with AI
- Shared rules files for pairs
- Evolving rules files over time
- Complete P2 sprint workflow
- Verifying AI debugging suggestions

**Academic Integrity:** This is an individual assessment. Do not use AI assistants to answer questions. Questions are designed to test your understanding, not your ability to look up answers.

---

## Questions

### Section 1: Foundational Concepts (Q1-Q5, mix of 1-2 points)

---

#### Q1: Agent Memory — The Problem (1 point)
**Type:** Multiple Choice

Why do IDE AI tools need memory files like `AGENTS.md` or `CLAUDE.md`?

- A) Every new chat session starts fresh — memory files give the AI persistent project knowledge across sessions
- B) The AI's training data has a cutoff, so memory files retrain the model on your codebase each time you open the IDE
- C) Memory files cache the AI's earlier responses on disk, so repeated questions are answered faster and more cheaply
- D) Memory files grant the AI permission to read and edit your project's files, which it otherwise cannot open at all

---

#### Q2: What Makes a Good Memory File (1 point)
**Type:** Multiple Choice

Which of the following best represents what should go in an `AGENTS.md` file for a Next.js/TypeScript/Prisma project?

- A) A condensed Next.js and Prisma tutorial, so the AI learns the frameworks before editing code
- B) An auto-generated list of every file and its line count, so the AI can skip indexing the repo
- C) Tech stack and versions, architecture decisions, code patterns, and common pitfalls to avoid
- D) Each partner's personal editor settings, so the AI adapts its output style to whoever is typing

---

#### Q3: Memory Files Across Tools (1 point)
**Type:** Multiple Choice

A developer keeps project rules in `.github/copilot-instructions.md` for GitHub Copilot and joins a company that uses Claude Code. Which file is Claude Code's native project memory file?

- A) .cursor/rules
- B) CLAUDE.md
- C) .env
- D) package.json

---

#### Q4: MCP Architecture (2 points)
**Type:** Multiple Choice

Your IDE AI needs to check the current CI/CD pipeline status in GitHub Actions. Using MCP (Model Context Protocol), what is the correct flow of information?

- A) Your IDE AI sends the question to GitHub's own hosted model, which reads Actions internally and replies with the status in chat
- B) The MCP server downloads your repo's workflow YAML files, and the AI predicts the CI status from what the pipeline is meant to do
- C) The AI reads a CI status cached in your rules file, which the MCP client rewrites in the background after every git push to main
- D) Your IDE (the MCP host) uses an MCP client to send a request to a GitHub MCP server, which queries the GitHub API and returns the CI status

---

#### Q5: MCP Practical Use Cases (2 points)
**Type:** Multiple Choice

You're working on your P2 project and ask your IDE AI: "What's the schema for the users table?" Without MCP, you'd need to open a database client, run a query, and copy the result into chat. With MCP, the AI can answer directly. Which MCP server makes this possible?

- A) Database MCP Server (PostgreSQL/MongoDB)
- B) GitHub MCP Server (Issues, PRs, Actions)
- C) Docs MCP Server (API documentation sites)
- D) Browser MCP Server (your running web app)

---

### Section 2: Application Questions (Q6-Q10, mix of 1-2 points)

---

#### Q6: MCP — Why It Matters (1 point)
**Type:** Multiple Choice

What is the key difference between an AI tool with MCP connections and one without?

- A) MCP fine-tunes the model on your connected tools' data, so the AI answers from memory instead of from pasted context
- B) Without MCP the AI can only chat about code; with MCP it gains the ability to create and edit files in your project
- C) Without MCP, you copy-paste information between tools; with MCP, the AI directly queries databases, APIs, and docs
- D) With MCP, your project context syncs to one vendor's cloud, so only that vendor's AI assistant can reuse your data

---

#### Q7: Browser Mode (2 points)
**Type:** Multiple Choice

You're building a profile page for P2, and the layout looks wrong on mobile. Your partner says "just look at it." How can browser mode in your IDE AI help more effectively?

- A) Browser mode replaces Chrome DevTools with an AI panel, so element inspection and the box model view go away
- B) Browser mode can take screenshots of your running app, analyze the UI issue, and suggest specific CSS fixes
- C) Browser mode rewrites your CSS in the live page and saves it to disk, skipping the diff so no review is needed
- D) Browser mode renders only at your monitor's desktop width, so mobile layout bugs must still be checked by hand

---

#### Q8: Mockup-to-Code Workflow (1 point)
**Type:** Multiple Choice

What is the correct order for the mockup-to-code workflow?

- A) Prompt for implementation, get a mockup, share it with IDE AI, then iterate
- B) Get a mockup, prompt for implementation, iterate, then share it with IDE AI
- C) Share it with IDE AI, get a mockup, iterate on the design, then prompt for code
- D) Get a mockup, share it with IDE AI, prompt for implementation, then iterate

---

#### Q9: AI Debugging — Good vs. Bad Prompts (2 points)
**Type:** Multiple Choice

You're debugging a TypeError in your React component:
`TypeError: Cannot read properties of undefined (reading 'map')`
at `UserList (src/components/UserList.tsx:15:22)`. Which prompt will get the most useful help from your IDE AI?

- A) "This error occurs in UserList.tsx line 15. The `users` prop is sometimes undefined. Show me how to add a safe check and a loading state."
- B) "Fix this TypeError in UserList. It is probably a React bug, so wrap the whole component in a try-catch and log the error."
- C) "Explain why JavaScript throws TypeError on undefined values in general, with a few examples I can study before I open UserList.tsx again."
- D) "This error is in UserList.tsx line 15. Rewrite the whole component from scratch in Agent mode so the map error goes away."

---

#### Q10: AI Debugging Workflow (2 points)
**Type:** Multiple Choice

Your P2 app crashes with an error you've never seen before. Which sequence of steps is the right way to debug it with AI?

- A) Copy the error, paste it in IDE AI chat, apply the first fix it suggests, then read its explanation only if the error returns
- B) Paste the error into chat, wrap the failing call in a try-catch so the app stops crashing, then ask for an explanation later
- C) Copy the error/stack trace, paste in IDE AI chat, ask for explanation, review the explanation, apply the fix, then verify it works
- D) Copy the stack trace, ask the AI to explain it, apply the fix, then skip running the tests since the AI already checked the logic for you

---

### Section 3: Scenario-Based Questions (Q11-Q15, mix of 1-2 points)

---

#### Q11: Rubber Duck Debugging with AI (1 point)
**Type:** Multiple Choice

A test passes locally but fails in CI. You've spent an hour staring at the code. Which approach best uses the AI as a "rubber duck" debugger?

- A) Ask the AI: "Fix my CI" and attach the workflow YAML, letting it pick the root cause alone so your own reasoning cannot bias what it suggests
- B) Mark the test as skipped in CI with a TODO, since it passes locally, so the failure must come from the CI runner and not your code
- C) Paste the full CI log into chat with no comment, since rubber duck debugging works best when the AI reads the raw output without your framing
- D) Explain to the AI: "This test passes locally but fails in CI. What could cause environment-specific test failures?" and walk through your reasoning

---

#### Q12: Shared Rules File for Pairs (2 points)
**Type:** Multiple Choice

You and your P2 partner disagree on whether to use `camelCase` or `snake_case` for API route names. How should you resolve this?

- A) Let whichever partner owns the API issue decide each sprint, and record the choice in that sprint's retrospective notes
- B) Add the decision to your shared rules file — it serves as the tiebreaker for conventions, and both partners follow it
- C) Use both: camelCase in frontend calls and snake_case in route files, and let the AI translate between them as needed
- D) Ask the AI which convention is more common and adopt its answer, since it has seen far more codebases than you two have

---

#### Q13: Evolving Rules Files (1 point)
**Type:** Multiple Choice

During Sprint 2, your pair discovers that the AI keeps generating class components instead of functional components. What is the best way to address this?

- A) Update the shared rules file to add "Always use functional components, never class components" and commit the change in its own PR
- B) Manually convert each class component as it appears and note it in standup, since the AI resets its habits every sprint
- C) Switch from Agent mode to Ask mode for components, since only Agent mode generates class components while Ask mode defaults to functional ones
- D) Start every chat with "use functional components", since a rules file is read once at setup and ignored in later sessions

---

#### Q14: Complete P2 Sprint Workflow (2 points)
**Type:** Multiple Choice

You've been assigned issue #42 (Add login page) for Sprint 2 of P2. Put these steps in the correct order: (1) Partner reviews your PR, (2) Create feature branch, (3) Self-review with AI before creating PR, (4) Use Agent mode to implement, (5) Create PR linking to the issue, (6) Partner approves and you merge, (7) Move issue to Done on the board.

- A) 4 > 2 > 5 > 1 > 3 > 6 > 7
- B) 5 > 2 > 4 > 1 > 6 > 3 > 7
- C) 2 > 4 > 5 > 1 > 6 > 7 > 3
- D) 2 > 4 > 3 > 5 > 1 > 6 > 7

---

#### Q15: Verifying AI Debugging Suggestions (1 point)
**Type:** Multiple Choice

An AI suggests a confident fix for your bug. Before accepting it, what should you always do?

- A) Accept it if the AI's explanation is confident and names the right file
- B) Ask a second AI tool to review it, and accept it if both models agree
- C) Verify the fix by running the code (run the test or reload the app)
- D) Check it against a StackOverflow answer for the same error message

---

## Canvas Import Instructions

1. **Create New Quiz** in Canvas under "Quizzes" using `canvas-extras` MCP tools
2. **Configure Settings** as shown in the Settings table above
3. **Add Questions** using `canvas_create_quiz_question` for each question
4. **Set Correct Answers** (see answer key - instructor only)
5. **Save and Preview** before publishing

## Anti-Cheating Measures Implemented

1. **Time pressure** - 15 minutes for 15 questions limits research time
2. **Answer shuffling** - Different order for each student
3. **Scenario-based** - Requires understanding and application, not just recall
4. **Single attempt** - No retakes
5. **Locked questions** - Can't go back and change answers
6. **Progressive difficulty** - Easier concepts first, harder application last
