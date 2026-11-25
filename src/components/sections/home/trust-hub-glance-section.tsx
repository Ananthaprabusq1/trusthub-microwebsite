"use client";

import { LuCheck } from "react-icons/lu";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { HomeGlanceContent } from "@/types/home";
import {
  GlanceManagementWindow,
  GlanceTrustCenterWindow,
} from "./glance-windows";

interface TrustHubGlanceSectionProps {
  content: HomeGlanceContent;
}

function ChecklistBlock({
  badge,
  title,
  bullets,
}: {
  badge: string;
  title: string;
  bullets: string[];
}) {
  return (
    <div>
      <ScrollReveal preset="rise">
        <span className="inline-flex items-center rounded-full bg-[var(--color-palette-e6f7eb)] px-3.5 py-1 text-[10px] font-bold tracking-wider text-[var(--color-palette-166534)] uppercase sm:text-[11px]">
          {badge}
        </span>

        <h3 className="mt-4 text-xl font-extrabold tracking-tight text-[var(--color-surface-dark)] sm:text-2xl lg:text-[26px]">
          {title}
        </h3>
      </ScrollReveal>

      <ul className="mt-5 space-y-3.5">
        {bullets.map((bullet, index) => (
          <li key={bullet}>
            <ScrollReveal preset="rise" delay={0.08 + index * 0.07}>
              <div className="flex items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-palette-dcfce7)] text-[var(--color-palette-16a34a)]">
                  <LuCheck aria-hidden="true" className="h-3.5 w-3.5 stroke-[2.5]" />
                </span>
                <span className="text-[14px] leading-relaxed text-[var(--color-text-secondary)] sm:text-[15px]">
                  {bullet}
                </span>
              </div>
            </ScrollReveal>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TrustHubGlanceSection({ content }: TrustHubGlanceSectionProps) {
  const { managementRow, trustCenterRow } = content;

  return (
    <section
      aria-labelledby="glance-section-heading"
      className="bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <ScrollReveal preset="rise" className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center rounded-full bg-[var(--color-palette-e6f7eb)] px-4 py-1 text-[11px] font-bold tracking-wider text-[var(--color-palette-166534)] uppercase">
            {content.badge}
          </span>

          <h2
            id="glance-section-heading"
            className="mt-4 text-2xl leading-[1.16] font-extrabold tracking-tight text-[var(--color-surface-dark)] sm:text-4xl lg:text-[42px]"
          >
            {content.headline}
          </h2>

          <p className="mx-auto mt-3.5 max-w-5xl text-[15px] leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
            {content.description}
          </p>
        </ScrollReveal>

        {/* Alternating Row 1: Left Checklist + Right Management Dashboard */}
        <div className="mt-14 grid grid-cols-1 items-center gap-10 sm:mt-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <ChecklistBlock
              badge={managementRow.badge}
              title={managementRow.title}
              bullets={managementRow.bullets}
            />
          </div>

          <div className="lg:col-span-7">
            <ScrollReveal preset="scale" delay={0.1}>
              <GlanceManagementWindow data={managementRow.window} />
            </ScrollReveal>
          </div>
        </div>

        {/* Alternating Row 2: Left Customer Trust Center + Right Checklist */}
        <div className="mt-16 grid grid-cols-1 items-center gap-10 sm:mt-20 lg:mt-24 lg:grid-cols-12 lg:gap-12">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <ScrollReveal preset="scale" delay={0.1}>
              <GlanceTrustCenterWindow data={trustCenterRow.window} />
            </ScrollReveal>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-6 lg:pl-8">
            <ChecklistBlock
              badge={trustCenterRow.badge}
              title={trustCenterRow.title}
              bullets={trustCenterRow.bullets}
            />
          </div>
        </div>
      </div>
    </section>
  );
}