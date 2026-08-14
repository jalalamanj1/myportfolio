import { useEffect } from 'react';

/**
 * Elements where selecting/copying text must keep working.
 */
const EDITABLE_SELECTOR = 'input, textarea, code, pre, [contenteditable="true"]';

/**
 * DevTools dock detection threshold (px of shrunk viewport width).
 * Conservative: only used to emit a console warning, never to block.
 */
const DEVTOOLS_WIDTH_THRESHOLD = 160;

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return target.matches(EDITABLE_SELECTOR) || Boolean(target.closest(EDITABLE_SELECTOR));
}

/**
 * Client-side content protection.
 *
 * - Runs only in production builds (`import.meta.env.PROD`), so the dev server
 *   stays fully usable.
 * - Blocks the context menu, common DevTools shortcuts, and image dragging.
 * - Never throws, never blocks animations/scrolling, and never shows alerts.
 *   If DevTools are detected, it only logs a single console warning.
 *
 * @param enabled default `true` in production, `false` in development.
 */
export function useSiteProtection(enabled = import.meta.env.PROD): void {
  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add('site-protected');

    const onContextMenu = (e: MouseEvent) => {
      if (!isEditableTarget(e.target)) e.preventDefault();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F12') {
        e.preventDefault();
        return;
      }
      if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) {
        e.preventDefault();
        return;
      }
      if (e.ctrlKey && e.key.toLowerCase() === 'u') {
        e.preventDefault();
      }
    };

    const onDragStart = (e: DragEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest('img')) {
        e.preventDefault();
      }
    };

    let warned = false;
    const onResize = () => {
      if (warned) return;
      if (window.outerWidth - window.innerWidth > DEVTOOLS_WIDTH_THRESHOLD) {
        warned = true;
        console.warn('[site-protection] Developer tools detected — some non-essential features may be limited.');
      }
    };

    document.addEventListener('contextmenu', onContextMenu, true);
    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('dragstart', onDragStart, true);
    window.addEventListener('resize', onResize);

    return () => {
      document.body.classList.remove('site-protected');
      document.removeEventListener('contextmenu', onContextMenu, true);
      document.removeEventListener('keydown', onKeyDown, true);
      document.removeEventListener('dragstart', onDragStart, true);
      window.removeEventListener('resize', onResize);
    };
  }, [enabled]);
}
