import { bootLines } from "@/data/dashboard";
import { LiveQuickStats } from "@/components/os/LivePortfolioData";

const motionStyle = (index: number) =>
  ({ "--motion-index": index }) as React.CSSProperties;

export function Terminal() {
  return (
    <section className="terminal panel">
      <div className="terminal-lines">
        <div>
          <span className="blue">developer@sambit:~/portfolio</span>$ ./boot
          --interactive
        </div>
        {bootLines.map((line, index) => (
          <div className="boot" key={line} style={motionStyle(index)}>
            <span>[22:42:{String(index + 1).padStart(2, "0")}]</span>
            <span className="boot-message">{line}</span>
            <b>OK　✓</b>
          </div>
        ))}
        <div className="ready" data-motion="ready">
          [22:42:04]　▣ SYSTEM READY — Developer Workspace Online
        </div>
      </div>
      <div className="intro" data-motion="supporting">
        # Welcome to my engineering operating system
      </div>
      <h1>
        <span className="hero-line" style={motionStyle(0)}>
          I design scalable backend systems,
        </span>
        <br />
        <span className="hero-line" style={motionStyle(1)}>
          distributed architectures,
        </span>
        <br />
        <span className="hero-line" style={motionStyle(2)}>
          and <span className="hero-highlight">AI-powered</span> products
        </span>
        <br />
        <span className="hero-line" style={motionStyle(3)}>
          that run in <strong className="hero-highlight">production.</strong>
        </span>
      </h1>
      <p data-motion="supporting">
        Backend engineer with a product mindset.
        <br />I architect reliable systems, build APIs, and
        <br />
        ship solutions that create real impact.
      </p>
      <div className="terminal-actions" data-motion="supporting">
        <button className="primary">› Explore Projects</button>
        <button>› Download Resume</button>
        <button>› Contact</button>
      </div>
      <LiveQuickStats />
      <div className="command-log" data-motion="supporting">
        <p>
          <i>developer@sambit:~$</i> cat currently_building.md
        </p>
        <p>
          　› DevFlow — AI Copilot Platform for Engineering Teams
          <br />
          　› Real-time codebase understanding and autonomous task execution
        </p>
        <p>
          <i>developer@sambit:~$</i> git status
        </p>
        <p>
          On branch main
          <br />
          Your branch is up to date with 'origin/main'.
          <br />
          nothing to commit, working tree clean　 <b>✓</b>
        </p>
        <p>
          <i>developer@sambit:~$</i> tree projects/
        </p>
        <p className="tree">
          devflow/　 api-gateway/　 auth-service/　 event-stream/　
          analytics-pipeline/
        </p>
        <p>
          <i>developer@sambit:~$</i> whoami
        </p>
        <p>
          Sambit · Backend Engineer · System Architect · Problem Solver
          <br />
          <span className="green">
            Building reliable systems that make an impact.
          </span>
        </p>
        <p>
          <i>developer@sambit:~$</i> systemctl status portfolio.service
        </p>
        <p>
          <span className="green">
            ● portfolio.service — Sambit OS Portfolio Runtime
          </span>
          <br />　 Loaded: loaded (/etc/portfolio.service; enabled)　　✓
          <br />　 Active: <b className="green">active (running)</b> since today
          21:11:07
        </p>
        <p>
          <i>developer@sambit:~$</i> <strong className="cursor">▌</strong>
        </p>
      </div>
    </section>
  );
}
