"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const calculateScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const scrolled = (window.scrollY / docHeight) * 100;
      setProgress(Math.min(100, Math.max(0, scrolled)));
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          calculateScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    calculateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", calculateScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", calculateScroll);
    };
  }, []);

  return (
    <div
      className="scroll-progress-track"
      role="progressbar"
      aria-label="Page reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="scroll-progress-fill" style={{ width: `${progress}%` }} />
    </div>
  );
}
