import type { Metadata } from "next";
import { Footer } from "@/components/os/Footer";
import { Header } from "@/components/os/Header";
import {
  AboutContent,
  AboutInfo,
  LearningAndDiagnostics,
  ProfileCard,
  TechnologyStack,
} from "@/components/os/About";
import { ProjectsWorkspace } from "@/components/os/ProjectsWorkspace";
import {
  ActiveProject,
  Architecture,
  GitLog,
  ProjectDossier,
  QuickLinks,
  Roadmap,
  Skills,
} from "@/components/os/Panels";
import { Sidebar } from "@/components/os/Sidebar";
import { Terminal } from "@/components/os/Terminal";
import { LandingMotionController } from "@/components/os/motion/LandingMotionController";
import { MobileHome } from "@/components/os/mobile/MobileHome";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  PERSON_ID,
  WEBSITE_ID,
  absoluteUrl,
  buildPageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  path: "/",
});

export default function Home() {
  return (
    <main className="os-shell portfolio-shell landing-shell">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${absoluteUrl("/")}#webpage`,
          url: absoluteUrl("/"),
          name: DEFAULT_TITLE,
          description: DEFAULT_DESCRIPTION,
          isPartOf: { "@id": WEBSITE_ID },
          about: { "@id": PERSON_ID },
          mainEntity: { "@id": PERSON_ID },
        }}
      />
      <LandingMotionController />
      <MobileHome />
      <Header mode="home" />
      <div className="os-main portfolio-main">
        <Sidebar />
        <div className="portfolio-content">
          <section
            className="workspace overview-workspace"
            data-motion-section="overview"
          >
            <Terminal />
            <div className="right-workspace">
              <ActiveProject />
              <Architecture />
              <GitLog />
              <Skills />
              <Roadmap />
              <ProjectDossier />
              <QuickLinks />
            </div>
          </section>
          <section className="about-workspace" data-motion-section="about">
            <div className="about-grid">
              <div className="about-profile-column">
                <ProfileCard />
              </div>
              <AboutContent />
              <div className="about-right-column">
                <TechnologyStack />
                <div className="about-split">
                  <LearningAndDiagnostics />
                </div>
                <AboutInfo />
              </div>
            </div>
          </section>
          <ProjectsWorkspace />
        </div>
      </div>
      <Footer landing />
    </main>
  );
}
