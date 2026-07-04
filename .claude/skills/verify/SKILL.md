---
name: verify
description: Como verificar mudanças do Desafio Bíblico de ponta a ponta no navegador (build, servir e dirigir a UI com playwright-core + Chrome do sistema).
---

# Verificação do Desafio Bíblico

App Next.js 14 estático (sem backend). A superfície é o navegador em `http://localhost:3000`.

## Subir o app

```bash
npm run build        # build de produção (inclui lint + typecheck)
npm run start        # serve em http://localhost:3000 (rodar em background)
```

Para checagens rápidas de dados: `npm run validate:questions` (integridade do banco de perguntas).

## Dirigir a UI

Não há Playwright no projeto. Instalar `playwright-core` num diretório temporário (não no repo) e usar o Chrome do sistema — sem download de navegadores:

```js
const { chromium } = require("playwright-core");
const browser = await chromium.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
});
```

## Fluxos que valem dirigir

- **Welcome**: seletor de modo (⚔️ Versus / 🔁 Passa e Repassa / 👤 1 Equipe), nomes das equipes, rodadas, switches (1º = revelação manual, 2º = cronômetro).
- **Turno versus**: sortear → clicar opção (marca) → "🔎 Revelar resultado" → errado abre "Chance de Roubo" → "Próxima vez →".
- **Turno passa e repassa**: sortear → "↪️ Passar" → "↩️ Repassar" → "🎭 Pagar Desafio" → operador julga "✅ Cumprido / ❌ Não cumprido". Sem aposta/relâmpago/roubo neste modo; cronômetro reinicia a cada passe; ajudas são da equipe portadora.
- O estado do jogo não persiste (só config + ranking): `page.goto` recarrega direto na Welcome — bom para isolar cenários.

## Pegadinhas

- A revelação manual (padrão ligada) exige o clique extra em "🔎 Revelar resultado".
- Resposta certa/errada não é determinística pela UI (a correta não é visível antes de revelar) — repetir turnos até observar os dois desfechos.
- Botões têm emoji no nome acessível — usar regex no `getByRole` (ex.: `/Sortear Fácil/`); atenção a maiúsculas ("❌ Não cumprido" tem "c" minúsculo).
- Animações do framer-motion: usar `waitFor`/pequenos `waitForTimeout` (~400-600ms) após cliques que trocam painéis.
