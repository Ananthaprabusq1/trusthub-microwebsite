"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { LuChevronDown } from "react-icons/lu";
import { isNavItemActive, isSubItemActive } from "@/lib/navigation";
import type { NavItem } from "@/types/navigation";

interface MobileNavItemProps {
  item: NavItem;
  index: number;
  pathname: string;
  activeHash: string;
  isExpanded: boolean;
  onToggleExpand: (id: string) => void;
  onSelectLink: (isHashLink?: boolean) => void;
}

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function MobileNavItem({
  item,
  index,
  pathname,
  activeHash,
  isExpanded,
  onToggleExpand,
  onSelectLink,
}: MobileNavItemProps) {
  const hasChildren = Boolean(item.children && item.children.length > 0);
  const isActive = isNavItemActive(pathname, item.href);

  if (!hasChildren) {
    return (
      <motion.li
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.24,
          delay: 0.03 * index,
          ease: smoothEase,
        }}
      >
        <Link
          href={item.href}
          aria-current={isActive ? "page" : undefined}
          onClick={() => onSelectLink(false)}
          className={`flex min-h-14 w-full items-center rounded-2xl px-5 py-3.5 text-[18px] font-semibold tracking-tight transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:outline-none ${
            isActive
              ? "bg-[#E8F5EC] text-[#111827]"
              : "text-[#18181B] hover:bg-slate-50"
          }`}
        >
          {item.label}
        </Link>
      </motion.li>
    );
  }

  const children = item.children ?? [];

  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.24,
        delay: 0.03 * index,
        ease: smoothEase,
      }}
    >
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={`mobile-submenu-${item.id}`}
        onClick={() => onToggleExpand(item.id)}
        className={`flex min-h-14 w-full items-center justify-between rounded-2xl px-5 py-3.5 text-left text-[18px] font-semibold tracking-tight transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:outline-none ${
          isActive
            ? "bg-[#E8F5EC] text-[#111827]"
            : "text-[#18181B] hover:bg-slate-50"
        }`}
      >
        <span>{item.label}</span>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.24, ease: smoothEase }}
          className="inline-flex items-center"
        >
          <LuChevronDown
            aria-hidden="true"
            className="h-5 w-5 text-[#4B5563]"
          />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={`mobile-submenu-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: smoothEase }}
            className="overflow-hidden"
          >
            <ul className="mt-1 ml-5 space-y-1 border-l-2 border-[#C8E6D0] pl-3.5 pb-1.5">
              {children.map((subItem) => {
                const subActive = isSubItemActive(
                  pathname,
                  activeHash,
                  subItem.href
                );

                return (
                  <li key={subItem.id}>
                    <Link
                      href={subItem.href}
                      aria-current={subActive ? "location" : undefined}
                      onClick={() => onSelectLink(true)}
                      className={`flex min-h-11 items-center rounded-xl px-3.5 py-2 text-[15px] transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:outline-none ${
                        subActive
                          ? "bg-[#E8F5EC] font-semibold text-[#111827]"
                          : "font-medium text-[#4B5563] hover:bg-[#F3FAF5] hover:text-[#111827]"
                      }`}
                    >
                      {subItem.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}