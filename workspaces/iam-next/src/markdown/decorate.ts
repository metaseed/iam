// After a doc's html is in the page, widgets are inserted into the rendered DOM (the old `prepareTitleAndToc`, `i-tags`,
// `i-subpage` ...). The html is rendered once and never re-split, so adding a widget does not re-render the article.
// A decorator returns a cleanup that undoes its change. Widgets are rendered with `render(..., { before })`, next to the doc's own
// nodes (which `unsafeHtml` owns), so nothing is wrapped or cleared.
import { render, t } from '@std-ui/core';
import '../ui/toc.ts';
import { slugify, type HeadMeta, type TocItem } from './render.ts';

export interface DecorateContext {
	meta: HeadMeta;
}

export type Decorator = (article: HTMLElement, doc: DecorateContext) => (() => void) | void;

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

/** Renders `<iam-toc>` right after the title (first h1) when there are headings below it; `no-toc` on the h1 opts out. */
export const tocDecorator: Decorator = (article) => {
	const title = article.querySelector('h1');
	if (!title || NO_TOC.test(title.className)) return;
	const items = collectHeadings(article).filter((i) => i.level > 1);
	if (!items.length) return;
	const toc = render(t`<iam-toc .items=${items} .root=${article}></iam-toc>`, article, { before: title.nextSibling });
	return () => toc.dispose();
};

export const createDecorators = (): Decorator[] => [tocDecorator];

/** Runs the decorators on a rendered article; the returned function undoes all of them. */
export function decorate(article: HTMLElement, doc: DecorateContext, decorators: readonly Decorator[]): () => void {
	const cleanups = decorators.map((d) => d(article, doc)).filter((c): c is () => void => typeof c === 'function');
	return () => cleanups.reverse().forEach((c) => c());
}
