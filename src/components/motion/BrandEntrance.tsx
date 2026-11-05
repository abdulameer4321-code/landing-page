"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function BrandEntrance() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [finished, setFinished] = useState(true);

  useEffect(() => {
    // Only show on home route ("/")
    if (pathname !== "/") {
      setFinished(true);
      return;
    }

    // Check if already shown in this session
    try {
      const alreadyPlayed = sessionStorage.getItem("dpdp_matrix_intro_played");
      if (alreadyPlayed) {
        setFinished(true);
        return;
      }
    } catch {
      // Ignore storage errors
    }

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setFinished(true);
      return;
    }

    // Trigger opening screen transition for first-time session entrance
    setVisible(true);
    setFinished(false);

    try {
      sessionStorage.setItem("dpdp_matrix_intro_played", "true");
    } catch {
      // Ignore
    }

    // Auto-dismiss after 1.8s
    const timer = setTimeout(() => {
      dismiss();
    }, 1800);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        dismiss();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [pathname]);

  const dismiss = () => {
    setVisible(false);
    setTimeout(() => {
      setFinished(true);
    }, 450);
  };

  if (finished) return null;

  return (
    <div
      className={`brand-reveal-overlay${!visible ? " is-finished" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Brand introduction"
      onClick={dismiss}
    >
      <div className="brand-reveal-content">
        <Image
          src="/brand/logo-reversed.png"
          alt="DPDP MatriX"
          width={564}
          height={106}
          priority
          className="brand-reveal-logo"
        />
        <h1 className="brand-reveal-line">
          PRIVACY LAW,<br />
          <span>TRANSLATED INTO WORKING SYSTEMS.</span>
        </h1>
      </div>

      <button
        type="button"
        className="brand-reveal-skip"
        onClick={(e) => {
          e.stopPropagation();
          dismiss();
        }}
        aria-label="Skip introduction"
      >
        Skip intro (Esc)
      </button>
    </div>
  );
}
