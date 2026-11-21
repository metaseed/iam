// Replaces core/operators backoff, error-retry and timeout-monitor (RxJS) with promise helpers.

/** Delay in ms before retry number `attempt` (1-based). A number is a fixed delay. */
export type Interval = number | ((attempt: number) => number);

export class AbortedError extends Error {
	constructor() {
		super('aborted');
		this.name = 'AbortedError';
	}
}

export class TimeoutError extends Error {
	constructor(public readonly ms: number) {
		super(`timed out after ${ms} ms`);
		this.name = 'TimeoutError';
	}
}

/** Waits `ms`, rejecting with `AbortedError` as soon as `signal` aborts. */
export function sleep(ms: number, signal?: AbortSignal): Promise<void> {
	return new Promise((resolve, reject) => {
		if (signal?.aborted) return reject(new AbortedError());
		const done = () => {
			signal?.removeEventListener('abort', onAbort);
			resolve();
		};
		const timer = setTimeout(done, ms);
		const onAbort = () => {
			clearTimeout(timer);
			reject(new AbortedError());
		};
		signal?.addEventListener('abort', onAbort, { once: true });
	});
}

/** Common interval shapes from the old `backoff` docs. */
export const intervals = {
	/** `base * attempt`: the old default (1, 2, 3 ... times the interval). */
	linear: (base: number): ((i: number) => number) => (i) => base * i,
	/** `base * i^2`: 10, 40, 90, 160 ... for base 10. */
	quadratic: (base: number): ((i: number) => number) => (i) => base * i * i,
	/** `base * 2^(i-1)`, capped at `max`. */
	exponential:
		(base: number, max = 30_000): ((i: number) => number) =>
		(i) =>
			Math.min(max, base * 2 ** (i - 1)),
};

export interface RetryOptions {
	/** Total retries after the first attempt. `Infinity` retries forever. Default 3. */
	maxRetries?: number;
	/** Default `exponential(250)`. */
	interval?: Interval;
	/** Return false to fail immediately (for example on a 404). Default retries everything but aborts. */
	shouldRetry?: (error: unknown, attempt: number) => boolean;
	/** Called before each wait; useful for logging or a "retrying" indicator. */
	onRetry?: (error: unknown, attempt: number, delay: number) => void;
	signal?: AbortSignal;
}

/**
 * Runs `fn` until it resolves. Stops with the last error once `maxRetries` is exhausted
 * (the old `errorRetry` threw a new Error instead; keeping the original makes handling simpler).
 */
export async function retry<T>(fn: (attempt: number) => Promise<T>, options: RetryOptions = {}): Promise<T> {
	const { maxRetries = 3, interval = intervals.exponential(250), shouldRetry, onRetry, signal } = options;
	for (let attempt = 0; ; attempt++) {
		if (signal?.aborted) throw new AbortedError();
		try {
			return await fn(attempt);
		} catch (error) {
			if (error instanceof AbortedError || signal?.aborted) throw error;
			const next = attempt + 1;
			if (next > maxRetries || (shouldRetry && !shouldRetry(error, next))) throw error;
			const delay = typeof interval === 'function' ? interval(next) : interval;
			onRetry?.(error, next, delay);
			await sleep(delay, signal);
		}
	}
}

/**
 * Gives `fn` a signal that aborts after `ms` (or when `signal` aborts) and rejects with `TimeoutError`.
 * `fn` should pass the signal on to `fetch` so the request is really cancelled.
 */
export async function withTimeout<T>(
	ms: number,
	fn: (signal: AbortSignal) => Promise<T>,
	signal?: AbortSignal,
): Promise<T> {
	const ctrl = new AbortController();
	let timedOut = false;
	const timer = setTimeout(() => {
		timedOut = true;
		ctrl.abort();
	}, ms);
	const onAbort = () => ctrl.abort();
	if (signal?.aborted) ctrl.abort();
	else signal?.addEventListener('abort', onAbort, { once: true });
	try {
		return await fn(ctrl.signal);
	} catch (error) {
		if (timedOut) throw new TimeoutError(ms);
		if (ctrl.signal.aborted) throw new AbortedError();
		throw error;
	} finally {
		clearTimeout(timer);
		signal?.removeEventListener('abort', onAbort);
	}
}
