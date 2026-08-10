// Converts raster images under public/img to WebP, capped at MAX_WIDTH.
// Usage:  npm i -D sharp  &&  node scripts/convert-images.mjs
// Add --delete-originals once you've confirmed the site still looks right.

import { readdir, stat, unlink } from "node:fs/promises";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "img");
const MAX_WIDTH = 900; // cards render ~350px wide; 900 covers 2x retina
const QUALITY = 82;
const DELETE_ORIGINALS = process.argv.includes("--delete-originals");

const kb = (bytes) => Math.round(bytes / 1024);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let before = 0;
let after = 0;
let count = 0;

for await (const file of walk(ROOT)) {
  if (!/\.(png|jpe?g)$/i.test(extname(file))) continue;

  const out = file.replace(/\.(png|jpe?g)$/i, ".webp");
  const src = await stat(file);

  await sharp(file)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out);

  const dst = await stat(out);
  before += src.size;
  after += dst.size;
  count++;

  console.log(`${file.replace(ROOT, "")}  ${kb(src.size)}KB -> ${kb(dst.size)}KB`);
  if (DELETE_ORIGINALS) await unlink(file);
}

console.log(
  `\n${count} images: ${kb(before)}KB -> ${kb(after)}KB ` +
    `(${Math.round((1 - after / before) * 100)}% smaller)`
);
if (!DELETE_ORIGINALS) console.log("Originals kept. Re-run with --delete-originals to remove them.");
