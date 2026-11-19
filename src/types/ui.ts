import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "dark"
  | "ghost"
  | "custom";

export type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Set false to render a standard button without the right arrow */
  showArrow?: boolean;
  /** Expands button to full container width (w-full) */
  fullWidth?: boolean;
  /** Custom width, color, or spacing overrides */
  className?: string;
}

export type LinkButtonProps = BaseButtonProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
};

export type NativeButtonProps = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    href?: undefined;
  };

export type ButtonProps = LinkButtonProps | NativeButtonProps;