import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const logosDir = join(root, 'public', 'logos');
const toolsPath = join(root, 'public', 'data', 'aiTools.json');
const tools = JSON.parse(readFileSync(toolsPath, 'utf8'));

mkdirSync(logosDir, { recursive: true });

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

async function get(url, timeoutMs = 15000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      redirect: 'follow',
      headers: { 'User-Agent': UA, Accept: '*/*' },
    });
    if (!res.ok) return null;
    const type = res.headers.get('content-type') || '';
    const buf = Buffer.from(await res.arrayBuffer());
    return { type, buf };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function isSvg(buf, type) {
  if (type && type.includes('image/svg')) return true;
  const head = buf.subarray(0, 512).toString('utf8').trimStart();
  return head.startsWith('<svg') || (head.startsWith('<?xml') && head.includes('<svg')) || head.startsWith('\ufeff<svg');
}

async function fetchSvgFavicon(hostname) {
  const direct = await get(`https://${hostname}/favicon.svg`);
  if (direct && isSvg(direct.buf, direct.type)) return direct.buf;

  const home = await get(`https://${hostname}/`, 20000);
  if (home && home.buf.length < 3_000_000) {
    const html = home.buf.toString('utf8');
    const icons = [...html.matchAll(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]*>/gi)];
    for (const m of icons) {
      const tag = m[0];
      if (!/image\/svg/.test(tag) && !/\.svg/i.test(tag)) continue;
      const href = /href=["']([^"']+)["']/i.exec(tag)?.[1];
      if (!href) continue;
      const abs = href.startsWith('http') ? href : new URL(href, `https://${hostname}/`).toString();
      const svg = await get(abs);
      if (svg && isSvg(svg.buf, svg.type)) return svg.buf;
    }
  }
  return null;
}

async function fetchWebpFavicon(hostname) {
  const res = await get(`https://www.google.com/s2/favicons?domain=${hostname}&sz=128`);
  if (!res) return null;
  try {
    const buf = await sharp(res.buf, { limitInputPixels: false }).resize(128, 128).webp({ quality: 90 }).toBuffer();
    return buf;
  } catch {
    return null;
  }
}

const pool = 10;
let i = 0;
const missing = [];

async function worker() {
  while (i < tools.length) {
    const idx = i++;
    const tool = tools[idx];
    let hostname;
    try {
      hostname = new URL(tool.url).hostname;
    } catch {
      tool.logo = null;
      missing.push(tool.name);
      continue;
    }
    const svgFile = join(logosDir, `${hostname}.svg`);
    const webpFile = join(logosDir, `${hostname}.webp`);
    if (existsSync(svgFile)) {
      tool.logo = `${hostname}.svg`;
      continue;
    }
    if (existsSync(webpFile)) {
      tool.logo = `${hostname}.webp`;
      continue;
    }
    const svg = await fetchSvgFavicon(hostname);
    if (svg) {
      writeFileSync(svgFile, svg);
      tool.logo = `${hostname}.svg`;
    } else {
      const webp = await fetchWebpFavicon(hostname);
      if (webp) {
        writeFileSync(webpFile, webp);
        tool.logo = `${hostname}.webp`;
      } else {
        tool.logo = null;
        missing.push(tool.name);
      }
    }
  }
}

await Promise.all(Array.from({ length: pool }, worker));

writeFileSync(toolsPath, JSON.stringify(tools, null, 2));
const total = tools.filter((t) => t.logo).length;
console.log(`logos: ${total} / ${tools.length}`);
if (missing.length) {
  console.log('MISSING:', missing.join(', '));
}