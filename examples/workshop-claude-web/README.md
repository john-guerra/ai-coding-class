# Claude Web Exercise: Build a Personal Tool

## Overview

Participants pick one of four personal productivity tools and build it from scratch using Claude Web Artifacts. The goal is not a polished product — it's to experience the full iteration loop: prompt → review → refine → repeat. By the end of the 2.5-hour block, each participant should have a working app they built themselves, along with a concrete sense of what AI-assisted development feels like in practice.

---

## Timeline

### 0:00–0:30 — Setup

**Goal:** Everyone has a working Claude Project and has run their first prompt.

1. Open [claude.ai](https://claude.ai) and log in.
2. Click **Projects** in the sidebar → **New Project**.
3. Name the project: `Workshop — Personal Tool`.
4. In the project's **Instructions** field, paste this:

   ```
   I'm building a personal productivity tool as a single-page React app.
   Keep the code in a single file. Use Tailwind for styling (via CDN).
   Make the UI clean and functional. Prioritize working features over polish.
   ```

5. Start your first conversation in the project using the starter prompt for your chosen option (see below).

**Facilitator:** Walk around and confirm everyone gets an Artifact rendered. If Claude generates only text, ask participants to say "Give me this as a runnable Artifact."

---

### 0:30–2:00 — Build

**Goal:** Participants iterate on their app using follow-up prompts.

- Use the Iteration Prompt Ideas section to add features.
- Encourage experimentation: changing the design, adding data, breaking something on purpose.
- If an Artifact throws an error, use the "Try fixing with Claude" button first.
- If stuck: copy the error message and say "I'm getting this error: [paste]. What should I do?"

**Facilitator:** At the 45-minute mark, display the mid-exercise check-in slide. Ask: "Who has gotten something working? What surprised you?"

---

### 2:00–2:30 — Debrief

**Goal:** Reflect on the experience and extract transferable lessons.

1. Each person shares their app with the person next to them (2 minutes).
2. Group debrief using the discussion questions below.
3. Facilitator closes with key observations about what patterns made people successful.

---

## Project Options

Participants choose one. All four are scoped to be completable in 90 minutes of iteration.

---

### Option 1: Expense Tracker

Track spending by category. See where your money goes.

**Features to aim for:** Add expense (amount, category, description), list view, totals by category, simple bar or pie chart.

**Starter prompt:**

```
Build me a personal expense tracker as a React artifact.

Features:
- Form to add an expense: amount (number), category (dropdown with: Food, Transport, Entertainment, Health, Other), and optional description
- List of all expenses, newest first
- Total spent per category shown as a summary
- A simple bar chart showing spending by category using Recharts

Use Tailwind CSS for styling. Store data in the app's state — no need for a backend.
Make it clean and functional. Use a light color scheme.
```

---

### Option 2: Habit Tracker

Log daily habits and see your streaks.

**Features to aim for:** Add habits, mark daily completion, streak counter, completion rate over the past 7 days.

**Starter prompt:**

```
Build me a daily habit tracker as a React artifact.

Features:
- Ability to add new habits (just a name)
- Today's view: a list of habits with a checkbox for each one
- Streak counter per habit (how many consecutive days completed)
- A 7-day history grid showing which days each habit was completed (like GitHub's contribution graph, but per habit)

Use Tailwind CSS. Store everything in component state (no backend needed).
Make it feel motivating — use green for completed, light gray for missed.
```

---

### Option 3: Recipe Book

Save recipes, tag them, filter by ingredient.

**Features to aim for:** Add recipe (title, ingredients list, instructions), tag by meal type, search by ingredient or name.

**Starter prompt:**

```
Build me a personal recipe book as a React artifact.

Features:
- Form to add a recipe: title, tags (comma-separated, e.g. "dinner, vegetarian"), ingredients (one per line), and instructions (text area)
- Recipe list view with title and tags visible
- Click a recipe to see its full details
- Search bar that filters recipes by name or ingredient in real time

Use Tailwind CSS. Keep all data in component state.
Make it clean with a warm color scheme. No backend needed.
```

---

### Option 4: Reading List

Track books you want to read, are reading, and have finished.

**Features to aim for:** Add book (title, author, status), update status, add notes per book, filter by status.

**Starter prompt:**

```
Build me a reading list tracker as a React artifact.

Features:
- Add a book: title, author, and status (Want to Read / Reading / Finished)
- Display books grouped by status (three columns or tabs)
- Click a book to open a panel where you can: change the status, add/edit personal notes, see when it was added
- Filter books by status using tabs or buttons at the top

Use Tailwind CSS. Keep everything in component state.
Use a clean, minimal design with good typography. No backend needed.
```

---

## Iteration Prompt Ideas

Once your starter app is working, use these to go deeper:

1. **Polish the design:**
   "Make the UI feel more polished. Add hover states, rounded corners, and subtle shadows. Use a consistent color palette."

2. **Add data export:**
   "Add an 'Export' button that lets me download my data as a JSON file."

3. **Add keyboard shortcuts:**
   "Let me submit the add form by pressing Enter. Add a keyboard shortcut (Cmd+K or /) to focus the search bar."

4. **Improve empty states:**
   "Add friendly empty state messages when there's no data yet — something encouraging that tells me what to do first."

---

## Facilitator Notes

**Common issues and how to handle them:**

- **"Claude is just giving me text, not an Artifact"** — Ask the participant to add "Give me this as a runnable React artifact" to their prompt, or explicitly ask Claude to "create an Artifact."

- **"The Artifact shows a blank screen"** — Usually a runtime error. Ask them to right-click the artifact → Inspect → Console to see the error, then copy it and paste to Claude.

- **"Smart quotes are breaking the code"** — Happens when copy-pasting from Word or PDFs. Tell Claude: "The code has smart quote characters that are breaking it. Please fix them."

- **"I'm way ahead of everyone"** — Direct them to iteration prompts. Ask them to try adding an AI-powered feature: "Add a 'suggest a category' button that uses Claude to guess the right category based on the description."

- **"I'm stuck and losing momentum"** — Sit with them, read their conversation, and ask: "What are you trying to get it to do right now?" Then help them articulate a clearer prompt.

**Timing advice:**

- Do a visible check at 0:45 (mid-exercise check-in). Read the room — if many people are stuck, slow down and do a 5-minute group troubleshooting session.
- At 1:30, prompt people to start iterating beyond the basics. Say: "If your core features are working, pick one thing from the iteration prompts."
- At 2:00, give a 2-minute warning before debrief starts.

---

## Debrief Discussion Questions

Use these to guide the 30-minute debrief. Pick 3–4 based on the energy in the room.

1. **What was easier than you expected?** What did AI handle better than you thought it would?

2. **Where did you get stuck?** What kind of prompts weren't working, and how did you get unstuck?

3. **What did you learn about how to write prompts?** Did your style change as the session went on?

4. **What would you do differently if you started over?** Knowing what you know now about how Claude responds, how would you write your first prompt differently?

5. **What can't AI do well here?** What parts of the process still required the most from you?
