/**
 * One-shot asset optimizer (sharp).
 * Converts the heavy statically-imported raster assets to WebP at sensible
 * display sizes so the shipped bundle no longer carries multi-hundred-KB
 * PNG/JPG originals. Run: `node scripts/optimize-images.mjs`
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'src', 'assets', 'images');

fs.mkdirSync(out, { recursive: true });

const jobs = [
  {
    name: 'background',
    src: path.join(root, 'background.png'),
    dest: path.join(out, 'background.webp'),
    opts: { width: 1920, quality: 75 },
  },
  {
    name: 'profile-portrait',
    src: path.join(root, 'profile portrait.png'),
    dest: path.join(out, 'profile-portrait.webp'),
    opts: { width: 900, quality: 80 },
  },
];

// Product fallback screenshots (1376x768 originals) -> 900px wide WebP.
const productSrc = path.join(root, 'src', 'assets', 'images');
for (const file of fs.readdirSync(productSrc)) {
  if (!/\.jpe?g$/i.test(file)) continue;
  jobs.push({
    name: file.replace(/\.jpe?g$/i, '.webp'),
    src: path.join(productSrc, file),
    dest: path.join(productSrc, file.replace(/\.jpe?g$/i, '.webp')),
    opts: { width: 900, quality: 78 },
  });
}

let before = 0;
let after = 0;

for (const job of jobs) {
  try {
    if (!fs.existsSync(job.src)) {
      console.log(`SKIP  ${job.src} (missing)`);
      continue;
    }
    before += fs.statSync(job.src).size;
    await sharp(job.src)
      .rotate()
      .resize({ width: job.opts.width, withoutEnlargement: true })
      .webp({ quality: job.opts.quality })
      .toFile(job.dest);
    after += fs.statSync(job.dest).size;
    console.log(
      `OK    ${path.basename(job.src)} -> ${path.basename(job.dest)} ` +
        `(${(fs.statSync(job.src).size / 1024).toFixed(0)}KB -> ${(fs.statSync(job.dest).size / 1024).toFixed(0)}KB)`
    );
  } catch (err) {
    console.error(`FAIL  ${job.src}: ${err.message}`);
  }
}

console.log(`\nTotal: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`);
