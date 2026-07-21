---
title: "CS 6983: Claude Code Extensibility — Skills, MCP, Hooks & Sub-agents"
theme: white
revealOptions:
  transition: convex
  hash: true
  history: true
---

<!-- .slide: id="title" -->

<span class="course-week">CS 6983 · Week 11</span>

## Claude Code Extensibility

Skills · Hooks · MCP · Sub-agents

<img src="../img/seal_logotype-768x252.png" alt="Northeastern University" width="400">

[**John Alexis Guerra Gomez**](http://johnguerra.co/)

<small>jguerra at northeastern.edu · [Class](https://johnguerra.co/classes/aiCoding_fall_2026/) · [Slides](https://johnguerra.co/lectures/aiCoding_fall2026/11_Claude_Code_Extensibility/)</small>

<small class="cc-license">© 2026 John A. Guerra Gómez · Licensed <a href="https://creativecommons.org/licenses/by-nc/4.0/">CC BY-NC 4.0</a></small>

---

# What We'll Cover Today

1. Where We Are -- Week 11 checkpoint
2. Skills & Custom Commands
3. Hooks Deep Dive
4. MCP Servers
5. Custom Sub-agents
6. Parallel Development with Worktrees
7. Agent Teams (Experimental)
8. Code Review for AI-Generated Code
9. Hands-on Lab

---

# Where We Are

> Week 11 -- Extending Claude Code for team-scale development

<!-- vertical -->

## Recap: Weeks 9-10

**Week 9:** Claude Code foundations -- agentic loop, CLAUDE.md, tools, permissions, context management

**Week 10:** Workflows -- Explore-Plan-Implement-Commit, TDD, Git/GitHub integration, CI/CD, non-interactive mode

**You know how Claude Code works and how to use it.** Now you learn to _extend_ it for your team's specific needs.

<!-- vertical -->

## This Week: Extensibility & Parallel Work

**Today's focus: making Claude Code do what you need**

- **Skills** -- reusable slash commands for your team
- **Hooks** -- deterministic automation at lifecycle points
- **MCP servers** -- connecting Claude Code to external tools
- **Sub-agents** -- specialized AI reviewers, auditors, test writers
- **Parallel development** -- multiple agents working simultaneously
- **Code review** -- reviewing AI-generated code with the C.L.E.A.R. framework

All of these directly support your **P3 Sprint 2** work.

---

# Skills & Custom Commands

> Reusable workflows your whole team shares

<!-- vertical -->

## What Are Skills?

Skills are directories in `.claude/skills/` that teach Claude Code **how to perform specific tasks**.

```text
your-project/
  .claude/
    skills/
      fix-issue/
        SKILL.md           <-- "/fix-issue" slash command
      deploy/
        SKILL.md           <-- "/deploy" slash command
      add-component/
        SKILL.md           <-- "/add-component" slash command
```

When you type `/fix-issue`, Claude Code loads the `SKILL.md` and follows its instructions.

<!-- vertical -->

## Anatomy of a Skill File

<!-- .slide: class="dense" -->

<pre><code class="yaml">---​
name: fix-issue
description: Fix a GitHub issue: branch, implement, test, PR.
disable-model-invocation: true
---​

Fix GitHub issue $ARGUMENTS:

1. Read issue details from GitHub
2. Create branch fix/{issue-number}
3. Implement following project conventions
4. Write/update tests for changed code
5. Run test suite to verify
6. Create PR linking to the issue

Constraints:
- Never modify unrelated files
- Always include a test for the fix
</code></pre>

<!-- vertical -->

## Skills vs CLAUDE.md

<!-- .slide: class="dense" -->

| Aspect | CLAUDE.md | Skills |
|--------|-----------|--------|
| **Loaded** | Every session, automatically | On demand, when invoked |
| **Purpose** | Project context and rules | Task-specific workflows |
| **Scope** | Universal project knowledge | One specific workflow |
| **Triggered by** | Auto-loaded | `/command` or auto-matched |
| **Best for** | Conventions, architecture | Repeatable multi-step tasks |

**Rule of thumb:** If Claude should _always_ know it, put it in CLAUDE.md. If it's a _specific workflow_, make it a skill.

<!-- vertical -->

## Invocation: Auto vs Manual

Skills can be triggered two ways:

**Auto-invoked:** Claude matches your prompt to the skill description. "Create a Button component" may trigger an `add-component` skill automatically.

**Manual only:** Add `disable-model-invocation: true` to the skill's YAML frontmatter. This ensures the skill only runs when you explicitly type `/deploy`.

Use this for potentially destructive operations like deployment, database migrations, or cleanup tasks where you want explicit human intent.

<!-- vertical -->

## Sharing Skills Across Teams

Skills are committed to your repo in `.claude/skills/`. This means:

- **Every team member** gets the same workflows
- **New members** ramp up instantly -- `/fix-issue` works the same for everyone
- **Skills evolve** via pull requests, just like code
- **Skills are versioned** in git history

```bash
git add .claude/skills/fix-issue.md
git commit -m "Add fix-issue skill for standardized bug fix workflow"
```

Your team's best practices are encoded as repeatable, shareable commands.

---

# Hooks Deep Dive

> Deterministic automation at lifecycle points

<!-- vertical -->

## What Are Hooks?

Hooks run **shell commands** at specific points in Claude Code's lifecycle. Unlike CLAUDE.md instructions (which are advisory), hooks are **deterministic** -- they always execute.

```text
Advisory (CLAUDE.md):
  "Please run prettier after editing files"
  --> Claude might forget

Deterministic (Hook):
  PostToolUse -> run prettier
  --> Always runs, every time
```

<!-- vertical -->

## Hook Lifecycle Events

Three hook events you can tap into:

```text
  Think --> PreToolUse --> Execute Tool
                              |
                          PostToolUse
                              |
                    More work? --Yes--> Think
                              |
                             No
                              v
                            Stop
```

- **PreToolUse** -- before a tool (Read, Edit, Bash) runs
- **PostToolUse** -- after a tool completes
- **Stop** -- agent is about to give its final response

<!-- vertical -->

## Configuring Hooks

Hooks live in `.claude/settings.json`:

```json
{ "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "command": "npx prettier --write $CLAUDE_FILE_PATH"
    }],
    "PreToolUse": [{
      "matcher": "Edit",
      "command": "bash .claude/hooks/check-protected.sh"
    }]
} }
```

The `matcher` filters which tool triggers the hook. Without a matcher, the hook runs for every tool call.

<!-- vertical -->

## Exit Codes

Hook exit codes control what happens next:

<!-- .slide: class="dense" -->

| Exit Code | Meaning | Effect |
|-----------|---------|--------|
| **0** | Success | Continue normally |
| **2** | Block with feedback | Tool call is blocked; stdout is shown to Claude as feedback |
| **Non-zero (other)** | Error | Hook failure is reported, execution continues |

Exit code 2 is powerful -- it lets hooks **reject actions** and explain why.

<!-- vertical -->

## Hook Examples

**Auto-format on edit** (PostToolUse hook):

```json
{ "matcher": "Edit|Write",
  "command": "npx prettier --write $CLAUDE_FILE_PATH" }
```

**Block edits to protected files** (PreToolUse hook, exit code 2):

```bash
#!/bin/bash
# .claude/hooks/check-protected.sh
PROTECTED=(".env" ".env.local" "secrets.json")
for p in "${PROTECTED[@]}"; do
  if [[ "$CLAUDE_FILE_PATH" == *"$p"* ]]; then
    echo "BLOCKED: Cannot edit $p."; exit 2
  fi
done
exit 0
```

Exit code 2 blocks the edit and feeds the message back to Claude. Exit code 0 means continue.

<!-- vertical -->

## Hooks vs CLAUDE.md

<!-- .slide: class="dense" -->

| Aspect | CLAUDE.md | Hooks |
|--------|-----------|-------|
| **Enforcement** | Advisory -- Claude _should_ follow | Deterministic -- always executes |
| **Mechanism** | Natural language instructions | Shell commands |
| **Reliability** | ~90% (can be forgotten) | 100% (guaranteed) |
| **Best for** | Style, conventions, preferences | Formatting, linting, access control |
| **Feedback** | Claude reads and interprets | Exit codes and stdout |

**Use CLAUDE.md** for guidelines. **Use hooks** for rules that must never be broken.

---

# MCP Servers

> The "[USB-C of AI](https://www.anthropic.com/news/model-context-protocol)" -- connecting Claude Code to everything

<!-- vertical -->

## What Is MCP?

**Model Context Protocol** -- a standard for connecting AI tools to external data and services.

<pre class="mermaid">
%%{init: {'theme': 'default', 'flowchart': {'nodeSpacing': 20, 'rankSpacing': 30}}}%%
flowchart LR
    A["Claude Code"] <-->|"JSON"| B["MCP Server"]
    B <-->|"API"| C["External Service"]
    B --- D["DBs, Figma, Slack, Jira..."]
</pre>

MCP servers translate between Claude Code's tool-use protocol and external APIs. Claude Code calls MCP tools just like its built-in tools.

<!-- vertical -->

## Why MCP Matters

Without MCP:

```text
You: "What tables exist in our database?"
You: *open pgAdmin, run query, copy results*
You: *paste into Claude Code*
```

With MCP:

```text
You: "What tables exist in our database?"
Claude: *calls PostgreSQL MCP server*
Claude: "Your database has 12 tables..."
```

MCP eliminates the copy-paste loop between Claude Code and external tools.

<!-- vertical -->

## Adding an MCP Server

```bash
# Add a server for the current project
claude mcp add postgres -- \
  npx @anthropic/mcp-server-postgres \
  --connection-string "$DATABASE_URL"

# Add a Playwright server for browser testing
claude mcp add playwright -- \
  npx @anthropic/mcp-server-playwright

# Add a Figma server
claude mcp add figma -- \
  npx @anthropic/mcp-server-figma \
  --token "$FIGMA_TOKEN"
```

Servers run as child processes. Claude Code discovers their tools automatically.

<!-- vertical -->

## .mcp.json for Team Sharing

Share MCP configurations via `.mcp.json` in your repo:

```json
{ "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["@anthropic/mcp-server-postgres",
        "--connection-string", "$DATABASE_URL"] },
    "playwright": {
      "command": "npx",
      "args": ["@anthropic/mcp-server-playwright"] }
} }
```

Commit to git -- every teammate gets the same MCP connections automatically.

<!-- vertical -->

## E2E Testing with Playwright MCP

<!-- .slide: class="dense" -->

E2E tests verify **user stories**, not functions. Each acceptance criterion (W11) becomes a browser-level test:

| Issue #15 Acceptance Criteria | Playwright Test |
|-------------------------------|-----------------|
| ☐ Search by name returns partial matches | `test('search filters by name')` |
| ☐ No results shows "No users found" | `test('shows empty state message')` |

**AI-assisted workflow:** Describe the user flow → Claude Code writes the Playwright test → runs it via MCP → sees browser results → fixes failures.

**CI tip:** E2E tests run last — unit tests catch most bugs faster.

<!-- vertical -->

## E2E Testing with Playwright MCP

```javascript
// tests/e2e/search.spec.ts
import { test, expect } from '@playwright/test';

test('search filters by name', async ({ page }) => {
  await page.goto('/users');
  await page.fill('[data-testid="search"]', 'alice');
  await expect(page.locator('.user-card')).toContainText('Alice');
  await expect(page.locator('.user-card')).not.toContainText('Bob');
});
```

<!-- vertical -->

## Visual Regression Testing with Vitest

<!-- .slide: class="dense" -->

Vitest 4.0's Browser Mode enables **screenshot-based regression testing** — catch styling bugs that unit and E2E tests miss:

```javascript
import { test, expect } from 'vitest';
import { page } from '@vitest/browser/context';

test('dashboard renders correctly', async () => {
  await page.goto('/dashboard');
  await expect(page.elementLocator('.dashboard'))
    .toMatchScreenshot('dashboard.png');
});
```

**How it works:** First run saves a baseline screenshot. Future runs compare pixel-by-pixel and fail on visual differences.

**Why it matters for AI coding:** AI gets logic right but can break styling — visual tests catch what unit tests can't.

<small>Source: [Vitest Visual Regression Testing](https://vitest.dev/guide/browser/visual-regression-testing)</small>

<!-- vertical -->

## Tool Search: Scaling MCP

When you add many MCP servers, their **tool definitions consume context**.

Claude Code activates **Tool Search** automatically when tool definitions exceed ~10% of the context window.

```text
Before Tool Search:
  All tool definitions loaded in context
  (hundreds of tools = thousands of tokens)

With Tool Search:
  Tools indexed separately
  Claude queries for relevant tools on demand
  Only matched tools enter context
```

You don't need to configure this -- it activates automatically as you add more MCP servers.

<!-- vertical -->

## Building a Simple MCP Server

An MCP server exposes tools via the MCP protocol:

```javascript
import { McpServer } from
  "@modelcontextprotocol/sdk/server";
const server = new McpServer({ name: "my-tools" });

server.tool("get_user_count",
  "Returns the number of registered users",
  {}, async () => {
    const count = await db.users.count();
    return { content: [{ type: "text",
      text: `There are ${count} users.` }] };
});
```

This course's own Canvas integration uses a custom MCP server (`tools/canvas-extras-mcp/`).

---

# Custom Sub-agents

> Specialized AI workers with isolated context

<!-- vertical -->

## What Are Sub-agents?

Sub-agents are **specialized Claude Code instances** defined in `.claude/agents/`:

```text
.claude/
  agents/
    security-reviewer.md
    test-writer.md
    docs-updater.md
```

Each sub-agent has its own **instructions, constraints, and context window**. They're like specialized teammates you can call on.

<!-- vertical -->

## Anatomy of a Sub-agent

Sub-agent files live in `.claude/agents/` with YAML frontmatter specifying `name` and `isolation`.

Example: `security-reviewer.md` with frontmatter `name: security-reviewer` and `isolation: worktree`

The body contains the role, instructions, and output format:

- **Role:** Review code for security vulnerabilities
- **Instructions:** Check for SQL injection, XSS, CSRF, input validation, hardcoded secrets, dependency CVEs
- **Output:** Checklist with severity ratings (HIGH/MED/LOW)

Sub-agents get their own context window and can operate in an isolated worktree.

<!-- vertical -->

## isolation: worktree

The `isolation: worktree` setting gives the sub-agent its own **git worktree** -- a separate working directory.

```text
Main worktree:     ~/project/          (your work)
Sub-agent worktree: ~/project/.claude/
                      worktrees/security-reviewer/
                                       (agent's sandbox)
```

**Why isolation?**

- Sub-agent edits don't interfere with your work
- Multiple sub-agents can run in parallel
- Each gets its own branch and file state
- Failed experiments are easily discarded

<!-- vertical -->

## When to Use Sub-agents vs Skills

<!-- .slide: class="dense" -->

| Feature | Skills | Sub-agents |
|---------|--------|------------|
| **Runs in** | Your main context | Isolated context window |
| **File access** | Your working tree | Own worktree (if isolated) |
| **Best for** | Defined step-by-step workflows | Open-ended review, analysis |
| **Context** | Shares your context | Has its own context |
| **Example** | "Deploy to production" | "Review this PR for security" |

**Skills** are recipes. **Sub-agents** are specialists.

---

# Parallel Development with Worktrees

> Multiple Claude Code instances working simultaneously

<!-- vertical -->

## The --worktree Flag

```bash
claude --worktree
```

Creates a **new git worktree** in `.claude/worktrees/` with its own branch. Claude Code works there without touching your main working directory.

```text
~/project/                    (main worktree -- your code)
~/project/.claude/worktrees/
  feature-auth/               (worktree 1 -- auth feature)
  feature-search/             (worktree 2 -- search feature)
  fix-header-bug/             (worktree 3 -- bug fix)
```

All worktrees share the same git history but have independent file states.

<!-- vertical -->

## Pattern 1: Multiple Terminals

Open several terminal windows, each running Claude Code on a different task:

```text
Terminal 1: claude --worktree
  > "Implement the user profile API endpoint"

Terminal 2: claude --worktree
  > "Add search functionality to the product list"

Terminal 3: claude --worktree
  > "Fix the header layout bug on mobile"
```

Each works in its own worktree. Merge results via git when done.

<!-- vertical -->

## Pattern 2: Competitive Solutions

Ask two agents to solve the **same problem** independently, then compare:

```text
Terminal 1: claude --worktree
  > "Implement caching for the API using Redis"

Terminal 2: claude --worktree
  > "Implement caching for the API using
  >  in-memory LRU cache"
```

Review both solutions. Pick the better one. Discard the other.

Useful when you're unsure about the right approach.

<!-- vertical -->

## Patterns 3 & 4: Background & Specialists

<!-- .slide: class="dense" -->

**Background orchestration:** Fire-and-forget with `run_in_background`:

```text
> Run a sub-agent in the background to add
> comprehensive tests for the auth module.
> I'll keep working on the API routes.
```

**Specialist sub-agents:** Combine sub-agents with worktrees:

```text
Main session:     "Working on the checkout flow"
Background 1:     security-reviewer (vulnerabilities)
Background 2:     test-writer (tests for new code)
Background 3:     docs-updater (API documentation)
```

Each specialist has its own context and worktree. Results merge back via git.

<!-- vertical -->

## Best Practices for Parallel Work

<!-- .slide: class="dense" -->

1. **Scope tasks clearly** -- each agent needs a well-defined goal
2. **Avoid file conflicts** -- don't assign overlapping files to parallel agents
3. **Start with 2-3 agents** -- scale up as you build confidence
4. **Review before merging** -- parallel work needs careful integration
5. **Use Plan mode first** -- have each agent plan before implementing

**For P3 pairs:** 2 teammates, each running 5-6 tasks in parallel. That's 10-12 parallel workstreams -- coordinate via your scrumboard.

---

# Agent Teams (Experimental)

> Multi-agent coordination with a team lead

<!-- vertical -->

## What Are Agent Teams?

An experimental feature where **multiple Claude Code instances** coordinate through a team lead:

`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`

<pre class="mermaid">
%%{init: {'theme': 'default', 'flowchart': {'nodeSpacing': 20, 'rankSpacing': 30}}}%%
flowchart TD
    A["Team Lead"] --> B["Agent 1: Auth"]
    A --> C["Agent 2: Search"]
    A --> D["Agent 3: Tests"]
</pre>

The team lead breaks down tasks, assigns them to agents, and coordinates results.

<!-- vertical -->

## How Agent Teams Work

Each agent has an **independent context window**, its own **worktree**, and an **assigned scope**. Communication happens through the team lead, not directly between agents.

**Good fit:** Large features with separable sub-tasks, independent modules

**Poor fit:** Tightly coupled code, small tasks where coordination overhead exceeds benefit

**Remember: This is experimental.** Expect rough edges. Use worktrees and sub-agents for production workflows today.

---

# Code Review for AI-Generated Code

> Reviewing AI code requires different skills than reviewing human code

<!-- vertical -->

## Why AI Code Review Is Different

AI-generated code has **specific failure patterns** that human code doesn't:

**Research findings (ClackyAI study):**
- **1.57x** more security issues than human-written code
- **2.74x** more cross-site scripting (XSS) vulnerabilities
- **1.91x** more insecure direct object references

<small>Source: [Code Review Checklist for AI-Generated Code](https://clacky.ai/blog/code-review-checklist-ai-generated-code) — ClackyAI</small>

The code _looks_ correct. It passes a quick scan. But it hides subtle issues.

<!-- vertical -->

## AI-Specific Pitfalls

**False confidence:** AI code is well-formatted and commented, creating an illusion of quality. Reviewers let their guard down.

**Hallucinated APIs:** The AI calls functions or methods that don't exist. Simon Willison notes these are actually "[the least dangerous](https://simonwillison.net/2025/Mar/2/hallucinations-in-code/)" kind of hallucination -- they cause immediate, visible errors.

**Duplicate logic:** Without global project awareness, AI generates redundant implementations -- multiple versions of the same utility (e.g., email validation, date formatting) scattered across the codebase.

**Stale patterns:** AI may use deprecated APIs or outdated patterns from its training data.

<!-- vertical -->

## The C.L.E.A.R. Framework

<!-- .slide: class="dense" -->

A structured approach to reviewing AI-generated code:

**C -- Context:** Does this code fit the project's architecture and conventions?

**L -- Logic:** Is the business logic correct? Are edge cases handled?

**E -- Evidence:** Are there tests? Do they actually verify the behavior?

**A -- Architecture:** Does it follow established patterns? Any new dependencies?

**R -- Risk:** Security issues? Performance concerns? Data exposure?

<!-- vertical -->

## C.L.E.A.R. in Practice

<!-- .slide: class="dense" -->

| Step | What to Check | AI-Specific Risk |
|------|---------------|------------------|
| **Context** | Fits conventions? Uses right patterns? | AI may invent its own conventions |
| **Logic** | Edge cases? Error handling? | AI often handles happy path only |
| **Evidence** | Tests exist? Tests are meaningful? | AI writes tests that pass but don't verify behavior |
| **Architecture** | Follows patterns? No new deps? | AI adds unnecessary libraries |
| **Risk** | SQL injection? XSS? Auth checks? | 1.57x more security issues |

<!-- vertical -->

## The Writer/Reviewer Pattern

Use Claude Code itself as part of the review process:

1. **WRITE** -- Agent 1 implements the feature
2. **REVIEW** -- Agent 2 (sub-agent) reviews using C.L.E.A.R.
3. **REVISE** -- Agent 1 addresses findings
4. **HUMAN REVIEW** -- You review the final result

**Never skip Step 4.** AI reviewing AI is useful but not sufficient. A human must sign off.

<!-- vertical -->

## PR Metadata for AI Code

Add transparency to your pull requests:

```markdown
### AI Disclosure
- **% AI-generated:** ~80%
- **AI tool:** Claude Code
- **Human review:** Yes, C.L.E.A.R. applied
- **Security check:** Input validation verified,
  no raw SQL, auth middleware confirmed
```

Including a "% AI-generated" field helps reviewers know where to focus their attention.

<!-- vertical -->

## Putting It All Together

<!-- .slide: class="dense" -->

```text
.claude/
  skills/fix-issue.md       Standardized workflows
  agents/security-reviewer.md   Specialized reviewers
  settings.json              Hooks for formatting/linting
.mcp.json                   Shared MCP server config
CLAUDE.md                   Project context & conventions
```

**The full workflow:**
1. Pick issue from scrumboard
2. `claude --worktree` then `/fix-issue #42`
3. Hooks auto-format on every edit
4. MCP servers provide DB schema, test data
5. Sub-agent reviews for security
6. `/create-pr` -- teammate reviews with C.L.E.A.R.
7. Merge and move issue to Done

---

# Hands-on Lab

> Build your extensibility toolkit

<!-- vertical -->

## Exercise 1: Build a Custom Skill (15 min)

Create a skill in `.claude/skills/` for your P3 project (e.g., `add-api-route.md`). Include a description, step-by-step instructions, project conventions, and constraints. Test it by typing the slash command in Claude Code.

<!-- vertical -->

## Exercise 2: Configure Hooks (10 min)

Add a PostToolUse hook that runs Prettier on `Edit|Write`, and a PreToolUse hook that blocks edits to `.env` files (exit code 2).

Configure in `.claude/settings.json`. Verify by editing a file and confirming Prettier runs automatically.

<!-- vertical -->

## Exercise 3: Connect an MCP Server (10 min)

Add an MCP server to your project (Playwright, filesystem, or database). Use `claude mcp add` and verify by asking Claude Code to use the connected service. Add the config to `.mcp.json` for your team.

<!-- vertical -->

## Exercise 4: Parallel Development Sprint (15 min)

Split your team and run parallel agents:

```text
Teammate A: claude --worktree
  > "Implement [feature from scrumboard]"

Teammate B: claude --worktree
  > "Implement [different feature]"

Teammate C: claude --worktree
  > "Write tests for [existing module]"
```

After 15 minutes: review, resolve conflicts, merge.

---

# This Week's Deliverables

<!-- vertical -->

## Due This Week

**HW5: Custom Skill + MCP Integration**
- Create a custom skill for your P3 project
- Connect at least one MCP server
- Configure at least one hook
- Document your extensibility setup in CLAUDE.md

**Weekly Quiz 12** -- Claude Code Extensibility concepts

**P3 Sprint 2** -- continue sprint work with your team

---

# Next Week Preview

## Week 12: Agent Architectures & Agent SDK

- **Agent fundamentals** -- agent vs workflow, augmented LLM
- **Anthropic's 6 agent patterns** -- chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer, autonomous
- **Claude Agent SDK** -- Python/TypeScript, query(), hooks, sessions
- **Multi-agent coordination** and safety
- **Real-world agent examples**

---

# Resources

<!-- vertical -->

## Required Reading

<!-- .slide: class="dense" -->

| Resource | URL |
|----------|-----|
| Claude Code in Action (MCP, Hooks & SDK) | [anthropic.skilljar.com/claude-code-in-action](https://anthropic.skilljar.com/claude-code-in-action) |
| Skills Documentation | [code.claude.com/docs/en/skills](https://code.claude.com/docs/en/skills) |
| Hooks Documentation | [code.claude.com/docs/en/hooks](https://code.claude.com/docs/en/hooks) |
| MCP Servers Documentation | [code.claude.com/docs/en/mcp](https://code.claude.com/docs/en/mcp) |
| Sub-agents Documentation | [code.claude.com/docs/en/sub-agents](https://code.claude.com/docs/en/sub-agents) |

<!-- vertical -->

## Recommended Reading

<!-- .slide: class="dense" -->

| Resource | URL |
|----------|-----|
| MCP Specification | [modelcontextprotocol.io](https://modelcontextprotocol.io/) |
| MCP GitHub Repository | [github.com/modelcontextprotocol](https://github.com/modelcontextprotocol) |
| Playwright MCP Server | [github.com/anthropics/mcp-servers/tree/main/playwright](https://github.com/anthropics/mcp-servers/tree/main/playwright) |
| Claude Code Plugins | [code.claude.com/docs/en/plugins](https://code.claude.com/docs/en/plugins) |
