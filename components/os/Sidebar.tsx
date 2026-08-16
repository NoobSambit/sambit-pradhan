"use client";

import { systemGroups } from "@/data/dashboard";
import { useEffect, useState } from "react";

type SystemState = {
  cpu: string;
  memory: string;
  network: string;
  levels: { cpu: number; memory: number; network: number };
};

function StatusText({ value }: { value: string }) {
  if (!value.includes("●")) return value;
  const [before, after = ""] = value.split("●");
  return (
    <>
      {before}
      <span className="status-dot">●</span>
      {after}
    </>
  );
}

export function Sidebar() {
  const [system, setSystem] = useState<SystemState>({
    cpu: "12%",
    memory: "5.4 GB / 16 GB",
    network: "1.2 KB/s",
    levels: { cpu: 0.38, memory: 0.34, network: 0.4 },
  });
  const [telemetryRevision, setTelemetryRevision] = useState(0);
  useEffect(() => {
    const refresh = () => {
      const cpu = 9 + Math.floor(Math.random() * 8);
      const memory = 5 + Math.random() * 0.9;
      const network = 0.4 + Math.random() * 2.1;
      setSystem({
        cpu: `${cpu}%`,
        memory: `${memory.toFixed(1)} GB / 16 GB`,
        network: `${network.toFixed(1)} KB/s`,
        levels: { cpu: cpu / 100, memory: memory / 16, network: network / 3 },
      });
      setTelemetryRevision((revision) => revision + 1);
    };
    refresh();
    let interval: number | undefined = window.setInterval(refresh, 5000);
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        if (interval !== undefined) window.clearInterval(interval);
        interval = undefined;
        return;
      }
      refresh();
      if (interval === undefined) interval = window.setInterval(refresh, 5000);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      if (interval !== undefined) window.clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);
  return (
    <aside className="sidebar">
      {systemGroups.map((group) => (
        <section className="side-group" key={group.title}>
          <h2>{group.title}</h2>
          {group.items.map(([icon, label, initialValue]) => {
            const value =
              label === "CPU"
                ? system.cpu
                : label === "Memory"
                  ? system.memory
                  : label === "Network"
                    ? system.network
                    : initialValue;
            return (
              <div
                className="side-row"
                data-motion-refresh={
                  ["CPU", "Memory", "Network"].includes(label)
                    ? telemetryRevision
                    : undefined
                }
                key={label}
              >
                <span className="side-label">
                  <em>{icon}</em>
                  {label}
                </span>
                <b
                  data-motion-refresh={
                    ["CPU", "Memory", "Network"].includes(label)
                      ? telemetryRevision
                      : undefined
                  }
                  className={
                    value.includes("●") || value === "Synced"
                      ? "green"
                      : value === "main" ||
                          value === "~/portfolio" ||
                          value === "zsh"
                        ? "blue"
                        : ""
                  }
                >
                  <StatusText value={value} />
                </b>
                {["Memory", "Disk", "Network"].includes(label) && (
                  <i className="meter">
                    <span
                      style={
                        {
                          "--meter-level":
                            label === "Memory"
                              ? system.levels.memory
                              : label === "Network"
                                ? Math.min(system.levels.network, 1)
                                : 0.29,
                        } as React.CSSProperties
                      }
                    />
                  </i>
                )}
              </div>
            );
          })}
        </section>
      ))}
      <div className="side-social">
        <span>◉</span>
        <span>◉</span>
        <span>◉</span>
        <span>▣</span>
      </div>
    </aside>
  );
}
