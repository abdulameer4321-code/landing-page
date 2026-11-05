import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { LinkedInIcon } from "@/components/ui/Icons";
import { contactContent } from "@/lib/content";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Ameer Riaz — Privacy Professional",
  description:
    "Get in touch with Ameer Riaz, a privacy professional based in Bengaluru, Karnataka, regarding privacy workflows, tool walkthroughs, or collaboration.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <h1 className="h1">{contactContent.heading}</h1>
        <p className="lede" style={{ marginTop: 12, marginBottom: 28 }}>
          {contactContent.intro}
        </p>

        <div
          style={{
            padding: "32px 28px",
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r)",
            display: "flex",
            flexDirection: "column",
            gap: 24,
            boxShadow: "0 4px 20px -2px rgba(20, 34, 45, 0.05)",
          }}
        >
          {/* Official Email */}
          <div>
            <span className="small" style={{ fontWeight: 600, color: "var(--brand-orange-deep)" }}>
              Official Email
            </span>
            <p style={{ margin: "6px 0 0", fontSize: 19, fontWeight: 550, color: "var(--ink)", fontFamily: "var(--font-mono)" }}>
              <a href={`mailto:${SITE.businessEmail}`} style={{ textDecoration: "underline" }}>
                {SITE.businessEmail}
              </a>
            </p>
          </div>

          {/* Direct Email */}
          <div>
            <span className="small" style={{ fontWeight: 600, color: "var(--brand-orange-deep)" }}>
              Direct / Personal Email
            </span>
            <p style={{ margin: "6px 0 0", fontSize: 19, fontWeight: 550, color: "var(--ink)", fontFamily: "var(--font-mono)" }}>
              <a href={`mailto:${SITE.email}`} style={{ textDecoration: "underline" }}>
                {SITE.email}
              </a>
            </p>
          </div>

          {/* LinkedIn Profile */}
          <div>
            <span className="small" style={{ fontWeight: 600, color: "var(--brand-orange-deep)" }}>
              LinkedIn Network
            </span>
            <p style={{ margin: "6px 0 0", fontSize: 19, fontWeight: 550, color: "var(--ink)" }}>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "underline" }}
              >
                {SITE.linkedinLabel}
              </a>
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 12 }}>
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
      </div>
    </section>
  );
}
