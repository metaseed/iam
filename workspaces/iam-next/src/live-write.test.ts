// Live WRITE check against the real data repo. Skipped unless both IAM_LIVE_TOKEN and IAM_LIVE_WRITE are set:
//
//   IAM_LIVE_TOKEN=<token> in the git-ignored .env.local (or $env:IAM_LIVE_TOKEN); $env:IAM_LIVE_WRITE = '1'; npx vitest run src/live-write.test.ts
//
// It creates ONE brand new doc (its own issue, never a recycled closed one), edits and pushes it, then deletes only
// that doc. Existing docs are never modified or deleted.
import 'fake-indexeddb/auto';
import { IDBFactory } from 'fake-indexeddb';
import { loadEnv } from 'vite';
import { describe, expect, it } from 'vitest';
import { createCaches } from './cache/index.ts';
import { metaFromContent } from './cache/doc-meta.ts';
import { signIn, signOut } from './github/auth.ts';
import { lazyRepository } from './github/storage.ts';
import { Idb } from './lib/idb.ts';
import { cacheSchema } from './lib/schema.ts';

const token = process.env['IAM_LIVE_TOKEN'] ?? loadEnv('test', process.cwd(), 'IAM_')['IAM_LIVE_TOKEN'];
const env = loadEnv('test', process.cwd(), 'IAM_');
const config = { userName: 'metasong', dataRepoName: process.env['IAM_LIVE_REPO'] ?? env['IAM_LIVE_REPO'] ?? 'iam-test', branch: env['IAM_LIVE_BRANCH'] };

describe.skipIf(!token || !process.env['IAM_LIVE_WRITE'])('live GitHub (writes only its own new doc)', () => {
	it('create -> read -> edit -> db -> push -> force save -> delete', { timeout: 120_000 }, async () => {
		signIn({ name: 'metasong', email: 'metaseed@gmail.com', token: token! });
		const repo = await lazyRepository(config)();
		const title = `iam-next live test ${new Date().toISOString()}`;
		const first = `# ${title}\n\n*written by the iam-next live test, safe to delete*\n`;
		const issue = await repo.issue.create({ title });
		const id = issue.number;
		const path = `documents/${id}.md`;
		let deleted = false;
		const caches = createCaches({
			github: config,
			repository: repo,
			idb: new Idb(cacheSchema, new IDBFactory()),
			autoSaver: { channel: null, onlineTarget: new EventTarget() },
		});
		try {
			const file = await repo.newFile(path, first, `${title}, change: live test create`);
			const { metaStr } = metaFromContent(id, first, `http://localhost/${id}`, 'md', new Date(issue.created_at), new Date(issue.updated_at));
			await repo.issue.edit(id, { title, body: metaStr });
			console.log('created test doc', id, title);

			for await (const m of caches.storeCache.readMeta(id)) void m;
			for await (const c of caches.storeCache.readContent(id, 'md')) void c;
			expect(caches.store.getMeta(id)!.title).toBe(title);
			expect(caches.store.getContent(id)!.content).toBe(first);
			expect(caches.store.getContent(id)!.sha).toBe(file.content!.sha);

			// edit: store -> db -> GitHub
			await caches.storeCache.update(caches.store.getMeta(id)!, { ...caches.store.getContent(id)!, content: first + '\nedited once\n' }, 'live edit 1');
			await caches.storeCache.saveDirtyNow();
			expect(await caches.dbCache.dirtyIds()).toEqual([id]);
			await caches.dbSaver.saveNow();
			expect(await caches.dbCache.dirtyIds()).toEqual([]);
			const remote1 = (await repo.getContents(path)) as { content: string; sha: string };
			expect(remote1.content).toContain('edited once');
			expect(caches.store.getContent(id)!.sha).toBe(remote1.sha);

			// force save goes straight through
			await caches.storeCache.update(caches.store.getMeta(id)!, { ...caches.store.getContent(id)!, content: remote1.content + 'edited twice\n' }, 'live edit 2', true);
			const remote2 = (await repo.getContents(path)) as { content: string; sha: string };
			expect(remote2.content).toContain('edited twice');
			expect(remote2.sha).not.toBe(remote1.sha);

			// delete: closes the issue and removes the file
			await caches.storeCache.delete(id);
			deleted = true;
			expect(caches.store.getMeta(id)).toBeUndefined();
			await expect(repo.getSha(path)).rejects.toMatchObject({ status: 404 });
			expect((await repo.issue.get(id)).state).toBe('closed');
		} finally {
			if (!deleted) {
				await repo.delFile(path).catch(() => undefined);
				await repo.issue.edit(id, { state: 'closed' }).catch(() => undefined);
			}
			caches.dispose();
			signOut();
		}
	});
});
