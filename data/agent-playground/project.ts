import type { AgentPlaygroundNavItem } from "./types";

export const agentPlaygroundProject = {
  name: "Agent Playground",
  mark: "AP",
  tagline: "An inspectable platform for persistent, multi-agent intelligence",
  repository: "NoobSambit/AGENT-PLAYGROUND",
  repositoryUrl: "https://github.com/NoobSambit/AGENT-PLAYGROUND",
  version: "Active development",
  updated: "Last verified commit: 17 Jul 2026",
  overview: [
    "Agent Playground is an inspectable AI agent platform where identity, memory, emotions, relationships, learning, and long-running creative or analytical workflows are explicit product state—not hidden prompt context. Each agent has a persistent record and a workspace for inspecting what changed, why it changed, and which evidence supports it.",
    "The Next.js application uses typed route handlers and services to coordinate PostgreSQL/Drizzle persistence, provider-backed generation, bounded quality evaluation, repair, and save or publish boundaries. Gemini, Groq, and Ollama are selected behind server-side provider logic; Firestore remains a migration and dual-write compatibility path rather than the canonical runtime store.",
  ],
  evidence: [
    ["API route handlers", "55 route handlers"],
    ["Domain services", "42 services · 26 repositories"],
    ["PostgreSQL tables", "44 Drizzle tables"],
    ["Provider layer", "Gemini · Groq · Ollama · LangChain"],
  ],
  stack: ["Next.js 15", "React 19", "TypeScript", "PostgreSQL", "Drizzle ORM", "Zustand", "LangChain", "Gemini", "Groq", "Ollama", "Firebase", "Tailwind CSS"],
  timeline: [
    ["Agent foundation", "Early 2026", "Established persistent agent identity, personality, emotion, memory, and chat state."],
    ["Inspectable workspaces", "Spring 2026", "Added Creative, Dream, Journal, Profile, and challenge workflows with persisted pipeline traces."],
    ["PostgreSQL cutover", "2026", "Made PostgreSQL and Drizzle canonical while retaining Firestore export, backfill, and dual-write support."],
    ["Knowledge Library", "Jul 2026", "Introduced validation-aware Library governance, usage tracking, Collective routing, and Timeline visibility."],
    ["Current iteration", "17 Jul 2026", "Continued agent workspace, memory-console, timeline, and navigation refinements."],
  ],
} as const;

export const agentPlaygroundNavigation: AgentPlaygroundNavItem[] = [
  { id: "overview", label: "Overview", icon: "▣" },
  { id: "features", label: "Feature catalogue", icon: "✦" },
  { id: "architecture", label: "Architecture & workflows", icon: "◇" },
];
