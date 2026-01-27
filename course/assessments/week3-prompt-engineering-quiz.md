# Week 3: Prompt Engineering Quiz

## Quiz Settings (Configure in Canvas)

| Setting | Value |
|---------|-------|
| **Quiz Type** | Graded Quiz |
| **Points** | 15 points |
| **Time Limit** | 15 minutes |
| **Allowed Attempts** | 1 |
| **Shuffle Answers** | Yes |
| **Show One Question at a Time** | Yes |
| **Lock Questions After Answering** | Yes |
| **Due Date** | Tuesday, Week 3 at 2:59 PM PT |
| **Available From** | After Week 3 lecture |
| **Published** | No (until ready) |

---

## Quiz Instructions

This quiz assesses your understanding of prompt engineering concepts covered in Week 3 lectures and readings.

**Instructions:**
- **Time Limit:** 15 minutes
- **Questions:** 10 questions (15 points total)
- **Attempts:** One attempt only

**Topics Covered:**
- Anatomy of a good prompt (5 components)
- System vs user prompts
- Zero-shot vs few-shot prompting
- Chain-of-thought prompting
- Context windows and strategies
- Combining prompt patterns
- The iteration loop
- Structured output (JSON, XML)
- The prompting paradox
- Role prompting
- Claude best practices
- Artifacts for prototyping

**Academic Integrity:** This is an individual assessment. Do not use AI assistants to answer questions. Questions are designed to test your understanding, not your ability to look up answers.

---

## Questions

### Section 1: Concept Questions (5 questions, 1 point each)

---

#### Q1: Anatomy of a Good Prompt (1 point)
**Type:** Multiple Choice

Which of the following is NOT one of the five key prompt components discussed in class?

- A) Context
- B) Temperature
- C) Constraints
- D) Examples

---

#### Q2: System vs User Prompts (1 point)
**Type:** Multiple Choice

What is the primary purpose of a system prompt?

- A) Ask a specific question
- B) Provide few-shot examples
- C) Set persistent personality and rules across a conversation
- D) Increase context window size

---

#### Q3: Zero-Shot vs Few-Shot (1 point)
**Type:** Multiple Choice

When is few-shot prompting most beneficial over zero-shot?

- A) When you need faster responses
- B) When you want consistent formatting across outputs
- C) When the task needs no examples
- D) To reduce token count

---

#### Q4: Chain-of-Thought (1 point)
**Type:** Multiple Choice

Chain-of-thought prompting is most effective for which type of task?

- A) Simple boilerplate generation
- B) Translating text between languages
- C) Formatting output as JSON
- D) Multi-step reasoning with complex logic

---

#### Q5: Context Windows (1 point)
**Type:** Multiple Choice

What is the best strategy for maintaining quality in long conversations with an LLM?

- A) Put important information in the middle of the prompt
- B) Fill the entire context window with as much detail as possible
- C) Put important information at the beginning and break large tasks into smaller conversations
- D) Repeat every instruction verbatim throughout the conversation

---

### Section 2: Scenario Questions (3 questions, 2 points each)

---

#### Q6: Combining Patterns (2 points)
**Type:** Multiple Choice

You need to review a pull request for security vulnerabilities and want a thorough, systematic analysis with structured findings. Which prompting approach is best?

- A) Zero-shot: "Review this code for security issues"
- B) Few-shot with examples of past code reviews
- C) Role (security expert) + chain-of-thought (systematic analysis) + structured output (JSON findings)
- D) Role prompting alone as a security expert

---

#### Q7: Iteration Loop (2 points)
**Type:** Multiple Choice

You ask Claude to build a React login form. The first output is missing input validation, loading states, and error handling. What is the best next step?

- A) Start a new conversation from scratch
- B) Increase the temperature setting
- C) Accept the output and manually add the missing features
- D) Identify the specific gaps and refine the prompt with targeted constraints for each

---

#### Q8: System Prompts in Practice (2 points)
**Type:** Multiple Choice

Your team wants every AI-generated function to include JSDoc comments, use async/await, and follow specific naming conventions. Where should these rules be defined?

- A) In each individual prompt every time you generate code
- B) In a system prompt or .cursorrules configuration file
- C) In the project README.md
- D) Only in code review comments after generation

---

### Section 3: Applied Questions (2 questions, 2 points each)

---

#### Q9: Prompt Diagnosis (2 points)
**Type:** Multiple Choice

A developer writes the prompt `"Make a function that handles data"` and gets unhelpful output. Which prompt component is most critically lacking?

- A) Examples
- B) Format
- C) Task — "handles data" is too vague to act on
- D) Constraints

---

#### Q10: Structured Output (2 points)
**Type:** Multiple Choice

You're building an automated pipeline that parses Claude's output programmatically. The data has deeply nested categories. What is the best format to request?

- A) Markdown tables
- B) Plain text with delimiters
- C) JSON for parseable structure, with XML tags for nested prompt instructions
- D) YAML only

---

## Additional Question Pool (for randomization)

### Additional Concept Questions

#### Q11: Prompting Paradox (1 point)
**Type:** Multiple Choice

Why does knowing programming make you a better prompt engineer?

- A) LLMs only accept code as input
- B) You need to know what to ask for, recognize good vs bad output, and know when the AI is wrong
- C) Prompt engineering requires understanding neural network architecture
- D) Prompts need to be compiled before sending

---

#### Q12: Role Prompting (1 point)
**Type:** Multiple Choice

You want the AI to write thorough API documentation. Which role would produce the best results?

- A) Senior engineer doing code review
- B) Technical writer specializing in developer documentation
- C) Project manager
- D) QA engineer

---

#### Q13: Claude Best Practices (1 point)
**Type:** Multiple Choice

According to Claude best practices, why should you explain the "why" behind your request?

- A) Longer prompts always produce better results
- B) Claude refuses to respond without a stated reason
- C) Providing purpose and context helps Claude generate more relevant output
- D) It prevents hallucinations entirely

---

### Additional Scenario Questions

#### Q14: Artifacts Use Case (2 points)
**Type:** Multiple Choice

A startup founder needs an investor demo tomorrow but has no code yet. What is the best approach using Claude?

- A) Write a full production backend overnight
- B) Use Artifacts to create an interactive prototype, iterating through conversation
- C) Generate a PowerPoint presentation
- D) Write detailed technical specifications

---

#### Q15: Iteration Expectations (2 points)
**Type:** Multiple Choice

You're building a complex TypeScript validation library with Claude. The first output misses edge cases, has incorrect types, and lacks error messages. What is the correct interpretation and approach?

- A) Start over with a different model
- B) This is normal — expect 2-5 iterations and refine one area at a time
- C) AI can't handle this level of complexity
- D) Submit as-is and fix issues during code review

---

## Canvas Import Instructions

1. **Create New Quiz** in Canvas under "Quizzes"
2. **Configure Settings** as shown in the Settings table above
3. **Create Question Groups** for randomization:
   - Group 1: Concept Questions (select 5 from Q1-Q5 + Q11-Q13)
   - Group 2: Scenario Questions (select 3 from Q6-Q8 + Q14-Q15)
   - Group 3: Applied Questions (Q9 + Q10 required)
4. **Add Questions** using the content above
5. **Set Correct Answers** (see answer key - instructor only)
6. **Save and Preview** before publishing

## Anti-Cheating Measures Implemented

1. **Time pressure** - 15 minutes for 10 questions limits research time
2. **Question pools** - Random selection from larger pool
3. **Answer shuffling** - Different order for each student
4. **Scenario-based** - Requires understanding, not just recall
5. **Single attempt** - No retakes
6. **Locked questions** - Can't go back and change answers
