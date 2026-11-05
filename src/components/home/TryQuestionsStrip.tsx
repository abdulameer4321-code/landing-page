"use client";

import React from "react";
import { openAgentXWithQuestion } from "@/components/agent-x/AgentXDrawer";

interface TryQuestionsStripProps {
  heading: string;
  subheading: string;
  questions: string[];
}

export function TryQuestionsStrip({
  heading,
  subheading,
  questions,
}: TryQuestionsStripProps) {
  return (
    <div className="try-questions-strip">
      <h3 className="h3">{heading}</h3>
      <p className="small" style={{ color: "var(--ink-secondary)", margin: "4px 0 0" }}>
        {subheading}
      </p>

      <div className="try-questions-buttons">
        {questions.map((q) => (
          <button
            key={q}
            type="button"
            className="try-question-pill"
            onClick={() => openAgentXWithQuestion(q)}
          >
            <span>&ldquo;{q}&rdquo;</span>
            <span style={{ color: "var(--brand-orange)" }} aria-hidden="true">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}
