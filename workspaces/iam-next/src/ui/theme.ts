// Light/dark theme. Web Awesome switches on the `wa-dark` class on <html>. The choice is persisted; "system" follows
// the OS setting. Call `initTheme()` once at startup.
import { computed, effect, signal } from '@std-ui/core';
import { isDark } from './media.ts';

export type ThemeChoice = 'system' | 'light' | 'dark';
const KEY = 'iam.theme';

const stored = (): ThemeChoice => {
	const v = localStorage.getItem(KEY);
	return v === 'light' || v === 'dark' ? v : 'system';
};

export const themeChoice = signal<ThemeChoice>('system');

/** The theme actually applied. */
export const theme = computed<'light' | 'dark'>(() =>
	themeChoice() === 'system' ? (isDark()() ? 'dark' : 'light') : (themeChoice() as 'light' | 'dark'),
);

export function setTheme(choice: ThemeChoice): void {
	themeChoice.set(choice);
	if (choice === 'system') localStorage.removeItem(KEY);
	else localStorage.setItem(KEY, choice);
}

export function initTheme(root: HTMLElement = document.documentElement): () => void {
	themeChoice.set(stored());
	return effect(() => {
		root.classList.toggle('wa-dark', theme() === 'dark');
	}) as () => void;
}
