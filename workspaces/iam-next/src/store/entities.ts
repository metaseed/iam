// Replaces `EntityCacheStore`/`MemEntityCache` from rx-store: a keyed collection held in one signal. Every change
// swaps in a new Map, so readers (effects, computeds, templates) re-run, and `all()` is cheap to compare.
import { state, type ReadonlyState } from '@std-ui/core';

export class EntityMap<K extends string | number, T> {
	readonly #items = state<ReadonlyMap<K, T>>(new Map());
	readonly #id: (item: T) => K;
	readonly #compare?: (a: T, b: T) => number;

	constructor(id: (item: T) => K, compare?: (a: T, b: T) => number) {
		this.#id = id;
		this.#compare = compare;
	}

	/** Reactive map of all items. */
	get map(): ReadonlyState<ReadonlyMap<K, T>> {
		return this.#items;
	}

	/** Items in insertion order, or sorted if a comparer was given. Reactive. */
	all(): T[] {
		const list = [...this.#items().values()];
		return this.#compare ? list.sort(this.#compare) : list;
	}

	get(id: K): T | undefined {
		return this.#items().get(id);
	}

	/** Same as `get` but not tracked by effects. */
	peek(id: K): T | undefined {
		return this.#items.peek().get(id);
	}

	has(id: K): boolean {
		return this.#items.peek().has(id);
	}

	#write(fn: (draft: Map<K, T>) => void): void {
		const next = new Map(this.#items.peek());
		fn(next);
		this.#items.set(next);
	}

	/** Adds or replaces. */
	upsert(item: T): void {
		this.#write((m) => void m.set(this.#id(item), item));
	}

	upsertMany(items: readonly T[]): void {
		if (items.length) this.#write((m) => items.forEach((i) => m.set(this.#id(i), i)));
	}

	/** Merges `changes` into an existing item; ignored when the id is unknown. */
	update(id: K, changes: Partial<T>): void {
		const old = this.#items.peek().get(id);
		if (old) this.#write((m) => void m.set(id, { ...old, ...changes }));
	}

	delete(id: K): void {
		if (this.#items.peek().has(id)) this.#write((m) => void m.delete(id));
	}

	deleteMany(ids: readonly K[]): void {
		if (ids.some((id) => this.#items.peek().has(id))) this.#write((m) => ids.forEach((id) => m.delete(id)));
	}

	clear(): void {
		this.#items.set(new Map());
	}
}
