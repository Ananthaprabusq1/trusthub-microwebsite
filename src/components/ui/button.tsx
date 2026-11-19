"use client";

import { motion, type Variants } from "motion/react";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import type { ButtonProps, ButtonSize, ButtonVariant } from "@/types/ui";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-[#28B446] text-white shadow-sm shadow-[#28B446]/20 hover:bg-[#229A3C]",
  secondary:
    "border border-slate-200 bg-white text-[#111827] shadow-2xs hover:bg-slate-50",
  dark: "bg-[#111827] text-white shadow-sm hover:bg-[#1F2937]",
  ghost: "bg-transparent text-[#4B5563] hover:bg-slate-50 hover:text-[#111827]",
  custom: "",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-[15px] rounded-xl",
  md: "px-7 py-3.5 text-[16px] rounded-2xl",
  lg: "px-8 py-4 text-[17px] rounded-2xl",
};

const ICON_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-4 w-4",
  md: "h-4.5 w-4.5",
  lg: "h-5 w-5",
};

const arrowVariants: Variants = {
  rest: { x: 0 },
  hover: {
    x: 4,
    transition: {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  tap: {
    x: 2,
    transition: { duration: 0.1 },
  },
};

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    showArrow = true,
    fullWidth = false,
    className = "",
  } = props;

  const widthClass = fullWidth ? "flex w-full" : "inline-flex";

  const surfaceClasses = [
    widthClass,
    "items-center justify-center gap-2.5 font-semibold tracking-tight select-none transition-colors duration-200",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <motion.span
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap="tap"
      className={surfaceClasses}
    >
      <span>{children}</span>
      {showArrow && (
        <motion.span
          variants={arrowVariants}
          aria-hidden="true"
          className="inline-flex shrink-0 items-center justify-center"
        >
          <LuArrowRight className={ICON_SIZE_CLASSES[size]} />
        </motion.span>
      )}
    </motion.span>
  );

  if (typeof props.href === "string") {
    const { href, target, rel, onClick } = props;
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={`${widthClass} rounded-2xl focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:outline-none`}
      >
        {content}
      </Link>
    );
  }

  const {
    type = "button",
    disabled,
    onClick,
    "aria-label": ariaLabel,
    id,
    name,
    value,
  } = props;

  return (
    <button
      id={id}
      name={name}
      value={value}
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${widthClass} rounded-2xl disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:outline-none`}
    >
      {content}
    </button>
  );
}