import { ServiceCategory } from '../types';

const STORAGE_KEY = 'portfolio_admin_services_v1';

export function getStoredServices(): ServiceCategory[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ServiceCategory[]) : null;
  } catch {
    return null;
  }
}

export function saveStoredServices(services: ServiceCategory[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
}

export function clearStoredServices(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getAllServices(): ServiceCategory[] {
  return getStoredServices() ?? [];
}

export async function fetchServices(): Promise<ServiceCategory[]> {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}data/services.json`, {
      cache: 'default',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const parsed = await res.json();
    if (Array.isArray(parsed)) return parsed as ServiceCategory[];
    return [];
  } catch {
    return getAllServices();
  }
}
