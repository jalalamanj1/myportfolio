import { PromptCategory } from '../types';

const STORAGE_KEY = 'portfolio_admin_prompts_v1';

export function getStoredPromptCategories(): PromptCategory[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as PromptCategory[]) : null;
  } catch {
    return null;
  }
}

export function saveStoredPromptCategories(categories: PromptCategory[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
}

export function clearStoredPromptCategories(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getAllPromptCategories(): PromptCategory[] {
  return getStoredPromptCategories() ?? [];
}

export async function fetchPromptCategories(): Promise<PromptCategory[]> {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}data/prompts.json`, {
      cache: 'no-cache',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const parsed = await res.json();
    if (Array.isArray(parsed)) return parsed as PromptCategory[];
    return [];
  } catch {
    return getStoredPromptCategories() ?? [];
  }
}
