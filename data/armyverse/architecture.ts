export type ArmyverseArchitectureTone = "purple" | "cyan" | "green" | "amber";

export type ArmyverseArchitectureNode = {
  id: string;
  label: string;
  detail: string;
  tone: ArmyverseArchitectureTone;
  x: number;
  y: number;
};

export type ArmyverseArchitectureEdge = {
  from: string;
  to: string;
  label?: string;
};

export type ArmyverseArchitectureMap = {
  id: string;
  group:
    | "Platform"
    | "Music"
    | "Data"
    | "Game"
    | "Community"
    | "Administration"
    | "Identity"
    | "Assessment"
    | "Feedback"
    | "Intelligence"
    | "Reporting";
  title: string;
  summary: string;
  source: string;
  engineeringNotes: string[];
  support: {
    requestPath: [string, string][];
    modules: [string, string, ArmyverseArchitectureTone][];
    decisions: [string, string][];
    safeguards: string[];
    operationalPath: string[];
  };
  nodes: ArmyverseArchitectureNode[];
  edges: ArmyverseArchitectureEdge[];
};

export const armyverseArchitectureMaps: ArmyverseArchitectureMap[] = [
  {
    id: "platform-boundaries",
    group: "Platform",
    title: "Platform request boundaries",
    summary:
      "One Next.js application separates browser experience, route handlers, domain modules, persistence, and provider boundaries.",
    source: "App Router, 88 route handlers, 27 Mongoose models",
    engineeringNotes: [
      "JWT/password and Firebase social auth converge at protected route verification.",
      "The platform stays modular without being represented as a fictional microservice system.",
    ],
    support: {
      requestPath: [
        [
          "Product action",
          "A fan starts a music, community, analytics, or Boraverse task.",
        ],
        [
          "Route boundary",
          "An App Router handler validates input and verifies protected requests.",
        ],
        [
          "Domain execution",
          "The matching domain module coordinates state and integration work.",
        ],
        [
          "State or provider",
          "Mongoose persists state; a provider is called only at the domain boundary.",
        ],
        [
          "Focused response",
          "The surface receives a typed result or updated product state.",
        ],
      ],
      modules: [
        ["Experience", "App Router pages, contexts, and hooks", "purple"],
        ["Route groups", "music, game, blogs, user, cron", "cyan"],
        ["Domain state", "playlists, quests, posts, profiles", "green"],
        ["Integrations", "Spotify, Last.fm, Groq, Firebase", "amber"],
      ],
      decisions: [
        [
          "Modular route groups",
          "One deployable Next.js application keeps closely related product work cohesive.",
        ],
        [
          "Dual auth verification",
          "JWT/password and Firebase identity converge at the protected-route boundary.",
        ],
        [
          "Provider boundaries",
          "External APIs sit behind product domains instead of leaking into UI surfaces.",
        ],
      ],
      safeguards: [
        "Protected route verification",
        "MongoDB indexed reads",
        "Firebase token validation",
        "Provider-specific caches",
        "Encrypted Spotify credentials",
        "Cron-secret checks",
      ],
      operationalPath: [
        "Fan action",
        "App Router",
        "Route group",
        "Domain state",
        "Result",
      ],
    },
    nodes: [
      {
        id: "client",
        label: "Fan browser",
        detail: "App Router surfaces",
        tone: "purple",
        x: 90,
        y: 74,
      },
      {
        id: "experience",
        label: "Next.js experience",
        detail: "React · contexts · hooks",
        tone: "cyan",
        x: 285,
        y: 74,
      },
      {
        id: "auth",
        label: "Auth boundary",
        detail: "JWT + Firebase token",
        tone: "green",
        x: 500,
        y: 74,
      },
      {
        id: "firebase",
        label: "Firebase Auth",
        detail: "social identity",
        tone: "amber",
        x: 760,
        y: 74,
      },
      {
        id: "routes",
        label: "Route handlers",
        detail: "music · game · blog · cron",
        tone: "purple",
        x: 450,
        y: 186,
      },
      {
        id: "playlist",
        label: "Playlist domain",
        detail: "create · evolve · export",
        tone: "cyan",
        x: 150,
        y: 322,
      },
      {
        id: "game",
        label: "Boraverse domain",
        detail: "quiz · quests · rewards",
        tone: "green",
        x: 365,
        y: 322,
      },
      {
        id: "community",
        label: "Community domain",
        detail: "blogs · reactions · profiles",
        tone: "amber",
        x: 575,
        y: 322,
      },
      {
        id: "analytics",
        label: "Analytics domain",
        detail: "snapshots · rankings",
        tone: "cyan",
        x: 790,
        y: 322,
      },
      {
        id: "mongo",
        label: "MongoDB + Mongoose",
        detail: "27 domain models",
        tone: "green",
        x: 470,
        y: 438,
      },
      {
        id: "providers",
        label: "Music & AI providers",
        detail: "Spotify · Last.fm · Groq · Kworb",
        tone: "amber",
        x: 850,
        y: 202,
      },
    ],
    edges: [
      { from: "client", to: "experience" },
      { from: "experience", to: "routes" },
      { from: "experience", to: "auth" },
      { from: "auth", to: "firebase" },
      { from: "routes", to: "playlist" },
      { from: "routes", to: "game" },
      { from: "routes", to: "community" },
      { from: "routes", to: "analytics" },
      { from: "playlist", to: "mongo" },
      { from: "game", to: "mongo" },
      { from: "community", to: "mongo" },
      { from: "analytics", to: "mongo" },
      { from: "playlist", to: "providers" },
      { from: "analytics", to: "providers" },
    ],
  },
  {
    id: "playlist-generation",
    group: "Music",
    title: "AI playlist generation & export",
    summary:
      "A guided prompt is enriched by BTS catalogue data and Groq generation before validation, persistence, and optional Spotify export.",
    source:
      "POST /api/playlist/generate-enhanced and Spotify OAuth export routes",
    engineeringNotes: [
      "Generation supports seed tracks, member/era preferences, genre mix, flow pattern, audio features, and context.",
      "Spotify IDs are resolved before export; large exports are batched in groups of 100 tracks.",
    ],
    support: {
      requestPath: [
        [
          "Configure the mix",
          "Prompt, mood, member, era, seed tracks, genre mix, and flow enter the composer.",
        ],
        [
          "Generate request",
          "The enhanced route validates inputs and builds the structured generation context.",
        ],
        [
          "Propose and match",
          "Groq proposes a sequence while the local BTS catalogue resolves track identity.",
        ],
        [
          "Validate the playlist",
          "Matched tracks are sequenced against the selected flow and saved as a playlist record.",
        ],
        [
          "Export when chosen",
          "Spotify OAuth writes the playlist in batches after ID resolution.",
        ],
      ],
      modules: [
        [
          "Playlist composer",
          "guided controls and saved configurations",
          "purple",
        ],
        ["Generation route", "request validation and prompt assembly", "cyan"],
        ["Track matcher", "Mongo catalogue first, provider fallback", "green"],
        ["Spotify export", "OAuth and chunked playlist writes", "amber"],
      ],
      decisions: [
        [
          "Catalogue before provider",
          "Local BTS track matching is used before external fallback to keep results consistent.",
        ],
        [
          "Structured generation",
          "Controls become a detailed Groq prompt rather than a free-form request alone.",
        ],
        [
          "Batched export",
          "Large Spotify playlists are written in groups of 100 tracks.",
        ],
      ],
      safeguards: [
        "Input validation",
        "Seed-track resolution",
        "Saved playlist history",
        "Encrypted Spotify tokens",
        "100-track export batches",
        "Optional export boundary",
      ],
      operationalPath: [
        "Controls",
        "Generation route",
        "Groq + catalogue",
        "Validate",
        "Save / export",
      ],
    },
    nodes: [
      {
        id: "controls",
        label: "Playlist controls",
        detail: "prompt · mood · seed · flow",
        tone: "purple",
        x: 110,
        y: 110,
      },
      {
        id: "api",
        label: "Enhanced playlist route",
        detail: "request validation",
        tone: "cyan",
        x: 335,
        y: 110,
      },
      {
        id: "groq",
        label: "Groq Llama 3.3 70B",
        detail: "structured BTS proposal",
        tone: "amber",
        x: 590,
        y: 70,
      },
      {
        id: "catalogue",
        label: "BTS track catalogue",
        detail: "MongoDB matching",
        tone: "green",
        x: 590,
        y: 245,
      },
      {
        id: "compose",
        label: "Validate & sequence",
        detail: "match tracks · apply flow",
        tone: "purple",
        x: 785,
        y: 140,
      },
      {
        id: "playlist",
        label: "Playlist record",
        detail: "history · configs · sharing",
        tone: "green",
        x: 785,
        y: 335,
      },
      {
        id: "spotify",
        label: "Spotify export",
        detail: "OAuth · chunked writes",
        tone: "cyan",
        x: 945,
        y: 255,
      },
    ],
    edges: [
      { from: "controls", to: "api" },
      { from: "api", to: "groq" },
      { from: "api", to: "catalogue" },
      { from: "groq", to: "compose" },
      { from: "catalogue", to: "compose" },
      { from: "compose", to: "playlist" },
      { from: "playlist", to: "spotify", label: "optional" },
    ],
  },
  {
    id: "analytics-ingestion",
    group: "Data",
    title: "Daily ranking ingestion",
    summary:
      "Scheduled Spotify and YouTube collectors run independently, build date-keyed snapshots, and feed the public analytics surfaces.",
    source:
      "Cron routes, Kworb collectors, KworbSnapshot and YouTubeKworbSnapshot models",
    engineeringNotes: [
      "Spotify collection runs at 01:30 UTC; YouTube collection at 01:35 UTC.",
      "Provider collection is decoupled from read paths so visitors receive persisted snapshots, not live scrapes.",
    ],
    support: {
      requestPath: [
        [
          "Scheduled trigger",
          "Secret-protected cron routes start Spotify and YouTube collectors at their configured offsets.",
        ],
        [
          "Independent collection",
          "Each collector fetches and parses Kworb rankings without waiting on the other.",
        ],
        [
          "Media enrichment",
          "Spotify ranking data adds album art; YouTube data derives thumbnails.",
        ],
        [
          "Date-keyed persistence",
          "Each run writes a KworbSnapshot or YouTubeKworbSnapshot record.",
        ],
        [
          "Snapshot read",
          "Public analytics routes serve stored latest, history, and comparison data.",
        ],
      ],
      modules: [
        ["Cron routes", "scheduled entry points and auth", "purple"],
        ["Spotify collector", "Kworb parsing and oEmbed art", "cyan"],
        ["YouTube collector", "Kworb views and thumbnails", "amber"],
        ["Snapshot reads", "latest, history, and compare surfaces", "green"],
      ],
      decisions: [
        [
          "Offset schedules",
          "Spotify runs at 01:30 UTC and YouTube at 01:35 UTC to keep collectors independent.",
        ],
        [
          "Snapshot-first reads",
          "Visitors read MongoDB snapshots rather than triggering provider scraping.",
        ],
        [
          "Date keys",
          "Daily documents preserve historical comparisons without mutable ranking state.",
        ],
      ],
      safeguards: [
        "CRON_SECRET authentication",
        "Independent collectors",
        "Date-keyed snapshots",
        "Provider work off read path",
        "Cached analytics reads",
        "Persisted history",
      ],
      operationalPath: [
        "Cron trigger",
        "Kworb collectors",
        "Media enrichment",
        "MongoDB snapshots",
        "Analytics views",
      ],
    },
    nodes: [
      {
        id: "cron",
        label: "Scheduled cron",
        detail: "secret-protected triggers",
        tone: "purple",
        x: 500,
        y: 60,
      },
      {
        id: "spotify-source",
        label: "Spotify ranking collector",
        detail: "Kworb + oEmbed art",
        tone: "cyan",
        x: 210,
        y: 185,
      },
      {
        id: "youtube-source",
        label: "YouTube ranking collector",
        detail: "Kworb + thumbnails",
        tone: "amber",
        x: 790,
        y: 185,
      },
      {
        id: "spotify-snapshot",
        label: "KworbSnapshot",
        detail: "date-keyed streams",
        tone: "green",
        x: 210,
        y: 345,
      },
      {
        id: "youtube-snapshot",
        label: "YouTubeKworbSnapshot",
        detail: "date-keyed views",
        tone: "green",
        x: 790,
        y: 345,
      },
      {
        id: "analytics-route",
        label: "Analytics routes",
        detail: "latest · history · compare",
        tone: "purple",
        x: 500,
        y: 350,
      },
      {
        id: "surfaces",
        label: "Charts & discovery",
        detail: "/spotify · /youtube",
        tone: "cyan",
        x: 500,
        y: 455,
      },
    ],
    edges: [
      { from: "cron", to: "spotify-source", label: "01:30" },
      { from: "cron", to: "youtube-source", label: "01:35" },
      { from: "spotify-source", to: "spotify-snapshot" },
      { from: "youtube-source", to: "youtube-snapshot" },
      { from: "spotify-snapshot", to: "analytics-route" },
      { from: "youtube-snapshot", to: "analytics-route" },
      { from: "analytics-route", to: "surfaces" },
    ],
  },
  {
    id: "quest-verification",
    group: "Game",
    title: "Quest verification & rewards",
    summary:
      "Scheduled quest definitions and live quiz or Last.fm activity converge on persisted progress before one-time reward claims.",
    source:
      "Quest cron routes, Last.fm verification route, UserQuestProgress and reward models",
    engineeringNotes: [
      "Streaming checks use fuzzy track matching, period baselines, and 15-minute cached Last.fm responses.",
      "Claim paths validate completion and claimed state before issuing XP, stardust, cards, or badge progress.",
    ],
    support: {
      requestPath: [
        [
          "Create active quests",
          "Daily and weekly cron routes write current quest definitions and expiration windows.",
        ],
        [
          "Capture activity",
          "Quiz completion or Last.fm scrobbles provide countable progress signals.",
        ],
        [
          "Verify streaming",
          "Last.fm verification applies fuzzy matching and the quest-period baseline.",
        ],
        [
          "Persist progress",
          "UserQuestProgress records completion state before the claim path is available.",
        ],
        [
          "Claim rewards",
          "The claim route rejects duplicate claims before XP, stardust, cards, or badge progress are issued.",
        ],
      ],
      modules: [
        ["Quest scheduler", "daily and weekly definitions", "purple"],
        ["Quiz signals", "session completion and scores", "cyan"],
        ["Streaming verifier", "Last.fm scrobbles and fuzzy match", "amber"],
        ["Reward state", "progress, XP, cards, badges", "green"],
      ],
      decisions: [
        [
          "Period baselines",
          "Streaming progress is calculated from the quest start rather than a user’s all-time listening.",
        ],
        [
          "Cached verification",
          "Last.fm responses use a 15-minute cache to control repeated provider calls.",
        ],
        [
          "Claim guard",
          "Completion and claimed state are both checked before rewards are created.",
        ],
      ],
      safeguards: [
        "15-minute streaming cache",
        "Last.fm token bucket",
        "Fuzzy track matching",
        "Quest expiration windows",
        "Duplicate-claim checks",
        "Persisted reward ledger",
      ],
      operationalPath: [
        "Quest cron",
        "Quiz / Last.fm",
        "Progress verification",
        "Claim validation",
        "Rewards",
      ],
    },
    nodes: [
      {
        id: "quest-cron",
        label: "Daily / weekly cron",
        detail: "generate quest definitions",
        tone: "purple",
        x: 170,
        y: 75,
      },
      {
        id: "definitions",
        label: "Quest definitions",
        detail: "active daily & weekly goals",
        tone: "green",
        x: 250,
        y: 220,
      },
      {
        id: "quiz",
        label: "Quiz completion",
        detail: "10-question sessions",
        tone: "cyan",
        x: 475,
        y: 120,
      },
      {
        id: "lastfm",
        label: "Last.fm verification",
        detail: "scrobbles · fuzzy match",
        tone: "amber",
        x: 760,
        y: 120,
      },
      {
        id: "progress",
        label: "UserQuestProgress",
        detail: "baseline · completion state",
        tone: "purple",
        x: 500,
        y: 310,
      },
      {
        id: "claim",
        label: "Claim validation",
        detail: "completed and unclaimed",
        tone: "cyan",
        x: 500,
        y: 420,
      },
      {
        id: "rewards",
        label: "Reward ledgers",
        detail: "XP · stardust · cards · badges",
        tone: "green",
        x: 780,
        y: 420,
      },
    ],
    edges: [
      { from: "quest-cron", to: "definitions" },
      { from: "definitions", to: "progress" },
      { from: "quiz", to: "progress" },
      { from: "lastfm", to: "progress" },
      { from: "progress", to: "claim" },
      { from: "claim", to: "rewards" },
    ],
  },
  {
    id: "spotify-connection-export",
    group: "Music",
    title: "Spotify connection & playlist export",
    summary:
      "Manual and AI playlists cross a signed OAuth boundary before user-owned or fallback credentials create a private Spotify playlist in API-safe batches.",
    source:
      "Spotify auth-url, callback, client-credentials, status, and playlist export routes",
    engineeringNotes: [
      "Authorization state is HMAC-signed and expires after five minutes before a callback code exchange is accepted.",
      "BYO Spotify credentials are encrypted at rest; export prefers a valid user token and uses a configured fallback only when explicitly allowed.",
    ],
    support: {
      requestPath: [
        [
          "Choose connection mode",
          "A signed-in fan connects the platform app or completes a BYO credential flow.",
        ],
        [
          "Create signed state",
          "The auth route binds user identity, nonce, and timestamp before redirecting to Spotify.",
        ],
        [
          "Exchange callback code",
          "The callback validates state, exchanges the code, fetches the Spotify profile, and persists the integration.",
        ],
        [
          "Resolve export authority",
          "Export prefers a valid user token and only uses the configured owner account when fallback is allowed.",
        ],
        [
          "Create and fill playlist",
          "Spotify creates a private playlist; resolved track URIs are added in batches of at most 100.",
        ],
      ],
      modules: [
        ["OAuth state", "signed redirect state and expiry", "purple"],
        ["Spotify callback", "code exchange and profile lookup", "cyan"],
        ["User integration", "encrypted tokens and connection state", "green"],
        ["Playlist exporter", "private playlist creation and batches", "amber"],
      ],
      decisions: [
        [
          "Signed redirect state",
          "The callback receives a user-bound HMAC-protected value rather than trusting a client-supplied identifier.",
        ],
        [
          "User-first authority",
          "A fan’s valid Spotify token is used first; platform-owner export is a deliberate fallback.",
        ],
        [
          "Chunked writes",
          "Track additions are split into 100-item requests to respect Spotify playlist API limits.",
        ],
      ],
      safeguards: [
        "Protected connection route",
        "HMAC state validation",
        "Five-minute state expiry",
        "Encrypted BYO credentials",
        "Token validity diagnostics",
        "100-track write batches",
      ],
      operationalPath: [
        "Connect Spotify",
        "Signed state",
        "Callback exchange",
        "Stored integration",
        "Playlist export",
      ],
    },
    nodes: [
      {
        id: "author",
        label: "Playlist author",
        detail: "manual or AI-selected tracks",
        tone: "purple",
        x: 105,
        y: 105,
      },
      {
        id: "auth-url",
        label: "Auth URL route",
        detail: "signed state · nonce · TTL",
        tone: "cyan",
        x: 315,
        y: 105,
      },
      {
        id: "spotify-auth",
        label: "Spotify authorization",
        detail: "consent · authorization code",
        tone: "amber",
        x: 555,
        y: 105,
      },
      {
        id: "callback",
        label: "OAuth callback",
        detail: "validate state · exchange code",
        tone: "purple",
        x: 555,
        y: 270,
      },
      {
        id: "integration",
        label: "User integration",
        detail: "encrypted token · BYO or app",
        tone: "green",
        x: 330,
        y: 395,
      },
      {
        id: "export",
        label: "Playlist export route",
        detail: "user token · allowed fallback",
        tone: "cyan",
        x: 760,
        y: 330,
      },
      {
        id: "spotify-playlist",
        label: "Spotify playlist",
        detail: "private · 100-track batches",
        tone: "amber",
        x: 900,
        y: 450,
      },
    ],
    edges: [
      { from: "author", to: "auth-url", label: "connect" },
      { from: "auth-url", to: "spotify-auth" },
      { from: "spotify-auth", to: "callback", label: "code + state" },
      { from: "callback", to: "integration" },
      { from: "author", to: "export", label: "export selection" },
      { from: "integration", to: "export", label: "authority" },
      { from: "export", to: "spotify-playlist" },
    ],
  },
  {
    id: "boraverse-reward-loop",
    group: "Game",
    title: "Boraverse quiz, collection & progression loop",
    summary:
      "Ranked quiz completion branches into score-gated inventory rewards while the same result advances mastery, quests, streaks, and multi-period leaderboards.",
    source:
      "Quiz, inventory, photocard, mastery, quest, leaderboard, craft, and share routes",
    engineeringNotes: [
      "Ranked sessions persist for 20 minutes; public practice uses a guest session while demo mode avoids database writes.",
      "A duplicate photocard becomes Dust, but every grant retains an inventory audit record with its originating reason.",
    ],
    support: {
      requestPath: [
        [
          "Start the right mode",
          "Players start ranked or quest mode; practice and demo are separate public entry paths with different persistence behavior.",
        ],
        [
          "Serve a timed session",
          "Question selection creates a 20-minute ranked session and never exposes the correct answer index to the client.",
        ],
        [
          "Score and gate reward",
          "Completion verifies the session, awards XP, and samples a random photocard only when the score threshold is met.",
        ],
        [
          "Record lasting state",
          "Inventory, grant audit, Dust conversion, mastery progress, and quest counters are written from the completion result.",
        ],
        [
          "Surface progression",
          "Crafting, claims, sharing, and daily, weekly, or all-time leaderboards read persisted player state.",
        ],
      ],
      modules: [
        ["Quiz sessions", "ranked, quest, practice, and demo modes", "purple"],
        [
          "Reward resolver",
          "score, XP threshold, and random card sample",
          "cyan",
        ],
        [
          "Inventory ledger",
          "card ownership, duplicate Dust, grant audit",
          "green",
        ],
        [
          "Progression state",
          "mastery, quests, streaks, and rankings",
          "amber",
        ],
      ],
      decisions: [
        [
          "Mode-specific persistence",
          "Public practice creates an expiring guest session, while demo mode returns questions without writing a session.",
        ],
        [
          "Audit before celebration",
          "A photocard award is recorded with its source before the client renders the result state.",
        ],
        [
          "Shared reward signals",
          "One quiz completion advances several durable systems instead of disconnected UI counters.",
        ],
      ],
      safeguards: [
        "20-minute session expiry",
        "Server-side answer validation",
        "Duplicate submission protection",
        "XP reward threshold",
        "Inventory grant audit",
        "Idempotent mastery claims",
      ],
      operationalPath: [
        "Quiz mode",
        "Timed session",
        "Completion score",
        "Rewards + state",
        "Collection progress",
      ],
    },
    nodes: [
      {
        id: "mode",
        label: "Quiz mode",
        detail: "ranked · quest · practice · demo",
        tone: "purple",
        x: 115,
        y: 106,
      },
      {
        id: "session",
        label: "Question session",
        detail: "10 questions · 20 minute TTL",
        tone: "cyan",
        x: 340,
        y: 106,
      },
      {
        id: "score",
        label: "Completion scorer",
        detail: "answers · XP · threshold",
        tone: "purple",
        x: 540,
        y: 205,
      },
      {
        id: "inventory",
        label: "Inventory & audit",
        detail: "card or duplicate Dust",
        tone: "green",
        x: 315,
        y: 355,
      },
      {
        id: "game-state",
        label: "Player game state",
        detail: "XP · level · streak",
        tone: "green",
        x: 585,
        y: 355,
      },
      {
        id: "progression",
        label: "Progression services",
        detail: "mastery · quests · badges",
        tone: "amber",
        x: 815,
        y: 285,
      },
      {
        id: "leaderboard",
        label: "Leaderboard entries",
        detail: "daily · weekly · all-time",
        tone: "cyan",
        x: 820,
        y: 450,
      },
    ],
    edges: [
      { from: "mode", to: "session" },
      { from: "session", to: "score" },
      { from: "score", to: "inventory", label: "card / Dust" },
      { from: "score", to: "game-state", label: "XP" },
      { from: "score", to: "progression", label: "quest signal" },
      { from: "game-state", to: "progression" },
      { from: "game-state", to: "leaderboard" },
      { from: "progression", to: "leaderboard", label: "earned XP" },
    ],
  },
  {
    id: "borarush-handoff",
    group: "Game",
    title: "BoraRush secure reward handoff",
    summary:
      "A short-lived, audience-bound handoff lets the external solo-run game request one verifiable Armyverse reward without receiving an application session.",
    source:
      "BoraRush handoff and completion routes, GAME_HANDOFF_SECRET, BoraRushRun, and BoraRushDailyLimit",
    engineeringNotes: [
      "The JWT is issued by ARMYVERSE for the BoraRush audience and expires after two hours.",
      "Run IDs are idempotent; cap reservations roll back if a downstream reward write fails before it is applied.",
    ],
    support: {
      requestPath: [
        [
          "Issue handoff",
          "An authenticated ARMYVERSE user receives a signed token containing only the identity needed by BoraRush.",
        ],
        [
          "Finish a solo run",
          "The external game sends run ID, turns, and winner metadata to the completion route.",
        ],
        [
          "Verify and deduplicate",
          "ARMYVERSE checks the bearer token audience and issuer, then rejects another identity’s run or returns its earlier result.",
        ],
        [
          "Reserve daily capacity",
          "Separate UTC counters reserve one of two XP awards and one of ten card awards before reward writes proceed.",
        ],
        [
          "Commit run result",
          "Turn-tier XP, inventory or duplicate Dust, audit record, and BoraRushRun are persisted as a replay-safe result.",
        ],
      ],
      modules: [
        ["Handoff issuer", "two-hour JWT with audience and issuer", "purple"],
        ["External BoraRush", "solo Snake and Ladder run result", "amber"],
        [
          "Completion guard",
          "token verification and run-ID idempotency",
          "cyan",
        ],
        [
          "Reward persistence",
          "caps, balances, inventory, audit, run history",
          "green",
        ],
      ],
      decisions: [
        [
          "Audience-bound token",
          "The external game receives a short-lived BoraRush token, not an unrestricted ARMYVERSE credential.",
        ],
        [
          "Independent caps",
          "XP and photocard limits are tracked separately so an XP cap does not erase the card reward policy.",
        ],
        [
          "Replay-safe result",
          "A repeated run ID returns its recorded reward instead of creating a second inventory grant or XP balance change.",
        ],
      ],
      safeguards: [
        "Two-hour token TTL",
        "Issuer and audience validation",
        "Allowed-origin CORS policy",
        "Solo-run-only XP",
        "Run-ID idempotency",
        "Rollback for uncommitted cap reservations",
      ],
      operationalPath: [
        "Handoff token",
        "External solo run",
        "Completion guard",
        "Daily cap reserve",
        "Audited reward",
      ],
    },
    nodes: [
      {
        id: "army-user",
        label: "Armyverse player",
        detail: "authenticated account",
        tone: "purple",
        x: 105,
        y: 105,
      },
      {
        id: "issuer",
        label: "Handoff issuer",
        detail: "2-hour signed JWT",
        tone: "cyan",
        x: 300,
        y: 105,
      },
      {
        id: "borarush",
        label: "BoraRush game",
        detail: "external solo run",
        tone: "amber",
        x: 515,
        y: 105,
      },
      {
        id: "verify",
        label: "Completion guard",
        detail: "verify token · run ID",
        tone: "purple",
        x: 515,
        y: 270,
      },
      {
        id: "caps",
        label: "UTC cap ledger",
        detail: "2 XP · 10 cards",
        tone: "green",
        x: 320,
        y: 405,
      },
      {
        id: "reward",
        label: "Reward writes",
        detail: "XP · inventory · Dust",
        tone: "cyan",
        x: 705,
        y: 390,
      },
      {
        id: "run",
        label: "BoraRushRun audit",
        detail: "replay-safe result",
        tone: "green",
        x: 890,
        y: 455,
      },
    ],
    edges: [
      { from: "army-user", to: "issuer" },
      { from: "issuer", to: "borarush", label: "handoff" },
      { from: "borarush", to: "verify", label: "run result" },
      { from: "verify", to: "caps" },
      { from: "verify", to: "reward", label: "accepted run" },
      { from: "caps", to: "reward", label: "capacity" },
      { from: "reward", to: "run" },
    ],
  },
  {
    id: "community-publishing-flow",
    group: "Community",
    title: "Community publishing & discovery",
    summary:
      "Structured Tiptap content and Cloudinary media pass through author-owned publishing rules before searchable discovery and reader interactions enrich the post state.",
    source:
      "Blog, comments, reactions, saves, collections, SEO-score, upload, and top-writers routes",
    engineeringNotes: [
      "Posts retain structured Tiptap JSON, preserving rich rendering and avoiding a lossy plain-text editor state.",
      "Public reads apply visibility filters; edits, restore, and destructive actions remain tied to author ownership.",
    ],
    support: {
      requestPath: [
        [
          "Compose a draft",
          "The author starts from a template or blank Tiptap document and supplies title, metadata, visibility, and optional collection context.",
        ],
        [
          "Upload media",
          "Cover and inline media go through the upload route to Cloudinary, returning durable URLs for the editor document.",
        ],
        [
          "Validate and publish",
          "The blog route applies ownership and content validation, persists structured content, and keeps removed posts soft-deleted for recovery.",
        ],
        [
          "Discover within policy",
          "Search, filters, featured ranking, and top-writer views read only content visible to the requesting visitor.",
        ],
        [
          "Record reader activity",
          "Reactions, nested comments, saves, and collection additions update the post ecosystem without weakening author control.",
        ],
      ],
      modules: [
        [
          "Tiptap authoring",
          "structured document, templates, metadata",
          "purple",
        ],
        ["Cloudinary media", "cover and inline asset upload", "amber"],
        ["Blog domain", "ownership, visibility, posts, and restore", "cyan"],
        ["Discovery signals", "search, reactions, saves, collections", "green"],
      ],
      decisions: [
        [
          "Structured content storage",
          "Tiptap JSON retains rich-text semantics for rendering, editing, and future export.",
        ],
        [
          "Visibility before discovery",
          "Search and ranking are downstream of public, unlisted, and private visibility checks.",
        ],
        [
          "Recoverable deletion",
          "Soft deletion keeps an author recovery path while removing the post from normal public results.",
        ],
      ],
      safeguards: [
        "Author ownership checks",
        "Visibility-aware reads",
        "Cloudinary server configuration",
        "Soft-delete and restore",
        "Bounded nested comments",
        "Validated SEO scoring",
      ],
      operationalPath: [
        "Compose",
        "Upload media",
        "Publish rules",
        "Discover",
        "Interact",
      ],
    },
    nodes: [
      {
        id: "author",
        label: "Author workspace",
        detail: "Tiptap · templates · metadata",
        tone: "purple",
        x: 130,
        y: 110,
      },
      {
        id: "media",
        label: "Cloudinary upload",
        detail: "cover and inline assets",
        tone: "amber",
        x: 330,
        y: 105,
      },
      {
        id: "publish",
        label: "Blog route",
        detail: "ownership · visibility · JSON",
        tone: "cyan",
        x: 540,
        y: 190,
      },
      {
        id: "posts",
        label: "Blog & collection state",
        detail: "posts · metadata · soft delete",
        tone: "green",
        x: 540,
        y: 370,
      },
      {
        id: "discovery",
        label: "Discovery routes",
        detail: "search · filters · top writers",
        tone: "purple",
        x: 790,
        y: 165,
      },
      {
        id: "readers",
        label: "Reader interactions",
        detail: "reactions · comments · saves",
        tone: "amber",
        x: 805,
        y: 360,
      },
      {
        id: "signals",
        label: "Post signals",
        detail: "views · engagement · collections",
        tone: "cyan",
        x: 920,
        y: 455,
      },
    ],
    edges: [
      { from: "author", to: "media", label: "assets" },
      { from: "author", to: "publish", label: "document" },
      { from: "media", to: "publish", label: "URLs" },
      { from: "publish", to: "posts" },
      { from: "posts", to: "discovery" },
      { from: "discovery", to: "readers" },
      { from: "readers", to: "signals" },
      { from: "signals", to: "posts", label: "engagement" },
    ],
  },
  {
    id: "identity-profile-lifecycle",
    group: "Platform",
    title: "Identity, profile & account controls",
    summary:
      "Password and Firebase identities converge at one verifier, then unlock profile media, connected service settings, export, and controlled account removal.",
    source:
      "Auth, profile, integrations, upload, export-data, and delete-account routes",
    engineeringNotes: [
      "The server verifier resolves JWT/password and Firebase credentials to the same application-user shape before protected routes execute.",
      "Account export explicitly removes passwords, reset tokens, and Spotify access or refresh tokens from the downloaded JSON.",
    ],
    support: {
      requestPath: [
        [
          "Create or choose identity",
          "A user signs up with a username/password account or presents a Firebase social token.",
        ],
        [
          "Resolve at the API boundary",
          "verifyAuth identifies the credential format and finds or creates the associated MongoDB user without exposing auth branching to domain routes.",
        ],
        [
          "Manage profile and connections",
          "Protected profile and integration routes validate public identity fields, preferences, and connected-service usernames.",
        ],
        [
          "Attach media safely",
          "Avatar and banner files are uploaded through the server route, then stored as profile media references.",
        ],
        [
          "Control personal data",
          "A user can download a sanitized account export or invoke the authenticated deletion route.",
        ],
      ],
      modules: [
        [
          "Credential inputs",
          "password/JWT and Firebase social identity",
          "purple",
        ],
        [
          "Unified verifier",
          "credential detection and user resolution",
          "cyan",
        ],
        [
          "Profile domain",
          "handle, preferences, privacy, integrations",
          "green",
        ],
        ["Account controls", "media, sanitized export, deletion", "amber"],
      ],
      decisions: [
        [
          "One protected-route contract",
          "Feature routes consume one resolved user shape rather than separately implementing JWT and Firebase verification.",
        ],
        [
          "Sanitized portability",
          "Account export is useful to the fan without leaking passwords, password-reset state, or Spotify secrets.",
        ],
        [
          "Server-owned media path",
          "Client files pass through the upload route so Cloudinary configuration and output shaping stay outside browser code.",
        ],
      ],
      safeguards: [
        "Bcrypt password hashing",
        "JWT and Firebase validation",
        "Protected profile routes",
        "Unique public-handle checks",
        "Sanitized account export",
        "Authenticated deletion request",
      ],
      operationalPath: [
        "Credential",
        "verifyAuth",
        "Resolved user",
        "Profile controls",
        "Data control",
      ],
    },
    nodes: [
      {
        id: "password",
        label: "Password account",
        detail: "username · bcrypt · JWT",
        tone: "purple",
        x: 145,
        y: 105,
      },
      {
        id: "firebase",
        label: "Firebase social sign-in",
        detail: "Google or Twitter token",
        tone: "amber",
        x: 145,
        y: 285,
      },
      {
        id: "verify",
        label: "verifyAuth boundary",
        detail: "detect · validate · resolve",
        tone: "cyan",
        x: 390,
        y: 195,
      },
      {
        id: "user",
        label: "Application user",
        detail: "MongoDB profile identity",
        tone: "green",
        x: 600,
        y: 195,
      },
      {
        id: "profile",
        label: "Profile & integrations",
        detail: "settings · services · privacy",
        tone: "purple",
        x: 800,
        y: 105,
      },
      {
        id: "media",
        label: "Profile media",
        detail: "Cloudinary avatar and banner",
        tone: "amber",
        x: 800,
        y: 285,
      },
      {
        id: "controls",
        label: "Data controls",
        detail: "sanitized export · deletion",
        tone: "cyan",
        x: 600,
        y: 420,
      },
    ],
    edges: [
      { from: "password", to: "verify" },
      { from: "firebase", to: "verify" },
      { from: "verify", to: "user" },
      { from: "user", to: "profile" },
      { from: "user", to: "media" },
      { from: "profile", to: "media", label: "asset reference" },
      { from: "user", to: "controls" },
    ],
  },
];
