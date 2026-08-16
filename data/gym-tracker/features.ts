import type { GymTrackerFeature } from "./types";

export const gymTrackerFeatures: GymTrackerFeature[] = [
  {
    id: "guest-preferences",
    title: "Guest-first training foundation",
    category: "Foundation",
    summary:
      "Start locally without an account, then shape the workout surface around units, density, timer, theme, and accessibility preferences.",
    description:
      "Gym Tracker begins as a private local app. Guest profile and preferences live in Drift/SQLite, including timezone, week start, display units, light/dark/system theme, density, enabled set fields, and rest-timer behavior. A user claims or merges this data only after explicitly registering for account-backed sync.",
    capabilities: [
      "Account-free local onboarding",
      "Timezone, first-day-of-week, and display-unit preferences",
      "Light, dark, and system themes",
      "Compact or comfortable workout density",
      "Enabled set fields and rest-timer defaults",
      "Sound, vibration, quiet mode, and auto-start preferences",
    ],
    workflow: {
      title: "Private first session",
      nodes: [
        "Open app without an account",
        "Complete local preferences",
        "Persist guest profile in Drift",
        "Train offline",
        "Optionally register later",
        "Explicitly claim or merge local data",
      ],
    },
    engineeringNotes: [
      "Guest data is not silently uploaded when the app starts.",
      "The app is designed for light, dark, system, text scaling, reduced motion, and screen-reader use.",
      "Preferences govern primary workout interaction, not just visual decoration.",
    ],
  },
  {
    id: "exercise-catalog",
    title: "Exercise catalog & personal library",
    category: "Training",
    summary:
      "Search original exercise data, inspect training metadata, and add private exercises, notes, and external media links.",
    description:
      "The local catalog contains 118 project-authored exercises with alias-aware search and metadata for equipment, muscle, movement pattern, laterality, and metric type. A user can own custom exercises, notes, external YouTube links, and local archive/delete behavior without importing proprietary instruction or video content.",
    capabilities: [
      "118 original seeded exercise entries",
      "Alias-aware search and filters",
      "Equipment, muscle, movement, laterality, and metric metadata",
      "Custom exercises owned by the local profile",
      "Personal notes and validated external YouTube links",
      "Archive and delete behavior for local records",
    ],
    workflow: {
      title: "Find or create a training movement",
      nodes: [
        "Search by name or alias",
        "Filter by training metadata",
        "Review exercise detail",
        "Add notes or external media",
        "Create a custom movement when needed",
        "Use it in a routine or active workout",
      ],
    },
    engineeringNotes: [
      "The catalog avoids copying proprietary exercise instructions.",
      "External media is user-linked rather than hosted by the application.",
      "Custom records remain local-first and feed the same routine/workout paths as seeded exercises.",
    ],
  },
  {
    id: "versioned-routines-schedule",
    title: "Versioned routines, days & schedule",
    category: "Training",
    summary:
      "Build multi-day programs with ordered exercises and targets, while preserving historical context when future plans change.",
    description:
      "Routines are programs with immutable versions. A used or published plan is not rewritten underneath completed workouts: edits create a new version. Routine days hold exercise order, load/reps/duration/RPE/RIR targets, rest targets, notes, and superset grouping; calendar entries track the planned-to-completed lifecycle.",
    capabilities: [
      "Program and multi-day routine creation",
      "Ordered exercises with target sets and rest guidance",
      "Load, reps, duration, RPE, RIR, notes, and superset targets",
      "Immutable routine versions after use or publication",
      "Planned, started, completed, skipped, moved, and cancelled schedule states",
      "Audit links when a planned session moves instead of disappearing",
    ],
    workflow: {
      title: "Plan today without rewriting history",
      nodes: [
        "Create program and routine days",
        "Order exercises and targets",
        "Schedule a day",
        "Start, move, skip, or complete it",
        "Edit the future plan as a new version",
        "Keep completed workout snapshots intact",
      ],
    },
    engineeringNotes: [
      "Versioning protects historical workout interpretation after a routine changes.",
      "Schedule transitions are explicit states, not inferred from a calendar view.",
      "Today, routine detail, and builder surfaces consume the same local data model.",
    ],
  },
  {
    id: "active-workout",
    title: "Fast, recoverable active workout",
    category: "Training",
    summary:
      "Log sets one-handed with local transactions, rest timing, autosave, and safe recovery after interruption.",
    description:
      "The active-workout flow can start from a scheduled routine or ad hoc path and allows only one active session at a time. It snapshots exercises and targets at training time, surfaces comparable past values, supports complete/skip/undo/add/copy/fill/swap/correction actions, and writes through Drift transactionally so the workout survives process death or backgrounding.",
    capabilities: [
      "Scheduled-routine and ad hoc starts",
      "Single-active-workout guard",
      "Load, reps, duration, set type, RPE/RIR, and notes",
      "Previous values and comparable best references",
      "Complete, skip, undo, add, copy/fill, swap, and correction flows",
      "Rest timer with pause/resume, add time, finish, and local notifications",
      "Autosave, restart recovery, and workout summary",
    ],
    workflow: {
      title: "Gym-floor set entry",
      nodes: [
        "Start routine day or empty session",
        "Persist active session locally",
        "Log a performed set",
        "Start/manage rest timer",
        "Recover exact state after interruption",
        "Finish session and generate summary",
      ],
    },
    engineeringNotes: [
      "Workout interactions must never block on a network request.",
      "Historical exercise labels and targets are snapshots, not live references that mutate retroactively.",
      "Data loss, recovery failure, timer corruption, and slow set entry are release-blocking categories.",
    ],
  },
  {
    id: "history-progress-goals-export",
    title: "History, progress, goals & portable data",
    category: "Progress",
    summary:
      "Derive metrics from completed workouts, correct them safely, set goals, schedule reminders, and export/restores data with a versioned schema.",
    description:
      "Completed workout records remain authoritative. The app derives volume, estimated 1RM, hard sets, consistency, muscle distribution, achievements, and XP with calculation-version labels; corrections rebuild affected metrics. Users can review history, define goal periods, schedule local reminders, export JSON schema 1.0.0 or CSV, and rely on restore/round-trip coverage.",
    capabilities: [
      "Completed-session history and detail",
      "Corrections with deterministic metric recalculation",
      "Volume, estimated 1RM, hard-set, consistency, and muscle-distribution metrics",
      "Goal periods, reviews, achievements, and XP ledger events",
      "Local reminder scheduling with sanitized payloads",
      "JSON export schema 1.0.0 and CSV workouts/sets exports",
      "Accessible chart alternatives plus empty and insufficient-data states",
    ],
    workflow: {
      title: "Workout record to accountable progress",
      nodes: [
        "Finish a local workout",
        "Persist completed facts",
        "Derive versioned metrics",
        "Review history, trends, and goals",
        "Correct a past session if needed",
        "Recalculate affected data or export it",
      ],
    },
    engineeringNotes: [
      "Progress can be rebuilt from raw completed-workout records.",
      "Charts cannot rely on color alone; tables and meaningful empty states are part of the contract.",
      "Reminder content avoids leaking private workout details in system notifications.",
    ],
  },
  {
    id: "account-sync-privacy",
    title: "Optional account, sync & data rights",
    category: "Account",
    summary:
      "Add an account only when needed, then synchronize through an ownership-checked API with outbox/conflict handling and account export/deletion controls.",
    description:
      "Email/password registration, login, refresh, logout, secure client token storage, guest claim, push/pull sync, server-side ownership/revision validation, account export, and deletion all sit behind an optional account boundary. Flutter never reaches PostgreSQL directly; the API is defined by OpenAPI and consumed by generated Dart transport models.",
    capabilities: [
      "Email/password registration, login, refresh, and logout",
      "Secure client token storage and device-session handling",
      "Explicit guest data claim",
      "Push/pull sync with local outbox and conflict-aware state",
      "Server-side ownership and revision validation",
      "Account export and account-deletion workflow",
      "Generated Dart client from committed OpenAPI contract",
    ],
    workflow: {
      title: "Local training data to controlled sync",
      nodes: [
        "Train and queue changes locally",
        "Choose to register or sign in",
        "Claim guest data explicitly",
        "Push outbox events to API",
        "Validate ownership and revisions",
        "Pull reconciled state and surface conflicts",
      ],
    },
    engineeringNotes: [
      "Drift/SQLite remains the client source of truth for workout UX.",
      "The generated client prevents handwritten Flutter transport models from drifting from the NestJS contract.",
      "Sensitive data operations are explicit account actions, not background side effects.",
    ],
  },
  {
    id: "private-social",
    title: "Private social, sharing & moderation",
    category: "Social",
    summary:
      "Use invite-only friendships and groups with granular workout visibility, blocks, revocation, feed interaction, and reports.",
    description:
      "Social is deliberately private by default. Users set up a social profile, manage friend requests and blocks, create groups, accept or issue invites, adjust membership roles/status, share a workout at an explicit detail level, revoke shares or history grants, read authorized history, react/comment in a private feed, and report abuse with moderation evidence.",
    capabilities: [
      "Social profiles, friend requests, and accepted friendships",
      "Blocks that override social access",
      "Private groups, invitations, membership roles, join/leave, and status changes",
      "Granular workout shares and share revocation",
      "Full-history grants and revocation",
      "Authorized history reads, private feed, reactions, and comments",
      "Reports, moderation evidence, and generic notification records",
    ],
    workflow: {
      title: "Private workout sharing",
      nodes: [
        "Establish invite-only relationship or group",
        "Choose workout audience and detail level",
        "Authorize only permitted viewers",
        "Publish private feed item",
        "Allow reactions/comments or revoke access",
        "Report and retain moderation evidence when required",
      ],
    },
    engineeringNotes: [
      "Blocks override friend, group, history, and challenge access paths.",
      "Notifications stay generic and omit sensitive workout content.",
      "Workout notes and private fields are not exposed through broad sharing controls.",
    ],
  },
  {
    id: "private-challenges",
    title: "Private-group challenges & fair scoring",
    category: "Social",
    summary:
      "Create group-scoped challenges with previewed scoring, server-derived standings, correction-aware recalculation, and finalization rules.",
    description:
      "Challenges are not public client-reported leaderboards. A member previews scoring before creation or joining, then the server calculates deterministic standings using trusted source data. The system supports caps, ties, teams, timezone/DST-aware windows, source-workout invalidation, recalculation after corrections, frozen final standings, cancellation, and reversible achievement/XP events.",
    capabilities: [
      "Scoring preview before creation or joining",
      "Private-group challenge creation and participation",
      "Server-derived deterministic standings",
      "Daily/weekly caps, ties, teams, and timezone/DST handling",
      "Source-workout invalidation and correction-aware recalculation",
      "Frozen final standings and cancellation",
      "Reversible achievement and XP ledger effects",
    ],
    workflow: {
      title: "Trusted challenge result",
      nodes: [
        "Preview scoring rules",
        "Create or join private-group challenge",
        "Attach trusted workout source events",
        "Calculate standings server-side",
        "Recalculate when a source changes",
        "Finalize or cancel with auditable outcomes",
      ],
    },
    engineeringNotes: [
      "Clients cannot submit raw totals as challenge truth.",
      "Fair-play prioritizes personal progress, transparent rules, private groups, and finalization windows.",
      "Source correction can reverse downstream score and achievement effects.",
    ],
  },
  {
    id: "release-stabilization",
    title: "Release candidate & stabilization evidence",
    category: "Quality",
    summary:
      "PRD 08 completed the automated feature gate; PRD 09 is the current manual review, defect resolution, and release-decision phase.",
    description:
      "The product is feature-complete for V1 but not described as finished. The release gate covers API build/lint/tests, Prisma validation and migrations, OpenAPI contract generation, Flutter formatting/analyze/tests, secret/license audits, backup/restore, and an Android APK build. Manual review/stabilization remains open and must resolve or explicitly defer findings without adding roadmap features.",
    capabilities: [
      "Automated API, mobile, contract, migration, audit, backup/restore, and APK gate",
      "One-command local browser review stack with API port checks and Ctrl+C cleanup",
      "Focused regression coverage for Today preview and review-stack lifecycle",
      "Manual journey checklist for active workout, history, progress, social, and account flows",
      "Explicit release-decision discipline rather than feature expansion during stabilization",
    ],
    workflow: {
      title: "Release candidate to release decision",
      nodes: [
        "Run automated PRD 08 gate",
        "Prepare APK and browser-review environment",
        "Execute manual journeys",
        "Record reproducible findings",
        "Fix or explicitly defer stabilization issues",
        "Rerun gates and record release decision",
      ],
    },
    engineeringNotes: [
      "The current repository README and handbook describe PRD 09 as incomplete manual stabilization.",
      "A July 2026 workout audit recorded web-route/recovery and verification findings; the portfolio must not label the product finished.",
      "No new roadmap features should enter the PRD 09 stabilization lane.",
    ],
  },
];
