import type { Question } from "@/types";

/** Sorteia um item aleatório de um pool (retorna null se vazio). */
export function pickRandom<T>(pool: T[]): T | null {
  if (pool.length === 0) return null;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

/** Remove uma pergunta (por referência ou num) de um array, sem mutar. */
export function removeQuestion(
  pool: Question[],
  question: Question,
): Question[] {
  return pool.filter((q) => q.num !== question.num);
}

/**
 * Escolhe aleatoriamente índices de opções erradas para eliminar.
 * Retorna até `count` índices distintos diferentes da resposta correta.
 */
export function pickEliminations(
  question: Question,
  count = 2,
): number[] {
  const wrong: number[] = [];
  question.options.forEach((_, i) => {
    if (i !== question.correct) wrong.push(i);
  });
  const chosen: number[] = [];
  while (chosen.length < count && wrong.length > 0) {
    const idx = Math.floor(Math.random() * wrong.length);
    chosen.push(wrong[idx]);
    wrong.splice(idx, 1);
  }
  return chosen;
}
