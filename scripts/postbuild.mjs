import fs from 'fs';
import path from 'path';

const distDir = path.resolve(import.meta.dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');
const notFoundHtmlPath = path.join(distDir, '404.html');

const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// SPA fallback for every other client-side route (unchanged behavior).
fs.copyFileSync(indexHtmlPath, notFoundHtmlPath);
console.log('Created dist/404.html for SPA fallback');

// ---------------------------------------------------------------------------
// Google OAuth verification / crawler reachability.
//
// GitHub Pages only serves real static files. A client-side route such as
// /murshid only returns HTTP 200 if an actual file (index.html) exists at that
// path; otherwise Pages responds with the 404.html fallback and an HTTP 404
// status, which Google's OAuth verification rejects.
//
// To make the public Murshid URLs real pages, we generate static entry HTML
// files at each route directory. Vite emits absolute asset URLs (base "/"),
// so these pages load JS/CSS correctly from https://jalalamanj.online/ while
// React Router renders the matching route for the current URL.
//
// The generated pages keep the exact app bundle and add per-page <title>,
// meta description, Open Graph tags, and a <noscript> block so that even
// clients that do not execute JavaScript receive readable Murshid content.
// ---------------------------------------------------------------------------

const HOME_DESCRIPTION =
  'Murshid is a desktop application for secure document and personal data management. ' +
  'It operates primarily offline and offers optional online backup to the user’s own Google Drive account.';

const LEGAL_DESCRIPTIONS = {
  privacy_policy:
    'Murshid Privacy Policy — how Murshid handles user information and Google account data, including the optional Google Drive online backup feature.',
  terms_of_service:
    'Murshid Terms of Service — the terms governing the use of the Murshid desktop application.',
  eula:
    'Murshid End User License Agreement — the license terms for using the Murshid desktop application.',
};

const PAGE_TITLES = {
  index: 'Murshid',
  privacy_policy: 'Murshid Privacy Policy',
  terms_of_service: 'Murshid Terms of Service',
  eula: 'Murshid End User License Agreement',
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function generateMurshidPage(route, title, description, bodyExtra = '') {
  let html = indexHtml
    .replace(/<html\s+[^>]*>/, '<html lang="en" dir="ltr" class="scroll-smooth">')
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(
      /<meta name="description"[^>]*>/,
      `<meta name="description" content="${escapeHtml(description)}" />`
    );

  const headExtra = `
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="https://jalalamanj.online${route}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />`;

  html = html.replace('</head>', `${headExtra}\n  </head>`);

  if (bodyExtra) {
    html = html.replace('</body>', `${bodyExtra}\n  </body>`);
  }

  return html;
}

const murshidRoot = path.join(distDir, 'murshid');
fs.mkdirSync(murshidRoot, { recursive: true });

// Static, no-JS fallback content (rendered only when scripting is disabled,
// so it never conflicts with React's #root rendering).
const homeBodyExtra = `
    <noscript>
      <div style="max-width:42rem;margin:0 auto;padding:2rem;color:#e5e5e5;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.8;text-align:left">
        <h1 style="font-size:2.2rem;margin:0 0 0.5rem">Murshid</h1>
        <p style="font-size:1.1rem;color:#d7c4a3;margin:0 0 1.5rem">Secure Document and Personal Data Management</p>
        <p>Murshid is a desktop application designed to help users securely manage, organize, and maintain their documents and personal information.</p>
        <p>Murshid is designed to operate primarily offline. Users can use the core features of the application and manage their information locally on their own device without requiring a continuous internet connection.</p>
        <p>Murshid provides an optional Online Backup feature that allows users to create backups of their Murshid data in their own Google Drive account. Connecting a Google account is optional and is not required to use Murshid’s core offline functionality.</p>
        <p>Murshid does not access, read, modify, or manage unrelated personal files stored in the user’s Google Drive. Users remain in control of their Google account and their Google Drive data.</p>
        <p>Privacy Policy: <a href="/murshid/privacy_policy" style="color:#d7c4a3">https://jalalamanj.online/murshid/privacy_policy</a></p>
        <p>Terms of Service: <a href="/murshid/terms_of_service" style="color:#d7c4a3">https://jalalamanj.online/murshid/terms_of_service</a></p>
        <p>End User License Agreement: <a href="/murshid/eula" style="color:#d7c4a3">https://jalalamanj.online/murshid/eula</a></p>
      </div>
    </noscript>`;

fs.writeFileSync(
  path.join(murshidRoot, 'index.html'),
  generateMurshidPage('/murshid', PAGE_TITLES.index, HOME_DESCRIPTION, homeBodyExtra)
);
console.log('Created dist/murshid/index.html');

for (const [slug, title] of Object.entries(PAGE_TITLES)) {
  if (slug === 'index') continue;
  const route = `/murshid/${slug}`;
  const dir = path.join(murshidRoot, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'index.html'),
    generateMurshidPage(route, title, LEGAL_DESCRIPTIONS[slug])
  );
  console.log(`Created dist/murshid/${slug}/index.html`);
}
