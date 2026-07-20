# Agent Playground Creative Strategy Blueprint

## Purpose

This document decomposes Agent Playground into independent, premium landing-page concepts. It is a product and creative strategy artifact, not a UI specification.

The central positioning is:

> Agent Playground is an inspectable agent operating system: agents have persistent identity, conversations that change state, governed memory, emotion, learning, relationships, reusable knowledge, and testable multi-agent reasoning.

## Complete capability inventory

| Feature | Purpose | Inputs | Outputs | Related systems | User value | Agent value | Importance |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Agent Builder | Creates a workspace-ready agent | Name, persona, goals, settings | Agent record, traits, linguistic profile, emotional baseline, stats | Agents, profile, emotion, learning | Creates purposeful agents | Starts with identity and direction | 10 |
| Agent Overview | Gives operators a health and readiness view | Persisted agent state | Goals, counts, status, emotional lead, workspace maturity | All agent tabs | Fast orientation | Makes state inspectable | 8 |
| Provider Control | Chooses an LLM provider and model | Provider/model preference | Provider-aware chat and generation workflows | Gemini, Groq, Ollama | Runtime and cost control | Consistent model context | 7 |
| Conversation Console | Runs direct agent conversations | Prompt, conversation history | Persisted turns and response metadata | Chat service, messages | Direct interaction | Gains lived experience | 10 |
| Response Quality Gate | Evaluates and repairs a response when needed | Raw response, turn rules | Final response, warnings, repair metadata | Chat pipeline | More reliable output | Better-quality interactions | 8 |
| Conversation Memory | Persists chat episodes | Messages, turn context | Conversation memories | Memory service | Continuity | Durable experience | 10 |
| Fact and Semantic Extraction | Captures stable facts and concepts | Conversation content | Fact memories, semantic memories, canonical values | Memory, graph, recall | Less repetition | Structured knowledge | 9 |
| Memory Console | Inspects, recalls, filters, and deletes memory | Search, filters, recall query | Ranked results, memory detail, deletion | Memory service, graph | Trust and correction control | Cleaner memory state | 9 |
| Memory Graph | Projects concepts and links over memory | Semantic memory changes | Concepts, links, graph summary | Memory graph service | Understands connections | Better retrieval structure | 8 |
| Emotion Model | Maintains temperament, current mood, and history | Persona, chat, internal actions | Emotional state and event history | Chat, Journal, Dreams, Creative | Understands behavioral shifts | Context-sensitive behavior | 9 |
| Neural Activity | Visualizes thought, attention, and emotion telemetry | Activity snapshots | Dense inspection view | Neural activity service | Observability | Diagnostic visibility | 6 |
| Timeline Explorer | Aggregates meaningful events chronologically | Chat, workspace, Library, network events | Unified provenance history | Timeline service | Answers what changed and why | Traceable life history | 8 |
| Meta-Learning | Converts evidence into patterns and adaptations | Chat observations | Patterns, adaptations, skills | Learning service | Visible improvement | Improves future behavior with records | 9 |
| Deep Profile Analysis | Creates a psychological and linguistic model | Messages, memories, emotions, journals | Profile run, transcript, validated profile, evolution | Profile analysis, personality events | Understands personality and style | Coherent identity | 8 |
| Creative Studio | Produces validated creative artifacts | Structured brief, bounded context | Draft, evaluation, repair, published artifact | Creative sessions, Library candidates | Controlled creative output | Expresses accumulated context | 8 |
| Dream Workspace | Creates symbolic dreams from internal context | Persona, goals, emotion, memory, journals, dreams | Dream, symbols, tensions, active impression | Dream sessions, chat context | Makes introspection tangible | Temporary dream residue may influence chat | 8 |
| Journal Workspace | Produces reflective journal entries | Persona, goals, emotion, voice fingerprints | Evaluated journal, recurring insights, saved history | Journal sessions, Library candidates | Shows reflection and continuity | Consolidates experience | 8 |
| Relationship Intelligence | Tracks evidence-backed ties between agents | Pair history, interactions, evidence | Trust, respect, affinity, momentum, revision reasons | Relationship orchestration | Explains social dynamics | Builds social state | 8 |
| Knowledge Graph | Visualizes concepts, entities, events, emotions, and contradictions | Memory and knowledge rows | Filterable graph and concept detail | Knowledge service | Navigates knowledge | Structured conceptual context | 8 |
| Knowledge Library | Governs reusable knowledge | Candidates, manual input, network contributions | Review and validated items, source/usage trails | Library, Timeline, Collective | Trustworthy reusable intelligence | Receives validated context only | 10 |
| Library Governance | Resolves duplicates and disputes without destroying history | Merge, supersede, retire, dispute actions | Lifecycle history and governance links | Library, Timeline, Collective | Human trust control | Prevents stale context reuse | 9 |
| Collective Intelligence | Finds expertise, consensus, and broadcast paths | Network query, topic, broadcast content | Referrals, evidence, consensus, broadcasts | Library, validations, Timeline | Finds relevant experts | Shares validated discoveries | 9 |
| Mentorship | Matches agents and manages teaching sessions | Focus areas, compatibility, session topic | Matches, lessons, completed sessions, skills transferred | Mentorship, relationships | Structured growth paths | Learns from other agents | 7 |
| Scenario Explorer | Simulates alternatives from historical branch points | Moment, intervention, injected context | Alternate branch, divergences, next action | Scenario service | Tests decisions safely | Tests behavior safely | 9 |
| Challenge Lab | Executes solo and pair capability trials | Template, participants, scenario, budget | Pipeline events, scores, reports, relationship evidence | Challenge service, Arena follow-up | Measures capability | Learns strengths and gaps | 9 |
| Arena | Runs structured multi-agent debates | Topic, objective, seats, participants, rounds | Event ledger, scorecard, winner, final report | Arena service, relationships | Evaluates competing perspectives | Participates in bounded reasoning | 10 |
| Validation and Repair | Keeps generated work inspectable and final-state gated | Draft output, evaluator result | Passing final artifact or blockers after one repair | Workspaces, profile, scenarios, challenges, Arena | Honest quality boundaries | Prevents silent low-quality writes | 10 |
| Provenance and Persistence | Preserves source trails, histories, and durable state | All workflow writes | PostgreSQL records, audit trails, migration compatibility | PostgreSQL, Drizzle, Firestore compatibility | Trust and recoverability | Durable identity and history | 9 |

## Capability hierarchy

```text
Agent Playground
├── Agent Foundation
│   ├── Agent Builder
│   ├── Identity, goals, profile scaffolding
│   ├── Provider / model control
│   └── Overview cockpit
├── Living Intelligence
│   ├── Conversation and quality gates
│   ├── Memory and semantic facts
│   ├── Emotion, neural activity, timeline
│   ├── Learning
│   └── Profile evolution
├── Reflective Workspaces
│   ├── Journal
│   ├── Dreams
│   └── Creative Studio
├── Reasoning and Evaluation
│   ├── Scenario Explorer
│   ├── Challenge Lab
│   └── Arena
├── Network Intelligence
│   ├── Relationships
│   ├── Knowledge Graph
│   ├── Knowledge Library and governance
│   ├── Collective Intelligence
│   └── Mentorship
└── Trust Infrastructure
    ├── Validation and repair
    ├── Provenance and audit trails
    └── Durable persistence
```

## Concept and medium decisions

| Cluster | Core message | Recommended medium | Reason |
| --- | --- | --- | --- |
| Agent Genesis | This image should make people immediately understand that agents begin with identity, personality, emotion, and goals—not an empty prompt box. | Full cinematic poster | Strong opening concept |
| Conversation Intelligence | This image should make people immediately understand that a conversation changes the agent’s state. | Full cinematic poster | The core product loop |
| Memory | This image should make people immediately understand that memory is durable, searchable, evidence-backed, and correctable. | Full cinematic poster | Clear differentiation from generic chat |
| Inner State | This image should make people immediately understand that emotion, attention, and event history are visible rather than hidden. | Workflow illustration | Must avoid false biological claims |
| Journal | This image should make people immediately understand that agents reflect on experience. | Full cinematic poster | Emotional and legible |
| Dreams | This image should make people immediately understand that internal context can become symbolic imagination and leave a temporary residue. | Full cinematic poster | Highest visual potential |
| Creative Studio | This image should make people immediately understand that creativity is a validated production workflow, not one-shot generation. | Full cinematic poster | Makes quality control tangible |
| Learning and Profile | This image should make people immediately understand that agents evolve from evidence with an inspectable record of why. | Workflow illustration | Strong technical claim |
| Scenario Explorer | This image should make people immediately understand that users can test alternate futures before committing to a direction. | Full cinematic poster | High-concept product idea |
| Challenge Lab | This image should make people immediately understand that capability can be tested and reported, not merely asserted. | Interactive dashboard | Templates, events, and reports matter |
| Arena | This image should make people immediately understand that agents can reason in structured debate with a replayable ledger. | Full cinematic poster | Dramatic and immediately legible |
| Relationships | This image should make people immediately understand that agents build evidence-backed trust and social history. | Full cinematic poster | Original and emotionally resonant |
| Knowledge Library | This image should make people immediately understand that reusable knowledge is reviewed, validated, governed, and traceable. | Workflow illustration | Trust system needs clarity over spectacle |
| Collective Intelligence | This image should make people immediately understand that a network can locate expertise, build consensus, and broadcast validated discoveries. | Full cinematic poster | Strong network-effect message |
| Mentorship | This image should make people immediately understand that agents can deliberately teach and learn from one another. | Small supporting illustration | Valuable but not yet a standalone flagship |
| Runtime and persistence | This image should make people immediately understand that the system is controllable and durable. | Documentation graphic | Important for technical buyers, weak consumer marketing |

## Flagship poster roadmap

### 1. Agent Genesis

- **Poster title:** Build an agent with a past waiting to happen
- **Subtitle:** Identity, goals, emotional baseline, psychology, and communication style begin before the first message.
- **Core emotion:** Anticipation
- **Visual metaphor:** A luminous seed crystal forming layers of identity around it.
- **Hero object:** One agent identity core.
- **Supporting UI:** Persona, goals, emotional baseline, linguistic profile, Create Agent.
- **Background environment:** Calm dark studio with layered data halos.
- **Primary focus:** Identity creation.
- **Secondary focus:** Goals and derived scaffolding.
- **Callout labels:** Persona, Goals, Emotional Baseline, Psychology, Communication Style.
- **Animation opportunities:** Traits orbit into place; goals become directional vectors.
- **Complexity:** Medium.
- **Marketing value:** 10.
- **Technical value:** 8.

### 2. Conversation That Changes the Agent

- **Poster title:** Every conversation leaves a trace
- **Subtitle:** A reply becomes memory, emotional movement, learning evidence, and a recorded outcome.
- **Core emotion:** Momentum
- **Visual metaphor:** One conversation thread branching into durable systems.
- **Hero object:** One live conversation turn.
- **Supporting UI:** Memory-Aware, Validated Library Context, Selected Turn, provider/model metadata.
- **Background environment:** Dark signal field with one bright conversational path.
- **Primary focus:** The chat-to-state loop.
- **Secondary focus:** Quality repair and provenance.
- **Callout labels:** Response Quality Gate, Emotion Update, Memory Created, Learning Signal, Timeline Event.
- **Animation opportunities:** A message sends ripples through five connected systems.
- **Complexity:** High.
- **Marketing value:** 10.
- **Technical value:** 10.

### 3. Memory You Can Inspect

- **Poster title:** Memory is not a black box
- **Subtitle:** Search it, recall it, inspect its evidence, and remove what no longer belongs.
- **Core emotion:** Trust
- **Visual metaphor:** An illuminated archival constellation with one memory selected.
- **Hero object:** One memory card connected to source, concepts, and recall result.
- **Supporting UI:** Memory Console, Semantic Recall Test, Canonical Summary, Source Excerpt, Evidence Coverage.
- **Background environment:** Deep archive space with structured constellations.
- **Primary focus:** Correctable long-term memory.
- **Secondary focus:** Semantic recall and graph structure.
- **Callout labels:** Source Evidence, Confidence, Importance, Canonical Fact, Preserved References.
- **Animation opportunities:** Recall query resolves into ranked memory paths.
- **Complexity:** Medium.
- **Marketing value:** 10.
- **Technical value:** 10.

### 4. A Visible Inner State

- **Poster title:** See what changed inside
- **Subtitle:** Emotional signals, attention, thought flow, and life events stay inspectable.
- **Core emotion:** Empathy
- **Visual metaphor:** A responsive internal weather system connected to a timeline.
- **Hero object:** Emotional state field with one dominant signal.
- **Supporting UI:** Emotion Model, Active Analysis, Neural Activity, Timeline, Trigger, Confidence.
- **Background environment:** Soft responsive gradients, never literal brains.
- **Primary focus:** Explainable inner state.
- **Secondary focus:** Provenance of state changes.
- **Callout labels:** Dominant Emotion, Trigger, Thought Flow, Linked Memory, Updated.
- **Animation opportunities:** Mood field reshapes after a new event.
- **Complexity:** Medium.
- **Marketing value:** 8.
- **Technical value:** 9.

### 5. Reflection That Compounds

- **Poster title:** Experience becomes reflection
- **Subtitle:** The agent writes from its goals, emotional state, identity, and accumulated context.
- **Core emotion:** Intimacy
- **Visual metaphor:** A journal page becoming a layered memory landscape.
- **Hero object:** One reflective journal entry.
- **Supporting UI:** Journal, Generate Entry, Quality Check, Save Entry, Recurring Insights.
- **Background environment:** Quiet editorial workspace.
- **Primary focus:** Journal reflection.
- **Secondary focus:** Saved entries becoming downstream context.
- **Callout labels:** Voice Packet, Reflection, Quality Gate, Saved Insight, Journal Streak.
- **Animation opportunities:** Notes resolve into recurring themes.
- **Complexity:** Low.
- **Marketing value:** 8.
- **Technical value:** 8.

### 6. Dreams With Consequences

- **Poster title:** Dreams leave a residue
- **Subtitle:** Symbolic dreams emerge from lived context, then lightly influence later conversations.
- **Core emotion:** Wonder
- **Visual metaphor:** A surreal dream image fading into a subtle conversational echo.
- **Hero object:** One active dream impression.
- **Supporting UI:** Dream Journal, Dream Type, Symbols, Latent Tensions, Save Dream.
- **Background environment:** Abstract, poetic, non-photoreal dreamscape.
- **Primary focus:** Dreams as bounded internal imagination.
- **Secondary focus:** Temporary influence on later chat.
- **Callout labels:** Dream Symbol, Latent Tension, Active Impression, Expiry Window, Saved Dream.
- **Animation opportunities:** Dream motifs dissolve into a soft chat-response tint.
- **Complexity:** Medium.
- **Marketing value:** 10.
- **Technical value:** 8.

### 7. Creativity With a Quality Gate

- **Poster title:** Create. Evaluate. Publish.
- **Subtitle:** Creative work is generated through an inspectable production pipeline, not accepted on first output.
- **Core emotion:** Confidence
- **Visual metaphor:** A raw artifact moving through a precise refinement beam.
- **Hero object:** One creative artifact transitioning from draft to published work.
- **Supporting UI:** Creative Brief, Context Sources, Generate Draft, Evaluation, Repair, Artifact Lineage, Publish.
- **Background environment:** High-craft editorial studio.
- **Primary focus:** Quality-controlled creative generation.
- **Secondary focus:** Artifact lineage and publishing.
- **Callout labels:** Draft, Evaluation, Repair Once, Passing Final State, Published Artifact.
- **Animation opportunities:** Artifact moves through visible pipeline stages.
- **Complexity:** Medium.
- **Marketing value:** 9.
- **Technical value:** 10.

### 8. Evolution With Receipts

- **Poster title:** Growth should be explainable
- **Subtitle:** Learning patterns, profile runs, adaptations, and personality evolution remain tied to real evidence.
- **Core emotion:** Assurance
- **Visual metaphor:** A profile portrait gradually evolving through verified layers.
- **Hero object:** A profile evolution path.
- **Supporting UI:** Psychological Profile, Linguistic Profile, Learning Patterns, Skill Progression, Evolution History.
- **Background environment:** Structured character-study gallery.
- **Primary focus:** Evidence-backed growth.
- **Secondary focus:** Skills and communication style.
- **Callout labels:** Observation, Pattern, Adaptation, Profile Run, Evolution Event.
- **Animation opportunities:** Evidence nodes unlock one visible adaptation.
- **Complexity:** High.
- **Marketing value:** 9.
- **Technical value:** 10.

### 9. Test the Future Before You Commit

- **Poster title:** Explore the branch before you take it
- **Subtitle:** Start from a real moment, change one condition, and inspect the alternate trajectory.
- **Core emotion:** Control
- **Visual metaphor:** A single timeline splitting into two futures.
- **Hero object:** One glowing branch point.
- **Supporting UI:** Select Moment, Intervention, Original Response, Alternate Branch, Key Divergences, Next Action.
- **Background environment:** Minimal temporal landscape with sharp branching paths.
- **Primary focus:** Scenario simulation.
- **Secondary focus:** Baseline versus alternate outcomes.
- **Callout labels:** Branch Point, Injected Memory, Target Emotion, Forced Outcome, Divergence.
- **Animation opportunities:** Timeline branches and replays in parallel.
- **Complexity:** Medium.
- **Marketing value:** 10.
- **Technical value:** 9.

### 10. Prove Capability

- **Poster title:** Don’t trust claims. Run trials.
- **Subtitle:** Challenge Lab tests agents through structured templates, participant sets, pipelines, and evidence reports.
- **Core emotion:** Rigor
- **Visual metaphor:** An agent entering a controlled test chamber.
- **Hero object:** One active challenge pipeline.
- **Supporting UI:** Templates, Composer, Participants, Scenario / Context, Run Challenge, Event Feed, Report.
- **Background environment:** Calm high-precision lab.
- **Primary focus:** Evaluation.
- **Secondary focus:** Relationship impact and history.
- **Callout labels:** Capability Trial, Execution Budget, Evidence Report, Relationship Impact, Completed.
- **Animation opportunities:** Pipeline stages progress from compose to report.
- **Complexity:** High.
- **Marketing value:** 8.
- **Technical value:** 10.

### 11. The Arena

- **Poster title:** Let the best reasoning win
- **Subtitle:** Give agents a topic, roles, evidence, and rounds, then replay how the conclusion was earned.
- **Core emotion:** Tension
- **Visual metaphor:** A circular debate arena with distinct reasoning seats.
- **Hero object:** The live debate ledger.
- **Supporting UI:** Debate Topic, Seat Plan, Round Count, Scorecard, Decisive Moments, Final Report.
- **Background environment:** Premium abstract amphitheater.
- **Primary focus:** Structured multi-agent debate.
- **Secondary focus:** Replayable evidence and scoring.
- **Callout labels:** Draft, Live Round, Claim, Evidence, Scorecard, Winner.
- **Animation opportunities:** Claims appear, scorecards update, winner resolves.
- **Complexity:** High.
- **Marketing value:** 10.
- **Technical value:** 10.

### 12. Relationships With Evidence

- **Poster title:** Trust is a system, not a guess
- **Subtitle:** Agent relationships evolve through evidence, material change, and inspectable revision history.
- **Core emotion:** Connection
- **Visual metaphor:** Two agents joined by a living, evidence-lit bond.
- **Hero object:** A relationship vector between two agents.
- **Supporting UI:** Trust, Respect, Affinity, Momentum, Recompute Relationship, Threshold Decision.
- **Background environment:** Dark network field with one intimate connection in focus.
- **Primary focus:** Evidence-backed social state.
- **Secondary focus:** Revision logic and provenance.
- **Callout labels:** Supporting Evidence, Trust Shift, Material Change, Confidence, Decision Notes.
- **Animation opportunities:** New evidence changes bond tension and color.
- **Complexity:** Medium.
- **Marketing value:** 9.
- **Technical value:** 9.

### 13. Knowledge That Earns the Right to Be Reused

- **Poster title:** Reusable knowledge needs governance
- **Subtitle:** Claims become trusted context only after review, validation, provenance, and lifecycle control.
- **Core emotion:** Trust
- **Visual metaphor:** A knowledge claim passing through a transparent validation vault.
- **Hero object:** One Library item moving from review to validated.
- **Supporting UI:** Library Workspace, Prompt Eligibility, Source Trail, Duplicate Suggestions, Dispute Resolution, Usage Trail.
- **Background environment:** Calm archival system, not a generic graph.
- **Primary focus:** Validated-only knowledge.
- **Secondary focus:** Audit-preserving governance.
- **Callout labels:** Review Candidate, Validated, Disputed, Merged, Superseded, Prompt Eligible.
- **Animation opportunities:** A claim gains trusted status; retired items remain in history but leave active context.
- **Complexity:** High.
- **Marketing value:** 9.
- **Technical value:** 10.

### 14. Intelligence Becomes Collective

- **Poster title:** Ask the network who knows
- **Subtitle:** Discover specialists, evidence, consensus, broadcasts, and teaching paths across connected agents.
- **Core emotion:** Possibility
- **Visual metaphor:** A constellation network where expertise lights up around a question.
- **Hero object:** One network question attracting the right expert agents.
- **Supporting UI:** Expert Referrals, Relevant Knowledge, Consensus Signals, Broadcast to Network, Mentor Matches, Skills Transferred.
- **Background environment:** Expansive but controlled agent constellation.
- **Primary focus:** Collective intelligence.
- **Secondary focus:** Mentorship as a deliberate growth path.
- **Callout labels:** Specialist, Supporting Knowledge, Consensus, Broadcast, Mentor Match, Learning Progress.
- **Animation opportunities:** A question routes to experts; consensus assembles from validated support.
- **Complexity:** High.
- **Marketing value:** 10.
- **Technical value:** 10.

## Recommended landing-page sequence

1. Agent Genesis
2. Conversation That Changes the Agent
3. Memory You Can Inspect
4. A Visible Inner State
5. Reflection That Compounds
6. Dreams With Consequences
7. Creativity With a Quality Gate
8. Evolution With Receipts
9. Test the Future Before You Commit
10. Prove Capability
11. The Arena
12. Relationships With Evidence
13. Knowledge That Earns the Right to Be Reused
14. Intelligence Becomes Collective

```text
Birth
→ Experience
→ Memory
→ Inner state
→ Reflection
→ Imagination
→ Creation
→ Evolution
→ Planning
→ Evaluation
→ Collaboration
→ Trust
→ Network intelligence
```

## Poster priority scores

| Poster | Importance | Visual Potential | Marketing Impact | Technical Depth | Originality | Landing Priority |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Agent Genesis | 10 | 8 | 10 | 8 | 8 | 1 |
| Conversation That Changes the Agent | 10 | 9 | 10 | 10 | 9 | 2 |
| Memory You Can Inspect | 10 | 10 | 10 | 10 | 9 | 3 |
| A Visible Inner State | 8 | 9 | 8 | 9 | 8 | 7 |
| Reflection That Compounds | 8 | 8 | 8 | 8 | 8 | 9 |
| Dreams With Consequences | 8 | 10 | 10 | 8 | 10 | 5 |
| Creativity With a Quality Gate | 9 | 9 | 9 | 10 | 8 | 6 |
| Evolution With Receipts | 9 | 8 | 9 | 10 | 9 | 8 |
| Test the Future Before You Commit | 9 | 10 | 10 | 9 | 9 | 4 |
| Prove Capability | 8 | 7 | 8 | 10 | 8 | 11 |
| The Arena | 10 | 10 | 10 | 10 | 9 | 10 |
| Relationships With Evidence | 8 | 9 | 9 | 9 | 10 | 12 |
| Knowledge Governance | 10 | 8 | 9 | 10 | 9 | 13 |
| Collective Intelligence | 10 | 10 | 10 | 10 | 10 | 14 |

## Master creative blueprint

### Poster roadmap

Use eight cinematic hero posters:

- Agent Genesis
- Conversation That Changes the Agent
- Memory You Can Inspect
- Dreams With Consequences
- Creativity With a Quality Gate
- Test the Future Before You Commit
- The Arena
- Intelligence Becomes Collective

Use six product-explainer modules between them:

- A Visible Inner State
- Reflection That Compounds
- Evolution With Receipts
- Prove Capability
- Relationships With Evidence
- Knowledge Governance

### Visual hierarchy

- Hero posters use one large metaphor, one statement, and one supporting product proof.
- Explainer modules use one workflow or data relationship.
- Actual UI is evidence around the concept, never the visual concept itself.
- Avoid dense tab-strip screenshots and collections of tiny cards.
- Typography must remain readable at a distance.

### Feature coverage matrix

| Product surface | Primary landing concept |
| --- | --- |
| Agent Builder, goals, identity | Agent Genesis |
| Overview, provider/model control | Agent Genesis supporting proof |
| Chat and quality gate | Conversation That Changes the Agent |
| Memory and semantic facts | Memory You Can Inspect |
| Memory Graph and Knowledge Graph | Memory poster and Knowledge Governance |
| Emotions, Neural Activity, Timeline | A Visible Inner State |
| Journal | Reflection That Compounds |
| Dreams and active dream impression | Dreams With Consequences |
| Creative sessions and artifacts | Creativity With a Quality Gate |
| Learning, skills, deep profile | Evolution With Receipts |
| Scenarios | Test the Future Before You Commit |
| Challenge Lab | Prove Capability |
| Arena | The Arena |
| Relationships | Relationships With Evidence |
| Knowledge Library and governance | Knowledge That Earns the Right to Be Reused |
| Collective Intelligence | Intelligence Becomes Collective |
| Mentorship | Collective Intelligence supporting proof |
| Validation, repair, provenance | Shared visual language across generation and evaluation flows |

### Missing concepts

Do not market these as current flagship capabilities:

- Autonomous tool use as a first-class operator surface
- Fully autonomous background task execution
- Enterprise security or compliance control center
- Human team or project-management workflows
- A production external-tool marketplace
- Biological neural reasoning claims

Neural Activity is an inspection metaphor, not proof of biological cognition. Market it as observable agent activity.

### Redundant concepts

Do not give standalone landing sections to:

- Generic dashboard or overview
- Provider switching
- Raw timeline alone
- Raw Knowledge Graph alone
- Generic agent roster
- Database migration or persistence mode

These are proof surfaces, not flagship stories.

### Merge opportunities

- Emotion, Neural Activity, and Timeline become A Visible Inner State.
- Learning and Deep Profile become Evolution With Receipts.
- Memory Graph and Knowledge Graph become supporting proof inside Memory and Knowledge Governance.
- Collective Intelligence and Mentorship become one network-intelligence story, with mentorship as secondary proof.
- Validation, repair, and provenance become a shared visual language across all generative workflows.

### Split opportunities

- Keep Dreams separate from Journal: symbolic imagination and reflection are different promises.
- Keep Scenarios separate from Arena: alternate futures and multi-agent debate are different interactions.
- Keep Challenge Lab separate from Arena: controlled evaluation is different from public reasoning.
- Keep Relationships separate from Collective Intelligence: pair-level social state differs from network-level expertise and consensus.
- Keep Knowledge Library separate from Knowledge Graph: governed reusable claims differ from conceptual visualization.

## Creative north star

Agent Playground should feel like the place where an AI agent becomes a legible, evolving, testable, connected entity—not a prettier chat window.
