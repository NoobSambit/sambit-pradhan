import { Footer } from "@/components/os/Footer";
import { Header } from "@/components/os/Header";
import {
  AboutCommands,
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

export default function Home() {
  return (
    <main className="os-shell portfolio-shell landing-shell">
      <LandingMotionController />
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
            <AboutCommands />
          </section>
          <ProjectsWorkspace />
        </div>
      </div>
      <Footer landing />
    </main>
  );
}
