"use client";

import { Fragment, type ReactNode, useMemo, useState } from "react";
import { armyverseFeatures } from "@/data/armyverse/features";
import {
  armyverseArchitectureMaps,
  type ArmyverseArchitectureMap,
} from "@/data/armyverse/architecture";
import { armyverseProject } from "@/data/armyverse/project";
import type { ArmyverseFeature } from "@/data/armyverse/types";

export type InspectableFeature = Omit<ArmyverseFeature, "category"> & {
  category: string;
};
type ArchitectureMapLike = Omit<ArmyverseArchitectureMap, "group"> & {
  group: string;
};

function ProjectActionIcon({ type }: { type: "github" | "live" | "docs" }) {
  return (
    <svg aria-hidden="true" className="project-action-icon" viewBox="0 0 24 24">
      {type === "github" && (
        <path d="M12 2.8a9.2 9.2 0 0 0-2.9 17.93c.46.08.63-.2.63-.44v-1.7c-2.56.56-3.1-1.1-3.1-1.1-.42-1.08-1.03-1.37-1.03-1.37-.84-.57.07-.56.07-.56.93.07 1.42.96 1.42.96.83 1.42 2.17 1.01 2.7.77.08-.6.32-1.01.59-1.25-2.04-.23-4.19-1.02-4.19-4.55 0-1.01.36-1.83.96-2.48-.1-.24-.42-1.17.09-2.44 0 0 .78-.25 2.54.95A8.8 8.8 0 0 1 12 7.2c.75 0 1.5.1 2.2.3 1.76-1.2 2.54-.95 2.54-.95.51 1.27.19 2.2.1 2.44.59.65.95 1.47.95 2.48 0 3.54-2.15 4.31-4.2 4.54.33.28.62.83.62 1.67v2.48c0 .24.17.52.64.43A9.2 9.2 0 0 0 12 2.8Z" />
      )}
      {type === "live" && (
        <>
          <path d="M5 12h13M13 6l6 6-6 6" />
          <path d="M5 5.5h6M5 18.5h6" opacity=".55" />
        </>
      )}
      {type === "docs" && (
        <>
          <path d="M4.5 5.5A2.5 2.5 0 0 1 7 3h4.5v16H7A2.5 2.5 0 0 0 4.5 21V5.5Z" />
          <path d="M19.5 5.5A2.5 2.5 0 0 0 17 3h-4.5v16H17a2.5 2.5 0 0 1 2.5 2V5.5Z" />
          <path d="M8 7h2.2M14 7h2.2" opacity=".65" />
        </>
      )}
    </svg>
  );
}

export function ProjectHero() {
  return (
    <section className="project-docs-hero armyverse-hero">
      <div className="project-mark">{armyverseProject.mark}</div>
      <div className="project-hero-copy">
        <h1>{armyverseProject.name}</h1>
        <p>{armyverseProject.tagline}</p>
        <span>PUBLIC REPOSITORY</span>
        <span>FULL STACK</span>
        <span>{armyverseProject.version}</span>
        <small>{armyverseProject.updated}</small>
      </div>
      <div className="project-hero-actions">
        <a
          className="github-action"
          href={armyverseProject.repositoryUrl}
          rel="noreferrer"
          target="_blank"
        >
          <ProjectActionIcon type="github" /> GitHub
        </a>
        <a
          className="live-action"
          href={armyverseProject.liveUrl}
          rel="noreferrer"
          target="_blank"
        >
          <ProjectActionIcon type="live" /> Live site
        </a>
        <a
          className="docs-action"
          href={armyverseProject.docsUrl}
          rel="noreferrer"
          target="_blank"
        >
          <ProjectActionIcon type="docs" /> Documentation
        </a>
      </div>
    </section>
  );
}

function ProductHeroPreview() {
  return (
    <section
      className="armyverse-overview-hero"
      aria-label="Armyverse product overview"
    >
      <figure className="armyverse-product-preview">
        <header>
          <b>✦ ARMYVERSE</b>
          <span>⌕ Discover BTS music, charts, and community</span>
          <i>●</i>
        </header>
        <aside>
          <b>⌁ Discover</b>
          <span>✦ AI Playlists</span>
          <span>◈ Global Charts</span>
          <span>▣ Boraverse</span>
          <span>▤ Community</span>
        </aside>
        <main>
          <section className="armyverse-preview-hero-card">
            <small>TAILORED MUSIC DISCOVERY</small>
            <h3>Build the BTS mix for the moment.</h3>
            <p>
              Mood, member, era, energy, and seed-track controls feed a playlist
              workflow built around the BTS catalogue.
            </p>
            <span>Open Playlist Architect　→</span>
          </section>
          <div className="armyverse-preview-stats">
            <article>
              <small>GLOBAL SNAPSHOTS</small>
              <b>Spotify + YouTube</b>
              <span>Daily ranking archive</span>
            </article>
            <article>
              <small>BORAVERSE</small>
              <b>Quiz → collect → progress</b>
              <span>Quests, mastery, and crafting</span>
            </article>
            <article>
              <small>COMMUNITY</small>
              <b>Write and discover</b>
              <span>Posts, reactions, and collections</span>
            </article>
          </div>
        </main>
      </figure>
      <aside className="armyverse-overview-copy">
        <div className="overview-copy-text">
          <h2>Overview</h2>
          {armyverseProject.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="overview-problem-solution">
          <article>
            <b>Problem</b>
            <p>
              Playlist planning, streaming context, fan writing, and collection
              loops are usually separate experiences.
            </p>
          </article>
          <article>
            <b>Solution</b>
            <p>
              ARMYVERSE connects catalogue-led discovery, scheduled data,
              community content, and Boraverse state in one app.
            </p>
          </article>
        </div>
      </aside>
    </section>
  );
}

export function FeatureRows({
  features,
  selectedId,
  onSelect,
  expandedContent,
}: {
  features: InspectableFeature[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  expandedContent?: (feature: InspectableFeature) => ReactNode;
}) {
  return (
    <div className="project-feature-rows armyverse-feature-rows">
      {features.map((feature) => {
        const expanded = feature.id === selectedId;
        return (
          <Fragment key={feature.id}>
            <button
              aria-expanded={expanded}
              className={expanded ? "expanded" : ""}
              onClick={() => onSelect(feature.id)}
              type="button"
            >
              <i>{expanded ? "⌃" : "⌄"}</i>
              <b>{feature.title}</b>
              <span>{feature.summary}</span>
              <em>{feature.category.toUpperCase()}</em>
              <small>INSPECT</small>
              <u>{expanded ? "−" : "+"}</u>
            </button>
            {expanded && expandedContent?.(feature)}
          </Fragment>
        );
      })}
    </div>
  );
}

function WorkflowGraph({
  feature,
  modal = false,
}: {
  feature: InspectableFeature;
  modal?: boolean;
}) {
  return (
    <div
      className={
        modal ? "workflow-graph workflow-graph-modal" : "workflow-graph"
      }
    >
      {feature.workflow.nodes.map((node, index) => (
        <div className="workflow-step" key={node}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <b>{node}</b>
          {index < feature.workflow.nodes.length - 1 && (
            <i aria-hidden="true">→</i>
          )}
        </div>
      ))}
    </div>
  );
}

export function FeatureInspection({
  feature,
}: {
  feature: InspectableFeature;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <article className="project-expanded-feature armyverse-expanded-feature">
      <header>
        <h3>
          {feature.title} <em>{feature.category.toUpperCase()}</em>
        </h3>
        <span>Expanded inspection</span>
      </header>
      <section className="feature-description">
        <h4>Description</h4>
        <p>{feature.description}</p>
        <ul aria-label={`${feature.title} capabilities`}>
          {feature.capabilities.map((capability) => (
            <li key={capability}>{capability}</li>
          ))}
        </ul>
      </section>
      <div className="feature-inspection-bottom">
        <section className="feature-workflow-panel">
          <header>
            <div className="workflow-panel-copy">
              <h4>{feature.workflow.title}</h4>
              <p>
                Implementation path reconstructed from the project’s documented
                flow and route structure.
              </p>
            </div>
            <button
              className="workflow-expand-action"
              onClick={() => setModalOpen(true)}
              type="button"
            >
              ⛶ Expand
            </button>
          </header>
          <WorkflowGraph feature={feature} />
        </section>
        <aside className="feature-engineering-notes">
          <h4>Engineering notes</h4>
          <ul>
            {feature.engineeringNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </aside>
      </div>
      {modalOpen && (
        <div
          aria-label={`${feature.title} workflow expanded`}
          aria-modal="true"
          className="workflow-modal-backdrop"
          onMouseDown={() => setModalOpen(false)}
          role="dialog"
        >
          <section
            className="workflow-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header>
              <div>
                <small>WORKFLOW INSPECTION</small>
                <h2>{feature.title}</h2>
                <p>{feature.workflow.title}</p>
              </div>
              <button
                aria-label="Close expanded workflow"
                onClick={() => setModalOpen(false)}
                type="button"
              >
                ×
              </button>
            </header>
            <WorkflowGraph feature={feature} modal />
            <footer>
              <span>{feature.description}</span>
              <button onClick={() => setModalOpen(false)} type="button">
                Close inspection
              </button>
            </footer>
          </section>
        </div>
      )}
    </article>
  );
}

export function OverviewView({
  onOpenFeatures,
}: {
  onOpenFeatures: () => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <>
      <ProjectHero />
      <ProductHeroPreview />
      <section className="project-overview-body armyverse-overview-body">
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
            features={armyverseFeatures.slice(0, 4)}
            onSelect={setSelectedId}
            selectedId={selectedId}
          />
        </article>
      </section>
    </>
  );
}

export function FeaturesView({
  onSelectedChange,
}: {
  onSelectedChange: (feature: ArmyverseFeature) => void;
}) {
  const [selectedId, setSelectedId] = useState(armyverseFeatures[0].id);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<
    "All" | ArmyverseFeature["category"]
  >("All");
  const selected =
    armyverseFeatures.find((feature) => feature.id === selectedId) ??
    armyverseFeatures[0];
  const categories = [
    "All",
    "Music",
    "Data",
    "Game",
    "Community",
    "Platform",
  ] as const;
  const filteredFeatures = useMemo(
    () =>
      armyverseFeatures.filter((feature) => {
        const matchCategory =
          category === "All" || feature.category === category;
        const haystack =
          `${feature.title} ${feature.summary} ${feature.description}`.toLowerCase();
        return matchCategory && haystack.includes(query.trim().toLowerCase());
      }),
    [category, query],
  );

  function selectFeature(id: string) {
    const next = armyverseFeatures.find((feature) => feature.id === id);
    if (!next) return;
    setSelectedId(id);
    onSelectedChange(next);
  }

  return (
    <>
      <ProjectHero />
      <section className="project-features-detail armyverse-features-detail">
        <header>
          <div>
            <h2>
              Feature catalogue{" "}
              <small>{armyverseFeatures.length} documented areas</small>
            </h2>
            <p>
              Open any row to inspect the real workflow and implementation
              choices behind it.
            </p>
          </div>
          <div className="feature-controls">
            <input
              aria-label="Search Armyverse features"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="⌕ Search features..."
              value={query}
            />
            <div>
              {categories.map((item) => (
                <button
                  className={category === item ? "selected" : ""}
                  key={item}
                  onClick={() => setCategory(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </header>
        {filteredFeatures.length ? (
          <>
            <FeatureRows
              expandedContent={(feature) => (
                <FeatureInspection feature={feature} />
              )}
              features={filteredFeatures}
              onSelect={selectFeature}
              selectedId={selectedId}
            />
          </>
        ) : (
          <p className="feature-empty-state">
            No documented feature matches that filter.
          </p>
        )}
      </section>
    </>
  );
}

export function GenericFeaturesView({
  features,
  onSelectedChange,
}: {
  features: InspectableFeature[];
  onSelectedChange: (feature: InspectableFeature) => void;
}) {
  const [selectedId, setSelectedId] = useState(features[0]?.id ?? "");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = [
    "All",
    ...Array.from(new Set(features.map((feature) => feature.category))),
  ];
  const filteredFeatures = useMemo(
    () =>
      features.filter((feature) => {
        const matchesCategory =
          category === "All" || feature.category === category;
        const haystack =
          `${feature.title} ${feature.summary} ${feature.description}`.toLowerCase();
        return matchesCategory && haystack.includes(query.trim().toLowerCase());
      }),
    [category, features, query],
  );

  function selectFeature(id: string) {
    const next = features.find((feature) => feature.id === id);
    if (!next) return;
    setSelectedId(id);
    onSelectedChange(next);
  }

  return (
    <section className="project-features-detail armyverse-features-detail generic-project-features">
      <header>
        <div>
          <h2>
            Feature catalogue <small>{features.length} documented areas</small>
          </h2>
          <p>
            Open a feature to inspect its route-owned workflow, persisted state,
            and engineering constraints.
          </p>
        </div>
        <div className="feature-controls">
          <input
            aria-label="Search project features"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="⌕ Search features..."
            value={query}
          />
          <div>
            {categories.map((item) => (
              <button
                className={category === item ? "selected" : ""}
                key={item}
                onClick={() => setCategory(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </header>
      {filteredFeatures.length ? (
        <FeatureRows
          expandedContent={(feature) => <FeatureInspection feature={feature} />}
          features={filteredFeatures}
          onSelect={selectFeature}
          selectedId={selectedId}
        />
      ) : (
        <p className="feature-empty-state">
          No documented feature matches that filter.
        </p>
      )}
    </section>
  );
}

function ArchitectureGraph({
  expanded = false,
  map,
}: {
  expanded?: boolean;
  map: ArchitectureMapLike;
}) {
  const nodes = new Map(map.nodes.map((node) => [node.id, node]));

  return (
    <div className={`armyverse-flowchart ${expanded ? "expanded" : ""}`}>
      <div className="armyverse-flowchart-stage">
        <svg
          aria-hidden="true"
          className="armyverse-flowchart-links"
          preserveAspectRatio="none"
          viewBox="0 0 1000 510"
        >
          <defs>
            <marker
              id="armyverse-flow-arrow"
              markerHeight="7"
              markerWidth="7"
              orient="auto"
              refX="6"
              refY="3.5"
            >
              <path d="M0,0 L7,3.5 L0,7 z" />
            </marker>
          </defs>
          {map.edges.map((edge) => {
            const from = nodes.get(edge.from);
            const to = nodes.get(edge.to);
            if (!from || !to) return null;
            const midY = Math.round((from.y + to.y) / 2);
            return (
              <g key={`${edge.from}-${edge.to}`}>
                <path
                  d={`M ${from.x} ${from.y} C ${from.x} ${midY}, ${to.x} ${midY}, ${to.x} ${to.y}`}
                  markerEnd="url(#armyverse-flow-arrow)"
                />
                {edge.label && (
                  <text x={(from.x + to.x) / 2} y={midY - 5}>
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        {map.nodes.map((node) => (
          <article
            className={`armyverse-flow-node ${node.tone}`}
            key={node.id}
            style={{ left: `${node.x / 10}%`, top: `${(node.y / 510) * 100}%` }}
          >
            <b>{node.label}</b>
            <span>{node.detail}</span>
          </article>
        ))}
      </div>
    </div>
  );
}

function ArchitectureModuleIcon({ title }: { title: string }) {
  const normalized = title.toLowerCase();
  const icon =
    normalized.includes("playlist") || normalized.includes("experience")
      ? "experience"
      : normalized.includes("route") || normalized.includes("scheduler")
        ? "routes"
        : normalized.includes("analytics") || normalized.includes("collector")
          ? "analytics"
          : normalized.includes("quest") ||
              normalized.includes("reward") ||
              normalized.includes("domain")
            ? "state"
            : "integration";

  return (
    <svg
      aria-hidden="true"
      className="architecture-module-icon"
      viewBox="0 0 24 24"
    >
      {icon === "experience" && (
        <>
          <rect height="13" rx="2" width="18" x="3" y="4" />
          <path d="M8 21h8M12 17v4" />
        </>
      )}
      {icon === "routes" && (
        <>
          <circle cx="6" cy="6" r="2" />
          <circle cx="18" cy="6" r="2" />
          <circle cx="12" cy="18" r="2" />
          <path d="M8 7.5 10.5 16M16 7.5 13.5 16" />
        </>
      )}
      {icon === "analytics" && (
        <>
          <path d="M4 19V5M4 19h16" />
          <path d="m7 15 4-4 3 2 5-6" />
        </>
      )}
      {icon === "state" && (
        <>
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
        </>
      )}
      {icon === "integration" && (
        <>
          <path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" />
          <path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1" />
        </>
      )}
    </svg>
  );
}

export function ArchitectureInspectorPanels({
  maps = armyverseArchitectureMaps,
  onSelect,
  selectedId,
}: {
  maps?: ArchitectureMapLike[];
  onSelect: (id: string) => void;
  selectedId: string;
}) {
  const selected = maps.find((map) => map.id === selectedId) ?? maps[0];

  return (
    <>
      <section className="architecture-library">
        <header>
          ARCHITECTURE & WORKFLOWS <small>{maps.length} documented maps</small>
        </header>
        <p>Choose a map to inspect its real system boundary and workflow.</p>
        <div>
          {maps.map((map) => (
            <button
              className={map.id === selected.id ? "selected" : ""}
              key={map.id}
              onClick={() => onSelect(map.id)}
              type="button"
            >
              <span>{map.group}</span>
              <b>{map.title}</b>
              <small>{map.source}</small>
            </button>
          ))}
        </div>
      </section>
      <section className="architecture-selected-notes">
        <header>SELECTED MAP</header>
        <b>{selected.title}</b>
        <p>{selected.summary}</p>
        <ul>
          {selected.engineeringNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>
    </>
  );
}

export function ArchitectureView({
  maps = armyverseArchitectureMaps,
  onSelect,
  selectedId,
  showProjectHero = true,
  overviewCopy = [
    "ARMYVERSE is a modular Next.js application rather than a fictional microservice estate. Its route layer separates interactive product work, scheduled collectors, and external integrations while domain state remains in MongoDB.",
    "The selected map on the right is one documented boundary within that system. Use the inspector to switch between platform, music, data, game, and community flows.",
  ],
  projectLabel = "ARMYVERSE",
}: {
  maps?: ArchitectureMapLike[];
  onSelect: (id: string) => void;
  selectedId: string;
  showProjectHero?: boolean;
  overviewCopy?: [string, string];
  projectLabel?: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const selected = maps.find((map) => map.id === selectedId) ?? maps[0];

  return (
    <>
      {showProjectHero && <ProjectHero />}
      <section className="armyverse-architecture-explorer">
        <div className="architecture-workspace-grid">
          <article className="architecture-overview-panel">
            <h2>Architecture overview</h2>
            <p>{overviewCopy[0]}</p>
            <p>{overviewCopy[1]}</p>
          </article>
          <section className="architecture-graph-panel">
            <header>
              <div>
                <small>{selected.group.toUpperCase()} MAP</small>
                <h2>{selected.title}</h2>
                <p>{selected.summary}</p>
              </div>
              <button
                className="architecture-expand-action"
                onClick={() => setModalOpen(true)}
                type="button"
              >
                ⛶ Expand map
              </button>
            </header>
            <ArchitectureGraph map={selected} />
            <footer>
              <span>Source: {selected.source}</span>
              <span>
                Arrows show real route, provider, and persistence boundaries.
              </span>
            </footer>
          </section>
          <section className="architecture-request-panel">
            <h2>Request path</h2>
            <div>
              {selected.support.requestPath.map(([title, detail], index) => (
                <article key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <b>{title}</b>
                    <p>{detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="architecture-modules-panel">
            <h2>Application modules</h2>
            <div>
              {selected.support.modules.map(([title, detail, tone]) => (
                <article className={tone} key={title}>
                  <header>
                    <ArchitectureModuleIcon title={title} />
                    <b>{title}</b>
                  </header>
                  <p>{detail}</p>
                  <span>● Active module</span>
                </article>
              ))}
            </div>
          </section>
          <section className="architecture-decisions-panel">
            <h2>Engineering decisions</h2>
            <div>
              {selected.support.decisions.map(([title, detail]) => (
                <article key={title}>
                  <b>{title}</b>
                  <p>{detail}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="architecture-safeguards-panel">
            <h2>Resilience & safeguards</h2>
            <div>
              {selected.support.safeguards.map((item) => (
                <span key={item}>◈ {item}</span>
              ))}
            </div>
          </section>
          <section className="architecture-operations-panel">
            <h2>Execution path</h2>
            <div>
              {selected.support.operationalPath.map((item, index) => (
                <Fragment key={item}>
                  <span>{item}</span>
                  {index < selected.support.operationalPath.length - 1 && (
                    <i>→</i>
                  )}
                </Fragment>
              ))}
            </div>
          </section>
        </div>
      </section>
      {modalOpen && (
        <div
          aria-label={`${selected.title} expanded`}
          aria-modal="true"
          className="architecture-modal-backdrop"
          onMouseDown={() => setModalOpen(false)}
          role="dialog"
        >
          <section
            className="architecture-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header>
              <div>
                <small>{projectLabel} ARCHITECTURE</small>
                <h2>{selected.title}</h2>
                <p>{selected.summary}</p>
              </div>
              <button
                aria-label="Close expanded architecture map"
                onClick={() => setModalOpen(false)}
                type="button"
              >
                ×
              </button>
            </header>
            <ArchitectureGraph expanded map={selected} />
            <footer>
              <span>{selected.source}</span>
              <button onClick={() => setModalOpen(false)} type="button">
                Close map
              </button>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}
