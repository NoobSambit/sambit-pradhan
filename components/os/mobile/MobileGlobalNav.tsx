"use client";

import { usePathname } from "next/navigation";
import { TerminalIcon, type TerminalIconName } from "@/components/os/TerminalIcon";
import styles from "./MobileHome.module.css";

const NAV_ITEMS: Array<{ icon: TerminalIconName; label: string; href: string }> = [
  { icon: "terminal", label: "Home", href: "/" },
  { icon: "folder", label: "Projects", href: "/projects" },
  { icon: "user", label: "About", href: "/about" },
  { icon: "boxes", label: "Skills", href: "/skills" },
];

function isActive(pathname: string | null, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || (pathname ?? "").startsWith(`${href}/`);
}

export function MobileGlobalNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Mobile portfolio navigation" className={styles.bottomNav}>
      {NAV_ITEMS.map(({ icon, label, href }) => {
        const active = isActive(pathname, href);
        return (
          <a
            key={label}
            aria-current={active ? "page" : undefined}
            href={href}
          >
            <TerminalIcon name={icon} />
            <span>{label}</span>
          </a>
        );
      })}
    </nav>
  );
}
