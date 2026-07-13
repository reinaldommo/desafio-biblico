# ✝️ Desafio Bíblico — IEPP

Gincana Bíblica interativa da **Igreja Evangélica Pentecostal Presbiteriana**. Reconstruída com tecnologia moderna, identidade visual da igreja (**preto · vermelho · dourado**), gamificação completa e instalável como app (PWA).

> Momento de comunhão e conhecimento da Palavra de Deus. ✨

## ✨ Recursos

- **380 perguntas** bíblicas em 3 níveis (Fácil · Média · Difícil), com referências.
- **Alternativas embaralhadas a cada sorteio**: a ordem das opções é sorteada de
  novo em cada rodada, então a resposta certa não fica sempre na mesma letra.
- **Modo Versus (2 equipes)** ⚔️: equipes se revezam por rodadas, com placar VS ao vivo,
  tela de vencedor e ajudas independentes por equipe.
  - 🎲 **Aposta** (dobro ou nada): antes de sortear, vale o dobro — acertou dobra, errou perde.
  - 🔁 **Roubo (rebote)**: se a equipe da vez erra, a adversária pode roubar os pontos.
  - ⚡ **Rodada relâmpago**: a cada 3 rodadas, todos os pontos valem em dobro.
- **Modo Solo (1 equipe)**: a experiência clássica de jogo contínuo.
- **Pontuação por dificuldade**: 200 (fácil) / 200 (média) / 300 (difícil) pontos fixos por acerto.
- **Revelação manual** (opcional, padrão ligada): a equipe marca a resposta e um
  botão "🔎 Revelar resultado" mostra o acerto/erro — ideal para apresentador.
- **Cronômetro opcional** por pergunta (20/30/45/60s) com anel regressivo.
- **3 ajudas**: ✂️ Eliminar 2 · 🙏 Pastor · ⏭️ Pular (3x).
- **Ranking local** (localStorage) com tela de resultado e confete.
- **Modo projetor/TV**: textos grandes, alto contraste, visual de palco.
- **PWA**: instalável e funciona offline.
- Animações premium com **Framer Motion** e efeitos de luz divina.
- **Tema de cores** preto/vermelho/dourado (padrão `church`). Para voltar ao tema
  antigo (roxo/dourado), troque `data-theme="church"` por `"legacy"` em
  `app/layout.tsx` — ambas as paletas vivem em `app/globals.css`.

## 🛠️ Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Zustand · Framer Motion · Serwist (PWA).

## 🚀 Desenvolvimento

```bash
npm install
npm run dev          # http://localhost:3000
```

Outros comandos:

```bash
npm run build               # build de produção (typecheck + lint + PWA)
npm start                   # serve o build
npm run validate:questions  # valida integridade do banco de perguntas
node scripts/generate-icons.mjs  # regenera os ícones do PWA a partir de app/icon.svg
```

## ☁️ Deploy na Vercel

1. Faça push do repositório para o GitHub.
2. Em [vercel.com](https://vercel.com) → **Add New Project** → importe o repositório.
3. A Vercel detecta o Next.js automaticamente — sem variáveis de ambiente.
   Clique em **Deploy**.

Ou via CLI: `npx vercel`.

## 📁 Estrutura

```
app/            layout, page (orquestra telas), globals.css, manifest.ts, sw.ts, icon.svg
components/     screens · game · hud · ranking · effects · pwa · ui
store/          gameStore.ts (Zustand + persist)
lib/            scoring · draw · ranking · pastorHints · constants
data/           questions.ts (banco tipado de perguntas)
types/          index.ts
scripts/        validate-questions · generate-icons
legacy/         versão original em HTML/CSS/JS (preservada)
```

## ➕ Como adicionar perguntas

Edite `data/questions.ts`, adicione um objeto no array do nível desejado com um
`num` único, 4 `options`, o índice `correct` (0–3) e a `ref` bíblica. Rode
`npm run validate:questions` para checar a integridade.
