"use client";

import { useState } from "react";
import { projects, type Project } from "@/data/projects";

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
        {projects.map((project) => (
          <button
            className={`project-card ${active === project.id ? "selected" : ""}`}
            onClick={() => onSelect(project)}
            key={project.id}
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

function ProjectPreview({ project }: { project: Project }) {
  return (
    <section className="project-preview panel">
      <div className="terminal-prompt">
        <span>$ git show</span> {project.latestCommit.sha} --stat
      </div>
      <div className="project-preview-scroll">
        <article className="project-intro">
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

        <section className="project-facts">
          <div className="section-command">$ project_facts --verified</div>
          {project.facts.map((fact) => (
            <div key={fact.label}>
              <span>{fact.label}</span>
              <b>{fact.value}</b>
            </div>
          ))}
        </section>

        <section className="project-architecture">
          <div className="section-command">$ system_map --actual</div>
          <ol className="architecture-rail">
            {project.architecture.map((node) => (
              <li key={node.name}>
                <i>{node.icon}</i>
                <span>
                  <b>{node.name}</b>
                  <small>{node.detail}</small>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="project-capabilities">
          <div className="section-command">$ capabilities --documented</div>
          <ul>
            {project.capabilities.map((capability) => (
              <li key={capability}>
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

function Inspector({ project }: { project: Project }) {
  const statuses = [
    ["Repository", project.repository.replace("https://github.com/", "")],
    ["Branch", project.branch],
    ["Commit count", String(project.commitCount)],
    ["HEAD", project.latestCommit.sha],
    ["Last commit", project.latestCommit.date],
    ["Status", project.state],
  ];

  return (
    <section className="project-inspector panel">
      <div className="panel-title">$ project_inspector</div>
      <div className="project-inspector-scroll">
        <section className="status-list">
          <div className="section-command">$ git status --short</div>
          {statuses.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <b className={label === "Status" ? project.tone : ""}>{value}</b>
            </div>
          ))}
          <RepositoryLink project={project}>Open repository ↗</RepositoryLink>
        </section>

        <section className="inspector-log">
          <div className="section-command">$ git log --oneline</div>
          {project.commits.map((commit) => (
            <div key={commit.sha}>
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
            <span key={tech}>
              <i className={`skill-dot d${index % 6}`} />
              {tech}
            </span>
          ))}
        </section>

        <section className="engineering-notes">
          <div className="section-command">$ engineering_notes</div>
          {project.engineeringNotes.map((note) => (
            <div key={note.label}>
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
  const commands = [
    [`⌘ git log ${selected.branch}`, "Inspect project history"],
    ["⌁ view system map", "Inspect actual architecture"],
    ["⌕ browse capabilities", "Read documented features"],
    ["›_ open github", "Open source repository"],
  ];

  return (
    <section className="projects-workspace">
      <div className="projects-grid">
        <ProjectList active={selected.id} onSelect={setSelected} />
        <ProjectPreview project={selected} />
        <Inspector project={selected} />
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
