import type { ScoreEntry } from "@/types";
import { RANKING_MAX_ENTRIES, RANKING_STORAGE_KEY } from "./constants";

/** Lê o ranking do localStorage (seguro para SSR). */
export function loadRanking(): ScoreEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RANKING_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ScoreEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Persiste o ranking (já ordenado e truncado). */
export function saveRanking(entries: ScoreEntry[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(RANKING_STORAGE_KEY, JSON.stringify(entries));
  } catch {
    /* ignora cotas/erros de storage */
  }
}

/** Adiciona uma entrada, reordena por pontuação e trunca ao topo N. */
export function addToRanking(
  entries: ScoreEntry[],
  entry: ScoreEntry,
): ScoreEntry[] {
  return [...entries, entry]
    .sort((a, b) => b.score - a.score)
    .slice(0, RANKING_MAX_ENTRIES);
}

/** Posição (1-based) que uma pontuação ocuparia no ranking. */
export function rankPosition(entries: ScoreEntry[], score: number): number {
  const better = entries.filter((e) => e.score > score).length;
  return better + 1;
}
