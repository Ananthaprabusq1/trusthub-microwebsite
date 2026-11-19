"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { LuArrowRight, LuX } from "react-icons/lu";
import { StakfloBrandMark } from "@/components/ui/stakflo-brand-mark";
import { notifyHashChange, useActiveHash } from "@/hooks/use-active-hash";
import type { HeaderActionItem, NavItem } from "@/types/navigation";
import { MobileNavItem } from "./mobile-nav-item";

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

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
  const activeHash = useActiveHash();
  const [expandedId, setExpandedId] = useState<string | null>(
    pathname.startsWith("/features") ? "features" : null
  );

  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose(true);
        return;
      }

      if (event.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleToggleExpand = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const handleLinkSelect = useCallback(
    (isHashLink = false) => {
      onClose(false);
      if (isHashLink) {
        notifyHashChange();
      }
    },
    [onClose]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={drawerRef}
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.26, ease: smoothEase }}
          className="fixed inset-0 z-50 flex h-dvh w-full flex-col overflow-y-auto bg-white lg:hidden"
        >
          {/* Top Brand + Rounded Square Close Button */}
          <div className="flex h-20 shrink-0 items-center justify-between px-5 sm:px-6">
            <Link
              href="/"
              onClick={() => handleLinkSelect(false)}
              className="inline-flex items-center gap-3 rounded-xl focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:outline-none"
            >
              <StakfloBrandMark
                src={logoSrc}
                alt={logoAlt}
                width={34}
                height={34}
                className="h-8.5 w-8.5 shrink-0 object-contain"
              />
              <span className="flex items-center gap-2 text-[17px] font-semibold tracking-tight text-[#111827]">
                <span>{brandName}</span>
                <span aria-hidden="true" className="font-normal text-slate-300">
                  |
                </span>
                <span>{brandProduct}</span>
              </span>
            </Link>

            <motion.button
              ref={closeButtonRef}
              type="button"
              whileTap={{ scale: 0.94 }}
              aria-label="Close navigation menu"
              onClick={() => onClose(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/90 bg-white text-[#111827] transition-colors duration-200 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:outline-none"
            >
              <LuX aria-hidden="true" className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Primary Navigation List */}
          <nav
            aria-label="Mobile Primary Navigation"
            className="flex-1 px-5 pt-2 pb-6"
          >
            <ul className="space-y-1.5">
              {items.map((item, index) => (
                <MobileNavItem
                  key={item.id}
                  item={item}
                  index={index}
                  pathname={pathname}
                  activeHash={activeHash}
                  isExpanded={expandedId === item.id}
                  onToggleExpand={handleToggleExpand}
                  onSelectLink={handleLinkSelect}
                />
              ))}
            </ul>
          </nav>

          {/* Bottom Full-Width CTA Area */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26, delay: 0.08, ease: smoothEase }}
            className="mt-auto shrink-0 px-5 pt-4 pb-7"
          >
            <div className="flex flex-col gap-3">
              {actions.map((action) => {
                if (action.variant === "primary") {
                  return (
                    <motion.div key={action.id} whileTap={{ scale: 0.985 }}>
                      <Link
                        href={action.href}
                        onClick={() => handleLinkSelect(false)}
                        className="inline-flex min-h-13.5 w-full items-center justify-center gap-2.5 rounded-2xl bg-[#28B446] px-6 py-4 text-[17px] font-semibold text-white shadow-md shadow-[#28B446]/20 transition-colors duration-200 hover:bg-[#229A3C] focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:outline-none"
                      >
                        <span>{action.label}</span>
                        <LuArrowRight aria-hidden="true" className="h-5 w-5" />
                      </Link>
                    </motion.div>
                  );
                }

                return (
                  <Link
                    key={action.id}
                    href={action.href}
                    onClick={() => handleLinkSelect(false)}
                    className="inline-flex min-h-11 w-full items-center justify-center rounded-2xl px-5 py-2.5 text-[16px] font-semibold text-[#4B5563] transition-colors duration-200 hover:bg-slate-50 hover:text-[#111827] focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:outline-none"
                  >
                    {action.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}