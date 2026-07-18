export const systemGroups = [
  {
    title: "SYSTEM",
    items: [
      ["⌁", "CPU", "12%"],
      ["▤", "Memory", "5.4 GB / 16 GB"],
      ["▱", "Disk", "128 GB / 512 GB"],
      ["⌁", "Network", "1.2 KB/s"],
    ],
  },
  {
    title: "GIT",
    items: [
      ["⌘", "Branch", "main"],
      ["⌁", "Status", "Synced"],
      ["◌", "Ahead / Behind", "0 / 0"],
      ["⊞", "Stash", "0"],
    ],
  },
  {
    title: "DEPLOYMENT",
    items: [
      ["", "Environment", "Production ●"],
      ["", "Region", "ap-south-1"],
      ["", "Services", "12"],
      ["", "Health", "● Healthy"],
    ],
  },
  {
    title: "SESSION",
    items: [
      ["", "User", "developer"],
      ["", "Workspace", "~/portfolio"],
      ["", "Shell", "zsh"],
      ["", "Uptime", "7d 14h 22m"],
    ],
  },
  {
    title: "PREFERENCES",
    items: [
      ["", "Theme", "Ayu Dark"],
      ["", "Font", "JetBrains Mono"],
      ["", "Grid", "12 Columns"],
      ["", "Density", "Compact"],
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

export const roadmap = [
  ["Distributed Systems", 70],
  ["Kubernetes", 45],
  ["System Design", 90],
  ["Event Driven Arch", 55],
  ["LLM Engineering", 40],
  ["Cloud Infrastructure", 50],
] as const;
