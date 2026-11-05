import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { LinkedInIcon } from "@/components/ui/Icons";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Ameer Riaz — Data Privacy & Technology Law",
  description:
    "Ameer Riaz is a legal professional focused on data protection, information technology law, GRC, and building DPDP MatriX in Bengaluru, Karnataka.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article className="about-page">
      {/* ── Profile Hero: Centered Portrait & Credentials ── */}
      <section className="section" style={{ paddingBottom: 40 }}>
        <div
          className="container"
          style={{
            maxWidth: 820,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Centered Portrait */}
          <div
            style={{
              width: 300,
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
              alt="Ameer Riaz"
              width={640}
              height={800}
              priority
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <span
            className="eyebrow"
            style={{ marginBottom: 8, letterSpacing: "0.14em", color: "var(--brand-orange)" }}
          >
            ABOUT ME
          </span>

          <h1 className="h1" style={{ fontSize: "clamp(34px, 4.5vw, 48px)", margin: "0 0 12px" }}>
            {SITE.person}
          </h1>

          <p
            style={{
              fontSize: "clamp(16px, 2.2vw, 20px)",
              fontWeight: 600,
              color: "var(--brand-orange-deep)",
              margin: "0 auto 12px",
              maxWidth: "50ch",
              lineHeight: 1.4,
            }}
          >
            Data Privacy | Information Technology Law | Governance, Risk &amp; Compliance
          </p>

          {/* Strictly Centered Location */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              color: "var(--ink-secondary)",
              fontSize: 15,
              fontWeight: 500,
              margin: "0 auto 24px",
            }}
          >
            <span aria-hidden="true">📍</span>
            <span>Bengaluru, Karnataka</span>
          </div>

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
            <Button href={`mailto:${SITE.email}`} variant="secondary" style={{ minHeight: 46 }}>
              Send an email
            </Button>
          </div>

          {/* Dual Email Display */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
              marginTop: 18,
            }}
          >
            <span className="text-xs font-mono text-[var(--ink-muted)]">
              Primary:{" "}
              <a href={`mailto:${SITE.email}`} className="text-[var(--brand-orange-deep)] font-semibold">
                {SITE.email}
              </a>
            </span>
            <span className="text-xs font-mono text-[var(--ink-muted)]">·</span>
            <span className="text-xs font-mono text-[var(--ink-muted)]">
              Alternative:{" "}
              <a href={`mailto:${SITE.businessEmail}`} className="text-[var(--brand-orange-deep)] font-semibold">
                {SITE.businessEmail}
              </a>
            </span>
          </div>
        </div>
      </section>

      {/* ── Narrative Sections ── */}
      <section className="section section--alt" style={{ paddingTop: 56, paddingBottom: 80 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          {/* Main Bio Paragraphs */}
          <div
            style={{
              display: "grid",
              gap: 22,
              fontSize: "clamp(16.5px, 1.8vw, 18px)",
              lineHeight: 1.75,
              color: "var(--ink)",
              marginBottom: 52,
            }}
          >
            <p style={{ margin: 0 }}>
              I am a legal professional with a focused interest in the intersection of data protection,
              information technology, regulatory governance and emerging technologies and AI & Governance
            </p>

            <p style={{ margin: 0 }}>
              With an academic background in law and specialised postgraduate education in Data Privacy
              and Information Technology Law, I am particularly interested in how legal frameworks
              translate into operational realities, how organisations approach privacy governance, and
              how technology can make regulatory compliance more effective.
            </p>

            <p style={{ margin: 0 }}>
              My areas of interest include India&apos;s Digital Personal Data Protection Act, 2023, the
              DPDP Rules, 2025, GDPR, privacy governance, GRC frameworks, cybersecurity and technology
              regulation.
            </p>

            <p style={{ margin: 0 }}>
              I have explored the practical side of compliance through working with Vanta, developing
              regulatory compliance controls, and examining how statutory obligations can be
              translated into structured governance and risk management processes.
            </p>

            <p style={{ margin: 0 }}>
              Beyond regulatory compliance, my academic interests extend to intellectual property and
              technology law. My postgraduate dissertation explored copyright law in the age of Generative AI, A comparission between Indian and USA Laws, reflecting my broader interest in how existing legal
              frameworks respond to evolving digital ecosystems.
            </p>
          </div>

          {/* Beyond the Law */}
          <div
            style={{
              padding: "36px 32px",
              borderRadius: "var(--r)",
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              marginBottom: 44,
            }}
          >
            <span className="eyebrow" style={{ color: "var(--brand-orange)" }}>
              PHILOSOPHY &amp; INITIATIVE
            </span>
            <h2 className="h2" style={{ fontSize: "clamp(24px, 3vw, 30px)", marginTop: 8, marginBottom: 18 }}>
              Beyond the Law
            </h2>
            <div style={{ display: "grid", gap: 16, fontSize: 17, lineHeight: 1.7, color: "var(--ink)" }}>
              <p style={{ margin: 0 }}>
                I believe understanding regulation is only one part of the equation. The real challenge
                lies in translating legal requirements into systems, processes and solutions that
                organisations can actually implement.
              </p>
              <p style={{ margin: 0 }}>
                That thinking led me to independently conceptualise and build <strong>DPDP MatriX</strong>, a privacy
                law and technology initiative focused on India&apos;s evolving data protection landscape.
              </p>
              <p style={{ margin: 0 }}>
                Through this initiative, I explore the intersection of legal research, product thinking
                and technology, developing practical tools and resources that address different aspects
                of privacy governance and compliance.
              </p>
              <p style={{ margin: 0, fontStyle: "italic", color: "var(--brand-orange-deep)" }}>
                For me, it is an opportunity to move beyond interpreting the law and explore how it can work in practice.
              </p>
            </div>
          </div>

          {/* Let's Connect */}
          <div
            style={{
              padding: "36px 32px",
              borderRadius: "var(--r)",
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <span className="eyebrow" style={{ color: "var(--brand-orange)" }}>
              OPPORTUNITIES &amp; COLLABORATION
            </span>
            <h2 className="h2" style={{ fontSize: "clamp(24px, 3vw, 30px)", marginTop: 8, marginBottom: 18 }}>
              Let&apos;s Connect
            </h2>
            <div style={{ display: "grid", gap: 16, fontSize: 17, lineHeight: 1.7, color: "var(--ink)", marginBottom: 26 }}>
              <p style={{ margin: 0 }}>
                I am always interested in meaningful conversations, new challenges and opportunities to
                contribute to the evolving field of data privacy, information technology law and regulatory
                compliance.
              </p>
              <p style={{ margin: 0 }}>
                I am currently open to professional opportunities in data privacy, data protection, privacy
                operations, GRC, regulatory compliance and related areas.
              </p>
              <p style={{ margin: 0 }}>
                If my interests align with what your organisation is building, I&apos;d be glad to connect.
              </p>
            </div>

            {/* Email Contact Box */}
            <div
              style={{
                display: "grid",
                gap: 12,
                padding: "20px 24px",
                borderRadius: "var(--r-sm)",
                backgroundColor: "var(--surface-sunken)",
                border: "1px solid var(--border)",
              }}
            >
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[var(--ink-secondary)]">
                  Primary Email:
                </span>
                <div style={{ marginTop: 2 }}>
                  <a
                    href="mailto:abdulameer4321@gmail.com"
                    style={{ fontSize: 16, fontWeight: 600, color: "var(--brand-orange-deep)" }}
                  >
                    abdulameer4321@gmail.com
                  </a>
                </div>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[var(--ink-secondary)]">
                  Alternative Email:
                </span>
                <div style={{ marginTop: 2 }}>
                  <a
                    href="mailto:ameer@dpdpmatrix.in"
                    style={{ fontSize: 16, fontWeight: 600, color: "var(--brand-orange-deep)" }}
                  >
                    ameer@dpdpmatrix.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
