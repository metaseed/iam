import { t, tag, UIElement } from '@std-ui/core';
import '@std-ui/router'; // defines <std-router>, <std-route>, <std-outlet>
import './pages/doc-view.ts';
import './pages/gallery.ts';
import './ui/bottom-nav.ts';
import './ui/reading-progress.ts';
import type { BottomNav } from './ui/bottom-nav.ts';

@tag('iam-app')
export class App extends UIElement {
	protected override firstUpdated(): void {
		(this.querySelector('iam-bottom-nav') as BottomNav).items.set([
			{ href: '/', label: 'Home', glyph: '⌂' },
			{ href: '/gallery', label: 'Gallery', glyph: '▦' },
		]);
	}

	protected override template() {
		return t`
			<std-router>
				<main style="padding-bottom: 4.5rem"><std-outlet></std-outlet></main>
				<iam-reading-progress></iam-reading-progress>
				<iam-bottom-nav></iam-bottom-nav>
				<std-route path="/" redirect="/doc?id=1"></std-route>
				<std-route path="/doc" element="iam-doc-view" title="iam"></std-route>
				<std-route path="/gallery" element="iam-gallery" title="Gallery - iam"></std-route>
				<std-route path="*"><template><h1>Not found</h1></template></std-route>
			</std-router>`;
	}
}
