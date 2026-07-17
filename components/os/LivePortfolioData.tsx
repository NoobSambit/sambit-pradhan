"use client";

import { useEffect, useState } from "react";

type Day = { date: string; count: number };
type Commit = { sha: string; message: string; date: string };
type PortfolioData = {
  generatedAt: string;
  github: { contributionDays: Day[]; totalContributions: number; allTimeContributions: number; publicRepositories: number; followers: number; branch: string; stars: number; forks: number; latestRelease: { tagName: string; publishedAt: string } | null; commits: Commit[] };
  leetCode: { days: Day[]; streak: number; totalActiveDays: number } | null;
};

let dataPromise: Promise<PortfolioData> | null = null;

function loadPortfolioData() {
  dataPromise ??= fetch("/api/portfolio-data").then(async (response) => {
    if (!response.ok) throw new Error("Live portfolio data is unavailable.");
    return response.json() as Promise<PortfolioData>;
  });
  return dataPromise;
}

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData | null>(null);
  useEffect(() => { loadPortfolioData().then(setData).catch(() => undefined); }, []);
  return data;
}

function relativeTime(value: string) {
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 1000));
  if (seconds < 60) return "now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return `${Math.floor(seconds / 604800)}w ago`;
}

function activityClass(count: number) {
  if (count === 0) return "quiet";
  if (count >= 4) return "bright";
  return "active";
}

function ActivityGraph({ icon, name, label, days }: { icon: string; name: string; label: string; days: Day[] }) {
  return <article><header><i>{icon}</i><b>{name}</b><span>● {label}</span></header><div className="streak-months"><small>Jul</small><small>Sep</small><small>Nov</small><small>Jan</small><small>Mar</small><small>May</small><small>Jul</small></div><div className="streak-calendar">{days.length ? days.map((day) => <i className={activityClass(day.count)} title={`${day.date}: ${day.count}`} key={day.date} />) : Array.from({ length: 364 }).map((_, index) => <i className="quiet" key={index} />)}</div><footer><b>Latest column: current week</b><span>Less　▦ ▦ ▦ ▦　More</span></footer></article>;
}

export function LiveActivityStreaks() {
  const data = usePortfolioData();
  const githubDays = data?.github.contributionDays ?? [];
  const leetDays = data?.leetCode?.days ?? [];
  const githubLabel = data ? `${data.github.allTimeContributions.toLocaleString()} overall` : "Loading GitHub";
  const leetLabel = data?.leetCode ? `${data.leetCode.streak} day streak` : "Loading LeetCode";
  return <div className="streaks-content"><ActivityGraph icon="⌁" name="LeetCode" label={leetLabel} days={leetDays} /><ActivityGraph icon="◉" name="GitHub" label={githubLabel} days={githubDays} /></div>;
}

export function LiveGitLog() {
  const data = usePortfolioData();
  const commits = data?.github.commits ?? [];
  return <>{commits.length ? commits.map((commit) => <div key={commit.sha}><i>●</i><span>{commit.message}</span><small>{relativeTime(commit.date)}</small></div>) : <div><i>●</i><span>Loading repository commits...</span><small>—</small></div>}</>;
}

export function LiveQuickStats() {
  const data = usePortfolioData();
  return <div className="quick-stats"><span>⌘<b>Public Repos<br />{data?.github.publicRepositories ?? "—"}</b></span><span>◉<b>Followers<br />{data?.github.followers ?? "—"}</b></span><span>▦<b>Contributions<br />{data?.github.totalContributions ?? "—"}</b></span><span>☆<b>Stars<br />{data?.github.stars ?? "—"}</b></span><span>⌘<b>Forks<br />{data?.github.forks ?? "—"}</b></span></div>;
}

export function LiveRelease() {
  const data = usePortfolioData();
  const release = data?.github.latestRelease;
  return <>{release ? <><p><b>{release.tagName}　<span className="green">●　(Latest)</span></b></p><div><span>Released</span><b>{relativeTime(release.publishedAt)}</b></div><div><span>Source</span><b>GitHub Releases</b></div><div><span>Status</span><b className="green">● Published</b></div></> : <p className="release-empty">{data ? "No GitHub release published yet." : "Loading latest GitHub release..."}</p>}<a href="https://github.com/NoobSambit/sambit-pradhan/releases" target="_blank" rel="noreferrer">View all releases →</a></>;
}

export function LiveFooterCommit() {
  const data = usePortfolioData();
  const latest = data?.github.commits[0];
  return <span>Latest Commit {latest ? relativeTime(latest.date) : "—"}</span>;
}
