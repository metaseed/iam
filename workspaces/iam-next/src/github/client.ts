// Replaces net-storage/github (Requestable + Repository), which was built on Angular HttpClient + RxJS.
// Phase 0 covers only what the read-only doc view needs: public raw content of `documents/<id>.<format>`.
import { loadConfig } from '../config.ts';

export interface RawDoc {
	content: string;
	sha: string;
}

/** Git blob sha1 of `content` (what GitHub reports), so cache keys match the old app's `generateSha`. */
export async function gitSha(content: string): Promise<string> {
	const body = new TextEncoder().encode(content);
	const header = new TextEncoder().encode(`blob ${body.length}\0`);
	const all = new Uint8Array(header.length + body.length);
	all.set(header);
	all.set(body, header.length);
	const digest = await crypto.subtle.digest('SHA-1', all);
	return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** `https://raw.githubusercontent.com/<user>/<repo>/<ref>/documents/<id>.<format>` (public api, no auth). */
export async function getDocRaw(id: string, format = 'md', signal?: AbortSignal, ref = 'master'): Promise<RawDoc> {
	const { userName, dataRepoName } = (await loadConfig()).storage.github;
	const url = `https://raw.githubusercontent.com/${userName}/${dataRepoName}/${ref}/documents/${encodeURIComponent(id)}.${format}`;
	const res = await fetch(url, { signal });
	if (!res.ok) throw new Error(`GitHub raw ${res.status} for documents/${id}.${format}`);
	const content = await res.text();
	return { content, sha: await gitSha(content) };
}
