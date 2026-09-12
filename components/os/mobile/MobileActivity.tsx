"use client";

import { usePortfolioDataState } from "@/components/os/LivePortfolioData";
import { TerminalIcon } from "@/components/os/TerminalIcon";
import styles from "./MobileHome.module.css";

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

export function MobileQuickStats() {
  const { data, status } = usePortfolioDataState();
  const stats = [
    ["Public repos", data?.github.publicRepositories],
    ["Contributions", data?.github.totalContributions],
    ["Followers", data?.github.followers],
  ] as const;

  return (
    <div
      aria-label={
        status === "loading"
          ? "Live portfolio statistics loading"
          : status === "error"
            ? "Live portfolio statistics unavailable"
            : status === "stale"
              ? "Cached portfolio statistics"
              : "Live portfolio statistics"
      }
      className={styles.quickStats}
      data-state={status}
    >
      {stats.map(([label, value]) => (
        <span key={label}>
          <strong>{value?.toLocaleString() ?? "—"}</strong>
          <small>{label}</small>
        </span>
      ))}
    </div>
  );
}

export function MobileActivity() {
  const { data, status } = usePortfolioDataState();
  const latestCommit = data?.github.commits[0];

  return (
    <section
      aria-labelledby="mobile-activity-title"
      className={`${styles.section} ${styles.activity}`}
    >
      <h2 id="mobile-activity-title">$ activity --live</h2>

      {status === "loading" && (
        <div aria-live="polite" className={styles.activityMessage}>
          <span className={styles.statusDot} aria-hidden="true" />
          Connecting to GitHub and LeetCode…
        </div>
      )}

      {status === "error" && (
        <div aria-live="polite" className={styles.activityUnavailable}>
          <TerminalIcon name="activity" />
          <span>
            <strong>Live activity temporarily unavailable</strong>
            <small>The live data service is not configured right now.</small>
          </span>
          <a
            href="https://github.com/NoobSambit"
            rel="noreferrer"
            target="_blank"
          >
            Repository data still available →
          </a>
        </div>
      )}

      {data && (
        <>
          <div className={styles.activityGrid}>
            <div>
              <span>GitHub</span>
              <strong>
                {data.github.allTimeContributions.toLocaleString()}
              </strong>
              <small>contributions overall</small>
            </div>
            <div>
              <span>LeetCode</span>
              <strong>{data.leetCode ? data.leetCode.streak : "—"}</strong>
              <small>
                {data.leetCode ? "day streak" : "source unavailable"}
              </small>
            </div>
          </div>
          {latestCommit && (
            <a
              className={styles.latestCommit}
              href="https://github.com/NoobSambit/sambit-pradhan/commits/main"
              rel="noreferrer"
              target="_blank"
            >
              <TerminalIcon name="git-branch" />
              <span>
                <small>Latest commit · {relativeTime(latestCommit.date)}</small>
                <strong>{latestCommit.message}</strong>
              </span>
              <b aria-hidden="true">→</b>
            </a>
          )}
          {status === "stale" && (
            <p aria-live="polite" className={styles.staleNote}>
              Cached snapshot · live refresh unavailable
            </p>
          )}
        </>
      )}
    </section>
  );
}
