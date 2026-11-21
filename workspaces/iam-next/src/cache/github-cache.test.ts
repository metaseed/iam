import { describe, expect, it, vi } from 'vitest';
import { HttpError } from '../lib/http.ts';
import type { Issue } from '../github/issues.ts';
import type { Repository } from '../github/repository.ts';
import { deserializeMeta, getFirstPicture, getSummary, getTitle, issueToDocMeta, metaFromContent, parseDocumentName, sanitizeTitle } from './doc-meta.ts';
import { GithubCache, pagesFor } from './github-cache.ts';

const err = (status: number) => new HttpError(status, 'x', 'u', undefined, new Headers());

const issue = (number: number, extra: Partial<Issue> = {}): Issue => ({
	id: number, number, state: 'open', title: `t${number}`, body: null, labels: [],
	closed_at: null, created_at: '2020-01-01T00:00:00Z', updated_at: '2020-01-02T00:00:00Z', ...extra,
});

describe('doc-meta helpers', () => {
	it('extracts title, summary and first picture', () => {
		const md = '# My Title\n\n*short summary*\n\n![a](http://x/p.png =100x)\n';
		expect(getTitle(md)).toBe('My Title');
		expect(getSummary(md)).toBe('short summary');
		expect(getFirstPicture(md)).toBe('http://x/p.png');
		expect(getFirstPicture('![a](http://x/q.png)')).toBe('http://x/q.png');
		expect(getFirstPicture('none')).toBe('');
	});
	it('sanitizes titles and parses names', () => {
		expect(sanitizeTitle('a:b/c?')).toBe('a~b~c~');
		expect(parseDocumentName('My Doc_12.md')).toEqual({ sanitizedTitle: 'My Doc', id: 12, ext: 'md' });
		expect(parseDocumentName('12.md')).toEqual({ sanitizedTitle: '', id: 12, ext: 'md' });
	});
	it('round trips meta through the issue body and prefers issue dates', () => {
		const { meta, metaStr } = metaFromContent(5, '# T\n*s*', 'http://u', 'md', new Date('2020-01-01'), new Date('2020-02-02'));
		expect(deserializeMeta(metaStr)!.title).toBe('T');
		const { meta: back } = issueToDocMeta(issue(5, { body: metaStr, labels: [{ name: 'js' }], closed_at: '2021-01-01T00:00:00Z' }));
		expect(back).toMatchObject({ id: 5, title: 'T', summary: 's', isDeleted: true, tag: ['js'], format: 'md' });
		expect(back.updateDate.toISOString()).toBe('2020-01-02T00:00:00.000Z');
		expect(meta.id).toBe(5);
	});
	it('falls back to defaults without a meta body', () => {
		expect(issueToDocMeta(issue(9)).meta).toMatchObject({ id: 9, format: 'md', isDeleted: false });
	});
});

describe('pagesFor', () => {
	it('picks first, last and neighbouring pages', () => {
		expect(pagesFor(120, 120, true)).toEqual([1]); // first page
		expect(pagesFor(10, 120, true)).toEqual([3]); // last page (120 ids, page size 50)
		expect(pagesFor(60, 120, true)).toEqual([2]); // near floor
		expect(pagesFor(110, 120, false)).toEqual([1]); // first page, not below
		expect(pagesFor(75, 200, true)).toEqual([3, 4]); // far from floor: also next page
		expect(pagesFor(80, 200, false)).toEqual([2, 3]); // near floor and above: previous page too
	});
});

function fakeRepo(over: Record<string, unknown> = {}) {
	const issueApi = { list: vi.fn(), get: vi.fn(), create: vi.fn(), edit: vi.fn() };
	const repo = { issue: issueApi, getContents: vi.fn(), newFile: vi.fn(), updateFile: vi.fn(), getSha: vi.fn(), delFile: vi.fn(), searchIssue: vi.fn(), searchCode: vi.fn(), ...over };
	const cache = new GithubCache(repo as unknown as Repository, { contentUrl: (id, t, f) => `http://app/doc?id=${id}&f=${f}&t=${t}` });
	return { repo, issueApi, cache };
}

describe('GithubCache', () => {
	it('readBulkMeta reads the first page for an initial fetch and reports the id range', async () => {
		const { issueApi, cache } = fakeRepo();
		issueApi.list.mockResolvedValue([issue(30), issue(29), issue(28)]);
		const onIdRange = vi.fn();
		const c = new GithubCache((cache as unknown as { repo: Repository }).repo, { contentUrl: () => '', onIdRange });
		const metas = await c.readBulkMeta(undefined, true);
		expect(metas.map((m) => m.id)).toEqual([30, 29, 28]);
		expect(issueApi.list).toHaveBeenCalledTimes(1);
		expect(issueApi.list).toHaveBeenCalledWith({ state: 'all', page: 1, per_page: 50, sort: 'created' });
		expect(onIdRange).toHaveBeenCalledWith({ high: 30, low: 27 });
	});

	it('readBulkMeta fetches the neighbouring page and removes duplicates', async () => {
		const { issueApi, cache } = fakeRepo();
		const page1 = Array.from({ length: 50 }, (_, i) => issue(200 - i));
		const page3 = Array.from({ length: 50 }, (_, i) => issue(100 - i));
		issueApi.list.mockImplementation(async (o: { page: number }) => (o.page === 1 ? page1 : o.page === 3 ? page3 : [issue(100)]));
		const metas = await cache.readBulkMeta(120, true); // ratio 1.62 -> page 2, near ceiling -> [2, 3]
		const ids = metas.map((m) => m.id);
		expect(new Set(ids).size).toBe(ids.length);
		expect(issueApi.list.mock.calls.map((c) => c[0].page)).toEqual([1, 2, 3]);
	});

	it('readContent falls back to the issue meta on 404 and honours deletion', async () => {
		const { repo, issueApi, cache } = fakeRepo();
		repo.getContents.mockRejectedValueOnce(err(404));
		issueApi.get.mockResolvedValue(issue(7, { closed_at: '2021-01-01T00:00:00Z' }));
		expect(await cache.readContent(7, 'md')).toMatchObject({ id: 7, isDeleted: true });
	});

	it('readContent retries with title-prefixed then bare paths, then fails', async () => {
		const { repo, issueApi, cache } = fakeRepo();
		repo.getContents.mockRejectedValue(err(404));
		issueApi.get.mockResolvedValue(issue(7, { title: 'a:b' }));
		await expect(cache.readContent(7, 'md')).rejects.toThrow('could not get content');
		expect(repo.getContents.mock.calls.map((c) => c[0])).toEqual(['documents/7.md', 'documents/7.md', 'documents/7']);
	});

	it('readContent rethrows non-404 errors', async () => {
		const { repo, cache } = fakeRepo();
		repo.getContents.mockRejectedValue(err(500));
		await expect(cache.readContent(1, 'md')).rejects.toMatchObject({ status: 500 });
	});

	it('update commits the file then writes meta into the issue', async () => {
		const { repo, issueApi, cache } = fakeRepo();
		repo.updateFile.mockResolvedValue({ content: { sha: 'new' }, commit: { committer: { date: '2022-02-02T00:00:00Z' } } });
		repo.delFile.mockRejectedValue(err(404));
		issueApi.edit.mockResolvedValue(issue(3));
		const { meta } = metaFromContent(3, '# T', 'u', 'md', new Date('2020-01-01'), undefined);
		const doc = await cache.update(meta, { id: 3, content: '# T\n---\nversion: 2.0.0\n---\n', sha: 'old', format: 'md', isDeleted: false }, 'tweak');
		expect(repo.updateFile).toHaveBeenCalledWith('documents/3.md', expect.any(String), 'old', 'T, ver: 2.0.0, change: tweak');
		expect(doc.content.sha).toBe('new');
		expect(doc.meta.updateDate.toISOString()).toBe('2022-02-02T00:00:00.000Z');
		expect(issueApi.edit).toHaveBeenCalledWith(3, expect.objectContaining({ title: 'T', body: expect.stringContaining('type:iam') }));
	});

	it('delete closes the issue and tolerates a missing file', async () => {
		const { repo, issueApi, cache } = fakeRepo();
		issueApi.edit.mockResolvedValue(issue(4, { state: 'closed', closed_at: '2021-01-01T00:00:00Z' }));
		repo.delFile.mockRejectedValue(err(404));
		await expect(cache.delete(4)).resolves.toBeUndefined();
		repo.delFile.mockRejectedValue(err(500));
		await expect(cache.delete(4)).rejects.toMatchObject({ status: 500 });
	});

	it('create reuses a closed issue, overwrites an existing file on 422, and closes the issue on failure', async () => {
		const { repo, issueApi, cache } = fakeRepo();
		issueApi.list.mockResolvedValue([issue(8, { state: 'closed' })]);
		repo.newFile.mockRejectedValue(err(422));
		repo.getSha.mockResolvedValue({ sha: 's0' });
		repo.updateFile.mockResolvedValue({ content: { sha: 's1' }, commit: {} });
		issueApi.edit.mockResolvedValue(issue(8));
		const doc = await cache.create('# New\n', 'md');
		expect(doc.meta.id).toBe(8);
		expect(doc.content.sha).toBe('s1');
		expect(issueApi.create).not.toHaveBeenCalled();

		repo.newFile.mockRejectedValue(err(500));
		await expect(cache.create('# New\n', 'md')).rejects.toMatchObject({ status: 500 });
		expect(issueApi.edit).toHaveBeenLastCalledWith(8, { state: 'closed' });
	});

	it('search merges issue and file hits, issue titles win', async () => {
		const { repo, cache } = fakeRepo();
		repo.searchIssue.mockResolvedValue({ items: [{ number: 1, score: 2, title: 'Real Title' }, { number: 9, score: 1, title: 'Only Issue' }] });
		repo.searchCode.mockResolvedValue({ items: [{ name: 'File_1.md', score: 3 }] });
		const hits = await cache.search('q');
		expect(hits.map((h) => [h.id, h.title, h.source])).toEqual([[1, 'Real Title', 'netFile'], [9, 'Only Issue', 'netIssue']]);
	});
});
