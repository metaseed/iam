import { describe, expect, it } from 'vitest';
import { renderMarkdown, slugify, splitHeadMeta } from './render.ts';

describe('splitHeadMeta', () => {
	it('parses the leading yaml block', () => {
		const { meta, body } = splitHeadMeta('---\nauthor: a\ntag: [x, y]\n---\n# Hi');
		expect(meta).toEqual({ author: 'a', tag: ['x', 'y'] });
		expect(body).toBe('# Hi');
	});
	it('parses the block after the title line and keeps the title in the body (real doc layout)', () => {
		const { meta, body } = splitHeadMeta('# Workspace\n---\nauthor: a\ntag: []\n---\ntext');
		expect(meta).toEqual({ author: 'a', tag: [] });
		expect(body).toBe('# Workspace\ntext');
	});
	it('accepts blank lines before the title line (doc 312 starts with one)', () => {
		const { meta, body } = splitHeadMeta('\n# Auto Sync\n---\nauthor: a\nenable: [toc]\n---\n## Goal');
		expect(meta).toEqual({ author: 'a', enable: ['toc'] });
		expect(body).toBe('\n# Auto Sync\n## Goal');
	});
	it('returns the source unchanged without head meta', () => {
		expect(splitHeadMeta('# Hi')).toEqual({ meta: {}, body: '# Hi' });
	});
});

describe('renderMarkdown', () => {
	it('renders html and exposes meta', () => {
		const { html, meta } = renderMarkdown('---\ntag: [t]\n---\n# Title\n\ntext');
		expect(html).toContain('<h1 id="title">Title</h1>');
		expect(meta.tag).toEqual(['t']);
	});
});

describe('heading ids', () => {
	it('gives headings unique ids', () => {
		const { html } = renderMarkdown('# Doc\n\n## Setup\n\n### Setup\n\n## 中文 标题\n\n## `code` here');
		for (const id of ['doc', 'setup', 'setup-1', '中文-标题', 'code-here']) expect(html).toContain(`id="${id}"`);
	});
	it('slugify falls back for symbol-only headings', () => {
		expect(slugify('  A  b! ')).toBe('a-b');
		expect(slugify('!!!')).toBe('section');
	});
});