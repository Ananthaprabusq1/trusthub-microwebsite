"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { LuActivity, LuFolder, LuGlobe, LuLock } from "react-icons/lu";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { HomePlatformOverviewContent } from "@/types/home";

interface PlatformOverviewSectionProps {
  content: HomePlatformOverviewContent;
}

const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const STEP_INTERVAL = 0.95;

function OverviewStepIcon({ icon }: { icon: string }) {
  const iconClass = "h-5 w-5 text-[#37C650]";
  if (icon === "publish" || icon === "globe") {
    return <LuGlobe aria-hidden="true" className={iconClass} />;
  }
  if (icon === "share" || icon === "lock") {
    return <LuLock aria-hidden="true" className={iconClass} />;
  }
  if (icon === "track" || icon === "activity") {
    return <LuActivity aria-hidden="true" className={iconClass} />;
  }
  return <LuFolder aria-hidden="true" className={iconClass} />;
}

export function PlatformOverviewSection({
  content,
}: PlatformOverviewSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(timelineRef, { once: false, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const isSequenceActive = Boolean(prefersReducedMotion || isInView);

  return (
    <section
      aria-labelledby="platform-overview-heading"
      className="bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-[#E8F5EC] px-3.5 py-1 text-[11px] font-bold tracking-wider text-[#15803D] uppercase">
            {content.badge}
          </span>

          <h2
            id="platform-overview-heading"
            className="mt-4 text-3xl leading-[1.15] font-extrabold tracking-tight text-[#111827] sm:text-4xl lg:text-[42px]"
          >
            {content.headline}
          </h2>

          <p className="mt-3.5 text-[15px] leading-relaxed text-[#4B5563] sm:text-base">
            {content.description}
          </p>
        </ScrollReveal>

        {/* 4-Step Forward-Only Sequential Timeline */}
        <div
          ref={timelineRef}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5"
        >
          {content.steps.map((step, index) => {
            const isLastStep = index === content.steps.length - 1;
            const stepDelay = prefersReducedMotion ? 0 : index * STEP_INTERVAL;
            const lineDelay = prefersReducedMotion ? 0 : stepDelay + 0.22;
            const isCardHovered = hoveredIndex === index;

            return (
              <div
                key={step.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex flex-col"
              >
                {/* Step Circle + Forward-Only Green Connector Line */}
                <div className="flex items-center gap-3">
                  <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#8CE09E]/65">
                    <motion.span
                      aria-hidden="true"
                      initial={
                        prefersReducedMotion
                          ? { scale: 1, opacity: 1 }
                          : { scale: 0.35, opacity: 0 }
                      }
                      animate={
                        isSequenceActive
                          ? { scale: 1, opacity: 1 }
                          : { scale: 0.35, opacity: 0 }
                      }
                      transition={{
                        duration: 0.5,
                        delay: stepDelay,
                        ease: SMOOTH_EASE,
                      }}
                      className="absolute inset-0 rounded-full bg-[#37C650] shadow-[0_6px_16px_-4px_rgba(55,198,80,0.45)]"
                    />

                    <span className="relative z-10 text-sm font-bold text-white">
                      {index + 1}
                    </span>
                  </div>

                  {!isLastStep && (
                    <div
                      aria-hidden="true"
                      className="hidden h-[2px] flex-1 overflow-hidden rounded-full bg-[#DCFCE7] lg:block"
                    >
                      <motion.div
                        initial={
                          prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }
                        }
                        animate={
                          isSequenceActive ? { scaleX: 1 } : { scaleX: 0 }
                        }
                        transition={{
                          duration: 0.72,
                          delay: lineDelay,
                          ease: SMOOTH_EASE,
                        }}
                        className="h-full w-full origin-left rounded-full bg-[#37C650]"
                      />
                    </div>
                  )}
                </div>

                {/* Step Card (Hover highlights card border only, never reverses progress) */}
                <motion.div
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0.55, y: 12 }
                  }
                  animate={
                    isSequenceActive
                      ? { opacity: 1, y: isCardHovered ? -3 : 0 }
                      : { opacity: 0.55, y: 12 }
                  }
                  transition={{
                    opacity: { duration: 0.55, delay: stepDelay + 0.08 },
                    y: { duration: 0.28, ease: SMOOTH_EASE },
                  }}
                  className={`mt-4 flex-1 rounded-2xl border bg-white p-5 transition-[border-color,box-shadow] duration-300 sm:p-6 ${
                    isCardHovered
                      ? "border-[#37C650] shadow-[0_18px_40px_-14px_rgba(55,198,80,0.2)]"
                      : "border-slate-200/85 shadow-[0_10px_30px_-15px_rgba(15,23,42,0.08)]"
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5EC]">
                    <OverviewStepIcon icon={step.icon} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold tracking-tight text-[#111827]">
                    {step.title}
                  </h3>

                  <p className="mt-1.5 text-[13px] leading-relaxed text-[#4B5563]">
                    {step.description}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}