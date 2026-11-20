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
  { id: "emerald", label: "Emerald", hex: "#37C650" },
  { id: "obsidian", label: "Obsidian", hex: "#18181B" },
  { id: "forest", label: "Forest", hex: "#134E2B" },
] as const;

export function InteractiveTrustSimulator() {
  const [domainInput, setDomainInput] = useState("acme.io");
  const [accentHex, setAccentHex] = useState<string>("#37C650");
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
          <span className="inline-flex rounded-full bg-[#E8F5EC] px-3 py-1 text-[11px] font-bold text-[#15803D]">
            LIVE BRAND SANDBOX
          </span>
          <h3 className="text-xl font-extrabold text-[#111827]">
            Preview Your Custom Trust Center
          </h3>
          <p className="text-xs leading-relaxed text-[#4B5563]">
            Enter any company domain and test how enterprise buyers experience
            your branded, NDA-gated Trust Hub.
          </p>

          <div>
            <label
              htmlFor="sim-domain-input"
              className="block text-xs font-semibold text-[#111827]"
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
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-3.5 py-2.5 text-sm font-medium text-[#111827] focus:border-[#37C650] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#64748B]">
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
                    ? "scale-110 ring-2 ring-[#37C650]/50 ring-offset-2"
                    : "opacity-80 hover:opacity-100"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Live Mini Trust Center */}
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-[#F8FAFC] shadow-md">
            {/* Browser Bar */}
            <div className="flex items-center justify-between border-b border-slate-200/80 bg-white px-4 py-2.5">
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#475569]">
                <LuGlobe className="h-3.5 w-3.5 text-[#37C650]" />
                <span>trust.{cleanDomain}</span>
              </div>
              <span className="rounded-full bg-[#E8F5EC] px-2.5 py-0.5 text-[10.5px] font-semibold text-[#15803D]">
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
                    <p className="text-sm font-bold text-[#111827]">
                      {cleanDomain} Security Portal
                    </p>
                    <p className="text-[11px] text-[#64748B]">
                      Verified compliance &amp; security posture
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#111827] shadow-2xs">
                  <LuBadgeCheck className="h-3.5 w-3.5 text-[#37C650]" />
                  SOC 2 Type II
                </span>
              </div>

              {/* Interactive NDA Document Unlock Row */}
              <motion.div
                layout
                className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200/90 bg-white p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E8F5EC] text-[#37C650]">
                    {ndaApproved ? (
                      <LuLockOpen className="h-4.5 w-4.5" />
                    ) : (
                      <LuLock className="h-4.5 w-4.5" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#111827]">
                      2026 SOC 2 Type II Audit Report.pdf
                    </p>
                    <p className="text-[11px] text-[#64748B]">
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
                    backgroundColor: ndaApproved ? "#E8F5EC" : accentHex,
                    color: ndaApproved ? "#15803D" : "#FFFFFF",
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