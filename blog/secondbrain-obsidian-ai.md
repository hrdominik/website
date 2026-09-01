# Building a Sovereign Second Brain: Local AI, Pure Markdown, and Zero Over-Engineering

As a consultant, knowledge management, task tracking, and meeting processing are not side activities: they are core operational work. Every day brings architectural decisions, client requirements, action items, and fragmented ideas captured on whiteboards, scratchpads, or while walking the dog.

Yet I constantly see top-tier technical experts stumble not because of technical complexity, but because they trip over their own organizational overhead. They spend hours configuring productivity tools or miss opportunities instead of delivering value.

Every six months, a new productivity stack promises to solve this - from pure M365 setups and paid SaaS apps to complex ToDo suites. In enterprise environments, most of them fail for the exact same reasons: **they build up maintenance debt faster than they create value**, and they break data privacy. (You cannot simply hook a corporate Outlook account or client data into a third-party AI SaaS).

Good self-management follows a predictable hype cycle: you start with simple notes, escalate into a fragile maze of SaaS apps, webhooks, and plugins that break on the next update, only to retreat back to plain text once the software maintenance becomes a second job.

> [!TIP] What a "Second Brain" Actually Is
> Stripped of marketing fluff, a Second Brain is simply a reliable, local system to capture thoughts, track tasks, and log decisions so your head stays free for engineering. **AI is not the core focus or the hype here — it is a quiet side benefit.** My entire system is built on plain Markdown and works 100% reliably even if local AI is turned off.

Here is how I built a sovereign, lightweight note and task organization system in Obsidian, with local AI on Apple Silicon as a quiet, private assistant.

## The Obsidian Core: Lean Setup & The Tasks Plugin

A key lesson from building this setup is **restraint**. Too many Obsidian plugins create maintenance overhead and break when the app updates. My vault relies on a minimal core, centered around one crucial plugin. Working with plain markdown.

### The Cornerstone: Obsidian Tasks
Rather than maintaining separate task apps or complex database properties, my entire task management runs through the **Obsidian Tasks** plugin:

- **Inline Task Definition**: Tasks are written anywhere in the vault inside any meeting note, project file, or daily entry using standard Markdown checkboxes:
  ```markdown
  - [ ] Review Landing Zone Terraform modules 📅 2026-09-10 #project/azure
  ```
- **Central Aggregation**: The Tasks plugin dynamically queries, filters, and displays open action items across all notes into central project dashboards or daily views.

It just works.

## The Architectural Stance: Sovereignty Over Autonomy

The internet is currently obsessed with "AI autonomy": letting an LLM rewrite your knowledge graph, crawl your inbox, and organize your life while you watch. 

In real delivery work, autonomy without guardrails is just unpredictable drift.

My hardware baseline is an **Apple Silicon M4 Pro Mac with 24 GB of Unified Memory**. That is plenty of horsepower to run fast local models, provided you don’t waste memory on unnecessary background daemons and continuous embedding indexing.

### Why No Vector DB or QMD?
The standard modern AI blueprint insists that every local setup requires a Vector Database, an embedding pipeline, and a semantic index layer. For a personal vault of Markdown notes, I consider that an anti-pattern:

- It introduces **data duplication**.
- It creates **index drift** (notes change, vector index gets out of sync).
- It adds unnecessary memory overhead and background processing.

Instead, my agent framework (Hermes) searches plain Markdown files directly using native file system and grep tools. It is **100% stateless**, fast, deterministic, and requires zero index synchronization.

### Local-First, Cloud by Exception
- **Local Execution**: Ollama runs natively on macOS to leverage Metal, MLX, and Apple's Unified Memory directly. Primary model: `gemma4:12b-mlx` and a customized `secondbrain` model with a ~64k context window.
- **Cloud Research**: Other external AI remains a deliberate tool for complex research. Results are output as "ready-to-copy Markdown" and pasted into `_inbox/research/`.
- **Zero Egress**: Cloud fallback in Hermes is explicitly disabled. Local automations run 100% offline.

## Governance & Sandboxing: Hardening the Agent

An AI agent working on your local filesystem needs strict boundaries. I don’t want an autonomous script rewriting my manually curated architecture notes or scanning my SSH keys.

### 1. Directing Hermes via `.hermes.md`
The operating rules live in `.hermes.md` inside `SecondBrainRuntime`. Crucially, **this file contains rules and structural knowledge, not content**. Hermes is instructed on search order, task extraction rules, and meeting minute formats, but fetches actual knowledge dynamically from the vault on demand.

### 2. Concrete Docker Sandbox Configuration
Hermes runs natively on macOS for full system integration, but executing tools run inside isolated Docker containers. Here is how the sandbox mounting is configured:

```yaml
# config.yaml (Hermes Docker Sandbox Backend)
terminal:
  backend: docker
  docker_network: false  # Zero internet egress for tool execution
  mounts:
    - /path/to/SecondBrainRuntime:/runtime:rw
    - /path/to/vault:/vault:rw
    - /path/to/vault/.obsidian:/vault/.obsidian:ro     # Read-only configuration
    - /path/to/vault/z_templates:/vault/z_templates:ro # Read-only templates
```

- **Sandbox Network**: `docker_network: false` prevents any tool from reaching the internet.
- **Strict Mounts**: Only the runtime and vault folders are mounted. Access to `$HOME`, `~/.ssh`, `~/.aws`, browser profiles, or the Docker socket is blocked.

### 3. Scoped Mutability via `_ai_context.md`
To prevent the AI from overwriting human-written project notes, each project folder can contain an optional `_ai_context.md` file. Hermes has explicit permission to update this single file automatically to track status and key decisions. Main project notes remain human-owned.

## Audio Capture: Meetings & Mobile Voice Memos

Capturing thoughts on the move or transcribing long technical meetings should not require complex virtual audio routing.

- [ Desktop Meeting ] ─> audio-recorder ─> whisper.cpp ─> _inbox/meetings/
- [ Mobile Voice (.m4a) ] ─> OneDrive Sync ─> launchd Job ─> _inbox/voice/

### 1. Desktop Meeting Capture (System + Mic Split)
Instead of complex setups with OBS or BlackHole loopback drivers, I use a lightweight native tool ([audio-recorder by JoanClaverol](https://github.com/JoanClaverol/audio-recorder)) compiled for macOS.

- **Dual-Channel Recording**: Captures system audio (others) and microphone input (me) on separate tracks.
- **Trigger**: Run via a simple terminal command `meeting-record`, which prompts for meeting title and project context.
- **Local STT**: Transcribed locally using `whisper.cpp` with the `ggml-large-v3-turbo-q8_0` model (~874 MB).
- **Metal Fix**: On Apple Silicon M4, `GGML_METAL_NO_RESIDENCY=1` is set to avoid residency-set assertions in GGML.
- **Output**: Raw audio files are saved outside the vault in `$SB/recordings/meetings`, while the text transcript is dropped into `_inbox/meeting_transcripts`.

### 2. Mobile Voice Memo Capture (iPhone to Mac)
When walking or commuting, opening a note app to type is inefficient.

1. Record a voice memo (`.m4a`) on iPhone.
2. OneDrive / Obsidian sync automatically drops the `.m4a` file into `$VAULT/_inbox/voice-audio`.
3. A native macOS `launchd` service (`com.secondbrain.voice.plist`) watches that folder.
4. The background script transcribes the audio using local Whisper, generates a `.md` transcript in `_inbox/voice-audio`, and **moves the heavy `.m4a` file out of the synced vault** into a local archive (`$SB/recordings/voice`).

## Deterministic Automation: Waking the LLM Only When Needed

Running an LLM polling loop every 60 seconds wastes power and generates continuous background load. Instead, I use a **deterministic Python pre-check gate** that just checks for new files.

### The State Machine Workflow
1. **Pre-Check**: Hermes Gateway executes `secondbrain-inbox-check.py` every 2 minutes.
   - **If `wakeAgent: false`**: The process exits in milliseconds. Ollama and the LLM agent are never loaded into GPU memory.
   - **If `wakeAgent: true`**: Hermes triggers the `process-secondbrain-inbox` skill.
2. **Execution**:
   - Reads new transcripts from `_inbox`.
   - Structures notes into standard meeting minutes using vault templates.
   - Extracts action items into inline tasks (`- [ ] ...`) or dedicated task files.
   - Updates project `_ai_context.md`.
   - Moves processed transcripts to `_raw/transcripts/` (**Inbox as a State Machine**).

## Dedicated Hermes Skills & Daily Integration

Rather than asking a general-purpose chat agent to "do stuff", I created specialized, single-responsibility Hermes skills:

- `brain-search` *(Read-only)*: Scans the vault for specific facts, decisions, or historical project context without mutating files.
- `capture-note`: Takes raw ideas from chat and persists them into structured Markdown.
- `project-brief` *(Read-only)*: Merges project context, recent meeting minutes, open tasks, and research into a consolidated status briefing.
- `process-secondbrain-inbox`: Automated background pipeline for inbox processing and task extraction.
- `refine-meeting-minute` *(Explicit Trigger)*: Takes a manually typed raw meeting file and cleans it up using Obsidian template structures.
- `daily-summary`: Generates a daily AI digest at `daily/YYYY-MM-DD.md` linking key notes via Wikilinks without overwriting manual entries (integrates seamlessly with the native **Obsidian Daily Notes** plugin).

## Comparison: Vibe AI vs. Sovereign Markdown Architecture

| Dimension | Vibe AI / SaaS Stack | Sovereign Markdown Architecture |
|---|---|---|
| **Data Location** | Cloud SaaS DBs & Vendor Lock-in | Local Plain Markdown (`.md`) |
| **Task Engine** | Proprietary SaaS ToDo apps | Native Inline Markdown & Obsidian Tasks Plugin |
| **Search Engine** | Complex Vector DB / Stale Embeddings | Direct Stateless File & Grep Search via Agent Tools |
| **LLM Execution** | Cloud API (per-token costs & data leakage) | Native Local Ollama (Gemma 4 / MLX on Apple Silicon) |
| **Background Load** | Heavy continuous polling / vector syncing | Deterministic Python Pre-Check Gate (`wakeAgent`) |
| **Security Surface** | Full filesystem access / Cloud webhooks | Docker Container Sandbox (`docker_network: false`) |
| **Portability** | High dependency on third-party tools | 100% Tool-Agnostic (Files outlive the tools) |

## Engineering Takeaways

Building a Second Brain is an exercise in restraint.

> [!TIP] Core Engineering Rule
> **First define your workflow, purpose, and goals. Only then choose your tools — and let the AI hype come last.**

It is easy to get caught up in the hype of local vector databases, autonomous multi-agent swarms, and intricate cloud automations. But in daily consulting reality, **reliability, simplicity, and low friction win every time**.

1. **Plain Markdown is the ultimate abstraction layer**: It outlives apps, plugins, vector stores, and AI models.
2. **Lean Obsidian setup**: Stick to core Markdown and essential plugins like **Obsidian Tasks**.
3. **Deterministic gates save resources**: Don't wake up an LLM just to check if an empty directory is still empty.
4. **Isolate your AI's write surface**: Restrict automated AI updates to dedicated context files (`_ai_context.md`), and protect core templates with read-only mounts.

A Second Brain should lighten your cognitive load, not give you a second infrastructure stack to maintain on weekends.