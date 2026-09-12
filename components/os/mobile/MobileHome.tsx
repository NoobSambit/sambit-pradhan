import {
  TerminalIcon,
  type TerminalIconName,
} from "@/components/os/TerminalIcon";
import { bootLines, learningNow } from "@/data/dashboard";
import { profileDetails, stackGroups } from "@/data/about";
import { projects } from "@/data/projects";
import { MobileActivity, MobileQuickStats } from "./MobileActivity";
import { MobileDisclosure } from "./MobileDisclosure";
import styles from "./MobileHome.module.css";

const featuredProjectIds = [
  "armyverse",
  "agent-playground",
  "docbuilder",
  "kirana-corner",
] as const;

const featuredProjects = featuredProjectIds.flatMap((id) => {
  const project = projects.find((candidate) => candidate.id === id);
  return project ? [project] : [];
});

const pipeline = [
  ["01", "DISCOVER", "repository + task"],
  ["02", "CONTRACT", "requirements become checks"],
  ["03", "EXECUTE", "controlled tests + attacks"],
  ["04", "CHALLENGE", "independent verification"],
  ["05", "REPORT", "evidence-linked result"],
] as const;

const guarantees = ["Provider-neutral", "Isolated", "Traceable"] as const;

const profileValues = Object.fromEntries(
  profileDetails.map(([, label, value]) => [label, value]),
) as Record<string, string>;

const coreStackNames = ["Backend", "Databases", "Frameworks", "AI / ML"];
const coreStack = stackGroups
  .filter(([name]) => coreStackNames.includes(name))
  .map(([name, packages]) => ({
    label:
      name === "Frameworks" ? "Frontend" : name === "AI / ML" ? "AI" : name,
    packages: packages.slice(0, 4).map(([technology]) => technology),
  }));

function MobileHeader() {
  return (
    <header className={styles.topbar}>
      <a aria-label="Sambit OS home" className={styles.mobileBrand} href="/">
        <span aria-hidden="true">SP_</span>
        <strong>Sambit OS</strong>
      </a>
      <a
        aria-label="Jump to featured projects"
        className={styles.searchButton}
        href="#featured-projects"
      >
        <TerminalIcon name="search" />
      </a>
    </header>
  );
}

function MobileHero() {
  return (
    <section aria-labelledby="mobile-home-title" className={styles.hero}>
      <div className={styles.command}>
        <span>developer@sambit:~/portfolio</span>$ ./boot
      </div>
      <p className={styles.ready}>
        <span aria-hidden="true">●</span> SYSTEM READY — Developer Workspace
        Online
      </p>
      <h1 id="mobile-home-title">
        I build <em>backend-heavy</em> products, design the systems behind them,
        and keep pushing past the <strong>“good enough”</strong> version.
      </h1>
      <p className={styles.heroSupport}>2026 CSE graduate · Backend Engineer</p>
      <div className={styles.heroActions}>
        <a className={styles.primaryAction} href="/projects">
          Explore Projects
        </a>
        <a
          className={styles.secondaryAction}
          href="https://sambit.dev/resume.pdf"
          rel="noopener noreferrer"
          target="_blank"
        >
          Resume
        </a>
        <a
          className={styles.contactAction}
          href="mailto:sambit.pradhan.dev@gmail.com"
        >
          Contact →
        </a>
      </div>
      <MobileQuickStats />
      <MobileDisclosure
        contentId="mobile-terminal-log"
        hideLabel="Hide terminal log"
        showLabel="View terminal log"
      >
        <div className={styles.terminalLog}>
          <div className={styles.bootLog}>
            {bootLines.map((line, index) => (
              <p key={line}>
                <span>[22:42:{String(index + 1).padStart(2, "0")}]</span>
                {line}
                <b>OK ✓</b>
              </p>
            ))}
          </div>
          <p>
            <i>developer@sambit:~$</i> cat currently_building.md
          </p>
          <p>› AgentProof — CLI verification for agent-written code</p>
          <p>› Agent Playground — inspectable agents and persistent state</p>
          <p>
            <i>developer@sambit:~$</i> git status
          </p>
          <p>
            On branch main · working tree clean <b>✓</b>
          </p>
          <p>
            <i>developer@sambit:~$</i> tree projects/
          </p>
          <p className={styles.tree}>
            agentproof/ agent-playground/ armyverse/ gym-tracker/ kisansetu/
          </p>
          <p>
            <i>developer@sambit:~$</i> whoami
          </p>
          <p>Sambit · Backend Engineer · 2026 CSE Grad</p>
          <p>
            <i>developer@sambit:~$</i> systemctl status portfolio.service
          </p>
          <p>
            <b>● active (running)</b> · Sambit OS Portfolio Runtime
          </p>
        </div>
      </MobileDisclosure>
    </section>
  );
}

function MobileNowBuilding() {
  return (
    <section
      aria-labelledby="mobile-now-building-title"
      className={`${styles.section} ${styles.nowBuilding}`}
    >
      <h2 id="mobile-now-building-title">$ currently_building</h2>
      <div className={styles.projectTitle}>
        <h3>AgentProof</h3>
        <span>
          <i aria-hidden="true">●</i> BUILDING
        </span>
      </div>
      <p>
        Verification layer for agent-written software: inspectable results,
        adversarial checks, and replayable evidence.
      </p>
      <div className={styles.outputLine}>
        <span>OUTPUT</span>
        <b>report card · replayable evidence</b>
      </div>
      <div className={styles.guarantees}>
        {guarantees.map((guarantee) => (
          <span key={guarantee}>{guarantee}</span>
        ))}
      </div>
      <MobileDisclosure
        contentId="mobile-audit-pipeline"
        hideLabel="Hide audit pipeline"
        showLabel="View audit pipeline"
      >
        <ol className={styles.pipeline}>
          {pipeline.map(([step, label, detail]) => (
            <li key={step}>
              <b>{step}</b>
              <span>{label}</span>
              <small>{detail}</small>
            </li>
          ))}
        </ol>
      </MobileDisclosure>
    </section>
  );
}

function MobileProfile() {
  return (
    <section
      aria-labelledby="mobile-profile-title"
      className={`${styles.section} ${styles.profile}`}
    >
      <h2 id="mobile-profile-title">$ whoami --profile</h2>
      <div className={styles.profileLead}>
        <img
          alt="Heisenberg ASCII artwork"
          height="72"
          src="/heisenberg_ascii_pfp.png"
          width="56"
        />
        <div>
          <h3>Sambit Pradhan</h3>
          <p>{profileValues.Role}</p>
          <span>
            <i aria-hidden="true">●</i> {profileValues.Availability}
          </span>
        </div>
      </div>
      <dl className={styles.profileFacts}>
        {[
          ["Location", profileValues.Location],
          ["Looking For", profileValues["Looking For"]],
          ["Building Since", profileValues["Building Since"]],
        ].map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <MobileDisclosure
        contentId="mobile-profile-details"
        hideLabel="Less profile details"
        showLabel="More profile details"
      >
        <dl className={styles.profileFacts}>
          {[
            ["Current Status", profileValues.Status],
            ["Timezone", profileValues.Timezone],
            ["Graduation", profileValues.Graduation],
          ].map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </MobileDisclosure>
    </section>
  );
}

function MobileFeaturedProjects() {
  return (
    <section
      aria-labelledby="mobile-projects-title"
      className={`${styles.section} ${styles.featured}`}
      id="featured-projects"
    >
      <h2 id="mobile-projects-title">$ ls ~/featured</h2>
      <div className={styles.projectList}>
        {featuredProjects.map((project) => (
          <a href={`/projects/${project.id}`} key={project.id}>
            <div className={styles.projectRowTitle}>
              <h3>{project.name}</h3>
              <span className={styles[project.tone]}>
                <i aria-hidden="true">●</i> {project.state}
              </span>
            </div>
            <p>{project.tag}</p>
            <div className={styles.projectMeta}>
              <span>{project.stack.slice(0, 3).join(" · ")}</span>
              <b>{project.commitCount} commits</b>
            </div>
            <em aria-hidden="true">→</em>
          </a>
        ))}
      </div>
      <a className={styles.sectionLink} href="/projects">
        View all projects →
      </a>
    </section>
  );
}

function MobileStack() {
  return (
    <section
      aria-labelledby="mobile-stack-title"
      className={`${styles.section} ${styles.stack}`}
    >
      <h2 id="mobile-stack-title">$ stack --core</h2>
      <dl>
        {coreStack.map(({ label, packages }) => (
          <div key={label}>
            <dt>{label.toUpperCase()}</dt>
            <dd>{packages.join(" · ")}</dd>
          </div>
        ))}
      </dl>
      <a className={styles.sectionLink} href="/skills">
        View full stack →
      </a>
    </section>
  );
}

function MobileFocus() {
  return (
    <section
      aria-labelledby="mobile-focus-title"
      className={`${styles.section} ${styles.focus}`}
    >
      <h2 id="mobile-focus-title">$ learning --now</h2>
      <div>
        {learningNow.map(([label, status]) => (
          <p key={label}>
            <span>{label}</span>
            <b>{status}</b>
          </p>
        ))}
      </div>
    </section>
  );
}

function MobileAboutPreview() {
  return (
    <section
      aria-labelledby="mobile-about-title"
      className={`${styles.section} ${styles.about}`}
    >
      <h2 id="mobile-about-title">$ cat about.preview</h2>
      <p>
        I&apos;m a backend-focused 2026 CSE graduate who enjoys product logic,
        architecture, and building systems from scratch.
      </p>
      <p>I started taking software seriously in 2023.</p>
      <a className={styles.sectionLink} href="/about">
        Open About →
      </a>
    </section>
  );
}

const quickLinks = [
  ["github", "GitHub", "https://github.com/NoobSambit", true],
  ["linkedin", "LinkedIn", "https://linkedin.com/in/sambit-pradhan", true],
  ["mail", "Email", "mailto:sambit.pradhan.dev@gmail.com", false],
  ["file-text", "Resume", "https://sambit.dev/resume.pdf", true],
] as const;

function MobileQuickLinks() {
  return (
    <section
      aria-labelledby="mobile-links-title"
      className={`${styles.section} ${styles.links}`}
    >
      <h2 id="mobile-links-title">$ quick --links</h2>
      <nav aria-label="Contact and profile links">
        {quickLinks.map(([icon, label, href, external]) => (
          <a
            href={href}
            key={label}
            rel={external ? "noopener noreferrer" : undefined}
            target={external ? "_blank" : undefined}
          >
            <TerminalIcon name={icon as TerminalIconName} />
            <span>{label}</span>
            <b aria-hidden="true">↗</b>
          </a>
        ))}
      </nav>
    </section>
  );
}

function MobileClosingStatus() {
  return (
    <footer className={styles.closingStatus}>
      <span>
        <i aria-hidden="true">●</i> Portfolio Online
      </span>
      <span>Open to Work</span>
      <span>IST UTC+5:30</span>
    </footer>
  );
}

const bottomNavItems = [
  ["terminal", "Home", "/"],
  ["grid", "Projects", "/projects"],
  ["user", "About", "/about"],
  ["boxes", "Skills", "/skills"],
] as const;

function MobileBottomNav() {
  return (
    <nav aria-label="Mobile portfolio navigation" className={styles.bottomNav}>
      {bottomNavItems.map(([icon, label, href], index) => (
        <a
          aria-current={index === 0 ? "page" : undefined}
          href={href}
          key={label}
        >
          <TerminalIcon name={icon} />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}

export function MobileHome() {
  return (
    <div className={styles.root}>
      <MobileHeader />
      <div className={styles.content}>
        <MobileHero />
        <MobileNowBuilding />
        <MobileProfile />
        <MobileFeaturedProjects />
        <MobileStack />
        <MobileFocus />
        <MobileActivity />
        <MobileAboutPreview />
        <MobileQuickLinks />
        <MobileClosingStatus />
      </div>
      <MobileBottomNav />
    </div>
  );
}
