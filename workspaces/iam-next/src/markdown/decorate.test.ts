import { describe, expect, it } from 'vitest';
import { collectHeadings, createDecorators, decorate, type DecorateContext } from './decorate.ts';
import { renderMarkdown } from './render.ts';

function article(html: string) {
	const el = document.createElement('article');
	el.innerHTML = html;
	return el;
}

/** A doc as the viewer gets it: head meta block after the title, as in real docs. */
const TOC = 'enable: [toc]';
function doc(title: string, body: string, head = TOC) {
	const { html, meta } = renderMarkdown(`${title}\n---\n${head}\n---\n${body}`);
	return { el: article(html), ctx: { meta } as DecorateContext };
}
const widgets = (el: Element) => [...el.children].map((c) => c.tagName.toLowerCase());
const tocItems = (el: Element) => (el.querySelector('iam-toc') as unknown as { items: { id: string }[] }).items.map((i) => i.id);

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
	it('is rendered right after the title for docs with enable: [toc], without touching the rest', () => {
		const { el, ctx } = doc('# T', '## A\n\n## B');
		const h2 = el.querySelector('h2');
		decorate(el, ctx, createDecorators());
		expect(widgets(el)).toEqual(['h1', 'iam-toc', 'h2', 'h2']);
		expect(el.querySelector('h2')).toBe(h2); // nothing was re-rendered
		expect(tocItems(el)).toEqual(['a', 'b']);
	});
	it('is not added without enable: [toc] (the old app has no toc by default)', () => {
		const { el, ctx } = doc('# T', '## A\n\n## B', 'author: a');
		decorate(el, ctx, createDecorators());
		expect(el.querySelector('iam-toc')).toBeNull();
	});
	it('skips docs without sub headings', () => {
		const { el, ctx } = doc('# T', 'text');
		decorate(el, ctx, createDecorators());
		expect(el.querySelector('iam-toc')).toBeNull();
	});
	it('works without a title: widgets go to the top', () => {
		const { el, ctx } = doc('', '## A\n\n## B');
		decorate(el, ctx, createDecorators());
		expect(widgets(el)[0]).toBe('iam-toc');
	});
	it('leaves the article exactly as it was after cleanup (no wrapper, no marker left)', () => {
		const { el, ctx } = doc('# T', '## A\n\n## B', 'enable: [toc]\ntag: [x]');
		const before = el.innerHTML;
		const undo = decorate(el, ctx, createDecorators());
		expect(el.innerHTML).not.toBe(before);
		undo();
		expect(el.innerHTML).toBe(before);
	});
	it('can be applied again for the next doc', () => {
		const decorators = createDecorators();
		const first = doc('# T', '## A');
		decorate(first.el, first.ctx, decorators)();
		const second = doc('# U', '## X\n\n## Y');
		decorate(second.el, second.ctx, decorators);
		expect(tocItems(second.el)).toEqual(['x', 'y']);
	});
});

describe('decorate: tags', () => {
	it('renders the tags after the toc, both right after the title', () => {
		const { el, ctx } = doc('# T', '## A', 'enable: [toc]\ntag: [one, two]');
		decorate(el, ctx, createDecorators());
		expect(widgets(el)).toEqual(['h1', 'iam-toc', 'iam-tags', 'h2']);
		expect((el.querySelector('iam-tags') as unknown as { names: string[] }).names).toEqual(['one', 'two']);
	});
	it('passes the label lookup to the widget', () => {
		const { el, ctx } = doc('# T', '## A', 'tag: [one]');
		const info = { name: 'one', color: 'ff0000' };
		decorate(el, { ...ctx, tag: (n) => (n === 'one' ? info : undefined) }, createDecorators());
		expect((el.querySelector('iam-tags') as unknown as { lookup: (n: string) => unknown }).lookup('one')).toBe(info);
	});
	it('is not added for an empty tag list or none', () => {
		for (const head of ['tag: []', 'author: a']) {
			const { el, ctx } = doc('# T', '## A', head);
			decorate(el, ctx, createDecorators());
			expect(el.querySelector('iam-tags')).toBeNull();
		}
	});
});

describe('decorate: version and sub pages', () => {
	it('renders version, toc, tags, subpage in the old order', () => {
		const { el, ctx } = doc('# T', '## A', 'enable: [toc]\ntag: [x]\nsubPage: [5]');
		const day = new Date(2020, 0, 1);
		decorate(el, { ...ctx, id: 1, docMeta: (id) => ({ id, title: 'Five', createDate: day, updateDate: day }) as never }, createDecorators());
		expect(widgets(el)).toEqual(['h1', 'iam-version', 'iam-toc', 'iam-tags', 'iam-subpage', 'h2']);
		const sub = el.querySelector('iam-subpage') as unknown as { ids: number[]; titleOf: (id: number) => string };
		expect(sub.ids).toEqual([5]);
		expect(sub.titleOf(5)).toBe('Five');
	});
	it('has no subpage widget without sub pages', () => {
		const { el, ctx } = doc('# T', '## A', 'author: a');
		decorate(el, ctx, createDecorators());
		expect(el.querySelector('iam-subpage')).toBeNull();
	});
});

describe('decorate: sub page loading', () => {
	it('asks for the metas of the sub pages and links with their own format', () => {
		const { el, ctx } = doc('# T', '## A', 'subPage: [5, 6]');
		const asked: number[][] = [];
		decorate(el, { ...ctx, loadMetas: (ids) => asked.push([...ids]), docMeta: (id) => (id === 5 ? ({ id, title: 'x', format: 'html' } as never) : undefined) }, createDecorators());
		expect(asked).toEqual([[5, 6]]);
		const sub = el.querySelector('iam-subpage') as unknown as { formatOf: (id: number) => string | undefined };
		expect(sub.formatOf(5)).toBe('html');
	});
});
