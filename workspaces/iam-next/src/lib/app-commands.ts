// The app-wide command service, built once from `config.json` (`hotkeys`).
import { loadConfig } from '../config.ts';
import { createCommands, type Commands } from './commands.ts';

let shared: Promise<Commands> | undefined;

export function getCommands(): Promise<Commands> {
	shared ??= loadConfig().then((config) => createCommands(config.hotkeys));
	shared.catch(() => (shared = undefined));
	return shared;
}
