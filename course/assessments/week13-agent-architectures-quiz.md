# Week 13: Agent Architectures & Security Quiz

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
| **Due Date** | Tuesday, Week 13 at 2:59 PM PT |
| **Available From** | After Week 13 lecture |
| **Published** | No (until ready) |

---

## Quiz Instructions

This quiz assesses your understanding of agent architectures and AI code security covered in Week 13 lectures and readings.

**Instructions:**
- **Time Limit:** 15 minutes
- **Questions:** 15 questions (22 points total)
- **Attempts:** One attempt only

**Topics Covered:**
- Agent vs workflow distinction
- The augmented LLM as building block
- Anthropic's 6 agent patterns (chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer, autonomous)
- Claude Agent SDK (query(), hooks, sessions, permissions)
- Multi-agent coordination and subagents
- Agent safety and sandboxing
- Veracode/Apiiro/Aikido security research data
- The 8-gate security pipeline
- Slopsquatting as a novel threat
- OWASP Top 10 in AI-generated code
- Ethics, IP, and copyright (U.S. Copyright Office, Doe v. GitHub)
- Professional responsibility (ACM Code of Ethics)

**Academic Integrity:** This is an individual assessment. Do not use AI assistants to answer questions. Questions are designed to test your understanding, not your ability to look up answers.

---

## Questions

### Section 1: Foundational Concepts (Q1-Q6, mix of 1-2 points)

---

#### Q1: Agent vs Workflow (1 point)
**Type:** Multiple Choice

What is the key difference between a "workflow" and an "agent" in the context of AI architectures?

- A) Workflows use LLMs while agents use traditional algorithms
- B) In workflows, the developer predefines the control flow; in agents, the model dynamically determines its own control flow based on results
- C) Agents are faster than workflows because they skip planning steps
- D) Workflows can only handle one task at a time, while agents handle multiple tasks simultaneously

---

#### Q2: The Augmented LLM (1 point)
**Type:** Multiple Choice

What is the "augmented LLM" that serves as the building block for all agent architectures?

- A) A larger version of a standard LLM with more parameters
- B) An LLM enhanced with tools, retrieval, and memory capabilities
- C) An LLM that has been fine-tuned on your specific codebase
- D) Two LLMs working together to check each other's outputs

---

#### Q3: Prompt Chaining Pattern (1 point)
**Type:** Multiple Choice

In the prompt chaining pattern, what role do "quality gates" play between steps?

- A) They speed up processing by caching intermediate results
- B) They check the output of each step before passing it to the next, catching errors early in the chain
- C) They route the task to different specialized models at each step
- D) They compress the output to fit within the context window of the next step

---

#### Q4: Routing Pattern (1 point)
**Type:** Multiple Choice

When should you use the routing pattern for an agent architecture?

- A) When every input requires the same processing steps in the same order
- B) When you need to run the same task multiple times for consensus
- C) When inputs vary widely and benefit from being classified and dispatched to specialized handlers
- D) When you need an agent to run autonomously for extended periods

---

#### Q5: Veracode Security Data (2 points)
**Type:** Multiple Choice

According to the Veracode 2025 study on AI-generated code security, which statement is true?

- A) Larger, more capable models generate significantly more secure code than smaller models
- B) 45% of AI-generated code contains OWASP Top 10 vulnerabilities, and security has NOT improved even as models get better at functional code
- C) AI-generated code is more secure than human-written code because AI avoids common mistakes
- D) Only 5% of AI-generated code has security vulnerabilities, mostly in obscure edge cases

---

#### Q6: Slopsquatting (1 point)
**Type:** Multiple Choice

What is "slopsquatting"?

- A) Writing sloppy code quickly using AI tools without proper testing
- B) Attackers registering package names that AI models hallucinate, so developers who follow AI advice install malware
- C) A technique where AI models reuse code from similar but incorrect Stack Overflow answers
- D) The practice of copying AI-generated code between projects without reviewing it

---

### Section 2: Applied Knowledge (Q7-Q12, mix of 1-2 points)

---

#### Q7: Orchestrator-Workers vs Parallelization (2 points)
**Type:** Multiple Choice

What is the key difference between the orchestrator-workers pattern and the parallelization pattern?

- A) Orchestrator-workers is faster because it uses more powerful models
- B) In parallelization, the subtasks are predefined; in orchestrator-workers, the orchestrator dynamically decides what subtasks to create at runtime
- C) Parallelization uses multiple LLMs while orchestrator-workers uses only one
- D) Orchestrator-workers can only handle two subtasks at a time, while parallelization handles unlimited subtasks

---

#### Q8: Evaluator-Optimizer Pattern (2 points)
**Type:** Multiple Choice

A team wants to use AI to generate API documentation that must meet strict quality standards. Which agent pattern is most appropriate?

- A) Routing -- classify the API endpoints and route to specialized documenters
- B) Prompt chaining -- generate docs in a fixed sequence of steps
- C) Evaluator-optimizer -- generate documentation, critique it against quality criteria, and refine in a loop until the threshold is met
- D) Autonomous agent -- let the agent explore the codebase and write docs on its own

---

#### Q9: Claude Agent SDK (1 point)
**Type:** Multiple Choice

What is the primary difference between Claude Code (CLI) and the Claude Agent SDK?

- A) Claude Code uses Claude Opus while the SDK only supports Claude Haiku
- B) Claude Code is an interactive development tool for humans; the Agent SDK is a programmatic building block for embedding agents in applications
- C) The SDK has more built-in tools than Claude Code
- D) Claude Code can only edit one file at a time while the SDK handles multiple files

---

#### Q10: The 8-Gate Security Pipeline (2 points)
**Type:** Multiple Choice

Your team's CI/CD pipeline for a project using AI-generated code includes `npm audit` and Dependabot. Which security gates does this cover, and what critical gates are you still missing?

- A) You have Gate 2 (dependency scanning); you're missing secrets detection, SAST, DAST, container scanning, license compliance, security acceptance criteria, and SBOM
- B) You have all 8 gates covered -- npm audit and Dependabot handle everything
- C) You have Gates 1 and 2; you're only missing DAST and container scanning
- D) You have Gate 3 (SAST); you're missing dependency scanning and secrets detection

---

#### Q11: Agent Safety (1 point)
**Type:** Multiple Choice

Which combination of safety strategies provides the strongest protection when running an autonomous agent?

- A) Using a powerful model and trusting its judgment
- B) Container isolation + tool allowlists + hooks + human-in-the-loop for destructive actions
- C) Running the agent only during business hours when developers can monitor it
- D) Setting a high temperature to increase creativity and reduce predictable errors

---

#### Q12: SDK Hooks (2 points)
**Type:** Multiple Choice

In the Claude Agent SDK, what do hooks like `pre_tool_use` and `post_tool_use` allow you to do?

- A) Speed up tool execution by pre-loading data before the agent needs it
- B) Intercept the agentic loop to validate, log, or block tool calls -- providing guardrails without removing the agent's autonomy
- C) Replace the agent's built-in tools with custom implementations
- D) Record the agent's conversations for training data to improve future models

---

### Section 3: Scenario-Based Questions (Q13-Q15, mix of 1-2 points)

---

#### Q13: Copyright and Liability (2 points)
**Type:** Multiple Choice

You use AI to generate a REST API for your P3 project. A teammate later discovers that a function in the generated code is nearly identical to GPL-licensed code from an open-source project. What is the legal and ethical situation?

- A) No issue -- AI-generated code is not subject to copyright because the U.S. Copyright Office says AI outputs aren't copyrightable
- B) Your team is potentially liable for GPL violation -- you must either relicense your project under GPL or rewrite the function. "The AI wrote it" is not a legal defense.
- C) Only the AI company (Anthropic) is liable, not your team
- D) GPL only applies to commercial software, so student projects are exempt

---

#### Q14: Choosing an Agent Pattern (2 points)
**Type:** Multiple Choice

You're building a code review bot that should: (1) check for style violations, (2) check for security issues, and (3) check for test coverage -- all independently. The results should be combined into a single review summary. Which agent pattern best fits this use case?

- A) Prompt chaining -- run the checks sequentially, each building on the previous
- B) Routing -- classify the code and send it to whichever check is most relevant
- C) Parallelization (sectioning) -- run all three checks simultaneously on independent subtasks, then aggregate the results
- D) Autonomous agent -- let the agent decide which checks to run based on the code

---

#### Q15: Professional Responsibility (1 point)
**Type:** Multiple Choice

The ACM Code of Ethics states: "Accept full responsibility for their own work." How does this apply when you ship AI-generated code?

- A) It doesn't apply -- AI-generated code is the AI company's responsibility, not the developer's
- B) You are 100% accountable for what you ship, including AI-generated code. You must review every line, and "the AI wrote it" is not a defense.
- C) Responsibility is shared 50/50 between the developer and the AI provider
- D) You're only responsible if you didn't use the AI tool's recommended settings

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
