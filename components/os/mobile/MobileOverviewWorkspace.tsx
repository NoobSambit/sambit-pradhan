"use client";

import { usePortfolioDataState } from "@/components/os/LivePortfolioData";
import { TerminalIcon } from "@/components/os/TerminalIcon";
import { bootLines } from "@/data/dashboard";
import { profileDetails } from "@/data/about";
import { projects } from "@/data/projects";
import styles from "./MobileHome.module.css";

const profileValues = Object.fromEntries(
  profileDetails.map(([, label, value]) => [label, value]),
) as Record<string, string>;

function padTime(index: number) {
  return `22:42:${String(index + 1).padStart(2, "0")}`;
}

function OverviewQuickStats() {
  const { data, status } = usePortfolioDataState();
  const stats: Array<{ label: string; value: number | undefined }> = [
    { label: "Public Repos", value: data?.github.publicRepositories },
    { label: "Followers", value: data?.github.followers },
    { label: "Contributions", value: data?.github.totalContributions },
    { label: "Stars", value: data?.github.stars },
    { label: "Forks", value: data?.github.forks },
  ];

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
      {stats.map(({ label, value }) => (
        <div className={styles.quickStat} key={label}>
          <strong>{value?.toLocaleString() ?? "—"}</strong>
          <small>{label}</small>
        </div>
      ))}
      {status === "stale" && (
        <p className={styles.staleInline}>cached snapshot</p>
      )}
    </div>
  );
}

export function MobileOverviewWorkspace() {
  const treeNames = projects.map((project) => `${project.id}/`);

  return (
    <>
      <div aria-label="System telemetry" className={styles.telemetryStrip} role="status">
        <span>
          <TerminalIcon name="cpu" />
          <small>
            SYSTEM
            <b className={styles.green}>ONLINE</b>
          </small>
        </span>
        <span>
          <TerminalIcon name="git-branch" />
          <small>
            BRANCH
            <b className={styles.blue}>main</b>
          </small>
        </span>
        <span>
          <TerminalIcon name="terminal" />
          <small>
            SHELL
            <b className={styles.blue}>zsh</b>
          </small>
        </span>
        <span>
          <TerminalIcon name="map-pin" />
          <small>
            REGION
            <b>ap-south-1</b>
          </small>
        </span>
      </div>

      <article aria-labelledby="m-overview-boot" className={styles.panel}>
        <p className={styles.cmdLine} id="m-overview-boot">
          <span className={styles.prompt}>developer@sambit:~/portfolio$</span>{" "}
          ./boot --interactive
        </p>
        <div className={styles.bootLog}>
          {bootLines.map((line, index) => (
            <p key={line}>
              <span className={styles.bootTime}>[{padTime(index)}]</span>
              <span className={styles.bootMsg}>{line}</span>
              <b className={styles.green}>
                OK <span aria-hidden="true">✓</span>
              </b>
            </p>
          ))}
        </div>
        <p className={styles.readyLine}>
          <span className={styles.bootTime}>[22:42:04]</span>
          <span aria-hidden="true">▣</span> SYSTEM READY — Developer Workspace
          Online
        </p>

        <h1 className={styles.heroTitle}>
          I build <em>backend-heavy</em> products, design the systems behind
          them, and keep pushing past the <strong>“good enough”</strong>{" "}
          version.
        </h1>
        <p className={styles.heroSupport}>
          2026 CSE graduate. I mostly work on backend-heavy products and the
          system logic that makes them hold together.
        </p>
        <div className={styles.heroActions}>
          <a className={styles.primaryAction} href="/projects">
            <span aria-hidden="true">›</span> Explore Projects
          </a>
          <a
            className={styles.ghostAction}
            href="https://sambit.dev/resume.pdf"
            rel="noopener noreferrer"
            target="_blank"
          >
            <TerminalIcon name="file-text" /> Download Resume
          </a>
          <a
            className={styles.linkAction}
            href="mailto:sambit.pradhan.dev@gmail.com"
          >
            <span aria-hidden="true">›</span> Contact
          </a>
        </div>

        <OverviewQuickStats />
      </article>

      <article aria-label="Terminal continuation" className={styles.panel}>
        <p className={styles.cmdLine}>
          <span className={styles.prompt}>developer@sambit:~$</span> cat
          currently_building.md
        </p>
        <p className={styles.termText}>
          <b>AgentProof</b>
          <br />
          <span>CLI verification for agent-written code</span>
        </p>
        <p className={styles.termText}>
          <b>Agent Playground</b>
          <br />
          <span>inspectable agents, persistent state, migration work</span>
        </p>
        <p className={styles.cmdLine}>
          <span className={styles.prompt}>developer@sambit:~$</span> git status
        </p>
        <p className={styles.termText}>
          On branch main
          <br />
          Your branch is up to date with &apos;origin/main&apos;.
          <br />
          nothing to commit, working tree clean{" "}
          <span aria-hidden="true" className={styles.green}>
            ✓
          </span>
        </p>
        <p className={styles.cmdLine}>
          <span className={styles.prompt}>developer@sambit:~$</span> tree
          projects/
        </p>
        <p className={styles.treeText}>{treeNames.join("  ")}</p>
      </article>

      <article aria-labelledby="m-overview-profile" className={styles.panel}>
        <p className={styles.panelCmd} id="m-overview-profile">
          <span className={styles.pink}>$ whoami --profile</span>
          <span className={styles.panelOnline}>
            <i aria-hidden="true">●</i> ONLINE
          </span>
        </p>
        <div className={styles.profileBody}>
          <img
            alt="Heisenberg ASCII artwork"
            className={styles.profileImg}
            height={240}
            src="/heisenberg_ascii_pfp.png"
            width={168}
          />
          <div className={styles.profileHead}>
            <h2>Sambit Pradhan</h2>
            <p>Backend Engineer</p>
            <p className={styles.green}>
              <span aria-hidden="true">◂</span> {profileValues.Status}
            </p>
            <p>
              <span aria-hidden="true">○</span> {profileValues.Availability}
            </p>
          </div>
        </div>
        <dl className={styles.profileFacts}>
          {(
            [
              ["Location", profileValues.Location],
              ["Timezone", profileValues.Timezone],
              ["Looking For", profileValues["Looking For"]],
              ["Building Since", profileValues["Building Since"]],
              ["Graduation", profileValues.Graduation],
            ] as Array<[string, string]>
          ).map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </article>

      <div aria-label="Runtime telemetry" className={styles.lowerStrip} role="status">
        <span>
          <TerminalIcon name="cpu" /> CPU <b>15%</b>
        </span>
        <span>
          <TerminalIcon name="memory" /> MEM <b>5.8/16G</b>
        </span>
        <span>
          <TerminalIcon name="git-branch" /> <b className={styles.blue}>main</b>
        </span>
        <span>
          <TerminalIcon name="terminal" /> <b className={styles.blue}>zsh</b>
        </span>
        <span className={styles.green}>
          <i aria-hidden="true">●</i> ONLINE
        </span>
      </div>
    </>
  );
}
