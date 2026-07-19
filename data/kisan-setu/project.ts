import type { KisanSetuNavigationItem } from "./types";

export const kisanSetuProject = {
  name: "KisanSetu",
  mark: "KS",
  tagline:
    "Farm intelligence for schemes, crop health, weather, and market decisions",
  repository: "NoobSambit/KisanSetu-Hackathon",
  repositoryUrl: "https://github.com/NoobSambit/KisanSetu-Hackathon",
  version: "Hackathon build",
  updated: "Actively developed · latest committed baseline: 14 Feb 2026",
  overview: [
    "KisanSetu is an agricultural intelligence platform for Indian farmers. It brings structured farm context, profile-aware advisory, government schemes, satellite crop-health signals, weather risk, and market data into one practical decision surface.",
    "The current build is deliberately transparent about its state: the core personalization, scheme, satellite, and voice foundations are implemented; market forecasting, predictive weather, and unified dashboard work are actively being refined. Optional providers and fallback sources are surfaced instead of silently changing a recommendation's trust level.",
  ],
  stack: [
    "Next.js 15",
    "React 19",
    "TypeScript",
    "Firebase",
    "Firestore",
    "Ollama",
    "Groq",
    "Gemini",
    "Sentinel-2",
    "CDSE",
    "Leaflet",
    "Tailwind CSS",
  ],
  evidence: [
    ["Route handlers", "24 implemented API routes"],
    ["Product surfaces", "17 App Router pages"],
    ["Domain services", "29 service modules"],
    ["Scheme corpus", "825 agriculture scheme records"],
  ],
  timeline: [
    [
      "Personalized farm foundation",
      "Day 1",
      "Farm profile, memory-backed assistant context, and persisted advice established the starting decision path.",
    ],
    [
      "Scheme & satellite baseline",
      "Day 2",
      "Explainable eligibility matching, an 825-record agriculture corpus, CDSE ingest, and AOI handling were added.",
    ],
    [
      "Voice and crop-health intelligence",
      "Day 3",
      "Multilingual STT/TTS, shared assistant query flow, satellite health signals, and map overlays became available.",
    ],
    [
      "Market intelligence in progress",
      "Day 4",
      "Agmarknet ingestion and market browsing are implemented; forecast and sell-timing layers remain active work.",
    ],
    [
      "Operational intelligence in progress",
      "Day 5–6",
      "Weather risk and unified-dashboard integration are actively being hardened, while offline and demo-readiness work remains planned.",
    ],
  ],
} as const;

export const kisanSetuNavigation: KisanSetuNavigationItem[] = [
  { id: "overview", label: "Overview", icon: "▣" },
  { id: "features", label: "Feature catalogue", icon: "✦" },
  { id: "architecture", label: "Architecture & workflows", icon: "◇" },
];
