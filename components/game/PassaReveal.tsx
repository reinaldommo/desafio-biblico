"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import type { Question, TeamIndex } from "@/types";
import { Button } from "@/components/ui/Button";

function teamEmoji(i: TeamIndex) {
  return i === 0 ? "🦁" : "🦅";
}

/** Revelação do resultado no modo Passa e Repassa (resposta ou desafio julgado). */
export function PassaReveal({ question }: { question: Question }) {
  const teams = useGameStore((s) => s.teams);
  const versusResult = useGameStore((s) => s.versusResult);
  const challenge = useGameStore((s) => s.challenge);
  const nextTurn = useGameStore((s) => s.nextTurn);

  if (!versusResult) return null;
  const { outcome, scoringTeam, points, selectedIndex } = versusResult;

  const headline =
    outcome === "correct"
      ? "🎉 CORRETO!"
      : outcome === "challenge-done"
        ? "🎭 DESAFIO CUMPRIDO!"
        : outcome === "challenge-failed"
          ? "🎭 DESAFIO NÃO CUMPRIDO"
          : selectedIndex === null
            ? "⏳ TEMPO ESGOTADO!"
            : "❌ NINGUÉM PONTUOU";

  const success = outcome === "correct" || outcome === "challenge-done";
  const tone = success
    ? "border-success/60 bg-success/15"
    : "border-danger/60 bg-danger/15";

  const isChallenge = outcome === "challenge-done" || outcome === "challenge-failed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mt-6"
    >
      <div className={`rounded-2xl border-2 p-5 text-center backdrop-blur-md ${tone}`}>
        <p className="font-display text-2xl font-bold md:text-3xl">{headline}</p>

        {isChallenge && challenge && (
          <p className="mt-1 text-sm text-ink-soft">
            {challenge.emoji} {challenge.text}
          </p>
        )}

        {scoringTeam !== null && (
          <motion.p
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.15 }}
            className="mt-1 font-numeric text-xl font-bold text-gold-light"
          >
            {teamEmoji(scoringTeam)} {teams[scoringTeam].name} +
            {points.toLocaleString("pt-BR")} pontos
          </motion.p>
        )}

        <p className="mt-2 text-sm text-ink-soft">
          Resposta correta:{" "}
          <strong className="text-ink">
            {question.options[question.correct]}
          </strong>
        </p>

        {question.ref && (
          <p className="mt-2 text-sm text-ink-soft">
            📖 <strong className="text-gold-light">{question.ref}</strong>
          </p>
        )}
      </div>

      <div className="mt-5 flex justify-center">
        <Button variant="gold" size="lg" onClick={nextTurn}>
          Próxima vez →
        </Button>
      </div>
    </motion.div>
  );
}
