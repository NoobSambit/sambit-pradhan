import { roadmap, skills } from "@/data/dashboard";
import {
  LiveActivityStreaks,
  LiveGitLog,
  LiveRelease,
} from "@/components/os/LivePortfolioData";
import {
  TerminalIcon,
  type TerminalIconName,
} from "@/components/os/TerminalIcon";

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
    ["layers", "Preferred Role", "Backend / Infra"],
    ["timer", "Experience", "3+ Years"],
    ["activity", "Response Time", "< 24h"],
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
        profile loaded　 <span className="green">✓</span>　 available for
        impactful work
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
      <PanelTitle>npm ls --depth=0</PanelTitle>
      <div className="skill-grid">
        {skills.map((skill, index) => (
          <span key={skill} style={motionStyle(index)}>
            <i className={`skill-dot d${index % 6}`} />
            {skill}
          </span>
        ))}
      </div>
      <footer>32 packages installed</footer>
    </section>
  );
}

export function Roadmap() {
  return (
    <section className="roadmap panel" data-motion-section="overview-roadmap">
      <PanelTitle>learning --roadmap</PanelTitle>
      {roadmap.map(([label, value], index) => (
        <div key={label} style={motionStyle(index)}>
          <span>{label}</span>
          <b>
            <i style={{ "--bar-level": `${value}%` } as React.CSSProperties} />
          </b>
          <small>{value}%</small>
        </div>
      ))}
      <footer>2 active courses</footer>
    </section>
  );
}

export function SystemInfo() {
  const rows = [
    "clean_architecture",
    "performance_first",
    "developer_experience",
    "maintainability",
    "scalability",
    "observability",
    "security",
    "simplicity",
  ];
  return (
    <section className="system-info panel" data-motion-section="overview-principles">
      <PanelTitle>systemctl --principles</PanelTitle>
      {rows.map((row, index) => (
        <div key={row} style={motionStyle(index)}>
          <span>{row}</span>
          <b>enabled</b>
        </div>
      ))}
      <footer>config loaded　✓</footer>
    </section>
  );
}

export function Environment() {
  return (
    <section className="environment panel" data-motion-section="overview-environment">
      <PanelTitle>env --info</PanelTitle>
      {[
        ["Runtime", "Node.js 20.x"],
        ["Language", "TypeScript"],
        ["Architecture", "Microservices"],
        ["Infra Provider", "AWS (ECS)"],
        ["Region", "ap-south-1"],
        ["Monitoring", "Datadog"],
        ["Logging", "Grafana Loki"],
        ["Tracing", "OpenTelemetry"],
      ].map(([l, v], index) => (
        <div key={l} style={motionStyle(index)}>
          <span>{l}</span>
          <b>{v}</b>
        </div>
      ))}
    </section>
  );
}

export function Releases() {
  return (
    <section className="releases panel" data-motion-section="overview-releases">
      <PanelTitle>releases --latest</PanelTitle>
      <LiveRelease />
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
