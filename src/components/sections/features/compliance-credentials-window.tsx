"use client";

import { motion } from "motion/react";
import { LuBadgeCheck } from "react-icons/lu";
import { TiltCard } from "@/components/ui/tilt-card";
import type { FeaturesComplianceCredentialsContent } from "@/types/features";

interface ComplianceCredentialsWindowProps {
  data: FeaturesComplianceCredentialsContent["previewWindow"];
}

export function ComplianceCredentialsWindow({
  data,
}: ComplianceCredentialsWindowProps) {
  return (
    <TiltCard maxTilt={1.6}>
      <div className="overflow-hidden rounded-2xl border border-slate-200/85 bg-[#F8FAFC] shadow-[0_24px_60px_-15px_rgba(15,23,42,0.12)] transition-[border-color,box-shadow] duration-500 ease-out hover:border-[#37C650]/35 hover:shadow-[0_32px_72px_-16px_rgba(55,198,80,0.18)] sm:rounded-3xl">
        {/* Top macOS Window Bar */}
        <div className="flex items-center gap-3 border-b border-slate-200/70 bg-[#F4F6F9] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200 transition-colors duration-300 hover:bg-[#37C650]/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200 transition-colors duration-300 hover:bg-[#37C650]/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200 transition-colors duration-300 hover:bg-[#37C650]/60" />
          </div>
          <span className="text-xs font-medium text-[#64748B]">
            {data.windowTitle}
          </span>
        </div>

        {/* Window Body */}
        <div className="bg-white p-5 sm:p-7">
          {/* Panel Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-[15px] font-bold tracking-tight text-[#111827] sm:text-base">
              {data.panelHeading}
            </h3>

            <span className="rounded-full border border-slate-200/90 bg-white px-3 py-1 text-[11px] font-medium text-[#64748B]">
              {data.headerPillLabel}
            </span>
          </div>

          {/* 2x2 Credential Cards Grid */}
          <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {data.cards.map((card) => (
              <motion.div
                key={card.id}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="group rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs transition-[border-color,background-color] duration-300 hover:border-[#37C650]/40 hover:bg-[#F9FDFB]"
              >
                {/* Icon + Title & Subtitle */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E8F5EC] transition-colors duration-300 group-hover:bg-[#DCFCE7]">
                    <LuBadgeCheck
                      aria-hidden="true"
                      className="h-4.5 w-4.5 text-[#37C650]"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#111827] sm:text-[13.5px]">
                      {card.title}
                    </p>
                    <p className="text-[11px] text-[#64748B]">
                      {card.subtitle}
                    </p>
                  </div>
                </div>

                {/* Valid Status Pill */}
                <div className="mt-3.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F5EC] px-2.5 py-0.5 text-[11px] font-semibold text-[#15803D]">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-[#37C650]"
                    />
                    {card.statusLabel}
                  </span>
                </div>

                {/* Issued & Expires Metadata Bars */}
                <div className="mt-3.5 space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="w-12 shrink-0 text-[11px] text-[#64748B]">
                      {card.issuedLabel}
                    </span>
                    <div
                      aria-hidden="true"
                      className="h-2 flex-1 rounded-full bg-slate-200/85"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="w-12 shrink-0 text-[11px] text-[#64748B]">
                      {card.expiresLabel}
                    </span>
                    <div
                      aria-hidden="true"
                      className="h-2 flex-1 rounded-full bg-slate-200/85"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}