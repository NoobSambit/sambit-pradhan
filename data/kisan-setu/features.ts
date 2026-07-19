import type { KisanSetuFeature } from "./types";

export const kisanSetuFeatures: KisanSetuFeature[] = [
  {
    id: "farm-profile-memory",
    title: "Farm profile & decision memory",
    category: "Farm",
    summary:
      "Five-step farm setup that turns land, crop, water, and risk context into reusable advisory input.",
    description:
      "KisanSetu captures a farmer's identity, location boundary, land and water details, crop history, preferences, budget, and risk posture in one final-save profile. The saved parcel geometry becomes a shared source for satellite and weather context, while learned patterns and farm history feed the assistant and recommendation services.",
    capabilities: [
      "Five-step profile flow: basics, boundary, land and water, crop history, preferences",
      "Required map boundary with acreage normalized from parcel geometry",
      "Tehsil, pincode, plot, ownership, survey, budget, and risk context",
      "Firestore-safe geometry serialization and GeoJSON-like rehydration",
      "Pattern extraction and memory context for downstream advisory paths",
    ],
    workflow: {
      title: "Farm context to reusable decision input",
      nodes: [
        "Capture farmer and farm details",
        "Draw required parcel boundary",
        "Derive acreage and centre point",
        "Validate the complete profile",
        "Persist profile and farm history",
        "Generate memory context for advisory services",
      ],
    },
    engineeringNotes: [
      "The land boundary is mandatory; manual acreage is not treated as a trusted substitute.",
      "Farm context is additive across assistant, schemes, satellite, and weather rather than copied into disconnected forms.",
      "Firestore persistence serializes polygon arrays before write and restores the API shape on read.",
    ],
  },
  {
    id: "personalized-assistant",
    title: "Profile-aware farming assistant",
    category: "Assistant",
    summary:
      "Text advisory that uses farm memory, conversation context, language policy, and explicit provider selection.",
    description:
      "The assistant accepts a farming question with optional user, session, language, and provider context. It assembles farm memory and recent conversation state before using the selected local Ollama or configured Groq path, then logs the interaction and refreshes learned context without holding up the response.",
    capabilities: [
      "Farm-profile and conversation context injection",
      "Ollama default with explicit Groq selection",
      "Same-language response policy for Indic and English queries",
      "Timeout-aware lean-context retry and truncation continuation",
      "Provider, model, and latency metadata in the response",
    ],
    workflow: {
      title: "Question to contextual agricultural answer",
      nodes: [
        "Validate question and selected provider",
        "Load farm memory and conversation context",
        "Build language-aware prompt",
        "Run Ollama or Groq generation",
        "Correct language drift or continue truncated output",
        "Return answer and asynchronously refresh logs and patterns",
      ],
    },
    engineeringNotes: [
      "An explicit Groq selection does not silently fall back to another provider.",
      "Language correction is a bounded retry; a valid first answer is retained if the correction pass times out.",
      "Logging and memory updates are intentionally non-blocking for response latency.",
    ],
  },
  {
    id: "voice-assistant",
    title: "Multilingual voice advisory",
    category: "Assistant",
    summary:
      "Record, transcribe, review, ask, and hear an answer through a local-first STT/TTS pipeline.",
    description:
      "Voice mode provides separate STT, TTS, and one-call roundtrip routes. Audio is validated for size, duration, and MIME type; whisper.cpp is preferred when configured, while browser transcript and synthesis fallbacks remain visible to the user. The roundtrip reuses the same farm-aware assistant service as text chat.",
    capabilities: [
      "STT, TTS, and one-call voice roundtrip routes",
      "Whisper container conversion to WAV via ffmpeg when needed",
      "Transcript review and edit before sending",
      "Indic language handling across 13 configured language options",
      "Explicit fallback and script-normalization metadata",
    ],
    workflow: {
      title: "Recorded question to spoken answer",
      nodes: [
        "Capture browser audio",
        "Validate MIME, bytes, and duration",
        "Transcribe with local runtime or visible fallback",
        "Normalize requested language script",
        "Reuse profile-aware assistant query",
        "Return transcript, answer, playback data, and warnings",
      ],
    },
    engineeringNotes: [
      "Voice requests share the text assistant's personalization behavior instead of maintaining a separate prompt path.",
      "Unsupported local whisper language codes retry with auto detection and label the fallback.",
      "A missing local runtime produces actionable diagnostics rather than a hidden degraded answer.",
    ],
  },
  {
    id: "scheme-recommendations",
    title: "Explainable scheme matching",
    category: "Schemes",
    summary:
      "Profile-aware eligibility scoring, missing-input prompts, saved schemes, and application checklists.",
    description:
      "The scheme matcher scores central and state opportunities against location, land size, crop, irrigation, budget, risk, and land-record readiness. Results state why a scheme matches, what profile input is missing, and which checklist documents still need attention; users can save schemes and persist readiness state.",
    capabilities: [
      "Rule-based eligibility scoring with match reasons",
      "Profile-completeness and missing-input reporting",
      "Central and state duplicate overlap detection",
      "Saved recommendations and document-readiness checklists",
      "Official application links and explicit catalog-source warning",
    ],
    workflow: {
      title: "Farm profile to scheme action plan",
      nodes: [
        "Load farm profile and stored scheme state",
        "Resolve catalog source with fallback visibility",
        "Score eligibility and detect overlap",
        "Expose reasons and missing inputs",
        "Save candidate or update checklist",
        "Persist recommendation snapshot for history",
      ],
    },
    engineeringNotes: [
      "The matching engine favors explainability: score, reasons, and missing inputs travel together.",
      "Catalog/user-state permission failures are handled through labelled fallback paths.",
      "The user interface consumes persisted save/checklist state rather than a local-only mock.",
    ],
  },
  {
    id: "agriculture-scheme-library",
    title: "Agriculture scheme library",
    category: "Schemes",
    summary:
      "Searchable 825-record agriculture corpus with filters, details, application channels, and local-file resilience.",
    description:
      "The full library is built from 83 India.gov listing pages and linked MyScheme detail payloads. It normalizes benefits, documents, FAQs, sources, and application channels into a shared schema, then serves a paginated browse experience with a slide-over detail view. Local JSON is the default low-read serving mode; Firestore is optional.",
    capabilities: [
      "83 listing pages and 825 unique agriculture schemes",
      "Search, state, category, ministry, and status filters",
      "Benefits, documents, FAQs, process, references, and channels",
      "Raw source payload available only on request",
      "Local, Firestore, and auto source modes with warnings",
    ],
    workflow: {
      title: "Source corpus to filtered scheme detail",
      nodes: [
        "Scrape listing and detail sources",
        "Normalize heterogeneous scheme sections",
        "Store deterministic local corpus",
        "Apply API filters and pagination",
        "Open tabbed scheme detail",
        "Follow official source or application channel",
      ],
    },
    engineeringNotes: [
      "Local mode is the default to avoid accidental Firestore read spend during browse-heavy use.",
      "Raw upstream payloads are excluded from normal responses to keep the contract stable.",
      "Auto mode can use Firestore but labels a local-file fallback.",
    ],
  },
  {
    id: "satellite-health",
    title: "Satellite crop-health intelligence",
    category: "Satellite",
    summary:
      "Sentinel-2 scene context, crop-health signals, map overlays, and transparent confidence/fallback handling.",
    description:
      "Satellite health resolves the farm area from a supplied bounding box, saved parcel geometry, or a clearly labelled demo AOI. It compares current and baseline windows, generates score, trend, zone, alert, and recommendation data, then presents either a high-accuracy NDVI raster or an explicit estimated-zone overlay.",
    capabilities: [
      "CDSE OAuth and Sentinel-2 STAC scene retrieval",
      "AOI precedence from query, parcel geometry, then demo fallback",
      "Current-versus-baseline health comparison",
      "Zone indicators, alerts, confidence, and uncertainty notes",
      "High-accuracy NDVI attempt with visible estimated-mode degradation",
    ],
    workflow: {
      title: "Farm parcel to crop-health signal",
      nodes: [
        "Resolve AOI and source transparency",
        "Read cache or request Sentinel scenes",
        "Filter and normalize scene metadata",
        "Compare current and baseline windows",
        "Build score, zones, alerts, and recommendations",
        "Render raster or labelled estimated overlay",
      ],
    },
    engineeringNotes: [
      "Estimated zones are not portrayed as a raster analysis; the product labels the distinction.",
      "Cache keys include user, AOI, precision mode, cloud, and result parameters.",
      "A failed high-accuracy call degrades to a working estimated response with a reason.",
    ],
  },
  {
    id: "weather-risk",
    title: "Weather & farm-risk advisory",
    category: "Weather",
    summary:
      "Location-aware weather data and risk notifications that reuse saved farm geography.",
    description:
      "Weather resolves location from a farm parcel centre point, saved coordinates, or tehsil/district/state hints when the request supplies only a user. It produces weather guidance and an active weather-risk notification path for the dashboard, keeping mock or provider-fallback behavior visible in the response contract.",
    capabilities: [
      "Profile-driven location resolution",
      "Optional OpenWeather provider with explicit fallback",
      "Weather risk evaluation and persisted notification state",
      "Read and mark-read dashboard notification actions",
      "Validation for malformed coordinate input",
    ],
    workflow: {
      title: "Farm location to weather action",
      nodes: [
        "Resolve profile geography",
        "Validate direct coordinate override",
        "Fetch provider data or labelled fallback",
        "Evaluate farming risk context",
        "Persist notification candidates",
        "Serve dashboard alerts and read state",
      ],
    },
    engineeringNotes: [
      "Location inference follows the same parcel-first path used by the satellite system.",
      "Invalid coordinate input fails validation rather than being coerced into a false location.",
      "Notifications retain staleness metadata so the dashboard can communicate freshness.",
    ],
  },
  {
    id: "market-prices",
    title: "Market price intelligence",
    category: "Market",
    summary:
      "Agmarknet-backed taxonomy and market-series browsing with filtered cards, detail series, and freshness metadata.",
    description:
      "The market layer ingests 2025 Agmarknet taxonomy and series data with resumable checkpoints. Its action-based API serves filters, latest cards, or one full series, and the marketplace UI provides category, commodity, state, district, metric, and granularity controls. Forecasting and sell-timing are intentionally marked as active work rather than completed claims.",
    capabilities: [
      "Resumable 2025 Agmarknet ingestion and run metadata",
      "Taxonomy, cards, and full-series API actions",
      "Commodity, state, district, metric, and granularity filtering",
      "In-process and HTTP cache controls",
      "Forecast model and sell timing tracked as in-progress work",
    ],
    workflow: {
      title: "Market source to decision-ready series",
      nodes: [
        "Ingest taxonomy and market combinations",
        "Persist series and ingestion checkpoints",
        "Request filters, cards, or one series",
        "Push filters into read constraints",
        "Return latest deltas and freshness",
        "Open analytics detail for the selected series",
      ],
    },
    engineeringNotes: [
      "The cards read path avoids normalizing every full series just to show a current snapshot.",
      "Forecast windows are part of the active Day 4 scope, not represented as finished functionality.",
      "Taxonomy absence returns ingestion guidance instead of empty data masquerading as a result.",
    ],
  },
  {
    id: "farm-planning-health",
    title: "Crop planning & disease support",
    category: "Farm",
    summary:
      "Planning and disease-detection surfaces that keep provider and data limitations explicit.",
    description:
      "KisanSetu includes a crop-planning route for AI-assisted recommendations and a disease-detection route with input validation. These supporting agricultural surfaces are present in the codebase, but the current scope baseline correctly notes that parts of the disease/community tracks remain mock-heavy and need further production hardening.",
    capabilities: [
      "AI-assisted crop planning route",
      "Image-based disease detection request validation",
      "Farm context available to planning inputs",
      "Analytics and optional prediction persistence",
      "Known mock-heavy limitations called out in product scope",
    ],
    workflow: {
      title: "Farm condition to next-step guidance",
      nodes: [
        "Collect crop or image input",
        "Validate request and farm context",
        "Run planning or detection service",
        "Shape practical guidance",
        "Persist optional analytics",
        "Show limitations or fallback context",
      ],
    },
    engineeringNotes: [
      "These are supporting modules, not claimed as a fully validated agronomy diagnosis system.",
      "The portfolio keeps their mock-heavy state visible because that affects trust in any recommendation.",
      "Planning and detection have separate endpoints and persistence paths.",
    ],
  },
  {
    id: "community-admin",
    title: "Community & administration foundation",
    category: "Community",
    summary:
      "Posts, comments, replies, likes, and admin statistics for peer knowledge and operational visibility.",
    description:
      "The community layer provides post, comment, reply, and like routes with validation; an administration route serves platform statistics for authorized users. Community intelligence extraction is still a planned Day 4 extension, so the implemented social foundation is separated from that future summarization work.",
    capabilities: [
      "Community post creation",
      "Comment and reply paths",
      "Like/unlike state transitions",
      "Administrative statistics route",
      "Planned community-intelligence extraction clearly separated",
    ],
    workflow: {
      title: "Contribution to moderated platform signal",
      nodes: [
        "Submit authenticated contributor context",
        "Validate post or reply payload",
        "Persist community content",
        "Toggle engagement state",
        "Read admin statistics",
        "Reserve extraction/summarization for planned scope",
      ],
    },
    engineeringNotes: [
      "Like writes receive the current state so the route can make the action explicit.",
      "The portfolio does not claim community intelligence extraction as shipped because the tracker marks it planned.",
      "Authorization consistency remains an identified repository-wide hardening gap.",
    ],
  },
  {
    id: "unified-dashboard",
    title: "Unified farmer dashboard",
    category: "Farm",
    summary:
      "A single operational entry point for profile context, satellite access, weather risk, and active intelligence.",
    description:
      "The dashboard is an active Day 6 integration surface rather than a finished command centre. It connects lighter intelligence summaries and notifications to dedicated drilldowns—especially satellite analysis—so the interface stays actionable without embedding a full geospatial module inside a summary card.",
    capabilities: [
      "Role-aware dashboard shell and navigation",
      "Weather-risk notification feed",
      "Satellite analysis entry with freshness context",
      "Dedicated drilldown rather than embedded heavy map analysis",
      "Offline reliability and demo rehearsal still planned",
    ],
    workflow: {
      title: "Dashboard signal to focused workflow",
      nodes: [
        "Load farmer context",
        "Request dashboard notifications",
        "Surface current intelligence signals",
        "Open dedicated satellite or market drilldown",
        "Return to operational summary",
        "Track remaining Day 6 integration work",
      ],
    },
    engineeringNotes: [
      "The dashboard intentionally delegates heavy satellite rendering to its dedicated page.",
      "The tracker marks dashboard integration in progress; offline and demo-readiness phases remain planned.",
      "Notification state is served through a dedicated API instead of static dashboard-only data.",
    ],
  },
  {
    id: "bidding-ground",
    title: "Market bidding ground (active prototype)",
    category: "Market",
    summary:
      "An in-repository live-bidding interface prototype for an agricultural lot, currently backed by sample data.",
    description:
      "The active worktree contains a bidding-ground route with live-market presentation, bid statistics, lot context, and a bid table. Its current implementation uses fixed sample bids and lot details, so it is documented as an ongoing prototype—not as a completed real-time trading system.",
    capabilities: [
      "Live-market interface shell",
      "Lot quality, quantity, moisture, and location context",
      "Bid statistics and ranked bid table",
      "Market-status indicator",
      "Explicit sample-data prototype status",
    ],
    workflow: {
      title: "Prototype lot to bid visibility",
      nodes: [
        "Open bidding-ground route",
        "Load sample lot context",
        "Render bid statistics",
        "Rank current sample bids",
        "Show market-state interface",
        "Await real-time persistence and buyer integration",
      ],
    },
    engineeringNotes: [
      "This is visible in the active worktree but does not yet have a backing bid API or persistent real-time source.",
      "Calling it a prototype preserves the distinction between UI progress and a production market workflow.",
      "It is included because it is current project work, not because it is a completed platform feature.",
    ],
  },
];
