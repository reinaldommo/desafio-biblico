"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { QUESTION_COUNTS } from "@/data/questions";
import { Button } from "@/components/ui/Button";
import { RankingModal } from "@/components/ranking/RankingModal";

export function WelcomeScreen() {
  const teamName = useGameStore((s) => s.teamName);
  const timerEnabled = useGameStore((s) => s.timerEnabled);
  const timerSeconds = useGameStore((s) => s.timerSeconds);
  const setConfig = useGameStore((s) => s.setConfig);
  const startGame = useGameStore((s) => s.startGame);
  const [showRanking, setShowRanking] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      className="mx-auto flex w-full max-w-3xl flex-col items-center text-center"
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="text-6xl md:text-7xl"
      >
        ✝️
      </motion.div>

      <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight text-shimmer md:text-6xl lg:text-7xl">
        Desafio Bíblico
      </h1>
      <p className="mt-3 max-w-xl text-balance text-ink-soft md:text-lg">
        Momento de comunhão e conhecimento da Palavra de Deus — Igreja
        Evangélica Pentecostal de Pinheiros.
      </p>

      <div className="glass mt-8 w-full rounded-3xl p-6 md:p-8">
        <label className="mb-2 block text-left text-sm font-medium text-ink-soft">
          Nome da equipe
        </label>
        <input
          value={teamName}
          onChange={(e) => setConfig({ teamName: e.target.value })}
          placeholder="Ex.: Leões de Judá"
          maxLength={28}
          className="w-full rounded-xl border border-gold/25 bg-night/40 px-4 py-3 text-ink outline-none placeholder:text-ink-soft/50 focus:border-gold/70"
        />

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex cursor-pointer items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={timerEnabled}
              onClick={() => setConfig({ timerEnabled: !timerEnabled })}
              className={`relative h-7 w-12 rounded-full transition-colors ${
                timerEnabled ? "bg-gold" : "bg-white/15"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
                  timerEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-ink">⏱️ Cronômetro por pergunta</span>
          </label>

          {timerEnabled && (
            <div className="flex items-center gap-2">
              {[20, 30, 45, 60].map((s) => (
                <button
                  key={s}
                  onClick={() => setConfig({ timerSeconds: s })}
                  className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                    timerSeconds === s
                      ? "bg-gold-gradient text-night"
                      : "bg-white/[0.06] text-ink-soft hover:bg-white/[0.12]"
                  }`}
                >
                  {s}s
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="glass mt-5 w-full rounded-3xl p-6 text-left text-sm text-ink-soft md:text-base">
        <p className="mb-2 font-display text-gold-light">🎁 Ajudas disponíveis</p>
        <ul className="space-y-1.5">
          <li>✂️ <strong className="text-ink">Eliminar 2</strong> — remove 2 alternativas erradas (1x)</li>
          <li>🙏 <strong className="text-ink">Pastor</strong> — uma dica para a equipe (1x)</li>
          <li>⏭️ <strong className="text-ink">Pular</strong> — passa para a próxima pergunta (3x)</li>
        </ul>
        <div className="divider-gold my-4" />
        <p className="text-center text-ink-soft">
          {QUESTION_COUNTS.total} perguntas · Fácil 100 · Média 200 · Difícil 300 pts
          {" · "}bônus de sequência 🔥
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button variant="gold" size="xl" onClick={startGame}>
          ▶️ Começar o Desafio
        </Button>
        <Button variant="ghost" size="xl" onClick={() => setShowRanking(true)}>
          🏆 Ver Ranking
        </Button>
      </div>

      <RankingModal open={showRanking} onClose={() => setShowRanking(false)} />
    </motion.div>
  );
}
