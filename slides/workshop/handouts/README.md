# Workshop Handouts

Seven printable one-page reference cards for participants. Hand them out per session or as an
end-of-workshop packet.

| Card | Use in | What it covers |
|---|---|---|
| [`harness-fundamentals.md`](harness-fundamentals.md) | Foundations | Next-token → tools → context → the agentic loop; the ladder + the three harnesses |
| [`prompt-anatomy.md`](prompt-anatomy.md) | S1 | The 5-component prompt structure, the 4 patterns, the iteration loop |
| [`memory-and-modes.md`](memory-and-modes.md) | S2 | CLAUDE.md hierarchy, context engineering, the modes tour + auto mode |
| [`spec-card.md`](spec-card.md) | S3 | The one-sentence rule, the interview prompt, the four spec criteria, verify-the-diff |
| [`security-card.md`](security-card.md) | S4 | Lethal trifecta, Rule of Two, the audit tools, risk-tiered gates |
| [`slopsquatting-checklist.md`](slopsquatting-checklist.md) | S4 | Hallucinated-package supply-chain defense checklist |
| [`ai-use-framework.md`](ai-use-framework.md) | Close | Personal AI-use framework + anti-deskilling habits (fill-in) |

**Rendering:** these are authored in Markdown but published as **standalone printable HTML pages**
(not reveal.js slides). `npm run build:workshop` runs `build-handouts.mjs`, which wraps each card in
the Ink & Ochre template with a print stylesheet — open one and use **Print / Save PDF**. Numeric
claims carry source links so participants can verify them.
