"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import type { TeamIndex } from "@/types";
import { Button } from "@/components/ui/Button";
import { basePoints } from "@/lib/scoring";

function teamEmoji(i: TeamIndex) {
  return i === 0 ? "🦁" : "🦅";
}

/** Desafio sorteado no Passa e Repassa, julgado pelo operador (cumprido ou não). */
export function ChallengeCard() {
  const challenge = useGameStore((s) => s.challenge);
  const current = useGameStore((s) => s.current);
  const holderTeam = useGameStore((s) => s.holderTeam);
  const teams = useGameStore((s) => s.teams);
  const resolveChallenge = useGameStore((s) => s.resolveChallenge);

  if (!challenge || !current) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ type: "spring", stiffness: 240, damping: 24 }}
      className="mt-6"
    >
      <div className="rounded-2xl border-2 border-gold/50 bg-gold/10 p-6 text-center backdrop-blur-md">
        <motion.p
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, delay: 0.1 }}
          className="text-5xl md:text-6xl"
        >
          {challenge.emoji}
        </motion.p>
        <p className="mt-2 font-display text-xl font-bold text-gold-light md:text-2xl">
          🎭 Desafio para {teamEmoji(holderTeam)} {teams[holderTeam].name}
        </p>
        <p className="mt-3 text-balance text-lg font-medium text-ink md:text-2xl">
          {challenge.text}
        </p>
        <p className="mt-3 text-sm text-ink-soft">
          Vale{" "}
          <strong className="font-numeric text-gold-light">
            {basePoints(current.difficulty).toLocaleString("pt-BR")} pontos
          </strong>{" "}
          se for cumprido.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <Button variant="success" size="lg" onClick={() => resolveChallenge(true)}>
          ✅ Cumprido
        </Button>
        <Button variant="danger" size="lg" onClick={() => resolveChallenge(false)}>
          ❌ Não cumprido
        </Button>
      </div>
    </motion.div>
  );
}
