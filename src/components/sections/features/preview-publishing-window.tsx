"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { LuBadgeCheck, LuFileText } from "react-icons/lu";
import { TiltCard } from "@/components/ui/tilt-card";
import type {
  FeaturesPreviewPublishingContent,
  TrustEditorMode,
} from "@/types/features";

interface PreviewPublishingWindowProps {
  data: FeaturesPreviewPublishingContent["previewWindow"];
}

export function PreviewPublishingWindow({
  data,
}: PreviewPublishingWindowProps) {
  const prefersReducedMotion = useReducedMotion();
  const [editorMode, setEditorMode] = useState<TrustEditorMode>("preview");
  const [isPublished, setIsPublished] = useState(false);

  const isPreview = editorMode === "preview";

  return (
    <div className="rounded-3xl bg-[var(--color-palette-eff8f1)] md:p-7">
      <TiltCard maxTilt={1.6}>
        <div className="overflow-hidden rounded-2xl border border-slate-200/85 bg-[var(--color-palette-f8fafc)] shadow-[0_24px_60px_-15px_rgba(15,23,42,0.12)] transition-[border-color,box-shadow] duration-500 ease-out hover:border-[var(--color-brand-primary)]/35 hover:shadow-[0_32px_72px_-16px_rgba(55,198,80,0.18)] sm:rounded-3xl">
          {/* Top macOS Window Bar */}
          <div className="flex items-center gap-3 border-b border-slate-200/70 bg-[var(--color-palette-f4f6f9)] px-4 py-3 sm:px-6">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200 transition-colors duration-300 hover:bg-[var(--color-brand-primary)]/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200 transition-colors duration-300 hover:bg-[var(--color-brand-primary)]/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200 transition-colors duration-300 hover:bg-[var(--color-brand-primary)]/60" />
            </div>
            <span className="text-xs font-medium text-[var(--color-palette-64748b)]">
              {data.windowTitle}
            </span>
          </div>

          {/* Window Body */}
          <div className="bg-white p-5 sm:p-6">
            {/* Toolbar: Edit/Preview Switch, Draft Pill, Unpublish & Publish Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                {/* Edit / Preview Segmented Toggle */}
                <div
                  role="group"
                  aria-label="Trust editor mode"
                  className="inline-flex items-center rounded-full border border-slate-200/90 bg-[var(--color-palette-f8fafc)] p-0.5"
                >
                  {(["edit", "preview"] as const).map((modeOption) => {
                    const active = editorMode === modeOption;
                    const label =
                      modeOption === "edit"
                        ? data.editLabel
                        : data.previewLabel;

                    return (
                      <button
                        key={modeOption}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setEditorMode(modeOption)}
                        className={`relative cursor-pointer rounded-full px-3 py-1 text-[11px] font-semibold transition-colors duration-200 ${
                          active
                            ? "text-white"
                            : "text-[var(--color-palette-64748b)] hover:text-[var(--color-surface-dark)]"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="trust-preview-editor-mode-pill"
                            transition={
                              prefersReducedMotion
                                ? { duration: 0 }
                                : {
                                    type: "spring",
                                    stiffness: 380,
                                    damping: 30,
                                  }
                            }
                            className="absolute inset-0 rounded-full bg-[var(--color-palette-18181b)]"
                          />
                        )}
                        <span className="relative z-10">{label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Draft / Published Status Pill */}
                <span
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium transition-colors duration-300 ${
                    isPublished
                      ? "border-[var(--color-brand-primary)]/30 bg-[var(--color-brand-tint)] font-semibold text-[var(--color-brand-primary-dark)]"
                      : "border-slate-200/90 bg-white text-[var(--color-palette-64748b)]"
                  }`}
                >
                  {isPublished
                    ? data.publishedStatusLabel
                    : data.draftStatusLabel}
                </span>
              </div>

              {/* Unpublish & Publish Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPublished(false)}
                  className="cursor-pointer rounded-xl border border-slate-800 bg-white px-3.5 py-2 text-xs font-semibold text-[var(--color-surface-dark)] transition-colors duration-200 hover:bg-slate-100"
                >
                  {data.unpublishLabel}
                </button>

                <button
                  type="button"
                  onClick={() => setIsPublished(true)}
                  className="cursor-pointer rounded-xl bg-[var(--color-brand-primary)] px-4 py-2 text-xs font-semibold text-white shadow-2xs transition-colors duration-200 hover:bg-[var(--color-brand-primary-hover)]"
                >
                  {data.publishLabel}
                </button>
              </div>
            </div>

            {/* Inner Customer-Facing Preview Canvas */}
            <div
              className={`mt-5 rounded-2xl border p-5 transition-colors duration-300 sm:p-6 ${
                isPreview
                  ? "border-[var(--color-brand-primary)]/15 bg-[var(--color-palette-eff8f1)]"
                  : "border-dashed border-slate-300 bg-[var(--color-palette-f8fafc)]"
              }`}
            >
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition-colors duration-300 ${
                  isPreview
                    ? "bg-[var(--color-palette-dcfce7)] text-[var(--color-brand-primary-dark)]"
                    : "bg-slate-200/80 text-[var(--color-palette-475569)]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full ${
                    isPreview ? "bg-[var(--color-brand-primary)]" : "bg-slate-500"
                  }`}
                />
                {isPreview ? data.canvasBadgeLabel : data.editBannerLabel}
              </span>

              {/* Skeleton Heading & Copy Lines */}
              <div aria-hidden="true" className="mt-4 space-y-2.5">
                <div className="h-2.5 w-3/5 rounded-full bg-slate-300/75" />
                <div className="h-2 w-full rounded-full bg-slate-200/90" />
                <div className="h-2 w-1/2 rounded-full bg-slate-200/80" />
              </div>

              {/* Two Mini Preview Cards */}
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200/70 bg-white p-3.5 shadow-2xs">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-brand-tint)]">
                    <LuBadgeCheck
                      aria-hidden="true"
                      className="h-4 w-4 text-[var(--color-brand-primary)]"
                    />
                  </div>
                  <div aria-hidden="true" className="mt-3 space-y-1.5">
                    <div className="h-2 w-4/5 rounded-full bg-slate-200/90" />
                    <div className="h-2 w-1/2 rounded-full bg-slate-200/80" />
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200/70 bg-white p-3.5 shadow-2xs">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-brand-tint)]">
                    <LuFileText
                      aria-hidden="true"
                      className="h-4 w-4 text-[var(--color-brand-primary)]"
                    />
                  </div>
                  <div aria-hidden="true" className="mt-3 space-y-1.5">
                    <div className="h-2 w-4/5 rounded-full bg-slate-200/90" />
                    <div className="h-2 w-1/2 rounded-full bg-slate-200/80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}