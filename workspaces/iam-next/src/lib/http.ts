// Replaces Angular HttpClient plus the interceptors. A small `fetch` wrapper:
// JSON in/out, query params, abort, timeout, retry on network errors / 5xx / 429, and request interceptors.
import { retry, withTimeout, type RetryOptions } from './retry.ts';

export class HttpError extends Error {
	constructor(
		public readonly status: number,
		public readonly statusText: string,
		public readonly url: string,
		public readonly body: unknown,
		public readonly headers: Headers,
	) {
		super(`HTTP ${status} ${statusText} for ${url}`);
		this.name = 'HttpError';
	}
}

export interface HttpRequest {
	method: string;
	url: string;
	headers: Headers;
	body?: BodyInit | null;
}

/** May change the request in place or return a replacement. */
export type Interceptor = (req: HttpRequest) => HttpRequest | void | Promise<HttpRequest | void>;

export interface RequestOptions {
	method?: string;
	/** Query string for every method. */
	params?: Record<string, string | number | boolean | undefined>;
	/** A string/FormData/Blob is sent as is; anything else is sent as JSON. */
	body?: unknown;
	headers?: Record<string, string>;
	/** `json` (default) parses the body, `text` returns a string, `response` returns the raw `Response`. */
	responseType?: 'json' | 'text' | 'response';
	signal?: AbortSignal;
	/** ms per attempt. Default 30 s; 0 disables. */
	timeout?: number;
	/** `false` turns retries off. Default: 2 retries for idempotent methods. */
	retry?: RetryOptions | false;
}

export interface HttpOptions {
	baseUrl?: string;
	interceptors?: Interceptor[];
	/** For tests. Default is global `fetch`. */
	fetch?: typeof fetch;
	defaults?: Pick<RequestOptions, 'timeout' | 'retry'>;
}

const IDEMPOTENT = new Set(['GET', 'HEAD', 'PUT', 'DELETE', 'OPTIONS']);

/** Network failures, 5xx, 408 and 429 are worth retrying; other 4xx are not. */
export function isTransient(error: unknown): boolean {
	if (error instanceof HttpError) return error.status >= 500 || error.status === 408 || error.status === 429;
	return error instanceof TypeError; // fetch rejects with TypeError on network failure
}

export function buildUrl(base: string, path: string, params?: RequestOptions['params']): string {
	const url = /^[a-z][a-z0-9+.-]*:\/\//i.test(path) ? path : base + path;
	if (!params) return url;
	const search = new URLSearchParams();
	for (const [k, v] of Object.entries(params)) if (v !== undefined) search.set(k, String(v));
	const q = search.toString();
	if (!q) return url;
	return url + (url.includes('?') ? '&' : '?') + q;
}

function isRawBody(b: unknown): b is BodyInit {
	return (
		typeof b === 'string' ||
		b instanceof FormData ||
		b instanceof Blob ||
		b instanceof ArrayBuffer ||
		b instanceof URLSearchParams
	);
}

export interface Http {
	request<T = unknown>(path: string, options?: RequestOptions): Promise<T>;
	get<T = unknown>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T>;
	post<T = unknown>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T>;
	put<T = unknown>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T>;
	patch<T = unknown>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T>;
	delete<T = unknown>(path: string, options?: Omit<RequestOptions, 'method'>): Promise<T>;
}

export function createHttp(config: HttpOptions = {}): Http {
	const { baseUrl = '', interceptors = [], defaults = {} } = config;
	const doFetch = config.fetch ?? ((...a: Parameters<typeof fetch>) => fetch(...a));

	async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
		const method = (options.method ?? 'GET').toUpperCase();
		const timeout = options.timeout ?? defaults.timeout ?? 30_000;
		const retryOpt = options.retry ?? defaults.retry ?? (IDEMPOTENT.has(method) ? {} : false);

		const attempt = async (outer: AbortSignal | undefined): Promise<T> => {
			const headers = new Headers(options.headers);
			let body: BodyInit | null | undefined;
			if (options.body !== undefined && options.body !== null) {
				if (isRawBody(options.body)) body = options.body;
				else {
					body = JSON.stringify(options.body);
					if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json;charset=UTF-8');
				}
			}
			let req: HttpRequest = { method, url: buildUrl(baseUrl, path, options.params), headers, body };
			for (const intercept of interceptors) req = (await intercept(req)) ?? req;

			const run = async (signal: AbortSignal) => {
				const res = await doFetch(req.url, { method: req.method, headers: req.headers, body: req.body, signal });
				if (!res.ok) {
					const text = await res.text().catch(() => '');
					let parsed: unknown = text;
					try {
						parsed = text ? JSON.parse(text) : undefined;
					} catch {
						/* keep the text */
					}
					throw new HttpError(res.status, res.statusText, req.url, parsed, res.headers);
				}
				if (options.responseType === 'response') return res as unknown as T;
				if (options.responseType === 'text') return (await res.text()) as unknown as T;
				if (res.status === 204) return undefined as T;
				const text = await res.text();
				return (text ? JSON.parse(text) : undefined) as T;
			};
			return timeout > 0 ? withTimeout(timeout, run, outer) : run(outer ?? new AbortController().signal);
		};

		if (retryOpt === false) return attempt(options.signal);
		return retry(() => attempt(options.signal), {
			shouldRetry: (e) => isTransient(e),
			...retryOpt,
			signal: options.signal,
		});
	}

	return {
		request,
		get: (p, o) => request(p, { ...o, method: 'GET' }),
		post: (p, body, o) => request(p, { ...o, method: 'POST', body }),
		put: (p, body, o) => request(p, { ...o, method: 'PUT', body }),
		patch: (p, body, o) => request(p, { ...o, method: 'PATCH', body }),
		delete: (p, o) => request(p, { ...o, method: 'DELETE' }),
	};
}
