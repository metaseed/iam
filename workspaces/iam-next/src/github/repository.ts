// Port of net-storage/github `Requestable` + `Repository`, minus RxJS and Angular HttpClient.
// Reads work signed out (public raw endpoint); everything else needs credentials (`./auth.ts`).
import { base64ToText, textToBase64 } from '../lib/base64.ts';
import { createHttp, HttpError, type Http, type Interceptor, type RequestOptions } from '../lib/http.ts';
import { Logger } from '../lib/logger.ts';
import { authorization, credentials } from './auth.ts';
import { Media } from './media.ts';
import type { Commit, Content, FileResult, ListCommitsOptions, SearchResult } from './model.ts';

export const API_BASE = 'https://api.github.com';
const log = Logger('github');

/** Adds the auth header and `Accept` to API calls and a cache buster to GETs (the old `AuthInterceptor`). */
export const githubInterceptor: Interceptor = (req) => {
	if (!req.url.startsWith(API_BASE)) return;
	const auth = authorization();
	if (auth) req.headers.set('Authorization', auth);
	if (!req.headers.has('Accept')) req.headers.set('Accept', Media.default);
	if (req.method === 'GET') {
		const url = new URL(req.url);
		url.searchParams.set('timestamp', String(Date.now()));
		req.url = url.toString();
	}
};

export function createGithubHttp(fetchImpl?: typeof fetch): Http {
	return createHttp({ baseUrl: API_BASE, interceptors: [githubInterceptor], fetch: fetchImpl });
}

/** Git blob sha1 of `content` (what GitHub reports). */
export async function gitSha(content: string): Promise<string> {
	const body = new TextEncoder().encode(content);
	const header = new TextEncoder().encode(`blob ${body.length}\0`);
	const all = new Uint8Array(header.length + body.length);
	all.set(header);
	all.set(body, header.length);
	const digest = await crypto.subtle.digest('SHA-1', all);
	return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

type Opts = Pick<RequestOptions, 'signal' | 'timeout' | 'retry'>;

const encodePath = (path: string) => (path ? encodeURI(path) : '');

export class NotSignedInError extends Error {
	constructor() {
		super('Sign in with a GitHub token to do this');
		this.name = 'NotSignedInError';
	}
}

export class Repository {
	readonly fullName: string;

	constructor(
		readonly owner: string,
		readonly name: string,
		private readonly http: Http = createGithubHttp(),
		private readonly fetchImpl: typeof fetch = (...a) => fetch(...a),
	) {
		this.fullName = `${owner}/${name}`;
	}

	private requireSignedIn(): void {
		if (!credentials.peek()) throw new NotSignedInError();
	}

	private get committer() {
		const c = credentials.peek();
		if (!c) throw new NotSignedInError();
		return { name: c.name, email: c.email };
	}

	private contentsPath(path: string) {
		return `/repos/${this.fullName}/contents/${encodePath(path)}`;
	}

	// https://docs.github.com/en/rest/repos/contents#get-repository-content
	async getSha(path: string, branch = 'master', o: Opts = {}): Promise<{ sha: string }> {
		return this.http.get(this.contentsPath(path), { ...o, params: { ref: branch } });
	}

	/** File or directory listing; file content is decoded to text. */
	async getContents(path: string, ref = 'master', o: Opts = {}): Promise<Content | Content[]> {
		const result = await this.http.get<Content | Content[]>(this.contentsPath(path), { ...o, params: { ref } });
		const decode = (c: Content) => (c.content ? { ...c, content: base64ToText(c.content) } : c);
		return Array.isArray(result) ? result.map(decode) : decode(result);
	}

	/**
	 * Public raw endpoint, no auth and no rate limit of the API. The sha is computed locally.
	 * Note: raw.githubusercontent.com can lag a few minutes behind a commit.
	 */
	async getContentsRaw(path: string, ref = 'master', signal?: AbortSignal): Promise<Required<Pick<Content, 'content' | 'sha'>>> {
		const res = await this.fetchImpl(`https://raw.githubusercontent.com/${this.fullName}/${ref}/${encodePath(path)}`, { signal });
		if (!res.ok) throw new HttpError(res.status, res.statusText, res.url, undefined, res.headers);
		const content = await res.text();
		return { content, sha: await gitSha(content) };
	}

	async getReadme(o: Opts = {}): Promise<Content> {
		const c = await this.http.get<Content>(`/repos/${this.fullName}/readme`, o);
		return c.content ? { ...c, content: base64ToText(c.content) } : c;
	}

	// https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents
	updateFile(path: string, contents: string, sha: string, message: string, branch = 'master', o: Opts = {}): Promise<FileResult> {
		return this.put(path, { message, committer: this.committer, content: textToBase64(contents), sha, branch }, o);
	}

	newFile(path: string, contents: string, message: string, branch = 'master', o: Opts = {}): Promise<FileResult> {
		return this.put(path, { message, committer: this.committer, content: textToBase64(contents), branch }, o);
	}

	/** Upload with already base64 encoded content (images, other binary files). */
	newBinaryFile(path: string, base64: string, message = 'create file', o: Opts = {}): Promise<FileResult> {
		return this.put(path, { message, committer: this.committer, content: base64 }, o);
	}

	/** Create or update: looks up the current sha first, and creates when the file does not exist (404). */
	async file(path: string, contents: string, message: string, branch = 'master', o: Opts = {}): Promise<FileResult> {
		let sha: string;
		try {
			sha = (await this.getSha(path, branch, o)).sha;
		} catch (e) {
			if (e instanceof HttpError && e.status === 404) return this.newFile(path, contents, message, branch, o);
			throw e;
		}
		return this.updateFile(path, contents, sha, message, branch, o);
	}

	delFileViaSha(path: string, sha: string, branch = 'master', o: Opts = {}): Promise<FileResult> {
		this.requireSignedIn();
		return this.http.delete(this.contentsPath(path), {
			...o,
			params: { message: 'delete file', sha, branch },
		});
	}

	async delFile(path: string, branch = 'master', o: Opts = {}): Promise<FileResult> {
		const { sha } = await this.getSha(path, branch, o);
		return this.delFileViaSha(path, sha, branch, o);
	}

	private async put(path: string, body: unknown, o: Opts): Promise<FileResult> {
		try {
			// A PUT replaces the file with a new commit and carries a sha, so a retry after a lost response would
			// fail with 409. Writes are therefore not retried unless the caller opts in.
			const result = await this.http.put<FileResult>(this.contentsPath(path), body, { retry: false, ...o });
			log.debug('put ok', path);
			return result;
		} catch (e) {
			log.error('put failed', path, e);
			throw e;
		}
	}

	// https://docs.github.com/en/rest/search/search#search-issues-and-pull-requests
	searchIssue(query: string, o: Opts = {}): Promise<SearchResult<unknown>> {
		return this.http.get('/search/issues', {
			...o,
			headers: { Accept: Media.textMatch },
			params: { q: `${query} state:open repo:${this.fullName}` },
		});
	}

	// https://docs.github.com/en/rest/search/search#search-code
	searchCode(query: string, folder = 'documents', extension = 'md', o: Opts = {}): Promise<SearchResult<unknown>> {
		return this.http.get('/search/code', {
			...o,
			headers: { Accept: Media.textMatch },
			params: { q: `${query} in:file extension:${extension} path:${folder} repo:${this.fullName}` },
		});
	}

	// https://docs.github.com/en/rest/commits/commits#list-commits
	listCommits(options: ListCommitsOptions = {}, o: Opts = {}): Promise<Commit[]> {
		const { since, until, ...rest } = options;
		return this.http.get('/repos/' + this.fullName + '/commits', {
			...o,
			params: {
				...rest,
				since: since && new Date(since).toISOString(),
				until: until && new Date(until).toISOString(),
			},
		});
	}

	// --- git data API, used by `move` ---

	private getRef(ref: string, o: Opts) {
		return this.http.get<{ object: { sha: string } }>(`/repos/${this.fullName}/git/refs/${ref}`, o);
	}

	/**
	 * Renames a file in a single commit by rewriting the tree.
	 * (The old version read `response.data`, which only existed with a different HTTP client, so it never worked.)
	 */
	async move(oldPath: string, newPath: string, branch = 'master', o: Opts = {}): Promise<unknown> {
		this.requireSignedIn();
		const { object } = await this.getRef(`heads/${branch}`, o);
		const base = await this.http.get<{ sha: string; tree: { path: string; type: string; sha?: string }[] }>(
			`/repos/${this.fullName}/git/trees/${object.sha}`,
			{ ...o, params: { recursive: 1 } },
		);
		const tree = base.tree.map((ref) => {
			const next = { ...ref };
			if (next.path === oldPath) next.path = newPath;
			if (next.type === 'tree') delete next.sha; // let GitHub recompute directory shas
			return next;
		});
		const created = await this.http.post<{ sha: string }>(`/repos/${this.fullName}/git/trees`, { tree }, o);
		const commit = await this.http.post<{ sha: string }>(
			`/repos/${this.fullName}/git/commits`,
			{ message: `Renamed '${oldPath}' to '${newPath}'`, tree: created.sha, parents: [object.sha] },
			o,
		);
		return this.http.patch(`/repos/${this.fullName}/git/refs/heads/${branch}`, { sha: commit.sha, force: true }, o);
	}
}
