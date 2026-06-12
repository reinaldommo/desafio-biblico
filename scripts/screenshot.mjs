import { chromium } from "playwright-core";

const url = process.argv[2] || "http://localhost:3000/";
const out = process.argv[3] || "screenshot.png";

const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log("saved", out);
