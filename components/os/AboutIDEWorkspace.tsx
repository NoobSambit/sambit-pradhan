"use client";

import { useState, type ReactNode } from "react";

const explorerFiles = [
  "introduction.ts",
  "engineering.ts",
  "vision.ts",
  "values.ts",
  "personality.ts",
  "hobbies.json",
  "workstation.toml",
  "languages.yml",
];
const tags = [
  "Backend",
  "System Design",
  "AI",
  "Scalability",
  "Performance",
  "Developer Experience",
  "Distributed Systems",
  "Architecture",
  "Production Ready",
];

type ActivityIconName =
  | "explorer"
  | "search"
  | "source"
  | "run"
  | "extensions"
  | "account"
  | "settings";

function ActivityIcon({ name }: { name: ActivityIconName }) {
  const paths: Record<ActivityIconName, ReactNode> = {
    explorer: (
      <>
        <path d="M3.5 3.5h9l4 4v13H3.5z" />
        <path d="M12.5 3.5v4h4" />
        <path d="M6.5 11h6M6.5 14h6M6.5 17h4" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="5.5" />
        <path d="m15 15 4.5 4.5" />
      </>
    ),
    source: (
      <>
        <circle cx="7" cy="5" r="2" />
        <circle cx="7" cy="19" r="2" />
        <circle cx="17" cy="12" r="2" />
        <path d="M7 7v10M9 7c5 0 2 5 6 5" />
      </>
    ),
    run: (
      <>
        <path d="m8 4 11 8-11 8z" />
        <path d="M4 5v14" />
      </>
    ),
    extensions: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </>
    ),
    account: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c.7-3.5 3.1-5.5 7-5.5s6.3 2 7 5.5" />
        <circle cx="12" cy="12" r="9" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
      </>
    ),
  };
  return (
    <svg className="ide-activity-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function InspectorSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="ide-inspector-section">
      <h2>⌄ {title}</h2>
      {children}
    </section>
  );
}

function KeyValue({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="ide-key-value">
      <span>{label}</span>
      <i>:</i>
      <b>{value}</b>
    </div>
  );
}

function CareerHistoryWorkspace({
  onOpenIntroduction,
}: {
  onOpenIntroduction: () => void;
}) {
  const commits = [
    [
      "f8a3d2c",
      "Current Focus: Building Production AI Systems",
      "now",
      "#79ce70",
    ],
    ["d2c4f9e", "AI Engineering & LLM Integration", "Sep 2023", "#6fc0e7"],
    ["9b72e1a", "Architected Scalable Microservices", "Feb 2022", "#b987dc"],
    ["e4a1c7f", "Explored Cloud & DevOps", "Jul 2021", "#f0c85a"],
    ["c71d9e4", "Deployed First App to Production", "Jan 2021", "#6fcbc4"],
    ["a91b2f3", "Started Programming Journey", "May 2019", "#b4bec6"],
    ["0000000", "Initial Commit", "2019", "#87939b"],
  ];
  const learning = [
    ["3f2a6b1", "Distributed Systems", "active"],
    ["9a1d4c2", "Kubernetes Deep Dive", "active"],
    ["7cb82e5", "Event Driven Architecture", "active"],
    ["5d9e7f4", "Advanced React Patterns", "next"],
    ["2bc1e7a", "LLM Infrastructure", "next"],
  ];
  const evolution = [
    ["›_", "Backend Engineering", "2019 → Today", "Evolving Every Day"],
    ["◉", "AI Engineering", "2022 → Today", "Rapid Growth"],
    ["◇", "System Design", "2021 → Today", "Deepening"],
    ["⌘", "Developer Experience", "2020 → Today", "Always Improving"],
  ];
  const skills = [
    "distributed-systems",
    "kubernetes",
    "event-driven-architecture",
    "advanced-react",
    "llm-infrastructure",
  ];

  return (
    <>
      <aside className="career-history-sidebar">
        <header>GIT HISTORY</header>
        <section className="career-commit-list">
          <p>
            <b>developer@sambit:~/career</b>$ git log --graph --career
          </p>
          <div className="career-timeline">
            {commits.map(([hash, message, date, color], index) => (
              <article className={index === 0 ? "current" : ""} key={hash}>
                <i style={{ "--commit-color": color } as React.CSSProperties} />
                <div>
                  <span>
                    ★ {hash}　{index === 0 ? "(HEAD → main)" : ""}
                  </span>
                  <b>{message}</b>
                  <small>Sambit Pradhan</small>
                </div>
                <time>{date}</time>
              </article>
            ))}
          </div>
        </section>
        <section className="career-branches">
          <h2>CAREER BRANCHES</h2>
          {[
            ["main", "production", "2h ago"],
            ["backend", "active", "2w ago"],
            ["ai", "active", "2023"],
            ["cloud", "merged", "2021"],
            ["portfolio", "active", "now"],
          ].map(([branch, state, date]) => (
            <div key={branch}>
              <i />
              <b>{branch}</b>
              <em className={state === "active" ? "active" : ""}>{state}</em>
              <time>{date}</time>
            </div>
          ))}
        </section>
        <section className="career-learning-log">
          <h2>LEARNING TIMELINE</h2>
          <p>$ git log --learning --oneline</p>
          {learning.map(([hash, title, state]) => (
            <div key={hash}>
              <i>○</i>
              <b>{hash}</b>
              <span>{title}</span>
              <em className={state}>{state}</em>
            </div>
          ))}
        </section>
        <footer>
          <b>developer@sambit:~/career</b>$ git status
          <br />
          <span>
            On branch main
            <br />
            Your branch is up to date with 'origin/main'.
            <br />
            <br />
            nothing to commit, working tree clean
          </span>
        </footer>
      </aside>
      <main className="career-main">
        <nav className="career-tabs" aria-label="Open editor tabs">
          <button
            className="career-editor-tab"
            onClick={onOpenIntroduction}
            title="Open introduction.ts"
          >
            <i>TS</i>
            <span>introduction.ts</span>
            <em>●</em>
          </button>
          <b className="career-git-tab">
            <ActivityIcon name="source" />
            <span>Git: career-history</span>
            <em>●</em>
            <i>×</i>
          </b>
          <span>◫ journey.md　×</span>
          <span>◈ milestones.md　×</span>
          <span>◌ learning.log　×</span>
          <i>＋</i>
        </nav>
        <section className="career-selected">
          <p>
            <b>developer@sambit:~/career</b>$ git show HEAD
          </p>
          <article>
            <h2>Current Commit</h2>
            <h1>Building Production AI Systems</h1>
            <div className="career-commit-meta">
              <div>
                <KeyValue
                  label="Author"
                  value="Sambit Pradhan <sambitpradhan.dev2004@gmail.com>"
                />
                <KeyValue
                  label="Commit Hash"
                  value="fa1c2e9b7f4a8e2c5f4d0b7e6c"
                />
                <KeyValue label="Date" value="Jul 18, 2026, 10:15 AM IST" />
                <KeyValue label="Repository" value="sambit-pradhan" />
                <KeyValue label="Branch" value="main" />
                <KeyValue label="Status" value="Merged" />
                <KeyValue label="Diff Size" value="+142 −18" />
                <KeyValue
                  label="Review Status"
                  value={<span className="green">● Approved</span>}
                />
              </div>
              <div>
                <KeyValue label="Files Changed" value="12" />
                <KeyValue
                  label="Insertions"
                  value={<span className="green">142</span>}
                />
                <KeyValue
                  label="Deletions"
                  value={<span className="red">18</span>}
                />
                <KeyValue label="Binary Files" value="0" />
                <KeyValue label="Commits Ahead" value="0" />
                <KeyValue label="Commits Behind" value="0" />
                <KeyValue
                  label="CI Status"
                  value={<span className="green">● Passed</span>}
                />
              </div>
            </div>
            <div className="career-message">
              <h3>Commit Message</h3>
              <p>
                <span>feat:</span> ship developer operating system portfolio
                <br />
                　- Added project runtime dashboard
                <br />
                　- Implemented architecture visualizer
                <br />
                　- Integrated live GitHub data
                <br />
                <br />
                <b>refactor:</b> improved workspace modularity
                <br />
                <i>fix:</i> optimized performance &amp; load time
                <br />
                <em>perf:</em> lazy load heavy components
                <br />
                <strong>docs:</strong> update system overview
              </p>
            </div>
          </article>
        </section>
        <section className="career-evolution">
          <header>ENGINEERING EVOLUTION</header>
          <div>
            {evolution.map(([icon, title, date, note]) => (
              <article key={title}>
                <i>{icon}</i>
                <b>{title}</b>
                <span>⌁⌁⌁⌁⌁</span>
                <small>
                  {date}
                  <br />
                  {note}
                </small>
              </article>
            ))}
          </div>
        </section>
        <section className="career-current-learning">
          <header>
            CURRENT LEARNING <a>View Full Learning Graph →</a>
          </header>
          <p>$ git checkout learning</p>
          <div>
            {skills.map((skill, index) => (
              <span className={index > 2 ? "next" : ""} key={skill}>
                {skill}
                <b>{index > 2 ? "next" : "active"}</b>
              </span>
            ))}
          </div>
        </section>
      </main>
      <aside className="career-context">
        <section>
          <header>
            $ cat workstation.toml <b>TOML</b>
          </header>
          <pre>
            <span className="tok-section">[editor]</span>
            {"\n"}
            <span className="tok-key">name</span> ={" "}
            <span className="tok-string">"VS Code"</span>
            {"\n"}
            <span className="tok-key">theme</span> ={" "}
            <span className="tok-string">"Ayu Dark"</span>
            {"\n"}
            <span className="tok-key">font</span> ={" "}
            <span className="tok-string">"JetBrains Mono"</span>
            {"\n"}
            <span className="tok-key">font_size</span> ={" "}
            <span className="tok-number">14</span>
            {"\n\n"}
            <span className="tok-section">[system]</span>
            {"\n"}
            <span className="tok-key">os</span> ={" "}
            <span className="tok-string">"Linux"</span>
            {"\n"}
            <span className="tok-key">distro</span> ={" "}
            <span className="tok-string">"Arch Linux"</span>
            {"\n"}
            <span className="tok-key">shell</span> ={" "}
            <span className="tok-string">"zsh"</span>
            {"\n\n"}
            <span className="tok-section">[tools]</span>
            {"\n"}
            <span className="tok-key">terminal</span> ={" "}
            <span className="tok-string">"Warp"</span>
            {"\n"}
            <span className="tok-key">browser</span> ={" "}
            <span className="tok-string">"Brave"</span>
            {"\n"}
            <span className="tok-key">git_ui</span> ={" "}
            <span className="tok-string">"GitHub Desktop"</span>
            {"\n"}
            <span className="tok-key">code_assistant</span> ={" "}
            <span className="tok-string">"Codex"</span>
          </pre>
        </section>
        <section>
          <header>$ cat now.md</header>
          <pre>
            <span className="tok-heading">## Now</span>
            {"\n\n"}
            <span className="tok-heading">### Building</span>
            {"\n"}
            <span className="tok-list">- Developer OS Portfolio</span>
            {"\n\n"}
            <span className="tok-heading">### Learning</span>
            {"\n"}
            <span className="tok-list">- Distributed Systems</span>
            {"\n\n"}
            <span className="tok-heading">### Reading</span>
            {"\n"}
            <span className="tok-list">
              - Designing Data Intensive{"\n"} Applications
            </span>
            {"\n\n"}
            <span className="tok-heading">### Listening</span>
            {"\n"}
            <span className="tok-list">- Hans Zimmer</span>
            {"\n\n"}
            <span className="tok-heading">### Focus</span>
            {"\n"}
            <span className="tok-list">- Shipping. Every day.</span>
          </pre>
        </section>
        <section>
          <header>$ cat bookmarks.json</header>
          <pre>
            <span className="tok-brace">[</span>
            {"\n  "}
            <span className="tok-brace">{"{"}</span>{" "}
            <span className="tok-key">"name"</span>:{" "}
            <span className="tok-string">"GitHub"</span>,{" "}
            <span className="tok-key">"url"</span>:{" "}
            <span className="tok-url">"https://github.com"</span>{" "}
            <span className="tok-brace">{"}"}</span>,{"\n  "}
            <span className="tok-brace">{"{"}</span>{" "}
            <span className="tok-key">"name"</span>:{" "}
            <span className="tok-string">"Stripe"</span>,{" "}
            <span className="tok-key">"url"</span>:{" "}
            <span className="tok-url">"https://stripe.com"</span>{" "}
            <span className="tok-brace">{"}"}</span>,{"\n  "}
            <span className="tok-brace">{"{"}</span>{" "}
            <span className="tok-key">"name"</span>:{" "}
            <span className="tok-string">"Vercel"</span>,{" "}
            <span className="tok-key">"url"</span>:{" "}
            <span className="tok-url">"https://vercel.com"</span>{" "}
            <span className="tok-brace">{"}"}</span>,{"\n  "}
            <span className="tok-brace">{"{"}</span>{" "}
            <span className="tok-key">"name"</span>:{" "}
            <span className="tok-string">"Cloudflare"</span>,{" "}
            <span className="tok-key">"url"</span>:{" "}
            <span className="tok-url">"https://cloudflare.com"</span>{" "}
            <span className="tok-brace">{"}"}</span>,{"\n  "}
            <span className="tok-brace">{"{"}</span>{" "}
            <span className="tok-key">"name"</span>:{" "}
            <span className="tok-string">"OpenAI"</span>,{" "}
            <span className="tok-key">"url"</span>:{" "}
            <span className="tok-url">"https://openai.com"</span>{" "}
            <span className="tok-brace">{"}"}</span>
            {"\n"}
            <span className="tok-brace">]</span>
          </pre>
        </section>
        <section>
          <header>$ cat values.yaml</header>
          <pre>
            <span className="tok-keyword">values</span>: {"\n  "}
            <span className="tok-key">clarity</span>:{" "}
            <span className="tok-boolean">true</span>
            {"\n  "}
            <span className="tok-key">ownership</span>:{" "}
            <span className="tok-boolean">true</span>
            {"\n  "}
            <span className="tok-key">curiosity</span>:{" "}
            <span className="tok-boolean">true</span>
            {"\n  "}
            <span className="tok-key">craftsmanship</span>:{" "}
            <span className="tok-boolean">true</span>
            {"\n  "}
            <span className="tok-key">shipping</span>:{" "}
            <span className="tok-boolean">true</span>
            {"\n  "}
            <span className="tok-key">patience</span>:{" "}
            <span className="tok-boolean">true</span>
            {"\n  "}
            <span className="tok-key">ego</span>:{" "}
            <span className="tok-false">false</span>
            {"\n  "}
            <span className="tok-key">impact</span>:{" "}
            <span className="tok-boolean">true</span>
          </pre>
        </section>
        <section className="career-history-terminal">
          <header>$ history</header>
          <pre>
            <span className="tok-number">1</span>{" "}
            <span className="tok-command">git pull origin main</span>{" "}
            <span className="tok-muted">2h ago</span>
            {"\n"}
            <span className="tok-number">2</span>{" "}
            <span className="tok-command">npm run build</span>{" "}
            <span className="tok-muted">2h ago</span>
            {"\n"}
            <span className="tok-number">3</span>{" "}
            <span className="tok-command">code introduction.ts</span>{" "}
            <span className="tok-muted">2h ago</span>
            {"\n"}
            <span className="tok-number">4</span>{" "}
            <span className="tok-command">learn kubernetes</span>{" "}
            <span className="tok-muted">1d ago</span>
            {"\n"}
            <span className="tok-number">5</span>{" "}
            <span className="tok-command">refactor architecture</span>{" "}
            <span className="tok-muted">1d ago</span>
            {"\n"}
            <span className="tok-number">6</span>{" "}
            <span className="tok-command">paint</span>{" "}
            <span className="tok-muted">2d ago</span>
            {"\n"}
            <span className="tok-number">7</span>{" "}
            <span className="tok-command">
              read designing-data-intensive-applications
            </span>
            {"\n"}
            <span className="tok-number">8</span>{" "}
            <span className="tok-command">deploy portfolio</span>{" "}
            <span className="tok-muted">2d ago</span>
            {"\n"}
            <span className="tok-number">9</span>{" "}
            <span className="tok-command">gym</span>{" "}
            <span className="tok-muted">3d ago</span>
          </pre>
        </section>
      </aside>
    </>
  );
}

export function AboutIDEWorkspace() {
  const [activeFile, setActiveFile] = useState("introduction.ts");
  const [openFiles, setOpenFiles] = useState([
    "introduction.ts",
    "engineering.ts",
    "vision.ts",
  ]);
  const [activeView, setActiveView] = useState<"editor" | "career">("editor");
  const openFile = (file: string) => {
    setActiveFile(file);
    setOpenFiles((files) => (files.includes(file) ? files : [...files, file]));
  };

  return (
    <section
      className={`about-ide-workspace ${activeView === "career" ? "career-mode" : ""}`}
      aria-label="About developer workspace"
    >
      <nav className="ide-activity-bar" aria-label="Workspace tools">
        <button
          className={activeView === "editor" ? "active" : ""}
          onClick={() => setActiveView("editor")}
          aria-label="Explorer"
        >
          <ActivityIcon name="explorer" />
        </button>
        <button aria-label="Search">
          <ActivityIcon name="search" />
        </button>
        <button
          className={`git-history-trigger ${activeView === "career" ? "active" : ""}`}
          onClick={() => setActiveView("career")}
          aria-label="Git Career History"
          title="Open Git Career History"
        >
          <ActivityIcon name="source" />
        </button>
        <button aria-label="Run and debug">
          <ActivityIcon name="run" />
        </button>
        <button aria-label="Extensions">
          <ActivityIcon name="extensions" />
        </button>
        <span />
        <button aria-label="Profile">
          <ActivityIcon name="account" />
        </button>
        <button aria-label="Settings">
          <ActivityIcon name="settings" />
        </button>
      </nav>

      {activeView === "career" ? (
        <CareerHistoryWorkspace
          onOpenIntroduction={() => setActiveView("editor")}
        />
      ) : (
        <>
          <aside className="ide-explorer">
            <header>
              <b>EXPLORER</b>
              <button aria-label="New file">＋</button>
            </header>
            <div className="ide-tree-scroll">
              <b className="tree-root">⌄　PORTFOLIO/</b>
              <b className="tree-folder">⌄　about</b>
              {explorerFiles.map((file) => (
                <button
                  className={`tree-file ${activeFile === file ? "active" : ""}`}
                  onClick={() => openFile(file)}
                  key={file}
                >
                  <i>
                    {file.endsWith(".ts")
                      ? "TS"
                      : file.endsWith(".json")
                        ? "{}"
                        : file.endsWith(".toml")
                          ? "⚙"
                          : "!"}
                  </i>
                  {file}
                  <em>
                    {file === "introduction.ts" || file === "workstation.toml"
                      ? "M"
                      : file === "values.ts"
                        ? "●"
                        : ""}
                  </em>
                </button>
              ))}
              {["projects", "experience", "skills", "assets", "docs"].map(
                (folder) => (
                  <b className="tree-folder closed" key={folder}>
                    ▸　{folder}
                  </b>
                ),
              )}
            </div>
            <section className="ide-source-control">
              <h2>SOURCE CONTROL</h2>
              <p>
                <i>◉</i> 4 files modified
              </p>
              <p>
                <i>◉</i> Conflicts resolved
              </p>
              <small>
                Last commit <b>2 hours ago</b>
              </small>
            </section>
            <section className="ide-open-editors">
              <h2>OPEN EDITORS</h2>
              <p>
                <i>TS</i> introduction.ts <em>M</em>
              </p>
              <p>
                <i>TS</i> values.ts <em className="green">●</em>
              </p>
            </section>
          </aside>

          <main className="ide-editor-column">
            <div className="ide-tabs">
              {openFiles.map((tab) => (
                <button
                  className={activeFile === tab ? "active" : ""}
                  onClick={() => openFile(tab)}
                  key={tab}
                >
                  <i>
                    {tab.endsWith(".ts")
                      ? "TS"
                      : tab.endsWith(".json")
                        ? "{}"
                        : "•"}
                  </i>
                  {tab}
                  <span>{tab === "introduction.ts" ? "●" : "×"}</span>
                </button>
              ))}
              <button
                className="career-history-tab"
                onClick={() => setActiveView("career")}
                title="Open Git Career History"
              >
                <ActivityIcon name="source" />
                <span>Git: Career History</span>
              </button>
              <button className="new-tab" aria-label="New tab">
                ＋
              </button>
            </div>
            <div className="ide-breadcrumb">
              portfolio <span>›</span> about <span>›</span> <b>TS</b>{" "}
              {activeFile}
            </div>
            <section
              className={`ide-editor ${activeFile === "introduction.ts" ? "" : "pending"}`}
            >
              <ol
                className="ide-code"
                aria-label="Introduction TypeScript source code"
              >
                <li>
                  <span className="comment">/**</span>
                </li>
                <li>
                  <span className="comment"> * Developer Introduction</span>
                </li>
                <li>
                  <span className="comment"> * Last Updated: 2026-07-18</span>
                </li>
                <li>
                  <span className="comment"> * Git Author: Sambit Pradhan</span>
                </li>
                <li>
                  <span className="comment">
                    {" "}
                    * Purpose: Structured representation of{" "}
                  </span>
                  <span className="green-code">my engineering identity</span>
                </li>
                <li>
                  <span className="comment"> */</span>
                </li>
                <li />
                <li>
                  <span className="keyword">export const</span>{" "}
                  <span className="function">introduction</span> = () =&gt;{" "}
                  {"{"}
                </li>
                <li />
                <li>
                  <span className="comment"> // ▼ Introduction</span>
                </li>
                <li>
                  <span className="keyword"> const</span>{" "}
                  <span className="variable">engineer</span> = {"{"}
                </li>
                <li>
                  {" "}
                  <span className="property">name</span>:{" "}
                  <span className="string">"Sambit Pradhan"</span>,
                </li>
                <li>
                  {" "}
                  <span className="property">role</span>:{" "}
                  <span className="string">"Backend Engineer"</span>,
                </li>
                <li>
                  {" "}
                  <span className="property">mindset</span>:{" "}
                  <span className="string">"production_first"</span>,{" "}
                  <span className="comment">// Ship reliable systems</span>
                </li>
                <li>
                  {" "}
                  <span className="property">architecture</span>:{" "}
                  <span className="string">"scalable_by_design"</span>,{" "}
                  <span className="comment">
                    // Think long-term, build modular
                  </span>
                </li>
                <li>
                  {" "}
                  <span className="property">focus</span>:{" "}
                  <span className="string">"backend_engineering"</span>,{" "}
                  <span className="comment">
                    // APIs, services, data &amp; infra
                  </span>
                </li>
                <li>
                  {" "}
                  <span className="property">passion</span>: [
                  <span className="string">"problem_solving"</span>,{" "}
                  <span className="string">"automation"</span>,{" "}
                  <span className="string">"ai_infrastructure"</span>],
                </li>
                <li>
                  {" "}
                  <span className="property">currentLearning</span>: [
                </li>
                <li>
                  {" "}
                  <span className="string">"advanced_frontend"</span>,
                </li>
                <li>
                  {" "}
                  <span className="string">"distributed_systems"</span>,
                </li>
                <li>
                  {" "}
                  <span className="string">"kubernetes"</span>,
                </li>
                <li>
                  {" "}
                  <span className="string">"system_design"</span>
                </li>
                <li> ],</li>
                <li>
                  {" "}
                  <span className="property">location</span>:{" "}
                  <span className="string">"Kolkata, India"</span>,
                </li>
                <li>
                  {" "}
                  <span className="property">status</span>:{" "}
                  <span className="string">"open_to_opportunities"</span>
                </li>
                <li> {"}"};</li>
                <li />
                <li>
                  <span className="comment"> // ▼ Engineering Philosophy</span>
                </li>
                <li>
                  <span className="keyword"> const</span>{" "}
                  <span className="variable">philosophy</span> = {"{"}
                </li>
                <li>
                  {" "}
                  <span className="property">code</span>:{" "}
                  <span className="string">
                    "Clean, readable, and maintainable"
                  </span>
                  ,
                </li>
                <li>
                  {" "}
                  <span className="property">systems</span>:{" "}
                  <span className="string">
                    "Scalable, observable, and resilient"
                  </span>
                  ,
                </li>
                <li>
                  {" "}
                  <span className="property">approach</span>:{" "}
                  <span className="string">
                    "Solve real problems with elegant abstractions"
                  </span>
                  ,
                </li>
                <li>
                  {" "}
                  <span className="property">belief</span>:{" "}
                  <span className="string">
                    "Developer experience is product experience"
                  </span>
                </li>
                <li> {"}"};</li>
                <li />
                <li>
                  <span className="comment"> // ▸ Personal Interests</span>
                </li>
                <li>
                  <span className="comment"> // ▸ Future Goals</span>
                </li>
                <li>{"}"};</li>
              </ol>
              {activeFile !== "introduction.ts" && (
                <div className="ide-coming-soon">
                  <i>◫</i>
                  <b>{activeFile}</b>
                  <span>This workspace file is queued for implementation.</span>
                  <small>Coming soon</small>
                </div>
              )}
              <aside className="ide-blame">
                <h2>Git Blame</h2>
                {["2d ago", "3d ago", "4d ago", "5d ago", "1w ago"].map(
                  (age, index) => (
                    <div key={age}>
                      <i>◉</i>
                      <span>
                        {age}
                        <br />
                        Sambit
                        <br />
                        <b>
                          {
                            [
                              "fa83d2c",
                              "9b7e1a2",
                              "c21df7",
                              "4ca91e",
                              "a8d9c2f",
                            ][index]
                          }
                        </b>
                      </span>
                    </div>
                  ),
                )}
              </aside>
              <div className="ide-minimap" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </section>
            <section className="ide-terminal-panel">
              <header>
                <b>TERMINAL</b>
                <span>OUTPUT</span>
                <span>
                  PROBLEMS <i>0</i>
                </span>
                <span>DEBUG CONSOLE</span>
                <em>▣ zsh　＋　▯　⌫　⌃</em>
              </header>
              <div>
                <p>
                  <strong>developer@sambit:~/about</strong>$ npm run about
                </p>
                <p>
                  [10:42:28]　<span>✓</span> Introduction loaded
                </p>
                <p>
                  [10:42:28]　<span>✓</span> Engineering philosophy loaded
                </p>
                <p>
                  [10:42:28]　<span>✓</span> Workspace initialized
                </p>
                <p>
                  [10:42:28]　<span>✓</span> Ready.
                </p>
                <p>
                  <strong>developer@sambit:~/about</strong>${" "}
                  <b className="cursor">▌</b>
                </p>
              </div>
            </section>
          </main>

          <aside className="ide-inspector">
            <header>
              INSPECTOR <span>⌘　⌗　◎</span>
            </header>
            <InspectorSection title="FILE INFO">
              <KeyValue label="Language" value="TypeScript" />
              <KeyValue label="Lines" value="182" />
              <KeyValue label="Functions" value="9" />
              <KeyValue label="Interfaces" value="3" />
              <KeyValue label="Comments" value="42%" />
            </InspectorSection>
            <InspectorSection title="GIT">
              <KeyValue label="Current Branch" value="⌘　about-v2" />
              <KeyValue
                label="Latest Commit"
                value="◉　refactor: developer story"
              />
              <KeyValue
                label="Status"
                value={<span className="green">● Clean</span>}
              />
            </InspectorSection>
            <InspectorSection title="ENGINEERING TAGS">
              <div className="ide-tags">
                {tags.map((tag) => (
                  <span
                    className={tag === "Production Ready" ? "ready" : ""}
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </InspectorSection>
            <InspectorSection title="CURRENT FOCUS">
              <div className="ide-focus">
                <p>
                  Building　 <b>▱ Developer Operating System</b>
                </p>
                <p>
                  Status　　<span className="green">● Active</span>
                </p>
                <p>
                  Sprint　　 <b>Week 3 of 4　　━━━</b>
                </p>
              </div>
            </InspectorSection>
            <InspectorSection title="QUICK ACTIONS">
              <div className="ide-actions">
                {[
                  ["▧", "Open Resume"],
                  ["▱", "Open Projects"],
                  ["⚙", "Open Skills"],
                  ["⇩", "Download CV"],
                  ["◉", "GitHub"],
                ].map(([icon, label]) => (
                  <button key={label}>
                    <i>{icon}</i>
                    {label}
                  </button>
                ))}
              </div>
            </InspectorSection>
          </aside>
        </>
      )}
    </section>
  );
}
