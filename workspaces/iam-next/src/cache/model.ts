// Cache-facing document model: plain data (the Angular app used classes). Phase 4 may extend DocMeta parsing.

export interface DocMeta {
	id: number;
	title: string;
	createDate: Date;
	updateDate: Date;
	summary: string;
	imageData: string;
	format: string;
	/** Set when the far cache found the doc deleted, so near caches drop it. */
	isDeleted: boolean;
	version?: string;
	subPage?: number[];
	enable?: string[];
	tag?: string[];
}

export interface DocContent {
	id: number;
	content: string;
	/** Remote sha as last read from GitHub; used to detect edits made by another app instance. */
	sha: string;
	format: string;
	isDeleted: boolean;
}

export interface Doc {
	meta: DocMeta;
	content: DocContent;
}

export interface DirtyDocument {
	id: number;
	changeLog: string;
	/** The app instance (tab) that saved the content to the db last. */
	iamInstanceId: number;
}

export const Tables = { meta: 'doc_meta', content: 'document', dirty: 'dirty_docs' } as const;

/**
 * The next (farther) cache level, e.g. GitHub. The `read*` methods are single-shot promises; the near cache
 * decides what to forward.
 */
export interface NextCache {
	create(content: string, format: string): Promise<Doc>;
	/** `key`: undefined = initial fetch, `Number.MAX_VALUE` = refresh first page. See `readBulkMeta`. */
	readBulkMeta(key: number | undefined, isBelowKey: boolean): Promise<DocMeta[]>;
	readMeta(id: number): Promise<DocMeta>;
	readContent(id: number, format: string): Promise<DocContent>;
	update(meta: DocMeta, content: DocContent, changeLog: string): Promise<Doc>;
	delete(id: number): Promise<void>;
}
