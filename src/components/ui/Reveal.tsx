"use client";

import React from "react";

export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return <div className={`reveal is-revealed ${className}`.trim()}>{children}</div>;
}
