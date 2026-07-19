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
import { insightQuillArchitectureMaps } from "@/data/insightquill/architecture";
import { insightQuillFeatures } from "@/data/insightquill/features";
import {
  insightQuillNavigation,
  insightQuillProject,
} from "@/data/insightquill/project";
import type {
  InsightQuillFeature,
  InsightQuillView,
} from "@/data/insightquill/types";

function InsightQuillHero() {
  return (
    <section className="project-docs-hero insightquill-hero">
      <div className="project-mark">{insightQuillProject.mark}</div>
      <div className="project-hero-copy">
        <h1>{insightQuillProject.name}</h1>
        <p>{insightQuillProject.tagline}</p>
        <span>PUBLIC REPOSITORY</span>
        <span>FLUTTER + SUPABASE</span>
        <span>ROLE-SCOPED</span>
        <small>{insightQuillProject.updated}</small>
      </div>
      <div className="project-hero-actions">
        <a
          className="github-action"
          href={insightQuillProject.repositoryUrl}
          rel="noreferrer"
          target="_blank"
        >
          <ProjectActionIcon type="github" /> GitHub
        </a>
        <a
          className="docs-action"
          href={`${insightQuillProject.repositoryUrl}/tree/V2/presentation`}
          rel="noreferrer"
          target="_blank"
        >
          <ProjectActionIcon type="docs" /> Documentation
        </a>
      </div>
    </section>
  );
}

function InsightQuillOverview({
  onOpenFeatures,
}: {
  onOpenFeatures: () => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <>
      <InsightQuillHero />
      <section className="agent-overview-hero insightquill-overview-hero">
        <figure className="agent-cockpit-preview insightquill-preview">
          <header>
            <b>◈ INSIGHTQUILL</b>
            <span>
              Academic operations, assessment integrity, and feedback
              intelligence
            </span>
            <i>●</i>
          </header>
          <aside>
            <b>▣ Academic workspace</b>
            <span>◉ Student tasks</span>
            <span>◇ Faculty courses</span>
            <span>▦ HOD oversight</span>
            <span>✦ Feedback intelligence</span>
          </aside>
          <main>
            <section>
              <small>ROLE-BASED ACADEMIC OPERATIONS</small>
              <h3>Run the class. Keep the evidence.</h3>
              <p>
                One academic system for course ownership, live assessments,
                reflective feedback, and reporting that preserves the context
                behind every result.
              </p>
              <span>Open faculty workspace →</span>
            </section>
            <div>
              <article>
                <small>ASSESSMENT</small>
                <b>Timed, integrity-aware quizzes</b>
                <span>schedule · flags · outcomes</span>
              </article>
              <article>
                <small>FEEDBACK V2</small>
                <b>Guided quality validation</b>
                <span>class + quiz domains</span>
              </article>
              <article>
                <small>OPERATIONS</small>
                <b>College-scoped control</b>
                <span>roles · courses · reports</span>
              </article>
            </div>
          </main>
        </figure>
        <aside className="agent-overview-copy insightquill-overview-copy">
          <div>
            <h2>Overview</h2>
            {insightQuillProject.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="agent-overview-problem-solution insightquill-problem-solution">
            <article>
              <b>Problem</b>
              <p>
                Attendance, assessments, faculty feedback, and departmental
                reporting are often separate manual processes with weak
                traceability.
              </p>
            </article>
            <article>
              <b>Approach</b>
              <p>
                InsightQuill ties role scope, schedule state, feedback quality,
                integrity signals, and reporting evidence to the same academic
                record.
              </p>
            </article>
          </div>
        </aside>
      </section>
      <section className="project-overview-body agent-overview-body insightquill-overview-body">
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
            features={insightQuillFeatures.slice(0, 6)}
            onSelect={setSelectedId}
            selectedId={selectedId}
          />
        </article>
      </section>
    </>
  );
}

function InsightQuillInspector({
  architectureId,
  feature,
  onArchitectureSelect,
  view,
}: {
  architectureId: string;
  feature: InsightQuillFeature;
  onArchitectureSelect: (id: string) => void;
  view: InsightQuillView;
}) {
  if (view === "architecture") {
    return (
      <aside className="project-docs-inspector insightquill-inspector architecture-inspector">
        <ArchitectureInspectorPanels
          maps={insightQuillArchitectureMaps}
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
          ["Evidence", "Flutter · API · RLS · tests"],
        ]
      : [
          ["Repository", insightQuillProject.repository],
          ["Application", "Flutter Android + Web"],
          ["Persistence", "Supabase PostgreSQL + RLS"],
          ["Codebase scale", "88 API modules · 13 domain models"],
          ["Verification", "34 Flutter test files"],
          ["Last verified", "25 May 2026"],
        ];

  return (
    <aside className="project-docs-inspector insightquill-inspector">
      <section>
        <header>
          {view === "features" ? "FEATURE INSPECTOR" : "PROJECT STATUS"}
        </header>
        <h2>{view === "features" ? feature.title : "INSIGHTQUILL"}</h2>
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
            : insightQuillProject.stack
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
              {insightQuillProject.evidence.map(([label, value]) => (
                <p key={label}>
                  <small>{label}</small>
                  <b>{value}</b>
                </p>
              ))}
            </div>
          </section>
          <section className="armyverse-project-evolution">
            <header>PROJECT EVOLUTION</header>
            {insightQuillProject.timeline.map(([title, date, detail]) => (
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

export function InsightQuillDocsWorkspace({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<InsightQuillView>("overview");
  const [selectedFeature, setSelectedFeature] = useState(
    insightQuillFeatures[0],
  );
  const [selectedArchitectureId, setSelectedArchitectureId] = useState(
    insightQuillArchitectureMaps[0].id,
  );
  const selectedFile =
    view === "features"
      ? "FEATURES.md"
      : view === "architecture"
        ? "ARCHITECTURE.md"
        : "README.md";

  return (
    <section className="project-docs-workspace insightquill-workspace">
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
          href={insightQuillProject.repositoryUrl}
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
          <b>⌄　INSIGHTQUILL /</b>
          {insightQuillNavigation.map(({ id, icon, label }) => (
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
            ["Branch", "V2"],
            ["Runtime", "Flutter + Dart"],
            ["Database", "Supabase PostgreSQL"],
            ["Backend", "Vercel Functions"],
            ["Latest commit", "25 May 2026"],
            ["Status", "● V2 active"],
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
          <span>▧　INSIGHTQUILL / {selectedFile}</span>
          <button className="project-tabs-back" onClick={onBack} type="button">
            ← Back to project list
          </button>
          <button aria-label="More documentation actions" type="button">
            ···
          </button>
        </div>
        <div className="project-docs-scroll">
          {view === "overview" && (
            <InsightQuillOverview onOpenFeatures={() => setView("features")} />
          )}
          {view === "features" && (
            <>
              <InsightQuillHero />
              <GenericFeaturesView
                features={insightQuillFeatures as InspectableFeature[]}
                onSelectedChange={(feature) =>
                  setSelectedFeature(feature as InsightQuillFeature)
                }
              />
            </>
          )}
          {view === "architecture" && (
            <>
              <InsightQuillHero />
              <ArchitectureView
                maps={insightQuillArchitectureMaps}
                onSelect={setSelectedArchitectureId}
                overviewCopy={[
                  "InsightQuill is a Flutter academic operations product backed by Supabase Auth, PostgreSQL, RLS, and Node.js serverless functions. The system is organized around concrete academic scope, not a fictional microservice layout.",
                  "Choose a map to inspect one real boundary: role and tenant enforcement, access challenges, secure quiz delivery, feedback runtime, AI drafting, or reporting.",
                ]}
                projectLabel="INSIGHTQUILL"
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
            <b>developer@sambit:~/Documents/InsightQuill</b>${" "}
            <i>
              {view === "features"
                ? "open feature-catalogue"
                : view === "architecture"
                  ? "open presentation/04_design_and_architecture.md"
                  : "cat presentation/02_synopsis.md"}
            </i>
            <br />
            Loaded repository-grounded project documentation.
            <br />
            <b>developer@sambit:~/Documents/InsightQuill</b>$ <i>▌</i>
          </p>
        </section>
      </main>
      <InsightQuillInspector
        architectureId={selectedArchitectureId}
        feature={selectedFeature}
        onArchitectureSelect={setSelectedArchitectureId}
        view={view}
      />
    </section>
  );
}
