// The route table (replaces `app-routing.module.ts`). Pages are loaded lazily; `meta.preload` pages are fetched when
// the browser is idle (replaces `SelectivePreloadingStrategy`), and every page is fetched early when a link to it is
// hovered or focused (see `lib/preload.ts`). `keepAlive` replaces `CustomRouteReuseStrategy` for home.
import type { RouteDef } from '@std-ui/router';

export const routes: RouteDef[] = [
	{ path: '/', redirect: '/home' },
	{
		path: '/home',
		element: 'iam-home',
		title: 'Home - iam',
		keepAlive: true,
		lazy: () => import('./pages/home.ts'),
	},
	{
		path: '/doc',
		element: 'iam-doc-view',
		title: 'iam',
		meta: { preload: true },
		lazy: () => import('./pages/doc-view.ts'),
	},
	{ path: '/explore', element: 'iam-explore', title: 'Explore - iam', lazy: () => import('./pages/explore.ts') },
	{ path: '/message', element: 'iam-message', title: 'Messages - iam', lazy: () => import('./pages/message.ts') },
	{ path: '/search', element: 'iam-search', title: 'Search - iam', lazy: () => import('./pages/search.ts') },
	{ path: '/me', element: 'iam-me', title: 'Me - iam', lazy: () => import('./pages/me.ts') },
	{ path: '/gallery', element: 'iam-gallery', title: 'Gallery - iam', lazy: () => import('./pages/gallery.ts') },
	{ path: '*', element: 'iam-not-found', title: 'Not found - iam', lazy: () => import('./pages/not-found.ts') },
];
