// After a doc's html is in the page, the widgets of the head meta are rendered into it, as the old meta plugin did with
// `<i-version>`, `<i-toc>`, `<i-tag>`, `<i-subpage>`: in that order, right after the title. The html is rendered once and
// never re-split, so adding a widget does not re-render the article.
// A decorator returns a cleanup that undoes its change. Widgets are rendered with `render(..., { before })`, next to the
// doc's own nodes (which `unsafeHtml` owns), so nothing is wrapped or cleared.
import { render, t } from '@std-ui/core';
import '../ui/tags.ts';
import '../ui/toc.ts';
import type { Tag } from '../store/doc-store.ts';
import { slugify, type HeadMeta, type TocItem } from './render.ts';

export interface DecorateContext {
	meta: HeadMeta;
	/** Finds the label of a tag (color, description). */
	tag?: (name: string) => Tag | undefined;
}

/** `before` is where widgets go: all decorators render before the same node, so they end up in decorator order. */
export type Decorator = (article: HTMLElement, doc: DecorateContext, before: Node | null) => (() => void) | void;

const NO_TOC = /no-?toc/i;

/**
 * The headings of a rendered doc, read from the live DOM like the old `TocService.findTocHeadings`, so headings written
 * as raw html count too. Skips `no-toc` headings; a heading without an id gets a unique one (set on the element).
 */
export function collectHeadings(article: ParentNode): TocItem[] {
	const headings = [...article.querySelectorAll<HTMLHeadingElement>('h1,h2,h3,h4,h5,h6')].filter((h) => !NO_TOC.test(h.className));
	const used = new Set(headings.map((h) => h.id).filter(Boolean));
	return headings.map((h) => {
		const text = (h.textContent ?? '').trim();
		if (!h.id) {
			const base = slugify(text);
			let id = base;
			for (let n = 1; used.has(id); n++) id = `${base}-${n}`;
			h.id = id;
			used.add(id);
		}
		return { level: Number(h.tagName.slice(1)), id: h.id, text };
	});
}

/** The table of contents, only for docs that ask for it with `enable: [toc]` in the head meta (as in the old app). */
export const tocDecorator: Decorator = (article, { meta }, before) => {
	if (!meta.enable?.includes('toc')) return;
	const items = collectHeadings(article).filter((i) => i.level > 1);
	if (!items.length) return;
	const toc = render(t`<iam-toc .items=${items} .root=${article}></iam-toc>`, article, { before });
	return () => toc.dispose();
};

/** The tags of the head meta (`tag: [a, b]`) as chips. */
export const tagsDecorator: Decorator = (article, { meta, tag }, before) => {
	if (!meta.tag?.length) return;
	const tags = render(t`<iam-tags .names=${meta.tag} .lookup=${tag}></iam-tags>`, article, { before });
	return () => tags.dispose();
};

export const createDecorators = (): Decorator[] => [tocDecorator, tagsDecorator];

/** Runs the decorators on a rendered article; the returned function undoes all of them. */
export function decorate(article: HTMLElement, doc: DecorateContext, decorators: readonly Decorator[]): () => void {
	// right after the title; without a title at the very top
	const title = article.querySelector('h1');
	const before = title ? title.nextSibling : article.firstChild;
	const cleanups = decorators.map((d) => d(article, doc, before)).filter((c): c is () => void => typeof c === 'function');
	return () => cleanups.reverse().forEach((c) => c());
}
