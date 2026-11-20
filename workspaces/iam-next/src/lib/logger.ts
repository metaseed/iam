// Replaces core/services/logger: a console logger with a scope prefix and a runtime level.
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'silent';
const ORDER: Record<LogLevel, number> = { debug: 0, info: 1, warn: 2, error: 3, silent: 4 };

let level: LogLevel = import.meta.env?.DEV ? 'debug' : 'warn';

export const setLogLevel = (l: LogLevel): void => {
	level = l;
};

export interface Logger {
	debug(...args: unknown[]): void;
	info(...args: unknown[]): void;
	warn(...args: unknown[]): void;
	error(...args: unknown[]): void;
}

export function Logger(scope: string): Logger {
	const make = (name: Exclude<LogLevel, 'silent'>) => (...args: unknown[]): void => {
		if (ORDER[name] >= ORDER[level]) console[name](`[${scope}]`, ...args);
	};
	return { debug: make('debug'), info: make('info'), warn: make('warn'), error: make('error') };
}
