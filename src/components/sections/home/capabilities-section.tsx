"use client";

import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { HomeCapabilitiesContent } from "@/types/home";
import { CapabilityBentoCard } from "./capability-bento-card";

interface CapabilitiesSectionProps {
  content: HomeCapabilitiesContent;
}

export function CapabilitiesSection({ content }: CapabilitiesSectionProps) {
  return (
    <section
      aria-labelledby="capabilities-section-heading"
      className="bg-[var(--color-palette-f8fafc)] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <ScrollReveal preset="rise" className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-[var(--color-palette-e6f7eb)] px-4 py-1 text-[11px] font-bold tracking-wider text-[var(--color-palette-166534)] uppercase">
            {content.badge}
          </span>

          <h2
            id="capabilities-section-heading"
            className="mt-4 text-2xl leading-[1.16] font-extrabold tracking-tight text-[var(--color-surface-dark)] sm:text-4xl lg:text-[42px]"
          >
            {content.headline}
          </h2>

          <p className="mx-auto mt-3.5 max-w-3xl text-[15px] leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
            {content.description}
          </p>
        </ScrollReveal>

        {/* Asymmetric 12-Column Bento Grid with Matched Row Heights */}
        <div className="mt-12 grid grid-cols-1 items-stretch gap-5 sm:mt-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {content.cards.map((card, index) => {
            const spanClasses =
              card.span === "wide" ? "lg:col-span-7" : "lg:col-span-5";

            return (
              <ScrollReveal
                key={card.id}
                preset="rise"
                delay={(index % 2) * 0.08}
                className={`h-full ${spanClasses}`}
              >
                <CapabilityBentoCard card={card} priority={index < 2} />
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom Dark CTA Button */}
        <ScrollReveal preset="rise" delay={0.12} className="mt-10 text-center sm:mt-12">
          <Button
            href={content.cta.href}
            variant="custom"
            size="md"
            showArrow={content.cta.showArrow ?? true}
            className="bg-[var(--color-palette-18181b)] text-white shadow-sm hover:bg-[var(--color-palette-27272a)]"
          >
            {content.cta.label}
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}