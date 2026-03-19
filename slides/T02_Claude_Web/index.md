---
title: "Claude Web: Artifacts, Projects & Prompting"
theme: white
revealOptions:
  transition: convex
  hash: true
  history: true
---

<!-- .slide: id="title" -->

# Claude Web

## Artifacts, Projects & Prompting

*0:45 – 1:15 | 30 minutes*

---

# What We'll Cover

1. What Claude Web is great for
2. Live demo: building an expense tracker
3. Prompting patterns that actually work
4. When to move beyond Claude Web

---

# What Claude Web Is Great For

> Three features that make claude.ai more than a chatbot.

<!-- vertical -->

## The Trifecta

| Feature | What It Does |
|---------|-------------|
| **Conversations** | Chat-based interaction, reasoning, Q&A |
| **Projects** | Persistent memory across sessions |
| **Artifacts** | Live apps running in the browser |

Each one multiplies the value of the others.

<!-- vertical -->

## Artifacts: Apps Without Code

**An Artifact is a self-contained app that runs live in your browser.**

- Written in HTML + JavaScript + CSS
- Rendered in a sandboxed iframe right in Claude's UI
- Built from a single prompt — no local setup required
- Shareable with a link, remixable by anyone

> "Describe what you want. Claude builds it. You click around it immediately."

<!-- vertical -->

## What Artifacts Can Do

- Data visualizations and interactive charts
- Personal tools: calculators, trackers, converters
- Functional prototypes: dashboards, forms, flows
- Learning aids: quizzes, flashcards, simulations
- Mini games and creative experiments

**No IDE. No terminal. No npm install.**

<!-- vertical -->

## Projects: Persistent Memory

**Without Projects:**
- Every new conversation starts from zero
- You re-explain your project every time

**With Projects:**
- Upload documents once (PRDs, specs, data)
- Add custom instructions for tone and style
- Claude remembers context across all conversations
- Build a knowledge base that grows with your work

<!-- vertical -->

## Best Use Cases for Claude Web

| Scenario | Why Claude Web Wins |
|----------|---------------------|
| Data viz prototype | Instant visual feedback, no setup |
| Personal productivity tool | Runs in browser, shareable link |
| Learning a new concept | Explain + demonstrate in one turn |
| Stakeholder demo | Build in minutes, not days |
| Exploring an idea | Iterate through conversation |

**The sweet spot: anything that would take a day to scaffold properly but only needs to work well enough to test an idea.**

---

# Live Demo

## Building an Expense Tracker

*10 minutes | Watch the iteration process*

<!-- Note: DEMO — open claude.ai in a new tab, create a fresh conversation (not inside a Project). Make sure Artifacts is enabled in settings. Walk slowly through each step so the audience can see Claude's output before you continue. -->

<!-- vertical -->

## Step 1: The First Prompt

<!-- Note: DEMO — Type this prompt exactly as written, then show the artifact as it renders. Point out that Claude built the whole thing: HTML structure, JavaScript state, a chart. No boilerplate, no configuration. -->

```text
Build me a simple expense tracker. I can add expenses
with a category and amount. Show me a chart of spending
by category.
```

**What to watch:**
- Claude scaffolds the entire app — structure, logic, UI — in one shot
- The artifact renders immediately in the sidebar
- You can interact with it before Claude is done explaining

<!-- vertical -->

## Step 2: Iterating

<!-- Note: DEMO — Add a few test expenses first so the chart has data. Then type the iteration prompt. Show how Claude updates the artifact in place — it doesn't start over, it extends what's there. Point out the budget progress bar. -->

```text
Add a monthly budget goal and show me how close I am
to hitting it.
```

**What to watch:**
- Claude reads the existing code and extends it — it doesn't start from scratch
- Each iteration stacks cleanly on the previous one
- The app gets more capable with each message

<!-- vertical -->

## Step 3: Going Interactive

<!-- Note: DEMO — Type this prompt, then click a category bar in the chart to demonstrate. This is the moment that usually gets a reaction from the audience — it shows that Claude can add real interactivity, not just static UI. -->

```text
Make the chart interactive — clicking a category shows
the individual expenses for that category.
```

**What to watch:**
- Drilling down on a chart category surfaces the underlying data
- Three prompts produced a genuinely useful, interactive app
- Total time: under 5 minutes

<!-- vertical -->

## What the Demo Shows

1. **Claude scaffolds the whole thing** — not just snippets, a working app
2. **Iterations stack** — each prompt builds on the last
3. **You stay in the conversation** — no context switching, no terminal
4. **The gap between idea and demo is minutes**, not hours

---

# Prompting Patterns That Work

> Small changes in how you ask make a big difference in what you get.

<!-- vertical -->

## Pattern 1: Specificity

**Vague → Generic output**
```text
Build me a dashboard
```

**Specific → Targeted output**
```text
Build me a dashboard that shows monthly revenue,
new signups, and churn rate as three KPI cards
at the top, with a line chart of revenue over the
last 6 months below. Use a clean, minimal style.
```

The model isn't guessing what you want — you've told it exactly.

<!-- vertical -->

## Specificity Formula

| Component | Example |
|-----------|---------|
| **What** to build | "an expense tracker" |
| **What data** it handles | "expenses with category, amount, date" |
| **What it shows** | "a donut chart of spending by category" |
| **How it looks** | "clean, minimal, mobile-friendly" |
| **Key interactions** | "clicking a slice filters the list below" |

You don't need all five every time — but the more you include, the better the first result.

<!-- vertical -->

## Pattern 2: Show Don't Tell

**Describe what you see, not what you want changed.**

```text
Bad:  "Fix the layout"
Good: "The sidebar is overlapping the main content
       on screens smaller than 800px"

Bad:  "Make it better"
Good: "When I click submit with an empty field,
       nothing happens — it should show an error message"
```

Claude can't see your screen. Describe the symptom, not the diagnosis.

<!-- vertical -->

## Pattern 3: Start Broad, Then Narrow

**Don't try to get it perfect in one shot.**

```text
Round 1: "Build an expense tracker"
         → Get the basic structure working

Round 2: "Add a monthly budget goal"
         → Add the next feature

Round 3: "Make the chart interactive"
         → Refine the key interaction

Round 4: "Change the color scheme to greens and blues"
         → Polish when the functionality is right
```

**Trying to specify everything upfront often makes the first result worse**, not better.

<!-- vertical -->

## Pattern 4: Constraints as Features

Limitations force better solutions.

```text
"Make it work without a database — store everything
 in the browser"

"Must work offline with no internet connection"

"Keep it to a single page with no navigation"

"Use only vanilla JavaScript, no libraries"
```

Constraints tell Claude what tradeoffs to make. Without them, it guesses.

<!-- vertical -->

## Anti-Patterns to Avoid

| Anti-Pattern | Why It Fails | Better Approach |
|--------------|-------------|-----------------|
| Too vague | Claude guesses wrong | Specify what + data + layout |
| Too many requirements at once | Output tries to do everything, does nothing well | Start with core feature, iterate |
| Describing the code | Claude already knows how to code | Describe the behavior you want |
| No examples | Claude picks arbitrary style | "Make it look like [app you like]" |
| Accepting the first result | First drafts are starting points | Always plan to iterate 2–4 times |

<!-- vertical -->

## Putting It Together

**Before (weak):**
```text
Make me a budget app
```

**After (strong):**
```text
Build a personal budget tracker for one month.

I can enter income and expenses, each with a name,
amount, and category (food, rent, transport, other).

Show:
- A running balance (income minus expenses)
- A bar chart comparing spending across categories
- A color-coded list of all transactions

Keep it simple and usable on a phone screen.
```

Same model. Very different output.

---

# When to Graduate from Claude Web

> Artifacts are prototypes. Know when you've outgrown them.

<!-- vertical -->

## Signs You've Hit the Ceiling

**Artifacts work until they don't.**

- You need **multiple files** — one file is the hard limit
- You need **real authentication** — no server, no auth
- You need to **call external APIs** — most are CORS-blocked in the sandbox
- You need **real data persistence** — no traditional localStorage
- You need to **deploy it** — artifacts aren't a hosting platform

When you hit these walls, that's not a failure — it's the prototype doing its job.

<!-- vertical -->

## Artifacts vs. Real Apps

| Capability | Artifact | Real App |
|-----------|---------|---------|
| Runs in browser | Yes | Yes |
| Multiple files | No | Yes |
| Authentication | No | Yes |
| External API calls | Limited | Yes |
| Custom domain | No | Yes |
| Persistent database | No | Yes |
| Team collaboration | Read-only | Yes |

<!-- vertical -->

## The Handoff

**When an Artifact proves the idea works:**

1. **Export the code** — copy from the artifact editor
2. **Bring it into a project** — paste into a proper repo
3. **Use it as a spec** — the artifact is the working prototype
4. **Rebuild cleanly** — now with proper architecture, files, and tooling

> The artifact earned its keep. Now it steps aside.

<!-- vertical -->

## Artifacts as the Right Tool for the Job

**The point was never to build production software.**

- Artifacts let you **validate ideas before committing** to a full build
- They're perfect for **demos, personal tools, and learning**
- The conversation stays the same — only the environment changes

```text
Idea → Claude Web Artifact   (minutes, zero setup)
               ↓
       Does it work? Is it worth building?
               ↓
         IDE + Claude Code    (full project, full power)
```

<!-- vertical -->

## What's Coming Next

**After Claude Web: AI in your editor**

- AI tab completion, inline edits, chat panel in your IDE
- Working directly in your codebase — multiple files, real dependencies
- Then: Claude Code — agentic AI that runs tasks end-to-end in the terminal

> Claude Web taught you to speak the language. The next tools put that language to work in production.

---

# Key Takeaways

1. **Artifacts** are live browser apps built from conversation — no setup required
2. **Projects** give Claude persistent memory across sessions
3. **Prompting** works best with specificity, iteration, and constraints
4. **Artifacts are prototypes** — move to a real project when you need auth, files, or deployment
5. **The gap between idea and working demo is now measured in minutes**

---

# Resources

| Resource | Link |
|----------|------|
| Claude Artifacts Guide | [support.claude.com](https://support.claude.com/en/articles/11649427-use-artifacts-to-visualize-and-create-ai-apps-without-ever-writing-a-line-of-code) |
| AI-Powered Artifacts | [support.claude.com](https://support.claude.com/en/articles/11649438-prototype-ai-powered-apps-with-claude-artifacts) |
| Prompt Engineering Guide | [docs.anthropic.com](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) |
| Everything Built with Artifacts (Simon Willison) | [simonwillison.net](https://simonwillison.net/2024/Oct/21/claude-artifacts/) |
