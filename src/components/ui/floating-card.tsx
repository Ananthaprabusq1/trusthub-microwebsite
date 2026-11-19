"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface FloatingCardProps {
  children: ReactNode;
  amplitude?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export function FloatingCard({
  children,
  amplitude = 6,
  duration = 5,
  delay = 0.75,
  className = "",
}: FloatingCardProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    /* Outer Layer: Uninterrupted ambient vertical float */
    <motion.div
      animate={{ y: [0, -amplitude, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`will-change-transform ${className}`}
    >
      {/* Inner Layer: Independent butter-smooth spring hover lift */}
      <motion.div
        whileHover={{
          y: -6,
          scale: 1.022,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 24,
          mass: 0.8,
        }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}