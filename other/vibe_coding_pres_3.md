---
marp: true
theme: default
paginate: true
---

# Vibe Coding: Multiple Modalities
## Choosing the Right Tool for the Job

**John Alexis Guerra Gomez**
**Fall 2025**

---

# Core Concept

**There is no "one way" to vibe code**

The tool depends on:
- 🎯 What stage you're at (ideation vs production)
- 👥 Who you're collaborating with
- 🎛️ How much control you need

---

# The Tool Spectrum

```
Low Control ←―――――――――――――→ High Control
Fast       ←―――――――――――――→ Precise  
Prototype  ←―――――――――――――→ Production

Gemini → Replit → Claude → Copilot → Claude Code
  |        |        |         |           |
Share   Deploy   Artifacts  IDE      Terminal
```

---

# Act 1: Foundation

---

# Reality Check

**What AI Actually Is:**
- Doesn't understand the world
- Pathological liar
- People pleaser
- Converges to median solutions
- Only as good as training data

**The core problem:** Can't quickly validate code

---

# The Validation Hierarchy

**When AI Works Well:**
1. ✅ Instantly verifiable (images)
2. ✅ Testable (code with tests)
3. ✅ Pattern-based (similar to training data)

**When AI Struggles:**
1. ❌ Novel problems
2. ❌ Complex logic
3. ❌ Domain-specific tasks

---

# Act 2: The Modalities

---

# Modality 1: Rapid Prototyping

## Tool: Gemini with Shareable Artifacts

---

# Gemini: When to Use

**Perfect for:**
- 🎨 Showing ideas to non-technical stakeholders
- 🚀 Getting shareable link immediately
- 📱 Mobile-friendly demos
- 💡 Quick concept validation

**Example:** Show professor/friend an interactive visualization

---

# Gemini Demo: Real Example

**Use case:** Nephew wants to show data visualization

```
Prompt to Gemini:
"Create an interactive visualization showing 
CO2 emissions by country over last 50 years.

Line chart with country selector.
Make it colorful and engaging."
```

**Result:** Shareable link, works immediately

---

# Gemini: Advantages

✅ Zero setup for viewer
✅ Works on mobile
✅ Fast iteration
✅ Good for "selling" ideas
✅ Perfect for presentations

---

# Gemini: Limitations

❌ Can't export production code easily
❌ Limited control over dependencies
❌ Harder to integrate into real projects
❌ Privacy concerns with shareable links
❌ Code quality varies

---

# Modality 2: Claude Web Chat

## Two Approaches: Copy-Paste vs Artifacts

---

# Approach A: Copy-Paste Development

**Use case:** Learning patterns, getting snippets

**Process:**
1. Ask Claude for implementation
2. Review code in chat
3. Copy what you need
4. Paste into your editor
5. Modify and integrate

---

# Copy-Paste Example

```
"Show me JWT authentication in Express.js

Include:
- Token generation
- Middleware for verification
- Refresh token logic"
```

**You get:** Code snippets to integrate manually

---

# Copy-Paste: Pros & Cons

**Advantages:**
✅ Full control over what you use
✅ Easy to cherry-pick pieces
✅ Can combine multiple responses
✅ Your git history shows YOUR work

**Disadvantages:**
❌ Manual context switching
❌ No execution environment
❌ Can't iterate in place

---

# Approach B: Claude Artifacts

**Use case:** Self-contained components

```
"Create a React kanban board:
- Drag and drop between columns
- Local storage persistence
- Tailwind styling"
```

**Result:** Working component with live preview

---

# Artifacts: Pros & Cons

**Advantages:**
✅ See it working immediately
✅ Iterate visually
✅ Good for UI components
✅ Shareable link

**Disadvantages:**
❌ Single-file limitation
❌ Can't access your codebase
❌ No testing framework
❌ Dependency limitations

---

# Modality 3: No-Code Builders

## Replit, v0, Bolt.new, Lovable

---

# No-Code Tool Comparison

| Tool | Best For | Limitations |
|------|----------|-------------|
| **Replit** | Full-stack apps | Vendor lock-in |
| **v0** | UI components | Frontend only |
| **Bolt.new** | Quick prototypes | Quality varies |
| **Lovable** | Non-technical users | Less control |

---

# Replit Agent Demo

**Why Replit:**
- DeepLearning.AI uses it
- Has deployment built-in
- Full environment (frontend + backend)
- Good for complete beginners

---

# Replit Example

```
"Create a URL shortener:
- User submits long URL
- Gets short code back
- Redirects work
- Show click stats

Use Node.js + SQLite"
```

**Replit:**
- Sets up project
- Installs dependencies
- Creates database
- Builds UI
- You see it running live

---

# Replit: The Trade-off

**Advantages:**
✅ Very fast to working prototype
✅ Deployment included
✅ Full-stack capability
✅ Good for learning

**Disadvantages:**
❌ In Replit's environment
❌ Hard to extract to local dev
❌ Limited customization
❌ Vendor dependency

---

# When to Use No-Code

**Perfect for:**
- 👶 First-time builders
- 🏃 Hackathons
- 📚 Teaching beginners
- 💡 Testing ideas quickly

**Not for:**
- Production applications
- Complex custom logic
- Team collaboration
- Long-term maintenance

---

# Modality 4: VS Code + GitHub Copilot

## Production-Grade Development

---

# Three Modes of Copilot

1. **Inline Autocomplete** (Tab)
2. **Chat / Ask Mode**
3. **Agent / Edit Mode**

Each mode has different use cases

---

# Mode 1: Inline Autocomplete

**Use case:** Writing code you understand

```typescript
// Start typing:
function calculateCompoundInterest(

// Copilot suggests entire function
// Tab to accept
// Keep flowing
```

**When:** You know what you want, just faster

---

# Inline: Pros & Cons

**Advantages:**
✅ Fastest when you know what you want
✅ Stays in your flow
✅ Minimal context switching
✅ Good for boilerplate

**Disadvantages:**
❌ Can accept without thinking
❌ Easy to lose track
❌ Hard to reject partially

---

# Mode 2: Chat / Ask

**Use case:** Explaining, debugging, refactoring

```
Select buggy code → Copilot Chat →

"This causes memory leaks.
Error: [paste]
Explain what's wrong and show fix."
```

**When:** You need to understand or discuss

---

# Chat Mode: Pros & Cons

**Advantages:**
✅ Discuss before changing
✅ Good for learning WHY
✅ Preserves conversation
✅ Can reference files with @

**Disadvantages:**
❌ Slower than inline
❌ Manual application
❌ Context window limits

---

# Mode 3: Agent / Edit

**Use case:** Multi-file changes, refactoring

```
"Refactor authentication to use:
- JWT instead of sessions
- HTTP-only cookies
- Refresh token rotation

Files: @middleware/auth.ts @api/login.ts
Make changes and create tests."
```

**When:** Large coordinated changes

---

# Agent Mode: Pros & Cons

**Advantages:**
✅ Handles multiple files
✅ More autonomous
✅ Good for large refactors

**Disadvantages:**
❌ Less control
❌ Can break things
❌ Harder to review
❌ Need good tests

---

# Real Copilot Workflow

**In practice:**

1. **TAB** for: New functions, imports
2. **CHAT** for: Debugging, understanding, planning
3. **AGENT** for: Refactors, test coverage, migrations

**Key:** Right tool for each task

---

# Modality 5: Claude Code (CLI)

## Power User Tool

---

# Claude Code: What's Different

**Unique capabilities:**
1. 🖥️ Runs terminal commands
2. 📁 Explicit file management
3. 🧠 Extended thinking modes
4. 🔄 Iterative execution

**Interface:** Command line, not GUI

---

# Why CLI Matters

**Claude Code can:**
- Execute tests and see results
- Run migrations
- Check git status
- Read build output
- Iterate based on feedback

**Others can't do this**

---

# Thinking Modes

**Discovery:**
```
"think"       → Basic reasoning
"think hard"  → Deeper analysis
"think harder" → Thorough evaluation
"ultrathink"  → Maximum compute
```

**Use when:** Complex architectural decisions

---

# Same Task, Different Tools

**Task:** Add rate limiting to API

---

# Copilot Approach

```
[In VS Code Copilot Chat]

"Add rate limiting middleware 
to all API routes"

→ Suggests code
→ You review
→ Apply changes
→ Manually test
```

**Time:** ~10 minutes
**Control:** Medium

---

# Claude Code Approach

```bash
claude-code

> "We need rate limiting.
> Read @app/api/*/route.ts
> 
> Think hard about:
> 1. Which library fits our stack?
> 2. Where to apply it?
> 3. What limits?
>
> Show plan first, don't implement."

[Detailed analysis]

> "Implement step by step"
[Installs, creates files, tests]
```

**Time:** ~20 minutes
**Control:** Maximum

---

# When Claude Code Shines

**Perfect for:**
1. 🔄 Complex multi-step tasks
2. 🐛 Debugging production issues
3. 📚 Learning existing codebases
4. 🏗️ Major refactoring

**Overkill for:**
1. Small isolated changes
2. UI tweaks
3. Quick experiments

---

# Honest Tool Comparison

| Feature | Copilot | Claude Code |
|---------|---------|-------------|
| Setup | Easy | Harder |
| Cost | $10-39 | $100 |
| Speed | Fast | Deliberate |
| Control | Medium | Maximum |
| Execution | ❌ | ✅ |
| Best for | Daily | Complex |

---

# Act 3: Choosing the Right Tool

---

# Decision Framework

**Question 1:** Is this for production?
- NO → Quick prototype needed?
  - YES → Share with non-technical? → **Gemini**
  - NO → Just exploring? → **Claude Artifacts**
- YES → How complex?
  - SIMPLE → **Copilot inline**
  - MEDIUM → **Copilot chat/agent**
  - COMPLEX → **Claude Code**

---

# Real-World Scenarios

---

# Scenario 1: Show Professor

**Goal:** Demonstrate an idea

**Tool:** Gemini
- Professor just clicks link
- No setup required
- You iterate quickly

**Why not others?**
- Replit: Too much setup
- Copilot: Need to share screen
- Claude Code: Too technical

---

# Scenario 2: Learn New Library

**Goal:** Understand how something works

**Tool:** Claude Artifacts
- Self-contained example
- Can experiment safely
- Copy to real project later

**Why not others?**
- Gemini: Can't dig deep enough
- Copilot: Need project setup
- Replit: Overhead unnecessary

---

# Scenario 3: Team Project Feature

**Goal:** Build production feature

**Tool:** GitHub Copilot
- Already in VS Code
- Integrates with existing code
- Team uses same workflow

**Why not others?**
- Gemini: Not production quality
- Replit: Wrong environment
- Claude Code: Overkill

---

# Scenario 4: Major Refactor

**Goal:** Change authentication across 20 files

**Tool:** Claude Code
- Needs to understand system
- Run tests between changes
- Explicit control

**Why not others?**
- Copilot: Too many files
- Others: Can't execute

---

# Scenario 5: Hackathon

**Goal:** Working demo in 24 hours

**Tool:** Replit Agent
- Speed matters most
- Don't care about quality
- Need deployment now

**Why not others?**
- Others: Too slow
- Need results fast

---

# The Cascade Strategy

**Combine tools strategically:**

```
1. Ideate → Gemini (fast, visual)
2. Prototype → Replit (full stack)
3. Refine → Claude (better quality)
4. Implement → Copilot (production)
5. Complex → Claude Code (as needed)
```

---

# Example: Dashboard Project

**Day 1:** Gemini
→ Show stakeholders 3 chart ideas

**Day 2:** v0
→ Build actual UI components

**Day 3:** Claude chat
→ Get backend API structure right

**Day 4-10:** Copilot
→ Implement in production codebase

**Day 11:** Claude Code
→ Optimize performance

---

# Act 4: Universal Limitations

---

# Problems Across All Tools

1. **Validation** - Can't verify correctness quickly
2. **Laziness** - Takes easiest path
3. **Duplication** - Will duplicate code
4. **Context limits** - Forgets earlier conversation
5. **People pleasing** - Lies to make you happy

---

# Tool-Specific Gotchas

**Gemini:**
⚠️ Anyone with link can view
⚠️ Links might expire
⚠️ Can't export clean code

**Replit/v0:**
⚠️ Vendor lock-in
⚠️ Hard to migrate
⚠️ Limited customization

---

# Tool-Specific Gotchas (cont.)

**Claude Artifacts:**
⚠️ Single file only
⚠️ Can't access your codebase
⚠️ Limited dependencies

**Copilot:**
⚠️ Auto-accept without thinking
⚠️ Hard to review inline
⚠️ Sometimes outdated patterns

**Claude Code:**
⚠️ Expensive ($100/mo)
⚠️ CLI intimidating
⚠️ Can run destructive commands

---

# Universal Best Practices

**From real experience:**

1. ✅ "Plan, plan, plan"
2. ✅ "Use status quo tools"
3. ✅ "Give it ways to validate"
4. ✅ "Tell it to contradict you"
5. ✅ "Keep checkpoints"
6. ✅ "Read everything it writes"

**True across ALL tools**

---

# The Convergence Problem

**Test yourself:**
```
5 students, same prompt:
"Create a todo app with React"

Result: Nearly identical code
```

**How to differentiate:**
- Use AI for scaffolding
- Innovate in architecture
- Unique domain insights
- Better UX decisions

---

# Tool Selection Matrix

| Goal | Tool | Why |
|------|------|-----|
| Show non-technical | Gemini | Shareable |
| Learn library | Claude Artifacts | Self-contained |
| Hackathon | Replit | Speed + deploy |
| Production feature | Copilot | IDE integration |
| Complex refactor | Claude Code | Control |
| UI component | v0 | Visual |

---

# Hands-On Exercise

**Multi-Modality Challenge:**

**Task:** Personal finance tracker

**Phase 1 (5 min):** Gemini
- Create 3 visual approaches
- Share with neighbor
- Vote on best

---

# Exercise (continued)

**Phase 2:** Replit or v0
- Implement winning design
- Get it working

**Phase 3:** Claude chat
- "How would I build this properly?"
- Get architecture recommendations

**Deliverable:** Working prototype + architecture doc

---

# Critical Closing

---

# Evidence-Based Conclusions

**No single "best" tool**
- Context dependent
- Stage dependent
- Skill dependent

**All tools have lying problem**
- Validation is YOUR job
- Tests are critical

**Speed vs Quality tradeoff**
- Fast tools → Quick, lower quality
- Slow tools → Better, more control

---

# The Real Skill

**Not mastering one tool**

**It's knowing:**
- When to use which
- How to combine them
- What trade-offs you're making

**And always:**
- Testing claims yourself
- Finding what works for YOUR context

---

# Final Recommendations

**For Students:**
1. Start with Gemini (free, easy)
2. Learn Copilot (production skill)
3. Explore others as needed

**For Projects:**
1. Prototype with fast tools
2. Build with production tools
3. Optimize with power tools

**For Learning:**
1. Understand limitations
2. Test everything
3. Stay critical

---

# Key Takeaway

> "Different tools for different stages. Choose based on evidence and context, not hype."

**Remember:**
- No tool is perfect
- Each has trade-offs
- Your judgment matters most

---

# Questions?

**Resources:**
- Gemini: gemini.google.com
- Claude: claude.ai
- Replit: replit.com
- v0: v0.dev
- GitHub Copilot: github.com/features/copilot

**Thank you!**
