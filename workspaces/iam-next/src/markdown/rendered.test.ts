import { effect } from '@std-ui/core';
import { describe, expect, it, vi } from 'vitest';
import { EntityMap } from '../store/entities.ts';
import { renderedDoc } from './rendered.ts';
import { renderMarkdown } from './render.ts';

const tick = () => new Promise((r) => setTimeout(r));
const doc = (id: number, content: string) => ({ id, content });

describe('renderedDoc', () => {
	it('renders again only when this doc text changed, not for other changes in the store', async () => {
		const contents = new EntityMap<number, { id: number; content: string }>((d) => d.id);
		contents.upsert(doc(1, '# One\n\n## A'));
		const render = vi.fn(renderMarkdown);
		const rendered = renderedDoc(() => contents.get(1)?.content, render);
		const seen: unknown[] = [];
		const stop = effect(() => void seen.push(rendered()));
		await tick();
		expect(render).toHaveBeenCalledTimes(1);
		expect(seen).toHaveLength(1);

		contents.upsert(doc(2, 'another doc')); // swaps the whole map
		contents.upsert(doc(1, '# One\n\n## A')); // same text again (e.g. a refresh with the same content)
		await tick();
		expect(render).toHaveBeenCalledTimes(1);
		expect(seen).toHaveLength(1); // nobody downstream was notified

		contents.upsert(doc(1, '# One\n\n## B')); // really changed
		await tick();
		expect(render).toHaveBeenCalledTimes(2);
		expect(seen).toHaveLength(2);
		expect(rendered()!.toc.map((i) => i.id)).toEqual(['one', 'b']);
		stop();
	});
	it('is undefined while the doc is not loaded', () => {
		const rendered = renderedDoc(() => undefined);
		expect(rendered()).toBeUndefined();
	});
});