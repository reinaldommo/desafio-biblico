import { chromium } from "playwright-core";

const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(800);

// Começar
await page.getByText("Começar o Desafio").click();
await page.waitForTimeout(600);
// Sortear fácil/média
await page.getByText("Sortear Fácil/Média").click();
await page.waitForTimeout(900);
await page.screenshot({ path: "game-question.png" });
console.log("saved game-question.png");

// Responder uma alternativa (clica no card de opção que contém a letra 'C')
const options = page.locator(".grid button");
await options.nth(2).click();
await page.waitForTimeout(1400);
await page.screenshot({ path: "game-answer.png", fullPage: true });
console.log("saved game-answer.png");

await browser.close();
