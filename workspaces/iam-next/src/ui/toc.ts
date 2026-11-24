// Replaces `i-toc`: a table of contents for the headings of the rendered doc. The heading that is being read is
// highlighted (found with an IntersectionObserver on the heading elements, looked up by id in `root`).
import { attribute, css, effect, state, t, tag, UIElement } from '@std-ui/core';
import { scrollToElement, scrollToTop } from '../lib/scroll.ts';
import type { TocItem } from '../markdown/render.ts';

/** Entries shown while the embedded list is collapsed (as the old primaryMax). */
export const PRIMARY_MAX = 4;

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
		.heading { display: flex; align-items: center; gap: var(--wa-space-xs); margin: 0 0 var(--wa-space-2xs); font-weight: var(--wa-font-weight-semibold); background: none; border: 0; padding: 0; color: inherit; font: inherit; }
		button.heading { cursor: pointer; }
		.float { position: fixed; right: 6px; bottom: 30px; z-index: 100; display: flex; flex-direction: column; }
		.float button { color: #ffffffcc; background: #c1c1c1aa; border: 0; cursor: pointer; padding: var(--wa-space-xs); }
		.panel { position: fixed; right: 6px; bottom: 90px; z-index: 100; max-height: 60vh; overflow: auto; max-width: min(90vw, 24rem);
			background: var(--wa-color-surface-raised, canvas); border: 1px solid var(--wa-color-neutral-border-normal); border-radius: var(--wa-border-radius-m); padding: var(--wa-space-s); }
		@media print { .float, .panel { display: none; } }
	`;

	/** Items to show (the h1 is usually left out); set with a `.items=` binding. */
	@attribute() readonly items = state<TocItem[]>([]);
	/** Where the headings live; default the document. */
	root: ParentNode = document;
	readonly #active = state<string | undefined>(undefined);
	readonly #scrollingUp = state(false);
	readonly #panelOpen = state(false);
	/** The embedded list shows only the first `PRIMARY_MAX` entries until expanded. */
	readonly #expanded = state(false);

	/** Jumps to a heading, leaving room for the sticky top bar (the old `navigate` used a fixed 80 px). */
	#go(e: Event, id: string): void {
		e.preventDefault();
		const el = this.root.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
		const bar = document.querySelector('.top-bar')?.getBoundingClientRect().height ?? 0;
		scrollToElement(el, window, bar + 8);
		this.#panelOpen.set(false);
	}

	#list(items: readonly TocItem[], active: string | undefined) {
		return items.map(
			(i) => t`<a href=${`#${i.id}`} @click=${(e: Event) => this.#go(e, i.id)} style=${`padding-inline-start: ${Math.max(0, i.level - 2) * 0.75}rem`} aria-current=${i.id === active ? 'location' : 'false'}>${i.text}</a>`,
		);
	}
	#stop?: () => void;

	protected override connect(): void {
		const tops = new Map<string, number>();
		const update = (): void => {
			const ids = this.items.peek().map((i) => i.id);
			// the last sections can never reach the top of the viewport: at the page end the last heading wins
			const atEnd = window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
			this.#active.set(atEnd ? ids.at(-1) : activeHeading(tops, ids));
		};
		let lastY = window.scrollY;
		const measure = (): void => {
			// the floating buttons show while the reader scrolls up (as the old `isScrollUp`)
			const y = window.scrollY;
			if (y !== lastY) this.#scrollingUp.set(y < lastY && y > 0);
			lastY = y;
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
		const outside = (e: Event): void => {
			if (!e.composedPath().includes(this)) this.#panelOpen.set(false);
		};
		document.addEventListener('click', outside);
		this.#stop = () => {
			stopEffect();
			document.removeEventListener('click', outside);
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
		const expandable = items.length > PRIMARY_MAX;
		const expanded = this.#expanded();
		const shown = expandable && !expanded ? items.slice(0, PRIMARY_MAX) : items;
		const up = this.#scrollingUp();
		return t`
			<section aria-label="Table of contents">
				${expandable
					? t`<button class="heading" type="button" aria-expanded=${String(expanded)} title="Expand/collapse contents" @click=${() => this.#expanded.set(!expanded)}>Contents ${expanded ? '▾' : '▸'}</button>`
					: t`<div class="heading">Contents</div>`}
				<nav>${this.#list(shown, active)}</nav>
			</section>
			${up || this.#panelOpen()
				? t`<div class="float">
					<button type="button" title="To top" aria-label="Back to top" @click=${() => scrollToTop()}>▲</button>
					<button type="button" aria-expanded=${String(this.#panelOpen())} @click=${() => this.#panelOpen.set(!this.#panelOpen())}>TOC</button>
				</div>`
				: null}
			${this.#panelOpen() ? t`<nav class="panel" aria-label="All headings">${this.#list(items, active)}</nav>` : null}`;
	}
}