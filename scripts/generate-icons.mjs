// Gera os ícones PNG do PWA a partir do SVG celestial.
// Uso: node scripts/generate-icons.mjs
import sharp from "sharp";
import { readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const svg = readFileSync(join(root, "app", "icon.svg"));
const outDir = join(root, "public", "icons");
mkdirSync(outDir, { recursive: true });

async function render(size, name) {
  await sharp(svg, { density: 384 })
    .resize(size, size)
    .png()
    .toFile(join(outDir, name));
  console.log("✓", name);
}

// Maskable: fundo preenchido com margem de segurança (padding).
async function renderMaskable(size, name) {
  const inner = Math.round(size * 0.78);
  const pad = Math.round((size - inner) / 2);
  const icon = await sharp(svg, { density: 384 })
    .resize(inner, inner)
    .png()
    .toBuffer();
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 14, g: 4, b: 32, alpha: 1 },
    },
  })
    .composite([{ input: icon, top: pad, left: pad }])
    .png()
    .toFile(join(outDir, name));
  console.log("✓", name);
}

await render(192, "icon-192.png");
await render(512, "icon-512.png");
await renderMaskable(512, "icon-maskable-512.png");
await render(180, "apple-icon.png");
console.log("Ícones gerados em public/icons");
