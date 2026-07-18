import { Footer } from "@/components/os/Footer";
import { Header } from "@/components/os/Header";
import { SkillsIDEWorkspace } from "@/components/os/SkillsIDEWorkspace";

export default function SkillsPage() {
  return (
    <main className="os-shell portfolio-shell skills-ide-shell">
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
