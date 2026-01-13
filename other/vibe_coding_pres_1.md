---
marp: true
theme: default
paginate: true
---

# Vibe Coding
## A Short Course for CS Students

**Instructor:** John Alexis Guerra Gomez
**Duration:** 1.5 hours
**Fall 2025**

---

# What is Vibe Coding?

- **AI-assisted software development**
- Natural language → Working code
- Tools: GitHub Copilot, Cursor, Claude Code
- Shift: From "code typist" to "software conductor"

---

# Act 1: Foundation (20 min)

## What You Need to Know

---

# Mental Model Shift

**Before:**
- Write every line of code yourself
- Memorize syntax and APIs
- Debug character by character

**Now:**
- Describe what you want
- AI generates implementation
- You review and architect

---

# The Skill Stack

1. **Requirements Engineering** - Be specific about what you want
2. **Prompt Engineering** - Communicate effectively with AI
3. **Architecture** - Design the system (AI implements)
4. **Testing** - Validate AI output rigorously
5. **Code Review** - Critical evaluation of generated code

---

# Tool Landscape: GitHub Copilot

**Best for students:**
- ✅ FREE tier (50 requests/month)
- ✅ GitHub Education: Free access
- ✅ Works in VS Code
- ✅ Lowest barrier to entry

**Price:** $10/month individual, $39/month Pro+

---

# Tool Landscape: Cursor

**For power users:**
- $20/month
- Full IDE (VS Code fork)
- Multi-file editing
- Agent capabilities
- Models: GPT-4.5, Claude 4, Gemini 2.5

---

# Tool Landscape: Claude Code

**For professionals:**
- $100/month (no free tier)
- CLI-based tool
- Maximum control
- Terminal access
- Best for complex tasks

---

# Quick Comparison

| Tool | Free? | Interface | Best For |
|------|-------|-----------|----------|
| **Copilot** | ✅ Yes | Extension | Students |
| **Cursor** | Trial | Full IDE | Power users |
| **Claude Code** | ❌ No | CLI | Professionals |

**Recommendation:** Start with GitHub Copilot

---

# Act 2: The Craft (40 min)

## PRD, Prompting & Demo

---

# Part A: PRD & Task Breakdown

## Why Product Requirements Documents Matter

---

# The PRD Problem

**Without PRD:**
- AI context window can't see your vision
- Scope creep
- Inconsistent implementation
- Lost progress across sessions

**With PRD:**
- Source of truth
- Context for AI
- Progress tracker
- Clear acceptance criteria

---

# Essential PRD Structure

```markdown
# Product Requirements Document

## 1. Product Overview
- Problem statement
- Target users
- Core value proposition

## 2. Technical Stack
- Framework (Next.js 14, Django, etc.)
- Database (PostgreSQL, MongoDB)
- Authentication approach
```

---

# PRD Structure (continued)

```markdown
## 3. Core Features (Priority Order)
### Feature 1: [Name] - HIGH PRIORITY
- Description
- User Flow
- Acceptance Criteria
- Technical Notes

## 4. Implementation Phases
- Phase 1: MVP
- Phase 2: Enhanced
- Phase 3: Polish
```

---

# Vertical Slice Implementation

**❌ Bad (Horizontal):**
```
Task 1: Design all database schemas
Task 2: Build all API endpoints
Task 3: Create all UI components
```
**Problem:** Nothing works until everything is done

---

# Vertical Slice Implementation

**✅ Good (Vertical):**
```
Task 1: Basic task creation (DB + API + UI)
Task 2: Task list view (DB query + API + UI)
Task 3: Mark task complete (update + API + UI)
```
**Benefit:** Each task delivers working functionality

---

# AI-Assisted PRD Creation

**Prompt:**
```
"I want to build a task management app 
for small dev teams.

Generate a PRD following best practices:
- Clear feature descriptions
- Technical stack recommendations
- Implementation phases (vertical slices)
- Acceptance criteria for each feature"
```

---

# Critical PRD Review

**Prompt:**
```
"Review this PRD critically. 
You are a senior software architect.

Challenge me on:
1. Unclear or ambiguous features?
2. Technical challenges not considered?
3. Is scope reasonable for 3-4 weeks?
4. What edge cases am I missing?
5. Are phases ordered correctly?"
```

---

# Part B: Prompt Engineering for Code

## The Five Core Principles

---

# Principle 1: Be Specific

**❌ Bad:**
```
"Create a user authentication system"
```

**✅ Good:**
```
"Create JWT-based authentication for Next.js 14:
- App Router with server actions
- PostgreSQL with Prisma
- HTTP-only cookies for tokens
- Middleware for protected routes
- Password hashing with bcrypt (10 rounds)"
```

---

# Principle 2: Provide Context

**Load context effectively:**
```
"Create a comment API endpoint.

Context:
- Follow the pattern in @app/api/tasks/route.ts
- Use our auth middleware from @middleware/auth.ts
- Database models: @prisma/schema.prisma

Match the existing code style and error handling."
```

---

# Principle 3: One Task at a Time

**❌ Bad:**
```
"Build authentication, add database, 
create UI, and deploy"
```

**✅ Good:**
```
Step 1: "Create Prisma schema for User model"
Step 2: "Add JWT utilities (sign/verify)"
Step 3: "Create server action for login"
Step 4: "Build login form component"
```

---

# Principle 4: Start Fresh for Features

**Why:**
- Avoid context contamination
- Prevent AI from getting confused
- Each feature = new session

**How:**
- Use `/clear` command
- Start new chat
- Reference only relevant context

---

# Principle 5: Patience in Debugging

**Reality:**
- AI will make mistakes
- First solution rarely perfect
- Your job: Guide to solution

**Approach:**
- Use error messages as feedback
- Iterate systematically
- Don't give up - debug step by step

---

# Advanced: Chain of Thought

**For complex logic:**
```
"Let's think through building real-time 
collaborative editor:

1. What websocket library should we use?
2. How should we structure document state?
3. How do we handle conflict resolution?
4. Implement operational transforms

Start with step 1."
```

---

# Advanced: Format Specification

```
"Generate a Python function:

Name: calculate_compound_interest
Parameters: 
  - principal (float)
  - rate (float) 
  - years (int)
Returns: dict with 'final_amount', 'interest_earned'
Include: Type hints, docstring, error handling
Style: PEP 8, descriptive variable names"
```

---

# Advanced: Test-Driven Prompting

```
"Here are the tests for user registration:

def test_user_registration():
    user = register_user("test@example.com", "pass123")
    assert user.email == "test@example.com"
    assert user.password != "pass123"  # hashed
    assert user.created_at is not None

Now implement register_user() to pass these tests."
```

---

# Part C: Live Demo

## GitHub Copilot in Action

---

# Demo Setup

**What we'll build:**
- Add "Task Comments" feature
- Full vertical slice
- Using GitHub Copilot

**Tools:**
- VS Code
- GitHub Copilot
- Existing task manager codebase

---

# Demo: PRD Section

```markdown
### Feature: Task Comments

**Acceptance Criteria:**
- Users can add comments to any task
- Comments show author and timestamp
- Comments editable by author only
- Real-time updates not required

**Technical:**
- MongoDB Comment collection
- API: POST /api/tasks/[id]/comments
- Follow existing patterns
```

---

# Demo: Planning with Copilot

**In Copilot Chat:**
```
"Read the PRD for task comments.

Also read:
@models/Task.ts
@app/api/tasks/route.ts

Break this into 3 implementation tasks 
following vertical slice approach.

Ask questions about anything unclear."
```

---

# Demo: Implementation Steps

**Copilot generates:**
```
Task 1: Database Schema
- Create Comment model
- Add relationships
- Generate migration

Task 2: API Endpoint
- POST /api/tasks/[id]/comments
- Validation with Zod
- Auth check
- Error handling
```

---

# Demo: Implementation Steps (cont.)

```
Task 3: Frontend
- CommentList component
- CommentForm component
- Integrate into task detail page

Ready to proceed?
```

---

# Demo: Task 1 - Database

**Type in VS Code:**
```typescript
// Comment model for task comments
// Fields: content (max 500), author, taskId
// Timestamps: createdAt, updatedAt
```

**Copilot autocompletes:**
- Full Mongoose schema
- Validation rules
- References to User and Task
- Indexes

---

# Demo: Critical Review

**Teaching moment:**
- AI generated 80% correct code
- Missing: Index on taskId
- Missing: Business logic (5-minute edit window)

**Lesson:** You provide the critical 20%

---

# Demo: Iteration

**Refine the prompt:**
```
"Add an index on taskId for performance.

Also add a method canEdit(userId):
- Checks if user is the author
- Checks if < 5 minutes since creation"
```

**Copilot adds missing pieces**

---

# Demo: Testing

**Generate tests:**
```
Copilot Chat: 
"Generate tests for POST /api/comments endpoint.

Cover:
- Authenticated user success
- Unauthenticated rejection
- Invalid input validation
- Non-existent task returns 404"
```

---

# Demo: The Rabbit Hole

**What happens when things go wrong:**
1. Vague prompt leads to incorrect code
2. "Fix it" makes it worse
3. AI compounds the problem
4. Code gets messier

**Solution:** Git checkpoint, rollback, better prompt

---

# Act 3: Advanced Patterns (20 min)

---

# Task Decomposition Strategies

**Vertical Slice Pattern Example:**

**Phase 1: MVP Auth**
- Email/password only
- Basic hashing
- Simple sessions
**Time:** 4-6 hours

**Phase 2: Enhanced**
- Password requirements
- Remember me
- Rate limiting
**Time:** 3-4 hours

---

# Test-Driven Vibe Coding

**The TDD Loop:**

1. **Write tests** (with AI)
2. **Run tests** (they fail - expected)
3. **AI implements** to pass tests
4. **Refactor** with tests green

**Benefit:** Tests catch AI hallucinations

---

# Multi-File Coordination

**Challenge:** Real features span multiple files

**Strategy: Anchor File Pattern**
```typescript
// features/export-pdf/index.ts
/**
 * PDF Export Feature
 * 
 * Files:
 * - components/ExportButton.tsx
 * - app/api/export/route.ts
 * - lib/pdf-generator.ts
 * - types/export.ts
 */
```

---

# Code Review with AI

**Two-Stage Process:**

**Stage 1: AI Pre-Review**
- Security check
- Performance issues
- Code quality
- Test coverage

**Stage 2: Human Review**
- Business logic correctness
- Architecture decisions
- User experience

---

# AI Review Checklist

```markdown
## Security
- [ ] No hardcoded secrets
- [ ] Input validation
- [ ] SQL injection prevention
- [ ] XSS prevention

## Performance
- [ ] No N+1 queries
- [ ] Appropriate indexes
- [ ] Efficient algorithms
```

---

# Act 4: Best Practices (10 min)

---

# What Still Matters (MORE)

1. **Requirements** - Vague requirements = bad output
2. **Architecture** - You design, AI implements
3. **Testing** - More important than ever
4. **Code Review** - AI is like fast junior dev
5. **Documentation** - PRDs, CLAUDE.md files

---

# What Has Changed

**Speed:**
- Boilerplate: Minutes instead of hours
- But planning takes same (or more) time

**Skills:**
- More: Requirements, architecture, testing, review
- Less: Syntax, memorizing APIs, boilerplate

**Iteration:**
- Faster to try alternatives
- Easier to refactor

---

# Common Pitfalls

**❌ Over-trusting AI**
- AI wrote it, ship it!

**✅ Critical Review**
- AI wrote it, now I review carefully

**❌ Vague Requirements**
- "Build a login system"

**✅ Specific Requirements**
- "Build login with email/password, JWT..."

---

# Common Pitfalls (continued)

**❌ No Testing**
- It works on my machine

**✅ Comprehensive Testing**
- Tests pass, edge cases covered

**❌ Accepting First Solution**
- Looks good, done!

**✅ Exploring Alternatives**
- Show me 2 other approaches

---

# Key Takeaways

**DO:**
- ✅ Plan extensively before coding
- ✅ Use mainstream tech stacks
- ✅ Write tests first
- ✅ Read everything AI generates
- ✅ Commit frequently

---

# Key Takeaways (continued)

**DON'T:**
- ❌ Trust AI blindly
- ❌ Use AI to learn new concepts
- ❌ Skip testing
- ❌ Accept first solution

**REMEMBER:**
- You're the architect
- AI is the builder
- Quality is your responsibility

---

# Resources

**Learn:**
- DeepLearning.AI: Vibe Coding 101 with Replit
- Coursera: Vibe Coding Fundamentals
- Codecademy: Intro to Vibe Coding

**Reference:**
- GitHub: Prompt Engineering Guide (dair-ai)
- Anthropic: Prompt Engineering Tutorial
- Anthropic: Claude Code Best Practices

---

# Final Message

"Vibe coding doesn't make software engineering easier - it makes it different.

You still need to understand requirements, design architecture, write tests, and review code.

What changes is implementation speed.

Learn to be an excellent software engineer first. Then use AI as a force multiplier."

---

# Questions?

**Contact:**
- GitHub Copilot: github.com/features/copilot
- Course materials: [your repo]
- Office hours: [schedule]

**Thank you!**
