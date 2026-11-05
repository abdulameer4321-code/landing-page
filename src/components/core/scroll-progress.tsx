"use client";

import React, { useEffect, useState } from "react";

export interface ScrollProgressProps {
  containerRef?: React.RefObject<HTMLElement | null>;
  className?: string;
  springOptions?: {
    stiffness?: number;
    damping?: number;
  };
}

export function ScrollProgress({
  containerRef,
  className = "",
}: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef && containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const total = scrollHeight - clientHeight;
        if (total > 0) {
          setProgress(Math.min(1, Math.max(0, scrollTop / total)));
        }
      } else {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight > 0) {
          setProgress(Math.min(1, Math.max(0, scrollTop / scrollHeight)));
        }
      }
    };

    const target = containerRef?.current || window;
    target.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      target.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef]);

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`scroll-progress-bar ${className}`}
      style={{
        transformOrigin: "left",
        transform: `scaleX(${progress})`,
        transition: "transform 0.08s linear",
      }}
    />
  );
}
