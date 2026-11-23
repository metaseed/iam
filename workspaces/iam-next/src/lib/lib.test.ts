import { describe, expect, it, vi } from 'vitest';
import { state } from '@std-ui/core';
import { resource } from './resource.ts';
import { Logger, setLogLevel } from './logger.ts';

const flush = () => new Promise((r) => setTimeout(r, 0));

describe('resource', () => {
	it('loads when the source changes and aborts the previous request', async () => {
		const id = state<string | undefined>(undefined);
		const aborted: string[] = [];
		const r = resource(
			() => id(),
			(key, sig) =>
				new Promise<string>((resolve, reject) => {
					sig.addEventListener('abort', () => {
						aborted.push(key);
						reject(new Error('aborted'));
					});
					setTimeout(() => resolve(`doc ${key}`), key === 'slow' ? 50 : 0);
				}),
		);
		expect(r.loading()).toBe(false); // no key yet: nothing to load

		id.set('slow');
		await flush();
		expect(r.loading()).toBe(true);
		id.set('fast'); // supersedes the slow request
		await new Promise((res) => setTimeout(res, 80));

		expect(aborted).toEqual(['slow']);
		expect(r.value()).toBe('doc fast');
		expect(r.error()).toBeUndefined();
		expect(r.loading()).toBe(false);
		r.dispose();
	});

	it('exposes errors and clears them on the next load', async () => {
		const id = state('bad');
		const r = resource(
			() => id(),
			async (key) => {
				if (key === 'bad') throw new Error('boom');
				return key;
			},
		);
		await flush();
		expect((r.error() as Error).message).toBe('boom');
		id.set('good');
		await flush();
		expect(r.error()).toBeUndefined();
		expect(r.value()).toBe('good');
		r.dispose();
	});
});

describe('Logger', () => {
	it('prefixes the scope and honours the level', () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
		const info = vi.spyOn(console, 'info').mockImplementation(() => {});
		setLogLevel('warn');
		const log = Logger('Test');
		log.info('hidden');
		log.warn('shown', 1);
		expect(info).not.toHaveBeenCalled();
		expect(warn).toHaveBeenCalledWith('[Test]', 'shown', 1);
		vi.restoreAllMocks();
	});
});
