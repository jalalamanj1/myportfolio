import { Product, ServiceCategory, PromptCategory, AboutData } from '../types';

const TOKEN_KEY = 'portfolio_admin_github_token';
const REPO_KEY = 'portfolio_admin_github_repo';
const DEFAULT_REPO = 'jalalamanj1/myportfolio';

export interface GitHubConfig {
  token: string;
  repo: string;
}

export function getGitHubConfig(): GitHubConfig {
  const token = localStorage.getItem(TOKEN_KEY) ?? '';
  const repo = localStorage.getItem(REPO_KEY) ?? DEFAULT_REPO;
  return { token, repo };
}

export function saveGitHubConfig(config: GitHubConfig): void {
  localStorage.setItem(TOKEN_KEY, config.token.trim());
  localStorage.setItem(REPO_KEY, config.repo.trim() || DEFAULT_REPO);
}

function toBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
}

async function readFileSha(token: string, repo: string, path: string): Promise<string | null> {
  const url = `https://api.github.com/repos/${repo}/contents/${path}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub read failed (${res.status}): ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  return typeof data.sha === 'string' ? data.sha : null;
}

interface QueuedPush {
  token: string;
  repo: string;
  path: string;
  encoded: string;
  message: string;
}

const pushQueues = new Map<string, Promise<void>>();

function enqueuePush(item: QueuedPush): Promise<void> {
  const key = `${item.repo}:${item.path}`;
  const prev = pushQueues.get(key) ?? Promise.resolve();
  const next = prev.then(() => pushFileToGitHubSerial(item));
  pushQueues.set(
    key,
    next.catch(() => {
      // keep the queue alive even after a failed push
    })
  );
  return next;
}

async function pushFileToGitHubSerial(item: QueuedPush): Promise<void> {
  const { token, repo, path, encoded, message } = item;
  const attempt = async (): Promise<void> => {
    const sha = await readFileSha(token, repo, path);
    const body: Record<string, unknown> = {
      message,
      content: encoded,
    };
    if (sha) body.sha = sha;

    const res = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const detail = (await res.text()).slice(0, 300);
      if (res.status === 409) {
        throw new Error(`GitHub push conflict — retrying (${detail})`);
      }
      throw new Error(`GitHub push failed (${res.status}): ${detail}`);
    }
  };

  for (let i = 0; i < 3; i++) {
    try {
      await attempt();
      return;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('conflict') && i < 2) {
        await new Promise((r) => setTimeout(r, 800));
        continue;
      }
      throw err;
    }
  }
}

export function pushFileToGitHub(
  token: string,
  repo: string,
  path: string,
  content: string,
  message: string
): Promise<void> {
  return enqueuePush({ token, repo, path, encoded: toBase64(content), message });
}

/**
 * Pushes a binary file whose content is already base64-encoded (e.g. an image
 * extracted from a data: URL). Unlike pushFileToGitHub, the content is NOT
 * base64-encoded a second time.
 */
export function pushRawFileToGitHub(
  token: string,
  repo: string,
  path: string,
  base64Content: string,
  message: string
): Promise<void> {
  return enqueuePush({ token, repo, path, encoded: base64Content, message });
}

interface ImageFile {
  path: string;
  base64: string;
}

/**
 * Creates an image splitter for a given folder. Rewrites inline data: URL
 * images into relative file paths and queues the decoded images for upload so
 * pushed JSON stays lightweight and images become individually cacheable files.
 */
function makeImageSplitter(dir: string): {
  files: ImageFile[];
  rewriteImage: (item: { image?: string; id: string }) => { image?: string; id: string };
} {
  const seen = new Map<string, string>();
  const files: ImageFile[] = [];
  const rewriteImage = (item: { image?: string; id: string }): { image?: string; id: string } => {
    const m = item.image?.match(/^data:(image\/(?:[a-z+]+));base64,(.*)$/s);
    if (!m) return item;
    let relPath = seen.get(item.image!);
    if (!relPath) {
      const mime = m[1];
      const ext =
        mime === 'svg+xml' ? 'svg' : mime === 'png' ? 'png' : mime === 'jpeg' ? 'jpg' : 'webp';
      const safeId = String(item.id ?? `img-${Date.now()}`).replace(/[^a-zA-Z0-9-_]/g, '-');
      relPath = `data/images/${dir}/${safeId}.${ext}`;
      seen.set(item.image!, relPath);
      files.push({ path: `public/${relPath}`, base64: m[2] });
    }
    return { ...item, image: relPath };
  };
  return { files, rewriteImage };
}

async function pushDataWithImages(
  token: string,
  repo: string,
  files: ImageFile[],
  rewritten: unknown,
  jsonPath: string,
  message: string
): Promise<void> {
  for (const file of files) {
    await pushRawFileToGitHub(
      token,
      repo,
      file.path,
      file.base64,
      'Update image from admin dashboard'
    );
  }
  await pushFileToGitHub(token, repo, jsonPath, JSON.stringify(rewritten, null, 2), message);
}

export function pushPromptsToGitHub(token: string, repo: string, promptCats: PromptCategory[]): Promise<void> {
  const { files, rewriteImage } = makeImageSplitter('prompts');
  const categories = promptCats.map((c) => ({
    ...c,
    prompts: (c.prompts ?? []).map((p) => rewriteImage(p)),
  }));
  return pushDataWithImages(
    token,
    repo,
    files,
    categories,
    'public/data/prompts.json',
    'Update prompts from admin dashboard'
  );
}

export function pushProductsToGitHub(token: string, repo: string, products: Product[]): Promise<void> {
  const { files, rewriteImage } = makeImageSplitter('products');
  const rewritten = products.map((p) => rewriteImage(p));
  return pushDataWithImages(
    token,
    repo,
    files,
    rewritten,
    'public/data/products.json',
    'Update apps from admin dashboard'
  );
}

export function pushServicesToGitHub(token: string, repo: string, services: ServiceCategory[]): Promise<void> {
  return pushFileToGitHub(
    token,
    repo,
    'public/data/services.json',
    JSON.stringify(services, null, 2),
    'Update services from admin dashboard'
  );
}

export function pushAboutToGitHub(token: string, repo: string, about: AboutData): Promise<void> {
  return pushFileToGitHub(
    token,
    repo,
    'public/data/about.json',
    JSON.stringify(about, null, 2),
    'Update about data from admin dashboard'
  );
}
