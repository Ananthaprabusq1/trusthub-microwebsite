"use client";

import { motion, useReducedMotion } from "motion/react";
import { createContext, useContext, type ReactNode } from "react";
import type {
  HeroStageOrder,
  HeroTimingConfig,
  RevealPreset,
} from "@/types/motion";

interface ResolvedHeroTiming {
  initialDelay: number;
  stageInterval: number;
  duration: number;
}

const DEFAULT_TIMING: ResolvedHeroTiming = {
  initialDelay: 0.06,
  stageInterval: 0.16,
  duration: 0.78,
};

const HeroRevealContext = createContext<ResolvedHeroTiming>(DEFAULT_TIMING);

const SILKY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface HeroRevealProps extends HeroTimingConfig {
  children: ReactNode;
  className?: string;
}

/**
 * Wrapper for any page Hero section.
 * Coordinates the multi-stage HERO INTRO reveal sequence with silky overlap.
 */
export function HeroReveal({
  children,
  initialDelay = DEFAULT_TIMING.initialDelay,
  stageInterval = DEFAULT_TIMING.stageInterval,
  duration = DEFAULT_TIMING.duration,
  className = "",
}: HeroRevealProps) {
  return (
    <HeroRevealContext.Provider
      value={{ initialDelay, stageInterval, duration }}
    >
      <div className={className}>{children}</div>
    </HeroRevealContext.Provider>
  );
}

interface HeroStageProps {
  children: ReactNode;
  /** Matches Figma HERO INTRO 1..6 sequence */
  stage: HeroStageOrder;
  /** Visual motion style for this stage */
  preset?: RevealPreset;
  /** Optional custom delay override (seconds) */
  delayOverride?: number;
  /** Optional custom duration override (seconds) */
  durationOverride?: number;
  className?: string;
}

/**
 * Individual stage inside <HeroReveal>.
 * Automatically computes staggered timing from its stage number (1..6).
 */
export function HeroStage({
  children,
  stage,
  preset = "rise",
  delayOverride,
  durationOverride,
  className = "",
}: HeroStageProps) {
  const prefersReducedMotion = useReducedMotion();
  const timing = useContext(HeroRevealContext);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const computedDelay =
    delayOverride ?? timing.initialDelay + (stage - 1) * timing.stageInterval;
  const computedDuration = durationOverride ?? timing.duration;

  const initialByPreset = {
    fade: { opacity: 0 },
    rise: { opacity: 0, y: 14 },
    scale: { opacity: 0, y: 18, scale: 0.985 },
    pop: { opacity: 0, y: 12, scale: 0.96 },
  }[preset];

  const animateByPreset = {
    fade: { opacity: 1 },
    rise: { opacity: 1, y: 0 },
    scale: { opacity: 1, y: 0, scale: 1 },
    pop: { opacity: 1, y: 0, scale: 1 },
  }[preset];

  return (
    <motion.div
      initial={initialByPreset}
      animate={animateByPreset}
      transition={{
        duration: computedDuration,
        delay: computedDelay,
        ease: SILKY_EASE,
      }}
      className={`will-change-[transform,opacity] ${className}`}
    >
      {children}
    </motion.div>
  );
}