import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { effect } from '@std-ui/core';
import type { Doc, DocContent, DocMeta } from '../cache/model.ts';
import { NEW_DOC_ID } from './const.ts';
import { DocStore } from './doc-store.ts';
import { EntityMap } from './entities.ts';
import { StoreCache, withTags, type StoreNext } from './store-cache.ts';

const meta = (id: number, day = 1, extra: Partial<DocMeta> = {}): DocMeta => ({
	id, title: `t${id}`, createDate: new Date(2020, 0, 1), updateDate: new Date(2020, 0, day),
	summary: '', imageData: '', format: 'md', isDeleted: false, ...extra,
});
const content = (id: number, sha = 's1', text = `c${id}`): DocContent => ({ id, content: text, sha, format: 'md', isDeleted: false });
async function* gen<T>(...items: T[]): AsyncGenerator<T> { for (const i of items) yield i; }
const drain = async <T>(g: AsyncGenerator<T>): Promise<T[]> => { const o: T[] = []; for await (const v of g) o.push(v); return o; };

describe('EntityMap', () => {
	it('upserts, updates, deletes and sorts; changes are reactive', async () => {
		const m = new EntityMap<number, { id: number; v: number }>((i) => i.id, (a, b) => b.v - a.v);
		const seen: number[][] = [];
		const stop = effect(() => void seen.push(m.all().map((i) => i.id)));
		const tick = () => new Promise((r) => setTimeout(r, 0)); // effects run asynchronously
		await tick();
		m.upsertMany([{ id: 1, v: 1 }, { id: 2, v: 2 }]);
		await tick();
		m.update(1, { v: 5 });
		await tick();
		m.update(99, { v: 1 }); // unknown id: ignored
		await tick();
		m.delete(2);
		await tick();
		m.delete(2); // no change, no notification
		await tick();
		stop();
		expect(seen).toEqual([[], [2, 1], [1, 2], [1]]);
	});
});

describe('DocStore', () => {
	it('derives the current doc and status', () => {
		const s = new DocStore();
		s.metas.upsert(meta(1));
		s.contents.upsert(content(1));
		expect(s.currentMeta()).toBeUndefined();
		s.currentId.set(1);
		expect(s.currentMeta()!.id).toBe(1);
		expect(s.currentContentText()).toBe('c1');
		expect(s.isStoreDirty()).toBe(false);
		s.upsertStatus({ isStoreDirty: true });
		expect(s.isStoreDirty()).toBe(true);
		expect(s.isEditable()).toBe(true); // a new status starts editable
		s.delete(1);
		expect(s.currentMeta()).toBeUndefined();
		expect(s.statuses.has(1)).toBe(false);
	});
	it('sorts metas by update date, newest first', () => {
		const s = new DocStore();
		s.metas.upsertMany([meta(1, 3), meta(2, 9), meta(3, 5)]);
		expect(s.metas.all().map((m) => m.id)).toEqual([2, 3, 1]);
	});
});

describe('withTags', () => {
	const doc = '# T\n---\nauthor: a\ntag: [a, b]\nversion: 1\n---\nbody';
	it('rewrites the tag line from labels', () => {
		expect(withTags(doc, ['x', ' y '])).toContain('tag: [x,y]');
	});
	it('leaves content alone when equal, empty or without a tag line', () => {
		expect(withTags(doc, ['a', ' b'])).toContain('tag: [a,b]'); // trimmed and joined without spaces
		const same = doc.replace('[a, b]', '[a,b]');
		expect(withTags(same, ['a', 'b'])).toBe(same);
		expect(withTags(doc, [])).toBe(doc);
		expect(withTags('plain', ['x'])).toBe('plain');
	});
});

describe('StoreCache', () => {
	let store: DocStore;
	let next: { [K in keyof StoreNext]: ReturnType<typeof vi.fn> };
	let cache: StoreCache;
	beforeEach(() => {
		store = new DocStore();
		next = {
			readBulkMeta: vi.fn(() => gen<DocMeta[]>()),
			readMeta: vi.fn(() => gen<DocMeta>()),
			readContent: vi.fn(() => gen<DocContent>()),
			create: vi.fn(),
			update: vi.fn(),
			delete: vi.fn(async () => undefined),
			dirtyIds: vi.fn(async () => [] as number[]),
		};
		cache = new StoreCache(store, next as unknown as StoreNext);
	});
	afterEach(() => cache.dispose());

	it('createDraft adds a draft; create replaces it with the real doc', async () => {
		cache.createDraft();
		expect(store.currentId()).toBe(NEW_DOC_ID);
		expect(store.contents.has(NEW_DOC_ID)).toBe(true);
		next.create.mockResolvedValue({ meta: meta(5), content: content(5) } satisfies Doc);
		await cache.create('# T', 'md');
		expect(store.currentId()).toBe(5);
		expect(store.contents.has(NEW_DOC_ID)).toBe(false);
		expect(store.getMeta(5)).toBeTruthy();
		expect(store.statuses.peek(5)?.isEditable).toBe(true);
	});

	it('readBulkMeta merges changed metas and removes deleted ones', async () => {
		store.metas.upsert(meta(1, 1));
		store.contents.upsert(content(2));
		store.metas.upsert(meta(2, 1));
		next.readBulkMeta.mockReturnValue(gen([meta(1, 1), meta(3, 2)], [meta(2, 1, { isDeleted: true })]));
		await drain(cache.readBulkMeta(undefined));
		expect(store.metas.all().map((m) => m.id).sort()).toEqual([1, 3]);
		expect(store.contents.has(2)).toBe(false);
	});

	it('readMeta only takes newer metas', async () => {
		store.metas.upsert(meta(1, 5));
		next.readMeta.mockReturnValue(gen(meta(1, 2, { title: 'old' })));
		await drain(cache.readMeta(1));
		expect(store.getMeta(1)!.title).toBe('t1');
		next.readMeta.mockReturnValue(gen(meta(1, 9, { title: 'new' })));
		await drain(cache.readMeta(1));
		expect(store.getMeta(1)!.title).toBe('new');
	});

	it('readContent stores new content, skips equal sha, applies label tags, drops deleted docs', async () => {
		const text = '# T\n---\ntag: [old]\nversion: 1\n---\n';
		next.readContent.mockReturnValue(gen(content(1, 'a', text)));
		next.readMeta.mockReturnValue(gen(meta(1, 1, { tag: ['new'] })));
		const out = await drain(cache.readContent(1, 'md'));
		expect(out).toHaveLength(1);
		expect(store.getContent(1)!.content).toContain('tag: [new]');
		expect(store.getContent(1)!.sha).toBe('a');

		next.readContent.mockReturnValue(gen(content(1, 'a', 'same sha')));
		expect(await drain(cache.readContent(1, 'md'))).toHaveLength(0);
		expect(store.getContent(1)!.content).toContain('tag: [new]');

		next.readContent.mockReturnValue(gen({ ...content(1, ''), isDeleted: true }));
		await drain(cache.readContent(1, 'md'));
		expect(store.contents.has(1)).toBe(false);
	});

	it('update without forceSave marks the doc dirty; with forceSave it writes through and clears flags', async () => {
		await cache.update(meta(1), content(1, 's1', 'edit'), 'note');
		expect(store.dirty.peek(1)).toEqual({ id: 1, changeLog: 'note' });
		expect(store.statuses.peek(1)!.isStoreDirty).toBe(true);
		expect(next.update).not.toHaveBeenCalled();

		next.update.mockResolvedValue({ meta: meta(1, 4), content: content(1, 'remote', 'sent') });
		await cache.update(meta(1), content(1, 's1', 'typed after'), 'n2', true);
		expect(store.getContent(1)).toMatchObject({ content: 'typed after', sha: 'remote' });
		expect(store.statuses.peek(1)).toMatchObject({ isStoreDirty: false, isDbDirty: false, isSyncing: false });
	});

	it('a failed forceSave clears isSyncing and rethrows', async () => {
		next.update.mockRejectedValue(new Error('net'));
		await expect(cache.update(meta(1), content(1), 'n', true)).rejects.toThrow('net');
		expect(store.statuses.peek(1)!.isSyncing).toBe(false);
		expect(store.statuses.peek(1)!.isStoreDirty).toBe(true);
	});

	it('saveDirtyNow saves dirty docs, keeps failures dirty, and drops docs that are gone', async () => {
		store.metas.upsertMany([meta(1), meta(2)]);
		store.contents.upsertMany([content(1), content(2)]);
		store.dirty.upsertMany([{ id: 1, changeLog: 'a' }, { id: 2, changeLog: 'b' }, { id: 3, changeLog: 'ghost' }]);
		next.update.mockImplementation(async (m: DocMeta) => {
			if (m.id === 2) throw new Error('boom');
			return { meta: m, content: content(m.id) };
		});
		vi.spyOn(console, 'error').mockImplementation(() => undefined);
		vi.useFakeTimers();
		const done = cache.saveDirtyNow();
		await vi.runAllTimersAsync();
		await done;
		vi.useRealTimers();
		expect(store.dirty.all().map((d) => d.id)).toEqual([2]);
		expect(store.statuses.peek(1)).toMatchObject({ isStoreDirty: false, isDbDirty: true });
		expect(next.update).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }), expect.anything(), 'a', false);
	});

	it('startAutoSave runs rounds on a timer and stops', async () => {
		vi.useFakeTimers();
		store.metas.upsert(meta(1));
		store.contents.upsert(content(1));
		store.dirty.upsert({ id: 1, changeLog: 'x' });
		next.update.mockResolvedValue({ meta: meta(1), content: content(1) });
		const stop = cache.startAutoSave(1000);
		await vi.advanceTimersByTimeAsync(1000);
		expect(next.update).toHaveBeenCalledTimes(1);
		expect(store.dirty.all()).toEqual([]);
		stop();
		store.dirty.upsert({ id: 1, changeLog: 'y' });
		await vi.advanceTimersByTimeAsync(5000);
		expect(next.update).toHaveBeenCalledTimes(1);
		vi.useRealTimers();
	});

	it('delete of the draft does not call the next level', async () => {
		cache.createDraft();
		await cache.delete(NEW_DOC_ID);
		expect(next.delete).not.toHaveBeenCalled();
		expect(store.contents.has(NEW_DOC_ID)).toBe(false);
		await cache.delete(7);
		expect(next.delete).toHaveBeenCalledWith(7);
	});
});
