"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type {
  FeatureCapabilityNavItem,
  FeaturesCapabilitiesHeaderContent,
} from "@/types/features";

interface CapabilitiesExploreSectionProps {
  content: FeaturesCapabilitiesHeaderContent;
}

export function CapabilitiesExploreSection({
  content,
}: CapabilitiesExploreSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(
    content.items[0]?.id ?? ""
  );
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleSelectCapability = (item: FeatureCapabilityNavItem) => {
    setActiveId(item.id);

    buttonRefs.current[item.id]?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });

    const targetElement = document.getElementById(item.targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      aria-labelledby="features-capabilities-heading"
      className="bg-[#FAFBFD] pt-18 pb-10 sm:pt-24 sm:pb-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered Title & Subtitle */}
        <ScrollReveal preset="rise" className="mx-auto max-w-3xl text-center">
          <h2
            id="features-capabilities-heading"
            className="text-2xl leading-[1.15] font-extrabold tracking-tight text-[#111827] sm:text-4xl lg:text-[42px]"
          >
            {content.headline}
          </h2>

          <p className="mx-auto mt-3.5 max-w-2xl text-[14.5px] leading-relaxed text-[#4B5563] sm:text-[15.5px]">
            {content.description}
          </p>
        </ScrollReveal>

        {/* Horizontal Numbered Pill Navigation Strip */}
        <ScrollReveal preset="rise" delay={0.08} className="mt-9 sm:mt-11">
          <div className="relative">
            <nav
              aria-label="Trust Hub capabilities navigation"
              className="flex items-center gap-3 overflow-x-auto pb-2 [scrollbar-width:none] sm:gap-3.5 lg:pl-6 [&::-webkit-scrollbar]:hidden"
            >
              {content.items.map((item) => {
                const isActive = item.id === activeId;

                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      buttonRefs.current[item.id] = el;
                    }}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => handleSelectCapability(item)}
                    className={`relative inline-flex shrink-0 cursor-pointer items-center gap-2.5 rounded-full px-5 py-3 text-[13.5px] font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28B446] sm:px-6 sm:py-3.5 sm:text-[14px] ${
                      isActive
                        ? "text-white"
                        : "border border-slate-200/85 bg-white text-[#111827] shadow-[0_2px_10px_-4px_rgba(15,23,42,0.06)] hover:border-[#28B446]/45 hover:bg-[#F9FDFB]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="features-active-capability-pill"
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : {
                                type: "spring",
                                stiffness: 320,
                                damping: 30,
                              }
                        }
                        className="absolute inset-0 rounded-full bg-[#18181B] shadow-[0_10px_24px_-8px_rgba(24,24,27,0.4)]"
                      />
                    )}

                    <span
                      className={`relative z-10 text-xs font-bold tabular-nums transition-colors duration-300 ${
                        isActive ? "text-[#28B446]" : "text-[#64748B]"
                      }`}
                    >
                      {item.number}
                    </span>

                    <span className="relative z-10 whitespace-nowrap">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Subtle Right-Edge Fade Indicator on Desktop */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 hidden w-14 bg-[linear-gradient(90deg,transparent_0%,#FAFBFD_92%)] lg:block"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}