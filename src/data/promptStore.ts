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

export function mergePromptCategories(
  local: PromptCategory[],
  fetched: PromptCategory[]
): PromptCategory[] {
  const localById = new Map(local.map((c) => [c.id, c]));
  const merged: PromptCategory[] = [];
  const seenIds = new Set<string>();

  for (const fileCat of fetched) {
    seenIds.add(fileCat.id);
    const localCat = localById.get(fileCat.id);
    if (localCat) {
      const fileIds = new Set(fileCat.prompts.map((p) => p.id));
      merged.push({
        ...fileCat,
        prompts: [
          ...localCat.prompts.filter((p) => !fileIds.has(p.id)),
          ...fileCat.prompts,
        ],
      });
    } else {
      merged.push(fileCat);
    }
  }

  for (const localCat of local) {
    if (!seenIds.has(localCat.id)) merged.push(localCat);
  }

  return merged;
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
