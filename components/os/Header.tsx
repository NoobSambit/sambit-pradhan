"use client";

import { useEffect, useState } from "react";

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }).format(date);
}

export function Header({ mode = "overview" }: { mode?: "overview" | "about" }) {
  const isAbout = mode === "about";
  const [time, setTime] = useState("--:--:--");
  const [system, setSystem] = useState({ cpu: 12, memory: 34, network: "1.2 KB/s" });

  useEffect(() => {
    const refreshTime = () => setTime(formatTime(new Date()));
    refreshTime();
    const interval = window.setInterval(refreshTime, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const refreshSystem = () => setSystem({ cpu: 9 + Math.floor(Math.random() * 8), memory: 31 + Math.floor(Math.random() * 8), network: `${(0.5 + Math.random() * 1.8).toFixed(1)} KB/s` });
    refreshSystem();
    const interval = window.setInterval(refreshSystem, 5000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <header className="topbar">
      <div className="brand"><span className="traffic"><i /><i /><i /></span><span className="brand-terminal">›_</span><strong>Sambit OS</strong></div>
      {isAbout ? <nav className="primary-nav" aria-label="Portfolio sections"><a>Overview</a><a>Projects</a><a className="active">About</a><a>Experience</a><a>Terminal</a><a>System</a><a>Logs</a></nav> : <div className="top-meta"><span>Workspace<b>Developer Workspace</b></span><span>Branch<b>main</b></span><span>Git Status<b className="green">Synced　●</b></span><span>Environment<b className="green">Production　●</b></span></div>}
      <div className="top-tools"><div className="search">⌘K Search Portfolio...　⌕</div><span>☁<small>CPU<br /><b>{system.cpu}%</b></small></span><span>⌁<small>MEM<br /><b>{system.memory}%</b></small></span><span>⌁<small>NET<br /><b>{system.network}</b></small></span><time>◷　{time}</time></div>
    </header>
  );
}
