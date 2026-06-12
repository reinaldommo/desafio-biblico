import type { Difficulty } from "@/types";
import { SCORING_CONFIG } from "./constants";

/** Pontos base por dificuldade. */
export function basePoints(difficulty: Difficulty): number {
  return SCORING_CONFIG.base[difficulty];
}

/**
 * Multiplicador de streak. `streak` é a sequência ATUAL incluindo o acerto
 * que está sendo pontuado (1 = primeiro acerto, sem bônus).
 */
export function streakMultiplier(streak: number): number {
  const mult = 1 + SCORING_CONFIG.streakStep * Math.max(0, streak - 1);
  return Math.min(mult, SCORING_CONFIG.streakMax);
}

/** Bônus de tempo proporcional ao tempo restante (0 se timer desligado). */
export function timeBonus(
  base: number,
  remaining: number,
  total: number,
): number {
  if (total <= 0 || remaining <= 0) return 0;
  const frac = Math.min(remaining / total, 1);
  return Math.round(base * SCORING_CONFIG.timeBonusFraction * frac);
}

export interface ScoreInput {
  difficulty: Difficulty;
  streak: number; // sequência incluindo este acerto
  timerEnabled: boolean;
  remaining: number;
  total: number;
}

/** Calcula os pontos ganhos por um acerto. */
export function computeScore({
  difficulty,
  streak,
  timerEnabled,
  remaining,
  total,
}: ScoreInput): number {
  const base = basePoints(difficulty);
  const withStreak = Math.round(base * streakMultiplier(streak));
  const bonus = timerEnabled ? timeBonus(base, remaining, total) : 0;
  return withStreak + bonus;
}
