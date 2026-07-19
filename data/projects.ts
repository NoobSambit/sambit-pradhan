export type ProjectNode = { icon: string; name: string; detail: string };
export type ProjectFact = { label: string; value: string };
export type ProjectCommit = { sha: string; date: string; subject: string };

export type Project = {
  id: string;
  name: string;
  productName?: string;
  state: string;
  tone: "green" | "yellow" | "blue";
  runtime: string;
  tag: string;
  description: string;
  repository: string;
  branch: string;
  commitCount: number;
  latestCommit: ProjectCommit;
  commits: ProjectCommit[];
  stack: string[];
  facts: ProjectFact[];
  architecture: ProjectNode[];
  capabilities: string[];
  engineeringNotes: ProjectFact[];
};

export const projects: Project[] = [
  {
    id: "armyverse",
    name: "ArmyVerse",
    productName: "BTS fan platform",
    state: "Active",
    tone: "green",
    runtime: "Next.js + TypeScript",
    tag: "AI · Music · Community",
    description:
      "A full BTS fan platform for AI and manual playlist creation, streaming analytics, community publishing, and Boraverse progression systems.",
    repository: "https://github.com/NoobSambit/ARMYVERSE2",
    branch: "main",
    commitCount: 131,
    latestCommit: {
      sha: "9757edd",
      date: "2026-03-11",
      subject:
        "fix: update Spotify export and local OAuth docs for dev mode compatibility",
    },
    commits: [
      {
        sha: "9757edd",
        date: "2026-03-11",
        subject:
          "fix: update Spotify export and local OAuth docs for dev mode compatibility",
      },
      {
        sha: "dec540e",
        date: "2026-01-29",
        subject:
          "fix(streaming): count explicit quest targets in Last.fm verification",
      },
      {
        sha: "ba84647",
        date: "2026-01-27",
        subject: "fix(quests): prevent streaming verification regressions",
      },
      {
        sha: "e6353d4",
        date: "2026-01-27",
        subject: "fix: resolve TypeScript build errors in quest routes",
      },
      {
        sha: "9e9f4e8",
        date: "2026-01-27",
        subject: "fix: batch large Spotify playlist exports",
      },
      {
        sha: "59ed965",
        date: "2026-01-27",
        subject: "feat: add responsive guided playlist tours",
      },
    ],
    stack: [
      "Next.js 14",
      "React 18",
      "TypeScript",
      "MongoDB",
      "Firebase",
      "Groq",
      "Spotify",
      "Last.fm",
      "YouTube",
      "Tailwind",
    ],
    facts: [
      { label: "AI playlist controls", value: "15+ inputs" },
      { label: "BTS track catalog", value: "1000+ tracks" },
      { label: "Collectible badges", value: "34" },
      { label: "Streaming sources", value: "Spotify · Last.fm · YouTube" },
      { label: "Quiz sessions", value: "10 randomized questions" },
      { label: "Daily quiz limit", value: "2 free runs" },
    ],
    architecture: [
      { icon: "◉", name: "Next.js client", detail: "fan workspace" },
      { icon: "✦", name: "AI playlists", detail: "Groq + catalog" },
      { icon: "♫", name: "Music services", detail: "Spotify / Last.fm" },
      { icon: "▦", name: "MongoDB", detail: "platform data" },
      { icon: "◌", name: "Firebase", detail: "identity" },
    ],
    capabilities: [
      "AI playlist architect with genre, mood, era, seed-track, and flow controls",
      "Manual playlist authoring with track search, drag ordering, and audio previews",
      "Spotify OAuth export with encrypted per-user credentials",
      "Daily global Spotify and YouTube analytics with historical snapshots",
      "Boraverse quiz, quest, mastery, crafting, badges, and leaderboard systems",
      "Last.fm-backed streaming quests with album-completion and fuzzy track verification",
      "Tiptap community blogging with reactions, comments, saves, and SEO tooling",
    ],
    engineeringNotes: [
      {
        label: "Data freshness",
        value: "Scheduled analytics ingestion and cached provider reads",
      },
      {
        label: "Playlist export",
        value: "Large exports are chunked in batches of 100 tracks",
      },
      {
        label: "Quest integrity",
        value: "Last.fm verification is paginated and monotonic",
      },
      {
        label: "Repository state",
        value: "Existing local worktree changes detected during audit",
      },
    ],
  },
  {
    id: "agent-playground",
    name: "Agent Playground",
    state: "Active",
    tone: "green",
    runtime: "Next.js + TypeScript",
    tag: "AI Agents · PostgreSQL",
    description:
      "An inspectable multi-agent platform with persistent identity, memory, emotions, relationships, creativity, mentorship, challenge labs, and simulation workspaces.",
    repository: "https://github.com/NoobSambit/AGENT-PLAYGROUND",
    branch: "main",
    commitCount: 81,
    latestCommit: {
      sha: "2f9b506",
      date: "2026-07-16",
      subject:
        "refactor(page): streamline component imports and enhance navigation structure",
    },
    commits: [
      {
        sha: "2f9b506",
        date: "2026-07-16",
        subject:
          "refactor(page): streamline component imports and enhance navigation structure",
      },
      {
        sha: "874cd39",
        date: "2026-07-16",
        subject:
          "refactor(memory-console): enhance MemoryConsole UI and functionality",
      },
      {
        sha: "e88e612",
        date: "2026-07-16",
        subject: "refactor(timeline): improve TimelineExplorer event handling",
      },
      {
        sha: "85a51ef",
        date: "2026-07-15",
        subject: "refactor(timeline): simplify TimelineExplorer",
      },
      {
        sha: "ae289e5",
        date: "2026-07-15",
        subject: "refactor(agent-detail): enhance EmotionRadar",
      },
      {
        sha: "6155120",
        date: "2026-07-15",
        subject: "feat(agent-overview): rebuild the agent cockpit",
      },
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "PostgreSQL",
      "Drizzle",
      "Zustand",
      "LangChain",
      "Gemini",
      "Groq",
      "Ollama",
    ],
    facts: [
      { label: "Persistence modes", value: "4" },
      { label: "LLM providers", value: "Gemini · Groq · Ollama" },
      { label: "Canonical runtime", value: "PostgreSQL" },
      { label: "Quality flow", value: "draft → evaluate → repair" },
      { label: "Migration tooling", value: "Export · backfill · parity" },
      { label: "Legacy path", value: "Firestore mirror support" },
    ],
    architecture: [
      { icon: "◉", name: "App Router UI", detail: "agent workspaces" },
      { icon: "◇", name: "Zustand stores", detail: "client state" },
      { icon: "⌁", name: "Route handlers", detail: "validation" },
      { icon: "✦", name: "Domain services", detail: "orchestration" },
      { icon: "▦", name: "PostgreSQL", detail: "Drizzle ORM" },
      { icon: "AI", name: "LLM layer", detail: "provider fallback" },
    ],
    capabilities: [
      "Persistent agent identity, personality, emotions, memory, learning, and relationship state",
      "Inspectable draft, generate, evaluate, repair, save, and publish workflows",
      "Knowledge Library with validation-aware retrieval, source evidence, and usage tracing",
      "Creative, journal, dream, profile, scenario, mentorship, arena, and collective-intelligence workspaces",
      "Session and pipeline-event records that keep agent decisions inspectable instead of opaque",
      "Provider routing with time limits, Gemini/Groq/Ollama fallback, and bounded error paths",
      "Firestore migration tooling with export, backfill, parity verification, and dual-write modes",
    ],
    engineeringNotes: [
      { label: "Layering", value: "UI → store → route → service → repository" },
      {
        label: "Provider safety",
        value: "Time-bounded calls with fallback behavior",
      },
      {
        label: "Auditability",
        value: "Pipeline events and quality states remain inspectable",
      },
      {
        label: "Migration path",
        value: "Firestore retained as legacy/mirror support",
      },
    ],
  },
  {
    id: "docbuilder",
    name: "DocBuilder",
    productName: "AI Document & PowerPoint Builder",
    state: "Production ready",
    tone: "green",
    runtime: "Next.js + FastAPI",
    tag: "RAG · Documents · Exports",
    description:
      "An AI document and presentation builder combining LangChain orchestration, RAG-backed research, context-aware refinement, and professional DOCX/PPTX exports.",
    repository: "https://github.com/NoobSambit/docbuilder",
    branch: "main",
    commitCount: 25,
    latestCommit: {
      sha: "2081b7a",
      date: "2026-04-17",
      subject:
        "feat: update login and register pages with new branding, integration, and dark mode UI",
    },
    commits: [
      {
        sha: "2081b7a",
        date: "2026-04-17",
        subject:
          "feat: update login and register pages with new branding, integration, and dark mode UI",
      },
      {
        sha: "fd33af8",
        date: "2026-04-14",
        subject: "fix: improve index-page typography entities",
      },
      {
        sha: "9f43f81",
        date: "2026-04-14",
        subject:
          "chore: ignore local environment files and format SVG components",
      },
      {
        sha: "6b33b84",
        date: "2026-04-14",
        subject:
          "feat(ui): complete landing-page bento grid and narrative revamp",
      },
      {
        sha: "d254dcb",
        date: "2025-12-11",
        subject: "fix: resolve build issue",
      },
      {
        sha: "54b807d",
        date: "2025-12-10",
        subject: "feat: migrate from Gemini API to Groq API",
      },
    ],
    stack: [
      "Next.js 13",
      "React 18",
      "TypeScript",
      "FastAPI",
      "Python",
      "LangChain",
      "Groq",
      "FAISS",
      "Firebase",
      "Railway",
    ],
    facts: [
      { label: "LLM", value: "Llama 3.3 70B via Groq" },
      { label: "Knowledge retrieval", value: "Google Search + FAISS" },
      { label: "Export formats", value: "DOCX + PPTX" },
      { label: "Presentation themes", value: "4" },
      { label: "Authentication", value: "Firebase + JWT" },
      { label: "Refinement context", value: "Full outline + neighbours" },
    ],
    architecture: [
      { icon: "◉", name: "Next.js client", detail: "editor + auth" },
      { icon: "◇", name: "FastAPI", detail: "REST application" },
      { icon: "AI", name: "LangChain", detail: "LLM orchestration" },
      { icon: "⌕", name: "RAG retrieval", detail: "search + FAISS" },
      { icon: "▦", name: "Firestore", detail: "application data" },
      { icon: "⇩", name: "Export engine", detail: "DOCX / PPTX" },
    ],
    capabilities: [
      "Document-type-aware outline generation for DOCX and PPTX",
      "Research-grounded content with source URLs and semantic similarity search",
      "Section refinement aware of adjacent sections, total outline, and feedback history",
      "Automatic word-count adjustments and transitions based on natural-language refinement requests",
      "Rich TipTap editing with drag-and-drop document sections and formatted content",
      "Four themed PPTX exports plus structured DOCX formatting",
      "JWT-protected Firebase authentication and deployed frontend/backend surfaces",
    ],
    engineeringNotes: [
      {
        label: "Context assembly",
        value: "Uses full outline and adjacent-section context",
      },
      {
        label: "Grounding",
        value: "RAG provides current sources instead of model-only claims",
      },
      {
        label: "Exports",
        value: "Dedicated Python services for document and slide generation",
      },
      { label: "Deployment", value: "Vercel frontend + Railway backend" },
    ],
  },
  {
    id: "gym-tracker",
    name: "Gym App Tracker",
    productName: "Gym Tracker",
    state: "Release candidate",
    tone: "yellow",
    runtime: "Flutter + NestJS",
    tag: "Offline-first · Fitness",
    description:
      "An Android-first, offline-first strength-training app focused on fast workout logging, local reliability, optional account sync, private social sharing, and group challenges.",
    repository: "https://github.com/NoobSambit/gym-tracker",
    branch: "main",
    commitCount: 38,
    latestCommit: {
      sha: "075e40a",
      date: "2026-07-02",
      subject:
        "feat: add floating navigation bar, port checks, and mobile routing/UI updates",
    },
    commits: [
      {
        sha: "075e40a",
        date: "2026-07-02",
        subject:
          "feat: add floating navigation bar, port checks, and mobile routing/UI updates",
      },
      {
        sha: "bf94c91",
        date: "2026-07-02",
        subject:
          "feat: add routine library banner and improve routine readability",
      },
      {
        sha: "cc5bc22",
        date: "2026-07-02",
        subject: "refactor: unify UI design and settings layout",
      },
      {
        sha: "c67540a",
        date: "2026-07-02",
        subject: "chore: consolidate Render build process",
      },
      {
        sha: "3de9918",
        date: "2026-07-02",
        subject: "refactor: revise bottom navigation and tests",
      },
      {
        sha: "005a402",
        date: "2026-06-30",
        subject: "feat(UI): rebuild settings dashboard",
      },
    ],
    stack: [
      "Flutter",
      "Dart",
      "Riverpod",
      "Drift / SQLite",
      "NestJS 11",
      "Prisma 7",
      "PostgreSQL",
      "OpenAPI",
      "Material 3",
    ],
    facts: [
      { label: "Exercise catalog", value: "118 original entries" },
      { label: "Client source of truth", value: "Drift / SQLite" },
      { label: "API", value: "NestJS + OpenAPI" },
      { label: "Release phase", value: "PRD 09 stabilization" },
      { label: "Sync model", value: "Outbox + conflict handling" },
      { label: "Social model", value: "Invite-only by design" },
    ],
    architecture: [
      { icon: "◉", name: "Flutter app", detail: "Android-first UX" },
      { icon: "▦", name: "Drift / SQLite", detail: "offline source" },
      { icon: "⌁", name: "Sync outbox", detail: "conflict-aware" },
      { icon: "◇", name: "NestJS API", detail: "REST + auth" },
      { icon: "▣", name: "Prisma", detail: "data access" },
      { icon: "●", name: "PostgreSQL", detail: "account sync" },
    ],
    capabilities: [
      "Fast active-workout logging with rest timers, autosave, and restart recovery",
      "Versioned routines, scheduling, exercise metadata, custom exercises, and workout history",
      "Progress metrics, goals, achievements, JSON/CSV export, and accessible chart alternatives",
      "Generated Dart API client from an OpenAPI-backed NestJS contract",
      "Optional account sync with local outbox and conflict-aware remote persistence",
      "Invite-only friends, private groups, granular workout sharing, moderation, and reporting",
      "Deterministic private-group challenges with trusted server scoring and recalculation",
    ],
    engineeringNotes: [
      {
        label: "Reliability",
        value: "Transactional local writes and restart recovery",
      },
      {
        label: "Privacy",
        value: "Private-by-default data and explicit sharing controls",
      },
      {
        label: "Verification",
        value:
          "Release gate covers API, mobile, contracts, audits, and APK build",
      },
      {
        label: "Runtime",
        value: "Native PostgreSQL locally; Docker is optional",
      },
    ],
  },
  {
    id: "insightquill",
    name: "InsightQuill",
    state: "V2",
    tone: "blue",
    runtime: "Flutter + Supabase",
    tag: "EdTech · Analytics",
    description:
      "An education operations platform for role-based academic management, secure assessment workflows, feedback systems, analytics, and spreadsheet/PDF reporting.",
    repository: "https://github.com/NoobSambit/InsightQuill",
    branch: "V2",
    commitCount: 44,
    latestCommit: {
      sha: "c93aabf",
      date: "2026-05-25",
      subject:
        "fix: handle college fetch errors and improve Flutter build script resolution",
    },
    commits: [
      {
        sha: "c93aabf",
        date: "2026-05-25",
        subject:
          "fix: handle college fetch errors and improve Flutter build script resolution",
      },
      {
        sha: "ac169e1",
        date: "2026-05-17",
        subject: "feat: add Excel export for quiz scores and document helpers",
      },
      {
        sha: "c46ad09",
        date: "2026-05-16",
        subject: "fix: guard PDF grid drawing against null-check crashes",
      },
      {
        sha: "c5fc4ab",
        date: "2026-05-15",
        subject: "refactor: split scorecard PDF rankings and flagged details",
      },
      {
        sha: "e68547a",
        date: "2026-05-15",
        subject: "feat: rebuild quiz analytics with a scrollable leaderboard",
      },
      {
        sha: "8fe92be",
        date: "2026-05-13",
        subject: "feat(hod): add department-aware HOD command center",
      },
    ],
    stack: [
      "Flutter",
      "Dart",
      "Provider",
      "Supabase",
      "Node.js",
      "Gemini",
      "Excel",
      "Syncfusion PDF",
      "Local Auth",
    ],
    facts: [
      { label: "Roles", value: "Admin · HOD · Faculty · Student" },
      { label: "Security flows", value: "OTP + biometric login" },
      { label: "Reports", value: "Excel + PDF" },
      { label: "Feedback domain", value: "Quiz + class feedback v2" },
      { label: "Application data", value: "Supabase" },
      { label: "AI-assisted flow", value: "Gemini draft generation" },
    ],
    architecture: [
      { icon: "◉", name: "Flutter app", detail: "responsive clients" },
      { icon: "◇", name: "Role workflows", detail: "academic ops" },
      { icon: "⌁", name: "Serverless API", detail: "Node.js guards" },
      { icon: "✦", name: "AI drafting", detail: "Gemini" },
      { icon: "▦", name: "Supabase", detail: "identity + data" },
      { icon: "⇩", name: "Reports", detail: "Excel / PDF" },
    ],
    capabilities: [
      "Super Admin and HOD dashboards for colleges, departments, faculty, courses, and class management",
      "Quiz authoring, secure attempts, analytics, scorecards, and searchable ranked leaderboards",
      "Class and quiz feedback sessions with validation, scheduling, recipient controls, and AI-assisted draft generation",
      "Course-level feedback configuration, precedence rules, quotas, and provider-fallback paths",
      "OTP, approval, password-reset, and biometric authentication journeys",
      "Excel score exports and PDF reports that separate student ranking from flagged details",
      "Role-aware audit logging and cascade-safe course/user administration",
    ],
    engineeringNotes: [
      {
        label: "Domain controls",
        value: "Role and course guards protect feedback workflows",
      },
      {
        label: "Feedback quality",
        value:
          "Validation, quota, provider fallback, and session-repair coverage",
      },
      {
        label: "Analytics",
        value: "Scrollable, memory-efficient ranked performance views",
      },
      { label: "Branch", value: "Repository currently tracks the V2 branch" },
    ],
  },
  {
    id: "kirana-corner",
    name: "Kirana Corner",
    productName: "KiranaConnect",
    state: "Deployed",
    tone: "green",
    runtime: "Vite + React",
    tag: "Hyperlocal · Commerce",
    description:
      "A hyperlocal shop-to-home marketplace that lets customers buy directly from neighborhood kirana stores while shop owners run inventory and orders themselves.",
    repository: "https://github.com/NoobSambit/KIRANA-CORNER",
    branch: "master",
    commitCount: 45,
    latestCommit: {
      sha: "b286d8f",
      date: "2026-05-31",
      subject:
        "feat: add HowItWorksModal and integrate it into landing-page navigation",
    },
    commits: [
      {
        sha: "b286d8f",
        date: "2026-05-31",
        subject:
          "feat: add HowItWorksModal and integrate it into landing-page navigation",
      },
      {
        sha: "08b957a",
        date: "2026-05-31",
        subject:
          "refactor: use direct property access and inline image fallbacks",
      },
      {
        sha: "7c2be19",
        date: "2026-05-31",
        subject: "refactor: overhaul ProductCard UI and cart state integration",
      },
      {
        sha: "f64767f",
        date: "2026-05-30",
        subject: "feat: add Gemini-powered recipe shopping assistant",
      },
      {
        sha: "bcce420",
        date: "2026-05-25",
        subject: "feat(seed): add AI-ready catalog and shop seeding",
      },
      {
        sha: "08f547a",
        date: "2026-05-25",
        subject: "feat(landing): complete premium landing-page redesign",
      },
    ],
    stack: [
      "Vite",
      "React 18",
      "TypeScript",
      "Firebase",
      "Firestore",
      "Leaflet",
      "Gemini",
      "Vercel",
      "Tailwind",
    ],
    facts: [
      { label: "Discovery", value: "Map-first + radius aware" },
      { label: "Realtime data", value: "Firestore" },
      { label: "User roles", value: "Customer · Shop owner" },
      { label: "Deployment", value: "Vercel" },
      { label: "Fulfilment model", value: "Shop-delivered" },
      { label: "Shopping assistant", value: "Gemini-powered" },
    ],
    architecture: [
      { icon: "◉", name: "React client", detail: "Vite + Tailwind" },
      { icon: "⌖", name: "Leaflet map", detail: "nearby shops" },
      { icon: "▱", name: "Cart + orders", detail: "checkout flow" },
      { icon: "◇", name: "Firebase Auth", detail: "role-aware UX" },
      { icon: "▦", name: "Firestore", detail: "realtime data" },
      { icon: "AI", name: "Recipe helper", detail: "Gemini" },
    ],
    capabilities: [
      "Map-first nearby-shop discovery with zoom-aware distance filtering",
      "Store pages, product catalogs, search, category filtering, sorting, and grid/list browsing",
      "Cart, address book, mock checkout, and customer order tracking",
      "Shop-owner bulk inventory updates, product management, and order views",
      "Haversine-based geographic filtering and Leaflet map-bound discovery",
      "Role-aware Firebase authentication with protected customer and shop-owner journeys",
      "Realtime Firestore updates and a Gemini recipe shopping assistant",
    ],
    engineeringNotes: [
      {
        label: "Logistics model",
        value: "Stores fulfill delivery directly—no central warehouse",
      },
      {
        label: "Location logic",
        value: "Haversine distance and map-bound filtering",
      },
      { label: "Security", value: "Gemini credentials remain server-only" },
      { label: "Live URL", value: "kirana-corner.vercel.app" },
    ],
  },
  {
    id: "kisan-setu",
    productName: "AI-powered farming assistant",
    name: "KisanSetu",
    state: "Ongoing",
    tone: "yellow",
    runtime: "Next.js + TypeScript",
    tag: "AgriTech · AI · Active build",
    description:
      "An active agricultural intelligence platform connecting farm context, explainable schemes, satellite crop health, multilingual advisory, weather risk, and market data.",
    repository: "https://github.com/NoobSambit/KisanSetu-Hackathon",
    branch: "main",
    commitCount: 2,
    latestCommit: {
      sha: "eeab591",
      date: "2026-02-14",
      subject:
        "feat: add scheme, satellite, voice, market, and dashboard foundations",
    },
    commits: [
      {
        sha: "eeab591",
        date: "2026-02-14",
        subject:
          "feat: add scheme, satellite, voice, market, and dashboard foundations",
      },
      {
        sha: "2ba6aec",
        date: "2026-02-13",
        subject: "chore: initialize KisanSetu hackathon project",
      },
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Firebase",
      "Firestore",
      "Ollama",
      "Groq",
      "Sentinel-2",
      "Leaflet",
      "Tailwind CSS",
    ],
    facts: [
      { label: "Execution state", value: "Day 4–6 active work" },
      { label: "Scheme corpus", value: "825 agriculture records" },
      { label: "API routes", value: "24 route handlers" },
      { label: "App surfaces", value: "17 App Router pages" },
      { label: "Assistant providers", value: "Ollama · Groq" },
      { label: "Satellite source", value: "CDSE Sentinel-2" },
    ],
    architecture: [
      { icon: "◉", name: "Next.js app", detail: "farmer workspaces" },
      { icon: "◇", name: "Route handlers", detail: "24 API contracts" },
      { icon: "✦", name: "Farm services", detail: "decision logic" },
      { icon: "▦", name: "Firestore", detail: "profiles + series" },
      { icon: "◫", name: "CDSE Sentinel-2", detail: "crop health" },
      { icon: "AI", name: "Ollama / Groq", detail: "farm advisory" },
    ],
    capabilities: [
      "Five-step farm profile with required parcel boundary and reusable farm memory",
      "Profile-aware assistant with explicit Ollama/Groq routing and same-language policy",
      "Multilingual voice STT/TTS with local-runtime and browser fallback transparency",
      "Explainable scheme recommendations plus an 825-record agriculture library",
      "Satellite health, AOI resolution, confidence, zone overlays, and cache metadata",
      "Agmarknet 2025 market browsing with resumable ingestion and active forecast work",
      "Weather-risk notifications, crop-planning/disease support, community foundations, and an active bidding prototype",
    ],
    engineeringNotes: [
      {
        label: "Project state",
        value:
          "Ongoing—Day 4 market, Day 5 weather, and Day 6 dashboard work remain active",
      },
      {
        label: "Trust posture",
        value:
          "Fallback source and precision state are designed to remain visible",
      },
      {
        label: "Known gap",
        value:
          "Server-side authorization and deeper automated tests require further hardening",
      },
      {
        label: "Current prototype",
        value:
          "Bidding Ground is a sample-data interface pending real-time persistence",
      },
    ],
  },
];
