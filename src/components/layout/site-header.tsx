import Link from "next/link";
import rawNavigationConfig from "@/data/navigation.json";
import {
  getVisibleHeaderActions,
  getVisibleNavItems,
} from "@/lib/navigation";
import type { NavigationConfig } from "@/types/navigation";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";
import { StakfloBrandMark } from "../ui/stakflo-brand-mark";

const navigationConfig = rawNavigationConfig as NavigationConfig;


export function SiteHeader() {
  const navItems = getVisibleNavItems(navigationConfig);
  const headerActions = getVisibleHeaderActions(navigationConfig);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo + Wordmark */}
        <Link
          href={navigationConfig.brand.href}
          className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28B446]"
        >
          <StakfloBrandMark
            src={navigationConfig.brand.logoSrc}
            alt={navigationConfig.brand.logoAlt}
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 object-contain"
            priority
          />
          <span className="flex items-center gap-2 text-lg font-semibold tracking-tight text-[#111827] sm:text-[19px]">
            <span>{navigationConfig.brand.name}</span>
            <span aria-hidden="true" className="font-normal text-slate-300">
              |
            </span>
            <span>{navigationConfig.brand.product}</span>
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
    </header>
  );
}