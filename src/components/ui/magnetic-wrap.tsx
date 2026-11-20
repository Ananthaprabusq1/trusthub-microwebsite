"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { type MouseEvent, type ReactNode, useRef } from "react";

interface MagneticWrapProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticWrap({
  children,
  strength = 0.28,
  className = "inline-flex",
}: MagneticWrapProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springX = useSpring(rawX, { stiffness: 260, damping: 20, mass: 0.4 });
  const springY = useSpring(rawY, { stiffness: 260, damping: 20, mass: 0.4 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);

    const maxPull = 10;
    const clampedX = Math.max(-maxPull, Math.min(maxPull, offsetX * strength));
    const clampedY = Math.max(-maxPull, Math.min(maxPull, offsetY * strength));

    rawX.set(clampedX);
    rawY.set(clampedY);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}