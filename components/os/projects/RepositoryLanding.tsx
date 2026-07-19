"use client";

import { useMemo, useState } from "react";
import { projects, type Project } from "@/data/projects";

type RepositoryLandingProps = {
  onOpenProject: (
    project:
      | "armyverse"
      | "agent-playground"
      | "docbuilder"
      | "kirana-corner"
      | "insightquill",
  ) => void;
};

const projectIcon: Record<Project["tone"], string> = {
  green: "▧",
  yellow: "◇",
  blue: "◈",
};

function repositorySlug(project: Project) {
  return project.repository.replace("https://github.com/", "");
}

function commitTone(subject: string) {
  if (subject.startsWith("feat")) return "feature";
  if (subject.startsWith("fix")) return "fix";
  if (subject.startsWith("refactor")) return "refactor";
  return "maintenance";
}

const listDescriptions: Record<string, string> = {
  armyverse:
    "BTS platform for playlists, community, and Boraverse progression.",
  "agent-playground":
    "Persistent multi-agent workspace for identity, memory, and collaboration.",
  "gym-tracker":
    "Offline-first strength training with fast logging and local sync.",
  "kirana-corner":
    "Hyperlocal marketplace connecting neighborhood stores and buyers.",
  insightquill:
    "Education operations for assessments, workflows, and reporting.",
  docbuilder: "AI document and presentation builder with RAG-assisted outputs.",
};

const projectPriority = [
  "armyverse",
  "agent-playground",
  "docbuilder",
  "kirana-corner",
  "insightquill",
];

function comparePinnedProjects(left: Project, right: Project) {
  const leftPriority = projectPriority.indexOf(left.id);
  const rightPriority = projectPriority.indexOf(right.id);
  if (leftPriority !== -1 || rightPriority !== -1) {
    return (
      (leftPriority === -1 ? Number.MAX_SAFE_INTEGER : leftPriority) -
      (rightPriority === -1 ? Number.MAX_SAFE_INTEGER : rightPriority)
    );
  }
  return 0;
}

const explorerProjects = [...projects].sort(
  (left, right) =>
    comparePinnedProjects(left, right) ||
    right.latestCommit.date.localeCompare(left.latestCommit.date),
);

function Explorer({
  onSelect,
  selected,
}: {
  onSelect: (project: Project) => void;
  selected: Project;
}) {
  const activeProjects = projects.filter(
    ({ state }) => state === "Active" || state === "Deployed",
  ).length;
  const releaseCandidates = projects.filter(
    ({ state }) => state === "Release candidate",
  ).length;

  return (
    <aside className="repository-explorer">
      <header>
        EXPLORER <span>＋　···</span>
      </header>
      <div className="repository-tree">
        <b>⌄　PORTFOLIO/</b>
        <b>⌄　repositories/</b>
        {explorerProjects.map((project) => (
          <button
            aria-current={selected.id === project.id ? "true" : undefined}
            className={selected.id === project.id ? "active" : ""}
            key={project.id}
            onClick={() => onSelect(project)}
            type="button"
          >
            <i>{projectIcon[project.tone]}</i>
            {project.id}/
            <em className={project.tone === "yellow" ? "beta" : ""}>●</em>
          </button>
        ))}
        <b>›　archive/</b>
        <b>▤　README.md</b>
      </div>
      <section>
        <h3>WORKSPACE STATS</h3>
        <p>
          <i>◉</i>Repositories <b>{projects.length}</b>
        </p>
        <p>
          <i>◉</i>Active <b>{activeProjects}</b>
        </p>
        <p>
          <i>◇</i>Release candidates <b>{releaseCandidates}</b>
        </p>
        <p>
          <i>◇</i>Tracked branches{" "}
          <b>{new Set(projects.map((project) => project.branch)).size}</b>
        </p>
      </section>
      <section>
        <h3>REPOSITORY STATUS</h3>
        <p>
          <i>⌘</i>Branch <b>{selected.branch}</b>
        </p>
        <p>
          <i>↻</i>Selected <b>{selected.name}</b>
        </p>
        <p>
          <i>✓</i>Last update <b>{selected.latestCommit.date}</b>
        </p>
        <p>
          <i>●</i>Documentation{" "}
          <b>
            {[
              "armyverse",
              "agent-playground",
              "docbuilder",
              "kirana-corner",
              "insightquill",
            ].includes(selected.id)
              ? "Available"
              : "Planned"}
          </b>
        </p>
      </section>
    </aside>
  );
}

function RepositoryTable({
  onSelect,
  projectsToShow,
  selected,
}: {
  onSelect: (project: Project) => void;
  projectsToShow: Project[];
  selected: Project;
}) {
  return (
    <div
      className="repository-table"
      role="region"
      aria-label="Portfolio repositories"
    >
      <header>
        <span>REPOSITORY</span>
        <span>DESCRIPTION</span>
        <span>STACK</span>
        <span>STATE</span>
        <span>UPDATED</span>
        <span>FOCUS</span>
        <span>HEALTH</span>
        <span>COMMITS</span>
      </header>
      {projectsToShow.map((project) => (
        <button
          aria-pressed={selected.id === project.id}
          className={selected.id === project.id ? "selected" : ""}
          key={project.id}
          onClick={() => onSelect(project)}
          type="button"
        >
          <div>
            <i>{projectIcon[project.tone]}</i>
            <b>{project.name}</b>
            <small>{repositorySlug(project)}</small>
          </div>
          <p>{listDescriptions[project.id] ?? project.description}</p>
          <div className="repository-stack">
            {project.stack.slice(0, 4).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div>
            <em className={project.tone === "yellow" ? "beta" : ""}>
              {project.state}
            </em>
            <small>{project.runtime}</small>
          </div>
          <time dateTime={project.latestCommit.date}>
            {project.latestCommit.date}
          </time>
          <span>{project.tag}</span>
          <i
            aria-label={
              project.tone === "yellow" ? "Attention needed" : "Healthy"
            }
            className={`health ${project.tone === "yellow" ? "beta" : ""}`}
          >
            ●
          </i>
          <strong>{project.commitCount}</strong>
        </button>
      ))}
      {!projectsToShow.length && (
        <p className="repository-empty">No repositories match that search.</p>
      )}
    </div>
  );
}

function Inspector({
  onOpenProject,
  project,
}: {
  onOpenProject: (
    project:
      | "armyverse"
      | "agent-playground"
      | "docbuilder"
      | "kirana-corner"
      | "insightquill",
  ) => void;
  project: Project;
}) {
  const docsAvailable =
    project.id === "armyverse" ||
    project.id === "agent-playground" ||
    project.id === "docbuilder" ||
    project.id === "kirana-corner" ||
    project.id === "insightquill";
  const openDocumentation = () => {
    if (
      project.id === "armyverse" ||
      project.id === "agent-playground" ||
      project.id === "docbuilder" ||
      project.id === "kirana-corner" ||
      project.id === "insightquill"
    )
      onOpenProject(project.id);
  };

  return (
    <aside className="repository-inspector">
      <section>
        <header>
          REPOSITORY INSPECTOR <span>⌘</span>
        </header>
        <div className="repository-inspector-title">
          <i>{projectIcon[project.tone]}</i>
          <h2>
            {project.name}
            <small>{project.description}</small>
          </h2>
          <em className={project.tone === "yellow" ? "beta" : ""}>
            {project.state.toUpperCase()}
          </em>
        </div>
        <p className="key-value">
          Repository<b>{repositorySlug(project)}</b>
        </p>
        <p className="key-value">
          Runtime<b>{project.runtime}</b>
        </p>
        <p className="key-value">
          Branch<b>{project.branch}</b>
        </p>
        <p className="key-value">
          Last commit<b>{project.latestCommit.sha}</b>
        </p>
        <p className="key-value">
          Last updated<b>{project.latestCommit.date}</b>
        </p>
        <p className="key-value">
          Portfolio focus<b>{project.tag}</b>
        </p>
      </section>
      <section>
        <header>TECH STACK</header>
        <div className="project-stack-tags">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>
      <section className="repository-metrics">
        <header>REPOSITORY METRICS</header>
        {project.facts.slice(0, 4).map((fact) => (
          <span key={fact.label}>
            <small>{fact.label}</small>
            <b>{fact.value}</b>
          </span>
        ))}
      </section>
      <section className="repository-recent">
        <header>RECENT ACTIVITY</header>
        {project.commits.slice(0, 5).map((commit) => (
          <p key={commit.sha}>
            <i className={commitTone(commit.subject)}>◇</i>
            <span>
              <b>{commit.sha}</b>　{commit.subject}
            </span>
            <time dateTime={commit.date}>{commit.date}</time>
          </p>
        ))}
      </section>
      <section className="repository-actions">
        <header>QUICK ACTIONS</header>
        <button
          className="repository-action-source"
          onClick={() =>
            window.open(project.repository, "_blank", "noopener,noreferrer")
          }
          type="button"
        >
          ↗ Open repository
        </button>
        <button
          className="repository-action-docs"
          disabled={!docsAvailable}
          onClick={openDocumentation}
          type="button"
        >
          ▧ {docsAvailable ? "Open documentation" : "Documentation planned"}
        </button>
        <button
          className="repository-action-architecture"
          disabled={!docsAvailable}
          onClick={openDocumentation}
          type="button"
        >
          ◇ {docsAvailable ? "View architecture" : "Not available yet"}
        </button>
      </section>
    </aside>
  );
}

export function RepositoryLanding({ onOpenProject }: RepositoryLandingProps) {
  const [selected, setSelected] = useState(
    () => projects.find((project) => project.id === "armyverse") ?? projects[0],
  );
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState<"all" | "active">("all");
  const [sort, setSort] = useState<"recent" | "name">("recent");
  const [showGuide, setShowGuide] = useState(true);

  const visibleProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return projects
      .filter((project) => {
        const matchesScope =
          scope === "all" ||
          project.state === "Active" ||
          project.state === "Deployed";
        const searchText = [
          project.name,
          project.description,
          project.tag,
          project.runtime,
          ...project.stack,
        ]
          .join(" ")
          .toLowerCase();
        return (
          matchesScope &&
          (!normalizedQuery || searchText.includes(normalizedQuery))
        );
      })
      .sort((left, right) => {
        const priority = comparePinnedProjects(left, right);
        if (priority !== 0) return priority;
        return sort === "name"
          ? left.name.localeCompare(right.name)
          : right.latestCommit.date.localeCompare(left.latestCommit.date);
      });
  }, [query, scope, sort]);

  const selectProject = (project: Project) => {
    setSelected(project);
    if (
      project.id === "armyverse" ||
      project.id === "agent-playground" ||
      project.id === "docbuilder" ||
      project.id === "kirana-corner" ||
      project.id === "insightquill"
    )
      onOpenProject(project.id);
  };

  return (
    <section className="project-docs-workspace repository-workspace">
      <nav aria-label="Workspace tools" className="project-activity">
        <button
          aria-label="Repository explorer"
          className="active"
          type="button"
        >
          ▧
        </button>
        <button
          aria-label="Search repositories"
          onClick={() => document.getElementById("repository-search")?.focus()}
          type="button"
        >
          ⌕
        </button>
        <button
          aria-label="Selected project documentation"
          disabled={
            selected.id !== "armyverse" &&
            selected.id !== "agent-playground" &&
            selected.id !== "docbuilder" &&
            selected.id !== "kirana-corner" &&
            selected.id !== "insightquill"
          }
          onClick={() =>
            (selected.id === "armyverse" ||
              selected.id === "agent-playground" ||
              selected.id === "docbuilder" ||
              selected.id === "kirana-corner" ||
              selected.id === "insightquill") &&
            onOpenProject(selected.id)
          }
          type="button"
        >
          ◇
        </button>
        <span />
        <a
          aria-label="Open selected repository"
          href={selected.repository}
          rel="noreferrer"
          target="_blank"
        >
          ↗
        </a>
      </nav>
      <Explorer onSelect={selectProject} selected={selected} />
      <main className="repository-main">
        <section className="repository-command">
          <p>
            <b>developer@sambit:~/repositories</b>$ ls -la --portfolio
            <br />
            Showing portfolio repositories.
            <br />
            Sort: Recently Updated
            <br />
            View: Repository List
            <br />
            Total Repositories: {projects.length}
          </p>
        </section>
        <div className="repository-toolbar">
          <input
            id="repository-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="⌕  Search repositories..."
            value={query}
          />
          <button
            className={scope === "all" ? "selected" : ""}
            onClick={() => setScope("all")}
            type="button"
          >
            All
          </button>
          <button
            className={scope === "active" ? "selected" : ""}
            onClick={() => setScope("active")}
            type="button"
          >
            Active
          </button>
          <select
            aria-label="Sort repositories"
            onChange={(event) =>
              setSort(event.target.value as "recent" | "name")
            }
            value={sort}
          >
            <option value="recent">Sort: Recently Updated</option>
            <option value="name">Sort: Name</option>
          </select>
          <button
            aria-label="Repository list view"
            className="selected"
            type="button"
          >
            ☷
          </button>
        </div>
        {showGuide && (
          <aside
            aria-label="Repository navigation guide"
            className="repository-guide"
          >
            <b>↳ Explore projects</b>
            <span>
              Repository rows are interactive. Select one to inspect its scope,
              stack, and recent engineering work.
            </span>
            <button
              aria-label="Dismiss repository navigation guide"
              onClick={() => setShowGuide(false)}
              type="button"
            >
              ×
            </button>
          </aside>
        )}
        <RepositoryTable
          onSelect={selectProject}
          projectsToShow={visibleProjects}
          selected={selected}
        />
        <section className="repository-terminal">
          <header>
            <b>TERMINAL</b>
            <span>OUTPUT</span>
            <span>PROBLEMS</span>
            <span>DEBUG CONSOLE</span>
            <em>◉ zsh　＋　▣　⌫　⌃</em>
          </header>
          <p>
            <b>developer@sambit:~/repositories</b>$ <i>tree --depth=1</i>
            <br />
            {projects.map((project) => `├── ${project.id}`).join("\n")}
            <br />
            <b>developer@sambit:~/repositories</b>$ <i>▌</i>
          </p>
        </section>
      </main>
      <Inspector onOpenProject={onOpenProject} project={selected} />
    </section>
  );
}
