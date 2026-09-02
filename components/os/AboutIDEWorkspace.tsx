"use client";

import { useEffect, useState, type ReactNode } from "react";
import { CareerHistoryWorkspace as CareerHistoryWorkspaceV2 } from "@/components/os/career/CareerHistoryWorkspace";

const explorerFiles = [
  "introduction.ts",
  "education.ts",
  "engineering.ts",
  "vision.ts",
  "values.ts",
  "personality.ts",
  "hobbies.json",
  "workstation.toml",
  "languages.yml",
];
const implementedFiles = [
  "introduction.ts",
  "education.ts",
  "engineering.ts",
  "vision.ts",
  "values.ts",
  "personality.ts",
] as const;

type SemanticTone = "cyan" | "purple" | "green" | "orange";
type SemanticProperty = {
  label: string;
  values: readonly string[];
  tone?: SemanticTone;
};
type SemanticNode = {
  id: string;
  summary: string;
  accent: SemanticTone;
  properties: readonly SemanticProperty[];
};
type SemanticMapDefinition = {
  defaultNode: string;
  nodes: readonly SemanticNode[];
};

const semanticMaps: Partial<Record<string, SemanticMapDefinition>> = {
  "introduction.ts": {
    defaultNode: "builder",
    nodes: [
      {
        id: "sambit",
        summary: "identity / education / current stage",
        accent: "purple",
        properties: [
          { label: "name", values: ["Sambit Pradhan"], tone: "purple" },
          { label: "primaryRole", values: ["Backend Engineer"], tone: "cyan" },
          {
            label: "secondaryRole",
            values: ["Full-Stack Engineer"],
            tone: "cyan",
          },
          {
            label: "education",
            values: ["VIT Vellore", "B.Tech CSE · Bioinformatics", "2026"],
            tone: "orange",
          },
          {
            label: "careerStage",
            values: ["2026 graduate / fresher"],
            tone: "orange",
          },
          { label: "location", values: ["Kolkata, India"], tone: "purple" },
          { label: "status", values: ["open to opportunities"], tone: "green" },
        ],
      },
      {
        id: "builder",
        summary: "product logic / architecture / planning",
        accent: "cyan",
        properties: [
          { label: "strongestAt", values: ["backend"], tone: "cyan" },
          {
            label: "favoritePart",
            values: ["product logic", "architecture", "planning"],
            tone: "purple",
          },
          {
            label: "startsWith",
            values: ["a problem worth solving"],
            tone: "orange",
          },
          {
            label: "prefers",
            values: ["building from scratch"],
            tone: "purple",
          },
          {
            label: "problemSpace",
            values: ["useful products — not only developer tools"],
            tone: "purple",
          },
          {
            label: "planningTime",
            values: ["probably too much"],
            tone: "orange",
          },
          {
            label: "qualityBar",
            values: ["working !== finished"],
            tone: "green",
          },
          {
            label: "frontend",
            values: [
              "not my strongest side",
              "still not allowed to feel half-done",
            ],
            tone: "orange",
          },
        ],
      },
      {
        id: "notes",
        summary: "actual working notes",
        accent: "orange",
        properties: [
          {
            label: "builds",
            values: ["products with a reason to exist outside a demo"],
            tone: "purple",
          },
          {
            label: "beforeImplementation",
            values: ["idea", "product flow", "architecture"],
            tone: "cyan",
          },
          {
            label: "wholeProduct",
            values: ["backend comfort; whole-product care"],
            tone: "cyan",
          },
          {
            label: "quality",
            values: ["if it works and feels wrong, keep going"],
            tone: "green",
          },
          {
            label: "preference",
            values: ["one original build over tutorial clones"],
            tone: "orange",
          },
        ],
      },
    ],
  },
  "engineering.ts": {
    defaultNode: "process",
    nodes: [
      {
        id: "process",
        summary: "idea → research → PRD → build → validate",
        accent: "cyan",
        properties: [
          {
            label: "start",
            values: ["the problem, not the stack"],
            tone: "orange",
          },
          {
            label: "discovery",
            values: [
              "think independently first",
              "AI pressure-test",
              "similar products / APIs / constraints",
              "who would use it and why",
            ],
            tone: "cyan",
          },
          {
            label: "stack",
            values: ["picked after understanding the product"],
            tone: "cyan",
          },
          { label: "planning", values: ["slow on purpose"], tone: "orange" },
          {
            label: "prd",
            values: ["detailed before implementation"],
            tone: "purple",
          },
          {
            label: "implementation",
            values: ["fast once decisions are made"],
            tone: "green",
          },
          {
            label: "validation",
            values: ["useful slice → test → fix assumptions → next phase"],
            tone: "green",
          },
        ],
      },
      {
        id: "oldCode",
        summary: "hindsight / rewrites",
        accent: "orange",
        properties: [
          {
            label: "hindsight",
            values: ["I can usually see what I didn't know yet"],
            tone: "orange",
          },
          {
            label: "rewriteTriggers",
            values: [
              "folders that grew without a plan",
              "logic that should have split sooner",
              "UI I wouldn't ship today",
            ],
            tone: "cyan",
          },
          {
            label: "rule",
            values: ["working code isn't protected from being rewritten"],
            tone: "green",
          },
        ],
      },
      {
        id: "caseStudy",
        summary: "Spotify constraint → BYOK redesign",
        accent: "orange",
        properties: [
          { label: "project", values: ["ArmyVerse"], tone: "purple" },
          {
            label: "feature",
            values: ["playlist → Spotify export"],
            tone: "purple",
          },
          {
            label: "firstMiss",
            values: ["public-app constraints researched too late"],
            tone: "orange",
          },
          {
            label: "constraint",
            values: ["one development-mode app wasn't a clean public path"],
            tone: "orange",
          },
          {
            label: "response",
            values: [
              "per-user BYO Spotify app",
              "Client ID / optional Client Secret",
              "encrypted credentials + refresh tokens",
              "owner export retained as fallback",
            ],
            tone: "cyan",
          },
          {
            label: "lesson",
            values: ["platform constraints belong in product research"],
            tone: "green",
          },
        ],
      },
      {
        id: "ai",
        summary: "implementation speed / decision ownership",
        accent: "purple",
        properties: [
          {
            label: "take",
            values: ["strong code; decisions still need an owner"],
            tone: "purple",
          },
          {
            label: "usefulFor",
            values: [
              "research",
              "implementation speed",
              "challenging an approach",
              "unfamiliar territory",
            ],
            tone: "cyan",
          },
          {
            label: "IStillOwn",
            values: [
              "what should exist",
              "product trade-offs",
              "architecture",
              "what gets trusted",
            ],
            tone: "green",
          },
        ],
      },
      {
        id: "tradeoffs",
        summary: "complexity must justify itself",
        accent: "orange",
        properties: [
          {
            label: "badHabit",
            values: ["over-engineering smaller answers"],
            tone: "orange",
          },
          {
            label: "evidence",
            values: ["this portfolio is probably Exhibit A"],
            tone: "purple",
          },
          {
            label: "correction",
            values: [
              "start from the product constraint",
              "make complexity justify itself",
              "prefer the simple path first",
            ],
            tone: "green",
          },
        ],
      },
      {
        id: "unknowns",
        summary: "unfamiliar tech ≠ reason to cut the idea",
        accent: "cyan",
        properties: [
          {
            label: "policy",
            values: ["not knowing the stack isn't a reason to abandon it"],
            tone: "cyan",
          },
          {
            label: "response",
            values: ["learn enough to decide, then keep moving"],
            tone: "green",
          },
        ],
      },
      {
        id: "done",
        summary: "working vs actually finished",
        accent: "green",
        properties: [
          { label: "working", values: ["required"], tone: "green" },
          { label: "finished", values: ["different question"], tone: "orange" },
          {
            label: "definition",
            values: ["usable without explaining away rough parts"],
            tone: "cyan",
          },
          {
            label: "realUsers",
            values: ["expose assumptions / edge cases / awkward flows"],
            tone: "purple",
          },
          {
            label: "withoutUsers",
            values: ["still worth building; different feedback loop"],
            tone: "orange",
          },
        ],
      },
      {
        id: "rules",
        summary: "working principles",
        accent: "green",
        properties: [
          {
            label: "rules",
            values: [
              "product before stack",
              "research before architecture hardens",
              "complexity has to earn its place",
              "working !== finished",
              "AI accelerates; decisions need an owner",
              "old code may be rewritten",
              "users expose assumptions",
            ],
            tone: "green",
          },
        ],
      },
    ],
  },
  "education.ts": {
    defaultNode: "actualLearning",
    nodes: [
      {
        id: "university",
        summary: "formal education",
        accent: "purple",
        properties: [
          {
            label: "institution",
            values: ["Vellore Institute of Technology"],
            tone: "purple",
          },
          {
            label: "degree",
            values: [
              "B.Tech · Computer Science & Engineering",
              "Bioinformatics",
            ],
            tone: "orange",
          },
          { label: "graduation", values: ["2026"], tone: "green" },
          { label: "cgpa", values: ["8.10 / 10"], tone: "green" },
        ],
      },
      {
        id: "school",
        summary: "West Bengal schooling",
        accent: "orange",
        properties: [
          {
            label: "XII",
            values: [
              "Pathfinder Higher Secondary Public School",
              "PCM + Computer Science · 81.60%",
            ],
            tone: "orange",
          },
          {
            label: "X",
            values: ["Nava Nalanda High School", "Madhyamik · 87.75%"],
            tone: "purple",
          },
          { label: "board", values: ["West Bengal Board"], tone: "cyan" },
        ],
      },
      {
        id: "actualLearning",
        summary: "where most engineering happened",
        accent: "cyan",
        properties: [
          {
            label: "classroom",
            values: ["useful baseline; not the main source"],
            tone: "orange",
          },
          {
            label: "afterClass",
            values: ["where most of it happened"],
            tone: "cyan",
          },
          {
            label: "sources",
            values: [
              "documentation",
              "YouTube",
              "AI",
              "research",
              "building things",
              "breaking things and finding out why",
            ],
            tone: "purple",
          },
          {
            label: "syllabus",
            values: ["baseline, not where I wanted to stop"],
            tone: "orange",
          },
          {
            label: "bestTeacher",
            values: ["having something I wanted to build"],
            tone: "green",
          },
        ],
      },
      {
        id: "learningLoop",
        summary: "need → gap → research → build → break → learn",
        accent: "green",
        properties: [
          {
            label: "loop",
            values: ["need → gap → research", "build → break → learn → repeat"],
            tone: "green",
          },
        ],
      },
      {
        id: "perspective",
        summary: "degree vs self-learning",
        accent: "orange",
        properties: [
          {
            label: "degree",
            values: ["structure / deadlines / formal CS foundation"],
            tone: "orange",
          },
          {
            label: "engineering",
            values: ["mostly what I chased after class"],
            tone: "cyan",
          },
          {
            label: "takeaway",
            values: ["knowledge needs somewhere to go"],
            tone: "green",
          },
        ],
      },
    ],
  },
  "vision.ts": {
    defaultNode: "products",
    nodes: [
      {
        id: "products",
        summary: "what deserves time",
        accent: "purple",
        properties: [
          {
            label: "requirement",
            values: ["the product needs a reason to exist"],
            tone: "purple",
          },
          {
            label: "audience",
            values: ["developers / consumers / communities"],
            tone: "purple",
          },
          { label: "technicalNovelty", values: ["optional"], tone: "cyan" },
          { label: "usefulness", values: ["not optional"], tone: "green" },
          {
            label: "projectHorizon",
            values: ["the problem decides"],
            tone: "orange",
          },
          {
            label: "timeBudget",
            values: ["if the right version takes months, it takes months"],
            tone: "orange",
          },
          {
            label: "versionOne",
            values: ["checkpoint, not the reason to leave"],
            tone: "green",
          },
        ],
      },
      {
        id: "productFilter",
        summary: "questions before the MVP",
        accent: "cyan",
        properties: [
          {
            label: "asks",
            values: [
              "does the problem actually exist?",
              "who already cares enough to solve it?",
              "what do existing products still get wrong?",
              "is there depth beyond the MVP?",
              "would I still care in six months?",
            ],
            tone: "cyan",
          },
        ],
      },
      {
        id: "market",
        summary: "is the problem real?",
        accent: "orange",
        properties: [
          {
            label: "demand",
            values: ["evidence the problem isn't imaginary"],
            tone: "green",
          },
          {
            label: "signals",
            values: [
              "existing products",
              "communities discussing it",
              "awkward workarounds",
              "user feedback",
              "repeated gaps",
            ],
            tone: "orange",
          },
          {
            label: "personalPain",
            values: ["useful signal, not market research by itself"],
            tone: "purple",
          },
          {
            label: "competition",
            values: [
              "proof someone cares",
              "still need a reason for another version",
            ],
            tone: "cyan",
          },
        ],
      },
      {
        id: "career",
        summary: "startup / product-team preference",
        accent: "cyan",
        properties: [
          {
            label: "environment",
            values: ["startup / small product team"],
            tone: "cyan",
          },
          {
            label: "why",
            values: [
              "closer to the product",
              "more ownership",
              "shorter decision-to-consequence distance",
              "more surface area to learn",
            ],
            tone: "purple",
          },
          {
            label: "condition",
            values: ["care about what we're building"],
            tone: "orange",
          },
          {
            label: "mustHave",
            values: [
              "people I can learn from",
              "a team that cares about the work",
            ],
            tone: "green",
          },
          {
            label: "dealBreakers",
            values: ["low learning ceiling", "weak team"],
            tone: "orange",
          },
        ],
      },
      {
        id: "founder",
        summary: "maybe someday; engineering first",
        accent: "purple",
        properties: [
          { label: "someday", values: ["I'd like to try"], tone: "purple" },
          {
            label: "appeal",
            values: ["product ownership more than the title"],
            tone: "purple",
          },
          {
            label: "currentConfidence",
            values: ["higher in products than leading a company"],
            tone: "orange",
          },
          {
            label: "rightNow",
            values: ["earn the engineering depth first"],
            tone: "cyan",
          },
        ],
      },
      {
        id: "nextStep",
        summary: "better engineers / earned ownership",
        accent: "cyan",
        properties: [
          { label: "role", values: ["engineer first"], tone: "cyan" },
          {
            label: "environment",
            values: ["habits challenged by engineers better than me"],
            tone: "purple",
          },
          {
            label: "ownership",
            values: ["as much as I've earned"],
            tone: "green",
          },
          {
            label: "title",
            values: ["secondary to the problems"],
            tone: "orange",
          },
        ],
      },
      {
        id: "longTerm",
        summary: "backend depth + product thinking",
        accent: "green",
        properties: [
          {
            label: "direction",
            values: ["backend-heavy product engineer"],
            tone: "cyan",
          },
          {
            label: "goal",
            values: ["deep systems work without losing whole-product thinking"],
            tone: "green",
          },
          { label: "fixedPlan", values: ["false"], tone: "orange" },
        ],
      },
    ],
  },
  "values.ts": {
    defaultNode: "engineering",
    nodes: [
      {
        id: "priorities",
        summary: "what gets protected first",
        accent: "orange",
        properties: [
          {
            label: "defaultOrder",
            values: ["architecture", "shipping speed", "UI / UX", "learning"],
            tone: "orange",
          },
          {
            label: "caveat",
            values: ["context wins; this is the natural order"],
            tone: "purple",
          },
        ],
      },
      {
        id: "engineering",
        summary: "technical rules with product context",
        accent: "cyan",
        properties: [
          {
            label: "architecture",
            values: ["get the shape right before moving fast"],
            tone: "cyan",
          },
          {
            label: "complexity",
            values: ["has to earn its place"],
            tone: "orange",
          },
          {
            label: "shipping",
            values: ["move fast once decisions stop being vague"],
            tone: "green",
          },
          {
            label: "uiUx",
            values: ["if users fight it, backend gets no extra credit"],
            tone: "purple",
          },
          {
            label: "learning",
            values: ["best when it changes what I can build"],
            tone: "green",
          },
          {
            label: "originality",
            values: ["learn from others; ship your own"],
            tone: "purple",
          },
          {
            label: "utility",
            values: ["useful > impressive only to developers"],
            tone: "orange",
          },
          {
            label: "ai",
            values: ["use aggressively; keep decisions owned"],
            tone: "cyan",
          },
        ],
      },
      {
        id: "takes",
        summary: "opinions with trade-offs",
        accent: "purple",
        properties: [
          {
            label: "computerScience",
            values: ["easy to start; genuinely good is different"],
            tone: "cyan",
          },
          {
            label: "aiAndJobs",
            values: [
              "replaces work, not everyone",
              "context and ownership matter more",
            ],
            tone: "purple",
          },
          {
            label: "doctorsVsSDE",
            values: [
              "direct social value: keeping people alive wins",
              "the jobs solve different problems",
            ],
            tone: "orange",
          },
          {
            label: "degrees",
            values: ["harder syllabus ≠ more valuable person"],
            tone: "green",
          },
        ],
      },
      {
        id: "notForMe",
        summary: "things that do not qualify",
        accent: "orange",
        properties: [
          {
            label: "reject",
            values: [
              "architecture added for show",
              "tutorial clones as original work",
              "AI output nobody understands",
              "UI as somebody else's problem",
              "learning that never becomes building",
              "first working version called finished",
            ],
            tone: "orange",
          },
        ],
      },
      {
        id: "shortVersion",
        summary: "compressed working principles",
        accent: "green",
        properties: [
          {
            label: "keeps",
            values: [
              "architecture before acceleration",
              "ship once decisions are clear",
              "UI / UX is product work",
              "learn by building",
              "complexity must justify itself",
              "AI cheaper; judgment matters more",
            ],
            tone: "green",
          },
        ],
      },
    ],
  },
  "personality.ts": {
    defaultNode: "qualityControl",
    nodes: [
      {
        id: "baseline",
        summary: "default operating style",
        accent: "purple",
        properties: [
          { label: "socialBattery", values: ["introvert"], tone: "purple" },
          { label: "stubborn", values: ["true"], tone: "green" },
          {
            label: "patience",
            values: ["high when I care about the result"],
            tone: "cyan",
          },
          { label: "humor", values: ["mostly sarcasm"], tone: "orange" },
          {
            label: "comfortZone",
            values: ["not particularly protective of it"],
            tone: "green",
          },
        ],
      },
      {
        id: "qualityControl",
        summary: "polish vs time",
        accent: "cyan",
        properties: [
          {
            label: "threshold",
            values: ["if I can still see what bothers me, I'm not done"],
            tone: "cyan",
          },
          {
            label: "upside",
            values: ["last rough edges usually don't survive"],
            tone: "green",
          },
          {
            label: "downside",
            values: ["far too long fixing the last 10%"],
            tone: "orange",
          },
          {
            label: "visualTaste",
            values: ["higher than my frontend skill"],
            tone: "purple",
          },
          {
            label: "response",
            values: ["keep iterating anyway"],
            tone: "green",
          },
          {
            label: "evidence",
            values: ["you're looking at it"],
            tone: "orange",
          },
        ],
      },
      {
        id: "debugging",
        summary: "tonight / three days / three weeks",
        accent: "green",
        properties: [
          {
            label: "default",
            values: ["until it's actually fixed"],
            tone: "green",
          },
          {
            label: "possibleModes",
            values: [
              "solve it tonight",
              "fight it for three days",
              "ignore it for three weeks",
              "remember it randomly and come back",
            ],
            tone: "cyan",
          },
          {
            label: "unresolved",
            values: ["usually stays somewhere in my head"],
            tone: "orange",
          },
        ],
      },
      {
        id: "stubbornness",
        summary: "useful right until it isn't",
        accent: "orange",
        properties: [
          {
            label: "usefulWhen",
            values: ["the problem actually has an answer"],
            tone: "green",
          },
          {
            label: "dangerousWhen",
            values: ["stopping was the smarter engineering decision"],
            tone: "orange",
          },
          {
            label: "summary",
            values: ["useful right until it isn't"],
            tone: "purple",
          },
        ],
      },
      {
        id: "teamwork",
        summary: "professional data still incomplete",
        accent: "orange",
        properties: [
          {
            label: "professionalSDEExperience",
            values: ["not enough data yet"],
            tone: "orange",
          },
          {
            label: "expectation",
            values: ["expect to adapt; won't pretend I've proved it"],
            tone: "cyan",
          },
          {
            label: "groupWorkPattern",
            values: ["if work stalls, I pick up what's missing"],
            tone: "green",
          },
          {
            label: "badHabit",
            values: ["doing it myself can feel faster than fixing ownership"],
            tone: "orange",
          },
          {
            label: "lesson",
            values: ["works for college; won't scale to a real team"],
            tone: "purple",
          },
          {
            label: "architectureDebates",
            values: ["ask after I've shipped with one"],
            tone: "cyan",
          },
        ],
      },
      {
        id: "competition",
        summary: "strong people nearby → push harder",
        accent: "purple",
        properties: [
          { label: "baseline", values: ["quiet"], tone: "purple" },
          {
            label: "trigger",
            values: ["someone good building next to me"],
            tone: "orange",
          },
          {
            label: "effect",
            values: ["I start pushing harder"],
            tone: "green",
          },
          {
            label: "target",
            values: ["yesterday's version of my own work"],
            tone: "cyan",
          },
        ],
      },
      {
        id: "adaptability",
        summary: "figure out the rules, then adjust",
        accent: "cyan",
        properties: [
          {
            label: "technical",
            values: ["built into things I didn't know yet"],
            tone: "cyan",
          },
          {
            label: "newSituation",
            values: ["figure out the rules, then adjust"],
            tone: "green",
          },
          {
            label: "teamEnvironment",
            values: ["untested professionally"],
            tone: "orange",
          },
        ],
      },
      {
        id: "tradeoffs",
        summary: "traits with benefits and costs",
        accent: "purple",
        properties: [
          {
            label: "obsession",
            values: ["gives polish", "costs time"],
            tone: "purple",
          },
          {
            label: "stubbornness",
            values: ["gives persistence", "costs knowing when to stop"],
            tone: "orange",
          },
          {
            label: "selfSufficiency",
            values: ["gives finished work", "costs taking on too much"],
            tone: "cyan",
          },
          {
            label: "visualSensitivity",
            values: ["gives better product feel", "costs another redesign"],
            tone: "green",
          },
        ],
      },
    ],
  },
};

type ActivityIconName =
  | "explorer"
  | "search"
  | "source"
  | "run"
  | "extensions"
  | "account"
  | "settings";

function ActivityIcon({ name }: { name: ActivityIconName }) {
  const paths: Record<ActivityIconName, ReactNode> = {
    explorer: (
      <>
        <path d="M3.5 3.5h9l4 4v13H3.5z" />
        <path d="M12.5 3.5v4h4" />
        <path d="M6.5 11h6M6.5 14h6M6.5 17h4" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="5.5" />
        <path d="m15 15 4.5 4.5" />
      </>
    ),
    source: (
      <>
        <circle cx="7" cy="5" r="2" />
        <circle cx="7" cy="19" r="2" />
        <circle cx="17" cy="12" r="2" />
        <path d="M7 7v10M9 7c5 0 2 5 6 5" />
      </>
    ),
    run: (
      <>
        <path d="m8 4 11 8-11 8z" />
        <path d="M4 5v14" />
      </>
    ),
    extensions: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </>
    ),
    account: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c.7-3.5 3.1-5.5 7-5.5s6.3 2 7 5.5" />
        <circle cx="12" cy="12" r="9" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
      </>
    ),
  };
  return (
    <svg className="ide-activity-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function SemanticMap({
  activeFile,
  selectedNodeId,
  activeLine,
  collapsed,
  collapsedNodeIds,
  onSelectNode,
  onToggleNode,
  onToggleCollapsed,
}: {
  activeFile: string;
  selectedNodeId: string | undefined;
  activeLine: number | undefined;
  collapsed: boolean;
  collapsedNodeIds: readonly string[];
  onSelectNode: (id: string) => void;
  onToggleNode: (id: string) => void;
  onToggleCollapsed: () => void;
}) {
  const definition = semanticMaps[activeFile];
  const activeNode = definition?.nodes.find(
    (node) => node.id === selectedNodeId,
  );

  return (
    <aside
      className={`semantic-map ${collapsed ? "is-collapsed" : ""}`}
      aria-label={`Semantic map for ${activeFile}`}
    >
      <header className="semantic-map-header">
        <b>
          <span aria-hidden="true">◇</span>
          <span className="semantic-map-title">SEMANTIC MAP</span>
        </b>
        {!collapsed && (
          <>
            <em>{activeFile}</em>
            <small>{activeLine ? `Ln ${activeLine}` : "Ln —"}</small>
          </>
        )}
        <button
          type="button"
          onClick={onToggleCollapsed}
          aria-label={
            collapsed ? "Expand semantic map" : "Collapse semantic map"
          }
          title={collapsed ? "Expand semantic map" : "Collapse semantic map"}
        >
          {collapsed ? "›" : "‹"}
        </button>
      </header>
      {!collapsed && (
        <>
          <div className="semantic-map-body">
            {definition ? (
              <div className="semantic-map-graph">
                <div
                  className="semantic-map-node-list"
                  role="group"
                  aria-label={`${activeFile} semantic nodes`}
                >
                  {definition.nodes.map((node) => {
                    const active = node.id === activeNode?.id;
                    const nodeCollapsed = collapsedNodeIds.includes(node.id);
                    const propertiesId = `semantic-properties-${activeFile.replace(/\W/g, "-")}-${node.id}`;
                    return (
                      <div
                        className={`semantic-map-node-wrap ${active ? "is-active" : ""} ${nodeCollapsed ? "is-collapsed" : "is-expanded"}`}
                        key={node.id}
                      >
                        <div className="semantic-map-node-row">
                          <button
                            className={`semantic-map-node semantic-map-node--${node.accent}`}
                            type="button"
                            onClick={() => onSelectNode(node.id)}
                            aria-pressed={active}
                          >
                            <i aria-hidden="true" />
                            <span>
                              <b>{node.id}</b>
                              <small>{node.summary}</small>
                            </span>
                          </button>
                          <button
                            className="semantic-map-node-toggle"
                            type="button"
                            onClick={() => onToggleNode(node.id)}
                            aria-expanded={!nodeCollapsed}
                            aria-controls={propertiesId}
                            aria-label={`${nodeCollapsed ? "Expand" : "Collapse"} ${node.id} properties`}
                            title={`${nodeCollapsed ? "Expand" : "Collapse"} ${node.id}`}
                          >
                            <span aria-hidden="true">
                              {nodeCollapsed ? "›" : "⌄"}
                            </span>
                          </button>
                        </div>
                        {!nodeCollapsed && (
                          <div
                            id={propertiesId}
                            className="semantic-map-properties"
                            aria-label={`${node.id} properties`}
                          >
                            {node.properties.map((property) => (
                              <div
                                className={`semantic-map-property semantic-map-property--${property.tone ?? node.accent}`}
                                key={property.label}
                              >
                                <span>{property.label}</span>
                                <i aria-hidden="true">→</i>
                                <div>
                                  {property.values.map((value) => (
                                    <b key={value}>{value}</b>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p className="semantic-map-empty">
                <span aria-hidden="true">◇</span>No semantic structure yet.
                <small>{activeFile} is still pending implementation.</small>
              </p>
            )}
          </div>
          <nav
            className="semantic-map-actions"
            aria-label="About workspace links"
          >
            <a
              href="https://sambit.dev/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i aria-hidden="true">▧</i>Resume
            </a>
            <a href="/projects">
              <i aria-hidden="true">◫</i>Projects
            </a>
            <a
              href="https://github.com/NoobSambit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i aria-hidden="true">◉</i>GitHub
            </a>
          </nav>
        </>
      )}
    </aside>
  );
}

function EngineeringSource() {
  return (
    <ol
      className="ide-code"
      aria-label="Sambit Pradhan engineering workflow TypeScript source"
    >
      <li>
        <span className="comment">/**</span>
      </li>
      <li>
        <span className="comment"> * engineering.ts</span>
      </li>
      <li>
        <span className="comment">
          {" "}
          * how I usually turn an idea into something I'm willing to ship
        </span>
      </li>
      <li>
        <span className="comment"> */</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="process">
          process
        </span>{" "}
        = {"{"}
      </li>
      <li>
        {"  "}
        <span className="property">start</span>:{" "}
        <span className="string">"the problem, not the stack"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">discovery</span>: [
      </li>
      <li>
        {"    "}
        <span className="string">"think the idea through on my own first"</span>
        ,
      </li>
      <li>
        {"    "}
        <span className="string">
          "use AI to pressure-test it and dig through the unknowns"
        </span>
        ,
      </li>
      <li>
        {"    "}
        <span className="string">
          "study similar products, APIs and platform constraints"
        </span>
        ,
      </li>
      <li>
        {"    "}
        <span className="string">"figure out who would use it and why"</span>,
      </li>
      <li>{"  ],"}</li>
      <li />
      <li>
        {"  "}
        <span className="property">stack</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"picked after I understand the product"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">planning</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"slow on purpose"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">prd</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "detailed enough that coding isn't where I rediscover the product"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">implementation</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"move fast once the decisions are made"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">validation</span>: [
      </li>
      <li>
        {"    "}
        <span className="string">"build a useful slice"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">"test it"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">"fix the assumptions"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">"then stack the next phase"</span>,
      </li>
      <li>{"  ],"}</li>
      <li />
      <li>
        {"  "}
        <span className="property">finish</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "revisit whatever still feels improvised"
        </span>
        ,
      </li>
      <li>
        <span className="string">{"};"}</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="oldCode">
          oldCode
        </span>{" "}
        = {"{"}
      </li>
      <li>
        {"  "}
        <span className="property">hindsight</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "I can usually see what I didn't know yet."
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">rewriteTriggers</span>: [
      </li>
      <li>
        {"    "}
        <span className="string">"folders that grew without a plan"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">
          "logic that should have been split sooner"
        </span>
        ,
      </li>
      <li>
        {"    "}
        <span className="string">"UI I wouldn't ship today"</span>,
      </li>
      <li>{"  ],"}</li>
      <li />
      <li>
        {"  "}
        <span className="property">rule</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "working code isn't protected from being rewritten"
        </span>
        ,
      </li>
      <li>
        <span className="string">{"};"}</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="caseStudy">
          caseStudy
        </span>{" "}
        = {"{"}
      </li>
      <li>
        {"  "}
        <span className="property">project</span>:{" "}
        <span className="string">"ArmyVerse"</span>,
      </li>
      <li>
        {"  "}
        <span className="property">feature</span>:{" "}
        <span className="string">"playlist → Spotify export"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">firstMiss</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "I designed the MVP before researching Spotify's public-app
          constraints deeply enough."
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">constraint</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "one development-mode Spotify app wasn't a clean path for a public
          product"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">response</span>: [
      </li>
      <li>
        {"    "}
        <span className="string">"added a per-user BYO Spotify app flow"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">
          "let users connect through their own Client ID / optional Client
          Secret"
        </span>
        ,
      </li>
      <li>
        {"    "}
        <span className="string">
          "encrypted Spotify credentials and refresh tokens at rest"
        </span>
        ,
      </li>
      <li>
        {"    "}
        <span className="string">
          "kept the original owner-account export as a fallback"
        </span>
        ,
      </li>
      <li>{"  ],"}</li>
      <li />
      <li>
        {"  "}
        <span className="property">lesson</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "platform constraints belong in product research, not in a surprise
          after the MVP"
        </span>
        ,
      </li>
      <li>
        <span className="string">{"};"}</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="ai">
          ai
        </span>{" "}
        = {"{"}
      </li>
      <li>
        {"  "}
        <span className="property">take</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "AI can write very strong code now. I still don't let it own the
          important decisions."
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">usefulFor</span>: [
      </li>
      <li>
        {"    "}
        <span className="string">"research"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">"implementation speed"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">"challenging an approach"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">"working through unfamiliar territory"</span>,
      </li>
      <li>{"  ],"}</li>
      <li />
      <li>
        {"  "}
        <span className="property">IStillOwn</span>: [
      </li>
      <li>
        {"    "}
        <span className="string">"what should exist"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">"product trade-offs"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">"architecture"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">"what gets trusted"</span>,
      </li>
      <li>{"  ],"}</li>
      <li>
        <span className="string">{"};"}</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="tradeoffs">
          tradeoffs
        </span>{" "}
        = {"{"}
      </li>
      <li>
        {"  "}
        <span className="property">badHabit</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "I can over-engineer things that deserve a smaller answer"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">evidence</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"this portfolio is probably Exhibit A"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">correction</span>: [
      </li>
      <li>
        {"    "}
        <span className="string">"start from the product constraint"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">"make complexity justify itself"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">
          "prefer the simple path until it stops being enough"
        </span>
        ,
      </li>
      <li>{"  ],"}</li>
      <li>
        <span className="string">{"};"}</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="unknowns">
          unknowns
        </span>{" "}
        = {"{"}
      </li>
      <li>
        {"  "}
        <span className="property">policy</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "not knowing the stack yet isn't a reason to cut the idea"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">response</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "learn enough to make the decision, then keep moving"
        </span>
        ,
      </li>
      <li>
        <span className="string">{"};"}</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="done">
          done
        </span>{" "}
        = {"{"}
      </li>
      <li>
        {"  "}
        <span className="property">working</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"required"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">finished</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"different question"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">definition</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "I can use it without immediately wanting to explain away the rough
          parts"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">realUsers</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "they find assumptions, edge cases and awkward flows faster than I do"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">withoutUsers</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "still worth building; the feedback loop is just different"
        </span>
        ,
      </li>
      <li>
        <span className="string">{"};"}</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="rules">
          rules
        </span>{" "}
        = [
      </li>
      <li>
        {"  "}
        <span className="string">"product before stack"</span>,
      </li>
      <li>
        {"  "}
        <span className="string">"research before architecture hardens"</span>,
      </li>
      <li>
        {"  "}
        <span className="string">"complexity has to earn its place"</span>,
      </li>
      <li>
        {"  "}
        <span className="string">"working !== finished"</span>,
      </li>
      <li>
        {"  "}
        <span className="string">
          "AI accelerates implementation; decisions still need an owner"
        </span>
        ,
      </li>
      <li>
        {"  "}
        <span className="string">"old code is allowed to be rewritten"</span>,
      </li>
      <li>
        {"  "}
        <span className="string">"users expose assumptions"</span>,
      </li>
      <li>];</li>
    </ol>
  );
}

function ValuesSource() {
  return (
    <ol
      className="ide-code"
      aria-label="Sambit Pradhan engineering values and opinions TypeScript source"
    >
      <li>
        <span className="comment">/**</span>
      </li>
      <li>
        <span className="comment"> * values.ts</span>
      </li>
      <li>
        <span className="comment">
          {" "}
          * things I actually believe — not a list of virtues set to true
        </span>
      </li>
      <li>
        <span className="comment"> */</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="priorities">
          priorities
        </span>{" "}
        = {"{"}
      </li>
      <li>
        {"  "}
        <span className="property">defaultOrder</span>: [
      </li>
      <li>
        {"    "}
        <span className="string">"architecture"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">"shipping speed"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">"UI / UX"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">"learning"</span>,
      </li>
      <li>{"  ],"}</li>
      <li />
      <li>
        {"  "}
        <span className="property">caveat</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "context wins; this is just the order I naturally protect"
        </span>
        ,
      </li>
      <li>
        <span className="string">{"};"}</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="engineering">
          engineering
        </span>{" "}
        = {"{"}
      </li>
      <li>
        {"  "}
        <span className="property">architecture</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "get the shape right before trying to move fast"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">complexity</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"it has to earn its place"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">shipping</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "move fast after the important decisions stop being vague"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">uiUx</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "if the user has to fight it, the backend doesn't get extra credit"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">learning</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"best when it changes what I can build"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">originality</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "learn from other people's builds; ship your own"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">utility</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "I'd rather build something useful than something impressive only to
          developers"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">ai</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "use it aggressively; keep the important decisions owned"
        </span>
        ,
      </li>
      <li>
        <span className="string">{"};"}</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="takes">
          takes
        </span>{" "}
        = [
      </li>
      <li>{"  "}&#123;</li>
      <li>
        {"    "}
        <span className="property">topic</span>:{" "}
        <span className="string">"computer science"</span>,
      </li>
      <li>
        {"    "}
        <span className="property">opinion</span>:
      </li>
      <li>
        {"      "}
        <span className="string">
          "CS is easier to get started in than a lot of core engineering.
          Getting genuinely good at it is a different question."
        </span>
        ,
      </li>
      <li>{"  "}&#125;,</li>
      <li />
      <li>{"  "}&#123;</li>
      <li>
        {"    "}
        <span className="property">topic</span>:{" "}
        <span className="string">"AI and jobs"</span>,
      </li>
      <li>
        {"    "}
        <span className="property">opinion</span>:
      </li>
      <li>
        {"      "}
        <span className="string">
          "AI will replace a lot of work. I don't think it replaces everyone."
        </span>
        ,
      </li>
      <li>
        {"    "}
        <span className="property">reason</span>:
      </li>
      <li>
        {"      "}
        <span className="string">
          "as implementation gets cheaper, decisions, context and ownership
          matter more"
        </span>
        ,
      </li>
      <li>{"  "}&#125;,</li>
      <li />
      <li>{"  "}&#123;</li>
      <li>
        {"    "}
        <span className="property">topic</span>:{" "}
        <span className="string">"doctors vs software engineers"</span>,
      </li>
      <li>
        {"    "}
        <span className="property">opinion</span>:
      </li>
      <li>
        {"      "}
        <span className="string">
          "If you force me to compare direct social value, I put doctors above
          software engineers. Keeping people alive wins."
        </span>
        ,
      </li>
      <li>
        {"    "}
        <span className="property">note</span>:
      </li>
      <li>
        {"      "}
        <span className="string">
          "that doesn't make engineering unimportant; the jobs solve very
          different problems"
        </span>
        ,
      </li>
      <li>{"  "}&#125;,</li>
      <li />
      <li>{"  "}&#123;</li>
      <li>
        {"    "}
        <span className="property">topic</span>:{" "}
        <span className="string">"degrees"</span>,
      </li>
      <li>
        {"    "}
        <span className="property">opinion</span>:
      </li>
      <li>
        {"      "}
        <span className="string">
          "a harder syllabus doesn't automatically make the person doing it more
          valuable"
        </span>
        ,
      </li>
      <li>{"  "}&#125;,</li>
      <li>];</li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="notForMe">
          notForMe
        </span>{" "}
        = [
      </li>
      <li>
        {"  "}
        <span className="string">
          "architecture added because it sounds advanced"
        </span>
        ,
      </li>
      <li>
        {"  "}
        <span className="string">
          "tutorial clones presented like original work"
        </span>
        ,
      </li>
      <li>
        {"  "}
        <span className="string">
          "AI output nobody involved actually understands"
        </span>
        ,
      </li>
      <li>
        {"  "}
        <span className="string">"treating UI as somebody else's problem"</span>
        ,
      </li>
      <li>
        {"  "}
        <span className="string">
          "learning that never turns into building"
        </span>
        ,
      </li>
      <li>
        {"  "}
        <span className="string">
          "calling the first working version finished"
        </span>
        ,
      </li>
      <li>];</li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="shortVersion">
          shortVersion
        </span>{" "}
        = [
      </li>
      <li>
        {"  "}
        <span className="string">"architecture before acceleration"</span>,
      </li>
      <li>
        {"  "}
        <span className="string">"ship once the decisions are clear"</span>,
      </li>
      <li>
        {"  "}
        <span className="string">"UI / UX is product work"</span>,
      </li>
      <li>
        {"  "}
        <span className="string">"learn by building"</span>,
      </li>
      <li>
        {"  "}
        <span className="string">"complexity must justify itself"</span>,
      </li>
      <li>
        {"  "}
        <span className="string">
          "AI makes implementation cheaper; judgment matters more"
        </span>
        ,
      </li>
      <li>];</li>
    </ol>
  );
}

function PersonalitySource() {
  return (
    <ol
      className="ide-code"
      aria-label="Sambit Pradhan personality TypeScript source"
    >
      <li>
        <span className="comment">/**</span>
      </li>
      <li>
        <span className="comment"> * personality.ts</span>
      </li>
      <li>
        <span className="comment">
          {" "}
          * useful traits, annoying traits, and the overlap between them
        </span>
      </li>
      <li>
        <span className="comment"> */</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="baseline">
          baseline
        </span>{" "}
        = {"{"}
      </li>
      <li>
        {"  "}
        <span className="property">socialBattery</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"introvert"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">stubborn</span>:
      </li>
      <li>
        {"    "}
        <span className="green-code">true</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">patience</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"high when I care about the result"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">humor</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"mostly sarcasm"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">comfortZone</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"not particularly protective of it"</span>,
      </li>
      <li>
        <span className="string">{"};"}</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="qualityControl">
          qualityControl
        </span>{" "}
        = {"{"}
      </li>
      <li>
        {"  "}
        <span className="property">threshold</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "if I can still see what bothers me, I'm probably not done"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">upside</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "the last rough edges usually don't survive"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">downside</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "I can spend far too long fixing the last 10%"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">visualTaste</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"higher than my frontend skill"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">response</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"keep iterating anyway"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">evidence</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "you are currently looking at the evidence"
        </span>
        ,
      </li>
      <li>
        <span className="string">{"};"}</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="debugging">
          debugging
        </span>{" "}
        = {"{"}
      </li>
      <li>
        {"  "}
        <span className="property">default</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"until it's actually fixed"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">possibleModes</span>: [
      </li>
      <li>
        {"    "}
        <span className="string">"solve it tonight"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">"fight it for three days"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">"ignore it for three weeks"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">"remember it randomly and come back"</span>,
      </li>
      <li>{"  ],"}</li>
      <li />
      <li>
        {"  "}
        <span className="property">unresolved</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"usually stays somewhere in my head"</span>,
      </li>
      <li>
        <span className="string">{"};"}</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="stubbornness">
          stubbornness
        </span>{" "}
        = {"{"}
      </li>
      <li>
        {"  "}
        <span className="property">usefulWhen</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"the problem actually has an answer"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">dangerousWhen</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "stopping would have been the smarter engineering decision"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">summary</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"useful right until it isn't"</span>,
      </li>
      <li>
        <span className="string">{"};"}</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="teamwork">
          teamwork
        </span>{" "}
        = {"{"}
      </li>
      <li>
        {"  "}
        <span className="property">professionalSDEExperience</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"not enough data yet"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">expectation</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "I expect to adapt; I won't pretend I've already proved it"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">groupWorkPattern</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "if the work stalls, I usually pick up whatever is missing"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">badHabit</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "finishing it myself can feel faster than fixing the ownership
          problem"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">lesson</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "that works for college projects; it won't scale to a real engineering
          team"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">architectureDebates</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"ask again after I've shipped with one"</span>,
      </li>
      <li>
        <span className="string">{"};"}</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="competition">
          competition
        </span>{" "}
        = {"{"}
      </li>
      <li>
        {"  "}
        <span className="property">baseline</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"quiet"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">trigger</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"someone good building next to me"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">effect</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"I start pushing harder"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">target</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "mostly yesterday's version of my own work"
        </span>
        ,
      </li>
      <li>
        <span className="string">{"};"}</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="adaptability">
          adaptability
        </span>{" "}
        = {"{"}
      </li>
      <li>
        {"  "}
        <span className="property">technical</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "demonstrated mostly by building into things I didn't know yet"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">newSituation</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"figure out the rules, then adjust"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">teamEnvironment</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"untested professionally"</span>,
      </li>
      <li>
        <span className="string">{"};"}</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="tradeoffs">
          tradeoffs
        </span>{" "}
        = [
      </li>
      <li>{"  "}&#123;</li>
      <li>
        {"    "}
        <span className="property">trait</span>:{" "}
        <span className="string">"obsession"</span>,
      </li>
      <li>
        {"    "}
        <span className="property">gives</span>:{" "}
        <span className="string">"polish"</span>,
      </li>
      <li>
        {"    "}
        <span className="property">costs</span>:{" "}
        <span className="string">"time"</span>,
      </li>
      <li>{"  "}&#125;,</li>
      <li>{"  "}&#123;</li>
      <li>
        {"    "}
        <span className="property">trait</span>:{" "}
        <span className="string">"stubbornness"</span>,
      </li>
      <li>
        {"    "}
        <span className="property">gives</span>:{" "}
        <span className="string">"persistence"</span>,
      </li>
      <li>
        {"    "}
        <span className="property">costs</span>:{" "}
        <span className="string">"knowing when to stop"</span>,
      </li>
      <li>{"  "}&#125;,</li>
      <li>{"  "}&#123;</li>
      <li>
        {"    "}
        <span className="property">trait</span>:{" "}
        <span className="string">"self-sufficiency"</span>,
      </li>
      <li>
        {"    "}
        <span className="property">gives</span>:{" "}
        <span className="string">"finished work"</span>,
      </li>
      <li>
        {"    "}
        <span className="property">costs</span>:{" "}
        <span className="string">"taking on too much"</span>,
      </li>
      <li>{"  "}&#125;,</li>
      <li>{"  "}&#123;</li>
      <li>
        {"    "}
        <span className="property">trait</span>:{" "}
        <span className="string">"visual sensitivity"</span>,
      </li>
      <li>
        {"    "}
        <span className="property">gives</span>:{" "}
        <span className="string">"better product feel"</span>,
      </li>
      <li>
        {"    "}
        <span className="property">costs</span>:{" "}
        <span className="string">"another redesign"</span>,
      </li>
      <li>{"  "}&#125;,</li>
      <li>];</li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable">shortVersion</span> = [
      </li>
      <li>
        {"  "}
        <span className="string">"introverted"</span>,
      </li>
      <li>
        {"  "}
        <span className="string">"stubborn"</span>,
      </li>
      <li>
        {"  "}
        <span className="string">"patient when it matters"</span>,
      </li>
      <li>
        {"  "}
        <span className="string">"quietly competitive"</span>,
      </li>
      <li>
        {"  "}
        <span className="string">"adaptable"</span>,
      </li>
      <li>
        {"  "}
        <span className="string">
          "far too willing to polish something twice"
        </span>
        ,
      </li>
      <li>];</li>
    </ol>
  );
}

function VisionSource() {
  return (
    <ol
      className="ide-code"
      aria-label="Sambit Pradhan product vision TypeScript source"
    >
      <li>
        <span className="comment">/**</span>
      </li>
      <li>
        <span className="comment"> * vision.ts</span>
      </li>
      <li>
        <span className="comment">
          {" "}
          * what I think is worth building, and where I'm trying to go
        </span>
      </li>
      <li>
        <span className="comment"> */</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="products">
          products
        </span>{" "}
        = {"{"}
      </li>
      <li>
        {"  "}
        <span className="property">category</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"secondary"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">requirement</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"the product needs a reason to exist"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">audience</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "developers, consumers, communities — depends on the problem"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">technicalNovelty</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"optional"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">usefulness</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"not optional"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">projectHorizon</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"the problem decides"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">timeBudget</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "if the right version takes months, it takes months"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">versionOne</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"a checkpoint, not the reason to leave"</span>,
      </li>
      <li>
        <span className="string">{"};"}</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="productFilter">
          productFilter
        </span>{" "}
        = [
      </li>
      <li>
        {"  "}
        <span className="string">"does the problem actually exist?"</span>,
      </li>
      <li>
        {"  "}
        <span className="string">
          "who already cares enough to solve it somehow?"
        </span>
        ,
      </li>
      <li>
        {"  "}
        <span className="string">
          "what do existing products still get wrong?"
        </span>
        ,
      </li>
      <li>
        {"  "}
        <span className="string">"is there enough depth beyond the MVP?"</span>,
      </li>
      <li>
        {"  "}
        <span className="string">
          "would I still care about this six months from now?"
        </span>
        ,
      </li>
      <li>];</li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="market">
          market
        </span>{" "}
        = {"{"}
      </li>
      <li>
        {"  "}
        <span className="property">demand</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "evidence that the problem isn't imaginary"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">signals</span>: [
      </li>
      <li>
        {"    "}
        <span className="string">"existing products"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">
          "communities already discussing the problem"
        </span>
        ,
      </li>
      <li>
        {"    "}
        <span className="string">"awkward workarounds people rely on"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">"user feedback"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">"gaps that keep showing up"</span>,
      </li>
      <li>{"  ],"}</li>
      <li />
      <li>
        {"  "}
        <span className="property">personalPain</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "a useful signal, not market research by itself"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">competition</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "proof that someone cares; the question is whether I have a reason to
          build another version"
        </span>
        ,
      </li>
      <li>
        <span className="string">{"};"}</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="career">
          career
        </span>{" "}
        = {"{"}
      </li>
      <li>
        {"  "}
        <span className="property">preferredEnvironment</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"startup / small product team"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">why</span>: [
      </li>
      <li>
        {"    "}
        <span className="string">"closer to the product"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">"more ownership"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">
          "shorter distance between a decision and its consequence"
        </span>
        ,
      </li>
      <li>
        {"    "}
        <span className="string">"more surface area to learn from"</span>,
      </li>
      <li>{"  ],"}</li>
      <li />
      <li>
        {"  "}
        <span className="property">condition</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "I still need to care about what we're building"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">mustHave</span>: [
      </li>
      <li>
        {"    "}
        <span className="string">"people I can learn from"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">
          "a team that actually cares about the work"
        </span>
        ,
      </li>
      <li>{"  ],"}</li>
      <li />
      <li>
        {"  "}
        <span className="property">dealBreakers</span>: [
      </li>
      <li>
        {"    "}
        <span className="string">"low learning ceiling"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">"weak team"</span>,
      </li>
      <li>{"  ],"}</li>
      <li>
        <span className="string">{"};"}</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="founder">
          founder
        </span>{" "}
        = {"{"}
      </li>
      <li>
        {"  "}
        <span className="property">someday</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"I'd like to try"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">appeal</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "I like the product ownership more than the title"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">currentConfidence</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "higher in building products than in leading a company"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">rightNow</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "I'd rather earn the engineering depth first"
        </span>
        ,
      </li>
      <li>
        <span className="string">{"};"}</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="nextStep">
          nextStep
        </span>{" "}
        = {"{"}
      </li>
      <li>
        {"  "}
        <span className="property">role</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"engineer first"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">environment</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "somewhere my current habits get challenged by engineers better than
          me"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">ownership</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"as much as I've earned"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">title</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "secondary to the kind of problems I'm working on"
        </span>
        ,
      </li>
      <li>
        <span className="string">{"};"}</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="longTerm">
          longTerm
        </span>{" "}
        = {"{"}
      </li>
      <li>
        {"  "}
        <span className="property">direction</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "strong backend engineer who can still think about the whole product"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">goal</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "become the engineer who can take a hard product from vague idea to
          something people actually use"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">fixedPlan</span>:{" "}
        <span className="green-code">false</span>,
      </li>
      <li>
        <span className="string">{"};"}</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable">shortVersion</span> = [
      </li>
      <li>
        {"  "}
        <span className="string">"build things worth maintaining"</span>,
      </li>
      <li>
        {"  "}
        <span className="string">"let the problem decide the timeline"</span>,
      </li>
      <li>
        {"  "}
        <span className="string">
          "use market research to kill imaginary problems early"
        </span>
        ,
      </li>
      <li>
        {"  "}
        <span className="string">"stay close to the product"</span>,
      </li>
      <li>
        {"  "}
        <span className="string">"work around people better than me"</span>,
      </li>
      <li>
        {"  "}
        <span className="string">"earn depth before chasing titles"</span>,
      </li>
      <li>];</li>
    </ol>
  );
}

function EducationSource() {
  return (
    <ol
      className="ide-code"
      aria-label="Sambit Pradhan education TypeScript source"
    >
      <li>
        <span className="comment">/**</span>
      </li>
      <li>
        <span className="comment"> * education.ts</span>
      </li>
      <li>
        <span className="comment">
          {" "}
          * formal education + where most of the actual learning happened
        </span>
      </li>
      <li>
        <span className="comment"> */</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="university">
          university
        </span>{" "}
        = {"{"}
      </li>
      <li>
        {"  "}
        <span className="property">institution</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"Vellore Institute of Technology"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">campus</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"Vellore"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">degree</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "B.Tech · Computer Science &amp; Engineering"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">specialization</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"Bioinformatics"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">graduation</span>:
      </li>
      <li>{"    "}2026,</li>
      <li />
      <li>
        {"  "}
        <span className="property">cgpa</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"8.10 / 10"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">status</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"graduated"</span>,
      </li>
      <li>
        <span className="string">{"};"}</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="school">
          school
        </span>{" "}
        = [
      </li>
      <li>{"  "}&#123;</li>
      <li>
        {"    "}
        <span className="property">stage</span>:
      </li>
      <li>
        {"      "}
        <span className="string">"Class XI–XII"</span>,
      </li>
      <li />
      <li>
        {"    "}
        <span className="property">institution</span>:
      </li>
      <li>
        {"      "}
        <span className="string">
          "Pathfinder Higher Secondary Public School"
        </span>
        ,
      </li>
      <li />
      <li>
        {"    "}
        <span className="property">stream</span>:
      </li>
      <li>
        {"      "}
        <span className="string">"PCM + Computer Science"</span>,
      </li>
      <li />
      <li>
        {"    "}
        <span className="property">board</span>:
      </li>
      <li>
        {"      "}
        <span className="string">"West Bengal Board"</span>,
      </li>
      <li />
      <li>
        {"    "}
        <span className="property">score</span>:
      </li>
      <li>
        {"      "}
        <span className="string">"81.60%"</span>,
      </li>
      <li>{"  "}&#125;,</li>
      <li />
      <li>{"  "}&#123;</li>
      <li>
        {"    "}
        <span className="property">stage</span>:
      </li>
      <li>
        {"      "}
        <span className="string">"Up to Class X"</span>,
      </li>
      <li />
      <li>
        {"    "}
        <span className="property">institution</span>:
      </li>
      <li>
        {"      "}
        <span className="string">"Nava Nalanda High School"</span>,
      </li>
      <li />
      <li>
        {"    "}
        <span className="property">examination</span>:
      </li>
      <li>
        {"      "}
        <span className="string">"Madhyamik"</span>,
      </li>
      <li />
      <li>
        {"    "}
        <span className="property">board</span>:
      </li>
      <li>
        {"      "}
        <span className="string">"West Bengal Board"</span>,
      </li>
      <li />
      <li>
        {"    "}
        <span className="property">score</span>:
      </li>
      <li>
        {"      "}
        <span className="string">"87.75%"</span>,
      </li>
      <li>{"  "}&#125;,</li>
      <li>];</li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="actualLearning">
          actualLearning
        </span>{" "}
        = {"{"}
      </li>
      <li>
        {"  "}
        <span className="property">classroom</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "useful as a baseline; rarely where most of my engineering happened"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">afterClass</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"where most of it happened"</span>,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">sources</span>: [
      </li>
      <li>
        {"    "}
        <span className="string">"documentation"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">"YouTube"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">"AI"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">"research"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">"building things"</span>,
      </li>
      <li>
        {"    "}
        <span className="string">"breaking things and figuring out why"</span>,
      </li>
      <li>{"  ],"}</li>
      <li />
      <li>
        {"  "}
        <span className="property">syllabus</span>:
      </li>
      <li>
        {"    "}
        <span className="string">"a baseline, not where I wanted to stop"</span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">bestTeacher</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "having something I actually wanted to build"
        </span>
        ,
      </li>
      <li>
        <span className="string">{"};"}</span>
      </li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="learningLoop">
          learningLoop
        </span>{" "}
        = [
      </li>
      <li>
        {"  "}
        <span className="string">"need to build something"</span>,
      </li>
      <li>
        {"  "}
        <span className="string">"find the part I don't understand"</span>,
      </li>
      <li>
        {"  "}
        <span className="string">"research it"</span>,
      </li>
      <li>
        {"  "}
        <span className="string">"build it"</span>,
      </li>
      <li>
        {"  "}
        <span className="string">"break an assumption"</span>,
      </li>
      <li>
        {"  "}
        <span className="string">"learn the next thing"</span>,
      </li>
      <li>
        {"  "}
        <span className="string">"repeat"</span>,
      </li>
      <li>];</li>
      <li />
      <li>
        <span className="keyword">export const</span>{" "}
        <span className="variable" data-semantic-node="perspective">
          perspective
        </span>{" "}
        = {"{"}
      </li>
      <li>
        {"  "}
        <span className="property">degree</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "gave me structure, deadlines and a formal CS foundation"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">engineering</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "mostly came from what I chased after class"
        </span>
        ,
      </li>
      <li />
      <li>
        {"  "}
        <span className="property">takeaway</span>:
      </li>
      <li>
        {"    "}
        <span className="string">
          "I learn much faster when the knowledge has somewhere to go"
        </span>
        ,
      </li>
      <li>
        <span className="string">{"};"}</span>
      </li>
    </ol>
  );
}

export function AboutIDEWorkspace() {
  const [activeFile, setActiveFile] = useState("introduction.ts");
  const [openFiles, setOpenFiles] = useState([
    "introduction.ts",
    "engineering.ts",
    "vision.ts",
  ]);
  const [activeView, setActiveView] = useState<"editor" | "career">("editor");
  const [semanticSelections, setSemanticSelections] = useState<
    Record<string, string>
  >(() =>
    Object.fromEntries(
      Object.entries(semanticMaps).map(([file, map]) => [
        file,
        map?.defaultNode ?? "",
      ]),
    ),
  );
  const [semanticMapCollapsed, setSemanticMapCollapsed] = useState(false);
  const [collapsedSemanticNodes, setCollapsedSemanticNodes] = useState<
    Record<string, string[]>
  >({});
  const [semanticLine, setSemanticLine] = useState<number>();
  const openFile = (file: string) => {
    setActiveFile(file);
    setOpenFiles((files) => (files.includes(file) ? files : [...files, file]));
  };
  const closeFile = (file: string) => {
    if (file === "introduction.ts") return;

    setOpenFiles((files) => {
      const index = files.indexOf(file);
      const nextFiles = files.filter((openFile) => openFile !== file);

      setActiveFile((currentFile) =>
        currentFile === file
          ? (nextFiles[Math.max(0, index - 1)] ?? "introduction.ts")
          : currentFile,
      );

      return nextFiles;
    });
  };
  const isEngineering = activeFile === "engineering.ts";
  const isVision = activeFile === "vision.ts";
  const isEducation = activeFile === "education.ts";
  const isValues = activeFile === "values.ts";
  const isPersonality = activeFile === "personality.ts";
  const isLongSource =
    isEngineering || isVision || isEducation || isValues || isPersonality;
  const isImplemented = implementedFiles.some((file) => file === activeFile);
  const currentSemanticMap = semanticMaps[activeFile];
  const selectedSemanticNode = currentSemanticMap
    ? (semanticSelections[activeFile] ?? currentSemanticMap.defaultNode)
    : undefined;
  const collapsedNodeIds = collapsedSemanticNodes[activeFile] ?? [];

  const getSemanticAnchor = (nodeId: string) =>
    document.querySelector<HTMLElement>(
      `.ide-editor [data-semantic-node="${nodeId}"]`,
    );
  const updateSemanticLine = (nodeId: string | undefined) => {
    if (!nodeId) return setSemanticLine(undefined);
    const anchor = getSemanticAnchor(nodeId);
    const line = anchor?.closest("li");
    const source = line?.parentElement;
    if (!line || !source) return setSemanticLine(undefined);
    setSemanticLine(Array.from(source.children).indexOf(line) + 1);
  };

  useEffect(() => {
    updateSemanticLine(selectedSemanticNode);
  }, [activeFile, selectedSemanticNode]);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 980px)");
    const updateCollapsedState = () => setSemanticMapCollapsed(query.matches);
    updateCollapsedState();
    query.addEventListener("change", updateCollapsedState);
    return () => query.removeEventListener("change", updateCollapsedState);
  }, []);

  const selectSemanticNode = (nodeId: string) => {
    setSemanticSelections((selections) => ({
      ...selections,
      [activeFile]: nodeId,
    }));
    const anchor = getSemanticAnchor(nodeId);
    const line = anchor?.closest("li");
    updateSemanticLine(nodeId);
    if (!line) return;
    line.scrollIntoView({ behavior: "smooth", block: "center" });
    line.classList.remove("is-semantic-highlight");
    window.requestAnimationFrame(() =>
      line.classList.add("is-semantic-highlight"),
    );
    window.setTimeout(
      () => line.classList.remove("is-semantic-highlight"),
      900,
    );
  };

  const toggleSemanticNode = (nodeId: string) => {
    setCollapsedSemanticNodes((collapsedNodes) => {
      const currentNodes = collapsedNodes[activeFile] ?? [];
      const nextNodes = currentNodes.includes(nodeId)
        ? currentNodes.filter((id) => id !== nodeId)
        : [...currentNodes, nodeId];

      return { ...collapsedNodes, [activeFile]: nextNodes };
    });
  };

  return (
    <section
      className={`about-ide-workspace ${activeView === "career" ? "career-mode" : ""} ${semanticMapCollapsed ? "semantic-map-collapsed" : ""}`}
      aria-label="About developer workspace"
    >
      <nav className="ide-activity-bar" aria-label="Workspace tools">
        <button
          className={activeView === "editor" ? "active" : ""}
          onClick={() => setActiveView("editor")}
          aria-label="Explorer"
        >
          <ActivityIcon name="explorer" />
        </button>
        <button aria-label="Search">
          <ActivityIcon name="search" />
        </button>
        <button
          className={`git-history-trigger ${activeView === "career" ? "active" : ""}`}
          onClick={() => setActiveView("career")}
          aria-label="Git: Build History"
          title="Open Git: Build History"
        >
          <ActivityIcon name="source" />
        </button>
        <button aria-label="Run and debug">
          <ActivityIcon name="run" />
        </button>
        <button aria-label="Extensions">
          <ActivityIcon name="extensions" />
        </button>
        <span />
        <button aria-label="Profile">
          <ActivityIcon name="account" />
        </button>
        <button aria-label="Settings">
          <ActivityIcon name="settings" />
        </button>
      </nav>

      {activeView === "career" ? (
        <CareerHistoryWorkspaceV2
          onOpenIntroduction={() => setActiveView("editor")}
        />
      ) : (
        <>
          <aside className="ide-explorer">
            <header>
              <b>EXPLORER</b>
              <button aria-label="New file">＋</button>
            </header>
            <div className="ide-tree-scroll">
              <b className="tree-root">⌄　PORTFOLIO/</b>
              <b className="tree-folder">⌄　about</b>
              {explorerFiles.map((file) => (
                <button
                  className={`tree-file ${activeFile === file ? "active" : ""}`}
                  onClick={() => openFile(file)}
                  key={file}
                >
                  <i>
                    {file.endsWith(".ts")
                      ? "TS"
                      : file.endsWith(".json")
                        ? "{}"
                        : file.endsWith(".toml")
                          ? "⚙"
                          : "!"}
                  </i>
                  {file}
                  <em>
                    {file === "introduction.ts" || file === "workstation.toml"
                      ? "M"
                      : file === "values.ts"
                        ? "●"
                        : ""}
                  </em>
                </button>
              ))}
              {["projects", "experience", "skills", "assets", "docs"].map(
                (folder) => (
                  <b className="tree-folder closed" key={folder}>
                    ▸　{folder}
                  </b>
                ),
              )}
            </div>
            <section className="ide-source-control">
              <h2>SOURCE CONTROL</h2>
              <p>
                <i>◉</i> 4 files modified
              </p>
              <p>
                <i>◉</i> Conflicts resolved
              </p>
              <small>
                Last commit <b>2 hours ago</b>
              </small>
            </section>
            <section className="ide-open-editors">
              <h2>OPEN EDITORS</h2>
              <p>
                <i>TS</i> introduction.ts <em>M</em>
              </p>
              <p>
                <i>TS</i> values.ts <em className="green">●</em>
              </p>
            </section>
          </aside>

          <main className="ide-editor-column">
            <div className="ide-tabs">
              <div
                className={`ide-tab ide-tab--pinned ${activeView === "editor" && activeFile === "introduction.ts" ? "active" : ""}`}
              >
                <button
                  className="ide-tab-select"
                  type="button"
                  onClick={() => openFile("introduction.ts")}
                >
                  <i>TS</i> introduction.ts{" "}
                  <span aria-label="Pinned tab">●</span>
                </button>
              </div>
              <button
                className="career-history-tab"
                type="button"
                onClick={() => setActiveView("career")}
                title="Open Git: Build History"
              >
                <ActivityIcon name="source" />
                <span>Git: Build History</span>
              </button>
              {openFiles
                .filter((tab) => tab !== "introduction.ts")
                .map((tab) => (
                  <div
                    className={`ide-tab ${activeFile === tab ? "active" : ""}`}
                    key={tab}
                  >
                    <button
                      className="ide-tab-select"
                      type="button"
                      onClick={() => openFile(tab)}
                    >
                      <i>
                        {tab.endsWith(".ts")
                          ? "TS"
                          : tab.endsWith(".json")
                            ? "{}"
                            : "•"}
                      </i>
                      {tab}
                    </button>
                    <button
                      className="ide-tab-close"
                      type="button"
                      onClick={() => closeFile(tab)}
                      aria-label={`Close ${tab}`}
                      title={`Close ${tab}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              <button className="new-tab" aria-label="New tab">
                ＋
              </button>
            </div>
            <div className="ide-breadcrumb">
              portfolio <span>›</span> about <span>›</span> <b>TS</b>{" "}
              {activeFile}
            </div>
            <section className={`ide-editor ${isImplemented ? "" : "pending"}`}>
              {isEngineering && <EngineeringSource />}
              {isVision && <VisionSource />}
              {isEducation && <EducationSource />}
              {isValues && <ValuesSource />}
              {isPersonality && <PersonalitySource />}
              {!isEngineering &&
                !isVision &&
                !isEducation &&
                !isValues &&
                !isPersonality && (
                  <ol
                    className="ide-code"
                    aria-label={
                      activeFile === "introduction.ts"
                        ? "Sambit Pradhan developer introduction TypeScript source"
                        : `${activeFile} source`
                    }
                  >
                    <li>
                      <span className="comment">/**</span>
                    </li>
                    <li>
                      <span className="comment"> * introduction.ts</span>
                    </li>
                    <li>
                      <span className="comment">
                        {" "}
                        * the short version of the person behind the repos
                      </span>
                    </li>
                    <li>
                      <span className="comment"> */</span>
                    </li>
                    <li />
                    <li>
                      <span className="keyword">export const</span>{" "}
                      <span className="variable" data-semantic-node="sambit">
                        sambit
                      </span>{" "}
                      = {"{"}
                    </li>
                    <li>
                      {"  "}
                      <span className="property">name</span>:{" "}
                      <span className="string">"Sambit Pradhan"</span>,
                    </li>
                    <li>
                      {"  "}
                      <span className="property">primaryRole</span>:{" "}
                      <span className="string">"Backend Engineer"</span>,
                    </li>
                    <li>
                      {"  "}
                      <span className="property">secondaryRole</span>:{" "}
                      <span className="string">"Full-Stack Engineer"</span>,
                    </li>
                    <li>
                      {"  "}
                      <span className="property">education</span>: {"{"}
                    </li>
                    <li>
                      {"    "}
                      <span className="property">university</span>:{" "}
                      <span className="string">"VIT Vellore"</span>,
                    </li>
                    <li>
                      {"    "}
                      <span className="property">degree</span>:{" "}
                      <span className="string">"B.Tech · CSE"</span>,
                    </li>
                    <li>
                      {"    "}
                      <span className="property">specialization</span>:{" "}
                      <span className="string">"Bioinformatics"</span>,
                    </li>
                    <li>
                      {"    "}
                      <span className="property">graduation</span>: 2026,
                    </li>
                    <li>
                      <span className="string">{"  },"}</span>
                    </li>
                    <li>
                      {"  "}
                      <span className="property">careerStage</span>:{" "}
                      <span className="string">"2026 graduate / fresher"</span>,
                    </li>
                    <li>
                      {"  "}
                      <span className="property">location</span>:{" "}
                      <span className="string">"Kolkata, India"</span>,
                    </li>
                    <li>
                      {"  "}
                      <span className="property">status</span>:{" "}
                      <span className="string">"open_to_opportunities"</span>,
                    </li>
                    <li>
                      <span className="string">{"};"}</span>
                    </li>
                    <li />
                    <li>
                      <span className="keyword">export const</span>{" "}
                      <span className="variable" data-semantic-node="builder">
                        builder
                      </span>{" "}
                      = {"{"}
                    </li>
                    <li />
                    <li>
                      {"  "}
                      <span className="property">strongestAt</span>:{" "}
                      <span className="string">"backend"</span>,
                    </li>
                    <li>
                      {"  "}
                      <span className="property">favoritePart</span>: [
                    </li>
                    <li>
                      {"    "}
                      <span className="string">"product logic"</span>,
                    </li>
                    <li>
                      {"    "}
                      <span className="string">"architecture"</span>,
                    </li>
                    <li>
                      {"    "}
                      <span className="string">"planning"</span>,
                    </li>
                    <li>{"  ],"}</li>
                    <li>
                      {"  "}
                      <span className="property">startsWith</span>:{" "}
                      <span className="string">"a problem worth solving"</span>,
                    </li>
                    <li>
                      {"  "}
                      <span className="property">prefers</span>:{" "}
                      <span className="string">"building from scratch"</span>,
                    </li>
                    <li>
                      {"  "}
                      <span className="property">problemSpace</span>:{" "}
                      <span className="string">
                        "useful products — not only developer tools"
                      </span>
                      ,
                    </li>
                    <li>
                      {"  "}
                      <span className="property">planningTime</span>:{" "}
                      <span className="string">"probably too much"</span>,
                    </li>
                    <li>
                      {"  "}
                      <span className="property">qualityBar</span>:{" "}
                      <span className="string">"working !== finished"</span>,
                    </li>
                    <li>
                      {"  "}
                      <span className="property">frontend</span>:
                    </li>
                    <li>
                      {"    "}
                      <span className="string">
                        "not my strongest side; still not allowed to feel
                        half-done"
                      </span>
                      ,
                    </li>
                    <li>
                      <span className="string">{"};"}</span>
                    </li>
                    <li />
                    <li>
                      <span className="keyword">export const</span>{" "}
                      <span className="variable" data-semantic-node="notes">
                        notes
                      </span>{" "}
                      = [
                    </li>
                    <li>
                      {"  "}
                      <span className="string">
                        "I like products that have a reason to exist outside a
                        demo."
                      </span>
                      ,
                    </li>
                    <li>
                      {"  "}
                      <span className="string">
                        "I spend a lot of time on the idea, product flow and
                        architecture before the implementation gets serious."
                      </span>
                      ,
                    </li>
                    <li>
                      {"  "}
                      <span className="string">
                        "Backend is where I'm most comfortable, but I care about
                        the whole product."
                      </span>
                      ,
                    </li>
                    <li>
                      {"  "}
                      <span className="string">
                        "If something works and still feels wrong, I usually
                        keep going until it doesn't."
                      </span>
                      ,
                    </li>
                    <li>
                      {"  "}
                      <span className="string">
                        "I'd rather spend months pushing one original build than
                        collect tutorial clones."
                      </span>
                      ,
                    </li>
                    <li>];</li>
                  </ol>
                )}
              {!isImplemented && (
                <div className="ide-coming-soon">
                  <i>◫</i>
                  <b>{activeFile}</b>
                  <span>This workspace file is queued for implementation.</span>
                  <small>Coming soon</small>
                </div>
              )}
              <div className="ide-minimap" aria-hidden="true">
                {Array.from(
                  {
                    length: isLongSource ? 15 : 10,
                  },
                  (_, index) => (
                    <i key={index} />
                  ),
                )}
              </div>
            </section>
            <section className="ide-terminal-panel">
              <header>
                <b>TERMINAL</b>
                <span>OUTPUT</span>
                <span>
                  PROBLEMS <i>0</i>
                </span>
                <span>DEBUG CONSOLE</span>
                <em>▣ zsh　＋　▯　⌫　⌃</em>
              </header>
              <div>
                <p>
                  <strong>developer@sambit:~/about</strong>
                  {isEducation
                    ? "$ npm run about -- education"
                    : isVision
                      ? "$ npm run about -- vision"
                      : isPersonality
                        ? "$ npm run about -- personality"
                        : isValues
                          ? "$ npm run about -- values"
                          : isEngineering
                            ? "$ npm run about -- engineering"
                            : "$ npm run about"}
                </p>
                {isEducation ? (
                  <>
                    <p>
                      [time]　<span>✓</span> Academic history loaded
                    </p>
                    <p>
                      [time]　<span>✓</span> Degree status: graduated
                    </p>
                    <p>
                      [time]　<span>✓</span> Self-learning path indexed
                    </p>
                    <p>
                      [time]　<span>✓</span> Syllabus ceiling removed
                    </p>
                    <p>
                      [time]　<span>✓</span> education.ts ready
                    </p>
                  </>
                ) : isVision ? (
                  <>
                    <p>
                      [time]　<span>✓</span> Product filter loaded
                    </p>
                    <p>
                      [time]　<span>✓</span> Market assumptions checked
                    </p>
                    <p>
                      [time]　<span>✓</span> Founder certainty not found
                    </p>
                    <p>
                      [time]　<span>✓</span> Career direction loaded
                    </p>
                    <p>
                      [time]　<span>✓</span> vision.ts ready
                    </p>
                  </>
                ) : isPersonality ? (
                  <>
                    <p>
                      [time]　<span>✓</span> Traits loaded
                    </p>
                    <p>
                      [time]　<span>✓</span> Contradictions preserved
                    </p>
                    <p>
                      [time]　<span>✓</span> Team experience not fabricated
                    </p>
                    <p>
                      [time]　<span>✓</span> Perfectionism renamed to actual
                      behavior
                    </p>
                    <p>
                      [time]　<span>✓</span> personality.ts ready
                    </p>
                  </>
                ) : isValues ? (
                  <>
                    <p>
                      [time]　<span>✓</span> Trade-offs loaded
                    </p>
                    <p>
                      [time]　<span>✓</span> Engineering rules loaded
                    </p>
                    <p>
                      [time]　<span>✓</span> Opinions loaded
                    </p>
                    <p>
                      [time]　<span>✓</span> Generic virtues removed
                    </p>
                    <p>
                      [time]　<span>✓</span> values.ts ready
                    </p>
                  </>
                ) : isEngineering ? (
                  <>
                    <p>
                      [time]　<span>✓</span> Process loaded
                    </p>
                    <p>
                      [time]　<span>✓</span> Case study loaded
                    </p>
                    <p>
                      [time]　<span>✓</span> Trade-offs loaded
                    </p>
                    <p>
                      [time]　<span>✓</span> AI stance loaded
                    </p>
                    <p>
                      [time]　<span>✓</span> engineering.ts ready
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      [time]　<span>✓</span> Profile loaded
                    </p>
                    <p>
                      [time]　<span>✓</span> Education loaded
                    </p>
                    <p>
                      [time]　<span>✓</span> Build preferences loaded
                    </p>
                    <p>
                      [time]　<span>✓</span> Opportunity status loaded
                    </p>
                    <p>
                      [time]　<span>✓</span> Workspace ready
                    </p>
                  </>
                )}
                <p>
                  <strong>developer@sambit:~/about</strong>${" "}
                  <b className="cursor">▌</b>
                </p>
              </div>
            </section>
          </main>

          <SemanticMap
            activeFile={activeFile}
            selectedNodeId={selectedSemanticNode}
            activeLine={semanticLine}
            collapsed={semanticMapCollapsed}
            collapsedNodeIds={collapsedNodeIds}
            onSelectNode={selectSemanticNode}
            onToggleNode={toggleSemanticNode}
            onToggleCollapsed={() =>
              setSemanticMapCollapsed((collapsed) => !collapsed)
            }
          />
        </>
      )}
    </section>
  );
}
