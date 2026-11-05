import React from "react";

interface InfiniteSliderProps {
  items: string[];
  speedSeconds?: number;
  direction?: "left" | "right";
  ariaLabel?: string;
}

export function InfiniteSlider({
  items,
  speedSeconds = 36,
  direction = "left",
  ariaLabel = "Continuous topics",
}: InfiniteSliderProps) {
  // Duplicate array 3 times for a continuous loop without gap
  const displayItems = [...items, ...items, ...items];

  return (
    <div
      className="slider-container"
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
    >
      <div
        className="slider-track"
        style={{
          animationDuration: `${speedSeconds}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {displayItems.map((item, index) => (
          <div key={`${item}-${index}`} className="slider-item">
            <span className="slider-bullet" aria-hidden="true" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
