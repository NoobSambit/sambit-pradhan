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
import { kisanSetuArchitectureMaps } from "@/data/kisan-setu/architecture";
import { kisanSetuFeatures } from "@/data/kisan-setu/features";
import {
  kisanSetuNavigation,
  kisanSetuProject,
} from "@/data/kisan-setu/project";
import type { KisanSetuFeature, KisanSetuView } from "@/data/kisan-setu/types";

const kisanSetuBanners = [
  {
    src: "/project_banners/kisansetu/farm-memory.png",
    label: "My farm remembers me",
    alt: "KisanSetu farm memory poster",
  },
  {
    src: "/project_banners/kisansetu/voice-farm-advice.png",
    label: "Ask in your language. Act on your farm.",
    alt: "KisanSetu voice farm advice poster",
  },
  {
    src: "/project_banners/kisansetu/scheme-support-pathway.png",
    label: "Find the support you can actually use",
    alt: "KisanSetu scheme support pathway poster",
  },
  {
    src: "/project_banners/kisansetu/satellite-health.png",
    label: "See your farm from space—honestly",
    alt: "KisanSetu satellite health poster",
  },
  {
    src: "/project_banners/kisansetu/market-intelligence.png",
    label: "Know the market. Choose the moment.",
    alt: "KisanSetu market intelligence poster",
  },
  {
    src: "/project_banners/kisansetu/weekly-action-briefing.png",
    label: "What needs attention this week",
    alt: "KisanSetu weekly action briefing poster",
  },
] satisfies readonly ProjectBanner[];

function KisanSetuHero() {
  return (
    <section className="project-docs-hero kisansetu-hero">
      <div className="project-mark">{kisanSetuProject.mark}</div>
      <div className="project-hero-copy">
        <h1>{kisanSetuProject.name}</h1>
        <p>{kisanSetuProject.tagline}</p>
        <span>PUBLIC REPOSITORY</span>
        <span>AGRI INTELLIGENCE</span>
        <span className="ongoing-project-tag">ONGOING BUILD</span>
        <small>{kisanSetuProject.updated}</small>
      </div>
      <div className="project-hero-actions">
        <a
          className="github-action"
          href={kisanSetuProject.repositoryUrl}
          rel="noreferrer"
          target="_blank"
        >
          <ProjectActionIcon type="github" /> GitHub
        </a>
        <a
          className="docs-action"
          href={`${kisanSetuProject.repositoryUrl}/tree/main/docs`}
          rel="noreferrer"
          target="_blank"
        >
          <ProjectActionIcon type="docs" /> Documentation
        </a>
      </div>
    </section>
  );
}

function KisanSetuOverview({ onOpenFeatures }: { onOpenFeatures: () => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return (
    <>
      <KisanSetuHero />
      <section className="agent-overview-hero kisansetu-overview-hero">
        <ProjectImageCarousel
          banners={kisanSetuBanners}
          projectName="KisanSetu"
        />
        <aside className="agent-overview-copy kisansetu-overview-copy">
          <div>
            <h2>Overview</h2>
            {kisanSetuProject.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="agent-overview-problem-solution kisansetu-problem-solution">
            <article>
              <b>Problem</b>
              <p>
                Farm decisions are often spread across generic advice, delayed
                data, opaque recommendations, and disconnected application
                paths.
              </p>
            </article>
            <article>
              <b>Current focus</b>
              <p>
                Core intelligence flows are implemented; forecast, weather-risk,
                and unified-dashboard work remains visibly ongoing.
              </p>
            </article>
          </div>
        </aside>
      </section>
      <section className="project-overview-body agent-overview-body kisansetu-overview-body">
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
            features={kisanSetuFeatures.slice(0, 7)}
            onSelect={setSelectedId}
            selectedId={selectedId}
          />
        </article>
      </section>
    </>
  );
}

function KisanSetuInspector({
  architectureId,
  feature,
  onArchitectureSelect,
  view,
}: {
  architectureId: string;
  feature: KisanSetuFeature;
  onArchitectureSelect: (id: string) => void;
  view: KisanSetuView;
}) {
  if (view === "architecture") {
    return (
      <aside className="project-docs-inspector kisansetu-inspector architecture-inspector">
        <ArchitectureInspectorPanels
          maps={kisanSetuArchitectureMaps}
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
          ["Evidence", "Code · services · PRD tracker"],
        ]
      : [
          ["Repository", kisanSetuProject.repository],
          ["State", "Ongoing — Day 4–6 active"],
          ["Application", "Next.js App Router"],
          ["Persistence", "Firebase Firestore"],
          ["Codebase scale", "24 routes · 29 service modules"],
          ["Latest committed baseline", "14 Feb 2026"],
        ];
  return (
    <aside className="project-docs-inspector kisansetu-inspector">
      <section>
        <header>
          {view === "features" ? "FEATURE INSPECTOR" : "PROJECT STATUS"}
        </header>
        <h2>{view === "features" ? feature.title : "KISANSETU"}</h2>
        {view === "overview" && (
          <p className="project-ongoing-notice">
            ● ONGOING — active Day 4–6 delivery
          </p>
        )}
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
            : kisanSetuProject.stack
          ).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>
      {view === "overview" && (
        <>
          <section className="armyverse-project-metrics">
            <header>PROJECT EVIDENCE</header>
            <div>
              {kisanSetuProject.evidence.map(([label, value]) => (
                <p key={label}>
                  <small>{label}</small>
                  <b>{value}</b>
                </p>
              ))}
            </div>
          </section>
          <section className="armyverse-project-evolution">
            <header>DELIVERY TIMELINE</header>
            {kisanSetuProject.timeline.map(([title, date, detail]) => (
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

export function KisanSetuDocsWorkspace({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<KisanSetuView>("overview");
  const [selectedFeature, setSelectedFeature] = useState(kisanSetuFeatures[0]);
  const [selectedArchitectureId, setSelectedArchitectureId] = useState(
    kisanSetuArchitectureMaps[0].id,
  );
  const selectedFile =
    view === "features"
      ? "FEATURES.md"
      : view === "architecture"
        ? "ARCHITECTURE.md"
        : "README.md";
  return (
    <section className="project-docs-workspace kisansetu-workspace">
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
          href={kisanSetuProject.repositoryUrl}
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
          <b>⌄　KISANSETU /</b>
          {kisanSetuNavigation.map(({ id, icon, label }) => (
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
            ["Database", "Firestore"],
            ["State", "● Ongoing build"],
            ["Active scope", "Day 4–6"],
            ["Status", "● PRD-tracked"],
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
          <span>▧　KISANSETU / {selectedFile}</span>
          <button className="project-tabs-back" onClick={onBack} type="button">
            ← Back to project list
          </button>
          <button aria-label="More documentation actions" type="button">
            ···
          </button>
        </div>
        <div className="project-docs-scroll">
          {view === "overview" && (
            <KisanSetuOverview onOpenFeatures={() => setView("features")} />
          )}
          {view === "features" && (
            <>
              <KisanSetuHero />
              <GenericFeaturesView
                features={kisanSetuFeatures as InspectableFeature[]}
                onSelectedChange={(feature) =>
                  setSelectedFeature(feature as KisanSetuFeature)
                }
              />
            </>
          )}
          {view === "architecture" && (
            <>
              <KisanSetuHero />
              <ArchitectureView
                maps={kisanSetuArchitectureMaps}
                onSelect={setSelectedArchitectureId}
                overviewCopy={[
                  "KisanSetu is a Next.js agricultural intelligence application with internal service layers, Firebase persistence, optional model providers, and source-aware data integrations. Its maps document implemented boundaries and active-work edges without presenting a speculative microservice system.",
                  "Select a map to inspect farm context, advisory, schemes, satellite crop health, market data, or weather-risk/dashboard workflows.",
                ]}
                projectLabel="KISANSETU"
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
            <b>developer@sambit:~/Documents/KisanSetu</b>${" "}
            <i>
              {view === "features"
                ? "open docs/application/architecture/APPLICATION_MODULES.md"
                : view === "architecture"
                  ? "open docs/application/architecture/ARCHITECTURE_OVERVIEW.md"
                  : "cat docs/prd/PRD_PROGRESS_TRACKER.md"}
            </i>
            <br />
            Loaded repository-grounded project documentation.
            <br />
            <b>developer@sambit:~/Documents/KisanSetu</b>$ <i>▌</i>
          </p>
        </section>
      </main>
      <KisanSetuInspector
        architectureId={selectedArchitectureId}
        feature={selectedFeature}
        onArchitectureSelect={setSelectedArchitectureId}
        view={view}
      />
    </section>
  );
}
