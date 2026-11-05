"use client";

import { useRef } from "react";
import { ScrollProgress } from "@/components/core/scroll-progress";

interface StatutoryProvision {
  section: string;
  title: string;
  rule: string;
  text: string;
  systemMapping: string;
}

const dpdpProvisions: StatutoryProvision[] = [
  {
    section: "Section 4",
    title: "Lawful Grounds for Processing",
    rule: "DPDP Act, 2023 · Section 4(1)",
    text: "Personal data may only be processed for a lawful purpose for which the Data Principal has given consent, or for certain legitimate uses recognized under Section 7 of the Act.",
    systemMapping: "Implemented in Consent Desk: Every processing activity requires an active purpose tag and verified consent or statutory ground.",
  },
  {
    section: "Section 5",
    title: "Notice Accompanying Consent Request",
    rule: "DPDP Act, 2023 · Section 5(1) & 5(2)",
    text: "Before or at the time of requesting consent, the Data Fiduciary must give an itemised notice specifying the personal data sought, the specific purpose, how the Principal may exercise their rights, and how to make a complaint to the Board.",
    systemMapping: "Implemented in Privacy Peek & Consent Desk: Evaluates whether notices are itemised, granular, and delivered before cookies or trackers fire.",
  },
  {
    section: "Section 6",
    title: "Standard of Valid Consent & Ease of Withdrawal",
    rule: "DPDP Act, 2023 · Section 6(1) & 6(4)",
    text: "Consent must be free, specific, informed, unconditional, and unambiguous, signified by a clear affirmative action. The Data Principal has the statutory right to withdraw consent with the same ease with which it was given.",
    systemMapping: "Implemented in Consent Desk: One-click verifiable withdrawal with instant receipt generation and downstream revocation signals.",
  },
  {
    section: "Section 8(1)",
    title: "Data Fiduciary Accountability & Record Integrity",
    rule: "DPDP Act, 2023 · Section 8(1)",
    text: "A Data Fiduciary is responsible for complying with the provisions of the Act irrespective of any agreement to the contrary, or whether personal data is processed by the Data Fiduciary or a Data Processor on its behalf.",
    systemMapping: "Implemented in ROPAx: Exhaustive vendor mapping, Data Processor contractual tracking, and audit-ready data inventory.",
  },
  {
    section: "Section 8(5)",
    title: "Security Safeguards & Breach Mitigation",
    rule: "DPDP Act, 2023 · Section 8(5)",
    text: "A Data Fiduciary must implement reasonable security safeguards, including technical and operational measures, to prevent personal data breach and maintain the confidentiality of records.",
    systemMapping: "Implemented in Gap Assessment: Automated evaluation of encryption standards, access logs, and incident escalation readiness.",
  },
  {
    section: "Section 8(6)",
    title: "Mandatory Personal Data Breach Reporting",
    rule: "DPDP Act, 2023 · Section 8(6)",
    text: "In the event of a personal data breach, the Data Fiduciary must give intimate notification of the breach to the Data Protection Board of India and each affected Data Principal in the prescribed form and manner.",
    systemMapping: "Implemented in Agent X & Gap Assessment: Breach severity calculator and step-by-step reporting timeline workflow.",
  },
  {
    section: "Section 8(7)",
    title: "Data Erasure on Purpose Completion",
    rule: "DPDP Act, 2023 · Section 8(7)",
    text: "A Data Fiduciary must erase personal data as soon as the purpose for which it was collected is no longer being served, or as soon as consent is withdrawn, unless retention is mandated by law.",
    systemMapping: "Implemented in ROPAx: Purpose-linked retention schedules with automated expiration warnings and disposal records.",
  },
  {
    section: "Section 9",
    title: "Processing of Children's Personal Data",
    rule: "DPDP Act, 2023 · Section 9(1) to 9(3)",
    text: "A Data Fiduciary must obtain verifiable consent from the parent or lawful guardian before processing any personal data of a child, and shall not undertake tracking, behavioural monitoring, or targeted advertising directed at children.",
    systemMapping: "Implemented in Privacy Peek & Consent Desk: Flags trackers and behavioural scripts on child-directed interfaces.",
  },
  {
    section: "Section 12",
    title: "Right to Correction and Erasure of Personal Data",
    rule: "DPDP Act, 2023 · Section 12",
    text: "A Data Principal has the right to correction of inaccurate personal data, completion of incomplete data, updating of records, and erasure of personal data that is no longer necessary.",
    systemMapping: "Implemented in Consent Desk: Self-service portal for principals to update preferences or demand purpose-bound deletion.",
  },
  {
    section: "Section 13",
    title: "Grievance Redressal Mechanism",
    rule: "DPDP Act, 2023 · Section 13",
    text: "A Data Principal has the right to readily available grievance redressal provided by the Data Fiduciary or Consent Manager regarding performance of obligations under the Act.",
    systemMapping: "Implemented in Consent Desk & DPDP MatriX: Grievance Officer routing, ticket tracking, and statutory resolution counters.",
  },
];

export function ScrollProgressBasic1() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="scroll-progress-card relative h-[380px] overflow-y-auto px-6 sm:px-8 pt-14 pb-16 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm"
      tabIndex={0}
      role="region"
      aria-label="DPDP Act Statutory Architecture Reader"
    >
      {/* Top progress bar with blue tracking strip */}
      <div className="pointer-events-none sticky top-0 left-0 -mt-14 pt-0 w-full z-20">
        <div className="relative h-1.5 w-full bg-[#E6F4FE] dark:bg-[#111927] rounded-t-xl overflow-hidden">
          <ScrollProgress
            containerRef={containerRef}
            className="absolute top-0 left-0 h-full bg-[#0090FF]"
          />
        </div>
        {/* Top subtle blur gradient */}
        <div className="h-6 w-full bg-gradient-to-b from-[var(--surface)] to-transparent pointer-events-none" />
      </div>

      {/* Bottom fade mask */}
      <div className="pointer-events-none sticky bottom-0 left-0 -mb-16 h-14 w-full bg-gradient-to-t from-[var(--surface)] to-transparent z-10" />

      {/* Content items */}
      <div className="space-y-6 pt-2">
        {dpdpProvisions.map((item) => (
          <div
            key={item.section}
            className="pb-5 border-b border-[var(--border)] last:border-b-0"
          >
            <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
              <span className="font-mono text-xs uppercase tracking-wider font-semibold text-[var(--brand-orange-deep)] bg-[var(--orange-tint)] px-2.5 py-1 rounded">
                {item.section}
              </span>
              <span className="font-mono text-xs text-[var(--ink-muted)]">
                {item.rule}
              </span>
            </div>

            <h4 className="text-base font-semibold text-[var(--ink)] mb-1.5">
              {item.title}
            </h4>

            <p className="text-sm font-mono text-[var(--ink-secondary)] leading-relaxed mb-2.5">
              {item.text}
            </p>

            <div className="text-xs text-[var(--brand-orange-deep)] bg-[var(--surface-alt)] p-2.5 rounded-lg border border-[var(--border)] font-sans">
              <strong className="font-semibold text-[var(--ink)]">System Translation: </strong>
              {item.systemMapping}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
