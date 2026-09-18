"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import Link from "next/link";
import {
  MobileDrawer,
  MobileDocumentTabs,
  MobileProjectsShell,
  MobileTerminalDock,
  MobileWorkspaceBar,
  type MobilePanel,
} from "./MobileProjectsChrome";
import styles from "./MobileProjects.module.css";
import {
  MobileArchitectureMap,
  MobileFeature,
  MobileProjectDocument,
  mobileProjectArchitectureMaps,
  mobileProjectDocuments,
  mobileProjectFeatures,
} from "./mobileProjectData";
import { ProjectUiIcon } from "@/components/os/projects/ProjectUiIcon";
import { armyverseProductScreens } from "@/components/os/projects/ArmyverseProjectViews";
import { getProjectBySlug, type DocumentedProjectSlug } from "@/lib/projects";

type MobileFile = "README.md" | "FEATURES.md" | "ARCHITECTURE.md";

function toneClass(tone: string) {
  return tone === "purple" ||
    tone === "cyan" ||
    tone === "green" ||
    tone === "amber"
    ? tone
    : "cyan";
}

function docRuntime(doc: MobileProjectDocument, fallback: string) {
  return doc.stack.find((item) => item.startsWith("Next.js")) ?? fallback;
}

function docApplication(doc: MobileProjectDocument) {
  return doc.stack[0] ?? "Documented application";
}

function docDatabase(doc: MobileProjectDocument) {
  return (
    doc.stack.find((item) =>
      /Mongo|Postgre|Firestore|SQLite|Supabase/i.test(item),
    ) ?? "Documented persistence"
  );
}

function MobileProjectHero({
  doc,
  onDocumentation,
}: {
  doc: MobileProjectDocument;
  onDocumentation: () => void;
}) {
  return (
    <section className={styles.projectHero}>
      <div className={styles.projectMark}>{doc.mark}</div>
      <div className={styles.projectHeroCopy}>
        <h1>{doc.name}</h1>
        <p>{doc.tagline}</p>
        <div className={styles.heroTags}>
          <span>PUBLIC REPOSITORY</span>
          <span>FULL STACK</span>
          {doc.version && (
            <span className={styles.greenTag}>{doc.version}</span>
          )}
        </div>
        <small>{doc.updated}</small>
      </div>
      <div className={styles.heroActions}>
        <a href={doc.repositoryUrl} rel="noreferrer" target="_blank">
          <ProjectUiIcon name="github" size="sm" /> GitHub
        </a>
        {doc.liveUrl && (
          <a
            className={styles.liveAction}
            href={doc.liveUrl}
            rel="noreferrer"
            target="_blank"
          >
            <ProjectUiIcon name="external-link" size="sm" /> Live site
          </a>
        )}
        <button onClick={onDocumentation} type="button">
          <ProjectUiIcon name="documentation" size="sm" /> Documentation
        </button>
      </div>
    </section>
  );
}

function ProductCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const active = armyverseProductScreens[activeIndex];

  useEffect(() => {
    if (paused || viewerOpen) return;
    const interval = window.setInterval(() => {
      setActiveIndex(
        (current) => (current + 1) % armyverseProductScreens.length,
      );
    }, 4000);
    return () => window.clearInterval(interval);
  }, [paused, viewerOpen]);

  useEffect(() => {
    if (!viewerOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setViewerOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [viewerOpen]);

  const showPrevious = () =>
    setActiveIndex(
      (current) =>
        (current - 1 + armyverseProductScreens.length) %
        armyverseProductScreens.length,
    );
  const showNext = () =>
    setActiveIndex((current) => (current + 1) % armyverseProductScreens.length);

  return (
    <>
      <figure className={styles.productCarousel}>
        <img
          alt={active.alt}
          height={941}
          key={active.src}
          loading="eager"
          src={active.src}
          width={1672}
        />
        <figcaption>
          <button
            aria-label="Show previous ArmyVerse screen"
            onClick={showPrevious}
            type="button"
          >
            <ProjectUiIcon name="chevron-left" size="sm" />
          </button>
          <span>
            <small>
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(armyverseProductScreens.length).padStart(2, "0")}
            </small>
            <b>{active.label}</b>
          </span>
          <button
            aria-label="Show next ArmyVerse screen"
            onClick={showNext}
            type="button"
          >
            <ProjectUiIcon name="chevron-right" size="sm" />
          </button>
          <span className={styles.carouselDots}>
            {armyverseProductScreens.map((screen, index) => (
              <button
                aria-label={`Show ${screen.label}`}
                aria-pressed={index === activeIndex}
                className={
                  index === activeIndex ? styles.currentDot : undefined
                }
                key={screen.src}
                onClick={() => setActiveIndex(index)}
                type="button"
              />
            ))}
          </span>
          <button
            aria-label={
              paused
                ? "Resume automatic screenshots"
                : "Pause automatic screenshots"
            }
            aria-pressed={paused}
            onClick={() => setPaused((value) => !value)}
            type="button"
          >
            <ProjectUiIcon name={paused ? "play" : "pause"} size="sm" />
          </button>
          <button
            aria-label="Expand ArmyVerse screenshot"
            onClick={() => setViewerOpen(true)}
            type="button"
          >
            <ProjectUiIcon name="expand" size="sm" />
          </button>
        </figcaption>
      </figure>
      {viewerOpen && (
        <div
          aria-label={`${active.label} image viewer`}
          aria-modal="true"
          className={styles.mediaModal}
          onClick={(event) => {
            if (event.target === event.currentTarget) setViewerOpen(false);
          }}
          role="dialog"
        >
          <section>
            <header>
              <span>
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(armyverseProductScreens.length).padStart(2, "0")}
              </span>
              <b>{active.label}</b>
              <button
                aria-label="Close image viewer"
                onClick={() => setViewerOpen(false)}
                type="button"
              >
                <ProjectUiIcon name="close" size="sm" />
              </button>
            </header>
            <img alt={active.alt} height={941} src={active.src} width={1672} />
            <footer>
              <button
                aria-label="Show previous ArmyVerse screen"
                onClick={showPrevious}
                type="button"
              >
                <ProjectUiIcon name="chevron-left" size="sm" />
              </button>
              <span>
                {armyverseProductScreens.map((screen, index) => (
                  <button
                    aria-label={`Show ${screen.label}`}
                    aria-pressed={index === activeIndex}
                    className={
                      index === activeIndex ? styles.currentDot : undefined
                    }
                    key={screen.src}
                    onClick={() => setActiveIndex(index)}
                    type="button"
                  />
                ))}
              </span>
              <button
                aria-label="Show next ArmyVerse screen"
                onClick={showNext}
                type="button"
              >
                <ProjectUiIcon name="chevron-right" size="sm" />
              </button>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}

function ProblemSolution() {
  return (
    <div className={styles.problemSolution}>
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
          ARMYVERSE connects catalogue-led discovery, scheduled data, community
          content, and Boraverse state in one app.
        </p>
      </article>
    </div>
  );
}

function FeatureRow({
  feature,
  onInspect,
  onSelect,
  selected,
}: {
  feature: MobileFeature;
  onInspect: () => void;
  onSelect: () => void;
  selected: boolean;
}) {
  return (
    <button
      aria-expanded={selected}
      className={`${styles.featureRow} ${selected ? styles.selectedFeature : ""}`}
      onClick={onSelect}
      type="button"
    >
      <ProjectUiIcon
        name={selected ? "chevron-down" : "chevron-right"}
        size="sm"
      />
      <span>
        <b>{feature.title}</b>
        <small>{feature.summary}</small>
      </span>
      <em>{feature.category.toUpperCase()}</em>
      {selected && (
        <span
          className={styles.rowArrow}
          onClick={(event) => {
            event.stopPropagation();
            onInspect();
          }}
        >
          →
        </span>
      )}
    </button>
  );
}

function WorkflowModal({
  feature,
  onClose,
}: {
  feature: MobileFeature;
  onClose: () => void;
}) {
  return (
    <div
      aria-label={`${feature.title} workflow expanded`}
      aria-modal="true"
      className={styles.workflowModal}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="dialog"
    >
      <section>
        <header>
          <div>
            <small>WORKFLOW INSPECTION</small>
            <h2>{feature.title}</h2>
            <p>{feature.workflow.title}</p>
          </div>
          <button
            aria-label="Close expanded workflow"
            onClick={onClose}
            type="button"
          >
            <ProjectUiIcon name="close" size="sm" />
          </button>
        </header>
        <Workflow feature={feature} modal />
        <footer>
          <span>{feature.description}</span>
          <button onClick={onClose} type="button">
            Close inspection
          </button>
        </footer>
      </section>
    </div>
  );
}

function Workflow({
  feature,
  modal = false,
}: {
  feature: MobileFeature;
  modal?: boolean;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modal) viewportRef.current?.scrollTo({ left: 0, top: 0 });
  }, [feature.id, modal]);

  return (
    <div
      ref={viewportRef}
      className={`${styles.workflowViewport} ${modal ? styles.workflowModalViewport : ""}`}
    >
      <div className={styles.workflowGrid}>
        {feature.workflow.nodes.map((node, index) => (
          <div className={styles.workflowItem} key={node}>
            <div className={styles.workflowStep}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{node}</b>
            </div>
            {index < feature.workflow.nodes.length - 1 && (
              <span aria-hidden="true" className={styles.workflowConnector}>
                <ProjectUiIcon name="arrow-right" size="sm" />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureInspection({
  feature,
  onInspect,
}: {
  feature: MobileFeature;
  onInspect: () => void;
}) {
  const [workflowOpen, setWorkflowOpen] = useState(false);
  return (
    <article className={styles.featureInspection}>
      <section>
        <h3>Description</h3>
        <p>{feature.description}</p>
        <ul className={styles.capabilityList}>
          {feature.capabilities.map((capability) => (
            <li key={capability}>{capability}</li>
          ))}
        </ul>
      </section>
      <section className={styles.workflowPanel}>
        <header>
          <div>
            <h3>{feature.workflow.title}</h3>
            <p>
              Implementation path reconstructed from the project&apos;s
              documented flow and route structure.
            </p>
          </div>
          <button onClick={() => setWorkflowOpen(true)} type="button">
            <ProjectUiIcon name="expand" size="sm" /> Expand
          </button>
        </header>
        <Workflow feature={feature} />
      </section>
      <section>
        <h3>Engineering notes</h3>
        <ul className={styles.noteList}>
          {feature.engineeringNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>
      <footer>
        <button onClick={onInspect} type="button">
          <ProjectUiIcon name="inspect" size="sm" /> Inspect
        </button>
      </footer>
      {workflowOpen && (
        <WorkflowModal
          feature={feature}
          onClose={() => setWorkflowOpen(false)}
        />
      )}
    </article>
  );
}

function FeaturePreview({
  features,
  onOpenFeatures,
}: {
  features: readonly MobileFeature[];
  onOpenFeatures: () => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = features.find((feature) => feature.id === selectedId);
  return (
    <section className={styles.featurePreview}>
      <header>
        <h2>Feature catalogue</h2>
        <button onClick={onOpenFeatures} type="button">
          Open full catalogue <ProjectUiIcon name="arrow-right" size="sm" />
        </button>
      </header>
      {features.map((feature) => (
        <div key={feature.id}>
          <FeatureRow
            feature={feature}
            onInspect={onOpenFeatures}
            onSelect={() =>
              setSelectedId((current) =>
                current === feature.id ? null : feature.id,
              )
            }
            selected={selectedId === feature.id}
          />
          {selected?.id === feature.id && (
            <FeatureInspection feature={feature} onInspect={onOpenFeatures} />
          )}
        </div>
      ))}
    </section>
  );
}

function OverviewDocument({
  doc,
  slug,
  onOpenFeatures,
  onDocumentation,
}: {
  doc: MobileProjectDocument;
  slug: DocumentedProjectSlug;
  onOpenFeatures: () => void;
  onDocumentation: () => void;
}) {
  const features = mobileProjectFeatures[slug];
  return (
    <>
      <MobileProjectHero doc={doc} onDocumentation={onDocumentation} />
      {slug === "armyverse" && <ProductCarousel />}
      <section className={styles.contentPanel}>
        <h2>Overview</h2>
        {doc.overview.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {slug === "armyverse" && <ProblemSolution />}
      </section>
      <FeaturePreview
        features={features.slice(0, 4)}
        onOpenFeatures={onOpenFeatures}
      />
    </>
  );
}

function FeaturesDocument({
  features,
  onInspect,
  searchRef,
  selectedId,
  setSelectedId,
}: {
  features: readonly MobileFeature[];
  onInspect: (feature: MobileFeature) => void;
  searchRef: RefObject<HTMLInputElement | null>;
  selectedId: string;
  setSelectedId: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [openFeatureId, setOpenFeatureId] = useState<string | null>(selectedId);
  const categories = [
    "All",
    ...Array.from(new Set(features.map((feature) => feature.category))),
  ];
  const filtered = useMemo(
    () =>
      features.filter((feature) => {
        const haystack =
          `${feature.title} ${feature.summary} ${feature.description}`.toLowerCase();
        return (
          (category === "All" || feature.category === category) &&
          haystack.includes(query.trim().toLowerCase())
        );
      }),
    [category, features, query],
  );

  function selectFeature(feature: MobileFeature) {
    setSelectedId(feature.id);
    setOpenFeatureId(feature.id);
  }

  return (
    <>
      <div className={styles.featureSearch}>
        <ProjectUiIcon name="search" size="sm" />
        <input
          ref={searchRef}
          aria-label="Search features"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search features..."
          value={query}
        />
      </div>
      <div className={styles.categoryFilters}>
        {categories.map((item) => (
          <button
            className={category === item ? styles.activeFilter : undefined}
            key={item}
            onClick={() => setCategory(item)}
            type="button"
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>
      <section className={styles.catalogue}>
        <header>
          <h2>
            Feature catalogue <small>{features.length} documented areas</small>
          </h2>
          <p>
            Open any row to inspect the real workflow and implementation choices
            behind it.
          </p>
        </header>
        {filtered.length ? (
          filtered.map((feature) => (
            <div key={feature.id}>
              <FeatureRow
                feature={feature}
                onInspect={() => onInspect(feature)}
                onSelect={() => selectFeature(feature)}
                selected={openFeatureId === feature.id}
              />
              {openFeatureId === feature.id && (
                <FeatureInspection
                  feature={feature}
                  onInspect={() => onInspect(feature)}
                />
              )}
            </div>
          ))
        ) : (
          <p className={styles.empty}>
            No documented feature matches that filter.
          </p>
        )}
      </section>
    </>
  );
}

function ArchitectureGraph({
  map,
  onExpand,
}: {
  map: MobileArchitectureMap;
  onExpand: () => void;
}) {
  const usePercent = Math.max(...map.nodes.map((node) => node.x)) <= 100;
  const position = (x: number, y: number) => ({
    x: usePercent ? x * 10 : x,
    y: usePercent ? y * 5.1 : y,
  });
  const nodes = new Map(
    map.nodes.map((node) => [
      node.id,
      { ...node, ...position(node.x, node.y) },
    ]),
  );
  return (
    <section className={styles.architectureGraphPanel}>
      <header>
        <div>
          <small>{map.group.toUpperCase()} MAP</small>
          <h2>{map.title}</h2>
          <p>{map.summary}</p>
        </div>
        <button onClick={onExpand} type="button">
          <ProjectUiIcon name="expand" size="sm" /> Expand map
        </button>
      </header>
      <div className={styles.graphViewport}>
        <div className={styles.graphCanvas}>
          <svg
            aria-hidden="true"
            className={styles.graphLinks}
            preserveAspectRatio="none"
            viewBox="0 0 1000 510"
          >
            <defs>
              <marker
                id="mobile-architecture-arrow"
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
                    markerEnd="url(#mobile-architecture-arrow)"
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
          {map.nodes.map((node) => {
            const current = nodes.get(node.id);
            if (!current) return null;
            return (
              <article
                className={`${styles.graphNode} ${styles[toneClass(node.tone)]}`}
                key={node.id}
                style={{
                  left: `${current.x / 10}%`,
                  top: `${(current.y / 510) * 100}%`,
                }}
              >
                <b>{node.label}</b>
                <span>{node.detail}</span>
              </article>
            );
          })}
        </div>
      </div>
      <footer>
        <span>Source: {map.source}</span>
        <span>
          Arrows show real route, provider, and persistence boundaries.
        </span>
      </footer>
    </section>
  );
}

function ArchitectureLowerSections({ map }: { map: MobileArchitectureMap }) {
  return (
    <>
      <section className={styles.contentPanel}>
        <h2>Request path</h2>
        <p className={styles.sectionIntro}>
          How a fan starts a music, community, analytics, or product task.
        </p>
        <div className={styles.requestPath}>
          {map.support.requestPath.map(([title, detail], index) => (
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
      <section className={styles.contentPanel}>
        <h2>Application modules</h2>
        <p className={styles.sectionIntro}>
          Core modules that handle experiences, domains, state, and
          integrations.
        </p>
        <div className={styles.moduleGrid}>
          {map.support.modules.map(([title, detail, tone]) => (
            <article className={styles[toneClass(tone)]} key={title}>
              <header>
                <ProjectUiIcon name="package" size="sm" />
                <b>{title}</b>
              </header>
              <p>{detail}</p>
              <span>
                <i data-tone="green" /> Active module
              </span>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.contentPanel}>
        <h2>Engineering decisions</h2>
        <p className={styles.sectionIntro}>
          Key architectural choices and rationale.
        </p>
        <div className={styles.decisionRows}>
          {map.support.decisions.map(([title, detail]) => (
            <article key={title}>
              <ProjectUiIcon name="chevron-right" size="sm" />
              <b>{title}</b>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.contentPanel}>
        <h2>Resilience &amp; safeguards</h2>
        <p className={styles.sectionIntro}>
          Reliability, security, and operational safeguards.
        </p>
        <div className={styles.safeguardGrid}>
          {map.support.safeguards.map((item) => (
            <span key={item}>
              <ProjectUiIcon name="safeguard" size="micro" /> {item}
            </span>
          ))}
        </div>
      </section>
      <section className={styles.contentPanel}>
        <h2>Execution path</h2>
        <p className={styles.sectionIntro}>
          End-to-end flow from fan action to result.
        </p>
        <div className={styles.executionPath}>
          {map.support.operationalPath.map((item, index) => (
            <span key={item}>
              {item}
              {index < map.support.operationalPath.length - 1 && (
                <ProjectUiIcon name="arrow-right" size="micro" />
              )}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}

function ArchitectureDocument({
  doc,
  maps,
  onDocumentation,
  selectedId,
  setSelectedId,
}: {
  doc: MobileProjectDocument;
  maps: readonly MobileArchitectureMap[];
  onDocumentation: () => void;
  selectedId: string;
  setSelectedId: (id: string) => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const selected = maps.find((map) => map.id === selectedId) ?? maps[0];
  const overview =
    doc.name === "ARMYVERSE"
      ? [
          "ARMYVERSE is a modular Next.js application rather than a fictional microservice estate. Its route layer separates interactive product work, scheduled collectors, and external integrations while domain state remains in MongoDB.",
          "The selected map on the right is one documented boundary within that system. Use the inspector to switch between platform, music, data, game, and community flows.",
        ]
      : doc.overview.slice(0, 2);
  if (!selected) return null;
  return (
    <>
      <MobileProjectHero doc={doc} onDocumentation={onDocumentation} />
      <section className={styles.contentPanel}>
        <h2>Architecture overview</h2>
        {overview.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>
      <ArchitectureGraph map={selected} onExpand={() => setModalOpen(true)} />
      <ArchitectureLowerSections map={selected} />
      {modalOpen && (
        <div
          aria-label={`${selected.title} expanded`}
          aria-modal="true"
          className={styles.architectureModal}
          onClick={(event) => {
            if (event.target === event.currentTarget) setModalOpen(false);
          }}
          role="dialog"
        >
          <section>
            <header>
              <div>
                <small>{doc.name} ARCHITECTURE</small>
                <h2>{selected.title}</h2>
                <p>{selected.summary}</p>
              </div>
              <button
                aria-label="Close expanded architecture map"
                onClick={() => setModalOpen(false)}
                type="button"
              >
                <ProjectUiIcon name="close" size="sm" />
              </button>
            </header>
            <div className={styles.graphViewport}>
              <div className={styles.graphCanvas}>
                <svg
                  aria-hidden="true"
                  className={styles.graphLinks}
                  preserveAspectRatio="none"
                  viewBox="0 0 1000 510"
                >
                  <defs>
                    <marker
                      id="mobile-architecture-modal-arrow"
                      markerHeight="7"
                      markerWidth="7"
                      orient="auto"
                      refX="6"
                      refY="3.5"
                    >
                      <path d="M0,0 L7,3.5 L0,7 z" />
                    </marker>
                  </defs>
                  {selected.edges.map((edge) => {
                    const from = selected.nodes.find(
                      (node) => node.id === edge.from,
                    );
                    const to = selected.nodes.find(
                      (node) => node.id === edge.to,
                    );
                    if (!from || !to) return null;
                    const fromPosition = {
                      x: from.x <= 100 ? from.x * 10 : from.x,
                      y: from.y <= 100 ? from.y * 5.1 : from.y,
                    };
                    const toPosition = {
                      x: to.x <= 100 ? to.x * 10 : to.x,
                      y: to.y <= 100 ? to.y * 5.1 : to.y,
                    };
                    const midY = Math.round(
                      (fromPosition.y + toPosition.y) / 2,
                    );
                    return (
                      <path
                        d={`M ${fromPosition.x} ${fromPosition.y} C ${fromPosition.x} ${midY}, ${toPosition.x} ${midY}, ${toPosition.x} ${toPosition.y}`}
                        key={`${edge.from}-${edge.to}`}
                        markerEnd="url(#mobile-architecture-modal-arrow)"
                      />
                    );
                  })}
                </svg>
                {selected.nodes.map((node) => {
                  const x = node.x <= 100 ? node.x * 10 : node.x;
                  const y = node.y <= 100 ? node.y * 5.1 : node.y;
                  return (
                    <article
                      className={`${styles.graphNode} ${styles[toneClass(node.tone)]}`}
                      key={node.id}
                      style={{ left: `${x / 10}%`, top: `${(y / 510) * 100}%` }}
                    >
                      <b>{node.label}</b>
                      <span>{node.detail}</span>
                    </article>
                  );
                })}
              </div>
            </div>
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

function DocumentationDrawer({
  doc,
  projectSlug,
  file,
  onClose,
  onSelect,
}: {
  doc: MobileProjectDocument;
  projectSlug: DocumentedProjectSlug;
  file: MobileFile;
  onClose: () => void;
  onSelect: (file: MobileFile) => void;
}) {
  const project = getProjectBySlug(projectSlug);
  const files = ["README.md", "FEATURES.md", "ARCHITECTURE.md"] as const;
  const views: Array<
    [MobileFile, string, "overview" | "features" | "architecture"]
  > = [
    ["README.md", "Overview", "overview"],
    ["FEATURES.md", "Feature catalogue", "features"],
    ["ARCHITECTURE.md", "Architecture & workflows", "architecture"],
  ];
  return (
    <MobileDrawer label="DOCUMENTATION" onClose={onClose} side="left">
      <Link className={styles.drawerBack} href="/projects">
        <ProjectUiIcon name="arrow-left" size="sm" /> Repositories
      </Link>
      <div className={styles.docTree}>
        <b>
          <ProjectUiIcon name="chevron-down" size="sm" />
          <ProjectUiIcon name="folder-open" size="sm" /> {doc.name} /
        </b>
        {views.map(([viewFile, label]) => (
          <button
            aria-current={file === viewFile ? "page" : undefined}
            className={file === viewFile ? styles.treeSelected : undefined}
            key={viewFile}
            onClick={() => onSelect(viewFile)}
            type="button"
          >
            <ProjectUiIcon
              name={
                viewFile === "README.md"
                  ? "markdown"
                  : viewFile === "FEATURES.md"
                    ? "features"
                    : "architecture"
              }
              size="sm"
            />{" "}
            {label}
            <i>{file === viewFile ? "●" : ""}</i>
          </button>
        ))}
      </div>
      <div className={styles.drawerRule} />
      {files.map((viewFile) => (
        <button
          className={styles.fileTreeRow}
          key={viewFile}
          onClick={() => onSelect(viewFile)}
          type="button"
        >
          <ProjectUiIcon
            name={
              viewFile === "README.md"
                ? "markdown"
                : viewFile === "FEATURES.md"
                  ? "features"
                  : "architecture"
            }
            size="sm"
          />{" "}
          {viewFile}
        </button>
      ))}
      <div className={styles.drawerRule} />
      <section className={styles.drawerSection}>
        <h2>PROJECT INFO</h2>
        <p>
          <ProjectUiIcon name="file" size="micro" /> Repository <b>Public</b>
        </p>
        <p>
          <ProjectUiIcon name="branch" size="micro" /> Branch{" "}
          <b>{project.branch}</b>
        </p>
        <p>
          <ProjectUiIcon name="package" size="micro" /> Runtime{" "}
          <b>{docRuntime(doc, project.runtime)}</b>
        </p>
        <p>
          <ProjectUiIcon name="database" size="micro" /> Database{" "}
          <b>{docDatabase(doc)}</b>
        </p>
        <p>
          <ProjectUiIcon name="package" size="micro" /> Deployment{" "}
          <b>
            {projectSlug === "armyverse"
              ? "Vercel configured"
              : "Documented in project source"}
          </b>
        </p>
        <p>
          <ProjectUiIcon name="history" size="micro" /> Latest commit{" "}
          <b className={styles.greenText}>
            {doc.updated.replace(/^.*?: /, "")}
          </b>
        </p>
        <p>
          <ProjectUiIcon name="info" size="micro" /> Status{" "}
          <b className={styles.greenText}>{doc.version ?? project.state}</b>
        </p>
      </section>
      <div className={styles.drawerRule} />
      <section className={styles.drawerSection}>
        <h2>DOCUMENTATION STATS</h2>
        <p>
          <ProjectUiIcon name="file" size="micro" /> Files <b>{files.length}</b>
        </p>
        <p>
          <ProjectUiIcon name="list" size="micro" /> Sections{" "}
          <b>{projectSlug === "armyverse" ? 12 : "Source-defined"}</b>
        </p>
        <p>
          <ProjectUiIcon name="history" size="micro" /> Last updated{" "}
          <b>{doc.updated.replace(/^.*?: /, "")}</b>
        </p>
      </section>
    </MobileDrawer>
  );
}

function ProjectStatusInspector({
  doc,
  project,
}: {
  doc: MobileProjectDocument;
  project: ReturnType<typeof getProjectBySlug>;
}) {
  const codebase = doc.evidence
    .slice(0, 2)
    .map(([, value]) => value)
    .join(" · ");
  return (
    <>
      <section className={styles.drawerSectionPanel}>
        <h2>PROJECT STATUS</h2>
        <h3>{doc.name}</h3>
        <dl className={styles.keyValues}>
          <div>
            <dt>Repository</dt>
            <dd>{doc.repository}</dd>
          </div>
          <div>
            <dt>Project type</dt>
            <dd>{project.productName ?? project.description}</dd>
          </div>
          <div>
            <dt>Application</dt>
            <dd>{docApplication(doc)}</dd>
          </div>
          <div>
            <dt>Persistence</dt>
            <dd>{docDatabase(doc)}</dd>
          </div>
          <div>
            <dt>Codebase scale</dt>
            <dd>{codebase}</dd>
          </div>
          <div>
            <dt>Last verified</dt>
            <dd className={styles.greenText}>
              {doc.updated.replace(/^.*?: /, "")}
            </dd>
          </div>
        </dl>
      </section>
      <section className={styles.drawerSectionPanel}>
        <h2>TECH STACK</h2>
        <div className={styles.stackTags}>
          {doc.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>
      <section className={styles.drawerSectionPanel}>
        <h2>PROJECT METRICS</h2>
        <div className={styles.metricGrid}>
          {doc.evidence.map(([label, value]) => (
            <div key={label}>
              <small>{label}</small>
              <b>{value}</b>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.drawerSectionPanel}>
        <h2>PROJECT EVOLUTION</h2>
        <div className={styles.evolutionList}>
          {doc.timeline.map(([title, date, detail]) => (
            <article key={title}>
              <i />
              <b>{title}</b>
              <time>{date}</time>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function FeatureInspector({ feature }: { feature: MobileFeature }) {
  return (
    <>
      <section className={styles.drawerSectionPanel}>
        <h2>FEATURE INSPECTOR</h2>
        <h3>{feature.title}</h3>
        <dl className={styles.keyValues}>
          <div>
            <dt>Selected area</dt>
            <dd>{feature.title}</dd>
          </div>
          <div>
            <dt>Product domain</dt>
            <dd>{feature.category}</dd>
          </div>
          <div>
            <dt>Capabilities</dt>
            <dd>{feature.capabilities.length}</dd>
          </div>
          <div>
            <dt>Workflow stages</dt>
            <dd>{feature.workflow.nodes.length}</dd>
          </div>
          <div>
            <dt>Evidence</dt>
            <dd className={styles.greenText}>
              Source &amp; implementation docs
            </dd>
          </div>
        </dl>
      </section>
      <section className={styles.drawerSectionPanel}>
        <h2>FEATURE CAPABILITIES</h2>
        <ul className={styles.inspectorCapabilities}>
          {feature.capabilities.map((capability) => (
            <li key={capability}>{capability}</li>
          ))}
        </ul>
      </section>
    </>
  );
}

function ArchitectureInspector({
  maps,
  selectedId,
  onSelect,
}: {
  maps: readonly MobileArchitectureMap[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const selected = maps.find((map) => map.id === selectedId) ?? maps[0];
  if (!selected) return null;
  return (
    <>
      <section className={styles.drawerSectionPanel}>
        <h2>ARCHITECTURE &amp; WORKFLOWS</h2>
        <p>Choose a map to inspect its real system boundary and workflow.</p>
        <div className={styles.mapList}>
          {maps.map((map) => (
            <button
              aria-current={map.id === selected.id ? "true" : undefined}
              className={
                map.id === selected.id ? styles.selectedMap : undefined
              }
              key={map.id}
              onClick={() => onSelect(map.id)}
              type="button"
            >
              <span>{map.group.toUpperCase()}</span>
              <b>{map.title}</b>
              <small>{map.source}</small>
              <ProjectUiIcon name="chevron-right" size="sm" />
            </button>
          ))}
        </div>
      </section>
      <section className={styles.drawerSectionPanel}>
        <h2>SELECTED MAP</h2>
        <h3>{selected.title}</h3>
        <p>{selected.summary}</p>
        <ul className={styles.noteList}>
          {selected.engineeringNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>
    </>
  );
}

export function MobileProjectDetailWorkspace({
  slug,
}: {
  slug: DocumentedProjectSlug;
}) {
  const doc = mobileProjectDocuments[slug];
  const project = getProjectBySlug(slug);
  const features = mobileProjectFeatures[slug];
  const maps = mobileProjectArchitectureMaps[slug];
  const [file, setFile] = useState<MobileFile>("README.md");
  const [panel, setPanel] = useState<MobilePanel>(null);
  const [terminalExpanded, setTerminalExpanded] = useState(false);
  const [selectedFeatureId, setSelectedFeatureId] = useState(
    features[0]?.id ?? "",
  );
  const [selectedMapId, setSelectedMapId] = useState(maps[0]?.id ?? "");
  const searchRef = useRef<HTMLInputElement>(null);
  const documentScrollRef = useRef<HTMLElement>(null);
  const selectedFeature =
    features.find((feature) => feature.id === selectedFeatureId) ?? features[0];

  function selectFile(nextFile: MobileFile) {
    setFile(nextFile);
    setPanel(null);
    documentScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openPanel(next: MobilePanel) {
    setPanel((current) => (current === next ? null : next));
  }

  return (
    <MobileProjectsShell
      onSearch={() => searchRef.current?.focus()}
      path={`~/projects/${slug}`}
      terminal={
        <MobileTerminalDock
          command={`developer@sambit:~/Documents/${doc.name.toUpperCase()}$ ${file === "README.md" ? "cat README.md" : file === "FEATURES.md" ? "open docs/features" : "open docs/architecture"}`}
          expanded={terminalExpanded}
          onToggle={() => setTerminalExpanded((value) => !value)}
          output={<>Loaded repository-grounded project documentation.</>}
        />
      }
    >
      <MobileWorkspaceBar
        file={`${doc.name} / ${file}`}
        leftLabel="Documentation"
        leftOpen={panel === "left"}
        onLeft={() => openPanel("left")}
        onRight={() => openPanel("right")}
        rightLabel="INSPECT"
        rightOpen={panel === "right"}
      />
      <MobileDocumentTabs active={file} onSelect={selectFile} />
      <section className={styles.documentScroll} ref={documentScrollRef}>
        {file === "README.md" && (
          <OverviewDocument
            doc={doc}
            onDocumentation={() => openPanel("left")}
            onOpenFeatures={() => selectFile("FEATURES.md")}
            slug={slug}
          />
        )}
        {file === "FEATURES.md" && (
          <FeaturesDocument
            features={features}
            onInspect={(feature) => {
              setSelectedFeatureId(feature.id);
              setPanel("right");
            }}
            searchRef={searchRef}
            selectedId={selectedFeatureId}
            setSelectedId={setSelectedFeatureId}
          />
        )}
        {file === "ARCHITECTURE.md" && (
          <ArchitectureDocument
            doc={doc}
            maps={maps}
            onDocumentation={() => openPanel("left")}
            selectedId={selectedMapId}
            setSelectedId={setSelectedMapId}
          />
        )}
      </section>
      {panel === "left" && (
        <DocumentationDrawer
          doc={doc}
          file={file}
          onClose={() => setPanel(null)}
          onSelect={selectFile}
          projectSlug={slug}
        />
      )}
      {panel === "right" && (
        <MobileDrawer
          label="PROJECT INSPECTOR"
          onClose={() => setPanel(null)}
          side="right"
        >
          {file === "README.md" && (
            <ProjectStatusInspector doc={doc} project={project} />
          )}
          {file === "FEATURES.md" && selectedFeature && (
            <FeatureInspector feature={selectedFeature} />
          )}
          {file === "ARCHITECTURE.md" && (
            <ArchitectureInspector
              maps={maps}
              onSelect={setSelectedMapId}
              selectedId={selectedMapId}
            />
          )}
        </MobileDrawer>
      )}
    </MobileProjectsShell>
  );
}
