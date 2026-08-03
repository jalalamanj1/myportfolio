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
  content: string;
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
  const { token, repo, path, content, message } = item;
  const encoded = toBase64(content);
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
  return enqueuePush({ token, repo, path, content, message });
}

export function pushPromptsToGitHub(token: string, repo: string, promptCats: PromptCategory[]): Promise<void> {
  return pushFileToGitHub(
    token,
    repo,
    'public/data/prompts.json',
    JSON.stringify(promptCats, null, 2),
    'Update prompts from admin dashboard'
  );
}

export function pushProductsToGitHub(token: string, repo: string, products: Product[]): Promise<void> {
  return pushFileToGitHub(
    token,
    repo,
    'public/data/products.json',
    JSON.stringify(products, null, 2),
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
