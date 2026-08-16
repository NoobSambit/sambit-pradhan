import type { GymTrackerNavigationItem } from "./types";

export const gymTrackerProject = {
  name: "Gym Tracker",
  mark: "GT",
  tagline: "Offline-first strength training for focused gym sessions",
  repository: "NoobSambit/gym-tracker",
  repositoryUrl: "https://github.com/NoobSambit/gym-tracker",
  version: "V1 release candidate",
  updated: "PRD 08 complete · PRD 09 manual stabilization remains",
  overview: [
    "Gym Tracker is an Android-first Flutter app for strength training that keeps the workout loop local, fast, and durable. A user can train without an account or network, then optionally claim local data, sync it, and selectively participate in private social features.",
    "The product treats reliability as a feature: Drift/SQLite is the local source of truth for workouts, active sessions recover after restart, remote access flows through a NestJS REST API and generated OpenAPI client, and server-side rules protect sync, sharing, and challenge scoring. The current V1 is a feature-complete release candidate in manual stabilization.",
  ],
  stack: [
    "Flutter 3.44",
    "Dart 3.12",
    "Riverpod",
    "go_router",
    "Drift",
    "SQLite",
    "NestJS 11",
    "Prisma 7",
    "PostgreSQL",
    "OpenAPI",
    "Material 3",
    "Secure Storage",
  ],
  evidence: [
    ["Local exercise catalog", "118 original entries"],
    ["Flutter feature domains", "8 user-facing systems"],
    ["Remote API modules", "8 NestJS modules"],
    ["Remote domain models", "32 Prisma models"],
  ],
  timeline: [
    [
      "Offline training foundation",
      "V1",
      "Drift/SQLite, guest preferences, exercises, routines, active sessions, and deterministic progress established the local training core.",
    ],
    [
      "Optional account and sync",
      "V1",
      "Email auth, secure tokens, guest claim, outbox-backed sync, account export, and account deletion extended the local product without making connectivity mandatory.",
    ],
    [
      "Private social and challenges",
      "V1",
      "Invite-only sharing, groups, moderation, and server-scored private challenges were added with ownership and fair-play constraints.",
    ],
    [
      "Feature-complete release candidate",
      "PRD 08",
      "The release gate covered API, mobile, contracts, database migrations, audits, backup/restore, and an Android APK build.",
    ],
    [
      "Manual stabilization",
      "PRD 09",
      "Manual review and defect resolution remain the release decision lane; no new roadmap features belong in this phase.",
    ],
  ],
} as const;

export const gymTrackerNavigation: GymTrackerNavigationItem[] = [
  { id: "overview", label: "Overview", icon: "▣" },
  { id: "features", label: "Feature catalogue", icon: "✦" },
  { id: "architecture", label: "Architecture & workflows", icon: "◇" },
];
