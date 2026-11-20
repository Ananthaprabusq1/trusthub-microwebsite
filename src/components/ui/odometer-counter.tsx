"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

interface OdometerCounterProps {
  value: string;
  className?: string;
}

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;

function OdometerDigitColumn({
  digit,
  isInView,
  delay,
}: {
  digit: number;
  isInView: boolean;
  delay: number;
}) {
  return (
    <span
      aria-hidden="true"
      className="relative inline-flex h-[1.08em] w-[0.62em] overflow-hidden align-baseline"
    >
      <motion.span
        initial={{ y: "0%" }}
        animate={{ y: isInView ? `-${digit * 10}%` : "0%" }}
        transition={{
          type: "spring",
          stiffness: 115,
          damping: 20,
          mass: 0.9,
          delay,
        }}
        className="flex flex-col leading-[1.08em]"
      >
        {DIGITS.map((num) => (
          <span
            key={num}
            className="flex h-[1.08em] items-center justify-center tabular-nums"
          >
            {num}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export function OdometerCounter({
  value,
  className = "",
}: OdometerCounterProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: false, amount: 0.25 });

  if (prefersReducedMotion) {
    return <span className={`tabular-nums ${className}`}>{value}</span>;
  }

  const characters = Array.from(value);

  return (
    <span
      ref={ref}
      aria-label={value}
      className={`inline-flex items-baseline tabular-nums ${className}`}
    >
      {characters.map((char, index) => {
        const parsed = Number.parseInt(char, 10);
        const isDigit = !Number.isNaN(parsed);

        if (!isDigit) {
          return (
            <span
              key={`glyph-${index}-${char}`}
              aria-hidden="true"
              className="inline-block"
            >
              {char}
            </span>
          );
        }

        return (
          <OdometerDigitColumn
            key={`digit-${index}-${char}`}
            digit={parsed}
            isInView={isInView}
            delay={index * 0.06}
          />
        );
      })}
    </span>
  );
}