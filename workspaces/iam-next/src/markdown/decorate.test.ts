import { describe, expect, it } from 'vitest';
import { decorate } from './decorate.ts';
import { renderMarkdown } from './render.ts';

function article(source: string) {
	const doc = renderMarkdown(source);
	const el = document.createElement('article');
	el.innerHTML = doc.html;
	return { el, doc };
}

describe('decorate: toc', () => {
	it('inserts iam-toc right after the h1 without touching the rest', () => {
		const { el, doc } = article('# T\n\n## A\n\n## B');
		const before = el.querySelector('h2')!;
		decorate(el, doc);
		const toc = el.querySelector('iam-toc')!;
		expect(toc.previousElementSibling).toBe(el.querySelector('h1'));
		expect(el.querySelector('h2')).toBe(before); // same node: nothing was re-rendered
		expect((toc as unknown as { items: unknown[] }).items.map((i: any) => i.id)).toEqual(['a', 'b']);
	});
	it('cleanup removes it again', () => {
		const { el, doc } = article('# T\n\n## A');
		decorate(el, doc)();
		expect(el.querySelector('iam-toc')).toBeNull();
	});
	it('skips docs without sub headings, without h1, or with a no-toc h1', () => {
		for (const src of ['# T\n\ntext', '## A\n\n## B', '# T {.no-toc}']) {
			const { el, doc } = article(src);
			decorate(el, doc);
			expect(el.querySelector('iam-toc')).toBeNull();
		}
		const { el, doc } = article('# T\n\n## A');
		el.querySelector('h1')!.className = 'no-toc';
		decorate(el, doc);
		expect(el.querySelector('iam-toc')).toBeNull();
	});
});