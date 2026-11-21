// Port of `GithubCache`: the farthest cache level, implementing `NextCache` over `github/repository.ts`.
// Doc meta lives in issues (a closed issue means a deleted doc), doc content in `documents/<id>.<format>`.
import { HttpError } from '../lib/http.ts';
import { Logger } from '../lib/logger.ts';
import type { Issue, Label } from '../github/issues.ts';
import type { Repository } from '../github/repository.ts';
import { splitHeadMeta } from '../markdown/render.ts';
import { issueToDocMeta, metaFromContent, getTitle, parseDocumentName, sanitizeTitle } from './doc-meta.ts';
import type { Doc, DocContent, DocMeta, NextCache } from './model.ts';

export const DOCUMENTS_FOLDER_NAME = 'documents';
export const GITHUB_PAGE_SIZE = 50;
/** After this long the remembered highest id is dropped so the first page is read again. */
export const FIRST_PAGE_REFRESH_MS = 5 * 60 * 1000;

const log = Logger('github-cache');

export interface SearchHit {
	id: number;
	score: number;
	title: string;
	text_matches?: unknown;
	source: 'netIssue' | 'netFile';
}

export interface GithubCacheOptions {
	/** Public url of a doc (stored in the issue body). */
	contentUrl: (id: number, title: string, format: string) => string;
	/** Receives the labels of issues that were read (feeds the tag cache). */
	onLabels?: (labels: Label[]) => void;
	/** Id range now known to be cached: `low` is exclusive, `high` inclusive. */
	onIdRange?: (range: { low?: number; high?: number }) => void;
	now?: () => number;
}

const commitMessage = (title: string, version?: string, change?: string): string =>
	`${title}${version ? `, ver: ${version}` : ''}${change ? `, change: ${change}` : ''}`;

const is404 = (e: unknown): boolean => e instanceof HttpError && e.status === 404;

/** Which GitHub pages (1 based) hold the ids around `id`; mirrors the old page heuristics. */
export function pagesFor(id: number, highestId: number, isBelowKey: boolean): number[] {
	const ratio = (highestId - id + 1) / GITHUB_PAGE_SIZE;
	const page = Math.ceil(ratio);
	const nearFloor = ratio % 1 < 0.5;
	const first = page === 1;
	const last = page === Math.ceil(highestId / GITHUB_PAGE_SIZE);
	if (first && (!isBelowKey || nearFloor)) return [1];
	if (last && (isBelowKey || !nearFloor)) return [page];
	if (isBelowKey && !nearFloor) return [page, page + 1];
	if (!isBelowKey && nearFloor) return [page - 1, page];
	return [page];
}

export class GithubCache implements NextCache {
	#highestId: number | undefined;
	#highestIdAt = 0;

	constructor(
		private readonly repo: Repository,
		private readonly options: GithubCacheOptions,
	) {}

	#now = () => (this.options.now ?? Date.now)();

	#toMeta(issue: Issue): DocMeta {
		const { meta, labels } = issueToDocMeta(issue);
		this.options.onLabels?.(labels);
		return meta;
	}

	/** Creates the doc: an issue (a closed one is reused) for the id, the file, and the meta in the issue body. */
	async create(content: string, format: string): Promise<Doc> {
		const title = getTitle(content);
		const closed = await this.repo.issue.list({ state: 'closed' });
		const reused = closed.length > 0;
		const issue = reused ? closed[closed.length - 1]! : await this.repo.issue.create({ title });
		log.debug(reused ? 'reused closed issue' : 'created issue', issue.number);
		const id = issue.number;
		try {
			const path = `${DOCUMENTS_FOLDER_NAME}/${id}.${format}`;
			const message = commitMessage(title, '1.0.0', 'create document');
			let file;
			try {
				file = await this.repo.newFile(path, content, message);
			} catch (e) {
				if (!(e instanceof HttpError) || e.status !== 422) throw e;
				// the file is already there (a reused issue number): overwrite it
				const { sha } = await this.repo.getSha(path);
				file = await this.repo.updateFile(path, content, sha, message);
			}
			const url = this.options.contentUrl(id, title, format);
			const { meta, metaStr } = metaFromContent(id, content, url, format, new Date(issue.created_at), new Date(issue.updated_at));
			await this.repo.issue.edit(id, { title, state: 'open', body: metaStr });
			return { meta, content: { id, content, sha: file.content!.sha, format, isDeleted: false } };
		} catch (e) {
			await this.repo.issue.edit(id, { state: 'closed' }).catch((err) => log.error('could not close issue after failed create', err));
			throw e;
		}
	}

	/**
	 * Metas around `key` as one list (newest first, duplicates removed). `key` undefined or `Number.MAX_VALUE`
	 * reads from the first page. The old version emitted page by page; callers only need the union.
	 */
	async readBulkMeta(key: number | undefined, isBelowKey: boolean): Promise<DocMeta[]> {
		const fresh = key === undefined || key === Number.MAX_VALUE;
		if (fresh || (this.#highestId !== undefined && this.#now() - this.#highestIdAt > FIRST_PAGE_REFRESH_MS)) this.#highestId = undefined;

		const getPage = async (page: number): Promise<DocMeta[]> => {
			// closed issues are included so they can be marked deleted
			const issues = await this.repo.issue.list({ state: 'all', page, per_page: GITHUB_PAGE_SIZE, sort: 'created' });
			if (page === 1 && issues.length > 0) {
				this.#highestId = issues[0]!.number;
				this.#highestIdAt = this.#now();
			}
			return issues.map((i) => this.#toMeta(i));
		};

		const metas: DocMeta[] = [];
		let loadedFirst: DocMeta[] | undefined;
		if (this.#highestId === undefined) {
			loadedFirst = await getPage(1);
			metas.push(...loadedFirst);
		}
		const highestId = this.#highestId;
		if (highestId === undefined) return metas; // no issues at all

		const id = fresh ? highestId : key!;
		for (const page of pagesFor(id, highestId, isBelowKey)) {
			if (page === 1 && loadedFirst) continue;
			if (page < 1) continue;
			metas.push(...(await getPage(page)));
		}

		const seen = new Set<number>();
		const unique = metas.filter((m) => !seen.has(m.id) && !!seen.add(m.id));
		if (unique.length > 0) {
			this.options.onIdRange?.({ high: Math.max(...unique.map((m) => m.id)), low: Math.min(...unique.map((m) => m.id)) - 1 });
		}
		return unique;
	}

	async readMeta(id: number): Promise<DocMeta> {
		return this.#toMeta(await this.repo.issue.get(id));
	}

	/**
	 * Reads `documents/<id>.<format>`. On 404 it asks the issue for the real format/title (and whether the doc was
	 * deleted), then tries `<Title>_<id>.<format>` and finally the bare `<id>`. Deleted docs return `isDeleted`.
	 */
	async readContent(id: number, format: string): Promise<DocContent> {
		let state = 0;
		const get = async (fmt: string, isDeleted = false, title?: string): Promise<DocContent> => {
			if (isDeleted) return { id, content: '', sha: '', format: fmt, isDeleted: true };
			const path = `${DOCUMENTS_FOLDER_NAME}/${title ? `${sanitizeTitle(title)}_` : ''}${id}${fmt ? `.${fmt}` : ''}`;
			try {
				const c = (await this.repo.getContents(path)) as { content?: string; sha: string };
				return { id, content: c.content ?? '', sha: c.sha, format: fmt, isDeleted: false };
			} catch (e) {
				if (!is404(e)) throw e;
				if (state === 0) {
					state = 1;
					const meta = await this.readMeta(id); // someone may have renamed or deleted it
					return get(meta.format, meta.isDeleted, meta.title);
				}
				if (fmt && state === 1) {
					state = 2;
					return get('');
				}
				throw new Error(`could not get content of id: ${id}, format: ${format}`);
			}
		};
		return get(format);
	}

	/** Commits the file (needs the stored sha), then writes the new meta into the issue. */
	async update(docMeta: DocMeta, docContent: DocContent, changeLog: string): Promise<Doc> {
		const { id, content, format, sha } = docContent;
		const title = docMeta.title;
		const message = commitMessage(title, splitHeadMeta(content).meta.version, changeLog);
		const file = await this.repo.updateFile(`${DOCUMENTS_FOLDER_NAME}/${id}.${format}`, content, sha, message);

		// remove the legacy `<Title>_<id>.<format>` file if there is one (best effort)
		const oldPath = `${DOCUMENTS_FOLDER_NAME}/${sanitizeTitle(title)}_${id}.${format}`;
		void this.repo.delFile(oldPath).catch((e) => {
			if (!is404(e)) log.warn('could not delete the legacy file', oldPath, e);
		});

		const url = this.options.contentUrl(id, title, format);
		const { meta, metaStr } = metaFromContent(id, content, url, format, docMeta.createDate, new Date(file.commit.committer.date), docMeta);
		await this.repo.issue.edit(meta.id, { title, body: metaStr, labels: meta.tag });
		return { meta, content: { id: meta.id, content, sha: file.content!.sha, format, isDeleted: false } };
	}

	/** Closes the issue and deletes the file (already gone elsewhere is fine). */
	async delete(id: number): Promise<void> {
		const issue = await this.repo.issue.edit(id, { state: 'closed' });
		const { format } = this.#toMeta(issue);
		try {
			await this.repo.delFile(`${DOCUMENTS_FOLDER_NAME}/${id}.${format}`);
		} catch (e) {
			if (!is404(e)) throw e;
		}
	}

	/** Issue title search merged with file content search; titles from issues win. */
	async search(query: string): Promise<SearchHit[]> {
		const [issues, files] = await Promise.all([this.repo.searchIssue(query), this.repo.searchCode(query)]);
		type Item = { number?: number; name?: string; score: number; title?: string; text_matches?: unknown };
		const fromFiles: SearchHit[] = (files.items as Item[]).map((item) => {
			const { id, sanitizedTitle } = parseDocumentName(item.name!);
			return { id, score: item.score, title: sanitizedTitle, text_matches: item.text_matches, source: 'netFile' };
		});
		for (const item of issues.items as Item[]) {
			const hit: SearchHit = { id: +item.number!, score: item.score, title: item.title!, text_matches: item.text_matches, source: 'netIssue' };
			const found = fromFiles.find((f) => f.id === hit.id);
			if (found) found.title = hit.title;
			else fromFiles.push(hit);
		}
		return fromFiles;
	}
}
