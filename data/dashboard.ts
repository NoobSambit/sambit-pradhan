export const systemGroups = [
  {
    title: "SYSTEM",
    items: [
      ["cpu", "CPU", "12%"],
      ["memory", "Memory", "5.4 GB / 16 GB"],
      ["hard-drive", "Disk", "128 GB / 512 GB"],
      ["network", "Network", "1.2 KB/s"],
    ],
  },
  {
    title: "GIT",
    items: [
      ["git-branch", "Branch", "main"],
      ["refresh", "Status", "Synced"],
      ["git-compare", "Ahead / Behind", "0 / 0"],
      ["archive", "Stash", "0"],
    ],
  },
  {
    title: "RUNTIME",
    items: [
      ["terminal", "Mode", "Portfolio"],
      ["map-pin", "Region", "ap-south-1"],
      ["git-branch", "Build", "main"],
      ["heart-pulse", "State", "Online ●"],
    ],
  },
  {
    title: "SESSION",
    items: [
      ["user", "User", "developer"],
      ["folder", "Workspace", "~/portfolio"],
      ["terminal", "Shell", "zsh"],
      ["clock", "Uptime", "7d 14h 22m"],
    ],
  },
  {
    title: "PREFERENCES",
    items: [
      ["palette", "Theme", "Ayu Dark"],
      ["type", "Font", "JetBrains Mono"],
      ["grid", "Grid", "12 Columns"],
      ["sliders", "Density", "Compact"],
    ],
  },
] as const;

export const bootLines = [
  "Initializing developer profile...",
  "Loading engineering workspace...",
  "Syncing Git repositories...",
  "Connecting to cloud services...",
  "Verifying system dependencies...",
  "Activating portfolio runtime...",
];

export const projectStack = [
  ["Architecture", "Microservices"],
  ["Backend", "Node.js, FastAPI"],
  ["Database", "PostgreSQL"],
  ["Cache", "Redis"],
  ["Queue", "Kafka"],
  ["Infra", "AWS (ECS)"],
  ["AI Service", "OpenAI / LLM"],
  ["Auth", "JWT + OAuth"],
  ["APIs", "24"],
  ["Status", "● Deploying"],
] as const;

export const skills = [
  "Node.js",
  "PostgreSQL",
  "TypeScript",
  "Redis",
  "FastAPI",
  "Kafka",
  "React.js",
  "MongoDB",
  "Next.js",
  "GraphQL",
  "TailwindCSS",
  "Prisma",
  "Docker",
  "Jest",
  "AWS SDK",
  "ESLint",
];

export const learningNow = [
  ["System Design", "ACTIVE", 70],
  ["CLI Tooling", "ACTIVE", 80],
  ["Code Review Systems", "ACTIVE", 70],
  ["Security Review", "EXPLORING", 50],
] as const;
