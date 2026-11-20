"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { TiltCard } from "@/components/ui/tilt-card";
import type {
  AnalyticsStatusSegment,
  FeaturesAnalyticsInsightsContent,
} from "@/types/features";

interface AnalyticsInsightsWindowProps {
  data: FeaturesAnalyticsInsightsContent["previewWindow"];
}

const SILKY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function AnalyticsInsightsWindow({ data }: AnalyticsInsightsWindowProps) {
  const prefersReducedMotion = useReducedMotion();
  const [selectedStatus, setSelectedStatus] =
    useState<AnalyticsStatusSegment["id"]>("approved");

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
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-[15px] font-bold tracking-tight text-[#111827] sm:text-base">
              {data.panelHeading}
            </h3>

            <span className="rounded-full border border-slate-200/90 bg-white px-3 py-1 text-[11px] font-medium text-[#64748B]">
              {data.headerPillLabel}
            </span>
          </div>

          {/* 2x2 Mini Bar Chart Cards */}
          <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {data.metrics.map((metric, metricIndex) => (
              <div
                key={metric.id}
                className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-4 transition-colors duration-300 hover:border-[#37C650]/30 hover:bg-[#F5FBF7]"
              >
                <p className="text-xs font-bold text-[#111827] sm:text-[13px]">
                  {metric.title}
                </p>

                <div
                  aria-hidden="true"
                  className="mt-4 flex h-12 items-end gap-2"
                >
                  {metric.bars.map((bar, barIndex) => (
                    <motion.span
                      key={bar.id}
                      initial={
                        prefersReducedMotion ? undefined : { scaleY: 0.25 }
                      }
                      whileInView={
                        prefersReducedMotion ? undefined : { scaleY: 1 }
                      }
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.06 * metricIndex + barIndex * 0.04,
                        ease: SILKY_EASE,
                      }}
                      style={{ height: `${bar.heightPercent}%` }}
                      className={`flex-1 origin-bottom rounded-[5px] ${
                        bar.highlighted ? "bg-[#37C650]" : "bg-[#A7E3B6]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Access Request Status Bar & Pills */}
          <div className="mt-6">
            <p className="text-xs font-bold tracking-tight text-[#111827] sm:text-[13px]">
              {data.statusHeading}
            </p>

            {/* Multi-Segment Horizontal Progress Bar */}
            <div
              aria-hidden="true"
              className="mt-3 flex h-2.5 w-full overflow-hidden rounded-full bg-slate-200/90"
            >
              {data.segments.map((segment) => {
                const isSelected = selectedStatus === segment.id;
                let bgClass = "bg-[#E2E8F0]";
                if (segment.id === "approved") {
                  bgClass = "bg-[#37C650]";
                } else if (segment.id === "pending") {
                  bgClass = "bg-[#A7E3B6]";
                }

                return (
                  <div
                    key={segment.id}
                    style={{ width: `${segment.percent}%` }}
                    className={`h-full transition-opacity duration-300 ${bgClass} ${
                      isSelected ? "opacity-100" : "opacity-80"
                    }`}
                  />
                );
              })}
            </div>

            {/* Interactive Status Filter Pills */}
            <div
              role="radiogroup"
              aria-label={data.statusHeading}
              className="mt-3.5 flex flex-wrap items-center gap-2"
            >
              {data.segments.map((segment) => {
                const isSelected = selectedStatus === segment.id;

                return (
                  <button
                    key={segment.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setSelectedStatus(segment.id)}
                    className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#37C650] ${
                      isSelected
                        ? "bg-[#E8F5EC] text-[#15803D]"
                        : "border border-slate-200/90 bg-white font-medium text-[#64748B] hover:border-slate-300 hover:text-[#111827]"
                    }`}
                  >
                    {segment.showDot && (
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 rounded-full ${
                          isSelected ? "bg-[#37C650]" : "bg-[#64748B]"
                        }`}
                      />
                    )}
                    <span>{segment.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}