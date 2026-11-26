"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  LuArrowRight,
  LuArrowUpRight,
  LuChevronDown,
} from "react-icons/lu";
import { MagneticWrap } from "@/components/ui/magnetic-wrap";
import { isNavItemActive } from "@/lib/navigation";
import type { HeaderActionItem, NavItem } from "@/types/navigation";
import { useGetStartedTransition } from "@/context/get-started-transition-context";

interface DesktopNavigationProps {
  items: NavItem[];
  actions: HeaderActionItem[];
}

export function DesktopNavigation({ items, actions }: DesktopNavigationProps) {
  const pathname = usePathname();
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [hoveredSubId, setHoveredSubId] = useState<string | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const { mode, triggerTransition } = useGetStartedTransition();

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownId(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSamePageHashScroll = (href: string) => {
    setOpenDropdownId(null);
    const [targetPath, hash] = href.split("#");
    if (!hash) return;

    const normalizedTarget = targetPath || pathname;
    if (normalizedTarget === pathname) {
      const targetEl = document.getElementById(hash);
      if (targetEl) {
        window.history.pushState(null, "", href);
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div
      ref={navContainerRef}
      className="hidden items-center gap-8 xl:flex"
    >
      {/* Center Links */}
      <nav
        aria-label="Primary"
        onMouseLeave={() => setHoveredItemId(null)}
        className="flex items-center gap-2 lg:gap-3"
      >
        {items.map((item) => {
          const subItems = item.children ?? [];
          const hasChildren = subItems.length > 0;
          const isDropdownOpen = openDropdownId === item.id;
          const isActive = isNavItemActive(pathname, item.href);
          const isHovered = hoveredItemId === item.id;

          if (!hasChildren) {
            return (
              <Link
                key={item.id}
                href={item.href}
                onMouseEnter={() => setHoveredItemId(item.id)}
                className={`group relative rounded-full px-4 py-2 text-[15px] transition-colors duration-200 ${
                  isActive
                    ? "font-semibold text-[var(--color-text-primary)]"
                    : "font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                {!isActive && isHovered && (
                  <motion.span
                    layoutId="desktop-nav-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-slate-100/90"
                  />
                )}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="pointer-events-none absolute inset-x-4 bottom-0 h-[3px] rounded-full bg-[var(--color-brand-primary)]"
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          }

          return (
            <div
              key={item.id}
              onMouseEnter={() => {
                setHoveredItemId(item.id);
                setOpenDropdownId(item.id);
              }}
              onMouseLeave={() => setOpenDropdownId(null)}
              className="relative"
            >
              <Link
                href={item.href}
                onClick={() => setOpenDropdownId(null)}
                className={`group relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[15px] transition-colors duration-200 ${
                  isActive
                    ? "font-semibold text-[var(--color-text-primary)]"
                    : "font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                {!isActive && isHovered && (
                  <motion.span
                    layoutId="desktop-nav-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-slate-100/90"
                  />
                )}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="pointer-events-none absolute inset-x-4 bottom-0 h-[3px] rounded-full bg-[var(--color-brand-primary)]"
                  />
                )}
                <span className="relative z-10">{item.label}</span>
                <button
                  type="button"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="menu"
                  aria-label={`Toggle ${item.label} submenu`}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenDropdownId(isDropdownOpen ? null : item.id);
                  }}
                  className="relative z-10 cursor-pointer"
                >
                  <LuChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isDropdownOpen
                        ? "rotate-180 text-[var(--color-brand-primary)]"
                        : ""
                    }`}
                  />
                </button>
              </Link>

              {/* Animated 10-Capability Mega Dropdown */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    onMouseLeave={() => setHoveredSubId(null)}
                    className="absolute top-full left-1/2 z-50 w-[580px] -translate-x-1/2 pt-3"
                  >
                    <ul className="grid grid-cols-2 gap-1.5 rounded-2xl border border-slate-200/90 bg-white/95 p-3.5 shadow-[0_24px_60px_-15px_rgba(15,23,42,0.16)] backdrop-blur-xl">
                      {subItems.map((subItem, idx) => {
                        const isSubHovered = hoveredSubId === subItem.id;

                        return (
                          <li
                            key={subItem.id}
                            onMouseEnter={() => setHoveredSubId(subItem.id)}
                          >
                            <Link
                              href={subItem.href}
                              onClick={() =>
                                handleSamePageHashScroll(subItem.href)
                              }
                              className="relative flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold text-[var(--color-palette-1e293b)] transition-colors hover:text-[var(--color-brand-primary-dark)]"
                            >
                              {isSubHovered && (
                                <motion.span
                                  layoutId="desktop-dropdown-highlight"
                                  transition={{
                                    type: "spring",
                                    stiffness: 420,
                                    damping: 34,
                                  }}
                                  className="absolute inset-0 rounded-xl bg-[var(--color-brand-tint-soft)]"
                                />
                              )}

                              <span className="relative z-10 flex items-center gap-2.5">
                                <span
                                  className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[10.5px] font-bold transition-colors duration-200 ${
                                    isSubHovered
                                      ? "bg-[var(--color-brand-primary)] text-white shadow-[0_4px_12px_-2px_rgba(55,198,80,0.45)]"
                                      : "bg-[var(--color-brand-tint)] text-[var(--color-brand-primary-dark)]"
                                  }`}
                                >
                                  {String(idx + 1).padStart(2, "0")}
                                </span>
                                <span className="flex flex-col">
                                  <span>{subItem.label}</span>
                                  {subItem.description && (
                                    <span className="mt-0.5 text-[11px] font-normal text-slate-500">
                                      {subItem.description}
                                    </span>
                                  )}
                                </span>
                              </span>

                              <LuArrowUpRight
                                aria-hidden="true"
                                className={`relative z-10 h-3.5 w-3.5 shrink-0 text-[var(--color-brand-primary)] transition-all duration-200 ${
                                  isSubHovered
                                    ? "translate-x-0 translate-y-0 opacity-100"
                                    : "-translate-x-1 translate-y-1 opacity-0"
                                }`}
                              />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Right Header Actions */}
      <div className="flex items-center gap-5">
        {actions.map((action) => {
          if (action.variant === "primary") {
            return (
              <MagneticWrap key={action.id} strength={0.22}>
                <motion.button
                  type="button"
                  layoutId={
                    mode === "layout-morph" && pathname !== action.href
                      ? "get-started-morph"
                      : undefined
                  }
                  onClick={(e) => triggerTransition(e, action.href)}
                  className="group inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full bg-[var(--color-brand-primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_-6px_rgba(55,198,80,0.48)] transition-colors hover:bg-[var(--color-brand-primary-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
                >
                  <span>{action.label}</span>
                  {(action.showArrow ?? true) && (
                    <LuArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  )}
                </motion.button>
              </MagneticWrap>
            );
          }

          return (
            <Link
              key={action.id}
              href={action.href}
              onClick={
                action.href.endsWith("/login")
                  ? (event) =>
                      triggerTransition(event, action.href, "login-slider")
                  : undefined
              }
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[var(--color-text-primary)]/[0.05] px-5 text-sm font-semibold text-[var(--color-text-primary)] transition-all duration-200  hover:bg-[var(--color-text-primary)] hover:text-white hover:shadow-md active:translate-y-0 active:bg-[var(--color-surface-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
            >
              <span>{action.label}</span>
              <LuArrowRight className="h-4 w-4 text-[var(--color-brand-primary-dark)] transition-all duration-200 group-hover:translate-x-1 group-hover:text-[var(--color-brand-primary)]" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
