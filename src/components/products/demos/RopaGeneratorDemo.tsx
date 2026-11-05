"use client";

import { useState } from "react";

interface RopaRow {
  id: string;
  activity: string;
  dataCollected: string;
  purpose: string;
  retention: string;
}

const INITIAL_ROWS: RopaRow[] = [
  {
    id: "1",
    activity: "Customer Onboarding",
    dataCollected: "Name, Email, Phone number",
    purpose: "Creating and verifying customer account",
    retention: "1 year after account closure",
  },
  {
    id: "2",
    activity: "Order Processing",
    dataCollected: "Billing address, Payment confirmation",
    purpose: "Invoicing and tax compliance",
    retention: "7 years for statutory accounting",
  },
];

export function RopaGeneratorDemo() {
  const [rows, setRows] = useState<RopaRow[]>(INITIAL_ROWS);
  const [activity, setActivity] = useState("");
  const [dataCollected, setDataCollected] = useState("");
  const [purpose, setPurpose] = useState("");
  const [retention, setRetention] = useState("");
  const [copied, setCopied] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activity.trim() || !dataCollected.trim()) return;

    const newRow: RopaRow = {
      id: `${Date.now()}`,
      activity: activity.trim(),
      dataCollected: dataCollected.trim(),
      purpose: purpose.trim() || "Specified business purpose",
      retention: retention.trim() || "Until purpose is fulfilled",
    };

    setRows((prev) => [...prev, newRow]);
    setActivity("");
    setDataCollected("");
    setPurpose("");
    setRetention("");
  };

  const handleCopy = async () => {
    const header = "Activity\tData Collected\tPurpose\tRetention Period\n";
    const body = rows
      .map((r) => `${r.activity}\t${r.dataCollected}\t${r.purpose}\t${r.retention}`)
      .join("\n");

    try {
      await navigator.clipboard.writeText(header + body);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="try-it-container">
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 14, marginBottom: 20 }}>
        <div>
          <span className="try-it-badge">Example Interactive Panel</span>
          <h3 className="h3">Sample Processing Activity Register</h3>
          <p className="small" style={{ color: "var(--ink-secondary)", marginTop: 4 }}>
            Add an activity below to see how ROPAx builds a clean inventory of your personal data.
          </p>
        </div>

        <button
          type="button"
          className="btn btn--secondary btn--sm"
          onClick={handleCopy}
        >
          {copied ? "Copied to clipboard!" : "Copy as table"}
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleAdd} style={{ padding: 18, backgroundColor: "var(--surface-alt)", border: "1px solid var(--border)", borderRadius: "var(--r)", marginBottom: 20 }}>
        <h4 style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", marginBottom: 12 }}>
          Add New Activity
        </h4>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          <div>
            <label htmlFor="ropa-activity" className="small" style={{ fontWeight: 600, display: "block", marginBottom: 4 }}>
              Activity Name
            </label>
            <input
              id="ropa-activity"
              type="text"
              className="agent-x-input"
              style={{ width: "100%", fontSize: 15 }}
              placeholder="e.g. Job Applicant Screening"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="ropa-data" className="small" style={{ fontWeight: 600, display: "block", marginBottom: 4 }}>
              Data Collected
            </label>
            <input
              id="ropa-data"
              type="text"
              className="agent-x-input"
              style={{ width: "100%", fontSize: 15 }}
              placeholder="e.g. Resume, Email, Work history"
              value={dataCollected}
              onChange={(e) => setDataCollected(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="ropa-purpose" className="small" style={{ fontWeight: 600, display: "block", marginBottom: 4 }}>
              Purpose
            </label>
            <input
              id="ropa-purpose"
              type="text"
              className="agent-x-input"
              style={{ width: "100%", fontSize: 15 }}
              placeholder="e.g. Evaluating candidate fit"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="ropa-retention" className="small" style={{ fontWeight: 600, display: "block", marginBottom: 4 }}>
              Retention Period
            </label>
            <input
              id="ropa-retention"
              type="text"
              className="agent-x-input"
              style={{ width: "100%", fontSize: 15 }}
              placeholder="e.g. 6 months after decision"
              value={retention}
              onChange={(e) => setRetention(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn--primary btn--sm"
          style={{ marginTop: 14 }}
          disabled={!activity.trim() || !dataCollected.trim()}
        >
          Add to sample register
        </button>
      </form>

      {/* Table */}
      <div style={{ overflowX: "auto", border: "1px solid var(--border)", borderRadius: "var(--r)", backgroundColor: "var(--surface)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 15 }}>
          <thead>
            <tr style={{ backgroundColor: "var(--surface-alt)", borderBottom: "1px solid var(--border)" }}>
              <th style={{ padding: "12px 14px", fontWeight: 600, color: "var(--ink)" }}>Activity</th>
              <th style={{ padding: "12px 14px", fontWeight: 600, color: "var(--ink)" }}>Data Collected</th>
              <th style={{ padding: "12px 14px", fontWeight: 600, color: "var(--ink)" }}>Purpose</th>
              <th style={{ padding: "12px 14px", fontWeight: 600, color: "var(--ink)" }}>Retention Period</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "12px 14px", fontWeight: 550, color: "var(--ink)" }}>{row.activity}</td>
                <td style={{ padding: "12px 14px", color: "var(--ink-secondary)" }}>{row.dataCollected}</td>
                <td style={{ padding: "12px 14px", color: "var(--ink-secondary)" }}>{row.purpose}</td>
                <td style={{ padding: "12px 14px", color: "var(--ink-muted)" }}>{row.retention}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
