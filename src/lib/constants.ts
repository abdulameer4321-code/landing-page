export const TOOL_LINKS = {
  privacyPeek: "",
  consentDesk: "https://consentdesk.dpdpmatrix.in",
  ropax: "https://ropax.dpdpmatrix.in",
  gapAssessment: "https://gap.dpdpmatrix.in",
} as const;

export const PRIVACY_PEEK_LINKEDIN_URL: string = "";

export const PRIVACY_PEEK_VIDEO: {
  file: string;
  youtubeId: string;
} = {
  file: "/media/privacy-peek-walkthrough.mp4",
  youtubeId: "",
};

export const SITE = {
  name: "DPDP MatriX",
  person: "Ameer Riaz",
  founderTitle: "Privacy Professional",
  educationLine1: "BBA LL.B. · LL.M. (Data Privacy and Information Technology)",
  educationLine2: "Pursuing CIPP/E and DSCI",
  education: "BBA LL.B. · LL.M. (Data Privacy and Information Technology) · Pursuing CIPP/E and DSCI",
  location: "Bengaluru, Karnataka",
  url: "https://dpdpmatrix.in",
  brandLine: "Privacy law, translated into working systems.",
  tagline: "Working privacy tools built on Indian privacy law.",
  description:
    "A personal workshop by Ameer Riaz, a privacy professional based in Bengaluru, Karnataka. Working tools that translate privacy rules into practical systems.",
  email: "abdulameer4321@gmail.com",
  businessEmail: "ameer@dpdpmatrix.in",
  linkedin: "https://www.linkedin.com/in/ameerriaz",
  linkedinLabel: "linkedin.com/in/ameerriaz",
  footerCredit: "A personal workshop by Ameer Riaz · Privacy Professional",
  year: 2026,
} as const;

export type ToolStatus = "Live" | "Beta" | "Coming soon" | "Walkthrough only";

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  tagline: string;
  description: string;
  whoItIsFor: string;
  legalBasis: string;
  status: ToolStatus;
  statusDetail: string;
  logoUrl?: string;
  toolUrlKey: keyof typeof TOOL_LINKS;
  whatItDoesNotDo: string;
  highlights: string[];
}

export const PRODUCTS: ProductItem[] = [
  {
    id: "privacy-peek",
    name: "Privacy Peek",
    slug: "privacy-peek",
    category: "Browser Extension · DPDP Risk Summary",
    tagline: "Instant DPDP compliance analysis and privacy risk summary.",
    description:
      "My first-ever privacy engineering project. A browser extension tool that inspects websites you visit, evaluates them against key DPDP Act requirements, and generates an instant privacy risk summary directly on your device.",
    whoItIsFor: "Anyone who visits websites and wants to understand their DPDP posture and privacy risks.",
    legalBasis: "DPDP Act Section 6 (Notice requirements and transparency evaluation).",
    status: "Walkthrough only",
    statusDetail: "First-ever project · Browser extension tool",
    logoUrl: "/brand/privacy-peek-logo.png",
    toolUrlKey: "privacyPeek",
    whatItDoesNotDo:
      "Privacy Peek evaluates a website's outward DPDP compliance and gives you an instant risk summary. It does not alter web pages or access company back-end databases.",
    highlights: [
      "First-ever DPDP MatriX privacy engineering project",
      "Browser extension tool analyzing websites you visit",
      "Generates an instant, clear DPDP privacy risk summary",
      "Evaluates notice adequacy and transparency without remote logging",
    ],
  },
  {
    id: "consent-desk",
    name: "Consent Desk",
    slug: "consent-desk",
    category: "Consent Architecture & Notices",
    tagline: "Consent Desk gives users a clear choice and keeps a record of what they have picked, how it works, and what it does.",
    description:
      "A tool to create separate, clear consent notices for each purpose. It gives users a record of what they have picked and lets them withdraw their choice at any time.",
    whoItIsFor: "Teams that collect personal data and need a clean way to ask for and record user consent.",
    legalBasis: "DPDP Act Section 6 (Clear consent requests and withdrawal of consent).",
    status: "Live",
    statusDetail: "Live tool",
    logoUrl: "/brand/consent-desk-logo.png",
    toolUrlKey: "consentDesk",
    whatItDoesNotDo:
      "Consent Desk records consent decisions. It does not replace your legal advisers or decide your company privacy strategy.",
    highlights: [
      "Drafts clear notices with separate choices for each purpose",
      "Issues receipts so visitors have proof of their choices",
      "Handles withdrawal requests so data processing can stop",
    ],
  },
  {
    id: "ropa-generator",
    name: "ROPAx",
    slug: "ropa-generator",
    category: "Data Inventory & Accountability",
    tagline: "Keep a clean list of what personal data you hold and why.",
    description:
      "A tool to record data collection activities: what personal data you collect, why you collect it, who you share it with, and when you plan to delete it.",
    whoItIsFor: "Organisations that want a clear map of their data to stay accountable.",
    legalBasis: "DPDP Act Section 8 (Duties of Data Fiduciaries to maintain accurate processing records).",
    status: "Live",
    statusDetail: "Live tool",
    logoUrl: "/brand/ropa-generator-logo.png",
    toolUrlKey: "ropax",
    whatItDoesNotDo:
      "ROPAx documents what data you hold. It does not automatically delete files inside your servers.",
    highlights: [
      "Records business purposes and linked personal data items",
      "Maps third-party vendors and cloud storage locations",
      "Tracks retention periods so data is not kept forever",
    ],
  },
  {
    id: "gap-assessment",
    name: "Gap Assessment",
    slug: "gap-assessment",
    category: "Readiness & Gap Analysis",
    tagline: "Check where your systems meet basic privacy rules.",
    description:
      "A straightforward questionnaire that checks your data practices against key requirements under the DPDP Act and highlights where you need to take action.",
    whoItIsFor: "Founders, product managers, and privacy leads checking their readiness under Indian privacy rules.",
    legalBasis: "DPDP Act Section 8 and general accountability requirements.",
    status: "Beta",
    statusDetail: "Beta release",
    logoUrl: "/brand/gap-assessment-logo.png",
    toolUrlKey: "gapAssessment",
    whatItDoesNotDo:
      "This assessment gives an indicative readiness snapshot. It is not formal legal advice or a compliance certificate.",
    highlights: [
      "Reviews notices, consent choices, and grievance handling",
      "Calculates an indicative readiness score across core areas",
      "Lists practical next steps to fix missing controls",
    ],
  },
];

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Tools" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
] as const;
