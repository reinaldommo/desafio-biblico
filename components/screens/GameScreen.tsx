"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { ScoreBoard } from "@/components/hud/ScoreBoard";
import { StreakIndicator } from "@/components/hud/StreakIndicator";
import { VersusHud } from "@/components/hud/VersusHud";
import { DrawPanel } from "@/components/game/DrawPanel";
import { QuestionCard } from "@/components/game/QuestionCard";
import { Button } from "@/components/ui/Button";
import { RankingModal } from "@/components/ranking/RankingModal";

export function GameScreen() {
  const mode = useGameStore((s) => s.mode);
  const current = useGameStore((s) => s.current);
  const score = useGameStore((s) => s.score);
  const streak = useGameStore((s) => s.streak);
  const teamName = useGameStore((s) => s.teamName);
  const finishGame = useGameStore((s) => s.finishGame);
  const [showRanking, setShowRanking] = useState(false);

  const isTeam = mode !== "solo";

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      {/* HUD */}
      {isTeam ? (
        <VersusHud />
      ) : (
        <div className="glass flex items-center justify-between gap-4 rounded-2xl px-5 py-3">
          <div className="min-w-0">
            <p className="truncate font-display text-sm text-gold-light md:text-base">
              {teamName || "Equipe"}
            </p>
            <button
              onClick={() => setShowRanking(true)}
              className="text-xs text-ink-soft underline-offset-2 hover:underline"
            >
              🏆 ranking
            </button>
          </div>
          <div className="flex items-center gap-6">
            <StreakIndicator streak={streak} />
            <ScoreBoard score={score} />
          </div>
        </div>
      )}

      {/* Conteúdo */}
      <AnimatePresence mode="wait">
        {current ? (
          <QuestionCard key={`q-${current.num}`} />
        ) : (
          <motion.div key="draw">
            <DrawPanel />
          </motion.div>
        )}
      </AnimatePresence>

      {!current && (
        <div className="flex justify-center">
          <Button variant="ghost" size="md" onClick={finishGame}>
            Encerrar e ver resultado
          </Button>
        </div>
      )}

      <RankingModal open={showRanking} onClose={() => setShowRanking(false)} />
    </div>
  );
}
