# Week 3: Prompt Engineering Quiz

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

This quiz assesses your understanding of prompt engineering concepts covered in Week 3 lectures and readings.

**Instructions:**
- **Time Limit:** 15 minutes
- **Questions:** 15 questions (22 points total)
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

- A) Background clue given
- B) Temperature setting
- C) Stated constraints
- D) Worked example set

---

#### Q2: System vs User Prompts (1 point)
**Type:** Multiple Choice

What is the primary purpose of a system prompt?

- A) Ask one question, briefly overriding system rules this turn
- B) Provide few-shot examples, since prompts cache for reuse
- C) Set persistent personality and rules across a conversation
- D) Increase context window size, since prompts sit outside budget

---

#### Q3: Zero-Shot vs Few-Shot (1 point)
**Type:** Multiple Choice

When is few-shot prompting most beneficial over zero-shot?

- A) When you need fast replies, fewer tokens used
- B) When you want consistent formatting across outputs
- C) When the task needs no examples, format is inferred
- D) To reduce token count, since short prompts sample faster

---

#### Q4: Chain-of-Thought (1 point)
**Type:** Multiple Choice

Chain-of-thought prompting is most effective for which type of task?

- A) Boilerplate code, skipping reasoning steps
- B) Translating text between languages
- C) Formatting output as JSON, skips reasoning
- D) Multi-step reasoning with complex logic

---

#### Q5: Context Windows (1 point)
**Type:** Multiple Choice

What is the best strategy for maintaining quality in long conversations with an LLM?

- A) Put important information in the middle, since models weight the center of the window most
- B) Fill the entire context window with as much detail, since more tokens raise accuracy
- C) Put important information at the beginning and break large tasks into smaller conversations
- D) Repeat every instruction verbatim, since repetition resets the model's attention span

---

### Section 2: Scenario Questions (3 questions, 2 points each)

---

#### Q6: Combining Patterns (2 points)
**Type:** Multiple Choice

You need to review a pull request for security vulnerabilities and want a thorough, systematic analysis with structured findings. Which prompting approach is best?

- A) Zero-shot: "Review this code for security issues", since one instruction covers every vulnerability class
- B) Few-shot with examples of past code reviews, since prior examples guarantee the same bugs recur
- C) Role (security expert) + chain-of-thought (systematic analysis) + structured output (JSON findings)
- D) Role prompting alone as a security expert, since the persona already implies a systematic method

---

#### Q7: Iteration Loop (2 points)
**Type:** Multiple Choice

You ask Claude to build a React login form. The first output is missing input validation, loading states, and error handling. What is the best next step?

- A) Start a new conversation from scratch, since prior context biases every reply
- B) Increase the temperature setting, since more randomness fixes missing validation logic
- C) Accept the output and manually patch the gaps yourself, since re-prompting rarely helps
- D) Identify the specific gaps and refine the prompt with targeted constraints for each

---

#### Q8: System Prompts in Practice (2 points)
**Type:** Multiple Choice

Your team wants every AI-generated function to include JSDoc comments, use async/await, and follow specific naming conventions. Where should these rules be defined?

- A) In each individual prompt every time you generate code
- B) In a system prompt or .cursorrules configuration file
- C) In the project README.md, read before replying
- D) In code review, since that is the enforceable step

---

### Section 3: Applied Questions (2 questions, 2 points each)

---

#### Q9: Prompt Diagnosis (2 points)
**Type:** Multiple Choice

A developer writes the prompt `"Make a function that handles data"` and gets unhelpful output. Which prompt component is most critically lacking?

- A) Task
- B) Format
- C) Examples
- D) Constraints

---

#### Q10: Structured Output (2 points)
**Type:** Multiple Choice

You're building an automated pipeline that parses Claude's output programmatically. The data has deeply nested categories. What is the best format to request?

- A) JSON, with XML tags for nested prompt instructions
- B) Plain text with delimiters, since separators parse faster
- C) Markdown tables, since rows nest the same as JSON
- D) YAML, since indentation validates faster than braces

---

## Additional Question Pool

### Additional Concept Questions

#### Q11: Prompting Paradox (1 point)
**Type:** Multiple Choice

Why does knowing programming make you a better prompt engineer?

- A) LLMs accept code as input, so natural-language prompts are silently tokenized as syntax
- B) You need to know what to ask for, recognize good vs bad output, and know when the AI is wrong
- C) Prompt engineering requires understanding neural network architecture and hand-tuned weights
- D) Prompts need to be compiled before sending, since Claude accepts pre-tokenized machine code

---

#### Q12: Role Prompting (1 point)
**Type:** Multiple Choice

You want the AI to write thorough API documentation. Which role would produce the best results?

- A) Technical writer specializing in developer documentation
- B) Senior engineer doing review, focused on clear explanations
- C) Project manager, since PMs write the clearest specifications
- D) QA engineer, since testers document more thoroughly

---

#### Q13: Claude Best Practices (1 point)
**Type:** Multiple Choice

According to Claude best practices, why should you explain the "why" behind your request?

- A) Longer prompts add detail Claude weighs more heavily in its response
- B) Claude refuses to respond without a stated reason for the request
- C) Providing purpose and context helps Claude generate more relevant output
- D) It increases the maximum number of tokens Claude can output in one turn

---

### Additional Scenario Questions

#### Q14: Artifacts Use Case (2 points)
**Type:** Multiple Choice

A startup founder needs an investor demo tomorrow but has no code yet. What is the best approach using Claude?

- A) Write a full production backend overnight, since a real deploy beats any prototype
- B) Use Artifacts to create an interactive prototype, iterating through conversation
- C) Generate a PowerPoint presentation, since slides demo interactivity better
- D) Write detailed technical specifications, since investors read specs faster

---

#### Q15: Iteration Expectations (2 points)
**Type:** Multiple Choice

You're building a complex TypeScript validation library with Claude. The first output misses edge cases, has incorrect types, and lacks error messages. What is the correct interpretation and approach?

- A) Start over with a different model, since mismatches compound each round
- B) This is normal — expect 2-5 iterations and refine one area at a time
- C) AI can't handle this level of complexity, types exceed context
- D) Submit as-is and fix issues later, since reviewers catch type errors reliably

---

## Canvas Import Instructions

1. **Create New Quiz** in Canvas under "Quizzes"
2. **Configure Settings** as shown in the Settings table above
3. **Add Questions** using the content above
4. **Set Correct Answers** (see answer key - instructor only)
5. **Save and Preview** before publishing

## Anti-Cheating Measures Implemented

1. **Time pressure** - 15 minutes for 15 questions limits research time
2. **Answer shuffling** - Different order for each student
3. **Scenario-based** - Requires understanding, not just recall
4. **Single attempt** - No retakes
5. **Locked questions** - Can't go back and change answers
