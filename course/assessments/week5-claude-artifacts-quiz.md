# Week 5: Building with Claude Web Artifacts Quiz

## Quiz Settings (Configure in Canvas)

| Setting | Value |
|---------|-------|
| **Quiz Type** | Graded Quiz |
| **Points** | 14 points |
| **Time Limit** | 10 minutes |
| **Allowed Attempts** | 1 |
| **Shuffle Answers** | Yes |
| **Show One Question at a Time** | Yes |
| **Lock Questions After Answering** | Yes |
| **Due Date** | Before the week's first class: Tue 10:35 AM PT (Oak/Hybrid) · Wed 1:00 PM PT (San Jose) |
| **Available From** | Start of the week (quiz + readings are pre-class) |
| **Published** | No (until ready) |

---

## Quiz Instructions

This quiz assesses your understanding of Claude Web Artifacts concepts from the Week 4–5 required readings (taken before the Week 5 lecture).

**Instructions:**
- **Time Limit:** 10 minutes
- **Questions:** 10 questions (14 points total)
- **Attempts:** One attempt only

**Topics Covered:**
- Artifact storage: new vs. legacy artifacts, personal vs. shared, limits
- From sketch to prototype (Design Thinking, Week 4)
- AI-powered artifacts (calling Claude, who pays)
- Sharing new artifacts
- Starting, fixing, and checking an artifact
- Claude Projects for persistent context
- When to move from an artifact prototype to production

**Academic Integrity:** This is an individual assessment. Do not use AI assistants to answer questions. Questions are designed to test your understanding, not your ability to look up answers.

---

## Questions

All questions are answerable from the Week 4–5 **required readings** and the Week 1–4 lectures — this quiz is taken before the Week 5 lecture.

### Section 1: Foundational Concepts (Q1-Q5, mix of 1-2 points)

---

#### Q1: Personal vs. Shared Storage (1 point)
**Type:** Multiple Choice

Your P1 journal artifact will be shared with classmates. Each person's entries must stay visible only to that person. Which artifact storage fits?

- A) Personal storage, since each person keeps their own private data in the same artifact
- B) Shared storage, since only the artifact's builder can read the entries others type in
- C) Shared storage, since each entry turns private once its author signs in to Claude
- D) Neither, since artifacts can't keep separate data per user without adding a backend

---

#### Q2: Storage in New Artifacts (1 point)
**Type:** Multiple Choice

Using your Northeastern Claude Enterprise account, you build a **new** habit-tracker artifact (made after Sept 16, 2026) and want each entry to include a photo. What does artifact storage do for you?

- A) It saves entries only after you publish, and photos are fine as long as each one is under 20 MB
- B) It saves nothing until you share the artifact, since storage is set up per viewer when a link is made
- C) It saves entries right away without publishing, but it holds text only, so the photos can't go there
- D) It saves entries right away, and the photos fit too as long as the whole artifact stays under 20 MB

---

#### Q3: From Sketch to Prototype (1 point)
**Type:** Multiple Choice

You've sketched your P1 habit tracker on paper. Following Week 4's Prototype and Test phases of Design Thinking, what should your first artifact be?

- A) A polished app with every planned feature, since users only give useful feedback on finished products
- B) A version you try only on yourself first, since real users can't judge something this unfinished
- C) No artifact yet, since Design Thinking says to finish all testing on paper before you build anything
- D) The simplest interactive version that tests your riskiest assumption, put in front of real users

---

#### Q4: AI-Powered Artifacts (2 points)
**Type:** Multiple Choice

Using your Northeastern Claude Enterprise account, you add a "smart search" that calls Claude to your P1 artifact, then share it with 30 classmates in the Northeastern organization. What is true about those AI calls?

- A) You must paste an API key into the code, and the sandbox hides that key from all viewers
- B) No API key is needed, and each classmate's usage counts against their own Claude plan
- C) No API key is needed, but all 30 classmates' calls count against your own plan as author
- D) It can't be done, since the sandbox blocks every outbound call, including to Claude

---

#### Q5: Starting an Artifact (1 point)
**Type:** Multiple Choice

You have only a vague idea for a P1 study tracker. Based on the required readings, what is a good first message to Claude?

- A) Share the rough idea and ask Claude to interview you with questions until the plan is clear
- B) Paste in HTML and CSS you wrote first, since Claude builds artifacts out of your own code
- C) List every UI component up front, since Claude can't ask follow-up questions while building
- D) Ask for the finished app in one prompt, since follow-up requests restart the artifact

---

### Section 2: Application & Scenario Questions (Q6-Q10, mix of 1-2 points)

---

#### Q6: Fixing a Broken Artifact (2 points)
**Type:** Multiple Choice

Your artifact renders a blank screen and shows **no error message**. Based on the required readings, what should you do?

- A) Delete the artifact and regenerate it from scratch, since a blank render means the file is corrupted
- B) Copy the artifact's code into a new chat and ask for a rebuild, since a fresh chat clears the broken state
- C) Wait for the "Try fixing with Claude" button, since it appears whenever an artifact goes blank
- D) Tell Claude in plain language what you expected and what you see instead, and let it fix it

---

#### Q7: Claude Projects for P1 (2 points)
**Type:** Multiple Choice

You're building your P1 artifact across multiple Claude conversations. What should you upload to your Claude Project's knowledge base to maintain consistent context?

- A) Your latest code file alone, since Claude re-infers requirements and conventions from the code
- B) The full Claude docs website, so Claude can look up artifact rules it doesn't know
- C) Your PRD, user stories, tech-stack decisions, and Mom Test notes, since code alone hides the why
- D) Your API keys and .env file, so every artifact built in the Project can authenticate across conversations

---

#### Q8: Sharing New Artifacts (1 point)
**Type:** Multiple Choice

You share a **new** artifact's link with a friend who has no Claude account. What happens?

- A) They can use it fully, since any shared artifact link works without signing in
- B) They can't open it, since everyone needs a Claude account to use a new artifact
- C) They see a read-only screenshot, since accounts are only needed to interact with it
- D) They can use it, but their AI calls bill to your plan, since they have no account

---

#### Q9: Beyond the Prototype (2 points)
**Type:** Multiple Choice

Your P1 artifact works and classmates use it daily. You now want real user accounts, your own API key management, and a database behind it. Based on the required readings, what is the right next step?

- A) Keep growing the artifact itself, since Enterprise sharing turns it into a production app for any number of users
- B) Add a server inside the artifact, since new artifacts can run backend code once artifact storage is turned on
- C) Export the artifact and deploy it unchanged, since artifacts already ship with production-grade API key management built in
- D) Treat the artifact as the prototype and rebuild with real infrastructure, since artifacts are best for testing and demos

---

#### Q10: Checking Before You Share (1 point)
**Type:** Multiple Choice

Before sharing your P1 artifact with classmates, what do the required readings recommend you do?

- A) Try to break it with rushed-user input, such as a decimal, an empty field, or a very long answer
- B) Publish it first, since bugs only show up once an artifact has been shared with other people
- C) Ask Claude whether it works, since Claude runs the edge-case inputs itself before rendering
- D) Let classmates find the bugs, since the first version Claude builds is locked as final once others see it

---

## Canvas Import Instructions

1. **Create New Quiz** in Canvas under "Quizzes" using `canvas-extras` MCP tools
2. **Configure Settings** as shown in the Settings table above
3. **Add Questions** using `canvas_create_quiz_question` for each question
4. **Set Correct Answers** (see answer key - instructor only)
5. **Save and Preview** before publishing

## Anti-Cheating Measures Implemented

1. **Time pressure** - 10 minutes for 10 questions limits research time
2. **Answer shuffling** - Different order for each student
3. **Scenario-based** - Requires understanding and application, not just recall
4. **Single attempt** - No retakes
5. **Locked questions** - Can't go back and change answers
6. **Progressive difficulty** - Easier concepts first, harder application last
