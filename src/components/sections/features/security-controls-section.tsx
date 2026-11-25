"use client";

import { LuCheck } from "react-icons/lu";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { FeaturesSecurityControlsContent } from "@/types/features";
import { SecurityControlsWindow } from "./security-controls-window";

interface SecurityControlsSectionProps {
  content: FeaturesSecurityControlsContent;
}

export function SecurityControlsSection({
  content,
}: SecurityControlsSectionProps) {
  return (
    <section
      id={content.sectionId}
      aria-labelledby="security-controls-heading"
      className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Eyebrow, Headline, Checklist & Business Value Box */}
          <div className="lg:col-span-6">
            <ScrollReveal preset="rise">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center justify-center rounded-full bg-[var(--color-palette-18181b)] px-2.5 py-0.5 text-[11px] font-bold tabular-nums text-white">
                  {content.number}
                </span>
                <span className="text-[11px] font-bold tracking-wider text-[var(--color-palette-64748b)] uppercase">
                  {content.eyebrow}
                </span>
              </div>

              <h2
                id="security-controls-heading"
                className="mt-4  w-full  text-2xl leading-[1.25] font-extrabold tracking-tight text-[var(--color-surface-dark)] text-4xl lg:text-[38px]"
              >
                <span className="block">{content.headline.lineOne}</span>
                <span className="block">{content.headline.lineTwo}</span>
              </h2>

              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
                {content.description}
              </p>
            </ScrollReveal>

            {/* What You Can Do Checklist */}
            <ScrollReveal preset="rise" delay={0.08}>
              <h3 className="mt-7 text-[15px] font-bold text-[var(--color-surface-dark)] sm:text-base">
                {content.checklistHeading}
              </h3>
            </ScrollReveal>

            <ul className="mt-4 space-y-3">
              {content.checklistItems.map((item, index) => (
                <li key={item}>
                  <ScrollReveal preset="rise" delay={0.1 + index * 0.05}>
                    <div className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-tint)] text-[var(--color-brand-primary)]"
                      >
                        <LuCheck className="h-3.5 w-3.5 stroke-[2.5]" />
                      </span>
                      <span className="text-[14px] leading-relaxed text-[var(--color-text-secondary)] sm:text-[14.5px]">
                        {item}
                      </span>
                    </div>
                  </ScrollReveal>
                </li>
              ))}
            </ul>

            {/* Business Value Callout Box */}
            <ScrollReveal preset="rise" delay={0.28}>
              <div className="mt-7 rounded-2xl border border-[var(--color-brand-primary)]/25 bg-[var(--color-brand-tint-soft)] p-5 sm:p-6">
                <p className="text-[11px] font-bold tracking-wider text-[var(--color-surface-dark)] uppercase">
                  {content.businessValue.label}
                </p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--color-text-secondary)] sm:text-sm">
                  {content.businessValue.description}
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Interactive Security Controls Preview Window */}
          <div className="mx-auto w-full max-w-[520px] lg:col-span-6 lg:max-w-none">
            <ScrollReveal preset="scale" delay={0.12}>
              <div className="bg-[var(--color-palette-f3fcf5)] md:p-7 rounded-[30px] ">
              <SecurityControlsWindow data={content.previewWindow} /></div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}