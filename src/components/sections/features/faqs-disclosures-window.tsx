"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { LuChevronDown, LuShieldCheck, LuUsers } from "react-icons/lu";
import { TiltCard } from "@/components/ui/tilt-card";
import type {
  DisclosureRowIcon,
  FaqPreviewItem,
  FeaturesFaqsDisclosuresContent,
} from "@/types/features";

interface FaqsDisclosuresWindowProps {
  data: FeaturesFaqsDisclosuresContent["previewWindow"];
}

function DisclosureIcon({ type }: { type: DisclosureRowIcon }) {
  const iconClass = "h-4.5 w-4.5 text-[var(--color-brand-primary)]";
  if (type === "leadership") {
    return <LuShieldCheck aria-hidden="true" className={iconClass} />;
  }
  return <LuUsers aria-hidden="true" className={iconClass} />;
}

export function FaqsDisclosuresWindow({ data }: FaqsDisclosuresWindowProps) {
  const prefersReducedMotion = useReducedMotion();
  const [faqItems, setFaqItems] = useState<FaqPreviewItem[]>(data.faqs);
  const [openFaqId, setOpenFaqId] = useState<string | null>(
    data.faqs[0]?.id ?? null
  );

  const handleToggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const handleAddFaq = () => {
    if (faqItems.length >= 4) {
      setFaqItems(data.faqs);
      setOpenFaqId(data.faqs[0]?.id ?? null);
      return;
    }

    const newFaq: FaqPreviewItem = {
      id: `faq-item-${faqItems.length + 1}`,
      question: "Frequently asked question",
      answerWidths: ["w-11/12", "w-2/5"],
    };

    setFaqItems((prev) => [...prev, newFaq]);
    setOpenFaqId(newFaq.id);
  };

  return (
    <div className="rounded-3xl bg-white/80 md:p-7 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.05)] ">
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
            {/* Header Row: Public FAQs + Add FAQ Button */}
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-[15px] font-bold tracking-tight text-[var(--color-surface-dark)] sm:text-base">
                {data.panelHeading}
              </h3>

              <button
                type="button"
                onClick={handleAddFaq}
                className="cursor-pointer rounded-xl border border-slate-800 bg-white px-4 py-2 text-xs font-semibold text-[var(--color-surface-dark)] transition-colors duration-200 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)]"
              >
                {data.addFaqLabel}
              </button>
            </div>

            {/* Interactive FAQ Accordion List */}
            <div className="mt-4 space-y-2.5">
              {faqItems.map((faq) => {
                const isOpen = openFaqId === faq.id;

                return (
                  <div
                    key={faq.id}
                    className={`overflow-hidden rounded-xl border transition-colors duration-300 ${
                      isOpen
                        ? "border-[var(--color-brand-primary)] bg-[var(--color-brand-tint-soft)]"
                        : "border-slate-200/80 bg-white hover:border-[var(--color-brand-primary)]/40"
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => handleToggleFaq(faq.id)}
                      className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-brand-primary)]"
                    >
                      <span className="text-xs font-semibold text-[var(--color-surface-dark)] sm:text-[13.5px]">
                        {faq.question}
                      </span>

                      <LuChevronDown
                        aria-hidden="true"
                        className={`h-4 w-4 shrink-0 text-[var(--color-brand-primary)] transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={
                            prefersReducedMotion
                              ? undefined
                              : { height: 0, opacity: 0 }
                          }
                          animate={
                            prefersReducedMotion
                              ? undefined
                              : { height: "auto", opacity: 1 }
                          }
                          exit={
                            prefersReducedMotion
                              ? undefined
                              : { height: 0, opacity: 0 }
                          }
                          transition={{
                            duration: 0.28,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div
                            aria-hidden="true"
                            className="space-y-2 px-4 pt-0.5 pb-3.5"
                          >
                            <div
                              className={`h-2 rounded-full bg-slate-300/75 ${faq.answerWidths[0]}`}
                            />
                            <div
                              className={`h-2 rounded-full bg-slate-300/65 ${faq.answerWidths[1]}`}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Organizational Disclosures List */}
            <div className="mt-3 space-y-2.5">
              {data.disclosures.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white px-3.5 py-3 shadow-2xs transition-[border-color,background-color] duration-300 hover:border-[var(--color-brand-primary)]/35 hover:bg-[var(--color-palette-f9fdfb)] sm:px-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-tint)]">
                      <DisclosureIcon type={item.icon} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[var(--color-surface-dark)] sm:text-[13.5px]">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-[var(--color-palette-64748b)]">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--color-brand-tint)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--color-brand-primary-dark)]">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-primary)]"
                    />
                    {item.statusLabel}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}