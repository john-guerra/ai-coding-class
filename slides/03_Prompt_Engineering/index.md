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

1. Why Prompts Matter
2. Anatomy of a Good Prompt
3. Prompt Patterns & Techniques
4. Artifacts in Claude Web
5. Hands-On Lab

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

<!-- .slide: class="dense" -->

# What to Remember

1. **Good prompts:** Context + Task + Format + Constraints + Examples
2. **Patterns:** Few-shot, chain-of-thought, role prompting, structured output
3. **Iterate:** Expect 2-5 rounds for complex prompts
4. **Verify:** AI output needs human validation

---

# Looking Ahead

**Next class: User Research & Prototyping**
- Mom Test & Design Thinking workshop
- Claude Web Artifacts for rapid prototyping
- User story writing & PRD refinement

**HW1 Due Next Week:** Prompt Engineering Battle

---

# Resources

**Claude Web & Artifacts:**
- [Claude Artifacts Guide](https://support.claude.com/en/articles/11649427-use-artifacts-to-visualize-and-create-ai-apps-without-ever-writing-a-line-of-code)

**Prompt Engineering:**
- [Prompt Engineering Overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)
- [Claude 4 Best Practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-4-best-practices)
- [Anthropic Prompt Engineering Tutorial](https://github.com/anthropics/courses/tree/master/prompt_engineering_interactive_tutorial)

---

# Questions?
