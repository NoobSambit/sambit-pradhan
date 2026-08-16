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
import { gymTrackerArchitectureMaps } from "@/data/gym-tracker/architecture";
import { gymTrackerFeatures } from "@/data/gym-tracker/features";
import {
  gymTrackerNavigation,
  gymTrackerProject,
} from "@/data/gym-tracker/project";
import type {
  GymTrackerFeature,
  GymTrackerView,
} from "@/data/gym-tracker/types";

const gymTrackerBanners = [
  {
    src: "/project_banners/gym_tracker/offline-training-foundation.png",
    label: "Training that never waits",
    alt: "Gym Tracker offline-first workout logging poster",
  },
  {
    src: "/project_banners/gym_tracker/workout-recovery-engine.png",
    label: "Never lose the workout",
    alt: "Gym Tracker workout recovery and rest timer poster",
  },
  {
    src: "/project_banners/gym_tracker/versioned-training-history.png",
    label: "Plans change. History does not.",
    alt: "Gym Tracker versioned routine history poster",
  },
  {
    src: "/project_banners/gym_tracker/rebuildable-progress.png",
    label: "Progress you can rebuild",
    alt: "Gym Tracker correction-aware progress poster",
  },
  {
    src: "/project_banners/gym_tracker/optional-account-sync.png",
    label: "Connect when you choose",
    alt: "Gym Tracker optional account sync poster",
  },
  {
    src: "/project_banners/gym_tracker/private-challenge-scoring.png",
    label: "Compete privately. Score honestly.",
    alt: "Gym Tracker private challenge scoring poster",
  },
] satisfies readonly ProjectBanner[];

function GymTrackerHero() {
  return (
    <section className="project-docs-hero">
      <div className="project-mark">{gymTrackerProject.mark}</div>
      <div className="project-hero-copy">
        <h1>{gymTrackerProject.name}</h1>
        <p>{gymTrackerProject.tagline}</p>
        <span>PUBLIC REPOSITORY</span>
        <span>OFFLINE-FIRST</span>
        <span className="ongoing-project-tag">V1 RELEASE CANDIDATE</span>
        <small>{gymTrackerProject.updated}</small>
      </div>
      <div className="project-hero-actions">
        <a
          className="github-action"
          href={gymTrackerProject.repositoryUrl}
          rel="noreferrer"
          target="_blank"
        >
          <ProjectActionIcon type="github" /> GitHub
        </a>
        <a
          className="docs-action"
          href={`${gymTrackerProject.repositoryUrl}/tree/main/docs`}
          rel="noreferrer"
          target="_blank"
        >
          <ProjectActionIcon type="docs" /> Documentation
        </a>
      </div>
    </section>
  );
}

function GymTrackerOverview({
  onOpenFeatures,
}: {
  onOpenFeatures: () => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return (
    <>
      <GymTrackerHero />
      <section className="agent-overview-hero">
        <ProjectImageCarousel
          banners={gymTrackerBanners}
          projectName="Gym Tracker"
        />
        <aside className="agent-overview-copy">
          <div>
            <h2>Overview</h2>
            {gymTrackerProject.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="agent-overview-problem-solution">
            <article>
              <b>Problem</b>
              <p>
                Workout logging becomes untrustworthy when fast set entry,
                recovery, history, and sync are treated as separate concerns.
              </p>
            </article>
            <article>
              <b>Current state</b>
              <p>
                V1 is feature-complete; PRD 09 manual stabilization remains the
                release decision lane.
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
            features={gymTrackerFeatures.slice(0, 8)}
            onSelect={setSelectedId}
            selectedId={selectedId}
          />
        </article>
      </section>
    </>
  );
}

function GymTrackerInspector({
  architectureId,
  feature,
  onArchitectureSelect,
  view,
}: {
  architectureId: string;
  feature: GymTrackerFeature;
  onArchitectureSelect: (id: string) => void;
  view: GymTrackerView;
}) {
  if (view === "architecture") {
    return (
      <aside className="project-docs-inspector architecture-inspector">
        <ArchitectureInspectorPanels
          maps={gymTrackerArchitectureMaps}
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
          ["Evidence", "Flutter · API · Prisma · handbook"],
        ]
      : [
          ["Repository", gymTrackerProject.repository],
          ["State", "Release candidate · PRD 09"],
          ["Application", "Flutter — Android-first"],
          ["Local truth", "Drift / SQLite"],
          ["Remote system", "NestJS + Prisma + PostgreSQL"],
          ["API contract", "Committed OpenAPI client"],
        ];

  return (
    <aside className="project-docs-inspector">
      <section>
        <header>
          {view === "features" ? "FEATURE INSPECTOR" : "PROJECT STATUS"}
        </header>
        <h2>{view === "features" ? feature.title : "GYM TRACKER"}</h2>
        {view === "overview" && (
          <p className="project-ongoing-notice">
            ● RELEASE CANDIDATE — manual stabilization
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
            : gymTrackerProject.stack
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
              {gymTrackerProject.evidence.map(([label, value]) => (
                <p key={label}>
                  <small>{label}</small>
                  <b>{value}</b>
                </p>
              ))}
            </div>
          </section>
          <section className="armyverse-project-evolution">
            <header>DELIVERY TIMELINE</header>
            {gymTrackerProject.timeline.map(([title, date, detail]) => (
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

export function GymTrackerDocsWorkspace({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<GymTrackerView>("overview");
  const [selectedFeature, setSelectedFeature] = useState(gymTrackerFeatures[0]);
  const [selectedArchitectureId, setSelectedArchitectureId] = useState(
    gymTrackerArchitectureMaps[0].id,
  );
  const selectedFile =
    view === "features"
      ? "FEATURES.md"
      : view === "architecture"
        ? "ARCHITECTURE.md"
        : "README.md";

  return (
    <section className="project-docs-workspace">
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
          href={gymTrackerProject.repositoryUrl}
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
          <b>⌄　GYM-TRACKER /</b>
          {gymTrackerNavigation.map(({ id, icon, label }) => (
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
            ["Runtime", "Flutter + NestJS"],
            ["Local data", "Drift / SQLite"],
            ["Remote data", "PostgreSQL"],
            ["Release phase", "PRD 09"],
            ["Status", "● Manual stabilization"],
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
          <span>▧　GYM-TRACKER / {selectedFile}</span>
          <button className="project-tabs-back" onClick={onBack} type="button">
            ← Back to project list
          </button>
          <button aria-label="More documentation actions" type="button">
            ···
          </button>
        </div>
        <div className="project-docs-scroll">
          {view === "overview" && (
            <GymTrackerOverview onOpenFeatures={() => setView("features")} />
          )}
          {view === "features" && (
            <>
              <GymTrackerHero />
              <GenericFeaturesView
                features={gymTrackerFeatures as InspectableFeature[]}
                onSelectedChange={(feature) =>
                  setSelectedFeature(feature as GymTrackerFeature)
                }
              />
            </>
          )}
          {view === "architecture" && (
            <>
              <GymTrackerHero />
              <ArchitectureView
                maps={gymTrackerArchitectureMaps}
                onSelect={setSelectedArchitectureId}
                overviewCopy={[
                  "Gym Tracker keeps the gym-floor loop local, then layers an explicit account boundary, generated API contract, remote persistence, and private social systems around it.",
                  "Select a map to inspect active-workout durability, routine-to-progress history, optional sync, or privacy- and server-scored challenge boundaries.",
                ]}
                projectLabel="GYM TRACKER"
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
            <b>developer@sambit:~/Documents/gym-tracker</b>${" "}
            <i>
              {view === "features"
                ? "open docs/09-application-handbook.md"
                : view === "architecture"
                  ? "open app-and-api-workflows"
                  : "cat README.md"}
            </i>
            <br />
            Loaded repository-grounded project documentation.
            <br />
            <b>developer@sambit:~/Documents/gym-tracker</b>$ <i>▌</i>
          </p>
        </section>
      </main>
      <GymTrackerInspector
        architectureId={selectedArchitectureId}
        feature={selectedFeature}
        onArchitectureSelect={setSelectedArchitectureId}
        view={view}
      />
    </section>
  );
}
