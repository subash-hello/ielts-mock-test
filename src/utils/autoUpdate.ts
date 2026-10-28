/**
 * Kiosk auto-update helper.
 *
 * Student PCs keep one browser tab open for hours, so after a new deployment they keep running
 * the OLD JavaScript bundle (which can have launch/sync bugs). This compares the bundle the page
 * loaded with the one currently served and reports whether a newer build exists.
 */
const getLoadedBundles = (): string[] =>
  Array.from(document.querySelectorAll('script[src]'))
    .map((s) => (s as HTMLScriptElement).getAttribute('src') || '')
    .filter((src) => /\/assets\/index-[^/]+\.js/.test(src))
    .map((src) => src.replace(/^.*(\/assets\/index-[^/?#]+\.js).*$/, '$1'));

export async function isNewBuildAvailable(): Promise<boolean> {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  try {
    const loaded = getLoadedBundles();
    if (loaded.length === 0) return false; // dev server / unknown build: never auto-reload
    const res = await fetch(`/index.html?_=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return false;
    const html = await res.text();
    const served = Array.from(html.matchAll(/\/assets\/index-[^"'\s/]+\.js/g)).map((m) => m[0]);
    if (served.length === 0) return false;
    return !served.some((s) => loaded.includes(s));
  } catch {
    return false;
  }
}
