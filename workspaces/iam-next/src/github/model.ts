// Response shapes of the GitHub REST calls used by the app (a trimmed port of `net-storage/github/model`).

export interface Content {
	sha: string;
	/** Base64 from the API; `Repository.getContents` decodes it to text. */
	content?: string;
	name?: string;
	path?: string;
	type?: 'file' | 'dir' | 'symlink' | 'submodule';
	size?: number;
	download_url?: string | null;
}

export interface Person {
	date: string;
	name: string;
	email: string;
}

export interface Commit {
	sha: string;
	url: string;
	html_url: string;
	comments_url: string;
	node_id: string;
	commit: {
		author: Person;
		committer: Person;
		message: string;
		tree: { sha: string; url: string };
		url: string;
		verification: { reason: string; verified: boolean };
	};
	parents: { url: string; html_url: string; sha: string }[];
}

/** Result of creating, updating or deleting a file. */
export interface FileResult {
	content: Content | null;
	/** The git commit object (author/committer directly on it), unlike `Commit` from the list-commits API. */
	commit: {
		sha: string;
		message: string;
		author: Person;
		committer: Person;
	};
}

export interface SearchResult<T> {
	total_count: number;
	incomplete_results: boolean;
	items: T[];
}

export interface ListCommitsOptions {
	path?: string;
	sha?: string;
	author?: string;
	since?: Date | string;
	until?: Date | string;
}
