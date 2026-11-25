"use client";

import { motion } from "motion/react";
import { useState } from "react";
import {
  LuBadgeCheck,
  LuCheck,
  LuGlobe,
  LuLock,
  LuLockOpen,
} from "react-icons/lu";

const ACCENT_OPTIONS = [
  { id: "emerald", label: "Emerald", hex: "var(--color-brand-primary)" },
  { id: "obsidian", label: "Obsidian", hex: "var(--color-palette-18181b)" },
  { id: "forest", label: "Forest", hex: "var(--color-palette-134e2b)" },
] as const;

export function InteractiveTrustSimulator() {
  const [domainInput, setDomainInput] = useState("acme.io");
  const [accentHex, setAccentHex] = useState<string>("var(--color-brand-primary)");
  const [ndaApproved, setNdaApproved] = useState(false);

  const cleanDomain =
    domainInput
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .split("/")[0] || "yourcompany.com";

  const companyInitial = cleanDomain.charAt(0).toUpperCase();

  return (
    <div className="rounded-3xl border border-slate-200/85 bg-white p-6 shadow-xs sm:p-8">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        {/* Left Controls */}
        <div className="space-y-4 lg:col-span-5">
          <span className="inline-flex rounded-full bg-[var(--color-brand-tint)] px-3 py-1 text-[11px] font-bold text-[var(--color-brand-primary-dark)]">
            LIVE BRAND SANDBOX
          </span>
          <h3 className="text-xl font-extrabold text-[var(--color-surface-dark)]">
            Preview Your Custom Trust Center
          </h3>
          <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
            Enter any company domain and test how enterprise buyers experience
            your branded, NDA-gated Trust Hub.
          </p>

          <div>
            <label
              htmlFor="sim-domain-input"
              className="block text-xs font-semibold text-[var(--color-surface-dark)]"
            >
              Company Domain
            </label>
            <input
              id="sim-domain-input"
              type="text"
              value={domainInput}
              onChange={(e) => {
                setDomainInput(e.target.value);
                setNdaApproved(false);
              }}
              placeholder="acme.io"
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-[var(--color-palette-f8fafc)] px-3.5 py-2.5 text-sm font-medium text-[var(--color-surface-dark)] focus:border-[var(--color-brand-primary)] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[var(--color-palette-64748b)]">
              Brand Accent:
            </span>
            {ACCENT_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                aria-label={opt.label}
                onClick={() => setAccentHex(opt.hex)}
                style={{ backgroundColor: opt.hex }}
                className={`h-6 w-6 cursor-pointer rounded-full transition-transform ${
                  accentHex === opt.hex
                    ? "scale-110 ring-2 ring-[var(--color-brand-primary)]/50 ring-offset-2"
                    : "opacity-80 hover:opacity-100"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Live Mini Trust Center */}
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-[var(--color-palette-f8fafc)] shadow-md">
            {/* Browser Bar */}
            <div className="flex items-center justify-between border-b border-slate-200/80 bg-white px-4 py-2.5">
              <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-palette-475569)]">
                <LuGlobe className="h-3.5 w-3.5 text-[var(--color-brand-primary)]" />
                <span>trust.{cleanDomain}</span>
              </div>
              <span className="rounded-full bg-[var(--color-brand-tint)] px-2.5 py-0.5 text-[10.5px] font-semibold text-[var(--color-brand-primary-dark)]">
                SSL Active
              </span>
            </div>

            {/* Simulated Trust Portal Body */}
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    style={{ backgroundColor: accentHex }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-extrabold text-white transition-colors"
                  >
                    {companyInitial}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--color-surface-dark)]">
                      {cleanDomain} Security Portal
                    </p>
                    <p className="text-[11px] text-[var(--color-palette-64748b)]">
                      Verified compliance &amp; security posture
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[var(--color-surface-dark)] shadow-2xs">
                  <LuBadgeCheck className="h-3.5 w-3.5 text-[var(--color-brand-primary)]" />
                  SOC 2 Type II
                </span>
              </div>

              {/* Interactive NDA Document Unlock Row */}
              <motion.div
                layout
                className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200/90 bg-white p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-brand-tint)] text-[var(--color-brand-primary)]">
                    {ndaApproved ? (
                      <LuLockOpen className="h-4.5 w-4.5" />
                    ) : (
                      <LuLock className="h-4.5 w-4.5" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[var(--color-surface-dark)]">
                      2026 SOC 2 Type II Audit Report.pdf
                    </p>
                    <p className="text-[11px] text-[var(--color-palette-64748b)]">
                      {ndaApproved
                        ? `Unlocked for buyer@${cleanDomain}`
                        : "NDA clickwrap required for access"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setNdaApproved((prev) => !prev)}
                  style={{
                    backgroundColor: ndaApproved ? "var(--color-brand-tint)" : accentHex,
                    color: ndaApproved ? "var(--color-brand-primary-dark)" : "var(--color-surface-base)",
                  }}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all"
                >
                  {ndaApproved ? (
                    <>
                      <LuCheck className="h-3.5 w-3.5" />
                      <span>Access Granted</span>
                    </>
                  ) : (
                    <span>1-Click NDA Unlock</span>
                  )}
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}