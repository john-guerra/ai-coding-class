# Week 12: Claude Code Extensibility Quiz

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
| **Due Date** | Tuesday, Week 12 at 2:59 PM PT |
| **Available From** | After Week 12 lecture |
| **Published** | No (until ready) |

---

## Quiz Instructions

This quiz assesses your understanding of Claude Code extensibility concepts covered in Week 12 lectures and readings.

**Instructions:**
- **Time Limit:** 15 minutes
- **Questions:** 15 questions (22 points total)
- **Attempts:** One attempt only

**Topics Covered:**
- Skills vs custom commands (.claude/skills/)
- disable-model-invocation and sharing skills
- Hooks lifecycle (PreToolUse, PostToolUse, Stop)
- Hook exit codes and deterministic enforcement
- Hooks vs CLAUDE.md (deterministic vs advisory)
- MCP (Model Context Protocol) architecture and setup
- .mcp.json for team sharing
- Tool Search auto-activation
- Custom sub-agents (.claude/agents/) and isolation
- Sub-agents vs skills
- Parallel development with worktrees (--worktree)
- Agent Teams (experimental)
- C.L.E.A.R. framework for AI code review
- AI-specific code review pitfalls
- Writer/Reviewer pattern

**Academic Integrity:** This is an individual assessment. Do not use AI assistants to answer questions. Questions are designed to test your understanding, not your ability to look up answers.

---

## Questions

### Section 1: Foundational Concepts (Q1-Q6, mix of 1-2 points)

---

#### Q1: Skills vs CLAUDE.md (1 point)
**Type:** Multiple Choice

What is the key difference between putting instructions in CLAUDE.md versus creating a skill file in `.claude/skills/`?

- A) CLAUDE.md is for JavaScript projects and skills are for Python projects
- B) CLAUDE.md is loaded automatically every session for universal project context, while skills are loaded on demand for specific task workflows
- C) Skills are more reliable than CLAUDE.md because they use a different AI model
- D) There is no difference — both are loaded every session and serve the same purpose

---

#### Q2: disable-model-invocation (1 point)
**Type:** Multiple Choice

A skill file includes `disable-model-invocation: true` in its frontmatter. What does this do?

- A) It prevents Claude Code from using any AI model when executing the skill
- B) It ensures the skill can only be triggered by typing the slash command manually — Claude will never auto-invoke it based on prompt matching
- C) It disables the skill entirely until the setting is removed
- D) It prevents other team members from using the skill

---

#### Q3: Hook Lifecycle Events (1 point)
**Type:** Multiple Choice

Claude Code hooks can run at three lifecycle points. Which of the following correctly lists all three?

- A) BeforeEdit, AfterEdit, OnSave
- B) PreToolUse, PostToolUse, Stop
- C) OnStart, OnEdit, OnCommit
- D) Init, Execute, Cleanup

---

#### Q4: Hook Exit Codes (1 point)
**Type:** Multiple Choice

In a Claude Code hook script, what does exit code 2 mean?

- A) The hook encountered a fatal error and Claude Code should terminate
- B) The hook succeeded and Claude should proceed with the next step
- C) The tool call is blocked, and the hook's stdout is sent back to Claude as feedback explaining why
- D) The hook timed out and should be retried

---

#### Q5: MCP Architecture (2 points)
**Type:** Multiple Choice

Your team wants Claude Code to directly query your PostgreSQL database during development. Using MCP, what is the correct architecture?

- A) Claude Code reads the database connection string from CLAUDE.md and connects directly to PostgreSQL
- B) Claude Code (MCP Client) sends a request to a PostgreSQL MCP Server, which queries the database and returns results through the MCP protocol
- C) You export the database to a JSON file and add it to Claude Code's context window
- D) Claude Code uses a special SQL tool that's built into its core tool set

---

#### Q6: Hooks vs CLAUDE.md (1 point)
**Type:** Multiple Choice

You want to ensure that Prettier always runs after Claude Code edits a file — no exceptions. Should you use CLAUDE.md or a hook?

- A) CLAUDE.md, because it's loaded every session and Claude will always see the instruction
- B) A hook, because hooks are deterministic (always execute) while CLAUDE.md instructions are advisory (Claude might forget)
- C) Either approach works equally well — both guarantee execution
- D) Neither — Prettier should be configured in your IDE settings instead

---

### Section 2: Applied Knowledge (Q7-Q12, mix of 1-2 points)

---

#### Q7: .mcp.json for Teams (1 point)
**Type:** Multiple Choice

Your P3 team has two members, and you want both to have the same MCP server connections. What is the correct approach?

- A) Each team member runs `claude mcp add` independently with their own settings
- B) Commit a `.mcp.json` file to the repo with shared MCP server configurations — every team member automatically gets the same connections
- C) Add all MCP server configurations to CLAUDE.md so Claude remembers them
- D) Share a screenshot of your MCP settings in the team Slack channel

---

#### Q8: Tool Search (2 points)
**Type:** Multiple Choice

You've connected 15 MCP servers to Claude Code, and you notice the context window is filling up with tool definitions. What happens automatically?

- A) Claude Code disconnects the least-used MCP servers to save context space
- B) Claude Code activates Tool Search, which indexes tool definitions separately and only loads relevant tools into context on demand
- C) Claude Code compresses all tool definitions into a single summary
- D) Nothing — you must manually remove MCP servers to free context space

---

#### Q9: Sub-agents vs Skills (2 points)
**Type:** Multiple Choice

You want to create a security reviewer that analyzes code for vulnerabilities. Should you create a skill or a sub-agent?

- A) A skill, because security review is a simple, well-defined task with fixed steps
- B) A sub-agent, because security review is open-ended analysis that benefits from an isolated context window and its own worktree
- C) Neither — security review should only be done by humans, not AI
- D) A skill, because sub-agents can only be used for writing code, not reviewing it

---

#### Q10: Worktree Parallel Pattern (2 points)
**Type:** Multiple Choice

You're unsure whether to implement caching with Redis or an in-memory LRU cache. Which parallel development pattern is most appropriate?

- A) Multiple terminals — run two agents on unrelated features
- B) Competitive solutions — run two agents implementing the same feature with different approaches, then compare and choose the better one
- C) Background orchestration — run one agent in the background while you work on something else
- D) Specialist sub-agents — use a security reviewer and a test writer in parallel

---

#### Q11: C.L.E.A.R. Framework (1 point)
**Type:** Multiple Choice

What does the "R" in the C.L.E.A.R. code review framework stand for?

- A) Readability — Is the code easy to read and understand?
- B) Refactoring — Does the code need to be refactored?
- C) Risk — Are there security issues, performance concerns, or data exposure risks?
- D) Reusability — Can the code be reused in other parts of the project?

---

#### Q12: AI Code Review Statistics (2 points)
**Type:** Multiple Choice

Research on AI-generated code has found specific security concerns. According to the ClackyAI study discussed in the slides, which of the following is true?

- A) AI-generated code has fewer security issues than human-written code because AI follows best practices
- B) AI-generated code has 1.57x more security issues overall, including 2.74x more cross-site scripting vulnerabilities
- C) AI-generated code has the same security profile as human-written code
- D) AI-generated code is only vulnerable to SQL injection, not other attack types

---

### Section 3: Scenario-Based Questions (Q13-Q15, mix of 1-2 points)

---

#### Q13: Choosing the Right Extension Point (2 points)
**Type:** Multiple Choice

Your team has three requirements: (1) enforce that all TypeScript files use semicolons, (2) provide a standardized workflow for creating new API routes, and (3) prevent any edits to the production database migration files. Which combination of extension points should you use?

- A) Put all three in CLAUDE.md — it handles everything
- B) Hook (PostToolUse → run linter), Skill (add-api-route.md workflow), Hook (PreToolUse → block migration edits with exit code 2)
- C) Three separate skills, one for each requirement
- D) Three separate sub-agents, one for each requirement

---

#### Q14: Parallel Development for P3 (2 points)
**Type:** Multiple Choice

Your P3 pair is starting Sprint 2. You have 12 issues on your scrumboard. What is the recommended approach for parallel development with Claude Code?

- A) One person runs Claude Code while the other watches and reviews the output
- B) Each teammate picks 6 issues and works through them sequentially, one at a time, in a single Claude Code session
- C) Each teammate uses `claude --worktree` to work on their assigned issues in parallel, with each worktree on its own branch, merging via PRs
- D) Both teammates share a single Claude Code session and take turns typing prompts

---

#### Q15: Hallucinated APIs (1 point)
**Type:** Multiple Choice

Claude Code generates code that calls `response.safeParseJSON()`, a method that doesn't exist on the Response object. According to the discussion in the slides, why are hallucinated APIs considered "the least dangerous" type of hallucination?

- A) Because hallucinated APIs are always caught by the AI's self-review before you see them
- B) Because they cause immediate, visible errors (the code won't compile or run), making them easy to catch
- C) Because hallucinated APIs only occur in test code, never in production code
- D) Because modern linters automatically fix hallucinated API calls

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
