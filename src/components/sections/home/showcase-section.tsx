"use client";

import { motion } from "motion/react";
import {
  LuBadgeCheck,
  LuFileText,
  LuFolder,
  LuShieldCheck,
  LuUsers,
} from "react-icons/lu";
import { FloatingCard } from "@/components/ui/floating-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import type {
  DashboardRowIcon,
  HomeShowcaseContent,
  ShowcaseItemIcon,
} from "@/types/home";

interface ShowcaseSectionProps {
  content: HomeShowcaseContent;
}

function LeftFeatureIcon({ type }: { type: ShowcaseItemIcon }) {
  const iconClass = "h-5 w-5 text-[var(--color-brand-primary)]";
  if (type === "policies") {
    return <LuFileText aria-hidden="true" className={iconClass} />;
  }
  if (type === "audits") {
    return <LuFolder aria-hidden="true" className={iconClass} />;
  }
  if (type === "controls") {
    return <LuShieldCheck aria-hidden="true" className={iconClass} />;
  }
  if (type === "disclosures") {
    return <LuUsers aria-hidden="true" className={iconClass} />;
  }
  return <LuBadgeCheck aria-hidden="true" className={iconClass} />;
}

function PreviewRowIcon({ type }: { type: DashboardRowIcon }) {
  const iconClass = "h-4.5 w-4.5 text-[var(--color-brand-primary)]";
  if (type === "folder") {
    return <LuFolder aria-hidden="true" className={iconClass} />;
  }
  if (type === "policy") {
    return <LuFileText aria-hidden="true" className={iconClass} />;
  }
  return <LuBadgeCheck aria-hidden="true" className={iconClass} />;
}

export function ShowcaseSection({ content }: ShowcaseSectionProps) {
  const { previewWindow, floatingBadge } = content;

  return (
    <section
      aria-labelledby="showcase-section-heading"
      className="bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Badge, Headline, Description & 5 Staggered Feature Items */}
          <div className="lg:col-span-6">
            <ScrollReveal preset="rise">
              <span className="inline-flex items-center rounded-full bg-[var(--color-palette-e6f7eb)] px-4 py-1 text-[11px] font-bold tracking-wider text-[var(--color-palette-166534)] uppercase">
                {content.badge}
              </span>

              <h2
                id="showcase-section-heading"
                className="mt-4 text-2xl leading-[1.16] font-extrabold tracking-tight text-[var(--color-surface-dark)] sm:text-4xl lg:text-[42px]"
              >
                {content.headline}
              </h2>

              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
                {content.description}
              </p>
            </ScrollReveal>

            <ul className="mt-8 space-y-5">
              {content.items.map((item, index) => (
                <li key={item.id}>
                  <ScrollReveal preset="rise" delay={0.08 + index * 0.06}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 24,
                      }}
                      className="group flex items-start gap-4"
                    >
                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand-tint)] transition-colors duration-300 group-hover:bg-[var(--color-palette-dcfce7)]">
                        <LeftFeatureIcon type={item.icon} />
                      </div>

                      <div>
                        <h3 className="text-[15px] font-bold text-[var(--color-surface-dark)] sm:text-base">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-[13.5px] leading-relaxed text-[var(--color-palette-64748b)] sm:text-sm">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Customer Trust Center Preview Window + Overlapping Floating Badge */}
          <div className="relative mx-auto w-full max-w-[540px] lg:col-span-6 lg:max-w-none">
            <ScrollReveal preset="scale" delay={0.12}>
              <TiltCard maxTilt={1.8}>
                <div className="overflow-hidden rounded-2xl border border-slate-200/85 bg-white shadow-[0_24px_60px_-15px_rgba(15,23,42,0.12)] transition-[border-color,box-shadow] duration-500 ease-out hover:border-[var(--color-brand-primary)]/35 hover:shadow-[0_32px_72px_-16px_rgba(55,198,80,0.18)] sm:rounded-3xl">
                  {/* Top macOS Window Bar */}
                  <div className="flex items-center gap-3 border-b border-slate-100 bg-[var(--color-palette-fafbfb)] px-4 py-3 sm:px-6">
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-200 transition-colors duration-300 hover:bg-[var(--color-brand-primary)]/60" />
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-200 transition-colors duration-300 hover:bg-[var(--color-brand-primary)]/60" />
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-200 transition-colors duration-300 hover:bg-[var(--color-brand-primary)]/60" />
                    </div>
                    <span className="text-xs font-medium text-[var(--color-palette-64748b)]">
                      {previewWindow.windowTitle}
                    </span>
                  </div>

                  {/* Customer Trust Center Header Strip */}
                  <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-white px-5 py-4 sm:px-7">
                    <span className="text-sm font-bold text-[var(--color-surface-dark)] sm:text-[15px]">
                      {previewWindow.organizationName}
                    </span>

                    <span className="inline-flex items-center rounded-xl bg-[var(--color-brand-primary)] px-4 py-2 text-xs font-semibold text-white shadow-2xs transition-colors duration-200 hover:bg-[var(--color-brand-primary-hover)]">
                      {previewWindow.ctaLabel}
                    </span>
                  </div>

                  {/* Soft Mint Trust Center Hero Banner */}
                  <div className="bg-[var(--color-palette-ecf9f0)] px-5 py-6 sm:px-7 sm:py-7">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-palette-d8f3e0)] px-2.5 py-1 text-[11px] font-semibold text-[var(--color-brand-primary-dark)]">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-primary)]"
                      />
                      {previewWindow.verifiedBadgeLabel}
                    </span>

                    <h3 className="mt-3 text-xl font-extrabold tracking-tight text-[var(--color-surface-dark)] sm:text-[23px]">
                      {previewWindow.bannerHeading}
                    </h3>

                    <p className="mt-1 text-xs text-[var(--color-text-secondary)] sm:text-[13px]">
                      {previewWindow.bannerSubtitle}
                    </p>
                  </div>

                  {/* Public & Restricted Document Rows */}
                  <div className="space-y-2.5 bg-white p-4 sm:p-6">
                    {previewWindow.rows.map((row) => {
                      const isPublic = row.accessTone === "public";

                      return (
                        <motion.div
                          key={row.id}
                          whileHover={{ x: 4 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 24,
                          }}
                          className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white px-3.5 py-3 shadow-2xs transition-[border-color,background-color] duration-300 hover:border-[var(--color-brand-primary)]/35 hover:bg-[var(--color-palette-f9fdfb)] sm:px-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-tint)]">
                              <PreviewRowIcon type={row.icon} />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-[var(--color-surface-dark)] sm:text-sm">
                                {row.title}
                              </p>
                              <p className="text-[11px] text-[var(--color-palette-64748b)]">
                                {row.subtitle}
                              </p>
                            </div>
                          </div>

                          <span
                            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                              isPublic
                                ? "bg-[var(--color-brand-tint)] text-[var(--color-brand-primary-dark)]"
                                : "bg-slate-100 text-[var(--color-palette-475569)]"
                            }`}
                          >
                            <span
                              aria-hidden="true"
                              className={`h-1.5 w-1.5 rounded-full ${
                                isPublic ? "bg-[var(--color-brand-primary)]" : "bg-slate-400"
                              }`}
                            />
                            {row.accessLabel}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Overlapping Bottom-Left Floating Badge Card */}
            <ScrollReveal
              preset="pop"
              delay={0.28}
              className="mt-4 sm:mt-0 sm:absolute sm:bottom-9 sm:-left-7 lg:-left-11 z-20"
            >
              <FloatingCard amplitude={5.5} duration={4.8} delay={0.4}>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-[0_16px_36px_-10px_rgba(15,23,42,0.16)] transition-[border-color,box-shadow] duration-500 ease-out hover:border-[var(--color-brand-primary)]/40 hover:shadow-[0_22px_44px_-10px_rgba(55,198,80,0.22)]">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand-primary)]">
                    <LuBadgeCheck
                      aria-hidden="true"
                      className="h-5 w-5 text-white"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--color-surface-dark)] sm:text-[13px]">
                      {floatingBadge.title}
                    </p>
                    <p className="text-[11px] text-[var(--color-palette-64748b)]">
                      {floatingBadge.subtitle}
                    </p>
                  </div>
                </div>
              </FloatingCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}