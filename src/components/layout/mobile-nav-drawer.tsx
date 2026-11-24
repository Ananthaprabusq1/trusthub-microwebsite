"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { type MouseEvent, useState } from "react";
import {
  LuArrowRight,
  LuChevronDown,
  LuLayoutGrid,
  LuX,
} from "react-icons/lu";
import { StakfloBrandMark } from "@/components/ui/stakflo-brand-mark";
import { useGetStartedTransition } from "@/context/get-started-transition-context";
import { isNavItemActive } from "@/lib/navigation";
import type { HeaderActionItem, NavItem } from "@/types/navigation";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: (restoreFocus?: boolean) => void;
  pathname: string;
  items: NavItem[];
  actions: HeaderActionItem[];
  brandName: string;
  brandProduct: string;
  logoSrc: string;
  logoAlt: string;
}

export function MobileNavDrawer({
  isOpen,
  onClose,
  pathname,
  items,
  actions,
  brandName,
  brandProduct,
  logoSrc,
  logoAlt,
}: MobileNavDrawerProps) {
  const { triggerTransition } = useGetStartedTransition();
  const [expandedId, setExpandedId] = useState<string | null>("features");

  const handleNavLinkClick = (href: string) => {
    onClose(false);
    const [targetPath, hash] = href.split("#");
    const normalizedTarget = targetPath || pathname;

    if (normalizedTarget !== pathname) return;

    if (!hash) {
      window.history.pushState(null, "", normalizedTarget);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const targetEl = document.getElementById(hash);
    if (targetEl) {
      window.history.pushState(null, "", href);
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleActionClick = (
    event: MouseEvent<HTMLAnchorElement>,
    action: HeaderActionItem
  ) => {
    onClose(false);
    if (action.variant === "primary") {
      triggerTransition(event, action.href);
      return;
    }
    handleNavLinkClick(action.href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 lg:hidden"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onClose(true)}
            className="fixed inset-0 bg-slate-950/35 backdrop-blur-xs"
          />

          {/* Slide-over Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed inset-y-0 right-0 z-10 flex w-full max-w-sm flex-col bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <Link
                href="/"
                onClick={() => handleNavLinkClick("/")}
                className="inline-flex items-center gap-2.5"
              >
                <StakfloBrandMark
                  src={logoSrc}
                  alt={logoAlt}
                  width={30}
                  height={30}
                  className="h-7.5 w-7.5 shrink-0 object-contain"
                />
                <span className="text-base font-semibold text-[#111827]">
                  {brandName}{" "}
                  <span className="font-normal text-slate-300">|</span>{" "}
                  {brandProduct}
                </span>
              </Link>

              <button
                type="button"
                onClick={() => onClose(true)}
                aria-label="Close navigation menu"
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-slate-200 text-[#4B5563] hover:bg-slate-50"
              >
                <LuX className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 space-y-2 overflow-y-auto px-4 py-5">
              {items.map((item) => {
                const subItems = item.children ?? [];
                const hasChildren = subItems.length > 0;
                const isExpanded = expandedId === item.id;
                const isActive = isNavItemActive(pathname, item.href);

                if (!hasChildren) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => handleNavLinkClick(item.href)}
                      className={`block rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-[#E8F5EC] text-[#15803D]"
                          : "text-[#111827] hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-100 bg-[#FAFBFD]"
                  >
                    <div className="flex items-center justify-between px-3.5 py-2.5">
                      <Link
                        href={item.href}
                        onClick={() => handleNavLinkClick(item.href)}
                        className={`text-sm font-semibold ${
                          isActive ? "text-[#15803D]" : "text-[#111827]"
                        }`}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        aria-label={`Toggle ${item.label} submenu`}
                        onClick={() =>
                          setExpandedId(isExpanded ? null : item.id)
                        }
                        className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#4B5563]"
                      >
                        <LuChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isExpanded ? "rotate-180 text-[#37C650]" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="space-y-1 border-t border-slate-200/70 px-2.5 py-2.5">
                        <Link
                          href={item.href}
                          onClick={() => handleNavLinkClick(item.href)}
                          className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-2 text-xs font-bold text-[#15803D]"
                        >
                          <LuLayoutGrid className="h-3.5 w-3.5 text-[#37C650]" />
                          <span>Features Overview</span>
                        </Link>

                        {subItems.map((subItem, idx) => (
                          <Link
                            key={subItem.id}
                            href={subItem.href}
                            onClick={() => handleNavLinkClick(subItem.href)}
                            className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-[#334155] hover:bg-[#E8F5EC] hover:text-[#15803D]"
                          >
                            <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#E8F5EC] text-[10px] font-bold text-[#15803D]">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            <span>{subItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions (Log in + Get Started Transition) */}
            <div className="space-y-2.5 border-t border-slate-100 p-4">
              {actions.map((action) => (
                <Link
                  key={action.id}
                  href={action.href}
                  onClick={(e) => handleActionClick(e, action)}
                  className={`inline-flex w-full items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                    action.variant === "primary"
                      ? "bg-[#37C650] text-white shadow-[0_8px_20px_-6px_rgba(55,198,80,0.45)] hover:bg-[#2EB045]"
                      : "border border-slate-200 bg-white text-[#111827] hover:bg-slate-50"
                  }`}
                >
                  <span>{action.label}</span>
                  {action.variant === "primary" &&
                    (action.showArrow ?? true) && (
                      <LuArrowRight className="h-4 w-4" />
                    )}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}