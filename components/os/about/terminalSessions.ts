export type AboutTerminalSession = {
  command: string;
  lines: readonly string[];
};

const DEFAULT_SESSION: AboutTerminalSession = {
  command: "$ npm run about",
  lines: [
    "Profile loaded",
    "Education loaded",
    "Build preferences loaded",
    "Opportunity status loaded",
    "Workspace ready",
  ],
};

const SESSIONS: Record<string, AboutTerminalSession> = {
  "education.ts": {
    command: "$ npm run about -- education",
    lines: [
      "Academic history loaded",
      "Degree status: graduated",
      "Self-learning path indexed",
      "Syllabus ceiling removed",
      "education.ts ready",
    ],
  },
  "vision.ts": {
    command: "$ npm run about -- vision",
    lines: [
      "Product filter loaded",
      "Market assumptions checked",
      "Founder certainty not found",
      "Career direction loaded",
      "vision.ts ready",
    ],
  },
  "personality.ts": {
    command: "$ npm run about -- personality",
    lines: [
      "Traits loaded",
      "Contradictions preserved",
      "Team experience not fabricated",
      "Perfectionism renamed to actual behavior",
      "personality.ts ready",
    ],
  },
  "values.ts": {
    command: "$ npm run about -- values",
    lines: [
      "Trade-offs loaded",
      "Engineering rules loaded",
      "Opinions loaded",
      "Generic virtues removed",
      "values.ts ready",
    ],
  },
  "engineering.ts": {
    command: "$ npm run about -- engineering",
    lines: [
      "Process loaded",
      "Case study loaded",
      "Trade-offs loaded",
      "AI stance loaded",
      "engineering.ts ready",
    ],
  },
};

export function getAboutTerminalSession(
  activeFile: string,
): AboutTerminalSession {
  return SESSIONS[activeFile] ?? DEFAULT_SESSION;
}
