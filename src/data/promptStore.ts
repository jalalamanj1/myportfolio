import { PromptCategory } from '../types';

const DB_NAME = 'portfolio';
const DB_STORE = 'promptStore';
const STORAGE_KEY = 'portfolio_admin_prompts_v1';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(DB_STORE)) {
        db.createObjectStore(DB_STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function withStore<T>(
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore) => IDBRequest
): Promise<T> {
  const db = await openDB();
  return new Promise<T>((resolve, reject) => {
    const tx = db.transaction(DB_STORE, mode);
    const request = run(tx.objectStore(DB_STORE));
    request.onsuccess = () => resolve(request.result as T);
    request.onerror = () => reject(request.error);
    tx.onerror = () => reject(tx.error);
  });
}

export async function getStoredPromptCategories(): Promise<PromptCategory[] | null> {
  try {
    const stored = await withStore<PromptCategory[] | null>('readonly', (s) =>
      s.get(STORAGE_KEY)
    );
    if (stored) return stored;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const migrated = Array.isArray(parsed) ? (parsed as PromptCategory[]) : null;
      if (migrated) {
        await withStore<void>('readwrite', (s) => s.put(migrated, STORAGE_KEY));
        localStorage.removeItem(STORAGE_KEY);
      }
      return migrated;
    }
    return null;
  } catch {
    return null;
  }
}

export async function saveStoredPromptCategories(categories: PromptCategory[]): Promise<void> {
  await withStore<void>('readwrite', (s) => s.put(categories, STORAGE_KEY));
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
      cache: 'default',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const parsed = await res.json();
    if (Array.isArray(parsed)) return parsed as PromptCategory[];
    return [];
  } catch {
    return (await getStoredPromptCategories()) ?? [];
  }
}
