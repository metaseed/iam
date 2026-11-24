// After a doc's html is in the page, widgets are inserted into the rendered DOM (the old `prepareTitleAndToc`, `i-tags`,
// `i-subpage` ...). The html is rendered once and never re-split, so adding a widget does not re-render the article.
// A decorator returns a cleanup that undoes its change.
import '../ui/toc.ts';
import type { Toc } from '../ui/toc.ts';
import type { HeadMeta, TocItem } from './render.ts';

export interface DecorateContext {
	meta: HeadMeta;
	toc: readonly TocItem[];
}

export type Decorator = (article: HTMLElement, doc: DecorateContext) => (() => void) | void;

/** Inserts `<iam-toc>` after the title (first h1) when there are headings below it; `no-toc` on the h1 opts out. */
export const tocDecorator: Decorator = (article, { toc }) => {
	const title = article.querySelector('h1');
	const items = toc.filter((i) => i.level > 1);
	if (!title || /no-?toc/i.test(title.className) || !items.length) return;
	const el = document.createElement('iam-toc') as Toc;
	el.items = items;
	el.root = article;
	title.insertAdjacentElement('afterend', el);
	return () => el.remove();
};

export const defaultDecorators: readonly Decorator[] = [tocDecorator];

/** Runs the decorators on a rendered article; the returned function undoes all of them. */
export function decorate(article: HTMLElement, doc: DecorateContext, decorators: readonly Decorator[] = defaultDecorators): () => void {
	const cleanups = decorators.map((d) => d(article, doc)).filter((c): c is () => void => typeof c === 'function');
	return () => cleanups.reverse().forEach((c) => c());
}