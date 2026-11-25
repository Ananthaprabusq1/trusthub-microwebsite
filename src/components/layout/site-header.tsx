"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import Link from "next/link";
import { useState } from "react";
import rawNavigationConfig from "@/data/navigation.json";
import {
  getVisibleHeaderActions,
  getVisibleNavItems,
} from "@/lib/navigation";
import type { NavigationConfig } from "@/types/navigation";
import { StakfloBrandMark } from "../ui/stakflo-brand-mark";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";

const navigationConfig = rawNavigationConfig as NavigationConfig;

export function SiteHeader() {
  const prefersReducedMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = getVisibleNavItems(navigationConfig);
  const headerActions = getVisibleHeaderActions(navigationConfig);

  const { scrollY, scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 14);
  });

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-all duration-300 ${
        isScrolled
          ? "border-slate-200/85 bg-white/90 shadow-[0_10px_30px_-15px_rgba(15,23,42,0.1)] backdrop-blur-lg"
          : "border-slate-100 bg-white/95 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo + Wordmark with Kinetic Hover */}
        <Link
          href={navigationConfig.brand.href}
          className="group inline-flex min-h-11 items-center gap-3 rounded-lg transition-transform duration-200 hover:scale-[1.015] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
        >
          <StakfloBrandMark
            src={navigationConfig.brand.logoSrc}
            alt={navigationConfig.brand.logoAlt}
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 object-contain transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"
            priority
          />
          <span className="flex items-center gap-2 text-lg font-semibold tracking-tight text-[var(--color-surface-dark)] sm:text-[19px]">
            <span>{navigationConfig.brand.name}</span>
            <span
              aria-hidden="true"
              className="font-normal text-slate-300 transition-colors duration-300 group-hover:text-[var(--color-brand-primary)]"
            >
              |
            </span>
            <span className="transition-colors duration-200 group-hover:text-[var(--color-brand-primary-dark)]">
              {navigationConfig.brand.product}
            </span>
          </span>
        </Link>

        {/* Desktop Navigation (lg and above) */}
        <DesktopNavigation items={navItems} actions={headerActions} />

        {/* Mobile Navigation (below lg) */}
        <MobileNavigation
          items={navItems}
          actions={headerActions}
          brandName={navigationConfig.brand.name}
          brandProduct={navigationConfig.brand.product}
          logoSrc={navigationConfig.brand.logoSrc}
          logoAlt={navigationConfig.brand.logoAlt}
        />
      </div>

      {/* Razor-Thin var(--color-brand-primary) Scroll Progress Indicator */}
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          style={{ scaleX: smoothProgress }}
          className="h-[2px] w-full origin-left bg-[var(--color-brand-primary)]"
        />
      )}
    </header>
  );
}
