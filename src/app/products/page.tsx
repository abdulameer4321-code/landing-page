import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/lib/constants";
import { toolsIndexContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Tools — DPDP MatriX",
  description:
    "Working privacy software tools built on India's Digital Personal Data Protection Act, 2023.",
  alternates: { canonical: "/products" },
};

export default function ProductsIndexPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="h1">{toolsIndexContent.heading}</h1>
        <p className="lede" style={{ marginTop: 12, marginBottom: 36 }}>
          {toolsIndexContent.intro}
        </p>

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
                      <h2 className="sr-only">{prod.name}</h2>
                    </div>
                  ) : (
                    <h2 className="h3" style={{ marginBlock: "8px 10px" }}>
                      {prod.name}
                    </h2>
                  )}

                  <p style={{ fontSize: 14, fontWeight: 600, color: "var(--brand-orange-deep)", margin: "0 0 10px" }}>
                    {prod.category}
                  </p>

                  <p className="small" style={{ color: "var(--ink-secondary)", marginBottom: 14, minHeight: 48 }}>
                    {prod.description}
                  </p>

                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: 12, display: "grid", gap: 6 }}>
                    <p className="small" style={{ margin: 0 }}>
                      <b>Who it is for:</b> {prod.whoItIsFor}
                    </p>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14 }}>
                  <Link
                    href={`/products/${prod.slug}`}
                    className="btn btn--secondary btn--full btn--sm"
                  >
                    {isPrivacyPeek ? "Watch the walkthrough" : "Open tool page"}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
