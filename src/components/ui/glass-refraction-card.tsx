"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { type MouseEvent, type ReactNode, useRef } from "react";

interface GlassRefractionCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function GlassRefractionCard({
  children,
  className = "",
  spotlightColor = "rgba(55, 198, 80, 0.24)",
}: GlassRefractionCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement | null>(null);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const borderGlow = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 75%)`;
  const surfaceSheen = useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, rgba(55, 198, 80, 0.06), transparent 80%)`;

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-200);
    mouseY.set(-200);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-2xl border border-slate-200/85 bg-white/85 p-px shadow-[0_14px_38px_-14px_rgba(15,23,42,0.08)] backdrop-blur-md transition-shadow duration-500 hover:shadow-[0_22px_50px_-14px_rgba(55,198,80,0.16)] sm:rounded-3xl ${className}`}
    >
      {/* Border Refraction Ring */}
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          style={{ background: borderGlow }}
          className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}

      {/* Inner Glass Surface */}
      <div className="relative h-full w-full overflow-hidden rounded-[calc(1rem-1px)] bg-white/92 sm:rounded-[calc(1.5rem-1px)]">
        {/* Top Specular Edge */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.95)_50%,transparent_100%)]"
        />

        {/* Subtle Inner Light Wash */}
        {!prefersReducedMotion && (
          <motion.div
            aria-hidden="true"
            style={{ background: surfaceSheen }}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}

        <div className="relative z-10 h-full">{children}</div>
      </div>
    </div>
  );
}