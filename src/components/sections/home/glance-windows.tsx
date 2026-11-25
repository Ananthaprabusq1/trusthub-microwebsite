"use client";

import { motion } from "motion/react";
import { LuBadgeCheck, LuFileText, LuFolder } from "react-icons/lu";
import { TiltCard } from "@/components/ui/tilt-card";
import type {
  DashboardRowIcon,
  GlanceStatusTone,
  HomeGlanceContent,
} from "@/types/home";

function GlanceRowIcon({ type }: { type: DashboardRowIcon }) {
  const iconClass = "h-4.5 w-4.5 text-[var(--color-brand-primary)]";
  if (type === "folder") {
    return <LuFolder aria-hidden="true" className={iconClass} />;
  }
  if (type === "policy") {
    return <LuFileText aria-hidden="true" className={iconClass} />;
  }
  return <LuBadgeCheck aria-hidden="true" className={iconClass} />;
}

function StatusPill({
  label,
  tone,
}: {
  label: string;
  tone: GlanceStatusTone;
}) {
  const isPositive = tone === "approved" || tone === "public";

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        isPositive
          ? "bg-[var(--color-brand-tint)] text-[var(--color-brand-primary-dark)]"
          : "bg-slate-100 text-[var(--color-palette-475569)]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${
          isPositive ? "bg-[var(--color-brand-primary)]" : "bg-slate-400"
        }`}
      />
      {label}
    </span>
  );
}

export function GlanceManagementWindow({
  data,
}: {
  data: HomeGlanceContent["managementRow"]["window"];
}) {
  return (
    <TiltCard maxTilt={1.6}>
      <div className="overflow-hidden rounded-2xl border border-slate-200/85 bg-white shadow-[0_24px_60px_-15px_rgba(15,23,42,0.12)] transition-[border-color,box-shadow] duration-500 ease-out hover:border-[var(--color-brand-primary)]/35 hover:shadow-[0_32px_72px_-16px_rgba(55,198,80,0.18)] sm:rounded-3xl">
        {/* Top macOS Bar */}
        <div className="flex items-center gap-3 border-b border-slate-100 bg-[var(--color-palette-fafbfb)] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          </div>
          <span className="text-xs font-medium text-[var(--color-palette-64748b)]">
            {data.windowTitle}
          </span>
        </div>

        {/* Window Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-[190px_1fr]">
          {/* Sidebar */}
          <aside
            aria-label="Management dashboard preview menu"
            className="border-b border-slate-100 bg-[var(--color-palette-f9fafb)] p-3.5 sm:border-r sm:border-b-0 sm:p-4"
          >
            <p className="px-2 text-[10px] font-semibold tracking-wider text-[var(--color-palette-94a3b8)] uppercase">
              {data.sidebarHeading}
            </p>

            <ul className="mt-2 flex gap-1.5 overflow-x-auto pb-1 sm:flex-col sm:space-y-1 sm:overflow-visible sm:pb-0">
              {data.sidebarItems.map((item) => (
                <li key={item.id} className="shrink-0">
                  <div
                    className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
                      item.active
                        ? "bg-[var(--color-brand-tint)] font-semibold text-[var(--color-surface-dark)]"
                        : "text-[var(--color-palette-64748b)]"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 rounded-full ${
                        item.active ? "bg-[var(--color-brand-primary)]" : "bg-slate-300"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main Request List */}
          <div className="p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-[var(--color-surface-dark)] sm:text-base">
                {data.panelHeading}
              </h3>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-[var(--color-palette-64748b)]">
                {data.actionPillLabel}
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              {data.rows.map((row) => (
                <motion.div
                  key={row.id}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white px-3.5 py-3 shadow-2xs transition-[border-color,background-color] duration-300 hover:border-[var(--color-brand-primary)]/35 hover:bg-[var(--color-palette-f9fdfb)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-tint)]">
                      <GlanceRowIcon type={row.icon} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[var(--color-surface-dark)] sm:text-[13px]">
                        {row.title}
                      </p>
                      <p className="text-[11px] text-[var(--color-palette-64748b)]">
                        {row.subtitle}
                      </p>
                    </div>
                  </div>

                  <StatusPill label={row.statusLabel} tone={row.statusTone} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

export function GlanceTrustCenterWindow({
  data,
}: {
  data: HomeGlanceContent["trustCenterRow"]["window"];
}) {
  return (
    <div className="rounded-3xl bg-[var(--color-palette-f3f5f8)] p-3.5 sm:p-5">
      <TiltCard maxTilt={1.6}>
        <div className="overflow-hidden rounded-2xl border border-slate-200/85 bg-white shadow-[0_24px_60px_-15px_rgba(15,23,42,0.12)] transition-[border-color,box-shadow] duration-500 ease-out hover:border-[var(--color-brand-primary)]/35 hover:shadow-[0_32px_72px_-16px_rgba(55,198,80,0.18)] sm:rounded-3xl">
          {/* Top macOS Bar */}
          <div className="flex items-center gap-3 border-b border-slate-100 bg-[var(--color-palette-fafbfb)] px-4 py-3 sm:px-6">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            </div>
            <span className="text-xs font-medium text-[var(--color-palette-64748b)]">
              {data.windowTitle}
            </span>
          </div>

          {/* Organization Header */}
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-white px-5 py-3.5 sm:px-6">
            <span className="text-xs font-bold text-[var(--color-surface-dark)] sm:text-sm">
              {data.organizationName}
            </span>

            <span className="inline-flex items-center rounded-xl bg-[var(--color-brand-primary)] px-3.5 py-1.5 text-xs font-semibold text-white shadow-2xs transition-colors duration-200 hover:bg-[var(--color-brand-primary-hover)]">
              {data.ctaLabel}
            </span>
          </div>

          {/* Mint Security & Compliance Banner */}
          <div className="bg-[var(--color-palette-ecf9f0)] px-5 py-5 sm:px-6 sm:py-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-palette-d8f3e0)] px-2.5 py-1 text-[11px] font-semibold text-[var(--color-brand-primary-dark)]">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-primary)]"
              />
              {data.verifiedBadgeLabel}
            </span>

            <h3 className="mt-2.5 text-lg font-extrabold tracking-tight text-[var(--color-surface-dark)] sm:text-xl">
              {data.bannerHeading}
            </h3>

            <p className="mt-1 text-xs text-[var(--color-text-secondary)] sm:text-[13px]">
              {data.bannerSubtitle}
            </p>
          </div>

          {/* Published & Restricted Rows */}
          <div className="space-y-2.5 bg-white p-4 sm:p-5">
            {data.rows.map((row) => (
              <motion.div
                key={row.id}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white px-3.5 py-3 shadow-2xs transition-[border-color,background-color] duration-300 hover:border-[var(--color-brand-primary)]/35 hover:bg-[var(--color-palette-f9fdfb)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-tint)]">
                    <GlanceRowIcon type={row.icon} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--color-surface-dark)] sm:text-[13px]">
                      {row.title}
                    </p>
                    <p className="text-[11px] text-[var(--color-palette-64748b)]">{row.subtitle}</p>
                  </div>
                </div>

                <StatusPill label={row.statusLabel} tone={row.statusTone} />
              </motion.div>
            ))}
          </div>
        </div>
      </TiltCard>
    </div>
  );
}