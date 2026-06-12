"use client";

import { motion } from "framer-motion";

export function PastorHint({ hint }: { hint: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0, y: -10 }}
      animate={{ opacity: 1, height: "auto", y: 0 }}
      className="overflow-hidden"
    >
      <div className="mt-4 rounded-2xl border border-royal-accent/40 bg-royal-800/30 px-5 py-4 backdrop-blur-md">
        <p className="mb-1 font-display text-sm uppercase tracking-wider text-royal-accent">
          💬 Dica do Pastor
        </p>
        <p className="text-ink-soft italic">&ldquo;{hint}&rdquo;</p>
      </div>
    </motion.div>
  );
}
