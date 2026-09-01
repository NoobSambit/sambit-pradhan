export type CareerMilestone = {
  id: string;
  ref: string;
  period: string;
  title: string;
  detailTitle?: string;
  subtitle: string;
  state?: "head";
  metadata: ReadonlyArray<readonly [string, string]>;
  whyItMattered: string;
  changes: readonly string[];
  evidence: readonly string[];
  commit: { type: string; title: string; lines: readonly string[] };
  storyId?: string;
};

export type BuildStorySection = {
  title: string;
  kind?: "list" | "text" | "metadata" | "timeline";
  content: readonly string[] | ReadonlyArray<readonly [string, string]>;
};

export type BuildStory = {
  id: string;
  milestoneId: string;
  title: string;
  subtitle: string;
  descriptor: string;
  tags: readonly string[];
  links?: { live?: string; repo?: string };
  sections: readonly BuildStorySection[];
  closingCommit: CareerMilestone["commit"];
};

export const careerMilestones: readonly CareerMilestone[] = [
  {
    id: "going-deeper",
    ref: "HEAD",
    period: "2026 / now",
    title: "Going Deeper",
    subtitle: "AgentProof, Agent Playground, system design",
    state: "head",
    metadata: [
      ["Stage", "2026 Graduate"], ["Primary", "Backend"], ["Secondary", "Full Stack"],
      ["Current Build", "AgentProof"], ["Also Building", "Agent Playground · Sambit OS"],
      ["Current Learning", "System Design · CLI / Verification"], ["Status", "Open to Work"],
      ["Environment", "Startup / Product Team"], ["Priority", "Strong Team + Learning"],
      ["Direction", "Backend-heavy Product Engineering"], ["Location", "Kolkata, India"],
    ],
    whyItMattered: "2026 is where my question started changing from ‘can I build this?’ to ‘do I understand the system well enough to trust the decisions behind it?’ I’m still shipping products; I’m just spending more time on the parts that stay invisible in a screenshot.",
    changes: [
      "Started building AgentProof and working deeper in CLI-driven software",
      "Agent Playground pushed project complexity considerably further",
      "Started learning System Design deliberately",
      "Research, PRDs and architecture decisions became more serious",
      "AI-assisted development became normal; decisions still stay owned",
      "UI/UX kept receiving attention despite backend being the stronger side",
    ],
    evidence: ["ArmyVerse → 1.1k users", "FanGate → 500+ participants in ~1 day", "ARMYBATTLES → community product + audience growth", "AgentProof → active current build", "Agent Playground → active current build"],
    commit: { type: "feat", title: "go deeper into engineering", lines: ["build larger projects instead of collecting more projects", "understand the system underneath the feature", "use AI for implementation speed without outsourcing decisions", "keep researching, building, testing and rewriting", "prepare for the first engineering team"] },
  },
  {
    id: "armyverse", ref: "story/armyverse", period: "early 2026", title: "ArmyVerse crosses 1.1k users", detailTitle: "ArmyVerse", subtitle: "first 1k+ user platform",
    metadata: [["Project", "ArmyVerse"], ["Focus", "Real users + iteration"], ["Signal", "1.1k users"], ["Distribution", "BTS community · Twitter/X"]],
    whyItMattered: "ArmyVerse was the first project where launch stopped feeling like the finish line. Once more than a thousand people had access to it, every assumption about UI, auth, rewards and reliability became testable.",
    changes: ["Real-user behavior started shaping UI decisions", "Launch became the beginning of maintenance", "Feedback changed product flows", "Free-tier/platform constraints became product constraints", "Debugging shifted from ‘my test case passes’ to ‘a stranger is stuck’"],
    evidence: ["1.1k users", "Audience built through earlier BTS projects", "Continuous fixes during the first days after launch", "Real user feedback fed product changes"],
    commit: { type: "fix", title: "keep listening after launch", lines: ["guided tours for flows that were not obvious", "auth, leaderboard and streak issues fixed in public", "first few days: fix → test → ship"] }, storyId: "armyverse",
  },
  {
    id: "armybattles", ref: "story/armybattles", period: "late 2025", title: "ARMYBATTLES", subtitle: "community product gets deeper",
    metadata: [["Project", "ARMYBATTLES"], ["Shape", "Battles · teams · rules"], ["Verification", "Last.fm listening"], ["Outcome", "Audience carried forward"]],
    whyItMattered: "FanGate proved that people would show up. ARMYBATTLES forced me to think about what happens after they do.",
    changes: ["Built stateful battle lifecycles instead of a one-time result", "Added listening verification and leaderboards", "Handled solo and team participation", "Scheduled checks had to keep product rules current", "Host controls and moderation entered the build"],
    evidence: ["Battle, team, score and verification models in the project", "Last.fm and Spotify helpers support the listening flow", "Scheduled verification scripts and host controls are present", "Helped grow the community for later releases"],
    commit: { type: "feat", title: "make the community loop stateful", lines: ["battles need rules after the first click", "verify listening, score teams, update leaderboards", "leave room for hosts to run the thing"] }, storyId: "armybattles",
  },
  {
    id: "fangate", ref: "story/fangate", period: "late 2025", title: "FanGate finds its audience", detailTitle: "FanGate", subtitle: "500+ participants in ~1 day",
    metadata: [["Project", "FanGate"], ["Flow", "Last.fm → quiz → scorecard"], ["Launch", "Twitter/X + BTS community"], ["Signal", "500+ participants in ~1 day"]],
    whyItMattered: "FanGate was small on purpose. It was the first time I put something simple in front of a community I already understood and watched strangers actually show up.",
    changes: ["Built around a community I was already part of", "Removed unnecessary signup friction", "Learned that scope and distribution matter as much as project size", "Started building an audience around things I was shipping"],
    evidence: ["500+ participants in roughly one day", "Twitter/X became the launch channel", "The audience carried into later BTS projects"],
    commit: { type: "feat", title: "ship something small enough to spread", lines: ["Last.fm username in", "listening score + BTS quiz", "shareable result out", "no account wall", "real people showed up"] }, storyId: "fangate",
  },
  {
    id: "kirana-corner", ref: "story/kirana-corner", period: "2025", title: "Kirana Corner", subtitle: "first finished original product",
    metadata: [["Project", "Kirana Corner"], ["Model", "Nearby shops as fulfilment"], ["Users", "Customer + shop owner"], ["Outcome", "First finished original product"]],
    whyItMattered: "Before this, most of my learning still followed somebody else’s blueprint. Kirana Corner was the first finished product where I had to decide what should exist before deciding how to code it.",
    changes: ["Started from a product question rather than a tutorial", "Had to think about both shop-owner and customer workflows", "Research started becoming part of the build process", "Product decisions became more interesting than copying implementation"],
    evidence: ["First finished original product", "End-to-end product ownership", "The point where tutorial projects stopped being the goal"],
    commit: { type: "feat", title: "start from a product question", lines: ["discover nearby shops and products", "let local stores own inventory and fulfilment", "build both sides of the workflow"] }, storyId: "kirana-corner",
  },
  {
    id: "learning-rebuilding", ref: "learning/rebuild", period: "2024", title: "Learning by Rebuilding", subtitle: "full-stack by doing, not just watching",
    metadata: [["Mode", "Rebuilding"], ["Focus", "Full-stack practice"], ["Takeaway", "Learning needs somewhere to go"]],
    whyItMattered: "Rebuilding made the gaps visible. It turned tutorials from something to finish into something to pull apart and question.",
    changes: ["Moved from watching to making variations", "Learned the full request-to-UI path by repetition", "Started noticing where copied decisions did not fit"], evidence: ["Full-stack through rebuilding became a completed learning phase", "Original product planning followed"],
    commit: { type: "learn", title: "rebuild it until the gaps show", lines: ["make the idea work end to end", "notice what the tutorial never had to explain"] },
  },
  {
    id: "mern", ref: "learning/mern", period: "2023", title: "Started MERN Seriously", subtitle: "committed to building web products",
    metadata: [["Focus", "MERN foundations"], ["Mode", "Web products"], ["State", "Historical learning phase"]],
    whyItMattered: "This was the point where web development stopped being an occasional interest and became something I wanted to keep building with.",
    changes: ["Committed to regular web-development practice", "Started connecting frontend, backend and data work", "Built a base for the product work that followed"], evidence: ["MERN foundations", "A deliberate move toward web products"],
    commit: { type: "learn", title: "take web building seriously", lines: ["keep showing up", "make the pieces talk to each other"] },
  },
  {
    id: "vit", ref: "edu/vit", period: "2022", title: "B.Tech CSE @ VIT Vellore", subtitle: "college begins; mostly syllabus-driven at first",
    metadata: [["Stage", "B.Tech CSE"], ["Place", "VIT Vellore"], ["Focus", "Formal foundation"]],
    whyItMattered: "College gave the formal foundation. The more personal building direction arrived gradually, mostly through what I chased after class.",
    changes: ["Started formal computer-science education", "Learned the syllabus before product work became the main pull"], evidence: ["B.Tech CSE at VIT Vellore"],
    commit: { type: "chore", title: "start the formal foundation", lines: ["college begins", "the building habit comes later"] },
  },
  {
    id: "first-code", ref: "init/2018", period: "2018", title: "First Contact with Code", subtitle: "C + basic HTML",
    metadata: [["Starting point", "C + basic HTML"], ["State", "Curiosity unlocked"]],
    whyItMattered: "The first programs and pages were small. The useful part was discovering that software could be taken apart, changed and made personal.",
    changes: ["First contact with C", "Basic HTML made the web feel editable"], evidence: ["Where the thread starts"],
    commit: { type: "init", title: "open the first file", lines: ["C", "basic HTML", "keep going"] },
  },
];

export const careerStories: readonly BuildStory[] = [
  {
    id: "kirana-corner", milestoneId: "kirana-corner", title: "Kirana Corner", subtitle: "First finished product where the idea and product direction were mine.", descriptor: "first original product", tags: ["Product model", "Marketplace", "Firebase"],
    links: { live: "https://kirana-corner.vercel.app/", repo: "https://github.com/NoobSambit/KIRANA-CORNER" },
    sections: [
      { title: "WHY I BUILT IT", kind: "text", content: ["The idea started with a question about warehouse-first quick commerce: could the network of neighbourhood kirana stores already holding inventory become the fulfilment layer instead?"] },
      { title: "PRODUCT MODEL", kind: "list", content: ["Customers discover nearby stores and products.", "Shop owners manage inventory and orders.", "Stores themselves remain the fulfilment layer."] },
      { title: "WHAT I BUILT", kind: "list", content: ["Map-first nearby-store discovery with distance filtering.", "Customer browsing, cart, address selection and order tracking.", "Separate shop-owner inventory and order workflows.", "Role-aware Firebase authentication and protected screens."] },
      { title: "TECHNICAL SHAPE", kind: "metadata", content: [["Frontend", "React + TypeScript + Vite"], ["Data", "Firebase Firestore"], ["Auth", "Firebase Auth"], ["Maps", "Leaflet"]] },
      { title: "WHAT IT CHANGED FOR ME", kind: "text", content: ["It was the first product where deciding what belonged in the product was the job. Coding was still hard; choosing the problem shape became more interesting."] },
    ], closingCommit: { type: "feat", title: "start from a product question", lines: ["build customer and shop-owner workflows", "keep the local store in the loop", "finish the thing"] },
  },
  {
    id: "fangate", milestoneId: "fangate", title: "FanGate", subtitle: "Small BTS experiment. First real public traction.", descriptor: "first public traction", tags: ["Community", "Last.fm", "Quiz"], links: { live: "https://fangate.netlify.app/" },
    sections: [
      { title: "WHY I BUILT IT", kind: "text", content: ["I was already part of the BTS community and wanted to make a small, fun thing for people who would understand the joke without much explanation."] },
      { title: "HOW IT WORKED", kind: "list", content: ["A Last.fm username starts the flow; there is no account wall.", "Public listening history contributes to a BTS fan score.", "A BTS quiz adds a second signal.", "The result becomes a shareable ticket-style scorecard."] },
      { title: "LAUNCH", kind: "timeline", content: ["Shared through Twitter/X and the BTS community.", "People arrived without a complicated acquisition plan.", "The small release became the audience seed for later projects."] },
      { title: "SIGNAL / OUTCOME", kind: "metadata", content: [["500+", "Participants in ~1 day"], ["Twitter/X", "Launch channel"], ["Community", "Audience carried forward"]] },
      { title: "WHAT I LEARNED", kind: "text", content: ["Scope and distribution matter as much as project size. A small product with a clear audience can teach more than a larger one nobody sees."] },
    ], closingCommit: { type: "feat", title: "ship something small enough to spread", lines: ["Last.fm username in", "listening score + BTS quiz", "shareable result out", "no account wall"] },
  },
  {
    id: "armybattles", milestoneId: "armybattles", title: "ARMYBATTLES", subtitle: "The community project gets deeper.", descriptor: "state, rules and verification", tags: ["Battles", "Verification", "Teams"], links: { repo: "https://github.com/NoobSambit/ARMYBATTLES" },
    sections: [
      { title: "WHY I BUILT IT", kind: "text", content: ["FanGate proved that people would show up. ARMYBATTLES was about building something that could keep making sense after they did."] },
      { title: "WHAT CHANGED", kind: "list", content: ["Battles moved through a lifecycle instead of ending at one result.", "Solo and team participation had separate scoring concerns.", "Leaderboards had to reflect verified listening rather than just clicks.", "Host controls and moderation became part of the product surface."] },
      { title: "VERIFICATION PATH", kind: "list", content: ["Spotify helpers support the music flow.", "Last.fm scrobbles are checked for listening verification.", "Scheduled verification scripts keep counts and battle state moving.", "Suspicious-stream handling exists because rules are only useful if they survive contact with people."] },
      { title: "WHAT IT CHANGED FOR ME", kind: "text", content: ["The same community feedback loop got much more stateful: battles, verified listening, teams, leaderboards and rules that had to keep working after the first click."] },
    ], closingCommit: { type: "feat", title: "make the community loop stateful", lines: ["verify listening", "score teams", "keep battle rules moving"] },
  },
  {
    id: "armyverse", milestoneId: "armyverse", title: "ArmyVerse", subtitle: "First 1k+ user platform. Real users, real bugs, real lessons.", descriptor: "first 1k+ user platform", tags: ["Community", "Feedback", "Iteration"], links: { live: "https://armyverse.vercel.app/", repo: "https://github.com/NoobSambit/ARMYVERSE2" },
    sections: [
      { title: "WHY I BUILT IT", kind: "text", content: ["After FanGate and ARMYBATTLES, I wanted to build a larger persistent product for the same BTS community rather than another isolated mini-tool. I did not start with a growth funnel. I kept shipping into the same community, and each launch became less cold."] },
      { title: "WHAT I BUILT", kind: "list", content: ["Playlist creation with Spotify export.", "Streaming-focused quests, streaks and rewards.", "BTS music discovery and YouTube data views.", "Profiles, community surfaces and leaderboard-style game systems.", "Guided tours for playlist creation flows."] },
      { title: "TECH & ARCHITECTURE", kind: "metadata", content: [["Frontend", "Next.js + TypeScript"], ["Data", "MongoDB"], ["Auth", "NextAuth + Firebase/JWT paths"], ["Integrations", "Spotify · Last.fm · YouTube"], ["Hosting", "Vercel"]] },
      { title: "LAUNCH TIMELINE", kind: "timeline", content: ["Built while sharing progress with the BTS community on Twitter/X.", "FanGate and ARMYBATTLES had already created an initial audience.", "ArmyVerse was announced before release; feedback and bug reports arrived immediately.", "The first 2–3 days were mostly fix → test → ship."] },
      { title: "SIGNALS / OUTCOMES", kind: "metadata", content: [["1.1k", "Users"], ["~2–3 days", "Continuous post-launch fixing"], ["Twitter/X", "Primary distribution channel"], ["Community", "Direct feedback loop"]] },
      { title: "WHAT BROKE / REAL LESSONS", kind: "list", content: ["The UI looked obvious to me. It wasn’t.", "Some flows needed tours and guidance.", "Leaderboard and streak/reward behaviour broke during early testing.", "Authentication issues appeared.", "Free-tier constraints showed up at the worst possible time.", "Some failures were user-side; some were absolutely mine."] },
      { title: "WHAT CHANGED AFTER THIS", kind: "list", content: ["User empathy became a design requirement.", "‘Obvious’ stopped being a valid UX argument.", "Release became the start of the feedback loop.", "Platform constraints started getting researched earlier."] },
      { title: "EVIDENCE / PROOF", kind: "list", content: ["1.1k users.", "Guided-tour and auth/streaming fixes are visible in the project’s Git history.", "The live product and public repository are linked above."] },
    ], closingCommit: { type: "fix", title: "keep listening after launch", lines: ["guided tours for unclear flows", "repair auth, leaderboard and reward edges", "fix → test → ship"] },
  },
  {
    id: "agent-playground", milestoneId: "going-deeper", title: "Agent Playground", subtitle: "A project that became a state, persistence and migration problem.", descriptor: "current systems work", tags: ["State", "PostgreSQL", "Migration"], links: { repo: "https://github.com/NoobSambit/AGENT-PLAYGROUND" },
    sections: [
      { title: "WHY IT MATTERS", kind: "text", content: ["The interesting part stopped being how many AI actions existed. The harder question became what an agent remembers, what gets persisted, and how that data changes safely as the system grows."] },
      { title: "SYSTEM SHAPE", kind: "list", content: ["Agent chat is the write point for memory, traits and state side effects.", "Services own domain rules; repositories own PostgreSQL reads and writes.", "Memory and relationship data have explicit, inspectable projections.", "Generation work uses sessions, versioned artifacts and pipeline traces."] },
      { title: "PERSISTENCE WORK", kind: "list", content: ["Four persistence modes cover Firestore, dual-write cutover and PostgreSQL.", "Export, backfill and parity checks support migration rather than a blind switch.", "Failed mirrored writes are captured in a migration outbox."] },
      { title: "WHAT I’M LEARNING", kind: "text", content: ["This is where feature work kept turning into questions about state boundaries, data ownership and how to change a live system without casually losing its past."] },
    ], closingCommit: { type: "refactor", title: "make state transitions inspectable", lines: ["separate services from persistence adapters", "move carefully from Firestore", "keep failures visible"] },
  },
  {
    id: "agentproof", milestoneId: "going-deeper", title: "AgentProof", subtitle: "A local CLI for checking software changed by coding agents.", descriptor: "verification and trust", tags: ["CLI", "Evidence", "Verification"],
    sections: [
      { title: "WHY I BUILT IT", kind: "text", content: ["Modern AI can write extremely strong code. The harder problem is deciding what to trust, what to verify, and who still owns the decision."] },
      { title: "WHAT IT VERIFIES", kind: "list", content: ["It takes a repository plus a task, issue or PRD.", "It turns the task into checkable requirements and proof obligations.", "It records what was checked, what happened and the evidence behind each claim.", "Missing tools, permissions or provider access stay visible instead of becoming a pretend pass."] },
      { title: "CLI / PIPELINE", kind: "list", content: ["A local CLI coordinates discovery, requirements, controlled checks and reports.", "Provider adapters can investigate without owning the verdict.", "Results distinguish evidence, cautions, blockers and incomplete coverage."] },
      { title: "TRUST MODEL", kind: "text", content: ["The target repository is an input to an audit, not a place to casually mutate. The report has to say what is proven, not simply sound reassuring."] },
      { title: "CURRENT STATE", kind: "text", content: ["Active pre-alpha work. The CLI, contract, controlled-runner, provider and evidence foundations are implemented in a staged roadmap; the product does not claim finished coverage it cannot prove."] },
    ], closingCommit: { type: "feat", title: "make evidence part of the answer", lines: ["turn tasks into checkable requirements", "keep controls and gaps explicit", "do not let a provider approve itself"] },
  },
];

export const careerBranches = [
  ["main", "product-engineering", "primary"], ["backend", "server · APIs · systems", "primary"], ["fullstack", "end-to-end web", "active"], ["ai", "AI features · agents", "active"], ["cli", "CLI tools · workflows", "active"], ["system-design", "systems thinking", "learning"],
] as const;

export const learningTimeline = [
  ["2023", "MERN Foundations", "completed"], ["2024", "Full-stack through rebuilding", "completed"], ["2025", "Original product planning", "evolving"], ["2025", "Real-user iteration", "learned by shipping"], ["2026", "System Design", "active"], ["2026", "CLI / Verification", "active"],
] as const;
