# How the Harness Works — Quick Card

*Agentic Engineering workshop · Foundations*

> Everything is **next-token prediction + a harness + a loop.** Understand this and the whole tool stack stops being magic.

## The ladder (bottom → top)

Each rung adds one capability and keeps standing on the one below it.

| # | Layer | What it adds |
|---|---|---|
| 0 | **Next-token prediction** | the transformer — it only continues text |
| 1 | **Instruction following** | chat template + RLHF make "assistant" the likely completion |
| 2 | **Tools** | the model emits JSON; the *harness* executes it |
| 3 | **Context / harness** | assemble the whole window, every request |
| 4 | **Agentic loop + MCP** | think → act → observe; standardized tools |
| 5 | **Loop engineering** | optimize the loop itself |

## A tool is three things

- **Schema** — the name + JSON params the model can see.
- **Implementation** — the actual code that runs.
- **Wiring** — the harness runs it and feeds the result back.

> The model never *does* anything. It only emits text that *asks* for an action. The **harness** does the doing.

## The agentic loop

```text
think → act (call a tool) → observe (result) → … → stop
```

An agent = **tools + memory-via-context + a stopping condition.** Loop until the goal is met or a limit is hit.

## What the harness assembles every turn

1. **System prompt** — identity, tool policy, safety
2. **Project instructions** — `CLAUDE.md` / rules files
3. **Tool schemas** — what it's allowed to call
4. **Retrieved context** — `@`-mentioned files, search hits
5. **Conversation history** — every prior turn + tool result
6. **Current message**

> The model is **stateless** — the entire window is re-sent on every request. That's why context is *engineered*, not assumed.

## The three harnesses — one design space

Same loop underneath; they differ in how much of it they run for you.

| Harness | You get | Best for |
|---|---|---|
| **Claude Web** | chat + artifacts, no repo tools | thinking, architecture, learning |
| **Antigravity** | IDE in the loop, edits your files | daily production code |
| **Claude Code** | full agentic loop + tools + MCP | automation, agents, extensibility |

## Prompt → Context → Loop engineering

- **Prompt engineering** — word *one* message well.
- **Context engineering** — decide what the model sees *at all*.
- **Loop engineering** — optimize the surrounding loop.

> The scarce skill isn't typing. It's **shaping the context and the loop — then verifying the output.**
