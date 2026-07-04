"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import type { TeamIndex } from "@/types";
import { Button } from "@/components/ui/Button";

function teamEmoji(i: TeamIndex) {
  return i === 0 ? "🦁" : "🦅";
}

/** Controles do modo Passa e Repassa: indicador de posse + passar / pagar desafio. */
export function PassaActions({ markedPending }: { markedPending: boolean }) {
  const holderTeam = useGameStore((s) => s.holderTeam);
  const passCount = useGameStore((s) => s.passCount);
  const teams = useGameStore((s) => s.teams);
  const passQuestion = useGameStore((s) => s.passQuestion);
  const acceptChallenge = useGameStore((s) => s.acceptChallenge);

  const other = (1 - holderTeam) as TeamIndex;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 flex flex-col items-center gap-2"
    >
      <p className="text-sm text-ink-soft">
        Pergunta com{" "}
        <strong className="text-gold-light">
          {teamEmoji(holderTeam)} {teams[holderTeam].name}
        </strong>
      </p>

      {passCount < 2 ? (
        <Button
          variant="purple"
          size="md"
          disabled={markedPending}
          onClick={passQuestion}
        >
          {passCount === 1
            ? `↩️ Repassar para ${teams[other].name}`
            : `↪️ Passar para ${teams[other].name}`}
        </Button>
      ) : (
        <>
          <Button variant="purple" size="md" onClick={acceptChallenge}>
            🎭 Pagar Desafio
          </Button>
          <p className="text-xs text-ink-soft">
            Não dá mais para passar: respondam, usem uma ajuda ou paguem o desafio.
          </p>
        </>
      )}
    </motion.div>
  );
}
