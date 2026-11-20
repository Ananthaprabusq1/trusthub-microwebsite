"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import {
  LuActivity,
  LuFolder,
  LuGlobe,
  LuLock,
  LuUsers,
} from "react-icons/lu";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type {
  ConnectedCapabilityStepIcon,
  FeaturesConnectedCapabilitiesContent,
} from "@/types/features";

interface ConnectedCapabilitiesSectionProps {
  content: FeaturesConnectedCapabilitiesContent;
}

const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const STEP_INTERVAL = 0.95;

function StepCardIcon({ type }: { type: ConnectedCapabilityStepIcon }) {
  const iconClass = "h-5 w-5 text-[#37C650]";
  if (type === "publish") {
    return <LuGlobe aria-hidden="true" className={iconClass} />;
  }
  if (type === "share") {
    return <LuLock aria-hidden="true" className={iconClass} />;
  }
  if (type === "track") {
    return <LuActivity aria-hidden="true" className={iconClass} />;
  }
  return <LuFolder aria-hidden="true" className={iconClass} />;
}

export function ConnectedCapabilitiesSection({
  content,
}: ConnectedCapabilitiesSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(timelineRef, { once: false, amount: 0.2 });

  const isSequenceActive = Boolean(prefersReducedMotion || isInView);

  const handleScrollToCapability = (targetId: string) => {
    const target = document.getElementById(targetId);
    if (!target) return;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <section
      aria-labelledby="connected-capabilities-heading"
      className="border-t border-slate-200/70 bg-[#F8FAFC] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Centered Section Header */}
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-[#E8F5EC] px-3.5 py-1 text-[11px] font-bold tracking-wider text-[#15803D] uppercase">
            {content.badge}
          </span>

          <h2
            id="connected-capabilities-heading"
            className="mt-4 text-3xl leading-[1.15] font-extrabold tracking-tight text-[#111827] sm:text-4xl lg:text-[42px]"
          >
            {content.headline}
          </h2>

          <p className="mt-3.5 text-[15px] leading-relaxed text-[#4B5563] sm:text-base">
            {content.description}
          </p>
        </ScrollReveal>

        {/* 4-Step Sequential Timeline Grid */}
        <div
          ref={timelineRef}
          className="mt-12 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5"
        >
          {content.steps.map((step, index) => {
            const isLastStep = index === content.steps.length - 1;
            const stepDelay = prefersReducedMotion ? 0 : index * STEP_INTERVAL;
            const lineDelay = prefersReducedMotion ? 0 : stepDelay + 0.22;

            return (
              <div key={step.id} className="flex flex-col">
                {/* Top Step Number Badge + Sequential Green Connector Line */}
                <div className="flex items-center gap-3">
                  <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#8CE09E]/55">
                    {/* Soft Pulse Halo on Step Activation */}
                    {!prefersReducedMotion && (
                      <motion.span
                        aria-hidden="true"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={
                          isSequenceActive
                            ? {
                                scale: [0.95, 1.38, 1.15],
                                opacity: [0, 0.4, 0],
                              }
                            : { scale: 0.9, opacity: 0 }
                        }
                        transition={{
                          duration: 0.85,
                          delay: stepDelay + 0.05,
                          ease: "easeOut",
                        }}
                        className="pointer-events-none absolute inset-0 rounded-full bg-[#37C650]"
                      />
                    )}

                    {/* Smooth Vibrant Green Fill */}
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
                      {step.stepNumber}
                    </span>
                  </div>

                  {/* Horizontal Connector Track + Unhurried Left-to-Right Fill */}
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

                {/* Synchronized Step Card */}
                <motion.div
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0.55, y: 12 }
                  }
                  animate={
                    isSequenceActive
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0.55, y: 12 }
                  }
                  transition={{
                    duration: 0.55,
                    delay: stepDelay + 0.08,
                    ease: SMOOTH_EASE,
                  }}
                  className="mt-4 rounded-2xl border border-slate-200/85 bg-white p-5 shadow-[0_10px_30px_-15px_rgba(15,23,42,0.08)] transition-[border-color,box-shadow] duration-300 hover:border-[#37C650] hover:shadow-[0_18px_40px_-14px_rgba(55,198,80,0.18)] sm:p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5EC]">
                    <StepCardIcon type={step.icon} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold tracking-tight text-[#111827]">
                    {step.title}
                  </h3>

                  <p className="mt-1.5 text-[13px] leading-relaxed text-[#4B5563]">
                    {step.description}
                  </p>

                  {/* Linked Capability Pills */}
                  <div className="mt-4 flex flex-col items-start gap-2">
                    {step.pills.map((pill) => (
                      <button
                        key={pill.id}
                        type="button"
                        onClick={() => handleScrollToCapability(pill.targetId)}
                        className="cursor-pointer rounded-full bg-[#E8F5EC] px-3 py-1 text-left text-[11px] font-semibold text-[#15803D] transition-colors duration-200 hover:bg-[#37C650] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#37C650]"
                      >
                        {pill.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Bottom Dark Workspace Administration Foundation Bar */}
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 14 }
          }
          animate={
            isSequenceActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
          }
          transition={{
            duration: 0.55,
            delay: prefersReducedMotion
              ? 0
              : (content.steps.length - 1) * STEP_INTERVAL + 0.35,
            ease: SMOOTH_EASE,
          }}
          className="mt-10 sm:mt-12"
        >
          <button
            type="button"
            onClick={() =>
              handleScrollToCapability(content.foundationBar.targetId)
            }
            className="group flex w-full cursor-pointer flex-col items-start gap-4 rounded-2xl bg-[#1C1D1F] px-5 py-4.5 text-left shadow-[0_16px_40px_-14px_rgba(15,23,42,0.28)] transition-all duration-300 hover:bg-[#232528] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#37C650] sm:flex-row sm:items-center sm:px-7 sm:py-5"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#37C650] text-white shadow-[0_8px_20px_-6px_rgba(55,198,80,0.55)] transition-transform duration-300 group-hover:scale-105">
              <LuUsers aria-hidden="true" className="h-5 w-5" />
            </div>

            <div>
              <h3 className="text-[15px] font-bold tracking-tight text-white sm:text-base">
                {content.foundationBar.title}
              </h3>
              <p className="mt-0.5 text-xs leading-relaxed text-[#9CA3AF] sm:text-[13.5px]">
                {content.foundationBar.description}
              </p>
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}