"use client";

import { motion } from "motion/react";
import { LuBadgeCheck, LuFileText, LuFolder } from "react-icons/lu";
import { TiltCard } from "@/components/ui/tilt-card";
import type { FeatureDocIcon, FeaturesHeroContent } from "@/types/features";

interface DocumentsWindowProps {
  data: FeaturesHeroContent["documentsPanel"];
}

function DocRowIcon({ type }: { type: FeatureDocIcon }) {
  const iconClass = "h-4.5 w-4.5 text-[var(--color-brand-primary)]";
  if (type === "folder") return <LuFolder aria-hidden="true" className={iconClass} />;
  if (type === "certification") {
    return <LuBadgeCheck aria-hidden="true" className={iconClass} />;
  }
  return <LuFileText aria-hidden="true" className={iconClass} />;
}

export function DocumentsWindow({ data }: DocumentsWindowProps) {
  return (
    <TiltCard maxTilt={1.6}>
      <div className="overflow-hidden rounded-2xl border border-slate-200/85 bg-white shadow-[0_24px_60px_-15px_rgba(15,23,42,0.12)] transition-[border-color,box-shadow] duration-500 ease-out hover:border-[var(--color-brand-primary)]/35 hover:shadow-[0_32px_72px_-16px_rgba(55,198,80,0.18)] sm:rounded-3xl">
        {/* Top macOS Window Bar */}
        <div className="flex items-center gap-3 border-b border-slate-100 bg-[var(--color-palette-fafbfb)] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200 transition-colors duration-300 hover:bg-[var(--color-brand-primary)]/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200 transition-colors duration-300 hover:bg-[var(--color-brand-primary)]/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200 transition-colors duration-300 hover:bg-[var(--color-brand-primary)]/60" />
          </div>
          <span className="text-xs font-medium text-[var(--color-palette-64748b)]">
            {data.windowTitle}
          </span>
        </div>

        {/* Window Content */}
        <div className="p-4 sm:p-6">
          {/* Header + Upload Outlined Button */}
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-bold text-[var(--color-surface-dark)] sm:text-lg">
              {data.panelHeading}
            </h2>
            <span className="inline-flex items-center rounded-xl border border-[var(--color-surface-dark)]/65 bg-white px-4 py-1.5 text-xs font-semibold text-[var(--color-surface-dark)] transition-colors duration-200 hover:bg-slate-50">
              {data.uploadLabel}
            </span>
          </div>

          {/* Document Registry Rows */}
          <div className="mt-4 space-y-2.5">
            {data.rows.map((row) => {
              const isValid = row.statusTone === "valid";

              return (
                <motion.div
                  key={row.id}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white px-3.5 py-3 shadow-2xs transition-[border-color,background-color] duration-300 hover:border-[var(--color-brand-primary)]/35 hover:bg-[var(--color-palette-f9fdfb)] sm:px-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-tint)]">
                      <DocRowIcon type={row.icon} />
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

                  {/* Status + Version Badges */}
                  <div className="flex shrink-0 items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        isValid
                          ? "bg-[var(--color-brand-tint)] text-[var(--color-brand-primary-dark)]"
                          : "bg-slate-100 text-[var(--color-palette-475569)]"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 rounded-full ${
                          isValid ? "bg-[var(--color-brand-primary)]" : "bg-slate-400"
                        }`}
                      />
                      {row.statusLabel}
                    </span>

                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-[var(--color-palette-64748b)]">
                      {row.version}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}