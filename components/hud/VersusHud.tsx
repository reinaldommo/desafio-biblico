"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import { isRelampago, roundOf } from "@/store/gameStore";
import type { TeamIndex } from "@/types";

function TeamScore({ team, active }: { team: TeamIndex; active: boolean }) {
  const name = useGameStore((s) => s.teams[team].name);
  const score = useGameStore((s) => s.teams[team].score);
  const streak = useGameStore((s) => s.teams[team].streak);

  const count = useMotionValue(score);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString("pt-BR"));

  useEffect(() => {
    const controls = animate(count, score, { duration: 0.6, ease: "easeOut" });
    return controls.stop;
  }, [score, count]);

  const emoji = team === 0 ? "🦁" : "🦅";

  return (
    <div
      className={`flex flex-1 flex-col items-center rounded-2xl px-3 py-2 transition-all ${
        active ? "bg-gold/10 ring-2 ring-gold/60" : "opacity-70"
      }`}
    >
      <span className="flex max-w-full items-center gap-1.5 truncate font-display text-sm text-gold-light md:text-base">
        <span>{emoji}</span>
        <span className="truncate">{name}</span>
      </span>
      <motion.span
        key={score}
        className="font-numeric text-2xl font-extrabold text-gold-gradient md:text-4xl"
      >
        {rounded}
      </motion.span>
      <span className="h-4 text-xs text-gold-light">
        {streak >= 2 ? `🔥 ${streak} seguidas` : ""}
      </span>
    </div>
  );
}

export function VersusHud() {
  const mode = useGameStore((s) => s.mode);
  const currentTeam = useGameStore((s) => s.currentTeam);
  const holderTeam = useGameStore((s) => s.holderTeam);
  const holderName = useGameStore((s) => s.teams[s.holderTeam].name);
  const hasQuestion = useGameStore((s) => s.current !== null);
  const turnIndex = useGameStore((s) => s.turnIndex);
  const totalRounds = useGameStore((s) => s.totalRounds);

  const isPassa = mode === "passa";
  const round = roundOf(turnIndex);
  const relampago = mode === "versus" && isRelampago(turnIndex);
  // No passa e repassa, o destaque segue a equipe que segura a pergunta.
  const highlight = isPassa && hasQuestion ? holderTeam : currentTeam;

  return (
    <div className="glass rounded-2xl px-4 py-3">
      <div className="flex items-center justify-between gap-2">
        <TeamScore team={0} active={highlight === 0} />
        <div className="flex flex-col items-center px-1">
          <span className="text-2xl md:text-3xl">{isPassa ? "🔁" : "⚔️"}</span>
          <span className="whitespace-nowrap text-[0.65rem] uppercase tracking-wider text-ink-soft">
            Rodada {round}/{totalRounds}
          </span>
          {isPassa && hasQuestion && (
            <span className="max-w-[8rem] truncate whitespace-nowrap text-[0.65rem] text-gold-light">
              📌 com {holderName}
            </span>
          )}
        </div>
        <TeamScore team={1} active={highlight === 1} />
      </div>
      {relampago && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-center text-xs font-bold uppercase tracking-widest text-royal-accent"
        >
          ⚡ Rodada Relâmpago — pontos em dobro!
        </motion.div>
      )}
    </div>
  );
}
