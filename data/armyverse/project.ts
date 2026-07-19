import type { ProjectNavItem } from "./types";

export const armyverseProject = {
  name: "ARMYVERSE",
  mark: "AV",
  tagline: "A BTS music, community, and progression platform",
  repository: "NoobSambit/ARMYVERSE2",
  repositoryUrl: "https://github.com/NoobSambit/ARMYVERSE2",
  liveUrl: "https://armyverse.vercel.app",
  docsUrl: "https://github.com/NoobSambit/ARMYVERSE2/tree/main/docs",
  version: "Active development",
  updated: "Last verified commit: 11 Mar 2026",
  overview: [
    "ARMYVERSE is a full-stack BTS fan platform built around three connected experiences: music discovery and playlist creation, community publishing, and a persistent Boraverse progression system. It gives fans one place to turn listening activity and fandom knowledge into useful discovery, shared content, and game progress.",
    "The application is implemented as a Next.js App Router product with MongoDB-backed domain models and server-side API routes. It integrates Spotify, Last.fm, YouTube, Firebase, Groq, Cloudinary, and scheduled Kworb ingestion jobs—keeping personalized experiences, global charts, and fan-created content in a single product surface.",
  ],
  evidence: [
    ["Application routes", "88 API routes · 28 pages"],
    ["Domain models", "27 MongoDB models"],
    ["Client components", "141 feature components"],
    ["External integrations", "Spotify · Last.fm · YouTube · Firebase · Groq · Cloudinary"],
  ],
  stack: [
    "Next.js 14",
    "React 18",
    "TypeScript",
    "MongoDB",
    "Mongoose",
    "Firebase Auth",
    "Spotify API",
    "Last.fm",
    "YouTube",
    "Groq",
    "Cloudinary",
    "Tailwind CSS",
    "Radix UI",
    "TanStack Query",
  ],
  timeline: [
    [
      "Initial platform",
      "04 Aug 2025",
      "Repository began as a BTS fan platform with blog and authentication foundations.",
    ],
    [
      "Spotify export",
      "14 Nov 2025",
      "Added BYO Spotify credentials, encrypted token handling, and an owner-account fallback for playlist export.",
    ],
    [
      "Publishing upgrade",
      "10 Dec 2025",
      "Expanded the blog editor with more authoring tools and improved the mobile writing experience.",
    ],
    [
      "Boraverse hardening",
      "Jan 2026",
      "Refined mastery, quests, badges, leaderboard data, YouTube analytics, and streaming verification across the game loop.",
    ],
    [
      "Current maintenance",
      "11 Mar 2026",
      "Updated Spotify export and local OAuth guidance for development-mode compatibility.",
    ],
  ],
} as const;

export const armyverseNavigation: ProjectNavItem[] = [
  { id: "overview", label: "Overview", icon: "▣" },
  { id: "features", label: "Feature catalogue", icon: "✦" },
  { id: "architecture", label: "Architecture & workflows", icon: "◇" },
];
