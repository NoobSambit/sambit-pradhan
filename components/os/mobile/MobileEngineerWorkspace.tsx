"use client";

import { useState } from "react";
import { TechIcon } from "@/components/os/TechIcon";
import {
  aboutInfoRows,
  career,
  diagnosticsRows,
  engineeringConfig,
  identityRows,
  stackGroups,
} from "@/data/about";
import { learningNow } from "@/data/dashboard";
import styles from "./MobileHome.module.css";

type EngineerTab = "story" | "system";

export function MobileEngineerWorkspace() {
  const [tab, setTab] = useState<EngineerTab>("story");

  return (
    <>
      <div className={styles.workspaceHead}>
        <div className={styles.workspaceId}>
          <span aria-hidden="true" className={styles.workspaceGlyph}>
            {"<>"}
          </span>
          <span>
            <b>ENGINEER</b>
            <small>~/about</small>
          </span>
        </div>
        <div aria-label="Engineer panes" className={styles.tabs} role="tablist">
          {(
            [
              ["story", "story.md"],
              ["system", "system.conf"],
            ] as Array<[EngineerTab, string]>
          ).map(([id, label]) => (
            <button
              key={id}
              aria-controls={`m-engineer-${id}`}
              aria-selected={tab === id}
              className={tab === id ? `${styles.tab} ${styles.tabActive}` : styles.tab}
              id={`m-engineer-tab-${id}`}
              onClick={() => setTab(id)}
              role="tab"
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {tab === "story" ? (
        <div
          aria-labelledby="m-engineer-tab-story"
          id="m-engineer-story"
          role="tabpanel"
        >
          <article className={styles.panel}>
            <p className={styles.cmdLine}>
              <span className={styles.prompt}>developer@sambit:~/about$</span>{" "}
              cat <span className={styles.pink}>whoami.md</span>
            </p>
            <h2 className={styles.whoami}>WHOAMI</h2>
            <p className={styles.bodyText}>
              I&apos;m a <b className={styles.cyan}>backend engineer</b> and
              2026 CSE graduate. I mostly work on backend-heavy products and
              the system logic that makes them hold together.
            </p>
            <p className={styles.bodyText}>
              I started taking software seriously in{" "}
              <b className={styles.blue}>2023</b>, moving from rebuilding
              existing projects to shipping ideas of my own.
            </p>
            <p className={styles.bodyText}>
              I like projects that get complicated before they get good. I keep
              working through the details after the first version works.
            </p>
            <p className={styles.bodyText}>
              Right now I&apos;m building{" "}
              <b className={styles.pink}>AgentProof</b> and{" "}
              <b className={styles.pink}>Agent Playground</b> while going deeper
              into system design, CLI tooling, and code review systems.
            </p>
          </article>

          <article aria-label="Career history" className={styles.panel}>
            <p className={styles.panelCmd}>
              <span className={styles.blue}>$ git log --career</span>
            </p>
            <ol className={styles.careerList}>
              {career.map(([hash, title, year], index) => {
                const current = index === career.length - 1;
                return (
                  <li
                    className={current ? styles.careerCurrent : undefined}
                    key={hash}
                  >
                    <i aria-hidden="true" />
                    <span className={styles.careerHash}>{hash}</span>
                    <b>{title}</b>
                    <time>{year}</time>
                  </li>
                );
              })}
            </ol>
          </article>

          <article aria-label="Engineering configuration" className={styles.panel}>
            <p className={styles.panelCmd}>
              <span className={styles.blue}>$ cat engineering.conf</span>
            </p>
            <dl className={styles.engConf}>
              {engineeringConfig.map(([key, value]) => (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd>
                    <span aria-hidden="true">=</span> <b>{value}</b>
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
      ) : (
        <div
          aria-labelledby="m-engineer-tab-system"
          id="m-engineer-system"
          role="tabpanel"
        >
          <article aria-label="System identity" className={styles.panel}>
            <p className={styles.cmdLine}>
              <span className={styles.prompt}>
                developer@sambit:~/profile$
              </span>{" "}
              id
            </p>
            <dl className={styles.idRows}>
              {identityRows.map(([key, value]) => (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </article>

          <article aria-label="Working set" className={styles.panel}>
            <p className={styles.panelCmd}>
              <span className={styles.blue}>$ stack --working-set</span>
            </p>
            <div className={styles.stackGrid}>
              {stackGroups.map(([name, packages]) => (
                <section key={name}>
                  <h3>
                    <TechIcon name={name} /> {name}
                  </h3>
                  {packages.map(([pkg, version]) => (
                    <p key={pkg}>
                      <TechIcon name={pkg} />
                      <span>{pkg}</span>
                      <b>{version}</b>
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </article>

          <div className={styles.dualGrid}>
            <article aria-label="Learning now" className={styles.panel}>
              <p className={styles.panelCmd}>
                <span className={styles.amber}>$ learning --now</span>
              </p>
              <dl className={styles.learnRows}>
                {learningNow.map(([label, status]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd
                      className={
                        status === "EXPLORING" ? styles.amber : styles.green
                      }
                    >
                      {status}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
            <article aria-label="Diagnostics" className={styles.panel}>
              <p className={styles.panelCmd}>
                <span className={styles.pink}>$ diagnostics --habits</span>
              </p>
              <dl className={styles.diagRows}>
                {diagnosticsRows.map(([key, value]) => (
                  <div key={key}>
                    <dt>{key}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </div>

          <article aria-label="System info" className={styles.panel}>
            <p className={styles.panelCmd}>
              <span className={styles.blue}>$ info</span>
            </p>
            <dl className={styles.infoGrid}>
              {aboutInfoRows.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
      )}
    </>
  );
}
