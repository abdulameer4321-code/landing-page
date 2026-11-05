"use client";

import React, { createContext, useContext, useRef, useState } from "react";

interface DockContextType {
  mouseX: number | null;
  setMouseX: (val: number | null) => void;
}

const DockContext = createContext<DockContextType>({
  mouseX: null,
  setMouseX: () => {},
});

export interface DockProps {
  children: React.ReactNode;
  className?: string;
  magnification?: number;
  distance?: number;
}

export function Dock({
  children,
  className = "",
}: DockProps) {
  const [mouseX, setMouseX] = useState<number | null>(null);

  return (
    <DockContext.Provider value={{ mouseX, setMouseX }}>
      <nav
        aria-label="Quick dock navigation"
        className={`apple-dock ${className}`}
        onMouseMove={(e) => setMouseX(e.clientX)}
        onMouseLeave={() => setMouseX(null)}
      >
        {children}
      </nav>
    </DockContext.Provider>
  );
}

export interface DockItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  title?: string;
}

export function DockItem({
  children,
  className = "",
  onClick,
  href,
  target,
  rel,
  title,
}: DockItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const { mouseX } = useContext(DockContext);
  const [isHovered, setIsHovered] = useState(false);

  let scale = 1;
  if (mouseX !== null && itemRef.current) {
    const rect = itemRef.current.getBoundingClientRect();
    const itemCenter = rect.left + rect.width / 2;
    const distance = Math.abs(mouseX - itemCenter);
    const maxDistance = 120;
    if (distance < maxDistance) {
      scale = 1 + (0.35 * (1 - distance / maxDistance));
    }
  }

  const content = (
    <div
      ref={itemRef}
      className={`dock-item-wrapper ${isHovered ? "is-hovered" : ""} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: `scale(${scale}) translateY(${scale > 1 ? -(scale - 1) * 16 : 0}px)`,
        transition: "transform 0.16s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="dock-item-link"
        onClick={onClick}
        target={target}
        rel={rel}
        aria-label={title}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className="dock-item-button"
      onClick={onClick}
      aria-label={title}
    >
      {content}
    </button>
  );
}

export interface DockIconProps {
  children: React.ReactNode;
  className?: string;
}

export function DockIcon({ children, className = "" }: DockIconProps) {
  return (
    <div className={`dock-icon-inner ${className}`} aria-hidden="true">
      {children}
    </div>
  );
}

export interface DockLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function DockLabel({ children, className = "" }: DockLabelProps) {
  return (
    <div className={`dock-label-tooltip ${className}`} role="tooltip">
      {children}
    </div>
  );
}
