# Week 4: User Research & Prototyping Quiz

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

This quiz assesses your understanding of user research and prototyping concepts covered in Week 4 lectures and readings.

**Instructions:**
- **Time Limit:** 15 minutes
- **Questions:** 15 questions (22 points total)
- **Attempts:** One attempt only

**Topics Covered:**
- The Mom Test methodology and interview techniques
- Design Thinking (5 phases)
- Claude Web Artifacts for rapid prototyping
- Context windows and Claude Projects
- Personalization layers (Profile, Project Instructions, Styles)
- User stories (format, INVEST criteria)
- MoSCoW prioritization

**Academic Integrity:** This is an individual assessment. Do not use AI assistants to answer questions. Questions are designed to test your understanding, not your ability to look up answers.

---

## Questions

### Section 1: Foundational Concepts (Q1-Q5, 1 point each)

---

#### Q1: Mom Test - Core Principle (1 point)
**Type:** Multiple Choice

You're interviewing a potential user about your app idea. According to The Mom Test, which question will give you the most honest, useful data?

- A) "Tell me about the last time you struggled to manage your spending."
- B) "Would you use an app that helps you track your expenses every week?"
- C) "Do you think my expense tracking idea is good enough to build?"
- D) "How much would you pay each month for an expense tracking app?"

---

#### Q2: Context Windows (1 point)
**Type:** Multiple Choice

What happens when a Claude Web conversation exceeds the context window limit?

- A) The context window expands automatically to accommodate longer conversations without any limit.
- B) Claude moves older messages into your Project knowledge so they stay searchable in later turns
- C) Claude loses early context: the oldest turns are dropped or condensed first, so details fade
- D) Claude re-reads the full chat history from storage each turn, so no earlier turn is ever lost

---

#### Q3: Design Thinking Phases (1 point)
**Type:** Multiple Choice

In Design Thinking, what is the correct order of the five phases?

- A) Define, Empathize, Prototype, Ideate, Test
- B) Ideate, Define, Empathize, Test, Prototype
- C) Prototype, Test, Empathize, Define, Ideate
- D) Empathize, Define, Ideate, Prototype, Test

---

#### Q4: User Story Format (1 point)
**Type:** Multiple Choice

Which user story follows the correct format?

- A) "The app should have a login page with email and password fields, plus a reset link for returning users."
- B) "As a returning user, I want to log in with my email, so that I can access my saved preferences."
- C) "As a returning user, I want to log in with my email and password right from the app's home page."
- D) "Login feature - must support OAuth and email/password authentication, with sessions kept for 30 days."

---

#### Q5: Claude Projects (1 point)
**Type:** Multiple Choice

What is the primary benefit of using Claude Projects instead of uploading files in every conversation?

- A) Project files are available in every chat in that Project, so you never re-upload them
- B) Files in Projects are automatically converted to code that Claude can run in every chat
- C) Projects let multiple users edit the same conversation simultaneously in real time
- D) Projects encrypt your uploaded files for extra security beyond what regular chats get

---

### Section 2: Application Questions (Q6-Q10, mix of 1-2 points)

---

#### Q6: Mom Test Interview Mistakes (2 points)
**Type:** Multiple Choice

During a user interview, a founder says: "So what I'm building is basically Uber for dog walking. You'd open the app, see nearby walkers, book one, and pay through the app. Don't you think that would be useful?"

Which Mom Test mistake is the founder making?

- A) Talking to the wrong customer segment
- B) Not following up on answers
- C) Accepting vague answers as validation
- D) Pitching instead of listening

---

#### Q7: Artifacts Workflow (1 point)
**Type:** Multiple Choice

You want to test a new dashboard layout with potential users before writing production code. What is the best approach using Claude Web Artifacts?

- A) Ask Claude to generate the complete backend and frontend code so users test the real thing
- B) Write detailed technical specifications and have Claude review them before users see anything
- C) Describe the layout, let Claude generate a React artifact, then iterate conversationally
- D) Ask Claude to create a database schema for the dashboard, then walk users through the data model

---

#### Q8: MoSCoW Prioritization (2 points)
**Type:** Multiple Choice

You're building a multi-user task management web app. You have limited time and the following features: user login, task CRUD, search/filter, dark mode, and calendar sync. Using MoSCoW prioritization, which is the correct categorization?

- A) Must Have: login, CRUD; Should Have: search/filter; Could Have: dark mode; Won't Have: calendar sync
- B) Must Have: dark mode, calendar sync; Should Have: login, CRUD; Could Have: search/filter; Won't Have: none
- C) Must Have: all five features, since cutting any one of them leaves users with an incomplete MVP
- D) Must Have: search/filter, dark mode; Should Have: login; Could Have: CRUD, calendar sync; Won't Have: none

---

#### Q9: The Five Golden Questions (2 points)
**Type:** Multiple Choice

You're interviewing potential users about meal planning. They mention they sometimes struggle with it. What is the best follow-up question according to The Mom Test?

- A) "Would an AI meal planning app solve that problem for you, do you think?"
- B) "How much would you pay for a meal planning solution that fixed that?"
- C) "Do you think most people you know have this same meal planning problem?"
- D) "Tell me about the last time that happened. What made it difficult?"

---

#### Q10: Personalization Layers (1 point)
**Type:** Multiple Choice

You want Claude to always use TypeScript and follow the Airbnb style guide when helping with your Project 1 code. Where should you configure this?

- A) In your Claude Profile preferences (applies to all of your conversations)
- B) In Claude Project Instructions (applies to all conversations in that project)
- C) In a custom Style preset for code (applies to every chat where it's selected)
- D) In every individual prompt you write, so the rule always sits in recent context

---

### Section 3: Scenario-Based Questions (Q11-Q15, mix of 1-2 points)

---

#### Q11: Converting Interviews to User Stories (2 points)
**Type:** Multiple Choice

During a Mom Test interview, a marketing analyst tells you: "Every Monday morning I spend about an hour copying data from email reports into my spreadsheet. It's tedious and I sometimes make copy-paste errors."

Which user story best captures this insight?

- A) "As a user, I want the app to work with my email and my spreadsheets, so that it's more useful for my weekly work."
- B) "Build an email-to-spreadsheet integration that parses the Monday report emails automatically and fills in the marketing analyst's sheet."
- C) "As a marketing analyst, I want to automatically import email report data into spreadsheets, so that I save time and avoid manual errors."
- D) "As a developer, I want to build an email parser for the Monday report emails, so that the system can load their data into the analyst's sheet."

---

#### Q12: AI Accelerating Design Thinking (1 point)
**Type:** Multiple Choice

How can AI (like Claude) best accelerate the Empathize phase of Design Thinking?

- A) Summarize interview transcripts and help identify patterns across multiple interviews
- B) Conduct the user interviews for you automatically, then report back what users said
- C) Skip the Empathize phase entirely, since AI already understands typical users well
- D) Generate realistic user personas from its training data, without any interview research

---

#### Q13: Context Management Best Practices (2 points)
**Type:** Multiple Choice

You've been working with Claude on your Project 1 for an hour. The conversation now spans architecture decisions, coding help, and debugging. You want to start designing a new feature. What's the best approach?

- A) Continue in the same conversation so Claude keeps all the earlier decisions in view
- B) Upload your entire codebase again in this chat to refresh Claude's memory of it
- C) Increase the temperature setting so Claude recalls earlier decisions more reliably
- D) Start a new conversation and reference your Project's persistent knowledge

---

#### Q14: INVEST Criteria (2 points)
**Type:** Multiple Choice

According to the INVEST criteria, what makes this user story problematic? "As a user, I want the entire app to be built with a complete backend, frontend, database, and authentication system, so that I can use it."

- A) It's not Independent - it depends on other stories being finished before it can start
- B) It's not Small or Estimable - it's too large to complete in one sprint or estimate accurately
- C) It's not Valuable - a complete app is infrastructure work, so it doesn't deliver user value
- D) It's not Negotiable - the 'As a user' template locks every detail before the team can discuss it

---

#### Q15: Prototype Testing (2 points)
**Type:** Multiple Choice

You've created an Artifact prototype and want to test it with a classmate. According to Design Thinking's Test phase, what should you do first?

- A) Explain all the features and how to use each one, so their feedback is well informed
- B) Show them the prototype and ask "What do you think this does?" without explaining
- C) Ask them "Do you like it?" first, to gauge their overall gut reaction to the design
- D) Ask them to rate each feature from 1-10, so you get numbers you can compare across testers

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
