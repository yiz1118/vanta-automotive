"use client";

import { ArrowUpRightIcon } from "@/components/icons";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/builds", label: "Builds" },
  { href: "/services", label: "Services" },
  { href: "/engineering", label: "Engineering" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) { setOpen(false); button.current?.focus(); }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  function close() { setOpen(false); }

  return <header className="site-header">
    <div className="header-inner">
      <Link className="brand" href="/" onClick={close} aria-label="Vanta Motorworks home"><span className="brand-mark">V<span className="brand-cut">/</span></span><span className="brand-words">VANTA <small>MOTORWORKS</small></span></Link>
      <span className="concept-label">Concept Project</span>
      <nav className="desktop-nav" aria-label="Primary">{links.slice(0, 4).map((link) => <Link key={link.href} href={link.href} aria-current={pathname === link.href || (link.href === "/builds" && pathname.startsWith("/builds/")) ? "page" : undefined}>{link.label}</Link>)}</nav>
      <Link className="header-enquiry" href="/enquiry">Discuss a build <span className="action-icon" aria-hidden><ArrowUpRightIcon /></span></Link>
      <button ref={button} className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => { setOpen(!open); if (!open) requestAnimationFrame(() => menu.current?.querySelector("a")?.focus({ preventScroll: true })); }}><span>{open ? "Close" : "Menu"}</span><span className="menu-lines" aria-hidden><i /><i /></span></button>
    </div>
    <div id="mobile-navigation" ref={menu} className={`mobile-menu ${open ? "is-open" : ""}`} inert={!open}>
      <nav aria-label="Mobile primary">{links.map((link, index) => <Link onClick={close} key={link.href} href={link.href} aria-current={pathname === link.href || (link.href === "/builds" && pathname.startsWith("/builds/")) ? "page" : undefined}><span className="mono">0{index + 1}</span>{link.label}<span className="action-icon" aria-hidden><ArrowUpRightIcon /></span></Link>)}<Link onClick={close} href="/enquiry" aria-current={pathname === "/enquiry" ? "page" : undefined}><span className="mono">06</span>Discuss a build<span className="action-icon" aria-hidden><ArrowUpRightIcon /></span></Link></nav>
      <p>VANTA MOTORWORKS · Concept Project</p>
    </div>
  </header>;
}
