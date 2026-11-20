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
	const m = /^([^\n]*\r?\n)?---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(source);
	if (!m) return { meta: {}, body: source };
	let meta: HeadMeta = {};
	try {
		meta = (load(m[2]!, { json: true }) as HeadMeta | null) ?? {};
	} catch {
		/* malformed head meta: render the body anyway */
	}
	return { meta, body: (m[1] ?? '') + source.slice(m[0].length) };
}

const md = new MarkdownIt({ html: true, linkify: true, typographer: true });

export function renderMarkdown(source: string): { html: string; meta: HeadMeta } {
	const { meta, body } = splitHeadMeta(source);
	return { html: md.render(body), meta };
}
