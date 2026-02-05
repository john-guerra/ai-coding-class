---
title: "CS 7180: Building with Claude Web Artifacts"
theme: white
revealOptions:
  transition: convex
  hash: true
  history: true
---

<!-- .slide: id="title" -->

## CS 7180: Building with Claude Web Artifacts

<img src="../img/seal_logotype-768x252.png" alt="Northeastern University" width="300">

[**John Alexis Guerra Gomez**](http://johnguerra.co/)

jguerra at northeastern.edu

Class: [johnguerra.co/classes/aiCoding_spring_2026](https://johnguerra.co/classes/aiCoding_spring_2026/)

Slides: [johnguerra.co/lectures/ai_assisted_coding](http://johnguerra.co/lectures/ai_assisted_coding/05_Claude_Web_Projects/)

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

> Week 5 -- Deep into the Claude Web modality

<!-- vertical -->

## The Three Modalities

<!-- .slide: class="dense" -->

| | **Claude Web** | **Antigravity** | **Claude Code** |
|---|---|---|---|
| **When** | Weeks 2-5 | Weeks 6-11 | Week 7+ |
| **Best For** | Architecture, research, prototyping | Production code, daily workflow | Automation, multi-file refactoring |
| **Analogy** | Whiteboard with a mentor | Pair programmer in your editor | Build crew that follows blueprints |

Each modality builds on the last -- you don't stop using Claude Web when you start Antigravity.

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

```
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

## The Sandbox Constraint

**Important:** Artifacts run in a sandboxed iframe

Standard browser storage APIs are **blocked**:

- ~~`localStorage`~~ -- Blocked
- ~~`sessionStorage`~~ -- Blocked
- ~~`indexedDB`~~ -- Blocked
- ~~`cookies`~~ -- Blocked

So how do you persist data?

<!-- vertical -->

## John: LocalStorage worked for me

When creating the demo for class, Claude was able to use localStorage to persist data across sessions. 🤷🏽‍♂️

<!-- vertical -->

## Artifact-Specific Storage

Claude Artifacts have their own persistence mechanism:

- **Up to 20MB** of storage (Pro/Max/Team/Enterprise)
- Data persists across sessions for **published artifacts only**
- Ask Claude to add persistence — it generates the storage code for you

**Important caveat:**

- Storage **only works on published artifacts** — not during development previews
- Always test persistence after publishing
- Consider JSON export/import as a fallback strategy

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

Your P1 must have a **data persistence** requirement:

- Plan your data model early
- Test persistence across sessions
- Handle the case where no saved data exists (first run)
- Consider export/import as a backup strategy

<!-- vertical -->

## Artifact Limitations

<!-- .slide: class="dense" -->

**Key constraints to know for Project 1:**

- **Single file only** — All code lives in one file (components, styles, logic)
- **No external API calls** — Can't `fetch()` arbitrary URLs (CORS blocked in sandbox)
- **Limited libraries** — Only pre-bundled: React, Recharts, shadcn/ui, Tailwind, lucide-react, plus anything on cdnjs.cloudflare.com
- **Storage requires publishing** — Persistent data only works on published artifacts
- **No backend** — No server-side code, databases, or authentication

**Exception:** AI-powered artifacts can call Claude's API (see next section)

---

# AI Features in Artifacts

> Claude inside your artifact

<!-- vertical -->

## Claude-Powered Artifacts

<!-- .slide: class="dense" -->

Your artifact can **call Claude** directly:

- No API keys needed — the sandbox intercepts the request
- Uses your existing Claude plan limits
- Enable in **Settings → Feature Preview → AI-powered artifacts**

```javascript
const URL = "https://api.anthropic.com/v1/messages";
const res = await fetch(URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }]
  })
});
const { content } = await res.json(); // content[0].text
```

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
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }]
    })
  });
  return JSON.parse((await res.json()).content[0].text);
}
```

<!-- vertical -->

## Best Practices

- **Keep prompts focused** -- One task per call
- **Handle loading states** -- API calls take time
- **Cache results** -- Don't re-call for the same input
- **Graceful fallback** -- What if the call fails?
- **Rate awareness** -- Calls count against your plan

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
|-------|-------|-----|
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

```
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
3. **Artifact storage** replaces standard `localStorage` (which is blocked)
4. **AI-powered artifacts** let you call Claude from inside your app — no API keys needed
5. **Iterative debugging** -- describe the problem, let Claude fix it

<!-- vertical -->

## The Artifact Development Loop

```
Plan → Mockup → Upload → Build → Test → Iterate
  ↑                                        |
  └────────────────────────────────────────┘
```

Speed comes from **fast iteration**, not getting it right the first time.

---

# Looking Ahead

<!-- vertical -->

## Next Week: Antigravity IDE

**Week 6 -- Project 1 Due + New Modality**

- **Project 1 is due** -- Submit your artifact
- **Antigravity introduction** -- AI moves into your code editor
- Tab autocomplete, inline chat (Cmd+K)
- Setting up `.antigravityrules`

**Start transitioning** from prototyping to production code.

---

# Resources

<!-- vertical -->

## Required Reading

<!-- .slide: class="dense" -->

| Resource | URL |
|----------|-----|
| Prototype AI-Powered Apps | [support.claude.com](https://support.claude.com/en/articles/11649438-prototype-ai-powered-apps-with-claude-artifacts) |
| Claude-Powered Artifacts Announcement | [anthropic.com](https://www.anthropic.com/news/claude-powered-artifacts) |
| Claude Artifacts Guide | [support.claude.com](https://support.claude.com/en/articles/11649427-use-artifacts-to-visualize-and-create-ai-apps-without-ever-writing-a-line-of-code) |

<!-- vertical -->

## Recommended Reading

<!-- .slide: class="dense" -->

| Resource | URL |
|----------|-----|
| How to Use Claude Artifacts (Zapier) | [zapier.com](https://zapier.com/blog/how-to-use-claude-artifacts-to-create-web-apps/) |
| Claude Artifacts 101 (DataCamp) | [datacamp.com](https://www.datacamp.com/blog/claude-artifacts-introduction) |
| Everything I Built with Artifacts (Simon Willison) | [simonwillison.net](https://simonwillison.net/2024/Oct/21/claude-artifacts/) |
| Fixing Claude Artifact Issues | [christinasouch.com](https://christinasouch.com/blog/fixing-claude-artifact-creation-issues) |
