# Week 2: LLM Fundamentals Quiz

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

This quiz assesses your understanding of LLM fundamentals covered in Week 2 lectures and readings.

**Instructions:**
- **Time Limit:** 15 minutes
- **Questions:** 15 questions (22 points total)
- **Attempts:** One attempt only
- **Tools Required:** For question 9, you will need to use an external tool (Tiktokenizer)

**Topics Covered:**
- Software 1.0/2.0/3.0 (Karpathy's framework)
- LLM training pipeline (Pre-training → Fine-tuning → RLHF)
- Temperature and sampling parameters
- Context windows and the "lost in the middle" phenomenon
- Tokenization and its impact on code
- Hallucinations and when to trust AI
- Embeddings and RAG concepts

**Academic Integrity:** This is an individual assessment. Do not use AI assistants to answer questions. Questions are designed to test your understanding, not your ability to look up answers.

---

## Questions

### Section 1: Concept Questions (5 questions, 1 point each)

---

#### Q1: Software Evolution (1 point)
**Type:** Multiple Choice

According to Karpathy's framework, what distinguishes Software 3.0 from Software 2.0?

- A) Software 3.0 runs on substantially more model parameters
- B) Software 3.0 is programmed via natural language prompts
- C) Software 3.0 requires far less curated training data
- D) Software 3.0 applies to source code but never to prose

---

#### Q2: LLM Training Pipeline (1 point)
**Type:** Multiple Choice

What is the correct order of LLM training stages?

- A) RLHF → Fine-tuning → Pre-training
- B) Fine-tuning → Pre-training → RLHF
- C) Pre-training → Fine-tuning → RLHF
- D) Pre-training → RLHF → Fine-tuning

---

#### Q3: Temperature Parameter (1 point)
**Type:** Multiple Choice

You're using an LLM to fix a bug in production code. What temperature setting would be most appropriate?

- A) Temperature 0-0.2 (deterministic)
- B) Temperature 0.5-0.7 (balanced)
- C) Temperature 0.8-1.0 (creative)
- D) Temperature doesn't affect code generation

---

#### Q4: Context Windows - Lost in the Middle (1 point)
**Type:** Multiple Choice

What does the "lost in the middle" phenomenon refer to?

- A) Model weights gradually drift away from their original training
- B) Information in the middle of long prompts gets less attention
- C) Tokenizers systematically corrupt the middle of long code blocks
- D) Accuracy degrades sharply once context is more than half full

---

#### Q5: Why Code Hallucinations Are Hard to Detect (1 point)
**Type:** Multiple Choice

What makes LLM hallucinations in code particularly difficult to detect compared to hallucinations in prose?

- A) Hallucinated code reliably raises a runtime exception the first time it executes
- B) Hallucinated code is often syntactically correct and follows plausible patterns
- C) Modern editors automatically flag hallucinated API calls during static analysis
- D) Hallucinations occur only in dynamically typed languages, never in typed ones

---

### Section 2: Scenario Questions (3 questions, 2 points each)

---

#### Q6: Understanding Hallucinations (2 points)
**Type:** Multiple Choice

You ask Claude to help with a Svelte component. The code looks correct syntactically but uses an API method that doesn't exist in Svelte's documentation. What's the most likely explanation?

- A) Claude's training data had more React/Vue examples than Svelte, causing it to blend patterns
- B) Claude deliberately withholds correct Svelte APIs unless you cite a documentation version
- C) Svelte's published documentation lags behind its releases, so the method exists but is undocumented
- D) The temperature setting was too low, causing a fallback to an older Svelte API surface

---

#### Q7: Tokenization Impact on Code (2 points)
**Type:** Multiple Choice

A developer notices their Python code uses significantly more tokens than similar JavaScript code of the same length. The Python code uses significant whitespace indentation. Why might Python be more token-expensive?

- A) Python appears less often in the tokenizer's training corpus
- B) Each indentation level and whitespace consumes additional tokens
- C) Python's keywords are longer on average than JavaScript's keywords
- D) JavaScript is processed by a separate, more efficient tokenizer

---

#### Q8: RAG Understanding (2 points)
**Type:** Multiple Choice

Your company builds a coding assistant that helps developers with your proprietary API. The LLM has no knowledge of your API from training. How does the assistant provide accurate help?

- A) Fine-tuning the base model on your complete internal API documentation set
- B) Raising the temperature so the model infers the missing API surface
- C) Retrieving relevant API docs and including them in the prompt context
- D) Training a replacement model from scratch on your internal codebase

---

### Section 3: Applied Questions (2 questions, 2 points each)

---

#### Q9: Tokenization Experiment (2 points)
**Type:** Numeric Answer

Go to https://tiktokenizer.vercel.app/ and enter this exact Python code:

```python
def hello():
    print("Hello")
```

Select the **GPT-4** tokenizer (cl100k_base). How many tokens does this code use?

---

#### Q10: When to Use Generative AI (2 points)
**Type:** Multiple Choice

Which of the following tasks is the LEAST appropriate use of a generative AI coding assistant?

- A) Generating boilerplate for a new Express.js REST endpoint with standard middleware
- B) Verifying that a critical financial calculation matches regulatory specifications exactly
- C) Writing unit tests for a React component whose rendering behavior is already well understood
- D) Refactoring a long function for readability without altering its observable behavior

---

## Additional Question Pool (for randomization)

### Additional Concept Questions

#### Q11: AI Hierarchy (1 point)
**Type:** Multiple Choice

In the AI/ML/DL/LLM hierarchy, which statement is correct?

- A) Every AI system in production today is built on some form of deep learning
- B) LLMs are a subset of deep learning, which is a subset of machine learning
- C) Machine learning and deep learning describe the same set of techniques
- D) LLMs are built on statistical n-gram models rather than neural networks

---

#### Q12: Next-Token Prediction (1 point)
**Type:** Multiple Choice

Why is it accurate to describe LLMs as "autocomplete on steroids"?

- A) They operate only inside text editors and IDE-based completion widgets
- B) They fundamentally predict the most likely next token given previous tokens
- C) They complete text far faster than traditional autocomplete implementations do
- D) They can complete source code but never natural-language sentences

---

#### Q13: Embeddings (1 point)
**Type:** Multiple Choice

What do embeddings represent?

- A) The ordinal position of each word within a sentence
- B) The raw frequency of each word across a large training corpus
- C) Semantic meaning as vectors in a high-dimensional space
- D) The physical memory address where a token is stored

---

### Additional Scenario Questions

#### Q14: When to Trust AI Code (2 points)
**Type:** Multiple Choice

You're using an LLM to implement a common sorting algorithm. The code looks correct. When should you be MOST skeptical?

- A) When the code is consistently formatted and cleanly indented
- B) When the code includes thorough explanatory comments throughout
- C) When the code handles edge cases you didn't explicitly mention
- D) When the code relies on well-known standard library functions

---

#### Q15: Context Window Strategy (2 points)
**Type:** Multiple Choice

You're building a RAG system to help answer questions about a large codebase. Given the "lost in the middle" phenomenon, how should you structure retrieved content?

- A) Place all retrieved content at the very start of the prompt, before the question
- B) Place all retrieved content at the very end of the prompt, after the question
- C) Put the most relevant content at the start and end, less relevant in the middle
- D) Shuffle the retrieved content randomly to neutralize any position bias

---

## Canvas Import Instructions

1. **Create New Quiz** in Canvas under "Quizzes"
2. **Configure Settings** as shown in the Settings table above
3. **Create Question Groups** for randomization:
   - Group 1: Concept Questions (select 5 from pool of 8)
   - Group 2: Scenario Questions (select 3 from pool of 5)
   - Group 3: Tool Questions (all 2 required)
4. **Add Questions** using the content above
5. **Set Correct Answers** (see answer key - instructor only)
6. **Save and Preview** before publishing

## Anti-Cheating Measures Implemented

1. **Time pressure** - 15 minutes for 15 questions limits research time
2. **Question pools** - Random selection from larger pool
3. **Answer shuffling** - Different order for each student
4. **Scenario-based** - Requires understanding, not just recall
5. **Tool verification** - Specific, verifiable answers from external tools
6. **Single attempt** - No retakes
7. **Locked questions** - Can't go back and change answers
