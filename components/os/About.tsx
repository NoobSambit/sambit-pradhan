import { career, profileDetails, stackGroups } from "@/data/about";

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
              <i>{icon}</i>
              <span>{label}</span>
              <b
                className={
                  label === "Status" || label === "Open To Work" ? "green" : ""
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
          I&apos;m a <strong>backend engineer</strong> who designs and builds
          scalable, reliable and high-performance systems that power real-world
          products.
        </p>
        <p style={motionStyle(1)}>
          I specialize in{" "}
          <strong className="purple">distributed architectures</strong>, API
          design, and infrastructure that scales with clarity and resilience.
        </p>
        <p style={motionStyle(2)}>
          I enjoy solving complex problems, building{" "}
          <strong>clean abstractions</strong>, and delivering exceptional
          developer experiences.
        </p>
        <p style={motionStyle(3)}>
          Currently focusing on{" "}
          <strong className="purple">AI-powered systems</strong>, LLM
          infrastructure, and building the next generation of intelligent
          applications.
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
        <div className="section-command">$ cat values.conf</div>
        {[
          ["performance", "enabled"],
          ["maintainability", "enabled"],
          ["scalability", "enabled"],
          ["developer_experience", "enabled"],
          ["observability", "enabled"],
          ["security", "enabled"],
          ["simplicity", "enabled"],
          ["continuous_learning", "enabled"],
          ].map(([key, value], index) => (
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
            <h2>▣ {name}</h2>
            {packages.map(([pkg, version], packageIndex) => (
              <div key={pkg} style={motionStyle(packageIndex)}>
                <i>◉</i>
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
  const learning = [
    ["Distributed Systems", 68, "High"],
    ["Kubernetes", 54, "High"],
    ["Cloud Infrastructure", 62, "High"],
    ["LLM Engineering", 71, "High"],
    ["System Design", 60, "Medium"],
    ["High Performance APIs", 78, "Medium"],
  ] as const;
  const health = [
    ["Backend Engineering", 92],
    ["System Design", 88],
    ["API Design", 90],
    ["Performance", 82],
    ["Developer Experience", 85],
    ["AI Integration", 80],
  ] as const;
  return (
    <>
      <section className="learning panel" data-motion-section="about-learning">
        <div className="panel-title">
          $ learning --roadmap <small>Progress　 Priority</small>
        </div>
        {learning.map(([name, value, priority], index) => (
          <div key={name} style={motionStyle(index)}>
            <span>{name}</span>
            <i>
                <b style={{ "--bar-level": `${value}%` } as React.CSSProperties} />
            </i>
            <em>{value}%</em>
            <strong className={priority === "High" ? "high" : "medium"}>
              {priority}
            </strong>
          </div>
        ))}
      </section>
      <section className="diagnostics panel" data-motion-section="about-diagnostics">
        <div className="panel-title">$ diagnostics --profile</div>
        {health.map(([label, value], rowIndex) => (
          <div key={label} style={motionStyle(rowIndex)}>
            <span>{label}</span>
            <i>
              {Array.from({ length: 10 }).map((_, index) => (
                <b
                  className={index < Math.round(value / 10) ? "full" : ""}
                  style={
                    {
                      "--motion-index": index,
                      "--motion-row": rowIndex,
                    } as React.CSSProperties
                  }
                  key={index}
                />
              ))}
            </i>
            <em>{value}%</em>
          </div>
        ))}
      </section>
    </>
  );
}

export function AboutInfo() {
  const info = [
    ["Years Coding", "3+"],
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
