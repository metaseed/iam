// Replaces `i-toc`: a table of contents for the headings of the rendered doc. The heading that is being read is
// highlighted (found with an IntersectionObserver on the heading elements, looked up by id in `root`).
import { attribute, css, effect, state, t, tag, UIElement } from '@std-ui/core';
import type { TocItem } from '../markdown/render.ts';

/** The heading being read: the last one at or above the top of the viewport, else the first. */
export function activeHeading(tops: ReadonlyMap<string, number>, ids: readonly string[], offset = 80): string | undefined {
	let active: string | undefined;
	for (const id of ids) {
		const top = tops.get(id);
		if (top !== undefined && top <= offset) active = id;
	}
	return active ?? ids[0];
}

@tag('iam-toc')
export class Toc extends UIElement {
	static override shadowRootOptions = { mode: 'open' } as const;
	static override styles = css`
		:host { display: block; font-size: var(--wa-font-size-s); }
		nav { border-inline-start: 2px solid var(--wa-color-neutral-border-quiet); padding-inline-start: var(--wa-space-s); }
		a { display: block; padding: 2px 0; color: var(--wa-color-text-quiet); text-decoration: none; }
		a[aria-current='location'] { color: var(--wa-color-brand-on-quiet); font-weight: var(--wa-font-weight-semibold); }
		a:hover { text-decoration: underline; }
	`;

	/** Items to show (the h1 is usually left out); set with a `.items=` binding. */
	@attribute() readonly items = state<TocItem[]>([]);
	/** Where the headings live; default the document. */
	root: ParentNode = document;
	readonly #active = state<string | undefined>(undefined);
	#stop?: () => void;

	protected override connect(): void {
		const tops = new Map<string, number>();
		const update = (): void => {
			const ids = this.items.peek().map((i) => i.id);
			// the last sections can never reach the top of the viewport: at the page end the last heading wins
			const atEnd = window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
			this.#active.set(atEnd ? ids.at(-1) : activeHeading(tops, ids));
		};
		const measure = (): void => {
			for (const item of this.items.peek()) {
				const el = this.root.querySelector(`#${CSS.escape(item.id)}`);
				if (el) tops.set(item.id, el.getBoundingClientRect().top);
			}
			update();
		};
		window.addEventListener('scroll', measure, { passive: true });
		window.addEventListener('resize', measure);
		// the owner sets the items after this element connects, and the headings are in the document by then
		const stopEffect = effect(() => {
			this.items();
			queueMicrotask(measure);
		});
		this.#stop = () => {
			stopEffect();
			window.removeEventListener('scroll', measure);
			window.removeEventListener('resize', measure);
		};
	}

	protected override disconnect(): void {
		this.#stop?.();
	}

	protected override template() {
		const items = this.items();
		if (!items.length) return;
		const active = this.#active();
		return t`<nav aria-label="Table of contents">${items.map(
			(i) => t`<a href=${`#${i.id}`} style=${`padding-inline-start: ${Math.max(0, i.level - 2) * 0.75}rem`} aria-current=${i.id === active ? 'location' : 'false'}>${i.text}</a>`,
		)}</nav>`;
	}
}