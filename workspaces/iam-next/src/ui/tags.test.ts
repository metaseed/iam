import { render, state, t } from '@std-ui/core';
import { describe, expect, it } from 'vitest';
import { labelColor } from './tags.ts';
import type { Tag } from '../store/doc-store.ts';

const tick = () => new Promise((r) => setTimeout(r));

describe('labelColor', () => {
	it('adds the # to a github label color and rejects anything else', () => {
		expect(labelColor('ff00AA')).toBe('#ff00AA');
		expect(labelColor(undefined)).toBeUndefined();
		expect(labelColor('red; background: url(x)')).toBeUndefined(); // never end up in the style attribute
	});
});

describe('<iam-tags>', () => {
	/** Renders the element the way the viewer does: with property bindings. */
	const make = (names: string[], lookup?: (name: string) => Tag | undefined) => {
		const host = document.createElement('div');
		document.body.append(host);
		const handle = render(t`<iam-tags .names=${names} .lookup=${lookup}></iam-tags>`, host);
		const el = host.querySelector('iam-tags')!;
		return { el, handle, host, chips: () => [...el.shadowRoot!.querySelectorAll('a')] };
	};

	it('shows one link per tag to the search for it, plain when the tag is unknown', async () => {
		const { chips, host } = make(['a b', 'c'], () => undefined);
		await tick();
		expect(chips().map((a) => [a.textContent, a.getAttribute('href'), a.getAttribute('style')])).toEqual([
			['a b', '/search?tag=a%20b', ''],
			['c', '/search?tag=c', ''],
		]);
		host.remove();
	});

	it('colors a chip from the label and updates when the labels load later', async () => {
		const labels = state<ReadonlyMap<string, Tag>>(new Map());
		const { chips, host } = make(['x'], (name) => labels().get(name));
		await tick();
		expect(chips()[0]!.getAttribute('style')).toBe('');

		labels.set(new Map([['x', { name: 'x', color: '00ff00', description: 'the x tag' }]]));
		await tick();
		expect(chips()[0]!.getAttribute('style')).toBe('--tag-color: #00ff00');
		expect(chips()[0]!.title).toBe('the x tag');
		host.remove();
	});

	it('updates the chips when the bound names change', async () => {
		const host = document.createElement('div');
		document.body.append(host);
		const view = (names: string[]) => t`<iam-tags .names=${names}></iam-tags>`;
		const handle = render(view(['a']), host);
		const el = host.querySelector('iam-tags')!;
		await tick();
		handle.update(view(['a', 'b']));
		await tick();
		expect(el.shadowRoot!.querySelectorAll('a')).toHaveLength(2);
		host.remove();
	});

	it('renders nothing without tags', async () => {
		const { el, host } = make([], undefined);
		await tick();
		expect(el.shadowRoot!.querySelector('nav')).toBeNull();
		host.remove();
	});
});
