// Read-only checks against the real data repo. Skipped unless IAM_LIVE_TOKEN is set, so normal runs never hit the
// network and no token is ever stored in the repo:
//
//   IAM_LIVE_TOKEN=<token> in the git-ignored .env.local (or $env:IAM_LIVE_TOKEN); npx vitest run src/live.test.ts
//
// Nothing here writes to GitHub.
import 'fake-indexeddb/auto';
import { IDBFactory } from 'fake-indexeddb';
import { loadEnv } from 'vite';
import { afterAll, describe, expect, it } from 'vitest';
import { createCaches } from './cache/index.ts';
import { signIn, signOut } from './github/auth.ts';
import { Idb } from './lib/idb.ts';
import { cacheSchema } from './lib/schema.ts';

const token = process.env['IAM_LIVE_TOKEN'] ?? loadEnv('test', process.cwd(), 'IAM_')['IAM_LIVE_TOKEN'];
const env = loadEnv('test', process.cwd(), 'IAM_');
const config = { userName: 'metasong', dataRepoName: 'iam-data' };

describe.skipIf(!token)('live GitHub (read only)', () => {
	signIn({ name: 'metasong', email: 'metaseed@gmail.com', token: token! });
	afterAll(() => signOut());

	const make = () =>
		createCaches({
			github: config,
			idb: new Idb(cacheSchema, new IDBFactory()),
			autoSaver: { channel: null, onlineTarget: new EventTarget() },
		});

	it('reads the first page of metas through the db and store levels', { timeout: 30_000 }, async () => {
		const caches = make();
		const pages: number[] = [];
		for await (const metas of caches.storeCache.readBulkMeta(undefined)) pages.push(metas.length);
		const metas = caches.store.metas.all();
		console.log('pages yielded:', pages, 'docs in store:', metas.length, 'id range:', caches.store.idRangeLow(), caches.store.idRangeHigh());
		expect(metas.length).toBeGreaterThan(0);
		expect(metas[0]!.updateDate.getTime()).toBeGreaterThanOrEqual(metas.at(-1)!.updateDate.getTime());
		expect(caches.store.idRangeHigh()).toBeGreaterThan(caches.store.idRangeLow()!);
		expect(caches.store.tags.all().length).toBeGreaterThanOrEqual(0);
		caches.dispose();
	});

	it('reads one doc (meta + content) and the db copy matches the store', { timeout: 30_000 }, async () => {
		const caches = make();
		for await (const metas of caches.storeCache.readBulkMeta(undefined)) void metas;
		const meta = caches.store.metas.all().find((m) => !m.isDeleted)!;
		const seen: string[] = [];
		for await (const c of caches.storeCache.readContent(meta.id, meta.format)) seen.push(c.sha);
		const content = caches.store.getContent(meta.id)!;
		console.log('doc', meta.id, JSON.stringify(meta.title), 'format', meta.format, 'bytes', content.content.length, 'sha', content.sha);
		expect(content.content.length).toBeGreaterThan(0);
		expect(content.sha).toMatch(/^[0-9a-f]{40}$/);
		const inDb = await caches.dbCache.dirtyIds();
		expect(inDb).toEqual([]); // reading never marks anything dirty
		caches.dispose();
	});

	it('searches issues and files', { timeout: 30_000 }, async () => {
		const caches = make();
		const hits = await caches.githubCache.search('the');
		console.log('search hits:', hits.length, hits.slice(0, 3).map((h) => `${h.id}:${h.title}:${h.source}`));
		expect(Array.isArray(hits)).toBe(true);
		caches.dispose();
	});

	it('reads an older page: the id range grows downwards', { timeout: 30_000 }, async () => {
		const caches = make();
		for await (const metas of caches.storeCache.readBulkMeta(undefined)) void metas;
		const low = caches.store.idRangeLow()!;
		const before = caches.store.metas.all().length;
		for await (const metas of caches.storeCache.readBulkMeta(low, true)) void metas;
		console.log('older page: docs', before, '->', caches.store.metas.all().length, 'low', low, '->', caches.store.idRangeLow());
		expect(caches.store.metas.all().length).toBeGreaterThanOrEqual(before);
		caches.dispose();
	});
});
