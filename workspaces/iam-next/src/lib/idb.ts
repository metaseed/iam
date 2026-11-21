// Promise based IndexedDB wrapper. Replaces `database-engine` (Observable based). Same schema shape, so the
// existing stores (`document`, `doc_meta`, `dirty_docs`) carry over; an upgrade recreates the stores, as before
// (the data is a cache and is rebuilt from GitHub).

export interface StoreDef {
	/** Key path of in-line keys. Without it, records are stored with out-of-line keys held in `$key`. */
	primaryKey?: string;
	autoIncrement?: boolean;
}

export interface DbSchema {
	name: string;
	version: number;
	stores: Record<string, StoreDef>;
}

export type ModifyAction = 'put' | 'add' | 'delete' | 'none';

export interface QueryOptions<T> {
	range?: IDBKeyRange;
	direction?: IDBCursorDirection;
	/** Stop after this many matches. */
	limit?: number;
	/** Number of matches to skip first. */
	skip?: number;
	filter?: (record: T) => boolean;
}

const req = <T>(r: IDBRequest<T>): Promise<T> =>
	new Promise((resolve, reject) => {
		r.onsuccess = () => resolve(r.result);
		r.onerror = () => reject(r.error);
	});

const done = (tx: IDBTransaction): Promise<void> =>
	new Promise((resolve, reject) => {
		tx.oncomplete = () => resolve();
		tx.onerror = () => reject(tx.error ?? new Error('IndexedDB transaction failed'));
		tx.onabort = () => reject(tx.error ?? new DOMException('Transaction aborted', 'AbortError'));
	});

export class Idb {
	readonly #schema: DbSchema;
	readonly #factory: IDBFactory;
	#db?: Promise<IDBDatabase>;

	constructor(schema: DbSchema, factory: IDBFactory = indexedDB) {
		this.#schema = schema;
		this.#factory = factory;
	}

	/** Opens lazily on first use; concurrent callers share one open. */
	open(): Promise<IDBDatabase> {
		return (this.#db ??= new Promise<IDBDatabase>((resolve, reject) => {
			const r = this.#factory.open(this.#schema.name, this.#schema.version);
			r.onupgradeneeded = () => {
				const db = r.result;
				for (const [name, def] of Object.entries(this.#schema.stores)) {
					if (db.objectStoreNames.contains(name)) db.deleteObjectStore(name);
					db.createObjectStore(name, { keyPath: def.primaryKey, autoIncrement: def.autoIncrement });
				}
			};
			r.onsuccess = () => {
				const db = r.result;
				db.onversionchange = () => this.close(); // let another tab upgrade
				resolve(db);
			};
			r.onerror = () => reject(r.error);
			r.onblocked = () => reject(new Error('IndexedDB open is blocked by another connection'));
		}).catch((e) => {
			this.#db = undefined; // allow a retry
			throw e;
		}));
	}

	close(): void {
		const db = this.#db;
		this.#db = undefined;
		void db?.then((d) => d.close(), () => undefined);
	}

	async deleteDatabase(): Promise<void> {
		this.close();
		await req(this.#factory.deleteDatabase(this.#schema.name) as unknown as IDBRequest);
	}

	async #tx(store: string, mode: IDBTransactionMode): Promise<{ tx: IDBTransaction; os: IDBObjectStore }> {
		const tx = (await this.open()).transaction(store, mode);
		return { tx, os: tx.objectStore(store) };
	}

	/** Splits a record into the value and key for stores with out-of-line keys. */
	#split(store: string, record: object): [object, IDBValidKey | undefined] {
		if (this.#schema.stores[store]?.primaryKey) return [record, undefined];
		const { $key, ...rest } = record as { $key?: IDBValidKey };
		return [rest, $key];
	}

	/** Read helper: out-of-line stores return `{...value, $key}` only through `getAllWithKeys`; in-line stores return values. */
	async get<T>(store: string, key: IDBValidKey | IDBKeyRange): Promise<T | undefined> {
		const { os } = await this.#tx(store, 'readonly');
		return req(os.get(key)) as Promise<T | undefined>;
	}

	async getAll<T>(store: string): Promise<T[]> {
		const { os } = await this.#tx(store, 'readonly');
		return req(os.getAll()) as Promise<T[]>;
	}

	async getAllKeys(store: string): Promise<IDBValidKey[]> {
		const { os } = await this.#tx(store, 'readonly');
		return req(os.getAllKeys());
	}

	async count(store: string, range?: IDBKeyRange): Promise<number> {
		const { os } = await this.#tx(store, 'readonly');
		return req(os.count(range));
	}

	/** Writes all records in one transaction (all or nothing). Returns the keys. */
	async putMany(store: string, records: readonly object[], action: 'put' | 'add' = 'put'): Promise<IDBValidKey[]> {
		const { tx, os } = await this.#tx(store, 'readwrite');
		const keys = records.map((r) => {
			const [value, key] = this.#split(store, r);
			return req(os[action](value, key));
		});
		const [out] = await Promise.all([Promise.all(keys), done(tx)]);
		return out;
	}

	async put(store: string, record: object): Promise<IDBValidKey> {
		return (await this.putMany(store, [record]))[0]!;
	}

	async add(store: string, record: object): Promise<IDBValidKey> {
		return (await this.putMany(store, [record], 'add'))[0]!;
	}

	async delete(store: string, key: IDBValidKey | IDBKeyRange): Promise<void> {
		const { tx, os } = await this.#tx(store, 'readwrite');
		os.delete(key);
		await done(tx);
	}

	async deleteMany(store: string, keys: readonly IDBValidKey[]): Promise<void> {
		const { tx, os } = await this.#tx(store, 'readwrite');
		for (const k of keys) os.delete(k);
		await done(tx);
	}

	async clear(store: string): Promise<void> {
		const { tx, os } = await this.#tx(store, 'readwrite');
		os.clear();
		await done(tx);
	}

	/** Cursor query (replaces `query` and `getByPage`): range, direction, filter, skip and limit. */
	async query<T>(store: string, { range, direction, limit, skip = 0, filter }: QueryOptions<T> = {}): Promise<T[]> {
		if (limit !== undefined && limit <= 0) return [];
		const { os } = await this.#tx(store, 'readonly');
		const out: T[] = [];
		let skipped = 0;
		await new Promise<void>((resolve, reject) => {
			const r = os.openCursor(range, direction);
			r.onerror = () => reject(r.error);
			r.onsuccess = () => {
				const cursor = r.result;
				if (!cursor) return resolve();
				const value = cursor.value as T;
				if (!filter || filter(value)) {
					if (skipped < skip) skipped++;
					else {
						out.push(value);
						if (limit !== undefined && out.length >= limit) return resolve();
					}
				}
				cursor.continue();
			};
		});
		return out;
	}

	/** One page of matches (`pageIndex` is zero based). */
	getByPage<T>(store: string, pageIndex: number, pageSize: number, filter?: (r: T) => boolean): Promise<T[]> {
		return this.query<T>(store, { skip: pageIndex * pageSize, limit: pageSize, filter });
	}

	/**
	 * Read-decide-write per record in one transaction (replaces `executeModify`). `decide` gets the stored record
	 * (or `undefined`) and the new one. Returns the records that were written or deleted.
	 */
	async modify<T extends object>(
		store: string,
		records: readonly T[],
		decide: (stored: T | undefined, next: T) => ModifyAction,
	): Promise<T[]> {
		const def = this.#schema.stores[store];
		const { tx, os } = await this.#tx(store, 'readwrite');
		const results: Array<Promise<T | undefined>> = records.map(async (record) => {
			const key = (def?.primaryKey ? (record as Record<string, IDBValidKey>)[def.primaryKey] : (record as { $key?: IDBValidKey }).$key) as IDBValidKey;
			const stored = (await req(os.get(key))) as T | undefined;
			const action = decide(stored, record);
			switch (action) {
				case 'put':
				case 'add': {
					const [value, k] = this.#split(store, record);
					await req(os[action](value, k));
					return record;
				}
				case 'delete':
					await req(os.delete(key));
					return stored;
				case 'none':
					return undefined;
				default:
					throw new Error('modify action must be put, add, delete or none');
			}
		});
		const [out] = await Promise.all([Promise.all(results), done(tx)]);
		return out.filter((r) => r !== undefined) as T[];
	}

	compare(a: IDBValidKey, b: IDBValidKey): number {
		return this.#factory.cmp(a, b);
	}
}
