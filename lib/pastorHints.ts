/** Dicas genéricas do "Pastor" — portadas do script original. */
export const PASTOR_HINTS: string[] = [
  "Lembrem-se do que estudamos na última pregação...",
  "Essa resposta está relacionada com os fundamentos da fé...",
  "Pensem no que a Bíblia ensina sobre esse assunto...",
  "Vocês já ouviram isso nos estudos bíblicos...",
  "A resposta está nos ensinamentos básicos da igreja...",
  "Busquem no coração aquilo que a Palavra já plantou...",
  "Calma, respirem fundo e confiem no que aprenderam...",
];

export function randomPastorHint(): string {
  return PASTOR_HINTS[Math.floor(Math.random() * PASTOR_HINTS.length)];
}
