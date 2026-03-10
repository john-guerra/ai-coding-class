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
| **Due Date** | Tuesday, Week 8 at 2:59 PM PT |
| **Available From** | After Week 8 lecture |
| **Published** | No (until ready) |

---

## Quiz Instructions

This quiz assesses your understanding of advanced IDE AI concepts covered in Week 8 lectures and readings.

**Instructions:**
- **Time Limit:** 15 minutes
- **Questions:** 15 questions (22 points total)
- **Attempts:** One attempt only

**Topics Covered:**
- Agent memory files (.antigravityrules, CLAUDE.md, .cursorrules)
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

Why do IDE AI tools need memory files like `.antigravityrules` or `CLAUDE.md`?

- A) The AI's training data is outdated and memory files provide updated documentation
- B) Every new chat session starts fresh — memory files give the AI persistent project knowledge across sessions
- C) Memory files speed up the AI's response time by caching previous outputs
- D) Memory files are required for the AI to access your file system

---

#### Q2: What Makes a Good Memory File (1 point)
**Type:** Multiple Choice

Which of the following best represents what should go in a `.antigravityrules` file for a Next.js/TypeScript/Prisma project?

- A) A complete Next.js tutorial so the AI can learn the framework
- B) Tech stack and versions, architecture decisions, code patterns, and common pitfalls to avoid
- C) A list of all files in the project with their line counts
- D) Your personal preferences for code formatting (tabs vs. spaces, semicolons, etc.)

---

#### Q3: Memory Files Across Tools (1 point)
**Type:** Multiple Choice

A developer uses `.antigravityrules` at their current job and switches to a company that uses Claude Code. What is the equivalent memory file they need to create?

- A) .cursorrules
- B) CLAUDE.md
- C) .env
- D) package.json

---

#### Q4: MCP Architecture (2 points)
**Type:** Multiple Choice

Your IDE AI needs to check the current CI/CD pipeline status in GitHub Actions. Using MCP (Model Context Protocol), what is the correct flow of information?

- A) Your IDE AI asks you to open GitHub in a browser and read the status aloud
- B) Your IDE AI (MCP Client) sends a request to a GitHub MCP Server, which queries the GitHub API and returns the CI status
- C) The AI fine-tunes itself on your GitHub repository to learn the CI status
- D) The AI reads your .antigravityrules file to find the CI status

---

#### Q5: MCP Practical Use Cases (2 points)
**Type:** Multiple Choice

You're working on your P2 project and ask your IDE AI: "What's the schema for the users table?" Without MCP, you'd need to open a database client, run a query, and copy the result into chat. With MCP, the AI can answer directly. Which MCP server makes this possible?

- A) GitHub MCP Server
- B) Database MCP Server (PostgreSQL/MongoDB)
- C) Docs MCP Server
- D) File System MCP Server

---

### Section 2: Application Questions (Q6-Q10, mix of 1-2 points)

---

#### Q6: MCP — Why It Matters (1 point)
**Type:** Multiple Choice

What is the key difference between an AI tool with MCP connections and one without?

- A) MCP makes the AI smarter by improving its training data
- B) Without MCP, you copy-paste information between tools; with MCP, the AI directly queries databases, APIs, and docs
- C) MCP is required for the AI to generate code
- D) MCP only works with Claude, not other AI tools

---

#### Q7: Browser Mode (2 points)
**Type:** Multiple Choice

You're building a profile page for P2, and the layout looks wrong on mobile. Your partner says "just look at it." How can browser mode in your IDE AI help more effectively?

- A) Browser mode can take screenshots of your running app, analyze the UI issue, and suggest specific CSS fixes
- B) Browser mode replaces Chrome DevTools entirely
- C) Browser mode automatically fixes CSS without showing you the changes
- D) Browser mode only works for desktop layouts, not mobile

---

#### Q8: Mockup-to-Code Workflow (1 point)
**Type:** Multiple Choice

What is the correct order for the mockup-to-code workflow covered in the slides?

- A) Write code first, then create a mockup to compare against
- B) Get a mockup, share it with IDE AI, prompt for implementation, then iterate
- C) Describe the UI verbally to the AI without any visual reference
- D) Have the AI generate a mockup, then implement it yourself without AI help

---

#### Q9: AI Debugging — Good vs. Bad Prompts (2 points)
**Type:** Multiple Choice

You're debugging a TypeError in your React component:
`TypeError: Cannot read properties of undefined (reading 'map')`
at `UserList (src/components/UserList.tsx:15:22)`. Which prompt will get the most useful help from your IDE AI?

- A) "Fix this error"
- B) "This error occurs in UserList.tsx line 15. The `users` prop is sometimes undefined. Show me how to add a safe check and a loading state."
- C) "Why does JavaScript have TypeError?"
- D) "Search StackOverflow for this error and paste the solution"

---

#### Q10: AI Debugging Workflow (2 points)
**Type:** Multiple Choice

Your P2 app crashes with an error you've never seen before. Following the AI debugging workflow from the slides, what is the correct sequence of steps?

- A) Apply the first AI suggestion immediately, then check if it worked
- B) Copy the error/stack trace, paste in IDE AI chat, ask for explanation, review the explanation, apply the fix, then verify it works
- C) Rewrite the entire file from scratch using Agent mode
- D) Ignore the error and add a try-catch to suppress it

---

### Section 3: Scenario-Based Questions (Q11-Q15, mix of 1-2 points)

---

#### Q11: Rubber Duck Debugging with AI (1 point)
**Type:** Multiple Choice

A test passes locally but fails in CI. You've spent an hour staring at the code. Which approach best uses the AI as a "rubber duck" debugger?

- A) Ask the AI: "Fix my CI"
- B) Explain to the AI: "This test passes locally but fails in CI. What could cause environment-specific test failures?" and walk through your reasoning
- C) Delete the failing test since it works locally
- D) Copy the entire CI log and paste it without any explanation

---

#### Q12: Shared Rules File for Pairs (2 points)
**Type:** Multiple Choice

You and your P2 partner disagree on whether to use `camelCase` or `snake_case` for API route names. According to the slides, how should you resolve this?

- A) Whoever writes the code first gets to decide
- B) Add the decision to your shared rules file — it serves as the tiebreaker for conventions, and both partners follow it
- C) Use different conventions in different files
- D) Ask the AI to decide and use whatever it suggests

---

#### Q13: Evolving Rules Files (1 point)
**Type:** Multiple Choice

During Sprint 2, your pair discovers that the AI keeps generating class components instead of functional components. What is the best way to address this?

- A) Manually convert each generated component and move on
- B) Update the shared rules file to add "Always use functional components, never class components" and commit the change in its own PR
- C) Switch to a different AI tool that generates functional components by default
- D) Tell the AI in every chat message to use functional components

---

#### Q14: Complete P2 Sprint Workflow (2 points)
**Type:** Multiple Choice

You've been assigned issue #42 (Add login page) for Sprint 2 of P2. Put these steps in the correct order: (A) Partner reviews your PR, (B) Create feature branch, (C) Self-review with AI before creating PR, (D) Use Agent mode to implement, (E) Create PR linking to the issue, (F) Partner approves and you merge, (G) Move issue to Done on the board.

- A) B > D > C > E > A > F > G
- B) D > B > E > A > C > F > G
- C) E > B > D > A > F > C > G
- D) B > D > E > A > F > G > C

---

#### Q15: Verifying AI Debugging Suggestions (1 point)
**Type:** Multiple Choice

The slides warn: "Watch for hallucinated fixes." When the AI suggests a fix for your bug, what should you always do before accepting it?

- A) Accept it immediately — the AI is usually right
- B) Verify the fix by running the code (run the test or reload the app)
- C) Ask a second AI tool for a second opinion
- D) Check if the fix matches code you've seen on StackOverflow

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
