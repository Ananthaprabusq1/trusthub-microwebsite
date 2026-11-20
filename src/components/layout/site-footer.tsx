import Link from "next/link";
import { StakfloBrandMark } from "@/components/ui/stakflo-brand-mark";
import rawFooterConfig from "@/data/footer.json";
import {
  getVisibleFooterColumns,
  getVisibleLegalLinks,
} from "@/lib/footer";
import type { FooterConfig } from "@/types/footer";

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
              className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#37C650]"
            >
              <StakfloBrandMark
                src={footerConfig.brand.logoSrc}
                alt={footerConfig.brand.logoAlt}
                width={32}
                height={32}
                className="h-8 w-8 shrink-0 object-contain"
              />
              <span className="flex items-center gap-2 text-lg font-semibold tracking-tight text-[#111827]">
                <span>{footerConfig.brand.name}</span>
                <span aria-hidden="true" className="font-normal text-slate-300">
                  |
                </span>
                <span>{footerConfig.brand.product}</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-[#6B7280]">
              {footerConfig.brand.description}
            </p>
          </div>

          {/* Dynamic Link Columns (PRODUCT, FEATURES, RESOURCES) */}
          {columns.map((column) => (
            <nav
              key={column.id}
              aria-labelledby={`footer-heading-${column.id}`}
              className="flex flex-col"
            >
              <h2
                id={`footer-heading-${column.id}`}
                className="text-xs font-semibold tracking-wider text-[#64748B] uppercase"
              >
                {column.heading}
              </h2>

              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="inline-block rounded-md py-0.5 text-[15px] text-[#374151] transition-colors hover:text-[#111827] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#37C650]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
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
                        className="rounded-md py-1 text-xs text-[#64748B] transition-colors hover:text-[#111827] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#37C650] sm:text-[13px]"
                      >
                        {legal.label}
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