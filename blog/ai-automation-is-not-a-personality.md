# AI Is Not the Workflow: Choose the Right Level of Engineering

AI is accessible to almost everyone now. That is genuinely great.

You do not need a research department, a large budget, or a computer science degree to try a language model. People can prototype ideas, analyze information, write text, create images, and build small tools in an afternoon. I like that. I like seeing more people gain access to capabilities that used to be reserved for specialists.

But accessibility has created a second kind of hype: the assumption that everything now needs an AI use case.

Organizations invest in AI and then search for problems to justify the investment. Teams build agents because agents are available. Developers add elaborate context, skills, and orchestration before they have used the simple version enough to know whether it works.

My key message is simple:

> [!TIP] Core Engineering Rule
> **Define the problem, workflow, and required quality first. Then choose whether AI should be a tool, a runtime, or an orchestration layer. Let the AI hype come last.**

That decision sounds straightforward, but it changes everything: how much context you need, how much autonomy is appropriate, whether a model should be involved at runtime, and who has to maintain the result.

## Three different ways to use AI

I think many AI discussions become confused because they treat very different activities as one thing. “Using AI” can mean a quick coding suggestion, a complete greenfield prototype, or a governed delivery workflow. These are not interchangeable.

### 1. AI as a tool: plug it in and keep moving

For a small, well-understood code change, AI should often just be a tool.

Ask it to explain an unfamiliar function, suggest a test, refactor a repetitive block, find a likely cause of an error, or draft a small change. Review the result, run the checks, and continue working.

This is where a normal coding assistant is excellent. It is close to the code, available when needed, and does not require a new operating model. The context can stay small because the task is small.

The new agent-council behaviour that many tools offer is impressive. Several agents can plan, implement, validate, and review a change with useful guardrails around the process. That is valuable when the task benefits from multiple perspectives.

But for changing one validation message or adding a missing test, an agent council is overkill. The ceremony costs more than the change. You have introduced planning overhead, extra model calls, more context, and another layer of output to review for a task that could have been completed directly.

The first engineering question should therefore be: **Do I want orchestration, or do I just need assistance?**

### 2. AI for vibecoding: explore a greenfield idea

Vibecoding is a different situation. You have an idea, an empty repository, and a desire to discover what the product could become. You describe the goal, react to what appears, and let the model create a working first version.

I like this mode. It is a powerful way to build a personal app, a helper for an individual workflow, or a prototype that would otherwise never exist. Sometimes a small application built for yourself is more useful than buying another SaaS product. AI lowers the barrier between “I wish I had a tool for that” and “I now have a tool for that.”

In a greenfield project, an agent council can be useful. Planning, implementation, validation, and review provide structure when there is no existing architecture. Guardrails can prevent obvious mistakes, and multiple perspectives can improve the first result.

But vibecoding still involves a trade-off. If you do not understand or care about the code, you are choosing speed and discovery over long-term maintainability. That can be completely reasonable for a personal tool. It becomes a very different decision when other people depend on the system, when data is sensitive, or when the application has to run reliably for years.

The mistake is not vibecoding. The mistake is forgetting which quality bar you chose.

### 3. AI orchestration: build a repeatable delivery process

Orchestration is appropriate when AI is part of a recurring software delivery process and the process itself needs to be explainable.

Here, agents may have distinct responsibilities: planning, implementation, code review, testing, documentation, or security analysis. Repository instructions define the architecture and constraints. Hooks and CI perform deterministic checks. Tracking documents preserve requirements, decisions, and current status.

This is the approach behind my [repo-ready Copilot and Claude workflow pack](./blog-post.html?slug=ai-workflow-pack-orchestrating-copilot). The point is not to create the most autonomous agent. The point is to give AI a controlled place inside a delivery system that humans still own.

Orchestration has real benefits for complex work, regulated environments, and teams that need consistent handovers. It also has a cost. Agents, skills, context files, hooks, prompts, and decisions become another system to maintain.

Before building that system, ask whether the workflow happens often enough and matters enough to justify it. Otherwise, you may be creating an AI maintenance project instead of solving the original problem.

## When a prompt becomes a badly documented program

The same distinction applies to business automation.

I sometimes see a workflow described in more and more detail until the prompt is almost a complete program specification. The agent should open an internal application, find a particular record, click through a sequence of screens, recognize a status, handle an exception, and produce a precisely formatted result.

The more edge cases appear, the more context and instructions are added. A browser automation tool such as [Playwright](https://playwright.dev/) is introduced, often as if it were invented for AI, even though it has existed for years as a normal tool for deterministic browser testing and automation.

At some point, the question should change from “How do we make the AI understand this?” to “Why is an AI model in this loop at all?”

If the inputs are structured, the decisions are rule-based, and the output has to be exact, ordinary software is usually the better implementation. Write a script, service, test, or integration that performs the steps directly. It will be cheaper to run, faster to execute, easier to test, and simpler to maintain.

AI can still help write that software. It can explain an unfamiliar API, generate test cases, or help diagnose a failing selector. But the production workflow does not need to remain probabilistic just because AI helped create it.

**Using AI to build deterministic software is not the same as using AI as the runtime for a deterministic task.**

## The hidden cost of making everything “smart”

An AI-driven automation has costs beyond the model bill. It consumes tokens, time, and attention. It needs context, instructions, examples, guardrails, retries, and error handling for behaviour that a normal program might never make unpredictable in the first place.

Then comes the maintenance:

- The underlying application changes.
- The model changes.
- The prompt becomes stale.
- A skill or agent gets updated but nobody remembers why.
- A workaround for one edge case creates a new failure somewhere else.
- The output slowly drifts away from what the consumer expects.

The most uncomfortable part is that the automation can look successful while quietly doing the wrong thing. It may guess a missing value, select the wrong element, interpret an ambiguous status, or produce an answer that sounds plausible but is not correct.

Sometimes a team spends more time optimizing an automation before it has even used the simple version enough to prove that it is valuable. It reinvents a reliable wheel, wraps it in an agent, and inherits a new system that must be maintained. The next time somebody touches it, the original focus is gone and the agent starts hallucinating around the edges.

That is not leverage. That is maintenance debt with a model attached.

## “Yes, absolutely” is not a critical review

AI can understand a problem, follow the reasoning, and still agree with the conclusion far too quickly.

Ask, “Is my idea good?” and the first response may be: “Yes, absolutely.” The answer can sound thoughtful and still be almost useless. Understanding an idea is not the same as validating it.

An AI can restate the benefits while missing the inconvenient questions: Is the problem important enough? Is the proposed solution unnecessarily complex? What is the opportunity cost? What could fail in production? Who will maintain it?

I do not treat agreement as evidence. I ask for counterarguments, failure modes, simpler alternatives, and explicit assumptions. I want the model to challenge the proposal, not just make it sound more convincing.

Good guardrails help with this, but guardrails are a topic of their own. The immediate engineering habit is simpler: remain skeptical, define what a useful answer must contain, and verify important claims outside the conversation. An AI assistant can help you think, but it is not automatically a devil’s advocate, an architect, or an approval board.

## The showcase trap: beautiful is not the same as useful

The same pattern is visible on social media. Some of the most popular AI skills and prompts are advertised with beautiful interfaces: polished landing pages, dramatic gradients, smooth transitions, animated dashboards, and an impressive first impression.

I enjoy good design. But after the first screenshot, I want to ask more uncomfortable questions: Who is the customer? What problem does the interface solve? What is the call to action? What information does somebody actually need? Does the animation improve comprehension, or is it only there to make the demo look expensive?

A beautiful website can still have questionable UX—and even more questionable value. The content may be vague, the navigation confusing, and the product without a meaningful reason to exist beyond being a good social media post.

This is not new. A few years ago, the equivalent was the Figma showcase: beautiful animations and elaborate prototypes that looked fantastic in a presentation. Then somebody had to ask who would implement them, who would maintain them, and who would use them every day.

Personally, I hate waiting for an animation when the page has already finished loading. A transition can make an interface feel considered when it communicates state or preserves context. It becomes friction when it delays an action that is already available.

The production questions are less glamorous than the screenshot:

- Can a real user understand what to do next?
- Does the interface make important information easier to find?
- Is it accessible, responsive, and fast on the devices that matter?
- Can the team implement it without turning every screen into a custom exception?
- Can somebody maintain the design system, content, and behaviour after the original author moves on?
- Does the result create enough value to justify its complexity?

AI makes it easier to produce convincing surfaces. That increases the responsibility to validate the problem underneath them. A polished interface for the wrong workflow is still the wrong product.

## How I decide what belongs where

My rule is not “never use AI” or “always write traditional software.” It is to match the implementation to the character of the work.

| Situation | Best starting point | Why |
|---|---|---|
| Small, well-understood code change | AI as a tool | Low ceremony, small context, quick review |
| Personal app or greenfield prototype | Vibecoding | Fast exploration and workflow-specific results |
| Complex recurring delivery process | AI orchestration | Repeatability, handover, validation, and governance |
| Exact, rule-based business automation | Ordinary software, possibly AI-assisted during development | Deterministic runtime, lower cost, easier testing |
| Unstructured input or ambiguous language | AI at the boundary, deterministic code afterward | Use the model where interpretation is actually needed |

This is also why I recommend [trying GitHub Copilot](./blog-post.html?slug=ai-workflow-pack-orchestrating-copilot) for software engineers. Copilot can remain a lightweight tool for everyday changes, while also giving you access to multiple models and a more orchestrated workflow when the task justifies it. You can work inside VS Code, choose a model appropriate to the task, review changes granularly, and keep your source control, terminal, tests, and review loop in the environment you already know.

That flexibility matters. You do not have to turn every task into an agent workflow, and you do not need a separate AI-native IDE or a collection of CLIs to get useful assistance. Use the simplest mode that fits the work. Escalate to orchestration when the complexity, risk, or repetition makes the extra structure worthwhile.

## The engineer still owns the outcome

There are two worlds hiding behind the phrase “AI development.” In one, a vibecoder knows the product and works with Claude Code or another assistant through chat or the CLI. They may not care deeply about the code, its quality, or its long-term maintainability. For a personal app, that can be a valid trade-off.

In the other, software developers work on the code with AI. They care about interfaces, tests, security, operations, deployment, observability, performance, and the next person who has to change the system. Their responsibility does not end when generated code looks convincing in a demo. Launching and running the product is where many serious questions begin.

Neither world needs to eliminate the other. They have different quality bars and different consequences when something goes wrong. The software developer will not be replaced by someone who can generate a prototype, because the difficult work is not only producing code. It is understanding the problem, choosing boundaries, managing trade-offs, and keeping a system healthy after launch.

I like AI. I like vibecoding. I use AI often—very often. But I do not want to maintain an AI system merely because I could build one.

Use AI as a tool when a tool is enough. Vibe code when exploration is the goal. Orchestrate when a recurring and complex workflow genuinely needs structure. Write ordinary software when the task is deterministic.

Define the workflow, purpose, and goals first. Choose the tool second. Let the AI hype come last.
