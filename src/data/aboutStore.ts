import { AboutData } from '../types';

const STORAGE_KEY = 'portfolio_admin_about_v1';

const EMPTY_ABOUT: AboutData = {
  experiences: [],
  certifications: [],
  languages: [],
};

export function getStoredAbout(): AboutData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return parsed as AboutData;
    return null;
  } catch {
    return null;
  }
}

export function saveStoredAbout(about: AboutData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(about));
}

export function clearStoredAbout(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getAboutData(): AboutData {
  return getStoredAbout() ?? EMPTY_ABOUT;
}

export async function fetchAbout(): Promise<AboutData> {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}data/about.json`, {
      cache: 'default',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const parsed = await res.json();
    if (parsed && typeof parsed === 'object') {
      return {
        experiences: Array.isArray(parsed.experiences) ? parsed.experiences : [],
        certifications: Array.isArray(parsed.certifications) ? parsed.certifications : [],
        languages: Array.isArray(parsed.languages) ? parsed.languages : [],
      };
    }
    return EMPTY_ABOUT;
  } catch {
    return getAboutData();
  }
}
