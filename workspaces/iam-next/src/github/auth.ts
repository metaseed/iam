// Replaces net-storage/github AuthService + UserInfo + the GITHUB_AUTHENTICATION token.
//
// The Angular app shipped an XOR-obfuscated personal access token inside the bundle. That is not secret, so it is
// NOT copied here. Credentials are entered once (e.g. on the `me` page) and kept in localStorage; without them the
// app is read-only through the public raw endpoint.
import { signal, type ReadonlySignal } from '@std-ui/core';

export interface Credentials {
	name: string;
	email: string;
	/** GitHub personal access token. */
	token: string;
}

const KEY = 'iam.github.credentials';

function load(): Credentials | undefined {
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return undefined;
		const c = JSON.parse(raw) as Partial<Credentials>;
		return c.name && c.token ? { name: c.name, email: c.email ?? '', token: c.token } : undefined;
	} catch {
		return undefined;
	}
}

const current = signal<Credentials | undefined>(load());

export const credentials: ReadonlySignal<Credentials | undefined> = current;
/** Signed in with a token, so writes and the authenticated API are possible. */
export const isSignedIn = (): boolean => current() !== undefined;

export function signIn(c: Credentials): void {
	current.set(c);
	localStorage.setItem(KEY, JSON.stringify(c));
}

export function signOut(): void {
	current.set(undefined);
	localStorage.removeItem(KEY);
}

/** Value for the `Authorization` header, or undefined when signed out. */
export function authorization(): string | undefined {
	const c = current.peek();
	return c ? `token ${c.token}` : undefined;
}
