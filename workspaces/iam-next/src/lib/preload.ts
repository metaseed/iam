// Route preloading (G6c). Loading a route twice is harmless (`import()` is cached), but each route is only tried once
// per call site and failures are logged, never thrown: a failed prefetch must not break navigation, which loads the
// route itself and reports the error properly.
import { matchRoutes, type RouteDef } from '@std-ui/router';
import { Logger } from './logger.ts';

const log = Logger('preload');

const loaded = new WeakSet<RouteDef>();

/** Loads one route's code (once). Resolves when done; never rejects. */
export async function preloadRoute(route: RouteDef): Promise<void> {
	if (!route.lazy || loaded.has(route)) return;
	loaded.add(route);
	try {
		await route.lazy();
	} catch (e) {
		loaded.delete(route); // allow another try
		log.warn('preload failed', route.path, e);
	}
}

/** Loads the whole chain of routes that match `pathname` (parents first). */
export async function preloadPath(routes: readonly RouteDef[], pathname: string): Promise<void> {
	const chain = matchRoutes(routes, pathname);
	if (!chain) return;
	for (const { route } of chain) await preloadRoute(route);
}

const whenIdle = (fn: () => void, timeout = 3000): void => {
	if ('requestIdleCallback' in window) window.requestIdleCallback(fn, { timeout });
	else setTimeout(fn, 200);
};

/** Routes with `meta.preload` are loaded when the browser is idle. */
export function preloadOnIdle(routes: readonly RouteDef[]): void {
	for (const route of routes) {
		if (route.meta?.['preload']) whenIdle(() => void preloadRoute(route));
	}
}

/**
 * Loads a route's code when the user is about to follow a link to it (pointer over, focus, touch start).
 * `base` is the app's URL prefix. Returns the stop function.
 */
export function prefetchOnIntent(root: HTMLElement | Document, routes: readonly RouteDef[], base = ''): () => void {
	const handler = (e: Event): void => {
		const link = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
		if (!link || link.origin !== location.origin) return;
		let path = link.pathname;
		if (base && path.startsWith(base)) path = path.slice(base.length) || '/';
		void preloadPath(routes, path);
	};
	const events = ['pointerover', 'focusin', 'touchstart'] as const;
	for (const ev of events) root.addEventListener(ev, handler, { passive: true });
	return () => events.forEach((ev) => root.removeEventListener(ev, handler));
}
