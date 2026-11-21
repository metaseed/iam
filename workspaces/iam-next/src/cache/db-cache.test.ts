import 'fake-indexeddb/auto';
import { IDBFactory } from 'fake-indexeddb';
import { beforeEach, describe, expect, it } from 'vitest';
import { Idb } from '../lib/idb.ts';
import { cacheSchema } from '../lib/schema.ts';
import { DbCache } from './db-cache.ts';
import type { Doc, DocContent, DocMeta, NextCache } from './model.ts';

const meta = (id: number, day = 1, extra: Partial<DocMeta> = {}): DocMeta => ({
	id, title: `t${id}`, createDate: new Date(2020, 0, 1), updateDate: new Date(2020, 0, day),
	summary: '', imageData: '', format: 'md', isDeleted: false, ...extra,
});
const content = (id: number, sha = 's1', extra: Partial<DocContent> = {}): DocContent => ({
	id, content: `c${id}`, sha, format: 'md', isDeleted: false, ...extra,
});
const collect = async <T>(g: AsyncGenerator<T>): Promise<T[]> => {
	const out: T[] = [];
	for await (const v of g) out.push(v);
	return out;
};

let db: Idb;
let remote: { bulk: DocMeta[]; meta?: DocMeta; content?: DocContent; updated: Doc[]; deleted: number[] };
let cache: DbCache;
beforeEach(() => {
	db = new Idb(cacheSchema, new IDBFactory());
	remote = { bulk: [], updated: [], deleted: [] };
	const next: NextCache = {
		create: async (c, format) => ({ meta: meta(42), content: { ...content(42), content: c, format } }),
		readBulkMeta: async () => remote.bulk,
		readMeta: async () => remote.meta!,
		readContent: async () => remote.content!,
		update: async (m, c) => { const d = { meta: { ...m, updateDate: new Date(2021, 0, 1) }, content: { ...c, sha: 'new' } }; remote.updated.push(d); return d; },
		delete: async (id) => void remote.deleted.push(id),
	};
	cache = new DbCache(db, next, 7);
});

describe('readBulkMeta', () => {
	it('yields cached (newest first), then new remote docs, and stores them', async () => {
		await db.putMany('doc_meta', [meta(1), meta(2)]);
		remote.bulk = [meta(2), meta(3)];
		const pages = await collect(cache.readBulkMeta(undefined, true));
		expect(pages.map((p) => p.map((m) => m.id))).toEqual([[2, 1], [3]]);
		expect(await db.getAllKeys('doc_meta')).toEqual([1, 2, 3]);
	});
	it('yields deletions before upserts and removes deleted docs', async () => {
		await db.putMany('doc_meta', [meta(1), meta(2, 1)]);
		remote.bulk = [meta(1, 1, { isDeleted: true }), meta(2, 5)];
		const pages = await collect(cache.readBulkMeta(Number.MAX_VALUE, false)); // refresh: no cached page
		expect(pages.map((p) => p.map((m) => m.id))).toEqual([[1], [2]]);
		expect((await db.getAll<DocMeta>('doc_meta')).map((m) => m.id)).toEqual([2]);
	});
	it('does not re-yield remote docs identical to cached ones that were on the page', async () => {
		await db.putMany('doc_meta', [meta(1), meta(2)]);
		remote.bulk = [meta(1), meta(2)];
		const pages = await collect(cache.readBulkMeta(undefined, true));
		expect(pages).toHaveLength(1);
	});
});

describe('readMeta / readContent', () => {
	it('readMeta yields remote only when it differs', async () => {
		await db.put('doc_meta', meta(1, 1));
		remote.meta = meta(1, 1);
		expect(await collect(cache.readMeta(1))).toHaveLength(1);
		remote.meta = meta(1, 3);
		const out = await collect(cache.readMeta(1));
		expect(out.map((m) => m.updateDate.getDate())).toEqual([1, 3]);
		expect((await db.get<DocMeta>('doc_meta', 1))!.updateDate.getDate()).toBe(3);
	});
	it('readContent with a changed sha drops the dirty flag and stores remote', async () => {
		await db.put('document', content(1, 'old'));
		await db.put('dirty_docs', { id: 1, changeLog: 'x', iamInstanceId: 7 });
		remote.content = content(1, 'new');
		const out = await collect(cache.readContent(1, 'md'));
		expect(out.map((c) => c.sha)).toEqual(['old', 'new']);
		expect(await cache.dirtyIds()).toEqual([]);
		expect((await db.get<DocContent>('document', 1))!.sha).toBe('new');
	});
	it('readContent with the same sha keeps dirty local edits', async () => {
		await db.put('document', content(1, 'same'));
		await db.put('dirty_docs', { id: 1, changeLog: 'x', iamInstanceId: 7 });
		remote.content = content(1, 'same');
		expect(await collect(cache.readContent(1, 'md'))).toHaveLength(1);
		expect(await cache.dirtyIds()).toEqual([1]);
	});
	it('readContent deletes docs deleted remotely', async () => {
		await db.put('document', content(1));
		remote.content = content(1, 's', { isDeleted: true });
		await collect(cache.readContent(1, 'md'));
		expect(await db.get('document', 1)).toBeUndefined();
	});
});

describe('update / syncToNext / delete', () => {
	it('saves locally and marks dirty with the instance id', async () => {
		await cache.update(meta(1), content(1), 'edit');
		expect(await db.get('dirty_docs', 1)).toEqual({ id: 1, changeLog: 'edit', iamInstanceId: 7 });
		expect(remote.updated).toHaveLength(0);
	});
	it('forceSave pushes to the next level, clears dirty and stores the result', async () => {
		const doc = await cache.update(meta(1), content(1), 'edit', true);
		expect(doc.content.sha).toBe('new');
		expect(await cache.dirtyIds()).toEqual([]);
		expect((await db.get<DocContent>('document', 1))!.sha).toBe('new');
	});
	it('syncToNext fails for an unknown doc', async () => {
		await expect(cache.syncToNext(99, '')).rejects.toThrow('not in the local db');
	});
	it('create stores the new doc in the db', async () => {
		const doc = await cache.create('# T', 'md');
		expect(doc.meta.id).toBe(42);
		expect((await db.get<DocContent>('document', 42))!.content).toBe('# T');
		expect(await db.get('doc_meta', 42)).toBeTruthy();
	});
	it('delete removes remote then local copies', async () => {
		await cache.add({ meta: meta(1), content: content(1) });
		await cache.delete(1);
		expect(remote.deleted).toEqual([1]);
		expect(await db.count('doc_meta')).toBe(0);
		expect(await db.count('document')).toBe(0);
	});
});
