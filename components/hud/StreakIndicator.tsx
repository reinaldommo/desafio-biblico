"use client";

import { AnimatePresence, motion } from "framer-motion";

export function StreakIndicator({ streak }: { streak: number }) {
  const active = streak >= 2;
  return (
    <div className="flex flex-col items-center">
      <span className="text-[0.65rem] uppercase tracking-[0.25em] text-ink-soft">
        Sequência
      </span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={streak}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.4, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          className={`font-numeric text-3xl font-extrabold tabular-nums md:text-4xl ${
            active ? "text-gold-light" : "text-ink"
          }`}
          style={
            active
              ? { textShadow: `0 0 ${8 + streak * 3}px rgba(245,182,66,0.8)` }
              : undefined
          }
        >
          {active ? `🔥${streak}` : streak}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
