"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  LuArrowRight,
  LuChevronDown,
  LuShieldCheck,
  LuX,
} from "react-icons/lu";
import type { HeaderActionItem, NavItem } from "@/types/navigation";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  items: NavItem[];
  actions: HeaderActionItem[];
  brandName?: string;
  brandProduct?: string;
  logoSrc?: string;
  logoAlt?: string;
  onNavigateHref?: (href: string) => void;
}

export function MobileNavDrawer({
  isOpen,
  onClose,
  pathname,
  items,
  actions,
  brandName = "Stakflo",
  brandProduct = "Trust Hub",
  logoSrc = "/images/stakflo-logo.png",
  logoAlt = "Stakflo Trust Hub logo",
  onNavigateHref,
}: MobileNavDrawerProps) {
  const [expandedId, setExpandedId] = useState<string | null>("features");
  const [logoError, setLogoError] = useState(false);

  const handleLinkClick = (href: string) => {
    onNavigateHref?.(href);
    const [targetPath, hash] = href.split("#");
    if (hash && (targetPath || pathname) === pathname) {
      const targetEl = document.getElementById(hash);
      if (targetEl) {
        window.history.pushState(null, "", href);
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
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
            onClick={onClose}
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
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-slate-200/80 px-5 py-4">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-2"
              >
                {!logoError ? (
                  <Image
                    src={logoSrc}
                    alt={logoAlt}
                    width={126}
                    height={30}
                    onError={() => setLogoError(true)}
                    className="h-7 w-auto object-contain"
                  />
                ) : (
                  <span className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#37C650] text-white">
                      <LuShieldCheck className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-extrabold text-[#111827]">
                      {brandName}{" "}
                      <span className="text-[#37C650]">{brandProduct}</span>
                    </span>
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-slate-200 text-[#4B5563] hover:bg-slate-50 hover:text-[#111827]"
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
                const isActive = pathname === item.href;

                if (!hasChildren) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => handleLinkClick(item.href)}
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
                        onClick={() => handleLinkClick(item.href)}
                        className={`text-sm font-semibold ${
                          isActive ? "text-[#37C650]" : "text-[#111827]"
                        }`}
                      >
                        {item.label}
                      </Link>

                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        aria-label={`Toggle ${item.label} submenu`}
                        onClick={() =>
                          setExpandedId((prev) =>
                            prev === item.id ? null : item.id
                          )
                        }
                        className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#4B5563] hover:bg-slate-200/60"
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
                        {subItems.map((subItem, idx) => (
                          <Link
                            key={subItem.id}
                            href={subItem.href}
                            onClick={() => handleLinkClick(subItem.href)}
                            className="flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-[#334155] transition-colors hover:bg-[#E8F5EC] hover:text-[#15803D]"
                          >
                            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#E8F5EC] text-[10px] font-bold text-[#15803D]">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            <span className="flex flex-col">
                              <span className="font-semibold">
                                {subItem.label}
                              </span>
                              {subItem.description && (
                                <span className="mt-0.5 text-[11px] text-slate-500">
                                  {subItem.description}
                                </span>
                              )}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Action Buttons */}
            <div className="space-y-2.5 border-t border-slate-200/80 p-4">
              {actions.map((action) => (
                <Link
                  key={action.id}
                  href={action.href}
                  onClick={() => handleLinkClick(action.href)}
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