---
title: "CS 6983: Prompt Engineering"
theme: white
revealOptions:
  transition: convex
  hash: true
  history: true
---

<!-- .slide: id="title" -->

<span class="course-week">CS 6983 · Week 3 · [Class](https://johnguerra.co/classes/aiCoding_fall_2026/) · [Slides](https://johnguerra.co/lectures/aiCoding_fall2026/03_Prompt_Engineering/)</span>

## Prompt Engineering

### Patterns · Techniques · Artifacts

<div class="title-footer">

**John Alexis Guerra Gómez** · [johnguerra.co](http://johnguerra.co/)

<small>jguerra at northeastern.edu · Northeastern University · Khoury College</small>

<img src="../img/seal_logotype-768x252.png" alt="Northeastern University" class="nu-seal">

<small class="cc-license">© 2026 John A. Guerra Gómez · Licensed <a href="https://creativecommons.org/licenses/by-nc/4.0/">CC BY-NC 4.0</a></small>

</div>

---

## What We'll Cover Today

1. Why Prompts Matter
2. Anatomy of a Good Prompt
3. Prompt Patterns & Techniques
4. Artifacts in Claude Web
5. Hands-On Lab

---

## Prompt Engineering

> "A prompt is a program written in natural language."

<!-- vertical -->

## Why Prompts Matter

**Same model, different prompts:**

```text
Prompt 1: "Write a function"
Result: Generic, maybe wrong

Prompt 2: "Write a TypeScript function that validates
email addresses. Handle edge cases like plus addressing.
Include JSDoc comments and unit tests."
Result: Specific, testable, documented
```

**Prompts are the new code.** Learn to write them well.

<!-- vertical -->

## The Prompting Paradox

> "The better you understand programming, the better you can prompt."

- 🎯 You need to know what to ask for
- 🔍 You need to recognize good vs. bad output
- 🚨 You need to know when AI is wrong

🧠 **This is why understanding fundamentals matters.**

<!-- vertical -->

## Anatomy of a Good Prompt

**Five components:**

1. **Context** — Background information
2. **Task** — What you want done
3. **Format** — How to structure output
4. **Constraints** — Limitations and rules
5. **Examples** — Show don't tell

Not every prompt needs all five, but more context = better results.

<!-- vertical -->

<!-- .slide: class="dense" -->

## Best Practices for Current Models

1. **Be clear and direct** — treat Claude as "a brilliant but new employee who lacks context"
   - Say exactly what you want; vague prompts get vague results
2. **Explain why** — the motivation behind an instruction helps Claude target the result
   - "This is for a banking app" changes the output
3. **Show examples** — "Include 3–5 examples for best results"
4. **Say what to do**, not only what not to do
   - "Write flowing prose paragraphs" beats "Don't use markdown"

> Model-specific tips: "re-check it against your own evals before applying it to another."

<!-- vertical -->

<!-- .slide: class="dense" -->

## What Changed in Current Models

| Technique | Then | Now |
| --- | --- | --- |
| Prefill the assistant turn | Common trick to force a format | **Not supported** from Claude 4.6 models on |
| "Think step by step" | Standard advice | Model reasons on its own; "think thoroughly" often beats a hand-written plan |
| "CRITICAL: You MUST…" | Fixed under-triggering | Over-triggers on Opus 4.5/4.6 — use normal language |
| "Double-check your answer" | Catches errors | Still reliable in general, but **Opus 5 over-verifies** — remove it there |

> Best practices are now **versioned per model**. Don't memorize them — measure them.

<small>Source: [Anthropic — Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)</small>

<!-- vertical -->

## Context Windows

**Claude's "working memory"** — everything it can see at once.

**200K tokens ≈ 150,000 words ≈ 1-2 books** (most Claude models; Sonnet 5 / Opus 5.5: 1M)

**Tips:**
- Put long documents **at the top**, your question **at the end** (Anthropic: up to 30% better on complex inputs)
- Long conversations may "forget" early context (oldest turns get dropped or summarized)
- Break large tasks into smaller conversations

<!-- vertical -->

## Example: Building a Prompt

**Bad prompt:**
```text
Make a login form
```

**Good prompt:**
```text
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

## System vs User Prompts

**System prompt:**
- Sets the AI's "personality" and rules
- Persistent across the conversation
- Used for `.cursorrules`, `.antigravityrules`

**User prompt:**
- Your specific request
- Changes each interaction
- References the system context

```text
[System] You are a TypeScript expert who writes clean code...
[User] Create a function that validates phone numbers
```

<!-- vertical -->

## The Iteration Loop

```text
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

## Prompt Patterns

Techniques that often improve results — test them on your model.

<!-- vertical -->

## Zero-Shot vs Few-Shot

**Zero-shot:** Just ask, no examples

```text
Convert this date to ISO format: "January 15, 2026"
```

**Few-shot:** Provide examples first

```text
Convert dates to ISO format:
- "March 1, 2024" → "2024-03-01"
- "December 25, 2023" → "2023-12-25"
- "January 15, 2026" → ?
```

**When to use few-shot:** Formatting, classification, consistent style.

<!-- vertical -->

<!-- .slide: class="dense" -->

## Chain-of-Thought: Then vs. Now

<div class="columns">
<div class="column">

**Then (2023–24)**

- "Think step by step" unlocked reasoning
- You hand-wrote the steps:

```text
1. Inputs and outputs?
2. Edge cases?
3. Algorithm approach?
4. Now write the code.
```

</div>
<div class="column">

**Now (current models)**

- The model **reasons on its own** (extended thinking)
- "Think thoroughly" often beats a hand-written plan
- Write explicit steps when you need a **specific process** or want to **inspect intermediate outputs**

</div>
</div>

<!-- vertical -->

<!-- .slide: class="dense" -->

## Role Prompting

<div class="columns">
<div class="column">

**Give the AI a persona:**

```text
You are a senior software
engineer at a FAANG company
doing a code review. Be
critical and thorough.

Review this function for:
- Performance issues
- Security vulnerabilities
- Code style problems
```

</div>
<div class="column">

**Effective roles:**
- Senior engineer (quality focus)
- Security expert (vulnerability focus)
- Technical writer (documentation focus)

</div>
</div>

> A role sets **focus and tone** — "even a single sentence makes a difference." Does it improve *correctness* for your task? Test it (HW1 myth test).

<!-- vertical -->

<!-- .slide: class="dense" -->

## Structured Output

**Request specific formats:**

```text
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
| XML | Nested data; XML **tags** also structure your *prompts* |
| Markdown | Documentation, readable output |

<!-- vertical -->

<!-- .slide: class="dense" -->

## Combining Patterns

**Real-world prompt using multiple patterns:**

```text
[Role] You are a TypeScript expert focused on clean code.

[Process] First, analyze what this function does.
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

<!-- vertical -->

## Measure, Don't Guess

1. **Write the checklist first** — 4–6 pass/fail items, before you see any output
2. **Run each prompt 3×** in fresh chats — outputs vary run to run
3. **Score each item** — see *which* failures a change fixed
4. **Small gaps are noise** — under 1 item across 3 runs = no clear difference

> This is HW1 — and, at scale, how evals work (Weeks 10 & 13).

---

## Artifacts in Claude Web

> "Interactive apps that emerge from your conversations with Claude."

<!-- vertical -->

## What Are Artifacts?

**Artifacts are live, interactive outputs:**

- Web apps and prototypes
- Data visualizations
- Interactive tools and calculators
- Games and simulations
- Documents and diagrams

**No coding required** — describe what you want, Claude builds it.

<!-- vertical -->

## Artifact Use Cases

- **Prototypes** — Landing pages, signup flows
- **Tools** — Calculators, converters, trackers
- **Visualizations** — Charts, diagrams, dashboards
- **Educational** — Interactive tutorials, quizzes
- **Business** — Inventory systems, project boards

**Perfect for:** Validating ideas before writing "real" code.

<!-- vertical -->

<!-- .slide: class="dense" -->

## Creating Artifacts

**The workflow:**

```text
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

## Iterating on Artifacts

**Refinement through conversation:**

- "Make the button bigger"
- "Add a dark mode toggle"
- "The calculation is wrong when X happens"

**Debugging tip:** Describe what's wrong, not the technical error.

```text
Bad:  "I get TypeError: undefined is not a function"
Good: "When I click submit with empty fields, nothing happens"
```

<!-- vertical -->

## Sharing Artifacts

**Once created, you can:**

- **View** — Anyone with link can see it
- **Remix** — Claude users can copy and modify

**Great for:**
- Showing prototypes to stakeholders
- Sharing tools with teammates
- Getting feedback before building "for real"

> "Build the demo in 5 minutes, not 5 days."

---

## Hands-On Lab

Time to practice!

<!-- vertical -->

## Exercise 1: Email Validator

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

## Exercise 2: Iterate & Improve

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

## Discussion: What Worked?

**Share your findings:**

- What made prompts better?
- What patterns did you use?
- What surprised you?
- What's still hard?


---

<!-- .slide: class="dense" -->

## What to Remember

1. **Good prompts:** Context + Task + Format + Constraints + Examples
2. **Patterns:** Few-shot, chain-of-thought, role prompting, structured output
3. **Iterate:** Expect 2-5 rounds for complex prompts
4. **Verify:** AI output needs human validation
5. **Measure:** Tips vary by model — test them against a checklist

---

## Looking Ahead

**Next class: User Research & Prototyping**
- Mom Test & Design Thinking workshop
- Claude Web Artifacts for rapid prototyping
- User story writing & PRD refinement

**HW1 due Mon Oct 5:** Prompt Pairs, Proven

---

## Resources

**Claude Web & Artifacts:**
- [Claude Artifacts Guide](https://support.claude.com/en/articles/11649427-use-artifacts-to-visualize-and-create-ai-apps-without-ever-writing-a-line-of-code)

**Prompt Engineering:**
- [Prompt Engineering Overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)
- [Prompting Best Practices (current models)](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
- [Prompting Claude Opus 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5)
- [Anthropic Prompt Engineering Tutorial](https://github.com/anthropics/courses/tree/master/prompt_engineering_interactive_tutorial)

---

# Questions?
