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
  group: "Platform" | "Music" | "Data" | "Game";
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
];
