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
}
