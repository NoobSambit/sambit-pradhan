"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  careerBranches,
  careerMilestones,
  careerNow,
  careerStories,
  careerToml,
  currentCareerLearning,
  engineeringEvolution,
  learningTimeline,
  type BuildStory,
  type BuildStorySection,
} from "@/data/career-history";
import { MobileGlobalNav } from "@/components/os/mobile/MobileGlobalNav";
import { TerminalIcon } from "@/components/os/TerminalIcon";
import styles from "./MobileCareerHistory.module.css";

type MobileCareerView = "log" | "commit" | "evolution" | "context";
type StoryReturnView = "commit" | "context";

const LOG_INITIAL_COUNT = 5;
const SYMBOLIC_HEAD_HASH = "c0de208";

function markerForTone(tone: BuildStorySection["tone"]): string {
  if (tone === "positive") return "✓";
  if (tone === "timeline") return "●";
  if (tone === "danger") return "×";
  if (tone === "warning") return "!";
  return "→";
}

function MobileStorySection({ section }: { section: BuildStorySection }) {
  const tone = section.tone ?? "neutral";
  const marker = markerForTone(section.tone);

  if (section.kind === "metadata") {
    const rows = section.content as ReadonlyArray<readonly [string, string]>;
    return (
      <section className={styles.storySection} data-tone={tone} aria-label={section.title}>
        <h3>{section.title}</h3>
        <dl>
          {rows.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    );
  }

  if (section.kind === "text") {
    const lines = section.content as readonly string[];
    return (
      <section className={styles.storySection} data-tone={tone} aria-label={section.title}>
        <h3>{section.title}</h3>
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </section>
    );
  }

  const lines = section.content as readonly string[];
  return (
    <section className={styles.storySection} data-tone={tone} aria-label={section.title}>
      <h3>{section.title}</h3>
      <ul>
        {lines.map((line) => (
          <li key={line}>
            <span className={styles.marker} aria-hidden="true">
              {marker}
            </span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PromptLine({ command }: { command: string }) {
  const [pathPart, ...rest] = command.split("$");
  return (
    <p className={styles.promptLine}>
      <span className={styles.promptUser}>developer@sambit:</span>
      <span className={styles.promptPath}>{pathPart.trim() === "" ? "~/builds" : pathPart}</span>
      $ {rest.join("$").trim()}
    </p>
  );
}

export function MobileCareerHistoryWorkspace({
  onOpenEngineer,
}: {
  onOpenEngineer: () => void;
}) {
  const [view, setView] = useState<MobileCareerView>("log");
  const [selectedId, setSelectedId] = useState(careerMilestones[0].id);
  const [storyId, setStoryId] = useState<string | null>(null);
  const [storyReturnView, setStoryReturnView] = useState<StoryReturnView>("commit");
  const [logExpanded, setLogExpanded] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const selected = useMemo(
    () => careerMilestones.find((m) => m.id === selectedId) ?? careerMilestones[0],
    [selectedId],
  );
  const activeStory: BuildStory | null = useMemo(
    () => careerStories.find((s) => s.id === storyId) ?? null,
    [storyId],
  );

  const selectedIndex = useMemo(
    () => careerMilestones.findIndex((m) => m.id === selected.id),
    [selected],
  );
  const prevMilestone = selectedIndex > 0 ? careerMilestones[selectedIndex - 1] : undefined;
  const nextMilestone =
    selectedIndex < careerMilestones.length - 1 ? careerMilestones[selectedIndex + 1] : undefined;

  const storyIndex = useMemo(
    () => (activeStory ? careerStories.findIndex((s) => s.id === activeStory.id) : -1),
    [activeStory],
  );
  const prevStory = storyIndex > 0 ? careerStories[storyIndex - 1] : undefined;
  const nextStory =
    storyIndex >= 0 && storyIndex < careerStories.length - 1
      ? careerStories[storyIndex + 1]
      : undefined;

  const storyMilestone = useMemo(
    () =>
      activeStory
        ? (careerMilestones.find((m) => m.id === activeStory.milestoneId) ?? null)
        : null,
    [activeStory],
  );

  const visibleMilestones = logExpanded
    ? careerMilestones
    : careerMilestones.slice(0, LOG_INITIAL_COUNT);
  const hiddenCount = careerMilestones.length - visibleMilestones.length;

  const scrollTop = () => {
    rootRef.current?.scrollTo({ top: 0 });
  };

  useEffect(() => {
    if (!storyId) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setStoryId(null);
        setView(storyReturnView);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [storyId, storyReturnView]);

  const selectMilestoneGoCommit = (id: string) => {
    setSelectedId(id);
    setStoryId(null);
    setView("commit");
    requestAnimationFrame(scrollTop);
  };

  const openStory = (id: string, from: StoryReturnView, opener?: HTMLElement | null) => {
    const story = careerStories.find((s) => s.id === id);
    if (!story) return;
    if (opener) openerRef.current = opener;
    setSelectedId(story.milestoneId);
    setStoryReturnView(from);
    setStoryId(id);
    requestAnimationFrame(scrollTop);
  };

  const closeStory = () => {
    setStoryId(null);
    setView(storyReturnView);
    const opener = openerRef.current;
    openerRef.current = null;
    requestAnimationFrame(() => {
      scrollTop();
      opener?.focus?.();
    });
  };

  const goStory = (id: string) => {
    const story = careerStories.find((s) => s.id === id);
    if (!story) return;
    setSelectedId(story.milestoneId);
    setStoryId(id);
    requestAnimationFrame(scrollTop);
  };

  const changeView = (next: MobileCareerView) => {
    setView(next);
    requestAnimationFrame(scrollTop);
  };

  const storyCount = careerStories.length;
  const learningCount = learningTimeline.length;

  return (
    <div ref={rootRef} className={styles.root} aria-label="Mobile Build History workspace">
      <div aria-hidden="true" className={styles.bgLayer} />

      <div className={styles.chrome}>
        <header className={styles.topbar}>
          <span className={styles.brand}>
            <span aria-hidden="true" className={styles.brandMark}>
              SP_
            </span>
            <strong className={styles.brandName}>Sambit OS</strong>
          </span>
          <span className={styles.contextPath}>~/about</span>
          <button type="button" className={styles.searchButton} aria-label="Search">
            <TerminalIcon name="search" />
          </button>
          <span className={styles.onlinePill}>
            <i aria-hidden="true" />ONLINE
          </span>
        </header>

        <div className={styles.switcher} role="group" aria-label="About workspace">
          <button type="button" onClick={onOpenEngineer}>
            <TerminalIcon name="terminal" />
            ENGINEER
          </button>
          <button type="button" className={styles.switcherActive} aria-current="page">
            <TerminalIcon name="git-branch" />
            BUILD HISTORY
          </button>
        </div>

        {activeStory ? (
          <div className={styles.storyToolbar} aria-label="Build story navigation">
            <button type="button" onClick={closeStory} aria-label="Back to history">
              ← HISTORY
            </button>
            <span className={styles.storyPath}>story/{activeStory.id}</span>
            <span className={styles.storyCount}>
              {String(storyIndex + 1).padStart(2, "0")} / {String(storyCount).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => prevStory && goStory(prevStory.id)}
              disabled={!prevStory}
              aria-label={prevStory ? `Previous story ${prevStory.title}` : "No previous story"}
            >
              ‹ PREV
            </button>
            <button
              type="button"
              onClick={() => nextStory && goStory(nextStory.id)}
              disabled={!nextStory}
              aria-label={nextStory ? `Next story ${nextStory.title}` : "No next story"}
            >
              NEXT ›
            </button>
            <button type="button" onClick={closeStory} aria-label="Close build story">
              ×
            </button>
          </div>
        ) : (
          <nav className={styles.tabs} role="tablist" aria-label="Build history views">
            {(
              [
                { id: "log", label: "LOG", icon: "file-text" },
                { id: "commit", label: "COMMIT", icon: "git-branch" },
                { id: "evolution", label: "EVOLUTION", icon: "activity" },
                { id: "context", label: "CONTEXT", icon: "folder" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={view === tab.id}
                aria-controls={`m-career-panel-${tab.id}`}
                className={view === tab.id ? styles.tabActive : undefined}
                onClick={() => changeView(tab.id)}
              >
                <TerminalIcon name={tab.icon} />
                {tab.label}
              </button>
            ))}
          </nav>
        )}
      </div>

      <div className={styles.content}>
        {activeStory ? (
          <div role="tabpanel" aria-label={`${activeStory.title} build story`}>
            <section className={styles.panel} aria-label="Build story">
              <PromptLine command={`~/builds$ git show --story story/${activeStory.id}`} />
              <div className={styles.storyKicker}>
                <span>✦ STORY</span>
                <span>
                  {storyMilestone?.period ?? activeStory.milestoneId}
                  <br />
                  story/{activeStory.id}
                </span>
              </div>
              <h2 className={styles.storyTitle}>{activeStory.title}</h2>
              <p className={styles.storySubtitle}>{activeStory.subtitle}</p>
              <div className={styles.tagRow} aria-label="Story topics">
                {activeStory.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              {(activeStory.links?.live || activeStory.links?.repo) && (
                <div className={styles.storyLinks}>
                  {activeStory.links.live && (
                    <a href={activeStory.links.live} target="_blank" rel="noreferrer">
                      Live ↗
                    </a>
                  )}
                  {activeStory.links.repo && (
                    <a href={activeStory.links.repo} target="_blank" rel="noreferrer">
                      Repo ↗
                    </a>
                  )}
                </div>
              )}
              {storyMilestone && (
                <dl className={styles.storyMeta} aria-label="Story context metadata">
                  {storyMilestone.metadata.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {activeStory.sections.map((section) => (
                <MobileStorySection key={section.title} section={section} />
              ))}
              <section className={styles.storySection} data-tone="neutral" aria-label="Closing commit">
                <h3>COMMIT MESSAGE</h3>
                <p>
                  <strong>
                    {activeStory.closingCommit.type}: {activeStory.closingCommit.title}
                  </strong>
                </p>
                <ul>
                  {activeStory.closingCommit.lines.map((line) => (
                    <li key={line}>
                      <span className={styles.marker} aria-hidden="true">
                        →
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <div className={styles.prevNext}>
                <button
                  type="button"
                  onClick={() => prevStory && goStory(prevStory.id)}
                  disabled={!prevStory}
                >
                  ← PREVIOUS STORY
                  <b>{prevStory?.title ?? "—"}</b>
                </button>
                <button
                  type="button"
                  onClick={() => nextStory && goStory(nextStory.id)}
                  disabled={!nextStory}
                >
                  NEXT STORY →
                  <b>{nextStory?.title ?? "—"}</b>
                </button>
              </div>
            </section>

            <section className={styles.panel} aria-label="Story load status">
              <div className={styles.storyFoot}>
                <i aria-hidden="true" />
                <span>
                  story/{activeStory.id} loaded ✓ {activeStory.descriptor}
                </span>
              </div>
            </section>
          </div>
        ) : view === "log" ? (
          <div id="m-career-panel-log" role="tabpanel" aria-label="Build log">
            <div className={styles.statusStrip} aria-label="Repository status">
              <span>
                <TerminalIcon name="git-branch" /> main
              </span>
              <span className={styles.statusGreen}>HEAD → {SYMBOLIC_HEAD_HASH}</span>
              <span>{storyCount} stories</span>
              <span className={styles.statusGreen}>clean ✓</span>
            </div>

            <section className={styles.panel} aria-label="Git history">
              <PromptLine command="~/builds$ git log --graph --all" />
              <ol className={styles.logList}>
                {visibleMilestones.map((milestone) => {
                  const isSelected = milestone.id === selected.id;
                  return (
                    <li key={milestone.id}>
                      <button
                        type="button"
                        className={`${styles.logRow} ${isSelected ? styles.logSelected : ""}`}
                        aria-pressed={isSelected}
                        onClick={() => selectMilestoneGoCommit(milestone.id)}
                      >
                        <i aria-hidden="true" />
                        <small>{milestone.period}</small>
                        <span className={styles.logRef}>
                          {milestone.state === "head" ? "HEAD → main" : milestone.ref}
                        </span>
                        <b>{milestone.detailTitle ?? milestone.title}</b>
                        <span>{milestone.subtitle}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
              {hiddenCount > 0 ? (
                <button
                  type="button"
                  className={styles.moreCommits}
                  onClick={() => setLogExpanded(true)}
                >
                  ∨ {hiddenCount} more commits...
                </button>
              ) : (
                careerMilestones.length > LOG_INITIAL_COUNT && (
                  <button
                    type="button"
                    className={styles.moreCommits}
                    onClick={() => {
                      setLogExpanded(false);
                      scrollTop();
                    }}
                  >
                    ∧ show fewer commits
                  </button>
                )
              )}
            </section>

            <section className={`${styles.panel} ${styles.branchTable}`} aria-label="Career branches">
              <PromptLine command="~/builds$ git branch --career" />
              <div className={styles.tableHead} aria-hidden="true">
                <span>BRANCH</span>
                <span>PURPOSE</span>
                <span>STATUS</span>
              </div>
              {careerBranches.map(([branch, purpose, status]) => (
                <div key={branch} className={styles.tableRow}>
                  <b>
                    {branch === "main" ? "* " : ""}
                    {branch}
                  </b>
                  <span>{purpose}</span>
                  <em>{status}</em>
                </div>
              ))}
            </section>

            <section className={`${styles.panel} ${styles.learningTable}`} aria-label="Learning timeline">
              <PromptLine command="~/builds$ learning --timeline" />
              <div className={styles.tableHead} aria-hidden="true">
                <span>YEAR</span>
                <span>AREA</span>
                <span>STATUS</span>
              </div>
              {learningTimeline.map(([year, area, status]) => (
                <div key={`${year}-${area}`} className={styles.tableRow}>
                  <b>{year}</b>
                  <span>{area}</span>
                  <em>{status}</em>
                </div>
              ))}
            </section>

            <section className={styles.panel} aria-label="Working tree status">
              <PromptLine command="~/builds$ git status" />
              <p className={styles.statusBlock}>
                On branch main
                <br />
                building: <strong>active</strong>
                <br />
                learning: <strong>active</strong>
                <br />
                job_search: <strong>active</strong>
                <br />
                working tree clean ✓
              </p>
            </section>
          </div>
        ) : view === "commit" ? (
          <div id="m-career-panel-commit" role="tabpanel" aria-label="Selected commit">
            <div className={styles.statusStrip} aria-label="Commit status">
              <span>
                <TerminalIcon name="git-branch" /> main
              </span>
              <span>
                COMMIT{" "}
                <span className={styles.statusCyan}>
                  {selected.ref === "HEAD" ? SYMBOLIC_HEAD_HASH : selected.ref}
                </span>
              </span>
              <span className={styles.statusGreen}>
                {selected.state === "head" ? "HEAD → main" : selected.ref}
              </span>
              <span>{selected.period}</span>
            </div>

            <section className={styles.panel} aria-live="polite" aria-label="Commit detail">
              <PromptLine command={`~/builds$ git show ${selected.ref}`} />
              <div className={styles.commitHeadLabel}>
                <span>{selected.state === "head" ? "CURRENT HEAD" : "SELECTED MILESTONE"}</span>
                <time>{selected.period}</time>
              </div>
              <h2 className={styles.commitTitle}>{selected.detailTitle ?? selected.title}</h2>
              <p className={styles.commitSubtitle}>{selected.subtitle}</p>
              <dl className={styles.metaGrid}>
                {selected.metadata.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>

              <section className={`${styles.sectionBox} ${styles.toneStory}`} aria-label="Why it mattered">
                <h3>WHY IT MATTERED</h3>
                <p>{selected.whyItMattered}</p>
              </section>

              <div className={styles.splitGrid}>
                <section
                  className={`${styles.sectionBox} ${styles.toneTechnical}`}
                  aria-label="What changed"
                >
                  <h3>WHAT CHANGED</h3>
                  <ul>
                    {selected.changes.map((change) => (
                      <li key={change}>
                        <span aria-hidden="true">●</span>
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                <section
                  className={`${styles.sectionBox} ${styles.tonePositive}`}
                  aria-label="Evidence outcome"
                >
                  <h3>EVIDENCE / OUTCOME</h3>
                  <ul>
                    {selected.evidence.map((item) => (
                      <li key={item}>
                        <span aria-hidden="true">●</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <section className={styles.commitMsg} aria-label="Commit message">
                <h3>COMMIT MESSAGE</h3>
                <p>
                  <strong>{selected.commit.type}:</strong> {selected.commit.title}
                </p>
                <ul>
                  {selected.commit.lines.map((line) => (
                    <li key={line}>- {line}</li>
                  ))}
                </ul>
              </section>

              {selected.storyId && (
                <button
                  type="button"
                  className={styles.openStory}
                  onClick={(e) => openStory(selected.storyId!, "commit", e.currentTarget)}
                >
                  <TerminalIcon name="file-text" />
                  OPEN BUILD STORY →
                </button>
              )}

              <div className={styles.prevNext}>
                <button
                  type="button"
                  disabled={!prevMilestone}
                  onClick={() => {
                    if (!prevMilestone) return;
                    setSelectedId(prevMilestone.id);
                    requestAnimationFrame(scrollTop);
                  }}
                  aria-label={prevMilestone ? `Previous ${prevMilestone.title}` : "No previous commit"}
                >
                  ← PREVIOUS
                  <small>{prevMilestone ? prevMilestone.title : "HEAD / newest commit"}</small>
                </button>
                <button
                  type="button"
                  disabled={!nextMilestone}
                  onClick={() => {
                    if (!nextMilestone) return;
                    setSelectedId(nextMilestone.id);
                    requestAnimationFrame(scrollTop);
                  }}
                  aria-label={nextMilestone ? `Next ${nextMilestone.title}` : "No next commit"}
                >
                  NEXT →
                  <small>{nextMilestone ? nextMilestone.title : "initial commit"}</small>
                </button>
              </div>
            </section>
          </div>
        ) : view === "evolution" ? (
          <div id="m-career-panel-evolution" role="tabpanel" aria-label="Engineering evolution">
            <div className={styles.statusStrip} aria-label="Evolution status">
              <span>2023 → now</span>
              <span className={styles.statusPurple}>backend primary</span>
              <span>{learningCount} learning stages</span>
              <span className={styles.statusAmber}>evolving</span>
            </div>

            <section className={styles.panel} aria-label="Engineering evolution">
              <PromptLine command="~/builds$ git reflog --evolution" />
              <h2 className={styles.evoHead}>ENGINEERING EVOLUTION</h2>
              <p className={styles.evoSub}>How my approach to building has changed over time.</p>
              <div className={styles.evoGrid}>
                {engineeringEvolution.map((step, index) => (
                  <article
                    key={step.to}
                    className={`${styles.evoCell} ${index === engineeringEvolution.length - 1 ? styles.evoCellWide : ""}`}
                  >
                    <b>{String(index + 1).padStart(2, "0")}</b>
                    <span>{step.from}</span>
                    <span aria-hidden="true">{index === engineeringEvolution.length - 1 ? "→" : "↓"}</span>
                    <strong>{step.to}</strong>
                    <small>{step.note}</small>
                  </article>
                ))}
              </div>
            </section>

            <section className={`${styles.panel} ${styles.branchTable}`} aria-label="Career branches">
              <PromptLine command="~/builds$ git branch --career" />
              <div className={styles.tableHead} aria-hidden="true">
                <span>BRANCH</span>
                <span>PURPOSE</span>
                <span>STATUS</span>
              </div>
              {careerBranches.map(([branch, purpose, status]) => (
                <div key={branch} className={styles.tableRow}>
                  <b>
                    {branch === "main" ? "* " : ""}
                    {branch}
                  </b>
                  <span>{purpose}</span>
                  <em>{status}</em>
                </div>
              ))}
            </section>

            <section className={`${styles.panel} ${styles.learningTable}`} aria-label="Learning timeline">
              <PromptLine command="~/builds$ learning --timeline" />
              <div className={styles.tableHead} aria-hidden="true">
                <span>YEAR</span>
                <span>AREA</span>
                <span>STATUS</span>
              </div>
              {learningTimeline.map(([year, area, status]) => (
                <div key={`${year}-${area}`} className={styles.tableRow}>
                  <b>{year}</b>
                  <span>{area}</span>
                  <em>{status}</em>
                </div>
              ))}
            </section>

            <section className={styles.panel} aria-label="Current learning">
              <h2 className={styles.evoHead}>CURRENT LEARNING</h2>
              <p className={styles.evoSub}>What I&apos;m currently focusing on.</p>
              <div className={styles.currentGrid}>
                {currentCareerLearning.map((item) => (
                  <div key={item.name} className={styles.currentCell}>
                    <TerminalIcon
                      name={
                        item.name.includes("CLI")
                          ? "terminal"
                          : item.name.includes("Security")
                            ? "check-circle"
                            : item.name.includes("Verification")
                              ? "search"
                              : "cpu"
                      }
                    />
                    <div>
                      <b>{item.name}</b>
                      <small
                        className={
                          item.state === "active" ? styles.statusGreen : styles.statusAmber
                        }
                      >
                        {item.state}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.panel} aria-label="Evolution diff summary">
              <PromptLine command="~/builds$ git diff --summary 2023..HEAD" />
              {engineeringEvolution.map((step) => (
                <div key={step.to} className={styles.diffRow}>
                  <span className={styles.diffOld}>- {step.from}</span>
                  <span className={styles.diffNew}>+ {step.to}</span>
                </div>
              ))}
            </section>
          </div>
        ) : (
          <div id="m-career-panel-context" role="tabpanel" aria-label="Career context">
            <div className={styles.statusStrip} aria-label="Context status">
              <span>3 files</span>
              <span>{storyCount} stories</span>
              <span className={styles.statusPurple}>main</span>
              <span className={styles.statusGreen}>synced ✓</span>
            </div>

            <section className={styles.panel} aria-label="Career context files">
              <PromptLine command="~/builds$ ls ./career-context" />
              <p className={styles.fileTree}>
                career-context/
                <br />
                ├── career.toml
                <br />
                ├── now.md
                <br />
                └── stories.index
              </p>
            </section>

            <section className={styles.panel} aria-label="Career TOML">
              <PromptLine command="~/builds$ cat career.toml" />
              <div className={styles.tomlBlock}>
                <p className={styles.tomlSection}>[career]</p>
                <div className={styles.tomlRow}>
                  <span>stage</span>
                  <i>=</i>
                  <b className={styles.tomlKey}>&quot;{careerToml.career.stage}&quot;</b>
                </div>
                <div className={styles.tomlRow}>
                  <span>primary</span>
                  <i>=</i>
                  <b>&quot;{careerToml.career.primary}&quot;</b>
                </div>
                <div className={styles.tomlRow}>
                  <span>secondary</span>
                  <i>=</i>
                  <b>&quot;{careerToml.career.secondary}&quot;</b>
                </div>
                <div className={styles.tomlRow}>
                  <span>status</span>
                  <i>=</i>
                  <b className={styles.statusGreen}>&quot;{careerToml.career.status}&quot;</b>
                </div>
                <p className={styles.tomlSection}>[direction]</p>
                <div className={styles.tomlRow}>
                  <span>focus</span>
                  <i>=</i>
                  <b>&quot;{careerToml.direction.focus}&quot;</b>
                </div>
                <div className={styles.tomlRow}>
                  <span>environment</span>
                  <i>=</i>
                  <b>&quot;{careerToml.direction.environment}&quot;</b>
                </div>
                <div className={styles.tomlRow}>
                  <span>priority</span>
                  <i>=</i>
                  <b className={styles.tomlKey}>&quot;{careerToml.direction.priority}&quot;</b>
                </div>
              </div>
            </section>

            <section className={styles.panel} aria-label="Now markdown">
              <PromptLine command="~/builds$ cat now.md" />
              <div className={styles.nowMd}>
                <h4>## Building</h4>
                {careerNow.building.map((item) => (
                  <p key={item.name}>
                    - {item.name}
                    {item.note ? ` - ${item.note}` : ""}
                  </p>
                ))}
                <h4>## Learning</h4>
                {careerNow.learning.map((item) => (
                  <p key={item.name}>- {item.name}</p>
                ))}
              </div>
            </section>

            <section className={styles.panel} aria-label="Stories index">
              <PromptLine command="~/builds$ cat stories.index" />
              <ul className={styles.storyIndex}>
                {careerStories.map((story) => {
                  const isHeadStory =
                    careerMilestones[0] && story.milestoneId === careerMilestones[0].id;
                  return (
                    <li key={story.id}>
                      <button
                        type="button"
                        className={styles.storyRow}
                        onClick={(e) => openStory(story.id, "context", e.currentTarget)}
                        aria-label={`Open ${story.id} build story`}
                      >
                        <TerminalIcon name="file-text" />
                        <span>
                          <b>{story.id}.story</b>
                          <small>{story.descriptor}</small>
                        </span>
                        {isHeadStory ? (
                          <span className={styles.currentBadge}>current</span>
                        ) : (
                          <span />
                        )}
                        <span aria-hidden="true">›</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section className={styles.panel} aria-label="Context status">
              <PromptLine command="~/builds$ git status --context" />
              <p className={styles.statusBlock}>
                On branch main
                <br />
                career: <strong>synced ✓</strong>
                <br />
                builds: <strong>active</strong>
                <br />
                learning: <strong>active</strong>
                <br />
                stories: <strong>{storyCount} indexed</strong>
                <br />
                working tree clean ✓
              </p>
            </section>
          </div>
        )}
      </div>

      <MobileGlobalNav />
    </div>
  );
}

export default MobileCareerHistoryWorkspace;
