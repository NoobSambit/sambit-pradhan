import {
  career,
  engineeringConfig,
  profileDetails,
  stackGroups,
} from "@/data/about";
import {
  TerminalIcon,
  type TerminalIconName,
} from "@/components/os/TerminalIcon";
import { TechIcon } from "@/components/os/TechIcon";

const motionStyle = (index: number) =>
  ({ "--motion-index": index }) as React.CSSProperties;

export function ProfileCard() {
  return (
    <>
      <section className="profile-card panel" data-motion-section="about-profile">
        <div className="terminal-prompt">
          <span>developer@sambit:~/profile</span>$ whoami
        </div>
        <div
          className="avatar"
          aria-label="Stylized portrait of Sambit Pradhan"
        >
          <div className="avatar-head">
            <i />
            <b />
            <em />
          </div>
        </div>
        <h2>
          Sambit Pradhan <span><i className="status-dot">●</i> Online</span>
        </h2>
        <div className="profile-details">
          {profileDetails.map(([icon, label, value], index) => (
            <div key={label} style={motionStyle(index)}>
              <i><TerminalIcon name={icon as TerminalIconName} /></i>
              <span>{label}</span>
              <b
                className={
                  label === "Status" || label === "Availability" ? "green" : ""
                }
              >
                {value}
              </b>
            </div>
          ))}
        </div>
      </section>
      <section className="identity panel" data-motion-section="about-identity">
        <div className="terminal-prompt">
          <span>developer@sambit:~/profile</span>$ id
        </div>
        {[
          ["uid", "1001"],
          ["username", "developer"],
          ["workspace", "~/portfolio"],
          ["shell", "/bin/zsh"],
          ["editor", "nvim"],
          ["os", "Arch Linux x86_64"],
          ["git_user", "sambit-pradhan"],
          ["theme", "ayu-dark"],
          ["terminal_font", "JetBrains Mono"],
        ].map(([key, value], index) => (
          <div key={key} style={motionStyle(index)}>
            <span>{key}</span>
            <b>:　{value}</b>
          </div>
        ))}
        <p>
          <span>developer@sambit:~/profile</span>$ <b className="cursor">▌</b>
        </p>
      </section>
    </>
  );
}

export function AboutContent() {
  return (
    <section className="about-content panel" data-motion-section="about-content">
      <div className="terminal-prompt">
        <span>developer@sambit:~/about</span>$ cat whoami.md
      </div>
      <article>
        <h1>WHOAMI</h1>
        <p style={motionStyle(0)}>
          I&apos;m a <strong>backend engineer</strong> and 2026 CSE graduate. I
          mostly work on backend-heavy products and the system logic that makes
          them hold together.
        </p>
        <p style={motionStyle(1)}>
          I started taking software seriously in{" "}
          <strong className="blue">2023</strong>, moving from rebuilding
          existing projects to shipping ideas of my own.
        </p>
        <p style={motionStyle(2)}>
          I like projects that get complicated before they get good. I keep
          working through the details after the first version works.
        </p>
        <p style={motionStyle(3)}>
          Right now I&apos;m building <strong className="purple">AgentProof</strong>
          and Agent Playground while going deeper into system design, CLI
          tooling, and code review systems.
        </p>
      </article>
      <div className="career">
        <div className="section-command">$ git log --career</div>
        {career.map(([hash, title, date], index) => (
          <div
            className={`career-row ${index === career.length - 1 ? "current" : ""}`}
            key={hash}
            style={motionStyle(index)}
          >
            <i>●</i>
            <span>{hash}</span>
            <b>{title}</b>
            <time>{date}</time>
          </div>
        ))}
      </div>
      <div className="principles">
        <div className="section-command">$ cat engineering.conf</div>
        {engineeringConfig.map(([key, value], index) => (
          <div key={key} style={motionStyle(index)}>
            <span>{key}</span>
            <i>=</i>
            <b>{value}</b>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TechnologyStack() {
  return (
    <section className="technology-stack panel" data-motion-section="about-stack">
      <div className="terminal-prompt">$ npm ls --depth=0</div>
      <div className="stack-grid">
        {stackGroups.map(([name, packages], categoryIndex) => (
          <article key={name} style={motionStyle(categoryIndex)}>
            <h2><TechIcon name={name} /> {name}</h2>
            {packages.map(([pkg, version], packageIndex) => (
              <div key={pkg} style={motionStyle(packageIndex)}>
                <i><TechIcon name={pkg} /></i>
                <span>{pkg}</span>
                <b>{version}</b>
              </div>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}

export function LearningAndDiagnostics() {
  const habits = [
    ["project_horizon", "months > weekends"],
    ["iteration_mode", "ship → test → revisit"],
    ["default_focus", "product logic"],
    ["backend_bias", "strong"],
    ["current_rabbit_hole", "CLI verification"],
    ["stop_condition", 'not "works on my machine"'],
  ] as const;
  return (
    <>
      <section className="learning panel" data-motion-section="about-learning">
        <div className="panel-title">$ learning --now</div>
        <div className="learning-note">
          <span>system_design</span>
          <b>active</b>
        </div>
        <div className="learning-note">
          <span>cli_tooling</span>
          <b>active</b>
        </div>
        <div className="learning-note">
          <span>code_review_systems</span>
          <b>active</b>
        </div>
        <div className="learning-note">
          <span>security_review</span>
          <b>exploring</b>
        </div>
      </section>
      <section className="diagnostics panel" data-motion-section="about-diagnostics">
        <div className="panel-title">$ diagnostics --habits</div>
        {habits.map(([label, value], rowIndex) => (
          <div key={label} style={motionStyle(rowIndex)}>
            <span>{label}</span>
            <b>{value}</b>
          </div>
        ))}
      </section>
    </>
  );
}

export function AboutInfo() {
  const info = [
    ["Building Since", "2023"],
    ["Projects Built", "18+"],
    ["Repositories", "42"],
    ["Contributions", "512+"],
    ["GitHub Streak", "23 days"],
    ["Deployments", "60+"],
    ["Production Systems", "12"],
    ["APIs Built", "37"],
    ["Database Models", "24"],
    ["AI Applications", "6"],
    ["Last Release", "v2.1.0"],
    ["Latest Commit", "2h ago"],
    ["Architecture Style", "Microservices"],
    ["Backend Runtime", "Node.js 20"],
    ["Infra Provider", "AWS"],
  ];
  return (
    <section className="about-info panel" data-motion-section="about-info">
      <div className="panel-title">$ info</div>
      {info.map(([label, value], index) => (
        <div key={label} style={motionStyle(index)}>
          <span>{label}</span>
          <b>:　{value}</b>
        </div>
      ))}
    </section>
  );
}

export function AboutCommands() {
  return (
    <section className="about-commands panel" data-motion-section="about-commands">
      <span>
        <b>developer@sambit:~/profile</b>$ <i>▌</i>
      </span>
      {[
        ["cat experience.md", "View detailed timeline"],
        ["open resume.pdf", "Open resume"],
        ["ls certifications/", "View certifications"],
        ["cat strengths.txt", "View strengths"],
        ["goto projects/", "Explore projects"],
        ["help", "Show commands"],
      ].map(([cmd, text]) => (
        <button key={cmd}>
          <b>{cmd}</b>
          <small>{text}</small>
        </button>
      ))}
    </section>
  );
}
