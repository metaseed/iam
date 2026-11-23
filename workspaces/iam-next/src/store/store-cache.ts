// Port of `StoreCache` + `StoreSaver`: the in-memory level (the signal store) in front of `DbCache`.
// Reads forward what the next level yields and apply it to the store; writes go to the store first.
// Search is not ported here (Phase 6 brings the local search service).
import type { Doc, DocContent, DocMeta } from '../cache/model.ts';
import { Logger } from '../lib/logger.ts';
import { retry, intervals } from '../lib/retry.ts';
import { DEFAULT_NEW_DOC_CONTENT, NEW_DOC_ID } from './const.ts';
import type { DocStore } from './doc-store.ts';

const log = Logger('store-cache');

/** What the store level needs from the next one (`DbCache` fits). */
export interface StoreNext {
	readBulkMeta(key: number | undefined, isBelowKey: boolean): AsyncGenerator<DocMeta[]>;
	readMeta(id: number): AsyncGenerator<DocMeta>;
	readContent(id: number, format: string): AsyncGenerator<DocContent>;
	create(content: string, format: string): Promise<Doc>;
	update(meta: DocMeta, content: DocContent, changeLog: string, forceSave?: boolean): Promise<Doc>;
	delete(id: number): Promise<void>;
	/** Ids saved to the db but not on GitHub yet. */
	dirtyIds(): Promise<number[]>;
}

/** Store-level auto save of edited docs to the next level (the db), every 10 s by default. */
export const AUTO_SAVE_TO_DB_AFTER_LAST_EDIT_INTERVAL = 10_000;

/**
 * Writes the head-meta `tag: [...]` line of `content` from the issue labels, so tags changed on GitHub show up in
 * the document. Returns the content unchanged when there is no head meta tag line or it already matches.
 */
export function withTags(content: string, tags: readonly string[] | undefined): string {
	if (!tags || tags.length === 0 || !content) return content;
	const line = `tag: [${tags.map((t) => t.trim()).join(',')}]`;
	const regex = /(?<=\n---.*\n)tag:\s*\[\s*.*?\s*\](?=\s*\n.*\n---)/s;
	const found = regex.exec(content);
	return found && found[0] !== line ? content.replace(regex, line) : content;
}

export class StoreCache {
	#stopAutoSave?: () => void;

	constructor(
		private readonly store: DocStore,
		private readonly next: StoreNext,
	) {}

	/** Creates a draft in the store only (id `NEW_DOC_ID`); nothing is created remotely until `create`. */
	createDraft(): void {
		this.store.contents.upsert({ id: NEW_DOC_ID, content: DEFAULT_NEW_DOC_CONTENT, sha: '', format: 'md', isDeleted: false });
		this.store.currentId.set(NEW_DOC_ID);
	}

	/** User saved a draft: create it remotely, move it into the store under its real id, drop the draft. */
	async create(content: string, format: string): Promise<Doc> {
		const doc = await this.next.create(content, format);
		const id = doc.meta.id;
		this.store.contents.upsert(doc.content);
		this.store.metas.upsert(doc.meta);
		this.store.upsertStatus({ isEditable: true }, id);
		this.store.currentId.set(id);
		this.store.contents.delete(NEW_DOC_ID);
		return doc;
	}

	/** Yields what the next level yields; deletions remove docs from the store, other metas are merged. */
	async *readBulkMeta(key: number | undefined, isBelowKey = true): AsyncGenerator<DocMeta[]> {
		for await (const metas of this.next.readBulkMeta(key, isBelowKey)) {
			if (metas[0]?.isDeleted) {
				this.store.deleteMany(metas.map((m) => m.id)); // the next level groups deletions together
			} else {
				const changed = metas.filter((m) => this.store.getMeta(m.id)?.updateDate.getTime() !== m.updateDate.getTime());
				this.store.metas.upsertMany(changed);
			}
			yield metas;
		}
	}

	async *readMeta(id: number): AsyncGenerator<DocMeta> {
		for await (const meta of this.next.readMeta(id)) {
			this.#applyMeta(meta);
			yield meta;
		}
	}

	#applyMeta(meta: DocMeta): void {
		if (meta.isDeleted) {
			log.debug(`meta of ${meta.id} says deleted: removing from the store`);
			return this.store.delete(meta.id);
		}
		const inStore = this.store.getMeta(meta.id);
		if (!inStore || inStore.updateDate.getTime() < meta.updateDate.getTime()) this.store.metas.upsert(meta);
	}

	/**
	 * Content from the next level goes to the store unless it is deleted (then the doc is removed) or has the sha
	 * the store already has. After a change the meta is synced too (its tags can differ from the content head).
	 */
	async *readContent(id: number, format: string): AsyncGenerator<DocContent> {
		// After a reload the db may still hold unsynced edits: show the "save pending" state again.
		void this.next.dirtyIds().then(
			(ids) => ids.includes(id) && !this.store.statuses.peek(id)?.isDbDirty && this.store.upsertStatus({ isDbDirty: true }, id),
			(e) => log.warn('could not read the dirty list', e),
		);
		for await (const content of this.next.readContent(id, format)) {
			if (content.isDeleted) {
				log.warn(`doc ${id} was deleted remotely: removing it from the store`);
				this.store.delete(content.id);
				continue;
			}
			if (this.store.getContent(id)?.sha === content.sha) continue; // nothing changed
			this.store.contents.upsert(content);

			let tags: string[] | undefined;
			for await (const meta of this.readMeta(id)) tags = meta.tag;
			const current = this.store.getContent(id);
			if (current) {
				const text = withTags(current.content, tags);
				if (text !== current.content) this.store.contents.upsert({ ...current, content: text });
			}
			yield this.store.getContent(id) ?? content;
		}
	}

	/**
	 * Saves into the store. With `forceSave` the next level is written right away; otherwise the doc is marked
	 * dirty and `startAutoSave` writes it later.
	 */
	async update(meta: DocMeta, content: DocContent, changeLog: string, forceSave = false): Promise<Doc> {
		this.store.contents.upsert(content);
		this.store.upsertStatus({ isStoreDirty: true }, content.id);
		if (forceSave) {
			this.store.upsertStatus({ isSyncing: true }, content.id);
			try {
				const doc = await this.next.update(meta, content, changeLog, true);
				this.store.metas.upsert(doc.meta);
				// keep the text (the user may have typed meanwhile), take the new remote sha
				this.store.contents.update(doc.content.id, { sha: doc.content.sha });
				this.store.upsertStatus({ isStoreDirty: false, isDbDirty: false, isSyncing: false }, content.id);
				return doc;
			} catch (e) {
				this.store.upsertStatus({ isSyncing: false }, content.id);
				throw e;
			}
		}
		this.store.dirty.upsert({ id: meta.id, changeLog });
		return { meta, content };
	}

	async delete(id: number): Promise<void> {
		if (id !== NEW_DOC_ID) await this.next.delete(id);
		this.store.delete(id);
	}

	/** Writes one dirty doc to the next level (retried twice) and clears its dirty marker. */
	async #saveDirty(id: number, changeLog: string): Promise<void> {
		const meta = this.store.getMeta(id);
		const content = this.store.getContent(id);
		if (!meta || !content) {
			this.store.dirty.delete(id); // the doc is gone; nothing to save
			return;
		}
		await retry(() => this.next.update(meta, content, changeLog, false), { maxRetries: 2, interval: intervals.linear(2000) });
		log.info('auto saved doc to the db', id);
		this.store.dirty.delete(id);
		// `isStoreDirty` is cleared by the db level once the content is stored there
		this.store.upsertStatus({ isStoreDirty: false, isDbDirty: true }, id);
	}

	/** Saves all dirty docs now, one after another. Failures are logged and stay dirty for the next round. */
	async saveDirtyNow(): Promise<void> {
		for (const { id, changeLog } of this.store.dirty.all()) {
			try {
				await this.#saveDirty(id, changeLog);
			} catch (e) {
				log.error(`auto save of doc ${id} failed`, e);
			}
		}
	}

	/** Starts the periodic save (rounds never overlap). Returns the stop function; `dispose` does the same. */
	startAutoSave(intervalMs = AUTO_SAVE_TO_DB_AFTER_LAST_EDIT_INTERVAL): () => void {
		this.#stopAutoSave?.();
		let running = false;
		const timer = setInterval(() => {
			if (running || this.store.dirty.all().length === 0) return;
			running = true;
			void this.saveDirtyNow().finally(() => (running = false));
		}, intervalMs);
		return (this.#stopAutoSave = () => clearInterval(timer));
	}

	dispose(): void {
		this.#stopAutoSave?.();
	}
}
