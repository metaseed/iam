// Replaces core/services/scroll (ScrollService), scroll-spy (ScrollSpyService) and the ContainerRef scroll helpers.
import { signal, type ReadonlySignal } from '@std-ui/core';

export type ScrollContainer = HTMLElement | Window;

export function scrollTopOf(container: ScrollContainer = window): number {
	return container instanceof HTMLElement ? container.scrollTop : window.scrollY || 0;
}

export function maxScrollTopOf(container: ScrollContainer = window): number {
	if (container instanceof HTMLElement) return container.scrollHeight - container.clientHeight;
	return document.documentElement.scrollHeight - document.documentElement.clientHeight;
}

/**
 * Scrolls `element` so its top sits `topOffset` px below the container's top. For the window, a position within 20 px of
 * the top snaps to 0 (an element with a small top margin at the page top).
 */
export function scrollToElement(element: HTMLElement | null, container: ScrollContainer = window, topOffset = 0): void {
	if (!element) return;
	if (container instanceof HTMLElement) {
		const delta = element.getBoundingClientRect().top - container.getBoundingClientRect().top;
		container.scrollTop += delta - topOffset;
		return;
	}
	window.scrollBy(0, element.getBoundingClientRect().top - topOffset);
	if (window.scrollY < 20) window.scrollTo(window.scrollX, 0);
}

export function scrollToTop(container: ScrollContainer = window): void {
	if (container instanceof HTMLElement) container.scrollTop = 0;
	else window.scrollTo(window.scrollX, 0);
}

/** Scrolls to the element named by `hash` (`#id` or `id`); with no hash scrolls to the top. */
export function scrollToHash(hash: string = location.hash, container: ScrollContainer = window, topOffset = 0): void {
	const id = decodeURIComponent(hash.replace(/^#/, ''));
	const target = id ? document.getElementById(id) : null;
	if (target) scrollToElement(target, container, topOffset);
	else scrollToTop(container);
}

/**
 * Index (into `tops`, the elements' absolute tops) of the element being read: the lowest one at or above `scrollTop`.
 * Near the end of the scroll range the lowest element wins, so a short final section can still become active.
 * Same rule as the old ScrollSpiedElementGroup.
 */
export function activeIndex(tops: readonly number[], scrollTop: number, maxScrollTop: number): number | null {
	if (!tops.length) return null;
	const atEnd = scrollTop + 1 >= maxScrollTop;
	let found: number | null = null;
	tops.forEach((top, i) => {
		if ((atEnd || top <= scrollTop) && (found === null || top >= tops[found]!)) found = i;
	});
	return found;
}

export interface ScrollSpy {
	/** The element currently being read, or `null` above the first one. */
	readonly active: ReadonlySignal<Element | null>;
	readonly activeIndex: ReadonlySignal<number | null>;
	/** Re-measure now (content height changed, fonts or images loaded). Also runs on resize. */
	recalibrate(): void;
	dispose(): void;
}

export function scrollSpy(elements: readonly Element[], container: ScrollContainer = window, topOffset = 0): ScrollSpy {
	const index = signal<number | null>(null);
	const active = signal<Element | null>(null);
	let tops: number[] = [];
	let lastHeight = -1;
	let frame = 0;

	const measure = (): void => {
		const base = scrollTopOf(container);
		const containerTop = container instanceof HTMLElement ? container.getBoundingClientRect().top : 0;
		tops = elements.map((el) => base + el.getBoundingClientRect().top - containerTop - topOffset);
		lastHeight = container instanceof HTMLElement ? container.scrollHeight : document.documentElement.scrollHeight;
	};
	const update = (): void => {
		frame = 0;
		const height = container instanceof HTMLElement ? container.scrollHeight : document.documentElement.scrollHeight;
		if (height !== lastHeight) measure(); // something changed the page height (image loaded, section expanded)
		const i = activeIndex(tops, scrollTopOf(container), maxScrollTopOf(container));
		index.set(i);
		active.set(i === null ? null : (elements[i] ?? null));
	};
	const schedule = (): void => {
		if (!frame) frame = requestAnimationFrame(update);
	};
	const onResize = (): void => {
		measure();
		schedule();
	};

	measure();
	update();
	const scrollTarget: EventTarget = container;
	scrollTarget.addEventListener('scroll', schedule, { passive: true });
	window.addEventListener('resize', onResize);

	return {
		active,
		activeIndex: index,
		recalibrate: onResize,
		dispose(): void {
			scrollTarget.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', onResize);
			if (frame) cancelAnimationFrame(frame);
		},
	};
}
