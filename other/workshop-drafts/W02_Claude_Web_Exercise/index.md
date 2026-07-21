---
title: "Claude Web Exercise: Build a Personal Tool"
theme: white
revealOptions:
  transition: convex
  hash: true
  history: true
---

# Claude Web Exercise

## Build a Personal Tool

_Block W02 — 1:15 to 3:45_

---

# Morning Recap

What we covered in W01:

- AI coding is fast iteration, not magic one-shot prompts
- Three modalities: Claude Web / IDE AI / Claude Code
- You shift from driving to supervising
- When in doubt: start with Claude Web

**Now we practice.**

---

# The Goal

By 3:45, you will have:

- A working personal productivity app you built yourself
- Experience with the Claude Web iteration loop
- A concrete sense of what works and what doesn't

The app doesn't need to be perfect. The iteration practice is the point.

---

# Exercise Timeline

| Time | Phase | What's happening |
|------|-------|-----------------|
| 1:15–1:45 | Setup | Create your Project, run your first prompt |
| 1:45–3:15 | Build | Iterate, add features, break things, fix things |
| ~2:30 | Check-in | Quick group check: what's working? |
| 3:15–3:45 | Debrief | Share with your neighbor, group discussion |

---

# Pick Your Project

Choose one. They're all scoped to fit in 90 minutes.

| Option | What you'll build |
|--------|------------------|
| 1 | Expense Tracker — categories, totals, chart |
| 2 | Habit Tracker — streaks, 7-day history |
| 3 | Recipe Book — add recipes, search by ingredient |
| 4 | Reading List — track status, add notes |

_Pick based on what you'd actually use. That motivation helps._

---

# Option 1: Expense Tracker

**Starter prompt — copy this exactly:**

```text
Build me a personal expense tracker as a React artifact.

Features:
- Form to add an expense: amount (number), category
  (dropdown: Food, Transport, Entertainment, Health, Other),
  and optional description
- List of all expenses, newest first
- Total spent per category shown as a summary
- A simple bar chart showing spending by category using Recharts

Use Tailwind CSS. Store data in component state (no backend).
Use a light color scheme.
```

---

# Option 2: Habit Tracker

**Starter prompt — copy this exactly:**

```text
Build me a daily habit tracker as a React artifact.

Features:
- Add new habits by name
- Today's view: list of habits with a checkbox for each
- Streak counter per habit (consecutive days completed)
- A 7-day history grid per habit (like GitHub contributions)

Use Tailwind CSS. Store everything in component state.
Use green for completed, light gray for missed.
```

---

# Option 3: Recipe Book

**Starter prompt — copy this exactly:**

```text
Build me a personal recipe book as a React artifact.

Features:
- Form to add a recipe: title, tags (comma-separated),
  ingredients (one per line), instructions (text area)
- Recipe list with title and tags visible
- Click a recipe to see its full details
- Search bar that filters by name or ingredient in real time

Use Tailwind CSS. Keep data in component state.
Warm color scheme. No backend needed.
```

---

# Option 4: Reading List

**Starter prompt — copy this exactly:**

```text
Build me a reading list tracker as a React artifact.

Features:
- Add a book: title, author, status
  (Want to Read / Reading / Finished)
- Display books grouped by status
- Click a book to change its status and add notes
- Filter books by status using tabs at the top

Use Tailwind CSS. Component state only.
Clean, minimal design with good typography.
```

---

# Setup Instructions

Before you send that first prompt:

1. Open [claude.ai](https://claude.ai) and log in

2. Click **Projects** in the sidebar → **New Project**

3. Name it: `Workshop — Personal Tool`

4. In **Project Instructions**, paste:
   ```
   I'm building a personal productivity tool as a single-page
   React app. Keep the code in one file. Use Tailwind via CDN.
   Make the UI clean and functional. Prioritize working features.
   ```

5. Start a new chat inside the project

6. Paste your chosen starter prompt and send it

---

# What a Good First Response Looks Like

Claude should generate an **Artifact** — a rendered interactive app on the right side of the screen.

If you only see text: add this to your prompt:
```text
Give me this as a runnable React artifact.
```

If the artifact shows a blank white screen:
- Right-click → Inspect → Console
- Copy the error message
- Say to Claude: "I'm getting this error: [paste error]"

---

# Build Phase Instructions

**Your job for the next 90 minutes:**

1. Run the starter prompt
2. Try the app — what's missing or wrong?
3. Write a follow-up prompt: "Add...", "Fix...", "Change..."
4. Repeat

**Good follow-up prompts:**
- "Add a way to delete individual items"
- "Make the layout work better on a narrow screen"
- "Add a total count somewhere visible"
- "The chart isn't showing up — fix it"

---

# When You Get Stuck

If Claude generates something broken:

```text
Use the "Try fixing with Claude" button first.
```

If it's still broken, describe expected vs actual:

```text
"I expected the form to clear after I submit,
but it keeps the old values. Fix this."
```

If you're going in circles (3+ attempts, not improving):
- Raise your hand — grab a facilitator
- Or start a fresh conversation and try a simpler version first

---

# Mid-Exercise Check-in

_This slide is displayed at the 45-minute mark_

**Quick show of hands:**

- Who has a working first version?
- Who hit an error that took more than 5 minutes?
- Who has already added a feature beyond the starter?

**What's one thing that surprised you so far?**

---

# Iteration Ideas

Once your core features work, try one of these:

- **Polish the design:** "Make the UI feel more polished — add hover states, rounded corners, and a consistent color palette."

- **Add export:** "Add an Export button that downloads my data as a JSON file."

- **Keyboard shortcuts:** "Let me submit the form by pressing Enter. Add a keyboard shortcut to focus the search bar."

- **Better empty states:** "Add friendly messages when there's no data yet — tell me what to do first."

---

# Wrap-Up

**At 3:15:**

1. Take a screenshot of your app
2. Note: what feature are you most proud of?

**Share with your neighbor (2 minutes each):**
- Show them your app
- Tell them one thing that was harder than you expected
- Tell them one thing Claude handled surprisingly well

---

# Debrief Discussion

We'll close the block together. Think about:

1. What was easier than you expected?
2. Where did you get stuck — and how did you get unstuck?
3. Did your prompting style change as the session went on?
4. What would you do differently if you started over?
5. What parts of the process still required the most from _you_?

---

# Key Takeaways from W02

- Fast iteration beats the perfect first prompt
- Describe **expected vs actual** when something breaks
- Claude Projects give you persistent context across conversations
- The more specific your prompt, the less cleanup you do afterward

**Up next — 30 minute break, then W03: Claude Code**

_We'll shift from browser-based to terminal-based AI. Different tool, same core idea: you direct, AI does._
