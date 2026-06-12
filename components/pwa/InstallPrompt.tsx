"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";

export function InstallPrompt() {
  const { canInstall, promptInstall } = useInstallPrompt();
  const [dismissed, setDismissed] = useState(false);

  const show = canInstall && !dismissed;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="glass-strong fixed bottom-4 left-1/2 z-40 flex w-[92%] max-w-md -translate-x-1/2 items-center justify-between gap-3 rounded-2xl px-4 py-3"
        >
          <p className="text-sm text-ink-soft">
            📱 Instale o <strong className="text-gold-light">Desafio Bíblico</strong> no
            seu dispositivo!
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={promptInstall}
              className="rounded-lg bg-gold-gradient px-3 py-1.5 text-sm font-bold text-night"
            >
              Instalar
            </button>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Fechar"
              className="px-1 text-ink-soft hover:text-ink"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
