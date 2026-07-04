import type { Difficulty } from "@/types";
import { SCORING_CONFIG } from "./constants";

/** Pontos base por dificuldade — as perguntas valem sempre este valor fechado. */
export function basePoints(difficulty: Difficulty): number {
  return SCORING_CONFIG.base[difficulty];
}
