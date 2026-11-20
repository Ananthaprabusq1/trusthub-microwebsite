"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import {
  LuBadgeCheck,
  LuBuilding2,
  LuFileText,
  LuShieldCheck,
  LuUsers,
} from "react-icons/lu";

interface SourceNode {
  id: string;
  label: string;
  telemetry: string;
  pathD: string;
}

const SOURCE_NODES: SourceNode[] = [
  {
    id: "soc2",
    label: "SOC 2 Type II",
    telemetry: "Continuous audit evidence synced · SHA-256 verified",
    pathD: "M 165 44 C 235 44, 245 130, 300 130",
  },
  {
    id: "policies",
    label: "Security Policies",
    telemetry: "Version v2.4 active · Auto-watermarked on download",
    pathD: "M 165 130 L 300 130",
  },
  {
    id: "subprocessors",
    label: "Subprocessors",
    telemetry: "14 verified vendors · Live regional hosting status",
    pathD: "M 165 216 C 235 216, 245 130, 300 130",
  },
];

const OUTPUT_PATHS = [
  "M 300 130 C 365 130, 375 76, 445 76",
  "M 300 130 C 365 130, 375 184, 445 184",
];

export function LiveSecurityBeamFlow() {
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>("soc2");

  const activeNode =
    SOURCE_NODES.find((node) => node.id === activeId) ?? SOURCE_NODES[0];

  return (
    <div className="rounded-3xl border border-slate-200/85 bg-white p-6 shadow-xs sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-[#111827]">
            Live Trust Architecture Beam Flow
          </h3>
          <p className="text-xs text-[#64748B]">
            Click any compliance source on the left to trace live posture
            delivery.
          </p>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F5EC] px-3.5 py-1 text-xs font-semibold text-[#15803D]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#37C650]" />
          {activeNode?.telemetry}
        </span>
      </div>

      {/* Desktop Beam Canvas */}
      <div className="relative mt-6 hidden h-[260px] w-full overflow-hidden rounded-2xl border border-slate-100 bg-[#FAFBFD] md:block">
        <svg
          aria-hidden="true"
          viewBox="0 0 600 260"
          className="h-full w-full"
          preserveAspectRatio="none"
        >
          {/* Base Static Tracks */}
          {SOURCE_NODES.map((node) => (
            <path
              key={`track-${node.id}`}
              d={node.pathD}
              fill="none"
              stroke={node.id === activeId ? "#86EFAC" : "#E2E8F0"}
              strokeWidth={node.id === activeId ? 2.5 : 1.75}
            />
          ))}
          {OUTPUT_PATHS.map((d, idx) => (
            <path
              key={`out-track-${idx + 1}`}
              d={d}
              fill="none"
              stroke="#BBF7D0"
              strokeWidth={2}
            />
          ))}

          {/* Animated Glowing Pulse Beams */}
          {!prefersReducedMotion &&
            SOURCE_NODES.map((node, index) => (
              <motion.path
                key={`beam-${node.id}`}
                d={node.pathD}
                fill="none"
                stroke="#37C650"
                strokeWidth={node.id === activeId ? 3.2 : 2}
                strokeLinecap="round"
                initial={{ pathLength: 0.22, pathOffset: 0 }}
                animate={{ pathOffset: [0, 1] }}
                transition={{
                  duration: node.id === activeId ? 1.8 : 2.8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: index * 0.45,
                }}
              />
            ))}

          {!prefersReducedMotion &&
            OUTPUT_PATHS.map((d, index) => (
              <motion.path
                key={`out-beam-${index + 1}`}
                d={d}
                fill="none"
                stroke="#37C650"
                strokeWidth={2.6}
                strokeLinecap="round"
                initial={{ pathLength: 0.25, pathOffset: 0 }}
                animate={{ pathOffset: [0, 1] }}
                transition={{
                  duration: 2.1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: 0.6 + index * 0.5,
                }}
              />
            ))}
        </svg>

        {/* Left Source Nodes */}
        <div className="absolute inset-y-0 left-5 flex flex-col justify-between py-6">
          {SOURCE_NODES.map((node) => {
            const isSelected = node.id === activeId;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveId(node.id)}
                className={`flex w-44 cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-xs font-semibold transition-all ${
                  isSelected
                    ? "border-[#37C650] bg-[#F2FBF4] text-[#111827] shadow-xs"
                    : "border-slate-200/90 bg-white text-[#4B5563] hover:border-[#37C650]/45"
                }`}
              >
                {node.id === "soc2" && (
                  <LuBadgeCheck className="h-4 w-4 shrink-0 text-[#37C650]" />
                )}
                {node.id === "policies" && (
                  <LuFileText className="h-4 w-4 shrink-0 text-[#37C650]" />
                )}
                {node.id === "subprocessors" && (
                  <LuUsers className="h-4 w-4 shrink-0 text-[#37C650]" />
                )}
                <span>{node.label}</span>
              </button>
            );
          })}
        </div>

        {/* Center Stakflo Hub Node */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center rounded-2xl border-2 border-[#37C650] bg-white px-5 py-3.5 shadow-[0_14px_34px_-10px_rgba(55,198,80,0.35)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#37C650] text-white">
              <LuShieldCheck className="h-5 w-5" />
            </div>
            <span className="mt-1.5 text-xs font-extrabold text-[#111827]">
              Trust Hub
            </span>
          </div>
        </div>

        {/* Right Buyer Nodes */}
        <div className="absolute inset-y-0 right-5 flex flex-col justify-between py-12">
          <div className="flex w-44 items-center gap-2.5 rounded-xl border border-slate-200/90 bg-white px-3.5 py-2.5 text-xs font-semibold text-[#111827] shadow-2xs">
            <LuBuilding2 className="h-4 w-4 shrink-0 text-[#37C650]" />
            <span>Enterprise Buyer</span>
          </div>
          <div className="flex w-44 items-center gap-2.5 rounded-xl border border-slate-200/90 bg-white px-3.5 py-2.5 text-xs font-semibold text-[#111827] shadow-2xs">
            <LuShieldCheck className="h-4 w-4 shrink-0 text-[#37C650]" />
            <span>Security Review</span>
          </div>
        </div>
      </div>
    </div>
  );
}