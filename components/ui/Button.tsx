"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

type Variant = "gold" | "purple" | "ghost" | "success" | "danger";
type Size = "md" | "lg" | "xl";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  gold: "bg-gold-gradient text-night font-bold shadow-gold-glow hover:shadow-gold-glow",
  purple:
    "bg-royal-gradient text-white font-semibold shadow-purple-glow border border-royal-accent/40",
  ghost:
    "bg-white/[0.06] text-ink border border-gold/25 hover:bg-white/[0.12] backdrop-blur-md",
  success: "bg-success text-night font-bold shadow-success-glow",
  danger: "bg-danger text-white font-bold shadow-danger-glow",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm md:text-base rounded-xl",
  lg: "px-7 py-3.5 text-base md:text-lg rounded-2xl",
  xl: "px-9 py-5 text-lg md:text-2xl rounded-2xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "gold", size = "md", className = "", children, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={disabled ? undefined : { scale: 1.04, y: -2 }}
        whileTap={disabled ? undefined : { scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        disabled={disabled}
        className={`inline-flex items-center justify-center gap-2 font-display tracking-wide transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
