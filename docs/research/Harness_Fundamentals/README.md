# CS 7180 — Agentic Coding From First Principles

Lecture knowledge base: how AI coding tools (Claude Web, Cursor, Claude Code) work under the hood, built up from a raw LLM. Markdown now; Reveal.md slides later (from the separate slides repo).

## The through-line
Everything is **next-token prediction + a harness + a loop**. Each module climbs one rung and keeps referring back down.

```
  05  LOOP ENGINEERING        ── optimize the loop itself (Module 04 §4.4)
  04  AGENTIC LOOP + MCP       ── think→act→observe; standardized tools
  03  CONTEXT / HARNESS        ── assemble the window every request
  02  TOOLS                    ── model emits JSON, harness executes
  01  INSTRUCTION FOLLOWING    ── system prompt + chat template + RLHF
  00  NEXT-TOKEN PREDICTION    ── the transformer (Module 01)
```

## Modules
| File | Covers |
|---|---|
| `01-fundamentals-llm-to-agent.md` | Next-token prediction, tokens, context window, instruction following, the conceptual ladder |
| `02-tool-execution.md` | The model only emits text; harness executes. Schema + impl + wiring. The think/act/observe loop. Env modification, permissions, code-as-action |
| `03-context-and-harness.md` | How system prompt + CLAUDE.md/.cursorrules + tools + files + history assemble into one window every turn. Context engineering |
| `04-agentic-loops-mcp-and-the-three-tools.md` | ReAct/subagents, MCP, Claude Web vs Cursor vs Claude Code as one design space, loop engineering |
| `CONTINUATION-system-prompt.md` | Paste into a fresh Claude chat/Project to keep building |

## Suggested teaching order
Modules are sequential — each depends on the prior. A natural single-lecture arc:
1. **Hook:** raw Qwen completion (it's just autocomplete) → Module 01
2. **Reveal:** the model can't *do* anything → Module 02 (the loop)
3. **Answer the FAQ:** "how does CLAUDE.md work?" → Module 03
4. **Synthesize:** agents, MCP, and why the three tools differ → Module 04
5. **End on the frontier:** prompt → context → loop engineering

## Open TODOs (aggregated)
- [ ] Wire the **Qwen** demo into §1.1, §1.4 (raw autoregression) and §2.6/§4 (drive the tool loop)
- [ ] Add Tiktokenizer + embedding-projector screenshots (Module 01)
- [ ] Example abbreviated `CLAUDE.md` + token-budget math (Module 03)
- [ ] One worked MCP server (~20 lines) if time (Module 04)
- [ ] Reveal.md slide breaks — deferred to the slides repo
