"use client";

import { useEffect, useState } from "react";
import {
  ArchitectureInspectorPanels,
  ArchitectureView,
  FeaturesView,
  OverviewView,
} from "@/components/os/projects/ArmyverseProjectViews";
import { armyverseFeatures } from "@/data/armyverse/features";
import { armyverseArchitectureMaps } from "@/data/armyverse/architecture";
import {
  armyverseNavigation,
  armyverseProject,
} from "@/data/armyverse/project";
import type { ArmyverseFeature } from "@/data/armyverse/types";
import { RepositoryLanding } from "@/components/os/projects/RepositoryLanding";
import { AgentPlaygroundDocsWorkspace } from "@/components/os/projects/AgentPlaygroundDocsWorkspace";
import { DocBuilderDocsWorkspace } from "@/components/os/projects/DocBuilderDocsWorkspace";
import { KiranaCornerDocsWorkspace } from "@/components/os/projects/KiranaCornerDocsWorkspace";
import { InsightQuillDocsWorkspace } from "@/components/os/projects/InsightQuillDocsWorkspace";
import { KisanSetuDocsWorkspace } from "@/components/os/projects/KisanSetuDocsWorkspace";

type DocumentedProject =
  | "armyverse"
  | "agent-playground"
  | "docbuilder"
  | "kirana-corner"
  | "insightquill"
  | "kisan-setu";

type ProjectView = (typeof armyverseNavigation)[number]["id"];

function ArchitectureNavIcon() {
  return (
    <svg
      aria-hidden="true"
      className="project-nav-architecture-icon"
      viewBox="0 0 24 24"
    >
      <rect height="5" rx="1" width="6" x="2" y="4" />
      <rect height="5" rx="1" width="6" x="16" y="4" />
      <rect height="5" rx="1" width="6" x="9" y="15" />
      <path d="M5 9v3h7m7-3v3h-7m0 0v3" />
    </svg>
  );
}

function ProjectInspector({
  architectureId,
  feature,
  onArchitectureSelect,
  view,
}: {
  architectureId: string;
  feature: ArmyverseFeature;
  onArchitectureSelect: (id: string) => void;
  view: ProjectView;
}) {
  if (view === "architecture") {
    return (
      <aside className="project-docs-inspector armyverse-inspector architecture-inspector">
        <ArchitectureInspectorPanels
          onSelect={onArchitectureSelect}
          selectedId={architectureId}
        />
      </aside>
    );
  }

  const metadata =
    view === "features"
      ? [
          ["Selected area", feature.title],
          ["Product domain", feature.category],
          ["Capabilities", String(feature.capabilities.length)],
          ["Workflow stages", String(feature.workflow.nodes.length)],
          ["Evidence", "Source & implementation docs"],
        ]
      : [
          ["Repository", armyverseProject.repository],
          ["Project type", "Full-stack fan platform"],
          ["Application", "Next.js App Router"],
          ["Persistence", "MongoDB + Mongoose"],
          ["Codebase scale", "88 API routes · 27 models"],
          ["Last verified", "11 Mar 2026"],
        ];

  return (
    <aside className="project-docs-inspector armyverse-inspector">
      <section>
        <header>
          {view === "features" ? "FEATURE INSPECTOR" : "PROJECT STATUS"}
        </header>
        <h2>{view === "features" ? feature.title : "ARMYVERSE"}</h2>
        {metadata.map(([key, value]) => (
          <p className="key-value" key={key}>
            {key}
            <b>{value}</b>
          </p>
        ))}
      </section>
      <section>
        <header>
          {view === "features" ? "FEATURE CAPABILITIES" : "TECH STACK"}
        </header>
        <div className="project-stack-tags">
          {(view === "features"
            ? feature.capabilities
            : armyverseProject.stack
          ).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>
      {view === "overview" && (
        <>
          <section className="armyverse-project-metrics">
            <header>PROJECT METRICS</header>
            <div>
              {armyverseProject.evidence.map(([label, value]) => (
                <p key={label}>
                  <small>{label}</small>
                  <b>{value}</b>
                </p>
              ))}
            </div>
          </section>
          <section className="armyverse-project-evolution">
            <header>PROJECT EVOLUTION</header>
            {armyverseProject.timeline.map(([title, date, detail]) => (
              <div key={title}>
                <i />
                <b>{title}</b>
                <small>{date}</small>
                <p>{detail}</p>
              </div>
            ))}
          </section>
        </>
      )}
    </aside>
  );
}

export function ProjectDocsWorkspace() {
  const [surface, setSurface] = useState<"repositories" | "documentation">(
    "repositories",
  );
  const [activeProject, setActiveProject] =
    useState<DocumentedProject>("armyverse");
  const [view, setView] = useState<ProjectView>("overview");
  const [selectedFeature, setSelectedFeature] = useState(armyverseFeatures[0]);
  const [selectedArchitectureId, setSelectedArchitectureId] = useState(
    armyverseArchitectureMaps[0].id,
  );

  useEffect(() => {
    const syncSurfaceFromLocation = () => {
      const project = new URLSearchParams(window.location.search).get(
        "project",
      );
      if (
        project === "armyverse" ||
        project === "agent-playground" ||
        project === "docbuilder" ||
        project === "kirana-corner" ||
        project === "insightquill" ||
        project === "kisan-setu"
      ) {
        setActiveProject(project);
        setSurface("documentation");
        return;
      }
      setSurface("repositories");
    };

    syncSurfaceFromLocation();
    window.addEventListener("popstate", syncSurfaceFromLocation);
    return () =>
      window.removeEventListener("popstate", syncSurfaceFromLocation);
  }, []);

  const openProject = (project: DocumentedProject) => {
    setActiveProject(project);
    setSurface("documentation");
    window.history.pushState({ project }, "", `/projects?project=${project}`);
  };

  const openRepositories = () => {
    setSurface("repositories");
    window.history.pushState(
      { view: "repositories" },
      "",
      "/projects?view=repositories",
    );
  };

  if (surface === "repositories") {
    return <RepositoryLanding onOpenProject={openProject} />;
  }

  if (activeProject === "agent-playground") {
    return <AgentPlaygroundDocsWorkspace onBack={openRepositories} />;
  }

  if (activeProject === "docbuilder") {
    return <DocBuilderDocsWorkspace onBack={openRepositories} />;
  }

  if (activeProject === "kirana-corner") {
    return <KiranaCornerDocsWorkspace onBack={openRepositories} />;
  }

  if (activeProject === "insightquill") {
    return <InsightQuillDocsWorkspace onBack={openRepositories} />;
  }

  if (activeProject === "kisan-setu") {
    return <KisanSetuDocsWorkspace onBack={openRepositories} />;
  }

  return (
    <section className="project-docs-workspace armyverse-workspace">
      <nav aria-label="Workspace tools" className="project-activity">
        <button aria-label="Documentation" className="active" type="button">
          ▧
        </button>
        <button aria-label="Search documentation" type="button">
          ⌕
        </button>
        <button
          aria-label="Project architecture"
          onClick={() => setView("architecture")}
          type="button"
        >
          ◇
        </button>
        <span />
        <a
          aria-label="Open GitHub repository"
          href={armyverseProject.repositoryUrl}
          rel="noreferrer"
          target="_blank"
        >
          ↗
        </a>
      </nav>
      <aside className="project-docs-nav">
        <header>
          <span>DOCUMENTATION</span>
          <button
            className="project-back-to-list"
            onClick={openRepositories}
            type="button"
          >
            ← Repositories
          </button>
        </header>
        <div className="project-docs-tree">
          <b>⌄　{armyverseProject.name} /</b>
          {armyverseNavigation.map(({ id, label, icon }) => (
            <button
              className={view === id ? "active" : ""}
              key={id}
              onClick={() => setView(id)}
              type="button"
            >
              <i>{id === "architecture" ? <ArchitectureNavIcon /> : icon}</i>
              {label}
            </button>
          ))}
        </div>
        <footer>
          <h3>PROJECT INFO</h3>
          {[
            ["Repository", "Public"],
            ["Branch", "main"],
            ["Runtime", "Next.js 14"],
            ["Database", "MongoDB"],
            ["Deployment", "Vercel configured"],
            ["Latest commit", "11 Mar 2026"],
            ["Status", "● Active development"],
          ].map(([key, value]) => (
            <p key={key}>
              {key}
              <b>{value}</b>
            </p>
          ))}
        </footer>
      </aside>
      <main className="project-docs-content">
        <div className="project-tabs">
          <span>
            ▧　{armyverseProject.name} /{" "}
            {view === "features"
              ? "FEATURES.md"
              : view === "architecture"
                ? "ARCHITECTURE.md"
                : "README.md"}
          </span>
          <button
            className="project-tabs-back"
            onClick={openRepositories}
            type="button"
          >
            ← Back to project list
          </button>
          <button aria-label="More documentation actions" type="button">
            ···
          </button>
        </div>
        <div className="project-docs-scroll">
          {view === "overview" && (
            <OverviewView onOpenFeatures={() => setView("features")} />
          )}
          {view === "features" && (
            <FeaturesView onSelectedChange={setSelectedFeature} />
          )}
          {view === "architecture" && (
            <ArchitectureView
              onSelect={setSelectedArchitectureId}
              selectedId={selectedArchitectureId}
            />
          )}
        </div>
        <section className="project-terminal">
          <header>
            <b>TERMINAL</b>
            <span>OUTPUT</span>
            <span>PROBLEMS</span>
            <span>DEBUG CONSOLE</span>
            <em>◉ zsh　＋　▣　⌫　⌃</em>
          </header>
          <p>
            <b>developer@sambit:~/Documents/ARMYVERSE</b>${" "}
            <i>
              {view === "features"
                ? "open docs/features"
                : view === "architecture"
                  ? "open docs/architecture"
                  : "cat README.md"}
            </i>
            <br />
            Loaded repository-grounded project documentation.
            <br />
            <b>developer@sambit:~/Documents/ARMYVERSE</b>$ <i>▌</i>
          </p>
        </section>
      </main>
      <ProjectInspector
        architectureId={selectedArchitectureId}
        feature={selectedFeature}
        onArchitectureSelect={setSelectedArchitectureId}
        view={view}
      />
    </section>
  );
}
