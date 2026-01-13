---
marp: true
theme: default
paginate: true
---

# How to Use GenAI for Coding
## A Critical Perspective

**John Alexis Guerra Gomez**
**Fall 2025**

---

# What It Actually Is

---

# Reality Check: What AI IS

- ❌ Doesn't understand the world
- ✅ Understands embeddings (very useful)
- 🚨 **It's a pathological liar**
- 😊 People pleaser
- 📊 Converges to the median
- 📚 Only as good as the data
- ✨ All answers will **look** good

---

# The Core Problem

> "It doesn't understand the world"

**What this means:**
- No common sense
- No real reasoning
- Pattern matching, not thinking
- Confidently wrong

---

# The Validation Problem

## Can you validate the output quickly?

---

# Image Generation vs Code

**Images:**
- ✅ Can I quickly count the fingers?
- ✅ Instant visual validation

**Code:**
- ❌ You cannot validate code that quickly
- ❌ It is hard to iterate
- 🎯 **This is the critical difference**

---

# The Learning Danger

> "If you cannot quickly validate the answer, how can you trust it?"

**Implication:**
- **Dangerous to use it for learning**
- You should already know the answer
- Use AI to accelerate what you understand
- Never use AI to learn something new

---

# Hidden Implications

---

# The True Cost of AI

- 👥 Data labeling via slavery
- ⛏️ Metal extractions (environmental damage)
- ©️ Copyright infringement
- 🌍 Global warming impact

**Read:** *Atlas of AI* by Kate Crawford

---

# Empire of AI

**OpenAI operates like an empire:**
- 🏴‍☠️ Invades/Takes what doesn't belong to it
- 🦸 Claims it needs to be the "good superpower"
- 💸 Doesn't distribute wealth → Promises global income
- 🌡️ Doesn't address global warming
- 📜 Removes regulations
- 💪 More powerful than government now

---

# Prompt Engineering

---

# The State of Prompting

- 🔥 **Hot in 2024**
- 💀 **Dead in 2025**
- 🎯 **Be specific**
- 🤔 **Context Engineering?**

**Evolution:** From clever prompts → Better context

---

# What Really Works

## You Should Know the Answer

---

# The Validation Principle

**Critical rule:**
> "If you cannot quickly validate the answer, how can you trust it?"

**Consequence:**
- Dangerous to use for learning
- Must have domain knowledge
- Verification is YOUR job

---

# When AI Actually Works

---

# Document Recovery (Embeddings)

**AI is excellent at:**
- ✅ Similarity matching
- ✅ Finding the correct matching document
- ✅ Comparing patterns
- ✅ Replacing Stack Overflow

**Technologies:**
- RAG (Retrieval-Augmented Generation)
- Vector databases

---

# For Inspiration?

**Helpful for:**
- ✅ Considering alternatives quickly
- ✅ Checking you're not missing cases

**The problem:**
> "If we all use it for ideation, we will all come up with the same common ideas"

**Result:** Convergence to median solutions

---

# Identifying Common Patterns

**Success story:**
- Stanford's Bernstein research
- Simulating human behavior
- Good for pattern recognition

**But:** Limited for true innovation

---

# Training & Metrics

---

# Critical Questions

**Always ask:**
- 🎯 What are the metrics?
- 📊 What is the training data?
- 🎨 What is the learning function?

**Examples:**
- Tesla FSD doesn't care about cabin comfort
- Facebook optimizes for engagement (not well-being)

---

# Practical Tips

---

# Be Specific

**Three key practices:**
1. **Give formats**
   - Specify exact output structure
2. **Break down complex tasks**
   - One step at a time
3. **Provide multiple examples**
   - Images? Sketches?

---

# When Coding

> "If you can use the status quo tools, it works better"

**Translation:**
- Use TypeScript (not JavaScript)
- Use React (not obscure frameworks)
- Use Next.js (most training data)
- Use MongoDB or PostgreSQL

**Why?** More examples in training data

---

# Give It Ways to Validate

**Best practice:**
> "E.g., making unit tests"

**Process:**
1. Write tests first
2. AI implements to pass tests
3. Tests validate correctness
4. You verify the tests

---

# Coding Agents: The Reality

---

# Overall Findings

**From extensive real-world use:**
- Use memory features
- Define architecture clearly
- Use AI-friendly architectures
- Define how to test upfront

---

# Model Differences

**Important discovery:**
> "Opus 4 >> Sonnet 4"

**For complex tasks:**
- Use stronger models
- Accept higher cost
- Better results

**For boilerplate:**
- Sonnet is fine

---

# The Laziness Problem

> "Very lazy. Scrub under the rug. Easiest solution for the task you specify"

**AI takes shortcuts:**
- Minimal error handling
- Quick hacks instead of robust solutions
- You must specify "no shortcuts"

---

# Memory Issues

**Reality:**
> "Keeps on forgetting despite memory"

**Problems:**
- Context compacting affects quality
- Long sessions degrade
- "Some days comes with better moods and works better"

**Solution:** Start fresh sessions often

---

# Advanced Techniques

---

# Think Modes

**Discovery:**
> "Think, Ultra Think"

**Hierarchy:**
- `think` < `think hard` < `think harder` < `ultrathink`

**Usage:**
```
"Ultrathink about this architecture decision"
```

Allocates more compute for reasoning

---

# Planning is Critical

> "Plan, plan, plan"

**Process:**
1. Extensive planning before coding
2. Break into milestones
3. Define validation criteria
4. Then let AI implement

**Planning time increased, implementation time decreased**

---

# Checkpoints & Git

> "Combine with GitHub to have checkpoints"

**Why:**
- ChatGPT added checkpoints
- Cursor has them
- **AI will go in rabbit holes**

**Strategy:**
- Commit when things work
- Easy rollback
- Small, atomic commits

---

# Screenshots as Context

**Powerful technique:**
> "Take screenshots to provide examples"

**Advanced:**
- Use Playwright for automatic testing
- Headless browser testing
- Put in rules (even if doesn't work)
- VS Code allows selecting actual elements

---

# Avoiding Rabbit Holes

---

# Keep Milestones

**Strategy:**
1. Commit frequently
2. When AI goes wrong, rollback
3. Start over with better prompt

**Reality:**
> "AI will go in rabbit holes"

Be prepared to backtrack

---

# Tell It to Contradict You

**Important technique:**
> "Make it ask you questions"

**But warning:**
> "Be careful what you suggest - it will LIE to you in order to please you"

**AI wants to please, not be correct**

---

# File Size Matters

**Critical constraint:**
> "Consider that it cannot see the whole file for large files"

**Rules:**
- Keep files small
- Use good design principles
- Set limits (e.g., 200 lines max)
- Extract repeated code

---

# Code Duplication

**Common problem:**
> "It can start duplicating code"

**Solutions:**
- ✅ Read everything it writes
- ✅ You have to be the system designer
- ✅ Enforce DRY principle explicitly
- ✅ Review for patterns

---

# Existing Codebases

**Key insight:**
> "It works better if you have already an existing codebase"

**Why:**
- AI copies existing code style
- Consistent patterns
- Established conventions
- Less guessing

---

# Use Popular Tools

**Evidence-based recommendation:**
> "It works better if you use what the majority uses (TypeScript, React, Next.js, Mongo)"

**Reasoning:**
- More training data
- Better examples
- Fewer hallucinations
- Well-documented patterns

---

# The Tutorial Technique

**Most powerful method:**
> "Tell it to follow a tutorial (URL), and give it the official documentation, and it will do marvels"

**Process:**
1. Find good official tutorial
2. Reference official docs
3. Combine with your context
4. AI follows proven patterns

---

# Library Translation

**Success story:**
> "It also worked very well translating libraries into other languages"

**Method:**
```
"Start from scratch and create an MVP 
that implements [feature] in [language].

Don't port directly - rebuild the concept."
```

**Example:** Python ML library → JavaScript browser version

---

# The 3 Agents Hack

**Practical technique:**
Use three separate agents/sessions:

1. **Agent 1:** Planning & PRD creation
2. **Agent 2:** Implementation
3. **Agent 3:** Critical review

**Why it works:** Different contexts, fresh perspective

---

# Tool Comparison

---

# GitHub Copilot

**Strengths:**
- ✅ Free tier available
- ✅ VS Code integration
- ✅ Students can access

**Limitations:**
- Context window
- Inline can encourage blind acceptance

---

# Cursor

**Strengths:**
- Multi-file editing
- Agent mode
- Composer

**Limitations:**
- $20/month
- No free tier
- Can be overwhelming

---

# Claude Code

**Strengths:**
- Terminal access
- Maximum control
- Explicit reasoning

**Limitations:**
- $100/month (expensive)
- No free tier
- CLI learning curve
- Intimidating for beginners

---

# Recommendation for Students

**Start with:** GitHub Copilot
- Free tier
- Familiar interface
- Lower barrier

**Explore:** Cursor (trial)
**Advanced:** Claude Code (if budget allows)

---

# Key Takeaways

---

# Critical Principles

1. **Validate everything** - You can't trust AI
2. **Know the answer first** - Don't learn with AI
3. **Plan extensively** - "Plan, plan, plan"
4. **Use checkpoints** - Git is essential
5. **Read all code** - You're the system designer

---

# What AI Is Good At

✅ Boilerplate code
✅ Following patterns
✅ Document search
✅ Finding similar code
✅ Implementing specs

---

# What AI Is Bad At

❌ Novel problems
❌ Understanding context
❌ Complex reasoning
❌ Avoiding shortcuts
❌ Staying consistent

---

# The Median Trap

**Remember:**
> "If we all use it for ideation, we will all come up with the same common ideas"

**How to differentiate:**
- Use AI for mechanics
- Innovate in architecture
- Domain expertise
- User understanding
- Creative solutions

---

# Ethical Considerations

**Never forget:**
- Hidden labor costs
- Environmental impact
- Copyright issues
- Power concentration
- Societal implications

**Be a critical user, not just a consumer**

---

# Best Practices Summary

1. ✅ Be specific
2. ✅ Break tasks down
3. ✅ Provide examples
4. ✅ Use tests for validation
5. ✅ Commit frequently
6. ✅ Read everything
7. ✅ Use popular tools
8. ✅ Follow tutorials + docs
9. ✅ Keep files small
10. ✅ Plan before coding

---

# Final Reality Check

**AI is:**
- 🎯 A powerful tool
- 🚨 A pathological liar
- 📊 Limited to training data
- 🤖 Not intelligent
- 💪 Useful when used correctly

**You are:**
- 🧠 The architect
- ✅ The validator
- 🎨 The designer
- 🔍 The critical reviewer
- 👑 The decision maker

---

# Questions?

**Remember:**
- Stay critical
- Validate everything
- Understand the limitations
- Use ethically
- Keep learning

**Thank you!**

---

# Additional Resources

**Critical Reading:**
- *Atlas of AI* by Kate Crawford
- Anthropic Engineering Blog
- GitHub Copilot Best Practices

**Tools:**
- GitHub Copilot (free tier)
- Playwright (testing)
- Git (checkpoints)

**Communities:**
- Critical AI studies
- Responsible tech forums
