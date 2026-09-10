import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { Footer } from "@/components/os/Footer";
import { Header } from "@/components/os/Header";
import { ProjectDocsWorkspace } from "@/components/os/ProjectDocsWorkspace";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  PERSON_ID,
  WEBSITE_ID,
  absoluteUrl,
  buildPageMetadata,
} from "@/lib/seo";
import {
  documentedProjectSlugs,
  getProjectBySlug,
  getProjectCanonicalPath,
  isDocumentedProjectSlug,
} from "@/lib/projects";

const PROJECTS_TITLE = "Projects — Sambit Pradhan";
const PROJECTS_DESCRIPTION =
  "Software projects by Sambit Pradhan: ArmyVerse, Agent Playground, DocBuilder, Kirana Corner, InsightQuill, KisanSetu, and Gym Tracker.";

export const metadata: Metadata = buildPageMetadata({
  title: PROJECTS_TITLE,
  description: PROJECTS_DESCRIPTION,
  path: "/projects",
});

type ProjectsSearchParams = {
  project?: string | string[];
  view?: string | string[];
};

/**
 * Legacy query URLs must not compete with canonical project routes:
 *   /projects?project=armyverse  →  /projects/armyverse (permanent)
 *   /projects?view=repositories  →  /projects (permanent)
 * Filter/search/sort UI state lives only in client state and is never
 * reflected in the URL, so nothing else here needs normalizing.
 */
export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<ProjectsSearchParams>;
}) {
  const params = await searchParams;
  const projectParam = Array.isArray(params.project)
    ? params.project[0]
    : params.project;
  const viewParam = Array.isArray(params.view) ? params.view[0] : params.view;

  if (typeof projectParam === "string" && projectParam.length > 0) {
    if (isDocumentedProjectSlug(projectParam)) {
      permanentRedirect(getProjectCanonicalPath(projectParam));
    }
    permanentRedirect("/projects");
  }

  if (viewParam === "repositories") {
    permanentRedirect("/projects");
  }

  return (
    <main className="os-shell project-docs-shell">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": `${absoluteUrl("/projects")}#webpage`,
              url: absoluteUrl("/projects"),
              name: PROJECTS_TITLE,
              description: PROJECTS_DESCRIPTION,
              isPartOf: { "@id": WEBSITE_ID },
              about: { "@id": PERSON_ID },
              mainEntity: {
                "@type": "ItemList",
                itemListElement: documentedProjectSlugs.map((slug, index) => {
                  const project = getProjectBySlug(slug);
                  return {
                    "@type": "ListItem",
                    position: index + 1,
                    name: project.name,
                    url: absoluteUrl(getProjectCanonicalPath(slug)),
                  };
                }),
              },
            },
          ],
        }}
      />
      <Header mode="projects" />
      <div className="os-main project-docs-main">
        <ProjectDocsWorkspace />
      </div>
      <Footer />
    </main>
  );
}
