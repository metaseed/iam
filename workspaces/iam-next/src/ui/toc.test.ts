import { describe, expect, it } from 'vitest';
import { activeHeading } from './toc.ts';

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