// Doc view at `/doc?id=<n>&f=md`: reads through the caches (store -> IndexedDB -> GitHub), so a doc seen before shows
// at once and is refreshed when GitHub has a newer version.
import '../ui/components.ts';
import { state, tag, t, unsafeHtml, UIElement } from '@std-ui/core';
import { searchParam } from '@std-ui/router';
import { getCaches } from '../caches.ts';
import { createDecorators, decorate } from '../markdown/decorate.ts';
import { renderedDoc } from '../markdown/rendered.ts';
import { resource, type Resource } from '../lib/resource.ts';

@tag('iam-doc-view')
export class DocView extends UIElement {
	@searchParam('id') readonly docId?: string;
	@searchParam('f') readonly format?: string;

	/** Only tracks loading and errors; the content itself comes from the store. */
	#load?: Resource<true>;
	#store = state<Awaited<ReturnType<typeof getCaches>>['store'] | undefined>(undefined);
	#rendered?: ReturnType<typeof renderedDoc>;

	protected override connect(): void {
		this.#load = resource(
			() => (this.docId ? { id: Number(this.docId), format: this.format ?? 'md' } : undefined),
			async ({ id, format }) => {
				const { store, storeCache } = await getCaches();
				this.#store.set(store);
				store.currentId.set(id);
				for await (const _ of storeCache.readContent(id, format)); // cached copy first, then a newer one
				if (!store.getContent(id)) throw new Error(`Doc ${id} was not found.`);
				return true as const;
			},
		);
		this.#rendered = renderedDoc(() => this.#store()?.contents.get(Number(this.docId))?.content);
	}

	/** The rendered doc the widgets were inserted for, and the function that removes them again. */
	#decoratedFor?: object;
	#undecorate?: () => void;
	readonly #decorators = createDecorators();

	/** Runs after each render: when the doc changed, insert the widgets into the new html (once, not per render). */
	protected override updated(): void {
		const value = this.#rendered?.();
		const article = this.querySelector('article');
		if (!value || !article || value === this.#decoratedFor) return;
		this.#undecorate?.();
		this.#decoratedFor = value;
		this.#undecorate = decorate(article, value, this.#decorators);
	}

	protected override disconnect(): void {
		this.#undecorate?.();
		this.#decoratedFor = this.#undecorate = undefined;
		this.#load?.dispose();
	}

	protected override template() {
		const load = this.#load;
		if (!this.docId) return t`<wa-callout variant="warning">Missing <code>?id=</code>.</wa-callout>`;
		if (!load) return;
		const value = this.#rendered?.();
		if (load.error() && !value) return t`<wa-callout variant="danger">${String(load.error())}</wa-callout>`;
		if (!value) return t`<wa-spinner style="font-size: 2rem"></wa-spinner>`;
		const subPages = value.meta.subPage ?? [];
		return t`
			<div>${(value.meta.tag ?? []).map((name) => t`<wa-badge pill>${name}</wa-badge> `)}</div>
			<article>${unsafeHtml(value.html)}</article>
			${subPages.length ? t`<nav><h2>Sub pages</h2><ul>${subPages.map((id) => t`<li><a href=${`/doc?id=${id}&f=${this.format ?? 'md'}`}>#${id}</a></li>`)}</ul></nav>` : null}`;
	}
}