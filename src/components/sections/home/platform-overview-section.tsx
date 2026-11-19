"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { LuActivity, LuFolder, LuGlobe, LuLock } from "react-icons/lu";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type {
  HomePlatformOverviewContent,
  WorkflowStepIcon,
} from "@/types/home";

interface PlatformOverviewSectionProps {
  content: HomePlatformOverviewContent;
}

const STEP_DURATION_MS = 2200;
const SILKY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function StepIcon({ type }: { type: WorkflowStepIcon }) {
  const iconClass = "h-5 w-5 text-[#28B446]";
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

export function PlatformOverviewSection({
  content,
}: PlatformOverviewSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.25 });
  const prefersReducedMotion = useReducedMotion();

  const [activeStep, setActiveStep] = useState(0);
  const [cycleId, setCycleId] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSteps = content.steps.length;
  const shouldRun = isInView && !isPaused && !prefersReducedMotion;

  useEffect(() => {
    if (!shouldRun || totalSteps <= 1) return;

    const timer = window.setInterval(() => {
      setActiveStep((prev) => {
        if (prev + 1 >= totalSteps) {
          setCycleId((c) => c + 1);
          return 0;
        }
        return prev + 1;
      });
    }, STEP_DURATION_MS);

    return () => window.clearInterval(timer);
  }, [shouldRun, totalSteps]);

  const handleSelectStep = (index: number) => {
    setActiveStep(index);
    setCycleId((c) => c + 1);
  };

  return (
    <section
      ref={sectionRef}
      id={content.sectionId}
      aria-labelledby="platform-overview-heading"
      className="scroll-mt-20 bg-[#F8FAFC] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal preset="rise" className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-[#E6F7EB] px-4 py-1 text-[11px] font-bold tracking-wider text-[#166534] uppercase">
            {content.badge}
          </span>

          <h2
            id="platform-overview-heading"
            className="mt-4 text-2xl leading-[1.18] font-extrabold tracking-tight text-[#111827] sm:text-4xl lg:text-[42px]"
          >
            {content.headline}
          </h2>

          <p className="mx-auto mt-3.5 max-w-2xl text-[15px] leading-relaxed text-[#4B5563] sm:text-base">
            {content.description}
          </p>
        </ScrollReveal>

        {/* 4-Step Running Flow Timeline + Cards */}
        <ol
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6"
        >
          {content.steps.map((step, index) => {
            const isCompletedOrActive =
              prefersReducedMotion || index <= activeStep;
            const isCurrentActive =
              !prefersReducedMotion && index === activeStep;
            const hasConnector = index < totalSteps - 1;
            const isLineCompleted =
              prefersReducedMotion || index < activeStep;
            const isLineFilling =
              !prefersReducedMotion && index === activeStep;

            return (
              <li key={step.id} className="flex flex-col">
                <ScrollReveal
                  preset="rise"
                  delay={index * 0.08}
                  className="flex h-full flex-col"
                >
                  {/* Top Step Circle + Progressive Connector Line */}
                  <div className="mb-4 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleSelectStep(index)}
                      aria-label={`Step ${step.stepNumber}: ${step.title}`}
                      aria-current={isCurrentActive ? "step" : undefined}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white transition-all duration-500 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28B446] ${
                        isCompletedOrActive
                          ? "bg-[#28B446] shadow-[0_6px_16px_-4px_rgba(40,180,70,0.45)]"
                          : "bg-[#86EFAC] hover:bg-[#4ADE80]"
                      } ${isCurrentActive ? "scale-105" : "scale-100"}`}
                    >
                      {step.stepNumber}
                    </button>

                    {hasConnector && (
                      <div
                        aria-hidden="true"
                        className="relative hidden h-[2.5px] flex-1 overflow-hidden rounded-full bg-[#DCFCE7] lg:block"
                      >
                        {isLineCompleted && (
                          <div className="h-full w-full bg-[#28B446]" />
                        )}

                        {isLineFilling && (
                          <motion.div
                            key={`${step.id}-${cycleId}`}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: isPaused ? undefined : 1 }}
                            transition={{
                              duration: STEP_DURATION_MS / 1000,
                              ease: "linear",
                            }}
                            style={{ transformOrigin: "left" }}
                            className="h-full w-full bg-[#28B446]"
                          />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Step Card */}
                  <motion.div
                    onClick={() => handleSelectStep(index)}
                    animate={{
                      y: isCurrentActive ? -4 : 0,
                    }}
                    transition={{ duration: 0.45, ease: SILKY_EASE }}
                    className={`flex-1 cursor-pointer rounded-2xl border-[1.5px] bg-white p-6 transition-[border-color,box-shadow] duration-500 ease-out sm:p-7 ${
                      isCurrentActive
                        ? "border-[#28B446] shadow-[0_18px_40px_-14px_rgba(40,180,70,0.2)]"
                        : "border-slate-200/75 shadow-[0_4px_20px_-6px_rgba(15,23,42,0.04)] hover:border-slate-300/90 hover:shadow-[0_12px_28px_-10px_rgba(15,23,42,0.08)]"
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-500 ${
                        isCurrentActive ? "bg-[#DCFCE7]" : "bg-[#E8F5EC]"
                      }`}
                    >
                      <StepIcon type={step.icon} />
                    </div>

                    <h3 className="mt-5 text-[17px] font-bold tracking-tight text-[#111827]">
                      {step.title}
                    </h3>

                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#64748B]">
                      {step.description}
                    </p>
                  </motion.div>
                </ScrollReveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}