import { registerIconLibrary } from '@awesome.me/webawesome/dist/webawesome.js';

// The free Web Awesome package ships no icon files, so named icons would be fetched from a CDN.
// Instead we bundle the few icons the app needs as inline SVG (24x24, stroke based, currentColor).
const svg = (body: string) =>
	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

export const icons: Record<string, string> = {
	menu: svg('<path d="M4 6h16M4 12h16M4 18h16"/>'),
	close: svg('<path d="M6 6l12 12M18 6L6 18"/>'),
	search: svg('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>'),
	home: svg('<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>'),
	edit: svg('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),
	save: svg('<path d="M5 3h12l2 2v16H5z"/><path d="M8 3v6h8V3M8 21v-7h8v7"/>'),
	plus: svg('<path d="M12 5v14M5 12h14"/>'),
	check: svg('<path d="M5 12l5 5L20 7"/>'),
	copy: svg('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>'),
	user: svg('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),
	'chevron-right': svg('<path d="M9 6l6 6-6 6"/>'),
	'chevron-down': svg('<path d="M6 9l6 6 6-6"/>'),
	'arrow-up': svg('<path d="M12 19V5M5 12l7-7 7 7"/>'),
	sun: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>'),
	moon: svg('<path d="M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10z"/>'),
};

export const iconUri = (name: string): string | undefined => {
	const s = icons[name];
	return s && `data:image/svg+xml,${encodeURIComponent(s)}`;
};

export function registerIcons(): void {
	// Replace the default library so no icon request ever leaves the app.
	registerIconLibrary('default', { resolver: (name) => iconUri(name) ?? '' });
	// The 'system' library (used internally by Web Awesome components) is inline already; leave it alone.
}
