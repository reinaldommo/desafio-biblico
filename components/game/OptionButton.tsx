"use client";

import { motion } from "framer-motion";

interface OptionButtonProps {
  label: string; // A, B, C, D
  text: string;
  index: number;
  eliminated: boolean;
  answered: boolean;
  isCorrect: boolean;
  isSelected: boolean;
  onSelect: (index: number) => void;
}

export function OptionButton({
  label,
  text,
  index,
  eliminated,
  answered,
  isCorrect,
  isSelected,
  onSelect,
}: OptionButtonProps) {
  const disabled = answered || eliminated;

  let state = "idle";
  if (answered) {
    if (isCorrect) state = "correct";
    else if (isSelected) state = "wrong";
    else state = "dim";
  } else if (eliminated) {
    state = "eliminated";
  }

  const stateClasses: Record<string, string> = {
    idle: "border-gold/20 bg-white/[0.05] hover:border-gold/60 hover:bg-white/[0.1]",
    correct: "border-success bg-success/25 shadow-success-glow",
    wrong: "border-danger bg-danger/25 shadow-danger-glow",
    dim: "border-white/10 bg-white/[0.03] opacity-50",
    eliminated: "border-white/5 bg-white/[0.02] opacity-30 line-through",
  };

  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(index)}
      initial={{ opacity: 0, y: 16 }}
      animate={{
        opacity: eliminated && !answered ? 0.3 : 1,
        y: 0,
        filter: eliminated && !answered ? "blur(2px)" : "blur(0px)",
      }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 260, damping: 24 }}
      whileHover={disabled ? undefined : { scale: 1.025 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={`flex items-center gap-4 rounded-2xl border-2 p-4 text-left backdrop-blur-md transition-colors duration-200 md:p-5 ${stateClasses[state]} ${disabled ? "cursor-default" : "cursor-pointer"}`}
    >
      <span
        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full font-display text-base font-bold md:h-11 md:w-11 md:text-lg ${
          state === "correct"
            ? "bg-success text-night"
            : state === "wrong"
              ? "bg-danger text-white"
              : "bg-gold-gradient text-night"
        }`}
      >
        {label}
      </span>
      <span className="text-base font-medium text-ink md:text-xl lg:text-2xl">
        {text}
      </span>
    </motion.button>
  );
}
