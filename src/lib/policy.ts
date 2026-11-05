export type Item = { lead?: string; text: string };
export type Block = { p: string } | { ul: Item[] };
export type PolicySection = { id: string; title: string; blocks: Block[] };

export const policyMeta = {
  title: "Privacy Policy",
  version: "Version 2.0",
  effective: "November 5, 2026",
  reviewed: "November 5, 2026",
};

export const policySections: PolicySection[] = [
  {
    id: "introduction",
    title: "1. Introduction and Scope",
    blocks: [
      {
        p: "DPDP MatriX is a personal privacy workshop created by Ameer Riaz, a data privacy professional based in Bengaluru. This site hosts working software tools—Privacy Peek, Gap Assessment, ROPAx, and Consent Desk—built around the requirements of India’s Digital Personal Data Protection Act, 2023 (DPDP Act).",
      },
      {
        p: "This Privacy Policy explains how information is handled when you visit this website (dpdpmatrix.in) and when you use the public tools hosted here.",
      },
    ],
  },
  {
    id: "definitions",
    title: "2. Definitions & Key Terms",
    blocks: [
      {
        p: "Terms used in this policy carry the definitions set forth under Section 2 of the DPDP Act, 2023:",
      },
      {
        ul: [
          { lead: "Data Principal", text: "The individual person to whom the personal data relates." },
          { lead: "Data Fiduciary", text: "The entity (here, Ameer Riaz / DPDP MatriX) that decides why and how personal data is processed." },
          { lead: "Personal Data", text: "Any data about an individual who is identifiable by or in relation to such data." },
        ],
      },
    ],
  },
  {
    id: "data-we-collect",
    title: "3. Information Handled on this Website",
    blocks: [
      {
        p: "This website collects minimal information necessary for operation:",
      },
      {
        ul: [
          {
            lead: "Direct Messages",
            text: "When you send an email or connect on LinkedIn, I receive your contact details and message contents to reply to you.",
          },
          {
            lead: "Strictly Necessary Local Storage",
            text: "Your browser saves simple preference keys locally: 'dpdp_matrix_theme' (to remember light or dark theme) and 'dpdp_matrix_consent_v1' (to remember your cookie preference). These remain on your device and are not sent to any tracking service.",
          },
          {
            lead: "Optional Telemetry",
            text: "Only if you explicitly choose to allow optional performance telemetry in your preferences, basic page interaction counts are collected to help improve documentation. This remains blocked by default until you opt in.",
          },
        ],
      },
    ],
  },
  {
    id: "cookie-preferences",
    title: "4. Cookie & Storage Preferences",
    blocks: [
      {
        p: "Under Indian privacy rules, consent must be clear and given for specific purposes. This website distinguishes strictly necessary storage from optional categories. You can change your preferences at any time using the link in the footer.",
      },
      {
        p: "The privacy quiz remembers which question numbers you have seen, on your own device only, so that questions do not repeat. This is never sent to me. If you download a result card from the privacy quiz, the name you type is used only to create the PDF in your browser. It is never sent to me or stored.",
      },
    ],
  },
  {
    id: "agent-x-ai-service",
    title: "5. Agent X AI Assistant Notice",
    blocks: [
      {
        p: "When you ask a question using Agent X, your message is sent to an external AI model service to generate an answer.",
      },
      {
        p: "Please do not enter personal details, confidential information, or passwords into the assistant. Conversations and questions submitted to Agent X are not stored by this website.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "6. Your Rights Under the DPDP Act",
    blocks: [
      {
        p: "Under the DPDP Act, 2023, you have clear rights regarding your personal data:",
      },
      {
        ul: [
          { lead: "Right to Access (Section 11)", text: "Ask for a summary of any personal data held about you." },
          { lead: "Right to Correction and Erasure (Section 12)", text: "Ask to correct inaccurate details or delete data that is no longer needed." },
          { lead: "Right of Grievance Redressal (Section 13)", text: "Register an inquiry or complaint directly with me." },
          { lead: "Right to Withdraw Consent", text: "Change or withdraw your consent at any time." },
        ],
      },
    ],
  },
  {
    id: "grievance-officer",
    title: "7. Contact & Grievance Information",
    blocks: [
      {
        p: "For any privacy questions, rights requests, or feedback, you can contact me directly:",
      },
      {
        ul: [
          { lead: "Contact Person", text: "Ameer Riaz, Privacy Professional (Grievance Officer)" },
          { lead: "Email", text: "abdulameer4321@gmail.com / ameer@dpdpmatrix.in" },
          { lead: "Location", text: "Bengaluru, Karnataka, India" },
        ],
      },
    ],
  },
  {
    id: "version-history",
    title: "8. Policy Version History",
    blocks: [
      {
        p: "This policy is reviewed periodically to reflect updates to these tools and applicable DPDP rules.",
      },
    ],
  },
];

export const policyVersions = [
  { version: "Version 2.0", date: "November 5, 2026", approvedBy: "Ameer Riaz, Privacy Professional" },
  { version: "Version 1.0", date: "November 1, 2026", approvedBy: "Ameer Riaz, Privacy Professional" },
];
