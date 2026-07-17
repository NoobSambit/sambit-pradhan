"use client";

import { systemGroups } from "@/data/dashboard";
import { useEffect, useState } from "react";

export function Sidebar() {
  const [system, setSystem] = useState({ cpu: "12%", memory: "5.4 GB / 16 GB", network: "1.2 KB/s" });
  useEffect(() => {
    const refresh = () => setSystem({ cpu: `${9 + Math.floor(Math.random() * 8)}%`, memory: `${(5 + Math.random() * 0.9).toFixed(1)} GB / 16 GB`, network: `${(0.4 + Math.random() * 2.1).toFixed(1)} KB/s` });
    refresh();
    const interval = window.setInterval(refresh, 5000);
    return () => window.clearInterval(interval);
  }, []);
  return (
    <aside className="sidebar">
      {systemGroups.map((group) => <section className="side-group" key={group.title}><h2>{group.title}</h2>{group.items.map(([icon, label, initialValue]) => { const value = label === "CPU" ? system.cpu : label === "Memory" ? system.memory : label === "Network" ? system.network : initialValue; return <div className="side-row" key={label}><span className="side-label"><em>{icon}</em>{label}</span><b className={value.includes("●") || value === "Synced" ? "green" : value === "main" || value === "~/portfolio" || value === "zsh" ? "blue" : ""}>{value}</b>{["Memory", "Disk", "Network"].includes(label) && <i className="meter"><span /></i>}</div>; })}</section>)}
      <div className="side-social"><span>◉</span><span>◉</span><span>◉</span><span>▣</span></div>
    </aside>
  );
}
