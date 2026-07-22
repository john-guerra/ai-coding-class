# Module 01 — From Next-Token Prediction to Agents

> **Goal of this module:** Establish the single mechanism that everything else is built on. By the end, students should understand that Claude Code, Cursor, and the Claude web interface are all the *same* underlying operation — next-token prediction — wrapped in progressively more sophisticated scaffolding.

---

## 1.1 The one thing an LLM actually does

Strip away every product, every interface, every "agent." Underneath, a large language model does exactly one thing:

> **Given a sequence of tokens, predict a probability distribution over the next token.**

That's it. Everything else — chat, tool use, autonomous coding — is engineering built on top of this single primitive.

```
Input tokens:  ["The", " capital", " of", " France", " is"]
                                │
                                ▼
                    ┌───────────────────────┐
                    │   Transformer model    │
                    └───────────────────────┘
                                │
                                ▼
Output: probability distribution over the ENTIRE vocabulary
        " Paris"   → 0.87
        " a"       → 0.04
        " located" → 0.02
        " the"     → 0.01
        ... (50,000+ other tokens, each with some probability)
```

The model picks a token (how it picks is the *sampling* step — temperature, top-p), appends it to the input, and **runs the whole thing again**. This is *autoregression*: the output becomes the next input.

```
Step 1: ["The","capital","of","France","is"]           → " Paris"
Step 2: ["The","capital","of","France","is"," Paris"]   → "."
Step 3: [... " Paris","."]                              → "<end>"
```

**Teaching note / demo hook (Qwen):** This is the ideal place to show the bare-bones Qwen model completing text. Let students watch it literally predict one token at a time with no chat formatting, no system prompt — just raw completion. It makes the "it's just autocomplete" claim visceral before we complicate it.

---

## 1.2 Tokens, not words

Models don't see words or characters — they see **tokens**, which are sub-word chunks produced by a tokenizer (BPE — byte-pair encoding).

```
"unhappiness"  →  ["un", "happ", "iness"]
"def foo():"   →  ["def", " foo", "()", ":"]
```

**Why this matters for a coding course specifically:**
- Code tokenizes *differently* than prose. Indentation, brackets, and camelCase all consume tokens in ways that affect model behavior.
- Historically GPT-2 handled Python whitespace poorly *because of tokenization* — every space was its own token. Modern tokenizers group whitespace, yielding large efficiency gains for code.
- Token count = cost and context budget. Students need to feel that "context window" is measured in tokens, not characters or lines.

**Demo hook:** Tiktokenizer (tiktokenizer.vercel.app) live in class — paste a Python function and show how it fragments. Compare prose vs. code.

---

## 1.3 The context window: the model's entire universe

The model has **no memory**. None. It does not "remember" your last message.

The illusion of memory is created by **re-sending the entire conversation** on every single request. The context window is the maximum number of tokens the model can accept as input at once.

```
┌─────────────────────── CONTEXT WINDOW ───────────────────────┐
│  [system prompt]                                              │
│  [conversation turn 1: user]                                  │
│  [conversation turn 1: assistant]                             │
│  [conversation turn 2: user]                                  │
│  [... everything so far ...]                                  │
│  [current user message]                                       │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    predict next token
```

**This is the single most important idea for understanding agents.** Every "smart" behavior later in the course — a coding agent that remembers what file it edited three steps ago — is achieved by *stuffing that history back into the context window on every call*. The model is stateless; the **harness** maintains the state.

> **Key vocabulary introduced here — "harness":** the surrounding program that assembles the context, sends it to the model, receives the output, and decides what to do next. We will return to this word constantly.

---

## 1.4 From raw completion to an instruction-following assistant

A base model trained only on next-token prediction will happily continue text, but it won't "answer questions" or "follow instructions" in a helpful way. If you type a question, it might continue with *more questions* — because that's a plausible continuation of the text pattern.

Two things convert a raw completion engine into an assistant:

### (a) A chat template / preface
The harness wraps your input in a structured format the model was trained to recognize:

```
<|system|>You are a helpful coding assistant.<|end|>
<|user|>Write a function to reverse a string.<|end|>
<|assistant|>
```

That trailing `<|assistant|>` is the crucial trick. The model is *still just predicting the next token* — but now the most probable continuation, given this format, is a helpful assistant response. **We have not changed the mechanism. We have changed the prefix.**

> This is the concept from the earlier chatbot material: you create a preface so the model "knows" it's in a conversation. It doesn't *know* anything — the preface makes assistant-like text the likeliest completion.

### (b) Post-training (RLHF / instruction tuning)
The base model is further trained on examples of good instruction-following, and tuned with human (or AI) feedback so that helpful, harmless, honest completions become more probable. This is *why* the modern model reliably acts like an assistant instead of rambling.

```
Base model:        predicts plausible text
        + chat template     → looks like a conversation
        + instruction tuning → reliably acts as an assistant
        + RLHF/RLAIF         → aligned to be helpful/harmless
= the "model" you interact with in a product
```

---

## 1.5 The conceptual ladder for the whole lecture

Everything from here builds upward. Post this early and refer back to it:

```
     ┌────────────────────────────────────────────┐
  5  │  LOOP ENGINEERING  (optimize the harness)   │
     ├────────────────────────────────────────────┤
  4  │  AGENTIC LOOP  (think → act → observe)      │
     ├────────────────────────────────────────────┤
  3  │  TOOLS  (model outputs JSON → env executes) │
     ├────────────────────────────────────────────┤
  2  │  CONTEXT ENGINEERING  (what goes in window) │
     ├────────────────────────────────────────────┤
  1  │  INSTRUCTION FOLLOWING  (system prompt)     │
     ├────────────────────────────────────────────┤
  0  │  NEXT-TOKEN PREDICTION  (the transformer)   │
     └────────────────────────────────────────────┘
```

The punchline students should leave with: **A coding agent is not a fundamentally different kind of AI. It is next-token prediction (layer 0) with increasingly clever context management and an execution loop wrapped around it (layers 1–5).**

---

## 1.6 Check-for-understanding questions

1. If the model is stateless, how does Claude Code "remember" the file it edited two steps ago?
2. Why can the exact same model behave as a chatbot in one product and an autonomous coder in another?
3. Why does temperature only matter at the sampling step and not inside the transformer's forward pass?
4. Why does a bloated `CLAUDE.md` or `.cursorrules` file cost you something on *every* request?

---

## TODO / next-pass items
- [ ] Insert the live Qwen bare-bones completion demo at §1.1 (raw autoregression) and §1.4 (show what happens *without* a chat template).
- [ ] Add Tiktokenizer screenshots for §1.2.
- [ ] Decide reveal.md slide breaks (deferred — other repo will guide).
