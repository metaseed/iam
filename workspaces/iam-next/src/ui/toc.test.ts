import { render, t } from '@std-ui/core';
import { describe, expect, it } from 'vitest';
import './toc.ts';
import { activeHeading, PRIMARY_MAX } from './toc.ts';

const tick = () => new Promise((r) => setTimeout(r));
const items = (n: number) => Array.from({ length: n }, (_, i) => ({ level: 2, id: `h${i}`, text: `H${i}` }));

function make(n: number) {
	const host = document.createElement('div');
	document.body.append(host);
	render(t`<iam-toc .items=${items(n)}></iam-toc>`, host);
	const el = host.querySelector('iam-toc')!;
	return { el, host, links: () => [...el.shadowRoot!.querySelectorAll('section a')], root: el.shadowRoot! };
}

describe('<iam-toc> embedded list', () => {
	it('shows a Contents heading and every entry when there are few', async () => {
		const { links, root, host } = make(PRIMARY_MAX);
		await tick();
		expect(links()).toHaveLength(PRIMARY_MAX);
		expect(root.querySelector('section .heading')!.textContent).toBe('Contents');
		expect(root.querySelector('button.heading')).toBeNull();
		host.remove();
	});

	it('collapses after the primary entries and expands with the heading button', async () => {
		const { links, root, host } = make(PRIMARY_MAX + 3);
		await tick();
		expect(links()).toHaveLength(PRIMARY_MAX);
		root.querySelector<HTMLButtonElement>('button.heading')!.click();
		await tick();
		expect(links()).toHaveLength(PRIMARY_MAX + 3);
		host.remove();
	});

});

describe('activeHeading', () => {
	const ids = ['a', 'b', 'c'];
	it('is the last heading at or above the offset', () => {
		expect(activeHeading(new Map([['a', -300], ['b', 40], ['c', 500]]), ids)).toBe('b');
	});
	it('is the first heading before any has been reached', () => {
		expect(activeHeading(new Map([['a', 200], ['b', 400], ['c', 600]]), ids)).toBe('a');
	});
	it('is undefined without headings', () => {
		expect(activeHeading(new Map(), [])).toBeUndefined();
	});
});
