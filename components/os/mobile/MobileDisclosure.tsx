"use client";

import { useState, type ReactNode } from "react";
import styles from "./MobileHome.module.css";

type MobileDisclosureProps = {
  children: ReactNode;
  className?: string;
  contentId: string;
  hideLabel: string;
  showLabel: string;
};

export function MobileDisclosure({
  children,
  className = "",
  contentId,
  hideLabel,
  showLabel,
}: MobileDisclosureProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`${styles.disclosure} ${className}`.trim()}>
      <button
        aria-controls={contentId}
        aria-expanded={expanded}
        className={styles.disclosureButton}
        onClick={() => setExpanded((current) => !current)}
        type="button"
      >
        <span aria-hidden="true">{expanded ? "⌄" : "▸"}</span>
        {expanded ? hideLabel : showLabel}
      </button>
      <div
        className={styles.disclosureContent}
        hidden={!expanded}
        id={contentId}
      >
        {children}
      </div>
    </div>
  );
}
