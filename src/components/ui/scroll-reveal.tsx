"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import type { RevealPreset } from "@/types/motion";

const SILKY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface ScrollRevealProps {
  children: ReactNode;
  preset?: RevealPreset;
  delay?: number;
  duration?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  preset = "rise",
  delay = 0,
  duration = 0.72,
  className = "",
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const initial = {
    fade: { opacity: 0 },
    rise: { opacity: 0, y: 16 },
    scale: { opacity: 0, y: 18, scale: 0.985 },
    pop: { opacity: 0, y: 10, scale: 0.96 },
  }[preset];

  const whileInView = {
    fade: { opacity: 1 },
    rise: { opacity: 1, y: 0 },
    scale: { opacity: 1, y: 0, scale: 1 },
    pop: { opacity: 1, y: 0, scale: 1 },
  }[preset];

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, amount: "some", margin: "0px 0px -40px 0px" }}
      transition={{
        duration,
        delay,
        ease: SILKY_EASE,
      }}
      className={`will-change-[transform,opacity] ${className}`}
    >
      {children}
    </motion.div>
  );
}