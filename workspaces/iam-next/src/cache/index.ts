// Wires the three cache levels: store (signals) -> IndexedDB -> GitHub.
import type { Http } from '../lib/http.ts';
import { Idb } from '../lib/idb.ts';
import { cacheSchema } from '../lib/schema.ts';
import { lazyRepository, type RepositoryConfig } from '../github/storage.ts';
import type { Repository } from '../github/repository.ts';
import { DocStore } from '../store/doc-store.ts';
import { StoreCache } from '../store/store-cache.ts';
import { DbAutoSaver, type DbAutoSaverOptions } from './db-auto-saver.ts';
import { DbCache } from './db-cache.ts';
import { GithubCache } from './github-cache.ts';

export interface CachesOptions {
	github: RepositoryConfig;
	/** Public url of a doc, stored in the issue body. Default: this app's `doc?id=..&f=..&title=..` url. */
	contentUrl?: (id: number, title: string, format: string) => string;
	/** Tests: use these instead of the real ones. */
	http?: Http;
	repository?: Repository | (() => Promise<Repository>);
	idb?: Idb;
	store?: DocStore;
	autoSaver?: DbAutoSaverOptions;
}

export const defaultContentUrl = (id: number, title: string, format: string): string =>
	`${location.origin}${import.meta.env.BASE_URL}doc?id=${id}&f=${format}&title=${encodeURIComponent(title)}`;

export function createCaches(options: CachesOptions) {
	const store = options.store ?? new DocStore();
	const idb = options.idb ?? new Idb(cacheSchema);
	const github = new GithubCache(options.repository ?? lazyRepository(options.github, options.http), {
		contentUrl: options.contentUrl ?? defaultContentUrl,
		onLabels: (labels) => store.tags.upsertMany(labels.map((l) => ({ name: l.name, color: l.color, description: l.description, default: l.default }))),
		onIdRange: ({ low, high }) => {
			const oldHigh = store.idRangeHigh.peek();
			const oldLow = store.idRangeLow.peek();
			if (high !== undefined && (oldHigh === undefined || high > oldHigh)) store.idRangeHigh.set(high);
			if (low !== undefined && (oldLow === undefined || low < oldLow)) store.idRangeLow.set(low);
		},
	});
	const db = new DbCache(idb, github, store.instanceId);
	const storeCache = new StoreCache(store, db);
	const dbSaver = new DbAutoSaver(db, store, options.autoSaver);

	let stops: Array<() => void> = [];
	return {
		store,
		storeCache,
		dbCache: db,
		githubCache: github,
		dbSaver,
		/** Starts both auto savers (store -> db every 10 s, db -> GitHub every 5 min and when online). */
		start(): void {
			stops.forEach((s) => s());
			stops = [storeCache.startAutoSave(), dbSaver.start()];
		},
		dispose(): void {
			stops.forEach((s) => s());
			stops = [];
			storeCache.dispose();
			dbSaver.dispose();
			idb.close();
		},
	};
}
