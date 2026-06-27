export type Difficulty = "easy" | "medium" | "hard";

/** Categoria sorteável: "easy" agrupa fáceis+médias, "hard" só difíceis. */
export type DrawCategory = "easy" | "hard";

export type GamePhase = "welcome" | "playing" | "result";

export interface Question {
  q: string;
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  num: number;
  ref: string;
  difficulty: Difficulty;
}

export type QuestionPool = Record<Difficulty, Question[]>;

export interface HelpsState {
  eliminate: number;
  pastor: number;
  skip: number;
}

/** Modo de jogo: solo (1 equipe) ou versus (2 equipes disputando). */
export type GameMode = "solo" | "versus";

/** Índice da equipe no modo versus. */
export type TeamIndex = 0 | 1;

/** Estado de uma equipe no modo versus. */
export interface TeamState {
  name: string;
  score: number;
  correct: number;
  wrong: number;
  streak: number;
  maxStreak: number;
  helps: HelpsState;
}

/** Resultado de uma rodada no modo versus (para feedback visual). */
export interface VersusResult {
  /** correct = equipe da vez acertou; stolen = adversária roubou; missed = ninguém acertou. */
  outcome: "correct" | "stolen" | "missed";
  /** Equipe que pontuou nesta rodada (null se ninguém). */
  scoringTeam: TeamIndex | null;
  /** Pontos somados à equipe que pontuou. */
  points: number;
  /** Pontos perdidos pela equipe da vez (aposta perdida). */
  penalty: number;
  correctIndex: number;
  /** Alternativa escolhida pela equipe da vez (null se o tempo esgotou). */
  selectedIndex: number | null;
  /** Alternativa escolhida pela adversária no roubo (null se não houve roubo). */
  stealIndex: number | null;
  /** A equipe da vez havia apostado (dobro ou nada). */
  wager: boolean;
  /** A rodada era relâmpago (pontos em dobro). */
  relampago: boolean;
}

export interface ScoreEntry {
  id: string;
  teamName: string;
  score: number;
  maxStreak: number;
  correct: number;
  wrong: number;
  date: string;
}

export interface GameConfig {
  timerEnabled: boolean;
  timerSeconds: number;
  teamName: string;
  mode: GameMode;
  teamNames: [string, string];
  totalRounds: number;
  /** Marcar a resposta e revelar o resultado em dois passos (botão "Revelar"). */
  manualReveal: boolean;
}
