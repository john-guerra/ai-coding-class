# AI Code Security — Quick Card

*Agentic Engineering workshop · Session 4*

> **AI writes code that works but is vulnerable.** Only ~**55%** of AI-generated code passes
> security checks despite >95% syntactic correctness — and larger models are *not* more secure.
> [Veracode](https://www.veracode.com/blog/genai-code-security-report/) · *Functional ≠ secure.*

## The lethal trifecta (Simon Willison)

An agent is dangerous when it can do **all three**:

```
   Private data   +   Untrusted content   +   External comms
   (your files,       (web pages, emails,      (send / post /
    secrets, DB)       tool output)             exfiltrate)
                    = data-exfiltration risk
```

[lethal trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/)

## Meta's Rule of Two

> An agent should satisfy **at most two** of the three **without a human in the loop**.

If a task needs all three, **put a human checkpoint** on the irreversible/outbound step. [Rule of Two](https://ai.meta.com/blog/practical-ai-agent-security/)

## Audit any AI-written code

```bash
gitleaks detect --source .     # secrets committed to the repo
npm audit                      # known-vulnerable dependencies
semgrep --config auto src/     # injection, SSRF, authz, XSS…
```
Then ask: *would I have caught these without the tools?*

## Risk-tiered approval (design your gates)

- **DENY** — block outright (force-push, mass delete, secret exfiltration).
- **ALLOW** — auto-approve low-risk to cut noise (reads, in-project edits).
- **HUMAN** — gate the irreversible / financial / PII / outbound ~10–15% of actions.

> The goal is **appropriate reliance**, not maximal trust.
