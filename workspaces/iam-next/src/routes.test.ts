import { afterEach, describe, expect, it, vi } from 'vitest';
import { createRouter, matchRoutes, type RouteDef } from '@std-ui/router';
import { createMemoryNavigation } from '@std-ui/router/testing';
import { guardUnsaved } from './lib/leave.ts';
import { preloadOnIdle, preloadPath, preloadRoute, prefetchOnIntent } from './lib/preload.ts';
import { routes } from './routes.ts';

const leaf = (pathname: string) => matchRoutes(routes, pathname)?.at(-1)?.route;

describe('route table', () => {
	it('knows every page of the old app', () => {
		for (const [path, element] of [
			['/home', 'iam-home'], ['/doc', 'iam-doc-view'], ['/explore', 'iam-explore'], ['/message', 'iam-message'],
			['/search', 'iam-search'], ['/me', 'iam-me'], ['/gallery', 'iam-gallery'],
		] as const) {
			expect(leaf(path)?.element, path).toBe(element);
		}
	});
	it('redirects / to /home and sends unknown paths to the not-found page', () => {
		expect(leaf('/')?.redirect).toBe('/home');
		expect(leaf('/no/such/page')?.element).toBe('iam-not-found');
	});
	it('keeps only home alive, and every page is lazy with a title', () => {
		expect(routes.filter((r) => r.keepAlive).map((r) => r.path)).toEqual(['/home']);
		for (const r of routes.filter((r) => r.element)) {
			expect(r.lazy, r.path).toBeTypeOf('function');
			expect(r.title, r.path).toBeTruthy();
		}
	});
});

describe('router with the route table', () => {
	it('follows the redirect, sets the title and renders not-found for unknown paths', async () => {
		const router = createRouter({ routes: routes.map((r) => ({ ...r, lazy: undefined })), navigation: createMemoryNavigation('/') });
		await router.start();
		await vi.waitFor(() => expect(router.location().pathname).toBe('/home')); // the redirect settles a tick later
		expect(document.title).toBe('Home - iam');
		await router.navigate('/zzz');
		expect(router.matches().at(-1)!.route.element).toBe('iam-not-found');
		router.stop();
	});
});

describe('guardUnsaved (replaces CanDeactivateGuard)', () => {
	const make = async () => {
		const router = createRouter({
			routes: [{ path: '/a', template: tpl() }, { path: '/b', template: tpl() }],
			navigation: createMemoryNavigation('/a'),
		});
		await router.start();
		return router;
	};
	function tpl() { const t = document.createElement('template'); t.innerHTML = '<p>x</p>'; return t; }

	it('lets you leave a clean page without asking', async () => {
		const router = await make();
		const ask = vi.fn(async () => false);
		guardUnsaved(router, () => false, { ask });
		await router.navigate('/b');
		expect(ask).not.toHaveBeenCalled();
		expect(router.location().pathname).toBe('/b');
		router.stop();
	});
	it('asks when dirty: staying blocks navigation, leaving allows it', async () => {
		const router = await make();
		let answer = false;
		const ask = vi.fn(async () => answer);
		guardUnsaved(router, () => true, { ask, message: 'sure?' });
		await router.navigate('/b').catch(() => undefined);
		expect(ask).toHaveBeenCalledWith('sure?');
		expect(router.location().pathname).toBe('/a');
		answer = true;
		await router.navigate('/b');
		expect(router.location().pathname).toBe('/b');
		router.stop();
	});
	it('the returned function removes the guard', async () => {
		const router = await make();
		const ask = vi.fn(async () => false);
		const off = guardUnsaved(router, () => true, { ask });
		off();
		await router.navigate('/b');
		expect(ask).not.toHaveBeenCalled();
		router.stop();
	});
});

describe('preloading', () => {
	afterEach(() => vi.useRealTimers());
	const route = (path: string, extra: Partial<RouteDef> = {}): RouteDef & { lazy: ReturnType<typeof vi.fn> } =>
		({ path, element: 'x-y', lazy: vi.fn(async () => undefined), ...extra }) as never;

	it('preloadRoute loads once and never throws; a failure can be retried', async () => {
		const ok = route('/ok');
		await preloadRoute(ok);
		await preloadRoute(ok);
		expect(ok.lazy).toHaveBeenCalledTimes(1);

		const bad = route('/bad', { lazy: vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValue(undefined) });
		vi.spyOn(console, 'warn').mockImplementation(() => undefined);
		await expect(preloadRoute(bad)).resolves.toBeUndefined();
		await preloadRoute(bad);
		expect(bad.lazy).toHaveBeenCalledTimes(2);
	});

	it('preloadPath loads the matching chain only', async () => {
		const a = route('/a');
		const b = route('/b');
		await preloadPath([a, b], '/a');
		expect(a.lazy).toHaveBeenCalledTimes(1);
		expect(b.lazy).not.toHaveBeenCalled();
		await expect(preloadPath([a], '/')).resolves.toBeUndefined(); // nothing matches
	});

	it('preloadOnIdle loads only routes flagged meta.preload', async () => {
		vi.useFakeTimers();
		const yes = route('/yes', { meta: { preload: true } });
		const no = route('/no');
		preloadOnIdle([yes, no]);
		await vi.advanceTimersByTimeAsync(5000);
		expect(yes.lazy).toHaveBeenCalledTimes(1);
		expect(no.lazy).not.toHaveBeenCalled();
	});

	it('prefetchOnIntent loads a route when its link is hovered or focused, honours base, ignores external links', async () => {
		const target = route('/doc');
		const root = document.createElement('div');
		root.innerHTML = `<a id="in" href="/app/doc?id=1">in</a><a id="out" href="https://example.com/doc">out</a><span id="plain">x</span>`;
		document.body.append(root);
		const stop = prefetchOnIntent(root, [target], '/app');
		root.querySelector('#out')!.dispatchEvent(new Event('pointerover', { bubbles: true }));
		root.querySelector('#plain')!.dispatchEvent(new Event('pointerover', { bubbles: true }));
		await Promise.resolve();
		expect(target.lazy).not.toHaveBeenCalled();
		root.querySelector('#in')!.dispatchEvent(new Event('focusin', { bubbles: true }));
		await vi.waitFor(() => expect(target.lazy).toHaveBeenCalledTimes(1));
		stop();
		root.remove();
	});
});
