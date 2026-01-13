# CS 7180: Week 2 - LLM Fundamentals for AI Coding
## Class Planning Document

**Course:** CS 7180 - Vibe Coding: AI-Assisted Software Engineering  
**Instructor:** John Alexis Guerra Gomez  
**Class Session:** Week 2 (Second class of semester)  
**Duration:** ~100 minutes (Tu/Th 3:00-4:40 PM)  
**Last Updated:** January 12, 2026

---

## Schedule Adjustment Note

The original syllabus has Week 1 covering "Introduction, Mom Test, Design Thinking, LLM Fundamentals" and Week 2 covering "Modality 1: Claude Web, Requirements Gathering." 

**Proposed adjustment:** Since the semester started on Thursday (only one session in Week 1), this LLM Fundamentals content becomes the primary focus of the Week 2 Tuesday session. Consider moving some Claude Web content to Week 2 Thursday or Week 3.

---

## Learning Outcomes (In Sequence)

By the end of this class, students will be able to:

### 1. Understand Neural Network Foundations (10 min)
- [ ] Explain how neural networks learn through gradient descent
- [ ] Describe the basic structure: inputs → layers → weights → outputs
- [ ] Understand that training = adjusting weights to minimize error

### 2. Explain LLM Training as "Sophisticated Autocomplete" (15 min)
- [ ] Describe next-token prediction as the core training objective
- [ ] Explain why LLMs are fundamentally pattern completion systems
- [ ] Understand pre-training vs. fine-tuning vs. RLHF pipeline
- [ ] Recognize that LLMs simulate understanding rather than truly understanding

### 3. Understand Tokens, Temperature, and Probability (15 min)
- [ ] Define what tokens are and why tokenization matters for code
- [ ] Explain how token selection works (probability distributions)
- [ ] Describe temperature's effect on randomness/creativity
- [ ] Demonstrate why code tokenizes differently than prose (whitespace, syntax)

### 4. Explain How Information is Stored in Weights (10 min)
- [ ] Understand that "knowledge" lives in weight matrices
- [ ] Explain why training data biases become embedded in models
- [ ] Recognize that LLMs reflect their training distribution (garbage in → garbage out)
- [ ] Understand why underrepresented populations/domains get worse results

### 5. Understand Embeddings and Semantic Space (15 min)
- [ ] Define embeddings as dense vector representations of meaning
- [ ] Explain embedding distance = semantic similarity
- [ ] Describe how vector databases enable semantic search
- [ ] Connect embeddings to why LLMs can "understand" relationships

### 6. Explain Context Windows and How Chatbots Work (10 min)
- [ ] Understand that LLMs are stateless (no memory between calls)
- [ ] Explain how chat interfaces create illusion of memory (conversation as context)
- [ ] Describe context window limits and why they matter
- [ ] Recognize that EVERYTHING is text to the LLM (code, instructions, history)

### 7. Understand RAG and Context Files (10 min)
- [ ] Define Retrieval-Augmented Generation (RAG)
- [ ] Explain how .cursorrules and context files help LLMs "remember"
- [ ] Understand why providing relevant context improves output quality
- [ ] Connect to how Cursor uses codebase context for completions

### 8. Explain Why Hallucinations Happen (10 min)
- [ ] Understand hallucinations as confident pattern-matching without grounding
- [ ] Explain that training incentivizes guessing over admitting uncertainty
- [ ] Recognize specific code hallucination types: API misuse, fake packages
- [ ] Know the stats: ~20% API hallucinations, ~20% fake package recommendations

### 9. Apply the "Lazy Teenager" Mental Model (5 min)
- [ ] Treat LLMs as smart but lazy — they take shortcuts
- [ ] Understand that clear guidance produces better results
- [ ] Recognize that verification (like tests) keeps them honest
- [ ] Set expectations: trust patterns, verify specifics

---

## Key Concepts to Cover

### The Autocomplete Framing
- LLMs are trained to predict "what comes next"
- They're incredibly good at simulating knowledge
- But simulation ≠ understanding
- They optimize for plausible, not correct

### The "Lazy Teenager" Analogy
> "LLMs are like brilliant but lazy teenagers who want to do the minimum work to seem like they completed the task. If you don't check their work, they'll cut corners. If you give them clear expectations and test their outputs, they do much better."

**Key implications:**
- Be specific about what you want
- Check their work (tests, verification)
- Don't assume they understood your intent
- The more guidance, the better the output

### Everything is Text
- Code is text
- Your prompt is text
- The conversation history is text
- System instructions are text
- File contents are text
- **The LLM sees ONE long string of tokens**

This is crucial for understanding:
- Why context matters
- How Cursor/Claude Code work under the hood
- Why prompt engineering is really "text engineering"

### How Cursor Uses LLMs
- Tab completion = send surrounding code as context, get next tokens
- Chat = send code + question + conversation as context
- Composer = send multiple files + instructions as context
- @codebase = RAG over your codebase, inject relevant snippets
- .cursorrules = always-included system context
- **It's all just text going to an LLM API**

#### Under the Hood: What Cursor Actually Sends
When you use Cursor, here's roughly what happens:

```
[System Prompt]
You are a helpful coding assistant...
Here are the user's coding style preferences from .cursorrules:
{contents of .cursorrules}

[Context from @codebase or @file references]
{relevant code snippets retrieved via RAG}

[Current File Context]
{code before cursor}
[CURSOR POSITION]
{code after cursor}

[User Message]
"Help me add error handling here"

[Conversation History]
{previous messages in this chat}
```

The LLM sees ONE long text prompt. It doesn't "see" your IDE — it just processes text and returns text.

### Bias in Training Data
- LLMs learn patterns from training data
- If training data underrepresents certain groups → worse performance
- If training data contains biases → model reproduces them
- Why diverse, high-quality training data matters
- **For code:** models may be better at popular languages/frameworks

#### Concrete Examples of Bias in Code Generation
1. **Language popularity bias**: Better at Python/JavaScript than Rust/Haskell
2. **Framework bias**: More familiar with React than Svelte
3. **Domain bias**: Better at web dev than embedded systems
4. **Stack Overflow bias**: May reproduce common (sometimes wrong) patterns
5. **Documentation bias**: Better at well-documented APIs

#### Why This Matters for Vibe Coding
- If you're working in a less popular language/framework, expect more hallucinations
- Context files (.cursorrules) help compensate for model blind spots
- Always verify unfamiliar APIs — the model may be guessing

### Why Testing Helps
- Tests are a form of verification
- LLMs can run tests to check their own output
- TDD with AI = give the LLM clear success criteria
- Tests catch the "lazy teenager" taking shortcuts
- Automated testing in CI/CD = continuous verification

#### The Testing Loop with AI
```
1. You write test (defines "correct" behavior)
2. AI generates implementation
3. Test runs → Pass or Fail
4. If fail → AI sees error, tries again
5. Iterate until tests pass
```

This is why TDD + AI is so powerful:
- **Clear success criteria** — the test defines what "done" means
- **Automatic verification** — no need to manually check
- **Catches shortcuts** — the "lazy teenager" can't fake passing tests
- **Documentation** — tests show intent

#### What Tests Catch in AI Code
- API misuse (wrong function names, parameters)
- Edge cases the model forgot
- Logic errors from pattern-matching gone wrong
- Missing error handling
- Incorrect types

---

## Core Analogies & Mental Models

### 1. Autocomplete on Steroids
"Your phone's keyboard suggestions, but trained on the entire internet and capable of completing not just words but entire programs."

### 2. The Lazy Genius Teenager
"Brilliant, well-read, can sound convincing on any topic — but will take every shortcut possible unless you check their work."

### 3. Pattern Matching, Not Reasoning
"LLMs are like someone who has read every book about swimming but has never been in water. They can describe swimming perfectly but might drown."

### 4. The Parrot Problem
"A parrot can say 'I'm hungry' without experiencing hunger. LLMs can write 'this code handles edge cases' without understanding what edge cases are."

### 5. Weights as Compressed Knowledge
"Imagine compressing Wikipedia into a neural network's weights. The knowledge is there, but it's fuzzy, incomplete, and sometimes wrong — like memories."

---

## Visual/Demo Ideas

### 1. Tokenizer Demo
- Use Tiktokenizer (https://tiktokenizer.vercel.app/)
- Show how "Hello World" tokenizes
- Show how Python code tokenizes (whitespace handling)
- Compare GPT-4 vs Claude tokenization

### 2. Temperature Demo
- Same prompt at temperature 0 vs 0.7 vs 1.0
- Show how outputs become more "creative" (and less reliable)

### 3. Embedding Visualization
- TensorFlow Embedding Projector
- Show word relationships in 3D space
- Demonstrate semantic similarity

### 4. Context Window Demo
- Show what happens when you exceed context limits
- Demonstrate "lost in the middle" phenomenon

### 5. Hallucination Example
- Ask about a fake API function
- Show confident but wrong response
- Demonstrate how to catch this

---

## Discussion Questions for Class

1. "If LLMs don't 'understand,' how do they write working code?"

2. "When should you trust AI-generated code? When should you be skeptical?"

3. "How is coding with AI different from coding with Stack Overflow?"

4. "If an LLM writes code that works but you don't understand it, should you use it?"

5. "How might training data biases affect code generation for different programming languages or domains?"

---

## Connections to Rest of Course

| This Class Concept | Later Application |
|-------------------|-------------------|
| Everything is text | Prompt engineering (Week 3) |
| Context matters | Context engineering (Week 8) |
| RAG basics | .cursorrules, @codebase (Week 4-5) |
| Hallucinations | Evaluation systems (Week 9-10) |
| Testing as verification | TDD with AI (Week 4-5) |
| Lazy teenager model | Why evals matter (Week 9) |

---

## Resources to Assign/Reference

> **See full readings list:** `CS7180_Required_Readings.md` for complete URLs and all course resources.

### Required Viewing (Before Class)
- 3Blue1Brown: "But what is a Neural Network?" (19 min)
  - URL: https://www.3blue1brown.com/lessons/neural-networks
- 3Blue1Brown: "Attention in transformers" (27 min)
  - URL: https://www.3blue1brown.com/lessons/attention

### Optional Deep Dives
- Karpathy: "Let's Build GPT" (for those wanting implementation)
  - URL: https://karpathy.ai/zero-to-hero.html
- Jay Alammar: "The Illustrated Transformer" (visual reference)
  - URL: https://jalammar.github.io/illustrated-transformer/

### In-Class Tools
- Tiktokenizer: https://tiktokenizer.vercel.app/
- TensorFlow Embedding Projector: https://projector.tensorflow.org/

### Academic References
- "LLM Hallucinations in Practical Code Generation" (ACM)
  - URL: https://arxiv.org/pdf/2409.20550
- "Why Language Models Hallucinate" (arXiv)
  - URL: https://arxiv.org/abs/2509.04664

---

## Open Questions / Decisions Needed

1. **Depth of neural network explanation** — How much background do grad students need? Quick 10-min refresher vs. 20-min deep dive?

2. **Live coding demo?** — Show Cursor's autocomplete with context vs. without?

3. **Schedule adjustment** — Does Claude Web content move to Week 3, or do we compress this into 80 min?

4. **Pre-class assignment** — Should students watch 3Blue1Brown videos before class?

5. **Hands-on component** — Have students tokenize their own code samples?

---

## Notes from Planning Discussion

- John emphasized that this is a CS master's level class, so we can go deep where useful
- The framing should always connect back to AI coding (not just ML theory)
- The "lazy teenager" analogy resonates — LLMs optimize for minimum effort
- Key insight: LLMs simulate understanding, they don't possess it
- Bias discussion connects to why diverse training data matters
- RAG/context files are how we work around LLM limitations
- Tests as verification = catching the lazy teenager's shortcuts

---

## Slide Outline (Draft)

1. **Title Slide** — "Understanding LLMs for AI Coding"
2. **The Autocomplete Revolution** — What LLMs really are
3. **Neural Networks in 5 Minutes** — Quick foundation
4. **Training: Next Token Prediction** — The core objective
5. **Demo: Tokens in Action** — Tiktokenizer live
6. **Temperature & Probability** — Controlled randomness
7. **Knowledge in Weights** — How LLMs "store" information
8. **The Bias Problem** — Training data → model behavior
9. **Embeddings: Meaning as Math** — Semantic space
10. **Demo: Embedding Projector** — Visualizing relationships
11. **Context Windows** — The LLM's working memory
12. **Everything is Text** — Code, prompts, history
13. **How Cursor Works** — Demystifying the magic
14. **RAG: Giving LLMs Memory** — Context files & retrieval
15. **Hallucinations: Why They Happen** — Pattern matching gone wrong
16. **The Lazy Teenager** — Mental model for working with AI
17. **Testing as Verification** — Keeping AI honest
18. **Key Takeaways** — What to remember
19. **Discussion** — When to trust AI code?

---

*This document is for planning purposes. Will evolve into actual slides and teaching materials.*
