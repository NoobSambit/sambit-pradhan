"use client";

import { useEffect, useState } from "react";
import { TerminalIcon } from "@/components/os/TerminalIcon";
import { MobileOverviewWorkspace } from "./MobileOverviewWorkspace";
import { MobileEngineerWorkspace } from "./MobileEngineerWorkspace";
import { MobileBuildsWorkspace } from "./MobileBuildsWorkspace";
import { MobileLiveWorkspace } from "./MobileLiveWorkspace";
import { MobileGlobalNav } from "./MobileGlobalNav";
import styles from "./MobileHome.module.css";

export type MobileSectionId = "overview" | "engineer" | "builds" | "live";

const SECTION_IDS: MobileSectionId[] = ["overview", "engineer", "builds", "live"];

const CONTEXT_PATH: Record<MobileSectionId, string> = {
  overview: "~/home",
  engineer: "~/about",
  builds: "~/projects",
  live: "~/activity",
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function scrollToSection(id: MobileSectionId) {
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
  try {
    window.history.replaceState(null, "", `#${id}`);
  } catch {
    // Hash is a progressive enhancement; the scroll itself already happened.
  }
}

export function MobileHomeShell() {
  const [activeSection, setActiveSection] =
    useState<MobileSectionId>("overview");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const initial = window.location.hash.replace("#", "");
    if (
      initial === "overview" ||
      initial === "engineer" ||
      initial === "builds" ||
      initial === "live"
    ) {
      setActiveSection(initial);
    }

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (element): element is HTMLElement => element !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        const top = visible[0];
        if (top) {
          const id = top.target.id as MobileSectionId;
          setActiveSection((current) => (current === id ? current : id));
        }
      },
      {
        root: null,
        rootMargin: "-110px 0px -55% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.root}>
      <div aria-hidden="true" className={styles.bgLayer} />
      <header className={styles.topbar}>
        <a aria-label="Sambit OS home" className={styles.brand} href="#overview">
          <span aria-hidden="true" className={styles.brandMark}>
            SP_
          </span>
          <strong className={styles.brandName}>Sambit OS</strong>
        </a>
        <span aria-live="polite" className={styles.contextPath}>
          {CONTEXT_PATH[activeSection]}
        </span>
        <a
          aria-label="Search projects"
          className={styles.searchButton}
          href="#builds"
          onClick={(event) => {
            event.preventDefault();
            scrollToSection("builds");
          }}
        >
          <TerminalIcon name="search" />
        </a>
        <span className={styles.onlinePill}>
          <i aria-hidden="true" />
          ONLINE
        </span>
      </header>

      <nav aria-label="Home workspaces" className={styles.localNav}>
        {SECTION_IDS.map((id) => (
          <a
            key={id}
            aria-current={activeSection === id ? "location" : undefined}
            className={
              activeSection === id
                ? `${styles.localNavLink} ${styles.localNavActive}`
                : styles.localNavLink
            }
            href={`#${id}`}
            onClick={(event) => {
              event.preventDefault();
              scrollToSection(id);
            }}
          >
            {id.toUpperCase()}
          </a>
        ))}
      </nav>

      <div className={styles.content}>
        <section
          aria-label="Overview workspace"
          className={styles.workspace}
          id="overview"
        >
          <MobileOverviewWorkspace />
        </section>
        <section
          aria-label="Engineer workspace"
          className={styles.workspace}
          id="engineer"
        >
          <MobileEngineerWorkspace />
        </section>
        <section
          aria-label="Builds workspace"
          className={styles.workspace}
          id="builds"
        >
          <MobileBuildsWorkspace />
        </section>
        <section aria-label="Live workspace" className={styles.workspace} id="live">
          <MobileLiveWorkspace />
        </section>
      </div>

      <MobileGlobalNav />
    </div>
  );
}
