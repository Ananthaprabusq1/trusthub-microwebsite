"use client";

import { motion } from "motion/react";
import {
  LuFolder,
  LuLock,
  LuPalette,
  LuTrendingUp,
  LuUsers,
} from "react-icons/lu";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type {
  WhyTrustHubValueContent,
  WhyValueCardIcon,
} from "@/types/why-trust-hub";

interface TrustHubValueSectionProps {
  content: WhyTrustHubValueContent;
}

const SILKY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function ValueCardIcon({ type }: { type: WhyValueCardIcon }) {
  const iconClass = "h-5 w-5 text-[#28B446]";
  if (type === "sharing") {
    return <LuLock aria-hidden="true" className={iconClass} />;
  }
  if (type === "self-service") {
    return <LuUsers aria-hidden="true" className={iconClass} />;
  }
  if (type === "branding") {
    return <LuPalette aria-hidden="true" className={iconClass} />;
  }
  if (type === "visibility") {
    return <LuTrendingUp aria-hidden="true" className={iconClass} />;
  }
  return <LuFolder aria-hidden="true" className={iconClass} />;
}

export function TrustHubValueSection({ content }: TrustHubValueSectionProps) {
  return (
    <section
      aria-labelledby="trust-hub-value-heading"
      className="bg-[#F8FAFC] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <ScrollReveal preset="rise" className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-[#E6F7EB] px-4 py-1 text-[11px] font-bold tracking-wider text-[#166534] uppercase">
            {content.badge}
          </span>

          <h2
            id="trust-hub-value-heading"
            className="mt-4 text-2xl leading-[1.16] font-extrabold tracking-tight text-[#111827] sm:text-4xl lg:text-[42px]"
          >
            {content.headline}
          </h2>

          <p className="mx-auto mt-3.5 max-w-2xl text-[15px] leading-relaxed text-[#4B5563] sm:text-base">
            {content.description}
          </p>
        </ScrollReveal>

        {/* 5-Card Bento Grid (Row 1: 3 Cards, Row 2: 2 Wide Cards) */}
        <div className="mt-12 grid grid-cols-1 items-stretch gap-6 sm:mt-14 md:grid-cols-2 lg:grid-cols-6 lg:gap-7">
          {content.cards.map((card, index) => {
            const spanClasses =
              card.span === "half"
                ? "lg:col-span-3"
                : "lg:col-span-2";

            return (
              <ScrollReveal
                key={card.id}
                preset="rise"
                delay={0.05 + (index % 3) * 0.08}
                className={`h-full ${spanClasses}`}
              >
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.32, ease: SILKY_EASE }}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200/85 bg-white p-6 shadow-[0_6px_24px_-10px_rgba(15,23,42,0.06)] transition-[border-color,box-shadow] duration-300 ease-out hover:border-[#28B446]/45 hover:shadow-[0_20px_42px_-14px_rgba(40,180,70,0.16)] sm:rounded-3xl sm:p-7"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F5EC] transition-colors duration-300 group-hover:bg-[#DCFCE7]">
                    <ValueCardIcon type={card.icon} />
                  </div>

                  <h3 className="mt-6 text-[17px] leading-[1.3] font-bold tracking-tight text-[#111827] sm:text-[18px]">
                    {card.title}
                  </h3>

                  <p className="mt-2.5 text-[13.5px] leading-[1.65] text-[#64748B] sm:text-sm">
                    {card.description}
                  </p>
                </motion.article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}