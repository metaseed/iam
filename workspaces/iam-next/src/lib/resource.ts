// Replaces rx-store effects: "load X when Y changes" (`resource`) and "do X when asked" (`mutation`).
// Both expose loading/error/value as signals, abort superseded work, and can retry and time out.
import { effect, signal, type ReadonlySignal } from '@std-ui/core';
import { AbortedError, retry, withTimeout, type RetryOptions } from './retry.ts';

export interface ResourceOptions {
	/** ms per attempt; the fetcher must pass its signal on to `fetch` for this to cancel. 0/undefined: none. */
	timeout?: number;
	/** Retry failed attempts. Omit for a single attempt. */
	retry?: RetryOptions;
	/** Keep the previous value while a new key loads (default true: avoids flicker). */
	keepPrevious?: boolean;
}

export interface Resource<V> {
	readonly value: ReadonlySignal<V | undefined>;
	readonly error: ReadonlySignal<unknown>;
	readonly loading: ReadonlySignal<boolean>;
	/** Runs the fetcher again for the current key (e.g. after a failure or a known change). */
	reload(): void;
	/** Stops tracking `source` and aborts the in-flight request. */
	dispose(): void;
}

async function attempt<T>(
	run: (signal: AbortSignal) => Promise<T>,
	options: ResourceOptions,
	signal: AbortSignal,
): Promise<T> {
	const once = () => (options.timeout ? withTimeout(options.timeout, run, signal) : run(signal));
	return options.retry ? retry(once, { ...options.retry, signal }) : once();
}

export function resource<K, V>(
	source: () => K | undefined,
	fetcher: (key: K, signal: AbortSignal) => Promise<V>,
	options: ResourceOptions = {},
): Resource<V> {
	const value = signal<V | undefined>(undefined);
	const error = signal<unknown>(undefined);
	const loading = signal(false);
	const version = signal(0);

	const stop = effect((onCleanup) => {
		version(); // reload() re-runs the effect
		const key = source();
		if (key === undefined) return;
		const ctrl = new AbortController();
		onCleanup(() => ctrl.abort());
		loading.set(true);
		error.set(undefined);
		if (options.keepPrevious === false) value.set(undefined);
		attempt((s) => fetcher(key, s), options, ctrl.signal).then(
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

	return {
		value,
		error,
		loading,
		reload: () => version.set(version.peek() + 1),
		dispose: stop as () => void,
	};
}

export interface Mutation<A, R> {
	/** Rejects with the failure, and also records it in `error`. A newer `run` aborts the older one. */
	run(arg: A): Promise<R>;
	readonly value: ReadonlySignal<R | undefined>;
	readonly error: ReadonlySignal<unknown>;
	readonly loading: ReadonlySignal<boolean>;
	/** Aborts the running call. */
	cancel(): void;
}

/**
 * An action such as "save document". Unlike `resource`, it never runs on its own and is not retried by default:
 * retrying a non-idempotent write can duplicate it.
 */
export function mutation<A, R>(
	action: (arg: A, signal: AbortSignal) => Promise<R>,
	options: ResourceOptions = {},
): Mutation<A, R> {
	const value = signal<R | undefined>(undefined);
	const error = signal<unknown>(undefined);
	const loading = signal(false);
	let current: AbortController | undefined;

	return {
		value,
		error,
		loading,
		cancel: () => current?.abort(),
		async run(arg) {
			current?.abort();
			const ctrl = (current = new AbortController());
			loading.set(true);
			error.set(undefined);
			try {
				const result = await attempt((s) => action(arg, s), options, ctrl.signal);
				if (current === ctrl) value.set(result);
				return result;
			} catch (e) {
				if (current === ctrl && !(e instanceof AbortedError)) error.set(e);
				throw e;
			} finally {
				if (current === ctrl) {
					loading.set(false);
					current = undefined;
				}
			}
		},
	};
}
