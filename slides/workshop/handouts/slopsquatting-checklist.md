# Slopsquatting — Defense Checklist

*Agentic Engineering workshop · Session 4*

## What it is

AI models **hallucinate plausible package names that don't exist**. Attackers **register those
names** and fill them with malware. When your agent runs `npm install <hallucinated-pkg>`, you're
compromised.

**Why it's exploitable, not theoretical:**
- ~**1 in 5** package suggestions may not be real (open-source models worse than commercial).
- ~**43%** of hallucinated names **recur across identical re-runs** → predictable → registrable.

[CSA research note](https://labs.cloudsecurityalliance.org/research/csa-research-note-slopsquatting-ai-supply-chain-20260419-csa/)

## Before you install anything the AI suggested

- [ ] **Does the package actually exist** on the registry — and is it the one you meant?
- [ ] **Real project?** Check downloads, repo, maintainers, last publish. Beware brand-new packages.
- [ ] **Flag packages registered in the last 30–90 days** — treat as suspect.
- [ ] **Name looks like a typo/variant** of a popular package? (e.g. `reqessts`, `lodahs`) → stop.
- [ ] **Never blind-install** from a copy-pasted command.

## In CI / for autonomous agents

- [ ] **Pin versions + verify hashes** (lockfile with integrity, `--frozen-lockfile`).
- [ ] **Allowlist** the dependencies an autonomous agent may add.
- [ ] **`npm audit` (or equivalent)** as a required CI gate.
- [ ] **Review new dependencies** in PRs like any other code change.

> Callback: this is the **hallucination** problem from Session 1, weaponized into a supply-chain attack.
