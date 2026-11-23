"use client";

import { motion } from "motion/react";
import { LuFolder, LuLock, LuSend } from "react-icons/lu";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type {
  WhyNeedCardIcon,
  WhyOrganizationsNeedContent,
} from "@/types/why-trust-hub";

interface WhyNeedTrustHubSectionProps {
  content: WhyOrganizationsNeedContent;
}

const SILKY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function NeedCardIcon({ type }: { type: WhyNeedCardIcon }) {
  const iconClass = "h-5 w-5 text-[#37C650]";
  if (type === "requests") {
    return <LuSend aria-hidden="true" className={iconClass} />;
  }
  if (type === "control") {
    return <LuLock aria-hidden="true" className={iconClass} />;
  }
  return <LuFolder aria-hidden="true" className={iconClass} />;
}

export function WhyNeedTrustHubSection({
  content,
}: WhyNeedTrustHubSectionProps) {
  return (
    <section
      aria-labelledby="why-need-trust-hub-heading"
      className="bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Centered Section Header */}
        <ScrollReveal preset="rise" className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center rounded-full bg-[#E6F7EB] px-4 py-1 text-[11px] font-bold tracking-wider text-[#166534] uppercase">
            {content.badge}
          </span>

          <h2
            id="why-need-trust-hub-heading"
            className="mt-4 text-2xl leading-[1.16] font-extrabold tracking-tight text-[#111827] sm:text-4xl lg:text-[42px]"
          >
            {content.headline}
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-relaxed text-[#4B5563] sm:text-base">
            {content.description}
          </p>
        </ScrollReveal>

        {/* 3 Equal-Height Challenge Cards */}
        <div className="mt-12 grid grid-cols-1 items-stretch gap-6 sm:mt-14 md:grid-cols-3 lg:gap-7">
          {content.cards.map((card, index) => (
            <ScrollReveal
              key={card.id}
              preset="rise"
              delay={0.06 + index * 0.09}
              className="h-full"
            >
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.32, ease: SILKY_EASE }}
                className="group flex h-full flex-col rounded-2xl border border-slate-200/85 bg-white p-6 shadow-[0_6px_24px_-10px_rgba(15,23,42,0.06)] transition-[border-color,box-shadow] duration-300 ease-out hover:border-[#37C650]/45 hover:shadow-[0_20px_42px_-14px_rgba(55,198,80,0.16)] sm:rounded-3xl sm:p-7"
              >
                {/* Top Row: Soft Mint Icon Box + Watermark Number */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F5EC] transition-colors duration-300 group-hover:bg-[#DCFCE7]">
                    <NeedCardIcon type={card.icon} />
                  </div>

                  <span
                    aria-hidden="true"
                    className="text-3xl leading-none font-extrabold tracking-tight text-slate-200/90 transition-colors duration-300 select-none group-hover:text-[#BBF7D0] sm:text-[34px]"
                  >
                    {card.number}
                  </span>
                </div>

                {/* Title + Description */}
                <h3 className="mt-6 text-[17px] leading-[1.3] font-bold tracking-tight text-[#111827] sm:text-[18px]">
                  {card.title}
                </h3>

                <p className="mt-3 text-[13.5px] leading-[1.65] text-[#64748B] sm:text-sm">
                  {card.description}
                </p>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}