---
title: "Workshop S1 — Fundamentals & Prompting"
theme: white
revealOptions:
  transition: convex
  hash: true
  history: true
---

<!-- .slide: id="title" -->

<span class="course-week">Workshop · Session 1 of 4</span>

## Agentic Engineering

### Speed *with* Quality

Fundamentals & Prompting

[**John Alexis Guerra Gomez**](http://johnguerra.co/)

<small>A hands-on workshop on AI-assisted software engineering</small>

---

# What We'll Cover Today

1. The promise — speed *with* quality
2. LLM fundamentals, **by doing**
3. The three **harnesses** compared
4. Prompt engineering + hands-on lab

<small>Session 1 needs **no setup** — just a browser.</small>

---

# The Promise

> "Vibe coding" done right: AI-assisted speed **with** engineering quality.

<!-- vertical -->

## Two Humility Anchors

We'll come back to these all workshop:

**METR (2025):** experienced devs were **~19% slower** with AI tools — while believing they were 20% *faster*.

**Veracode:** only **~55%** of AI-generated code passes security checks — despite high syntactic correctness.

<small class="smaller">Sources: [METR RCT](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) · [Veracode GenAI Code Security](https://www.veracode.com/blog/genai-code-security-report/)</small>

<!-- vertical -->

## The Takeaways

- **Speed ≠ speedup.** Your self-perception is unreliable.
- **Functional ≠ secure.** It runs *and* fails the audit.

> The scarce skill isn't typing. It's **verification under throughput pressure.**

---

# Part 1 — LLM Fundamentals, By Doing

> You prompt better when you know what's happening under the hood.

---

## Everything Is Tokens

LLMs don't see characters or words — they see **tokens** (~4 chars each).

**Live demo:** [tiktokenizer.vercel.app](https://tiktokenizer.vercel.app/)

<!-- vertical -->

## Try These

1. `Hello, World!`
2. `function add(a, b) { return a + b; }`
3. Four spaces vs. a tab character
4. A block of Python indentation

**Notice:** code tokenizes differently than prose; whitespace varies; special characters can be expensive.

<!-- vertical -->

## Why It Matters

- Context windows are measured in **tokens**, not lines.
- 200K tokens ≈ 150,000 words ≈ 1–2 books.
- **"Lost in the middle"** — models attend least to the center of long contexts.

> Put the important stuff **first**.

---

## The "Lazy Genius" Model

Treat the model like a **brilliant but lazy teammate** who does the *minimum* to look done.

| It will... | So you... |
|---|---|
| Take shortcuts | Be specific |
| Not verify its work | Write tests first (TDD) |
| Invent plausible details | Demand sources / run the code |

<!-- vertical -->

## Why Models Hallucinate

They predict *plausible* text — not *true* text.

- ~1 in 5 package suggestions may not exist.
- Plausible-but-wrong is the **default failure mode**.

> Remember this in Session 4 — it's the root of **slopsquatting**.

---

## Agent = Model + Harness

<pre class="mermaid">
flowchart LR
  P[Your prompt] --> T[Think]
  T --> A[Act: use a tool]
  A --> O[Observe result]
  O --> D{Done?}
  D -- No --> T
  D -- Yes --> R[Respond]
</pre>

The **model** reasons. The **harness** is the scaffolding around it — the loop, tools, memory, and
guardrails. Today we compare three harnesses.

---

# Part 2 — The Three Harnesses

> Same model. Different scaffolding, different leash.

---

## A Mental Picture

| Harness | It's like... | Best for |
|---|---|---|
| **Claude Web** | A whiteboard with a mentor | Ideation, architecture, learning |
| **IDE agent** <br><small>(Antigravity/Cursor/Copilot)</small> | A pair programmer in your editor | Daily coding in your classical workflow |
| **Claude Code** | A build crew that follows blueprints | Multi-file changes, automation, agentic work |

<!-- vertical -->

## Two Axes That Matter

- **Interaction surface** — chat window → editor → terminal.
- **Autonomy / leash length** — you approve each step → it runs many steps → it opens a PR.

> The harness sets the leash. The model is the same underneath.

---

## Which Tool for Which Task?

| Task | Reach for... |
|---|---|
| Think through a problem / architecture | Claude Web |
| Quick shareable page or prototype | Claude Web (Artifacts) |
| Edit code in your normal flow | IDE agent |
| Change many files / run a workflow | **Claude Code** |
| Generate tests, automate, script | **Claude Code** |

<small>Heuristic: *if a task takes &gt;15 min and you don't need to watch, lean autonomous.*</small>

<!-- vertical -->

## Micro Hands-On (5 min)

1. In **Claude Web**: "Build me a small tip-calculator as an artifact."
2. Glance at **Claude Code** doing the same in a terminal.

**Feel the difference:** conversation & instant preview vs. files, tools, and a review checkpoint.

<!-- vertical -->

## The Rest of the Workshop

We make **Claude Code** the spine:

- **S2** — memory & modes (drive it well)
- **S3** — spec → TDD → build + skills/hooks
- **S4** — MCP, subagents, and security

---

# Part 3 — Prompt Engineering

> "A prompt is a program written in natural language."

---

## Anatomy of a Good Prompt

1. **Context** — background ("I'm building a React + TS app")
2. **Task** — what you want done
3. **Format** — how to structure the output
4. **Constraints** — limits and rules
5. **Examples** — show, don't tell

<small>Not every prompt needs all five — but more context = better results.</small>

<!-- vertical -->

## The Template

```text
Context:   I'm building a React app with TypeScript.
Task:      Create a login form with email + password.
Format:    Functional component, typed props.
Constraints:
  - Controlled inputs
  - Inline validation + error messages
  - Loading state on submit
Examples:  Similar to shadcn/ui form patterns.
```

<!-- vertical -->

## Claude Best Practices

- **Be explicit** — say what you *do* and *don't* want. Vague in, vague out.
- **Add context / the *why*** — "this is for a banking app" changes the output.
- **Watch the details** — examples are taken literally; typos get copied.

---

## Four Patterns

| Pattern | Use it for |
|---|---|
| **Zero- vs few-shot** | Formatting, classification, consistent style |
| **Chain-of-thought** | Complex logic, multi-step reasoning |
| **Role prompting** | "You are a security expert reviewing..." |
| **Structured output** | JSON/YAML for parsing & pipelines |

<!-- vertical -->

## Few-Shot Example

```text
Convert dates to ISO format:
- "March 1, 2024"     → "2024-03-01"
- "December 25, 2023" → "2023-12-25"
- "January 15, 2026"  → ?
```

<!-- vertical -->

## Chain-of-Thought Example

```text
Before writing code, analyze this problem:
1. What are the inputs and outputs?
2. What edge cases exist?
3. What's the algorithm approach?
4. Now write the code.
```

<!-- vertical -->

## The Iteration Loop

<pre class="mermaid">
flowchart LR
  W[Write prompt] --> R[Run]
  R --> I[Find issues]
  I --> C[Add constraints]
  C --> R
  I --> A[Accept when correct]
</pre>

> Expect **2–5 iterations** for anything complex.

---

## Lab — Email Validator (20 min)

**Challenge:** write a prompt that generates an email-validation function.

- **Language:** TypeScript
- **Edge cases:** plus-addressing, subdomains
- **Returns:** `{ valid: boolean, reason?: string }`
- **Include:** test cases

<!-- vertical -->

## Then: Iterate & Document

1. Run your prompt
2. Find issues in the output
3. Add constraints to fix them
4. Run again — repeat until satisfied

**Document:** What issues did you find? What changes fixed them? How many iterations?

<!-- vertical -->

## Share

We'll discuss **2–3 of the best prompts**.

- What made prompts better?
- Which patterns did you use?
- What's still hard?

---

# Wrap-Up

<!-- vertical -->

## What to Remember

1. **Tokens & context** — put the important stuff first.
2. **Lazy genius** — be specific; verify everything.
3. **Right harness for the task** — Claude Code is our spine.
4. **Prompts:** Context · Task · Format · Constraints · Examples.

<!-- vertical -->

## Before Session 2 (pre-work)

- **Install & authenticate Claude Code** (`npm i -g @anthropic-ai/claude-code`).
- **Clone the Linkstash starter repo** and run the smoke test.
- Stuck? Come to the 15-min office hours before S2.

> Next time: **make the agent remember your project** — memory, context & modes.

---

<!-- .slide: id="thanks" -->

## See you in Session 2

**Driving Claude Code: Context, Memory & Modes**

<small>[johnguerra.co](http://johnguerra.co/)</small>
