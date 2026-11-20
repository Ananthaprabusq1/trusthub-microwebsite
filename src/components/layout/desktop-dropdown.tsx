"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  type KeyboardEvent,
} from "react";
import { LuChevronDown } from "react-icons/lu";
// import { notifyHashChange, useActiveHash } from "@/hooks/use-active-hash";
import { isSubItemActive } from "@/lib/navigation";
import type { NavItem } from "@/types/navigation";
import { notifyHashChange, useActiveHash } from "@/hooks/use-active-hash";

interface DesktopDropdownProps {
  item: NavItem;
  pathname: string;
  isActive: boolean;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
  onToggle: (id: string) => void;
}

export function DesktopDropdown({
  item,
  pathname,
  isActive,
  isOpen,
  onOpen,
  onClose,
  onToggle,
}: DesktopDropdownProps) {
  const activeHash = useActiveHash();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const submenuItemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const children = item.children ?? [];

  const clearCloseTimer = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const closeWithFocus = useCallback(
    (restoreFocus: boolean) => {
      onClose();
      if (restoreFocus) {
        triggerRef.current?.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) {
      return () => clearCloseTimer();
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeWithFocus(false);
      }
    }

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeWithFocus(true);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      clearCloseTimer();
    };
  }, [isOpen, closeWithFocus, clearCloseTimer]);

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      onOpen(item.id);
      requestAnimationFrame(() => {
        submenuItemRefs.current[0]?.focus();
      });
    } else if (event.key === "ArrowUp" && children.length > 0) {
      event.preventDefault();
      onOpen(item.id);
      requestAnimationFrame(() => {
        submenuItemRefs.current[children.length - 1]?.focus();
      });
    }
  };

  const handleSubmenuKeyDown = (
    event: KeyboardEvent<HTMLAnchorElement>,
    index: number
  ) => {
    const total = children.length;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      submenuItemRefs.current[(index + 1) % total]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      submenuItemRefs.current[(index - 1 + total) % total]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      submenuItemRefs.current[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      submenuItemRefs.current[total - 1]?.focus();
    }
  };

  const handleSubItemClick = () => {
    onClose();
    notifyHashChange();
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        clearCloseTimer();
        onOpen(item.id);
      }}
      onMouseLeave={() => {
        closeTimeoutRef.current = setTimeout(() => {
          onClose();
        }, 150);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={`desktop-submenu-${item.id}`}
        onClick={() => onToggle(item.id)}
        onKeyDown={handleTriggerKeyDown}
        className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-[15px] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#37C650] ${
          isActive || isOpen
            ? "bg-[#E8F5EC] text-[#111827]"
            : "text-[#4B5563] hover:bg-slate-50 hover:text-[#111827]"
        }`}
      >
        <span>{item.label}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center"
        >
          <LuChevronDown
            aria-hidden="true"
            className={`h-4 w-4 ${
              isOpen ? "text-[#111827]" : "text-[#4B5563]"
            }`}
          />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`desktop-submenu-${item.id}`}
            role="region"
            aria-label={`${item.label} sections`}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top left" }}
            className="absolute left-0 top-full z-50 mt-2 w-72 rounded-2xl border border-slate-200/90 bg-white p-2 shadow-xl shadow-slate-900/8"
          >
            <ul className="space-y-1">
              {children.map((subItem, index) => {
                const subActive = isSubItemActive(
                  pathname,
                  activeHash,
                  subItem.href
                );

                return (
                  <li key={subItem.id}>
                    <Link
                      ref={(el) => {
                        submenuItemRefs.current[index] = el;
                      }}
                      href={subItem.href}
                      aria-current={subActive ? "location" : undefined}
                      onClick={handleSubItemClick}
                      onKeyDown={(e) => handleSubmenuKeyDown(e, index)}
                      className={`flex flex-col rounded-xl px-3.5 py-2.5 text-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#37C650] ${
                        subActive
                          ? "bg-[#E8F5EC] font-medium text-[#111827]"
                          : "text-[#4B5563] hover:bg-[#F3FAF5] hover:text-[#111827]"
                      }`}
                    >
                      <span>{subItem.label}</span>
                      {subItem.description && (
                        <span className="mt-0.5 text-xs text-slate-500">
                          {subItem.description}
                        </span>
                      )}
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
}