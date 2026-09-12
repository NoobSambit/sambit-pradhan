import { projects, type Project } from "@/data/projects";

/**
 * Single source of truth for documented project routes.
 *
 * One canonical route exists per project: /projects/<slug>.
 * The sitemap, metadata, navigation, and the dynamic route all read
 * from this registry, so adding a project means adding it here
 * (plus its data and docs workspace) — nothing else needs a slug list.
 */
export const documentedProjectSlugs = [
  "armyverse",
  "agent-playground",
  "docbuilder",
  "kirana-corner",
  "insightquill",
  "kisan-setu",
  "gym-tracker",
] as const;

export type DocumentedProjectSlug = (typeof documentedProjectSlugs)[number];

export function isDocumentedProjectSlug(
  value: string,
): value is DocumentedProjectSlug {
  return (documentedProjectSlugs as readonly string[]).includes(value);
}

export function getProjectBySlug(slug: DocumentedProjectSlug): Project {
  const project = projects.find((entry) => entry.id === slug);
  if (!project) {
    throw new Error(`Unknown documented project slug: ${slug}`);
  }
  return project;
}

export function getProjectCanonicalPath(slug: string): string {
  return `/projects/${slug}`;
}

/**
 * Trustworthy last-modified signal for the sitemap, taken from the
 * project's own latest-commit record. Returns undefined when the
 * stored date is missing or unparsable — never a fabricated date.
 */
export function getProjectLastModified(
  slug: DocumentedProjectSlug,
): Date | undefined {
  const project = getProjectBySlug(slug);
  const raw = project.latestCommit?.date;
  if (!raw) return undefined;
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed;
}

/** Languages actually visible in each project's documented stack. */
const projectLanguages: Record<DocumentedProjectSlug, string[]> = {
  armyverse: ["TypeScript"],
  "agent-playground": ["TypeScript"],
  docbuilder: ["TypeScript", "Python"],
  "kirana-corner": ["TypeScript"],
  insightquill: ["Dart"],
  "kisan-setu": ["TypeScript"],
  "gym-tracker": ["Dart", "TypeScript"],
};

export function getProjectLanguages(slug: DocumentedProjectSlug): string[] {
  return projectLanguages[slug];
}
