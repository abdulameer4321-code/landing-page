"use client";

import { useState } from "react";

export function ConsentDeskDemo() {
  const [productUpdates, setProductUpdates] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [lastAction, setLastAction] = useState<"Granted" | "Withdrawn">("Granted");
  const [updatedAt, setUpdatedAt] = useState("Just now");

  const handleWithdrawAll = () => {
    setProductUpdates(false);
    setAnalytics(false);
    setLastAction("Withdrawn");
    setUpdatedAt("Just now");
  };

  const handleGrant = () => {
    setProductUpdates(true);
    setAnalytics(true);
    setLastAction("Granted");
    setUpdatedAt("Just now");
  };

  return (
    <div className="try-it-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <span className="try-it-badge">Example Interactive Panel</span>
          <h3 className="h3">Sample Notice and Consent Record</h3>
          <p className="small" style={{ color: "var(--ink-secondary)", marginTop: 4 }}>
            See how clear notices allow visitors to grant and withdraw consent for separate purposes.
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
        {/* Left: Sample Notice with Toggles */}
        <div style={{ padding: 20, backgroundColor: "var(--surface-alt)", border: "1px solid var(--border)", borderRadius: "var(--r)" }}>
          <h4 style={{ fontSize: 17, fontWeight: 600, color: "var(--ink)", marginBottom: 12 }}>
            Sample Consent Notice
          </h4>

          <div style={{ display: "grid", gap: 14 }}>
            {/* Purpose 1: Required */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, borderBottom: "1px solid var(--border)" }}>
              <div>
                <span style={{ fontWeight: 600, fontSize: 15, color: "var(--ink)" }}>Account Management</span>
                <p className="small" style={{ margin: "2px 0 0" }}>Essential to create and manage your account.</p>
              </div>
              <span className="badge badge--available">Required</span>
            </div>

            {/* Purpose 2: Optional */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, borderBottom: "1px solid var(--border)" }}>
              <div>
                <label htmlFor="toggle-updates" style={{ fontWeight: 600, fontSize: 15, color: "var(--ink)", cursor: "pointer" }}>
                  Product Announcements
                </label>
                <p className="small" style={{ margin: "2px 0 0" }}>Monthly email updates on new tools.</p>
              </div>
              <input
                id="toggle-updates"
                type="checkbox"
                checked={productUpdates}
                onChange={(e) => {
                  setProductUpdates(e.target.checked);
                  setLastAction("Granted");
                  setUpdatedAt("Just now");
                }}
                style={{ width: 20, height: 20, accentColor: "var(--brand-orange)", cursor: "pointer" }}
              />
            </div>

            {/* Purpose 3: Optional */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <label htmlFor="toggle-analytics" style={{ fontWeight: 600, fontSize: 15, color: "var(--ink)", cursor: "pointer" }}>
                  Usage Analytics
                </label>
                <p className="small" style={{ margin: "2px 0 0" }}>Anonymous statistics to improve the tool.</p>
              </div>
              <input
                id="toggle-analytics"
                type="checkbox"
                checked={analytics}
                onChange={(e) => {
                  setAnalytics(e.target.checked);
                  setLastAction("Granted");
                  setUpdatedAt("Just now");
                }}
                style={{ width: 20, height: 20, accentColor: "var(--brand-orange)", cursor: "pointer" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button type="button" className="btn btn--secondary btn--sm" onClick={handleGrant}>
              Grant Optional
            </button>
            <button type="button" className="btn btn--secondary btn--sm" onClick={handleWithdrawAll}>
              Withdraw Optional
            </button>
          </div>
        </div>

        {/* Right: Live Record / Receipt Update */}
        <div style={{ padding: 20, backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h4 style={{ fontSize: 17, fontWeight: 600, color: "var(--ink)", margin: 0 }}>
              Sample Consent Record
            </h4>
            <span className={`badge ${lastAction === "Granted" ? "badge--available" : "badge--dev"}`}>
              Status: {lastAction}
            </span>
          </div>

          <div style={{ display: "grid", gap: 10, fontSize: 15 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--ink-muted)" }}>Sample Receipt ID:</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 14 }}>REC-DEMO-2026</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--ink-muted)" }}>Account Management:</span>
              <span style={{ color: "var(--status-success)", fontWeight: 600 }}>Active (Required)</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--ink-muted)" }}>Product Announcements:</span>
              <span style={{ fontWeight: 600, color: productUpdates ? "var(--status-success)" : "var(--status-warning)" }}>
                {productUpdates ? "Consent Granted" : "Consent Withdrawn"}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--ink-muted)" }}>Usage Analytics:</span>
              <span style={{ fontWeight: 600, color: analytics ? "var(--status-success)" : "var(--status-warning)" }}>
                {analytics ? "Consent Granted" : "Consent Withdrawn"}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--ink-muted)" }}>Last Activity:</span>
              <span>{updatedAt}</span>
            </div>
          </div>

          <p className="small" style={{ marginTop: 18, borderTop: "1px solid var(--border)", paddingTop: 10 }}>
            When a visitor withdraws consent, the record updates immediately and notifies downstream systems to stop processing.
          </p>
        </div>
      </div>
    </div>
  );
}
