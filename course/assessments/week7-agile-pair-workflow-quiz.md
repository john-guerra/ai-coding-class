# Week 7: Agile & Pair Workflow Quiz

## Quiz Settings (Configure in Canvas)

| Setting | Value |
|---------|-------|
| **Quiz Type** | Graded Quiz |
| **Points** | 22 points |
| **Time Limit** | 15 minutes |
| **Allowed Attempts** | 1 |
| **Shuffle Answers** | Yes |
| **Show One Question at a Time** | Yes |
| **Lock Questions After Answering** | Yes |
| **Due Date** | Before the week's first class: Tue 10:35 AM PT (Oak/Hybrid) · Wed 1:00 PM PT (San Jose) |
| **Available From** | Start of the week (quiz + readings are pre-class) |
| **Published** | No (until ready) |

---

## Quiz Instructions

This pre-class quiz assesses your understanding of Agile/Scrum methodology and pair workflows from this week's required readings (the Scrum Guide and GitHub's Projects and Issues docs) and the P2 material from Week 6.

**Instructions:**
- **Time Limit:** 15 minutes
- **Questions:** 15 questions (22 points total)
- **Attempts:** One attempt only

**Topics Covered:**
- Scrum roles (Product Owner, Scrum Master, Developers)
- Sprint cycle and events (Planning, Daily Scrum, Review, Retrospective)
- Breaking PRDs into GitHub Issues
- Issue sizing (small, independently reviewable issues)
- GitHub Projects board (Backlog, Todo, In Progress, In Review, Done)
- Branch naming conventions
- PR best practices (small PRs, issue linking)
- Pair workflow (scrum for two, user feedback → backlog)
- When to pair vs. split work
- Avoiding merge conflicts
- Code review
- Async standups (an actionable plan toward the sprint goal)
- Sprint planning and issue assignment
- Milestones

**Academic Integrity:** This is an individual assessment. Do not use AI assistants to answer questions. Questions are designed to test your understanding, not your ability to look up answers.

---

## Questions

### Section 1: Foundational Concepts (Q1-Q5, mix of 1-2 points)

---

#### Q1: Scrum Roles — Product Owner (1 point)
**Type:** Multiple Choice

In your P2 pair, one partner takes the Product Owner role for Sprint 1. What is the Product Owner's primary responsibility?

- A) Writing the majority of the code for the sprint's issues
- B) Running the daily standups and removing team blockers
- C) Deciding what to build and prioritizing the backlog
- D) Reviewing and merging every pull request before release

---

#### Q2: Sprint Cycle (1 point)
**Type:** Multiple Choice

Which statement best captures how a Scrum sprint is meant to work?

- A) The team commits to a small, achievable set of work each sprint
- B) The team should complete as many features as possible, even if some are partially done
- C) Sprint length should increase as the project grows in complexity
- D) All code must be production-ready by the end of each sprint day

---

#### Q3: Scrum Ceremonies (1 point)
**Type:** Multiple Choice

Your P2 team just finished Sprint 1. You demo your working features to each other and discuss what went well and what to improve. Which Scrum ceremonies did you just perform?

- A) Sprint Planning and Daily Standup
- B) Sprint Review and Sprint Retrospective
- C) Sprint Planning and Sprint Review
- D) Daily Standup and Sprint Retrospective

---

#### Q4: Breaking PRD into Issues (2 points)
**Type:** Multiple Choice

Your PRD contains the user story: "As a user, I want to log in with email so that my data is saved across sessions." You need to break it into GitHub Issues for sprint planning. Which breakdown is best?

- A) One issue: "#1 Implement login feature (feature)" — a single issue keeps the story's acceptance criteria, UI, endpoint, and tests together so one partner owns it end to end
- B) Two issues: "#1 Backend login: endpoint, sessions, and auth library (feature), #2 Frontend login: page UI and flow tests (feature)" — split at the API boundary so each partner owns one whole layer
- C) Ten issues, one per file to be created or modified (e.g. "#1 LoginPage.tsx", "#2 auth.ts", "#3 session.ts"), so GitHub can auto-close each issue when a commit touches its file
- D) Five issues: "#1 Set up auth library (chore), #2 Create login page UI (feature), #3 Implement email/password endpoint (feature), #4 Add session persistence (feature), #5 Write login flow tests (chore)"

---

#### Q5: Issue Sizing (1 point)
**Type:** Multiple Choice

During sprint planning for P2, your partner creates an issue titled "Build entire dashboard with charts, filters, search, and data export." What is the problem with this issue?

- A) It lacks a sprint-1 label, so GitHub won't show it on the Projects board until a sprint label is added
- B) Dashboard work belongs in the PRD, not in issues — issues should only track bugs found after a feature ships
- C) It's too large — break it into smaller issues that can each be finished and reviewed on its own, ideally in a day or less
- D) It must be assigned to both partners, since a feature this visible to users needs shared ownership and a joint review

---

### Section 2: Application Questions (Q6-Q10, mix of 1-2 points)

---

#### Q6: GitHub Projects Board (2 points)
**Type:** Multiple Choice

You're setting up your P2 GitHub Projects board. Your partner asks why you need columns beyond just "To Do" and "Done." What is the best explanation for using the full board layout (Backlog, Todo, In Progress, In Review, Done)?

- A) More columns make the board look more professional to graders, and the P2 Agile Process rubric awards points for each board column you use
- B) GitHub Projects requires at least five columns before its built-in workflows, like auto-moving closed issues to Done, can be enabled
- C) The extra columns only pay off for teams of four or more; in a pair, both partners already know each other's status, so To Do and Done suffice
- D) Each column represents a distinct workflow state, making it visible where work is stuck — especially useful for catching items waiting on code review

---

#### Q7: Branch Naming Convention (1 point)
**Type:** Multiple Choice

Your team names branches `type/issue#-short-description`, where type is `feature`, `fix`, or `chore`. You're assigned issue #57, "Fix null avatar crash on profile page." Which branch name follows the convention?

- A) fix/57-null-avatar-crash
- B) bugfix-null-avatar
- C) john/profile-page-fix
- D) fix/null-avatar-crash-57

---

#### Q8: PR Best Practices (2 points)
**Type:** Multiple Choice

Your partner opens a PR with the description: "Made some changes to the auth system. LGTM?" The PR modifies 15 files across authentication, database, and the UI. What are the two biggest problems with this PR?

- A) The title needs to be longer, and the PR should target a release branch, not main, so it can't merge early
- B) The PR is too large (spans multiple unrelated areas) and doesn't link to an issue with "Closes #N"
- C) It touches auth, so it needs an instructor's review, and auth PRs must be squashed to one commit first
- D) It was opened from a feature branch instead of main, and its commits don't @-mention the reviewing partner

---

#### Q9: Pair Workflow — Sprint Planning (2 points)
**Type:** Multiple Choice

You and your P2 partner are starting Sprint 2. You have user feedback from mom test interviews suggesting users struggle with the onboarding flow. How should you incorporate this into your sprint planning?

- A) Finish the original PRD first, since changing scope mid-project breaks the sprint commitment; log the feedback for after launch
- B) Pull the onboarding fix in and have both partners code it at the same time on one shared branch so it ships before the sprint review
- C) Create GitHub Issues from the feedback, prioritize them in your sprint backlog, and assign ownership of each issue to one partner
- D) File one large "Fix onboarding" issue so the user's problem stays intact, then split it into tasks as you discover them while coding

---

#### Q10: When to Pair vs. Split Work (2 points)
**Type:** Multiple Choice

You and your P2 partner have four tasks remaining in Sprint 2: (1) Design the database schema for a new feature, (2) Write unit tests for the login flow, (3) Debug a complex race condition in the API, (4) Add JSDoc comments to existing components. Which tasks should you pair on and which should you split?

- A) Pair on the database schema design and the race condition debugging; split the tests and JSDoc comments
- B) Pair on all four — Scrum expects a pair to work every sprint backlog issue together, so splitting breaks the process
- C) Split all four — each partner's AI assistant acts as the second pair of eyes, so synchronous pairing adds little here
- D) Pair on the tests and JSDoc so both partners learn the code; split the schema design and the race-condition debugging

---

### Section 3: Scenario-Based Questions (Q11-Q15, mix of 1-2 points)

---

#### Q11: Splitting Work Without Conflicts (1 point)
**Type:** Multiple Choice

What is the most important practice for avoiding merge conflicts when two partners are working simultaneously?

- A) Both partners commit directly to main and pull every few minutes, so neither copy can drift out of sync
- B) One partner finishes all of their sprint issues before the other starts, so only one person has open changes
- C) Turn on GitHub auto-merge for every PR, since it resolves conflicting lines by keeping the newer commit
- D) Assign issues so partners never work on the same file, use feature branches, and merge frequently

---

#### Q12: Code Review — What to Look For (1 point)
**Type:** Multiple Choice

Your partner submits a PR for a new user profile page. Which best describes what your code review should cover?

- A) Whether CI passes — a green build already proves the PR meets the acceptance criteria, so reading the diff is optional
- B) Whether the UI looks right in the browser, since the profile page is visual and PR screenshots can stand in for reading the code
- C) Whether it matches the issue's acceptance criteria, follows the rules file conventions, includes tests, and has no dead code
- D) Whether the author's AI chat log is attached, since for AI-generated code reviewers grade the prompts rather than the diff

---

#### Q13: Async Standups (2 points)
**Type:** Multiple Choice

Your P2 partner posts this async standup: "Working on stuff today. Should be done soon." What is wrong with it?

- A) It's too vague — it gives you no actionable plan; name the issues being worked on, progress toward the sprint goal, and any blockers
- B) Nothing — async standups exist to signal you're active, so any short check-in satisfies the P2 requirement
- C) It's too short — a standup should be a full paragraph narrating each task so your partner can replay your day
- D) It shouldn't be async — standups only count toward P2 when held live on a call, so text-only updates don't qualify

---

#### Q14: Sprint Planning for P2 (2 points)
**Type:** Multiple Choice

You're starting Sprint 1 of P2. During sprint planning, your partner wants to assign every issue to both of you "so we both know what's happening." What is the problem with this approach, and what should you do instead?

- A) No problem — co-assigning every issue gives shared ownership, and GitHub notifies both assignees so neither partner misses an update
- B) Each issue should be assigned to one partner for clear ownership; use standups and the project board to keep both partners aware
- C) Only the Product Owner should hold assignees, since they prioritize the backlog; the Scrum Master reviews the PRs instead
- D) Issues don't need assignees — the Projects board's In Progress column records who is working on each card automatically

---

#### Q15: Milestones (1 point)
**Type:** Multiple Choice

What is the purpose of creating GitHub Milestones for each sprint in your P2 project?

- A) Milestones auto-deploy the code once every issue in them is closed, so each sprint ships to production on its due date
- B) GitHub only lets you create a Projects board once the repo has milestones, since the board's columns come from them
- C) Milestones lock each sprint's issues so a partner can't edit or reassign the other's until the due date passes
- D) Milestones group issues into time-boxed sprints with due dates, letting you track completion percentage

---

## Canvas Import Instructions

1. **Create New Quiz** in Canvas under "Quizzes" using `canvas-extras` MCP tools
2. **Configure Settings** as shown in the Settings table above
3. **Add Questions** using `canvas_create_quiz_question` for each question
4. **Set Correct Answers** (see answer key - instructor only)
5. **Save and Preview** before publishing

## Anti-Cheating Measures Implemented

1. **Time pressure** - 15 minutes for 15 questions limits research time
2. **Answer shuffling** - Different order for each student
3. **Scenario-based** - Requires understanding and application, not just recall
4. **Single attempt** - No retakes
5. **Locked questions** - Can't go back and change answers
6. **Progressive difficulty** - Easier concepts first, harder application last
