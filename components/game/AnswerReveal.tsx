"use client";

import { motion } from "framer-motion";
import type { Question } from "@/types";
import type { LastResult } from "@/store/gameStore";
import { Button } from "@/components/ui/Button";

interface AnswerRevealProps {
  question: Question;
  result: LastResult;
  hasMore: boolean;
  onNext: () => void;
  onFinish: () => void;
}

export function AnswerReveal({
  question,
  result,
  hasMore,
  onNext,
  onFinish,
}: AnswerRevealProps) {
  const { correct, pointsEarned, expired } = result;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="mt-6"
    >
      <div
        className={`rounded-2xl border-2 p-5 text-center backdrop-blur-md ${
          correct
            ? "border-success/60 bg-success/15"
            : "border-danger/60 bg-danger/15"
        }`}
      >
        <p className="font-display text-2xl font-bold md:text-3xl">
          {correct ? "🎉 CORRETO!" : expired ? "⏳ TEMPO ESGOTADO!" : "❌ INCORRETO!"}
        </p>

        {correct ? (
          <motion.p
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            className="mt-1 font-numeric text-xl font-bold text-gold-light"
          >
            +{pointsEarned.toLocaleString("pt-BR")} pontos
          </motion.p>
        ) : (
          <p className="mt-2 text-ink-soft">
            Resposta correta:{" "}
            <strong className="text-ink">
              {question.options[question.correct]}
            </strong>
          </p>
        )}

        {question.ref && (
          <p className="mt-2 text-sm text-ink-soft">
            📖 <strong className="text-gold-light">{question.ref}</strong>
          </p>
        )}
      </div>

      <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
        {hasMore ? (
          <Button variant="gold" size="lg" onClick={onNext}>
            Próxima Pergunta →
          </Button>
        ) : (
          <p className="text-center text-gold-light">
            🏆 Todas as perguntas desta categoria foram respondidas!
          </p>
        )}
        <Button variant="ghost" size="lg" onClick={onFinish}>
          Encerrar e ver resultado
        </Button>
      </div>
    </motion.div>
  );
}
