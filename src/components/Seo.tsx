import React, { useEffect, useRef } from 'react';

export const SITE_URL = 'https://jalalamanj.online';
export const SITE_NAME = 'Jalal Amanj';
export const SOCIAL_IMAGE = `${SITE_URL}/social-cover.png`;

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.to ? { item: `${SITE_URL}${item.to}` } : {}),
    })),
  };
}

export function itemListJsonLd(elements: string[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: elements.map((name, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
    })),
  };
}

interface SeoProps {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  jsonLd?: object | object[];
}

let seoScriptCounter = 0;

function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export const Seo: React.FC<SeoProps> = ({ title, description, path, noindex, jsonLd }) => {
  const scriptIdRef = useRef<string | null>(null);
  const lastJsonLdRef = useRef<string>('');

  useEffect(() => {
    const url = `${SITE_URL}${path}`;

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertLink('canonical', url);

    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', SOCIAL_IMAGE);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', SOCIAL_IMAGE);

    document.head
      .querySelectorAll<HTMLMetaElement>('meta[name="robots"]')
      .forEach((el) => el.remove());
    if (noindex) upsertMeta('name', 'robots', 'noindex, nofollow');
  }, [title, description, path, noindex]);

  useEffect(() => {
    const key = JSON.stringify(jsonLd ?? null);
    if (key === lastJsonLdRef.current) return;
    lastJsonLdRef.current = key;

    if (!scriptIdRef.current) {
      scriptIdRef.current = `seo-jsonld-${++seoScriptCounter}`;
    }
    let script = document.getElementById(scriptIdRef.current) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = scriptIdRef.current;
      document.head.appendChild(script);
    }
    script.textContent = key === 'null' ? '' : key;
  }, [jsonLd]);

  useEffect(() => {
    return () => {
      const id = scriptIdRef.current;
      if (id) document.getElementById(id)?.remove();
    };
  }, []);

  return null;
};