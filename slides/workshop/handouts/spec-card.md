# Spec Card

*Deciding what to build, in writing — before the agent plans how*

## When to write one (and when not to)

> **If you could describe the diff in one sentence, skip it.**
> — [Claude Code best practices](https://code.claude.com/docs/en/best-practices)

| Situation | Do this |
|---|---|
| Typo, log line, rename, one-file tweak | Just ask. No spec, no plan. |
| Multi-file change, unfamiliar area, risky | **Plan mode** — the inner loop is enough. |
| A feature you *can't* describe in one sentence | **Write a spec first.** |

Over-specifying costs you too. Anthropic's harness research deliberately kept planner output at
"product context and high level technical design rather than detailed technical implementation,"
because premature implementation detail **propagates your errors downstream**.
[Source](https://www.anthropic.com/engineering/harness-design-long-running-apps)

---

## Two altitudes

```
OUTER LOOP · per feature · you own it
  INTERVIEW ──► SPEC.md ──► PLAN.md
                              │
                              ▼
                 INNER LOOP · per plan item · the agent owns it
                   Explore → Plan → Implement → Commit      × N
                              │
                              ▼
                 VERIFY the diff against SPEC.md
```

The spec is the only artifact that survives to the end **and gets checked against.**

---

## Don't start from a blank file — get interviewed

```text
I want to build [brief description]. Interview me in detail
using the AskUserQuestion tool.

Ask about technical implementation, UI/UX, edge cases, concerns,
and tradeoffs. Don't ask obvious questions, dig into the hard
parts I might not have considered.

Keep interviewing until we've covered everything, then write a
complete spec to SPEC.md.
```

*Verbatim from [Claude Code best practices](https://code.claude.com/docs/en/best-practices).* Argue back when
the agent guesses wrong — the disagreements are where the spec earns its keep.

---

## Score your spec — all four, or revise

- [ ] **Self-contained** — someone can read it with no chat history and know what to build.
- [ ] **Names the files and interfaces** involved.
- [ ] **States what is out of scope.**
- [ ] **Ends with an end-to-end verification step** that proves the feature works.

> "Time spent making the spec precise pays off more than time spent watching the implementation."

**Anti-patterns:** a spec that restates the code · a spec with no verification step · a spec full of
implementation detail you haven't decided yet · a shipped spec nobody retired.

---

## Then clear, then build

```text
git add SPEC.md && git commit -m "spec: tag filtering"
/clear
> Implement SPEC.md
```

A fresh session carries the spec and **nothing else** — no interview transcript, no rejected ideas
competing with your code for the context window. The docs say it plainly: *"start a fresh session to
execute it."*

---

## Close the loop — review the diff against the spec

```text
Use a subagent to review the diff against SPEC.md. Check that every
requirement is implemented, the listed edge cases have tests, and
nothing outside the task's scope changed. Report gaps, not style
preferences.
```

A fresh reviewer sees **only the diff and the criteria**, not the reasoning that produced the change.
That separation is the point: agents "confidently praise the work—even when, to a human observer, the
quality is obviously mediocre."
[Source](https://www.anthropic.com/engineering/harness-design-long-running-apps)

**But don't chase every finding.** A reviewer told to find gaps will find some even when the work is
sound. Fix what breaks correctness or a stated requirement; treat the rest as optional. Chasing all of
them buys over-engineering.

---

## Where this goes next

**Spec Kit** (github/spec-kit, MIT) productizes the same shape as committed markdown:
`/speckit.constitution` → `/speckit.specify` → `/speckit.plan` → `/speckit.tasks` → `/speckit.implement`.
Its rule for the spec phase — *focus on the what and why, not the tech stack*.

**Maturity ladder** (Birgitta Böckeler, 2025-10-15): *spec-first* → *spec-anchored* → *spec-as-source*.
She warns the last one risks combining "the downsides of both MDD and LLMs: Inflexibility **and**
non-determinism."
[Source](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
