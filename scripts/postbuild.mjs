import fs from 'fs';
import path from 'path';

const distDir = path.resolve(import.meta.dirname, '../dist');
const indexHtml = path.join(distDir, 'index.html');
const notFoundHtml = path.join(distDir, '404.html');

fs.copyFileSync(indexHtml, notFoundHtml);
console.log('Created dist/404.html for SPA fallback');
