---
name: assignment-review
description: Use when creating, redesigning, or reviewing a homework, project spec, lab, or handout in course/assignments/, course/projects/, or course/handouts/ — runs two independent parallel reviews (feasibility with the tools students actually use, and pedagogy), verifies every factual claim against its primary source, and returns decisions to the instructor before anything is synced to Canvas, the syllabus, or the website. Use it for substantive review, even when the user just asks "is this HW any good?" or "can students actually do this?", but not for quick edits such as dates, typos, or a single wording change.
---

# Assignment Review

## Why this exists

HW1 (Fall 2026) was rewritten from a "prompt engineering battle" into
"Prompt Pairs, Proven". The draft *looked* finished, but two independent
reviews found problems that would have reached students:

- **Feasibility.** The spec told students to use incognito chats *and* share
  a link for every run. Incognito chats can't be shared, and they can't run
  code either.
- **Pedagogy.**
  - The spec contradicted the lecture students had just seen, and a
    syllabus outcome as well.
  - Its checklists could be rigged so the "better" prompt won by
    construction.
  - It had no error analysis.
- **Accuracy.** Two rows of a "what changed in current models" table
  overstated the source. A research summary had turned *model-specific*
  notes into general rules, and a paraphrase hid that. Only a direct check of
  the live page caught it.

A single reviewer tends to find only one kind of problem. Two reviewers with
separate briefs, followed by a primary-source check, catch all three.

## Workflow

### 0. Check Canvas state (always, read-only)

Do this in every mode. It decides what you're allowed to change.

- Use `canvas_list_assignments` for `270068` and `270077`. The listing is
  too large to read in the conversation: the tool saves it to a file, and
  its error message gives the path. Filter that file with `jq`, e.g.
  `jq '.[] | select(.name|test("HW1")) | {id,name,due_at,published,has_submitted_submissions}'`.
- **Submissions:** if the assignment has any, the CLAUDE.md safety rule
  applies, and you must not modify it.
- **Already published:** every fix is live for students. Say so in the
  report.
- **Release window:** if the release date leaves students only a few days,
  raise that as a decision.

### 1. Gather context (optional, read-only; ask first)

Ask the instructor whether to ground the review in the current project
knowledge before you start. Offer two options:

- **Grounded (default):** read the context listed below, and give it to the
  pedagogy reviewer. Use this for an assignment that belongs to this course
  as it currently stands.
- **Spec only:** review the document on its own. Use this when the course
  materials are out of date or being redesigned, when the assignment is new
  or meant for another course or a workshop, or when the instructor wants a
  fresh outside view that isn't anchored to what the course already does.

  In this mode, drop the "Context to read" block from the pedagogy brief.
  Tell both reviewers the assignment is being judged on its own. Also note
  in the report that lecture and syllabus alignment was not checked.

If the instructor chooses grounded mode, find out what surrounds the
assignment:

- **The spec** and its siblings. Later HWs and projects show what this one
  should set up, and what it shouldn't duplicate.
- **The lecture it follows**, in `slides/NN_*/index.md`. Look for techniques
  the spec contradicts or repeats, e.g. a lab exercise that is the same as a
  HW task.
- **Course files.** `course/syllabus.md` for the learning outcomes that name
  this skill, and `course/schedule.md` for the due week and anything else due
  close by.

### 2. Launch two independent reviews in parallel

Spawn both in a single message as background `general-purpose` agents,
read-only. Fill in the briefs from:

- `references/feasibility-reviewer.md`: can students actually do this, with
  the tool and plan they have, in the time given?
- `references/pedagogy-reviewer.md`: will doing it teach them what we want,
  and can it be gamed?

Keep them independent: don't give either reviewer the other's findings or
your own opinion of the spec. Their value comes from not being anchored.

### 3. Verify before you merge

Reviewer reports, research summaries, and your own draft are all
*secondhand*. Before any factual claim goes into a student-facing document,
check it against the primary source yourself:

- **For web docs,** `curl` the page to the scratchpad, strip the tags, and
  `grep` for the exact phrase. Also grep the page's Markdown version, since
  docs pages serve one. Before calling a quote "not found", check both: an
  HTML-only grep once missed a real quote, and the note then claimed
  it was absent. Summarizing fetchers paraphrase, and a
  paraphrase can drop "on Opus 5" or "for tool use".
- **Quote section names and headings only after seeing them.** A plausible
  heading that doesn't exist is still an invented citation.
- **Watch for scope creep in the claim,** e.g. "discouraged on model X"
  becoming "discouraged".

If a reviewer's claim can't be verified, keep it out of the spec, or label
it as unverified when you report to the instructor.

### 4. Merge, then hand back to the instructor

Sort the findings into three groups:

- **Wrong / blocked:** fix these directly in the spec. Say plainly which
  errors were yours.
- **High-impact improvements** that are clearly within what was agreed:
  apply them.
- **Judgment calls** (scope cuts, reweighting, dropping a deliverable,
  moving a due date): *don't* decide these. List them with a recommendation.

Then stop for review. Don't commit, and don't touch Canvas, the syllabus,
COURSE_MEMORY, or the website until the instructor approves. Those changes
are what students see, and Canvas changes have to be made twice, once per
section. After approval, the sync follows the "Course Content Sync" table in
CLAUDE.md and the `sync-course` skill.

**Canvas rubrics:** give each criterion a rating for every whole point, so
TAs can record partial scores. Always pass `title` to `canvas_update_rubric`:
without it, the tool renames the rubric after the course.

**The Canvas text is for students.** When you convert a spec to Canvas HTML,
strip repo-internal references such as the `*For full course details, see
../COURSE_MEMORY.md*` footer, relative links into the repo, and notes
addressed to TAs. Students can't open those, and the repo file stays the
source of truth.

## Report format

```
## What the reviews changed
**Wrong, now fixed:** …(mark which errors were introduced by us)
**Harder to game / better learning:** …
**Aligned with lecture/syllabus:** …

## Decisions for you
1. <decision> — options, trade-off, my recommendation

## Not changed yet
Canvas (both sections), syllabus, COURSE_MEMORY, website — waiting on your approval.
```

## Design heuristics that came out of HW1

The reviewers apply these, but they help when drafting too:

- **Evidence beats impressions.** A deliverable graded on "quality" alone
  invites polish. Prefer ones where students commit to a success criterion
  *before* producing work, then measure against it.
- **Close the rigging loopholes.** Where students define their own
  criteria, require some criteria to test correctness or judgment rather than
  format. Where they critique, have them plant known defects so recall can
  be checked.
- **Make the hardest-to-fake part carry the most points.** Quoting and
  categorizing specific failures from their own runs is hard to hand off to
  an AI.
- **Credit honest null results.** Otherwise students report the outcome they
  think we want.
- **Test the real tool, on the real plan.** Free and paid tiers get
  different models and limits, and features such as sharing, incognito,
  memory, and code execution interact.
