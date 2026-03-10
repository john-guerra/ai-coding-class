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
| **Due Date** | Tuesday, Week 7 at 2:59 PM PT |
| **Available From** | After Week 7 lecture |
| **Published** | No (until ready) |

---

## Quiz Instructions

This quiz assesses your understanding of Agile/Scrum methodology and pair workflows covered in Week 7 lectures and readings.

**Instructions:**
- **Time Limit:** 15 minutes
- **Questions:** 15 questions (22 points total)
- **Attempts:** One attempt only

**Topics Covered:**
- Scrum roles (Product Owner, Scrum Master, Dev Team)
- Sprint cycle and ceremonies (Planning, Standup, Review, Retro)
- Breaking PRDs into GitHub Issues
- Issue sizing (1-4 hour rule)
- GitHub Projects board (Backlog, Todo, In Progress, In Review, Done)
- Branch naming conventions
- PR best practices (small PRs, issue linking)
- Pair workflow (scrum for two, design thinking → backlog)
- When to pair vs. split work
- Avoiding merge conflicts
- Code review checklist
- Async standups (Yesterday/Today/Blockers)
- Sprint planning and issue assignment
- Milestones and labels

**Academic Integrity:** This is an individual assessment. Do not use AI assistants to answer questions. Questions are designed to test your understanding, not your ability to look up answers.

---

## Questions

### Section 1: Foundational Concepts (Q1-Q5, mix of 1-2 points)

---

#### Q1: Scrum Roles — Product Owner (1 point)
**Type:** Multiple Choice

In your P2 pair, one partner takes the Product Owner role for Sprint 1. What is the Product Owner's primary responsibility?

- A) Writing the majority of the code for the sprint
- B) Deciding what to build and prioritizing the backlog
- C) Running the daily standups and removing blockers
- D) Reviewing and merging all pull requests

---

#### Q2: Sprint Cycle (1 point)
**Type:** Multiple Choice

What is the key insight of the sprint cycle in Scrum?

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

Your PRD contains the user story: "As a user, I want to log in with email so that my data is saved across sessions." You need to break this into GitHub Issues. Which breakdown follows the course's recommended approach?

- A) One issue: "#1 Implement login feature (feature)"
- B) Five issues: "#1 Set up auth library (chore), #2 Create login page UI (feature), #3 Implement email/password endpoint (feature), #4 Add session persistence (feature), #5 Write login flow tests (chore)"
- C) Two issues: "#1 Backend login (feature), #2 Frontend login (feature)"
- D) Ten issues, one for each file that needs to be created or modified

---

#### Q5: Issue Sizing (1 point)
**Type:** Multiple Choice

During sprint planning for P2, your partner creates an issue titled "Build entire dashboard with charts, filters, search, and data export." What is the problem with this issue?

- A) The issue title is too long
- B) The issue is too large — it should be broken into smaller issues, each completable in 1-4 hours
- C) Dashboard features should not be tracked as issues
- D) The issue needs to be assigned to both partners

---

### Section 2: Application Questions (Q6-Q10, mix of 1-2 points)

---

#### Q6: GitHub Projects Board (2 points)
**Type:** Multiple Choice

You're setting up your P2 GitHub Projects board. Your partner asks why you need columns beyond just "To Do" and "Done." What is the best explanation for using the full board layout (Backlog, Todo, In Progress, In Review, Done)?

- A) More columns look more professional for grading
- B) Each column represents a distinct workflow state, making it visible where work is stuck — especially useful for catching items waiting on code review
- C) GitHub requires at least 5 columns to enable automation
- D) The extra columns are only needed for teams of 4 or more

---

#### Q7: Branch Naming Convention (1 point)
**Type:** Multiple Choice

You're assigned issue #57 titled "Fix null avatar crash on profile page." Which branch name follows the course's naming convention?

- A) fix/57-null-avatar-crash
- B) bugfix-null-avatar
- C) john/profile-page-fix
- D) feature/57-fix-null-avatar-crash

---

#### Q8: PR Best Practices (2 points)
**Type:** Multiple Choice

Your partner opens a PR with the description: "Made some changes to the auth system. LGTM?" The PR modifies 15 files across authentication, database, and the UI. What are the two biggest problems with this PR?

- A) The PR is too large (spans multiple unrelated areas) and doesn't link to an issue with "Closes #N"
- B) The PR title needs to be longer and more descriptive
- C) The partner should have used AI to review the code before opening the PR
- D) The PR should have been created from the main branch

---

#### Q9: Pair Workflow — Sprint Planning (2 points)
**Type:** Multiple Choice

You and your P2 partner are starting Sprint 2. You have user feedback from mom test interviews suggesting users struggle with the onboarding flow. How should you incorporate this into your sprint planning?

- A) Ignore user feedback and continue building features from your original PRD
- B) Create GitHub Issues from the feedback, prioritize them in your sprint backlog, and assign ownership of each issue to one partner
- C) Both partners should work on the same onboarding fix simultaneously to finish faster
- D) File a single large issue called "Fix onboarding" and figure out the details as you code

---

#### Q10: When to Pair vs. Split Work (2 points)
**Type:** Multiple Choice

You and your P2 partner have four tasks remaining in Sprint 2: (1) Design the database schema for a new feature, (2) Write unit tests for the login flow, (3) Debug a complex race condition in the API, (4) Add JSDoc comments to existing components. Which tasks should you pair on and which should you split?

- A) Pair on all four — pairing is always better
- B) Pair on the database schema design and the race condition debugging; split the tests and JSDoc comments
- C) Split all four — splitting is faster for everything
- D) Pair on tests and JSDoc; split the schema and race condition

---

### Section 3: Scenario-Based Questions (Q11-Q15, mix of 1-2 points)

---

#### Q11: Splitting Work Without Conflicts (1 point)
**Type:** Multiple Choice

What is the most important practice for avoiding merge conflicts when two partners are working simultaneously?

- A) Both partners should work on the main branch to stay in sync
- B) Assign issues so partners never work on the same file, use feature branches, and merge frequently
- C) One partner should finish all their work before the other starts
- D) Use a real-time collaboration editor like Google Docs for code

---

#### Q12: Code Review — What to Look For (1 point)
**Type:** Multiple Choice

Your partner submits a PR for a new user profile page. Which of the following should you check during your code review?

- A) Only whether the code compiles and runs without errors
- B) Whether it matches the issue's acceptance criteria, follows the rules file conventions, includes tests, and has no dead code
- C) Only the visual appearance of the UI in the browser
- D) Whether the AI generated the code correctly

---

#### Q13: Async Standups (2 points)
**Type:** Multiple Choice

Your P2 partner posts this async standup: "Working on stuff today. Should be done soon." What is wrong with this standup, and what format should they follow?

- A) Nothing wrong — standups should be brief
- B) It's too vague — standups should follow the Yesterday/Today/Blockers format with specific issue numbers
- C) It should be longer — at least a full paragraph describing each task
- D) Standups should only be done in person, not async

---

#### Q14: Sprint Planning for P2 (2 points)
**Type:** Multiple Choice

You're starting Sprint 1 of P2. During sprint planning, your partner wants to assign every issue to both of you "so we both know what's happening." What is the problem with this approach, and what should you do instead?

- A) There's no problem — shared ownership ensures accountability
- B) Each issue should be assigned to one partner for clear ownership; use standups and the project board to keep both partners aware
- C) Only the Product Owner should be assigned issues
- D) Issues don't need assignees — just track them on the board

---

#### Q15: Milestones and Labels (1 point)
**Type:** Multiple Choice

What is the purpose of creating GitHub Milestones for each sprint in your P2 project?

- A) Milestones automatically deploy code when all issues are closed
- B) Milestones group issues into time-boxed sprints with due dates, letting you track completion percentage
- C) Milestones are required for GitHub to display the Projects board
- D) Milestones prevent partners from editing each other's issues

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
