"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { isRelampago, roundOf } from "@/store/gameStore";
import { Button } from "@/components/ui/Button";
import { StatsBar } from "@/components/hud/StatsBar";

export function DrawPanel() {
  const drawQuestion = useGameStore((s) => s.drawQuestion);
  const remainingFn = useGameStore((s) => s.remaining);
  const easyRemaining = remainingFn("easy");
  const hardRemaining = remainingFn("hard");
  const questionsPlayed = useGameStore((s) => s.questionsPlayed);

  const mode = useGameStore((s) => s.mode);
  const currentTeam = useGameStore((s) => s.currentTeam);
  const teamName = useGameStore((s) => (mode !== "solo" ? s.teams[currentTeam].name : ""));
  const turnIndex = useGameStore((s) => s.turnIndex);
  const totalRounds = useGameStore((s) => s.totalRounds);
  const wagerActive = useGameStore((s) => s.wagerActive);
  const toggleWager = useGameStore((s) => s.toggleWager);

  const isTeam = mode !== "solo";
  const relampago = mode === "versus" && isRelampago(turnIndex);
  const round = roundOf(turnIndex);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-strong mx-auto w-full max-w-2xl rounded-3xl p-6 text-center md:p-10"
    >
      {isTeam ? (
        <>
          <motion.p
            key={`${currentTeam}-${turnIndex}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-display text-lg text-ink-soft"
          >
            Rodada {round} de {totalRounds} · é a vez de
          </motion.p>
          <h2 className="mt-1 font-display text-3xl text-gold-gradient md:text-4xl">
            {currentTeam === 0 ? "🦁" : "🦅"} {teamName}
          </h2>
          {relampago && (
            <p className="mt-2 inline-block rounded-full bg-royal-accent/15 px-3 py-1 text-sm font-bold uppercase tracking-wider text-royal-accent">
              ⚡ Rodada Relâmpago — vale o dobro!
            </p>
          )}
          {mode === "passa" && (
            <p className="mt-2 text-sm text-ink-soft">
              🔁 A equipe pode responder ou passar a pergunta para a adversária.
            </p>
          )}

          {mode === "versus" && (
          <button
            type="button"
            onClick={toggleWager}
            className={`mt-5 flex w-full items-center justify-between gap-3 rounded-2xl border-2 p-4 text-left transition-colors ${
              wagerActive
                ? "border-gold bg-gold/15"
                : "border-gold/20 bg-white/[0.04] hover:border-gold/50"
            }`}
          >
            <span>
              <span className="font-display text-lg text-ink">🎲 Apostar — dobro ou nada</span>
              <span className="block text-sm text-ink-soft">
                Acertou: pontos em dobro. Errou: perde os pontos da pergunta.
              </span>
            </span>
            <span
              className={`relative h-7 w-12 flex-shrink-0 rounded-full transition-colors ${
                wagerActive ? "bg-gold" : "bg-white/15"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
                  wagerActive ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </span>
          </button>
          )}
        </>
      ) : (
        <>
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
        </>
      )}

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
