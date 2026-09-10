import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import {
  documentedProjectSlugs,
  getProjectCanonicalPath,
  getProjectLastModified,
} from "@/lib/projects";

/**
 * Canonical indexable URLs only. No query variants, filters, search,
 * sort URLs, preview hosts, or 404 routes. Project lastModified dates
 * come from each project's own latest-commit record; static pages omit
 * lastModified rather than inventing timestamps.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/about", "/projects", "/skills"].map(
    (path) => ({ url: absoluteUrl(path) }),
  );

  const projectRoutes = documentedProjectSlugs.map((slug) => {
    const lastModified = getProjectLastModified(slug);
    return {
      url: absoluteUrl(getProjectCanonicalPath(slug)),
      ...(lastModified ? { lastModified } : {}),
    };
  });

  return [...staticRoutes, ...projectRoutes];
}
