# Week 2: LLM Fundamentals Quiz

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
| **Due Date** | Tuesday, Week 2 at 2:59 PM PT |
| **Available From** | After Week 2 lecture |
| **Published** | No (until ready) |

---

## Quiz Instructions

This quiz assesses your understanding of LLM fundamentals covered in Week 2 lectures and readings.

**Instructions:**
- **Time Limit:** 15 minutes
- **Questions:** 10 questions (15 points total)
- **Attempts:** One attempt only
- **Tools Required:** For questions 9-10, you will need to use external tools (Tiktokenizer, TensorFlow Embedding Projector)

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

- A) Software 3.0 uses more parameters
- B) Software 3.0 is programmed via natural language prompts
- C) Software 3.0 requires less training data
- D) Software 3.0 only works with code, not text

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

- A) LLMs forget their training over time
- B) Information in the middle of long prompts gets less attention
- C) Tokenization errors in the middle of code blocks
- D) Models lose accuracy after 50% of context is filled

---

#### Q5: Hallucination Statistics (1 point)
**Type:** Multiple Choice

According to research cited in class, approximately what percentage of LLM-recommended packages don't actually exist?

- A) ~5%
- B) ~10%
- C) ~20%
- D) ~40%

---

### Section 2: Scenario Questions (3 questions, 2 points each)

---

#### Q6: Understanding Hallucinations (2 points)
**Type:** Multiple Choice

You ask Claude to help with a Svelte component. The code looks correct syntactically but uses an API method that doesn't exist in Svelte's documentation. What's the most likely explanation?

- A) Claude's training data had more React/Vue examples than Svelte, causing it to blend patterns
- B) Claude is intentionally providing wrong answers
- C) The Svelte documentation is out of date
- D) You need to increase the temperature setting

---

#### Q7: Tokenization Impact on Code (2 points)
**Type:** Multiple Choice

A developer notices their Python code uses significantly more tokens than similar JavaScript code of the same length. The Python code uses significant whitespace indentation. Why might Python be more token-expensive?

- A) Python is a less popular language
- B) Each indentation level and whitespace consumes additional tokens
- C) Python keywords are longer than JavaScript keywords
- D) The JavaScript tokenizer is more efficient

---

#### Q8: RAG Understanding (2 points)
**Type:** Multiple Choice

Your company builds a coding assistant that helps developers with your proprietary API. The LLM has no knowledge of your API from training. How does the assistant provide accurate help?

- A) Fine-tuning the model on your API documentation
- B) Using higher temperature to encourage creativity
- C) Retrieving relevant API docs and including them in the prompt context
- D) Training a new model from scratch

---

### Section 3: Tool-Based Questions (2 questions, 2 points each)

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

#### Q10: Embedding Intuition (2 points)
**Type:** Short Answer

Go to https://projector.tensorflow.org/ and load the **Word2Vec 10K** dataset. Search for "function" and list **TWO words** that appear closest to it in the embedding space.

---

## Additional Question Pool (for randomization)

### Additional Concept Questions

#### Q11: AI Hierarchy (1 point)
**Type:** Multiple Choice

In the AI/ML/DL/LLM hierarchy, which statement is correct?

- A) All AI systems use deep learning
- B) LLMs are a subset of deep learning, which is a subset of machine learning
- C) Machine learning and deep learning are the same thing
- D) LLMs don't use neural networks

---

#### Q12: Next-Token Prediction (1 point)
**Type:** Multiple Choice

Why is it accurate to describe LLMs as "autocomplete on steroids"?

- A) They only work in text editors
- B) They fundamentally predict the most likely next token given previous tokens
- C) They are faster than traditional autocomplete
- D) They only complete code, not natural language

---

#### Q13: Embeddings (1 point)
**Type:** Multiple Choice

What do embeddings represent?

- A) The position of words in a sentence
- B) The frequency of words in a corpus
- C) Semantic meaning as vectors in a high-dimensional space
- D) The physical location of data in memory

---

### Additional Scenario Questions

#### Q14: When to Trust AI Code (2 points)
**Type:** Multiple Choice

You're using an LLM to implement a common sorting algorithm. The code looks correct. When should you be MOST skeptical?

- A) When the code has good formatting
- B) When the code includes comments
- C) When the code handles edge cases you didn't explicitly mention
- D) When the code uses standard library functions

---

#### Q15: Context Window Strategy (2 points)
**Type:** Multiple Choice

You're building a RAG system to help answer questions about a large codebase. Given the "lost in the middle" phenomenon, how should you structure retrieved content?

- A) Put all retrieved content at the start of the prompt
- B) Put all retrieved content at the end of the prompt
- C) Put the most relevant content at the start and end, less relevant in the middle
- D) Randomly order the retrieved content

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

1. **Time pressure** - 15 minutes for 10 questions limits research time
2. **Question pools** - Random selection from larger pool
3. **Answer shuffling** - Different order for each student
4. **Scenario-based** - Requires understanding, not just recall
5. **Tool verification** - Specific, verifiable answers from external tools
6. **Single attempt** - No retakes
7. **Locked questions** - Can't go back and change answers
