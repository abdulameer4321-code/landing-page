"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
}

export function openAgentXWithQuestion(question?: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("open-agent-x", { detail: { question: question || "" } })
    );
  }
}

export function AgentXDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: "Hello! I am Agent X, DPDP's Copilot. You can ask me questions about India's DPDP Act, statutory notice rules, or how each tool in this workshop operates.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const custom = e as CustomEvent<{ question?: string }>;
      setIsOpen(true);
      if (custom.detail?.question) {
        setInput(custom.detail.question);
      }
    };

    window.addEventListener("open-agent-x", handleOpen);
    return () => window.removeEventListener("open-agent-x", handleOpen);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = input.trim();
    if (!query || loading) return;

    setErrorMsg("");
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/agent-x", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to get answer");
      }

      const botMsg: Message = {
        id: `b-${Date.now()}`,
        sender: "assistant",
        text: data.reply || "No reply was returned.",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="agent-x-copilot-window"
      role="complementary"
      aria-label="Agent X — DPDP's Copilot"
    >
      {/* Header */}
      <div className="agent-x-copilot-header">
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/brand/agent-x-avatar.png"
              alt="Agent X Avatar"
              width={32}
              height={32}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <Image
                src="/brand/agent-x-logo.png"
                alt="Agent X"
                width={85}
                height={22}
                className="h-4.5 w-auto object-contain"
                priority
              />
              <span className="agent-x-badge-pill">AI</span>
            </div>
            <p className="text-[11px] font-mono text-[var(--brand-orange-deep)] m-0 leading-tight">
              DPDP&apos;s Copilot
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="agent-x-window-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Minimize Agent X"
            title="Minimize"
          >
            —
          </button>
          <button
            type="button"
            className="agent-x-window-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close Agent X"
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Info notice */}
      <div className="agent-x-copilot-subnotice">
        Interactive DPDP intelligence. You can browse the page while asking questions.
      </div>

      {/* Messages */}
      <div className="agent-x-copilot-body">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`agent-x-copilot-bubble ${m.sender === "user" ? "is-user" : "is-bot"}`}
          >
            <div className="agent-x-bubble-sender">
              {m.sender === "user" ? "You" : "Agent X"}
            </div>
            <div className="agent-x-bubble-text">{m.text}</div>
          </div>
        ))}

        {loading && (
          <div className="agent-x-copilot-bubble is-bot">
            <div className="agent-x-bubble-sender">Agent X</div>
            <div className="agent-x-bubble-text is-loading">
              <span>Thinking through DPDP rules...</span>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="agent-x-error-box">{errorMsg}</div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Form */}
      <form onSubmit={handleSend} className="agent-x-copilot-footer">
        <input
          type="text"
          className="agent-x-copilot-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about DPDP or tools..."
          maxLength={500}
          disabled={loading}
        />
        <button
          type="submit"
          className="btn btn--primary btn--sm"
          style={{ minHeight: 36, padding: "0 14px", borderRadius: "var(--r-sm)" }}
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}
