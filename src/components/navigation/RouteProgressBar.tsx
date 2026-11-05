"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function RouteProgressBar() {
  const pathname = usePathname();
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(true);
    const timer = setTimeout(() => {
      setAnimating(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!animating) return null;

  return (
    <div
      className="route-nav-progress"
      role="progressbar"
      aria-label="Page transition progress"
    />
  );
}
