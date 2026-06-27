import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  DrawCategory,
  GameMode,
  GamePhase,
  HelpsState,
  Question,
  QuestionPool,
  ScoreEntry,
  TeamIndex,
  TeamState,
  VersusResult,
} from "@/types";
import { questions } from "@/data/questions";
import { pickRandom, removeQuestion, pickEliminations } from "@/lib/draw";
import { computeScore, basePoints } from "@/lib/scoring";
import { addToRanking } from "@/lib/ranking";
import { randomPastorHint } from "@/lib/pastorHints";
import {
  HELP_LIMITS,
  RANKING_MAX_ENTRIES,
  TIMER_DEFAULT_SECONDS,
  VERSUS_CONFIG,
  VERSUS_DEFAULT_NAMES,
} from "@/lib/constants";

/** Resultado da última rodada respondida (modo solo, para feedback visual). */
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
  mode: GameMode;
  teamNames: [string, string];
  totalRounds: number;
  manualReveal: boolean;

  // Fase / progresso
  phase: GamePhase;
  available: QuestionPool;
  current: Question | null;
  currentCategory: DrawCategory | null;
  selectedOption: number | null;
  markedRemaining: number | null;
  answered: boolean;
  eliminatedOptions: number[];
  pastorHint: string | null;
  lastResult: LastResult | null;

  // Gamificação (modo solo)
  score: number;
  streak: number;
  maxStreak: number;
  correctCount: number;
  wrongCount: number;
  questionsPlayed: number;

  // Ajudas (modo solo)
  helps: HelpsState;

  // Estado do modo VERSUS
  teams: [TeamState, TeamState];
  currentTeam: TeamIndex;
  turnIndex: number; // 0-based; cada turno = a vez de uma equipe
  wagerActive: boolean;
  stealPhase: boolean;
  firstSelected: number | null; // alternativa (errada) da equipe da vez
  versusResult: VersusResult | null;

  // Ranking persistido
  ranking: ScoreEntry[];

  // Ações comuns
  setHydrated: () => void;
  setConfig: (
    cfg: Partial<{
      timerEnabled: boolean;
      timerSeconds: number;
      teamName: string;
      mode: GameMode;
      totalRounds: number;
      manualReveal: boolean;
    }>,
  ) => void;
  setTeamName: (i: TeamIndex, name: string) => void;
  startGame: () => void;
  startVersus: () => void;
  drawQuestion: (category: DrawCategory) => void;
  selectOption: (index: number, remainingSeconds?: number) => void;
  revealResult: () => void;
  useEliminate: () => void;
  usePastor: () => void;
  useSkip: () => void;
  timerExpired: () => void;
  nextRound: () => void;
  finishGame: () => void;
  saveScore: (teamName: string) => void;
  saveVersus: () => void;
  resetGame: () => void;
  remaining: (category: DrawCategory) => number;

  // Ações VERSUS
  toggleWager: () => void;
  resolveSteal: (index: number) => void;
  nextTurn: () => void;
}

function freshPool(): QuestionPool {
  return {
    easy: [...questions.easy],
    medium: [...questions.medium],
    hard: [...questions.hard],
  };
}

function freshTeam(name: string): TeamState {
  return {
    name,
    score: 0,
    correct: 0,
    wrong: 0,
    streak: 0,
    maxStreak: 0,
    helps: { ...HELP_LIMITS },
  };
}

/** Número da rodada (1-based) a partir do índice de turno. */
export function roundOf(turnIndex: number): number {
  return Math.floor(turnIndex / 2) + 1;
}

/** A rodada é relâmpago (pontos em dobro)? */
export function isRelampago(turnIndex: number): boolean {
  return roundOf(turnIndex) % VERSUS_CONFIG.relampagoEvery === 0;
}

const initialRoundState = {
  current: null as Question | null,
  currentCategory: null as DrawCategory | null,
  selectedOption: null as number | null,
  markedRemaining: null as number | null,
  answered: false,
  eliminatedOptions: [] as number[],
  pastorHint: null as string | null,
  lastResult: null as LastResult | null,
  stealPhase: false,
  firstSelected: null as number | null,
  versusResult: null as VersusResult | null,
};

/**
 * Calcula a alteração de estado ao confirmar/revelar uma resposta.
 * Usado tanto na revelação instantânea quanto no botão "Revelar resultado".
 */
function buildAnswerPatch(
  state: GameState,
  index: number,
  remaining: number,
): Partial<GameState> {
  const q = state.current as Question;
  const correct = index === q.correct;

  // ───────────── Modo VERSUS ─────────────
  if (state.mode === "versus") {
    const ct = state.currentTeam;
    const team = state.teams[ct];
    const relampago = isRelampago(state.turnIndex);
    const relMult = relampago ? VERSUS_CONFIG.relampagoMultiplier : 1;
    const teams = [...state.teams] as [TeamState, TeamState];

    if (correct) {
      const newStreak = team.streak + 1;
      const baseScore = computeScore({
        difficulty: q.difficulty,
        streak: newStreak,
        timerEnabled: state.timerEnabled,
        remaining,
        total: state.timerSeconds,
      });
      const mult = relMult * (state.wagerActive ? VERSUS_CONFIG.wagerMultiplier : 1);
      const points = Math.round(baseScore * mult);
      teams[ct] = {
        ...team,
        score: team.score + points,
        correct: team.correct + 1,
        streak: newStreak,
        maxStreak: Math.max(team.maxStreak, newStreak),
      };
      return {
        teams,
        answered: true,
        selectedOption: index,
        stealPhase: false,
        versusResult: {
          outcome: "correct",
          scoringTeam: ct,
          points,
          penalty: 0,
          correctIndex: q.correct,
          selectedIndex: index,
          stealIndex: null,
          wager: state.wagerActive,
          relampago,
        },
      };
    }

    // Errou → aplica penalidade da aposta e abre o roubo para a adversária
    const penalty = state.wagerActive
      ? Math.round(basePoints(q.difficulty) * relMult)
      : 0;
    teams[ct] = {
      ...team,
      score: Math.max(0, team.score - penalty),
      wrong: team.wrong + 1,
      streak: 0,
    };
    return {
      teams,
      answered: true,
      selectedOption: index,
      stealPhase: true,
      firstSelected: index,
      versusResult: {
        outcome: "missed",
        scoringTeam: null,
        points: 0,
        penalty,
        correctIndex: q.correct,
        selectedIndex: index,
        stealIndex: null,
        wager: state.wagerActive,
        relampago,
      },
    };
  }

  // ───────────── Modo SOLO ─────────────
  const newStreak = correct ? state.streak + 1 : 0;
  const pointsEarned = correct
    ? computeScore({
        difficulty: q.difficulty,
        streak: newStreak,
        timerEnabled: state.timerEnabled,
        remaining,
        total: state.timerSeconds,
      })
    : 0;

  return {
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
  };
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      hasHydrated: false,

      timerEnabled: false,
      timerSeconds: TIMER_DEFAULT_SECONDS,
      teamName: "",
      mode: "versus",
      teamNames: [...VERSUS_DEFAULT_NAMES] as [string, string],
      totalRounds: VERSUS_CONFIG.defaultRounds,
      manualReveal: true,

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

      teams: [freshTeam(VERSUS_DEFAULT_NAMES[0]), freshTeam(VERSUS_DEFAULT_NAMES[1])],
      currentTeam: 0,
      turnIndex: 0,
      wagerActive: false,

      ranking: [],

      setHydrated: () => set({ hasHydrated: true }),

      setConfig: (cfg) => set((s) => ({ ...s, ...cfg })),

      setTeamName: (i, name) =>
        set((s) => {
          const teamNames = [...s.teamNames] as [string, string];
          teamNames[i] = name;
          return { teamNames };
        }),

      startGame: () =>
        set({
          mode: "solo",
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

      startVersus: () => {
        const { teamNames } = get();
        set({
          mode: "versus",
          phase: "playing",
          available: freshPool(),
          ...initialRoundState,
          teams: [
            freshTeam(teamNames[0].trim() || "Equipe 1"),
            freshTeam(teamNames[1].trim() || "Equipe 2"),
          ],
          currentTeam: 0,
          turnIndex: 0,
          wagerActive: false,
        });
      },

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
          stealPhase: false,
          firstSelected: null,
          versusResult: null,
        });
      },

      selectOption: (index, remainingSeconds) => {
        const state = get();
        const q = state.current;
        if (!q || state.answered) return;

        const remaining =
          remainingSeconds ?? (state.timerEnabled ? state.timerSeconds : 0);

        // Revelação manual: apenas marca a resposta (pode ser trocada até revelar).
        if (state.manualReveal) {
          set({ selectedOption: index, markedRemaining: remaining });
          return;
        }

        // Revelação instantânea: marca e revela de uma vez.
        set(buildAnswerPatch(state, index, remaining));
      },

      revealResult: () => {
        const state = get();
        const q = state.current;
        if (!q || state.answered || state.selectedOption === null) return;
        const remaining =
          state.markedRemaining ?? (state.timerEnabled ? state.timerSeconds : 0);
        set(buildAnswerPatch(state, state.selectedOption, remaining));
      },

      resolveSteal: (index) => {
        const state = get();
        const q = state.current;
        if (!q || !state.stealPhase || state.mode !== "versus") return;

        const ct = state.currentTeam;
        const opp = (1 - ct) as TeamIndex;
        const relampago = isRelampago(state.turnIndex);
        const relMult = relampago ? VERSUS_CONFIG.relampagoMultiplier : 1;
        const correct = index === q.correct;
        const teams = [...state.teams] as [TeamState, TeamState];

        if (correct) {
          const points = Math.round(basePoints(q.difficulty) * relMult);
          teams[opp] = {
            ...teams[opp],
            score: teams[opp].score + points,
            correct: teams[opp].correct + 1,
          };
          set({
            teams,
            stealPhase: false,
            versusResult: {
              ...(state.versusResult as VersusResult),
              outcome: "stolen",
              scoringTeam: opp,
              points,
              stealIndex: index,
            },
          });
          return;
        }

        set({
          stealPhase: false,
          versusResult: {
            ...(state.versusResult as VersusResult),
            outcome: "missed",
            scoringTeam: null,
            stealIndex: index,
          },
        });
      },

      useEliminate: () => {
        const state = get();
        const helps = state.mode === "versus" ? state.teams[state.currentTeam].helps : state.helps;
        if (
          !state.current ||
          state.answered ||
          helps.eliminate <= 0 ||
          state.eliminatedOptions.length > 0
        )
          return;

        const eliminatedOptions = pickEliminations(state.current, 2);
        if (state.mode === "versus") {
          const teams = [...state.teams] as [TeamState, TeamState];
          const ct = state.currentTeam;
          teams[ct] = {
            ...teams[ct],
            helps: { ...teams[ct].helps, eliminate: teams[ct].helps.eliminate - 1 },
          };
          set({ eliminatedOptions, teams });
          return;
        }
        set({
          eliminatedOptions,
          helps: { ...state.helps, eliminate: state.helps.eliminate - 1 },
        });
      },

      usePastor: () => {
        const state = get();
        const helps = state.mode === "versus" ? state.teams[state.currentTeam].helps : state.helps;
        if (!state.current || state.answered || helps.pastor <= 0) return;

        const pastorHint = randomPastorHint();
        if (state.mode === "versus") {
          const teams = [...state.teams] as [TeamState, TeamState];
          const ct = state.currentTeam;
          teams[ct] = {
            ...teams[ct],
            helps: { ...teams[ct].helps, pastor: teams[ct].helps.pastor - 1 },
          };
          set({ pastorHint, teams });
          return;
        }
        set({
          pastorHint,
          helps: { ...state.helps, pastor: state.helps.pastor - 1 },
        });
      },

      useSkip: () => {
        const state = get();
        const helps = state.mode === "versus" ? state.teams[state.currentTeam].helps : state.helps;
        if (!state.current || helps.skip <= 0) return;

        if (state.mode === "versus") {
          const teams = [...state.teams] as [TeamState, TeamState];
          const ct = state.currentTeam;
          teams[ct] = {
            ...teams[ct],
            helps: { ...teams[ct].helps, skip: teams[ct].helps.skip - 1 },
          };
          // Descarta a pergunta atual; a equipe da vez sorteia outra (mantém a aposta).
          set({ teams, ...initialRoundState });
          return;
        }
        set({
          helps: { ...state.helps, skip: state.helps.skip - 1 },
          ...initialRoundState,
        });
      },

      timerExpired: () => {
        const state = get();
        const q = state.current;
        if (!q || state.answered) return;

        // ───────────── Modo VERSUS ─────────────
        if (state.mode === "versus") {
          const ct = state.currentTeam;
          const team = state.teams[ct];
          const relampago = isRelampago(state.turnIndex);
          const relMult = relampago ? VERSUS_CONFIG.relampagoMultiplier : 1;
          const penalty = state.wagerActive
            ? Math.round(basePoints(q.difficulty) * relMult)
            : 0;
          const teams = [...state.teams] as [TeamState, TeamState];
          teams[ct] = {
            ...team,
            score: Math.max(0, team.score - penalty),
            wrong: team.wrong + 1,
            streak: 0,
          };
          set({
            teams,
            answered: true,
            selectedOption: null,
            stealPhase: true,
            firstSelected: null,
            versusResult: {
              outcome: "missed",
              scoringTeam: null,
              points: 0,
              penalty,
              correctIndex: q.correct,
              selectedIndex: null,
              stealIndex: null,
              wager: state.wagerActive,
              relampago,
            },
          });
          return;
        }

        // ───────────── Modo SOLO ─────────────
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

      nextTurn: () => {
        const state = get();
        const nextIndex = state.turnIndex + 1;
        // Cada equipe joga `totalRounds` turnos → total de turnos = totalRounds * 2.
        if (nextIndex >= state.totalRounds * 2) {
          set({ phase: "result", ...initialRoundState });
          return;
        }
        set({
          turnIndex: nextIndex,
          currentTeam: (nextIndex % 2) as TeamIndex,
          wagerActive: false,
          ...initialRoundState,
        });
      },

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

      saveVersus: () => {
        const state = get();
        const now = new Date().toISOString();
        const makeEntry = (t: TeamState): ScoreEntry => ({
          id:
            typeof crypto !== "undefined" && "randomUUID" in crypto
              ? crypto.randomUUID()
              : `${Date.now()}-${Math.floor(Math.random() * 1e6)}`,
          teamName: t.name.trim() || "Equipe",
          score: t.score,
          maxStreak: t.maxStreak,
          correct: t.correct,
          wrong: t.wrong,
          date: now,
        });
        let ranking = state.ranking;
        ranking = addToRanking(ranking, makeEntry(state.teams[0]));
        ranking = addToRanking(ranking, makeEntry(state.teams[1]));
        set({ ranking: ranking.slice(0, RANKING_MAX_ENTRIES) });
      },

      resetGame: () =>
        set((s) => ({
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
          teams: [freshTeam(s.teamNames[0]), freshTeam(s.teamNames[1])],
          currentTeam: 0,
          turnIndex: 0,
          wagerActive: false,
        })),

      remaining: (category) => {
        const { available } = get();
        return category === "easy"
          ? available.easy.length + available.medium.length
          : available.hard.length;
      },

      toggleWager: () => set((s) => ({ wagerActive: !s.wagerActive })),
    }),
    {
      name: "desafio-biblico:state",
      storage: createJSONStorage(() => localStorage),
      // Persistir apenas ranking + config (não o andamento do jogo).
      partialize: (s) => ({
        ranking: s.ranking,
        timerEnabled: s.timerEnabled,
        timerSeconds: s.timerSeconds,
        teamName: s.teamName,
        mode: s.mode,
        teamNames: s.teamNames,
        totalRounds: s.totalRounds,
        manualReveal: s.manualReveal,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
