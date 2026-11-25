"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import {
  LuBadgeCheck,
  LuFileText,
  LuFolder,
  LuLockOpen,
} from "react-icons/lu";
import { FloatingCard } from "@/components/ui/floating-card";
import { HeroStage } from "@/components/ui/hero-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import type {
  DashboardRowIcon,
  FloatingBadgeIcon,
  HomeHeroContent,
} from "@/types/home";

interface HeroDashboardMockupProps {
  dashboard: HomeHeroContent["dashboard"];
  isometricCard: HomeHeroContent["isometricCard"];
  floatingBadges: HomeHeroContent["floatingBadges"];
}

function RowIcon({ type }: { type: DashboardRowIcon }) {
  const iconClass = "h-4.5 w-4.5 text-[var(--color-brand-primary)]";
  if (type === "folder") return <LuFolder aria-hidden="true" className={iconClass} />;
  if (type === "certification") {
    return <LuBadgeCheck aria-hidden="true" className={iconClass} />;
  }
  return <LuFileText aria-hidden="true" className={iconClass} />;
}

function BadgeIcon({ type }: { type: FloatingBadgeIcon }) {
  const iconClass = "h-5 w-5 text-white";
  if (type === "access") {
    return <LuLockOpen aria-hidden="true" className={iconClass} />;
  }
  return <LuBadgeCheck aria-hidden="true" className={iconClass} />;
}

export function HeroDashboardMockup({
  dashboard,
  isometricCard,
  floatingBadges,
}: HeroDashboardMockupProps) {
  const [isoImgError, setIsoImgError] = useState(false);

  return (
    <div className="relative mx-auto mt-10 max-w-4xl sm:mt-14">
      {/* Center Card (Stage 4): Anchored Management Dashboard with Silky 3D Tilt */}
      <HeroStage stage={4} preset="scale">
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
                {dashboard.windowTitle}
              </span>
            </div>

            {/* Dashboard Body Grid */}
            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]">
              {/* Left Sidebar */}
              <aside
                aria-label="Dashboard preview navigation"
                className="border-b border-slate-100 bg-[var(--color-palette-f9fafb)] p-4 md:border-r md:border-b-0 md:p-5"
              >
                <p className="px-2 text-[10px] font-semibold tracking-wider text-[var(--color-palette-94a3b8)] uppercase">
                  {dashboard.sidebarHeading}
                </p>

                <ul className="mt-2.5 flex gap-1.5 overflow-x-auto pb-1 md:flex-col md:space-y-1 md:overflow-visible md:pb-0">
                  {dashboard.sidebarItems.map((item) => (
                    <li key={item.id} className="shrink-0">
                      <div
                        className={`flex items-center gap-2.5 rounded-full px-3.5 py-2 text-xs font-medium transition-colors duration-300 ${
                          item.active
                            ? "bg-[var(--color-brand-tint)] font-semibold text-[var(--color-surface-dark)]"
                            : "text-[var(--color-palette-64748b)] hover:bg-slate-100/80 hover:text-[var(--color-surface-dark)]"
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

              {/* Right Content Area */}
              <div className="p-4 sm:p-6 md:p-7">
                <h2 className="text-base font-bold text-[var(--color-surface-dark)] sm:text-lg">
                  {dashboard.panelHeading}
                </h2>

                {/* Interactive Access Request Rows */}
                <div className="mt-4 space-y-2.5">
                  {dashboard.rows.map((row) => (
                    <motion.div
                      key={row.id}
                      whileHover={{ x: 4 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 24,
                      }}
                      className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white px-3.5 py-3 shadow-2xs transition-[border-color,background-color,box-shadow] duration-300 ease-out hover:border-[var(--color-brand-primary)]/35 hover:bg-[var(--color-palette-f9fdfb)] hover:shadow-xs sm:px-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-tint)]">
                          <RowIcon type={row.icon} />
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

                      {row.statusLabel && (
                        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--color-brand-tint)] px-2.5 py-1 text-[11px] font-semibold text-[var(--color-brand-primary-dark)]">
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-primary)]"
                          />
                          {row.statusLabel}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Document Views Animated Bar Chart */}
                <div className="mt-4 rounded-xl bg-[var(--color-palette-f8fafc)] p-4">
                  <p className="text-xs font-semibold text-[var(--color-surface-dark)]">
                    {dashboard.chartHeading}
                  </p>

                  <div
                    className="mt-4 flex h-16 items-end gap-2.5 sm:gap-3.5"
                    aria-hidden="true"
                  >
                    {dashboard.chartBars.map((bar, index) => (
                      <motion.div
                        key={bar.id}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        whileHover={{
                          scaleY: 1.09,
                          transition: {
                            type: "spring",
                            stiffness: 280,
                            damping: 20,
                          },
                        }}
                        transition={{
                          duration: 0.68,
                          delay: 0.72 + index * 0.05,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{
                          height: `${bar.heightPercent}%`,
                          transformOrigin: "bottom",
                        }}
                        className={`w-6 rounded-t-md transition-colors duration-300 sm:w-7 ${
                          bar.highlighted
                            ? "bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary-hover)]"
                            : "bg-[var(--color-palette-a7e3b5)] hover:bg-[var(--color-palette-7ed494)]"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TiltCard>
      </HeroStage>

      {/* Small Card 1 (Stage 5): Top-Right Isometric Card */}
      {!isoImgError && (
        <HeroStage
          stage={5}
          preset="pop"
          className="hidden md:block md:absolute md:-top-10 md:-right-5 lg:-right-12"
        >
          <FloatingCard amplitude={7} duration={5.2} delay={1.35}>
            <div className="relative overflow-hidden rounded-2xl border border-white/85 bg-[linear-gradient(155deg,#F3FBF5_0%,#DCF3E3_52%,#9CE0AF_100%)] p-3 shadow-[0_20px_44px_-12px_rgba(22,101,52,0.22)] transition-[border-color,box-shadow] duration-500 ease-out hover:border-[var(--color-brand-primary)]/45 hover:shadow-[0_28px_56px_-12px_rgba(22,101,52,0.3)] lg:p-3.5">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-8 -left-6 h-24 w-48 rounded-full bg-[var(--color-brand-primary)]/25 blur-xl"
              />
              <Image
                src={isometricCard.src}
                alt={isometricCard.alt}
                width={260}
                height={195}
                onError={() => setIsoImgError(true)}
                className="relative z-10 h-auto w-52 object-contain lg:w-60"
              />
            </div>
          </FloatingCard>
        </HeroStage>
      )}

      {/* Small Cards 2 & 3 (Stage 6 & 6+): One-by-One Floating Status Toast Pills */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-0 lg:block">
        {floatingBadges.map((badge, index) => {
          const isLeft = badge.position === "bottom-left";
          const positionClasses = isLeft
            ? "lg:absolute lg:bottom-11 lg:-left-11"
            : "lg:absolute lg:bottom-4 lg:-right-8";

          return (
            <HeroStage
              key={badge.id}
              stage={6}
              preset="pop"
              delayOverride={0.86 + index * 0.16}
              className={positionClasses}
            >
              <FloatingCard
                amplitude={isLeft ? 5.5 : 6.5}
                duration={isLeft ? 4.6 : 5.4}
                delay={1.55 + index * 0.2}
              >
                <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-[0_14px_34px_-10px_rgba(15,23,42,0.14)] transition-[border-color,box-shadow] duration-500 ease-out hover:border-[var(--color-brand-primary)]/40 hover:shadow-[0_22px_44px_-10px_rgba(55,198,80,0.22)]">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand-primary)]">
                    <BadgeIcon type={badge.icon} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--color-surface-dark)] sm:text-[13px]">
                      {badge.title}
                    </p>
                    <p className="text-[11px] text-[var(--color-palette-64748b)]">
                      {badge.subtitle}
                    </p>
                  </div>
                </div>
              </FloatingCard>
            </HeroStage>
          );
        })}
      </div>
    </div>
  );
}