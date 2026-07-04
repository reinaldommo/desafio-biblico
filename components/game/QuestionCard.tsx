"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import { useTimer } from "@/hooks/useTimer";
import { useConfetti } from "@/hooks/useConfetti";
import { Badge } from "@/components/ui/Badge";
import { Timer } from "@/components/hud/Timer";
import { OptionButton } from "./OptionButton";
import { HelpBar } from "./HelpBar";
import { PastorHint } from "./PastorHint";
import { AnswerReveal } from "./AnswerReveal";
import { VersusReveal } from "./VersusReveal";
import { PassaActions } from "./PassaActions";
import { ChallengeCard } from "./ChallengeCard";
import { PassaReveal } from "./PassaReveal";

export function QuestionCard() {
  const reduce = useReducedMotion();
  const { burst } = useConfetti();

  const mode = useGameStore((s) => s.mode);
  const manualReveal = useGameStore((s) => s.manualReveal);
  const current = useGameStore((s) => s.current);
  const answered = useGameStore((s) => s.answered);
  const selectedOption = useGameStore((s) => s.selectedOption);
  const eliminatedOptions = useGameStore((s) => s.eliminatedOptions);
  const pastorHint = useGameStore((s) => s.pastorHint);
  const lastResult = useGameStore((s) => s.lastResult);
  const versusResult = useGameStore((s) => s.versusResult);
  const stealPhase = useGameStore((s) => s.stealPhase);
  const wagerActive = useGameStore((s) => s.wagerActive);
  const timerEnabled = useGameStore((s) => s.timerEnabled);
  const timerSeconds = useGameStore((s) => s.timerSeconds);
  const holderTeam = useGameStore((s) => s.holderTeam);
  const challenge = useGameStore((s) => s.challenge);

  const selectOption = useGameStore((s) => s.selectOption);
  const revealResult = useGameStore((s) => s.revealResult);
  const timerExpired = useGameStore((s) => s.timerExpired);
  const nextRound = useGameStore((s) => s.nextRound);
  const finishGame = useGameStore((s) => s.finishGame);
  const remainingFn = useGameStore((s) => s.remaining);
  const currentCategory = useGameStore((s) => s.currentCategory);

  const isVersus = mode === "versus";
  const isPassa = mode === "passa";
  const isTeam = mode !== "solo";

  // No modo manual, marcar a resposta congela o cronômetro até a revelação.
  const markedPending = manualReveal && !answered && selectedOption !== null;

  const { remaining } = useTimer({
    seconds: timerSeconds,
    enabled: timerEnabled,
    // No passa e repassa, cada equipe que recebe a pergunta ganha o tempo cheio.
    resetKey: isPassa ? `${current?.num}:${holderTeam}` : current?.num,
    paused: answered || markedPending || challenge !== null,
    onExpire: timerExpired,
  });

  // Confete ao pontuar
  useEffect(() => {
    if (reduce) return;
    if (isTeam) {
      if (answered && !stealPhase && versusResult?.scoringTeam != null) burst();
    } else if (answered && lastResult?.correct) {
      burst();
    }
  }, [answered, stealPhase, versusResult, lastResult, isTeam, burst, reduce]);

  if (!current) return null;

  const hasMore = currentCategory != null && remainingFn(currentCategory) > 0;
  const showGrid = (!isTeam || !answered) && !challenge;
  const wrongShake = answered && !reduce && (
    isTeam
      ? versusResult?.outcome === "missed"
      : lastResult != null && !lastResult.correct
  );

  return (
    <motion.div
      key={current.num}
      initial={{ opacity: 0, scale: 0.94, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -24 }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      className="glass-strong mx-auto w-full max-w-4xl rounded-3xl p-5 md:p-8"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <Badge difficulty={current.difficulty} />
        <div className="flex items-center gap-2">
          {isVersus && wagerActive && (
            <span className="rounded-full bg-gold/15 px-2.5 py-1 text-xs font-bold text-gold-light">
              🎲 Aposta
            </span>
          )}
          <span className="font-numeric text-sm text-ink-soft">
            Pergunta #{current.num}
          </span>
        </div>
        {timerEnabled && !answered && !challenge && (
          <Timer remaining={remaining} total={timerSeconds} />
        )}
      </div>

      <motion.h2
        animate={wrongShake ? { x: [0, -8, 8, -6, 6, 0] } : {}}
        className="text-balance text-center font-display text-2xl font-semibold leading-snug text-ink md:text-4xl lg:text-[2.6rem]"
      >
        {current.q}
      </motion.h2>

      {!answered && !challenge && (
        <div className="mt-5">
          <HelpBar />
        </div>
      )}

      {isPassa && !answered && !challenge && (
        <PassaActions markedPending={markedPending} />
      )}

      <AnimatePresence>
        {pastorHint && !answered && !challenge && <PastorHint hint={pastorHint} />}
      </AnimatePresence>

      <AnimatePresence>
        {isPassa && challenge && !answered && <ChallengeCard />}
      </AnimatePresence>

      {showGrid && (
        <div className="mt-6 grid gap-3 md:grid-cols-2 md:gap-4">
          {current.options.map((opt, i) => (
            <OptionButton
              key={i}
              index={i}
              label={String.fromCharCode(65 + i)}
              text={opt}
              eliminated={eliminatedOptions.includes(i)}
              answered={answered}
              isCorrect={i === current.correct}
              isSelected={i === selectedOption}
              marked={!answered && i === selectedOption}
              onSelect={(idx) => selectOption(idx, remaining)}
            />
          ))}
        </div>
      )}

      {markedPending && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex flex-col items-center gap-2"
        >
          <p className="text-sm text-ink-soft">
            Resposta marcada na alternativa{" "}
            <strong className="text-gold-light">
              {String.fromCharCode(65 + (selectedOption as number))}
            </strong>
            . Confirme para revelar o resultado.
          </p>
          <button
            type="button"
            onClick={revealResult}
            className="rounded-2xl bg-gold-gradient px-8 py-4 font-display text-lg font-bold tracking-wide text-night shadow-gold-glow transition-transform hover:scale-[1.03] active:scale-95"
          >
            🔎 Revelar resultado
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {answered && isVersus && <VersusReveal question={current} />}
        {answered && isPassa && <PassaReveal question={current} />}
        {answered && !isTeam && lastResult && (
          <AnswerReveal
            question={current}
            result={lastResult}
            hasMore={hasMore}
            onNext={nextRound}
            onFinish={finishGame}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
