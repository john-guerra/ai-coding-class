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

This quiz assesses your understanding of Claude Web Artifacts concepts covered in Week 5 lectures and readings.

**Instructions:**
- **Time Limit:** 10 minutes
- **Questions:** 10 questions (14 points total)
- **Attempts:** One attempt only

**Topics Covered:**
- Artifact storage (new vs. legacy artifacts after the Sept 16, 2026 redesign)
- Artifact limitations (single-file architecture)
- AI-powered artifacts (calling Claude from artifacts)
- Sharing artifacts
- Mockup-to-artifact workflow
- Debugging artifacts with DevTools
- Claude Projects for persistent context
- Iterative development loop

**Academic Integrity:** This is an individual assessment. Do not use AI assistants to answer questions. Questions are designed to test your understanding, not your ability to look up answers.

---

## Questions

### Section 1: Foundational Concepts (Q1-Q5, mix of 1-2 points)

---

#### Q1: Planning for Persistence (1 point)
**Type:** Multiple Choice

Per the lecture's "Implications for Project 1" slide, which situation must your P1 persistence code explicitly handle?

- A) Saved records coming back as XML, since artifact storage converts JSON objects to XML on save
- B) Saved data being wiped at midnight, since artifact storage is cleared on a fixed daily schedule
- C) The viewer's Claude password expiring, since saved data is encrypted with that user's password
- D) The first run, when no saved data exists yet, so the app must start from a sensible default

---

#### Q2: Storage in New Artifacts (1 point)
**Type:** Multiple Choice

Using your Northeastern Claude Enterprise account, you build a **new** artifact (made after Sept 16, 2026) that saves a habit log to artifact storage. When does that storage start working?

- A) Only after you publish it, since the in-chat preview never saves data on any plan
- B) Only after you share it with someone, since storage is created per shared viewer
- C) Right away while you build it, since new artifacts don't need publishing to store data
- D) Never inside Claude, since artifacts can't save data and P1 needs a backend database

---

#### Q3: Artifact Limitations (1 point)
**Type:** Multiple Choice

Which of the following is a key limitation of Claude Artifacts that affects how you structure your Project 1?

- A) All code must live in one file, since an artifact can't import your other modules
- B) Artifacts execute only Python in a server-side sandbox, so React code is rejected
- C) Libraries must be installed with npm inside the artifact, since the sandbox runs Node
- D) Each artifact is capped at 100 lines, so bigger apps must be split across chats

---

#### Q4: AI-Powered Artifacts (2 points)
**Type:** Multiple Choice

A student adds a "smart search" to their P1 artifact that calls Claude, then shares it with 30 classmates. What is true about those AI calls?

- A) The student must paste an API key into the code, and the sandbox hides it from viewers
- B) No API key is needed, and each classmate's usage counts against their own Claude plan
- C) No API key is needed, but all 30 classmates' calls count against the author's own plan
- D) It can't be done, since the sandbox blocks every outbound call, including to Claude

---

#### Q5: Mockup-to-Artifact Workflow (1 point)
**Type:** Multiple Choice

What is the recommended first step when turning a design into a Claude Artifact?

- A) Hand-write the full HTML/CSS first and paste it in, since Claude can't build from images
- B) Describe the whole app in one long prompt, since an image upload resets the artifact
- C) Have Claude invent a design with no reference, since images bias it to copy the layout
- D) Upload a sketch or mockup image, since Claude can see your design and build it as an artifact

---

### Section 2: Application & Scenario Questions (Q6-Q10, mix of 1-2 points)

---

#### Q6: Debugging Artifacts (2 points)
**Type:** Multiple Choice

Your artifact renders a blank screen with no visible error message. What is the **MOST** effective debugging strategy?

- A) Open DevTools and read the Console, since a blank render means a runtime error before render, then describe expected vs actual to Claude
- B) Delete the artifact and regenerate it from scratch, since a blank render means the file is corrupted and follow-up prompts can only patch visible errors
- C) Switch the artifact type from React to plain HTML, since a blank screen means the sandbox found no React runtime, and HTML artifacts render without one
- D) Switch to a larger Claude model and regenerate the whole file, since blank screens come from weaker code generation that a smaller model can't self-correct

---

#### Q7: Claude Projects for P1 (2 points)
**Type:** Multiple Choice

You're building your P1 artifact across multiple Claude conversations. What should you upload to your Claude Project's knowledge base to maintain consistent context?

- A) Only your latest code file, since Claude infers requirements and conventions from it
- B) The full Claude docs website, so Claude can look up artifact rules it doesn't know
- C) Your PRD, user stories, architecture decisions, and mockups, since code alone hides the why
- D) Your API keys and .env file, so the artifact can authenticate across conversations

---

#### Q8: Sharing New Artifacts (1 point)
**Type:** Multiple Choice

You share a **new** artifact's link with a friend who has no Claude account. What happens?

- A) They can use it fully, since any shared artifact link works without signing in
- B) They can't open it, since everyone needs a Claude account to use a new artifact
- C) They see a read-only screenshot, since accounts are only needed to interact with it
- D) They can use it, but their AI calls bill to your plan, since they have no account

---

#### Q9: AI-Powered Artifact Best Practices (2 points)
**Type:** Multiple Choice

You're building an artifact that classifies user-entered text into categories using Claude. Users report the app feels slow and sometimes shows errors. Which combination of best practices would **MOST** improve the experience?

- A) Raise max_tokens to 4096 and retry each failed call 5 times in a loop, since longer outputs and retries mask the latency
- B) Switch to a larger model and batch every input into one prompt, since bigger models return each token faster than small ones
- C) Call Claude on every keystroke so results stay fresh, and suppress errors silently so users never see a failure message
- D) Add loading states, cache results for repeated inputs, and fall back gracefully, since calls take time and can fail

---

#### Q10: Iterative Development Loop (1 point)
**Type:** Multiple Choice

What is the key insight about the artifact development workflow emphasized in the lecture?

- A) Speed comes from writing perfect prompts that generate correct code on the first try
- B) Plan every detail up front, since an artifact can't be changed once built
- C) Speed comes from fast iteration — plan, mockup, upload, build, test, iterate
- D) Finish each artifact in one detailed prompt, since follow-ups lose context

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
