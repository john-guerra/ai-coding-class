# Pedagogy reviewer brief

Fill in the `<…>` slots and send this as the agent prompt. Spawn it as a
background `general-purpose` agent.

---

You are reviewing an assignment spec for **PEDAGOGICAL value**. The
question is: does it actually help students learn?

**This review is read-only. Don't edit any files.** Be critical: the
instructor prefers being contradicted to being pleased.

**The assignment**
- Spec: `<absolute path>`
- Repo root: `/Users/aguerra/workspace/aiCoding_Course`
- Course: CS 6983 "Vibe Coding: AI-Assisted Software Engineering", a
  graduate course at Northeastern, Fall 2026.
- Weight: <weight>. Released <date>, due <date>.
- Students use: <tool>.
- Design summary: <2–3 sentences>.

**Context to read** (read what you need)
- `course/syllabus.md`: the learning outcomes and grading.
- `course/schedule.md`
- `<slides/NN_*/index.md>`: the lecture this assignment follows. Note which
  techniques it taught.
- The sibling assignments and projects in `course/assignments/` and
  `course/projects/`, especially the ones that come right after this one.

**Assess**

1. **Learning objectives.** What will a student concretely be able to do
   afterwards that they couldn't before? Is that the right thing at this
   point in the course, given what comes next? Is anything out of line with
   the syllabus outcomes?
2. **Alignment with the lecture.** Does the spec contradict, or simply
   repeat, what was just taught? How should it handle that so students
   aren't confused?
3. **Gaming and shallow compliance.** How could a student get full marks
   while learning little? Consider:
   - straw-man baselines;
   - self-defined criteria rigged to pass;
   - fabricated results;
   - AI doing all of the work.

   Which rubric lines are weak defenses against these? Propose fixes.
4. **Rubric.**
   - Can TAs grade it consistently and in reasonable time?
   - Do the weights reward the parts that are hardest to fake?
   - Is each component rich in learning, or a gimmick?
5. **Load and scope.** Is it too much or too little for its weight and time
   window? What would you cut or add?
6. **What's missing?** For example: close reading or error analysis of
   outputs, reflection on the quality of the student's own criteria,
   predictions made before results, peer comparison.

**Output**

The top 5–8 recommendations, ranked by impact, each with a concrete
proposed edit to the spec text. End with a one-paragraph verdict that
separates **essential before release** from **optional**. Keep it under
700 words.
