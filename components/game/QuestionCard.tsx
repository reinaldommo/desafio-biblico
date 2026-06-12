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

export function QuestionCard() {
  const reduce = useReducedMotion();
  const { burst } = useConfetti();

  const current = useGameStore((s) => s.current);
  const answered = useGameStore((s) => s.answered);
  const selectedOption = useGameStore((s) => s.selectedOption);
  const eliminatedOptions = useGameStore((s) => s.eliminatedOptions);
  const pastorHint = useGameStore((s) => s.pastorHint);
  const lastResult = useGameStore((s) => s.lastResult);
  const timerEnabled = useGameStore((s) => s.timerEnabled);
  const timerSeconds = useGameStore((s) => s.timerSeconds);

  const selectOption = useGameStore((s) => s.selectOption);
  const timerExpired = useGameStore((s) => s.timerExpired);
  const nextRound = useGameStore((s) => s.nextRound);
  const finishGame = useGameStore((s) => s.finishGame);
  const remainingFn = useGameStore((s) => s.remaining);
  const currentCategory = useGameStore((s) => s.currentCategory);

  const { remaining } = useTimer({
    seconds: timerSeconds,
    enabled: timerEnabled,
    resetKey: current?.num,
    paused: answered,
    onExpire: timerExpired,
  });

  // Confete ao acertar
  useEffect(() => {
    if (answered && lastResult?.correct && !reduce) burst();
  }, [answered, lastResult, burst, reduce]);

  if (!current) return null;

  const hasMore =
    currentCategory != null && remainingFn(currentCategory) > 0;

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
        <span className="font-numeric text-sm text-ink-soft">
          Pergunta #{current.num}
        </span>
        {timerEnabled && !answered && (
          <Timer remaining={remaining} total={timerSeconds} />
        )}
      </div>

      <motion.h2
        animate={
          answered && lastResult && !lastResult.correct && !reduce
            ? { x: [0, -8, 8, -6, 6, 0] }
            : {}
        }
        className="text-balance text-center font-display text-2xl font-semibold leading-snug text-ink md:text-4xl lg:text-[2.6rem]"
      >
        {current.q}
      </motion.h2>

      {!answered && (
        <div className="mt-5">
          <HelpBar />
        </div>
      )}

      <AnimatePresence>
        {pastorHint && !answered && <PastorHint hint={pastorHint} />}
      </AnimatePresence>

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
            onSelect={(idx) => selectOption(idx, remaining)}
          />
        ))}
      </div>

      <AnimatePresence>
        {answered && lastResult && (
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
