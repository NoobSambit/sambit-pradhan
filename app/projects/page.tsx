import { Footer } from "@/components/os/Footer";
import { Header } from "@/components/os/Header";
import { ProjectDocsWorkspace } from "@/components/os/ProjectDocsWorkspace";

export default function ProjectsPage() {
  return (
    <main className="os-shell project-docs-shell">
      <Header mode="projects" />
      <div className="os-main project-docs-main">
        <ProjectDocsWorkspace />
      </div>
      <Footer />
    </main>
  );
}
