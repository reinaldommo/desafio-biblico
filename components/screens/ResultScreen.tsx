"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { useConfetti } from "@/hooks/useConfetti";
import { rankPosition } from "@/lib/ranking";
import { Button } from "@/components/ui/Button";
import { RankingModal } from "@/components/ranking/RankingModal";
import type { TeamIndex } from "@/types";

function VersusResultScreen() {
  const reduce = useReducedMotion();
  const { celebrate } = useConfetti();

  const teams = useGameStore((s) => s.teams);
  const saveVersus = useGameStore((s) => s.saveVersus);
  const resetGame = useGameStore((s) => s.resetGame);

  const [saved, setSaved] = useState(false);
  const [showRanking, setShowRanking] = useState(false);

  const tie = teams[0].score === teams[1].score;
  const winner: TeamIndex = teams[0].score >= teams[1].score ? 0 : 1;
  const loser: TeamIndex = (1 - winner) as TeamIndex;

  useEffect(() => {
    if (!reduce) celebrate();
  }, [reduce, celebrate]);

  const handleSave = () => {
    saveVersus();
    setSaved(true);
    setShowRanking(true);
  };

  const emoji = (i: TeamIndex) => (i === 0 ? "🦁" : "🦅");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto flex w-full max-w-2xl flex-col items-center text-center"
    >
      <div className="text-6xl">{tie ? "🤝" : "🏆"}</div>
      <h1 className="mt-2 font-display text-4xl font-extrabold text-shimmer md:text-5xl">
        {tie ? "Empate!" : "Temos um vencedor!"}
      </h1>

      {!tie && (
        <motion.p
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="mt-3 font-display text-2xl text-gold-gradient md:text-3xl"
        >
          {emoji(winner)} {teams[winner].name}
        </motion.p>
      )}

      <div className="mt-7 grid w-full grid-cols-2 gap-3">
        {([0, 1] as TeamIndex[]).map((i) => {
          const isWinner = !tie && i === winner;
          const played = teams[i].correct + teams[i].wrong;
          const acc = played > 0 ? Math.round((teams[i].correct / played) * 100) : 0;
          return (
            <div
              key={i}
              className={`glass rounded-2xl p-5 ${
                isWinner ? "ring-2 ring-gold/70" : "opacity-80"
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 font-display text-base text-gold-light">
                <span>{emoji(i)}</span>
                <span className="truncate">{teams[i].name}</span>
                {isWinner && <span>👑</span>}
              </div>
              <div className="my-1 font-numeric text-4xl font-extrabold text-gold-gradient">
                {teams[i].score.toLocaleString("pt-BR")}
              </div>
              <div className="mt-2 flex justify-center gap-3 text-xs text-ink-soft">
                <span className="text-success">✓ {teams[i].correct}</span>
                <span className="text-danger">✗ {teams[i].wrong}</span>
                <span className="text-gold-light">🔥 {teams[i].maxStreak}</span>
              </div>
              <div className="mt-1 text-xs text-ink-soft">{acc}% de acerto</div>
            </div>
          );
        })}
      </div>

      {!tie && (
        <p className="mt-4 text-sm text-ink-soft">
          {teams[winner].name} venceu por{" "}
          <strong className="text-gold-light">
            {(teams[winner].score - teams[loser].score).toLocaleString("pt-BR")}
          </strong>{" "}
          pontos de diferença.
        </p>
      )}

      {!saved ? (
        <div className="mt-7">
          <Button variant="gold" size="lg" onClick={handleSave}>
            💾 Salvar as duas no ranking
          </Button>
        </div>
      ) : (
        <p className="mt-6 text-success">✅ Resultados salvos no ranking!</p>
      )}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Button variant="gold" size="lg" onClick={resetGame}>
          🔄 Nova Disputa
        </Button>
        <Button variant="ghost" size="lg" onClick={() => setShowRanking(true)}>
          🏆 Ver Ranking
        </Button>
      </div>

      <RankingModal open={showRanking} onClose={() => setShowRanking(false)} />
    </motion.div>
  );
}

function SoloResultScreen() {
  const reduce = useReducedMotion();
  const { celebrate } = useConfetti();

  const score = useGameStore((s) => s.score);
  const correctCount = useGameStore((s) => s.correctCount);
  const wrongCount = useGameStore((s) => s.wrongCount);
  const maxStreak = useGameStore((s) => s.maxStreak);
  const questionsPlayed = useGameStore((s) => s.questionsPlayed);
  const teamName = useGameStore((s) => s.teamName);
  const ranking = useGameStore((s) => s.ranking);
  const saveScore = useGameStore((s) => s.saveScore);
  const resetGame = useGameStore((s) => s.resetGame);

  const [name, setName] = useState(teamName);
  const [saved, setSaved] = useState(false);
  const [showRanking, setShowRanking] = useState(false);

  const accuracy =
    questionsPlayed > 0 ? Math.round((correctCount / questionsPlayed) * 100) : 0;
  const position = rankPosition(ranking, score);

  useEffect(() => {
    if (!reduce && score > 0) celebrate();
  }, [reduce, celebrate, score]);

  const handleSave = () => {
    saveScore(name);
    setSaved(true);
    setShowRanking(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto flex w-full max-w-2xl flex-col items-center text-center"
    >
      <div className="text-6xl">🏆</div>
      <h1 className="mt-2 font-display text-4xl font-extrabold text-shimmer md:text-5xl">
        Fim de Jogo!
      </h1>
      <p className="mt-2 text-ink-soft">
        {teamName ? <strong className="text-gold-light">{teamName}</strong> : "Equipe"}, vocês marcaram
      </p>

      <motion.p
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="my-2 font-numeric text-6xl font-extrabold text-gold-gradient md:text-7xl"
      >
        {score.toLocaleString("pt-BR")}
      </motion.p>
      <p className="text-sm text-ink-soft">pontos · {position}º melhor resultado</p>

      <div className="mt-7 grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Acertos", value: correctCount, color: "text-success" },
          { label: "Erros", value: wrongCount, color: "text-danger" },
          { label: "Sequência máx.", value: maxStreak, color: "text-gold-light" },
          { label: "Aproveitamento", value: `${accuracy}%`, color: "text-royal-accent" },
        ].map((s) => (
          <div key={s.label} className="glass rounded-2xl px-3 py-4">
            <div className={`font-numeric text-2xl font-bold ${s.color}`}>
              {s.value}
            </div>
            <div className="text-[0.7rem] uppercase tracking-wider text-ink-soft">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {!saved ? (
        <div className="glass mt-7 w-full rounded-3xl p-6">
          <label className="mb-2 block text-left text-sm text-ink-soft">
            Salvar no ranking como:
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome da equipe"
              maxLength={28}
              className="flex-1 rounded-xl border border-gold/25 bg-night/40 px-4 py-3 text-ink outline-none placeholder:text-ink-soft/50 focus:border-gold/70"
            />
            <Button variant="gold" size="lg" onClick={handleSave}>
              💾 Salvar
            </Button>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-success">✅ Pontuação salva no ranking!</p>
      )}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Button variant="gold" size="lg" onClick={resetGame}>
          🔄 Jogar Novamente
        </Button>
        <Button variant="ghost" size="lg" onClick={() => setShowRanking(true)}>
          🏆 Ver Ranking
        </Button>
      </div>

      <RankingModal open={showRanking} onClose={() => setShowRanking(false)} />
    </motion.div>
  );
}

export function ResultScreen() {
  const mode = useGameStore((s) => s.mode);
  return mode === "versus" ? <VersusResultScreen /> : <SoloResultScreen />;
}
