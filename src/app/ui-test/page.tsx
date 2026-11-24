"use client";

import { motion } from "motion/react";
import { useState } from "react";
import {
  LuArrowUpRight,
  LuBadgeCheck,
  LuLock,
  LuRefreshCw,
  LuShieldCheck,
  LuSparkles,
} from "react-icons/lu";
import { FilmGrainOverlay } from "@/components/ui/film-grain-overlay";
import { GlassRefractionCard } from "@/components/ui/glass-refraction-card";
import { MagneticWrap } from "@/components/ui/magnetic-wrap";
import {
  type MorphingDetailItem,
  MorphingDetailModal,
} from "@/components/ui/morphing-detail-modal";
import { OdometerCounter } from "@/components/ui/odometer-counter";
import { SpatialLayer, SpatialStage } from "@/components/ui/spatial-parallax";
import {
  AuditXRayOverlay,
  AuditXRaySwitch,
} from "@/components/ui/audit-xray-mode";
// import {
//   AuditXRayOverlay,
//   AuditXRayProvider,
//   AuditXRaySwitch,
// } from "@/components/ui/audit-xray-mode";
import { InteractiveTrustSimulator } from "@/components/ui/interactive-trust-simulator";
import { LiveSecurityBeamFlow } from "@/components/ui/live-security-beam-flow";
import { UiTestTransitionShell } from "@/components/transitions/ui-test-transition-shell";

const MORPH_CARDS: MorphingDetailItem[] = [
  {
    id: "soc2-control",
    badge: "01 · SECURITY CONTROLS",
    title: "SOC 2 Type II Posture",
    subtitle:
      "Real-time visibility into access governance, encryption standards, and continuous monitoring.",
    details: [
      "Automated evidence collection across cloud infrastructure.",
      "Role-based access reviews logged every 90 days.",
      "Customer-ready control summaries without manual spreadsheets.",
    ],
  },
  {
    id: "nda-vault",
    badge: "02 · ACCESS GOVERNANCE",
    title: "NDA-Gated Document Vault",
    subtitle:
      "Share sensitive penetration tests and audit reports with instant domain verification.",
    details: [
      "Auto-approve trusted enterprise domains in one click.",
      "Watermarked, time-limited document access links.",
      "Complete audit trail of every buyer view and download.",
    ],
  },
  {
    id: "live-trust",
    badge: "03 · CUSTOM BRANDING",
    title: "White-Label Trust Center",
    subtitle:
      "Host on your own custom domain with matching typography, colors, and verified badges.",
    details: [
      "Instant SSL & DNS verification on trust.yourcompany.com.",
      "Pre-mapped templates ready to publish in minutes.",
      "Interactive buyer FAQs and subprocessor disclosures.",
    ],
  },
];

const METRIC_SETS = [
  [
    { label: "Uptime SLA", value: "99.9%" },
    { label: "Core Capabilities", value: "10+" },
    { label: "Continuous Monitoring", value: "24/7" },
    { label: "Audit Readiness", value: "100%" },
  ],
  [
    { label: "Uptime SLA", value: "99.8%" },
    { label: "Core Capabilities", value: "25+" },
    { label: "Continuous Monitoring", value: "12/5" },
    { label: "Audit Readiness", value: "98%" },
  ],
];

export default function UiTestPlaygroundPage() {
  const [grainEnabled, setGrainEnabled] = useState(true);
  const [metricSetIndex, setMetricSetIndex] = useState(0);
  const [activeModalItem, setActiveModalItem] =
    useState<MorphingDetailItem | null>(null);

  const currentMetrics = METRIC_SETS[metricSetIndex] ?? METRIC_SETS[0];

  return (
    <UiTestTransitionShell>
    <main className="min-h-screen bg-[#FAFBFD] py-16 text-[#111827] sm:py-24">
      {grainEnabled && <FilmGrainOverlay />}

      <div className="mx-auto max-w-6xl space-y-16 px-4 sm:px-6 lg:px-8">
        {/* Header + Film Grain & Magnetic Button Test */}
        <section className="rounded-3xl border border-slate-200/85 bg-white p-8 shadow-xs sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F5EC] px-3 py-1 text-xs font-bold text-[#15803D]">
                <LuSparkles className="h-3.5 w-3.5" />
                UI MICRO-PHYSICS PLAYGROUND
              </span>
              <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-4xl">
                Stakflo Trust Hub — Component Test Bench
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#4B5563]">
                Hover over buttons and cards, click cards to test shared-element
                morphing, and move your cursor inside the Z-depth stage below.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setGrainEnabled((prev) => !prev)}
                className="cursor-pointer rounded-full border border-slate-200 bg-[#F8FAFC] px-4 py-2.5 text-xs font-semibold text-[#111827] transition-colors hover:border-[#37C650]"
              >
                Film Grain: {grainEnabled ? "ON" : "OFF"}
              </button>

              <MagneticWrap strength={0.32}>
                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#37C650] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-6px_rgba(55,198,80,0.45)] transition-colors hover:bg-[#2EB045]"
                >
                  <span>Magnetic Primary CTA</span>
                  <LuArrowUpRight className="h-4 w-4" />
                </button>
              </MagneticWrap>
            </div>
          </div>
        </section>

        {/* Odometer Counter Test */}
        <section className="rounded-3xl border border-slate-200/85 bg-white p-8 shadow-xs sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold">
                1. Mechanical Odometer Counters
              </h2>
              <p className="text-xs text-[#64748B]">
                Click replay to watch individual digits roll with spring
                physics.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setMetricSetIndex((prev) => (prev === 0 ? 1 : 0))}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-[#111827] hover:bg-slate-50"
            >
              <LuRefreshCw className="h-3.5 w-3.5 text-[#37C650]" />
              <span>Roll Numbers</span>
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {currentMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-5"
              >
                <OdometerCounter
                  value={metric.value}
                  className="text-3xl font-extrabold text-[#111827] sm:text-4xl"
                />
                <p className="mt-1.5 text-xs font-medium text-[#64748B]">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Glass Refraction Card + Morphing Detail Modal Test */}
        <section>
          <div className="mb-5">
            <h2 className="text-lg font-bold">
              2. Glass Refraction Cards + Morphing Detail Sheet
            </h2>
            <p className="text-xs text-[#64748B]">
              Move your cursor across the card borders for the emerald
              refraction glow, then click any card to morph it into a modal.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {MORPH_CARDS.map((card) => (
              <motion.div
                key={card.id}
                layoutId={`morph-card-${card.id}`}
                onClick={() => setActiveModalItem(card)}
                className="cursor-pointer"
              >
                <GlassRefractionCard className="h-full">
                  <div className="flex h-full flex-col justify-between p-6">
                    <div>
                      <span className="inline-flex rounded-full bg-[#E8F5EC] px-2.5 py-0.5 text-[10.5px] font-bold text-[#15803D]">
                        {card.badge}
                      </span>
                      <h3 className="mt-3 text-lg font-bold text-[#111827]">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#4B5563]">
                        {card.subtitle}
                      </p>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#37C650]">
                      Inspect Details <LuArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </GlassRefractionCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Spatial Z-Depth Parallax Stage Test */}
        <section>
          <div className="mb-5">
            <h2 className="text-lg font-bold">
              3. Multi-Plane Spatial Z-Depth Parallax
            </h2>
            <p className="text-xs text-[#64748B]">
              Move your mouse around inside the green stage—background, center
              card, and floating pills move at different Z-depths.
            </p>
          </div>

          <SpatialStage className="relative flex min-h-[340px] items-center justify-center overflow-hidden rounded-3xl border border-[#37C650]/25 bg-[radial-gradient(circle_at_50%_40%,#E8F5EC_0%,#F8FAFC_75%)] p-8">
            <SpatialLayer depth={-0.75} className="pointer-events-none absolute">
              <div className="h-56 w-56 rounded-full bg-[#37C650]/15 blur-2xl" />
            </SpatialLayer>

            <SpatialLayer depth={0.35} className="relative z-10">
              <div className="w-72 rounded-2xl border border-slate-200/90 bg-white/95 p-6 text-center shadow-lg backdrop-blur-md sm:w-80">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#37C650] text-white">
                  <LuShieldCheck className="h-6 w-6" />
                </div>
                <p className="mt-3 text-base font-bold text-[#111827]">
                  Stakflo Trust Center
                </p>
                <p className="mt-1 text-xs text-[#64748B]">
                  Mid-ground Z-plane (depth: 0.35)
                </p>
              </div>
            </SpatialLayer>

            <SpatialLayer
              depth={1.2}
              className="absolute top-8 left-6 z-20 sm:left-16"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#37C650]/30 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#15803D] shadow-md">
                <LuBadgeCheck className="h-4 w-4 text-[#37C650]" />
                SOC 2 Verified (depth: 1.2)
              </span>
            </SpatialLayer>

            <SpatialLayer
              depth={1.35}
              className="absolute right-6 bottom-8 z-20 sm:right-16"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#18181B] px-3.5 py-1.5 text-xs font-semibold text-white shadow-md">
                <LuLock className="h-3.5 w-3.5 text-[#37C650]" />
                NDA Protected (depth: 1.35)
              </span>
            </SpatialLayer>
          </SpatialStage>
        </section>
     
<AuditXRaySwitch />
<AuditXRayOverlay telemetryTag="ZERO-TRUST VERIFIED">
  <LiveSecurityBeamFlow />
</AuditXRayOverlay>
<InteractiveTrustSimulator />
      </div>

      <MorphingDetailModal
        item={activeModalItem}
        onClose={() => setActiveModalItem(null)}
      />
      
    </main>
    </UiTestTransitionShell>
  );
}