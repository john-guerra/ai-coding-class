# Module 03 — The Harness and Context Assembly

> **Goal of this module:** Answer the question you specifically wanted covered — *how do the system prompt, the `CLAUDE.md` file, `.cursorrules`, tool definitions, and conversation history all get combined and sent to the model on every request?* The answer is: the harness assembles them into one big context window, every single turn.

---

## 3.1 What "the harness" actually is

The harness is the program you're really talking to. When you run `claude` in your terminal or type in Cursor, you are not talking to the model directly — you're talking to a piece of software that:

1. Collects everything the model should know (instructions, files, history, tools).
2. Assembles it into a single context payload.
3. Sends it to the model API.
4. Receives the model's output.
5. Executes any tool calls (Module 02).
6. Loops.

```
     YOU
      │  "fix the failing test"
      ▼
┌──────────────────────────── THE HARNESS ────────────────────────────┐
│                                                                      │
│  gathers →  system prompt                                            │
│             CLAUDE.md / .cursorrules   (project instructions)        │
│             tool schemas               (what actions are available)  │
│             retrieved code context     (relevant files)             │
│             conversation history       (everything so far)          │
│             your new message                                        │
│                                                                      │
│  assembles all of it into ONE context window                        │
│                            │                                         │
│                            ▼                                         │
│                    [ send to model ]                                 │
│                            │                                         │
│                            ▼                                         │
│                    receive output → execute tools → loop            │
└──────────────────────────────────────────────────────────────────────┘
```

The model is stateless and passive. **The harness is where all the intelligence about *what to show the model* lives.** That decision — what to put in the window — is *context engineering*.

---

## 3.2 What gets assembled into every request

This is the concrete answer to your question. On **each** turn, the harness builds a context that looks roughly like this:

```
┌─────────────────────── CONTEXT WINDOW (every request) ────────────────┐
│                                                                        │
│  1. SYSTEM PROMPT                                                      │
│     "You are Claude Code, an agentic coding assistant..."             │
│     (defines identity, behavior, tool-use policy, safety rules)       │
│                                                                        │
│  2. PROJECT INSTRUCTIONS  ← CLAUDE.md / .cursorrules / AGENTS.md      │
│     "This project uses TypeScript. Always write tests.                │
│      Use pnpm not npm. Follow the existing folder structure."         │
│                                                                        │
│  3. TOOL SCHEMAS                                                       │
│     read_file, write_file, run_bash, ... (JSON Schema, Module 02)    │
│                                                                        │
│  4. RETRIEVED / ATTACHED CONTEXT                                       │
│     Contents of relevant files, @-mentioned files, search results    │
│                                                                        │
│  5. CONVERSATION HISTORY                                               │
│     Every prior user msg, assistant msg, and tool result this session│
│                                                                        │
│  6. CURRENT USER MESSAGE                                               │
│     "fix the failing test"                                            │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
                          predict next token
```

Two consequences students must internalize:

- **`CLAUDE.md` / `.cursorrules` is not magic configuration.** It is *text prepended to your prompt on every request.* That's the entire mechanism. It "works" because the model reads it as part of its input, exactly like the system prompt.
- **Everything competes for the same finite window.** A 2,000-line `CLAUDE.md` eats into the budget available for actual code context — on every single call. This is why the 2026 guidance converged on short, disciplined instruction files (community/Anthropic guidance lands around "keep it under ~150–200 lines; if a line wouldn't change the model's behavior, delete it"). Bloated instruction files also cause important rules to get "lost" among the noise.

> **The test for every line in `CLAUDE.md`:** *"Would removing this line make the model make a mistake?"* If not, cut it. This is context-window economics, not style preference.

---

## 3.3 Why the file has to be re-sent every time

Beginners assume the model "loads" `CLAUDE.md` once, like reading a config file at startup. It doesn't. Because the model is stateless (Module 01), the *only* way for it to obey those rules on turn 12 is for the harness to include them in the context on turn 12.

```
Turn 1:  [system][CLAUDE.md][tools][history so far][msg1]  → response
Turn 2:  [system][CLAUDE.md][tools][history so far][msg2]  → response
Turn 3:  [system][CLAUDE.md][tools][history so far][msg3]  → response
          ▲          ▲
          └──────────┴── re-sent EVERY turn. The model has no memory of them.
```

Every rule, every prior message, is re-transmitted on every round trip. The "session" is an illusion maintained by the harness re-stuffing the window.

---

## 3.4 Context engineering: the discipline

Because the window is finite and everything competes for it, the harness must be *selective and strategic* about what it includes. This is the shift the field named explicitly:

```
  prompt engineering   →   context engineering   →   loop engineering
  (word the request     (curate the whole          (optimize the
   well)                 window: what to include,    surrounding loop
                         retrieve, compress,         itself — §Module 05)
                         and in what order)
```

Concrete context-engineering moves a harness makes:

- **Retrieval instead of dumping.** Don't paste the whole repo. Embed the codebase into a vector store, and on each request retrieve only the files relevant to the query (nearest-neighbor search). Cursor does exactly this — it indexes your code as vectors and pulls the relevant slices.
- **Ordering.** Information at the beginning and end of a long context is attended to more reliably than the middle ("lost in the middle"). Harnesses place critical instructions accordingly.
- **Compression / summarization.** When history grows past the window, the harness summarizes older turns instead of dropping them blindly.
- **Scoping.** `@file`, `@folder` mentions in Cursor are the *user* doing manual context engineering — explicitly telling the harness what to retrieve.

> **Framing for students:** prompt engineering is wording one message well. Context engineering is deciding *what the model gets to see at all.* The second is far more powerful and is where most real-world agent quality comes from.

---

## 3.5 System prompt vs. project instructions vs. user message

Students conflate these. Disambiguate clearly:

| Layer | Who writes it | Scope | Example |
|---|---|---|---|
| **System prompt** | The tool builder (Anthropic, Cursor) | Every conversation in that product | "You are Claude Code. You have these tools. Follow these safety rules." |
| **Project instructions** (`CLAUDE.md`, `.cursorrules`, `AGENTS.md`) | The developer, per repo | Every request *in that project* | "Use TypeScript strict mode. Tests required. pnpm only." |
| **User message** | The end user, per turn | This one turn | "Fix the failing auth test." |

All three end up concatenated into the same window. The model doesn't fundamentally distinguish "system" from "user" text except insofar as the chat template and training taught it to weight them differently. The *separation is a harness convention*, collapsed into one token stream at send time.

---

## 3.6 Check-for-understanding

1. Your `.cursorrules` says "always use TypeScript," yet on turn 20 the model writes JavaScript. Given the stateless model, name two context-related causes.
2. Why does adding 1,500 lines to `CLAUDE.md` potentially make the agent *worse*, not just slower?
3. What does Cursor's vector index buy you that pasting the whole repo into the prompt does not?
4. In what sense is `@file` a manual form of context engineering?

---

## TODO / next-pass items
- [ ] Add a real (abbreviated) example `CLAUDE.md` and show how it gets prepended.
- [ ] Diagram the "lost in the middle" attention curve for §3.4.
- [ ] Optional: show token-budget math (window size − system − rules − history = room for code).
