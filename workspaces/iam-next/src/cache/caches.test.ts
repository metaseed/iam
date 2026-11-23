import 'fake-indexeddb/auto';
import { IDBFactory } from 'fake-indexeddb';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { HttpError } from '../lib/http.ts';
import { Idb } from '../lib/idb.ts';
import { cacheSchema } from '../lib/schema.ts';
import { lazyRepository, openRepository } from '../github/storage.ts';
import type { Repository } from '../github/repository.ts';
import type { Issue } from '../github/issues.ts';
import { signIn, signOut } from '../github/auth.ts';
import { DocStore } from '../store/doc-store.ts';
import { createCaches } from './index.ts';
import { DbAutoSaver, type SavedMessage } from './db-auto-saver.ts';
import { DbCache } from './db-cache.ts';
import type { DocContent, DocMeta, NextCache } from './model.ts';

const issue = (n: number): Issue => ({
	id: n, number: n, state: 'open', title: `t${n}`, body: null, labels: [{ name: 'js', color: 'fff' }],
	closed_at: null, created_at: '2020-01-01T00:00:00Z', updated_at: '2020-01-02T00:00:00Z',
});

/** A tiny in-memory GitHub: one issue and file per doc. */
function fakeGithub() {
	const files = new Map<string, { content: string; sha: string }>();
	let n = 0;
	const repo = {
		issue: {
			list: vi.fn(async () => [issue(1)]),
			get: vi.fn(async (id: number) => issue(id)),
			create: vi.fn(async () => issue(1)),
			edit: vi.fn(async (id: number) => issue(id)),
		},
		getContents: vi.fn(async (path: string) => {
			const f = files.get(path);
			if (!f) throw new HttpError(404, 'nf', 'u', undefined, new Headers());
			return f;
		}),
		newFile: vi.fn(async (path: string, content: string) => { const sha = `sha${++n}`; files.set(path, { content, sha }); return { content: { sha }, commit: { committer: { date: '2022-01-01T00:00:00Z' } } }; }),
		updateFile: vi.fn(async (path: string, content: string) => { const sha = `sha${++n}`; files.set(path, { content, sha }); return { content: { sha }, commit: { committer: { date: '2022-01-01T00:00:00Z' } } }; }),
		delFile: vi.fn(async () => { throw new HttpError(404, 'nf', 'u', undefined, new Headers()); }),
		getSha: vi.fn(), searchIssue: vi.fn(), searchCode: vi.fn(),
	};
	return { repo, files };
}

const noChannel = { channel: null, onlineTarget: new EventTarget() };
let disposers: Array<() => void> = [];
afterEach(() => { disposers.forEach((d) => d()); disposers = []; vi.useRealTimers(); });

describe('createCaches (all levels, fake GitHub)', () => {
	it('create -> edit -> auto save to db -> push to GitHub, flags and shas follow', async () => {
		const { repo, files } = fakeGithub();
		const caches = createCaches({
			github: { userName: 'u', dataRepoName: 'r' },
			repository: repo as unknown as Repository,
			idb: new Idb(cacheSchema, new IDBFactory()),
			autoSaver: noChannel,
		});
		disposers.push(() => caches.dispose());
		const { store, storeCache, dbCache, dbSaver } = caches;

		const doc = await storeCache.create('# First\n', 'md');
		expect(doc.meta.id).toBe(1);
		expect(store.currentId()).toBe(1);
		expect(files.get('documents/1.md')!.content).toBe('# First\n');
		expect((await dbCache.dirtyIds())).toEqual([]);

		// edit: store -> db
		const edited = { ...store.getContent(1)!, content: '# First\nedited' };
		await storeCache.update(store.getMeta(1)!, edited, 'edit');
		expect(store.statuses.peek(1)!.isStoreDirty).toBe(true);
		vi.spyOn(console, 'info').mockImplementation(() => undefined);
		await storeCache.saveDirtyNow();
		expect(store.dirty.all()).toEqual([]);
		expect(store.statuses.peek(1)).toMatchObject({ isStoreDirty: false, isDbDirty: true });
		expect(await dbCache.dirtyIds()).toEqual([1]);

		// db -> GitHub
		await dbSaver.saveNow();
		expect(files.get('documents/1.md')!.content).toBe('# First\nedited');
		expect(await dbCache.dirtyIds()).toEqual([]);
		expect(store.statuses.peek(1)).toMatchObject({ isDbDirty: false, isSyncing: false });
		expect(store.getContent(1)!.sha).toBe(files.get('documents/1.md')!.sha);
		expect(store.getContent(1)!.content).toBe('# First\nedited'); // this tab saved it: its text is kept
	});

	it('reads through all levels: db copy first, then GitHub, store ends up with the newest', async () => {
		const { repo, files } = fakeGithub();
		files.set('documents/1.md', { content: '# Remote', sha: 'r1' });
		const caches = createCaches({
			github: { userName: 'u', dataRepoName: 'r' },
			repository: repo as unknown as Repository,
			idb: new Idb(cacheSchema, new IDBFactory()),
			autoSaver: noChannel,
		});
		disposers.push(() => caches.dispose());
		const seen: string[] = [];
		for await (const c of caches.storeCache.readContent(1, 'md')) seen.push(c.content);
		expect(seen).toEqual(['# Remote']);
		expect(caches.store.getContent(1)!.sha).toBe('r1');
		expect(caches.store.getMeta(1)).toBeTruthy(); // meta synced with the content
		expect(caches.store.tags.has('js')).toBe(true); // issue labels feed the tag store
	});
});

describe('DbAutoSaver', () => {
	const meta = (id: number): DocMeta => ({ id, title: 't', createDate: new Date(), updateDate: new Date(), summary: '', imageData: '', format: 'md', isDeleted: false });
	const content = (id: number, sha = 's'): DocContent => ({ id, content: `c${id}`, sha, format: 'md', isDeleted: false });
	function setup(failTimes = 0) {
		const idb = new Idb(cacheSchema, new IDBFactory());
		let failures = failTimes;
		const next = {
			update: vi.fn(async (m: DocMeta, c: DocContent) => {
				if (failures-- > 0) throw new Error('offline');
				return { meta: m, content: { ...c, sha: 'remote' } };
			}),
		} as unknown as NextCache;
		const db = new DbCache(idb, next, 5);
		const store = new DocStore();
		return { idb, db, store, next };
	}

	it('retries, then saves, notifies other tabs and updates the store', async () => {
		const { db, store, next } = setup(1);
		const channel = { postMessage: vi.fn(), close: vi.fn(), onmessage: null as ((e: MessageEvent) => void) | null };
		await db.update(meta(1), content(1), 'note');
		const saver = new DbAutoSaver(db, store, { channel, onlineTarget: new EventTarget(), retryIntervalMs: 1 });
		vi.spyOn(console, 'error').mockImplementation(() => undefined);
		await saver.saveNow();
		expect(next.update).toHaveBeenCalledTimes(2);
		expect(await db.dirtyIds()).toEqual([]);
		expect(channel.postMessage).toHaveBeenCalledWith(expect.objectContaining({ iamInstanceId: 5 }));
		expect(store.getContent(1)!.sha).toBe('remote');
	});

	it('a doc that keeps failing stays dirty and the round continues', async () => {
		const { db, store, next } = setup(99);
		await db.update(meta(1), content(1), 'a');
		await db.update(meta(2), content(2), 'b');
		const saver = new DbAutoSaver(db, store, { channel: null, onlineTarget: new EventTarget(), retries: 0 });
		vi.spyOn(console, 'error').mockImplementation(() => undefined);
		await saver.saveNow();
		expect(next.update).toHaveBeenCalledTimes(2);
		expect((await db.dirtyIds()).sort()).toEqual([1, 2]);
		expect(store.statuses.peek(1)!.isSyncing).toBe(false);
	});

	it('applies messages from other tabs: takes their content unless this tab saved last', async () => {
		const { db, store } = setup();
		const channel = { postMessage: vi.fn(), close: vi.fn(), onmessage: null as ((e: MessageEvent) => void) | null };
		const saver = new DbAutoSaver(db, store, { channel, onlineTarget: new EventTarget() });
		disposers.push(saver.start());
		store.contents.upsert({ ...content(1), content: 'my editor text' });
		const msg = (iamInstanceId: number): MessageEvent => ({ data: { doc: { meta: meta(1), content: content(1, 'new') }, iamInstanceId } satisfies SavedMessage }) as MessageEvent;
		vi.spyOn(console, 'info').mockImplementation(() => undefined);
		channel.onmessage!(msg(store.instanceId));
		expect(store.getContent(1)).toMatchObject({ content: 'my editor text', sha: 'new' });
		channel.onmessage!(msg(0.12345));
		expect(store.getContent(1)!.content).toBe('c1');
	});

	it('runs on the timer and after going online, and stops', async () => {
		vi.useFakeTimers();
		const { db, store } = setup();
		const online = new EventTarget();
		const saver = new DbAutoSaver(db, store, { channel: null, onlineTarget: online, intervalMs: 1000, jitterMs: 0, onlineDelayMs: 50 });
		const spy = vi.spyOn(saver, 'saveNow');
		const stop = saver.start();
		await vi.advanceTimersByTimeAsync(1000);
		expect(spy).toHaveBeenCalledTimes(1);
		online.dispatchEvent(new Event('online'));
		online.dispatchEvent(new Event('online')); // debounced
		await vi.advanceTimersByTimeAsync(60);
		expect(spy).toHaveBeenCalledTimes(2);
		stop();
		await vi.advanceTimersByTimeAsync(5000);
		expect(spy).toHaveBeenCalledTimes(2);
	});
});

describe('openRepository', () => {
	const http = (get: () => Promise<unknown>, post = vi.fn(async () => ({}))) => ({ get: vi.fn(get), post }) as never;
	const notFound = () => Promise.reject(new HttpError(404, 'nf', 'u', undefined, new Headers()));

	it('returns the repository when it exists', async () => {
		const post = vi.fn();
		const repo = await openRepository({ userName: 'u', dataRepoName: 'r' }, http(async () => ({}), post as never));
		expect(repo.fullName).toBe('u/r');
		expect(post).not.toHaveBeenCalled();
	});
	it('creates it on 404 when signed in, and refuses when signed out', async () => {
		const post = vi.fn(async () => ({}));
		signIn({ name: 'n', email: 'e', token: 't' });
		await openRepository({ userName: 'u', dataRepoName: 'r' }, http(notFound, post));
		expect(post).toHaveBeenCalledWith('/user/repos', expect.objectContaining({ name: 'r' }), { retry: false });
		signOut();
		await expect(openRepository({ userName: 'u', dataRepoName: 'r' }, http(notFound))).rejects.toThrow('Sign in');
	});
	it('lazyRepository shares one lookup and retries after a failure', async () => {
		let calls = 0;
		const h = http(async () => { if (calls++ === 0) throw new Error('offline'); return {}; });
		const open = lazyRepository({ userName: 'u', dataRepoName: 'r' }, h);
		await expect(open()).rejects.toThrow('offline');
		const [a, b] = await Promise.all([open(), open()]);
		expect(a).toBe(b);
		expect(calls).toBe(2);
	});
});
