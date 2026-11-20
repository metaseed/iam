// Phase 0 vertical slice: read-only doc view at `/doc?id=<n>&f=md`.
// Exercises: std-ui router (@searchParam), signals, async resource, markdown-it, Shoelace components.
import '@awesome.me/webawesome/dist/components/spinner/spinner.js';
import '@awesome.me/webawesome/dist/components/callout/callout.js';
import '@awesome.me/webawesome/dist/components/badge/badge.js';
import { tag, t, unsafeHtml, UIElement, signal } from '@std-ui/core';
import { searchParam } from '@std-ui/router';
import { getDocRaw } from '../github/client.ts';
import { renderMarkdown } from '../markdown/render.ts';
import { resource, type Resource } from '../lib/resource.ts';

@tag('iam-doc-view')
export class DocView extends UIElement {
	@searchParam('id') readonly docId?: string;
	@searchParam('f') readonly format?: string;

	#doc = signal<Resource<ReturnType<typeof renderMarkdown>> | undefined>(undefined);

	// Not `connect()`: std-ui defines the @searchParam getters in a hook that runs after `connect()`,
	// so reading `docId` there returns undefined and the resource would never re-run.
	protected override firstRendered(): void {
		this.#doc.set(
			resource(
				() => (this.docId ? { id: this.docId, format: this.format ?? 'md' } : undefined),
				async ({ id, format }, signal) => {
					const { content } = await getDocRaw(id, format, signal);
					return renderMarkdown(content);
				},
			),
		);
	}

	protected override disconnect(): void {
		this.#doc.peek()?.dispose();
		this.#doc.set(undefined);
	}

	protected override template() {
		if (!this.docId) return t`<wa-callout variant="warning">Missing <code>?id=</code>.</wa-callout>`;
		const doc = this.#doc();
		if (!doc) return;
		if (doc.error()) return t`<wa-callout variant="danger">${String(doc.error())}</wa-callout>`;
		const value = doc.value();
		if (doc.loading() && !value) return t`<wa-spinner style="font-size: 2rem"></wa-spinner>`;
		if (!value) return;
		const subPages = value.meta.subPage ?? [];
		return t`
			<div>${(value.meta.tag ?? []).map((name) => t`<wa-badge pill>${name}</wa-badge> `)}</div>
			<article>${unsafeHtml(value.html)}</article>
			${subPages.length ? t`<nav><h2>Sub pages</h2><ul>${subPages.map((id) => t`<li><a href=${`/doc?id=${id}&f=${this.format ?? 'md'}`}>#${id}</a></li>`)}</ul></nav>` : null}`;
	}
}
