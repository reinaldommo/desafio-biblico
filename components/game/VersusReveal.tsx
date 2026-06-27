"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import type { Question, TeamIndex } from "@/types";
import { Button } from "@/components/ui/Button";

function teamEmoji(i: TeamIndex) {
  return i === 0 ? "🦁" : "🦅";
}

export function VersusReveal({ question }: { question: Question }) {
  const stealPhase = useGameStore((s) => s.stealPhase);
  const firstSelected = useGameStore((s) => s.firstSelected);
  const currentTeam = useGameStore((s) => s.currentTeam);
  const teams = useGameStore((s) => s.teams);
  const versusResult = useGameStore((s) => s.versusResult);
  const resolveSteal = useGameStore((s) => s.resolveSteal);
  const nextTurn = useGameStore((s) => s.nextTurn);

  const opp = (1 - currentTeam) as TeamIndex;

  // ───────────── Fase de ROUBO (rebote) ─────────────
  if (stealPhase) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6"
      >
        <div className="rounded-2xl border-2 border-royal-accent/60 bg-royal-accent/15 p-5 text-center">
          <p className="font-display text-2xl font-bold md:text-3xl">
            🔁 Chance de Roubo!
          </p>
          <p className="mt-1 text-ink-soft">
            {teamEmoji(currentTeam)}{" "}
            <strong className="text-ink">{teams[currentTeam].name}</strong>{" "}
            {versusResult?.selectedIndex === null ? "perdeu o tempo" : "errou"}.{" "}
            <strong className="text-royal-accent">
              {teamEmoji(opp)} {teams[opp].name}
            </strong>{" "}
            pode roubar os pontos!
          </p>
        </div>

        <p className="mt-5 text-center text-sm uppercase tracking-wider text-ink-soft">
          {teams[opp].name}, escolha a resposta:
        </p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {question.options.map((opt, i) => {
            const blocked = i === firstSelected;
            return (
              <motion.button
                key={i}
                type="button"
                disabled={blocked}
                onClick={() => resolveSteal(i)}
                whileHover={blocked ? undefined : { scale: 1.025 }}
                whileTap={blocked ? undefined : { scale: 0.98 }}
                className={`flex items-center gap-4 rounded-2xl border-2 p-4 text-left backdrop-blur-md transition-colors md:p-5 ${
                  blocked
                    ? "border-white/5 bg-white/[0.02] opacity-30 line-through"
                    : "border-royal-accent/30 bg-white/[0.05] hover:border-royal-accent hover:bg-white/[0.1]"
                }`}
              >
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-royal-gradient font-display text-base font-bold text-white md:h-11 md:w-11 md:text-lg">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-base font-medium text-ink md:text-xl">
                  {opt}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    );
  }

  // ───────────── Revelação FINAL ─────────────
  if (!versusResult) return null;
  const { outcome, scoringTeam, points, penalty, relampago, wager } = versusResult;

  const headline =
    outcome === "correct"
      ? "🎉 CORRETO!"
      : outcome === "stolen"
        ? "🦹 ROUBO!"
        : "❌ NINGUÉM ACERTOU";
  const tone =
    outcome === "missed"
      ? "border-danger/60 bg-danger/15"
      : outcome === "stolen"
        ? "border-royal-accent/60 bg-royal-accent/15"
        : "border-success/60 bg-success/15";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mt-6"
    >
      <div className={`rounded-2xl border-2 p-5 text-center backdrop-blur-md ${tone}`}>
        <p className="font-display text-2xl font-bold md:text-3xl">{headline}</p>

        {scoringTeam !== null ? (
          <motion.p
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.15 }}
            className="mt-1 font-numeric text-xl font-bold text-gold-light"
          >
            {teamEmoji(scoringTeam)} {teams[scoringTeam].name} +
            {points.toLocaleString("pt-BR")} pontos
            {relampago && <span className="text-royal-accent"> ⚡</span>}
            {wager && outcome === "correct" && (
              <span className="text-gold"> 🎲</span>
            )}
          </motion.p>
        ) : (
          <p className="mt-2 text-ink-soft">
            Resposta correta:{" "}
            <strong className="text-ink">
              {question.options[question.correct]}
            </strong>
          </p>
        )}

        {penalty > 0 && (
          <p className="mt-1 text-sm font-semibold text-danger">
            🎲 {teams[currentTeam].name} perdeu {penalty.toLocaleString("pt-BR")}{" "}
            pontos na aposta
          </p>
        )}

        {scoringTeam !== null && (
          <p className="mt-2 text-sm text-ink-soft">
            Resposta correta:{" "}
            <strong className="text-ink">
              {question.options[question.correct]}
            </strong>
          </p>
        )}

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
