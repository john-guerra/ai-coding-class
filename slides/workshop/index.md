---
title: "Agentic Engineering — Workshop Index"
theme: white
revealOptions:
  transition: convex
  hash: true
  history: true
---

<!-- .slide: id="title" -->

<span class="course-week">Workshop · 4 × 2h</span>

## Agentic Engineering

### Speed *with* Quality

A hands-on workshop on AI-assisted software engineering

[**John Alexis Guerra Gomez**](http://johnguerra.co/)

<small>[johnguerra.co](http://johnguerra.co/)</small>

---

## The Four Sessions

| # | Session | Focus |
|---|---|---|
| 1 | [**Fundamentals & Prompting**](session1/index.md) | LLM basics · the 3 harnesses · prompt engineering |
| 2 | [**Context, Memory & Modes**](session2/index.md) | CLAUDE.md · `@`-mentions · modes incl. auto mode |
| 3 | [**Build & Verify + Skills/Hooks**](session3/index.md) | EPIC · TDD · the 70% problem · skills + hooks |
| 4 | [**MCP, Subagents & Security**](session4/index.md) | MCP · subagents · audit + oral-defense capstone |

<small>Session 1 needs no setup. Sessions 2–4 build one small project, "Linkstash".</small>

---

## How It Fits Together

<pre class="mermaid">
%%{init: {'theme': 'default', 'flowchart': {'nodeSpacing': 20, 'rankSpacing': 25}}}%%
flowchart LR
  S1["S1<br/>Fundamentals"] --> S2["S2<br/>Memory & Modes"]
  S2 --> S3["S3<br/>Build & Verify"]
  S3 --> S4["S4<br/>Extend & Secure"]
</pre>

**Spine:** prompt engineering → context engineering → agent engineering, then *extend* and *secure*.

<small>Facilitator run-of-show: `facilitator-guide.md` · Modes reference: `../docs/research/claude_code_modes_2026.md`</small>

---

<!-- .slide: id="thanks" -->

## Start Here

Pick a session above, or begin with **[Session 1 →](session1/index.md)**

<small>Speed *with* quality.</small>
