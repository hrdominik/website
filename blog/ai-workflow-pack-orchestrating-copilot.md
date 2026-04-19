> **Updated — April 2025:** This template has evolved. What started as a GitHub Copilot workflow pack is now a full Claude Code orchestration template — with specialized agents, automated hooks, domain rules, and multi-step skills. Same philosophy, sharper tooling. [Jump to the template.](#if-you-want-to-try-it)

---

## AI is useful long before it's autonomous

The internet loves the "big bang" version of AI adoption.

> AI replaces developers.  
> AI writes the entire system.  
> AI ships production features while you sip coffee.

It makes for good headlines. It makes for terrible delivery plans.

In real enterprise work—especially in regulated or business-critical environments—the value of AI almost never comes from autonomy. It comes from **intentional use under human control**. From placing AI into a delivery architecture you can explain, audit, and hand over.

AI is not something you "unleash".
It is something you integrate.

And in that integration, the unglamorous details matter more than the model.

- Clear responsibilities.  
- Clear boundaries.  
- Clear expectations.  
- A workflow that remains reviewable even when the chat history is gone.


## Orchestration, not vibe coding

There is a popular idea right now that "vibe coding" is the future of software development. You describe what you want in natural language, the model generates the code, and you ship it. Intuitive, fast, impressive in demos.

It is also the opposite of what enterprise delivery requires.

Vibe coding treats AI as a replacement for engineering judgment. Orchestration treats AI as a tool *within* engineering judgment. The difference is not academic—it determines whether your output is auditable, your process is repeatable, and your team can actually maintain what was built.

The model might be "right". But if nobody can explain *why* it is right, or *what constraints* it operated under, you do not have a delivery—you have a bet.

In regulated environments, bets do not ship.


## Where default AI usage starts to break down

AI coding assistants are genuinely useful out of the box. But their defaults are optimized for speed and convenience, not for predictability.

Left unstructured, usage patterns tend to converge toward the same shape: one omnipresent assistant, unclear ownership of decisions, and outputs that may look reasonable but are hard to reason about later.

That is often acceptable in early experimentation or small teams.

It is not acceptable in enterprise delivery, where you are explicitly paid for control, predictability, and traceability—and where "we'll explain it later" is not an operating model.

The problem is not the model.  
The problem is the absence of orchestration.


## My stance: AI does not replace responsibility

I don't let AI "write my code".

I let AI operate inside an architecture I control.

Used deliberately, AI already delivers real value as a constrained assistant: something that accelerates feedback loops, supports focused tasks, and reduces cognitive load—without replacing accountability.

Instead of treating AI as a single all-knowing agent, I separate concerns. Planning, implementation, documentation, security review, and testing are different kinds of work. They deserve different agents with different guardrails.

The analogy I keep coming back to is familiar to most engineers: microservices instead of a monolith, pipeline stages instead of ad-hoc scripts, runbooks instead of tribal knowledge.

The model remains probabilistic.  
The workflow becomes deterministic.


## A structured template for AI-assisted development

This mindset led me to build and publish a project template for VS Code and Claude Code. Not a framework, not a platform—a baseline for turning abstract AI potential into **concrete, traceable improvements** in day-to-day delivery.

The template provides five layers of orchestration:

**Specialized agents** replace the single omniscient assistant. A code reviewer that follows your team's standards. A debugger that does root-cause analysis, not shotgun fixes. A test writer that matches your existing patterns. A documentation writer that keeps living docs current. A security auditor focused on exploitable vulnerabilities, not theoretical noise.

**Domain rules** encode your non-negotiables. API conventions, database safety, frontend standards—applied automatically based on the code area being modified. These are not suggestions. They are constraints.

**Hooks** enforce discipline at the points where mistakes are most expensive. Pre-commit checks catch secrets, debug statements, and missing tests before they enter the history. On-save checks catch syntax errors in real time.

**Skills** automate multi-step workflows that are tedious but critical. `/commit-push-pr` reviews changes, generates a conventional commit, pushes, and creates a PR with a test plan—in one command. `/review-pr` runs code review, security audit, and test coverage analysis in parallel.

**Tracking documents** give AI—and your team—persistent context. Requirements, architecture decisions, and current development status live in `docs/` as structured markdown, updated continuously, and readable by both humans and AI.


## The loop that actually scales

In practice, the workflow reduces to a loop that is intentionally boring—and therefore scalable.

You keep a stable memory in the repository: requirements, architecture, status.  
You make AI consume that memory instead of chat history.  
You write outcomes back into that memory.

Each agent reads the project's `CLAUDE.md` for context: language, framework, commands, active rules. Each session can pick up where the last one left off because the state lives in files, not in ephemeral conversations.

The difference is subtle but important. This is no longer "AI as chat". It is AI as part of a delivery workflow.


## Why this matters in controlled environments

In most client environments, the hard part is not calling a model. That is usually trivial.

The hard part is governance.

Real AI adoption starts with questions that are much less exciting than model benchmarks: who owns which decisions, what interfaces exist, what is explicitly forbidden, and how behaviour can be observed and audited.

When agent instructions and rules are treated as configuration rather than magic incantations, new possibilities open up. Instructions can be versioned. Agents can be scoped. AI behaviour becomes reviewable, explainable, and improvable over time—by the team, not just by the person who last talked to the model.

This is what separates a tool from a toy. Enterprise readiness is not about the model's capability. It is about the **governance surface** around it: can you explain what it did, why, under what constraints, and who approved it?

The template answers these questions structurally:

- **What it did** — tracked in `docs/STATUS.md` and commit history  
- **Why** — captured in `docs/ARCHITECTURE.md` as decision records  
- **Under what constraints** — defined in `.claude/rules/` and `CLAUDE.md`  
- **Who approved it** — enforced by pre-commit hooks and PR reviews


## Vibe coding vs. orchestrated AI: a practical comparison

| | Vibe Coding | Orchestrated AI |
|---|---|---|
| **Control** | Model decides scope | Human defines constraints |
| **Auditability** | Chat history (ephemeral) | Rules, agents, docs (versioned) |
| **Consistency** | Depends on prompt quality | Enforced by rules and hooks |
| **Handover** | "Ask the model again" | Read the repo state |
| **Enterprise fit** | Proof of concept | Production delivery |

Vibe coding is a valid starting point for exploration. But it is not a delivery model. The moment you need to onboard a second developer, pass a security review, or explain a decision to a stakeholder, you need structure.

Orchestration provides that structure without sacrificing the speed that makes AI valuable in the first place.


## What clients actually ask for

Most clients do not ask for "AI".

They ask for faster feedback, better documentation, safer changes, and reduced cognitive load. The template is my attempt to translate abstract AI potential into delivery improvements that are reviewable, repeatable, and explainable.

No revolution language. No productivity-multiplier claims without context. Just a controlled way to use assistance—with the governance surface that enterprise environments demand.


## If you want to try it

[GitHub Repository — hrdominik/vscode-claude-template](https://github.com/hrdominik/vscode-claude-template)

Clone the template, edit `CLAUDE.md` with your project details, and start using agents and skills as your default workflow. Then adapt it—per team, per risk profile, per environment, per regulation.

The template includes:
- **5 agents** — code reviewer, debugger, test writer, doc writer, security auditor
- **2 hooks** — pre-commit checks, on-save validation
- **3 rule sets** — API, database, frontend
- **2 skills** — commit-push-pr, review-pr
- **3 tracking docs** — requirements, architecture, development status

There is no single right setup. There are only the right boundaries for your context.

If you build a variant that fits your organisation better, I would genuinely be interested in seeing it.
