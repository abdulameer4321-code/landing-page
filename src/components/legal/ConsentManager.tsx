"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ConsentPreferences {
  version: string;
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
  decidedAt: string;
}

const STORAGE_KEY = "dpdp_matrix_consent_v1";

export function openConsentPreferences() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-privacy-preferences"));
  }
}

export function ConsentManager() {
  const [bannerOpen, setBannerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [customAnalytics, setCustomAnalytics] = useState(false);
  const [customFunctional, setCustomFunctional] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ConsentPreferences;
        setCustomAnalytics(Boolean(parsed.analytics));
        setCustomFunctional(Boolean(parsed.functional));
      } else {
        // Show immediately upon landing
        setBannerOpen(true);
      }
    } catch {
      setBannerOpen(true);
    }
  }, []);

  // Allow reopening preferences from footer or legal notice
  useEffect(() => {
    const handleReopen = () => {
      setModalOpen(true);
    };
    window.addEventListener("open-privacy-preferences", handleReopen);
    return () => window.removeEventListener("open-privacy-preferences", handleReopen);
  }, []);

  const saveDecision = (analytics: boolean, functional: boolean) => {
    const decision: ConsentPreferences = {
      version: "1.0",
      necessary: true,
      analytics,
      functional,
      decidedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(decision));
    } catch {
      // ignore
    }
    setBannerOpen(false);
    setModalOpen(false);

    window.dispatchEvent(
      new CustomEvent("dpdp-consent-updated", { detail: decision })
    );
  };

  const handleAcceptAll = () => saveDecision(true, true);
  const handleRejectOptional = () => saveDecision(false, false);
  const handleSaveCustom = () => saveDecision(customAnalytics, customFunctional);

  return (
    <>
      {/* Compact Floating Banner */}
      {bannerOpen && !modalOpen && (
        <aside
          className="consent-dock-card"
          role="region"
          aria-label="Storage and privacy preferences"
        >
          <div className="consent-dock-body">
            <div className="consent-dock-header">
              <span className="consent-dock-badge">COOKIE PREFERENCES</span>
              <p className="consent-dock-text">
                This website saves basic settings on your device for dark mode and site preferences. You can choose whether to allow anonymous visit counts.
              </p>
            </div>
            <div className="consent-dock-actions">
              <button
                type="button"
                className="btn btn--primary btn--xs"
                onClick={handleAcceptAll}
              >
                Accept All
              </button>
              <button
                type="button"
                className="btn btn--secondary btn--xs"
                onClick={handleRejectOptional}
              >
                Reject Optional
              </button>
              <button
                type="button"
                className="btn btn--ghost btn--xs"
                onClick={() => setModalOpen(true)}
              >
                Customise
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Custom Preference Modal */}
      {modalOpen && (
        <div
          className="consent-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-consent-title"
        >
          <div className="consent-modal-card">
            <div className="consent-modal-header">
              <div>
                <span className="eyebrow" style={{ fontSize: 11 }}>YOUR PRIVACY CHOICES</span>
                <h3 id="modal-consent-title" className="h3" style={{ marginTop: 4 }}>
                  Privacy &amp; Cookie Controls
                </h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setModalOpen(false)}
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <p className="small" style={{ color: "var(--ink-secondary)", marginTop: 8 }}>
              Choose what this website can save on your device. Essential items keep the website working. You decide whether to allow optional items.
            </p>

            <div className="consent-options-list">
              {/* Category 1: Essential */}
              <div className="consent-option-row">
                <div className="consent-option-info">
                  <span className="consent-option-name">Essential Storage</span>
                  <p className="consent-option-desc">
                    Saves your theme preference and navigation state. Required for the website to work properly.
                  </p>
                </div>
                <span className="badge badge--available">Required</span>
              </div>

              {/* Category 2: Functional */}
              <div className="consent-option-row">
                <div className="consent-option-info">
                  <label htmlFor="pref-functional" className="consent-option-name" style={{ cursor: "pointer" }}>
                    Tool Example Preferences
                  </label>
                  <p className="consent-option-desc">
                    Remembers inputs you enter in the interactive tool examples during your visit.
                  </p>
                </div>
                <input
                  id="pref-functional"
                  type="checkbox"
                  className="consent-checkbox"
                  checked={customFunctional}
                  onChange={(e) => setCustomFunctional(e.target.checked)}
                />
              </div>

              {/* Category 3: Analytics */}
              <div className="consent-option-row">
                <div className="consent-option-info">
                  <label htmlFor="pref-analytics" className="consent-option-name" style={{ cursor: "pointer" }}>
                    Anonymous Visit Counts
                  </label>
                  <p className="consent-option-desc">
                    Counts page visits to see which pages are helpful. Never identifies you or shares your details.
                  </p>
                </div>
                <input
                  id="pref-analytics"
                  type="checkbox"
                  className="consent-checkbox"
                  checked={customAnalytics}
                  onChange={(e) => setCustomAnalytics(e.target.checked)}
                />
              </div>
            </div>

            <div className="consent-modal-footer">
              <Link href="/privacy-policy" className="link small" onClick={() => setModalOpen(false)}>
                Read Privacy Notice →
              </Link>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="button"
                  className="btn btn--secondary btn--sm"
                  onClick={handleRejectOptional}
                >
                  Reject Optional
                </button>
                <button
                  type="button"
                  className="btn btn--primary btn--sm"
                  onClick={handleSaveCustom}
                >
                  Save My Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
