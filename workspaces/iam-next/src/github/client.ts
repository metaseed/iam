// Replaces net-storage/github (Requestable + Repository), which was built on Angular HttpClient + RxJS.
// Phase 0 covers only what the read-only doc view needs: public raw content of `documents/<id>.<format>`.
import { loadConfig } from '../config.ts';
import { gitSha } from './repository.ts';

export { gitSha };

export interface RawDoc {
	content: string;
	sha: string;
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
