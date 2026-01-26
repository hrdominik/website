## AI is useful long before it’s autonomous

The internet loves the “big bang” story:

> AI will replace developers.
> AI will write the entire system.
> AI will ship production features while you sip coffee.

That story makes great headlines — and terrible delivery plans.

In real enterprise work (especially regulated or business-critical systems), the value of AI is rarely found in autonomy. It’s found in **intentional orchestration under human control**.

AI is not a revolution you unleash.
It’s a tool you place into an architecture you can explain.

And yes: the small things matter.

- Clear roles
- Clear boundaries
- Clear expectations
- A workflow that remains reviewable

That’s why I built and published a small repo-ready `.github` workflow pack for VS Code + GitHub Copilot.

Repo: https://github.com/hrdominik/vscode-copilot-workflow-template

It’s not a framework. It’s a baseline: a practical way to turn “AI potential” into **concrete, traceable improvements** in day-to-day delivery.

---

## The problem with default Copilot usage

Copilot is already helpful out of the box — but it’s optimized for speed and convenience, not for predictability.

In practice, default usage often turns into:

- **One monolithic agent**: everything becomes “ask Copilot”.
- **Unclear responsibility**: who “owns” requirements, security decisions, or architecture?
- **Hard-to-reason outputs**: the model may be correct, but the workflow is not.
- **No explicit orchestration**: no guardrails, no sources of truth, no resume/handover discipline.

That’s fine for startup experimentation.

It’s not fine for enterprise delivery, where you are paid for:

- **Control**
- **Predictability**
- **Traceability**

And where “move fast, explain later” is not an acceptable operating model.

---

## My stance: I don’t let AI “write my code”

I let AI operate inside an architecture I control.

AI already delivers real value when it’s used as:

- a **constrained assistant**
- a **specialised worker** with a clear role
- a tool that improves feedback loops, not a replacement for accountability

Instead of a single all-knowing agent, I prefer to split responsibility into multiple “agents” in the broad sense:

- a planning mode
- a code-writing mode
- a docs-maintainer mode
- a security-review mode
- an environment/IaC mode

Think of it like:

- microservices (clear responsibilities)
- pipeline stages (explicit sequencing)
- runbooks (repeatable operations)

The model stays probabilistic. The workflow becomes deterministic.

---

## The repo: a drop-in `.github` AI Workflow Pack

I created a repo-ready `.github/` folder you can drop into any repository to get a structured, maintainers-first way of working with Copilot Chat.

It’s intentionally:

- **technology-agnostic** (on purpose)
- focused on **delivery discipline**, not “AI magic”
- easy to tailor per team, risk profile, environment, and regulation

### What’s inside

At a high level, it contains:

- **Repo-wide Copilot instructions** (`.github/copilot-instructions.md`)
	- Defines sources of truth and non-negotiables (no secrets, minimal diffs, ground claims, tests for behavior changes, security posture, documentation discipline).

- **Source-of-truth docs** (`.github/docs/*`)
	- `requirements.md`: testable requirements + evidence mapping
	- `architecture.md`: boundaries + operational assumptions
	- `state/state.md`: a single resume anchor to avoid relying on chat history

- **Instruction files** (`.github/instructions/*.instructions.md`)
	- Always-on guardrails (security baseline, tests discipline, docs discipline, IaC discipline).

- **Prompt files (slash commands)** (`.github/prompts/*.prompt.md`)
	- `/resume`: rehydrate context from repo state (not chat)
	- `/handover`: write a clean end-of-session state
	- `/security-review`: structured findings + minimal-diff fixes
	- `/refactor`: safe refactor agenda with invariants
	- `/dockercompose`: create/update local dev compose securely
	- `/docu-refresh`, `/readme-refresh`: keep docs aligned with reality

- **Agendas** (`.github/agends/*`)
	- Human-friendly checklists for plan/code/docu/environment work.

Nothing here requires a specific language, framework, cloud, or architecture.
That’s a feature.

---

## How it works in practice (the boring loop that scales)

The workflow is simple:

1) Keep a stable “memory” in the repo
2) Make AI consume that memory
3) Capture outcomes back into that memory

### 1) Enable instruction files in VS Code

In your VS Code settings:

```json
{
	"github.copilot.chat.codeGeneration.useInstructionFiles": true
}
```

Now Copilot reads your guardrails automatically.

### 2) Start sessions with `/resume`

Instead of relying on chat history, you rehydrate from:

- `.github/docs/state/state.md`
- `.github/docs/requirements.md`
- `.github/docs/architecture.md`

That matters in enterprise settings because it reduces “tribal knowledge” and makes work resumable.

### 3) Execute tasks with agendas + specialised prompts

If you need a structured plan: use the Plan agenda.
If you’re implementing: use the Code agenda.
If you’re changing environment/IaC: use the Environment agenda.

Then call the relevant prompt (e.g. `/security-review` on risky changes).

### 4) End sessions with `/handover`

You update `.github/docs/state/state.md` with:

- what is done
- what is next
- open questions/risks
- concrete commands to run next

This is the difference between “AI as chat” and “AI as a delivery workflow”.

---

## Why this matters in regulated and controlled environments

In many client contexts, the blocker is not “can we call a model?”

The hard part is governance.

### AI adoption does not start with models

It starts with:

- **roles** (who owns what?)
- **interfaces** (what are inputs/outputs?)
- **constraints** (what is forbidden?)
- **observability** (how do we audit and improve it?)

When you treat prompts and instructions like configuration, you can build:

- **prompt versioning as configuration**
- **agent instructions as policy**
- **auditable AI behaviour**
- **deterministic workflows around probabilistic components**

That is a much better fit for enterprise delivery than “just vibe it in chat”.

---

## Outlook: why “just call OpenAI” is not enough

Even if you already have an API key, production-grade AI adoption in enterprise environments typically runs into:

- **Network isolation** (egress controls, private networking, data residency)
- **Identity and access** (who can use which model for which workflow?)
- **Logging and monitoring** (auditing AI interactions without leaking sensitive data)
- **Cost control** (per agent, per workflow, per team)

Getting “AI running” is often the easy part.
Managing it — safely and predictably — is the real job.

This repo doesn’t claim to solve your entire platform story.
It’s a pragmatic baseline to help you govern day-to-day developer interaction with AI inside the repo.

---

## Against the hype: what clients actually need

Most clients don’t ask for “AI”.

They ask for:

- faster feedback
- better documentation
- safer changes
- reduced cognitive load

The `.github` workflow pack is my attempt to translate abstract AI potential into delivery improvements that are:

- reviewable
- repeatable
- explainable

No “AI revolution” language. No productivity-multiplier claims without context.
Just a workflow that helps teams build the habit of controlled assistance.

---

## If you want to try it

Repo: https://github.com/hrdominik/vscode-copilot-workflow-template

Drop the `.github/` folder into a repo, enable instruction files, and start using `/resume` and `/handover` as your default loop.

Then optimise it:

- per team
- per risk profile
- per environment
- per regulation

That’s the point: there is no single right way — only the right boundaries for your context.

If you build a variant that fits your organisation better (different prompts, stricter policies, extra agendas), I’d love to see it.

