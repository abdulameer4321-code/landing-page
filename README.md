# DPDP MatriX — Website

Personal workshop and portfolio for Ameer Riaz, Data Privacy Professional (`dpdpmatrix.in`).
Built with Next.js 15, React 19, TypeScript, and modern responsive CSS.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (optional, for live Agent X LLM answers)
cp .env.example .env.local

# 3. Run development server
npm run dev # http://localhost:3000 (or PORT=3002 npm run dev)

# 4. Check production build
npm run build && npm start
```

## Structure & Architecture

- **Identity**: Ameer Riaz · Data Privacy Professional · Bengaluru.
- **Education line**: BBA LL.B. · LL.M. (Data Privacy and Information Technology) · Pursuing CIPP/E and DSCI.
- **Pages**:
  - `/` — Homepage: Headline, intro, four tool cards, "How I build" (3 steps), question strip, about me strip, contact CTA.
  - `/products` — Tools index: Clean overview of the four privacy tools.
  - `/products/privacy-peek` — Privacy Peek: Native 16:9 walkthrough video player, LinkedIn post link, and "Walkthrough only" notice. No public access or mock scanner.
  - `/products/consent-desk` — Consent Desk: Purpose-specific notices, receipts, withdrawal flows, and working example.
  - `/products/ropa-generator` — ROPAx (ROPA Generator): Records of processing activities inventory, table generator, and export example.
  - `/products/gap-assessment` — Gap Assessment: 5-question readiness review, score indicator, and external link to live tool (`cloude5.tech`).
  - `/about` — About Ameer Riaz, his background, education, and his transparent note on directing legal logic while AI assists with coding.
  - `/contact` — Direct contact via email and LinkedIn.
  - `/privacy-policy` — Complete privacy notice covering website storage and the Agent X AI assistant.
  - `/terms` — Terms and conditions governing platform usage.
- **Agent X**: Accessible slide-in chat drawer on desktop / sheet on mobile, accessible from the header, the bottom dock, and homepage question pills. Runs via server route `/api/agent-x`.
- **Navigation Dock**: Bottom navigation bar for rapid page switching, theme toggling, and opening Agent X.
- **Cookie & Storage Preferences**: Accessible banner and modal respecting user storage choices.

## Where to Edit

- Tool links, LinkedIn URL, video settings: `src/lib/constants.ts`
- Editorial copy (Home, About, Contact, Terms, Tools): `src/lib/content.ts`
- Privacy Policy: `src/lib/policy.ts`
- Agent X prompt & guardrails: `src/lib/agent-x-prompt.ts`
- Colors, typography, spacing, motion: `src/app/globals.css`
- Founder portrait: `public/images/ameer-riaz.jpg`
- Privacy Peek video: `public/media/privacy-peek-walkthrough.mp4`
