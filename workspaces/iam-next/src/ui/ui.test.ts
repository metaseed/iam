import { beforeEach, describe, expect, it, vi } from 'vitest';

type Listener = (e: { matches: boolean }) => void;

/** Minimal matchMedia: `set(query, matches)` flips a query and notifies listeners. */
function installMatchMedia() {
	const state = new Map<string, { matches: boolean; listeners: Set<Listener> }>();
	const entry = (q: string) => {
		let e = state.get(q);
		if (!e) state.set(q, (e = { matches: false, listeners: new Set() }));
		return e;
	};
	window.matchMedia = ((query: string) => ({
		get matches() {
			return entry(query).matches;
		},
		media: query,
		addEventListener: (_: string, l: Listener) => entry(query).listeners.add(l),
		removeEventListener: (_: string, l: Listener) => entry(query).listeners.delete(l),
	})) as unknown as typeof window.matchMedia;
	return {
		set(query: string, matches: boolean) {
			const e = entry(query);
			e.matches = matches;
			e.listeners.forEach((l) => l({ matches }));
		},
	};
}

let mm: ReturnType<typeof installMatchMedia>;

beforeEach(() => {
	vi.resetModules(); // media.ts caches signals per query
	localStorage.clear();
	document.documentElement.className = '';
	mm = installMatchMedia();
});

describe('mediaQuery', () => {
	it('tracks matchMedia changes and shares one signal per query', async () => {
		const { mediaQuery } = await import('./media.ts');
		const a = mediaQuery('(max-width: 10px)');
		expect(a()).toBe(false);
		mm.set('(max-width: 10px)', true);
		expect(a()).toBe(true);
		expect(mediaQuery('(max-width: 10px)')).toBe(a);
	});
});

describe('theme', () => {
	it('follows the system until a choice is made, then persists it', async () => {
		const { initTheme, setTheme, theme } = await import('./theme.ts');
		initTheme();
		expect(theme()).toBe('light');
		mm.set('(prefers-color-scheme: dark)', true);
		expect(theme()).toBe('dark');

		setTheme('light');
		expect(theme()).toBe('light');
		expect(localStorage.getItem('iam.theme')).toBe('light');

		setTheme('system');
		expect(localStorage.getItem('iam.theme')).toBeNull();
		expect(theme()).toBe('dark');
	});

	it('toggles the wa-dark class on the root element', async () => {
		const { initTheme, setTheme } = await import('./theme.ts');
		initTheme();
		setTheme('dark');
		await Promise.resolve(); // effects flush in a microtask
		await Promise.resolve();
		expect(document.documentElement.classList.contains('wa-dark')).toBe(true);
		setTheme('light');
		await Promise.resolve();
		await Promise.resolve();
		expect(document.documentElement.classList.contains('wa-dark')).toBe(false);
	});

	it('restores a stored choice on init', async () => {
		localStorage.setItem('iam.theme', 'dark');
		const { initTheme, theme } = await import('./theme.ts');
		initTheme();
		expect(theme()).toBe('dark');
	});
});

describe('isActive', () => {
	it('matches exact and nested paths, and "/" only exactly', async () => {
		const { isActive } = await import('./bottom-nav.ts');
		expect(isActive('/', '/')).toBe(true);
		expect(isActive('/doc', '/')).toBe(false);
		expect(isActive('/doc', '/doc?id=1')).toBe(true);
		expect(isActive('/doc/edit', '/doc')).toBe(true);
		expect(isActive('/docs', '/doc')).toBe(false);
		expect(isActive(undefined, '/doc')).toBe(false);
	});
});
