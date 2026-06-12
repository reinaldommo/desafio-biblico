"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { Button } from "@/components/ui/Button";
import { StatsBar } from "@/components/hud/StatsBar";

export function DrawPanel() {
  const drawQuestion = useGameStore((s) => s.drawQuestion);
  const remainingFn = useGameStore((s) => s.remaining);
  const easyRemaining = remainingFn("easy");
  const hardRemaining = remainingFn("hard");
  const questionsPlayed = useGameStore((s) => s.questionsPlayed);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-strong mx-auto w-full max-w-2xl rounded-3xl p-6 text-center md:p-10"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="mb-2 text-5xl"
      >
        ✨📖✨
      </motion.div>
      <h2 className="font-display text-2xl text-gold-gradient md:text-3xl">
        {questionsPlayed === 0 ? "Escolha o nível e sorteie!" : "Próximo desafio"}
      </h2>
      <p className="mt-2 text-ink-soft">
        Sorteie uma pergunta para a equipe responder.
      </p>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button
          variant="success"
          size="xl"
          disabled={easyRemaining === 0}
          onClick={() => drawQuestion("easy")}
          className="flex-1"
        >
          🟢 Sortear Fácil/Média
        </Button>
        <Button
          variant="danger"
          size="xl"
          disabled={hardRemaining === 0}
          onClick={() => drawQuestion("hard")}
          className="flex-1"
        >
          🔴 Sortear Difícil
        </Button>
      </div>

      <div className="mt-7">
        <StatsBar easyRemaining={easyRemaining} hardRemaining={hardRemaining} />
      </div>
    </motion.div>
  );
}
