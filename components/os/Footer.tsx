"use client";

import { LiveFooterCommit } from "@/components/os/LivePortfolioData";

export function Footer() {
  return (
    <footer className="statusbar">
      <span>⊠ Sambit OS v2.0.0</span>
      <span>Build 2024.05.18-22.41</span>
      <span>Branch main</span>
      <LiveFooterCommit />
      <span>Latest Deploy —</span>
      <span>Resume v2.1.pdf</span>
      <span>
        Latency <b>41ms</b>
      </span>
      <span>Uptime 7d 14h 22m</span>
      <strong>● All Systems Operational</strong>
    </footer>
  );
}
