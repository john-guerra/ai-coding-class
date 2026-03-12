# Workshop: Claude Code Exercise

A pre-configured Node.js/Express todos API for the Claude Code workshop exercise.

---

## Setup (5 minutes)

```bash
# 1. Navigate to this directory
cd examples/workshop-claude-code

# 2. Install dependencies
npm install

# 3. Verify all tests pass (you should see 9 passing tests)
npm test

# 4. Start the server
npm start
# → "Todos API running on port 3000"

# 5. Verify it works
curl http://localhost:3000/todos
# → []
```

All good? You're ready for the exercise.

---

## What's Here

```
workshop-claude-code/
├── CLAUDE.md          ← Fill this in before starting Claude Code
├── src/
│   ├── app.js         ← Express app with 4 routes + in-memory store
│   └── app.test.js    ← Jest + supertest tests for all routes
└── package.json
```

---

## The Exercise

### Step 1: Fill in CLAUDE.md (10 min)

Open `CLAUDE.md` and complete the TODO sections:
- **Project Overview** — 2-3 sentences describing what this is
- **Code Style** — your preferences (TDD? async/await? naming conventions?)
- **Testing Strategy** — how you want tests to work

This is the document Claude Code will read before every task. The more useful it is, the better Claude Code performs.

> **Facilitator note:** From HumanLayer research: CLAUDE.md under 200 lines = >92% rule-application rate. Keep it focused.

### Step 2: Start Claude Code (2 min)

```bash
claude
```

Claude Code will start, scan the project, and read your CLAUDE.md.

Try a warm-up: `"Explain the architecture of this project"` — see if Claude Code's summary matches what you put in CLAUDE.md.

### Step 3: Give It the Task (90 min)

Copy-paste this prompt:

```
Add a "priority" field to todos (values: low, medium, high; default: medium).
GET /todos should support filtering by ?priority=high.
Validate that priority is one of the valid values.
Use TDD — write the failing tests first, then implement.
```

**Watch the agentic loop:**
1. Claude Code reads `src/app.js` to understand the data model
2. It writes failing tests in `src/app.test.js`
3. It runs `npm test` — tests fail (that's the point)
4. It implements the feature
5. It runs `npm test` — tests pass
6. It explains what it did

**Your role during this:** Supervise, not type.
- Watch what tools it uses
- Approve tool calls when prompted
- If it goes wrong, describe what's incorrect — don't fix it yourself

### Step 4: Iterate (remaining time)

Try one of these follow-up prompts:

```
Add a GET /todos/stats endpoint that returns a count of todos by priority
```

```
Add input sanitization — strip HTML tags from todo titles
```

```
Add a PATCH /todos/:id/complete endpoint as a shortcut for marking complete
```

---

## Debrief Discussion

After the exercise, reflect on these questions:

1. **What surprised you** about how Claude Code approached the task?
2. **Did your CLAUDE.md help?** What would you add or remove now?
3. **Where did you want to intervene** but let Claude Code continue?
4. **Did it write tests you wouldn't have written?** Were they useful?
5. **What would you use this for** in a real project?

---

## Facilitator Notes

### Common issues

**"npm test fails on startup"**
→ Check Node.js version: `node --version` (needs v18+)
→ Check that `npm install` completed without errors

**"Claude Code isn't reading my CLAUDE.md"**
→ Make sure CLAUDE.md is in the directory where you ran `claude`
→ Try `/reset` to restart the session

**"Claude Code is asking permission for every file"**
→ This is normal behavior. Approve each tool use the first time, then use `Allow always` for tools you trust.

**"The tests pass but the behavior seems wrong"**
→ Great teaching moment! Tests that pass but don't verify the right behavior. Ask Claude Code to add more specific assertions.

**"Participant is lost or stuck"**
→ Suggest: `/clear` to reset context, then re-run the task prompt
→ Check that they're in the right directory before running `claude`

### Timing

- 0:00–0:10 — Fill in CLAUDE.md
- 0:10–0:15 — Start Claude Code, warm-up explore
- 0:15–1:30 — Main exercise (priority feature + iterations)
- 1:30–2:00 — Debrief discussion

### What "good" looks like

A participant who's getting it will:
- Write a CLAUDE.md that's useful, not exhaustive
- Let Claude Code run through the full loop before intervening
- Review the diff instead of accepting it blindly
- Ask follow-up questions about what Claude Code wrote
