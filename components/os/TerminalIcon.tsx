import type { ReactNode, SVGProps } from "react";

export type TerminalIconName =
  | "activity"
  | "archive"
  | "boxes"
  | "briefcase"
  | "check-circle"
  | "clock"
  | "cloud"
  | "cpu"
  | "external-link"
  | "file-text"
  | "folder"
  | "git-branch"
  | "git-compare"
  | "github"
  | "grid"
  | "hard-drive"
  | "heart-pulse"
  | "layers"
  | "linkedin"
  | "mail"
  | "map-pin"
  | "memory"
  | "network"
  | "package"
  | "palette"
  | "refresh"
  | "search"
  | "server"
  | "sliders"
  | "terminal"
  | "timer"
  | "type"
  | "user";

const iconPaths: Record<TerminalIconName, ReactNode> = {
  activity: <path d="M3 12h4l2.2-6 4.2 12 2.2-6H21" />,
  archive: (
    <>
      <path d="M4 7h16v13H4zM3 3h18v4H3z" />
      <path d="M9 11h6" />
    </>
  ),
  boxes: (
    <>
      <path d="m12 2 4 2.3v4.6L12 11 8 8.9V4.3zM6 12l4 2.3v4.6L6 21l-4-2.1v-4.6zM18 12l4 2.3v4.6L18 21l-4-2.1v-4.6z" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" />
    </>
  ),
  "check-circle": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.6 2.6L16.5 9" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  cloud: <path d="M7 18h10a4 4 0 0 0 .7-7.9A6 6 0 0 0 6.2 8.7 4.7 4.7 0 0 0 7 18Z" />,
  cpu: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3M10 10h4v4h-4z" />
    </>
  ),
  "external-link": (
    <>
      <path d="M14 4h6v6M20 4l-9 9" />
      <path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
    </>
  ),
  "file-text": (
    <>
      <path d="M5 2h9l5 5v15H5zM14 2v6h5" />
      <path d="M8 13h8M8 17h6" />
    </>
  ),
  folder: <path d="M3 6h7l2 2h9v11H3z" />,
  "git-branch": (
    <>
      <circle cx="6" cy="5" r="2" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="8" r="2" />
      <path d="M6 7v10M8 8h8M18 10v2c0 3-2 5-5 5H8" />
    </>
  ),
  "git-compare": (
    <>
      <path d="M7 3v14M4 6l3-3 3 3M17 21V7M14 18l3 3 3-3" />
    </>
  ),
  github: (
    <path d="M15 22v-4c.1-1-.3-1.8-.8-2.4 2.8-.3 5.8-1.4 5.8-6.2A4.8 4.8 0 0 0 18.7 6c.1-.3.5-1.7-.1-3.4 0 0-1-.3-3.6 1.3a12.4 12.4 0 0 0-6 0C6.4 2.3 5.4 2.6 5.4 2.6 4.8 4.3 5.2 5.7 5.3 6A4.8 4.8 0 0 0 4 9.4c0 4.8 3 5.9 5.8 6.2-.4.5-.7 1.2-.8 2.4v4M9 19c-3 .9-3-1.5-4.2-2" />
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  "hard-drive": (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 14h18M16 17h.01M19 17h.01" />
    </>
  ),
  "heart-pulse": <path d="M20.8 5.8a5.5 5.5 0 0 0-7.8 0L12 6.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l4-3.8M3 14h4l2-4 3 7 2-4h7" />,
  layers: <path d="m12 3 9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5" />,
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10v7M8 7v.01M12 17v-7M12 13a4 4 0 0 1 8 0v4" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  memory: (
    <>
      <rect x="3" y="7" width="18" height="10" rx="2" />
      <path d="M7 10v4M11 10v4M15 10v4M19 10v4M6 17v3M10 17v3M14 17v3M18 17v3" />
    </>
  ),
  network: (
    <>
      <rect x="9" y="3" width="6" height="5" rx="1" />
      <rect x="3" y="16" width="6" height="5" rx="1" />
      <rect x="15" y="16" width="6" height="5" rx="1" />
      <path d="M12 8v4M6 16v-4h12v4" />
    </>
  ),
  package: (
    <>
      <path d="m12 2 9 5-9 5-9-5zM3 7v10l9 5 9-5V7M12 12v10" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 0 0 0 18h1.5a2 2 0 0 0 0-4H12a2 2 0 0 1 0-4h3a6 6 0 0 0 0-12Z" />
      <path d="M7.5 9h.01M9.5 6h.01M14 6h.01" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 7v5h-5M4 17v-5h5" />
      <path d="M6.1 8A7 7 0 0 1 18 6l2 6M18 16a7 7 0 0 1-12 2l-2-6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m16 16 5 5" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="4" width="18" height="6" rx="2" />
      <rect x="3" y="14" width="18" height="6" rx="2" />
      <path d="M7 7h.01M7 17h.01M11 7h6M11 17h6" />
    </>
  ),
  sliders: <path d="M4 6h8M16 6h4M4 12h3M11 12h9M4 18h10M18 18h2M12 3v6M7 9v6M14 15v6" />,
  terminal: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="m7 9 3 3-3 3M12 15h5" />
    </>
  ),
  timer: (
    <>
      <circle cx="12" cy="13" r="8" />
      <path d="M9 2h6M12 5v8l3 2M18 7l2-2" />
    </>
  ),
  type: <path d="M4 5V3h16v2M9 21h6M12 3v18" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
};

type TerminalIconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: TerminalIconName;
};

export function TerminalIcon({ className = "", name, ...props }: TerminalIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={`terminal-icon ${className}`.trim()}
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
      {...props}
    >
      {iconPaths[name]}
    </svg>
  );
}
