"use client";

import { motion } from "framer-motion";

interface HelpButtonProps {
  icon: string;
  label: string;
  remaining?: number;
  disabled: boolean;
  onClick: () => void;
}

export function HelpButton({
  icon,
  label,
  remaining,
  disabled,
  onClick,
}: HelpButtonProps) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      whileHover={disabled ? undefined : { scale: 1.05, y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-ink transition-opacity disabled:opacity-35 md:px-4 md:text-base"
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
      {typeof remaining === "number" && (
        <span className="rounded-full bg-gold/20 px-2 py-0.5 font-numeric text-xs font-bold text-gold-light">
          {remaining}
        </span>
      )}
    </motion.button>
  );
}
