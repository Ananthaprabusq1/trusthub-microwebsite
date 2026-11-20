"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  LuArrowRight,
  LuChevronDown,
  LuMenu,
  LuShieldCheck,
  LuX,
} from "react-icons/lu";
import navigationData from "@/data/navigation.json";
import type { NavigationContent } from "@/types/navigation";
import { MobileNavDrawer } from "./mobile-nav-drawer";

interface NavbarProps {
  content?: NavigationContent;
}

export function Navbar({
  content = navigationData as NavigationContent,
}: NavbarProps) {
  const pathname = usePathname();
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  const visibleItems = content.items
    .filter((item) => item.visible)
    .sort((a, b) => a.order - b.order);

  const visibleActions = content.actions
    .filter((action) => action.visible)
    .sort((a, b) => a.order - b.order);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdownId(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSamePageHashScroll = (href: string) => {
    setOpenDropdownId(null);
    const [targetPath, hash] = href.split("#");
    if (!hash) return;

    const normalizedTarget = targetPath || pathname;
    if (normalizedTarget === pathname) {
      const element = document.getElementById(hash);
      if (element) {
        window.history.pushState(null, "", href);
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-40 border-b border-slate-200/75 bg-white/90 backdrop-blur-md"
    >
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href={content.brand.href}
          className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#37C650]"
        >
          {!logoError ? (
            <Image
              src={content.brand.logoSrc}
              alt={content.brand.logoAlt}
              width={132}
              height={32}
              priority
              onError={() => setLogoError(true)}
              className="h-8 w-auto object-contain"
            />
          ) : (
            <span className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#37C650] text-white">
                <LuShieldCheck className="h-4.5 w-4.5" />
              </span>
              <span className="text-base font-extrabold tracking-tight text-[#111827]">
                {content.brand.name}{" "}
                <span className="text-[#37C650]">{content.brand.product}</span>
              </span>
            </span>
          )}
        </Link>

        {/* Desktop Nav Links + Features Dropdown */}
        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {visibleItems.map((item) => {
            const children = (item.children ?? [])
              .filter((child) => child.visible)
              .sort((a, b) => a.order - b.order);
            const hasChildren = children.length > 0;
            const isDropdownOpen = openDropdownId === item.id;
            const isActive = pathname === item.href;

            if (!hasChildren) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-[#E8F5EC] text-[#15803D]"
                      : "text-[#334155] hover:bg-slate-100/80 hover:text-[#111827]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div
                key={item.id}
                onMouseEnter={() => setOpenDropdownId(item.id)}
                onMouseLeave={() => setOpenDropdownId(null)}
                className="relative"
              >
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    onClick={() => setOpenDropdownId(null)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      isActive || isDropdownOpen
                        ? "bg-[#E8F5EC] text-[#15803D]"
                        : "text-[#334155] hover:bg-slate-100/80 hover:text-[#111827]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <button
                      type="button"
                      aria-expanded={isDropdownOpen}
                      aria-haspopup="menu"
                      aria-label={`Toggle ${item.label} menu`}
                      onClick={(event) => {
                        event.preventDefault();
                        setOpenDropdownId((prev) =>
                          prev === item.id ? null : item.id
                        );
                      }}
                      className="cursor-pointer"
                    >
                      <LuChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isDropdownOpen ? "rotate-180 text-[#37C650]" : ""
                        }`}
                      />
                    </button>
                  </Link>
                </div>

                {/* 10 Capabilities Mega Dropdown */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-full left-1/2 z-50 w-[560px] -translate-x-1/2 pt-2.5"
                    >
                      <div className="rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-[0_24px_60px_-15px_rgba(15,23,42,0.16)]">
                        <div className="grid grid-cols-2 gap-1.5">
                          {children.map((child, idx) => (
                            <Link
                              key={child.id}
                              href={child.href}
                              onClick={() =>
                                handleSamePageHashScroll(child.href)
                              }
                              className="group flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold text-[#1E293B] transition-colors hover:bg-[#F2FBF4] hover:text-[#15803D]"
                            >
                              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#E8F5EC] text-[10.5px] font-bold text-[#15803D] transition-colors group-hover:bg-[#37C650] group-hover:text-white">
                                {String(idx + 1).padStart(2, "0")}
                              </span>
                              <span className="leading-snug">
                                {child.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          {visibleActions.map((action) => (
            <Link
              key={action.id}
              href={action.href}
              onClick={() => handleSamePageHashScroll(action.href)}
              className={
                action.variant === "primary"
                  ? "inline-flex items-center gap-1.5 rounded-full bg-[#37C650] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_-6px_rgba(55,198,80,0.45)] transition-colors hover:bg-[#2EB045] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#37C650]"
                  : "rounded-full px-4 py-2 text-sm font-semibold text-[#334155] transition-colors hover:bg-slate-100 hover:text-[#111827]"
              }
            >
              <span>{action.label}</span>
              {action.variant === "primary" && (
                <LuArrowRight className="h-4 w-4" />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-200 text-[#111827] hover:bg-slate-50 lg:hidden"
        >
          {mobileOpen ? (
            <LuX className="h-5 w-5" />
          ) : (
            <LuMenu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      <MobileNavDrawer
        isOpen={mobileOpen}
        pathname={pathname}
        items={visibleItems}
        actions={visibleActions}
        onClose={() => setMobileOpen(false)}
        onNavigateHref={handleSamePageHashScroll}
      />
    </header>
  );
}

export default Navbar;