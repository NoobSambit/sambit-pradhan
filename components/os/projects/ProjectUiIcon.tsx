"use client";

import type { ComponentType, CSSProperties, SVGProps } from "react";
import {
  VscAdd,
  VscArchive,
  VscArrowLeft,
  VscArrowRight,
  VscBook,
  VscCheck,
  VscChevronDown,
  VscChevronLeft,
  VscChevronRight,
  VscChevronUp,
  VscClose,
  VscDatabase,
  VscDebugPause,
  VscEllipsis,
  VscFile,
  VscFiles,
  VscFolder,
  VscFolderOpened,
  VscGitBranch,
  VscGitCommit,
  VscGithub,
  VscGraph,
  VscHistory,
  VscInfo,
  VscInspect,
  VscLightbulb,
  VscLink,
  VscLinkExternal,
  VscListSelection,
  VscListTree,
  VscMarkdown,
  VscPackage,
  VscPlay,
  VscPreview,
  VscPulse,
  VscRefresh,
  VscRepo,
  VscRootFolderOpened,
  VscScreenFull,
  VscSearch,
  VscShield,
  VscSourceControl,
  VscSplitHorizontal,
  VscSymbolStructure,
  VscTerminal,
  VscTrash,
} from "react-icons/vsc";

type VscIconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type ProjectUiIconName =
  | "files"
  | "search"
  | "architecture"
  | "github"
  | "repository"
  | "folder"
  | "folder-open"
  | "root-folder"
  | "archive"
  | "file"
  | "markdown"
  | "branch"
  | "history"
  | "refresh"
  | "documentation"
  | "terminal"
  | "close"
  | "ellipsis"
  | "add"
  | "split"
  | "trash"
  | "commit"
  | "external-link"
  | "chevron-left"
  | "chevron-right"
  | "chevron-down"
  | "chevron-up"
  | "arrow-left"
  | "arrow-right"
  | "expand"
  | "play"
  | "pause"
  | "safeguard"
  | "check"
  | "info"
  | "lightbulb"
  | "inspect"
  | "list"
  | "list-tree"
  | "overview"
  | "features"
  | "pulse"
  | "package"
  | "database"
  | "graph"
  | "link"
  | "source-control";

const iconMap: Record<ProjectUiIconName, VscIconComponent> = {
  files: VscFiles,
  search: VscSearch,
  architecture: VscSymbolStructure,
  github: VscGithub,
  repository: VscRepo,
  folder: VscFolder,
  "folder-open": VscFolderOpened,
  "root-folder": VscRootFolderOpened,
  archive: VscArchive,
  file: VscFile,
  markdown: VscMarkdown,
  branch: VscGitBranch,
  history: VscHistory,
  refresh: VscRefresh,
  documentation: VscBook,
  terminal: VscTerminal,
  close: VscClose,
  ellipsis: VscEllipsis,
  add: VscAdd,
  split: VscSplitHorizontal,
  trash: VscTrash,
  commit: VscGitCommit,
  "external-link": VscLinkExternal,
  "chevron-left": VscChevronLeft,
  "chevron-right": VscChevronRight,
  "chevron-down": VscChevronDown,
  "chevron-up": VscChevronUp,
  "arrow-left": VscArrowLeft,
  "arrow-right": VscArrowRight,
  expand: VscScreenFull,
  play: VscPlay,
  pause: VscDebugPause,
  safeguard: VscShield,
  check: VscCheck,
  info: VscInfo,
  lightbulb: VscLightbulb,
  inspect: VscInspect,
  list: VscListSelection,
  "list-tree": VscListTree,
  overview: VscPreview,
  features: VscListTree,
  pulse: VscPulse,
  package: VscPackage,
  database: VscDatabase,
  graph: VscGraph,
  link: VscLink,
  "source-control": VscSourceControl,
};

export type ProjectIconSize = "micro" | "sm" | "md" | "activity";

export function ProjectUiIcon({
  name,
  size,
  className = "",
  style,
}: {
  name: ProjectUiIconName;
  size?: ProjectIconSize | number;
  className?: string;
  style?: CSSProperties;
}) {
  const Component = iconMap[name];
  const sizeClass =
    typeof size === "string" ? `project-icon--${size}` : undefined;
  const sizeStyle =
    typeof size === "number" ? { width: size, height: size, ...style } : style;
  return (
    <Component
      aria-hidden="true"
      focusable="false"
      className={`project-ui-icon${sizeClass ? ` ${sizeClass}` : ""}${className ? ` ${className}` : ""}`}
      style={sizeStyle}
    />
  );
}

/** Derive a documentation-nav icon from navigation semantics (not stored data). */
export function projectNavIconName(id: string): ProjectUiIconName {
  if (id === "features") return "features";
  if (id === "architecture") return "architecture";
  return "overview";
}

/** File-tab icon derived from the selected documentation file. */
export function projectFileIconName(selectedFile: string): ProjectUiIconName {
  if (selectedFile === "FEATURES.md") return "features";
  if (selectedFile === "ARCHITECTURE.md") return "architecture";
  return "markdown";
}
