export function Header({ mode = "overview" }: { mode?: "overview" | "about" }) {
  const isAbout = mode === "about";
  return (
    <header className="topbar">
      <div className="brand"><span className="traffic"><i /><i /><i /></span><span className="brand-terminal">›_</span><strong>Sambit OS</strong></div>
      {isAbout ? <nav className="primary-nav" aria-label="Portfolio sections"><a>Overview</a><a>Projects</a><a className="active">About</a><a>Experience</a><a>Terminal</a><a>System</a><a>Logs</a></nav> : <div className="top-meta"><span>Workspace<b>Developer Workspace</b></span><span>Branch<b>main</b></span><span>Git Status<b className="green">Synced　●</b></span><span>Environment<b className="green">Production　●</b></span></div>}
      <div className="top-tools"><div className="search">⌘K Search Portfolio...　⌕</div><span>☁<small>CPU<br /><b>12%</b></small></span><span>⌁<small>MEM<br /><b>34%</b></small></span><span>⌁<small>NET<br /><b>1.2 KB/s</b></small></span><time>◷　10:42:31 PM</time></div>
    </header>
  );
}
