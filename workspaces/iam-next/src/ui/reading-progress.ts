// Replaces `reading-position-indicator`: a thin fixed bar at the top showing how far the page (or a scrollable
// element) has been read. `target` is a CSS selector for a scrollable element; empty means the window.
import { attribute, css, state, t, tag, UIElement } from '@std-ui/core';
import { maxScrollTopOf, scrollTopOf } from '../lib/scroll.ts';

/** Percentage read, clamped to 0-100; content that does not scroll counts as 0. */
export function readingPercent(scrollTop: number, maxScrollTop: number): number {
	if (maxScrollTop <= 0) return 0;
	return Math.min(100, Math.max(0, (scrollTop / maxScrollTop) * 100));
}

@tag('iam-reading-progress')
export class ReadingProgress extends UIElement {
	static override shadowRootOptions = { mode: 'open' } as const;
	static override styles = css`
		:host { position: fixed; inset: 0 0 auto 0; height: 2px; z-index: 11; pointer-events: none; }
		div { height: 100%; background: var(--wa-color-brand-fill-loud); transition: width 0.1s linear; }
	`;

	@attribute() readonly target = state('');
	readonly #percent = state(0);

	protected override connect(): void {
		const el = this.target.peek() ? document.querySelector<HTMLElement>(this.target.peek()) : null;
		const container: HTMLElement | Window = el ?? window;
		const update = (): void => this.#percent.set(readingPercent(scrollTopOf(container), maxScrollTopOf(container)));
		container.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update);
		update();
		this.#stop = () => {
			container.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
		};
	}
	#stop?: () => void;
	protected override disconnect(): void {
		this.#stop?.();
	}

	protected override template() {
		const value = Math.round(this.#percent());
		return t`<div role="progressbar" aria-label="Reading position" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${String(value)} style=${`width: ${this.#percent()}%`}></div>`;
	}
}
