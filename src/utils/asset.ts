/**
 * Resolves a stored asset path (relative to the site root) into an absolute
 * URL that works on GitHub Pages, including deployments under a repository
 * sub-path (BASE_URL). Data URLs, http(s) URLs and already-absolute paths are
 * returned unchanged.
 */
export function assetUrl(path: string): string {
  if (!path) return path;
  if (
    path.startsWith('data:') ||
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('/') ||
    path.startsWith('blob:')
  ) {
    return path;
  }
  return `${import.meta.env.BASE_URL}${path}`;
}
