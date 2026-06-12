"use client";

import { AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { DivineGlow } from "@/components/effects/DivineGlow";
import { WelcomeScreen } from "@/components/screens/WelcomeScreen";
import { GameScreen } from "@/components/screens/GameScreen";
import { ResultScreen } from "@/components/screens/ResultScreen";

export default function Home() {
  const phase = useGameStore((s) => s.phase);
  const hasHydrated = useGameStore((s) => s.hasHydrated);

  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 py-8 md:py-12">
      <DivineGlow />
      <AnimatePresence mode="wait">
        {!hasHydrated || phase === "welcome" ? (
          <WelcomeScreen key="welcome" />
        ) : phase === "playing" ? (
          <GameScreen key="playing" />
        ) : (
          <ResultScreen key="result" />
        )}
      </AnimatePresence>

      <footer className="mt-10 text-center text-xs text-ink-soft/60">
        Desafio Bíblico · IEPP — Feito com fé e tecnologia ✨
      </footer>
    </main>
  );
}
