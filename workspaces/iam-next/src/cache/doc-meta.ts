// Pure helpers around doc meta (port of the static parts of `DocMeta`, `issueToDocMeta`, `serializeContent`).
// The meta lives as an HTML comment with JSON in the body of the doc's GitHub issue.
import type { Issue, Label } from '../github/issues.ts';
import { Logger } from '../lib/logger.ts';
import type { DocMeta } from './model.ts';

const log = Logger('doc-meta');

export const getTitle = (content: string): string => /\s*#\s(.*)\s*/.exec(content)?.[1] ?? '';
export const getSummary = (content: string): string => /\s*\*(.*?)\*\s*/.exec(content)?.[1] ?? '';
export const getFirstPicture = (content: string): string =>
	/.*!\[.*\]\((.*?)\s+=/.exec(content)?.[1] || /.*!\[.*\]\((.*?)\)/.exec(content)?.[1] || '';

/** Characters that are invalid in Windows file names become `~` (keep in sync with the title markdown-it plugin). */
export const sanitizeTitle = (title: string): string => title.replace(/[<>:"/\\|?*]/g, '~');

/** `Title_12.md` or `12.md`. */
export function parseDocumentName(name: string): { sanitizedTitle: string; id: number; ext: string } {
	let r = /(.*)_(\d+)\.(\w*)/.exec(name);
	if (r) return { sanitizedTitle: r[1]!, id: +r[2]!, ext: r[3]! };
	r = /(\d+)\.(\w*)/.exec(name);
	if (!r) throw new Error(`not a document file name: ${name}`);
	return { sanitizedTitle: '', id: +r[1]!, ext: r[2]! };
}

export function serializeMeta(meta: DocMeta, contentUrl: string): string {
	return `
<!-- type:iam
    ${JSON.stringify(meta, (key, value) => (key.startsWith('_') ? undefined : value))}
-->
> please visit: **[${meta.title}](${contentUrl})**
`;
}

export function deserializeMeta(body: string | null): Partial<DocMeta> | null {
	const m = /<!--\stype:iam[\r\n]*([\s\S]*)-->[\s\S]*/m.exec(body ?? '');
	if (!m) return null;
	try {
		const meta = JSON.parse(m[1]!) as Partial<DocMeta>;
		if (meta.createDate) meta.createDate = new Date(meta.createDate);
		if (meta.updateDate) meta.updateDate = new Date(meta.updateDate);
		return meta;
	} catch (err) {
		log.error('bad meta json', m[1], err);
		return null;
	}
}

/** Issue -> DocMeta. `labels` lets the caller feed its tag cache. */
export function issueToDocMeta(issue: Issue): { meta: DocMeta; labels: Label[] } {
	const stored = deserializeMeta(issue.body) ?? {};
	const meta = {
		title: '',
		summary: '',
		imageData: '',
		...stored,
		id: stored.id || issue.number,
		isDeleted: !!issue.closed_at,
		tag: issue.labels.map((l) => l.name),
		updateDate: issue.updated_at ? new Date(issue.updated_at) : stored.updateDate,
		createDate: issue.created_at ? new Date(issue.created_at) : stored.createDate,
		format: stored.format || 'md',
	} as DocMeta;
	return { meta, labels: issue.labels };
}

/** Meta for new/changed content: title, summary and picture come from the content, the rest from `oldMeta`. */
export function metaFromContent(
	id: number,
	content: string,
	contentUrl: string,
	format: string,
	createDate: Date,
	updateDate: Date | undefined,
	oldMeta?: DocMeta,
): { meta: DocMeta; metaStr: string } {
	const fresh = {
		id,
		title: getTitle(content),
		createDate,
		updateDate: updateDate ?? new Date(),
		summary: getSummary(content),
		imageData: getFirstPicture(content),
		format,
		isDeleted: false,
	};
	const meta = { ...oldMeta, ...fresh } as DocMeta;
	return { meta, metaStr: serializeMeta(meta, contentUrl) };
}
