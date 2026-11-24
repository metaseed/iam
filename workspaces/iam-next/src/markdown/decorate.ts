// After a doc's html is in the page, the widgets of the head meta are rendered into it, as the old meta plugin did with
// `<i-version>`, `<i-toc>`, `<i-tag>`, `<i-subpage>`: in that order, right after the title. The html is rendered once and
// never re-split, so adding a widget does not re-render the article.
// A decorator returns a cleanup that undoes its change. Widgets are rendered with `render(..., { before })`, next to the
// doc's own nodes (which `unsafeHtml` owns), so nothing is wrapped or cleared.
import { render, t } from '@std-ui/core';
import '../ui/subpage.ts';
import '../ui/tags.ts';
import '../ui/toc.ts';
import '../ui/version.ts';
import type { DocMeta } from '../cache/model.ts';
import type { Tag } from '../store/doc-store.ts';
import { slugify, type HeadMeta, type TocItem } from './render.ts';

export interface DecorateContext {
	meta: HeadMeta;
	/** Finds the label of a tag (color, description). */
	tag?: (name: string) => Tag | undefined;
	/** Id of the doc and a lookup of any doc's meta (dates, titles), for the version and sub page widgets. */
	id?: number;
	docMeta?: (id: number) => DocMeta | undefined;
	format?: string;
	/** Loads the metas of docs the store may not have yet (sub pages); errors are the caller's to log. */
	loadMetas?: (ids: readonly number[]) => void;
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

/** Create and update date, from the store's meta (read in the widget, so it updates when the meta changes). */
export const versionDecorator: Decorator = (article, { id, docMeta }, before) => {
	if (id === undefined || !docMeta) return;
	const w = render(t`<iam-version .createdAt=${() => docMeta(id)?.createDate} .updatedAt=${() => docMeta(id)?.updateDate}></iam-version>`, article, { before });
	return () => w.dispose();
};

/** Links to the sub pages; shown even when the list is empty in the old app, here only when there are some (editing: Phase 5). */
export const subPageDecorator: Decorator = (article, { meta, docMeta, loadMetas }, before) => {
	if (!meta.subPage?.length) return;
	const titleOf = (id: number) => docMeta?.(id)?.title;
	const formatOf = (id: number) => docMeta?.(id)?.format;
	loadMetas?.(meta.subPage);
	const w = render(t`<iam-subpage .ids=${meta.subPage} .formatOf=${formatOf} .titleOf=${titleOf}></iam-subpage>`, article, { before });
	return () => w.dispose();
};

export const createDecorators = (): Decorator[] => [versionDecorator, tocDecorator, tagsDecorator, subPageDecorator];

/** Runs the decorators on a rendered article; the returned function undoes all of them. */
export function decorate(article: HTMLElement, doc: DecorateContext, decorators: readonly Decorator[]): () => void {
	// right after the title; without a title at the very top
	const title = article.querySelector('h1');
	const before = title ? title.nextSibling : article.firstChild;
	const cleanups = decorators.map((d) => d(article, doc, before)).filter((c): c is () => void => typeof c === 'function');
	return () => cleanups.reverse().forEach((c) => c());
}
