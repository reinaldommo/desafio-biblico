import type { Challenge } from "@/types";

/**
 * Desafios do "Pagar Desafio" (modo Passa e Repassa).
 * Sorteados sem repetição durante a partida; o pool é reposto se esgotar.
 */
export const challenges: Challenge[] = [
  { id: 1, emoji: "🎤", text: "Cantem o refrão de um louvor escolhido pela outra equipe." },
  { id: 2, emoji: "📖", text: "Encontrem numa Bíblia física o versículo que o apresentador escolher, em até 30 segundos." },
  { id: 3, emoji: "🧠", text: "Recitem um versículo de cor, com a referência." },
  { id: 4, emoji: "🎭", text: "Façam mímica de uma história bíblica até a própria equipe adivinhar (30 segundos)." },
  { id: 5, emoji: "📜", text: "Falem 7 livros do Novo Testamento em ordem, em 15 segundos." },
  { id: 6, emoji: "📜", text: "Falem os 10 primeiros livros do Antigo Testamento em ordem." },
  { id: 7, emoji: "🗣️", text: "Expliquem uma parábola de Jesus com suas próprias palavras em 30 segundos." },
  { id: 8, emoji: "🎵", text: "Cantem um corinho de criança na frente de todos — com gestos!" },
  { id: 9, emoji: "👥", text: "Citem os nomes dos 12 discípulos (podem errar no máximo 2)." },
  { id: 10, emoji: "🙏", text: "Façam uma oração de agradecimento citando 5 motivos diferentes." },
  { id: 11, emoji: "✨", text: "Citem 5 milagres de Jesus em 20 segundos." },
  { id: 12, emoji: "📰", text: "Contem a história de um personagem bíblico em 30 segundos como um repórter de telejornal." },
  { id: 13, emoji: "🎶", text: "Completem a letra do hino ou louvor que a outra equipe começar a cantar." },
  { id: 14, emoji: "🔤", text: "Digam 5 nomes bíblicos que começam com a letra escolhida pela outra equipe." },
  { id: 15, emoji: "👑", text: "Citem 5 reis de Israel ou de Judá." },
  { id: 16, emoji: "🎬", text: "Um da equipe imita um personagem bíblico até a equipe adivinhar quem é." },
  { id: 17, emoji: "✍️", text: "Citem 5 mulheres da Bíblia em 15 segundos." },
  { id: 18, emoji: "🎙️", text: "Falem um versículo em ritmo de rap ou repente." },
  { id: 19, emoji: "📚", text: "Digam quantos livros tem a Bíblia e citem o primeiro e o último." },
  { id: 20, emoji: "🐑", text: "Declamem o Salmo 23 (a equipe pode ajudar em até 2 palavras)." },
  { id: 21, emoji: "🐸", text: "Citem as 10 pragas do Egito (podem errar no máximo 2)." },
  { id: 22, emoji: "🕊️", text: "Citem os 9 frutos do Espírito de Gálatas 5 (podem errar 2)." },
  { id: 23, emoji: "🎤", text: "Escolham alguém da equipe para um \"mini-sermão\" de 30 segundos sobre o tema dado pela outra equipe." },
  { id: 24, emoji: "🗡️", text: "Duas pessoas da equipe dramatizam Davi e Golias em 30 segundos." },
];
