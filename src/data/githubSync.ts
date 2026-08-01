import { PromptCategory } from '../types';

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

export async function pushPromptsToGitHub(
  token: string,
  repo: string,
  promptCats: PromptCategory[]
): Promise<void> {
  const path = 'public/data/prompts.json';
  const sha = await readFileSha(token, repo, path);
  const body: Record<string, unknown> = {
    message: 'Update prompts from admin dashboard',
    content: toBase64(JSON.stringify(promptCats, null, 2)),
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
    throw new Error(`GitHub push failed (${res.status}): ${(await res.text()).slice(0, 300)}`);
  }
}
