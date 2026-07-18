import { AboutIDEWorkspace } from "@/components/os/AboutIDEWorkspace";
import { Footer } from "@/components/os/Footer";
import { Header } from "@/components/os/Header";

export default function AboutPage() {
  return (
    <main className="os-shell portfolio-shell about-ide-shell">
      <Header mode="about" />
      <div className="os-main portfolio-main about-ide-main">
        <div className="portfolio-content">
          <AboutIDEWorkspace />
        </div>
      </div>
      <Footer />
    </main>
  );
}
