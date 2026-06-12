"use client";

import { motion } from "framer-motion";

/** Brilhos decorativos de fundo — luz divina sutil em loop. */
export function DivineGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-[1] overflow-hidden">
      <motion.div
        className="absolute -top-32 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.22), transparent 65%)",
        }}
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(245,182,66,0.16), transparent 70%)",
        }}
        animate={{ opacity: [0.3, 0.55, 0.3], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[10%] top-1/3 h-72 w-72 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(109,40,217,0.18), transparent 70%)",
        }}
        animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.12, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
}
