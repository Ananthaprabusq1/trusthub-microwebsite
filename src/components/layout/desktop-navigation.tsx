"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import { isNavItemActive } from "@/lib/navigation";
import type { HeaderActionItem, NavItem } from "@/types/navigation";
import { DesktopDropdown } from "./desktop-dropdown";

interface DesktopNavigationProps {
  items: NavItem[];
  actions: HeaderActionItem[];
}

export function DesktopNavigation({ items, actions }: DesktopNavigationProps) {
  const pathname = usePathname();
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const handleOpen = useCallback((id: string) => {
    setOpenDropdownId(id);
  }, []);

  const handleClose = useCallback(() => {
    setOpenDropdownId(null);
  }, []);

  const handleToggle = useCallback((id: string) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-between lg:pl-12">
      {/* Center Primary Navigation */}
      <nav aria-label="Main Navigation" className="mx-auto">
        <ul className="flex items-center gap-2">
          {items.map((item) => {
            const hasChildren = Boolean(item.children && item.children.length > 0);
            const isActive = isNavItemActive(pathname, item.href);

            if (!hasChildren) {
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`inline-flex items-center rounded-full px-5 py-2 text-[15px] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28B446] ${
                      isActive
                        ? "bg-[#E8F5EC] text-[#111827]"
                        : "text-[#4B5563] hover:bg-slate-50 hover:text-[#111827]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }

            return (
              <li key={item.id} className="relative">
                <DesktopDropdown
                  item={item}
                  pathname={pathname}
                  isActive={isActive}
                  isOpen={openDropdownId === item.id}
                  onOpen={handleOpen}
                  onClose={handleClose}
                  onToggle={handleToggle}
                />
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Right CTA Actions */}
      <div className="flex items-center gap-6">
        {actions.map((action) => {
          if (action.variant === "primary") {
            return (
              <Link
                key={action.id}
                href={action.href}
                className="group inline-flex items-center gap-2 rounded-xl bg-[#28B446] px-5 py-2.5 text-[15px] font-semibold text-white shadow-xs transition-all duration-200 hover:bg-[#229A3C] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28B446]"
              >
                <span>{action.label}</span>
                <LuArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            );
          }

          return (
            <Link
              key={action.id}
              href={action.href}
              className="rounded-lg px-2 py-1.5 text-[15px] font-medium text-[#4B5563] transition-colors duration-200 hover:text-[#111827] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28B446]"
            >
              {action.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}