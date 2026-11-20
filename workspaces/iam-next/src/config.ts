// Replaces Angular's ConfigService: loads `public/config.json` once (same shape as the old assets/config.json).
export interface AppConfig {
	hotkeys: Record<string, string[]>;
	storage: { github: { userName: string; dataRepoName: string } };
}

let pending: Promise<AppConfig> | undefined;

export function loadConfig(baseHref = import.meta.env.BASE_URL): Promise<AppConfig> {
	pending ??= fetch(`${baseHref}config.json`).then((r) => {
		if (!r.ok) throw new Error(`config.json: HTTP ${r.status}`);
		return r.json() as Promise<AppConfig>;
	});
	pending.catch(() => (pending = undefined)); // let a later call retry
	return pending;
}
