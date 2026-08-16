"use client";

import { useEffect, useState } from "react";

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
}

export function Header({
  mode = "home",
}: {
  mode?: "home" | "about" | "skills" | "projects";
}) {
  const [time, setTime] = useState("--:--:--");
  const [telemetryRevision, setTelemetryRevision] = useState(0);
  const [system, setSystem] = useState({
    cpu: 12,
    memory: 34,
    network: "1.2 KB/s",
  });

  useEffect(() => {
    const refreshTime = () => setTime(formatTime(new Date()));
    refreshTime();
    let interval: number | undefined = window.setInterval(refreshTime, 1000);
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        if (interval !== undefined) window.clearInterval(interval);
        interval = undefined;
        return;
      }
      refreshTime();
      if (interval === undefined) interval = window.setInterval(refreshTime, 1000);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      if (interval !== undefined) window.clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const returnToProjectsRoot = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname !== "/projects") return;

    event.preventDefault();
    window.location.assign("/projects?view=repositories");
  };

  useEffect(() => {
    const refreshSystem = () => {
      setSystem({
        cpu: 9 + Math.floor(Math.random() * 8),
        memory: 31 + Math.floor(Math.random() * 8),
        network: `${(0.5 + Math.random() * 1.8).toFixed(1)} KB/s`,
      });
      setTelemetryRevision((revision) => revision + 1);
    };
    refreshSystem();
    let interval: number | undefined = window.setInterval(refreshSystem, 5000);
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        if (interval !== undefined) window.clearInterval(interval);
        interval = undefined;
        return;
      }
      refreshSystem();
      if (interval === undefined) interval = window.setInterval(refreshSystem, 5000);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      if (interval !== undefined) window.clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <header className="topbar">
      <div className="brand">
        <span className="traffic" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="brand-terminal">›_</span>
        <strong>Sambit OS</strong>
      </div>
      <nav className="primary-nav" aria-label="Portfolio sections">
        <a className={mode === "home" ? "active" : ""} href="/">
          Overview
        </a>
        <a
          className={mode === "projects" ? "active" : ""}
          href="/projects"
          onClick={returnToProjectsRoot}
        >
          Projects
        </a>
        <a className={mode === "about" ? "active" : ""} href="/about">
          About
        </a>
        <a className={mode === "skills" ? "active" : ""} href="/skills">
          Skills
        </a>
        <a aria-disabled="true">Experience</a>
        <a aria-disabled="true">Terminal</a>
        <a aria-disabled="true">Logs</a>
      </nav>
      <div className="top-tools">
        <div className="search" tabIndex={0} role="search">
          ⌘K Search Portfolio...　⌕
        </div>
        <span>
          ☁
          <small>
            CPU
            <br />
            <b data-motion-refresh={telemetryRevision}>{system.cpu}%</b>
          </small>
        </span>
        <span>
          ⌁
          <small>
            MEM
            <br />
            <b data-motion-refresh={telemetryRevision}>{system.memory}%</b>
          </small>
        </span>
        <span>
          ⌁
          <small>
            NET
            <br />
            <b data-motion-refresh={telemetryRevision}>{system.network}</b>
          </small>
        </span>
        <time>◷　{time}</time>
      </div>
    </header>
  );
}
