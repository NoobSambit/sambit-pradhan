import { Footer } from "@/components/os/Footer";
import { Header } from "@/components/os/Header";
import { AboutCommands, AboutContent, AboutInfo, LearningAndDiagnostics, ProfileCard, TechnologyStack } from "@/components/os/About";
import { ProjectsWorkspace } from "@/components/os/ProjectsWorkspace";
import { ActiveProject, Architecture, Environment, GitLog, Metrics, QuickLinks, Releases, Roadmap, Skills, SystemInfo } from "@/components/os/Panels";
import { Sidebar } from "@/components/os/Sidebar";
import { Terminal } from "@/components/os/Terminal";

export default function Home() {
  return <main className="os-shell portfolio-shell"><Header mode="about" /><div className="os-main portfolio-main"><Sidebar /><div className="portfolio-content"><section className="workspace overview-workspace"><Terminal /><div className="right-workspace"><ActiveProject /><Architecture /><GitLog /><Metrics /><Skills /><Roadmap /><SystemInfo /><Environment /><Releases /><QuickLinks /></div></section><section className="about-workspace"><div className="about-grid"><div className="about-profile-column"><ProfileCard /></div><AboutContent /><div className="about-right-column"><TechnologyStack /><div className="about-split"><LearningAndDiagnostics /></div><AboutInfo /></div></div><AboutCommands /></section><ProjectsWorkspace /></div></div><Footer /></main>;
}
