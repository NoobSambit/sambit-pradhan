"use client";

import { useState, type ReactNode } from "react";
import {
  certifications,
  engineeringTags,
  skillExplorerFiles,
  skillMatrix,
  stackSummary,
} from "@/data/skills";

type ActivityName =
  | "files"
  | "search"
  | "source"
  | "extensions"
  | "blocks"
  | "target"
  | "account"
  | "settings";

function ActivityIcon({ name }: { name: ActivityName }) {
  const icons: Record<ActivityName, ReactNode> = {
    files: (
      <>
        <path d="M4 3h10l4 4v14H4z" />
        <path d="M14 3v5h4M7 12h8M7 16h8" />
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
    extensions: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </>
    ),
    blocks: (
      <>
        <path d="M4 5h6v6H4zM14 5h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v3M12 20v3M1 12h3M20 12h3" />
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
    <svg
      className="skills-activity-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

function Rating({ value }: { value: number }) {
  return (
    <span className="skill-rating" aria-label={`${value} out of 10 confidence`}>
      {Array.from({ length: 10 }, (_, index) => (
        <i className={index < value ? "on" : ""} key={index} />
      ))}
    </span>
  );
}

function SourceCode({ activeFile }: { activeFile: string }) {
  if (activeFile !== "engineering_stack.ts")
    return (
      <div className="skills-coming-soon">
        <i>⌘</i>
        <b>{activeFile}</b>
        <span>Detailed skill notes are being prepared in this workspace.</span>
        <small>Coming soon</small>
      </div>
    );
  const rows = [
    <>
      export const <b>EngineeringStack</b> = {"{"}
    </>,
    <>
      　languages: [<em>'TypeScript'</em>, <em>'Python'</em>, <em>'SQL'</em>,{" "}
      <em>'Go'</em>, <em>'Java'</em>],
    </>,
    <>
      　frameworks: [<em>'Next.js'</em>, <em>'FastAPI'</em>,{" "}
      <em>'Express.js'</em>, <em>'React'</em>, <em>'TailwindCSS'</em>],
    </>,
    <>
      　backend: [<em>'Node.js'</em>, <em>'NestJS'</em>, <em>'GraphQL'</em>,{" "}
      <em>'REST'</em>, <em>'WebSockets'</em>],
    </>,
    <>
      　frontend: [<em>'Next.js'</em>, <em>'React'</em>, <em>'TypeScript'</em>,{" "}
      <em>'Zustand'</em>, <em>'TanStack Query'</em>],
    </>,
    <>
      　databases: [<em>'PostgreSQL'</em>, <em>'MongoDB'</em>, <em>'Redis'</em>,{" "}
      <em>'Prisma'</em>, <em>'SQLite'</em>],
    </>,
    <>
      　cloud: [<em>'AWS'</em>, <em>'Vercel'</em>, <em>'Cloudflare'</em>,{" "}
      <em>'S3'</em>, <em>'Lambda'</em>],
    </>,
    <>
      　devops: [<em>'Docker'</em>, <em>'Kubernetes'</em>,{" "}
      <em>'GitHub Actions'</em>, <em>'Nginx'</em>, <em>'Terraform'</em>],
    </>,
    <>
      　ai: [<em>'OpenAI'</em>, <em>'LangChain'</em>, <em>'RAG'</em>,{" "}
      <em>'Vector DB'</em>, <em>'Pinecone'</em>, <em>'LlamaIndex'</em>],
    </>,
    <>
      　testing: [<em>'Jest'</em>, <em>'PyTest'</em>, <em>'Playwright'</em>,{" "}
      <em>'Postman'</em>, <em>'K6'</em>],
    </>,
    <>
      　architecture: [<em>'Microservices'</em>, <em>'Event Driven'</em>,{" "}
      <em>'Serverless'</em>, <em>'CI/CD'</em>],
    </>,
    <>
      　currentLearning: [<em>'Distributed Systems'</em>, <em>'Kubernetes'</em>,{" "}
      <em>'LLM Engineering'</em>],
    </>,
    <>
      　principles: [<em>'Clean'</em>, <em>'Simple'</em>, <em>'Observable'</em>,{" "}
      <em>'Secure'</em>, <em>'DX'</em>],
    </>,
    <>{"}"} as const;</>,
    <></>,
    <span className="skills-comment">
      // Continuously evolving. Shipping daily.
    </span>,
    <span className="skills-comment">
      // Building systems that solve real-world problems at scale.
    </span>,
  ];
  return (
    <ol className="skills-code">
      {rows.map((row, index) => (
        <li key={index}>{row}</li>
      ))}
    </ol>
  );
}

export function SkillsIDEWorkspace() {
  const [activeFile, setActiveFile] = useState("engineering_stack.ts");
  const [openFiles, setOpenFiles] = useState(["engineering_stack.ts"]);
  const selectFile = (file: string) => {
    setActiveFile(file);
    setOpenFiles((current) =>
      current.includes(file) ? current : [...current, file],
    );
  };

  return (
    <section
      className="skills-ide-workspace"
      aria-label="Skills developer workspace"
    >
      <nav className="skills-activity-bar" aria-label="Skills workspace tools">
        <button className="active" aria-label="Explorer">
          <ActivityIcon name="files" />
        </button>
        <button aria-label="Search">
          <ActivityIcon name="search" />
        </button>
        <button aria-label="Source Control">
          <ActivityIcon name="source" />
        </button>
        <button aria-label="Extensions">
          <ActivityIcon name="extensions" />
        </button>
        <button aria-label="Skill blocks">
          <ActivityIcon name="blocks" />
        </button>
        <button aria-label="Focus">
          <ActivityIcon name="target" />
        </button>
        <span />
        <button aria-label="Profile">
          <ActivityIcon name="account" />
        </button>
        <button aria-label="Settings">
          <ActivityIcon name="settings" />
        </button>
      </nav>

      <aside className="skills-explorer">
        <header>
          <b>EXPLORER</b>
          <span>＋　•••</span>
        </header>
        <div className="skills-tree">
          <b>⌄　PORTFOLIO/</b>
          <b>⌄　 skills</b>
          {skillExplorerFiles.map(([type, file, status]) => (
            <button
              className={activeFile === file ? "active" : ""}
              onClick={() => selectFile(file)}
              key={file}
            >
              <i>{type}</i>
              <span>{file}</span>
              <em>{status}</em>
            </button>
          ))}
        </div>
        <section className="skills-snapshot">
          <h2>DEVELOPER SNAPSHOT　⌘</h2>
          <div>
            <span className="skills-avatar">SP</span>
            <p>
              <b>Sambit Pradhan</b>
              <small>Backend Engineer</small>
              <em>● Online</em>
            </p>
          </div>
          <ul>
            <li>◉ Backend-first</li>
            <li>◇ System Design</li>
            <li>✦ AI Engineering</li>
            <li>▣ Production Mindset</li>
          </ul>
          <footer>
            <b>Current Focus</b>
            <span>Building Developer Operating System</span>
            <small>● Open to Opportunities</small>
          </footer>
        </section>
      </aside>

      <main className="skills-editor-column">
        <nav className="skills-tabs" aria-label="Open skill documents">
          {openFiles.map((file) => (
            <button
              className={activeFile === file ? "active" : ""}
              onClick={() => selectFile(file)}
              key={file}
            >
              <i>{file.endsWith(".ts") ? "TS" : "{}"}</i>
              {file}
              <span>{file === "engineering_stack.ts" ? "●" : "×"}</span>
            </button>
          ))}
          <button className="skills-new-tab" aria-label="New editor tab">
            ＋
          </button>
        </nav>
        <div className="skills-breadcrumb">
          portfolio <span>›</span> skills <span>›</span> <b>TS</b> {activeFile}
        </div>
        <section
          className={`skills-code-panel ${activeFile === "engineering_stack.ts" ? "" : "pending"}`}
        >
          <p>
            <b>developer@sambit:~/skills</b>$ cat {activeFile}
          </p>
          <SourceCode activeFile={activeFile} />
          <aside className="skills-minimap">
            {Array.from({ length: 26 }, (_, index) => (
              <i key={index} />
            ))}
          </aside>
        </section>
        <section className="skills-matrix">
          <header>$ skills --matrix</header>
          <div className="skills-matrix-head">
            <span>Technology</span>
            <span>Experience</span>
            <span>Confidence</span>
            <span>Production Usage</span>
            <span>Current Level</span>
            <span>Last Used</span>
          </div>
          <div className="skills-matrix-body">
            {skillMatrix.map(
              ([name, experience, confidence, usage, level, lastUsed]) => (
                <div key={name}>
                  <span>◉　{name}</span>
                  <span>{experience}</span>
                  <Rating value={confidence} />
                  <span
                    className={
                      usage === "Production Ready" ? "verified" : "growth"
                    }
                  >
                    ● {usage}
                  </span>
                  <span>{level}</span>
                  <span>{lastUsed}</span>
                </div>
              ),
            )}
          </div>
        </section>
        <section className="skills-bottom-data">
          <article>
            <header>$ certifications.log</header>
            <div className="skills-cert-head">
              <span>Date</span>
              <span>Source</span>
              <span>Certification</span>
              <span>Status</span>
            </div>
            {certifications.map(([date, source, certification]) => (
              <div className="skills-cert" key={certification}>
                <span>{date}</span>
                <span>{source}</span>
                <span>{certification}</span>
                <b>VERIFIED</b>
              </div>
            ))}
          </article>
          <article>
            <header>$ tools.sh</header>
            <p>Installed packages (global)</p>
            <div className="skills-tools">
              {[
                "git　 2.44.0",
                "figma　 latest",
                "aws-cli　 2.15.0",
                "docker　 24.0.6",
                "jira　 latest",
                "k9s　 latest",
                "cursor　 latest",
                "linux　 (arch)",
                "htop　 latest",
                "vscode　 latest",
                "warp　 latest",
                "jq　 latest",
                "postman　 latest",
                "github-cli　latest",
                "ripgrep　latest",
              ].map((tool) => (
                <span key={tool}>✓　{tool}</span>
              ))}
            </div>
          </article>
        </section>
        <section className="skills-terminal">
          <header>
            <b>TERMINAL</b>
            <span>OUTPUT</span>
            <span>PROBLEMS</span>
            <span>DEBUG CONSOLE</span>
            <em>◉ zsh　＋　▣　⌫　⌃</em>
          </header>
          <p>
            <b>developer@sambit:~/skills</b>$ echo $CURRENT_FOCUS
            <br />
            Backend Architecture
            <br />
            AI Systems
            <br />
            Production APIs
            <br />
            Developer Tooling
            <br />
            System Design
            <br />
            <b>developer@sambit:~/skills</b>$ <i>▌</i>
          </p>
        </section>
      </main>

      <aside className="skills-inspector">
        <section>
          <header>$ stack --summary</header>
          {stackSummary.map(([label, count, level]) => (
            <div className="skills-summary-row" key={label}>
              <span>▣　{label}</span>
              <b>{count}</b>
              <em className={level === "Intermediate" ? "intermediate" : ""}>
                ● {level}
              </em>
            </div>
          ))}
        </section>
        <section>
          <header>$ current_focus --overview</header>
          {[
            ["Production Backend", 90],
            ["Distributed Systems", 70],
            ["AI Systems", 65],
            ["Developer Experience", 80],
            ["LLM Infrastructure", 55],
          ].map(([label, value]) => (
            <div className="skills-focus-row" key={label as string}>
              <span>{label}</span>
              <i>
                <b style={{ width: `${value}%` }} />
              </i>
              <em>{value}%</em>
            </div>
          ))}
        </section>
        <div className="skills-inspector-split">
          <section>
            <header>$ recently_used --top</header>
            {[
              "Node.js　　2h ago",
              "FastAPI　　2h ago",
              "Next.js　　1d ago",
              "PostgreSQL　3h ago",
              "Docker　　4h ago",
              "LangChain　1d ago",
              "GitHub Actions　2d ago",
              "Redis　　3h ago",
            ].map((item) => (
              <p key={item}>◉　{item}</p>
            ))}
          </section>
          <section>
            <header>$ tags --engineer</header>
            <div className="skills-tags">
              {engineeringTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </section>
        </div>
        <section className="skills-actions">
          <header>$ actions --quick</header>
          <a>▣　Open Resume</a>
          <a>◉　GitHub</a>
          <a>▦　Projects</a>
          <a>⇩　About</a>
          <a>◉　Learning Roadmap</a>
          <a>⇩　Download CV</a>
        </section>
      </aside>
    </section>
  );
}
