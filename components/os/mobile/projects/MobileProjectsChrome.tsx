"use client";

import type { ReactNode } from "react";
import { MobileGlobalNav } from "@/components/os/mobile/MobileGlobalNav";
import {
  ProjectUiIcon,
  type ProjectUiIconName,
} from "@/components/os/projects/ProjectUiIcon";
import styles from "./MobileProjects.module.css";

export type MobilePanel = "left" | "right" | null;

export function MobileProjectsHeader({
  onSearch,
  path,
}: {
  onSearch?: () => void;
  path: string;
}) {
  return (
    <header className={styles.topbar}>
      <a aria-label="Sambit OS home" className={styles.brand} href="/">
        <span aria-hidden="true" className={styles.brandMark}>
          SP_
        </span>
        <strong>Sambit OS</strong>
      </a>
      <span aria-live="polite" className={styles.path}>
        {path}
      </span>
      <button
        aria-label="Search this workspace"
        className={styles.headerButton}
        onClick={onSearch}
        type="button"
      >
        <ProjectUiIcon name="search" size="sm" />
      </button>
      <span className={styles.online}>
        <i aria-hidden="true" /> ONLINE
      </span>
    </header>
  );
}

export function MobileWorkspaceBar({
  file,
  leftLabel,
  onLeft,
  onRight,
  rightLabel = "INSPECT",
  rightOpen,
  leftOpen,
}: {
  file: string;
  leftLabel: string;
  onLeft: () => void;
  onRight: () => void;
  rightLabel?: string;
  rightOpen: boolean;
  leftOpen: boolean;
}) {
  return (
    <div className={styles.workspaceBar}>
      <button
        aria-expanded={leftOpen}
        aria-label={`Open ${leftLabel}`}
        className={styles.workspaceBarButton}
        onClick={onLeft}
        type="button"
      >
        <ProjectUiIcon name="folder" size="sm" />
      </button>
      <span className={styles.workspaceFile}>
        {file.includes(" / ") ? (
          <>
            <span>{file.split(" / ")[0]} /</span>
            <b>{file.split(" / ")[1]}</b>
          </>
        ) : (
          <b>{file}</b>
        )}
      </span>
      <button
        aria-expanded={rightOpen}
        aria-label={`Open ${rightLabel}`}
        className={`${styles.workspaceBarButton} ${styles.inspectButton}`}
        onClick={onRight}
        type="button"
      >
        <ProjectUiIcon name="documentation" size="sm" />
        <span>{rightLabel}</span>
        <ProjectUiIcon name="arrow-right" size="sm" />
      </button>
    </div>
  );
}

export function MobileDocumentTabs({
  active,
  onSelect,
}: {
  active: "README.md" | "FEATURES.md" | "ARCHITECTURE.md";
  onSelect: (file: "README.md" | "FEATURES.md" | "ARCHITECTURE.md") => void;
}) {
  const files = ["README.md", "FEATURES.md", "ARCHITECTURE.md"] as const;
  return (
    <nav aria-label="Project documents" className={styles.documentTabs}>
      {files.map((file) => (
        <button
          aria-current={active === file ? "page" : undefined}
          className={active === file ? styles.activeTab : undefined}
          key={file}
          onClick={() => onSelect(file)}
          type="button"
        >
          {file}
        </button>
      ))}
    </nav>
  );
}

export function MobileDrawer({
  children,
  label,
  onClose,
  side,
}: {
  children: ReactNode;
  label: string;
  onClose: () => void;
  side: "left" | "right";
}) {
  return (
    <>
      <button
        aria-label={`Close ${label}`}
        className={styles.drawerBackdrop}
        onClick={onClose}
        type="button"
      />
      <aside
        aria-label={label}
        aria-modal="true"
        className={`${styles.drawer} ${side === "right" ? styles.rightDrawer : styles.leftDrawer}`}
        role="dialog"
      >
        <header className={styles.drawerHeader}>
          <span>{label}</span>
          <button aria-label={`Close ${label}`} onClick={onClose} type="button">
            <ProjectUiIcon name="close" size="sm" />
          </button>
        </header>
        <div className={styles.drawerScroll}>{children}</div>
      </aside>
    </>
  );
}

export function MobileTerminalDock({
  command,
  expanded,
  onToggle,
  output,
}: {
  command: string;
  expanded: boolean;
  onToggle: () => void;
  output: ReactNode;
}) {
  return (
    <section
      className={`${styles.terminalDock} ${expanded ? styles.terminalExpanded : ""}`}
    >
      {expanded ? (
        <>
          <header className={styles.terminalHeader}>
            <div className={styles.terminalTabs}>
              <b>TERMINAL</b>
              <span>OUTPUT</span>
              <span>
                PROBLEMS <small>0</small>
              </span>
              <span>DEBUG CONSOLE</span>
            </div>
            <div className={styles.terminalTools}>
              <span className={styles.shellPill}>zsh</span>
              <button aria-label="New terminal" type="button">
                <ProjectUiIcon name="add" size="sm" />
              </button>
              <button aria-label="Split terminal" type="button">
                <ProjectUiIcon name="split" size="sm" />
              </button>
              <button aria-label="Kill terminal" type="button">
                <ProjectUiIcon name="trash" size="sm" />
              </button>
              <button
                aria-label="Collapse terminal"
                onClick={onToggle}
                type="button"
              >
                <ProjectUiIcon name="chevron-down" size="sm" />
              </button>
            </div>
          </header>
          <div className={styles.terminalOutput}>
            <p>
              <b>{command}</b>
              <br />
              {output}
              <br />
              <b>{command.replace(/\$ .*/, "$ ")}</b>
              <i className={styles.caret} />
            </p>
          </div>
        </>
      ) : (
        <button
          aria-expanded={expanded}
          aria-label="Expand terminal"
          className={styles.terminalCollapsed}
          onClick={onToggle}
          type="button"
        >
          <ProjectUiIcon name="terminal" size="sm" />
          <b>TERMINAL</b>
          <ProjectUiIcon name="chevron-up" size="sm" />
        </button>
      )}
    </section>
  );
}

export function MobileProjectsShell({
  children,
  onSearch,
  path,
  terminal,
}: {
  children: ReactNode;
  onSearch?: () => void;
  path: string;
  terminal: ReactNode;
}) {
  return (
    <div className={styles.root}>
      <MobileProjectsHeader onSearch={onSearch} path={path} />
      <main className={styles.content}>{children}</main>
      {terminal}
      <MobileGlobalNav />
    </div>
  );
}

export function iconForDocument(file: string): ProjectUiIconName {
  if (file === "FEATURES.md") return "features";
  if (file === "ARCHITECTURE.md") return "architecture";
  return "markdown";
}
