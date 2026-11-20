"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type ReactNode, useEffect } from "react";
import { LuX } from "react-icons/lu";

export interface MorphingDetailItem {
  id: string;
  badge?: string;
  title: string;
  subtitle: string;
  details: string[];
}

interface MorphingDetailModalProps {
  item: MorphingDetailItem | null;
  onClose: () => void;
  footerAction?: ReactNode;
}

export function MorphingDetailModal({
  item,
  onClose,
  footerAction,
}: MorphingDetailModalProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!item) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`morph-title-${item.id}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Frosted Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/35 backdrop-blur-xs"
          />

          {/* Morphing Sheet Container */}
          <motion.div
            layoutId={prefersReducedMotion ? undefined : `morph-card-${item.id}`}
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 p-6 shadow-[0_32px_80px_-20px_rgba(15,23,42,0.28)] backdrop-blur-xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                {item.badge && (
                  <span className="inline-flex items-center rounded-full bg-[#E8F5EC] px-3 py-1 text-[11px] font-bold tracking-wider text-[#15803D] uppercase">
                    {item.badge}
                  </span>
                )}
                <h3
                  id={`morph-title-${item.id}`}
                  className="mt-2.5 text-xl font-extrabold tracking-tight text-[#111827] sm:text-2xl"
                >
                  {item.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close details"
                className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-[#64748B] transition-colors hover:bg-slate-100 hover:text-[#111827]"
              >
                <LuX className="h-4.5 w-4.5" />
              </button>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
              {item.subtitle}
            </p>

            <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5">
              {item.details.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-[#334155]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#37C650]"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {footerAction && <div className="mt-6">{footerAction}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}