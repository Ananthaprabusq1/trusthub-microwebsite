"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { LuBadgeCheck, LuFileText, LuFolder } from "react-icons/lu";
import { TiltCard } from "@/components/ui/tilt-card";
import type {
  DocumentAccessMode,
  FeatureDocIcon,
  FeaturesHeroContent,
} from "@/types/features";

interface AccessGovernanceWindowProps {
  data: FeaturesHeroContent["accessGovernance"];
}

function DocRowIcon({ type }: { type: FeatureDocIcon }) {
  const iconClass = "h-4.5 w-4.5 text-[#37C650]";
  if (type === "folder") return <LuFolder aria-hidden="true" className={iconClass} />;
  if (type === "certification") {
    return <LuBadgeCheck aria-hidden="true" className={iconClass} />;
  }
  return <LuFileText aria-hidden="true" className={iconClass} />;
}

export function AccessGovernanceWindow({ data }: AccessGovernanceWindowProps) {
  const [modes, setModes] = useState<Record<string, DocumentAccessMode>>(() =>
    Object.fromEntries(
      data.accessRows.map((row) => [row.id, row.defaultMode])
    )
  );
  const [requestDecision, setRequestDecision] = useState<
    "pending" | "approved" | "rejected"
  >("pending");

  const handleToggleMode = (id: string, mode: DocumentAccessMode) => {
    setModes((prev) => ({ ...prev, [id]: mode }));
  };

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
          {/* Document Access Section */}
          <h2 className="text-sm font-bold text-[#111827] sm:text-base">
            {data.accessSectionTitle}
          </h2>

          <div className="mt-3.5 space-y-2.5">
            {data.accessRows.map((row) => {
              const currentMode = modes[row.id] ?? row.defaultMode;

              return (
                <motion.div
                  key={row.id}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white px-3.5 py-3 shadow-2xs transition-[border-color,background-color] duration-300 hover:border-[#37C650]/35 hover:bg-[#F9FDFB] sm:px-4"
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

                  {/* Public / Restricted Segmented Pill */}
                  <div
                    role="group"
                    aria-label={`${row.title} access visibility`}
                    className="inline-flex items-center rounded-full border border-slate-200/80 bg-[#F8FAFC] p-0.5"
                  >
                    <button
                      type="button"
                      aria-pressed={currentMode === "public"}
                      onClick={() => handleToggleMode(row.id, "public")}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all duration-200 ${
                        currentMode === "public"
                          ? "bg-[#18181B] text-white shadow-2xs"
                          : "text-[#64748B] hover:text-[#111827]"
                      }`}
                    >
                      Public
                    </button>
                    <button
                      type="button"
                      aria-pressed={currentMode === "restricted"}
                      onClick={() => handleToggleMode(row.id, "restricted")}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all duration-200 ${
                        currentMode === "restricted"
                          ? "bg-[#18181B] text-white shadow-2xs"
                          : "text-[#64748B] hover:text-[#111827]"
                      }`}
                    >
                      Restricted
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Access Requests Section */}
          <h3 className="mt-5 text-sm font-bold text-[#111827] sm:text-base">
            {data.requestsSectionTitle}
          </h3>

          <div className="mt-3 rounded-xl border border-slate-100 bg-white px-3.5 py-3.5 shadow-2xs sm:px-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-9 w-9 shrink-0 rounded-full bg-[#DCF3E3]"
                />
                <div>
                  <p className="text-xs font-semibold text-[#111827] sm:text-sm">
                    {data.requestCard.title}
                  </p>
                  <p className="text-[11px] text-[#64748B]">
                    {data.requestCard.subtitle}
                  </p>
                </div>
              </div>

              {requestDecision === "pending" ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setRequestDecision("rejected")}
                    className="rounded-xl border border-[#111827]/60 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#111827] transition-colors duration-200 hover:bg-slate-50"
                  >
                    {data.requestCard.rejectLabel}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRequestDecision("approved")}
                    className="rounded-xl bg-[#37C650] px-3.5 py-1.5 text-xs font-semibold text-white shadow-2xs transition-colors duration-200 hover:bg-[#2EB045]"
                  >
                    {data.requestCard.approveLabel}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setRequestDecision("pending")}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                    requestDecision === "approved"
                      ? "bg-[#E8F5EC] text-[#15803D]"
                      : "bg-slate-100 text-[#475569]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full ${
                      requestDecision === "approved"
                        ? "bg-[#37C650]"
                        : "bg-slate-400"
                    }`}
                  />
                  <span>
                    {requestDecision === "approved" ? "Approved" : "Rejected"}
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Trusted Domains Footer Strip */}
          <div className="mt-4 flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-medium text-[#64748B]">
              {data.trustedDomainsLabel}
            </span>

            {data.trustedDomainTags.map((tag) => (
              <span
                key={tag.id}
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                  tag.highlighted
                    ? "bg-[#E8F5EC] font-semibold text-[#15803D]"
                    : "bg-slate-100 text-[#4B5563]"
                }`}
              >
                {tag.highlighted && (
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-[#37C650]"
                  />
                )}
                <span>{tag.label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}