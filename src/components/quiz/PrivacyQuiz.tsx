"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { QUIZ_BANK, QuizQuestion } from "@/lib/privacy-quiz";
import { generateResultCard } from "@/lib/generate-result-card";

interface PreparedQuestion {
  id: string;
  topic: string;
  type: "mcq" | "yesno" | "all";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  toolSlug?: string;
}

const STORAGE_KEY_SEEN = "dpdp_quiz_seen_ids";
const STORAGE_KEY_LAST_ROUND = "dpdp_quiz_last_round_ids";

function getStoredIds(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setStoredIds(key: string, ids: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(ids));
  } catch {
    // Silently continue if storage blocked
  }
}

function selectRoundQuestions(bank: QuizQuestion[]): PreparedQuestion[] {
  const seenIds = getStoredIds(STORAGE_KEY_SEEN);
  const lastRoundIds = getStoredIds(STORAGE_KEY_LAST_ROUND);

  // Unseen pool
  let pool = bank.filter((q) => !seenIds.includes(q.id));
  if (pool.length < 10) {
    // Clear seen IDs and start again, ensuring new round doesn't start with last round's questions
    pool = bank.filter((q) => !lastRoundIds.includes(q.id));
    if (pool.length < 10) pool = [...bank];
    setStoredIds(STORAGE_KEY_SEEN, []);
  }

  const shuffledPool = [...pool].sort(() => Math.random() - 0.5);

  const selected: QuizQuestion[] = [];
  const topicCounts: Record<string, number> = {};
  let yesnoCount = 0;
  let allCount = 0;

  // First pick at least 2 yesno
  for (const q of shuffledPool) {
    if (selected.length >= 10) break;
    if (q.type === "yesno" && yesnoCount < 2) {
      const tCount = topicCounts[q.topic] || 0;
      if (tCount < 2) {
        selected.push(q);
        topicCounts[q.topic] = tCount + 1;
        yesnoCount++;
      }
    }
  }

  // Fill remaining respecting constraints
  for (const q of shuffledPool) {
    if (selected.length >= 10) break;
    if (selected.some((s) => s.id === q.id)) continue;

    const tCount = topicCounts[q.topic] || 0;
    if (tCount >= 2) continue;

    if (q.type === "all") {
      if (allCount >= 2) continue;
      allCount++;
    }

    selected.push(q);
    topicCounts[q.topic] = tCount + 1;
    if (q.type === "yesno") yesnoCount++;
  }

  // Supplement if needed
  if (selected.length < 10) {
    const fallbackPool = [...bank].sort(() => Math.random() - 0.5);
    for (const q of fallbackPool) {
      if (selected.length >= 10) break;
      if (selected.some((s) => s.id === q.id)) continue;

      const tCount = topicCounts[q.topic] || 0;
      if (tCount >= 2) continue;
      if (q.type === "all" && allCount >= 2) continue;

      selected.push(q);
      topicCounts[q.topic] = tCount + 1;
      if (q.type === "yesno") yesnoCount++;
      if (q.type === "all") allCount++;
    }
  }

  // Shuffle final 10
  const finalRound = selected.sort(() => Math.random() - 0.5);

  // Update storage
  const currentRoundIds = finalRound.map((q) => q.id);
  const updatedSeen = Array.from(new Set([...getStoredIds(STORAGE_KEY_SEEN), ...currentRoundIds]));
  setStoredIds(STORAGE_KEY_SEEN, updatedSeen);
  setStoredIds(STORAGE_KEY_LAST_ROUND, currentRoundIds);

  // Prepare options & preserve "All of the above" at the end
  return finalRound.map((q) => {
    if (q.type === "all") {
      const allOption = q.options[q.options.length - 1];
      const otherOptions = q.options.slice(0, q.options.length - 1);
      const mapped = otherOptions.map((opt, idx) => ({ opt, originalIndex: idx }));
      mapped.sort(() => Math.random() - 0.5);

      const newOptions = mapped.map((m) => m.opt);
      newOptions.push(allOption);

      let newCorrectIndex = q.options.length - 1;
      if (q.answer < q.options.length - 1) {
        newCorrectIndex = mapped.findIndex((m) => m.originalIndex === q.answer);
      }

      return {
        id: q.id,
        topic: q.topic,
        type: q.type,
        question: q.question,
        options: newOptions,
        correctIndex: newCorrectIndex,
        explanation: q.explanation,
        toolSlug: q.toolSlug,
      };
    } else {
      const mapped = q.options.map((opt, idx) => ({ opt, originalIndex: idx }));
      mapped.sort(() => Math.random() - 0.5);

      const newOptions = mapped.map((m) => m.opt);
      const newCorrectIndex = mapped.findIndex((m) => m.originalIndex === q.answer);

      return {
        id: q.id,
        topic: q.topic,
        type: q.type,
        question: q.question,
        options: newOptions,
        correctIndex: newCorrectIndex,
        explanation: q.explanation,
        toolSlug: q.toolSlug,
      };
    }
  });
}

function getScoreLabel(score: number): string {
  if (score <= 3) return "Just starting";
  if (score <= 6) return "Good base";
  if (score <= 8) return "Strong";
  return "You know your privacy";
}

export function PrivacyQuiz() {
  const [gameState, setGameState] = useState<"start" | "play" | "end">("start");
  const [questions, setQuestions] = useState<PreparedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [missedQuestions, setMissedQuestions] = useState<PreparedQuestion[]>([]);

  // End screen name and download state
  const [name, setName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  // Screen reader announcements
  const [announcement, setAnnouncement] = useState("");

  const questionHeadingRef = useRef<HTMLHeadingElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  // Start new round
  const startNewGame = useCallback(() => {
    const round = selectRoundQuestions(QUIZ_BANK);
    setQuestions(round);
    setCurrentIndex(0);
    setSelectedIndex(null);
    setScore(0);
    setMissedQuestions([]);
    setName("");
    setNameTouched(false);
    setCopyStatus(null);
    setGameState("play");
    setAnnouncement("Quiz started. Question 1 of 10.");
  }, []);

  // Answer selection handler
  const handleSelectAnswer = useCallback((idx: number) => {
    if (selectedIndex !== null) return; // Answer locked
    setSelectedIndex(idx);

    const currentQ = questions[currentIndex];
    if (!currentQ) return;
    const isCorrect = idx === currentQ.correctIndex;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setAnnouncement(`Correct! ${currentQ.explanation}`);
    } else {
      setMissedQuestions((prev) => [...prev, currentQ]);
      setAnnouncement(`Incorrect. The correct answer was option ${currentQ.correctIndex + 1}. ${currentQ.explanation}`);
    }

    // Auto-focus the next button after short delay
    setTimeout(() => {
      nextButtonRef.current?.focus({ preventScroll: true });
    }, 100);
  }, [selectedIndex, questions, currentIndex]);

  // Next question handler
  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedIndex(null);
      setAnnouncement(`Question ${currentIndex + 2} of 10.`);

      // Move focus to question title without scrolling
      setTimeout(() => {
        questionHeadingRef.current?.focus({ preventScroll: true });
      }, 50);
    } else {
      setGameState("end");
      setAnnouncement(`Quiz completed. Your score is ${score} out of 10.`);
    }
  };

  // Keyboard navigation (1-4 for answers)
  useEffect(() => {
    if (gameState !== "play" || selectedIndex !== null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const currentQ = questions[currentIndex];
      if (!currentQ) return;

      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= currentQ.options.length) {
        e.preventDefault();
        handleSelectAnswer(num - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, currentIndex, selectedIndex, questions, handleSelectAnswer]);

  // Name validation: 1 to 60 characters; English letters, spaces, . - ' only
  const nameRegex = /^[A-Za-z\s.\-']{1,60}$/;
  const isNameValid = nameRegex.test(name.trim());
  const showNameHint = nameTouched && name.length > 0 && !isNameValid;

  // Handle PDF Download
  const handleDownloadPDF = async () => {
    if (!isNameValid || isDownloading) return;
    setIsDownloading(true);

    try {
      await generateResultCard({
        name: name.trim(),
        score,
        total: 10,
      });
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Copy result handler
  const handleCopyResult = async () => {
    const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://dpdpmatrix.in";
    const text = `I scored ${score}/10 on the DPDP MatriX privacy check. Try it: ${siteUrl}`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setCopyStatus("Copied to clipboard!");
      } else {
        setCopyStatus(text);
      }
      setTimeout(() => setCopyStatus(null), 3500);
    } catch {
      setCopyStatus("Could not copy automatically.");
    }
  };

  // Unique topics missed
  const missedTopics = Array.from(new Set(missedQuestions.map((q) => q.topic)));
  const missedTools = Array.from(
    new Map(
      missedQuestions
        .filter((q) => q.toolSlug)
        .map((q) => [q.toolSlug, q])
    ).values()
  );

  return (
    <section className="section" id="privacy-score" aria-labelledby="quiz-section-heading">
      <div className="container">
        {/* Screen Reader Live Region */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {announcement}
        </div>

        <div className="quiz-card-wrapper">
          {/* ────────────────────────────────────────────────────────
              SCREEN 1: START SCREEN
              ──────────────────────────────────────────────────────── */}
          {gameState === "start" && (
            <div className="quiz-screen-content">
              <span className="eyebrow" id="quiz-section-heading">
                PRIVACY AWARENESS CHECK
              </span>

              <h2 className="h2" style={{ marginTop: 10, marginBottom: 12 }}>
                How much do you know about privacy?
              </h2>

              <p className="body" style={{ color: "var(--ink-secondary)", maxWidth: "56ch", marginBottom: 28, fontSize: 18 }}>
                10 questions, about 2 minutes. Different questions each time.
              </p>

              <div>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={startNewGame}
                  style={{ minHeight: 48, paddingInline: 28, fontSize: 17 }}
                >
                  Start check →
                </button>
              </div>

              <p className="small" style={{ color: "var(--ink-muted)", marginTop: 24, maxWidth: "54ch", lineHeight: 1.55 }}>
                A quick, fun check for beginners. You can download a fun result card at the end. It is not legal advice and not an official certification.
              </p>
            </div>
          )}

          {/* ────────────────────────────────────────────────────────
              SCREEN 2: PLAY FLOW (ONE QUESTION AT A TIME)
              ──────────────────────────────────────────────────────── */}
          {gameState === "play" && questions[currentIndex] && (
            <div className="quiz-screen-content">
              {/* Progress & Topic */}
              <div className="quiz-top-meta">
                <span className="quiz-progress-text">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="quiz-topic-badge">
                  {questions[currentIndex].topic}
                </span>
              </div>

              {/* Question Text */}
              <h3
                ref={questionHeadingRef}
                tabIndex={-1}
                className="quiz-question-title"
              >
                {questions[currentIndex].question}
              </h3>

              {/* Options List */}
              <div className="quiz-options-grid" role="group" aria-label="Answer options">
                {questions[currentIndex].options.map((option, idx) => {
                  const isPicked = selectedIndex === idx;
                  const isCorrectAnswer = idx === questions[currentIndex].correctIndex;
                  const hasAnswered = selectedIndex !== null;

                  let btnClass = "quiz-option-btn";
                  if (hasAnswered) {
                    if (isCorrectAnswer) {
                      btnClass += " is-correct";
                    } else if (isPicked) {
                      btnClass += " is-wrong";
                    } else {
                      btnClass += " is-dimmed";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      className={btnClass}
                      disabled={hasAnswered}
                      onClick={() => handleSelectAnswer(idx)}
                      aria-pressed={isPicked}
                    >
                      <span className="quiz-option-key">{idx + 1}</span>
                      <span className="quiz-option-label">{option}</span>
                      {hasAnswered && isCorrectAnswer && (
                        <span className="quiz-status-icon" aria-hidden="true">✓</span>
                      )}
                      {hasAnswered && isPicked && !isCorrectAnswer && (
                        <span className="quiz-status-icon is-cross" aria-hidden="true">✕</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Next Button */}
              {selectedIndex !== null && (
                <div className="quiz-feedback-box">
                  <p className="quiz-explanation-text">
                    {questions[currentIndex].explanation}
                  </p>
                  <div>
                    <button
                      ref={nextButtonRef}
                      type="button"
                      className="btn btn--primary"
                      onClick={handleNext}
                      style={{ minHeight: 46, paddingInline: 26 }}
                    >
                      {currentIndex + 1 < questions.length ? "Next question →" : "See your result →"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ────────────────────────────────────────────────────────
              SCREEN 3: END SCREEN (SAME CARD)
              ──────────────────────────────────────────────────────── */}
          {gameState === "end" && (
            <div className="quiz-screen-content">
              {/* Score Display */}
              <div className="quiz-end-score-block">
                <span className="eyebrow">YOUR RESULT</span>
                <div className="quiz-score-num">
                  {score} / 10
                </div>
                <p className="quiz-score-label">
                  {getScoreLabel(score)}
                </p>
              </div>

              {/* Revisit Section (If any questions were missed) */}
              {missedQuestions.length > 0 && (
                <div className="quiz-revisit-block">
                  <span className="small" style={{ fontWeight: 600, color: "var(--ink)" }}>
                    Revisit:
                  </span>{" "}
                  <span className="small" style={{ color: "var(--ink-secondary)" }}>
                    {missedTopics.join(", ")}
                  </span>

                  {missedTools.length > 0 && (
                    <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 10 }}>
                      <span className="small" style={{ color: "var(--ink-muted)" }}>
                        Explore relevant tools:
                      </span>
                      {missedTools.map((q) => (
                        <Link
                          key={q.toolSlug}
                          href={`/products/${q.toolSlug}`}
                          className="link small"
                          style={{ color: "var(--brand-orange)", fontWeight: 550 }}
                        >
                          {q.topic} Tool →
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Name Field and PDF Download */}
              <div className="quiz-download-block">
                <div className="quiz-download-inputs">
                  <div style={{ flex: "1 1 240px" }}>
                    <label htmlFor="quiz-visitor-name" className="quiz-input-label">
                      Your name
                    </label>
                    <input
                      id="quiz-visitor-name"
                      type="text"
                      className="agent-x-input"
                      placeholder="e.g. Aarav Sharma"
                      value={name}
                      maxLength={60}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (!nameTouched) setNameTouched(true);
                      }}
                      onBlur={() => setNameTouched(true)}
                      style={{ height: 48, fontSize: 16 }}
                    />
                    {showNameHint && (
                      <p className="small" style={{ color: "var(--status-warning)", marginTop: 4, marginInline: 0 }}>
                        Please use English letters for the PDF.
                      </p>
                    )}
                  </div>

                  <div style={{ alignSelf: "flex-end" }}>
                    <button
                      type="button"
                      className="btn btn--primary"
                      disabled={!isNameValid || isDownloading}
                      onClick={handleDownloadPDF}
                      style={{ height: 48, minWidth: 160 }}
                    >
                      {isDownloading ? "Generating..." : "Download PDF"}
                    </button>
                  </div>
                </div>

                <p className="small" style={{ color: "var(--ink-muted)", marginTop: 10, lineHeight: 1.5 }}>
                  Your name stays on your device. It is only used to draw the PDF in your browser. It is not sent or saved anywhere.
                </p>
              </div>

              {/* Action Buttons: Play again & Copy result */}
              <div className="quiz-end-actions">
                <button
                  type="button"
                  className="btn btn--secondary btn--sm"
                  onClick={startNewGame}
                >
                  Play again
                </button>

                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={handleCopyResult}
                >
                  Copy my result
                </button>

                {copyStatus && (
                  <span className="small" style={{ color: "var(--status-success)", fontWeight: 500 }}>
                    {copyStatus}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
