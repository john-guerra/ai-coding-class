---
title: "Workshop Wrap-Up: Patterns & Next Steps"
theme: white
revealOptions:
  transition: convex
  hash: true
  history: true
---

<!-- .slide: id="title" -->

# Wrap-Up

## Patterns, Takeaways & Next Steps

*7:30 – 8:00 (30 min)*

---

# Claude Web Debrief

> What we learned from the morning

<!-- Note: These slides are meant to facilitate discussion. Call on a few people before revealing answers. -->

<!-- vertical -->

## What Made Great Artifacts?

*Full group: what worked well?*

**Patterns that consistently produce great results:**

- **Specific visual requirements** — "show a bar chart grouped by category"
- **Concrete data examples** — pasting in real data vs. "use sample data"
- **Iterating in small steps** — one feature at a time
- **Describing what you *see*, not what you *want*** — "the button is in the wrong corner" > "fix the layout"

<!-- vertical -->

## Common Mistakes (Claude Web)

**"Too much at once"**
> "Build me an expense tracker with categories, budgets, charts, export, dark mode, and mobile support"

→ Start with one feature. Add the rest iteratively.

**"Vague visual requirements"**
> "Make it look nice"

→ "Use a clean card layout with a #2563EB accent color and 16px body text"

**"Not using Projects"**
> Starting a new conversation and losing all context

→ Create a Project first. All your builds live there.

<!-- vertical -->

## The Artifact Ceiling

You'll hit it when you need:
- Authentication and user accounts
- Real persistent data (not localStorage)
- Multiple files and components
- Deployment to a real URL
- Integration with external APIs that require secrets

**That's when you graduate to a real project** — bring the artifact code into a proper codebase.

---

# Claude Code Debrief

> What we learned from the afternoon

<!-- vertical -->

## How the Agentic Loop Surprised People

*Common reactions from first-time Claude Code users:*

- "It ran tests without being asked"
- "It fixed its own errors"
- "It wrote more tests than I would have"
- "I wanted to jump in but made myself wait — glad I did"
- "My CLAUDE.md was too vague the first time"

<!-- Note: Ask the room: "What surprised YOU?" Give this 3-4 minutes of discussion. -->

<!-- vertical -->

## CLAUDE.md: What We Learned

**The most common gap:** not enough architecture context.

Claude Code is great at following rules it knows about. It can't follow rules you haven't written down.

**After today, add:**
- Any convention you had to correct Claude Code on
- Your team's branch naming strategy
- Your test philosophy (unit? integration? TDD?)
- Anything specific to your tech stack

*Your CLAUDE.md should grow after every session.*

<!-- vertical -->

## Common Mistakes (Claude Code)

**"Giving steps, not goals"**
> "First open app.js, then find the todos array, then add a priority field"

→ "Add a priority field (low/medium/high) to todos with validation"

**"Not reviewing the diff"**
> Accepting all changes without looking

→ `git diff` before every commit. The code is yours — you're responsible for it.

**"Intervening too early"**
> Stopping Claude Code mid-task because it's taking a different path

→ Let it finish, then evaluate. Its path may be better than yours.

**"Over-engineered CLAUDE.md"**
> 500-line document covering every edge case

→ Start with 50 lines. Add as needed.

---

# Production Patterns to Take Home

> The practices that separate good AI-assisted engineering from "vibe coding"

<!-- vertical -->

## Test-Driven Development

Write failing tests first. Always.

This isn't about being rigorous — it's about **communicating intent** to the AI.

When you write tests first:
- Claude Code knows exactly what "done" means
- It can verify its own work without you checking
- You catch misunderstandings before implementation

```
> Write the failing tests for the priority filtering feature.
  Don't implement anything yet.
```

<!-- vertical -->

## Code Review (Still Matters)

AI-generated code has a higher rate of security issues:

> "AI-authored PRs have 1.57x more security issues, 2.74x more XSS vulnerabilities" — ClackyAI research

**The C.L.E.A.R. framework for reviewing AI code:**
- **C**orrectness — does it do what was asked?
- **L**ogic — are there edge cases missed?
- **E**xposure — any security vulnerabilities?
- **A**rchitecture — does it fit the existing patterns?
- **R**eadability — will the team understand it?

*You're the last line of defense.*

<!-- vertical -->

## Evals: Measuring Quality

How do you know if AI-generated code is good?

The same way you know anything is good: **measure it**.

- **Unit tests** — does it work?
- **Integration tests** — does it work with the rest of the system?
- **LLM-as-judge** — for prose/UI quality (aligns with humans ~85% of the time)
- **Property-based testing** — generates edge cases you wouldn't think of

*The teams that use AI best are the ones who also test the most.*

<!-- vertical -->

## The Sustainable Workflow

```
Write CLAUDE.md → Give clear goal → Watch agentic loop →
Review diff → Run tests → Commit → Update CLAUDE.md
```

Not:

```
Generate code → Ship it → Fix bugs in production
```

---

# Next Steps

> What to do with this

<!-- vertical -->

## This Week

**Tomorrow:**
- Install Claude Code on a real project (`npm install -g @anthropic-ai/claude-code`)
- Write a CLAUDE.md (start with 3 sections: overview, commands, conventions)

**This week:**
- Give Claude Code one real task on your actual work
- Update CLAUDE.md after that session

**This month:**
- Build something with Claude Web Artifacts
- Try the Explore → Plan → Implement → Commit workflow on a feature

<!-- vertical -->

## Resources

| Resource | URL |
|----------|-----|
| **Claude Web** | claude.ai |
| **Claude Code install** | `npm install -g @anthropic-ai/claude-code` |
| **Claude Code docs** | code.claude.com/docs |
| **Best practices guide** | code.claude.com/docs/best-practices |
| **Prompt engineering** | docs.anthropic.com/en/docs/build-with-claude/prompt-engineering |
| **Claude.ai pricing** | claude.ai/pricing (free tier available) |

<!-- vertical -->

## The Bigger Picture

The question isn't whether AI will change software engineering.

It already has.

The question is: **are you learning to work *with* these tools effectively, or watching from the sideline?**

The engineers who thrive:
- Treat AI as a collaborator, not a replacement
- Maintain the quality practices (TDD, code review, evals)
- Get better at communication: clear goals, good specifications, reviewing output

**The skill floor lowers. The ceiling rises.**

---

# Q&A

<!-- Note: Common questions with suggested answers below. Use or ignore as needed. -->

<!-- vertical -->

## Common Q&A

**"Is it safe to give Claude Code shell access?"**
> Claude Code asks permission before running commands. You can configure what it's allowed to do automatically vs. what requires approval. Start with default settings and adjust.

**"What about IP / confidentiality concerns?"**
> Claude Code runs on Anthropic's API. Check your company's AI policy. For sensitive codebases, Claude Code supports local/enterprise deployments.

**"Does this work for non-JavaScript projects?"**
> Yes — Python, Go, Rust, Java, anything. The tools (Read, Edit, Bash) work on any language. Write a CLAUDE.md that explains your stack.

**"What's the cost?"**
> Claude Code uses the Anthropic API. Light use is free on claude.ai. Heavy professional use: ~$20-100/month depending on usage. Most people find it saves far more than it costs.

<!-- vertical -->

## Thank You

*Questions, feedback, or "I tried it and here's what happened" — all welcome.*

**Stay in touch:**
- Workshop materials: in the repository you cloned
- Today's notes: whatever you captured in your CLAUDE.md

*The best way to learn is to try it on something real.*
