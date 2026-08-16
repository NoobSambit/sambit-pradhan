import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  LuBlocks,
  LuBot,
  LuBox,
  LuBoxes,
  LuBrainCircuit,
  LuCloudCog,
  LuCodeXml,
  LuContainer,
  LuDatabase,
  LuGitFork,
  LuHexagon,
  LuServer,
  LuSparkles,
  LuWorkflow,
  LuWrench,
} from "react-icons/lu";
import {
  SiApachekafka,
  SiCloudflare,
  SiDocker,
  SiEslint,
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiGithub,
  SiGithubactions,
  SiGraphql,
  SiJest,
  SiKubernetes,
  SiLangchain,
  SiLastdotfm,
  SiMongodb,
  SiNestjs,
  SiNeovim,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiPydantic,
  SiPython,
  SiReact,
  SiRedis,
  SiSpotify,
  SiTailwindcss,
  SiTypescript,
  SiYoutube,
} from "react-icons/si";

type IconDefinition = [IconType, string];

const exactIcons: Record<string, IconDefinition> = {
  "ai / ml": [LuBrainCircuit, "#d7a0ff"],
  architecture: [LuWorkflow, "#f0b86a"],
  backend: [LuServer, "#72d6c7"],
  cloud: [LuCloudCog, "#8ebcff"],
  databases: [LuDatabase, "#77b8ef"],
  devops: [LuContainer, "#5db4ff"],
  frameworks: [LuBlocks, "#d59cff"],
  languages: [LuCodeXml, "#f2c45f"],
  tools: [LuWrench, "#b8c6cc"],
  node: [SiNodedotjs, "#8bcf68"],
  "node.js": [SiNodedotjs, "#8bcf68"],
  postgresql: [SiPostgresql, "#78aee8"],
  typescript: [SiTypescript, "#68aef2"],
  redis: [SiRedis, "#ef7468"],
  fastapi: [SiFastapi, "#55d8bd"],
  kafka: [SiApachekafka, "#d8e2e5"],
  react: [SiReact, "#67d9f4"],
  "react.js": [SiReact, "#67d9f4"],
  mongodb: [SiMongodb, "#65cf82"],
  next: [SiNextdotjs, "#e5ecef"],
  "next.js": [SiNextdotjs, "#e5ecef"],
  graphql: [SiGraphql, "#ed83c8"],
  tailwind: [SiTailwindcss, "#67d9e8"],
  tailwindcss: [SiTailwindcss, "#67d9e8"],
  prisma: [SiPrisma, "#a9bdc7"],
  docker: [SiDocker, "#58a9ff"],
  jest: [SiJest, "#d77b8b"],
  eslint: [SiEslint, "#a691ff"],
  python: [SiPython, "#f3cb62"],
  express: [SiExpress, "#d5dfe2"],
  nestjs: [SiNestjs, "#ea6c83"],
  openai: [LuBot, "#7ce0c3"],
  langchain: [SiLangchain, "#8bd3b2"],
  pydantic: [SiPydantic, "#e98bb7"],
  transformers: [LuBrainCircuit, "#f0c65f"],
  microservices: [LuBoxes, "#7ed2e5"],
  "event-driven": [LuGitFork, "#d59cff"],
  cqrs: [LuWorkflow, "#f0b86a"],
  hexagonal: [LuHexagon, "#88d6b0"],
  s3: [LuDatabase, "#f0a86a"],
  cloudfront: [SiCloudflare, "#f3a85f"],
  kubernetes: [SiKubernetes, "#6f9fff"],
  "github actions": [SiGithubactions, "#6fa9ff"],
  git: [SiGithub, "#dce5e8"],
  github: [SiGithub, "#dce5e8"],
  postman: [SiPostman, "#ff8a60"],
  neovim: [SiNeovim, "#7ad17b"],
  firebase: [SiFirebase, "#ffc65c"],
  spotify: [SiSpotify, "#6fd98a"],
  "last.fm": [SiLastdotfm, "#ec6d6d"],
  youtube: [SiYoutube, "#f06c6c"],
  groq: [LuSparkles, "#f3a46f"],
  aws: [LuCloudCog, "#ffb765"],
  "aws sdk": [LuCloudCog, "#ffb765"],
};

function normalizeName(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+\d+(?:\.\d+)*(?:\.x)?$/, "")
    .trim();
}

function resolveIcon(name: string): IconDefinition {
  const normalized = normalizeName(name);
  if (exactIcons[normalized]) return exactIcons[normalized];

  const partial = Object.entries(exactIcons).find(([key]) =>
    normalized.startsWith(`${key} `),
  );
  return partial?.[1] ?? [LuBox, "#9fb1b8"];
}

export function TechIcon({
  className = "",
  name,
  style,
}: {
  className?: string;
  name: string;
  style?: CSSProperties;
}) {
  const [Icon, color] = resolveIcon(name);
  return (
    <Icon
      aria-hidden="true"
      className={`tech-icon ${className}`.trim()}
      focusable="false"
      style={{ color, ...style }}
    />
  );
}
