import type { Difficulty } from "@/types";

export const SCORING_CONFIG = {
  base: {
    easy: 200,
    medium: 200,
    hard: 300,
  } as Record<Difficulty, number>,
};

export const HELP_LIMITS = {
  eliminate: 1,
  pastor: 1,
  skip: 3,
};

export const TIMER_DEFAULT_SECONDS = 30;

/** Configuração do modo VERSUS (2 equipes). */
export const VERSUS_CONFIG = {
  /** Opções de número de rodadas por equipe. */
  roundOptions: [6, 8, 10, 12],
  /** Padrão de rodadas por equipe. */
  defaultRounds: 8,
  /** A cada N rodadas, uma rodada relâmpago (pontos em dobro). */
  relampagoEvery: 3,
  /** Multiplicador da rodada relâmpago. */
  relampagoMultiplier: 2,
  /** Multiplicador da aposta (dobro ou nada). */
  wagerMultiplier: 2,
};

export const VERSUS_DEFAULT_NAMES: [string, string] = [
  "Leões de Judá",
  "Águias de Sião",
];

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
