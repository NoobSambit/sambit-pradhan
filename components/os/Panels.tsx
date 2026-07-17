import { roadmap, skills } from "@/data/dashboard";

function PanelTitle({ children }: { children: React.ReactNode }) { return <div className="panel-title">$ {children}</div>; }

export function ActiveProject() {
  const details = [["♙", "Role", "Backend Engineer"], ["▣", "Status", "Building"], ["◉", "Availability", "Open to Opportunities"], ["⌖", "Location", "Bengaluru, India"], ["◷", "Timezone", "IST (UTC +5:30)"], ["♧", "Preferred Role", "Backend / Infra"], ["⌘", "Experience", "3+ Years"], ["◉", "Response Time", "< 24h"]];
  return <section className="active-project profile-overview panel"><PanelTitle>whoami --profile <span className="live">● ONLINE</span></PanelTitle><div className="profile-overview-body"><div className="mini-avatar" aria-label="Stylized portrait of Sambit Pradhan"><i /><b /><em /></div><div className="profile-overview-details"><h2>Sambit Pradhan</h2>{details.map(([icon, label, value]) => <div key={label}><i>{icon}</i><span>{label}</span><b className={label === "Status" ? "green" : ""}>{value}</b></div>)}</div></div><footer>profile loaded　 <span className="green">✓</span>　 available for impactful work</footer></section>;
}

export function Architecture() {
  const streaks = [["⌁", "LeetCode", "128 day streak", 112], ["◉", "GitHub", "89 day streak", 97]];
  return <section className="architecture activity-streaks panel"><PanelTitle>coding_activity --streaks <span>↗</span></PanelTitle><div className="streaks-content">{streaks.map(([icon, name, label, seed]) => <article key={name}><header><i>{icon}</i><b>{name}</b><span>● {label}</span></header><div className="streak-months"><small>May</small><small>Jun</small><small>Jul</small><small>Aug</small><small>Sep</small><small>Oct</small></div><div className="streak-calendar">{Array.from({ length: 210 }).map((_, index) => <i className={(index * Number(seed)) % 9 < 2 ? "quiet" : (index + Number(seed)) % 7 < 2 ? "bright" : "active"} key={index} />)}</div><footer><b>Daily practice</b><span>Less　▦ ▦ ▦ ▦　More</span></footer></article>)}</div></section>;
}

export function GitLog() {
  const rows = [["feat(runtime): adaptive loader", "2h ago"], ["feat(ai): context engine", "1d ago"], ["refactor(arch): service split", "2d ago"], ["fix(api): rate limiting", "3d ago"], ["docs: update architecture", "5d ago"], ["chore: refresh dependencies", "6d ago"], ["test(api): cover edge cases", "1w ago"], ["build: improve pipeline", "1w ago"], ["init: establish workspace", "2w ago"]];
  return <section className="git-log panel"><PanelTitle>git log --graph <span className="blue">⌘ main</span></PanelTitle><div className="git-rows">{rows.map(([text, time]) => <div key={text}><i>●</i><span>{text}</span><small>{time}</small></div>)}</div><div className="commit-graph" /></section>;
}

export function Metrics() {
  const metrics = [["APIs Built", "24"], ["Services Deployed", "60+"], ["DBs Designed", "12"], ["Code Reviews", "156"], ["PRs Merged", "98%"], ["Uptime (30d)", "99.98%"], ["Avg Response Time", "41ms"], ["Bug Resolution", "0.2%"]];
  return <section className="metrics panel"><PanelTitle>metrics --summary</PanelTitle>{metrics.map(([label, value]) => <div className="metric" key={label}><span>{label}</span><b>{value}</b><i>〽〽〽</i></div>)}</section>;
}

export function Skills() { return <section className="skills panel"><PanelTitle>npm ls --depth=0</PanelTitle><div className="skill-grid">{skills.map((skill, index) => <span key={skill}><i className={`skill-dot d${index % 6}`} />{skill}</span>)}</div><footer>32 packages installed</footer></section>; }

export function Roadmap() { return <section className="roadmap panel"><PanelTitle>learning --roadmap</PanelTitle>{roadmap.map(([label, value]) => <div key={label}><span>{label}</span><b><i style={{ width: `${value}%` }} /></b><small>{value}%</small></div>)}<footer>2 active courses</footer></section>; }

export function SystemInfo() {
  const rows = ["clean_architecture", "performance_first", "developer_experience", "maintainability", "scalability", "observability", "security", "simplicity"];
  return <section className="system-info panel"><PanelTitle>systemctl --principles</PanelTitle>{rows.map((row) => <div key={row}><span>{row}</span><b>enabled</b></div>)}<footer>config loaded　✓</footer></section>;
}

export function Environment() { return <section className="environment panel"><PanelTitle>env --info</PanelTitle>{[["Runtime", "Node.js 20.x"], ["Language", "TypeScript"], ["Architecture", "Microservices"], ["Infra Provider", "AWS (ECS)"], ["Region", "ap-south-1"], ["Monitoring", "Datadog"], ["Logging", "Grafana Loki"], ["Tracing", "OpenTelemetry"]].map(([l,v]) => <div key={l}><span>{l}</span><b>{v}</b></div>)}</section>; }

export function Releases() { return <section className="releases panel"><PanelTitle>releases --latest</PanelTitle><p><b>v2.1.0　<span className="green">●　(Latest)</span></b></p>{[["Production", "Stable"], ["Released", "2 days ago"], ["Changes", "12 commits"], ["Downloads", "—"], ["Status", "● Healthy"]].map(([l,v]) => <div key={l}><span>{l}</span><b className={v.includes("●") || v === "Stable" ? "green" : ""}>{v}</b></div>)}<a>View all releases →</a></section>; }

export function QuickLinks() { return <section className="quick-links panel"><PanelTitle>quick --links</PanelTitle>{[["◉", "GitHub", "github.com/sambit-pradhan"], ["♧", "Resume", "sambit.dev/resume.pdf"], ["in", "LinkedIn", "linkedin.com/in/sambit-pradhan"], ["□", "Email", "sambit.pradhan.dev@gmail.com"]].map(([i,l,v]) => <div key={l}><i>{i}</i><b>{l}</b><span>{v}</span><em>↗</em></div>)}</section>; }
