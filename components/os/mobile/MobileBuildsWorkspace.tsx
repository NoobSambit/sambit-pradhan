"use client";

import { useState } from "react";
import { TerminalIcon } from "@/components/os/TerminalIcon";
import { TechIcon } from "@/components/os/TechIcon";
import { projects, type Project } from "@/data/projects";
import styles from "./MobileHome.module.css";

type BuildsTab = "repos" | "project" | "inspector";

const DEFAULT_PROJECT_ID = "armyverse";

function toneClass(tone: Project["tone"]) {
  if (tone === "yellow") return styles.toneAmber;
  if (tone === "blue") return styles.toneBlue;
  return styles.toneGreen;
}

function shortRepo(repository: string) {
  return repository.replace("https://github.com/", "");
}

export function MobileBuildsWorkspace() {
  const [selectedId, setSelectedId] = useState(DEFAULT_PROJECT_ID);
  const [tab, setTab] = useState<BuildsTab>("repos");

  const selected =
    projects.find((project) => project.id === selectedId) ?? projects[0];

  const openProject = (project: Project) => {
    setSelectedId(project.id);
    setTab("project");
  };

  const focusBlock = (id: string) => {
    window.setTimeout(() => {
      const element = document.getElementById(id);
      if (!element) return;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      element.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
      const target = element.querySelector<HTMLElement>("[data-focus-target]");
      target?.focus({ preventScroll: true });
    }, 60);
  };

  const gotoProjectBlock = (blockId: string) => {
    setTab("project");
    focusBlock(blockId);
  };

  const gotoInspectorCommits = () => {
    setTab("inspector");
    focusBlock("m-builds-commits");
  };

  return (
    <>
      <div className={styles.workspaceHead}>
        <div className={styles.workspaceId}>
          <span aria-hidden="true" className={styles.workspaceGlyph}>
            <TerminalIcon name="folder" />
          </span>
          <span>
            <b>PROJECTS</b>
            <small>~/projects</small>
          </span>
        </div>
        <div aria-label="Builds panes" className={styles.tabs} role="tablist">
          {(
            [
              ["repos", "repositories/"],
              ["project", "project.md"],
              ["inspector", "inspector"],
            ] as Array<[BuildsTab, string]>
          ).map(([id, label]) => (
            <button
              key={id}
              aria-controls={`m-builds-${id}`}
              aria-selected={tab === id}
              className={tab === id ? `${styles.tab} ${styles.tabActive}` : styles.tab}
              id={`m-builds-tab-${id}`}
              onClick={() => setTab(id)}
              role="tab"
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {tab === "repos" && (
        <div
          aria-labelledby="m-builds-tab-repos"
          id="m-builds-repos"
          role="tabpanel"
        >
          <article className={styles.panel}>
            <p className={styles.cmdLine}>
              <span className={styles.prompt}>
                developer@sambit:~/projects$
              </span>{" "}
              ls --featured
            </p>
            <div className={styles.repoList} role="list">
              {projects.map((project) => {
                const active = project.id === selected.id;
                return (
                  <button
                    key={project.id}
                    aria-current={active ? "true" : undefined}
                    className={
                      active
                        ? `${styles.repoRow} ${styles.repoSelected}`
                        : styles.repoRow
                    }
                    onClick={() => openProject(project)}
                    role="listitem"
                    type="button"
                  >
                    <span aria-hidden="true" className={styles.repoIcon}>
                      <TerminalIcon name="folder" />
                    </span>
                    <span className={styles.repoMain}>
                      <b>
                        {project.name}
                        <em className={toneClass(project.tone)}>
                          <i aria-hidden="true">●</i> {project.state}
                        </em>
                      </b>
                      <small>
                        {project.runtime}{" "}
                        <span className={styles.repoBranch}>
                          <TerminalIcon name="git-branch" /> {project.branch}
                        </span>{" "}
                        · {project.commitCount} commits
                      </small>
                      <span className={styles.repoTag}>{project.tag}</span>
                    </span>
                    <span aria-hidden="true" className={styles.repoArrow}>
                      ›
                    </span>
                  </button>
                );
              })}
            </div>
            <p className={styles.repoFooter}>
              <span>{projects.length} repositories</span>
              <span>Sort: featured ▾</span>
            </p>
          </article>
        </div>
      )}

      {tab === "project" && (
        <div
          aria-labelledby="m-builds-tab-project"
          id="m-builds-project"
          role="tabpanel"
        >
          <article className={styles.panel}>
            <button
              className={styles.backLink}
              onClick={() => setTab("repos")}
              type="button"
            >
              ← Back to repositories/
            </button>
            <p className={styles.cmdLine}>
              <span className={styles.prompt}>$ git show</span>{" "}
              {selected.latestCommit.sha} --stat
            </p>
            <h2 className={styles.projectName}>
              {selected.name}{" "}
              <em className={toneClass(selected.tone)}>
                <i aria-hidden="true">●</i> {selected.state}
              </em>
            </h2>
            {selected.productName && (
              <p className={styles.productName}>
                {selected.productName.toUpperCase()}
              </p>
            )}
            <p className={styles.bodyText}>{selected.description}</p>
            <div className={styles.projectChips}>
              <span>
                <TerminalIcon name="git-branch" /> {selected.branch}
              </span>
              <span>{selected.commitCount} commits</span>
              <span>{selected.latestCommit.sha}</span>
              <a href={`/projects/${selected.id}`}>
                <TerminalIcon name="file-text" /> Case study
              </a>
              <a
                href={selected.repository}
                rel="noopener noreferrer"
                target="_blank"
              >
                <TerminalIcon name="external-link" /> Repository
              </a>
            </div>
          </article>

          <article aria-label="Project facts" className={styles.panel}>
            <p className={styles.panelCmd}>
              <span>$ project_facts --verified</span>
            </p>
            <dl className={styles.factsGrid} id="m-builds-facts">
              {selected.facts.map((fact) => (
                <div key={fact.label} data-focus-target tabIndex={-1}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </article>

          <article aria-label="System map" className={styles.panel}>
            <p className={styles.panelCmd}>
              <span>$ system_map --actual</span>
            </p>
            <ol className={styles.archFlow} id="m-builds-arch">
              {selected.architecture.map((node) => (
                <li key={node.name} data-focus-target tabIndex={-1}>
                  <b>{node.name}</b>
                  <small>{node.detail}</small>
                </li>
              ))}
            </ol>
          </article>

          <article aria-label="Capabilities" className={styles.panel}>
            <p className={styles.panelCmd}>
              <span>$ capabilities --documented</span>
            </p>
            <ul className={styles.capsList} id="m-builds-caps">
              {selected.capabilities.map((capability) => (
                <li key={capability} data-focus-target tabIndex={-1}>
                  <span aria-hidden="true">›</span> {capability}
                </li>
              ))}
            </ul>
          </article>
        </div>
      )}

      {tab === "inspector" && (
        <div
          aria-labelledby="m-builds-tab-inspector"
          id="m-builds-inspector"
          role="tabpanel"
        >
          <article className={styles.panel}>
            <p className={styles.panelCmd}>
              <span className={styles.pink}>$ project_inspector</span>
              <em className={styles.toneGreen}>
                <i aria-hidden="true">●</i> {selected.name}
              </em>
            </p>
            <p className={styles.panelCmd}>
              <span>$ git status --short</span>
            </p>
            <dl className={styles.statusRows}>
              <div>
                <dt>Repository</dt>
                <dd>{shortRepo(selected.repository)}</dd>
              </div>
              <div>
                <dt>Branch</dt>
                <dd className={styles.blue}>{selected.branch}</dd>
              </div>
              <div>
                <dt>Commit count</dt>
                <dd>{selected.commitCount}</dd>
              </div>
              <div>
                <dt>HEAD</dt>
                <dd className={styles.blue}>{selected.latestCommit.sha}</dd>
              </div>
              <div>
                <dt>Last commit</dt>
                <dd>{selected.latestCommit.date}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd className={toneClass(selected.tone)}>
                  <i aria-hidden="true">●</i> {selected.state}
                </dd>
              </div>
            </dl>
            <a
              className={styles.inlineLink}
              href={selected.repository}
              rel="noopener noreferrer"
              target="_blank"
            >
              Open repository <TerminalIcon name="external-link" />
            </a>
          </article>

          <article aria-label="Commit history" className={styles.panel}>
            <p className={styles.panelCmd}>
              <span>$ git log --oneline</span>
            </p>
            <ol className={styles.commitList} id="m-builds-commits">
              {selected.commits.map((commit) => (
                <li key={commit.sha} data-focus-target tabIndex={-1}>
                  <i aria-hidden="true" />
                  <span>
                    <b>{commit.sha}</b> {commit.subject}
                  </span>
                  <time>{commit.date}</time>
                </li>
              ))}
            </ol>
            <a
              className={styles.inlineLink}
              href={selected.repository}
              rel="noopener noreferrer"
              target="_blank"
            >
              View commit history <TerminalIcon name="external-link" />
            </a>
          </article>

          <article aria-label="Project stack" className={styles.panel}>
            <p className={styles.panelCmd}>
              <span>$ stack --project</span>
            </p>
            <div className={styles.stackChips}>
              {selected.stack.map((tech) => (
                <span key={tech}>
                  <TechIcon name={tech} /> {tech}
                </span>
              ))}
            </div>
          </article>

          <article aria-label="Engineering notes" className={styles.panel}>
            <p className={styles.panelCmd}>
              <span>$ engineering_notes</span>
            </p>
            <dl className={styles.notesRows}>
              {selected.engineeringNotes.map((note) => (
                <div key={note.label}>
                  <dt>
                    <TerminalIcon name="file-text" /> {note.label}
                  </dt>
                  <dd>{note.value}</dd>
                </div>
              ))}
            </dl>
          </article>

          <article aria-label="Project actions" className={styles.panel}>
            <p className={styles.panelCmd}>
              <span>$ project_actions</span>
            </p>
            <div className={styles.actionGrid}>
              <button onClick={gotoInspectorCommits} type="button">
                <b>
                  <TerminalIcon name="git-branch" /> git log main
                </b>
                <small>Inspect project history</small>
              </button>
              <button onClick={() => gotoProjectBlock("m-builds-arch")} type="button">
                <b>
                  <TerminalIcon name="network" /> view system map
                </b>
                <small>Inspect actual architecture</small>
              </button>
              <button onClick={() => gotoProjectBlock("m-builds-caps")} type="button">
                <b>
                  <TerminalIcon name="search" /> browse capabilities
                </b>
                <small>Read documented features</small>
              </button>
              <a
                href={selected.repository}
                rel="noopener noreferrer"
                target="_blank"
              >
                <b>
                  <TerminalIcon name="github" /> open github
                </b>
                <small>Open source repository</small>
              </a>
            </div>
          </article>
        </div>
      )}
    </>
  );
}
