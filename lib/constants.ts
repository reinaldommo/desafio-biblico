import type { Difficulty } from "@/types";

export const SCORING_CONFIG = {
  base: {
    easy: 100,
    medium: 200,
    hard: 300,
  } as Record<Difficulty, number>,
  /** Acréscimo por ponto de streak (10% por acerto consecutivo). */
  streakStep: 0.1,
  /** Teto do multiplicador de streak. */
  streakMax: 1.5,
  /** Fração da base disponível como bônus de tempo (50%). */
  timeBonusFraction: 0.5,
};

export const HELP_LIMITS = {
  eliminate: 1,
  pastor: 1,
  skip: 3,
};

export const TIMER_DEFAULT_SECONDS = 30;

export const RANKING_MAX_ENTRIES = 10;
export const RANKING_STORAGE_KEY = "desafio-biblico:ranking";

/** Rótulos e cores por dificuldade (para badges/HUD). */
export const DIFFICULTY_META: Record<
  Difficulty,
  { label: string; short: string }
> = {
  easy: { label: "Fácil", short: "FÁCIL" },
  medium: { label: "Média", short: "MÉDIA" },
  hard: { label: "Difícil", short: "DIFÍCIL" },
};
