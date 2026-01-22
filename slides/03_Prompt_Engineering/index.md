---
title: "CS 7180: Prompt Engineering"
theme: white
revealOptions:
  transition: convex
  hash: true
  history: true
---

<!-- .slide: id="title" -->

## CS 7180: Prompt Engineering

<img src="../img/seal_logotype-768x252.png" alt="Northeastern University" width="300">

[**John Alexis Guerra Gómez**](http://johnguerra.co/)

jguerra at northeastern.edu

Class: [johnguerra.co/classes/aiCoding_spring_2026](https://johnguerra.co/classes/aiCoding_spring_2026/)

Slides: [johnguerra.co/lectures/ai_assisted_coding](http://johnguerra.co/lectures/ai_assisted_coding/03_Prompt_Engineering/)

---

# What We'll Cover Today

**Part 1: Prompt Engineering**

1. Why Prompts Matter
2. Anatomy of a Good Prompt
3. Prompt Patterns & Techniques
4. Artifacts in Claude Web
5. Hands-On Lab

**Part 2: User Research Workshop**

6. Mom Test Principles
7. Design Thinking Basics

**HW1 Due This Week!**

---

# Prompt Engineering

> "A prompt is a program written in natural language."

<!-- vertical -->

# Why Prompts Matter

**Same model, different prompts:**

```
Prompt 1: "Write a function"
Result: Generic, maybe wrong

Prompt 2: "Write a TypeScript function that validates
email addresses. Handle edge cases like plus addressing.
Include JSDoc comments and unit tests."
Result: Specific, testable, documented
```

**Prompts are the new code.** Learn to write them well.

<!-- vertical -->

# The Prompting Paradox

> "The better you understand programming, the better you can prompt."

- You need to know what to ask for
- You need to recognize good vs. bad output
- You need to know when AI is wrong

**This is why understanding fundamentals matters.**

<!-- vertical -->

# Anatomy of a Good Prompt

**Five components:**

1. **Context** — Background information
2. **Task** — What you want done
3. **Format** — How to structure output
4. **Constraints** — Limitations and rules
5. **Examples** — Show don't tell

Not every prompt needs all five, but more context = better results.

<!-- vertical -->

<!-- .slide: class="dense" -->

# Claude 4 Best Practices

**What's different with Claude 4:**

1. **Be explicit** — Claude follows instructions precisely
   - Say exactly what you want (and don't want)
   - Vague prompts get vague results

2. **Add context** — Explain *why* you want something
   - "This is for a banking app" changes the output
   - Background improves relevance

3. **Be vigilant with details** — Claude pays close attention
   - Examples are taken literally
   - Typos in examples may be replicated

> "Claude 4 is more capable but requires more precision."

<!-- vertical -->

# Context Windows

**Claude's "working memory"** — everything it can see at once.

**200K tokens ≈ 150,000 words ≈ 1-2 books**

**Tips:**
- Put important info at the **beginning**
- Long conversations may "forget" early context
- Break large tasks into smaller conversations

<!-- vertical -->

# Example: Building a Prompt

**Bad prompt:**
```
Make a login form
```

**Good prompt:**
```
Context: I'm building a React app with TypeScript and TailwindCSS.
Task: Create a login form component with email and password fields.
Format: Functional component with proper TypeScript types.
Constraints:
- Use controlled inputs
- Include form validation
- Show error messages inline
- Add loading state for submit button
Examples: Similar to shadcn/ui form patterns.
```

<!-- vertical -->

<!-- .slide: class="dense" -->

# System vs User Prompts

**System prompt:**
- Sets the AI's "personality" and rules
- Persistent across the conversation
- Used for `.cursorrules`, `.antigravityrules`

**User prompt:**
- Your specific request
- Changes each interaction
- References the system context

```
[System] You are a TypeScript expert who writes clean code...
[User] Create a function that validates phone numbers
```

<!-- vertical -->

# The Iteration Loop

```
1. Write initial prompt
       ↓
2. Review output
       ↓
3. Identify issues ──→ Refine prompt
       ↓                    ↑
4. Test the code           |
       ↓                    |
5. Still wrong? ───────────┘
       ↓
6. Accept when correct
```

**Expect 2-5 iterations for complex tasks.**

---

# Prompt Patterns

Techniques that consistently improve results.

<!-- vertical -->

# Zero-Shot vs Few-Shot

**Zero-shot:** Just ask, no examples

```
Convert this date to ISO format: "January 15, 2026"
```

**Few-shot:** Provide examples first

```
Convert dates to ISO format:
- "March 1, 2024" → "2024-03-01"
- "December 25, 2023" → "2023-12-25"
- "January 15, 2026" → ?
```

**When to use few-shot:** Formatting, classification, consistent style.

<!-- vertical -->

# Chain-of-Thought

**Force the AI to think step-by-step:**

```
Before writing code, analyze this problem:

1. What are the inputs and outputs?
2. What edge cases exist?
3. What's the algorithm approach?
4. Now write the code.
```

**Works especially well for:**
- Complex logic
- Math problems
- Multi-step tasks

<!-- vertical -->

# Role Prompting

**Give the AI a persona:**

```
You are a senior software engineer at a FAANG company
doing a code review. Be critical and thorough.

Review this function for:
- Performance issues
- Security vulnerabilities
- Code style problems
```

**Effective roles:**
- Senior engineer (quality focus)
- Security expert (vulnerability focus)
- Technical writer (documentation focus)

<!-- vertical -->

<!-- .slide: class="dense" -->

# Structured Output

**Request specific formats:**

```
Return your analysis as JSON:
{
  "summary": "one sentence",
  "issues": ["list", "of", "issues"],
  "severity": "low|medium|high",
  "fix": "suggested code"
}
```

| Format | Best For |
| --- | --- |
| JSON | Parsing, APIs, structured data |
| YAML | Config files, readable without closing tags |
| XML | Nested data, Claude prefers this |
| Markdown | Documentation, readable output |

<!-- vertical -->

<!-- .slide: class="dense" -->

# Combining Patterns

**Real-world prompt using multiple patterns:**

```
[Role] You are a TypeScript expert focused on clean code.

[Chain-of-thought] First, analyze what this function does.
Then identify any bugs or improvements.
Finally, provide the fixed version.

[Few-shot example]
Input: function add(a,b){return a+b}
Analysis: Missing types, no validation
Fixed: function add(a: number, b: number): number {...}

[Your task]
Input: function fetchUser(id){...}

[Format] Return as JSON with fields: analysis, issues, fixed_code
```

---

# Artifacts in Claude Web

> "Interactive apps that emerge from your conversations with Claude."

<!-- vertical -->

# What Are Artifacts?

**Artifacts are live, interactive outputs:**

- Web apps and prototypes
- Data visualizations
- Interactive tools and calculators
- Games and simulations
- Documents and diagrams

**No coding required** — describe what you want, Claude builds it.

<!-- vertical -->

# Artifact Use Cases

- **Prototypes** — Landing pages, signup flows
- **Tools** — Calculators, converters, trackers
- **Visualizations** — Charts, diagrams, dashboards
- **Educational** — Interactive tutorials, quizzes
- **Business** — Inventory systems, project boards

**Perfect for:** Validating ideas before writing "real" code.

<!-- vertical -->

<!-- .slide: class="dense" -->

# Creating Artifacts

**The workflow:**

```
1. Describe your problem/idea
       ↓
2. Let Claude ask clarifying questions
       ↓
3. Request: "Can you create this for me?"
       ↓
4. Artifact appears in sidebar
       ↓
5. Iterate through conversation
```

**Trigger phrases:** "Create an app that...", "Build me a...", "Make an interactive..."

<!-- vertical -->

<!-- .slide: class="dense" -->

# Iterating on Artifacts

**Refinement through conversation:**

- "Make the button bigger"
- "Add a dark mode toggle"
- "The calculation is wrong when X happens"

**Debugging tip:** Describe what's wrong, not the technical error.

```
Bad:  "I get TypeError: undefined is not a function"
Good: "When I click submit with empty fields, nothing happens"
```

<!-- vertical -->

# Sharing Artifacts

**Once created, you can:**

- **View** — Anyone with link can see it
- **Remix** — Claude users can copy and modify

**Great for:**
- Showing prototypes to stakeholders
- Sharing tools with teammates
- Getting feedback before building "for real"

> "Build the demo in 5 minutes, not 5 days."

---

# Hands-On Lab

Time to practice!

<!-- vertical -->

# Exercise 1: Email Validator

**Challenge:** Write a prompt that generates an email validation function.

**Requirements:**
- TypeScript
- Handle edge cases (plus addressing, subdomains)
- Return `{ valid: boolean, reason?: string }`
- Include test cases

**Time:** 10 minutes

**Share:** Best prompts get discussed!

<!-- vertical -->

<!-- .slide: class="dense" -->

# Exercise 2: Iterate & Improve

**Take your v1 prompt and improve it:**

1. Run your prompt
2. Find issues in the output
3. Add constraints to fix them
4. Run again
5. Repeat until satisfied

**Document:**
- What issues did you find?
- What prompt changes fixed them?
- How many iterations did it take?

<!-- vertical -->

# Discussion: What Worked?

**Share your findings:**

- What made prompts better?
- What patterns did you use?
- What surprised you?
- What's still hard?

---

# Mom Test Workshop

> "The measure of usefulness of an early customer conversation is whether it gives us concrete facts about our customers' lives and world views."
> — Rob Fitzpatrick

<!-- vertical -->

# The Mom Test Principles

**Three rules for getting honest feedback:**

1. Talk about **their life**, not your idea
2. Ask about **specifics in the past**, not generics about the future
3. **Talk less**, listen more

> Your mom will lie to you. Not because she's evil, but because she loves you.

<!-- vertical -->

# Why People Lie

- They want to be **supportive**
- They don't want to **hurt your feelings**
- They **imagine** a better version of themselves
- Hypothetical questions get **hypothetical answers**

**The fix:** Ask about what they've actually done, not what they would do.

<!-- vertical -->

<!-- .slide: class="dense" -->

# Bad vs Good Questions

| Bad Question | Why It's Bad | Good Alternative |
| --- | --- | --- |
| "Would you use this app?" | Hypothetical, easy to say yes | "How do you currently solve this?" |
| "Is this a good idea?" | Opinion, not behavior | "Tell me about the last time..." |
| "Would you pay $10/month?" | Future promise, meaningless | "What have you paid for before?" |
| "Do you have this problem?" | Leading question | "Walk me through your workflow" |

<!-- vertical -->

# The Golden Questions

**Ask these in every interview:**

1. "Tell me about the last time you [had this problem]..."
2. "What did you do to solve it?"
3. "What else have you tried?"
4. "How much did that cost you (time/money/frustration)?"
5. "What's the hardest part about [doing this thing]?"

<!-- vertical -->

# Workshop Exercise

**Pair up and practice!**

**Scenario:** Your partner has an app idea. Interview them using Mom Test principles.

**Rules:**
- 5 minutes per person
- No hypotheticals allowed
- Focus on past behavior
- Write down concrete facts

**Debrief:** What facts did you learn? What would you build?

<!-- vertical -->

# From Interviews to User Stories

**Interview insight:**
> "I spend 30 minutes every morning checking three different apps for my schedule."

**Becomes user story:**
> "As a busy professional, I want to see all my schedules in one place, so that I don't waste time switching between apps."

**Key:** User stories come from real problems, not imagined features.

---

# Design Thinking

> "Design thinking is a human-centered approach to innovation that draws from the designer's toolkit."
> — IDEO

<!-- vertical -->

# The 5 Phases

```
Empathize → Define → Ideate → Prototype → Test
    ↑                                        |
    └────────────────────────────────────────┘
                    (Iterate)
```

**Not linear!** You'll loop back often.

<!-- vertical -->

# Empathize & Define

**Empathize:**
- Mom Test interviews
- Observation
- Immersion in user context

**Define:**
- Synthesize findings
- Create problem statement
- "How might we..." questions

> "How might we help busy professionals manage multiple schedules?"

<!-- vertical -->

# Ideate & Prototype

**Ideate:**
- Brainstorm solutions (quantity over quality)
- No judgment during ideation
- Build on others' ideas

**Prototype:**
- Quick, cheap, disposable
- Test the concept, not the polish
- "Fail fast, learn faster"

<!-- vertical -->

# Test & Iterate

**Test:**
- Put prototypes in front of users
- Watch what they do (not just what they say)
- Gather feedback

**Iterate:**
- What worked? Keep it.
- What didn't? Change it.
- Return to any phase as needed.

> "Your first idea is rarely your best idea."

<!-- vertical -->

# Design Thinking + AI

**How AI accelerates the cycle:**

- **Empathize:** AI can summarize interview notes
- **Define:** AI helps articulate problem statements
- **Ideate:** AI generates many ideas quickly
- **Prototype:** AI builds working prototypes fast
- **Test:** Still need real users!

**Warning:** AI can't replace empathy. It can't do user interviews for you.

---

<!-- .slide: class="dense" -->

# What to Remember

1. **Good prompts:** Context + Task + Format + Constraints + Examples
2. **Patterns:** Few-shot, chain-of-thought, role prompting, structured output
3. **Iterate:** Expect 2-5 rounds for complex prompts
4. **Verify:** AI output needs human validation
5. **Mom Test:** Ask about past behavior, not future promises
6. **Design Thinking:** Empathize → Define → Ideate → Prototype → Test

---

# Looking Ahead

**Next class:**
- Antigravity IDE setup
- Tab autocomplete & inline chat
- `.antigravityrules` configuration
- TDD Introduction

**HW2 Preview:** Prompt Engineering Battle
- Three challenges (easy, medium, hard)
- Document your iterations
- Build your personal prompt templates

---

# HW1 Due This Week!

**Deliverables:**
- 3 Mom Test interview notes
- 5-8 user stories
- MoSCoW prioritization
- Initial PRD (1-2 pages)

**Submit on Canvas**

---

# Resources

**Claude Web & Artifacts:**
- [Claude Artifacts Guide](https://support.claude.com/en/articles/11649427-use-artifacts-to-visualize-and-create-ai-apps-without-ever-writing-a-line-of-code)

**Prompt Engineering:**
- [Prompt Engineering Overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)
- [Claude 4 Best Practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-4-best-practices)
- [Anthropic Prompt Engineering Tutorial](https://github.com/anthropics/courses/tree/master/prompt_engineering_interactive_tutorial)

**Books:**
- "The Mom Test" by Rob Fitzpatrick
- "Designing for Growth" by Liedtka & Ogilvie

---

# Questions?
