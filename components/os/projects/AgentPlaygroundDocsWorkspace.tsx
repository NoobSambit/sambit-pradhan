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
  ProjectImageCarousel,
  type ProjectBanner,
} from "@/components/os/projects/ProjectImageCarousel";
import { agentArchitectureMaps } from "@/data/agent-playground/architecture";
import { agentPlaygroundFeatures } from "@/data/agent-playground/features";
import {
  agentPlaygroundNavigation,
  agentPlaygroundProject,
} from "@/data/agent-playground/project";
import type {
  AgentPlaygroundFeature,
  AgentPlaygroundView,
} from "@/data/agent-playground/types";

const agentPlaygroundBanners = [
  {
    src: "/project_banners/agent-playground/agent-build-grow.png",
    label: "Build agents that learn and grow",
    alt: "Agent Playground agent lifecycle poster",
  },
  {
    src: "/project_banners/agent-playground/conversation-trace.png",
    label: "Every conversation leaves a trace",
    alt: "Agent Playground conversation trace poster",
  },
  {
    src: "/project_banners/agent-playground/memory-inspection.png",
    label: "Memory is not a black box",
    alt: "Agent Playground memory inspection poster",
  },
  {
    src: "/project_banners/agent-playground/knowledge-governance.png",
    label: "Reusable knowledge needs governance",
    alt: "Agent Playground knowledge governance poster",
  },
  {
    src: "/project_banners/agent-playground/network-knowledge-query.png",
    label: "Ask the network who knows",
    alt: "Agent Playground network knowledge poster",
  },
  {
    src: "/project_banners/agent-playground/consensus-reasoning.png",
    label: "Let the best reasoning win",
    alt: "Agent Playground consensus reasoning poster",
  },
  {
    src: "/project_banners/agent-playground/artifact-lifecycle.png",
    label: "Create, evaluate, publish",
    alt: "Agent Playground artifact lifecycle poster",
  },
  {
    src: "/project_banners/agent-playground/evaluation-trials.png",
    label: "Do not trust claims. Run trials.",
    alt: "Agent Playground evaluation trials poster",
  },
  {
    src: "/project_banners/agent-playground/dream-memory.png",
    label: "Dreams leave a residue",
    alt: "Agent Playground dream memory poster",
  },
  {
    src: "/project_banners/agent-playground/scenario-branches.png",
    label: "Explore the branch before you take it",
    alt: "Agent Playground scenario branching poster",
  },
  {
    src: "/project_banners/agent-playground/explainable-growth.png",
    label: "Growth should be explainable",
    alt: "Agent Playground explainable growth poster",
  },
  {
    src: "/project_banners/agent-playground/trust-relationships.png",
    label: "Trust is a system, not a star",
    alt: "Agent Playground trust relationships poster",
  },
  {
    src: "/project_banners/agent-playground/state-change-trace.png",
    label: "See what changed inside",
    alt: "Agent Playground state change trace poster",
  },
] satisfies readonly ProjectBanner[];

function AgentHero() {
  return (
    <section className="project-docs-hero agent-playground-hero">
      <div className="project-mark">AP</div>
      <div className="project-hero-copy">
        <h1>{agentPlaygroundProject.name}</h1>
        <p>{agentPlaygroundProject.tagline}</p>
        <span>PUBLIC REPOSITORY</span>
        <span>FULL STACK</span>
        <span>POSTGRESQL CANONICAL</span>
        <small>{agentPlaygroundProject.updated}</small>
      </div>
      <div className="project-hero-actions">
        <a
          className="github-action"
          href={agentPlaygroundProject.repositoryUrl}
          rel="noreferrer"
          target="_blank"
        >
          <ProjectActionIcon type="github" /> GitHub
        </a>
        <a
          className="docs-action"
          href={`${agentPlaygroundProject.repositoryUrl}/tree/main/docs`}
          rel="noreferrer"
          target="_blank"
        >
          <ProjectActionIcon type="docs" /> Documentation
        </a>
      </div>
    </section>
  );
}

function AgentOverview({ onOpenFeatures }: { onOpenFeatures: () => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return (
    <>
      <AgentHero />
      <section className="agent-overview-hero">
        <ProjectImageCarousel
          banners={agentPlaygroundBanners}
          projectName="Agent Playground"
        />
        <aside className="agent-overview-copy">
          <div>
            <h2>Overview</h2>
            {agentPlaygroundProject.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="agent-overview-problem-solution">
            <article>
              <b>Problem</b>
              <p>
                Most agent demos hide their memory, state changes, quality
                checks, and provider behavior behind a chat bubble.
              </p>
            </article>
            <article>
              <b>Approach</b>
              <p>
                Agent Playground persists the workflow itself: evidence, stages,
                quality, status, retrieval, and outcomes remain inspectable.
              </p>
            </article>
          </div>
        </aside>
      </section>
      <section className="project-overview-body agent-overview-body">
        <article>
          <div className="overview-feature-heading">
            <h2>Feature catalogue</h2>
            <button onClick={onOpenFeatures} type="button">
              Open full catalogue →
            </button>
          </div>
          <FeatureRows
            expandedContent={(feature) => (
              <FeatureInspection feature={feature} />
            )}
            features={agentPlaygroundFeatures.slice(0, 6)}
            onSelect={setSelectedId}
            selectedId={selectedId}
          />
        </article>
      </section>
    </>
  );
}

function AgentInspector({
  architectureId,
  feature,
  onArchitectureSelect,
  view,
}: {
  architectureId: string;
  feature: AgentPlaygroundFeature;
  onArchitectureSelect: (id: string) => void;
  view: AgentPlaygroundView;
}) {
  if (view === "architecture")
    return (
      <aside className="project-docs-inspector agent-playground-inspector architecture-inspector">
        <ArchitectureInspectorPanels
          maps={agentArchitectureMaps}
          onSelect={onArchitectureSelect}
          selectedId={architectureId}
        />
      </aside>
    );
  const featureMetadata = [
    ["Selected area", feature.title],
    ["Product domain", feature.category],
    ["Capabilities", String(feature.capabilities.length)],
    ["Workflow stages", String(feature.workflow.nodes.length)],
    ["Evidence", "Routes · services · tables"],
  ];
  const statusMetadata = [
    ["Repository", agentPlaygroundProject.repository],
    ["Application", "Next.js 15 App Router"],
    ["Persistence", "PostgreSQL + Drizzle"],
    ["Codebase scale", "55 routes · 42 services"],
    ["Repository layer", "26 repositories · 44 tables"],
    ["Last verified", "17 Jul 2026"],
  ];
  return (
    <aside className="project-docs-inspector agent-playground-inspector">
      <section>
        <header>
          {view === "features" ? "FEATURE INSPECTOR" : "PROJECT STATUS"}
        </header>
        <h2>{view === "features" ? feature.title : "AGENT PLAYGROUND"}</h2>
        {(view === "features" ? featureMetadata : statusMetadata).map(
          ([key, value]) => (
            <p className="key-value" key={key}>
              {key}
              <b>{value}</b>
            </p>
          ),
        )}
      </section>
      <section>
        <header>
          {view === "features" ? "FEATURE CAPABILITIES" : "TECH STACK"}
        </header>
        <div className="project-stack-tags">
          {(view === "features"
            ? feature.capabilities
            : agentPlaygroundProject.stack
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
              {agentPlaygroundProject.evidence.map(([label, value]) => (
                <p key={label}>
                  <small>{label}</small>
                  <b>{value}</b>
                </p>
              ))}
            </div>
          </section>
          <section className="armyverse-project-evolution">
            <header>PROJECT EVOLUTION</header>
            {agentPlaygroundProject.timeline.map(([title, date, detail]) => (
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

export function AgentPlaygroundDocsWorkspace({
  onBack,
}: {
  onBack: () => void;
}) {
  const [view, setView] = useState<AgentPlaygroundView>("overview");
  const [selectedFeature, setSelectedFeature] = useState(
    agentPlaygroundFeatures[0],
  );
  const [selectedArchitectureId, setSelectedArchitectureId] = useState(
    agentArchitectureMaps[0].id,
  );
  const selectedFile =
    view === "features"
      ? "FEATURES.md"
      : view === "architecture"
        ? "ARCHITECTURE.md"
        : "README.md";

  return (
    <section className="project-docs-workspace agent-playground-workspace">
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
          href={agentPlaygroundProject.repositoryUrl}
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
            onClick={onBack}
            type="button"
          >
            ← Repositories
          </button>
        </header>
        <div className="project-docs-tree">
          <b>⌄　AGENT-PLAYGROUND /</b>
          {agentPlaygroundNavigation.map(({ id, icon, label }) => (
            <button
              className={view === id ? "active" : ""}
              key={id}
              onClick={() => setView(id)}
              type="button"
            >
              <i>{icon}</i>
              {label}
            </button>
          ))}
        </div>
        <footer>
          <h3>PROJECT INFO</h3>
          {[
            ["Repository", "Public"],
            ["Branch", "main"],
            ["Runtime", "Next.js 15"],
            ["Database", "PostgreSQL"],
            ["Persistence", "Drizzle ORM"],
            ["Latest commit", "17 Jul 2026"],
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
          <span>▧　AGENT-PLAYGROUND / {selectedFile}</span>
          <button className="project-tabs-back" onClick={onBack} type="button">
            ← Back to project list
          </button>
          <button aria-label="More documentation actions" type="button">
            ···
          </button>
        </div>
        <div className="project-docs-scroll">
          {view === "overview" && (
            <AgentOverview onOpenFeatures={() => setView("features")} />
          )}
          {view === "features" && (
            <>
              <AgentHero />
              <GenericFeaturesView
                features={agentPlaygroundFeatures as InspectableFeature[]}
                onSelectedChange={(feature) =>
                  setSelectedFeature(feature as AgentPlaygroundFeature)
                }
              />
            </>
          )}
          {view === "architecture" && (
            <>
              <AgentHero />
              <ArchitectureView
                maps={agentArchitectureMaps}
                onSelect={setSelectedArchitectureId}
                overviewCopy={[
                  "Agent Playground is a modular Next.js runtime with explicit client-state, route, service, repository, persistence, provider, and legacy-migration boundaries. It is one inspectable application—not a fictional microservice estate.",
                  "Choose a map to inspect a real workflow, its durable records, its quality or governance boundary, and the exact modules that coordinate it.",
                ]}
                projectLabel="AGENT PLAYGROUND"
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
            <em>◉ zsh　＋　▣　⌫　⌃</em>
          </header>
          <p>
            <b>developer@sambit:~/Documents/AGENT-PLAYGROUND</b>${" "}
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
            <b>developer@sambit:~/Documents/AGENT-PLAYGROUND</b>$ <i>▌</i>
          </p>
        </section>
      </main>
      <AgentInspector
        architectureId={selectedArchitectureId}
        feature={selectedFeature}
        onArchitectureSelect={setSelectedArchitectureId}
        view={view}
      />
    </section>
  );
}
