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
import {
  ProjectUiIcon,
  projectFileIconName,
  projectNavIconName,
} from "@/components/os/projects/ProjectUiIcon";
import { AgentPlaygroundDocsWorkspace } from "@/components/os/projects/AgentPlaygroundDocsWorkspace";
import { DocBuilderDocsWorkspace } from "@/components/os/projects/DocBuilderDocsWorkspace";
import { KiranaCornerDocsWorkspace } from "@/components/os/projects/KiranaCornerDocsWorkspace";
import { InsightQuillDocsWorkspace } from "@/components/os/projects/InsightQuillDocsWorkspace";
import { KisanSetuDocsWorkspace } from "@/components/os/projects/KisanSetuDocsWorkspace";
import { GymTrackerDocsWorkspace } from "@/components/os/projects/GymTrackerDocsWorkspace";

type DocumentedProject =
  | "armyverse"
  | "agent-playground"
  | "docbuilder"
  | "kirana-corner"
  | "insightquill"
  | "kisan-setu"
  | "gym-tracker";

type ProjectView = (typeof armyverseNavigation)[number]["id"];

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
        project === "kisan-setu" ||
        project === "gym-tracker"
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

  if (activeProject === "gym-tracker") {
    return <GymTrackerDocsWorkspace onBack={openRepositories} />;
  }

  return (
    <section className="project-docs-workspace armyverse-workspace">
      <nav aria-label="Workspace tools" className="project-activity">
        <button aria-label="Documentation" className="active" type="button">
          <ProjectUiIcon name="files" size="activity" />
        </button>
        <button aria-label="Search documentation" type="button">
          <ProjectUiIcon name="search" size="activity" />
        </button>
        <button
          aria-label="Project architecture"
          onClick={() => setView("architecture")}
          type="button"
        >
          <ProjectUiIcon name="architecture" size="activity" />
        </button>
        <span />
        <a
          aria-label="Open GitHub repository"
          href={armyverseProject.repositoryUrl}
          rel="noreferrer"
          target="_blank"
        >
          <ProjectUiIcon name="github" size="activity" />
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
            <ProjectUiIcon name="arrow-left" size="micro" />
            <span>Repositories</span>
          </button>
        </header>
        <div className="project-docs-tree">
          <b className="project-tree-root">
            <ProjectUiIcon name="chevron-down" size="sm" />
            <ProjectUiIcon name="folder-open" size="sm" />
            <span>{armyverseProject.name} /</span>
          </b>
          {armyverseNavigation.map(({ id, label }) => (
            <button
              className={view === id ? "active" : ""}
              key={id}
              onClick={() => setView(id)}
              type="button"
            >
              <ProjectUiIcon name={projectNavIconName(id)} size="sm" />
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
            ["Status", "Active development"],
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
          <span className="project-tab-file">
            <ProjectUiIcon
              name={projectFileIconName(
                view === "features"
                  ? "FEATURES.md"
                  : view === "architecture"
                    ? "ARCHITECTURE.md"
                    : "README.md",
              )}
              size="sm"
            />
            <span>
              {armyverseProject.name} /{" "}
              {view === "features"
                ? "FEATURES.md"
                : view === "architecture"
                  ? "ARCHITECTURE.md"
                  : "README.md"}
            </span>
          </span>
          <button
            className="project-tabs-back"
            onClick={openRepositories}
            type="button"
          >
            <ProjectUiIcon name="arrow-left" size="micro" />
            <span>Back to project list</span>
          </button>
          <button aria-label="More documentation actions" type="button">
            <ProjectUiIcon name="ellipsis" size="sm" />
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
            <em className="terminal-controls">
              <span className="terminal-shell">
                <ProjectUiIcon name="terminal" size="sm" />
                <span>zsh</span>
              </span>
              <button aria-label="New terminal" type="button">
                <ProjectUiIcon name="add" size="sm" />
              </button>
              <button aria-label="Split terminal" type="button">
                <ProjectUiIcon name="split" size="sm" />
              </button>
              <button aria-label="Kill terminal" type="button">
                <ProjectUiIcon name="trash" size="sm" />
              </button>
              <button aria-label="Collapse terminal" type="button">
                <ProjectUiIcon name="chevron-down" size="sm" />
              </button>
            </em>
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
            <b>developer@sambit:~/Documents/ARMYVERSE</b>$ <i className="terminal-caret" />
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
