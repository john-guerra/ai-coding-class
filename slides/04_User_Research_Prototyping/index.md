---
title: "CS 7180: User Research & Prototyping"
theme: white
revealOptions:
  transition: convex
  hash: true
  history: true
---

<!-- .slide: id="title" -->

## CS 7180: User Research & Prototyping

<img src="../img/seal_logotype-768x252.png" alt="Northeastern University" width="300">

[**John Alexis Guerra Gomez**](http://johnguerra.co/)

jguerra at northeastern.edu

Class: [johnguerra.co/classes/aiCoding_spring_2026](https://johnguerra.co/classes/aiCoding_spring_2026/)

Slides: [johnguerra.co/lectures/ai_assisted_coding](http://johnguerra.co/lectures/ai_assisted_coding/04_User_Research_Prototyping/)

---

# What We'll Cover Today

1. The Mom Test -- Customer Interviews Done Right
2. Design Thinking for Software Engineers
3. Claude Web Artifacts for Rapid Prototyping
4. User Stories & PRDs
5. Hands-On Lab

---

# The Mom Test

> Talk about their life, not your idea.

<!-- vertical -->

## Why Most User Research Fails

People lie to be nice.

- Your mom will say your idea is great
- Friends will encourage you
- Strangers will be politely positive

**The Mom Test** teaches you to get honest data by asking about behavior, not opinions.

<!-- vertical -->

## The Three Rules

<!-- .slide: class="dense" -->

| Rule | What It Means |
|------|---------------|
| **1. Talk about their life** | Not your idea. Ask about their problems, routines, and frustrations. |
| **2. Ask about specifics in the past** | Not generics about the future. "Last time you..." not "Would you ever..." |
| **3. Talk less, listen more** | You should be talking less than 30% of the time. |

*Source: Rob Fitzpatrick, The Mom Test*

<!-- vertical -->

## Bad Questions vs Good Questions

**Bad (opinion-based, future-oriented):**

- "Would you use an app that does X?"
- "Do you think this is a good idea?"
- "How much would you pay for this?"

**Good (behavior-based, past-oriented):**

- "Tell me about the last time you had this problem..."
- "What did you do to solve it?"
- "How much did that cost you (time/money/frustration)?"

<!-- vertical -->

## The Five Golden Questions

1. **"What's the hardest part about [problem area]?"**
   - Opens the conversation, surfaces real pain
2. **"Tell me about the last time that happened..."**
   - Gets concrete stories, not hypotheticals
3. **"Why was that hard?"**
   - Uncovers root causes
4. **"What, if anything, have you done to solve this?"**
   - Reveals existing alternatives and commitment level
5. **"What don't you love about your current solution?"**
   - Finds gaps your product could fill

<!-- vertical -->

## Common Mistakes

- **Pitching instead of listening** -- You start explaining your solution
- **Fishing for compliments** -- "Don't you think it would be cool if..."
- **Accepting vague answers** -- "Yeah, that sounds useful" (push for specifics)
- **Not following up** -- The gold is in the follow-up questions
- **Talking to the wrong people** -- Interview actual potential users

<!-- vertical -->

## Interview Structure

**Before (5 min):**
- Set context: "I'm exploring [problem space]"
- No product pitch

**During (15-20 min):**
- Start broad, then dig into specifics
- Follow emotional reactions
- Take notes on behaviors, not opinions

**After (5 min):**
- Ask who else you should talk to
- Thank them

<!-- vertical -->

## Exercise: Interview Practice

**Pair up and practice:**

1. Person A: Interview Person B about a daily frustration
2. Use only "good" questions
3. Person B: Answer honestly (no politeness filter)
4. Switch after 5 minutes

**Debrief:** What surprised you? What insights emerged?

<!-- vertical -->

## Discussion

- What made the good questions effective?
- When were you tempted to pitch instead of listen?
- How would you apply this to your Project 1 idea?

<!-- vertical -->

## From Interviews to User Stories

**Interview insight:**
"I spend 30 minutes every morning copying data from email into spreadsheets"

**User story:**
"As a **marketing analyst**, I want to **automatically extract data from emails**, so that **I save time on manual data entry**"

The Mom Test gives you the raw material. User stories structure it for building.

---

# Design Thinking

> A human-centered approach to innovation.

<!-- vertical -->

## The Five Phases

<!-- .slide: class="dense" -->

| Phase | Activity | Output |
|-------|----------|--------|
| **Empathize** | Observe and interview users | Interview notes, empathy maps |
| **Define** | Synthesize findings into a clear problem | Problem statement, personas |
| **Ideate** | Generate many possible solutions | Brainstorm list, sketches |
| **Prototype** | Build quick, low-fidelity versions | Clickable mockups, paper prototypes |
| **Test** | Get feedback on prototypes | Validated/invalidated assumptions |

<!-- vertical -->

## Empathize & Define

**Empathize:**
- Conduct Mom Test interviews
- Observe users in their environment
- Build empathy maps (Says/Thinks/Does/Feels)

**Define:**
- Synthesize interview data into patterns
- Write a Point-of-View statement:

"**[User]** needs a way to **[need]** because **[insight]**"

<!-- vertical -->

## Ideate & Prototype

**Ideate:**
- Generate many ideas (quantity over quality)
- "How Might We..." framing
- No judging during brainstorming

**Prototype:**
- Build the simplest version that tests your riskiest assumption
- Paper sketches, wireframes, clickable mockups
- Artifacts in Claude Web are perfect for this

<!-- vertical -->

## Test & Iterate

**Test:**
- Show prototypes to real users (not teammates)
- Watch them use it -- don't explain
- Ask: "What do you think this does?"

**Iterate:**
- Refine based on feedback
- Go back to earlier phases if needed
- Design Thinking is non-linear

<!-- vertical -->

## Design Thinking + AI

AI accelerates every phase:

- **Empathize:** Summarize interview transcripts, find patterns
- **Define:** Generate personas from interview data
- **Ideate:** Brainstorm solutions with Claude
- **Prototype:** Build interactive prototypes with Artifacts
- **Test:** Create test scripts, analyze feedback

<!-- vertical -->

## AI as Design Partner

Use Claude Web to:

- Synthesize 3+ interviews into common themes
- Generate "How Might We" questions from pain points
- Create multiple solution sketches from a single prompt
- Build interactive prototypes for user testing

**Key principle:** AI speeds up the loop. You still make the decisions.

---

# Claude Web Artifacts

> From idea to interactive prototype in minutes.

<!-- vertical -->

## What Are Artifacts?

Artifacts are interactive, self-contained outputs that Claude creates:

- **React components** -- Live, interactive UIs
- **HTML pages** -- Styled, functional pages
- **SVG graphics** -- Diagrams, charts, icons
- **Documents** -- Formatted text, tables

They render directly in the Claude Web interface -- no setup needed.

<!-- vertical -->

## Prototyping with Artifacts

**Use cases for this course:**

- Mockup your Project 1 UI before writing real code
- Create interactive wireframes for user testing
- Build data visualizations to explore ideas
- Generate landing pages for user feedback

<!-- vertical -->

## Artifacts Workflow

1. **Describe what you want** -- Be specific about layout, interactions, data
2. **Claude generates the artifact** -- React component or HTML
3. **Iterate conversationally** -- "Move the nav to the left" / "Add a dark mode toggle"
4. **Test with users** -- Share the artifact link for feedback
5. **Use as a spec** -- Reference the prototype when building the real app

<!-- vertical -->

## Tips for Better Artifacts

- Start with a clear description of the user flow
- Include specific data examples (not "some items")
- Request specific styling ("Tailwind", "minimalist", "dashboard-style")
- Iterate in small steps -- one change per message
- Ask for responsive design if mobile matters

---

# User Stories & PRDs

> Translating research into buildable requirements.

<!-- vertical -->

## User Story Format

**Template:**

"As a **[type of user]**, I want **[goal/action]**, so that **[benefit/value]**"

**Examples:**

- "As a **student**, I want to **track my assignment deadlines**, so that **I never miss a submission**"
- "As a **team lead**, I want to **see sprint progress at a glance**, so that **I can identify blockers early**"

<!-- vertical -->

## INVEST Criteria

Good user stories are:

<!-- .slide: class="dense" -->

| Criterion | Meaning |
|-----------|---------|
| **I**ndependent | Can be built in any order |
| **N**egotiable | Details can be discussed |
| **V**aluable | Delivers value to the user |
| **E**stimable | Small enough to estimate effort |
| **S**mall | Completable in one sprint |
| **T**estable | Has clear acceptance criteria |

<!-- vertical -->

## MoSCoW Prioritization

<!-- .slide: class="dense" -->

| Priority | Meaning | Example |
|----------|---------|---------|
| **Must Have** | App doesn't work without it | User login, core CRUD |
| **Should Have** | Important but not critical | Search, filtering |
| **Could Have** | Nice to have | Dark mode, animations |
| **Won't Have** | Out of scope for now | Mobile app, AI features |

Use MoSCoW to scope your Project 1 MVP.

<!-- vertical -->

## PRD Structure

A lightweight Product Requirements Document for Project 1:

1. **Problem Statement** -- What pain point are you solving? (from interviews)
2. **Target Users** -- Who are they? (from empathy mapping)
3. **User Stories** -- 5-8 prioritized stories (MoSCoW)
4. **Success Metrics** -- How will you know it works?
5. **Technical Constraints** -- Stack, timeline, skill level
6. **Out of Scope** -- What you explicitly won't build

---

# Research to Product Pipeline

How it all fits together:

1. **Mom Test interviews** -- Discover real problems
2. **Empathy maps** -- Synthesize findings
3. **User stories** -- Structure requirements
4. **MoSCoW prioritization** -- Scope the MVP
5. **Artifacts prototype** -- Validate the UI
6. **PRD** -- Document the plan
7. **Build** -- Start coding in Week 5

---

# Hands-On Lab

<!-- vertical -->

## Lab: Prototype with Artifacts

**Task (20 min):**

1. Open Claude Web (claude.ai)
2. Describe your Project 1 idea in 2-3 sentences
3. Ask Claude to create an interactive prototype as an Artifact
4. Iterate at least 3 times to improve it
5. Share with a neighbor for feedback

**Deliverable:** Screenshot of your final prototype

<!-- vertical -->

## Peer Feedback

After building your prototype:

1. Show your Artifact to a classmate
2. Ask them: "What do you think this does?" (don't explain first)
3. Note their confusion points
4. Ask: "What would you change?"
5. Iterate based on feedback

---

# What to Remember

- **The Mom Test:** Ask about behavior, not opinions
- **Design Thinking:** Empathize before you build
- **Artifacts:** Prototype fast, iterate faster
- **User Stories:** Structure your requirements with INVEST
- **MoSCoW:** Prioritize ruthlessly for your MVP

---

# Looking Ahead

**Next class: Antigravity IDE & TDD Introduction**
- Setting up Antigravity
- Tab autocomplete, Cmd+K, Composer
- Test-Driven Development basics

**HW2 Due Next Week:** Mom Test Interviews + User Stories

---

# Resources

**Books:**
- [The Mom Test](https://www.momtestbook.com/) - Rob Fitzpatrick
- [Designing for Growth](https://designingforgrowth.com/) - Liedtka & Ogilvie

**Claude Web & Artifacts:**
- [Claude Artifacts Guide](https://support.claude.com/en/articles/11649427-use-artifacts-to-visualize-and-create-ai-apps-without-ever-writing-a-line-of-code)

**Design Thinking:**
- [IDEO Design Thinking](https://designthinking.ideo.com/)
- [Stanford d.school Resources](https://dschool.stanford.edu/resources)
