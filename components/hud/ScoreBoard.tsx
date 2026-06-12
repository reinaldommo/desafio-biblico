"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

export function ScoreBoard({ score }: { score: number }) {
  const count = useMotionValue(score);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString("pt-BR"));

  useEffect(() => {
    const controls = animate(count, score, { duration: 0.6, ease: "easeOut" });
    return controls.stop;
  }, [score, count]);

  return (
    <div className="flex flex-col items-center">
      <span className="text-[0.65rem] uppercase tracking-[0.25em] text-ink-soft">
        Pontos
      </span>
      <motion.span
        key={score}
        className="font-numeric text-3xl font-extrabold text-gold-gradient md:text-4xl"
      >
        {rounded}
      </motion.span>
    </div>
  );
}
