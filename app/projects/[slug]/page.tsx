import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/os/Footer";
import { Header } from "@/components/os/Header";
import { ProjectDocsWorkspace } from "@/components/os/ProjectDocsWorkspace";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  PERSON_ID,
  WEBSITE_ID,
  absoluteUrl,
  breadcrumbEntity,
  buildPageMetadata,
} from "@/lib/seo";
import {
  documentedProjectSlugs,
  getProjectBySlug,
  getProjectCanonicalPath,
  getProjectLanguages,
  isDocumentedProjectSlug,
  type DocumentedProjectSlug,
} from "@/lib/projects";

type ProjectRouteParams = {
  slug: string;
};

export function generateStaticParams(): ProjectRouteParams[] {
  return documentedProjectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ProjectRouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isDocumentedProjectSlug(slug)) {
    return {};
  }
  const project = getProjectBySlug(slug);
  return buildPageMetadata({
    title: `${project.name} — Sambit Pradhan`,
    description: project.description,
    path: getProjectCanonicalPath(slug),
  });
}

/**
 * One canonical route per documented project. The route owns project
 * identity (validates the slug, 404s unknown slugs, builds metadata);
 * the existing client documentation workspace owns only tab/view state.
 */
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<ProjectRouteParams>;
}) {
  const { slug } = await params;
  if (!isDocumentedProjectSlug(slug)) {
    notFound();
  }
  const typedSlug: DocumentedProjectSlug = slug;
  const project = getProjectBySlug(typedSlug);
  const path = getProjectCanonicalPath(typedSlug);
  const url = absoluteUrl(path);

  return (
    <main className="os-shell project-docs-shell">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${url}#webpage`,
              url,
              name: `${project.name} — Sambit Pradhan`,
              description: project.description,
              isPartOf: { "@id": WEBSITE_ID },
              about: { "@id": PERSON_ID },
              mainEntity: { "@id": `${url}#project` },
            },
            {
              "@type": "SoftwareSourceCode",
              "@id": `${url}#project`,
              name: project.name,
              description: project.description,
              url,
              codeRepository: project.repository,
              author: { "@id": PERSON_ID },
              creator: { "@id": PERSON_ID },
              programmingLanguage: getProjectLanguages(typedSlug),
              runtimePlatform: project.runtime,
              isPartOf: { "@id": WEBSITE_ID },
            },
            breadcrumbEntity([
              { name: "Home", path: "/" },
              { name: "Projects", path: "/projects" },
              { name: project.name, path },
            ]),
          ],
        }}
      />
      <Header mode="projects" />
      <div className="os-main project-docs-main">
        <ProjectDocsWorkspace initialProject={typedSlug} />
      </div>
      <Footer />
    </main>
  );
}
