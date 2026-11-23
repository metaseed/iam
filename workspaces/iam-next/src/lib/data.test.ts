import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { effect, state } from '@std-ui/core';
import { AbortedError, intervals, retry, sleep, TimeoutError, withTimeout } from './retry.ts';
import { buildUrl, createHttp, HttpError, isTransient } from './http.ts';
import { mutation, resource } from './resource.ts';
import { base64ToText, textToBase64 } from './base64.ts';
import { signIn, signOut } from '../github/auth.ts';
import { createGithubHttp, gitSha, NotSignedInError, Repository } from '../github/repository.ts';

const json = (body: unknown, status = 200) =>
	new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
const tick = () => new Promise((r) => setTimeout(r, 0));

describe('retry', () => {
	it('retries until success and reports each retry', async () => {
		const fn = vi.fn().mockRejectedValueOnce(new Error('a')).mockRejectedValueOnce(new Error('b')).mockResolvedValue('ok');
		const onRetry = vi.fn();
		await expect(retry(fn, { interval: 0, onRetry })).resolves.toBe('ok');
		expect(fn).toHaveBeenCalledTimes(3);
		expect(onRetry.mock.calls.map((c) => c[1])).toEqual([1, 2]);
	});
	it('rethrows the last error after maxRetries', async () => {
		const fn = vi.fn().mockRejectedValue(new Error('boom'));
		await expect(retry(fn, { maxRetries: 2, interval: 0 })).rejects.toThrow('boom');
		expect(fn).toHaveBeenCalledTimes(3);
	});
	it('stops when shouldRetry says no', async () => {
		const fn = vi.fn().mockRejectedValue(new Error('fatal'));
		await expect(retry(fn, { interval: 0, shouldRetry: () => false })).rejects.toThrow('fatal');
		expect(fn).toHaveBeenCalledTimes(1);
	});
	it('aborts during the wait', async () => {
		const ctrl = new AbortController();
		const fn = vi.fn().mockRejectedValue(new Error('x'));
		const p = retry(fn, { interval: 10_000, signal: ctrl.signal });
		await tick();
		ctrl.abort();
		await expect(p).rejects.toBeInstanceOf(AbortedError);
		expect(fn).toHaveBeenCalledTimes(1);
	});
	it('interval shapes', () => {
		expect(intervals.linear(10)(3)).toBe(30);
		expect(intervals.quadratic(10)(3)).toBe(90);
		expect(intervals.exponential(100, 500)(4)).toBe(500);
	});
	it('sleep rejects when already aborted', async () => {
		const ctrl = new AbortController();
		ctrl.abort();
		await expect(sleep(10, ctrl.signal)).rejects.toBeInstanceOf(AbortedError);
	});
});

describe('withTimeout', () => {
	it('aborts the signal and rejects with TimeoutError', async () => {
		let seen: AbortSignal | undefined;
		const p = withTimeout(20, (s) => {
			seen = s;
			return new Promise((_, reject) => s.addEventListener('abort', () => reject(new Error('aborted'))));
		});
		await expect(p).rejects.toBeInstanceOf(TimeoutError);
		expect(seen?.aborted).toBe(true);
	});
	it('passes the result through', async () => {
		await expect(withTimeout(1000, async () => 7)).resolves.toBe(7);
	});
});

describe('http', () => {
	it('builds urls with params', () => {
		expect(buildUrl('https://a', '/x', { q: 'a b', n: 1, skip: undefined })).toBe('https://a/x?q=a+b&n=1');
		expect(buildUrl('https://a', 'https://b/y?z=1', { q: 1 })).toBe('https://b/y?z=1&q=1');
	});
	it('sends JSON and parses the response', async () => {
		const f = vi.fn().mockResolvedValue(json({ ok: true }));
		const http = createHttp({ baseUrl: 'https://a', fetch: f });
		await expect(http.post('/p', { a: 1 })).resolves.toEqual({ ok: true });
		const [url, init] = f.mock.calls[0];
		expect(url).toBe('https://a/p');
		expect(init.body).toBe('{"a":1}');
		expect(init.headers.get('Content-Type')).toContain('application/json');
	});
	it('throws HttpError with the parsed body', async () => {
		const http = createHttp({ fetch: vi.fn().mockResolvedValue(json({ message: 'nope' }, 404)) });
		const e = (await http.get('/x').catch((x: unknown) => x)) as HttpError;
		expect(e).toBeInstanceOf(HttpError);
		expect(e.status).toBe(404);
		expect(e.body).toEqual({ message: 'nope' });
	});
	it('retries GET on 503 but not on 404, and does not retry POST', async () => {
		const f = vi.fn().mockResolvedValueOnce(json({}, 503)).mockResolvedValue(json({ a: 1 }));
		const http = createHttp({ fetch: f, defaults: { retry: { interval: 0 } } });
		await expect(http.get('/x')).resolves.toEqual({ a: 1 });
		expect(f).toHaveBeenCalledTimes(2);

		const f404 = vi.fn().mockResolvedValue(json({}, 404));
		await expect(createHttp({ fetch: f404, defaults: { retry: { interval: 0 } } }).get('/x')).rejects.toBeInstanceOf(HttpError);
		expect(f404).toHaveBeenCalledTimes(1);

		const fPost = vi.fn().mockResolvedValue(json({}, 503));
		await expect(createHttp({ fetch: fPost }).post('/x', {})).rejects.toBeInstanceOf(HttpError);
		expect(fPost).toHaveBeenCalledTimes(1);
	});
	it('retries a network failure', async () => {
		const f = vi.fn().mockRejectedValueOnce(new TypeError('Failed to fetch')).mockResolvedValue(json(1));
		const http = createHttp({ fetch: f, defaults: { retry: { interval: 0 } } });
		await expect(http.get('/x')).resolves.toBe(1);
		expect(isTransient(new TypeError('x'))).toBe(true);
	});
	it('applies interceptors', async () => {
		const f = vi.fn().mockResolvedValue(json({}));
		const http = createHttp({ fetch: f, interceptors: [(r) => void r.headers.set('X-A', '1')] });
		await http.get('https://h/x');
		expect(f.mock.calls[0][1].headers.get('X-A')).toBe('1');
	});
	it('times out a hanging request', async () => {
		const f = vi.fn((_u: string, init: RequestInit) => new Promise<Response>((_, rej) => init.signal!.addEventListener('abort', () => rej(new Error('x')))));
		const http = createHttp({ fetch: f as unknown as typeof fetch });
		await expect(http.get('/x', { timeout: 20, retry: false })).rejects.toBeInstanceOf(TimeoutError);
	});
});

describe('resource', () => {
	it('loads, reloads, retries and keeps the previous value', async () => {
		const key = state<number | undefined>(1);
		let calls = 0;
		const r = resource(
			() => key(),
			async (k) => {
				calls++;
				if (k === 2 && calls < 4) throw new Error('flaky');
				return k * 10;
			},
			{ retry: { interval: 0, maxRetries: 3 } },
		);
		await tick();
		expect(r.value()).toBe(10);
		key.set(2);
		expect(r.value()).toBe(10); // previous value kept while loading
		await vi.waitFor(() => expect(r.value()).toBe(20));
		expect(r.error()).toBeUndefined();
		const before = calls;
		r.reload();
		await tick();
		expect(calls).toBe(before + 1);
		r.dispose();
	});
	it('surfaces the error and aborts a superseded request', async () => {
		const key = state(1);
		const aborted: number[] = [];
		const r = resource(
			() => key(),
			(k, s) =>
				new Promise<number>((resolve, reject) => {
					s.addEventListener('abort', () => aborted.push(k));
					if (k === 2) setTimeout(() => reject(new Error('bad')), 0);
					else setTimeout(() => resolve(k), 50);
				}),
		);
		key.set(2);
		await new Promise((r) => setTimeout(r, 10));
		expect(aborted).toEqual([1]);
		expect((r.error() as Error).message).toBe('bad');
		expect(r.loading()).toBe(false);
		r.dispose();
	});
});

describe('mutation', () => {
	it('tracks loading and value, and records errors without retrying', async () => {
		let n = 0;
		const m = mutation(async (x: number) => {
			n++;
			if (x < 0) throw new Error('neg');
			return x * 2;
		});
		await expect(m.run(2)).resolves.toBe(4);
		expect(m.value()).toBe(4);
		await expect(m.run(-1)).rejects.toThrow('neg');
		expect((m.error() as Error).message).toBe('neg');
		expect(m.loading()).toBe(false);
		expect(n).toBe(2);
	});
	it('a newer run aborts the older one', async () => {
		const m = mutation((x: number, s) => new Promise<number>((res, rej) => {
			s.addEventListener('abort', () => rej(new AbortedError()));
			setTimeout(() => res(x), 20);
		}));
		const first = m.run(1);
		const second = m.run(2);
		await expect(first).rejects.toBeInstanceOf(AbortedError);
		await expect(second).resolves.toBe(2);
		expect(m.value()).toBe(2);
		expect(m.error()).toBeUndefined();
	});
});

describe('base64 and sha', () => {
	it('round-trips non-ascii text and ignores GitHub newlines', () => {
		const text = 'héllo 世界 😀';
		expect(base64ToText(textToBase64(text))).toBe(text);
		const b = textToBase64(text);
		expect(base64ToText(b.slice(0, 4) + '\n' + b.slice(4))).toBe(text);
	});
	it('computes the git blob sha (known value)', async () => {
		expect(await gitSha('hello\n')).toBe('ce013625030ba8dba906f756967f9e9ca394464a');
	});
});

describe('Repository', () => {
	const calls: { url: string; init: RequestInit }[] = [];
	let respond: (url: string, init: RequestInit) => Response;
	const fetchMock = (async (url: string, init: RequestInit) => {
		calls.push({ url: String(url), init });
		return respond(String(url), init);
	}) as unknown as typeof fetch;
	const repo = () => new Repository('metasong', 'iam-data', createGithubHttp(fetchMock), fetchMock);
	const header = (i: number, name: string) => (calls[i].init.headers as Headers).get(name);

	beforeEach(() => {
		calls.length = 0;
		localStorage.clear();
		signOut();
	});
	afterEach(() => signOut());

	it('decodes contents and sends the token and a cache buster', async () => {
		signIn({ name: 'metasong', email: 'm@x', token: 'T' });
		respond = () => json({ sha: 's1', content: textToBase64('# Hi\n') });
		const c = (await repo().getContents('documents/1.md')) as { content: string };
		expect(c.content).toBe('# Hi\n');
		expect(calls[0].url).toContain('/repos/metasong/iam-data/contents/documents/1.md?ref=master');
		expect(calls[0].url).toContain('timestamp=');
		expect(header(0, 'Authorization')).toBe('token T');
	});
	it('reads raw content signed out and computes the sha', async () => {
		respond = () => new Response('hello\n');
		const r = await repo().getContentsRaw('documents/1.md');
		expect(calls[0].url).toBe('https://raw.githubusercontent.com/metasong/iam-data/master/documents/1.md');
		expect(r).toEqual({ content: 'hello\n', sha: 'ce013625030ba8dba906f756967f9e9ca394464a' });
	});
	it('file() updates an existing file using its sha', async () => {
		signIn({ name: 'metasong', email: 'm@x', token: 'T' });
		respond = (_u, init) => (init.method === 'GET' ? json({ sha: 'old' }) : json({ commit: { sha: 'c' }, content: { sha: 'n' } }));
		await repo().file('documents/1.md', 'new', 'edit');
		const put = calls[1];
		expect(put.init.method).toBe('PUT');
		const body = JSON.parse(put.init.body as string);
		expect(body).toMatchObject({ message: 'edit', sha: 'old', branch: 'master', committer: { name: 'metasong' } });
		expect(base64ToText(body.content)).toBe('new');
	});
	it('file() creates when the file is missing, but surfaces other errors', async () => {
		signIn({ name: 'metasong', email: 'm@x', token: 'T' });
		respond = (_u, init) => (init.method === 'GET' ? json({ message: 'Not Found' }, 404) : json({ commit: { sha: 'c' } }));
		await repo().file('documents/2.md', 'x', 'add');
		expect(JSON.parse(calls[1].init.body as string).sha).toBeUndefined();

		calls.length = 0;
		respond = () => json({ message: 'forbidden' }, 403);
		await expect(repo().file('documents/2.md', 'x', 'add')).rejects.toBeInstanceOf(HttpError);
		expect(calls).toHaveLength(1); // no write attempted
	});
	it('does not retry a failed write', async () => {
		signIn({ name: 'metasong', email: 'm@x', token: 'T' });
		respond = () => json({}, 503);
		await expect(repo().newFile('documents/3.md', 'x', 'add')).rejects.toBeInstanceOf(HttpError);
		expect(calls).toHaveLength(1);
	});
	it('refuses writes when signed out', () => {
		expect(() => repo().newFile('a', 'b', 'c')).toThrow(NotSignedInError);
		expect(() => repo().delFileViaSha('a', 's')).toThrow(NotSignedInError);
	});
	it('delete sends message, sha and branch as the query', async () => {
		signIn({ name: 'metasong', email: 'm@x', token: 'T' });
		respond = () => json({ commit: {} });
		await repo().delFileViaSha('documents/1 a.md', 'abc');
		expect(calls[0].init.method).toBe('DELETE');
		expect(calls[0].url).toContain('contents/documents/1%20a.md?');
		expect(calls[0].url).toContain('sha=abc');
	});
	it('search builds the query and asks for text matches', async () => {
		respond = () => json({ total_count: 0, items: [] });
		await repo().searchCode('foo bar');
		const q = new URL(calls[0].url).searchParams.get('q');
		expect(q).toBe('foo bar in:file extension:md path:documents repo:metasong/iam-data');
		expect(header(0, 'Accept')).toContain('text-match');
	});
	it('lists commits with ISO dates', async () => {
		respond = () => json([]);
		await repo().listCommits({ path: 'documents/1.md', since: '2024-01-02T03:04:05Z' });
		const u = new URL(calls[0].url);
		expect(u.searchParams.get('path')).toBe('documents/1.md');
		expect(u.searchParams.get('since')).toBe('2024-01-02T03:04:05.000Z');
		expect(u.searchParams.has('until')).toBe(false);
	});
	it('move rewrites the tree and updates the ref', async () => {
		signIn({ name: 'metasong', email: 'm@x', token: 'T' });
		respond = (url, init) => {
			if (url.includes('/git/refs/heads/master') && init.method === 'GET') return json({ object: { sha: 'head' } });
			if (url.includes('/git/trees/head')) return json({ sha: 't0', tree: [{ path: 'a.md', type: 'blob', sha: 'b1' }, { path: 'd', type: 'tree', sha: 'x' }] });
			if (url.endsWith('/git/trees')) return json({ sha: 't1' });
			if (url.endsWith('/git/commits')) return json({ sha: 'c1' });
			return json({ ref: 'ok' });
		};
		await repo().move('a.md', 'b.md');
		const created = JSON.parse(calls.find((c) => c.url.endsWith('/git/trees'))!.init.body as string);
		expect(created.tree).toEqual([{ path: 'b.md', type: 'blob', sha: 'b1' }, { path: 'd', type: 'tree' }]);
		const patch = calls.at(-1)!;
		expect(patch.init.method).toBe('PATCH');
		expect(JSON.parse(patch.init.body as string)).toEqual({ sha: 'c1', force: true });
	});
});
