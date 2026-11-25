"use client";

import { motion, type Variants } from "motion/react";
import Link from "next/link";
import { type MouseEvent } from "react";
import { LuArrowRight } from "react-icons/lu";
import { MagneticWrap } from "@/components/ui/magnetic-wrap";
import { useGetStartedTransition } from "@/context/get-started-transition-context";
import type { ButtonProps, ButtonSize, ButtonVariant } from "@/types/ui";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-brand-primary)] text-white shadow-sm shadow-[var(--color-brand-primary)]/20 hover:bg-[var(--color-brand-primary-hover)]",
  secondary:
    "border border-slate-200 bg-white text-[var(--color-surface-dark)] shadow-2xs hover:bg-slate-50",
  dark: "bg-[var(--color-surface-dark)] text-white shadow-sm hover:bg-[var(--color-palette-1f2937)]",
  ghost: "bg-transparent text-[var(--color-text-secondary)] hover:bg-slate-50 hover:text-[var(--color-surface-dark)]",
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
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
  },
  tap: { x: 2, transition: { duration: 0.1 } },
};

/** Returns true when this button should behave like the header "Get Started" */
function isGetStarted(children: React.ReactNode, href?: string): boolean {
  if (typeof children === "string" && children.trim().toLowerCase() === "get started") return true;
  if (href === "#get-started" || (typeof href === "string" && href.includes("/register"))) return true;
  return false;
}

/** Inner sub-component – uses the transition hook safely at the top level */
function GetStartedButton({
  children,
  widthClass,
  surfaceClasses,
  showArrow,
  size,
  href,
  onClick: externalOnClick,
}: {
  children: React.ReactNode;
  widthClass: string;
  surfaceClasses: string;
  showArrow: boolean;
  size: ButtonSize;
  href?: string;
  onClick?: () => void;
}) {
  const { triggerTransition } = useGetStartedTransition();

  const targetUrl =
    href && href !== "#get-started" && href !== ""
      ? href
      : "https://trusthub.stakflo.io/register";

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    externalOnClick?.();
    triggerTransition(e, targetUrl);
  };

  return (
    <MagneticWrap strength={0.22} className={widthClass}>
      <a
        href={targetUrl}
        onClick={handleClick}
        className={`${widthClass} cursor-pointer rounded-2xl focus-visible:ring-2 focus-visible:ring-[var(--color-palette-2563eb)] focus-visible:ring-offset-2 focus-visible:outline-none`}
      >
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
      </a>
    </MagneticWrap>
  );
}

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    showArrow = true,
    fullWidth = false,
    className = "",
  } = props;

  // Respect both the `fullWidth` prop AND any `w-full` / `sm:w-auto` passed
  // via `className` so that buttons inside flex-col stacks stretch correctly.
  const hasFullWidthClass = className.includes("w-full");
  const hasSmAutoClass = className.includes("sm:w-auto");

  const widthClass = fullWidth || hasFullWidthClass
    ? hasSmAutoClass
      ? "flex w-full sm:inline-flex sm:w-auto"
      : "flex w-full"
    : "inline-flex";

  const href = typeof props.href === "string" ? props.href : undefined;

  const surfaceClasses = [
    widthClass,
    "items-center justify-center gap-2.5 font-semibold tracking-tight select-none transition-colors duration-200 cursor-pointer",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // All "Get Started" buttons get the magnetic + transition animation
  if (isGetStarted(children, href)) {
    return (
      <GetStartedButton
        widthClass={widthClass}
        surfaceClasses={surfaceClasses}
        showArrow={showArrow}
        size={size}
        href={href}
        onClick={typeof props.onClick === "function" ? (props.onClick as () => void) : undefined}
      >
        {children}
      </GetStartedButton>
    );
  }

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
    const { href: linkHref, target, rel, onClick } = props;
    return (
      <Link
        href={linkHref}
        target={target}
        rel={rel}
        onClick={onClick}
        className={`${widthClass} cursor-pointer rounded-2xl focus-visible:ring-2 focus-visible:ring-[var(--color-palette-2563eb)] focus-visible:ring-offset-2 focus-visible:outline-none`}
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
      className={`${widthClass} cursor-pointer rounded-2xl disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[var(--color-palette-2563eb)] focus-visible:ring-offset-2 focus-visible:outline-none`}
    >
      {content}
    </button>
  );
}
