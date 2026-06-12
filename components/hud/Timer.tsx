"use client";

import { motion } from "framer-motion";

interface TimerProps {
  remaining: number;
  total: number;
}

const R = 26;
const CIRC = 2 * Math.PI * R;

export function Timer({ remaining, total }: TimerProps) {
  const frac = total > 0 ? Math.max(0, remaining / total) : 0;
  const danger = remaining <= 5;
  const stroke = danger ? "#F43F5E" : "#F5B642";

  return (
    <motion.div
      className="relative flex h-16 w-16 items-center justify-center"
      animate={danger ? { scale: [1, 1.12, 1] } : { scale: 1 }}
      transition={danger ? { duration: 0.6, repeat: Infinity } : {}}
    >
      <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={R} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="5" />
        <circle
          cx="32"
          cy="32"
          r={R}
          fill="none"
          stroke={stroke}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC * (1 - frac)}
          style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s" }}
        />
      </svg>
      <span
        className={`absolute font-numeric text-xl font-bold tabular-nums ${danger ? "text-danger" : "text-gold-light"}`}
      >
        {remaining}
      </span>
    </motion.div>
  );
}
