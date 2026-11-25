"use client";

import { motion, useReducedMotion } from "motion/react";
import { LuCheck } from "react-icons/lu";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { WhyBusinessValueContent } from "@/types/why-trust-hub";

interface BusinessValueSectionProps {
  content: WhyBusinessValueContent;
}

const SILKY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function BusinessValueSection({ content }: BusinessValueSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="business-value-heading"
      className="bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <ScrollReveal preset="rise" className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center rounded-full bg-[var(--color-palette-e6f7eb)] px-4 py-1 text-[11px] font-bold tracking-wider text-[var(--color-palette-166534)] uppercase">
            {content.badge}
          </span>

          <h2
            id="business-value-heading"
            className="mt-4 text-2xl leading-[1.16] font-extrabold tracking-tight text-[var(--color-surface-dark)] sm:text-4xl lg:text-[42px]"
          >
            {content.headline}
          </h2>

          <p className="mx-auto mt-3.5 max-w-2xl text-[15px] leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
            {content.description}
          </p>
        </ScrollReveal>

        {/* Dark-Header Comparison Matrix Card */}
        <ScrollReveal preset="scale" delay={0.1} className="mt-12 sm:mt-14">
          <div className="overflow-hidden rounded-2xl border border-slate-200/85 bg-white shadow-[0_14px_40px_-14px_rgba(15,23,42,0.08)] sm:rounded-3xl">
            {/* Dark Table Header Bar */}
            <div className="grid grid-cols-1 gap-1 bg-[var(--color-palette-18181b)] px-5 py-4 text-xs font-semibold tracking-wide text-white sm:px-8 sm:py-4.5 md:grid-cols-[minmax(240px,36%)_1fr] md:gap-6">
              <div>{content.columns.valueHeader}</div>
              <div className="hidden md:block">
                {content.columns.meaningHeader}
              </div>
            </div>

            {/* Alternating Value Rows */}
            <div role="list" className="divide-y divide-slate-100">
              {content.rows.map((row, index) => {
                const isStriped = index % 2 === 1;

                return (
                  <motion.div
                    key={row.id}
                    role="listitem"
                    initial={
                      prefersReducedMotion ? undefined : { opacity: 0, y: 10 }
                    }
                    whileInView={
                      prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                    }
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.08 + index * 0.06,
                      ease: SILKY_EASE,
                    }}
                    className={`group grid grid-cols-1 items-start gap-2 px-5 py-4.5 transition-colors duration-300 ease-out hover:bg-[var(--color-brand-tint-soft)] sm:px-8 sm:py-5 md:grid-cols-[minmax(240px,36%)_1fr] md:items-center md:gap-6 ${
                      isStriped ? "bg-[var(--color-palette-f8fafc)]" : "bg-white"
                    }`}
                  >
                    {/* Left Column: Rounded Green Checkmark + Bold Value Title */}
                    <div className="flex items-center gap-3.5">
                      <span
                        aria-hidden="true"
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] bg-[var(--color-brand-primary)] text-white shadow-2xs transition-transform duration-300 group-hover:scale-105"
                      >
                        <LuCheck className="h-3.5 w-3.5 stroke-[3]" />
                      </span>

                      <span className="text-[14px] font-bold tracking-tight text-[var(--color-surface-dark)] sm:text-[15px]">
                        {row.value}
                      </span>
                    </div>

                    {/* Right Column: Business Impact Description */}
                    <p className="pl-8.5 text-[13.5px] leading-relaxed text-[var(--color-palette-64748b)] transition-colors duration-300 group-hover:text-[var(--color-palette-334155)] sm:text-sm md:pl-0">
                      {row.meaning}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}