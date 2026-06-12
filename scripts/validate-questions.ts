/**
 * Valida a integridade do banco de perguntas.
 * Uso: npm run validate:questions
 */
import { questions, QUESTION_COUNTS } from "../data/questions";
import type { Difficulty } from "../types";

let errors = 0;
const seenNums = new Map<number, string>();

(Object.keys(questions) as Difficulty[]).forEach((diff) => {
  questions[diff].forEach((item, idx) => {
    const id = `[${diff}#${idx} num=${item.num}]`;

    if (item.options.length !== 4) {
      console.error(`${id} deve ter exatamente 4 opções (tem ${item.options.length})`);
      errors++;
    }
    if (item.correct < 0 || item.correct > 3) {
      console.error(`${id} 'correct' fora do intervalo 0-3: ${item.correct}`);
      errors++;
    }
    if (!item.q || item.q.trim() === "") {
      console.error(`${id} enunciado vazio`);
      errors++;
    }
    if (item.difficulty !== diff) {
      console.error(`${id} difficulty divergente: ${item.difficulty} != ${diff}`);
      errors++;
    }
    if (seenNums.has(item.num)) {
      console.error(`${id} 'num' duplicado (já usado em ${seenNums.get(item.num)})`);
      errors++;
    } else {
      seenNums.set(item.num, id);
    }
    const blanks = item.options.filter((o) => !o || o.trim() === "").length;
    if (blanks > 0) {
      console.error(`${id} possui opção em branco`);
      errors++;
    }
  });
});

console.log(
  `Perguntas: fáceis=${QUESTION_COUNTS.easy} médias=${QUESTION_COUNTS.medium} difíceis=${QUESTION_COUNTS.hard} (total=${QUESTION_COUNTS.total})`,
);

if (errors > 0) {
  console.error(`\n❌ Validação falhou com ${errors} erro(s).`);
  process.exit(1);
} else {
  console.log("\n✅ Banco de perguntas válido.");
}
