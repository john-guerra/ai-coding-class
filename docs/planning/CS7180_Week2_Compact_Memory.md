# CS 7180 Week 2 Class Planning - Project Memory
## Compact Export for Chat Continuation

**Date:** January 12, 2026  
**Status:** Planning Phase - Ready for Slide Creation

---

## CONTEXT

John is planning **Week 2** of CS 7180: Vibe Coding (AI-Assisted Software Engineering) at Northeastern Oakland. The semester started Thursday, so Week 1 was only one session. Week 2 Tuesday will focus on **LLM Fundamentals for AI Coding**.

**Goal:** Teach students how LLMs work so they understand when to trust AI-generated code and when to be skeptical.

---

## KEY DECISIONS MADE

1. **Framing:** "Lazy teenager" analogy — LLMs optimize for minimum effort, take shortcuts unless you verify their work
2. **Core insight:** "Everything is text" — code, prompts, history all become one token stream
3. **Depth:** Graduate CS level, go deep where useful for AI coding
4. **Focus:** Always connect back to practical AI coding, not just ML theory
5. **Tools to demo:** Tiktokenizer, TensorFlow Embedding Projector

---

## LEARNING OUTCOMES (Sequence)

1. **Neural Network Foundations** (10 min) — How NNs learn via gradient descent
2. **LLM as Autocomplete** (15 min) — Next-token prediction, simulation vs understanding
3. **Tokens & Temperature** (15 min) — Tokenization, probability, why code tokenizes differently
4. **Knowledge in Weights** (10 min) — How info stored, why biases emerge
5. **Embeddings** (15 min) — Semantic space, distances, vector databases
6. **Context Windows** (10 min) — Stateless LLMs, chat as context illusion
7. **RAG & Context Files** (10 min) — .cursorrules, @codebase, giving LLMs "memory"
8. **Hallucinations** (10 min) — Why they happen, code-specific stats (~20% API misuse)
9. **Lazy Teenager Model** (5 min) — Mental model, testing as verification

---

## KEY ANALOGIES TO USE

- **Autocomplete on steroids** — Phone keyboard trained on internet
- **Lazy genius teenager** — Brilliant but takes shortcuts unless checked
- **Pattern matching, not reasoning** — Read about swimming, never been in water
- **Parrot problem** — Can say "I'm hungry" without hunger
- **Weights as compressed knowledge** — Wikipedia compressed into fuzzy memories

---

## HOW CURSOR WORKS (Key Teaching Point)

Show students what Cursor actually sends:
```
[System Prompt + .cursorrules]
[Context from @codebase RAG]
[Current file with cursor position]
[User message]
[Conversation history]
→ ONE long text prompt to LLM API
```

---

## BIAS EXAMPLES FOR CODE

- Language popularity: Better Python/JS than Rust/Haskell
- Framework: More React than Svelte
- Domain: Web dev > embedded systems
- Stack Overflow patterns (sometimes wrong)
- Well-documented APIs > obscure ones

---

## TDD + AI LOOP

```
1. Write test (defines "correct")
2. AI generates implementation
3. Test runs → Pass/Fail
4. If fail → AI sees error, retries
5. Iterate until pass
```

Tests catch: API misuse, edge cases, logic errors, missing error handling

---

## REQUIRED RESOURCES (Verified URLs)

**3Blue1Brown (Required Viewing):**
- Neural Networks: https://www.3blue1brown.com/lessons/neural-networks
- Attention: https://www.3blue1brown.com/lessons/attention

**Jay Alammar (Visual Reference):**
- Illustrated Transformer: https://jalammar.github.io/illustrated-transformer/
- Illustrated GPT-2: https://jalammar.github.io/illustrated-gpt2/

**Karpathy (Deep Dives):**
- Zero to Hero series: https://karpathy.ai/zero-to-hero.html

**Interactive Tools:**
- Tiktokenizer: https://tiktokenizer.vercel.app/
- Embedding Projector: https://projector.tensorflow.org/

**Anthropic Courses:**
- Main repo: https://github.com/anthropics/courses
- Prompt tutorial: https://github.com/anthropics/prompt-eng-interactive-tutorial

**Hallucination Research:**
- Code hallucinations: https://arxiv.org/pdf/2409.20550
- Why LLMs hallucinate: https://arxiv.org/abs/2509.04664
- Package hallucinations: https://www.usenix.org/publications/loginonline/we-have-package-you-comprehensive-analysis-package-hallucinations-code

---

## SLIDE OUTLINE (19 slides)

1. Title — "Understanding LLMs for AI Coding"
2. The Autocomplete Revolution
3. Neural Networks in 5 Minutes
4. Training: Next Token Prediction
5. Demo: Tokens in Action (Tiktokenizer)
6. Temperature & Probability
7. Knowledge in Weights
8. The Bias Problem
9. Embeddings: Meaning as Math
10. Demo: Embedding Projector
11. Context Windows
12. Everything is Text
13. How Cursor Works
14. RAG: Giving LLMs Memory
15. Hallucinations: Why They Happen
16. The Lazy Teenager
17. Testing as Verification
18. Key Takeaways
19. Discussion — When to trust AI code?

---

## OPEN DECISIONS

1. **Pre-class assignment?** — Have students watch 3Blue1Brown before class?
2. **Time allocation** — 100 min may be tight; split Tuesday/Thursday?
3. **Live Cursor demo?** — Show actual context being sent?
4. **Bias depth** — Quick mention or full discussion?
5. **Schedule adjustment** — Claude Web modality moves to Week 3?

---

## FILES CREATED

1. `CS7180_Week2_LLM_Fundamentals_Planning.md` — Full planning doc
2. `CS7180_Required_Readings.md` — All readings with verified URLs by week

---

## NEXT STEPS

1. Decide on open questions above
2. Create actual slide deck (Marp or PPTX)
3. Prepare demo scripts for Tiktokenizer and Embedding Projector
4. Update syllabus if schedule shifts
5. Post pre-class reading assignment to Canvas

---

## PROJECT FILES REFERENCE

- Syllabus: `/mnt/project/CS7180_VibeCoding_Syllabus.docx`
- Landing page context: `/mnt/project/landing-page-context.md`
- Full project memory: `/mnt/project/CS7180_Project_Memory.md`
