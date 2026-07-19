import type { ArmyverseFeature } from "./types";

export const armyverseFeatures: ArmyverseFeature[] = [
  {
    id: "ai-playlist-architect",
    title: "AI Playlist Architect",
    category: "Music",
    summary:
      "Parameterized BTS playlist generation with refinement and comparison.",
    description:
      "A guided playlist builder that turns a fan’s prompt, mood, member and era preferences, seed tracks, audio targets, genre mix, and listening context into a BTS-focused playlist. Users can start from templates or a personality quiz, save configurations, evolve a result, compare variations, and take the final selection to Spotify.",
    capabilities: [
      "15+ generation controls, including mood, era, bias, audio features, and flow pattern",
      "Seed-track selection from the local BTS catalogue",
      "Templates, personality quiz, saved configurations, and inspiration prompts",
      "Playlist evolution and side-by-side comparison before export",
      "Groq Llama 3.3 70B generation with database lookup and Spotify enrichment",
    ],
    workflow: {
      title: "Generation and refinement path",
      nodes: [
        "Configure prompt and controls",
        "POST enhanced generation request",
        "Groq proposes track sequence",
        "Match against MongoDB catalogue",
        "Enrich unresolved tracks with Spotify",
        "Return playlist · evolve · compare · export",
      ],
    },
    engineeringNotes: [
      "Heavy comparison, quiz, and template UI is loaded on demand to keep the authoring surface responsive.",
      "Track matching uses the local catalogue first; Spotify is a fallback rather than the only source of truth.",
      "Export is deliberately optional—generation remains useful when a Spotify connection is unavailable.",
    ],
  },
  {
    id: "playlist-creation-export",
    title: "Manual playlists & Spotify export",
    category: "Music",
    summary:
      "Hands-on track curation with OAuth and user-owned Spotify credentials.",
    description:
      "Fans can create a playlist directly from the BTS track catalogue, search and reorder tracks, preview audio, and export the finished collection to Spotify. The integration supports both a platform-owner fallback and BYO Spotify application credentials, so a connected user can export into their own Spotify account.",
    capabilities: [
      "Catalogue search, drag-and-drop ordering, and live preview",
      "Spotify OAuth connection and connection-status checks",
      "Per-user Spotify app credentials alongside an owner fallback",
      "Encrypted token storage with AES-256-GCM and user-specific keys",
      "Export batching for large playlists to respect Spotify’s track-add limits",
    ],
    workflow: {
      title: "Curate, authorize, and export",
      nodes: [
        "Select and order catalogue tracks",
        "Save playlist draft",
        "Resolve Spotify connection mode",
        "Authorize with Spotify OAuth",
        "Create Spotify playlist",
        "Add tracks in API-safe batches",
      ],
    },
    engineeringNotes: [
      "The export route batches additions in groups of 100, addressing Spotify’s request limit for long playlists.",
      "OAuth callbacks resolve the database user by stable identity rather than treating a username as an email address.",
      "The local catalogue retains a working creation experience without sending every search to Spotify.",
    ],
  },
  {
    id: "listening-intelligence",
    title: "Listening intelligence dashboard",
    category: "Data",
    summary:
      "Public Last.fm and Stats.fm history translated into BTS-specific listening insights.",
    description:
      "The stats workspace accepts a public username instead of requiring an ARMYVERSE account. It retrieves listening history from Last.fm or Stats.fm, identifies BTS-related artists and tracks, derives member and era distribution, then presents top artists, recent activity, timelines, and a BTS listening profile in a responsive bento dashboard.",
    capabilities: [
      "Username-based access to public listening profiles",
      "Top artists, top tracks, recent activity, and listening timeline",
      "BTS member, group-versus-solo, and era analysis",
      "Provider selection between Last.fm and Stats.fm",
      "Rate-limited external fetches with a 15-minute cache",
    ],
    workflow: {
      title: "Listening profile analysis",
      nodes: [
        "Enter public username",
        "Choose Last.fm or Stats.fm",
        "Fetch profile, artists, tracks, and recents",
        "Classify BTS artists and songs",
        "Calculate member and era signals",
        "Render the personal dashboard",
      ],
    },
    engineeringNotes: [
      "A token-bucket limiter caps Last.fm traffic at five requests per second.",
      "The aggregation is kept server-side so provider response shapes do not leak into presentation components.",
      "Caching reduces repeated public-profile requests while preserving an understandable freshness window.",
    ],
  },
  {
    id: "global-streaming-analytics",
    title: "Spotify global streaming analytics",
    category: "Data",
    summary: "Historical global stream snapshots for BTS and each member.",
    description:
      "The Spotify analytics page turns daily Kworb source pages into an explorable BTS streaming archive. It tracks songs, albums, global daily Top 200 entries, artist ranks, monthly listeners, daily gains, and historical comparisons across the group and solo members.",
    capabilities: [
      "Daily snapshots for BTS plus eight related artist pages",
      "Songs, albums, rank, listener, and daily-gain views",
      "Historical comparison backed by dated MongoDB snapshots",
      "Spotify metadata enrichment for album art and artist context",
      "Artist and member filters across group and solo releases",
    ],
    workflow: {
      title: "Daily Spotify snapshot pipeline",
      nodes: [
        "1:30 UTC cron trigger",
        "Fetch Kworb source pages",
        "Parse ranking tables with Cheerio",
        "Normalize stream metrics",
        "Enrich display metadata",
        "Persist date-keyed MongoDB snapshot",
      ],
    },
    engineeringNotes: [
      "Snapshots are append-oriented by date key, making comparisons explicit instead of overwriting prior chart positions.",
      "The ingestion path uses fault-tolerant parallel work so one source failure does not discard the complete refresh.",
      "User-facing routes read from stored snapshots instead of scraping synchronously during page loads.",
    ],
  },
  {
    id: "youtube-video-analytics",
    title: "YouTube video analytics",
    category: "Data",
    summary:
      "Daily-ranked BTS video data with drill-down performance histories.",
    description:
      "The YouTube analytics workspace provides member-filtered video rankings, total views, daily gains, and detailed video inspection. It stores daily Kworb snapshots and caches individual-video detail so fans can inspect milestones, chart performance, and daily, monthly, or yearly view trends without repeatedly scraping the source.",
    capabilities: [
      "BTS and seven-member filtering with Korean and stage-name keyword handling",
      "Ranked list with thumbnails, publish dates, lifetime views, and daily movement",
      "Video detail modal with milestones and chart history",
      "Daily, monthly, and yearly view-series visualizations",
      "24-hour detail cache layered over daily collection snapshots",
    ],
    workflow: {
      title: "Collect and inspect video performance",
      nodes: [
        "1:35 UTC cron trigger",
        "Retrieve Kworb video page",
        "Classify BTS and solo-member videos",
        "Store daily snapshot",
        "Request selected video detail",
        "Cache detail for 24 hours",
      ],
    },
    engineeringNotes: [
      "Member matching treats short names such as V and RM as special cases to avoid broad substring false positives.",
      "Video detail is fetched only when requested; list pages stay backed by the daily snapshot.",
      "The route exposes a refresh option for a stale detail record without invalidating the full archive.",
    ],
  },
  {
    id: "trending-content",
    title: "Trending content pipeline",
    category: "Data",
    summary: "One discovery surface for Spotify streams and YouTube views.",
    description:
      "Trending content unifies Spotify and YouTube rankings into a member-aware discovery component used across the product. Fans can switch between OT7 and solo artists while the server resolves current rankings from daily cached snapshots rather than external providers on every visit.",
    capabilities: [
      "Spotify stream and YouTube view rankings in one discovery surface",
      "OT7-versus-solo switch and seven-member selector",
      "Daily scheduled refreshes and source-specific parsers",
      "30-second response caching with stale-while-revalidate headers",
      "Cached MongoDB reads for predictable page response time",
    ],
    workflow: {
      title: "From external ranking to discovery card",
      nodes: [
        "Daily platform cron jobs",
        "Scrape and normalize source rows",
        "Write Spotify and YouTube snapshots",
        "GET trending with platform and member filters",
        "Read latest cached snapshot",
        "Render ranked discovery grid",
      ],
    },
    engineeringNotes: [
      "Spotify and YouTube ingestion are separated because their page structures and enrichment needs differ.",
      "The API layer returns a normalized representation, which keeps the client component independent of source-specific fields.",
      "Cron access is guarded in production with a shared secret and can be explicitly relaxed for local development.",
    ],
  },
  {
    id: "boraverse-quiz-collection",
    title: "Boraverse quiz & photocard collection",
    category: "Game",
    summary:
      "Timed knowledge sessions that drive an auditable collection loop.",
    description:
      "Boraverse turns BTS knowledge into a persistent collection experience. A timed ten-question quiz samples a large question bank across history, discography, members, lyrics, and variety; score gates a random photocard drop, while the collection view shows catalogue progress, filters, and missing-card placeholders.",
    capabilities: [
      "Ten-question sessions with difficulty-weighted XP",
      "20-minute session expiry and two free quiz attempts per UTC day",
      "XP-gated random photocard drops from a Fandom-derived catalogue",
      "Inventory history and source auditing for every awarded item",
      "Collection progress by category and subcategory",
    ],
    workflow: {
      title: "Quiz completion and card award",
      nodes: [
        "Start quiz session",
        "Select ten eligible questions",
        "Answer before session expiry",
        "Score response set",
        "Check XP reward threshold",
        "Grant auditable photocard or return result",
      ],
    },
    engineeringNotes: [
      "Quiz sessions use expiry-aware storage so incomplete sessions can be cleaned up automatically.",
      "A card is only awarded at the documented XP threshold; a low score does not silently generate a drop.",
      "Inventory grant audits preserve the reason and source of awards, including quiz, quest, crafting, and mastery paths.",
    ],
  },
  {
    id: "boraverse-progression",
    title: "Boraverse progression economy",
    category: "Game",
    summary:
      "Crafting, mastery, quests, streaks, badges, and competitive leaderboards.",
    description:
      "The progression layer gives the collection system long-term structure. Players earn XP and Stardust through quizzes and verified daily or weekly quests, convert duplicates into currency, craft specific or random cards, claim member and era mastery rewards, build streaks, unlock badges, and compare cumulative XP on daily, weekly, and all-time leaderboards.",
    capabilities: [
      "Duplicate-to-Stardust conversion and specific or random crafting",
      "Member, OT7, and era mastery with level and milestone reward ledgers",
      "Daily and weekly song, album, and quiz quests",
      "Last.fm streaming verification with fuzzy matching and period baselines",
      "Daily, ISO-weekly, and all-time leaderboards with cursor pagination",
    ],
    workflow: {
      title: "Verified activity to lasting progression",
      nodes: [
        "Complete quiz or connect Last.fm",
        "Verify quest targets and progress",
        "Award XP, Stardust, and tickets",
        "Update mastery and claim ledger",
        "Refresh streak and badge state",
        "Accumulate daily, weekly, and all-time ranks",
      ],
    },
    engineeringNotes: [
      "Streaming progress is monotonic: a partial Last.fm response cannot regress an already verified daily or weekly total.",
      "Mastery claims use a reward ledger to prevent duplicate reward grants when a user retries a request.",
      "Leaderboard scores accumulate earned XP for a period; they are not a snapshot of a player’s highest level.",
    ],
  },
  {
    id: "community-publishing",
    title: "Community publishing platform",
    category: "Community",
    summary:
      "Rich-text BTS writing with discovery, reactions, saves, and collections.",
    description:
      "ARMYVERSE includes a community publishing surface for reviews, theories, news, and personal writing. Authors compose in a Tiptap editor, upload media to Cloudinary, control visibility, and organize posts into collections. Readers can search, filter, react, comment in threads, save posts, and discover content through featured and trending views.",
    capabilities: [
      "Tiptap editor with formatting, tables, code blocks, images, embeds, mentions, and task lists",
      "Cloudinary-backed cover image and inline media uploads",
      "Public, unlisted, and private post visibility plus soft delete and restore",
      "Full-text search, tag, mood, author, language, date, and sort filters",
      "Reactions, nested comments, saves, view tracking, and SEO scoring",
    ],
    workflow: {
      title: "Compose, publish, and discover",
      nodes: [
        "Draft in Tiptap editor",
        "Upload media to Cloudinary",
        "Validate and save post JSON",
        "Set visibility and publish",
        "Index for search and discovery",
        "Collect reactions, comments, and saves",
      ],
    },
    engineeringNotes: [
      "Editor content is stored as structured Tiptap JSON, preserving rendering fidelity instead of flattening authoring state to plain text.",
      "Soft deletion retains recovery and author history while excluding removed posts from public listings.",
      "The API enforces author ownership for edits and destructive operations; public discovery applies visibility rules before returning data.",
    ],
  },
  {
    id: "identity-profiles",
    title: "Identity, profiles & integrations",
    category: "Platform",
    summary:
      "Dual authentication, fan identity controls, and personalized settings.",
    description:
      "The platform supports both privacy-first username/password registration and Firebase social sign-in. A unified server verifier resolves either credential type into the same application user. The profile experience layers ARMY-specific identity fields, media, theme personalization, privacy preferences, notifications, connected services, and data export on top of that account model.",
    capabilities: [
      "Username/password accounts with optional email and bcrypt hashing",
      "Google and Twitter social sign-in through Firebase",
      "Unified server-side JWT and Firebase token verification",
      "Five-tab profile editor with live preview and Cloudinary avatar/banner uploads",
      "Privacy, notification, integrations, account deletion, and data export controls",
    ],
    workflow: {
      title: "Authenticate and resolve a platform user",
      nodes: [
        "Sign in with password or social provider",
        "Issue JWT or receive Firebase ID token",
        "Attach bearer token to API request",
        "verifyAuth detects credential type",
        "Resolve MongoDB user identity",
        "Apply authenticated feature policy",
      ],
    },
    engineeringNotes: [
      "One verification path removes the need for every API route to understand both token formats.",
      "Sign-in rate limiting is applied per IP, while passwords are hashed with bcrypt before persistence.",
      "Profile updates are partial and validate uniqueness-sensitive fields such as the public handle on the server.",
    ],
  },
  {
    id: "product-onboarding",
    title: "Landing, onboarding & mobile guidance",
    category: "Platform",
    summary: "Responsive product entry points and task-specific guided tours.",
    description:
      "ARMYVERSE uses a feature-led homepage and a dedicated Boraverse landing experience to make a wide product understandable at first visit. Once inside focused music workflows, contextual guided tours explain streaming mode, manual playlist creation, and AI playlist authoring without forcing a reload or resetting active user state.",
    capabilities: [
      "Responsive homepage that introduces six core product areas",
      "Dedicated Boraverse landing path with live photocard preview",
      "Guided tours for streaming, manual creation, and AI playlist authoring",
      "Mobile bottom-sheet tour treatment with safe-zone scrolling",
      "Restartable tours that preserve the current workspace state",
    ],
    workflow: {
      title: "Contextual feature onboarding",
      nodes: [
        "Open a product surface",
        "Read persisted tour state",
        "Load matching tour script",
        "Highlight current control",
        "Scroll focused element into safe zone",
        "Persist progress or restart in place",
      ],
    },
    engineeringNotes: [
      "Tour restarts communicate with the active instance directly, avoiding a page reload that would discard form and tab state.",
      "Spotlight position calculation is debounced to prevent visual shaking during responsive layout changes.",
      "Mobile tours switch to a bottom-sheet pattern so the instruction does not occlude the selected control.",
    ],
  },
];
