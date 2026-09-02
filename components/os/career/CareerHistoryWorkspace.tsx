"use client";

import { useEffect, useMemo, useState } from "react";
import {
  careerBranches,
  careerMilestones,
  careerStories,
  learningTimeline,
  type BuildStory,
  type BuildStorySection,
} from "@/data/career-history";

type CareerHistoryWorkspaceProps = { onOpenIntroduction: () => void };

const storyOrder = careerStories.map((story) => story.id);

function TerminalPrompt({ children }: { children: React.ReactNode }) {
  return <p className="career-v2-prompt"><b>developer@sambit:~/builds</b>$ {children}</p>;
}

function StorySection({ section }: { section: BuildStorySection }) {
  const metadata = section.content as ReadonlyArray<readonly [string, string]>;
  const lines = section.content as readonly string[];
  const tone = section.tone ?? "neutral";
  const marker = tone === "positive" ? "✓" : tone === "timeline" ? "●" : tone === "danger" ? "×" : tone === "warning" ? "!" : "→";

  return (
    <section className={`career-story-section career-story-section--${section.kind ?? "list"}`} data-tone={tone}>
      <h2>{section.title}</h2>
      {section.kind === "metadata" ? (
        <dl>
          {metadata.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>
      ) : section.kind === "text" ? (
        lines.map((line) => <p key={line}>{line}</p>)
      ) : (
        <ul>
          {lines.map((line) => <li key={line}><span className="career-story-marker" aria-hidden="true">{marker}</span>{line}</li>)}
        </ul>
      )}
    </section>
  );
}

function ExternalLinks({ story }: { story: BuildStory }) {
  if (!story.links?.live && !story.links?.repo) return null;
  return (
    <nav className="career-story-links" aria-label={`${story.title} links`}>
      {story.links.live && <a href={story.links.live} target="_blank" rel="noreferrer">Live ↗</a>}
      {story.links.repo && <a href={story.links.repo} target="_blank" rel="noreferrer">Repo ↗</a>}
    </nav>
  );
}

function BuildStoryViewer({ story, onClose, onNavigate }: { story: BuildStory; onClose: () => void; onNavigate: (id: string) => void }) {
  const storyIndex = storyOrder.indexOf(story.id);
  const previous = storyIndex > 0 ? careerStories.find((item) => item.id === storyOrder[storyIndex - 1]) : undefined;
  const next = storyIndex < storyOrder.length - 1 ? careerStories.find((item) => item.id === storyOrder[storyIndex + 1]) : undefined;

  return (
    <main className="career-v2-story" aria-label={`${story.title} build story`}>
      <header className="career-story-toolbar">
        <TerminalPrompt>git show --story {story.id} <span>({story.title} — {story.descriptor})</span></TerminalPrompt>
        <div>
          <button type="button" onClick={() => previous && onNavigate(previous.id)} disabled={!previous}>← Previous Story</button>
          <button type="button" onClick={() => next && onNavigate(next.id)} disabled={!next}>Next Story →</button>
          <button type="button" onClick={onClose} aria-label="Close build story">× Close</button>
        </div>
      </header>
      <article className="career-story-scroll">
        <header className="career-story-heading">
          <div>
            <span aria-hidden="true">✦</span>
            <h1>{story.title}</h1>
            <p>{story.subtitle}</p>
          </div>
          <ExternalLinks story={story} />
        </header>
        <div className="career-story-tags" aria-label="Story topics">
          {story.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <div className="career-story-grid">
          {story.sections.map((section) => <StorySection key={section.title} section={section} />)}
          <section className="career-story-section career-story-section--commit" data-tone="neutral">
            <h2>COMMIT MESSAGE</h2>
            <p><strong>{story.closingCommit.type}:</strong> {story.closingCommit.title}</p>
            <ul>{story.closingCommit.lines.map((line) => <li key={line}><span className="career-story-marker" aria-hidden="true">→</span>{line}</li>)}</ul>
          </section>
        </div>
      </article>
    </main>
  );
}

export function CareerHistoryWorkspace({ onOpenIntroduction }: CareerHistoryWorkspaceProps) {
  const [selectedId, setSelectedId] = useState(careerMilestones[0].id);
  const [storyId, setStoryId] = useState<string | null>(null);
  const selected = useMemo(() => careerMilestones.find((milestone) => milestone.id === selectedId) ?? careerMilestones[0], [selectedId]);
  const activeStory = useMemo(() => careerStories.find((story) => story.id === storyId) ?? null, [storyId]);

  const selectMilestone = (id: string) => {
    setSelectedId(id);
    // A timeline selection is a Level 1 navigation action. Clear any open
    // story so the selected milestone can take over the center workspace.
    setStoryId(null);
  };

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && storyId) setStoryId(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [storyId]);

  const openStory = (id: string) => {
    const story = careerStories.find((item) => item.id === id);
    if (!story) return;
    setSelectedId(story.milestoneId);
    setStoryId(id);
  };

  return (
    <>
      <aside className="career-v2-sidebar" aria-label="Build history">
        <header>BUILD HISTORY</header>
        <section className="career-v2-commit-list">
          <TerminalPrompt>git log --graph --all</TerminalPrompt>
          <div className="career-v2-timeline" role="list" aria-label="Career milestones">
            {careerMilestones.map((milestone) => {
              const selectedState = milestone.id === selected.id;
              return <button type="button" role="listitem" key={milestone.id} className={selectedState ? "is-selected" : ""} onClick={() => selectMilestone(milestone.id)} aria-pressed={selectedState}>
                <i aria-hidden="true" />
                <span>{milestone.period}</span>
                <b>{milestone.title}</b>
                <small>{milestone.subtitle}</small>
                <em>{milestone.state === "head" ? "HEAD → main" : milestone.ref}</em>
              </button>;
            })}
          </div>
        </section>
        <section className="career-v2-branches">
          <h2>CAREER BRANCHES</h2>
          {careerBranches.map(([branch, detail, state]) => <div key={branch} data-branch={branch} data-state={state}><i aria-hidden="true" /><b>{branch}</b><span>{detail}</span><em>{state}</em></div>)}
        </section>
        <section className="career-v2-learning">
          <h2>LEARNING TIMELINE</h2>
          {learningTimeline.map(([period, title, state]) => <div key={`${period}-${title}`} data-state={state}><b>{period}</b><span>{title}</span><em>{state}</em></div>)}
        </section>
        <footer>
          <b>$ git status</b>
          <span>On branch <strong>main</strong><br /><br />building: <strong>active</strong>　learning: <strong>active</strong><br />job_search: <strong>active</strong><br /><br />working tree: not clean 🙂</span>
        </footer>
      </aside>

      {activeStory ? <BuildStoryViewer story={activeStory} onClose={() => setStoryId(null)} onNavigate={openStory} /> : <>
        <main className="career-v2-main">
          <nav className="career-v2-tabs" aria-label="Open editor tabs">
            <button type="button" onClick={onOpenIntroduction} title="Return to introduction.ts"><i>TS</i> introduction.ts</button>
            <b><span aria-hidden="true">⌘</span> Git: Build History</b>
            <i aria-hidden="true">＋</i>
          </nav>
          <section className="career-v2-selected" aria-live="polite">
            <TerminalPrompt>git show {selected.ref}</TerminalPrompt>
            <article>
              <header><span>{selected.state === "head" ? "CURRENT HEAD" : "SELECTED MILESTONE"}</span><time>{selected.period}</time></header>
              <h1>{selected.detailTitle ?? selected.title}</h1>
              <p className="career-v2-subtitle">{selected.subtitle}</p>
              <dl className="career-v2-metadata">
                {selected.metadata.map(([label, value]) => <div key={label} data-label={label.toLowerCase().replaceAll(" ", "-")}><dt>{label}</dt><dd>{value}</dd></div>)}
              </dl>
              <div className="career-v2-detail-grid">
                <section data-tone="story"><h2>WHY IT MATTERED</h2><p>{selected.whyItMattered}</p></section>
                <section data-tone="technical"><h2>WHAT CHANGED</h2><ul>{selected.changes.map((change) => <li key={change}>{change}</li>)}</ul></section>
                <section data-tone="positive"><h2>EVIDENCE / OUTCOME</h2><ul>{selected.evidence.map((item) => <li key={item}>{item}</li>)}</ul></section>
              </div>
              <section className="career-v2-commit" data-commit-type={selected.commit.type}><h2>COMMIT MESSAGE</h2><p><strong>{selected.commit.type}:</strong> {selected.commit.title}</p><ul>{selected.commit.lines.map((line) => <li key={line}>{line}</li>)}</ul></section>
              {selected.storyId && <button type="button" className="career-v2-open-story" onClick={() => openStory(selected.storyId!)}>OPEN BUILD STORY ↗</button>}
            </article>
          </section>
          <section className="career-v2-evolution"><h2>ENGINEERING EVOLUTION</h2><div>{[["Tutorials", "Original Products", "learning phase → 2025"], ["Code First", "Research / PRD First", "earlier → now"], ["Small Builds", "Long-Horizon Products", "2025 → now"], ["General Full Stack", "Backend Bias", "2025 → now"], ["AI for Help", "AI in the Workflow", "earlier → now"]].map(([from, to, note]) => <article key={to}><span>{from}</span><b>↓</b><strong>{to}</strong><small>{note}</small></article>)}</div></section>
          <section className="career-v2-current"><h2>CURRENT LEARNING</h2><div>{[["System Design", "active"], ["CLI Architecture", "active"], ["Code Verification", "active"], ["Security Review", "exploring"]].map(([name, state]) => <span key={name} data-state={state}>{name}<b>{state}</b></span>)}</div></section>
        </main>
        <aside className="career-v2-context" aria-label="Career context">
          <section><header>$ cat career.toml <b>TOML</b></header><div className="career-v2-toml"><p>[career]</p><div><span>stage</span><i>=</i><b data-value="stage">"2026 Graduate"</b></div><div><span>primary</span><i>=</i><b data-value="primary">"Backend"</b></div><div><span>secondary</span><i>=</i><b>"Full Stack"</b></div><div><span>status</span><i>=</i><b data-value="status">"Open to Work"</b></div><p>[direction]</p><div><span>focus</span><i>=</i><b data-value="focus">"Backend-heavy Product Engineering"</b></div><div><span>environment</span><i>=</i><b>"Startup / Product Team"</b></div><div><span>priority</span><i>=</i><b data-value="priority">"Strong Team + Learning"</b></div></div></section>
          <section><header>$ cat now.md <b>MD</b></header><div className="career-v2-now"><h3>## Building</h3><p><b>AgentProof</b><em>— primary</em></p><p><b>Agent Playground</b></p><p><b>Sambit OS</b></p><h3>## Learning</h3><p><b>System Design</b></p><p><b>CLI / Code Verification</b></p><p><b>Security review concepts</b></p></div></section>
          <section className="career-v2-stories"><header>$ cat stories.index <b>IDX</b></header><div>{careerStories.map((story) => <button type="button" key={story.id} onClick={() => openStory(story.id)}><i>{story.milestoneId === "going-deeper" ? "•" : "✓"}</i><span>{story.id}.story<small>{story.descriptor}</small></span><em>↗</em></button>)}</div><p>(+ add new story file to keep growing)</p></section>
        </aside>
      </>}
    </>
  );
}
