# Prompt Anatomy — Quick Card

*Agentic Engineering workshop · Session 1*

## The 5 components

> A prompt is a program written in natural language. More structure → better output.

| # | Component | Ask yourself |
|---|---|---|
| 1 | **Context** | What background does it need? ("React + TS app…") |
| 2 | **Task** | What exactly do you want done? |
| 3 | **Format** | How should the output be shaped? |
| 4 | **Constraints** | What are the rules and limits? |
| 5 | **Examples** | Can you *show* instead of tell? |

*Not every prompt needs all five — but more context = better results.*

### Fill-in template
```text
Context:      __________________________________________
Task:         __________________________________________
Format:       __________________________________________
Constraints:  - ________________________________________
              - ________________________________________
Examples:     __________________________________________
```

## The 4 patterns

| Pattern | Reach for it when… | Mini-example |
|---|---|---|
| **Zero-/few-shot** | you want a consistent format/style | give 2–3 input→output pairs, then the real input |
| **Chain-of-thought** | the logic is complex or multi-step | "First analyze inputs, edge cases, approach — *then* write code." |
| **Role** | you want a specific lens | "You are a security expert reviewing this for injection…" |
| **Structured output** | the result feeds a pipeline | "Return JSON: `{ summary, issues[], severity }`" |

## Working rules

- **Be explicit** — say what you *do* and *don't* want. Vague in → vague out.
- **Add the *why*** — "this is for a banking app" changes the output.
- **Watch the details** — examples are taken *literally*; typos get copied.
- **Iterate** — expect **2–5 rounds** for anything complex: run → find issues → add constraints → repeat.

> **Verify.** AI output always needs human validation.
