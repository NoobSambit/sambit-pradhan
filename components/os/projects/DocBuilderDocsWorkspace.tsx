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
        <figure className="docbuilder-preview">
          <header>
            <b>▤ DOCBUILDER</b>
            <span>Research-grounded document and presentation workspace</span>
            <i>●</i>
          </header>
          <aside>
            <b>▣ Project outline</b>
            <span>✦ AI outline</span>
            <span>⌁ RAG research</span>
            <span>◫ Refine section</span>
            <span>↥ Export</span>
          </aside>
          <main>
            <section>
              <small>DOCUMENT INTELLIGENCE</small>
              <h3>Draft with structure. Refine with context.</h3>
              <p>
                Projects keep their outline, generated sections, research-aware
                content, editorial history, and final export in one editable
                workspace.
              </p>
              <span>Open authoring workspace →</span>
            </section>
            <div>
              <article>
                <small>STRUCTURED OUTPUT</small>
                <b>Pydantic-validated sections</b>
                <span>titles · bullets · word count</span>
              </article>
              <article>
                <small>RESEARCH PATH</small>
                <b>Search → rank → cite</b>
                <span>Google + FAISS retrieval</span>
              </article>
              <article>
                <small>FINAL OUTPUT</small>
                <b>DOCX + PPTX</b>
                <span>four presentation themes</span>
              </article>
            </div>
          </main>
        </figure>
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
              Open full catalogue →
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

export function DocBuilderDocsWorkspace({ onBack }: { onBack: () => void }) {
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
          href={docBuilderProject.repositoryUrl}
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
          <b>⌄　DOCBUILDER /</b>
          {docBuilderNavigation.map(({ id, icon, label }) => (
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
            ["Runtime", "Next.js 13 + FastAPI"],
            ["Database", "Firestore"],
            ["AI layer", "LangChain + Groq"],
            ["Latest activity", "Apr 2026"],
            ["Status", "● Production ready"],
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
          <span>▧　DOCBUILDER / {selectedFile}</span>
          <button className="project-tabs-back" onClick={onBack} type="button">
            ← Back to project list
          </button>
          <button aria-label="More documentation actions" type="button">
            ···
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
            <em>◉ zsh　＋　▣　⌫　⌃</em>
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
            <b>developer@sambit:~/Documents/docbuilder</b>$ <i>▌</i>
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
