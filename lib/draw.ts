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
 * Embaralha as 4 alternativas de uma pergunta (Fisher-Yates) e recalcula o
 * índice `correct` para a nova posição. Retorna uma cópia; não muta `question`.
 *
 * Corrige o viés do banco de perguntas (resposta certa concentrada numa letra)
 * sem precisar reescrever cada pergunta — a ordem é sorteada de novo a cada rodada.
 */
export function shuffleOptions(question: Question): Question {
  const order = [0, 1, 2, 3];
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const options = order.map((i) => question.options[i]) as [
    string,
    string,
    string,
    string,
  ];
  const correct = order.indexOf(question.correct) as 0 | 1 | 2 | 3;
  return { ...question, options, correct };
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
