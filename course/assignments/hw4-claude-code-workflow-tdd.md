# HW4: Claude Code Workflow & TDD

**Weight:** 5% of final grade
**Due:** Week 11

## Objective

Demonstrate mastery of the Claude Code development workflow by setting up a project, using the Explore→Plan→Implement→Commit pattern, and doing TDD through Claude Code.

## Part 1: Claude Code Project Setup (25%)

Set up Claude Code for your P3 project:
- Write a comprehensive CLAUDE.md (project context, stack, conventions, do's/don'ts)
- Configure permissions (allowlists or sandboxing)
- Demonstrate `/init` output and iterate on CLAUDE.md based on it
- Show context management strategy (`/clear`, `/compact`, `--continue`)

**Requirements:**
- CLAUDE.md must include: tech stack, architecture decisions, coding conventions, testing strategy, and project-specific do's/don'ts
- At least one @import reference to additional context (e.g., PRD, API docs)

## Part 2: Spec → Explore → Plan → Implement → Commit (30%)

Pick a P3 feature you **cannot describe in one sentence**, then run both loops.

**Spec (the outer loop — you own it):**
- Have Claude Code interview you (`Interview me in detail using the AskUserQuestion tool… then write a complete spec to SPEC.md`)
- Commit `SPEC.md` **before any implementation commit**
- `/clear` and implement from the spec alone

**Then the 4-phase inner loop, once per plan item:**
- **Explore:** Use Glob, Grep, Read to understand existing code
- **Plan:** Use Plan mode to design the approach
- **Implement:** Execute the plan with Claude Code
- **Commit:** Create clean commits with meaningful messages

**Requirements:**
- `SPEC.md` committed before the first implementation commit (git history must show this ordering)
- Your spec must satisfy all four criteria: **self-contained** · **names the files and interfaces involved** · **states what is out of scope** · **ends with an end-to-end verification step** that proves the feature works
- Git history must clearly show the inner workflow
- At least 3 commits demonstrating the pattern

<small>The four criteria are Anthropic's: https://code.claude.com/docs/en/best-practices</small>

## Part 3: TDD with Claude Code (30%)

Build a P3 feature using strict TDD through Claude Code:
1. Write failing tests first
2. Have Claude Code implement minimum code to pass
3. Refactor
4. Repeat for all acceptance criteria

**Requirements:**
- Tests written BEFORE implementation
- Git history shows red-green-refactor commits
- Clear commit messages showing TDD process

## Part 4: Reflection (15%)

Write a 1-2 page reflection answering:
- How does the Explore→Plan→Implement→Commit workflow compare to your previous approach?
- **Did writing the spec change what you built, compared to going straight to a plan?** Point to something concrete the interview surfaced that you would otherwise have discovered late.
- What context management strategies worked best?
- Include annotated Claude Code session log showing your workflow

## Deliverables

1. **P3 repository** with CLAUDE.md and permissions configuration
2. **`SPEC.md`**, committed before the first implementation commit
3. **Feature code** with TDD git history (red-green-refactor commits)
4. **Annotated Claude Code session log**
5. **Reflection document** (1-2 pages)

## Rubric (50 points)

| Criterion | Weight |
|-----------|--------|
| CLAUDE.md & project setup | 25% |
| Spec→Explore→Plan→Implement→Commit workflow | 30% |
| TDD process through Claude Code | 30% |
| Reflection & session log | 15% |

---

*For full course details, see [../COURSE_MEMORY.md](../COURSE_MEMORY.md)*
