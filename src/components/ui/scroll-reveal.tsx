"use client";

import { motion, type TargetAndTransition, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export type ScrollRevealPreset =
  | "rise"
  | "pop"
  | "fadeUp"
  | "fadeIn"
  | "fade"
  | "scale"
  | "slideLeft"
  | "slideRight";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  preset?: ScrollRevealPreset;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number | "some" | "all";
}

const SILKY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function getInitialVariant(
  preset: ScrollRevealPreset,
  direction?: ScrollRevealProps["direction"]
): TargetAndTransition {
  if (direction === "none" || preset === "fadeIn" || preset === "fade") {
    return { opacity: 0 };
  }
  if (direction === "down") {
    return { opacity: 0, y: -16 };
  }
  if (direction === "left" || preset === "slideLeft") {
    return { opacity: 0, x: 20 };
  }
  if (direction === "right" || preset === "slideRight") {
    return { opacity: 0, x: -20 };
  }
  if (preset === "pop") {
    return { opacity: 0, scale: 0.94, y: 10 };
  }
  if (preset === "scale") {
    return { opacity: 0, scale: 0.96, y: 12 };
  }
  return { opacity: 0, y: 18 };
}

export function ScrollReveal({
  children,
  className,
  preset = "rise",
  direction,
  delay = 0,
  duration = 0.55,
  once = false,
  amount = 0.15,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={getInitialVariant(preset, direction)}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: SILKY_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}