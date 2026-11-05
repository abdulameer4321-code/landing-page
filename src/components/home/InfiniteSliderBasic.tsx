"use client";

import Image from "next/image";
import { InfiniteSlider } from "@/components/core/infinite-slider";

export function InfiniteSliderBasic() {
  return (
    <div className="w-full py-3 overflow-hidden" aria-label="DPDP MatriX Tools Showcase">
      <InfiniteSlider gap={28} reverse speed={24}>
        {/* Gap Assessment */}
        <div className="flex items-center justify-center px-8 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-xs select-none min-w-[190px]">
          <Image
            src="/brand/gap-assessment-logo.png"
            alt="Gap Assessment"
            width={160}
            height={44}
            className="h-7 w-auto object-contain"
            priority
          />
        </div>

        {/* ROPAx */}
        <div className="flex items-center justify-center px-8 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-xs select-none min-w-[180px]">
          <Image
            src="/brand/ropa-generator-logo.png"
            alt="ROPAx"
            width={140}
            height={44}
            className="h-7 w-auto object-contain"
            priority
          />
        </div>

        {/* Consent Desk */}
        <div className="flex items-center justify-center px-8 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-xs select-none min-w-[190px]">
          <Image
            src="/brand/consent-desk-logo.png"
            alt="Consent Desk"
            width={160}
            height={44}
            className="h-7 w-auto object-contain"
            priority
          />
        </div>

        {/* Agent X */}
        <div className="flex items-center justify-center px-8 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-xs select-none min-w-[180px]">
          <Image
            src="/brand/agent-x-logo.png"
            alt="Agent X"
            width={130}
            height={44}
            className="h-7 w-auto object-contain"
            priority
          />
        </div>

        {/* Privacy Peek */}
        <div className="flex items-center justify-center px-8 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-xs select-none min-w-[190px]">
          <Image
            src="/brand/privacy-peek-logo.png"
            alt="Privacy Peek"
            width={160}
            height={44}
            className="h-8 w-auto object-contain"
            priority
          />
        </div>
      </InfiniteSlider>
    </div>
  );
}
