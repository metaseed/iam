// Framework-free markdown pipeline. Phase 0 includes only markdown-it core + front-matter ("head meta");
// the ~20 plugins of the old viewer are ported in Phase 4.
import MarkdownIt from 'markdown-it';
import { load } from 'js-yaml';

export interface HeadMeta {
	author?: string;
	version?: string;
	tag?: string[];
	subPage?: number[];
	enable?: string[];
}

/**
 * Splits the `---` yaml block (head meta) from the body. As in the old `getHeadMeta`, the block normally follows the
 * first line (`# Title`), so the title line is kept in the body; a block at the very start is accepted too.
 */
export function splitHeadMeta(source: string): { meta: HeadMeta; body: string } {
	const m = /^((?:[ \t]*\r?\n)*[^\n]*\r?\n)?---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(source);
	if (!m) return { meta: {}, body: source };
	let meta: HeadMeta = {};
	try {
		meta = (load(m[2]!, { json: true }) as HeadMeta | null) ?? {};
	} catch {
		/* malformed head meta: render the body anyway */
	}
	return { meta, body: (m[1] ?? '') + source.slice(m[0].length) };
}

export interface TocItem {
	/** 1-6 */
	level: number;
	id: string;
	text: string;
}

/** Heading text to an id: lower case, spaces to `-`, letters (any script), digits, `_` and `-` kept. */
export function slugify(text: string): string {
	return text.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\p{L}\p{N}_-]/gu, '') || 'section';
}

const md = new MarkdownIt({ html: true, linkify: true, typographer: true });

// Gives every heading a unique `id` (for toc links and deep links) and collects them in `env.toc`.
md.core.ruler.push('heading_ids', (state) => {
	const toc: TocItem[] = [];
	const used = new Map<string, number>();
	state.tokens.forEach((token, i) => {
		if (token.type !== 'heading_open') return;
		const text = (state.tokens[i + 1]?.children ?? []).map((c) => (c.type === 'text' || c.type === 'code_inline' ? c.content : '')).join('');
		const base = slugify(text);
		const n = used.get(base) ?? 0;
		used.set(base, n + 1);
		const id = n === 0 ? base : `${base}-${n}`;
		token.attrSet('id', id);
		toc.push({ level: Number(token.tag.slice(1)), id, text });
	});
	(state.env as { toc?: TocItem[] }).toc = toc;
});

export function renderMarkdown(source: string): { html: string; meta: HeadMeta; toc: TocItem[] } {
	const { meta, body } = splitHeadMeta(source);
	const env: { toc?: TocItem[] } = {};
	const html = md.render(body, env);
	return { html, meta, toc: env.toc ?? [] };
}
