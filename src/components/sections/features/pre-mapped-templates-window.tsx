"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { LuLayoutGrid } from "react-icons/lu";
import { TiltCard } from "@/components/ui/tilt-card";
import type { FeaturesPreMappedTemplatesContent } from "@/types/features";

interface PreMappedTemplatesWindowProps {
  data: FeaturesPreMappedTemplatesContent["previewWindow"];
}

export function PreMappedTemplatesWindow({
  data,
}: PreMappedTemplatesWindowProps) {
  const prefersReducedMotion = useReducedMotion();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    data.templates[0]?.id ?? ""
  );

  const activeTemplate =
    data.templates.find((tpl) => tpl.id === selectedTemplateId) ??
    data.templates[0];

  const structureWidths = activeTemplate?.structureWidths ?? [
    "w-full",
    "w-full",
    "w-full",
    "w-full",
  ];

  return (
    <TiltCard maxTilt={1.6}>
      <div className="overflow-hidden rounded-2xl border border-slate-200/85 bg-[var(--color-palette-f8fafc)] shadow-[0_24px_60px_-15px_rgba(15,23,42,0.12)] transition-[border-color,box-shadow] duration-500 ease-out hover:border-[var(--color-brand-primary)]/35 hover:shadow-[0_32px_72px_-16px_rgba(55,198,80,0.18)] sm:rounded-3xl">
        {/* Top macOS Window Bar */}
        <div className="flex items-center gap-3 border-b border-slate-200/70 bg-[var(--color-palette-f4f6f9)] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200 transition-colors duration-300 hover:bg-[var(--color-brand-primary)]/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200 transition-colors duration-300 hover:bg-[var(--color-brand-primary)]/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200 transition-colors duration-300 hover:bg-[var(--color-brand-primary)]/60" />
          </div>
          <span className="text-xs font-medium text-[var(--color-palette-64748b)]">
            {data.windowTitle}
          </span>
        </div>

        {/* Window Body */}
        <div className="bg-white p-5 sm:p-7">
          {/* Choose a Template Header */}
          <h3 className="text-[15px] font-bold tracking-tight text-[var(--color-surface-dark)] sm:text-base">
            {data.chooseHeading}
          </h3>

          {/* 3 Selectable Template Cards */}
          <div
            role="radiogroup"
            aria-label={data.chooseHeading}
            className="mt-4 grid grid-cols-3 gap-3 sm:gap-3.5"
          >
            {data.templates.map((template) => {
              const isSelected = template.id === activeTemplate?.id;

              return (
                <button
                  key={template.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={template.label}
                  onClick={() => setSelectedTemplateId(template.id)}
                  className={`group relative flex cursor-pointer flex-col items-start rounded-2xl border-[1.5px] p-3.5 text-left transition-[border-color,background-color,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] sm:p-4 ${
                    isSelected
                      ? "border-[var(--color-brand-primary)] bg-[var(--color-brand-tint-soft)] shadow-[0_8px_20px_-8px_rgba(55,198,80,0.28)]"
                      : "border-slate-200/85 bg-white hover:border-[var(--color-brand-primary)]/45 hover:bg-[var(--color-palette-fafdfb)]"
                  }`}
                >
                  {/* Template Icon Box */}
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-300 ${
                      isSelected
                        ? "bg-[var(--color-brand-primary)] text-white"
                        : "bg-[var(--color-brand-tint)] text-[var(--color-brand-primary)] group-hover:bg-[var(--color-palette-dcfce7)]"
                    }`}
                  >
                    <LuLayoutGrid aria-hidden="true" className="h-4.5 w-4.5" />
                  </span>

                  {/* Skeleton Preview Lines */}
                  <div
                    aria-hidden="true"
                    className="mt-4 w-full space-y-2"
                  >
                    <div
                      className={`h-2 rounded-full transition-colors duration-300 ${
                        template.barWidths[0]
                      } ${isSelected ? "bg-slate-300/90" : "bg-slate-200/90"}`}
                    />
                    <div
                      className={`h-2 rounded-full transition-colors duration-300 ${
                        template.barWidths[1]
                      } ${isSelected ? "bg-slate-300/80" : "bg-slate-200/80"}`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Template Structure Section */}
          <p className="mt-6 text-xs font-bold tracking-tight text-[var(--color-surface-dark)] sm:text-[13px]">
            {data.structureHeading}
          </p>

          <div className="mt-3 space-y-2.5">
            {structureWidths.map((widthClass, index) => (
              <motion.div
                key={`${activeTemplate?.id ?? "tpl"}-row-${index + 1}`}
                initial={
                  prefersReducedMotion ? undefined : { opacity: 0.65, x: -4 }
                }
                animate={
                  prefersReducedMotion ? undefined : { opacity: 1, x: 0 }
                }
                transition={{
                  duration: 0.32,
                  delay: index * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3 shadow-2xs"
              >
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-brand-primary)]"
                />
                <div className="flex-1">
                  <div
                    aria-hidden="true"
                    className={`h-2 rounded-full bg-slate-200/85 transition-all duration-300 ${widthClass}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}