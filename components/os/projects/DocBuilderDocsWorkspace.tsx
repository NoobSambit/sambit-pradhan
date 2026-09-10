"use client";

import { useState } from "react";
import {
  ArchitectureInspectorPanels,
  ArchitectureView,
  FeatureInspection,
  FeatureRows,
  GenericFeaturesView,
  type InspectableFeature,
} from "@/components/os/projects/ArmyverseProjectViews";
import { ProjectActionIcon } from "@/components/os/projects/ProjectActionIcon";
import {
  ProjectUiIcon,
  projectFileIconName,
  projectNavIconName,
} from "@/components/os/projects/ProjectUiIcon";
import {
  ProjectImageCarousel,
  type ProjectBanner,
} from "@/components/os/projects/ProjectImageCarousel";
import { docBuilderArchitectureMaps } from "@/data/docbuilder/architecture";
import { docBuilderFeatures } from "@/data/docbuilder/features";
import {
  docBuilderNavigation,
  docBuilderProject,
} from "@/data/docbuilder/project";
import type {
  DocBuilderFeature,
  DocBuilderView,
} from "@/data/docbuilder/types";

const docBuilderBanners = [
  {
    src: "/project_banners/docbuilder/outline-generation.png",
    label: "Start with structure, not a blank page",
    alt: "DocBuilder outline generation poster",
  },
  {
    src: "/project_banners/docbuilder/rag-research.png",
    label: "Research enters exactly where it matters",
    alt: "DocBuilder research-aware generation poster",
  },
  {
    src: "/project_banners/docbuilder/context-refinement.png",
    label: "Revise without losing the thread",
    alt: "DocBuilder context-aware refinement poster",
  },
  {
    src: "/project_banners/docbuilder/dual-format-export.png",
    label: "One project. Two finished formats.",
    alt: "DocBuilder DOCX and PPTX export poster",
  },
] satisfies readonly ProjectBanner[];

function DocBuilderHero() {
  return (
    <section className="project-docs-hero docbuilder-hero">
      <div className="project-mark">DB</div>
      <div className="project-hero-copy">
        <h1>{docBuilderProject.name}</h1>
        <p>{docBuilderProject.tagline}</p>
        <span>PUBLIC REPOSITORY</span>
        <span>FULL STACK</span>
        <span>RAG AUTHORING</span>
        <small>{docBuilderProject.updated}</small>
      </div>
      <div className="project-hero-actions">
        <a
          className="github-action"
          href={docBuilderProject.repositoryUrl}
          rel="noreferrer"
          target="_blank"
        >
          <ProjectActionIcon type="github" /> GitHub
        </a>
        <a
          className="docs-action"
          href={`${docBuilderProject.repositoryUrl}/tree/main/docs`}
          rel="noreferrer"
          target="_blank"
        >
          <ProjectActionIcon type="docs" /> Documentation
        </a>
      </div>
    </section>
  );
}

function DocBuilderOverview({
  onOpenFeatures,
}: {
  onOpenFeatures: () => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return (
    <>
      <DocBuilderHero />
      <section className="docbuilder-overview-hero">
        <ProjectImageCarousel
          banners={docBuilderBanners}
          projectName="DocBuilder"
        />
        <aside className="docbuilder-overview-copy">
          <div>
            <h2>Overview</h2>
            {docBuilderProject.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="docbuilder-problem-solution">
            <article>
              <b>Problem</b>
              <p>
                AI writing tools often return isolated text with no durable
                outline, source trail, revision context, or controlled final
                output.
              </p>
            </article>
            <article>
              <b>Approach</b>
              <p>
                DocBuilder treats writing as a persistent project: plan,
                generate, research, refine, review, and export from the same
                owner-scoped record.
              </p>
            </article>
          </div>
        </aside>
      </section>
      <section className="project-overview-body docbuilder-overview-body">
        <article>
          <div className="overview-feature-heading">
            <h2>Feature catalogue</h2>
            <button onClick={onOpenFeatures} type="button">
              <span>Open full catalogue</span>
              <ProjectUiIcon name="arrow-right" size="sm" />
            </button>
          </div>
          <FeatureRows
            expandedContent={(feature) => (
              <FeatureInspection feature={feature} />
            )}
            features={docBuilderFeatures.slice(0, 6)}
            onSelect={setSelectedId}
            selectedId={selectedId}
          />
        </article>
      </section>
    </>
  );
}

function DocBuilderInspector({
  architectureId,
  feature,
  onArchitectureSelect,
  view,
}: {
  architectureId: string;
  feature: DocBuilderFeature;
  onArchitectureSelect: (id: string) => void;
  view: DocBuilderView;
}) {
  if (view === "architecture")
    return (
      <aside className="project-docs-inspector docbuilder-inspector architecture-inspector">
        <ArchitectureInspectorPanels
          maps={docBuilderArchitectureMaps}
          onSelect={onArchitectureSelect}
          selectedId={architectureId}
        />
      </aside>
    );
  const metadata =
    view === "features"
      ? [
          ["Selected area", feature.title],
          ["Product domain", feature.category],
          ["Capabilities", String(feature.capabilities.length)],
          ["Workflow stages", String(feature.workflow.nodes.length)],
          ["Evidence", "Routes · schemas · service modules"],
        ]
      : [
          ["Repository", docBuilderProject.repository],
          ["Application", "Next.js 13 + FastAPI"],
          ["Persistence", "Firebase Firestore"],
          ["Backend API", "18 authenticated project endpoints"],
          ["AI system", "LangChain + RAG"],
          ["Latest activity", "Apr 2026"],
        ];
  return (
    <aside className="project-docs-inspector docbuilder-inspector">
      <section>
        <header>
          {view === "features" ? "FEATURE INSPECTOR" : "PROJECT STATUS"}
        </header>
        <h2>{view === "features" ? feature.title : "DOCBUILDER"}</h2>
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
            : docBuilderProject.stack
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
              {docBuilderProject.evidence.map(([label, value]) => (
                <p key={label}>
                  <small>{label}</small>
                  <b>{value}</b>
                </p>
              ))}
            </div>
          </section>
          <section className="armyverse-project-evolution">
            <header>PROJECT EVOLUTION</header>
            {docBuilderProject.timeline.map(([title, date, detail]) => (
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

export function DocBuilderDocsWorkspace() {
  const [view, setView] = useState<DocBuilderView>("overview");
  const [selectedFeature, setSelectedFeature] = useState(docBuilderFeatures[0]);
  const [selectedArchitectureId, setSelectedArchitectureId] = useState(
    docBuilderArchitectureMaps[0].id,
  );
  const selectedFile =
    view === "features"
      ? "FEATURES.md"
      : view === "architecture"
        ? "ARCHITECTURE.md"
        : "README.md";
  return (
    <section className="project-docs-workspace docbuilder-workspace">
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
          href={docBuilderProject.repositoryUrl}
          rel="noreferrer"
          target="_blank"
        >
          <ProjectUiIcon name="github" size="activity" />
        </a>
      </nav>
      <aside className="project-docs-nav">
        <header>
          <span>DOCUMENTATION</span>
          <a className="project-back-to-list" href="/projects">
            <ProjectUiIcon name="arrow-left" size="micro" />
            <span>Repositories</span>
          </a>
        </header>
        <div className="project-docs-tree">
          <b className="project-tree-root">
              <ProjectUiIcon name="chevron-down" size="sm" />
              <ProjectUiIcon name="folder-open" size="sm" />
              <span>DOCBUILDER /</span>
            </b>
          {docBuilderNavigation.map(({ id, label }) => (
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
            ["Runtime", "Next.js 13 + FastAPI"],
            ["Database", "Firestore"],
            ["AI layer", "LangChain + Groq"],
            ["Latest activity", "Apr 2026"],
            ["Status", "Production ready"],
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
            <ProjectUiIcon name={projectFileIconName(selectedFile)} size="sm" />
            <span>DOCBUILDER / {selectedFile}</span>
          </span>
          <a className="project-tabs-back" href="/projects">
            <ProjectUiIcon name="arrow-left" size="micro" />
            <span>Back to project list</span>
          </a>
          <button aria-label="More documentation actions" type="button">
            <ProjectUiIcon name="ellipsis" size="sm" />
          </button>
        </div>
        <div className="project-docs-scroll">
          {view === "overview" && (
            <DocBuilderOverview onOpenFeatures={() => setView("features")} />
          )}
          {view === "features" && (
            <>
              <DocBuilderHero />
              <GenericFeaturesView
                features={docBuilderFeatures as InspectableFeature[]}
                onSelectedChange={(feature) =>
                  setSelectedFeature(feature as DocBuilderFeature)
                }
              />
            </>
          )}
          {view === "architecture" && (
            <>
              <DocBuilderHero />
              <ArchitectureView
                maps={docBuilderArchitectureMaps}
                onSelect={setSelectedArchitectureId}
                overviewCopy={[
                  "DocBuilder is a two-tier authoring product: a Next.js workspace for rich editing and a FastAPI application layer for authentication, project mutations, LangChain orchestration, retrieval, and export. Firestore is the durable project store.",
                  "Choose a map to inspect one real authoring workflow, the durable record it changes, and the service or external boundary responsible for it.",
                ]}
                projectLabel="DOCBUILDER"
                selectedId={selectedArchitectureId}
                showProjectHero={false}
              />
            </>
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
            <b>developer@sambit:~/Documents/docbuilder</b>${" "}
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
            <b>developer@sambit:~/Documents/docbuilder</b>$ <i className="terminal-caret" />
          </p>
        </section>
      </main>
      <DocBuilderInspector
        architectureId={selectedArchitectureId}
        feature={selectedFeature}
        onArchitectureSelect={setSelectedArchitectureId}
        view={view}
      />
    </section>
  );
}
