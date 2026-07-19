import type { InsightQuillNavigationItem } from "./types";

export const insightQuillProject = {
  name: "InsightQuill",
  mark: "IQ",
  tagline:
    "Role-based academic operations, assessment integrity, and feedback intelligence",
  repository: "NoobSambit/InsightQuill",
  repositoryUrl: "https://github.com/NoobSambit/InsightQuill",
  version: "V2",
  updated: "Last verified commit: 25 May 2026",
  overview: [
    "InsightQuill is a cross-platform college operations platform built for students, faculty, HODs, and super administrators. It brings attendance-aware assessments, departmental controls, feedback collection, and reporting into a single role-scoped application.",
    "Its central differentiator is not generic survey collection: class and quiz feedback are scheduled, versioned, validated against quality rules, and transformed into course-level signals that faculty can act on. The same source base supports Android and web through Flutter, with Supabase-backed data, identity, and tenant isolation.",
  ],
  stack: [
    "Flutter",
    "Dart",
    "Provider",
    "Supabase",
    "PostgreSQL",
    "Node.js",
    "Gemini",
    "Groq",
    "Excel",
    "Syncfusion PDF",
    "Biometrics",
    "Vercel Functions",
  ],
  evidence: [
    ["Serverless API modules", "88 Node.js endpoint and helper files"],
    ["Flutter model contracts", "13 domain models"],
    ["Automated verification", "34 Dart test files"],
    ["Schema evolution", "15 Supabase migrations"],
  ],
  timeline: [
    [
      "Academic operations core",
      "Early 2026",
      "Role-scoped users, colleges, courses, timetables, attendance, and quizzes established the product foundation.",
    ],
    [
      "Feedback v2",
      "Apr 2026",
      "Versioned quiz and class feedback configurations, runtime sessions, validation, and analytics became first-class workflows.",
    ],
    [
      "Assessment integrity",
      "Apr 2026",
      "Live quiz state, termination reasons, question-image storage, and schedule controls hardened the assessment lifecycle.",
    ],
    [
      "Department command center",
      "May 2026",
      "HOD onboarding and department-aware faculty/course oversight expanded the administrative model.",
    ],
    [
      "Reporting refinement",
      "May 2026",
      "Score exports, PDF scorecards, ranked analytics, and malformed-row handling improved operational reporting.",
    ],
  ],
} as const;

export const insightQuillNavigation: InsightQuillNavigationItem[] = [
  { id: "overview", label: "Overview", icon: "▣" },
  { id: "features", label: "Feature catalogue", icon: "✦" },
  { id: "architecture", label: "Architecture & workflows", icon: "◇" },
];
