"use client";

import { motion } from "motion/react";
import { LuBadgeCheck } from "react-icons/lu";
import { TiltCard } from "@/components/ui/tilt-card";
import type { FeaturesComplianceCredentialsContent } from "@/types/features";

interface ComplianceCredentialsWindowProps {
  data: FeaturesComplianceCredentialsContent["previewWindow"];
}

export function ComplianceCredentialsWindow({
  data,
}: ComplianceCredentialsWindowProps) {
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
          {/* Panel Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-[15px] font-bold tracking-tight text-[var(--color-surface-dark)] sm:text-base">
              {data.panelHeading}
            </h3>

            <span className="rounded-full border border-slate-200/90 bg-white px-3 py-1 text-[11px] font-medium text-[var(--color-palette-64748b)]">
              {data.headerPillLabel}
            </span>
          </div>

          {/* 2x2 Credential Cards Grid */}
          <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {data.cards.map((card) => (
              <motion.div
                key={card.id}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="group rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs transition-[border-color,background-color] duration-300 hover:border-[var(--color-brand-primary)]/40 hover:bg-[var(--color-palette-f9fdfb)]"
              >
                {/* Icon + Title & Subtitle */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand-tint)] transition-colors duration-300 group-hover:bg-[var(--color-palette-dcfce7)]">
                    <LuBadgeCheck
                      aria-hidden="true"
                      className="h-4.5 w-4.5 text-[var(--color-brand-primary)]"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[var(--color-surface-dark)] sm:text-[13.5px]">
                      {card.title}
                    </p>
                    <p className="text-[11px] text-[var(--color-palette-64748b)]">
                      {card.subtitle}
                    </p>
                  </div>
                </div>

                {/* Valid Status Pill */}
                <div className="mt-3.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-brand-tint)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--color-brand-primary-dark)]">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-primary)]"
                    />
                    {card.statusLabel}
                  </span>
                </div>

                {/* Issued & Expires Metadata Bars */}
                <div className="mt-3.5 space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="w-12 shrink-0 text-[11px] text-[var(--color-palette-64748b)]">
                      {card.issuedLabel}
                    </span>
                    <div
                      aria-hidden="true"
                      className="h-2 flex-1 rounded-full bg-slate-200/85"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="w-12 shrink-0 text-[11px] text-[var(--color-palette-64748b)]">
                      {card.expiresLabel}
                    </span>
                    <div
                      aria-hidden="true"
                      className="h-2 flex-1 rounded-full bg-slate-200/85"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}