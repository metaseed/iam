// Replaces `bottom-navigation`: a fixed bottom bar of links with the current route highlighted. Place it inside
// `<std-router>` so it can follow the route. Set `items` before or after connecting (it is a signal).
import { css, state, t, tag, UIElement } from '@std-ui/core';
import type { StdRouter } from '@std-ui/router';

export interface NavItem {
	href: string;
	label: string;
	/** Optional short glyph/emoji shown above the label. */
	glyph?: string;
}

@tag('iam-bottom-nav')
export class BottomNav extends UIElement {
	static override shadowRootOptions = { mode: 'open' } as const;
	static override styles = css`
		:host {
			position: fixed;
			inset: auto 0 0 0;
			display: flex;
			background: var(--wa-color-surface-default);
			border-top: 1px solid var(--wa-color-surface-border);
			z-index: 9;
		}
		a {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 0.125rem;
			padding: 0.5rem 0.25rem;
			color: var(--wa-color-text-quiet);
			text-decoration: none;
			font-size: var(--wa-font-size-s);
		}
		a[aria-current='page'] { color: var(--wa-color-brand-on-quiet); font-weight: var(--wa-font-weight-bold); }
		.glyph { font-size: 1.25rem; line-height: 1; }
	`;

	readonly items = state<readonly NavItem[]>([]);

	protected override template() {
		const router = (this.closest('std-router') as StdRouter | null)?.router;
		const path = router?.location().pathname;
		return t`<nav style="display: contents" aria-label="Primary">${this.items().map(
			(item) => t`<a href=${item.href} aria-current=${isActive(path, item.href) ? 'page' : null}>
				${item.glyph ? t`<span class="glyph" aria-hidden="true">${item.glyph}</span>` : null}
				<span>${item.label}</span></a>`,
		)}</nav>`;
	}
}

/** `/` only matches itself; other items match their path and any sub-path. Query/hash in `href` are ignored. */
export function isActive(current: string | undefined, href: string): boolean {
	if (current === undefined) return false;
	const target = href.split(/[?#]/)[0]!;
	return target === '/' ? current === '/' : current === target || current.startsWith(`${target}/`);
}
