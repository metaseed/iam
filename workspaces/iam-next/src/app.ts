// App shell: top bar (menu, title, theme), side drawer, routed page, reading progress, bottom navigation.
import './ui/components.ts';
import './ui/bottom-nav.ts';
import './ui/reading-progress.ts';
import { t, tag, state, UIElement } from '@std-ui/core';
import { createRouter, type StdRouter } from '@std-ui/router'; // also defines <std-router>, <std-outlet>
import { preloadOnIdle, prefetchOnIntent } from './lib/preload.ts';
import { routes } from './routes.ts';
import type { BottomNav, NavItem } from './ui/bottom-nav.ts';
import { setTheme, themeChoice, type ThemeChoice } from './ui/theme.ts';

/** Main destinations: bottom bar on every screen, and the drawer. */
export const mainNav: readonly NavItem[] = [
	{ href: '/home', label: 'Home', glyph: '⌂' },
	{ href: '/explore', label: 'Explore', glyph: '◎' },
	{ href: '/search', label: 'Search', glyph: '⌕' },
	{ href: '/me', label: 'Me', glyph: '☺' },
];
const drawerNav: readonly NavItem[] = [...mainNav, { href: '/message', label: 'Messages' }, { href: '/gallery', label: 'Component gallery' }];

/** URL prefix the app is served under, without the trailing slash. */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

const NEXT_THEME: Record<ThemeChoice, ThemeChoice> = { system: 'light', light: 'dark', dark: 'system' };
const THEME_ICON: Record<ThemeChoice, string> = { system: 'user', light: 'sun', dark: 'moon' };

@tag('iam-app')
export class App extends UIElement {
	readonly #drawerOpen = state(false);

	protected override connect(): void {
		this.#stop = prefetchOnIntent(this, routes, BASE);
		preloadOnIdle(routes);
	}
	#stop?: () => void;

	protected override disconnect(): void {
		this.#stop?.();
	}

	protected override firstUpdated(): void {
		// The router element reads its routes when it connects, before a template binding could set them, so the router is built here and handed over.
		(this.querySelector('std-router') as StdRouter).router = createRouter({ routes, base: BASE });
		(this.querySelector('iam-bottom-nav') as BottomNav).items.set([...mainNav]);
	}

	protected override template() {
		const choice = themeChoice();
		return t`
			<header class="top-bar">
				<wa-button appearance="plain" id="menu" @click=${() => this.#drawerOpen.set(true)}>
					<wa-icon name="menu" label="Open menu"></wa-icon>
				</wa-button>
				<a class="title" href="/home">IAM</a>
				<wa-button appearance="plain" id="theme" @click=${() => setTheme(NEXT_THEME[choice])}>
					<wa-icon name=${THEME_ICON[choice]} label=${`Theme: ${choice}. Change theme`}></wa-icon>
				</wa-button>
			</header>

			<wa-drawer
				label="Menu"
				placement="start"
				.open=${this.#drawerOpen()}
				@wa-after-hide=${() => this.#drawerOpen.set(false)}
				@click=${(e: Event) => (e.target as Element).closest('a') && this.#drawerOpen.set(false)}
			>
				<nav aria-label="Menu" class="drawer-nav">
					${drawerNav.map((item) => t`<a href=${item.href}>${item.label}</a>`)}
				</nav>
			</wa-drawer>

			<std-router>
				<main><std-outlet></std-outlet></main>
				<iam-reading-progress></iam-reading-progress>
				<iam-bottom-nav></iam-bottom-nav>
			</std-router>`;
	}
}
