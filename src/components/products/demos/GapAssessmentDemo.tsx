"use client";

import { useState } from "react";

interface Question {
  id: number;
  text: string;
  recommendationIfNo: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Do you have a clear privacy notice explaining what personal data you collect and why?",
    recommendationIfNo: "Publish an itemised notice listing data categories and specified purposes.",
  },
  {
    id: 2,
    text: "Do you ask for separate consent for marketing rather than bundling it with account creation?",
    recommendationIfNo: "Unbundle consent options so visitors can use your service without mandatory marketing.",
  },
  {
    id: 3,
    text: "Do you have a designated grievance contact for visitors to ask questions or lodge complaints?",
    recommendationIfNo: "Publish a clear email contact for privacy inquiries and grievance redressal.",
  },
  {
    id: 4,
    text: "Do you have a defined schedule to delete customer data when it is no longer needed?",
    recommendationIfNo: "Establish retention schedules and delete personal data when its purpose ends.",
  },
  {
    id: 5,
    text: "Do you have contracts with third-party vendors who process customer data on your behalf?",
    recommendationIfNo: "Put data processing agreements in place with all cloud and analytics vendors.",
  },
];

export function GapAssessmentDemo() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: false,
    5: false,
  });

  const toggleAnswer = (id: number, val: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const yesCount = Object.values(answers).filter(Boolean).length;
  const percentage = Math.round((yesCount / QUESTIONS.length) * 100);

  const missingQuestions = QUESTIONS.filter((q) => answers[q.id] === false);

  return (
    <div className="try-it-container">
      <div style={{ marginBottom: 20 }}>
        <span className="try-it-badge">Example Interactive Panel</span>
        <h3 className="h3">Sample Privacy Readiness Check</h3>
        <p className="small" style={{ color: "var(--ink-secondary)", marginTop: 4 }}>
          Answer these five sample questions to see an indicative readiness snapshot.
        </p>
      </div>

      <div style={{ display: "grid", gap: 16 }}>
        {QUESTIONS.map((q) => {
          const isYes = answers[q.id] === true;

          return (
            <div
              key={q.id}
              style={{
                padding: "16px 18px",
                backgroundColor: "var(--surface-alt)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r)",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div style={{ maxWidth: 540 }}>
                <span className="small" style={{ fontWeight: 600, color: "var(--brand-orange-deep)" }}>
                  Question 0{q.id}
                </span>
                <p style={{ margin: "2px 0 0", fontSize: 16, color: "var(--ink)" }}>{q.text}</p>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  className={`btn btn--sm ${isYes ? "btn--primary" : "btn--secondary"}`}
                  onClick={() => toggleAnswer(q.id, true)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`btn btn--sm ${!isYes ? "btn--primary" : "btn--secondary"}`}
                  onClick={() => toggleAnswer(q.id, false)}
                >
                  No
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Result Card */}
      <div
        style={{
          marginTop: 24,
          padding: 20,
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--r)",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div>
            <h4 style={{ fontSize: 18, fontWeight: 600, margin: 0, color: "var(--ink)" }}>
              Readiness Snapshot: {percentage}% ({yesCount} of 5 controls met)
            </h4>
            <p className="small" style={{ margin: "4px 0 0", color: "var(--brand-orange-deep)", fontWeight: 550 }}>
              This assessment is indicative only. It is not formal legal advice or a compliance certificate.
            </p>
          </div>
          <span className="badge badge--available">Indicative Result</span>
        </div>

        {missingQuestions.length > 0 && (
          <div style={{ marginTop: 16, borderTop: "1px solid var(--border)", paddingTop: 14 }}>
            <p className="small" style={{ fontWeight: 600, color: "var(--ink)", marginBottom: 8 }}>
              Suggested Next Steps:
            </p>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 15, color: "var(--ink-secondary)" }}>
              {missingQuestions.map((q) => (
                <li key={q.id} style={{ marginBottom: 6 }}>
                  {q.recommendationIfNo}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
