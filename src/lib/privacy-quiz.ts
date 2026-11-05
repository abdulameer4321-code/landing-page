// DRAFT question bank for the DPDP MatriX privacy knowledge game.
// Every question must be checked against the DPDP Act 2023 and the DPDP Rules before launch.
// "answer" is the zero-based index of the correct option. For type "all", the last option is "All of the above".

export type QuizQuestion = {
  id: string;
  topic: string;
  type: "mcq" | "yesno" | "all";
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  toolSlug?: string;
};

export const QUIZ_BANK: QuizQuestion[] = [
  // ───────── Basics ─────────
  {
    id: "q01", topic: "Basics", type: "mcq",
    question: "Who is a “Data Principal” under the DPDP Act?",
    options: ["The company that collects the data", "The person the personal data is about", "The government regulator"],
    answer: 1,
    explanation: "The Data Principal is the individual whose personal data it is.",
  },
  {
    id: "q02", topic: "Basics", type: "mcq",
    question: "A payroll company handles employee data only on behalf of another company. What is it called?",
    options: ["Data Principal", "Data Processor", "Data Protection Board"],
    answer: 1,
    explanation: "A Data Processor processes data on behalf of a Data Fiduciary.",
    toolSlug: "ropa-generator",
  },
  {
    id: "q03", topic: "Basics", type: "mcq",
    question: "If a company hires a processor to handle your data, who stays responsible for protecting it?",
    options: ["Only the processor", "The company that decides why the data is used", "Nobody"],
    answer: 1,
    explanation: "The company that decides why and how the data is used (the Data Fiduciary) stays responsible, even when it hires a processor.",
    toolSlug: "ropa-generator",
  },
  {
    id: "q04", topic: "Basics", type: "mcq",
    question: "Who decides complaints and can impose penalties under the Act?",
    options: ["The local police", "The Data Protection Board of India", "The company's own lawyers"],
    answer: 1,
    explanation: "The Data Protection Board of India handles complaints and can order penalties under the Act.",
  },
  {
    id: "q05", topic: "Basics", type: "mcq",
    question: "What is a Consent Manager?",
    options: [
      "A person who writes privacy policies",
      "A registered service that lets you give, manage, review and withdraw consent in one place",
      "A government office that fines companies",
    ],
    answer: 1,
    explanation: "A Consent Manager is registered with the Board and acts as a single point for a person to manage their consent.",
    toolSlug: "consent-desk",
  },

  // ───────── Scope ─────────
  {
    id: "q06", topic: "Scope", type: "mcq",
    question: "Which personal data does the DPDP Act cover?",
    options: [
      "Only data typed into online forms",
      "Personal data in digital form, including paper records that are later digitised",
      "Only data held by the government",
    ],
    answer: 1,
    explanation: "The Act covers digital personal data, and non-digital personal data that is later digitised.",
  },
  {
    id: "q07", topic: "Scope", type: "yesno",
    question: "Does the Act cover personal data that a person keeps only for their own personal or household use?",
    options: ["Yes", "No"],
    answer: 1,
    explanation: "Personal data processed by an individual for a personal or domestic purpose is not covered.",
  },
  {
    id: "q08", topic: "Scope", type: "yesno",
    question: "A company outside India offers its app to people in India. Can the DPDP Act apply to it?",
    options: ["Yes", "No"],
    answer: 0,
    explanation: "The Act can apply outside India when data is processed to offer goods or services to people in India.",
  },

  // ───────── Consent ─────────
  {
    id: "q09", topic: "Consent", type: "mcq",
    question: "Which of these is valid consent?",
    options: ["A box that is already ticked", "A clear tap or tick by the person, after reading the notice", "Staying silent after seeing the notice"],
    answer: 1,
    explanation: "Consent needs a clear action by the person. Silence or pre-ticked boxes do not count.",
    toolSlug: "consent-desk",
  },
  {
    id: "q10", topic: "Consent", type: "mcq",
    question: "Withdrawing your consent should be:",
    options: ["As easy as giving it", "Possible only by sending a letter", "Not allowed once you have given it"],
    answer: 0,
    explanation: "The Act says it should be as easy to withdraw consent as it was to give it.",
    toolSlug: "consent-desk",
  },
  {
    id: "q11", topic: "Consent", type: "mcq",
    question: "A shopping app says: “Agree to marketing messages, or you cannot buy.” Is that a fair way to get consent?",
    options: ["Yes, it is the company's choice", "No, marketing is not needed to complete the purchase", "Yes, if it is written in the terms"],
    answer: 1,
    explanation: "Consent should be limited to what the stated purpose needs. Marketing is not needed to sell you something.",
    toolSlug: "consent-desk",
  },
  {
    id: "q12", topic: "Consent", type: "mcq",
    question: "A consent request must be written in:",
    options: ["Legal language only", "Clear and simple language", "Any language, there is no rule"],
    answer: 1,
    explanation: "A request for consent must use clear and plain language.",
    toolSlug: "consent-desk",
  },
  {
    id: "q13", topic: "Consent", type: "yesno",
    question: "You gave your phone number for a delivery. Can the company use it to send you unrelated advertisements without asking you again?",
    options: ["Yes", "No"],
    answer: 1,
    explanation: "Consent is given for a specific purpose. A new, unrelated purpose needs fresh consent.",
    toolSlug: "consent-desk",
  },
  {
    id: "q14", topic: "Consent", type: "yesno",
    question: "If you withdraw your consent, must the company stop processing your data for that purpose (unless a law allows it to continue)?",
    options: ["Yes", "No"],
    answer: 0,
    explanation: "After withdrawal, the company must stop processing within a reasonable time, unless the law permits or requires it to continue.",
    toolSlug: "consent-desk",
  },
  {
    id: "q15", topic: "Consent", type: "mcq",
    question: "Can a company ever use personal data without asking for consent?",
    options: [
      "Never",
      "Yes, but only in limited cases listed in the Act, such as a medical emergency",
      "Yes, whenever it thinks the data would be useful",
    ],
    answer: 1,
    explanation: "The Act lists a small number of “legitimate uses” where consent is not needed. They are limited, not a free pass.",
  },
  {
    id: "q16", topic: "Consent", type: "yesno",
    question: "You give your phone number to a restaurant to book a table. Can the restaurant use it to confirm that booking?",
    options: ["Yes", "No"],
    answer: 0,
    explanation: "When you voluntarily share data for a clear purpose, using it for that purpose is a permitted use.",
  },

  // ───────── Notice ─────────
  {
    id: "q17", topic: "Notice", type: "mcq",
    question: "When should a company give you its privacy notice?",
    options: ["Before or when it asks for your consent", "Within 30 days after collecting your data", "Only if you ask for it"],
    answer: 0,
    explanation: "The notice should come with the request for consent, so you know what you are agreeing to.",
    toolSlug: "consent-desk",
  },
  {
    id: "q18", topic: "Notice", type: "all",
    question: "What should a privacy notice tell you?",
    options: [
      "What personal data is collected and why",
      "How to use your rights and make a complaint",
      "How to complain to the Data Protection Board",
      "All of the above",
    ],
    answer: 3,
    explanation: "A notice should cover what data is collected and why, how to use your rights, and how to complain to the Board.",
    toolSlug: "consent-desk",
  },
  {
    id: "q19", topic: "Notice", type: "mcq",
    question: "In which languages can you ask for a privacy notice?",
    options: ["Only English", "English or any language in the Eighth Schedule of the Constitution", "Only Hindi"],
    answer: 1,
    explanation: "You can ask for the notice in English or any of the languages listed in the Eighth Schedule.",
    toolSlug: "consent-desk",
  },

  // ───────── Rights ─────────
  {
    id: "q20", topic: "Rights", type: "mcq",
    question: "You find that your phone number in a company's records is wrong. What can you do?",
    options: ["Nothing, only a court can change it", "Ask the company to correct it", "Wait for it to be deleted after a year"],
    answer: 1,
    explanation: "A Data Principal has the right to ask for correction of their personal data.",
  },
  {
    id: "q21", topic: "Rights", type: "all",
    question: "Which of these is a right of a Data Principal?",
    options: [
      "Getting a summary of the data a company holds about you",
      "Asking for your data to be corrected or erased",
      "Naming someone to use your rights if you die or cannot act",
      "All of the above",
    ],
    answer: 3,
    explanation: "These are all rights under the Act: access to information, correction and erasure, and nominating another person.",
  },
  {
    id: "q22", topic: "Rights", type: "mcq",
    question: "You have a complaint about how a company uses your data. What should you do first?",
    options: ["Go straight to the Data Protection Board", "Use the company's own grievance process", "Post about it online"],
    answer: 1,
    explanation: "You should first use the company's grievance process. The Board comes after that.",
  },
  {
    id: "q23", topic: "Rights", type: "yesno",
    question: "Can you name another person to use your data rights if you die or become unable to act?",
    options: ["Yes", "No"],
    answer: 0,
    explanation: "The Act gives a right to nominate someone to exercise your rights in those cases.",
  },
  {
    id: "q24", topic: "Duties", type: "yesno",
    question: "Do Data Principals have duties too, such as not making false or frivolous complaints?",
    options: ["Yes", "No"],
    answer: 0,
    explanation: "The Act lists duties of Data Principals, including not filing false or frivolous complaints.",
  },

  // ───────── Duties of companies ─────────
  {
    id: "q25", topic: "Duties", type: "mcq",
    question: "A customer closes their account. The company no longer needs the data and no law requires it to keep it. What should it do?",
    options: ["Erase it", "Keep it forever", "Sell it"],
    answer: 0,
    explanation: "Data should be erased when the purpose is finished, unless the law requires it to be kept.",
    toolSlug: "ropa-generator",
  },
  {
    id: "q26", topic: "Security", type: "mcq",
    question: "Which of these is a company's duty under the Act?",
    options: ["Only publish an annual report", "Take reasonable security steps to prevent a data breach", "Do nothing until a breach happens"],
    answer: 1,
    explanation: "A company must take reasonable security safeguards to prevent personal data breaches.",
  },
  {
    id: "q27", topic: "Duties", type: "yesno",
    question: "Must a company publish contact details of someone who can answer your questions about your data?",
    options: ["Yes", "No"],
    answer: 0,
    explanation: "A company must publish the business contact details of a Data Protection Officer or another person who can answer questions.",
  },
  {
    id: "q28", topic: "Duties", type: "yesno",
    question: "If a company uses your data to make decisions about you, or shares it with others, must it make reasonable efforts to keep it accurate?",
    options: ["Yes", "No"],
    answer: 0,
    explanation: "The Act requires reasonable efforts to keep such data complete, accurate and consistent.",
  },
  {
    id: "q29", topic: "Duties", type: "all",
    question: "What extra duties can a Significant Data Fiduciary have?",
    options: [
      "Appoint a Data Protection Officer based in India",
      "Appoint an independent data auditor",
      "Carry out impact assessments",
      "All of the above",
    ],
    answer: 3,
    explanation: "A Significant Data Fiduciary can be required to do all three.",
  },

  // ───────── Children ─────────
  {
    id: "q30", topic: "Children", type: "mcq",
    question: "A person under 18 wants to sign up for an app. What does the company need?",
    options: ["Nothing, if the child ticks the box", "Consent from a friend", "Verifiable consent from the parent or guardian"],
    answer: 2,
    explanation: "For children, the company must get verifiable consent from a parent or lawful guardian.",
    toolSlug: "consent-desk",
  },
  {
    id: "q31", topic: "Children", type: "yesno",
    question: "Can a company show targeted advertisements to a child?",
    options: ["Yes", "No"],
    answer: 1,
    explanation: "The Act does not allow tracking, behavioural monitoring or targeted advertising directed at children.",
    toolSlug: "consent-desk",
  },

  // ───────── Breach & penalties ─────────
  {
    id: "q32", topic: "Breach", type: "mcq",
    question: "After a data breach, who must a company inform?",
    options: ["No one, if it fixes the problem quickly", "The Data Protection Board and the affected people", "Only its own lawyers"],
    answer: 1,
    explanation: "A company must report a personal data breach to the Board and to each affected person.",
  },
  {
    id: "q33", topic: "Penalties", type: "mcq",
    question: "What is the highest penalty set in the DPDP Act?",
    options: ["Up to ₹10,000", "Up to ₹5 lakh", "Up to ₹250 crore"],
    answer: 2,
    explanation: "The highest penalty in the Act is up to ₹250 crore, for failing to keep reasonable security safeguards.",
  },
  {
    id: "q34", topic: "Penalties", type: "mcq",
    question: "Failing to tell the Board and affected people about a data breach can lead to a penalty of up to:",
    options: ["₹10,000", "₹5 lakh", "₹200 crore"],
    answer: 2,
    explanation: "Failing to give the required breach notice can attract a penalty of up to ₹200 crore.",
  },

  // ───────── Transfers ─────────
  {
    id: "q35", topic: "Transfers", type: "mcq",
    question: "Can personal data be sent outside India under the Act?",
    options: ["Never", "Yes, except to countries the government restricts", "Yes, to any country with no conditions at all"],
    answer: 1,
    explanation: "Transfers are allowed, except to countries the Central Government restricts by notification.",
  },
];
