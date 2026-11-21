import { describe, expect, it } from 'vitest';
import { iconUri, icons } from './icons.ts';

describe('icons', () => {
	it('resolves known icons to svg data URIs', () => {
		const uri = iconUri('menu')!;
		expect(uri.startsWith('data:image/svg+xml,')).toBe(true);
		expect(decodeURIComponent(uri)).toContain('<svg');
	});
	it('returns undefined for unknown icons', () => {
		expect(iconUri('nope')).toBeUndefined();
	});
	it('every icon is a well formed svg', () => {
		for (const [name, s] of Object.entries(icons)) {
			expect(s, name).toMatch(/^<svg[^>]*>.*<\/svg>$/);
		}
	});
});
