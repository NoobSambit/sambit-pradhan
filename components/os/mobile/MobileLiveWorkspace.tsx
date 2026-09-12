"use client";

import { useState } from "react";
import { usePortfolioDataState } from "@/components/os/LivePortfolioData";
import { TerminalIcon } from "@/components/os/TerminalIcon";
import styles from "./MobileHome.module.css";

type LiveTab = "activity" | "project";
type Day = { date: string; count: number };

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function relativeTime(value: string) {
  const seconds = Math.max(
    0,
    Math.floor((Date.now() - new Date(value).getTime()) / 1000),
  );
  if (seconds < 60) return "now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return `${Math.floor(seconds / 604800)}w ago`;
}

function heatLevel(count: number) {
  if (count <= 0) return styles.heat0;
  if (count === 1) return styles.heat1;
  if (count <= 3) return styles.heat2;
  return styles.heat3;
}

function monthLabels(days: Day[]) {
  const seen: string[] = [];
  for (const day of days) {
    const date = new Date(day.date);
    if (Number.isNaN(date.getTime())) continue;
    const label = MONTHS[date.getMonth()];
    if (!seen.includes(label)) seen.push(label);
  }
  if (seen.length === 0) return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  if (seen.length > 8) {
    const step = seen.length / 8;
    return Array.from({ length: 8 }, (_, i) => seen[Math.floor(i * step)]);
  }
  return seen;
}

function Heatmap({
  days,
  name,
  summary,
}: {
  days: Day[];
  name: string;
  summary: string;
}) {
  const labels = monthLabels(days);
  return (
    <section aria-label={`${name} activity heatmap`} className={styles.heatCard}>
      <header>
        <span aria-hidden="true" className={styles.heatCaret}>
          ›
        </span>
        <b>{name}</b>
        <span className={styles.heatSummary}>
          <i aria-hidden="true">●</i> {summary}
        </span>
      </header>
      <div aria-hidden="true" className={styles.heatMonths}>
        {labels.map((label) => (
          <small key={label}>{label}</small>
        ))}
      </div>
      <div
        aria-label={`${name}: ${summary}`}
        className={styles.heatGrid}
        role="img"
      >
        {days.length === 0
          ? Array.from({ length: 217 }).map((_, index) => (
              <i className={styles.heat0} key={index} />
            ))
          : days.map((day) => (
              <i
                className={heatLevel(day.count)}
                key={day.date}
                title={`${day.date}: ${day.count}`}
              />
            ))}
      </div>
      <footer>
        <span>Latest column: current week</span>
        <span aria-hidden="true" className={styles.heatLegend}>
          Less <i className={styles.heat0} /> <i className={styles.heat1} />{" "}
          <i className={styles.heat2} /> <i className={styles.heat3} /> More
        </span>
      </footer>
    </section>
  );
}

const PIPELINE = [
  ["01", "DISCOVER", "repository + task"],
  ["02", "CONTRACT", "requirements become checks"],
  ["03", "EXECUTE", "controlled tests + attacks"],
  ["04", "CHALLENGE", "independent verification"],
  ["05", "REPORT", "evidence-linked result"],
] as const;

const SURFACE = [
  ["PROVIDER-NEUTRAL", "Codex · Claude · Gemini · OpenCode"],
  ["DURABLE", "resume · cancel · lease safely"],
  ["ISOLATED", "disposable worktrees · no target writes"],
  ["TRACEABLE", "commit-bound evidence graph"],
] as const;

const QUICK_LINKS = [
  {
    icon: "github",
    label: "GitHub",
    value: "github.com/NoobSambit",
    href: "https://github.com/NoobSambit",
    external: true,
  },
  {
    icon: "file-text",
    label: "Resume",
    value: "sambit.dev/resume.pdf",
    href: "https://sambit.dev/resume.pdf",
    external: true,
  },
  {
    icon: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/sambit-pradhan",
    href: "https://linkedin.com/in/sambit-pradhan",
    external: true,
  },
  {
    icon: "mail",
    label: "Email",
    value: "sambit.pradhan.dev@gmail.com",
    href: "mailto:sambit.pradhan.dev@gmail.com",
    external: false,
  },
] as const;

function LiveActivity({ onNext }: { onNext: () => void }) {
  const { data, status } = usePortfolioDataState();
  const githubDays = data?.github.contributionDays ?? [];
  const leetDays = data?.leetCode?.days ?? [];
  const commits = (data?.github.commits ?? []).slice(0, 7);

  return (
    <>
      <div aria-label="Live status" className={styles.liveStrip} role="status">
        <span className={styles.green}>
          <i aria-hidden="true">●</i> LIVE
        </span>
        <span>
          BRANCH <b className={styles.blue}>main</b>
        </span>
        <span>
          STATUS{" "}
          <b className={styles.green}>
            {status === "error" ? "offline" : "synced"}
          </b>
        </span>
        <span>
          RUNTIME <b className={styles.green}>online</b>
        </span>
      </div>

      <article aria-label="Coding activity" className={styles.panel}>
        <p className={styles.panelCmd}>
          <span>$ coding_activity --streaks</span>
        </p>
        {status === "loading" && !data && (
          <p aria-live="polite" className={styles.loadingLine}>
            <span aria-hidden="true" className={styles.pulseDot} />
            Connecting to GitHub and LeetCode…
          </p>
        )}
        {status === "error" && !data ? (
          <div aria-live="polite" className={styles.degraded}>
            <p>
              <b>activity.service OFFLINE</b>
              <span>Live graphs unavailable. Repository metadata below stays readable.</span>
            </p>
            <a
              href="https://github.com/NoobSambit"
              rel="noopener noreferrer"
              target="_blank"
            >
              Open GitHub profile →
            </a>
          </div>
        ) : (
          <>
            <Heatmap
              days={leetDays}
              name="LeetCode"
              summary={
                data?.leetCode ? `${data.leetCode.streak} day streak` : "loading…"
              }
            />
            <Heatmap
              days={githubDays}
              name="GitHub"
              summary={
                data
                  ? `${data.github.allTimeContributions.toLocaleString()} overall`
                  : "loading…"
              }
            />
            {status === "stale" && (
              <p className={styles.staleInline}>cached snapshot · live refresh unavailable</p>
            )}
          </>
        )}
      </article>

      <article aria-label="Recent commits" className={styles.panel}>
        <p className={styles.panelCmd}>
          <span className={styles.blue}>$ git log --graph</span>
          <span className={styles.panelRight}>
            <TerminalIcon name="git-branch" /> main
          </span>
        </p>
        {commits.length === 0 ? (
          <p aria-live="polite" className={styles.loadingLine}>
            <span aria-hidden="true" className={styles.pulseDot} />
            {status === "error"
              ? "Commit log unavailable offline."
              : "Loading repository commits…"}
          </p>
        ) : (
          <ol className={styles.gitGraph}>
            {commits.map((commit) => (
              <li key={commit.sha}>
                <i aria-hidden="true" />
                <span title={commit.message}>{commit.message}</span>
                <time>{relativeTime(commit.date)}</time>
              </li>
            ))}
          </ol>
        )}
        <button className={styles.nextWorkspace} onClick={onNext} type="button">
          <span>
            <b>$ next --workspace</b> active_project
          </span>
          <b className={styles.green}>
            AgentProof BUILDING <span aria-hidden="true">→</span>
          </b>
        </button>
      </article>
    </>
  );
}

function ActiveProject() {
  return (
    <>
      <div aria-label="Active project status" className={styles.liveStrip} role="status">
        <span>
          <i aria-hidden="true" className={styles.greenDot} /> PROJECT{" "}
          <b className={styles.cyan}>AgentProof</b>
        </span>
        <span>
          STATE <b className={styles.green}>BUILDING</b>
        </span>
        <span>
          BRANCH <b className={styles.blue}>main</b>
        </span>
        <span>
          RUNTIME <b className={styles.green}>online</b>
        </span>
      </div>

      <article aria-labelledby="m-live-dossier" className={styles.panel}>
        <p className={styles.panelCmd}>
          <span className={styles.amber}>$ active project</span>
          <span className={styles.panelRight}>
            <i aria-hidden="true" className={styles.greenDot} /> AgentProof ·
            BUILDING
          </span>
        </p>
        <p className={styles.dossierKicker}>
          <TerminalIcon name="folder" /> LOCAL-FIRST / AI-DRIVEN
        </p>
        <h2 className={styles.dossierTitle} id="m-live-dossier">
          AgentProof
        </h2>
        <p className={styles.bodyText}>
          I&apos;m building the verification layer for agent-written software:
          a CLI that turns an agent&apos;s work into a result you can inspect,
          challenge, and replay.
        </p>
        <div className={styles.ioGrid}>
          <div>
            <b>INPUT</b>
            <span>repo · task · audit depth</span>
          </div>
          <div>
            <b>OUTPUT</b>
            <span>report card · replayable evidence</span>
          </div>
        </div>
        <h3 className={styles.sectionLabel}>audit pipeline</h3>
        <ol className={styles.pipelineList}>
          {PIPELINE.map(([step, label, detail]) => (
            <li key={step}>
              <b>{step}</b>
              <strong>{label}</strong>
              <span>{detail}</span>
            </li>
          ))}
        </ol>
        <h3 className={styles.sectionLabel}>engineering surface</h3>
        <div className={styles.surfaceGrid}>
          {SURFACE.map(([label, detail]) => (
            <div key={label}>
              <b>{label}</b>
              <span>{detail}</span>
            </div>
          ))}
        </div>
        <p className={styles.dossierFoot}>
          <span>active project loaded</span>
          <span aria-hidden="true" className={styles.green}>
            ✓
          </span>
          <span>verification layer for agent-written software</span>
        </p>
      </article>

      <article aria-label="Quick links" className={styles.panel}>
        <p className={styles.panelCmd}>
          <span className={styles.blue}>$ quick --links</span>
        </p>
        <nav aria-label="Contact and profile links" className={styles.quickGrid}>
          {QUICK_LINKS.map(({ icon, label, value, href, external }) => (
            <a
              key={label}
              href={href}
              rel={external ? "noopener noreferrer" : undefined}
              target={external ? "_blank" : undefined}
            >
              <TerminalIcon name={icon as "github"} />
              <b>{label}</b>
              <small>{value}</small>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
      </article>

      <div aria-label="Final status" className={styles.finalStrip} role="status">
        <span className={styles.green}>
          <i aria-hidden="true">●</i> Portfolio Online
        </span>
        <span>Open to Work</span>
        <span>IST (UTC+5:30)</span>
        <span className={styles.blue}>main</span>
      </div>
    </>
  );
}

export function MobileLiveWorkspace() {
  const [tab, setTab] = useState<LiveTab>("activity");

  return (
    <>
      <div className={styles.workspaceHead}>
        <div aria-label="Live panes" className={styles.tabs} role="tablist">
          {(
            [
              ["activity", "activity"],
              ["project", "active_project"],
            ] as Array<[LiveTab, string]>
          ).map(([id, label]) => (
            <button
              key={id}
              aria-controls={`m-live-${id}`}
              aria-selected={tab === id}
              className={tab === id ? `${styles.tab} ${styles.tabActive}` : styles.tab}
              id={`m-live-tab-${id}`}
              onClick={() => setTab(id)}
              role="tab"
              type="button"
            >
              <span aria-hidden="true" className={styles.tabCaret}>
                ›
              </span>{" "}
              {label}
            </button>
          ))}
          <span aria-hidden="true" className={styles.tabPlus}>
            +
          </span>
        </div>
      </div>

      {tab === "activity" ? (
        <div aria-labelledby="m-live-tab-activity" id="m-live-activity" role="tabpanel">
          <LiveActivity onNext={() => setTab("project")} />
        </div>
      ) : (
        <div aria-labelledby="m-live-tab-project" id="m-live-project" role="tabpanel">
          <ActiveProject />
        </div>
      )}
    </>
  );
}
