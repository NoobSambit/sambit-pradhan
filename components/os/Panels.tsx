import { learningNow, skills } from "@/data/dashboard";
import {
  LiveActivityStreaks,
  LiveGitLog,
} from "@/components/os/LivePortfolioData";
import {
  TerminalIcon,
  type TerminalIconName,
} from "@/components/os/TerminalIcon";
import { TechIcon } from "@/components/os/TechIcon";

const motionStyle = (index: number) =>
  ({ "--motion-index": index }) as React.CSSProperties;

function PanelTitle({ children }: { children: React.ReactNode }) {
  return <div className="panel-title">$ {children}</div>;
}

export function ActiveProject() {
  const details = [
    ["briefcase", "Role", "Backend Engineer"],
    ["activity", "Status", "Building"],
    ["check-circle", "Availability", "Open to Opportunities"],
    ["map-pin", "Location", "Kolkata, India"],
    ["clock", "Timezone", "IST (UTC +5:30)"],
    ["layers", "Looking For", "Backend · Full Stack · SWE"],
    ["timer", "Building Since", "2023"],
    ["type", "Graduation", "2026"],
  ];
  return (
    <section
      className="active-project profile-overview panel"
      data-motion-section="overview-profile"
    >
      <PanelTitle>
        whoami --profile <span className="live"><i className="status-dot">●</i> ONLINE</span>
      </PanelTitle>
      <div className="profile-overview-body profile-with-image">
        <div className="mini-avatar heisenberg-avatar">
          <img
            src="/heisenberg_ascii_pfp.png"
            width="1688"
            height="2394"
            alt="Heisenberg ASCII artwork"
          />
        </div>
        <div className="profile-overview-details">
          <h2>Sambit Pradhan</h2>
          {details.map(([icon, label, value], index) => (
            <div key={label} style={motionStyle(index)}>
              <i><TerminalIcon name={icon as TerminalIconName} /></i>
              <span>{label}</span>
              <b className={label === "Status" ? "green" : ""}>{value}</b>
            </div>
          ))}
        </div>
      </div>
      <footer>
        profile loaded　 <span className="green">✓</span>　 open to engineering
        roles
      </footer>
    </section>
  );
}

export function Architecture() {
  return (
    <section
      className="architecture activity-streaks panel"
      data-motion-section="overview-graphs"
    >
      <PanelTitle>
        coding_activity --streaks <span><TerminalIcon name="external-link" /></span>
      </PanelTitle>
      <LiveActivityStreaks />
    </section>
  );
}

export function GitLog() {
  return (
    <section className="git-log panel" data-motion-section="overview-git">
      <PanelTitle>
        git log --graph <span className="blue"><TerminalIcon name="git-branch" /> main</span>
      </PanelTitle>
      <div className="git-rows">
        <LiveGitLog />
      </div>
      <div className="commit-graph" />
    </section>
  );
}

export function Skills() {
  return (
    <section className="skills panel" data-motion-section="overview-skills">
      <PanelTitle>stack --working-set</PanelTitle>
      <div className="skill-grid">
        {skills.map((skill, index) => (
          <span key={skill} style={motionStyle(index)}>
            <TechIcon name={skill} />
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

export function Roadmap() {
  return (
    <section className="roadmap panel" data-motion-section="overview-roadmap">
      <PanelTitle>learning --now</PanelTitle>
      {learningNow.map(([label, status, attention], index) => (
        <div key={label} style={motionStyle(index)}>
          <span>{label}</span>
          <b>
            <i
              style={{ "--bar-level": `${attention}%` } as React.CSSProperties}
              aria-hidden="true"
            />
          </b>
          <small>{status}</small>
        </div>
      ))}
      <footer>current attention</footer>
    </section>
  );
}

export function ProjectDossier() {
  const pipeline = [
    ["01", "DISCOVER", "repository + task"],
    ["02", "CONTRACT", "requirements become checks"],
    ["03", "EXECUTE", "controlled tests + attacks"],
    ["04", "CHALLENGE", "independent verification"],
    ["05", "REPORT", "evidence-linked result"],
  ] as const;
  const guarantees = [
    ["PROVIDER-NEUTRAL", "Codex · Claude · Gemini · OpenCode"],
    ["DURABLE", "resume · cancel · lease safely"],
    ["ISOLATED", "disposable worktrees · no target writes"],
    ["TRACEABLE", "commit-bound evidence graph"],
  ] as const;

  return (
    <section className="project-dossier panel" data-motion-section="overview-active-project">
      <PanelTitle>
        active project <span className="project-dossier-status"><i className="status-dot">●</i> AgentProof · BUILDING</span>
      </PanelTitle>
      <div className="project-dossier-body">
        <div className="project-dossier-intro">
          <div className="project-dossier-label"><TerminalIcon name="terminal" /> LOCAL-FIRST / AI-DRIVEN</div>
          <h2>AgentProof</h2>
          <p>
            I’m building the verification layer for agent-written software: a CLI that turns
            an agent’s work into a result you can inspect, challenge, and replay.
          </p>
          <div className="project-dossier-io">
            <div><b>INPUT</b><span>repo · task · audit depth</span></div>
            <div><b>OUTPUT</b><span>report card · replayable evidence</span></div>
          </div>
        </div>
        <div className="project-dossier-pipeline">
          <div className="project-dossier-section-title">audit pipeline</div>
          {pipeline.map(([step, label, detail], index) => (
            <div key={step} style={motionStyle(index)}>
              <b>{step}</b>
              <span>{label}</span>
              <small>{detail}</small>
            </div>
          ))}
        </div>
        <div className="project-dossier-guarantees">
          <div className="project-dossier-section-title">engineering surface</div>
          {guarantees.map(([label, detail], index) => (
            <div key={label} style={motionStyle(index)}>
              <b>{label}</b>
              <span>{detail}</span>
            </div>
          ))}
        </div>
      </div>
      <footer>
        active project loaded　<span className="green">✓</span>　verification layer for agent-written software
      </footer>
    </section>
  );
}

export function QuickLinks() {
  return (
    <section className="quick-links panel" data-motion-section="overview-links">
      <PanelTitle>quick --links</PanelTitle>
      {[
        ["github", "GitHub", "github.com/sambit-pradhan"],
        ["file-text", "Resume", "sambit.dev/resume.pdf"],
        ["linkedin", "LinkedIn", "linkedin.com/in/sambit-pradhan"],
        ["mail", "Email", "sambit.pradhan.dev@gmail.com"],
      ].map(([i, l, v], index) => (
        <div key={l} style={motionStyle(index)}>
          <i><TerminalIcon name={i as TerminalIconName} /></i>
          <b>{l}</b>
          <span>{v}</span>
          <em><TerminalIcon name="external-link" /></em>
        </div>
      ))}
    </section>
  );
}
