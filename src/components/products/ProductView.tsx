"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ProductItem,
  TOOL_LINKS,
  PRIVACY_PEEK_LINKEDIN_URL,
  PRIVACY_PEEK_VIDEO,
} from "@/lib/constants";

interface ProductViewProps {
  product: ProductItem;
  interactiveDemo?: React.ReactNode;
}

export function ProductView({ product, interactiveDemo }: ProductViewProps) {
  const isPrivacyPeek = product.id === "privacy-peek";
  const isRopax = product.id === "ropa-generator";
  const [youtubeLoaded, setYoutubeLoaded] = useState(false);

  const toolUrl = TOOL_LINKS[product.toolUrlKey];
  const hasExternalLink = Boolean(toolUrl && toolUrl.trim().length > 0);

  const hasVideoFile = Boolean(PRIVACY_PEEK_VIDEO.file && PRIVACY_PEEK_VIDEO.file.trim().length > 0);
  const hasYoutubeId = Boolean(PRIVACY_PEEK_VIDEO.youtubeId && PRIVACY_PEEK_VIDEO.youtubeId.trim().length > 0);
  const hasLinkedInPost = Boolean(PRIVACY_PEEK_LINKEDIN_URL && PRIVACY_PEEK_LINKEDIN_URL.trim().length > 0);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Live":
        return "badge badge--available";
      case "Beta":
        return "badge badge--dev";
      default:
        return "badge";
    }
  };

  return (
    <article className="product-view">
      {/* Header & Breadcrumb */}
      <section className="page-hero" aria-labelledby="tool-title" style={{ paddingBottom: 40 }}>
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <Link
              href="/products"
              className="small link"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--ink-secondary)" }}
            >
              ← All tools
            </Link>
            <span style={{ color: "var(--border)" }}>/</span>
            <span className="eyebrow" style={{ fontSize: 13 }}>{product.category}</span>
            <span className={getStatusBadgeClass(product.status)}>
              {product.status}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {product.logoUrl ? (
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <Image
                  src={product.logoUrl}
                  alt={`${product.name} Logo`}
                  width={320}
                  height={80}
                  priority
                  style={{ height: 48, width: "auto", objectFit: "contain" }}
                />
                <h1 className="sr-only" id="tool-title">
                  {product.name}
                </h1>
              </div>
            ) : (
              <h1 className="title" id="tool-title" style={{ margin: 0 }}>
                {product.name}
              </h1>
            )}

            {isRopax && (
              <p className="small" style={{ color: "var(--ink-secondary)", margin: 0 }}>
                Also known as ROPA Generator
              </p>
            )}

            <p className="lede" style={{ marginTop: 6, color: "var(--ink)", fontWeight: 450, maxWidth: "60ch" }}>
              {product.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container" style={{ paddingBottom: "clamp(60px, 8vw, 100px)" }}>
        {/* Summary Card */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
            padding: "28px 32px",
            borderRadius: "var(--r)",
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            marginBottom: 44,
          }}
        >
          <div>
            <span className="eyebrow">WHAT IT DOES</span>
            <p style={{ marginTop: 10, color: "var(--ink)", lineHeight: 1.6, fontSize: 16 }}>
              {product.description}
            </p>
          </div>

          <div>
            <span className="eyebrow">WHO IT IS FOR</span>
            <p style={{ marginTop: 10, color: "var(--ink)", lineHeight: 1.6, fontSize: 16 }}>
              {product.whoItIsFor}
            </p>
          </div>

          <div>
            <span className="eyebrow">LEGAL BASIS</span>
            <p style={{ marginTop: 10, color: "var(--ink)", lineHeight: 1.6, fontSize: 16 }}>
              {product.legalBasis}
            </p>
          </div>
        </div>

        {/* Centerpiece: Walkthrough Video for Privacy Peek, Demo for Others */}
        {isPrivacyPeek ? (
          <section aria-labelledby="privacy-peek-walkthrough-heading" style={{ marginBottom: 44 }}>
            <h2 id="privacy-peek-walkthrough-heading" className="sr-only">
              Privacy Peek Walkthrough
            </h2>

            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 9",
                borderRadius: "var(--r)",
                overflow: "hidden",
                backgroundColor: "#0b1219",
                border: "1px solid var(--border)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              {hasVideoFile ? (
                <video
                  controls
                  playsInline
                  preload="metadata"
                  style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                >
                  <source src={PRIVACY_PEEK_VIDEO.file} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : hasYoutubeId ? (
                youtubeLoaded ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${PRIVACY_PEEK_VIDEO.youtubeId}?autoplay=1`}
                    title="Privacy Peek Walkthrough"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ width: "100%", height: "100%", border: 0 }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 14,
                      color: "#fff",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setYoutubeLoaded(true)}
                      className="btn btn--primary"
                      style={{ padding: "12px 24px" }}
                    >
                      Play walkthrough video
                    </button>
                  </div>
                )
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                    color: "var(--ink-secondary)",
                    padding: 24,
                    textAlign: "center",
                  }}
                >
                  <span style={{ fontSize: 36 }} aria-hidden="true">🎬</span>
                  <p style={{ margin: 0, fontWeight: 500, fontSize: 17 }}>
                    Walkthrough video coming soon
                  </p>
                </div>
              )}
            </div>

            {/* Video metadata and LinkedIn button */}
            <div
              style={{
                marginTop: 20,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                padding: "16px 20px",
                borderRadius: "var(--r)",
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <div>
                <p className="small" style={{ margin: 0, color: "var(--ink)", fontWeight: 500 }}>
                  Privacy Peek is not open for public use yet. This video shows how it works.
                </p>
              </div>

              <div>
                {hasLinkedInPost ? (
                  <a
                    href={PRIVACY_PEEK_LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary"
                    style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                  >
                    <span>See the full post on LinkedIn</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="btn btn--ghost"
                    style={{ opacity: 0.6, cursor: "not-allowed" }}
                    aria-disabled="true"
                  >
                    LinkedIn post link coming soon
                  </button>
                )}
              </div>
            </div>
          </section>
        ) : (
          <section aria-labelledby="interactive-example-heading" style={{ marginBottom: 44 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
              <div>
                <span className="eyebrow" id="interactive-example-heading">
                  EXAMPLE
                </span>
                <p className="small" style={{ color: "var(--ink-secondary)", marginTop: 4, marginInline: 0 }}>
                  Try the interactive example below to see how this tool structures data.
                </p>
              </div>

              <div>
                {hasExternalLink ? (
                  <a
                    href={toolUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary"
                    style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                  >
                    <span>Open tool</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="btn btn--ghost"
                    style={{ opacity: 0.6, cursor: "not-allowed" }}
                    aria-disabled="true"
                  >
                    Link coming soon
                  </button>
                )}
              </div>
            </div>

            {/* Interactive Demo */}
            {interactiveDemo && (
              <div style={{ borderRadius: "var(--r)", overflow: "hidden", border: "1px solid var(--border)" }}>
                {interactiveDemo}
              </div>
            )}
          </section>
        )}

        {/* Highlights List */}
        {product.highlights && product.highlights.length > 0 && (
          <section aria-labelledby="tool-highlights-heading" style={{ marginBottom: 44 }}>
            <h2 id="tool-highlights-heading" className="eyebrow" style={{ marginBottom: 14 }}>
              KEY FEATURES
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              {product.highlights.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "18px 20px",
                    borderRadius: "var(--r)",
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                  }}
                >
                  <span style={{ color: "var(--brand-orange)", fontSize: 16, lineHeight: 1.4 }} aria-hidden="true">
                    ✓
                  </span>
                  <p className="small" style={{ color: "var(--ink)", margin: 0, lineHeight: 1.5 }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section D: What it does not do */}
        <aside
          aria-labelledby="what-it-does-not-do-heading"
          style={{
            padding: "24px 28px",
            borderRadius: "var(--r)",
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          <h2
            id="what-it-does-not-do-heading"
            className="eyebrow"
            style={{ color: "var(--brand-orange)", margin: 0 }}
          >
            WHAT IT DOES NOT DO
          </h2>
          <p style={{ marginTop: 10, marginBottom: 0, color: "var(--ink-secondary)", lineHeight: 1.6, fontSize: 15.5 }}>
            {product.whatItDoesNotDo}
          </p>
        </aside>
      </div>
    </article>
  );
}
