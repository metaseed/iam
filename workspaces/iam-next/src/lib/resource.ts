// Phase 0 spike for gap G5: the minimal async primitive that replaces rx-store effects for "load X when Y changes".
// Re-runs when `source()` changes, aborts the previous request, and exposes loading/error/value as signals.
import { effect, signal, type ReadonlySignal } from '@std-ui/core';

export interface Resource<V> {
	readonly value: ReadonlySignal<V | undefined>;
	readonly error: ReadonlySignal<unknown>;
	readonly loading: ReadonlySignal<boolean>;
	/** Stops tracking `source` and aborts the in-flight request. */
	dispose(): void;
}

export function resource<K, V>(
	source: () => K | undefined,
	fetcher: (key: K, signal: AbortSignal) => Promise<V>,
): Resource<V> {
	const value = signal<V | undefined>(undefined);
	const error = signal<unknown>(undefined);
	const loading = signal(false);

	const stop = effect((onCleanup) => {
		const key = source();
		if (key === undefined) return;
		const ctrl = new AbortController();
		onCleanup(() => ctrl.abort());
		loading.set(true);
		error.set(undefined);
		fetcher(key, ctrl.signal).then(
			(v) => {
				if (ctrl.signal.aborted) return;
				value.set(v);
				loading.set(false);
			},
			(e) => {
				if (ctrl.signal.aborted) return;
				error.set(e);
				loading.set(false);
			},
		);
	});

	return { value, error, loading, dispose: stop as () => void };
}
