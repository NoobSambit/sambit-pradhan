import type { Metadata } from "next";
import { Footer } from "@/components/os/Footer";
import { Header } from "@/components/os/Header";
import { SkillsIDEWorkspace } from "@/components/os/SkillsIDEWorkspace";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  PERSON_ID,
  WEBSITE_ID,
  absoluteUrl,
  breadcrumbEntity,
  buildPageMetadata,
} from "@/lib/seo";

const SKILLS_TITLE = "Skills — Sambit Pradhan";
const SKILLS_DESCRIPTION =
  "Engineering skills of Sambit Pradhan: TypeScript, Node.js, PostgreSQL, Next.js, FastAPI, Docker, AWS, system design, and AI-assisted backend systems.";

export const metadata: Metadata = buildPageMetadata({
  title: SKILLS_TITLE,
  description: SKILLS_DESCRIPTION,
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <main className="os-shell portfolio-shell skills-ide-shell">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${absoluteUrl("/skills")}#webpage`,
              url: absoluteUrl("/skills"),
              name: SKILLS_TITLE,
              description: SKILLS_DESCRIPTION,
              isPartOf: { "@id": WEBSITE_ID },
              about: { "@id": PERSON_ID },
              mainEntity: { "@id": PERSON_ID },
            },
            breadcrumbEntity([
              { name: "Home", path: "/" },
              { name: "Skills", path: "/skills" },
            ]),
          ],
        }}
      />
      <Header mode="skills" />
      <div className="os-main portfolio-main skills-ide-main">
        <div className="portfolio-content">
          <SkillsIDEWorkspace />
        </div>
      </div>
      <Footer />
    </main>
  );
}
