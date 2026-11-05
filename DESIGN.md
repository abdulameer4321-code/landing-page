# DPDP MatriX — Design System & Standards

## 1. Visual Language & Principles
- **Aesthetic**: Calm, precise, credible privacy technology workshop.
- **Tone**: Plain, direct, human. No marketing buzzwords, no invented metrics.
- **Default Mode**: Light mode by default for all visitors; persistent dark mode toggle available.
- **Typography**: Outfit Variable (self-hosted). Display weights 300/400/500/600.
  - Scale: Body 18px (laptop) / 17px (tablet) / 16px (mobile). No text smaller than 14px.
  - Headings: H1 clamp(36px, 5vw, 68px). Line lengths capped at 65ch for comfortable reading.
- **Color Palette**:
  - Ink (primary text): `#192634` (light) / `#f3f6f9` (dark)
  - Canvas (background): `#f7f7f2` (light) / `#0e171f` (dark)
  - Surface (cards): `#ffffff` (light) / `#15222e` (dark)
  - Brand Orange: `#ec703c` / `#d95822` (decorative accents, interactive highlights)
  - Orange Tint: `rgba(236, 112, 60, 0.08)`
  - Status Success: `#1b5e3c` (light) / `#34d399` (dark)
  - Status Warning: `#9a4305` (light) / `#fbbf24` (dark)
- **Controls & Accessibility**:
  - Interactive targets at least 44x44px.
  - Clear `:focus-visible` outlines using brand orange with 2px offset.
  - Non-overlapping layout: Bottom dock and cookie preference banner sit cleanly without colliding.
- **Motion**:
  - Single refined easing curve: `cubic-bezier(0.22, 1, 0.36, 1)`.
  - Respects `@media (prefers-reduced-motion: reduce)`.
