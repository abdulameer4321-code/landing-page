"use client";

import Link from "next/link";
import Image from "next/image";
import { LEGAL_LINKS, PRODUCTS, SITE } from "@/lib/constants";
import { LinkedInIcon } from "@/components/ui/Icons";
import { openConsentPreferences } from "@/components/legal/ConsentManager";

export function Footer() {
  return (
    <footer className="site-footer" id="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Workshop Details */}
          <div>
            <Link href="/" aria-label={`${SITE.name} home`}>
              <Image
                src="/brand/logo-reversed.png"
                alt={SITE.name}
                width={564}
                height={106}
                style={{ height: 26, width: "auto", objectFit: "contain" }}
              />
            </Link>
            <p style={{ marginTop: 14, fontSize: 16, color: "#CBD5E1", lineHeight: 1.5 }}>
              A personal workshop by Ameer Riaz. Practical privacy tools based on Indian privacy law.
            </p>
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 3, fontSize: 13.5, fontFamily: "var(--font-mono)", color: "#8E9EA8" }}>
              <span>Official: <a href={`mailto:${SITE.businessEmail}`} style={{ color: "var(--brand-orange)" }}>{SITE.businessEmail}</a></span>
              <span>Direct: <a href={`mailto:${SITE.email}`} style={{ color: "var(--brand-orange)" }}>{SITE.email}</a></span>
            </div>
            <p style={{ marginTop: 8, fontSize: 14, color: "#8E9EA8" }}>
              Bengaluru, Karnataka, India
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="footer-heading">Tools</h3>
            <ul className="footer-links-list">
              {PRODUCTS.map((p) => (
                <li key={p.id}>
                  <Link className="footer-link-item" href={`/products/${p.slug}`}>
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="footer-heading">Navigation</h3>
            <ul className="footer-links-list">
              <li><Link className="footer-link-item" href="/">Home</Link></li>
              <li><Link className="footer-link-item" href="/products">All Tools</Link></li>
              <li><Link className="footer-link-item" href="/about">About Ameer</Link></li>
              <li><Link className="footer-link-item" href="/contact">Contact</Link></li>
              <li>
                <a
                  className="footer-link-item"
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                >
                  <LinkedInIcon size={14} />
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Privacy & Legal */}
          <div>
            <h3 className="footer-heading">Privacy &amp; Terms</h3>
            <ul className="footer-links-list">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link className="footer-link-item" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  className="footer-link-item"
                  onClick={openConsentPreferences}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    font: "inherit",
                  }}
                >
                  Cookie &amp; Storage Choices
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© {SITE.year} {SITE.name}. All rights reserved.</p>
          <p>
            Published for informational and educational purposes. Not formal legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
