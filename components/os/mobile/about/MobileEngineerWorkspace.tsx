"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { MobileGlobalNav } from "@/components/os/mobile/MobileGlobalNav";
import { TerminalIcon } from "@/components/os/TerminalIcon";
import { getAboutTerminalSession } from "@/components/os/about/terminalSessions";
import styles from "./MobileEngineer.module.css";

type MobileEngineerPanel = "none" | "explorer" | "semantic";

type SemanticTone = "cyan" | "purple" | "green" | "orange";
type SemanticProperty = {
  label: string;
  values: readonly string[];
  tone?: SemanticTone;
};
type SemanticNode = {
  id: string;
  summary: string;
  accent: SemanticTone;
  properties: readonly SemanticProperty[];
};
export type MobileSemanticMapDefinition = {
  defaultNode: string;
  nodes: readonly SemanticNode[];
};

type MobileEngineerWorkspaceProps = {
  activeFile: string;
  openFiles: string[];
  explorerFiles: string[];
  onOpenFile: (file: string) => void;
  onCloseFile: (file: string) => void;
  onOpenBuildHistory: () => void;
  semanticDefinition?: MobileSemanticMapDefinition;
  sourceContent: ReactNode;
};

const COLLAPSED_FOLDERS = [
  "projects",
  "experience",
  "skills",
  "assets",
  "docs",
];

function getFileMarker(file: string): string {
  if (file === "introduction.ts" || file === "workstation.toml") return "M";
  if (file === "values.ts") return "●";
  return "";
}

function getFileBadge(file: string): string {
  if (file.endsWith(".ts")) return "TS";
  if (file.endsWith(".json")) return "{}";
  if (file.endsWith(".toml")) return "⚙";
  if (file.endsWith(".yml") || file.endsWith(".yaml")) return "!";
  return "•";
}

function getFileLanguage(file: string): string {
  if (file.endsWith(".json")) return "JSON";
  if (file.endsWith(".toml")) return "TOML";
  if (file.endsWith(".yml") || file.endsWith(".yaml")) return "YAML";
  return "TypeScript";
}

export function MobileEngineerWorkspace({
  activeFile,
  openFiles,
  explorerFiles,
  onOpenFile,
  onCloseFile,
  onOpenBuildHistory,
  semanticDefinition,
  sourceContent,
}: MobileEngineerWorkspaceProps) {
  const [panel, setPanel] = useState<MobileEngineerPanel>("none");
  const [terminalExpanded, setTerminalExpanded] = useState(false);
  const [collapsedNodes, setCollapsedNodes] = useState<Record<string, string[]>>(
    {},
  );
  const [selectedNodes, setSelectedNodes] = useState<Record<string, string>>({});
  const [semanticLine, setSemanticLine] = useState<number | undefined>(
    undefined,
  );

  const editorRef = useRef<HTMLDivElement>(null);
  const explorerDrawerRef = useRef<HTMLDivElement>(null);
  const semanticDrawerRef = useRef<HTMLDivElement>(null);
  const explorerOpenerRef = useRef<HTMLButtonElement>(null);
  const mapOpenerRef = useRef<HTMLButtonElement>(null);
  const lastOpenerRef = useRef<HTMLElement | null>(null);
  const highlightTimeoutRef = useRef<number | undefined>(undefined);

  const selectedNodeId = semanticDefinition
    ? (selectedNodes[activeFile] ?? semanticDefinition.defaultNode)
    : undefined;
  const collapsedNodeIds = collapsedNodes[activeFile] ?? [];
  const terminalSession = getAboutTerminalSession(activeFile);
  const fileLanguage = getFileLanguage(activeFile);
  const fileBadge = getFileBadge(activeFile);

  const getMobileAnchor = useCallback((nodeId: string) => {
    return editorRef.current?.querySelector<HTMLElement>(
      `[data-semantic-node="${nodeId}"]`,
    );
  }, []);

  const updateMobileSemanticLine = useCallback(
    (nodeId: string | undefined) => {
      if (!nodeId || !editorRef.current) {
        setSemanticLine(undefined);
        return;
      }
      const anchor = getMobileAnchor(nodeId);
      const line = anchor?.closest("li");
      const source = line?.parentElement;
      if (!line || !source) {
        setSemanticLine(undefined);
        return;
      }
      setSemanticLine(Array.from(source.children).indexOf(line) + 1);
    },
    [getMobileAnchor],
  );

  useEffect(() => {
    updateMobileSemanticLine(selectedNodeId);
  }, [activeFile, selectedNodeId, sourceContent, updateMobileSemanticLine]);

  useEffect(() => {
    editorRef.current?.scrollTo({ top: 0 });
  }, [activeFile]);

  useEffect(() => {
    return () => {
      if (highlightTimeoutRef.current !== undefined) {
        window.clearTimeout(highlightTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (panel === "explorer") {
        setPanel("none");
        explorerOpenerRef.current?.focus();
      } else if (panel === "semantic") {
        setPanel("none");
        mapOpenerRef.current?.focus();
      } else if (terminalExpanded) {
        setTerminalExpanded(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panel, terminalExpanded]);

  useEffect(() => {
    if (panel === "explorer") {
      lastOpenerRef.current = explorerOpenerRef.current;
      explorerDrawerRef.current?.focus();
    } else if (panel === "semantic") {
      lastOpenerRef.current = mapOpenerRef.current;
      semanticDrawerRef.current?.focus();
    } else {
      lastOpenerRef.current?.focus?.();
      lastOpenerRef.current = null;
    }
  }, [panel]);

  const openExplorer = () => {
    setTerminalExpanded(false);
    setPanel((current) => (current === "explorer" ? "none" : "explorer"));
  };

  const openSemantic = () => {
    setTerminalExpanded(false);
    setPanel((current) => (current === "semantic" ? "none" : "semantic"));
  };

  const closePanel = () => setPanel("none");

  const toggleTerminal = () => {
    if (!terminalExpanded) {
      setPanel("none");
      setTerminalExpanded(true);
    } else {
      setTerminalExpanded(false);
    }
  };

  const handleTabSelect = (file: string) => {
    onOpenFile(file);
    requestAnimationFrame(() => {
      editorRef.current?.scrollTo({ top: 0 });
    });
  };

  const handleExplorerSelect = (file: string) => {
    onOpenFile(file);
    setPanel("none");
    requestAnimationFrame(() => {
      editorRef.current?.scrollTo({ top: 0 });
      explorerOpenerRef.current?.focus();
    });
  };

  const toggleSemanticNode = (nodeId: string) => {
    setCollapsedNodes((current) => {
      const list = current[activeFile] ?? [];
      const next = list.includes(nodeId)
        ? list.filter((id) => id !== nodeId)
        : [...list, nodeId];
      return { ...current, [activeFile]: next };
    });
  };

  const selectSemanticNodeAndNavigate = (nodeId: string) => {
    setSelectedNodes((current) => ({ ...current, [activeFile]: nodeId }));
    updateMobileSemanticLine(nodeId);
    setPanel("none");
    requestAnimationFrame(() => {
      const anchor = getMobileAnchor(nodeId);
      const line = anchor?.closest("li") as HTMLElement | null;
      if (!line || !editorRef.current) {
        mapOpenerRef.current?.focus();
        return;
      }
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const viewport = editorRef.current;
      const targetTop =
        line.offsetTop - viewport.clientHeight / 2 + line.clientHeight / 2;
      viewport.scrollTo({
        top: Math.max(0, targetTop),
        behavior: reduced ? "auto" : "smooth",
      });
      updateMobileSemanticLine(nodeId);
      line.classList.remove("is-semantic-highlight");
      requestAnimationFrame(() => {
        line.classList.add("is-semantic-highlight");
        if (highlightTimeoutRef.current !== undefined) {
          window.clearTimeout(highlightTimeoutRef.current);
        }
        highlightTimeoutRef.current = window.setTimeout(() => {
          line.classList.remove("is-semantic-highlight");
        }, 900);
      });
      mapOpenerRef.current?.focus();
    });
  };

  const explorerOpen = panel === "explorer";
  const semanticOpen = panel === "semantic";

  return (
    <div
      className={`${styles.root} ${terminalExpanded ? styles.terminalOpen : ""}`}
      aria-label="Mobile Engineer workspace"
    >
      <div aria-hidden="true" className={styles.bgLayer} />

      <div className={styles.chrome}>
        <header className={styles.topbar}>
          <span className={styles.brand}>
            <span aria-hidden="true" className={styles.brandMark}>
              SP_
            </span>
            <strong className={styles.brandName}>Sambit OS</strong>
          </span>
          <span className={styles.contextPath}>~/about</span>
          <button
            type="button"
            className={styles.searchButton}
            aria-label="Search"
          >
            <TerminalIcon name="search" />
          </button>
          <span className={styles.onlinePill}>
            <i aria-hidden="true" />
            ONLINE
          </span>
        </header>

        <div
          className={styles.switcher}
          role="group"
          aria-label="About workspace"
        >
          <button
            type="button"
            className={styles.switcherActive}
            aria-current="page"
          >
            <TerminalIcon name="terminal" />
            ENGINEER
          </button>
          <button type="button" onClick={onOpenBuildHistory}>
            <TerminalIcon name="git-branch" />
            BUILD HISTORY
          </button>
        </div>
      </div>

      <div className={styles.ideShell}>
        <div className={styles.tabRail} aria-label="Editor controls">
          <button
            ref={explorerOpenerRef}
            type="button"
            className={`${styles.railButton} ${explorerOpen ? styles.railActive : ""}`}
            aria-expanded={explorerOpen}
            aria-controls="m-engineer-explorer"
            aria-label="Toggle Explorer"
            onClick={openExplorer}
          >
            <TerminalIcon name="file-text" />
          </button>
          <div
            className={styles.tabsScroll}
            role="tablist"
            aria-label="Open source files"
          >
            {openFiles.map((file) => {
              const active = file === activeFile;
              const closable = file !== "introduction.ts";
              return (
                <div
                  key={file}
                  role="presentation"
                  className={`${styles.tab} ${active ? styles.tabActive : ""}`}
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-label={`${file}${active ? ", active" : ""}`}
                    className={styles.tabSelect}
                    onClick={() => handleTabSelect(file)}
                  >
                    <span aria-hidden="true" className={styles.tabBadge}>
                      {getFileBadge(file)}
                    </span>
                    <span className={styles.tabName}>{file}</span>
                    <span
                      aria-hidden="true"
                      className={active ? styles.tabDotActive : styles.tabDot}
                    >
                      ●
                    </span>
                  </button>
                  {closable && (
                    <button
                      type="button"
                      className={styles.tabClose}
                      aria-label={`Close ${file}`}
                      onClick={() => onCloseFile(file)}
                    >
                      ×
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <button
            type="button"
            className={styles.railButton}
            aria-label="New tab"
            title="New tab"
          >
            <span aria-hidden="true">＋</span>
          </button>
          <button
            type="button"
            className={styles.railButton}
            aria-label="Split editor (not available)"
            title="Split editor"
          >
            <span aria-hidden="true" className={styles.splitGlyph}>
              ▥
            </span>
          </button>
          <button
            ref={mapOpenerRef}
            type="button"
            className={`${styles.railButton} ${semanticOpen ? styles.railActive : ""}`}
            aria-expanded={semanticOpen}
            aria-controls="m-engineer-semantic"
            aria-label="Toggle Semantic Map"
            onClick={openSemantic}
          >
            <TerminalIcon name="network" />
          </button>
        </div>

        <p className={styles.breadcrumb} aria-label="File breadcrumb">
          <span>portfolio</span>
          <i aria-hidden="true">›</i>
          <span>about</span>
          <i aria-hidden="true">›</i>
          <b>{fileBadge}</b>
          <span className={styles.breadcrumbFile}>{activeFile}</span>
        </p>

        <div
          className={`${styles.ideBody} ${terminalExpanded ? styles.bodyTerminalExpanded : styles.bodyTerminalCollapsed}`}
        >
          <div className={styles.editorWrap}>
            <section
              className={styles.editorPanel}
              aria-label={`${activeFile} source editor`}
            >
              <div
                ref={editorRef}
                className={styles.editorViewport}
                tabIndex={0}
                aria-label={`${activeFile} source code`}
              >
                <div aria-hidden="true" className={styles.editorArt} />
                {sourceContent}
                <div aria-hidden="true" className={styles.minimapRail}>
                  {Array.from({ length: 12 }, (_, index) => (
                    <i key={index} />
                  ))}
                </div>
              </div>
              <footer
                className={styles.statusBar}
                aria-label="Editor status"
              >
                <span>Ln {semanticLine ?? 1}, Col 1</span>
                <span>{fileLanguage}</span>
                <span>UTF-8</span>
                <span>LF</span>
                <span className={styles.statusBranch}>
                  <TerminalIcon name="git-branch" />
                  main
                </span>
              </footer>
            </section>

            {explorerOpen && (
              <>
                <button
                  type="button"
                  className={styles.scrim}
                  aria-label="Close Explorer"
                  onClick={closePanel}
                />
                <div
                  ref={explorerDrawerRef}
                  id="m-engineer-explorer"
                  role="dialog"
                  aria-modal="false"
                  aria-label="Explorer"
                  tabIndex={-1}
                  className={`${styles.drawer} ${styles.explorerDrawer}`}
                >
                  <header className={styles.drawerHead}>
                    <b>EXPLORER</b>
                    <span className={styles.drawerHeadActions}>
                      <button type="button" aria-label="New file">
                        ＋
                      </button>
                      <button
                        type="button"
                        aria-label="Close Explorer"
                        onClick={closePanel}
                      >
                        ×
                      </button>
                    </span>
                  </header>
                  <div className={styles.drawerScroll}>
                    <p className={styles.treeRoot}>⌄ PORTFOLIO/</p>
                    <p className={styles.treeFolder}>⌄ about</p>
                    <div role="group" aria-label="About files">
                      {explorerFiles.map((file) => {
                        const active = file === activeFile;
                        return (
                          <button
                            key={file}
                            type="button"
                            className={`${styles.treeFile} ${active ? styles.treeFileActive : ""}`}
                            aria-current={active ? "true" : undefined}
                            onClick={() => handleExplorerSelect(file)}
                          >
                            <span
                              aria-hidden="true"
                              className={styles.treeBadge}
                            >
                              {getFileBadge(file)}
                            </span>
                            <span className={styles.treeName}>{file}</span>
                            <em aria-hidden="true">
                              {getFileMarker(file)}
                            </em>
                          </button>
                        );
                      })}
                    </div>
                    {COLLAPSED_FOLDERS.map((folder) => (
                      <button
                        key={folder}
                        type="button"
                        className={styles.treeFolderClosed}
                        aria-label={`${folder} folder, collapsed`}
                      >
                        <span aria-hidden="true">›</span> {folder}
                      </button>
                    ))}

                    <section
                      className={styles.drawerSection}
                      aria-label="Source Control"
                    >
                      <h2>SOURCE CONTROL</h2>
                      <p>
                        <TerminalIcon name="git-branch" /> 4 files modified
                      </p>
                      <p>
                        <TerminalIcon name="check-circle" /> Conflicts resolved
                      </p>
                      <small>
                        Last commit <b>2 hours ago</b>
                      </small>
                    </section>

                    <section
                      className={styles.drawerSection}
                      aria-label="Open Editors"
                    >
                      <h2>OPEN EDITORS</h2>
                      {openFiles.map((file) => (
                        <p key={file} className={styles.openEditorRow}>
                          <span aria-hidden="true">
                            {getFileBadge(file)}
                          </span>{" "}
                          {file}{" "}
                          <em aria-hidden="true">
                            {getFileMarker(file)}
                          </em>
                        </p>
                      ))}
                    </section>
                  </div>
                </div>
              </>
            )}

            {semanticOpen && (
              <>
                <button
                  type="button"
                  className={styles.scrim}
                  aria-label="Close Semantic Map"
                  onClick={closePanel}
                />
                <div
                  ref={semanticDrawerRef}
                  id="m-engineer-semantic"
                  role="complementary"
                  aria-label={`Semantic map for ${activeFile}`}
                  tabIndex={-1}
                  className={`${styles.drawer} ${styles.semanticDrawer}`}
                >
                  <header className={styles.drawerHead}>
                    <b>
                      <span aria-hidden="true" className={styles.mapDiamond}>
                        ◇
                      </span>{" "}
                      SEMANTIC MAP
                    </b>
                    <span className={styles.mapMeta}>
                      {activeFile} Ln {semanticLine ?? "—"}
                    </span>
                    <button
                      type="button"
                      aria-label="Close Semantic Map"
                      onClick={closePanel}
                    >
                      ×
                    </button>
                  </header>
                  <div className={styles.drawerScroll}>
                    {semanticDefinition ? (
                      <div
                        role="group"
                        aria-label={`${activeFile} semantic nodes`}
                      >
                        {semanticDefinition.nodes.map((node) => {
                          const active = node.id === selectedNodeId;
                          const collapsed = collapsedNodeIds.includes(
                            node.id,
                          );
                          const propsId = `m-sem-${activeFile.replace(/\W/g, "-")}-${node.id}`;
                          return (
                            <div
                              key={node.id}
                              className={`${styles.semNodeWrap} ${active ? styles.semActive : ""}`}
                            >
                              <div className={styles.semNodeRow}>
                                <button
                                  type="button"
                                  className={`${styles.semNode} ${styles[`semAccent${node.accent[0].toUpperCase()}${node.accent.slice(1)}`] ?? ""}`}
                                  aria-pressed={active}
                                  onClick={() =>
                                    selectSemanticNodeAndNavigate(node.id)
                                  }
                                >
                                  <i aria-hidden="true" />
                                  <span>
                                    <b>{node.id}</b>
                                    <small>{node.summary}</small>
                                  </span>
                                </button>
                                <button
                                  type="button"
                                  className={styles.semToggle}
                                  aria-expanded={!collapsed}
                                  aria-controls={propsId}
                                  aria-label={`${collapsed ? "Expand" : "Collapse"} ${node.id} properties`}
                                  onClick={() => toggleSemanticNode(node.id)}
                                >
                                  <span aria-hidden="true">
                                    {collapsed ? "›" : "⌄"}
                                  </span>
                                </button>
                              </div>
                              {!collapsed && (
                                <div
                                  id={propsId}
                                  className={styles.semProps}
                                  aria-label={`${node.id} properties`}
                                >
                                  {node.properties.map((property) => (
                                    <div
                                      key={property.label}
                                      className={`${styles.semProp} ${styles[`semTone${(property.tone ?? node.accent)[0].toUpperCase()}${(property.tone ?? node.accent).slice(1)}`] ?? ""}`}
                                    >
                                      <span>{property.label}</span>
                                      <i aria-hidden="true">→</i>
                                      <div>
                                        {property.values.map((value) => (
                                          <b key={value}>{value}</b>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className={styles.semEmpty}>
                        <span aria-hidden="true">◇</span>No semantic structure
                        yet.
                        <small>
                          {activeFile} is still pending implementation.
                        </small>
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <section
            className={`${styles.terminal} ${terminalExpanded ? styles.terminalExpanded : styles.terminalCollapsed}`}
            aria-label="Terminal"
          >
            {!terminalExpanded ? (
              <button
                type="button"
                className={styles.terminalDock}
                aria-expanded="false"
                aria-controls="m-engineer-terminal"
                onClick={toggleTerminal}
              >
                <span>
                  <span aria-hidden="true">&gt;_</span> TERMINAL
                </span>
                <span aria-hidden="true">∧</span>
              </button>
            ) : (
              <div
                id="m-engineer-terminal"
                className={styles.terminalBody}
              >
                <header className={styles.terminalTabs}>
                  <b>TERMINAL</b>
                  <span>OUTPUT</span>
                  <span>
                    PROBLEMS <i>0</i>
                  </span>
                  <span className={styles.debugTab}>DEBUG CONSOLE</span>
                  <span className={styles.terminalMeta}>zsh</span>
                  <button
                    type="button"
                    aria-label="Add terminal"
                    className={styles.termIconButton}
                  >
                    ＋
                  </button>
                  <button
                    type="button"
                    aria-label="Collapse Terminal"
                    aria-expanded="true"
                    aria-controls="m-engineer-terminal"
                    className={styles.termIconButton}
                    onClick={toggleTerminal}
                  >
                    ∨
                  </button>
                </header>
                <div className={styles.terminalOutput}>
                  <p>
                    <strong>developer@sambit:~/about</strong>
                    {terminalSession.command}
                  </p>
                  {terminalSession.lines.map((line) => (
                    <p key={line}>
                      [time] <span>✓</span> {line}
                    </p>
                  ))}
                  <p>
                    <strong>developer@sambit:~/about</strong>${" "}
                    <b className={styles.cursor}>▌</b>
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      <div aria-hidden="true" className={styles.waveLayer} />
      <MobileGlobalNav />
    </div>
  );
}

export default MobileEngineerWorkspace;
