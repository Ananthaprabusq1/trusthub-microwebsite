"use client";

import Link from "next/link";
import { StakfloBrandMark } from "@/components/ui/stakflo-brand-mark";
import rawFooterConfig from "@/data/footer.json";
import {
  getVisibleFooterColumns,
  getVisibleLegalLinks,
} from "@/lib/footer";
import type { FooterConfig } from "@/types/footer";
import { FooterSpotlightColumn } from "./footer-spotlight-column";

const footerConfig = rawFooterConfig as FooterConfig;

export function SiteFooter() {
  const columns = getVisibleFooterColumns(footerConfig);
  const legalLinks = getVisibleLegalLinks(footerConfig);

  return (
    <footer className="border-t border-slate-100 bg-white text-[#111827]">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-10 sm:px-6 lg:px-8 lg:pt-20">
        {/* Top Multi-Column Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.85fr_1.15fr_0.8fr] lg:gap-8">
          {/* Brand & Platform Summary */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href={footerConfig.brand.href}
              className="group inline-flex items-center gap-3 rounded-lg transition-transform duration-200 hover:scale-[1.015] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#37C650]"
            >
              <StakfloBrandMark
                src={footerConfig.brand.logoSrc}
                alt={footerConfig.brand.logoAlt}
                width={32}
                height={32}
                className="h-8 w-8 shrink-0 object-contain transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"
              />
              <span className="flex items-center gap-2 text-lg font-semibold tracking-tight text-[#111827]">
                <span>{footerConfig.brand.name}</span>
                <span
                  aria-hidden="true"
                  className="font-normal text-slate-300 transition-colors duration-300 group-hover:text-[#37C650]"
                >
                  |
                </span>
                <span className="transition-colors duration-200 group-hover:text-[#15803D]">
                  {footerConfig.brand.product}
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-[#6B7280]">
              {footerConfig.brand.description}
            </p>
          </div>

          {/* Dynamic Spotlight Link Columns */}
          {columns.map((column) => (
            <FooterSpotlightColumn
              key={column.id}
              id={column.id}
              heading={column.heading}
              links={column.links}
            />
          ))}
        </div>

        {/* Bottom Divider + Copyright & Legal Bar */}
        <div className="mt-14 border-t border-slate-200/70 pt-7">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-xs text-[#64748B] sm:text-[13px]">
              {footerConfig.copyright}
            </p>

            {legalLinks.length > 0 && (
              <nav aria-label="Legal">
                <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  {legalLinks.map((legal) => (
                    <li key={legal.id}>
                      <Link
                        href={legal.href}
                        target={legal.external ? "_blank" : undefined}
                        rel={
                          legal.external ? "noopener noreferrer" : undefined
                        }
                        className="group relative inline-block rounded-md py-1 text-xs text-[#64748B] transition-colors hover:text-[#111827] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#37C650] sm:text-[13px]"
                      >
                        <span>{legal.label}</span>
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0.5 h-[1.5px] origin-left scale-x-0 rounded-full bg-[#37C650] transition-transform duration-250 group-hover:scale-x-100"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}