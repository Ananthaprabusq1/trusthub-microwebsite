"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { LuCheck, LuUpload } from "react-icons/lu";
import { TiltCard } from "@/components/ui/tilt-card";
import type { FeaturesBrandingCustomizationContent } from "@/types/features";

interface BrandingCustomizationWindowProps {
  data: FeaturesBrandingCustomizationContent["previewWindow"];
}

export function BrandingCustomizationWindow({
  data,
}: BrandingCustomizationWindowProps) {
  const prefersReducedMotion = useReducedMotion();
  const [logoConfigured, setLogoConfigured] = useState(false);
  const [selectedSwatchId, setSelectedSwatchId] = useState<string>(
    data.swatches[0]?.id ?? ""
  );
  const [fontIndex, setFontIndex] = useState(0);

  const activeFont = data.fonts[fontIndex] ?? data.fonts[0] ?? "Inter";

  const handleCycleFont = () => {
    if (data.fonts.length <= 1) return;
    setFontIndex((prev) => (prev + 1) % data.fonts.length);
  };

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
          <h3 className="text-[15px] font-bold tracking-tight text-[#111827] sm:text-base">
            {data.panelHeading}
          </h3>

          {/* Organization Logo Upload Card */}
          <button
            type="button"
            onClick={() => setLogoConfigured((prev) => !prev)}
            className="group mt-4 flex w-full cursor-pointer items-center gap-3.5 rounded-2xl border-[1.5px] border-dashed border-[#37C650]/75 bg-[#F2FBF4] p-4 text-left transition-colors duration-300 hover:border-[#37C650] hover:bg-[#EAF8EE] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#37C650]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#DCFCE7] text-[#37C650] transition-transform duration-300 group-hover:scale-105">
              {logoConfigured ? (
                <LuCheck aria-hidden="true" className="h-5 w-5 stroke-[2.5]" />
              ) : (
                <LuUpload aria-hidden="true" className="h-4.5 w-4.5" />
              )}
            </span>

            <div>
              <p className="text-xs font-bold text-[#111827] sm:text-[13.5px]">
                {data.logoCard.title}
              </p>
              <p className="mt-0.5 text-[11.5px] text-[#64748B]">
                {logoConfigured
                  ? data.logoCard.uploadedSubtitle
                  : data.logoCard.subtitle}
              </p>
            </div>
          </button>

          {/* Brand Colours Swatch Selector */}
          <div className="mt-5">
            <p className="text-xs font-medium text-[#64748B]">
              {data.coloursLabel}
            </p>

            <div
              role="radiogroup"
              aria-label={data.coloursLabel}
              className="mt-2.5 flex items-center gap-3"
            >
              {data.swatches.map((swatch) => {
                const isSelected = swatch.id === selectedSwatchId;

                return (
                  <motion.button
                    key={swatch.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={swatch.label}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
                    onClick={() => setSelectedSwatchId(swatch.id)}
                    style={{ backgroundColor: swatch.hex }}
                    className={`h-8 w-8 cursor-pointer rounded-full transition-shadow duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#37C650] ${
                      swatch.hasBorder ? "border border-slate-200" : ""
                    } ${
                      isSelected
                        ? "ring-2 ring-[#37C650]/45 ring-offset-2"
                        : "hover:scale-105"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Typography Selector */}
          <div className="mt-5">
            <p className="text-xs font-medium text-[#64748B]">
              {data.typographyLabel}
            </p>

            <button
              type="button"
              onClick={handleCycleFont}
              aria-label={`Typography font: ${activeFont}. Click to preview another font`}
              className="mt-2 flex w-full cursor-pointer items-center justify-between rounded-xl border border-slate-200/90 bg-white px-4 py-3 text-left text-xs font-medium text-[#111827] shadow-2xs transition-colors duration-200 hover:border-[#37C650]/45 sm:text-[13.5px]"
            >
              <span>{activeFont}</span>
              <span className="text-[11px] text-[#94A3B8]">Aa</span>
            </button>
          </div>

          {/* Custom Domain & DNS Validation Row */}
          <div className="mt-5">
            <p className="text-xs font-medium text-[#64748B]">
              {data.customDomainLabel}
            </p>

            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200/90 bg-white px-4 py-3 shadow-2xs">
              <span className="text-xs font-medium text-[#111827] sm:text-[13.5px]">
                {data.domainValue}
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F5EC] px-2.5 py-0.5 text-[11px] font-semibold text-[#15803D]">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-[#37C650]"
                />
                {data.dnsStatusLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}