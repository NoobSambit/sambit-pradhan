import { systemGroups } from "@/data/dashboard";

export function Sidebar() {
  return (
    <aside className="sidebar">
      {systemGroups.map((group) => <section className="side-group" key={group.title}><h2>{group.title}</h2>{group.items.map(([icon, label, value]) => <div className="side-row" key={label}><span className="side-label"><em>{icon}</em>{label}</span><b className={value.includes("●") || value === "Synced" ? "green" : value === "main" || value === "~/portfolio" || value === "zsh" ? "blue" : ""}>{value}</b>{["Memory", "Disk", "Network"].includes(label) && <i className="meter"><span /></i>}</div>)}</section>)}
      <div className="side-social"><span>◉</span><span>◉</span><span>◉</span><span>▣</span></div>
    </aside>
  );
}
