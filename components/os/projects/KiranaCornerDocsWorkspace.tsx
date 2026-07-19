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
import { kiranaArchitectureMaps } from "@/data/kirana-corner/architecture";
import { kiranaFeatures } from "@/data/kirana-corner/features";
import { kiranaNavigation, kiranaProject } from "@/data/kirana-corner/project";
import type { KiranaFeature, KiranaView } from "@/data/kirana-corner/types";

function KiranaHero() {
  return (
    <section className="project-docs-hero kirana-hero">
      <div className="project-mark">KC</div>
      <div className="project-hero-copy">
        <h1>{kiranaProject.name}</h1>
        <p>{kiranaProject.tagline}</p>
        <span>PUBLIC REPOSITORY</span>
        <span>FULL STACK</span>
        <span>HYPERLOCAL COMMERCE</span>
        <small>{kiranaProject.updated}</small>
      </div>
      <div className="project-hero-actions">
        <a
          className="github-action"
          href={kiranaProject.repositoryUrl}
          rel="noreferrer"
          target="_blank"
        >
          <ProjectActionIcon type="github" /> GitHub
        </a>
        <a
          className="live-action"
          href="https://kirana-corner.vercel.app/"
          rel="noreferrer"
          target="_blank"
        >
          <ProjectActionIcon type="live" /> Live site
        </a>
      </div>
    </section>
  );
}

function KiranaOverview({ onOpenFeatures }: { onOpenFeatures: () => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return (
    <>
      <KiranaHero />
      <section className="agent-overview-hero kirana-overview-hero">
        <figure className="agent-cockpit-preview kirana-preview">
          <header>
            <b>◈ KIRANA CORNER</b>
            <span>
              Nearby shops, live catalogues, and direct local fulfilment
            </span>
            <i>●</i>
          </header>
          <aside>
            <b>⌁ Discover nearby</b>
            <span>◉ Shop map</span>
            <span>▧ Local catalogues</span>
            <span>◫ Cart & orders</span>
            <span>✦ Recipe assistant</span>
          </aside>
          <main>
            <section>
              <small>LOCAL COMMERCE</small>
              <h3>Buy from the shops around you.</h3>
              <p>
                Map discovery, merchant-controlled stock, customer addresses,
                direct shop fulfilment, and ingredient-aware suggestions share
                one hyperlocal flow.
              </p>
              <span>Open nearby shops →</span>
            </section>
            <div>
              <article>
                <small>DISCOVERY</small>
                <b>Map + radius filtering</b>
                <span>Haversine local context</span>
              </article>
              <article>
                <small>MERCHANT CONTROL</small>
                <b>Stock stays shop-owned</b>
                <span>live Firestore catalogue</span>
              </article>
              <article>
                <small>RECIPE TO CART</small>
                <b>Match what is nearby</b>
                <span>Gemini + catalogue evidence</span>
              </article>
            </div>
          </main>
        </figure>
        <aside className="agent-overview-copy kirana-overview-copy">
          <div>
            <h2>Overview</h2>
            {kiranaProject.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="agent-overview-problem-solution kirana-problem-solution">
            <article>
              <b>Problem</b>
              <p>
                Instant-delivery marketplaces centralize fulfilment while local
                stores lose their direct customer relationship and digital
                visibility.
              </p>
            </article>
            <article>
              <b>Approach</b>
              <p>
                Kirana Corner puts a nearby shop’s catalogue, inventory, order
                flow, and delivery context directly in front of the customer.
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
            features={kiranaFeatures.slice(0, 6)}
            onSelect={setSelectedId}
            selectedId={selectedId}
          />
        </article>
      </section>
    </>
  );
}

function KiranaInspector({
  architectureId,
  feature,
  onArchitectureSelect,
  view,
}: {
  architectureId: string;
  feature: KiranaFeature;
  onArchitectureSelect: (id: string) => void;
  view: KiranaView;
}) {
  if (view === "architecture")
    return (
      <aside className="project-docs-inspector kirana-inspector architecture-inspector">
        <ArchitectureInspectorPanels
          maps={kiranaArchitectureMaps}
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
          ["Evidence", "Routes · services · Firestore records"],
        ]
      : [
          ["Repository", kiranaProject.repository],
          ["Application", "Vite + React"],
          ["Persistence", "Firebase Firestore"],
          ["Roles", "Customer + Shop Owner"],
          ["Map layer", "React Leaflet + Haversine"],
          ["Latest activity", "Jul 2026"],
        ];
  return (
    <aside className="project-docs-inspector kirana-inspector">
      <section>
        <header>
          {view === "features" ? "FEATURE INSPECTOR" : "PROJECT STATUS"}
        </header>
        <h2>{view === "features" ? feature.title : "KIRANA CORNER"}</h2>
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
            : kiranaProject.stack
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
              {kiranaProject.evidence.map(([label, value]) => (
                <p key={label}>
                  <small>{label}</small>
                  <b>{value}</b>
                </p>
              ))}
            </div>
          </section>
          <section className="armyverse-project-evolution">
            <header>PROJECT EVOLUTION</header>
            {kiranaProject.timeline.map(([title, date, detail]) => (
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

export function KiranaCornerDocsWorkspace({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<KiranaView>("overview");
  const [selectedFeature, setSelectedFeature] = useState(kiranaFeatures[0]);
  const [selectedArchitectureId, setSelectedArchitectureId] = useState(
    kiranaArchitectureMaps[0].id,
  );
  const selectedFile =
    view === "features"
      ? "FEATURES.md"
      : view === "architecture"
        ? "ARCHITECTURE.md"
        : "README.md";
  return (
    <section className="project-docs-workspace kirana-workspace">
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
          href={kiranaProject.repositoryUrl}
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
          <b>⌄　KIRANA-CORNER /</b>
          {kiranaNavigation.map(({ id, icon, label }) => (
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
            ["Runtime", "Vite + React"],
            ["Database", "Firestore"],
            ["Map", "React Leaflet"],
            ["Latest activity", "Jul 2026"],
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
          <span>▧　KIRANA-CORNER / {selectedFile}</span>
          <button className="project-tabs-back" onClick={onBack} type="button">
            ← Back to project list
          </button>
          <button aria-label="More documentation actions" type="button">
            ···
          </button>
        </div>
        <div className="project-docs-scroll">
          {view === "overview" && (
            <KiranaOverview onOpenFeatures={() => setView("features")} />
          )}
          {view === "features" && (
            <>
              <KiranaHero />
              <GenericFeaturesView
                features={kiranaFeatures as InspectableFeature[]}
                onSelectedChange={(feature) =>
                  setSelectedFeature(feature as KiranaFeature)
                }
              />
            </>
          )}
          {view === "architecture" && (
            <>
              <KiranaHero />
              <ArchitectureView
                maps={kiranaArchitectureMaps}
                onSelect={setSelectedArchitectureId}
                overviewCopy={[
                  "Kirana Corner is a client-driven React marketplace using Firebase Auth and Firestore for identity and commerce data, React Leaflet for nearby discovery, and a Vercel-only Gemini endpoint for recipe-to-cart suggestions.",
                  "Choose a map to inspect a real customer, merchant, discovery, or intelligent-shopping workflow and the exact service boundary that keeps it grounded in local stock.",
                ]}
                projectLabel="KIRANA CORNER"
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
            <b>developer@sambit:~/Documents/KIRANA-CORNER</b>${" "}
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
            <b>developer@sambit:~/Documents/KIRANA-CORNER</b>$ <i>▌</i>
          </p>
        </section>
      </main>
      <KiranaInspector
        architectureId={selectedArchitectureId}
        feature={selectedFeature}
        onArchitectureSelect={setSelectedArchitectureId}
        view={view}
      />
    </section>
  );
}
