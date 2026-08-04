import { PRODUCTS } from './portfolioData';
import { Product } from '../types';

const STORAGE_KEY = 'portfolio_admin_products_v1';

export function getStoredProducts(): Product[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Product[]) : null;
  } catch {
    return null;
  }
}

export function saveStoredProducts(products: Product[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function clearStoredProducts(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getAllProducts(): Product[] {
  return getStoredProducts() ?? PRODUCTS;
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}data/products.json`, {
      cache: 'default',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const parsed = await res.json();
    if (Array.isArray(parsed)) return parsed as Product[];
    return [];
  } catch {
    return getAllProducts();
  }
}
