import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { LinkedInIcon } from "@/components/ui/Icons";
import { PRODUCTS, SITE } from "@/lib/constants";
import { homeContent } from "@/lib/content";
import { TryQuestionsStrip } from "@/components/home/TryQuestionsStrip";
import { PrivacyQuiz } from "@/components/quiz/PrivacyQuiz";
import { InfiniteSliderBasic } from "@/components/home/InfiniteSliderBasic";
import { ScrollProgressBasic1 } from "@/components/home/ScrollProgressBasic1";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* ────────────────────────────────────────────────────────
          01 — HERO (CENTERED, PROMINENT HEADLINE & INTRO)
          ──────────────────────────────────────────────────────── */}
      <section className="section home-hero">
        <div className="container">
          <div className="home-hero-inner">
            <h1 className="h1" style={{ fontSize: "clamp(34px, 5.2vw, 56px)", fontWeight: 700, lineHeight: 1.15 }}>
              {homeContent.headline}
            </h1>
            <p className="lede" style={{ fontSize: "clamp(17px, 2vw, 20px)", color: "var(--ink-secondary)", maxWidth: "56ch" }}>
              {homeContent.intro}
            </p>
            <div className="home-hero-actions">
              <Button href="/products" variant="primary">
                Explore the tools
              </Button>
              <Button href="#how-i-build" variant="secondary">
                How I build
              </Button>
              <Link
                href="#privacy-score"
                className="link small"
                style={{
                  color: "var(--brand-orange-deep)",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "6px 12px",
                  borderRadius: "999px",
                  backgroundColor: "var(--orange-tint)",
                }}
              >
                Test your privacy knowledge →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          02 — INFINITE SLIDER SHOWCASE (PRODUCTS & COMPLIANCE PILLARS)
          ──────────────────────────────────────────────────────── */}
      <section className="py-2 border-y border-[var(--border)] bg-[var(--surface-alt)]/50" aria-label="Ecosystem ticker">
        <InfiniteSliderBasic />
      </section>

      {/* ────────────────────────────────────────────────────────
          03 — THE FOUR TOOLS CARDS (DIRECT MULTI-PAGE FLOW)
          ──────────────────────────────────────────────────────── */}
      <section className="section section--alt" id="tools" aria-labelledby="tools-heading">
        <div className="container">
          <div className="home-section-header">
            <span className="eyebrow">PRACTICAL PRIVACY SYSTEMS</span>
            <h2 className="h2" id="tools-heading" style={{ marginTop: 6, marginBottom: 10 }}>
              Privacy Tools
            </h2>
            <p className="lede" style={{ margin: "0 auto 16px" }}>
              Four focused tools designed around operational duties under India&apos;s DPDP Act, 2023.
            </p>
            <Link
              href="/products"
              className="link small"
              style={{ color: "var(--brand-orange-deep)", fontWeight: 600 }}
            >
              View detailed index for all tools →
            </Link>
          </div>

          <div className="tools-grid-four">
            {PRODUCTS.map((prod) => {
              const isPrivacyPeek = prod.id === "privacy-peek";

              return (
                <div key={prod.id} className="tool-column-card">
                  <div>
                    <div className="tool-column-badge-top">
                      <span className={`badge ${isPrivacyPeek ? "badge--highlight" : prod.status === "Live" ? "badge--available" : "badge--warning"}`}>
                        {prod.status === "Live" ? "Live Tool" : prod.status === "Beta" ? "Beta" : "Walkthrough Only"}
                      </span>
                    </div>

                    {prod.logoUrl ? (
                      <div className="tool-logo-box">
                        <Image
                          src={prod.logoUrl}
                          alt={`${prod.name} Logo`}
                          width={260}
                          height={56}
                          className={`tool-logo-img ${isPrivacyPeek ? "privacy-peek-img" : ""}`}
                          priority
                        />
                        <h3 className="sr-only">{prod.name}</h3>
                      </div>
                    ) : (
                      <h3 className="h3" style={{ marginBlock: "8px 10px" }}>
                        {prod.name}
                      </h3>
                    )}

                    <p style={{ fontSize: 14, fontWeight: 600, color: "var(--brand-orange-deep)", margin: "0 0 10px" }}>
                      {prod.category}
                    </p>

                    <p className="small" style={{ color: "var(--ink-secondary)", marginBottom: 14, minHeight: 48 }}>
                      {prod.description}
                    </p>

                    <div style={{ borderTop: "1px solid var(--border)", paddingTop: 10, marginTop: 10 }}>
                      <p className="text-xs font-mono text-[var(--ink-muted)]">
                        <strong className="text-[var(--ink)]">Legal Basis:</strong> {prod.legalBasis}
                      </p>
                    </div>
                  </div>

                  <div style={{ marginTop: 16 }}>
                    <Link
                      href={`/products/${prod.slug}`}
                      className="btn btn--secondary btn--full btn--sm"
                    >
                      {isPrivacyPeek ? "Watch the walkthrough →" : "Open tool page →"}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          04 — PRIVACY QUIZ SECTION (id="privacy-score")
          ──────────────────────────────────────────────────────── */}
      <PrivacyQuiz />

      {/* ────────────────────────────────────────────────────────
          05 — STATUTORY ARCHITECTURE READER (ScrollProgress Animation)
          ──────────────────────────────────────────────────────── */}
      <section className="section" id="legal-architecture" aria-labelledby="architecture-heading">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="home-section-header">
            <span className="eyebrow">STATUTORY LOGIC TRANSLATION</span>
            <h2 className="h2" id="architecture-heading" style={{ marginTop: 6, marginBottom: 10 }}>
              DPDP Act Architecture Reader
            </h2>
            <p className="lede" style={{ margin: 0 }}>
              Scroll through the statutory sections of India&apos;s DPDP Act, 2023 to inspect how each legal mandate maps directly into working software components.
            </p>
          </div>

          <ScrollProgressBasic1 />
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          06 — AGENT X SHOWCASE SECTION
          ──────────────────────────────────────────────────────── */}
      <section className="section section--alt" id="agent-x" aria-labelledby="agent-x-heading">
        <div className="container">
          <div className="agent-x-showcase-card">
            <div>
              <div style={{ marginBottom: 18 }}>
                <Image
                  src="/brand/agent-x-logo.png"
                  alt="Agent X Logo"
                  width={180}
                  height={48}
                  priority
                  style={{ height: 34, width: "auto", objectFit: "contain" }}
                />
                <h2 className="sr-only" id="agent-x-heading">
                  Agent X Assistant
                </h2>
              </div>

              <h3 className="h3" style={{ marginTop: 0, marginBottom: 12 }}>
                Interactive Legal Assistant for Indian Privacy Rules
              </h3>

              <p className="body" style={{ color: "var(--ink-secondary)", marginBottom: 24, maxWidth: "56ch" }}>
                I built Agent X to help anyone explore the requirements of India&apos;s DPDP Act, 2023. Ask questions about notice requirements, consent records, data fiduciary duties, and how each tool in this workshop functions.
              </p>

              <TryQuestionsStrip
                heading="Try asking Agent X"
                subheading="Click any example question to launch the assistant:"
                questions={homeContent.tryQuestions.questions}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <Image
                src="/brand/agent-x-avatar.png"
                alt="Agent X 3D Assistant Avatar"
                width={220}
                height={220}
                priority
                className="agent-x-avatar-img"
              />
              <span className="badge badge--highlight">DPDP AI Intelligence</span>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          07 — HOW I BUILD (3 SHORT STEPS)
          ──────────────────────────────────────────────────────── */}
      <section className="section" id="how-i-build" aria-labelledby="build-heading">
        <div className="container">
          <div className="home-section-header">
            <span className="eyebrow">METHODOLOGY</span>
            <h2 className="h2" id="build-heading" style={{ marginTop: 6, marginBottom: 10 }}>
              {homeContent.howIBuild.heading}
            </h2>
            <p className="lede" style={{ margin: 0 }}>
              {homeContent.howIBuild.intro}
            </p>
          </div>

          <div className="build-steps-grid">
            {homeContent.howIBuild.steps.map((step, idx) => (
              <div key={step.title} className="build-step-card">
                <span className="build-step-num">Step 0{idx + 1}</span>
                <h3 className="h3">{step.title}</h3>
                <p className="body" style={{ margin: 0 }}>
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          08 — ABOUT ME (CENTERED PORTRAIT, CREDENTIALS, SUMMARY)
          ──────────────────────────────────────────────────────── */}
      <section className="section section--alt" aria-labelledby="about-me-heading">
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="about-strip-card" style={{ textAlign: "center" }}>
            {/* Centered Portrait */}
            <div
              style={{
                width: 220,
                maxWidth: "70vw",
                aspectRatio: "4 / 5",
                margin: "0 auto 24px",
                borderRadius: "var(--r)",
                overflow: "hidden",
                border: "1px solid var(--border)",
                boxShadow: "0 10px 24px -4px rgba(20, 34, 45, 0.08)",
                backgroundColor: "var(--surface)",
              }}
            >
              <Image
                src="/images/ameer-riaz.jpg"
                alt="Ameer Riaz, Privacy Professional"
                width={440}
                height={550}
                priority
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <h2 className="h2" id="about-me-heading" style={{ marginBottom: 4 }}>
              {homeContent.aboutStrip.name}
            </h2>
            <p style={{ fontSize: 18, fontWeight: 600, color: "var(--brand-orange-deep)", margin: "0 0 8px" }}>
              {homeContent.aboutStrip.role}
            </p>

            {/* Split Education Lines */}
            <p className="education-line" style={{ maxWidth: "56ch", margin: "0 auto 4px", fontSize: 15, fontWeight: 550, color: "var(--ink)" }}>
              {homeContent.aboutStrip.educationLine1}
            </p>
            <p className="education-line" style={{ maxWidth: "56ch", margin: "0 auto 8px", fontSize: 14.5, color: "var(--brand-orange-deep)", fontWeight: 500 }}>
              {homeContent.aboutStrip.educationLine2}
            </p>
            <p className="small" style={{ color: "var(--ink-secondary)", margin: "0 0 18px" }}>
              {homeContent.aboutStrip.location}
            </p>

            <p className="body" style={{ maxWidth: "60ch", margin: "0 auto 24px", color: "var(--ink)" }}>
              {homeContent.aboutStrip.summary}
            </p>

            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12 }}>
              <Button href="/about" variant="secondary" className="btn--sm">
                Read full profile in About →
              </Button>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--linkedin btn--sm"
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                <LinkedInIcon size={16} />
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          09 — CONTACT CTA (CENTERED WITH BOTH CREDENTIALS)
          ──────────────────────────────────────────────────────── */}
      <section className="section" id="contact" aria-labelledby="contact-heading">
        <div className="container" style={{ maxWidth: 760, textAlign: "center" }}>
          <span className="eyebrow">LET&apos;S CONNECT</span>
          <h2 className="h2" id="contact-heading" style={{ marginTop: 6, marginBottom: 12 }}>
            {homeContent.contactCTA.heading}
          </h2>
          <p className="lede" style={{ margin: "0 auto 24px", maxWidth: "56ch" }}>
            {homeContent.contactCTA.body}
          </p>

          {/* Direct Email Credentials */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <a
              href={`mailto:${SITE.businessEmail}`}
              className="px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] font-mono text-sm hover:border-[var(--brand-orange)] transition-colors inline-flex items-center gap-2"
              title="Official Workshop Email"
            >
              <span className="text-[var(--brand-orange-deep)] font-semibold font-sans text-xs uppercase tracking-wider">Official:</span>
              <span>{SITE.businessEmail}</span>
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] font-mono text-sm hover:border-[var(--brand-orange)] transition-colors inline-flex items-center gap-2"
              title="Direct Email"
            >
              <span className="text-[var(--brand-orange-deep)] font-semibold font-sans text-xs uppercase tracking-wider">Direct:</span>
              <span>{SITE.email}</span>
            </a>
          </div>

          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 14 }}>
            <Button href={`mailto:${SITE.businessEmail}`} variant="primary">
              Send an email
            </Button>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--linkedin"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <LinkedInIcon size={18} />
              <span>Connect on LinkedIn</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
