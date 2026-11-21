import type { DbSchema } from './idb.ts';

/** Same stores as the Angular app's `iam_db_cache`. */
export const cacheSchema: DbSchema = {
	name: 'iam_db_cache',
	version: 1,
	stores: {
		document: { autoIncrement: true, primaryKey: 'id' },
		doc_meta: { autoIncrement: true, primaryKey: 'id' },
		dirty_docs: { autoIncrement: true, primaryKey: 'id' },
	},
};
