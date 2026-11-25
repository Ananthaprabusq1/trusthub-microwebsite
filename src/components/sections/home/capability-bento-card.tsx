"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import {
  LuBadgeCheck,
  LuFileText,
  LuLock,
  LuPalette,
  LuShieldCheck,
  LuTrendingUp,
} from "react-icons/lu";
import type { CapabilityCardItem, CapabilityIconType } from "@/types/home";

interface CapabilityBentoCardProps {
  card: CapabilityCardItem;
  priority?: boolean;
}

function CapabilityIcon({ type }: { type: CapabilityIconType }) {
  const iconClass = "h-4 w-4 text-[var(--color-brand-primary)]";
  if (type === "document") {
    return <LuFileText aria-hidden="true" className={iconClass} />;
  }
  if (type === "lock") {
    return <LuLock aria-hidden="true" className={iconClass} />;
  }
  if (type === "palette") {
    return <LuPalette aria-hidden="true" className={iconClass} />;
  }
  if (type === "compliance") {
    return <LuBadgeCheck aria-hidden="true" className={iconClass} />;
  }
  if (type === "analytics") {
    return <LuTrendingUp aria-hidden="true" className={iconClass} />;
  }
  return <LuShieldCheck aria-hidden="true" className={iconClass} />;
}

export function CapabilityBentoCard({
  card,
  priority = false,
}: CapabilityBentoCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/85 bg-white shadow-[0_6px_24px_-10px_rgba(15,23,42,0.06)] transition-[border-color,box-shadow] duration-300 ease-out hover:border-[var(--color-brand-primary)]/45 hover:shadow-[0_18px_38px_-14px_rgba(55,198,80,0.16)] sm:rounded-3xl"
    >
      {/* Top 3D Illustration Visual Container (Static Crisp Framing, No Expansion) */}
      <div className="relative h-52 w-full shrink-0 overflow-hidden border-b border-slate-100 bg-[var(--color-palette-f4f8fd)] sm:h-60">
        {!imgError ? (
          <Image
            src={card.image.src}
            alt={card.image.alt}
            fill
            priority={priority}
            sizes={
              card.span === "wide"
                ? "(max-width: 1024px) 100vw, 58vw"
                : "(max-width: 1024px) 100vw, 42vw"
            }
            onError={() => setImgError(true)}
            className="object-cover object-center"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_45%,#DCFCE7_0%,#F1F7FD_75%)]"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
              <CapabilityIcon type={card.icon} />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Copy Area */}
      <div className="flex flex-1 flex-col justify-start bg-white p-5 sm:p-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-tint)] transition-colors duration-300 group-hover:bg-[var(--color-palette-dcfce7)]">
            <CapabilityIcon type={card.icon} />
          </span>

          <h3 className="text-[15px] font-bold tracking-tight text-[var(--color-surface-dark)] sm:text-base">
            {card.title}
          </h3>
        </div>

        <p className="mt-2.5 text-[13px] leading-relaxed text-[var(--color-palette-64748b)] sm:text-[13.5px]">
          {card.description}
        </p>
      </div>
    </motion.article>
  );
}