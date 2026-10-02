---
title: "CS 6983: Building with Claude Web Artifacts"
theme: white
revealOptions:
  transition: convex
  hash: true
  history: true
---

<!-- .slide: id="title" -->

<span class="course-week">CS 6983 · Week 5 · [Class](https://johnguerra.co/classes/aiCoding_fall_2026/) · [Slides](https://johnguerra.co/lectures/aiCoding_fall2026/05_Claude_Web_Projects/)</span>

## Building with Claude Web Artifacts

### Projects · Mockups · Data · AI Features

<div class="title-footer">

**John Alexis Guerra Gómez** · [johnguerra.co](http://johnguerra.co/)

<small>jguerra at northeastern.edu · Northeastern University · Khoury College</small>

<img src="../img/seal_logotype-768x252.png" alt="Northeastern University" class="nu-seal">

<small class="cc-license">© 2026 John A. Guerra Gómez · Licensed <a href="https://creativecommons.org/licenses/by-nc/4.0/">CC BY-NC 4.0</a></small>

</div>

---

# What We'll Cover Today

1. Where We Are -- Claude Web Deep Dive
2. Building Full Projects with Artifacts
3. Providing Mockups to Claude
4. Data Persistence in Artifacts
5. Adding AI Features to Artifacts
6. Debugging Claude Artifacts
7. Project 1 Workshop

---

# Where We Are

> Week 5 -- Deep into the Claude Web harness

<!-- vertical -->

## The Three Harnesses

<!-- .slide: class="dense" -->

|  | **Claude Web** | **Antigravity** | **Claude Code** |
| --- | --- | --- | --- |
| **When** | Weeks 2-5 | Weeks 6-11 | Week 7+ |
| **Best For** | Architecture, research, prototyping | Production code, daily workflow | Automation, multi-file refactoring |
| **Analogy** | Whiteboard with a mentor | Pair programmer in your editor | Build crew that follows blueprints |

Each harness builds on the last -- you don't stop using Claude Web when you start Antigravity.

<!-- vertical -->

## Where We Are Now

**Week 5 -- Claude Web Deep Dive**

- You've learned how LLMs work (Week 2)
- You've practiced prompt engineering (Week 3)
- You've done user research & prototyping (Week 4)
- **Today:** Building real projects with Artifacts

**Coming up:**

- **Week 6:** Antigravity -- AI moves into your editor
- **Week 7:** Claude Code -- AI works autonomously in your terminal

<!-- vertical -->

## Project 1 Status

**Sprint 1 is active** -- Implementation begins

- You have your PRD and user stories
- You know your target users (Mom Test)
- **Today** you'll build with Artifacts for real

---

# Building Full Projects with Artifacts

> Beyond prototypes -- building real apps

<!-- vertical -->

## Artifacts Are More Than Demos

Last week: quick prototypes and explorations

**This week: full project development**

- Multi-component applications
- Persistent data and state management
- AI-powered features inside your app
- Iterative development workflow

<!-- vertical -->

<!-- .slide: class="dense" -->

## Artifacts Changed on Sept 16, 2026

Artifacts made in a chat before that date are now **legacy** — they still work, but you can't make new ones. Tutorials and blog posts from before then often describe legacy behavior.

| | Legacy (before Sept 16) | New artifacts |
| --- | --- | --- |
| Storage | Only after publishing | Works without publishing |
| Sharing | "Publish" — public link | "Share" — starts private |
| Calling Claude | Off-switch in Settings → Capabilities | Asks permission on first use |
| Viewers | No account needed | Everyone needs a Claude account |

<small>Source: [What are artifacts](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them) · [Publish and share artifacts](https://support.claude.com/en/articles/9547008-share-artifacts)</small>

<!-- vertical -->

## Project Structure in Claude Web

**Think of your project as a conversation arc:**

1. **Project setup** -- Create a Claude Project with context
2. **Architecture first** -- Ask Claude to plan before building
3. **Component-by-component** -- Build incrementally
4. **Iterate** -- Refine through conversation

<!-- vertical -->

## Claude Projects for Persistent Context

**Why Projects matter for P1:**

- Upload your PRD, user stories, and architecture docs
- Claude remembers your project context across conversations
- Add custom instructions for coding style & conventions
- Build a knowledge base that grows with your project

<!-- vertical -->

## Setting Up Your P1 Knowledge Base

<div class="columns">
<div class="column">

**What to upload:**

- Your PRD document
- User stories & acceptance criteria
- Architecture decisions
- Design mockups & wireframes
- Reference code or API docs

</div>
<div class="column">

**Custom instructions to add:**

- Tech stack preferences
- Coding conventions
- Target audience description

</div>
</div>

---

# Providing Mockups to Claude

> Sketch it, upload it, build it

<!-- vertical -->

## Vision Input for Artifacts

Claude can **see** your designs:

- **Figma exports** -- Screenshots or exported frames
- **Hand-drawn sketches** -- Phone photos work great
- **Screenshots** -- Existing apps to reference
- **Wireframes** -- Any visual mockup tool

<!-- vertical -->

## The Mockup-to-Artifact Workflow

```text
1. Sketch your interface (paper, Figma, etc.)
2. Upload the image to Claude
3. "Build this as an interactive artifact"
4. Review and iterate
5. "Move this button..." / "Add a search bar..."
```

Each iteration builds on the last artifact.

<!-- vertical -->

## Tips for Better Results

- **Be specific** about interactions: "clicking this button should..."
- **Annotate** your sketches with notes
- **Reference** existing designs: "make it look like..."
- **Iterate** in small steps rather than one giant prompt

---

# Data Persistence in Artifacts

> Storing data in the sandbox

<!-- vertical -->

## Browser Storage: Don't Bet on It

**Artifacts run in a sandboxed iframe.**

- Legacy artifacts blocked `localStorage`, `sessionStorage`, `indexedDB`, and cookies
- Anthropic's current docs **don't say either way** for new artifacts
- John's class demo: `localStorage` worked 🤷🏽‍♂️, but nothing promises it will keep working, and it lives only in one browser

**The documented path is artifact storage** — next slide.

<!-- vertical -->

## Artifact Storage

Artifacts have their own built-in storage:

- **20 MB per artifact, text only** — no images, files, or binary data
- **Personal** (each user keeps private data) or **shared** (everyone sees the same data)
- **Pro, Max, Team, or Enterprise** plans only
- Ask Claude to add persistence — it writes the storage code for you

<small>Source: [What are artifacts → Store data in an artifact](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them)</small>

<!-- vertical -->

## Storage: New vs. Legacy Artifacts

- New artifacts store data **without publishing**
- Legacy artifacts store data only after publishing, and **unpublishing deletes it**
- Either way, offer JSON export/import as a backup

<small>Source: [What are artifacts → Store data in an artifact](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them)</small>

<!-- vertical -->

## Patterns for State Management

**For P1, think about:**

- What data needs to persist between sessions?
- What can be regenerated or is transient?
- How much data will you store? (20MB limit)

**Common patterns:**

- Save user preferences on change
- Batch save on explicit "save" action
- Load data on artifact initialization

<!-- vertical -->

## Implications for Project 1

Your P1 must have a **data persistence** requirement — use artifact storage (your Northeastern Claude Enterprise account includes it):

- Plan your data model early
- Test persistence across sessions
- Handle the case where no saved data exists (first run)
- Consider export/import as a backup strategy

<!-- vertical -->

## Artifact Limitations

<!-- .slide: class="dense" -->

**Key constraints to know for Project 1:**

- **Single file only** — All code lives in one file (components, styles, logic)
- **No arbitrary external calls** — Can't `fetch()` any URL you like (the sandbox blocks it)
- **Limited libraries** — Common ones (React, Tailwind, Recharts…) work; ask Claude before assuming others
- **Storage is small and paid-plan only** — 20 MB, text only, Pro and above
- **No backend** — No server-side code, databases, or authentication

**Exceptions:** artifacts can call Claude (next section) and connected apps like Slack or Asana (Pro and above)

---

# AI Features in Artifacts

> Claude inside your artifact

<!-- vertical -->

## Claude-Powered Artifacts

<!-- .slide: class="dense" -->

Your artifact can **call Claude** directly:

- **No API keys** — and no cost to you as the author
- Usage counts against **each user's own plan limits**, not yours
- New artifacts **ask the user's permission** the first time they call Claude
- How to add it: **ask Claude to use Claude** — it writes the call for you

> *"Add a smart search box: send the user's query and my item list to Claude, and show the matching items."*

<small>The wiring Claude generates is an internal detail and has changed over time. Don't hand-copy a fetch URL or API helper from an old tutorial. Source: [What are artifacts → Artifacts that use Claude](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them)</small>

<!-- vertical -->

## What You Can Build

**AI-powered features inside your app:**

- Smart search and filtering
- Content summarization
- Natural language data queries
- Chatbot / conversational interfaces
- Content generation and suggestions
- Classification and tagging

<!-- vertical -->

## Example: AI-Powered Search

<!-- .slide: class="dense" -->

```javascript
async function aiSearch(query, items) {
  const prompt = `Given these items: ${JSON.stringify(items)}
    Find relevant to: "${query}". Return JSON indices.`;
  // askClaude() = the call Claude generates for your artifact
  const text = await askClaude(prompt);
  try {
    return JSON.parse(text);          // e.g. [0, 3, 7]
  } catch {
    return keywordFallback(query, items);  // graceful fallback
  }
}
```

> Your part is the **prompt design** and **parsing the reply**. Claude writes the call itself.

<!-- vertical -->

## Best Practices

- **Keep prompts focused** -- One task per call
- **Handle loading states** -- API calls take time
- **Cache results** -- Don't re-call for the same input
- **Graceful fallback** -- What if the call fails?
- **Rate awareness** -- Calls count against each user's plan limits

---

# Debugging Claude Artifacts

> When things go wrong (and they will)

<!-- vertical -->

## The "Try Fixing with Claude" Button

When an artifact has an error:

1. Claude shows the error message
2. Click **"Try fixing with Claude"**
3. Claude analyzes the error and generates a fix
4. Review the fix and iterate

**This is your first line of defense.**

<!-- vertical -->

## Common Artifact Errors

<!-- .slide: class="dense" -->

| Error | Cause | Fix |
| ------- | ------- | ----- |
| Smart quotes | Copy-paste from docs/chat | Replace with straight quotes |
| Sandbox restrictions | Using blocked APIs | Use artifact-specific alternatives |
| Missing imports | Forgot a library | Ask Claude to add the import |
| Infinite loops | Recursive state updates | Add guards and base cases |
| Blank artifact | Runtime error before render | Check console, describe to Claude |

<!-- vertical -->

## Reading Error Messages

**The artifact error panel tells you:**

- **What** went wrong (error type)
- **Where** it happened (line number)
- **Why** it might have happened (stack trace)

**How to use errors effectively:**

Copy the error message and paste it to Claude:

*"I'm getting this error in my artifact: [error]. Here's what I was trying to do: [context]."*

<!-- vertical -->

## Iterative Debugging Workflow

```text
1. See the error or unexpected behavior
2. Describe what you expected vs. what happened
3. Claude proposes a fix
4. Test the fix
5. If still broken, provide more context
6. Repeat until resolved
```

**Key:** Always describe **expected** vs **actual** behavior.

<!-- vertical -->

## Browser DevTools for Artifacts

**For advanced debugging:**

1. Right-click the artifact → **Inspect**
2. Look at the **Console** tab for errors
3. Check the **Network** tab for failed requests
4. Use the **Elements** tab to inspect DOM

**Tip:** The iframe sandbox may limit some DevTools features, but console errors are always visible.


---

# What to Remember

<!-- vertical -->

## Key Takeaways

1. **Claude Projects** give your artifacts persistent context
2. **Vision input** lets you go from sketch to prototype fast
3. **Artifact storage** is the documented way to persist data: 20 MB, text only, Pro and above, no publishing needed for new artifacts
4. **AI-powered artifacts** let you call Claude from inside your app — no API keys, and each user's usage counts against their own plan
5. **Iterative debugging** -- describe the problem, let Claude fix it

<!-- vertical -->

## The Artifact Development Loop

```text
Plan → Mockup → Upload → Build → Test → Iterate
  ↑                                        |
  └────────────────────────────────────────┘
```

Speed comes from **fast iteration**, not getting it right the first time.

---

# Looking Ahead

<!-- vertical -->

## Next Week: IDE-Centric AI Coding

**Week 6 -- Project 1 Due + New Harness**

- **Project 1 is due** -- Submit your artifact
- **IDE AI tools** -- AI moves into your code editor
- How IDE AI works under the hood (context collection, indexing)
- Tab completion, inline edit (Cmd+K), chat panel
- Modes: Ask / Write / Agent / Plan
- Rules files & @ context references
- Tool comparison: Antigravity vs Copilot vs Cursor

**Start transitioning** from prototyping to production code.

---

# Resources

<!-- vertical -->

## Required Reading

<!-- .slide: class="dense" -->

| Resource | URL |
| ---------- | ----- |
| What Are Artifacts? (current, post-Sept 16) | [support.claude.com](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them) |
| Publish and Share Artifacts | [support.claude.com](https://support.claude.com/en/articles/9547008-share-artifacts) |
| Prototype AI-Powered Apps | [academy.claude.com](https://academy.claude.com/tutorials/prototype-ai-powered-apps-with-claude-artifacts) |
| Claude-Powered Artifacts Announcement | [claude.com](https://claude.com/blog/claude-powered-artifacts) |
| Claude Artifacts Guide | [academy.claude.com](https://academy.claude.com/tutorials/use-artifacts-to-visualize-and-create-ai-apps-without-ever-writing-a-line-of-code) |

<!-- vertical -->

## Recommended Reading

<!-- .slide: class="dense" -->

| Resource | URL |
| ---------- | ----- |
| How to Use Claude Artifacts (Zapier) | [zapier.com](https://zapier.com/blog/how-to-use-claude-artifacts-to-create-web-apps/) |
| Claude Artifacts 101 (DataCamp) | [datacamp.com](https://www.datacamp.com/blog/claude-artifacts-introduction) |
| Everything I Built with Artifacts (Simon Willison) | [simonwillison.net](https://simonwillison.net/2024/Oct/21/claude-artifacts/) |
| Fixing Claude Artifact Issues | [christinasouch.com](https://christinasouch.com/blog/fixing-claude-artifact-creation-issues) |
