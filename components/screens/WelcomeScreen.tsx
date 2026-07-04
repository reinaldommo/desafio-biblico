"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { QUESTION_COUNTS } from "@/data/questions";
import { SCORING_CONFIG, VERSUS_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { RankingModal } from "@/components/ranking/RankingModal";

export function WelcomeScreen() {
  const mode = useGameStore((s) => s.mode);
  const teamName = useGameStore((s) => s.teamName);
  const teamNames = useGameStore((s) => s.teamNames);
  const totalRounds = useGameStore((s) => s.totalRounds);
  const timerEnabled = useGameStore((s) => s.timerEnabled);
  const timerSeconds = useGameStore((s) => s.timerSeconds);
  const manualReveal = useGameStore((s) => s.manualReveal);
  const setConfig = useGameStore((s) => s.setConfig);
  const setTeamName = useGameStore((s) => s.setTeamName);
  const startGame = useGameStore((s) => s.startGame);
  const startVersus = useGameStore((s) => s.startVersus);
  const startPassa = useGameStore((s) => s.startPassa);
  const [showRanking, setShowRanking] = useState(false);

  const isVersus = mode === "versus";
  const isPassa = mode === "passa";
  const isTeam = mode !== "solo";

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
        className="drop-shadow-[0_0_28px_rgba(245,182,66,0.45)]"
      >
        <Image
          src="/logo-iepp.png"
          alt="Logo da Igreja Evangélica Pentecostal de Presbiteriana"
          width={150}
          height={150}
          priority
          className="h-28 w-auto md:h-36"
        />
      </motion.div>

      <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight text-shimmer md:text-6xl lg:text-7xl">
        Desafio Bíblico
      </h1>
      <p className="mt-3 max-w-xl text-balance text-ink-soft md:text-lg">
        Momento de comunhão e conhecimento da Palavra de Deus — Igreja
        Evangélica Pentecostal Presbiteriana.
      </p>

      {/* Seletor de modo */}
      <div className="glass mt-8 inline-flex flex-wrap justify-center rounded-2xl p-1.5">
        {(
          [
            { value: "versus", label: "⚔️ Versus" },
            { value: "passa", label: "🔁 Passa e Repassa" },
            { value: "solo", label: "👤 1 Equipe" },
          ] as const
        ).map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setConfig({ mode: opt.value })}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors md:text-base ${
              mode === opt.value
                ? "bg-gold-gradient text-night"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="glass mt-5 w-full rounded-3xl p-6 md:p-8">
        {isTeam ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-left text-sm font-medium text-gold-light">
                🦁 Equipe 1
              </label>
              <input
                value={teamNames[0]}
                onChange={(e) => setTeamName(0, e.target.value)}
                placeholder="Ex.: Leões de Judá"
                maxLength={24}
                className="w-full rounded-xl border border-gold/25 bg-night/40 px-4 py-3 text-ink outline-none placeholder:text-ink-soft/50 focus:border-gold/70"
              />
            </div>
            <div>
              <label className="mb-2 block text-left text-sm font-medium text-gold-light">
                🦅 Equipe 2
              </label>
              <input
                value={teamNames[1]}
                onChange={(e) => setTeamName(1, e.target.value)}
                placeholder="Ex.: Águias de Sião"
                maxLength={24}
                className="w-full rounded-xl border border-gold/25 bg-night/40 px-4 py-3 text-ink outline-none placeholder:text-ink-soft/50 focus:border-gold/70"
              />
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}

        {isTeam && (
          <div className="mt-5 flex flex-col gap-2 text-left">
            <span className="text-sm font-medium text-ink-soft">
              🔁 Rodadas por equipe
            </span>
            <div className="flex items-center gap-2">
              {VERSUS_CONFIG.roundOptions.map((r) => (
                <button
                  key={r}
                  onClick={() => setConfig({ totalRounds: r })}
                  className={`rounded-lg px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                    totalRounds === r
                      ? "bg-gold-gradient text-night"
                      : "bg-white/[0.06] text-ink-soft hover:bg-white/[0.12]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5 flex items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={manualReveal}
              onClick={() => setConfig({ manualReveal: !manualReveal })}
              className={`relative h-7 w-12 flex-shrink-0 rounded-full transition-colors ${
                manualReveal ? "bg-gold" : "bg-white/15"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
                  manualReveal ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-left text-ink">
              🔎 Revelar resultado manualmente
              <span className="block text-xs text-ink-soft">
                Marque a resposta e revele com um botão.
              </span>
            </span>
          </label>
        </div>

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
        {isVersus ? (
          <>
            <p className="mb-2 font-display text-gold-light">⚔️ Como funciona o Versus</p>
            <ul className="space-y-1.5">
              <li>🔄 As equipes se revezam, sorteando e respondendo a cada rodada.</li>
              <li>🎲 <strong className="text-ink">Aposta</strong> — antes de sortear, vale dobro: acertou dobra, errou perde os pontos.</li>
              <li>🔁 <strong className="text-ink">Roubo (rebote)</strong> — se a equipe da vez erra, a adversária pode roubar os pontos.</li>
              <li>⚡ <strong className="text-ink">Rodada relâmpago</strong> — a cada {VERSUS_CONFIG.relampagoEvery} rodadas, todos os pontos valem em dobro.</li>
              <li>✂️🙏⏭️ Cada equipe tem suas próprias ajudas.</li>
            </ul>
          </>
        ) : isPassa ? (
          <>
            <p className="mb-2 font-display text-gold-light">🔁 Como funciona o Passa e Repassa</p>
            <ul className="space-y-1.5">
              <li>🔄 As equipes se revezam; a equipe da vez recebe a pergunta sorteada.</li>
              <li>↪️ <strong className="text-ink">Passar</strong> — se não souber, a equipe passa a pergunta para a adversária.</li>
              <li>↩️ <strong className="text-ink">Repassar</strong> — a adversária pode devolver; aí não dá mais para passar.</li>
              <li>🎭 <strong className="text-ink">Desafio</strong> — quem ficou com a pergunta pode pagar um desafio divertido; cumpriu, ganha os pontos da pergunta.</li>
              <li>❌ Errou ou estourou o tempo: ninguém pontua.</li>
              <li>✂️🙏⏭️ Cada equipe tem suas próprias ajudas — quem está com a pergunta usa as suas.</li>
            </ul>
          </>
        ) : (
          <>
            <p className="mb-2 font-display text-gold-light">🎁 Ajudas disponíveis</p>
            <ul className="space-y-1.5">
              <li>✂️ <strong className="text-ink">Eliminar 2</strong> — remove 2 alternativas erradas (1x)</li>
              <li>🙏 <strong className="text-ink">Pastor</strong> — uma dica para a equipe (1x)</li>
              <li>⏭️ <strong className="text-ink">Pular</strong> — passa para a próxima pergunta (3x)</li>
            </ul>
          </>
        )}
        <div className="divider-gold my-4" />
        <p className="text-center text-ink-soft">
          {QUESTION_COUNTS.total} perguntas · Fácil {SCORING_CONFIG.base.easy} · Média {SCORING_CONFIG.base.medium} · Difícil {SCORING_CONFIG.base.hard} pts
          {" · "}bônus de sequência 🔥
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          variant="gold"
          size="xl"
          onClick={isVersus ? startVersus : isPassa ? startPassa : startGame}
        >
          {isVersus
            ? "⚔️ Iniciar a Disputa"
            : isPassa
              ? "🔁 Iniciar Passa e Repassa"
              : "▶️ Começar o Desafio"}
        </Button>
        <Button variant="ghost" size="xl" onClick={() => setShowRanking(true)}>
          🏆 Ver Ranking
        </Button>
      </div>

      <RankingModal open={showRanking} onClose={() => setShowRanking(false)} />
    </motion.div>
  );
}
