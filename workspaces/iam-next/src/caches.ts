// The app's one set of caches (store -> IndexedDB -> GitHub), created on first use from `config.json`
// (`storage.github`: userName, dataRepoName, optional branch; a settings UI can replace these later).
import { createCaches } from './cache/index.ts';
import { loadConfig } from './config.ts';

type Caches = ReturnType<typeof createCaches>;

let pending: Promise<Caches> | undefined;

export function getCaches(): Promise<Caches> {
	pending ??= loadConfig().then(({ storage }) => {
		const caches = createCaches({ github: storage.github });
		caches.start();
		return caches;
	});
	pending.catch(() => (pending = undefined)); // let a later call retry
	return pending;
}