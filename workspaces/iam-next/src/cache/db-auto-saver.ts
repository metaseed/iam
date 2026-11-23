// Port of `DatabaseCacheSaver`: pushes docs that were saved to IndexedDB (marked in `dirty_docs`) on to GitHub every
// few minutes and when the browser comes back online, and tells other tabs about it over a BroadcastChannel so
// they update their store too.
import { Logger } from '../lib/logger.ts';
import { intervals, retry } from '../lib/retry.ts';
import type { DocStore } from '../store/doc-store.ts';
import type { DbCache } from './db-cache.ts';
import type { DirtyDocument, Doc } from './model.ts';

const log = Logger('db-auto-saver');

export const AUTO_SAVE_DIRTY_DOCS_IN_DB_INTERVAL = 5 * 60 * 1000;

/** What is posted to other tabs after a doc was saved to GitHub. */
export interface SavedMessage {
	doc: Doc;
	iamInstanceId: number;
}

export interface DbAutoSaverOptions {
	/** Round interval; a random 0-10 s is added so tabs do not all save at once. Default 5 min. */
	intervalMs?: number;
	jitterMs?: number;
	/** Wait after "online" before saving, to let the connection settle. Default 6 s. */
	onlineDelayMs?: number;
	/** Channel to inform other tabs; default `BroadcastChannel('iam-<origin>')`. */
	channel?: Pick<BroadcastChannel, 'postMessage' | 'close'> & { onmessage: ((e: MessageEvent) => void) | null } | null;
	/** Default `window`. */
	onlineTarget?: Pick<EventTarget, 'addEventListener' | 'removeEventListener'>;
	retries?: number;
	retryIntervalMs?: number;
}

export class DbAutoSaver {
	readonly #channel: DbAutoSaverOptions['channel'];
	#timer?: ReturnType<typeof setInterval>;
	#onlineTimer?: ReturnType<typeof setTimeout>;
	#running = false;
	#stop?: () => void;

	constructor(
		private readonly db: DbCache,
		private readonly store: DocStore,
		private readonly options: DbAutoSaverOptions = {},
	) {
		this.#channel =
			options.channel !== undefined
				? options.channel
				: typeof BroadcastChannel !== 'undefined'
					? (new BroadcastChannel(`iam-${location.origin}`) as unknown as DbAutoSaverOptions['channel'])
					: null;
	}

	/** Starts the timer, the online listener and the cross tab listener. Returns the stop function. */
	start(): () => void {
		this.#stop?.();
		const { intervalMs = AUTO_SAVE_DIRTY_DOCS_IN_DB_INTERVAL, jitterMs = 10_000, onlineDelayMs = 6000 } = this.options;
		this.#timer = setInterval(() => void this.saveNow(), intervalMs + Math.random() * jitterMs);

		const target = this.options.onlineTarget ?? window;
		const onOnline = (): void => {
			log.debug('browser is online');
			clearTimeout(this.#onlineTimer);
			this.#onlineTimer = setTimeout(() => void this.saveNow(), onlineDelayMs);
		};
		target.addEventListener('online', onOnline);

		if (this.#channel) {
			this.#channel.onmessage = (e) => {
				log.info('another tab saved a doc to the network', e.data);
				this.#applyToStore(e.data as SavedMessage);
			};
		}
		return (this.#stop = () => {
			clearInterval(this.#timer);
			clearTimeout(this.#onlineTimer);
			target.removeEventListener('online', onOnline);
			if (this.#channel) this.#channel.onmessage = null;
			this.#stop = undefined;
		});
	}

	dispose(): void {
		this.#stop?.();
		this.#channel?.close();
	}

	/** One round: save every dirty doc to GitHub, one after another. Rounds never overlap; failures stay dirty. */
	async saveNow(): Promise<void> {
		if (this.#running) return;
		this.#running = true;
		try {
			const dirty = await this.db.dirtyDocs();
			if (dirty.length === 0) return;
			log.debug('saving dirty docs to the network', dirty);
			for (const d of dirty) {
				try {
					await this.#saveOne(d);
				} catch (e) {
					log.error(`saving doc ${d.id} failed; it stays dirty`, e);
				}
			}
		} finally {
			this.#running = false;
		}
	}

	async #saveOne({ id, changeLog, iamInstanceId }: DirtyDocument): Promise<void> {
		this.store.upsertStatus({ isSyncing: true }, id);
		let doc: Doc;
		try {
			doc = await retry(() => this.db.syncToNext(id, changeLog), {
				maxRetries: this.options.retries ?? 2,
				interval: intervals.linear(this.options.retryIntervalMs ?? 2000),
			});
		} catch (e) {
			this.store.upsertStatus({ isSyncing: false }, id);
			throw e;
		}
		log.info('saved doc to the network', doc.meta.id);
		const message: SavedMessage = { doc, iamInstanceId };
		this.#channel?.postMessage(message); // other tabs; this one applies it directly
		this.#applyToStore(message);
	}

	/**
	 * A doc reached GitHub (from this or another tab): update meta and flags. If this tab saved it to the db last,
	 * the editor content in the store is newer than the saved copy, so only the remote fields (sha) are taken.
	 */
	#applyToStore({ doc, iamInstanceId }: SavedMessage): void {
		const id = doc.meta.id;
		this.store.upsertStatus({ isDbDirty: false, isSyncing: false }, id);
		this.store.metas.upsert(doc.meta);
		const inStore = this.store.getContent(id);
		if (iamInstanceId === this.store.instanceId && inStore) {
			this.store.contents.upsert({ ...doc.content, content: inStore.content });
		} else {
			this.store.contents.upsert(doc.content);
		}
	}
}
