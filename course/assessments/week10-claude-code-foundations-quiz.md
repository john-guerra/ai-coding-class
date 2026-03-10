# Week 10: Claude Code Foundations Quiz

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
| **Due Date** | Tuesday, Week 10 at 2:59 PM PT |
| **Available From** | After Week 10 lecture |
| **Published** | No (until ready) |

---

## Quiz Instructions

This quiz assesses your understanding of Claude Code foundations covered in Week 10 lectures and readings.

**Instructions:**
- **Time Limit:** 15 minutes
- **Questions:** 15 questions (22 points total)
- **Attempts:** One attempt only

**Topics Covered:**
- The agentic loop and how Claude Code works
- Built-in tools (Read, Edit, Write, Bash, Grep, Glob)
- How Claude Code differs from IDE chat tools (Antigravity/Copilot)
- CLAUDE.md purpose, content, hierarchy, and @imports
- Auto-memory and the /init command
- Tool use system and permission modes
- Context management (/clear, /compact, checkpoints)
- Session continuity (--continue, --resume)
- Thinking and plan mode

**Academic Integrity:** This is an individual assessment. Do not use AI assistants to answer questions. Questions are designed to test your understanding, not your ability to look up answers.

---

## Questions

### Section 1: Foundational Concepts (Q1-Q6, mix of 1-2 points)

---

#### Q1: The Agentic Loop (1 point)
**Type:** Multiple Choice

What is the "agentic loop" that powers Claude Code?

- A) A feedback loop where the user repeatedly corrects the AI's mistakes until the code is right
- B) A cycle where Claude reads context, decides on an action (tool call or response), executes it, observes the result, and repeats until the task is complete
- C) A loop that continuously monitors your codebase for errors and automatically fixes them in the background
- D) A training loop where Claude learns from your codebase to improve its suggestions over time

---

#### Q2: Built-in Tools (1 point)
**Type:** Multiple Choice

Claude Code has built-in tools it uses autonomously to accomplish tasks. Which of the following is NOT a built-in Claude Code tool?

- A) Bash — executes shell commands
- B) Read — reads file contents
- C) Deploy — pushes code to production servers
- D) Grep — searches file contents with regex patterns

---

#### Q3: Claude Code vs. IDE Chat (1 point)
**Type:** Multiple Choice

What is the key difference between Claude Code and IDE-integrated AI chat tools like Antigravity or GitHub Copilot?

- A) Claude Code uses a more advanced language model than IDE chat tools
- B) Claude Code runs in the terminal and autonomously executes multi-step tasks using tools, while IDE chat tools primarily suggest code within the editor context
- C) Claude Code only works with Python, while IDE chat tools support all languages
- D) Claude Code requires an internet connection, while IDE chat tools work offline

---

#### Q4: What Goes in CLAUDE.md (1 point)
**Type:** Multiple Choice

Which of the following best represents what should go in a project's CLAUDE.md file?

- A) A complete log of every conversation you've had with Claude Code on this project
- B) Build/test/lint commands, code style conventions, project architecture, and warnings about common pitfalls
- C) A copy of your README.md so Claude has access to the project description
- D) API keys and environment variables so Claude can run the project

---

#### Q5: CLAUDE.md Hierarchy (1 point)
**Type:** Multiple Choice

CLAUDE.md files can exist at multiple levels: the repo root, subdirectories, and the user's home directory (~/.claude/CLAUDE.md). When instructions conflict, which takes precedence?

- A) The home directory file always wins because it represents the user's global preferences
- B) The repo root file always wins because it represents the project's canonical rules
- C) More specific (closer to the working context) takes precedence — a subdirectory CLAUDE.md overrides the root, which overrides the home directory
- D) Claude Code merges all instructions and uses AI judgment to resolve conflicts

---

#### Q6: @imports in CLAUDE.md (1 point)
**Type:** Multiple Choice

What do `@imports` in CLAUDE.md allow you to do?

- A) Import npm packages that Claude Code should use when generating code
- B) Pull in content from other files (like docs, conventions, or shared rules) so CLAUDE.md stays concise while still providing rich context
- C) Import conversation history from previous Claude Code sessions
- D) Link to external URLs that Claude Code will fetch and read at runtime

---

### Section 2: Applied Knowledge (Q7-Q12, mix of 1-2 points)

---

#### Q7: The /init Command (2 points)
**Type:** Multiple Choice

You've just cloned a new repository and want to set up Claude Code for it. What does running `/init` do?

- A) It installs Claude Code's dependencies and configures your terminal environment
- B) It scans the project structure, detects the tech stack, and generates an initial CLAUDE.md with build commands, conventions, and project context
- C) It creates a .git directory and initializes version control for the project
- D) It runs the project's test suite to verify everything is working before you start coding

---

#### Q8: Permission Model (2 points)
**Type:** Multiple Choice

Claude Code has a permission system that controls what actions the agent can take. What are the three permission modes?

- A) Read-only, Write-only, and Admin
- B) Suggest, Apply, and Force
- C) Default (ask for approval), Auto-accept edits (yolo for file changes), and Full yolo (no confirmations)
- D) Local, Remote, and Hybrid

---

#### Q9: What /compact Does (1 point)
**Type:** Multiple Choice

You've been working with Claude Code on a long task and notice it's starting to lose track of earlier instructions. What does the `/compact` command do?

- A) It deletes all files Claude Code created during the session
- B) It summarizes the current conversation into a condensed form, freeing up context window space while preserving key information
- C) It compresses your project files to save disk space
- D) It switches Claude Code to a smaller, faster model for simple tasks

---

#### Q10: /clear vs. /compact (2 points)
**Type:** Multiple Choice

You're midway through a complex refactoring task with Claude Code. When should you use `/compact` vs. `/clear`?

- A) Use `/compact` when switching to a completely new task; use `/clear` when you want to continue the same task with more context space
- B) Use `/compact` to preserve context while freeing space for the current task; use `/clear` to start a completely fresh conversation with no prior context
- C) They do the same thing — both reset the conversation history
- D) Use `/clear` for small projects and `/compact` for large projects

---

#### Q11: --continue vs. --resume (1 point)
**Type:** Multiple Choice

You closed your terminal and want to pick up where you left off with Claude Code. What is the difference between `--continue` and `--resume`?

- A) `--continue` resumes the most recent conversation in the current project; `--resume` shows a list of recent conversations across all projects to choose from
- B) `--continue` starts a new conversation with the same CLAUDE.md; `--resume` replays the exact commands from the previous session
- C) They are identical — both resume the last conversation
- D) `--continue` works only for conversations less than 1 hour old; `--resume` works for any past conversation

---

#### Q12: Plan Mode (2 points)
**Type:** Multiple Choice

When should you use Claude Code's plan mode (shift+tab to toggle)?

- A) Only when Claude Code is making errors and you need to slow it down
- B) When you want Claude to analyze, research, and outline a plan before making any code changes — especially useful for complex or unfamiliar tasks
- C) When you want Claude Code to generate code as fast as possible without explanations
- D) Only for documentation tasks where no code changes are needed

---

### Section 3: Scenario-Based Questions (Q13-Q15, mix of 1-2 points)

---

#### Q13: Context Getting Long (2 points)
**Type:** Multiple Choice

You've been working with Claude Code for 30 minutes on a multi-file feature. Claude starts repeating itself and seems to forget instructions you gave earlier. The context window is nearly full. What should you do?

- A) Close the terminal and start a completely new session, re-explaining everything from scratch
- B) Use `/compact` to summarize the conversation so far, then optionally give a brief reminder of your current goal to continue working with freed-up context space
- C) Keep going — Claude Code automatically manages its context and will recover on its own
- D) Copy your entire conversation into CLAUDE.md so it's always available

---

#### Q14: New Project Setup (2 points)
**Type:** Multiple Choice

You're starting a brand new project for P3. You've created the repo, initialized the codebase, and installed dependencies. What is the best first step for working with Claude Code on this project?

- A) Start coding immediately — Claude Code will figure out the project from the files
- B) Run `/init` to generate a CLAUDE.md, then review and refine it with your project's specific conventions, architecture decisions, and build commands
- C) Write a detailed prompt explaining your entire project every time you start a new conversation
- D) Copy a CLAUDE.md from a different project and use it as-is

---

#### Q15: Extended Thinking (1 point)
**Type:** Multiple Choice

Claude Code supports extended thinking, where Claude takes more time to reason before responding. When does extended thinking help the most?

- A) For simple tasks like renaming a variable or fixing a typo
- B) For complex tasks requiring multi-step reasoning, architectural decisions, or debugging subtle issues across multiple files
- C) Only when you explicitly type "think harder" in your prompt
- D) Extended thinking is always on by default and cannot be controlled

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
