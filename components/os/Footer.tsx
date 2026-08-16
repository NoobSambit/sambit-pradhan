"use client";

import { LiveFooterCommit } from "@/components/os/LivePortfolioData";
import { TerminalIcon } from "@/components/os/TerminalIcon";

export function Footer({ landing = false }: { landing?: boolean }) {
  return (
    <footer className="statusbar" data-motion-section="footer">
      <span>
        {landing && <TerminalIcon name="terminal" />}
        {landing ? "Sambit OS v2.0.0" : "⊠ Sambit OS v2.0.0"}
      </span>
      <span>Build 2024.05.18-22.41</span>
      <span>Branch main</span>
      <LiveFooterCommit />
      <span>Latest Deploy —</span>
      <span>Resume v2.1.pdf</span>
      <span>
        Latency <b>41ms</b>
      </span>
      <span>Uptime 7d 14h 22m</span>
      <strong>
        {landing ? (
          <TerminalIcon name="check-circle" />
        ) : (
          <i className="status-dot">●</i>
        )}{" "}
        All Systems Operational
      </strong>
    </footer>
  );
}
