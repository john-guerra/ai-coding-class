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
| **Prefill** | "Starting with Claude 4.6 models and Claude Mythos Preview, prefilled responses … on the last assistant turn are no longer supported." | BP, "Migrating away from prefilled responses" |
| **"Think step by step"** | "A prompt like 'think thoroughly' often produces better reasoning than a hand-written step-by-step plan. Claude's reasoning frequently exceeds what a human would prescribe." Manual CoT is framed as "a fallback". | BP, "Leverage thinking & interleaved thinking capabilities" |
| **"Think carefully" in chat** | "…if your system prompt contains instructions that tell Claude to think carefully before answering, consider removing them for Claude Opus 5.5. The model decides for itself how much to think, and effort is the main control." | O55 |
| **Reasoning in the response** | "Remove instructions that stood in for thinking." Requests to reproduce the reasoning in the response "can be declined with the reasoning_extraction refusal category". | O55 |
| **Self-check / "double-check"** | Generally, "This catches errors reliably, especially for coding and math. Claude Opus 5 is the exception…" There, verification instructions "can cause over-verification". | BP |
| **CRITICAL / MUST emphasis** | Measured on Opus 4.5/4.6: "The fix is to dial back any aggressive language. Where you might have said 'CRITICAL: You MUST use this tool when...', you can use more normal prompting." | BP, "Tool usage" |

## Eval framing (overview + develop-tests)

The overview says to have success criteria, a way to test against them
empirically, and a first draft **before** doing prompt engineering. HW1's
"write the checklist before running" rule puts this into practice at the
scale of Claude web.

## Not verified / excluded

- **"Adaptive thinking is the only mode on Opus 5.5".** An early research
  summary claimed this, but that wording wasn't found on BP or O55 on
  2026-09-29, so it was left out.
- **Claims about the Claude.ai product,** such as incognito sharing, memory
  settings, and which models each plan gets. These came from a subagent
  reading support.claude.com. They are reflected in the HW1 setup section,
  but the quotes weren't re-checked here.

## Lesson for future updates

A summarizing fetch turned "on Opus 5" and "measured on Opus 4.5/4.6" into
general rules, and those overstated rules reached a student-facing draft.
Check quotes against the raw page (`curl` + `grep`) before they go into
course materials. The `assignment-review` skill now requires this step.
