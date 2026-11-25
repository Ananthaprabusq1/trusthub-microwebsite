"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import {
  LuActivity,
  LuLock,
  LuShieldCheck,
  LuSlidersHorizontal,
} from "react-icons/lu";
import { TiltCard } from "@/components/ui/tilt-card";
import type {
  FeaturesSecurityControlsContent,
  SecurityControlCategory,
  SecurityControlIcon,
} from "@/types/features";

interface SecurityControlsWindowProps {
  data: FeaturesSecurityControlsContent["previewWindow"];
}

function ControlRowIcon({ type }: { type: SecurityControlIcon }) {
  const iconClass = "h-4.5 w-4.5 text-[var(--color-brand-primary)]";
  if (type === "shield") {
    return <LuShieldCheck aria-hidden="true" className={iconClass} />;
  }
  if (type === "activity") {
    return <LuActivity aria-hidden="true" className={iconClass} />;
  }
  if (type === "sliders") {
    return <LuSlidersHorizontal aria-hidden="true" className={iconClass} />;
  }
  return <LuLock aria-hidden="true" className={iconClass} />;
}

export function SecurityControlsWindow({ data }: SecurityControlsWindowProps) {
  const prefersReducedMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    "All" | SecurityControlCategory
  >("All");
  const [enabledMap, setEnabledMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      data.controls.map((control) => [control.id, control.defaultEnabled])
    )
  );

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredControls = data.controls.filter((control) => {
    const matchesCategory =
      activeCategory === "All" || control.category === activeCategory;
    const matchesSearch =
      normalizedQuery.length === 0 ||
      control.title.toLowerCase().includes(normalizedQuery) ||
      control.activeSubtitle.toLowerCase().includes(normalizedQuery);
    return matchesCategory && matchesSearch;
  });

  const handleToggleControl = (id: string) => {
    setEnabledMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
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
        <div className="bg-white/85 p-4 sm:p-6">
          {/* Interactive Search Input */}
          <div>
            <label htmlFor="preview-controls-search" className="sr-only">
              {data.searchPlaceholder}
            </label>
            <input
              id="preview-controls-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={data.searchPlaceholder}
              className="w-full rounded-xl border border-slate-200/90 bg-white px-4 py-2.5 text-xs text-[var(--color-surface-dark)] shadow-2xs transition-colors duration-200 placeholder:text-[var(--color-palette-64748b)] focus:border-[var(--color-brand-primary)] focus:outline-none sm:py-3 sm:text-[13px]"
            />
          </div>

          {/* Category Filter Pills */}
          <div
            role="tablist"
            aria-label="Filter security controls by category"
            className="mt-3.5 flex flex-wrap items-center gap-2"
          >
            {data.categories.map((category) => {
              const isSelected = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(category)}
                  className={`relative cursor-pointer rounded-full px-3.5 py-1 text-[11.5px] font-semibold transition-colors duration-200 ${
                    isSelected
                      ? "text-white"
                      : "border border-slate-200/90 bg-white text-[var(--color-palette-64748b)] hover:border-slate-300 hover:text-[var(--color-surface-dark)]"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="security-controls-category-pill"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 340, damping: 30 }
                      }
                      className="absolute inset-0 rounded-full bg-[var(--color-palette-18181b)]"
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>

          {/* Security Control Rows */}
          <div className="mt-4 space-y-2.5">
            {filteredControls.length > 0 ? (
              filteredControls.map((control) => {
                const isEnabled = enabledMap[control.id] ?? control.defaultEnabled;

                return (
                  <motion.div
                    key={control.id}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white px-3.5 py-3 shadow-2xs transition-[border-color,background-color] duration-300 hover:border-[var(--color-brand-primary)]/35 hover:bg-[var(--color-palette-f9fdfb)] sm:px-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-tint)]">
                        <ControlRowIcon type={control.icon} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[var(--color-surface-dark)] sm:text-[13.5px]">
                          {control.title}
                        </p>
                        <p className="text-[11px] text-[var(--color-palette-64748b)]">
                          {isEnabled
                            ? control.activeSubtitle
                            : control.inactiveSubtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2.5">
                      {control.badgeLabel && (
                        <span className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-palette-64748b)]">
                          {control.badgeLabel}
                        </span>
                      )}

                      <button
                        type="button"
                        role="switch"
                        aria-checked={isEnabled}
                        aria-label={`Toggle ${control.title} visibility`}
                        onClick={() => handleToggleControl(control.id)}
                        className={`relative inline-flex h-5.5 w-10 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] ${
                          isEnabled ? "bg-[var(--color-brand-primary)]" : "bg-slate-200"
                        }`}
                      >
                        <motion.span
                          layout
                          transition={
                            prefersReducedMotion
                              ? { duration: 0 }
                              : { type: "spring", stiffness: 420, damping: 28 }
                          }
                          className={`h-4.5 w-4.5 rounded-full bg-white shadow-xs ${
                            isEnabled ? "ml-auto" : "mr-auto"
                          }`}
                        />
                      </button>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <p className="rounded-xl border border-dashed border-slate-200 bg-white py-6 text-center text-xs text-[var(--color-palette-64748b)]">
                No matching security controls found.
              </p>
            )}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}