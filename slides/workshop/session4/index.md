---
title: "Workshop S4 — MCP, Subagents & Security"
theme: white
revealOptions:
  transition: convex
  hash: true
  history: true
---

<!-- .slide: id="title" -->

<span class="course-week">Workshop · Session 4 of 4</span>

## Agentic Engineering

### Connect, Delegate *&* Defend

Extensibility II + Security Capstone

[**John Alexis Guerra Gomez**](http://johnguerra.co/)

<small>A hands-on workshop on AI-assisted software engineering</small>

---

# Today's Agenda

1. **Recap** — from building to connecting & securing
2. **MCP servers** — give the agent real tools
3. **Subagents & parallel work** — delegate to specialists
4. **Plugins** — the packaging story (awareness)
5. **Security** — the payoff: audit & defend
6. **Oral-defense capstone** — explain the code you shipped

<small>Project: **Linkstash** — a small link-saver we'll now connect and secure.</small>

---

# Recap — Where We Are

> S1 fundamentals · S2 memory & modes · S3 spec → TDD → build.

<!-- vertical -->

## From Building to Connecting

You can now make the agent **build** — with tests and skills.

Two things are still missing:

- The agent is **sandboxed** — it can't reach your DB, browser, or APIs.
- The agent **wrote code you haven't audited** — including Linkstash.

> Today: **connect** it to real tools, then **defend** what it wrote.

---

<!-- .slide: class="divider" -->

# Part 1 — MCP Servers

> Give the agent hands. Same model, more reach.

---

## MCP = the USB-C of AI

**One protocol** to connect the agent to external tools & data.

<pre class="mermaid">
flowchart LR
  CC[Claude Code] <--> M[MCP Server]
  M <--> S[External Service<br/>DB · Browser · API]
</pre>

Before USB-C, every device had its own plug. MCP is the **standard port** — write once, connect anything.

<!-- vertical -->

<!-- .slide: class="dense" -->

## The M×N Problem MCP Solves

Without a standard, **N agents × M tools = N×M** bespoke integrations.

<div class="columns">
<div class="column">

**Before MCP**

<pre class="mermaid">
%%{init: {'theme':'default','flowchart':{'nodeSpacing':15,'rankSpacing':20}}}%%
flowchart LR
  A1[Agent] --> T1[GitHub]
  A1 --> T2[Postgres]
  A2[Agent] --> T1
  A2 --> T2
</pre>

Every pair wired by hand.

</div>
<div class="column">

**With MCP**

<pre class="mermaid">
%%{init: {'theme':'default','flowchart':{'nodeSpacing':15,'rankSpacing':20}}}%%
flowchart LR
  A1[Agent] --> M{{MCP}}
  A2[Agent] --> M
  M --> T1[GitHub]
  M --> T2[Postgres]
</pre>

One server, any client.

</div>
</div>

> N+M plugs instead of N×M. Tools become **pluggable**.

<!-- vertical -->

<!-- .slide: class="dense" -->

## How MCP Works

**Client–host–server** — the host runs one MCP *client* per connected server:

<pre class="mermaid">
%%{init: {'theme':'default','flowchart':{'nodeSpacing':12,'rankSpacing':45}}}%%
flowchart LR
  H["Host · Claude Code<br/>(1 client per server)"] -->|JSON-RPC| G[GitHub server]
  H -->|JSON-RPC| P[Postgres server]
  H -->|JSON-RPC| F[filesystem server]
</pre>

Wire format **JSON-RPC 2.0** · transports **stdio** (local) & **HTTP/SSE** (remote).

> One client per server; each server exposes its own capabilities.

<!-- vertical -->

## Tools vs. Resources

A server exposes two kinds of capability:

| Capability | What it is | Example |
|---|---|---|
| **Tools** | callable **actions** the model invokes | `query_db(sql)` |
| **Resources** | readable **data / context** | a schema, a doc |

- **Tools** *do* things — run and return a result.
- **Resources** *are* things — data the model reads into context.

> Actions vs. context: a server can offer both.

<!-- vertical -->

## Cross-Vendor Infrastructure

In 2026, MCP is **not** an Anthropic-only feature.

- An **open protocol** adopted across vendors and IDEs.
- Servers you write work with any MCP-speaking client.
- Growing ecosystem: browsers, databases, filesystems, SaaS.

> Learn it once; reuse it everywhere.

---

## Adding a Server

One command wires a server into Claude Code:

```bash
claude mcp add playwright -- npx -y @playwright/mcp
claude mcp add postgres   -- npx -y @modelcontextprotocol/server-postgres
claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem ./data
```

```bash
claude mcp list          # what's connected
```

> The agent now sees these tools in its loop — no code change.

<!-- vertical -->

## Share With Your Team

Commit a `.mcp.json` so teammates get the same tools:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"]
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": { "DATABASE_URL": "${DATABASE_URL}" }
    }
  }
}
```

> Check it into the repo — onboarding becomes "clone & go".

---

<!-- .slide: class="dense" -->

## Optional — A Minimal Server (JS)

A server is just a program that registers **tools**:

```js
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const server = new McpServer({ name: "linkstash", version: "1.0.0" });

server.tool(
  "count_links",
  "Count saved links for a user",
  { userId: z.string() },
  async ({ userId }) => ({
    content: [{ type: "text", text: String(await db.count(userId)) }]
  })
);
```

> A tool = name + description + schema + handler. That's it.

<!-- vertical -->

## The Real Aha

MCP **didn't change how the model calls tools**.

- The model still just sees **tool schemas** in its context…
- …and still emits **tool-call JSON** (Session 1's mechanism).
- MCP standardized the **distribution** — how schemas get *in*, how calls get routed *out*.

> Tool builders write **one** MCP server, not **N** integrations. That's the whole win.

---

<!-- .slide: class="divider" -->

# Part 2 — Subagents & Parallel Work

> Delegate to a specialist instead of doing it all in one thread.

---

<!-- .slide: class="dense" -->

## Skills vs. Subagents

- **Skills are recipes** — reusable instructions in *your* context.
- **Subagents are specialists** — a *separate* agent with its own context window and job.
- Each does its detailed work in that **own** window and returns only a **summary** — keeping the parent's context clean.

<pre class="mermaid">
flowchart LR
  Main[Main agent] -->|delegates| Sub[Subagent<br/>own context]
  Sub -->|report| Main
</pre>

> Delegate to keep the main thread clean and focused.

<!-- vertical -->

## Defining One

A subagent is a Markdown file: YAML frontmatter, then a prompt body.

```yaml
# .claude/agents/security-reviewer.md  (between --- fences)
name: security-reviewer
description: Audits code for security issues
isolation: worktree   # optional — run in an isolated copy
```

Below the frontmatter, the body is the specialist's **system prompt**.

---

<!-- .slide: class="dense" -->

## A Real `security-reviewer`

After the `name` / `description` frontmatter, the body is the prompt:

```markdown
## Role
Security engineer reviewing agent-written code.

## Instructions
1. Read the diff and changed files.
2. Check: secrets, injection, authz, untrusted input, exfiltration.
3. Map findings to the lethal trifecta (private / untrusted / external).

## Output
Per finding: [HIGH | MEDIUM | LOW] — file:line — issue — fix.
End with a one-line ship / don't-ship call.
```

> Invoke on demand; it reports HIGH/MEDIUM/LOW findings.

---

## The Writer / Reviewer Pattern

<pre class="mermaid">
flowchart LR
  W[Writer<br/>builds feature] --> R[Reviewer<br/>audits]
  R --> V[Revise]
  V --> H[Human review]
</pre>

One agent writes, a **different** agent reviews with fresh eyes.

> **Never skip the human step.** Two AIs agreeing is not verification.

<!-- vertical -->

## Parallel Work — Worktrees

Isolated tasks, no stepping on each other:

```bash
claude --worktree     # run this session in its own git worktree
```

- Each task gets its **own branch + working copy**.
- Run several in parallel; merge the good ones.

> Great for "try three approaches" or writer/reviewer side-by-side.

---

<!-- .slide: class="divider" -->

# Part 3 — Plugins (Awareness)

> Not a lab — the packaging story for later.

---

## What Is a Plugin?

A plugin is a **shareable bundle** of the pieces you've learned:

| Piece | What it adds |
|---|---|
| **Skill** | reusable slash commands |
| **Hook** | deterministic automation |
| **MCP** | external tool connections |

> One install gives a teammate your whole workflow.

<!-- vertical -->

## Putting It Together

Everything lives under `.claude/`:

```text
.claude/
  skills/          # /commands (recipes)
  agents/          # subagents (specialists)
  settings.json    # hooks (lifecycle automation)
.mcp.json          # external tools (team-shared)
CLAUDE.md          # project memory
```

> This layout **is** the packaging story. Full plugins = further study.

---

<!-- .slide: class="divider" -->

# Part 4 — Security: The Payoff

> This is *why* quality matters. Now we audit what we built.

---

## Humility Anchor — Veracode

Callback from Session 1:

- Only **~55%** of AI-generated code passes security checks…
- …despite **>95%** syntactic correctness.
- **Larger models are not more secure** — capability ≠ safety.

> Functional ≠ secure. It runs *and* fails the audit.

---

## Slopsquatting

Callback from Session 1's **hallucinations** — now weaponized.

- The agent invents a plausible **package name** that doesn't exist.
- **~1 in 5** package suggestions may not be real.
- Attackers **register the fake names** and fill them with malware.

> A hallucinated `import` becomes a supply-chain attack.

<!-- vertical -->

## Defenses

| Defense | Why it works |
|---|---|
| **Registry verification** | confirm the package actually exists |
| **Lockfiles + hash checks** | pin known-good versions in CI |
| **Allowlists** | only approved dependencies build |
| **Flag new packages** | registered in last **30–90 days** = suspect |

> Never let a fresh, unheard-of package into `main` unverified.

---

## Lab — Audit Your Linkstash

Run the toolchain on your own repo:

```bash
gitleaks detect --source .     # secrets
npm audit                      # dependencies
semgrep --config auto src/     # SAST
```

**Debrief:** *Would you have caught these without the tools?*

> The scarce skill is verification — the tools scale it.

---

## The Lethal Trifecta

Simon Willison's exfiltration recipe — all three = risk:

<pre class="mermaid">
flowchart LR
  P[Private data] --> X((Exfiltration<br/>risk))
  U[Untrusted content] --> X
  E[External comms] --> X
</pre>

Any single one is fine. **Together**, an attacker can read your data and send it out.

<!-- vertical -->

## Linkstash Has All Three

By design — that's why it's our lab:

| Trifecta leg | In Linkstash |
|---|---|
| **Private data** | your private notes |
| **Untrusted content** | it **fetches arbitrary URLs** |
| **External comms** | the **share / export** feature |

> A poisoned page you save could exfiltrate your notes on export.

---

## Meta's Rule of Two

> An agent should satisfy **at most two** of the three legs **without human approval**.

- All three at once → **stop and require a human**.
- Use it as a design gate, not an afterthought.

**Apply to Linkstash:** gate **share / export** behind a **human checkpoint** — breaking the third leg from running autonomously.

---

<!-- .slide: class="divider" -->

# Part 5 — Oral-Defense Capstone

> Never ship code you can't explain.

<!-- vertical -->

## The Exercise (pairs)

Each participant gives a **5-minute defense** of a piece of agent-written code.

Cover three things:

1. **What** it does.
2. **Why** it's built that way.
3. **Where** it could bite — the failure modes.

<!-- vertical -->

## Why This Matters

- If you can't explain it, you can't **verify** it.
- Your partner is the **fresh-eyes reviewer** — the human step, live.
- This is the habit that survives every model upgrade.

> The deliverable of AI coding isn't code. It's **understanding you can defend.**

---

<!-- .slide: class="divider" -->

# Part 6 — Your AI-Use Framework

> Leave with a personal policy, not just techniques.

<!-- vertical -->

## Worksheet — Answer for Yourself

1. **When** will you use AI — and when **not**?
2. **How** will you verify its output every time?
3. What's your **no-AI practice** to keep the skill sharp?

> Write it down. Revisit it in three months.

---

## Further Study

Where to go after this workshop:

| Topic | What's there |
|---|---|
| **Agent SDK** | build agents in code; the **6 agent patterns** |
| **Production** | deploy, monitoring, **RAG**, cost optimization |
| **Full plugins** | package & distribute your workflow |

<!-- vertical -->

## Resources

- **MCP** — modelcontextprotocol.io
- **Security** — [Veracode GenAI Code Security Report](https://www.veracode.com/blog/genai-code-security-report/)
- **Lethal trifecta** — Simon Willison's blog
- **Tools** — Gitleaks · `npm audit` · Semgrep
- **More** — [johnguerra.co](http://johnguerra.co/)

---

<!-- .slide: id="thanks" -->

## Thank You

**You can now build, connect, delegate — and defend.**

<small>Speed *with* quality. Verify everything.</small>

<small>[johnguerra.co](http://johnguerra.co/)</small>
