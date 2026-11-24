import { describe, expect, it } from 'vitest';
import { collectHeadings, createDecorators, decorate } from './decorate.ts';
import { renderMarkdown } from './render.ts';

function article(html: string) {
	const el = document.createElement('article');
	el.innerHTML = html;
	return el;
}
const render = (src: string) => article(renderMarkdown(src).html);
const items = (el: Element) => (el.querySelector('iam-toc') as unknown as { items: { id: string }[] }).items.map((i) => i.id);

describe('collectHeadings', () => {
	it('reads headings from the dom, raw html ones included, and skips no-toc', () => {
		const el = article('<h1>T</h1><h2 id="a">A</h2><h2>Raw one</h2><h3 class="no-toc">Hidden</h3><h2>Raw one</h2><h6>Deep</h6>');
		expect(collectHeadings(el)).toEqual([
			{ level: 1, id: 't', text: 'T' },
			{ level: 2, id: 'a', text: 'A' },
			{ level: 2, id: 'raw-one', text: 'Raw one' },
			{ level: 2, id: 'raw-one-1', text: 'Raw one' },
			{ level: 6, id: 'deep', text: 'Deep' },
		]);
		expect(el.querySelectorAll('h2')[1]!.id).toBe('raw-one'); // the id is set on the element so links work
	});
});

describe('decorate: toc', () => {
	it('inserts iam-toc right after the h1 without touching the rest', () => {
		const el = render('# T\n\n## A\n\n## B');
		const h2 = el.querySelector('h2');
		decorate(el, { meta: {} }, createDecorators());
		expect(el.querySelector('iam-toc')!.previousElementSibling).toBe(el.querySelector('h1'));
		expect(el.querySelector('h2')).toBe(h2); // nothing was re-rendered
		expect(items(el)).toEqual(['a', 'b']);
	});
	it('cleanup removes it again', () => {
		const el = render('# T\n\n## A');
		decorate(el, { meta: {} }, createDecorators())();
		expect(el.querySelector('iam-toc')).toBeNull();
	});
	it('leaves the article exactly as it was after cleanup (no wrapper, no marker left)', () => {
		const el = render('# T\n\n## A\n\n## B');
		const before = el.innerHTML;
		const undo = decorate(el, { meta: {} }, createDecorators());
		expect(el.innerHTML).not.toBe(before);
		undo();
		expect(el.innerHTML).toBe(before);
	});
	it('can be applied again for the next doc', () => {
		const decorators = createDecorators();
		decorate(render('# T\n\n## A'), { meta: {} }, decorators)();
		const second = render('# U\n\n## X\n\n## Y');
		decorate(second, { meta: {} }, decorators);
		expect(items(second)).toEqual(['x', 'y']);
	});
	it('skips docs without sub headings, without h1, or with a no-toc h1', () => {
		for (const el of [render('# T\n\ntext'), render('## A\n\n## B')]) {
			decorate(el, { meta: {} }, createDecorators());
			expect(el.querySelector('iam-toc')).toBeNull();
		}
		const el = render('# T\n\n## A');
		el.querySelector('h1')!.className = 'no-toc';
		decorate(el, { meta: {} }, createDecorators());
		expect(el.querySelector('iam-toc')).toBeNull();
	});
});