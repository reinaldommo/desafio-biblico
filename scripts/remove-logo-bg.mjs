/**
 * Remove o fundo branco do logo da igreja preservando as partes claras internas
 * da juba (flood fill a partir das bordas) e suaviza a borda (feather).
 * Uso: node scripts/remove-logo-bg.mjs
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const SRC = path.join(root, "logo", "logo IEPP.png");
const OUT = path.join(root, "public", "logo-iepp.png");

// Um pixel é "fundo" se for muito claro (próximo do branco puro).
const isLight = (r, g, b) => r >= 232 && g >= 232 && b >= 232;

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const idx = (x, y) => (y * width + x) * channels;

// Flood fill a partir de todas as bordas, marcando apenas o branco conectado.
const bg = new Uint8Array(width * height);
const stack = [];
const pushIf = (x, y) => {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const p = y * width + x;
  if (bg[p]) return;
  const i = p * channels;
  if (isLight(data[i], data[i + 1], data[i + 2])) {
    bg[p] = 1;
    stack.push(x, y);
  }
};

for (let x = 0; x < width; x++) {
  pushIf(x, 0);
  pushIf(x, height - 1);
}
for (let y = 0; y < height; y++) {
  pushIf(0, y);
  pushIf(width - 1, y);
}
while (stack.length) {
  const y = stack.pop();
  const x = stack.pop();
  pushIf(x + 1, y);
  pushIf(x - 1, y);
  pushIf(x, y + 1);
  pushIf(x, y - 1);
}

// Aplica transparência ao fundo detectado.
let removed = 0;
for (let p = 0; p < width * height; p++) {
  if (bg[p]) {
    data[p * channels + 3] = 0;
    removed++;
  }
}

// Feather: pixels claros (anti-aliasing) vizinhos do fundo ganham alfa parcial,
// evitando o "halo" branco ao redor do leão.
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const p = y * width + x;
    if (bg[p]) continue;
    const i = p * channels;
    if (data[i + 3] === 0) continue;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const bright = (r + g + b) / 3;
    if (bright <= 210) continue;
    const nearBg =
      (x > 0 && bg[p - 1]) ||
      (x < width - 1 && bg[p + 1]) ||
      (y > 0 && bg[p - width]) ||
      (y < height - 1 && bg[p + width]);
    if (nearBg) {
      // Quanto mais claro, mais transparente (255→0, 210→cheio).
      const a = Math.round(((255 - bright) / (255 - 210)) * 255);
      data[i + 3] = Math.max(0, Math.min(255, a));
    }
  }
}

await sharp(data, { raw: { width, height, channels } })
  .png()
  .toFile(OUT);

console.log(
  `OK · ${width}x${height} · fundo removido em ${removed} px (${(
    (removed / (width * height)) * 100
  ).toFixed(1)}%) → ${path.relative(root, OUT)}`,
);
