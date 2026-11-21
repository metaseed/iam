// Replaces `DocumentStore` (rx-store `EntityCacheStore`s + `StateSubject`s) with signals. One instance is shared by
// the app; tests create their own.
import { computed, signal } from '@std-ui/core';
import type { DirtyDocument, DocContent, DocMeta } from '../cache/model.ts';
import type { SearchHit } from '../cache/github-cache.ts';
import { EntityMap } from './entities.ts';

export interface DocStatus {
	id: number;
	/** The editor has changes that are not in the store yet. */
	isEditorDirty?: boolean;
	/** The store has changes that are not in IndexedDB yet. */
	isStoreDirty?: boolean;
	/** IndexedDB has changes that are not on GitHub yet. */
	isDbDirty?: boolean;
	isSyncing?: boolean;
	isEditable?: boolean;
}

export interface Tag {
	name: string;
	description?: string;
	color?: string;
	default?: boolean;
}

/** Content waiting to be written to the db by the store saver (id and the user's change note). */
export type StoreDirtyDoc = Pick<DirtyDocument, 'id' | 'changeLog'>;

export class DocStore {
	/**
	 * Identifies this app instance (tab): IndexedDB is shared by all tabs of the origin, so when a doc was last
	 * saved to the db by this instance there is no need to overwrite the content being edited here.
	 */
	readonly instanceId = Math.random();

	/** Newest update first. */
	readonly metas = new EntityMap<number, DocMeta>(
		(m) => m.id,
		(a, b) => b.updateDate.getTime() - a.updateDate.getTime(),
	);
	readonly contents = new EntityMap<number, DocContent>((c) => c.id);
	readonly statuses = new EntityMap<number, DocStatus>((s) => s.id);
	readonly dirty = new EntityMap<number, StoreDirtyDoc>((d) => d.id);
	readonly tags = new EntityMap<string, Tag>((t) => t.name);

	readonly currentId = signal<number | undefined>(undefined);
	/** Highest id of the list that is loaded (`Number.MAX_VALUE`: nothing newer); undefined: initial. */
	readonly idRangeHigh = signal<number | undefined>(undefined);
	/** Lowest id that is loaded, exclusive (undefined: nothing older / not loaded). */
	readonly idRangeLow = signal<number | undefined>(undefined);
	readonly searchResult = signal<SearchHit[]>([]);

	readonly currentMeta = computed(() => {
		const id = this.currentId();
		return id === undefined ? undefined : this.metas.get(id);
	});
	readonly currentContent = computed(() => {
		const id = this.currentId();
		return id === undefined ? undefined : this.contents.get(id);
	});
	readonly currentStatus = computed(() => {
		const id = this.currentId();
		return id === undefined ? undefined : this.statuses.get(id);
	});
	readonly currentContentText = computed(() => this.currentContent()?.content);
	readonly isStoreDirty = computed(() => !!this.currentStatus()?.isStoreDirty);
	readonly isEditorDirty = computed(() => !!this.currentStatus()?.isEditorDirty);
	readonly isEditable = computed(() => !!this.currentStatus()?.isEditable);
	readonly isDbDirty = computed(() => !!this.currentStatus()?.isDbDirty);
	readonly isSyncing = computed(() => !!this.currentStatus()?.isSyncing);

	getMeta = (id: number): DocMeta | undefined => this.metas.peek(id);
	getContent = (id: number): DocContent | undefined => this.contents.peek(id);

	/** Merges into the status of `id` (default: the current doc); a new status starts editable. */
	upsertStatus(status: Partial<DocStatus>, id = this.currentId.peek()): void {
		if (id === undefined) return;
		const old = this.statuses.peek(id);
		this.statuses.upsert({ ...(old ?? { id, isEditable: true }), ...status, id });
	}

	delete(id: number): void {
		this.metas.delete(id);
		this.contents.delete(id);
		this.statuses.delete(id);
	}

	deleteMany(ids: readonly number[]): void {
		this.metas.deleteMany(ids);
		this.contents.deleteMany(ids);
		this.statuses.deleteMany(ids);
	}
}
