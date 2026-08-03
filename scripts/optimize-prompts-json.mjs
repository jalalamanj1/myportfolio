/**
 * One-shot prompt data optimizer.
 * Prompt images are stored as 900px JPEG base64 data-URIs in
 * public/data/prompts.json (~12.8MB total). Re-encoding them to WebP
 * shrinks the payload roughly 2x while keeping the exact same data model
 * (base64 data-URIs), so the admin dashboard and pages keep working
 * unchanged. Run: `node scripts/optimize-prompts-json.mjs`
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const file = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'public',
  'data',
  'prompts.json'
);

const data = JSON.parse(fs.readFileSync(file, 'utf8'));

let converted = 0;
let skipped = 0;
let beforeBytes = 0;
let afterBytes = 0;

function base64Image(bytes) {
  return `data:image/webp;base64,${bytes.toString('base64')}`;
}

async function optimizeImage(image) {
  if (typeof image !== 'string' || !image.startsWith('data:image/')) {
    skipped += 1;
    return image;
  }
  const mime = image.slice(5, image.indexOf(';'));
  const b64 = image.slice(image.indexOf(',') + 1);
  beforeBytes += b64.length;
  try {
    const out = await sharp(Buffer.from(b64, 'base64'))
      .rotate()
      .resize({ width: 900, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer();
    afterBytes += out.length;
    converted += 1;
    return base64Image(out);
  } catch {
    skipped += 1;
    return image;
  }
}

for (const cat of data) {
  if (!cat.prompts) continue;
  for (let i = 0; i < cat.prompts.length; i += 1) {
    cat.prompts[i].image = await optimizeImage(cat.prompts[i].image);
  }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log(
  `converted=${converted} skipped=${skipped} ` +
    `image bytes (base64 chars) ${(beforeBytes / 1e6).toFixed(2)}MB -> ${(afterBytes / 1e6).toFixed(2)}MB`
);
console.log(`prompts.json now ${(fs.statSync(file).size / 1e6).toFixed(2)}MB`);
