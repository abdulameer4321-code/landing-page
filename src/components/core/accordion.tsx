"use client";

import React, { createContext, useContext, useState, useId } from "react";

interface AccordionContextType {
  expandedValue: string | null;
  toggleItem: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

interface AccordionItemContextType {
  value: string;
  isExpanded: boolean;
  triggerId: string;
  contentId: string;
}

const AccordionItemContext = createContext<AccordionItemContextType | null>(null);

export interface AccordionProps {
  children: React.ReactNode;
  className?: string;
  defaultValue?: string;
}

export function Accordion({ children, className = "", defaultValue }: AccordionProps) {
  const [expandedValue, setExpandedValue] = useState<string | null>(defaultValue ?? null);

  const toggleItem = (value: string) => {
    setExpandedValue((prev) => (prev === value ? null : value));
  };

  return (
    <AccordionContext.Provider value={{ expandedValue, toggleItem }}>
      <div className={`accordion-root ${className}`}>{children}</div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function AccordionItem({ value, children, className = "" }: AccordionItemProps) {
  const context = useContext(AccordionContext);
  const id = useId();
  const triggerId = `accordion-trigger-${id}`;
  const contentId = `accordion-content-${id}`;

  const isExpanded = context?.expandedValue === value;

  return (
    <AccordionItemContext.Provider value={{ value, isExpanded, triggerId, contentId }}>
      <div
        className={`accordion-item ${isExpanded ? "is-expanded" : ""} ${className}`}
        data-state={isExpanded ? "open" : "closed"}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export function AccordionTrigger({ children, className = "" }: AccordionTriggerProps) {
  const accordionContext = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);

  if (!accordionContext || !itemContext) {
    throw new Error("AccordionTrigger must be used within AccordionItem and Accordion");
  }

  const { isExpanded, value, triggerId, contentId } = itemContext;

  return (
    <button
      id={triggerId}
      type="button"
      className={`accordion-trigger ${className}`}
      aria-expanded={isExpanded}
      aria-controls={contentId}
      onClick={() => accordionContext.toggleItem(value)}
    >
      <span className="accordion-trigger__content">{children}</span>
      <span className="accordion-trigger__icon" aria-hidden="true">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    </button>
  );
}

export interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

export function AccordionContent({ children, className = "" }: AccordionContentProps) {
  const itemContext = useContext(AccordionItemContext);

  if (!itemContext) {
    throw new Error("AccordionContent must be used within AccordionItem");
  }

  const { isExpanded, triggerId, contentId } = itemContext;

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      className={`accordion-content-wrapper ${className}`}
      style={{
        display: "grid",
        gridTemplateRows: isExpanded ? "1fr" : "0fr",
        transition: "grid-template-rows 0.32s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.28s ease",
        opacity: isExpanded ? 1 : 0,
      }}
    >
      <div style={{ overflow: "hidden" }}>
        <div className="accordion-content-inner">{children}</div>
      </div>
    </div>
  );
}
