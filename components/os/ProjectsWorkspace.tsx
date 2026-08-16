"use client";

import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/data/projects";

const motionStyle = (index: number) =>
  ({ "--motion-index": index }) as React.CSSProperties;
type ProjectMotionPhase = "idle" | "out" | "in";

function RepositoryLink({
  project,
  children,
}: {
  project: Project;
  children: React.ReactNode;
}) {
  return (
    <a href={project.repository} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function ProjectList({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (project: Project) => void;
}) {
  return (
    <section className="project-list panel">
      <div className="terminal-prompt">
        <span>developer@sambit:~/projects</span>$ ls --featured
      </div>
      <div className="project-list-items">
        {projects.map((project, index) => (
          <button
            className={`project-card ${active === project.id ? "selected" : ""}`}
            onClick={() => onSelect(project)}
            key={project.id}
            style={motionStyle(index)}
          >
            <i>▱</i>
            <b>{project.name}</b>
            <em className={project.tone}>● {project.state}</em>
            <div>
              <span>{project.runtime}</span>
              <span>⌘ {project.branch}</span>
              <span>⌁ {project.commitCount} commits</span>
            </div>
            <small>{project.tag}</small>
          </button>
        ))}
      </div>
      <footer>
        {projects.length} repositories <span>Sort: featured ↕</span>
      </footer>
    </section>
  );
}

function ProjectPreview({
  project,
  phase,
}: {
  project: Project;
  phase: ProjectMotionPhase;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [project.id]);

  return (
    <section className="project-preview panel">
      <div className="terminal-prompt">
        <span>$ git show</span> {project.latestCommit.sha} --stat
      </div>
      <div
        className={`project-preview-scroll project-state ${phase === "out" ? "is-switching-out" : phase === "in" ? "is-switching-in" : ""}`}
        ref={scrollRef}
      >
        <article className="project-intro" data-project-motion="intro">
          <h1>
            {project.name} <b className={project.tone}>● {project.state}</b>
          </h1>
          {project.productName && (
            <p className="project-product-name">{project.productName}</p>
          )}
          <p>{project.description}</p>
          <div className="project-tags">
            <i>⌘ {project.branch}</i>
            <i>{project.commitCount} commits</i>
            <i>{project.latestCommit.sha}</i>
            <RepositoryLink project={project}>↗ Repository</RepositoryLink>
          </div>
        </article>

        <section className="project-facts" data-project-motion="facts">
          <div className="section-command">$ project_facts --verified</div>
          {project.facts.map((fact, index) => (
            <div key={fact.label} style={motionStyle(index)}>
              <span>{fact.label}</span>
              <b>{fact.value}</b>
            </div>
          ))}
        </section>

        <section className="project-architecture" data-project-motion="architecture">
          <div className="section-command">$ system_map --actual</div>
          <ol className="architecture-rail">
            {project.architecture.map((node, index) => (
              <li key={node.name} style={motionStyle(index)}>
                <i>{node.icon}</i>
                <span>
                  <b>{node.name}</b>
                  <small>{node.detail}</small>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="project-capabilities" data-project-motion="capabilities">
          <div className="section-command">$ capabilities --documented</div>
          <ul>
            {project.capabilities.map((capability, index) => (
              <li key={capability} style={motionStyle(index)}>
                <i>▹</i>
                <span>{capability}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}

function Inspector({
  project,
  phase,
}: {
  project: Project;
  phase: ProjectMotionPhase;
}) {
  const statuses = [
    ["Repository", project.repository.replace("https://github.com/", "")],
    ["Branch", project.branch],
    ["Commit count", String(project.commitCount)],
    ["HEAD", project.latestCommit.sha],
    ["Last commit", project.latestCommit.date],
    ["Status", project.state],
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [project.id]);

  return (
    <section className="project-inspector panel">
      <div className="panel-title">$ project_inspector</div>
      <div
        className={`project-inspector-scroll project-state ${phase === "out" ? "is-switching-out" : phase === "in" ? "is-switching-in" : ""}`}
        ref={scrollRef}
      >
        <section className="status-list">
          <div className="section-command">$ git status --short</div>
          {statuses.map(([label, value], index) => (
            <div key={label} style={motionStyle(index)}>
              <span>{label}</span>
              <b className={label === "Status" ? project.tone : ""}>{value}</b>
            </div>
          ))}
          <RepositoryLink project={project}>Open repository ↗</RepositoryLink>
        </section>

        <section className="inspector-log">
          <div className="section-command">$ git log --oneline</div>
          {project.commits.map((commit, index) => (
            <div key={commit.sha} style={motionStyle(index)}>
              <i>●</i>
              <span title={commit.subject}>{commit.subject}</span>
              <time>{commit.date}</time>
            </div>
          ))}
          <RepositoryLink project={project}>
            View commit history ↗
          </RepositoryLink>
        </section>

        <section className="inspector-stack">
          <div className="section-command">$ stack --project</div>
          {project.stack.map((tech, index) => (
            <span key={tech} style={motionStyle(index)}>
              <i className={`skill-dot d${index % 6}`} />
              {tech}
            </span>
          ))}
        </section>

        <section className="engineering-notes">
          <div className="section-command">$ engineering_notes</div>
          {project.engineeringNotes.map((note, index) => (
            <div key={note.label} style={motionStyle(index)}>
              <i>▣</i>
              <b>{note.label}</b>
              <span>{note.value}</span>
            </div>
          ))}
        </section>
      </div>
    </section>
  );
}

export function ProjectsWorkspace() {
  const [selected, setSelected] = useState<Project>(projects[0]);
  const [displayed, setDisplayed] = useState<Project>(projects[0]);
  const [phase, setPhase] = useState<ProjectMotionPhase>("idle");
  const pendingProject = useRef<Project>(projects[0]);
  const swapTimer = useRef<number | undefined>(undefined);
  const settleTimer = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      if (swapTimer.current !== undefined) window.clearTimeout(swapTimer.current);
      if (settleTimer.current !== undefined) window.clearTimeout(settleTimer.current);
    },
    [],
  );

  const selectProject = (project: Project) => {
    if (project.id === selected.id && phase === "idle") return;

    pendingProject.current = project;
    setSelected(project);
    setPhase("out");
    if (swapTimer.current !== undefined) window.clearTimeout(swapTimer.current);
    if (settleTimer.current !== undefined) window.clearTimeout(settleTimer.current);

    swapTimer.current = window.setTimeout(() => {
      setDisplayed(pendingProject.current);
      setPhase("in");
      settleTimer.current = window.setTimeout(() => setPhase("idle"), 400);
    }, 85);
  };

  const commands = [
    [`⌘ git log ${displayed.branch}`, "Inspect project history"],
    ["⌁ view system map", "Inspect actual architecture"],
    ["⌕ browse capabilities", "Read documented features"],
    ["›_ open github", "Open source repository"],
  ];

  return (
    <section className="projects-workspace" data-motion-section="projects">
      <div className="projects-grid">
        <ProjectList active={selected.id} onSelect={selectProject} />
        <ProjectPreview project={displayed} phase={phase} />
        <Inspector project={displayed} phase={phase} />
      </div>
      <div className="projects-command panel">
        <span>
          <b>developer@sambit:~/projects</b>$ <i>▌</i>
        </span>
        {commands.map(([command, description]) => (
          <button key={command}>
            <b>{command}</b>
            <small>{description}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
