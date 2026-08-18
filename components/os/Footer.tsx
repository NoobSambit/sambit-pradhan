"use client";

import { LiveFooterCommit } from "@/components/os/LivePortfolioData";
import { TerminalIcon } from "@/components/os/TerminalIcon";

export function Footer({ landing = false }: { landing?: boolean }) {
  return (
    <footer className="statusbar" data-motion-section="footer">
      <span>
        {landing && <TerminalIcon name="terminal" />}
        {landing ? "Sambit OS v2.0" : "⊠ Sambit OS v2.0"}
      </span>
      <span>2026 CSE Graduate</span>
      <span>Branch main</span>
      <LiveFooterCommit />
      <span>Open to Work</span>
      <span>Resume.pdf</span>
      <span>Kolkata, India</span>
      <span>IST UTC+5:30</span>
      <strong>
        {landing ? (
          <TerminalIcon name="check-circle" />
        ) : (
          <i className="status-dot">●</i>
        )}{" "}
        Portfolio Online
      </strong>
    </footer>
  );
}
