"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import type { MouseEvent, ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  maxTilt?: number;
  className?: string;
}

export function TiltCard({
  children,
  maxTilt = 2,
  className = "",
}: TiltCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 20, mass: 0.8 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 0.8 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const glowX = useTransform(smoothX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], [0, 100]);
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${glowX}% ${glowY}%, rgba(40, 180, 70, 0.08), transparent 70%)`;

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div style={{ perspective: 1400 }} className={`group ${className}`}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          y: -4,
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 24,
          mass: 0.8,
        }}
        className="relative will-change-transform"
      >
        {children}

        {/* Soft Emerald Cursor-Tracking Sheen */}
        <motion.div
          aria-hidden="true"
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:rounded-3xl"
        />
      </motion.div>
    </div>
  );
}