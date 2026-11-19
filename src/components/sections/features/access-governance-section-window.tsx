"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import {
  LuBadgeCheck,
  LuCheck,
  LuFileText,
  LuFolder,
  LuRotateCcw,
  LuX,
} from "react-icons/lu";
import { TiltCard } from "@/components/ui/tilt-card";
import type {
  DocumentAccessMode,
  FeatureDocIcon,
  FeaturesAccessGovernanceSectionContent,
} from "@/types/features";

interface AccessGovernanceSectionWindowProps {
  data: FeaturesAccessGovernanceSectionContent["previewWindow"];
}

function AccessDocIcon({ type }: { type: FeatureDocIcon }) {
  const iconClass = "h-4.5 w-4.5 text-[#28B446]";
  if (type === "folder") {
    return <LuFolder aria-hidden="true" className={iconClass} />;
  }
  if (type === "certification") {
    return <LuBadgeCheck aria-hidden="true" className={iconClass} />;
  }
  return <LuFileText aria-hidden="true" className={iconClass} />;
}

export function AccessGovernanceSectionWindow({
  data,
}: AccessGovernanceSectionWindowProps) {
  const prefersReducedMotion = useReducedMotion();
  const [modes, setModes] = useState<Record<string, DocumentAccessMode>>(() =>
    Object.fromEntries(data.accessRows.map((row) => [row.id, row.defaultMode]))
  );
  const [decision, setDecision] = useState<"pending" | "approved" | "rejected">(
    "pending"
  );

  const handleModeChange = (id: string, mode: DocumentAccessMode) => {
    setModes((prev) => ({ ...prev, [id]: mode }));
  };

  return (
    <TiltCard maxTilt={1.6}>
      <div className="overflow-hidden rounded-2xl border border-slate-200/85 bg-[#F8FAFC] shadow-[0_24px_60px_-15px_rgba(15,23,42,0.12)] transition-[border-color,box-shadow] duration-500 ease-out hover:border-[#28B446]/35 hover:shadow-[0_32px_72px_-16px_rgba(40,180,70,0.18)] sm:rounded-3xl">
        {/* Top macOS Window Bar */}
        <div className="flex items-center gap-3 border-b border-slate-200/70 bg-[#F4F6F9] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200 transition-colors duration-300 hover:bg-[#28B446]/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200 transition-colors duration-300 hover:bg-[#28B446]/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200 transition-colors duration-300 hover:bg-[#28B446]/60" />
          </div>
          <span className="text-xs font-medium text-[#64748B]">
            {data.windowTitle}
          </span>
        </div>

        {/* Window Body */}
        <div className="bg-white p-5 sm:p-7">
          {/* Document Access Section */}
          <h3 className="text-[15px] font-bold tracking-tight text-[#111827] sm:text-base">
            {data.accessHeading}
          </h3>

          <div className="mt-3.5 space-y-2.5">
            {data.accessRows.map((row) => {
              const currentMode = modes[row.id] ?? row.defaultMode;
              const isPublic = currentMode === "public";

              return (
                <div
                  key={row.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white px-3.5 py-3 shadow-2xs transition-[border-color,background-color] duration-300 hover:border-[#28B446]/35 hover:bg-[#F9FDFB] sm:px-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E8F5EC]">
                      <AccessDocIcon type={row.icon} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#111827] sm:text-[13.5px]">
                        {row.title}
                      </p>
                      <p className="text-[11px] text-[#64748B]">
                        {isPublic ? row.publicSubtitle : row.restrictedSubtitle}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Public / Restricted Segmented Toggle */}
                  <div
                    role="group"
                    aria-label={`${row.title} visibility mode`}
                    className="inline-flex items-center rounded-full border border-slate-200/90 bg-[#F8FAFC] p-0.5"
                  >
                    {(["public", "restricted"] as const).map((modeOption) => {
                      const active = currentMode === modeOption;
                      const label =
                        modeOption === "public" ? "Public" : "Restricted";

                      return (
                        <button
                          key={modeOption}
                          type="button"
                          aria-pressed={active}
                          onClick={() => handleModeChange(row.id, modeOption)}
                          className={`relative cursor-pointer rounded-full px-3 py-1 text-[11px] font-semibold transition-colors duration-200 ${
                            active
                              ? "text-white"
                              : "text-[#64748B] hover:text-[#111827]"
                          }`}
                        >
                          {active && (
                            <motion.span
                              layoutId={`ag-sec-pill-${row.id}`}
                              transition={
                                prefersReducedMotion
                                  ? { duration: 0 }
                                  : {
                                      type: "spring",
                                      stiffness: 380,
                                      damping: 30,
                                    }
                              }
                              className="absolute inset-0 rounded-full bg-[#18181B]"
                            />
                          )}
                          <span className="relative z-10">{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Access Requests Section */}
          <h3 className="mt-6 text-[15px] font-bold tracking-tight text-[#111827] sm:text-base">
            {data.requestsHeading}
          </h3>

          <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-2xs">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-9 w-9 shrink-0 rounded-full bg-[#E8F5EC]"
              />
              <div>
                <p className="text-xs font-bold leading-snug text-[#111827] sm:text-[13.5px]">
                  {data.requestCard.title}
                </p>
                <p className="mt-0.5 text-[11px] text-[#64748B]">
                  {data.requestCard.subtitle}
                </p>
              </div>
            </div>

            {decision === "pending" ? (
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDecision("rejected")}
                  className="cursor-pointer rounded-xl border border-slate-800 bg-white px-3.5 py-2 text-xs font-semibold text-[#111827] transition-colors duration-200 hover:bg-slate-100"
                >
                  {data.requestCard.rejectLabel}
                </button>

                <button
                  type="button"
                  onClick={() => setDecision("approved")}
                  className="cursor-pointer rounded-xl bg-[#28B446] px-4 py-2 text-xs font-semibold text-white shadow-2xs transition-colors duration-200 hover:bg-[#229A3C]"
                >
                  {data.requestCard.approveLabel}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold ${
                    decision === "approved"
                      ? "bg-[#E8F5EC] text-[#15803D]"
                      : "bg-rose-50 text-rose-700"
                  }`}
                >
                  {decision === "approved" ? (
                    <LuCheck className="h-3.5 w-3.5" />
                  ) : (
                    <LuX className="h-3.5 w-3.5" />
                  )}
                  {decision === "approved" ? "Approved" : "Rejected"}
                </span>

                <button
                  type="button"
                  onClick={() => setDecision("pending")}
                  aria-label="Reset request status"
                  className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-[#64748B] transition-colors hover:bg-slate-50 hover:text-[#111827]"
                >
                  <LuRotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Trusted Domains Footer Strip */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[11.5px] font-medium text-[#64748B]">
              {data.trustedDomainsLabel}
            </span>

            {data.trustedDomains.map((tag) => (
              <span
                key={tag.id}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium ${
                  tag.highlighted
                    ? "bg-[#E8F5EC] font-semibold text-[#15803D]"
                    : "border border-slate-200/90 bg-[#F8FAFC] text-[#475569]"
                }`}
              >
                {tag.highlighted && (
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-[#28B446]"
                  />
                )}
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}