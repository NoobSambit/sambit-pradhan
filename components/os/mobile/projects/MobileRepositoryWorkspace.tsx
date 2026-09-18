"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  MobileDrawer,
  MobileProjectsShell,
  MobileTerminalDock,
  MobileWorkspaceBar,
  type MobilePanel,
} from "./MobileProjectsChrome";
import styles from "./MobileProjects.module.css";
import { ProjectUiIcon } from "@/components/os/projects/ProjectUiIcon";
import {
  projectListDescriptions,
  projectPriority,
  projects,
  type Project,
} from "@/data/projects";
import {
  getProjectCanonicalPath,
  isDocumentedProjectSlug,
} from "@/lib/projects";

function repositorySlug(project: Project) {
  return project.repository.replace("https://github.com/", "");
}

function toneLabel(tone: Project["tone"]) {
  return tone === "yellow" ? "amber" : tone;
}

function sortProjects(items: Project[], sort: "recent" | "name") {
  return [...items].sort((left, right) => {
    const leftIndex = (projectPriority as readonly string[]).indexOf(left.id);
    const rightIndex = (projectPriority as readonly string[]).indexOf(right.id);
    if (leftIndex !== -1 || rightIndex !== -1) {
      return (
        (leftIndex === -1 ? Number.MAX_SAFE_INTEGER : leftIndex) -
        (rightIndex === -1 ? Number.MAX_SAFE_INTEGER : rightIndex)
      );
    }
    return sort === "name"
      ? left.name.localeCompare(right.name)
      : right.latestCommit.date.localeCompare(left.latestCommit.date);
  });
}

function MobileRepositoryCard({
  project,
  selected,
  onSelect,
}: {
  project: Project;
  selected: boolean;
  onSelect: (project: Project) => void;
}) {
  return (
    <article
      className={`${styles.repositoryCard} ${selected ? styles.selectedCard : ""}`}
    >
      <Link
        aria-label={`Open ${project.name} documentation`}
        className={styles.repositoryCardLink}
        href={getProjectCanonicalPath(project.id)}
      >
        <header className={styles.repositoryCardHeader}>
          <span className={styles.repositoryMark}>
            <ProjectUiIcon name="repository" size="sm" />
          </span>
          <span className={styles.repositoryIdentity}>
            <b>{project.name}</b>
            <small>{repositorySlug(project)}</small>
          </span>
          <em data-tone={toneLabel(project.tone)}>{project.state}</em>
        </header>
        <p className={styles.repositoryDescription}>
          {projectListDescriptions[project.id] ?? project.description}
        </p>
        <div className={styles.stackTags}>
          {project.stack.slice(0, 4).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <p className={styles.repositoryFocus}>{project.tag}</p>
        <footer className={styles.repositoryMeta}>
          <span>
            <ProjectUiIcon name="branch" size="micro" /> {project.branch}
          </span>
          <span>
            <ProjectUiIcon name="history" size="micro" />{" "}
            {project.latestCommit.date}
          </span>
          <span>
            <i data-tone={toneLabel(project.tone)} />{" "}
            {project.tone === "yellow" ? "Attention" : "Healthy"}
          </span>
          <span>
            <ProjectUiIcon name="commit" size="micro" /> {project.commitCount}
          </span>
        </footer>
      </Link>
      <button
        aria-label={`Inspect ${project.name}`}
        aria-pressed={selected}
        className={styles.cardInspect}
        onClick={() => onSelect(project)}
        type="button"
      >
        INSPECT <ProjectUiIcon name="arrow-right" size="micro" />
      </button>
    </article>
  );
}

function RepositoryExplorer({
  selected,
}: {
  selected: Project;
}) {
  const active = projects.filter(
    (project) => project.state === "Active" || project.state === "Deployed",
  ).length;
  const releaseCandidates = projects.filter(
    (project) => project.state === "Release candidate",
  ).length;
  const branches = new Set(projects.map((project) => project.branch)).size;

  return (
    <>
      <div className={styles.treeRoot}>
        <ProjectUiIcon name="chevron-down" size="sm" />
        <ProjectUiIcon name="folder-open" size="sm" />
        <b>PORTFOLIO/</b>
      </div>
      <div className={styles.treeRoot}>
        <ProjectUiIcon name="chevron-down" size="sm" />
        <ProjectUiIcon name="repository" size="sm" />
        <b>repositories/</b>
      </div>
      <div className={styles.treeList}>
        {sortProjects(projects, "recent").map((project) => (
          <Link
            aria-current={selected.id === project.id ? "true" : undefined}
            className={
              selected.id === project.id ? styles.treeSelected : undefined
            }
            href={getProjectCanonicalPath(project.id)}
            key={project.id}
          >
            <ProjectUiIcon name="chevron-right" size="sm" />
            <ProjectUiIcon name="folder" size="sm" />
            <span>{project.id}/</span>
            <i data-tone={toneLabel(project.tone)} />
          </Link>
        ))}
      </div>
      <div className={styles.treeRoot}>
        <ProjectUiIcon name="chevron-right" size="sm" />
        <ProjectUiIcon name="archive" size="sm" />
        <b>archive/</b>
      </div>
      <div className={styles.treeRoot}>
        <ProjectUiIcon name="markdown" size="sm" />
        <b>README.md</b>
      </div>
      <div className={styles.drawerRule} />
      <section className={styles.drawerSection}>
        <h2>WORKSPACE STATS</h2>
        <p>
          <ProjectUiIcon name="database" size="micro" /> Repositories{" "}
          <b>{projects.length}</b>
        </p>
        <p>
          <ProjectUiIcon name="pulse" size="micro" /> Active <b>{active}</b>
        </p>
        <p>
          <ProjectUiIcon name="package" size="micro" /> Release candidates{" "}
          <b>{releaseCandidates}</b>
        </p>
        <p>
          <ProjectUiIcon name="branch" size="micro" /> Tracked branches{" "}
          <b>{branches}</b>
        </p>
      </section>
      <div className={styles.drawerRule} />
      <section className={styles.drawerSection}>
        <h2>REPOSITORY STATUS</h2>
        <p>
          <ProjectUiIcon name="branch" size="micro" /> Branch{" "}
          <b>{selected.branch}</b>
        </p>
        <p>
          <ProjectUiIcon name="repository" size="micro" /> Selected{" "}
          <b>{selected.name}</b>
        </p>
        <p>
          <ProjectUiIcon name="history" size="micro" /> Last update{" "}
          <b>{selected.latestCommit.date}</b>
        </p>
        <p>
          <ProjectUiIcon name="documentation" size="micro" /> Documentation{" "}
          <b className={styles.greenText}>
            {isDocumentedProjectSlug(selected.id) ? "Available" : "Planned"}
          </b>
        </p>
      </section>
    </>
  );
}

function RepositoryInspector({ project }: { project: Project }) {
  const docsAvailable = isDocumentedProjectSlug(project.id);
  const docsHref = docsAvailable
    ? getProjectCanonicalPath(project.id)
    : "/projects";
  return (
    <>
      <section className={styles.inspectorIntro}>
        <div className={styles.inspectorIdentity}>
          <span className={styles.repositoryMark}>
            <ProjectUiIcon name="repository" size="sm" />
          </span>
          <h2>
            {project.name}
            <small>{project.description}</small>
          </h2>
          <em data-tone={toneLabel(project.tone)}>
            {project.state.toUpperCase()}
          </em>
        </div>
        <dl className={styles.keyValues}>
          <div>
            <dt>Repository</dt>
            <dd className={styles.greenText}>{repositorySlug(project)}</dd>
          </div>
          <div>
            <dt>Runtime</dt>
            <dd>{project.runtime}</dd>
          </div>
          <div>
            <dt>Branch</dt>
            <dd>{project.branch}</dd>
          </div>
          <div>
            <dt>Last commit</dt>
            <dd>{project.latestCommit.sha}</dd>
          </div>
          <div>
            <dt>Last updated</dt>
            <dd className={styles.greenText}>{project.latestCommit.date}</dd>
          </div>
          <div>
            <dt>Portfolio focus</dt>
            <dd className={styles.greenText}>{project.tag}</dd>
          </div>
        </dl>
      </section>
      <section className={styles.drawerSectionPanel}>
        <h2>TECH STACK</h2>
        <div className={styles.stackTags}>
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>
      <section className={styles.drawerSectionPanel}>
        <h2>REPOSITORY METRICS</h2>
        <div className={styles.metricGrid}>
          {project.facts.slice(0, 4).map((fact) => (
            <div key={fact.label}>
              <small>{fact.label}</small>
              <b>{fact.value}</b>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.drawerSectionPanel}>
        <h2>RECENT ACTIVITY</h2>
        <ul className={styles.commitList}>
          {project.commits.slice(0, 5).map((commit) => (
            <li key={commit.sha}>
              <ProjectUiIcon name="commit" size="micro" />
              <span>
                <b>{commit.sha}</b> {commit.subject}
              </span>
              <time dateTime={commit.date}>{commit.date}</time>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.quickActions}>
        <h2>QUICK ACTIONS</h2>
        <a href={project.repository} rel="noreferrer" target="_blank">
          <ProjectUiIcon name="github" size="sm" /> Open repository
        </a>
        <Link href={docsHref}>
          <ProjectUiIcon name="documentation" size="sm" />{" "}
          {docsAvailable ? "Open documentation" : "Documentation planned"}
        </Link>
        <Link href={docsHref}>
          <ProjectUiIcon name="architecture" size="sm" />{" "}
          {docsAvailable ? "View architecture" : "Not available yet"}
        </Link>
      </section>
    </>
  );
}

export function MobileRepositoryWorkspace() {
  const [selected, setSelected] = useState(
    () => projects.find((project) => project.id === "armyverse") ?? projects[0],
  );
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState<"all" | "active">("all");
  const [sort, setSort] = useState<"recent" | "name">("recent");
  const [panel, setPanel] = useState<MobilePanel>(null);
  const [terminalExpanded, setTerminalExpanded] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const searchRef = useRef<HTMLInputElement>(null);

  const visibleProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return sortProjects(
      projects.filter((project) => {
        const active =
          project.state === "Active" || project.state === "Deployed";
        const haystack = [
          project.name,
          project.description,
          project.tag,
          project.runtime,
          ...project.stack,
        ]
          .join(" ")
          .toLowerCase();
        return (
          (scope === "all" || active) &&
          (!normalized || haystack.includes(normalized))
        );
      }),
      sort,
    );
  }, [query, scope, sort]);

  function openPanel(next: MobilePanel) {
    setPanel((current) => (current === next ? null : next));
  }

  return (
    <MobileProjectsShell
      onSearch={() => searchRef.current?.focus()}
      path="~/projects"
      terminal={
        <MobileTerminalDock
          command="developer@sambit:~/repositories$ tree --depth=1"
          expanded={terminalExpanded}
          onToggle={() => setTerminalExpanded((value) => !value)}
          output={
            <>
              {projectPriority.map((id, index) => (
                <span key={id}>
                  ├── {id}/<br />
                </span>
              ))}
              <span>└── archive/</span>
              <br />
              <br />7 directories, 0 files
            </>
          }
        />
      }
    >
      <MobileWorkspaceBar
        file="repositories/"
        leftLabel="Repository Explorer"
        leftOpen={panel === "left"}
        onLeft={() => openPanel("left")}
        onRight={() => openPanel("right")}
        rightOpen={panel === "right"}
      />
      <section className={styles.repositoryCommand}>
        <ProjectUiIcon name="terminal" size="sm" />
        <p>
          <b>developer@sambit:~/repositories$</b> ls -la --portfolio
          <br />
          Showing portfolio repositories.
          <br />
          {projects.length} repositories · recently updated · view: list
        </p>
      </section>
      <div className={styles.repositorySearch}>
        <ProjectUiIcon name="search" size="sm" />
        <input
          ref={searchRef}
          aria-label="Search repositories"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search repositories..."
          value={query}
        />
      </div>
      <div className={styles.repositoryFilters}>
        <button
          className={scope === "all" ? styles.activeFilter : undefined}
          onClick={() => setScope("all")}
          type="button"
        >
          ALL
        </button>
        <button
          className={scope === "active" ? styles.activeFilter : undefined}
          onClick={() => setScope("active")}
          type="button"
        >
          Active
        </button>
        <label>
          <select
            aria-label="Sort repositories"
            onChange={(event) =>
              setSort(event.target.value as "recent" | "name")
            }
            value={sort}
          >
            <option value="recent">Recently Updated</option>
            <option value="name">Name</option>
          </select>
          <ProjectUiIcon name="chevron-down" size="sm" />
        </label>
        <button
          aria-label="Repository list view"
          className={styles.activeFilter}
          type="button"
        >
          <ProjectUiIcon name="list" size="sm" />
        </button>
      </div>
      {showGuide && (
        <aside className={styles.guide}>
          <ProjectUiIcon name="info" size="sm" />
          <b>Open projects</b>
          <span>Tap anywhere on a repository to open it.</span>
          <button
            aria-label="Dismiss guide"
            onClick={() => setShowGuide(false)}
            type="button"
          >
            <ProjectUiIcon name="close" size="sm" />
          </button>
        </aside>
      )}
      <section
        aria-label="Portfolio repositories"
        className={styles.repositoryList}
      >
        {visibleProjects.map((project) => (
          <MobileRepositoryCard
            key={project.id}
            onSelect={(project) => {
              setSelected(project);
              setPanel("right");
            }}
            project={project}
            selected={selected.id === project.id}
          />
        ))}
        {!visibleProjects.length && (
          <p className={styles.empty}>No repositories match that search.</p>
        )}
      </section>
      {panel === "left" && (
        <MobileDrawer
          label="EXPLORER"
          onClose={() => setPanel(null)}
          side="left"
        >
          <RepositoryExplorer selected={selected} />
        </MobileDrawer>
      )}
      {panel === "right" && (
        <MobileDrawer
          label="REPOSITORY INSPECTOR"
          onClose={() => setPanel(null)}
          side="right"
        >
          <RepositoryInspector project={selected} />
        </MobileDrawer>
      )}
    </MobileProjectsShell>
  );
}
