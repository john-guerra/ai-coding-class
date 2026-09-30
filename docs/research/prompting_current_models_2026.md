# Prompting Current Claude Models: What Held, What Changed (Sep 2026)

Research note behind the HW1 redesign ("Prompt Pairs, Proven"). Every quote
below was checked verbatim against the live page on **2026-09-29**.
Re-verify before reusing, because these pages are updated as models ship.

**Also affects:** `slides/03_Prompt_Engineering/index.md`. Its "Claude 4 Best
Practices" slide, and its Chain-of-Thought and Role Prompting slides, present
as general rules things that are now model-dependent. Syllabus outcome 1.1
also names "chain-of-thought".

## Sources

- **BP:** [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices).
  This one living page replaced the old one-page-per-technique docs, which
  now redirect into it.
- **O55:** [Prompting Claude Opus 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5)
- [Prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)
- [Define success criteria and build evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests)

## The meta-point: model-specific tips must be re-tested

> "Where a technique names a specific model, treat it as measured on that model and re-check it against your own evals before applying it to another." (BP)

This is the teaching hook. "Best practices" are now versioned per model, so
the durable skill is *measuring* whether a technique helps, not memorizing a
list of techniques.

## Stable across current models (BP)

- **Clear and direct:** "Think of Claude as a brilliant but new employee who lacks context on your norms and workflows."
- **Explain why:** "Providing context or motivation behind your instructions, such as explaining to Claude why such behavior is important, can help Claude better understand your goals…"
- **Examples:** "Include 3–5 examples for best results." Wrap them in `<example>` tags.
- **Positive framing:** "Tell Claude what to do instead of what not to do." The example is "Do not use markdown" → "Your response should be composed of smoothly flowing prose paragraphs."

## Changed or model-dependent

| Technique | What the source says | Source |
|---|---|---|
| **Thinking mode** | "On Claude Fable 5.1, Claude Mythos 5.1, Claude Fable 5, Claude Mythos 5, and Claude Opus 5.5, thinking is always on and adaptive thinking is the only mode." Help center: "Thinking cannot be turned off in Claude when using Claude Sonnet 5.5, Claude Opus 5.5, Claude Fable 5.1, or Claude Opus 5." | BP (Markdown version); support.claude.com |
| **Long context** | For "large documents or data-rich inputs (20k+ tokens)": put documents at the top; "Queries at the end can improve response quality by up to 30 percent in tests". | BP, "Long context prompting" |
| **Prefill (API)** | "Starting with Claude 4.6 models and Claude Mythos Preview, prefilled responses … on the last assistant turn are no longer supported." | BP, "Migrating away from prefilled responses" |
| **"Think step by step"** | "A prompt like 'think thoroughly' often produces better reasoning than a hand-written step-by-step plan. Claude's reasoning frequently exceeds what a human would prescribe." Manual CoT is framed as "a fallback". | BP, "Leverage thinking & interleaved thinking capabilities" |
| **"Think carefully" in chat** | "…if your system prompt contains instructions that tell Claude to think carefully before answering, consider removing them for Claude Opus 5.5. The model decides for itself how much to think, and effort is the main control." | O55 |
| **Reasoning in the response** | "Remove instructions that stood in for thinking." Requests to reproduce the reasoning in the response "can be declined with the reasoning_extraction refusal category". | O55 |
| **Self-check / "double-check"** | Generally, "This catches errors reliably, especially for coding and math. Claude Opus 5 is the exception…" There, verification instructions "can cause over-verification". | BP |
| **CRITICAL / MUST emphasis** | Noted for Opus 4.5/4.6, about tool/skill triggering: "If your prompts were designed to reduce undertriggering on tools or skills, these models may now overtrigger. The fix is to dial back any aggressive language." | BP, "Tool usage" |

## Eval framing (overview + develop-tests)

The overview says to have success criteria, a way to test against them
empirically, and a first draft **before** doing prompt engineering. HW1's
"write the checklist before running" rule puts this into practice at the
scale of Claude web.

## Not verified / excluded

- **Claude.ai product details** come from support.claude.com, fetched on 2026-09-29 by an independent fact-check. They are reflected in the HW1 setup section:
  - memory pause and chat-search toggles;
  - attachments excluded from shared links;
  - Team/Enterprise sharing limited to the organization;
  - Pro limits reset every five hours, plus a weekly limit.

  Not verified: whether incognito chats can be shared, and which model the free plan gets.
- **Correction (2026-09-29).** An earlier version of this note said "adaptive thinking is the only mode" was *not found*. That was wrong: the phrase is in BP's Markdown version, and a grep of the HTML render missed it. It has moved to the table above.

## Lesson for future updates

A summarizing fetch turned "on Opus 5" and "measured on Opus 4.5/4.6" into
general rules, and those overstated rules reached a student-facing draft.
Check quotes against the raw page (`curl` + `grep`) before they go into
course materials. Also check the page's Markdown version (docs pages serve
one): a grep of the HTML render can miss text, which is how this note once
claimed a real quote was "not found". The `assignment-review` skill now
requires both checks.
