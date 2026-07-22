# Module 04 — Agentic Loops, MCP, and the Three Tools Dissected

> **Goal of this module:** Put it all together. Show the agentic loop as the natural consequence of Modules 01–03, introduce MCP as the standardization layer for tools, and then dissect Claude Web, Cursor, and Claude Code as three different points in the same design space.

---

## 4.1 The agentic loop = tools + memory-via-context + a stopping condition

Once you have (a) next-token prediction, (b) a harness that manages context, and (c) tools the harness can execute, an **agent** falls out almost for free. An agent is just this loop run until a goal is met:

```
        ┌──────────────────────────────────────────┐
        │                                          │
        ▼                                          │
   ┌─────────┐    ┌─────────┐    ┌──────────────┐  │
   │  THINK  │───▶│   ACT   │───▶│   OBSERVE    │──┘
   │ (model  │    │ (harness│    │ (result back │
   │ reasons)│    │ runs a  │    │  into        │
   │         │    │  tool)  │    │  context)    │
   └─────────┘    └─────────┘    └──────────────┘
        │
        │ goal met? / no tool call?
        ▼
     ┌──────┐
     │ DONE │
     └──────┘
```

This is the **ReAct** pattern (Reason + Act). The model reasons about what to do, the harness performs the action, the result is observed (appended to context), and the model reasons again with new information. A long Claude Code session is hundreds of trips around this loop.

**The whole course-relevant point:** each lap adds an observation to the context window (Module 03), which is *how the agent "makes progress"* despite being stateless (Module 01). The loop is the memory.

### Planning variants (worth naming)
- **ReAct:** interleave reasoning and single actions. Simple, robust.
- **Plan-and-Execute:** model first writes a multi-step plan, then executes steps. Better for long horizons.
- **Hierarchical / subagents:** a parent agent spawns child agents for subtasks, each with its *own* context window. Claude Code (2026) supports parent agents spawning children several levels deep. This is a context-management strategy: subagents keep the parent's window clean by doing detailed work in a separate context and returning only a summary.

```
        parent agent  (high-level goal, clean context)
        ├── subagent A  ("run the test suite, report failures")   ← own window
        ├── subagent B  ("refactor module X")                     ← own window
        └── subagent C  ("verify the app end-to-end")             ← own window
```

---

## 4.2 MCP — standardizing where tools come from

In Module 02, tools were hardcoded into the harness. That doesn't scale: every tool builder would have to integrate with every agent separately (an M×N problem).

**MCP (Model Context Protocol)** solves this. It's an open standard (introduced by Anthropic in late 2024, now widely adopted) that defines a *universal way for a harness to discover and call tools that live in a separate process or server.*

Key facts to teach:
- MCP uses **JSON-RPC 2.0** as its wire format.
- It has a **client–host–server** architecture: the host (Claude Code, Cursor, Claude Desktop) runs an MCP *client* per connected *server*; each server exposes tools/data.
- Transports: **stdio** (local subprocess — great for dev) and **HTTP/SSE** (remote servers).
- A server exposes two main capability types: **tools** (functions the model can call to take action, e.g. `query_db`) and **resources** (readable data/context, e.g. a schema or document).

```
   ┌─────────────── HOST (e.g. Claude Code) ───────────────┐
   │   MCP client ──JSON-RPC──▶  MCP server (GitHub)       │
   │   MCP client ──JSON-RPC──▶  MCP server (Postgres)     │
   │   MCP client ──JSON-RPC──▶  MCP server (filesystem)   │
   └────────────────────────────────────────────────────────┘
```

**Why it matters conceptually:** MCP turns "the set of tools the model can use" into something *pluggable*. From the model's point of view nothing changed — it still just sees tool schemas in its context (Module 03) and emits tool-call JSON (Module 02). MCP is a standardization of *how those schemas get into the harness and how calls get routed out.* The mechanism from Module 02 is unchanged; MCP is the distribution layer.

> **Historical note for students:** MCP is already "old" by AI-field standards (2024). Its rapid, ecosystem-wide adoption is itself the lesson: standardizing the tool interface unlocked an explosion of integrations, because tool builders write one MCP server instead of N integrations.

---

## 4.3 The three tools as one design space

Now dissect the three modalities from the syllabus. Frame them not as three different technologies but as **three settings of the same dials**: how much context is auto-managed, how autonomous the loop is, how much the human is in each lap.

```
 human-in-loop ◀─────────────────────────────────────▶ autonomous
 low tool power ◀────────────────────────────────────▶ high tool power

 Claude Web            Cursor                    Claude Code
 (conversation)        (IDE-native)              (terminal agent)
```

### (a) Claude Web — conversation + artifacts
- **Loop shape:** mostly single-turn think, human drives each lap. The "agent loop" is *you*: you read the output, decide, paste back.
- **Context:** you manually curate it (paste code, use Projects to persist context across a project's chats). Artifacts persist a generated document/app you iterate on.
- **Tools:** limited/sandboxed (code execution, web search) — it generally can't touch your local machine.
- **Best for:** architecture planning, learning, brainstorming — exactly where a clean, human-paced loop beats autonomy.
- **Under the hood:** system prompt + your messages + (optional) project context + artifact state, assembled server-side. Same context-window story as Module 03; the human closes the loop.

### (b) Cursor — IDE-native, latency-optimized
Cursor is the interesting middle: it solves three engineering problems simultaneously.
- **Tab / autocomplete:** a *purpose-built, proprietary model* (not a general chat model) optimized for low-latency **edit prediction** — it can rewrite the current line, update a renamed variable across the file, not just append text. Speculative-decoding tricks reuse your existing source to skip most generation work, so the suggestion arrives before your next keystroke. Backend handles on the order of a million completion queries/second.
- **Chat / Composer:** for multi-file changes, this is the Module 02 tool loop plus Module 03 context assembly. Cursor indexes your repo into a **vector database**; on a request it retrieves the relevant slices via nearest-neighbor search rather than dumping the whole codebase.
- **`.cursorrules`:** the project-instruction layer from Module 03 — prepended to requests.
- **Best for:** daily professional coding, staying in the editor.
- **Teaching hook:** contrast the *two different models* inside one product — a fast sparse model for Tab, a frontier model for Composer. Great illustration that "AI IDE" ≠ one model.

### (c) Claude Code — the terminal agent
The fullest expression of Modules 01–04.
- **Loop shape:** long-horizon autonomous ReAct. One prompt → hundreds of think/act/observe laps: read files, edit, run tests, read failures, fix, re-run, commit.
- **Core abstraction:** *everything is a Tool* with a uniform interface (schema, permissions, execution). New capabilities plug in without changing the loop — the clean architecture point from the deep-dives.
- **Context:** `CLAUDE.md` for project instructions; file-state caching; automatic compaction as history grows; **subagents** (§4.1) to keep the main window clean; MCP (§4.2) for external tools.
- **Safety:** permission gates (Module 02 §2.4), scoped short-lived tokens, background handling of long-running tool calls, per-session caps (e.g. on web-search calls and subagent spawns).
- **Best for:** automation, multi-file refactors, DevOps, migrations — anywhere autonomy across many steps pays off.

### Side-by-side

| Dial | Claude Web | Cursor | Claude Code |
|---|---|---|---|
| Who closes the loop | Human | Human + agent (Composer) | Agent |
| Context management | Manual (+Projects) | Vector retrieval + `.cursorrules` | `CLAUDE.md` + cache + subagents |
| Tool power | Sandboxed | Editor + shell (scoped) | Full local: files, shell, MCP |
| Latency priority | Low | **Very high (Tab)** | Low (throughput over latency) |
| Sweet spot | Think / plan / learn | Daily coding | Autonomous multi-step work |

**Punchline:** same engine (Module 01), same tool mechanism (Module 02), same context-assembly principle (Module 03), same loop (Module 04). The products differ only in *how they set the dials.* Once students see this, every future tool becomes legible — they just ask: how does it manage context, what tools does it expose, how autonomous is its loop?

---

## 4.4 Loop engineering — the next level up

The frontier framing you wanted to gesture at: **prompt → context → loop engineering.**

Once the loop itself is the unit of work, you start optimizing *the loop*, not just the prompt or the context:
- Tuning *when* to spawn subagents vs. stay single-context.
- Deciding *when to compact/summarize* history.
- Choosing action representation (JSON tool calls vs. code-as-action, Module 02 §2.5).
- Adding an **outer loop**: analyze traces of past runs (what tools were called, where it failed) and automatically rewrite the harness config — prompts, tool descriptions, permissions — to make future runs better. The return arrow reaches *inside* and edits the agent loop itself.

```
  inner loop:  think → act → observe        (one task)
  outer loop:  run many tasks → analyze traces → rewrite the harness
               (prompts, tool defs, when-to-subagent)  → better inner loop
```

This is where the field is heading in 2026 and a strong note to end the lecture on: **the object of engineering is moving from the message, to the window, to the loop.**

---

## 4.5 Check-for-understanding

1. In what precise sense is "the loop the agent's memory"?
2. MCP didn't change how the model calls tools. So what *did* it change, and why did that matter?
3. Why does Cursor use a different model for Tab than for Composer?
4. How do subagents help with the finite-context-window problem from Module 03?
5. Give an example of a loop-engineering change that is neither a prompt change nor a context change.

---

## TODO / next-pass items
- [ ] Optional live demo: point Claude Code (or the open-weights Qwen agent via an MCP/terminal harness) at a repo and narrate each think/act/observe lap on screen.
- [ ] Add one worked MCP server example (e.g. a 20-line `query_db` server) if time allows.
- [ ] Reveal.md slide breaks — deferred to the other repo's guidance.
