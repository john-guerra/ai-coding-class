# HW1: Prompt Pairs, Proven

**Weight:** 5% of final grade
**Due:** Monday, October 5, 2026, 11:59 PM (Pacific)
**Tool:** Claude web (claude.ai)

## Objective

Current Claude models do well with ordinary prompts, so "getting working output" is no longer the hard part. The hard part is **saying precisely what you want** and **showing, with evidence, that a prompt change actually helped**.

In this assignment you write bad/better prompt pairs, define success *before* you run anything, and then check whether the better prompt really wins. You will reuse this skill later in the course:
- defining "done" before generating is test-first thinking (HW4, TDD);
- scoring outputs against a checklist is how evals and LLM-as-judge work (Weeks 10 and 13).

## Advice That Holds vs. Advice You Should Test

Anthropic's current guide, [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices), covers today's Claude models. Some advice is stable across them. Some depends on the model, and Anthropic says to re-check model-specific tips against your own evaluations.

| Stable across current models | Model-dependent: test it yourself |
|---|---|
| Be clear and direct: treat Claude like "a brilliant but new employee who lacks context" | **"Think step by step."** The guide notes that a short instruction like "think thoroughly" often beats a hand-written step-by-step plan. On some models, "think carefully" can be dropped with no clear quality loss |
| Explain *why* you want something, not just *what* | **"Double-check your answer."** The guide says self-checks catch errors reliably, but calls out Claude Opus 5 as an exception, because there they cause over-verification |
| Give 3–5 examples of the output you want | **Aggressive emphasis** ("CRITICAL: You MUST…"). Anthropic observed that Claude Opus 4.5 and 4.6 over-follow it and advises dialing it back to "more normal prompting" |
| Say what to do, not only what not to do | **Persona prompts** ("You are a senior FAANG engineer…"). Useful for setting tone and focus; whether they improve *correctness* for your task is an open question |

### How this connects to Week 3

Breaking a task into explicit steps ("first list the requirements, then…") is still useful. What's less certain on current models is the *magic phrase* "think step by step", because the model already reasons on its own. So instead of taking a rule on faith, you'll **test one of these techniques yourself** (see *Myth test* below).

## Before You Start: Setup (Required)

Your runs must be comparable and shareable:

1. **Use regular chats, outside any Project.** Don't use incognito chats: they can't be shared, and they can't run code.
2. **Isolate each run.** In **Settings**, pause memory, turn off chat search/reference, and clear any profile preferences or custom styles, so earlier chats don't leak into your runs. Turn them back on when you're done.
3. **Hold the setup constant.** Record your **plan, model, and whether extended thinking is on**. Keep all three the same for every run.
4. **Paste inputs into the prompt; don't attach files.** Shared links don't include attachments.
5. **Pace yourself.** Usage limits reset every few hours and vary by plan, so spread your runs over at least two days.

## Task

Create **three prompt pairs**, one for each task type below. **You choose the concrete task.** Ideally, take it from your Project 1.

| # | Task type | Example (don't copy; pick your own) |
|---|-----------|--------------------------------------|
| 1 | **Generate** — code or a UI component | A form component with validation for your P1 |
| 2 | **Extract** — messy text → structured output | Turn a course syllabus into a list of deadlines |
| 3 | **Critique** — review something and find problems | Review a piece of code or your P1 PRD. **Plant 3–4 known defects in it first**, so your checklist can include "finds defect X" |

### For each pair

1. **Bad prompt.** This must be *realistic*: something you'd actually type, or a prompt taken from your own chat history. Straw men ("make an app") lose points.
2. **Checklist, written BEFORE you run anything.** Write 4–6 pass/fail items that define a good result.
   - **At least half must check correctness or judgment, not format.** Good examples: "invents no dates", "finds the planted off-by-one", "rejects an empty email".
   - **Avoid items that only reward the better prompt for echoing its own wording.** Example: if only your better prompt asks for JSON, "outputs JSON" is a rigged item.
   - **The checklist is frozen once you've seen any output.**
3. **Better prompt.** Improve the bad prompt. In 2–4 sentences, explain *why* it should win: name the principle and link to where Anthropic's guide describes it.
4. **Prediction.** Before running, write down the average score you expect for each prompt.
5. **Evidence.** Run **each prompt 3 times**, each in a fresh chat. Score every run and share every chat link.

   | Prompt | Run 1 | Run 2 | Run 3 | Average |
   |--------|-------|-------|-------|---------|
   | Bad    | 2/6   | 3/6   | 2/6   | 2.3/6   |
   | Better | 6/6   | 5/6   | 6/6   | 5.7/6   |

   Also report **how many runs passed each checklist item**. That shows *which* failures the better prompt fixed.

6. **Error analysis.**
   - Quote **one failing passage from a bad-prompt run** and **one from a better-prompt run**.
   - Name each failure's category (e.g., missing context, taken too literally, invented facts, ignored a constraint, too verbose).
   - Did any failure slip past your checklist? Name **one item you now wish you'd included**. You may not add it to your scores.
7. **Verdict.** Was the better prompt actually better? Compare the result to your prediction.

   **With 3 runs, a gap smaller than 1 checklist item is noise.** Call it "no clear difference". An honest "no difference" earns more credit than an unsupported "it's better".

### Myth test (in one of your three pairs)

Pick **one** technique from the "test it yourself" column: "think step by step", "double-check your answer", aggressive CRITICAL/MUST emphasis, or a persona.

1. Add the technique to your **better** prompt, changing nothing else.
2. Run that version 3 more times against the same checklist.
3. Report whether the technique helped, hurt, or made no clear difference *on your model*.

**A negative result earns full credit.** What we grade is a fair setup and an honest conclusion.

## Deliverables

Submit **one PDF or Markdown document** to Canvas containing:

1. **Setup:** your plan, model, and extended-thinking setting.
2. **Three prompt pairs.** For each, include:
   - task description
   - bad prompt
   - checklist
   - better prompt with its why
   - prediction
   - score and per-item tables
   - chat links
   - error analysis
   - verdict
3. **Myth test:** the technique you tested, the score table, the links, and your conclusion.
4. **Reflection (~300 words).**
   - What makes a prompt better *for the model you used*?
   - What surprised you? What would you change about your checklists?
   - **Cite at least two specific numbers or quotes from your own runs.**
5. **Personal prompt template.** A reusable template you'd actually use for P1, with a one-line note on each section explaining why it's there.

**Chat links:** use public share links. If your account can only share within an organization, share each chat with the instructor's email instead. As a last resort, include full-page screenshots.

## Rubric (40 points)

| Category | Points | Description |
|----------|--------|-------------|
| **Prompt pairs** (3 × 10) | 30 | Per pair, see below |
| **Myth test** | 4 | Only the technique changes; same checklist; conclusion matches the data |
| **Reflection** | 3 | Specific and grounded in your own runs (cites numbers or quotes) |
| **Personal template** | 3 | Reusable, and each section is explained |

### Per pair (10 pts)
- **Realistic bad prompt** (1): plausible, not a straw man
- **Better prompt + why** (2): addresses the bad prompt's failures; names and links the principle
- **Checklist quality** (2): 4–6 binary items, at least half test correctness or judgment, not rigged toward the better prompt
- **Evidence** (2): 3 fresh runs per prompt, score and per-item tables, working links, constant setup
- **Error analysis + verdict** (3): quoted failures with categories, a missed checklist item, and a verdict that matches the data and the prediction

*Grading note:* TAs open the links for one randomly chosen pair. A missing or mismatched link forfeits that pair's evidence points.

## Tips

- **Evidence beats opinion.** "It felt better" is not evidence; "5.7/6 vs 2.3/6 across 3 runs" is.
- **Outputs vary between runs.** That is why you run each prompt 3 times, and why small gaps don't count.
- **Good checklist items are binary.** "Code is clean" is a matter of taste. "Rejects an empty email with an error message" can be checked.
- **Using Claude to help write your better prompt is allowed.** The error analysis and reflection must come from reading *your* runs.

## Sources

- Anthropic, [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices): current models; see "General principles", "Leverage thinking & interleaved thinking capabilities" (step-by-step and self-checks), and "Tool usage" (aggressive language)
- Anthropic, [Prompting Claude Opus 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5): model-specific notes
- Anthropic, [Prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview): define success criteria and a way to test against them *before* prompting
- Anthropic, [Define success criteria and build evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests)

---

*For full course details, see [../COURSE_MEMORY.md](../COURSE_MEMORY.md)*
