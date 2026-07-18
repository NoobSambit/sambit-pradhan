import { roadmap, skills } from "@/data/dashboard";
import { LiveActivityStreaks, LiveGitLog, LiveRelease } from "@/components/os/LivePortfolioData";

function PanelTitle({ children }: { children: React.ReactNode }) { return <div className="panel-title">$ {children}</div>; }

export function ActiveProject() {
  const details = [["♙", "Role", "Backend Engineer"], ["▣", "Status", "Building"], ["◉", "Availability", "Open to Opportunities"], ["⌖", "Location", "Kolkata, India"], ["◷", "Timezone", "IST (UTC +5:30)"], ["♧", "Preferred Role", "Backend / Infra"], ["⌘", "Experience", "3+ Years"], ["◉", "Response Time", "< 24h"]];
  return <section className="active-project profile-overview panel"><PanelTitle>whoami --profile <span className="live">● ONLINE</span></PanelTitle><div className="profile-overview-body profile-with-image"><div className="mini-avatar heisenberg-avatar"><img src="/heisenberg_ascii_pfp.png" width="1688" height="2394" alt="Heisenberg ASCII artwork" /></div><div className="profile-overview-details"><h2>Sambit Pradhan</h2>{details.map(([icon, label, value]) => <div key={label}><i>{icon}</i><span>{label}</span><b className={label === "Status" ? "green" : ""}>{value}</b></div>)}</div></div><footer>profile loaded　 <span className="green">✓</span>　 available for impactful work</footer></section>;
}

export function Architecture() {
  return <section className="architecture activity-streaks panel"><PanelTitle>coding_activity --streaks <span>↗</span></PanelTitle><LiveActivityStreaks /></section>;
}

export function GitLog() {
  return <section className="git-log panel"><PanelTitle>git log --graph <span className="blue">⌘ main</span></PanelTitle><div className="git-rows"><LiveGitLog /></div><div className="commit-graph" /></section>;
}

export function Skills() { return <section className="skills panel"><PanelTitle>npm ls --depth=0</PanelTitle><div className="skill-grid">{skills.map((skill, index) => <span key={skill}><i className={`skill-dot d${index % 6}`} />{skill}</span>)}</div><footer>32 packages installed</footer></section>; }

export function Roadmap() { return <section className="roadmap panel"><PanelTitle>learning --roadmap</PanelTitle>{roadmap.map(([label, value]) => <div key={label}><span>{label}</span><b><i style={{ width: `${value}%` }} /></b><small>{value}%</small></div>)}<footer>2 active courses</footer></section>; }

export function SystemInfo() {
  const rows = ["clean_architecture", "performance_first", "developer_experience", "maintainability", "scalability", "observability", "security", "simplicity"];
  return <section className="system-info panel"><PanelTitle>systemctl --principles</PanelTitle>{rows.map((row) => <div key={row}><span>{row}</span><b>enabled</b></div>)}<footer>config loaded　✓</footer></section>;
}

export function Environment() { return <section className="environment panel"><PanelTitle>env --info</PanelTitle>{[["Runtime", "Node.js 20.x"], ["Language", "TypeScript"], ["Architecture", "Microservices"], ["Infra Provider", "AWS (ECS)"], ["Region", "ap-south-1"], ["Monitoring", "Datadog"], ["Logging", "Grafana Loki"], ["Tracing", "OpenTelemetry"]].map(([l,v]) => <div key={l}><span>{l}</span><b>{v}</b></div>)}</section>; }

export function Releases() { return <section className="releases panel"><PanelTitle>releases --latest</PanelTitle><LiveRelease /></section>; }

export function QuickLinks() { return <section className="quick-links panel"><PanelTitle>quick --links</PanelTitle>{[["◉", "GitHub", "github.com/sambit-pradhan"], ["♧", "Resume", "sambit.dev/resume.pdf"], ["in", "LinkedIn", "linkedin.com/in/sambit-pradhan"], ["□", "Email", "sambit.pradhan.dev@gmail.com"]].map(([i,l,v]) => <div key={l}><i>{i}</i><b>{l}</b><span>{v}</span><em>↗</em></div>)}</section>; }
