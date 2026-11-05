"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { openAgentXWithQuestion } from "@/components/agent-x/AgentXDrawer";

export function AgentXFloatingWidget() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      className="agent-x-floating-display"
      aria-label="Agent X — DPDP's Copilot"
    >
      <button
        type="button"
        onClick={() => openAgentXWithQuestion()}
        className={`agent-x-floating-btn ${scrolled ? "is-scrolled" : ""}`}
        aria-label="Open Agent X — DPDP's Copilot"
      >
        {/* Glowing 3D Avatar */}
        <div className="agent-x-floating-avatar-wrap">
          <Image
            src="/brand/agent-x-avatar.png"
            alt="Agent X Avatar"
            width={34}
            height={34}
            priority
            className="agent-x-floating-avatar-img"
          />
          <span className="agent-x-live-dot" aria-hidden="true" />
        </div>

        {/* Agent X Logo + DPDP's Copilot */}
        <div className="agent-x-floating-text">
          <div className="flex items-center gap-2">
            <Image
              src="/brand/agent-x-logo.png"
              alt="Agent X"
              width={82}
              height={22}
              priority
              className="h-4.5 w-auto object-contain"
            />
          </div>
          <span className="agent-x-floating-sub">DPDP&apos;s Copilot</span>
        </div>
      </button>
    </aside>
  );
}
