"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { useTheme } from "@/components/theme/ThemeProvider";

export function Header() {
  const pathname = usePathname();
  const { resolvedTheme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header className="site-header" role="banner">
        <div className="header-container">
          {/* Brand Logo */}
          <Link href="/" className="header-logo" aria-label={`${SITE.name} home`}>
            {/* Light theme logo */}
            <Image
              className="logo-light"
              src="/brand/logo-primary.png"
              alt={SITE.name}
              width={1368}
              height={242}
              priority
              style={{ height: 28, width: "auto", objectFit: "contain" }}
            />
            {/* Dark theme logo */}
            <Image
              className="logo-dark"
              src="/brand/logo-reversed.png"
              alt={SITE.name}
              width={564}
              height={106}
              priority
              style={{ height: 28, width: "auto", objectFit: "contain" }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Primary Navigation">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${active ? "is-active" : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/#privacy-score"
              className="nav-link"
              title="Test your privacy knowledge"
              style={{ color: "var(--brand-orange-deep)", fontWeight: 550 }}
            >
              Privacy Quiz
            </Link>
          </nav>

          {/* Right Controls */}
          <div className="header-controls">
            {/* Theme Toggle */}
            <button
              type="button"
              className="dock-circle-btn"
              onClick={toggleTheme}
              style={{ width: 40, height: 40 }}
              aria-label={resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              title={resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              {resolvedTheme === "dark" ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </button>

            {/* Mobile Burger */}
            <button
              type="button"
              className="mobile-burger-btn"
              aria-expanded={open}
              aria-controls="mobile-nav-drawer"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setOpen((prev) => !prev)}
            >
              <span className={`burger-line ${open ? "is-top-open" : ""}`} />
              <span className={`burger-line ${open ? "is-bot-open" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        id="mobile-nav-drawer"
        className={`mobile-drawer ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        <div className="mobile-drawer-inner">
          <nav className="mobile-nav-links" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="mobile-nav-item"
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
              >
                <span>{link.label}</span>
                <span style={{ fontSize: 14, color: "var(--brand-orange)" }}>→</span>
              </Link>
            ))}
            <Link
              href="/#privacy-score"
              className="mobile-nav-item"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
            >
              <span style={{ color: "var(--brand-orange-deep)", fontWeight: 550 }}>Test your privacy knowledge</span>
              <span style={{ fontSize: 14, color: "var(--brand-orange)" }}>→</span>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
