import { afterEach, describe, expect, it, vi } from 'vitest';
import { activeIndex } from './scroll.ts';
import { base64ToText, copyText } from './copier.ts';
import { createCommands, normalizeCombo, stepOf, type Command } from './commands.ts';
import { mergeErrors } from '../ui/iam-input.ts';
import { readingPercent } from '../ui/reading-progress.ts';

describe('activeIndex (scroll spy)', () => {
	const tops = [0, 100, 300, 600];
	it('picks the lowest element at or above the scroll position', () => {
		expect(activeIndex(tops, 0, 2000)).toBe(0);
		expect(activeIndex(tops, 250, 2000)).toBe(1);
		expect(activeIndex(tops, 300, 2000)).toBe(2);
	});
	it('is null above the first element and for no elements', () => {
		expect(activeIndex([50, 100], 10, 2000)).toBeNull();
		expect(activeIndex([], 10, 2000)).toBeNull();
	});
	it('picks the lowest element when scrolled to the end', () => {
		expect(activeIndex(tops, 499, 500)).toBe(3);
		expect(activeIndex([0, 100], 1000, 1000)).toBe(1);
	});
	it('does not depend on the order of the input', () => {
		expect(activeIndex([300, 0, 100], 250, 2000)).toBe(2); // top 100
	});
});

describe('readingPercent', () => {
	it('clamps and handles content that does not scroll', () => {
		expect(readingPercent(50, 100)).toBe(50);
		expect(readingPercent(150, 100)).toBe(100);
		expect(readingPercent(-5, 100)).toBe(0);
		expect(readingPercent(10, 0)).toBe(0);
	});
});

describe('copier', () => {
	afterEach(() => vi.unstubAllGlobals());
	it('decodes base64 UTF-8', () => {
		expect(base64ToText(btoa('hello'))).toBe('hello');
		expect(base64ToText('w6k=')).toBe('é');
	});
	it('uses the async clipboard when present', async () => {
		const writeText = vi.fn().mockResolvedValue(undefined);
		vi.stubGlobal('navigator', { clipboard: { writeText } });
		expect(await copyText('abc')).toBe(true);
		expect(await copyText(btoa('xyz'), { base64: true })).toBe(true);
		expect(writeText.mock.calls.map((c) => c[0])).toEqual(['abc', 'xyz']);
	});
	it('falls back to execCommand when the clipboard is unavailable or rejects', async () => {
		const exec = vi.fn().mockReturnValue(true);
		(document as unknown as { execCommand: unknown }).execCommand = exec;
		vi.stubGlobal('navigator', { clipboard: { writeText: vi.fn().mockRejectedValue(new Error('denied')) } });
		expect(await copyText('abc')).toBe(true);
		expect(exec).toHaveBeenCalledWith('copy');
		expect(document.querySelector('textarea')).toBeNull(); // helper removed
	});
	it('reports invalid base64 as a failure', async () => {
		expect(await copyText('***not base64***', { base64: true })).toBe(false);
	});
});

describe('commands', () => {
	const key = (init: KeyboardEventInit) => new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init });

	it('normalizes combos', () => {
		expect(normalizeCombo('Ctrl+Right')).toBe('ctrl+right');
		expect(normalizeCombo('shift+ctrl+B')).toBe('ctrl+shift+b');
		expect(normalizeCombo('cmd+k  f')).toBe('meta+k f');
		expect(stepOf(key({ key: 'ArrowRight', ctrlKey: true }))).toBe('ctrl+right');
		expect(stepOf(key({ key: 'Control', ctrlKey: true }))).toBe('');
	});

	it('runs handlers by command name and prevents default on false', () => {
		const target = new EventTarget();
		const commands = createCommands({ 'ctrl+b': ['Bold', 'Mark'], 'ctrl+i': ['Italic'] }, target);
		const bold = vi.fn((_command: Command) => false);
		const mark = vi.fn();
		commands.on('Bold', bold);
		commands.on('Mark', mark);
		const e = key({ key: 'b', ctrlKey: true });
		target.dispatchEvent(e);
		expect(bold).toHaveBeenCalledOnce();
		expect(bold.mock.calls[0]![0]).toMatchObject({ name: 'Bold', combo: 'ctrl+b' });
		expect(mark).toHaveBeenCalledOnce();
		expect(e.defaultPrevented).toBe(true);
		target.dispatchEvent(key({ key: 'x', ctrlKey: true }));
		expect(bold).toHaveBeenCalledOnce();
		commands.dispose();
	});

	it('supports key sequences and unsubscribe', () => {
		const target = new EventTarget();
		const commands = createCommands({ 'ctrl+m f': ['Focus'] }, target);
		const focus = vi.fn();
		const off = commands.on('Focus', focus);
		target.dispatchEvent(key({ key: 'f' })); // no prefix: nothing
		target.dispatchEvent(key({ key: 'm', ctrlKey: true }));
		expect(focus).not.toHaveBeenCalled();
		target.dispatchEvent(key({ key: 'f' }));
		expect(focus).toHaveBeenCalledOnce();
		off();
		target.dispatchEvent(key({ key: 'm', ctrlKey: true }));
		target.dispatchEvent(key({ key: 'f' }));
		expect(focus).toHaveBeenCalledOnce();
		commands.dispose();
	});

	it('ignores bare keys while typing but not modified ones', () => {
		const input = document.createElement('input');
		document.body.append(input);
		const commands = createCommands({ g: ['Go'], 'ctrl+b': ['Bold'] }, document);
		const go = vi.fn();
		const bold = vi.fn();
		commands.on('Go', go);
		commands.on('Bold', bold);
		input.dispatchEvent(key({ key: 'g' }));
		input.dispatchEvent(key({ key: 'b', ctrlKey: true }));
		expect(go).not.toHaveBeenCalled();
		expect(bold).toHaveBeenCalledOnce();
		document.body.dispatchEvent(key({ key: 'g' }));
		expect(go).toHaveBeenCalledOnce();
		commands.dispose();
		input.remove();
	});
});

describe('mergeErrors', () => {
	it('joins unique messages across properties', () => {
		const map = new Map([
			['value', [{ message: 'Required' }, { message: 'Too short' }]],
			['other', [{ message: 'Required' }]],
		]);
		expect(mergeErrors(map as never)).toBe('Required\nToo short');
		expect(mergeErrors(new Map())).toBe('');
	});
});
