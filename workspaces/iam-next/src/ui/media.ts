// Replaces `@angular/cdk/layout` (BreakpointObserver): a media query as a signal.
import { signal, type ReadonlySignal, type Signal } from '@std-ui/core';

const cache = new Map<string, Signal<boolean>>();

/** `true` while `query` matches; reactive. One shared listener per distinct query. */
export function mediaQuery(query: string): ReadonlySignal<boolean> {
	let s = cache.get(query);
	if (!s) {
		const mql = window.matchMedia(query);
		s = signal(mql.matches);
		const sig = s;
		mql.addEventListener('change', (e) => sig.set(e.matches));
		cache.set(query, s);
	}
	return s;
}

/** Same breakpoints as Angular CDK's `Breakpoints.XSmall`/`Small`... where IAM used them. */
export const isHandset = (): ReadonlySignal<boolean> => mediaQuery('(max-width: 599.98px)');
export const isDark = (): ReadonlySignal<boolean> => mediaQuery('(prefers-color-scheme: dark)');
