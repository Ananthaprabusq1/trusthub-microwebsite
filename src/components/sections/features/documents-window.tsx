"use client";

import { motion } from "motion/react";
import { LuBadgeCheck, LuFileText, LuFolder } from "react-icons/lu";
import { TiltCard } from "@/components/ui/tilt-card";
import type { FeatureDocIcon, FeaturesHeroContent } from "@/types/features";

interface DocumentsWindowProps {
  data: FeaturesHeroContent["documentsPanel"];
}

function DocRowIcon({ type }: { type: FeatureDocIcon }) {
  const iconClass = "h-4.5 w-4.5 text-[#37C650]";
  if (type === "folder") return <LuFolder aria-hidden="true" className={iconClass} />;
  if (type === "certification") {
    return <LuBadgeCheck aria-hidden="true" className={iconClass} />;
  }
  return <LuFileText aria-hidden="true" className={iconClass} />;
}

export function DocumentsWindow({ data }: DocumentsWindowProps) {
  return (
    <TiltCard maxTilt={1.6}>
      <div className="overflow-hidden rounded-2xl border border-slate-200/85 bg-white shadow-[0_24px_60px_-15px_rgba(15,23,42,0.12)] transition-[border-color,box-shadow] duration-500 ease-out hover:border-[#37C650]/35 hover:shadow-[0_32px_72px_-16px_rgba(55,198,80,0.18)] sm:rounded-3xl">
        {/* Top macOS Window Bar */}
        <div className="flex items-center gap-3 border-b border-slate-100 bg-[#FAFBFB] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200 transition-colors duration-300 hover:bg-[#37C650]/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200 transition-colors duration-300 hover:bg-[#37C650]/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200 transition-colors duration-300 hover:bg-[#37C650]/60" />
          </div>
          <span className="text-xs font-medium text-[#64748B]">
            {data.windowTitle}
          </span>
        </div>

        {/* Window Content */}
        <div className="p-4 sm:p-6">
          {/* Header + Upload Outlined Button */}
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-bold text-[#111827] sm:text-lg">
              {data.panelHeading}
            </h2>
            <span className="inline-flex items-center rounded-xl border border-[#111827]/65 bg-white px-4 py-1.5 text-xs font-semibold text-[#111827] transition-colors duration-200 hover:bg-slate-50">
              {data.uploadLabel}
            </span>
          </div>

          {/* Document Registry Rows */}
          <div className="mt-4 space-y-2.5">
            {data.rows.map((row) => {
              const isValid = row.statusTone === "valid";

              return (
                <motion.div
                  key={row.id}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white px-3.5 py-3 shadow-2xs transition-[border-color,background-color] duration-300 hover:border-[#37C650]/35 hover:bg-[#F9FDFB] sm:px-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E8F5EC]">
                      <DocRowIcon type={row.icon} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#111827] sm:text-sm">
                        {row.title}
                      </p>
                      <p className="text-[11px] text-[#64748B]">
                        {row.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Status + Version Badges */}
                  <div className="flex shrink-0 items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        isValid
                          ? "bg-[#E8F5EC] text-[#15803D]"
                          : "bg-slate-100 text-[#475569]"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 rounded-full ${
                          isValid ? "bg-[#37C650]" : "bg-slate-400"
                        }`}
                      />
                      {row.statusLabel}
                    </span>

                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-[#64748B]">
                      {row.version}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}