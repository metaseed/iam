// Port of `DatabaseCache` (IndexedDB level between the in-memory store and GitHub). Reads yield the cached value
// first, then whatever the next level has that is newer, so callers can render at once and refresh later.
// Observable streams become async generators. The auto-saver is a separate step (it needs the app store).
import type { Idb } from '../lib/idb.ts';
import { Logger } from '../lib/logger.ts';
import type { DirtyDocument, Doc, DocContent, DocMeta, NextCache } from './model.ts';
import { Tables } from './model.ts';

export const DB_PAGE_SIZE = 50;
const log = Logger('db-cache');

export class DbCache {
	constructor(
		private readonly db: Idb,
		private readonly next: NextCache,
		private readonly instanceId = 0,
	) {}

	/**
	 * A page of doc metas, newest first. Yields (1) the cached page, (2) docs deleted remotely, (3) docs added or
	 * updated remotely. Remote results are also written to the db. A failed remote read propagates after the
	 * cached page was delivered.
	 */
	async *readBulkMeta(key: number | undefined, isBelowKey: boolean): AsyncGenerator<DocMeta[]> {
		const refreshFirstPage = !isBelowKey && key === Number.MAX_VALUE;
		const range =
			key === undefined
				? IDBKeyRange.lowerBound(0, true)
				: isBelowKey
					? IDBKeyRange.upperBound(key)
					: IDBKeyRange.lowerBound(key, true);
		const direction: IDBCursorDirection = key === undefined ? 'prev' : isBelowKey ? 'next' : 'prev';

		let cached: DocMeta[] = [];
		if (!refreshFirstPage) {
			cached = await this.db.query<DocMeta>(Tables.meta, { range, direction, limit: DB_PAGE_SIZE });
			if (cached.length > 0) yield cached;
		}

		const remote = await this.next.readBulkMeta(key, isBelowKey);
		const deleted: DocMeta[] = [];
		const upserted: DocMeta[] = [];
		await this.db.modify<DocMeta>(Tables.meta, remote, (stored, record) => {
			if (record.isDeleted) {
				if (!stored) return 'none';
				deleted.push(stored);
				return 'delete';
			}
			if (!stored) {
				upserted.push(record);
				return 'add';
			}
			if (stored.updateDate < record.updateDate) {
				upserted.push(record);
				return 'put';
			}
			// Same as stored: only tell the caller if its quick page did not have it.
			if (cached.length > 0 && !cached.some((c) => c.id === record.id)) upserted.push(record);
			return 'none';
		});
		if (deleted.length) yield deleted;
		if (upserted.length) yield upserted;
	}

	/** Cached meta (if any), then the remote one when it was deleted or has a different `updateDate`. */
	async *readMeta(id: number): AsyncGenerator<DocMeta> {
		const cached = await this.db.get<DocMeta>(Tables.meta, id);
		if (cached) yield cached;
		const remote = await this.next.readMeta(id);
		if (remote.isDeleted) {
			await this.db.delete(Tables.meta, remote.id);
			yield remote;
		} else if (!cached || cached.updateDate.getTime() !== remote.updateDate.getTime()) {
			await this.db.put(Tables.meta, remote);
			yield remote;
		}
	}

	/**
	 * Cached content (if any), then the remote one when deleted or its sha differs. A sha change means another
	 * instance edited the doc, so a local dirty flag for it is dropped (local edits would be lost; logged).
	 */
	async *readContent(id: number, format: string): AsyncGenerator<DocContent> {
		const cached = await this.db.get<DocContent>(Tables.content, id);
		if (cached) yield cached;
		const remote = await this.next.readContent(id, format);
		if (remote.isDeleted) {
			await this.db.delete(Tables.content, remote.id);
			yield remote;
			return;
		}
		if (cached && cached.sha === remote.sha) return;
		if (cached && (await this.db.getAllKeys(Tables.dirty)).includes(cached.id)) {
			await this.db.delete(Tables.dirty, cached.id);
			log.warn(`dropped dirty flag of doc ${cached.id}: remote sha changed, local changes may be lost`);
		}
		await this.db.put(Tables.content, remote);
		yield remote;
	}

	/** Saves a new doc created remotely to the db. */
	async add(doc: Doc): Promise<void> {
		await this.db.add(Tables.content, doc.content);
		await this.db.add(Tables.meta, doc.meta);
	}

	/** Local save: content and meta plus a dirty marker in one go. With `forceSave` it also syncs to the next level. */
	async update(meta: DocMeta, content: DocContent, changeLog: string, forceSave = false): Promise<Doc> {
		await Promise.all([this.db.put(Tables.content, content), this.db.put(Tables.meta, meta)]);
		const dirty: DirtyDocument = { id: meta.id, changeLog, iamInstanceId: this.instanceId };
		await this.db.put(Tables.dirty, dirty);
		return forceSave ? this.syncToNext(meta.id, changeLog) : { meta, content };
	}

	/** Pushes the db copy of a doc to the next level, then clears its dirty marker and stores the result. */
	async syncToNext(id: number, changeLog: string): Promise<Doc> {
		const [content, meta] = await Promise.all([
			this.db.get<DocContent>(Tables.content, id),
			this.db.get<DocMeta>(Tables.meta, id),
		]);
		if (!content || !meta) throw new Error(`doc ${id} is not in the local db`);
		const doc = await this.next.update(meta, content, changeLog);
		await this.db.delete(Tables.dirty, id);
		await Promise.all([this.db.put(Tables.content, doc.content), this.db.put(Tables.meta, doc.meta)]);
		return doc;
	}

	async dirtyIds(): Promise<number[]> {
		return (await this.db.getAllKeys(Tables.dirty)) as number[];
	}

	async delete(id: number): Promise<void> {
		await this.next.delete(id);
		await this.db.delete(Tables.meta, id);
		await this.db.delete(Tables.content, id);
	}
}
