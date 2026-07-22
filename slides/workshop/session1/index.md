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

LLMs don't see characters or words — they see **tokens**, sub-word chunks from a BPE tokenizer.

```text
"unhappiness"  →  ["un", "happ", "iness"]
"def foo():"   →  ["def", " foo", "()", ":"]
```

Code tokenizes *differently* than prose — indentation, brackets, camelCase all cost tokens.

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

<!-- vertical -->

<!-- .slide: class="dense" -->

## Statelessness & the Context Window

The model has **no memory**. The illusion of memory = the harness **re-sends the whole conversation** every request.

```text
┌─────────────── CONTEXT WINDOW ───────────────┐
│  [system prompt]                             │
│  [turn 1: user]                              │
│  [turn 1: assistant]                         │
│  [turn 2: user]                              │
│  [... everything so far ...]                 │
│  [current user message]                      │
└──────────────────────────────────────────────┘
                     │
                     ▼   predict next token
```

> The model is stateless. The **harness** carries the state forward.

<!-- vertical -->

## From Raw Completion to Assistant

A base model just *continues* text. Two tricks turn it into an assistant:

```text
<|system|>You are a helpful coding assistant.<|end|>
<|user|>Write a function to reverse a string.<|end|>
<|assistant|>
```

**(1)** A **chat template** makes assistant-like text the likeliest completion.
**(2)** **RLHF / instruction tuning** makes helpful, honest answers more probable.

> Same mechanism — we only changed the prefix.

<!-- vertical -->

## The Conceptual Ladder

```text
  5 │ LOOP ENGINEERING    (optimize the harness)   │
  4 │ AGENTIC LOOP        (think → act → observe)   │
  3 │ TOOLS               (model → JSON → env runs) │
  2 │ CONTEXT ENGINEERING (what goes in the window) │
  1 │ INSTRUCTION FOLLOW  (the system prompt)       │
  0 │ NEXT-TOKEN PREDICT  (the transformer)         │
```

An agent isn't a new kind of AI — it's **layer 0** with cleverer context + a loop.

> This whole workshop climbs the ladder.

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

<!-- vertical -->

<!-- .slide: class="dense" -->

## The Model Emits Text. The Harness Acts.

The model can't touch your terminal, files, or the web. It only emits **text**.

When Claude Code "reads your file":

1. Model emits text *describing* a read request
2. The **harness** (a normal program) parses it
3. The harness calls the OS to read the file
4. The harness puts the contents **back into the context**
5. Next turn, the model sees them as input

> The model never touched your disk. A program did — because the model asked.

<!-- vertical -->

<!-- .slide: class="dense" -->

## A Tool = Schema + Implementation + Wiring

A "tool" is a contract between model and harness:

1. **Schema** — machine-readable description + arguments (JSON Schema)
2. **Implementation** — actual code that performs the action
3. **Wiring** — how the model *requests* it, how the harness *returns* the result

The schema is **injected into the context window** — that's how the model "knows" the tool exists.

> It knows the tool the same way it knows anything: it's in the context.

<!-- vertical -->

## The Tool Schema (what the model sees)

```json
{
  "name": "read_file",
  "description": "Read a file from the local filesystem. Use before editing a file.",
  "input_schema": {
    "type": "object",
    "properties": {
      "path": { "type": "string", "description": "Absolute path to the file." }
    },
    "required": ["path"]
  }
}
```

> The `description` field is prompt engineering — it decides tool selection.

<!-- vertical -->

## Think → Act → Observe

```python
# context = [user_message]   ← setup elided
while True:
    resp = model.create(tools=SCHEMAS, messages=context)
    context.append(resp)                # the request
    calls = [b for b in resp.content
             if b.type == "tool_use"]
    if not calls:
        return resp                     # done — no tool call
    for c in calls:
        out = TOOLS[c.name](**c.input)  # HARNESS runs it
        context.append(out)             # observation back in
```

> Each lap appends an observation — that's how a *stateless* model makes progress.

<!-- vertical -->

## The Loop Is the Memory

- **Think** — the model emits a tool call
- **Act** — the *harness* runs the function
- **Observe** — the result is appended to context
- Loop until there's no tool call

> The model is stateless; the **loop is its memory**.

<!-- vertical -->

## Modifying the Environment

Reading is safe. The power *and* danger = tools that **change state**:

```python
def write_file(path, content):
    open(path, "w").write(content)
    return f"wrote {path}"

def run_bash(command):
    r = subprocess.run(command, shell=True,
                       capture_output=True, text=True)
    return r.stdout + r.stderr
```

Once `run_bash` exists, the model can run **arbitrary commands** — so the harness pauses to ask.

<!-- vertical -->

<!-- .slide: class="dense" -->

## The Permission Gate

```text
   model emits write_file(...)
             │
             ▼
   ┌────────────────────────┐
   │  HARNESS PERMISSION     │ ← "Allow edit to auth.ts? [y/N]"
   │  GATE                   │
   └────────────────────────┘
        │approved       │denied
        ▼               ▼
    execute         "user denied"  → back into context
```

Even a **denial** goes back into context — the model reasons about it and adapts.

> The approval gate lives in the *harness*, not the model.

<!-- vertical -->

## Two Ways to "Call" a Tool

**(a) Structured tool calling** — the model emits a JSON `tool_use` block; the API routes it. (Anthropic, OpenAI.)

**(b) Code-as-action** — the model writes *code* that calls tools; the harness runs it. One block chains many calls:

```python
# One code block instead of 4 JSON calls + 4 round-trips:
files = list_dir("src/")
for f in files:
    if f.endswith(".test.js"):
        run_bash(f"npx jest {f}")
```

> Different action representations reshape the loop — a preview of loop engineering.

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

<!-- vertical -->

## One Design Space, Three Dials

Not three technologies — **three settings of the same dials**:

```text
 human-in-loop  ◀──────────────────────────▶  autonomous
 low tool power ◀──────────────────────────▶  high tool power

 Claude Web          Cursor              Claude Code
 (conversation)      (IDE-native)        (terminal agent)
```

- **How auto-managed** is the context?
- **How autonomous** is the loop?
- **How much human** per lap?

<!-- vertical -->

<!-- .slide: class="dense" -->

## The Dials, Side by Side

| Dial | Claude Web | Cursor | Claude Code |
|---|---|---|---|
| Who closes the loop | Human | Human + agent | Agent |
| Context mgmt | Manual (+Projects) | Vector retrieval + `.cursorrules` | `CLAUDE.md` + cache + subagents |
| Tool power | Sandboxed | Editor + shell (scoped) | Full local: files, shell, MCP |
| Latency priority | Low | **Very high (Tab)** | Throughput over latency |
| Sweet spot | Think / plan / learn | Daily coding | Autonomous multi-step |

<!-- vertical -->

## Same Engine, Different Dials

- Same **engine** — tokens (Part 1)
- Same **tool mechanism** — schema + harness execution
- Same **context assembly** — stuff the window every call
- Same **loop** — think → act → observe

> The products differ only in *how they set the dials.*

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

<!-- vertical -->

## The Frontier: Prompt → Context → Loop

The object of engineering keeps moving up the ladder:

- **Prompt** engineering — craft the message
- **Context** engineering — curate the window
- **Loop** engineering — optimize the loop itself

```text
 inner loop:  think → act → observe          (one task)
 outer loop:  run tasks → analyze traces → rewrite the harness
```

> From the message, to the window, to the loop.

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
