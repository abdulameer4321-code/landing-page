"use client";

import React from "react";

export interface InfiniteSliderProps {
  children: React.ReactNode;
  gap?: number;
  reverse?: boolean;
  speed?: number; // duration in seconds
  pauseOnHover?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function InfiniteSlider({
  children,
  gap = 24,
  reverse = false,
  speed = 35,
  pauseOnHover = true,
  className = "",
  ariaLabel = "Continuous item showcase",
}: InfiniteSliderProps) {
  return (
    <div
      className={`infinite-slider-container ${className} ${pauseOnHover ? "pause-on-hover" : ""}`}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      style={{
        overflow: "hidden",
        width: "100%",
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        className="infinite-slider-track"
        style={{
          display: "flex",
          width: "max-content",
          gap: `${gap}px`,
          animation: `infinite-slide ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: `${gap}px`, flexShrink: 0 }}>
          {children}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: `${gap}px`, flexShrink: 0 }} aria-hidden="true">
          {children}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: `${gap}px`, flexShrink: 0 }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
