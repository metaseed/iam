import 'fake-indexeddb/auto';
import { IDBFactory } from 'fake-indexeddb';
import { beforeEach, describe, expect, it } from 'vitest';
import { Idb, type DbSchema } from './idb.ts';

interface Doc { id: number; title: string }

const schema: DbSchema = {
	name: 'test_db',
	version: 1,
	stores: { document: { primaryKey: 'id', autoIncrement: true }, loose: {} },
};
let db: Idb;
beforeEach(() => {
	db = new Idb(schema, new IDBFactory()); // fresh database per test
});

describe('Idb', () => {
	it('puts, gets, counts and deletes', async () => {
		await db.put('document', { id: 1, title: 'a' });
		expect(await db.get<Doc>('document', 1)).toEqual({ id: 1, title: 'a' });
		expect(await db.count('document')).toBe(1);
		await db.delete('document', 1);
		expect(await db.get('document', 1)).toBeUndefined();
	});

	it('add rejects a duplicate key and leaves the store unchanged', async () => {
		await db.add('document', { id: 1, title: 'a' });
		await expect(db.add('document', { id: 1, title: 'b' })).rejects.toBeTruthy();
		expect((await db.get<Doc>('document', 1))!.title).toBe('a');
	});

	it('putMany is atomic', async () => {
		await expect(db.putMany('document', [{ id: 1, title: 'a' }, { id: 1, title: 'b' }], 'add')).rejects.toBeTruthy();
		expect(await db.count('document')).toBe(0);
	});

	it('supports out-of-line keys through $key', async () => {
		await db.put('loose', { $key: 'k1', v: 1 });
		expect(await db.get('loose', 'k1')).toEqual({ v: 1 });
		expect(await db.getAllKeys('loose')).toEqual(['k1']);
	});

	it('queries with range, direction, filter, skip and limit', async () => {
		await db.putMany('document', [1, 2, 3, 4, 5, 6].map((id) => ({ id, title: id % 2 ? 'odd' : 'even' })));
		const ids = (r: Doc[]) => r.map((d) => d.id);
		expect(ids(await db.query<Doc>('document', { range: IDBKeyRange.bound(2, 5) }))).toEqual([2, 3, 4, 5]);
		expect(ids(await db.query<Doc>('document', { direction: 'prev', limit: 2 }))).toEqual([6, 5]);
		expect(ids(await db.query<Doc>('document', { filter: (d) => d.title === 'even' }))).toEqual([2, 4, 6]);
		expect(ids(await db.getByPage<Doc>('document', 1, 2))).toEqual([3, 4]);
		expect(ids(await db.getByPage<Doc>('document', 1, 2, (d) => d.title === 'even'))).toEqual([6]);
		expect(await db.query('document', { limit: 0 })).toEqual([]);
	});

	it('modify decides per record', async () => {
		await db.putMany('document', [{ id: 1, title: 'old' }, { id: 2, title: 'keep' }, { id: 3, title: 'gone' }]);
		const written = await db.modify<Doc>(
			'document',
			[{ id: 1, title: 'new' }, { id: 2, title: 'ignored' }, { id: 3, title: '' }, { id: 4, title: 'fresh' }],
			(stored, next) => (next.id === 3 ? 'delete' : !stored ? 'add' : next.id === 1 ? 'put' : 'none'),
		);
		expect(written.map((d) => d.id).sort()).toEqual([1, 3, 4]);
		expect((await db.getAll<Doc>('document')).map((d) => `${d.id}:${d.title}`)).toEqual(['1:new', '2:keep', '4:fresh']);
	});

	it('clear and deleteMany', async () => {
		await db.putMany('document', [1, 2, 3].map((id) => ({ id, title: '' })));
		await db.deleteMany('document', [1, 2]);
		expect(await db.getAllKeys('document')).toEqual([3]);
		await db.clear('document');
		expect(await db.count('document')).toBe(0);
	});
});
