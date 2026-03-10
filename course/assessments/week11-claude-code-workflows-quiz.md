# Week 11: Claude Code Workflows Quiz

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
| **Due Date** | Tuesday, Week 11 at 2:59 PM PT |
| **Available From** | After Week 11 lecture |
| **Published** | No (until ready) |

---

## Quiz Instructions

This quiz assesses your understanding of Claude Code workflows and development practices covered in Week 11 lectures and readings.

**Instructions:**
- **Time Limit:** 15 minutes
- **Questions:** 15 questions (22 points total)
- **Attempts:** One attempt only

**Topics Covered:**
- Explore → Plan → Implement → Commit workflow
- TDD with Claude Code (red-green-refactor with AI)
- Property-based testing and mutation testing
- Git & GitHub integration through Claude Code
- CI/CD via GitHub Actions and `claude-code-action`
- Hooks (PreToolUse, PostToolUse) and exit codes
- Non-interactive mode (`claude -p`) and scripting
- LLM-as-Judge evaluation systems and biases

**Academic Integrity:** This is an individual assessment. Do not use AI assistants to answer questions. Questions are designed to test your understanding, not your ability to look up answers.

---

## Questions

### Section 1: Foundational Concepts (Q1-Q6, mix of 1-2 points)

---

#### Q1: The Four-Phase Workflow (1 point)
**Type:** Multiple Choice

Anthropic recommends a four-phase development pattern for Claude Code. What are the four phases in order?

- A) Design → Code → Test → Deploy
- B) Explore → Plan → Implement → Commit
- C) Read → Write → Review → Merge
- D) Prompt → Generate → Evaluate → Iterate

---

#### Q2: Why TDD with AI (1 point)
**Type:** Multiple Choice

Anthropic calls TDD "the single highest-leverage thing" when coding with AI. Why is TDD so important for AI-assisted development?

- A) Because AI models can only generate code that follows test-driven patterns
- B) Because tests serve as a verifiable specification — you can run them to confirm AI-generated code is correct, rather than just reading and hoping
- C) Because TDD makes AI generate code 50% faster by giving it clear templates
- D) Because without TDD, Claude Code refuses to generate code for production use

---

#### Q3: Hook Exit Codes (1 point)
**Type:** Multiple Choice

Claude Code hooks use exit codes to control behavior. What does exit code 2 mean?

- A) Continue execution normally (same as exit code 0)
- B) Retry the tool call with modified parameters
- C) Block the action and display the hook's output as a message to Claude
- D) Terminate the entire Claude Code session immediately

---

#### Q4: Non-Interactive Mode (1 point)
**Type:** Multiple Choice

What does the `claude -p` flag do?

- A) Enters "plan mode" where Claude Code only creates plans without executing them
- B) Runs Claude Code in non-interactive mode — accepts a prompt, produces output, and exits without an interactive session
- C) Enables "production mode" which uses a more powerful model for better results
- D) Activates "permission mode" where every tool call requires explicit approval

---

#### Q5: LLM-as-Judge Agreement (1 point)
**Type:** Multiple Choice

Research on LLM-as-Judge evaluation systems shows what level of agreement with human judgment?

- A) 95% agreement, significantly outperforming human-human agreement
- B) 85% agreement, which is higher than human-human agreement at 81%
- C) 70% agreement, which is slightly below human-human agreement at 75%
- D) 50% agreement, making LLM judges unreliable for most tasks

---

#### Q6: Property-Based Testing (1 point)
**Type:** Multiple Choice

What distinguishes property-based testing (e.g., with fast-check) from traditional example-based testing?

- A) Property-based tests are faster to run because they skip edge cases
- B) Property-based tests generate hundreds of random inputs to verify that properties hold, rather than testing specific hand-chosen examples
- C) Property-based tests only work with functional programming languages
- D) Property-based tests replace the need for unit tests entirely

---

### Section 2: Applied Knowledge (Q7-Q12, mix of 1-2 points)

---

#### Q7: The Explore Phase (2 points)
**Type:** Multiple Choice

In the Explore → Plan → Implement → Commit workflow, what is the purpose of the Explore phase?

- A) To generate a complete implementation plan with file-by-file changes
- B) To understand the problem space and existing code before making any changes — building a mental model of the codebase
- C) To run the test suite and identify which tests are currently failing
- D) To create a new branch and set up the development environment

---

#### Q8: AI-TDD Role Division (2 points)
**Type:** Multiple Choice

In the recommended AI-TDD workflow, how should work be divided between the human developer and Claude Code?

- A) Claude Code writes both the tests and the implementation; the human only reviews
- B) The human writes the failing tests (the specification), commits them, then Claude Code implements the code to make them pass
- C) Claude Code writes the tests first, then the human implements the code manually
- D) The human writes pseudocode, and Claude Code converts it to both tests and implementation simultaneously

---

#### Q9: Hooks vs. CLAUDE.md (2 points)
**Type:** Multiple Choice

When should you use a hook instead of a CLAUDE.md instruction to enforce a rule?

- A) Hooks are for formatting rules; CLAUDE.md is for security rules
- B) Use hooks when the rule is a preference that Claude can apply judgment to; use CLAUDE.md for hard rules
- C) Use hooks when the rule must be enforced deterministically every time (100% reliability); use CLAUDE.md for advisory conventions that benefit from AI judgment
- D) They are interchangeable — hooks and CLAUDE.md rules have the same enforcement level

---

#### Q10: claude-code-action in CI (2 points)
**Type:** Multiple Choice

What does `anthropics/claude-code-action@v1` do when added to a GitHub Actions workflow?

- A) It automatically fixes all code quality issues and pushes the fixes to the PR branch
- B) It runs Claude Code in the CI pipeline to review PRs, analyze code changes, and post comments on specific lines
- C) It blocks PRs from merging until Claude Code approves the changes
- D) It generates a complete test suite for any new code added in the PR

---

#### Q11: --allowedTools in Automation (1 point)
**Type:** Multiple Choice

Why should you use `--allowedTools` when running `claude -p` in CI pipelines or automated scripts?

- A) To make Claude Code run faster by limiting the tools it considers
- B) To scope permissions so Claude cannot modify files or run commands in unattended contexts — for example, restricting to read-only tools for review tasks
- C) To select which programming language Claude Code should use for code generation
- D) The `--allowedTools` flag is optional and has no practical benefit in CI

---

#### Q12: Mutation Testing Purpose (1 point)
**Type:** Multiple Choice

What does mutation testing (e.g., with Stryker) evaluate?

- A) Whether the code compiles without syntax errors after random changes
- B) The quality of your test suite — by mutating the source code and checking if tests catch the mutations
- C) How fast your code runs under different input mutations
- D) Whether AI-generated code introduces security vulnerabilities

---

### Section 3: Scenario-Based Questions (Q13-Q15, mix of 1-2 points)

---

#### Q13: Complex Feature Development (2 points)
**Type:** Multiple Choice

You need to add a complex feature that involves changes across 8 files in your P3 project. The feature requires understanding the existing auth system, designing a new permission model, implementing it, and shipping it. What is the best approach using Claude Code?

- A) Give Claude Code a single detailed prompt describing the entire feature and let it implement everything at once
- B) Use the Explore → Plan → Implement → Commit workflow: explore the auth system first (save findings to a file), /clear, plan the permission model (save plan to a file), /clear, implement from the plan, then commit
- C) Ask Claude Code to generate all the code, then manually review and edit every file yourself
- D) Split the feature into 8 separate Claude Code sessions, one per file, and implement each independently

---

#### Q14: Evaluating AI Code Review Quality (2 points)
**Type:** Multiple Choice

Your team wants to use LLM-as-Judge to automatically score the quality of Claude Code's PR review comments. You've noticed the judge tends to rate longer comments higher regardless of their accuracy. Which combination of mitigation strategies would best address this issue?

- A) Use a larger model as the judge and increase the temperature for more varied scoring
- B) Normalize scores for comment length, use binary sub-questions (e.g., "Is the comment factually correct? yes/no"), and validate against a set of 30-50 human-labeled examples
- C) Switch from pointwise scoring to pairwise comparison, which eliminates all biases
- D) Have the judge explain its reasoning after scoring, which automatically corrects for verbosity bias

---

#### Q15: Hook Design (1 point)
**Type:** Multiple Choice

You want to ensure that every file Claude Code edits in your project is automatically formatted with Prettier. Which hook type and configuration would accomplish this?

- A) A PreToolUse hook on Edit and Write that runs Prettier before Claude makes the edit
- B) A PostToolUse hook on Edit and Write that runs Prettier on the file after Claude finishes editing it
- C) A Stop hook that runs Prettier on all changed files before Claude's final response
- D) A CLAUDE.md instruction telling Claude to always run Prettier after editing files

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
