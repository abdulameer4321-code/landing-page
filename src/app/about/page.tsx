import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { LinkedInIcon } from "@/components/ui/Icons";
import { aboutContent } from "@/lib/content";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Ameer Riaz — Privacy Professional",
  description:
    "Ameer Riaz is a privacy professional based in Bengaluru, Karnataka, building practical tools that translate privacy law into working systems.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article className="about-page">
      {/* ── Profile Hero: Centered Portrait & Credentials ── */}
      <section className="section" style={{ paddingBottom: 40 }}>
        <div className="container" style={{ maxWidth: 800, textAlign: "center" }}>
          {/* Centered Photo with Elegant Proportions */}
          <div
            style={{
              width: 320,
              maxWidth: "85vw",
              aspectRatio: "4 / 5",
              margin: "0 auto 28px",
              borderRadius: "var(--r-lg)",
              overflow: "hidden",
              border: "1px solid var(--border)",
              boxShadow: "0 14px 34px -4px rgba(20, 34, 45, 0.12)",
              backgroundColor: "var(--surface)",
            }}
          >
            <Image
              src="/images/ameer-riaz.jpg"
              alt="Ameer Riaz, Privacy Professional"
              width={640}
              height={800}
              priority
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <h1 className="h1" style={{ fontSize: "clamp(32px, 4.5vw, 48px)", marginBottom: 8 }}>
            {SITE.person}
          </h1>

          <p style={{ fontSize: 20, fontWeight: 600, color: "var(--brand-orange-deep)", margin: "0 0 10px" }}>
            {aboutContent.role}
          </p>

          <p className="education-line" style={{ maxWidth: "60ch", margin: "0 auto 4px", fontSize: 16, fontWeight: 550, color: "var(--ink)" }}>
            {aboutContent.educationLine1}
          </p>

          <p className="education-line" style={{ maxWidth: "60ch", margin: "0 auto 8px", fontSize: 15, color: "var(--brand-orange-deep)", fontWeight: 500 }}>
            {aboutContent.educationLine2}
          </p>

          <p className="small" style={{ color: "var(--ink-secondary)", margin: "0 0 24px" }}>
            {aboutContent.location}
          </p>

          {/* Action Links */}
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 14 }}>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--linkedin"
              style={{ minHeight: 46, display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <LinkedInIcon size={18} />
              <span>Connect on LinkedIn</span>
            </a>
            <Button href={`mailto:${SITE.businessEmail}`} variant="secondary" style={{ minHeight: 46 }}>
              Send an email
            </Button>
          </div>

          {/* Credentials Pills */}
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12, marginTop: 18 }}>
            <span className="text-xs font-mono text-[var(--ink-muted)]">
              Official: <a href={`mailto:${SITE.businessEmail}`} className="text-[var(--brand-orange-deep)] font-semibold">{SITE.businessEmail}</a>
            </span>
            <span className="text-xs font-mono text-[var(--ink-muted)]">·</span>
            <span className="text-xs font-mono text-[var(--ink-muted)]">
              Direct: <a href={`mailto:${SITE.email}`} className="text-[var(--brand-orange-deep)] font-semibold">{SITE.email}</a>
            </span>
          </div>
        </div>
      </section>

      {/* ── Narrative Story & Principles: Centered Editorial ── */}
      <section className="section section--alt" style={{ paddingTop: 56, paddingBottom: 80 }}>
        <div className="container" style={{ maxWidth: 740 }}>
          <div style={{ marginBottom: 36 }}>
            <span className="eyebrow">MY PERSPECTIVE &amp; APPROACH</span>
            <h2 className="h2" style={{ marginTop: 8, marginBottom: 16 }}>
              Translating law into working software
            </h2>
            <p className="lede" style={{ color: "var(--ink)", lineHeight: 1.6 }}>
              {aboutContent.intro}
            </p>
          </div>

          <div style={{ display: "grid", gap: 20, fontSize: 18, lineHeight: 1.7, color: "var(--ink-secondary)" }}>
            {aboutContent.story.map((paragraph, idx) => (
              <p key={idx} style={{ margin: 0 }}>
                {paragraph}
              </p>
            ))}
          </div>

          <div style={{ marginTop: 52, paddingTop: 36, borderTop: "1px solid var(--border)" }}>
            <h3 className="h3" style={{ fontSize: 22, marginBottom: 20, color: "var(--ink)" }}>
              What guides my work
            </h3>

            <div style={{ display: "grid", gap: 16 }}>
              {aboutContent.principles.map((pr) => (
                <div
                  key={pr.title}
                  style={{
                    padding: "20px 24px",
                    borderRadius: "var(--r)",
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h4 className="h3" style={{ fontSize: 18, marginBottom: 6, color: "var(--brand-orange-deep)" }}>
                    {pr.title}
                  </h4>
                  <p className="body" style={{ margin: 0, fontSize: 16.5, color: "var(--ink)" }}>
                    {pr.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
