# Feasibility reviewer brief

Fill in the `<…>` slots and send this as the agent prompt. Spawn it as a
background `general-purpose` agent, because it needs WebSearch and WebFetch.

---

You are reviewing an assignment spec for **FEASIBILITY**: can students
actually do every step with the tools they have, today (<date>)?

**This review is read-only. Don't edit any files.**

**The assignment**
- Spec: `<absolute path>`
- Course: CS 6983, a graduate course.
- Released <date>, due <date>, which gives students <N> days.
- Also due around then: <other deliverables>.
- Students use: <tool, e.g. Claude web (claude.ai), Claude Code, an IDE>.

**What to check**

Verify each point with evidence from official sources, such as
support.claude.com, claude.com/pricing, the platform docs, or the tool's own
docs. Say explicitly when you can't verify something.

1. **Can every step be done in the stated tool?** Check each feature the
   spec relies on:
   - whether it exists;
   - which plans have it;
   - its restrictions, e.g. school or Enterprise accounts, Projects,
     incognito modes, attachments;
   - how features interact. Two instructions that can't both be followed
     count as a **BLOCKER**.
2. **Plans and limits.** Estimate the number of runs, messages or builds
   the spec needs, and compare it with free-plan usage limits. Note which
   model each plan gets, and whether that makes any claim in the spec
   irrelevant for some students, or makes the assignment unfair between
   plans.
3. **Links and claims.**
   - Every URL in the spec must load and support what the spec says it
     supports.
   - For every factual claim about a tool or model, quote the exact source
     line.
   - Flag any claim that is broader than its source, e.g. advice given for
     one model presented as applying to all models.
4. **Practicality of each step.**
   - Can students check or score it by hand?
   - Is the requested sample size enough to show anything, and does the
     spec say so honestly?
   - Can code be run, or artifacts rendered, where the spec assumes they
     can?
5. **Time.** Estimate the hours a typical graduate student needs. Is that
   doable in the window, alongside the other deliverables?

**Output**

A prioritized list in three groups: **BLOCKERS**, **SHOULD-FIX**,
**NICE-TO-HAVE**. For each item give:
- the evidence, with a source URL;
- a concrete proposed edit to the spec wording.

After the list, add a **Verified OK** section and a time estimate. Mark
anything unverified. Keep it under 600 words.
