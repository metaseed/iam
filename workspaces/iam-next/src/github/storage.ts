// Port of `GithubStorage.init()`: opens the data repository once, creating it when it does not exist (needs sign-in).
import { HttpError, type Http } from '../lib/http.ts';
import { Logger } from '../lib/logger.ts';
import { createGithubHttp, NotSignedInError, Repository } from './repository.ts';
import { credentials } from './auth.ts';

const log = Logger('github-storage');

export interface RepositoryConfig {
	userName: string;
	dataRepoName: string;
}

/** Looks the repository up, and creates it on 404 for a signed in user. */
export async function openRepository({ userName, dataRepoName }: RepositoryConfig, http: Http = createGithubHttp()): Promise<Repository> {
	try {
		await http.get(`/repos/${userName}/${dataRepoName}`);
	} catch (e) {
		if (!(e instanceof HttpError) || e.status !== 404) throw e;
		if (!credentials.peek()) throw new NotSignedInError();
		log.info(`repository ${userName}/${dataRepoName} not found; creating it`);
		await http.post('/user/repos', {
			name: dataRepoName,
			description: 'This is your first repository',
			homepage: 'https://github.com',
			private: false,
			auto_init: true,
			has_issues: true,
			has_projects: true,
			has_wiki: true,
		}, { retry: false });
	}
	return new Repository(userName, dataRepoName, http);
}

/**
 * Memoized `openRepository`: concurrent callers share one lookup; a failure is not remembered, so the next call
 * tries again (the old code reset its replay subject on error too).
 */
export function lazyRepository(config: RepositoryConfig, http?: Http): () => Promise<Repository> {
	let pending: Promise<Repository> | undefined;
	return () => {
		pending ??= openRepository(config, http).catch((e) => {
			pending = undefined;
			throw e;
		});
		return pending;
	};
}
