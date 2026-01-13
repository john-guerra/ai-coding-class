---
marp: true
theme: default
paginate: true
style: |
  @import url('../css/marp-theme.css');
---

# LLM Fundamentals

## Understanding AI Before Using It

---

# Why This Matters

You wouldn't drive a car without understanding:

- Gas pedal vs brake
- When it might skid
- What the warning lights mean

Same with AI tools.

---

# What We'll Cover

1. How transformers work (high-level)
2. Tokens and tokenization
3. Context windows
4. Temperature and sampling
5. Why hallucinations happen
6. Model comparison
7. When to trust AI outputs

---

# The Big Picture

LLMs are **statistical text predictors**.

Given some text, they predict what comes next.

That's it. That's the core mechanic.

---

# Before Transformers

**RNNs/LSTMs** — Read text sequentially

- Slow (can't parallelize)
- Forget long-range context
- Hard to train

_Think: reading one word at a time, forgetting the beginning_

---

# The Transformer Revolution

**2017: "Attention Is All You Need"**

Key insight: Let the model look at _all_ words simultaneously and learn which ones matter for each prediction.

---

# Attention Mechanism

For each word, the model asks:

> "Which other words in this text should I pay attention to when predicting what comes next?"

This is computed for every word in parallel.

---

# Self-Attention Example

**"The cat sat on the mat because it was tired"**

When processing "it":

- High attention to "cat" ✓
- Low attention to "mat" ✗

The model learns these relationships.

---

# Multi-Head Attention

Multiple "attention heads" look for different patterns:

- Head 1: Subject-verb relationships
- Head 2: Adjective-noun pairs
- Head 3: Long-range references
- etc.

Combined = rich understanding of context.

---

# Why This Matters for You

Transformers can:

- Process long documents
- Understand complex relationships
- Generate coherent long-form text

But they're still just predicting the next token.

---

# What is a Token?

Tokens are the fundamental units LLMs process.

Not words. Not characters. **Subword pieces.**

---

# Tokenization Examples

| Text          | Tokens              |
| ------------- | ------------------- |
| "Hello"       | ["Hello"]           |
| "unhappiness" | ["un", "happiness"] |
| "ChatGPT"     | ["Chat", "G", "PT"] |
| "🚀"          | ["🚀"]              |

---

# Why Subwords?

**Balance between:**

- Character-level (too granular, slow)
- Word-level (can't handle new words)

Subwords handle:

- Rare words
- Misspellings
- Technical terms
- Multiple languages

---

# Token Counts Matter

**Why you should care:**

- Pricing (API costs per token)
- Context limits
- Generation limits

Rule of thumb: **1 token ≈ 0.75 words**

---

# Tokenization Gotchas

```python
# "            " (spaces) = many tokens
# Code with long variable names = expensive
# Non-English text = more tokens
```

Different models tokenize differently!

---

# The Context Window

The **maximum number of tokens** the model can "see" at once.

| Model      | Context Window |
| ---------- | -------------- |
| GPT-4      | 128K tokens    |
| Claude 3.5 | 200K tokens    |
| Gemini 1.5 | 1M+ tokens     |

---

# Context Window Analogy

Imagine a desk that can only hold N papers.

- Everything you want the AI to know = papers
- Your question = the last paper
- AI's answer = based only on what's on the desk

**If it doesn't fit, the AI can't see it.**

---

# Context Window in Practice

What counts toward context:

- System prompt
- Conversation history
- Files you upload
- Your current message
- AI's response (as it generates)

---

# Context Window Strategy

**When you're hitting limits:**

- Summarize earlier context
- Remove irrelevant history
- Split into multiple conversations
- Use RAG (retrieve relevant chunks)

---

# Temperature

A number (usually 0-2) that controls **randomness** in output.

| Temperature | Behavior                  |
| ----------- | ------------------------- |
| 0           | Deterministic, focused    |
| 0.7         | Balanced (common default) |
| 1.0+        | Creative, unpredictable   |

---

# Temperature: The Mechanics

At each token, the model produces probabilities:

```
"the" → 0.4
"a"   → 0.3
"an"  → 0.2
"my"  → 0.1
```

**Temperature adjusts how "peaked" this distribution is.**

---

# Low Temperature (0-0.3)

- Almost always picks highest probability
- Consistent, predictable outputs
- Good for: code, factual answers, math

```
Same prompt → same output (mostly)
```

---

# High Temperature (0.8+)

- More likely to pick lower-probability tokens
- Creative, varied outputs
- Good for: brainstorming, creative writing

```
Same prompt → different outputs each time
```

---

# Top-P (Nucleus Sampling)

Alternative to temperature:

> Only consider tokens whose cumulative probability reaches P%

`top_p=0.9` → Only consider tokens in the top 90% probability mass.

Cuts off the "long tail" of unlikely tokens.

---

# Why Do LLMs Hallucinate?

The million-dollar question.

---

# Hallucination: Definition

When an LLM generates text that is:

- Factually incorrect
- Made up (but sounds confident)
- Inconsistent with its training

---

# Root Cause #1: Training Objective

LLMs are trained to **predict plausible text**.

Not **true text**. Not **verified text**.

_Plausible ≠ Correct_

---

# Root Cause #2: No Knowledge Retrieval

LLMs don't "look things up."

They generate based on patterns in training data.

If the pattern is wrong or incomplete → hallucination.

---

# Root Cause #3: Confidence Calibration

LLMs don't know what they don't know.

They produce fluent text regardless of certainty.

**High confidence ≠ High accuracy**

---

# Common Hallucination Types

- **Factual** — Wrong dates, names, numbers
- **Citation** — Made-up references/URLs
- **Code** — Non-existent APIs/functions
- **Reasoning** — Logical leaps that don't follow

---

# Hallucination in Code

```javascript
// AI might generate:
import { useQuery } from "react-query";

// But the actual API is:
import { useQuery } from "@tanstack/react-query";
```

Package names, function signatures, APIs — all can be hallucinated.

---

# Model Comparison

The big three for coding:

- **GPT-4 / GPT-4o** (OpenAI)
- **Claude 3.5 Sonnet** (Anthropic)
- **Gemini 1.5 Pro** (Google)

---

# GPT-4 / GPT-4o

**Strengths:**

- Broad knowledge
- Good at following complex instructions
- Strong at code generation

**Weaknesses:**

- Can be verbose
- Sometimes over-confident
- Older training data

---

# Claude 3.5 Sonnet

**Strengths:**

- Excellent at nuanced tasks
- Better at saying "I don't know"
- Strong reasoning
- 200K context window

**Weaknesses:**

- Can be overly cautious
- Sometimes verbose explanations

---

# Gemini 1.5 Pro

**Strengths:**

- Massive context (1M+ tokens)
- Multimodal (text, images, video)
- Good at document analysis

**Weaknesses:**

- Less consistent than GPT-4/Claude
- API still maturing

---

# Choosing a Model

| Use Case          | Recommended         |
| ----------------- | ------------------- |
| Daily coding      | Claude 3.5 / GPT-4o |
| Long documents    | Gemini 1.5          |
| Complex reasoning | Claude 3.5          |
| Quick prototypes  | Any                 |
| Production code   | Test multiple       |

---

# When to Trust AI Outputs

**High Trust:**

- Boilerplate code
- Standard patterns
- Well-documented APIs
- Common algorithms

---

# When to Be Skeptical

**Low Trust:**

- Specific facts/dates
- Edge cases
- Obscure libraries
- Security-critical code
- Complex business logic

---

# Verification Strategies

1. **Run the code** — Does it actually work?
2. **Read the code** — Do you understand it?
3. **Test the code** — Does it handle edge cases?
4. **Check the docs** — Are the APIs real?
5. **Ask for alternatives** — Is there a better way?

---

# The Trust Spectrum

```
Blind Trust                    Total Distrust
    ❌                              ❌

    Informed Trust ✓
    (Verify, then use)
```

---

# Practical Takeaways

1. **LLMs predict text, not truth**
2. **Token limits are real constraints**
3. **Temperature affects creativity vs. consistency**
4. **Hallucinations are inevitable — verify everything**
5. **Different models have different strengths**

---

# For This Course

- Use Claude (Web, Cursor, Code)
- Understand your context limits
- Always test AI-generated code
- Never commit code you can't explain
- Document your AI usage

---

# The AI-Assisted Developer Mindset

AI is a **power tool**, not autopilot.

You're still the engineer.
You're still responsible.
You still need to understand.

---

# Questions?

---

# Next Class

**Modality 1: Claude Web**

We'll dive deep into:

- Claude Projects
- Artifacts
- Requirements gathering
- Architecture planning

---

# Homework

**Read:** The Mom Test, Chapters 1-3

**Submit:** Your first pre-class question on Canvas

**Think about:** A personal problem you'd like to solve with an app

---

# See You Thursday! 🚀
