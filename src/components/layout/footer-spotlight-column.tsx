"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LuArrowUpRight } from "react-icons/lu";
import type { FooterLinkItem } from "@/types/footer";

interface FooterSpotlightColumnProps {
  id: string;
  heading: string;
  links: FooterLinkItem[];
}

export function FooterSpotlightColumn({
  id,
  heading,
  links,
}: FooterSpotlightColumnProps) {
  const pathname = usePathname();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const isColumnActive = hoveredId !== null;

  const handleHashScroll = (href: string, external?: boolean) => {
    if (external) return;
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
    <nav aria-labelledby={`footer-heading-${id}`} className="flex flex-col">
      {/* Column Heading with Animated #37C650 Accent Bar */}
      <div className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className={`h-[2px] rounded-full bg-[#37C650] transition-all duration-300 ${
            isColumnActive ? "w-3.5 opacity-100" : "w-0 opacity-0"
          }`}
        />
        <h2
          id={`footer-heading-${id}`}
          className={`text-xs font-semibold tracking-wider uppercase transition-colors duration-200 ${
            isColumnActive ? "text-[#111827]" : "text-[#64748B]"
          }`}
        >
          {heading}
        </h2>
      </div>

      {/* Spotlight Links List */}
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => {
          const isHovered = hoveredId === link.id;
          const isDimmed = isColumnActive && !isHovered;

          return (
            <li
              key={link.id}
              onMouseEnter={() => setHoveredId(link.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Link
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={() => handleHashScroll(link.href, link.external)}
                className={`inline-flex items-center gap-1.5 rounded-md py-0.5 text-[15px] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#37C650] ${
                  isHovered
                    ? "translate-x-1.5 font-medium text-[#111827]"
                    : isDimmed
                      ? "text-[#374151]/45"
                      : "text-[#374151]"
                }`}
              >
                <motion.span
                  aria-hidden="true"
                  animate={{
                    scale: isHovered ? 1 : 0,
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{ duration: 0.16 }}
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#37C650]"
                />
                <span>{link.label}</span>
                <LuArrowUpRight
                  aria-hidden="true"
                  className={`h-3.5 w-3.5 shrink-0 text-[#37C650] transition-all duration-200 ${
                    isHovered
                      ? "translate-x-0 translate-y-0 opacity-100"
                      : "-translate-x-1 translate-y-1 opacity-0"
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}