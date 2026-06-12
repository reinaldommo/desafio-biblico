import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  DrawCategory,
  GamePhase,
  HelpsState,
  Question,
  QuestionPool,
  ScoreEntry,
} from "@/types";
import { questions } from "@/data/questions";
import { pickRandom, removeQuestion, pickEliminations } from "@/lib/draw";
import { computeScore } from "@/lib/scoring";
import { addToRanking } from "@/lib/ranking";
import { randomPastorHint } from "@/lib/pastorHints";
import {
  HELP_LIMITS,
  RANKING_MAX_ENTRIES,
  TIMER_DEFAULT_SECONDS,
} from "@/lib/constants";

/** Resultado da última rodada respondida (para feedback visual). */
export interface LastResult {
  correct: boolean;
  pointsEarned: number;
  correctIndex: number;
  selectedIndex: number | null;
  expired: boolean;
}

interface GameState {
  hasHydrated: boolean;

  // Config
  timerEnabled: boolean;
  timerSeconds: number;
  teamName: string;

  // Fase / progresso
  phase: GamePhase;
  available: QuestionPool;
  current: Question | null;
  currentCategory: DrawCategory | null;
  selectedOption: number | null;
  answered: boolean;
  eliminatedOptions: number[];
  pastorHint: string | null;
  lastResult: LastResult | null;

  // Gamificação
  score: number;
  streak: number;
  maxStreak: number;
  correctCount: number;
  wrongCount: number;
  questionsPlayed: number;

  // Ajudas (usos restantes)
  helps: HelpsState;

  // Ranking persistido
  ranking: ScoreEntry[];

  // Ações
  setHydrated: () => void;
  setConfig: (cfg: Partial<{ timerEnabled: boolean; timerSeconds: number; teamName: string }>) => void;
  startGame: () => void;
  drawQuestion: (category: DrawCategory) => void;
  selectOption: (index: number, remainingSeconds?: number) => void;
  useEliminate: () => void;
  usePastor: () => void;
  useSkip: () => void;
  timerExpired: () => void;
  nextRound: () => void;
  finishGame: () => void;
  saveScore: (teamName: string) => void;
  resetGame: () => void;
  remaining: (category: DrawCategory) => number;
}

function freshPool(): QuestionPool {
  return {
    easy: [...questions.easy],
    medium: [...questions.medium],
    hard: [...questions.hard],
  };
}

const initialRoundState = {
  current: null as Question | null,
  currentCategory: null as DrawCategory | null,
  selectedOption: null as number | null,
  answered: false,
  eliminatedOptions: [] as number[],
  pastorHint: null as string | null,
  lastResult: null as LastResult | null,
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      hasHydrated: false,

      timerEnabled: false,
      timerSeconds: TIMER_DEFAULT_SECONDS,
      teamName: "",

      phase: "welcome",
      available: freshPool(),
      ...initialRoundState,

      score: 0,
      streak: 0,
      maxStreak: 0,
      correctCount: 0,
      wrongCount: 0,
      questionsPlayed: 0,

      helps: { ...HELP_LIMITS },

      ranking: [],

      setHydrated: () => set({ hasHydrated: true }),

      setConfig: (cfg) => set((s) => ({ ...s, ...cfg })),

      startGame: () =>
        set({
          phase: "playing",
          available: freshPool(),
          ...initialRoundState,
          score: 0,
          streak: 0,
          maxStreak: 0,
          correctCount: 0,
          wrongCount: 0,
          questionsPlayed: 0,
          helps: { ...HELP_LIMITS },
        }),

      drawQuestion: (category) => {
        const { available } = get();
        const pool =
          category === "easy"
            ? [...available.easy, ...available.medium]
            : [...available.hard];

        const picked = pickRandom(pool);
        if (!picked) return;

        const nextAvailable: QuestionPool = {
          easy: removeQuestion(available.easy, picked),
          medium: removeQuestion(available.medium, picked),
          hard: removeQuestion(available.hard, picked),
        };

        set({
          available: nextAvailable,
          current: picked,
          currentCategory: category,
          selectedOption: null,
          answered: false,
          eliminatedOptions: [],
          pastorHint: null,
          lastResult: null,
        });
      },

      selectOption: (index, remainingSeconds) => {
        const state = get();
        const q = state.current;
        if (!q || state.answered) return;

        const correct = index === q.correct;
        const newStreak = correct ? state.streak + 1 : 0;
        const remaining =
          remainingSeconds ?? (state.timerEnabled ? state.timerSeconds : 0);
        const pointsEarned = correct
          ? computeScore({
              difficulty: q.difficulty,
              streak: newStreak,
              timerEnabled: state.timerEnabled,
              remaining,
              total: state.timerSeconds,
            })
          : 0;

        set({
          answered: true,
          selectedOption: index,
          score: state.score + pointsEarned,
          streak: newStreak,
          maxStreak: Math.max(state.maxStreak, newStreak),
          correctCount: state.correctCount + (correct ? 1 : 0),
          wrongCount: state.wrongCount + (correct ? 0 : 1),
          questionsPlayed: state.questionsPlayed + 1,
          lastResult: {
            correct,
            pointsEarned,
            correctIndex: q.correct,
            selectedIndex: index,
            expired: false,
          },
        });
      },

      useEliminate: () => {
        const state = get();
        if (
          !state.current ||
          state.answered ||
          state.helps.eliminate <= 0 ||
          state.eliminatedOptions.length > 0
        )
          return;
        set({
          eliminatedOptions: pickEliminations(state.current, 2),
          helps: { ...state.helps, eliminate: state.helps.eliminate - 1 },
        });
      },

      usePastor: () => {
        const state = get();
        if (!state.current || state.answered || state.helps.pastor <= 0) return;
        set({
          pastorHint: randomPastorHint(),
          helps: { ...state.helps, pastor: state.helps.pastor - 1 },
        });
      },

      useSkip: () => {
        const state = get();
        if (!state.current || state.helps.skip <= 0) return;
        set({
          helps: { ...state.helps, skip: state.helps.skip - 1 },
          ...initialRoundState,
        });
      },

      timerExpired: () => {
        const state = get();
        const q = state.current;
        if (!q || state.answered) return;
        set({
          answered: true,
          selectedOption: null,
          streak: 0,
          wrongCount: state.wrongCount + 1,
          questionsPlayed: state.questionsPlayed + 1,
          lastResult: {
            correct: false,
            pointsEarned: 0,
            correctIndex: q.correct,
            selectedIndex: null,
            expired: true,
          },
        });
      },

      nextRound: () => set({ ...initialRoundState }),

      finishGame: () => set({ phase: "result", ...initialRoundState }),

      saveScore: (teamName) => {
        const state = get();
        const entry: ScoreEntry = {
          id:
            typeof crypto !== "undefined" && "randomUUID" in crypto
              ? crypto.randomUUID()
              : `${Date.now()}-${Math.floor(Math.random() * 1e6)}`,
          teamName: teamName.trim() || "Equipe",
          score: state.score,
          maxStreak: state.maxStreak,
          correct: state.correctCount,
          wrong: state.wrongCount,
          date: new Date().toISOString(),
        };
        set({ ranking: addToRanking(state.ranking, entry).slice(0, RANKING_MAX_ENTRIES) });
      },

      resetGame: () =>
        set({
          phase: "welcome",
          available: freshPool(),
          ...initialRoundState,
          score: 0,
          streak: 0,
          maxStreak: 0,
          correctCount: 0,
          wrongCount: 0,
          questionsPlayed: 0,
          helps: { ...HELP_LIMITS },
        }),

      remaining: (category) => {
        const { available } = get();
        return category === "easy"
          ? available.easy.length + available.medium.length
          : available.hard.length;
      },
    }),
    {
      name: "desafio-biblico:state",
      storage: createJSONStorage(() => localStorage),
      // Persistir apenas ranking + config (não o tick do jogo nem o timer).
      partialize: (s) => ({
        ranking: s.ranking,
        timerEnabled: s.timerEnabled,
        timerSeconds: s.timerSeconds,
        teamName: s.teamName,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
