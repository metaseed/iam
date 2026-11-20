// Read-only doc view at `/doc?id=<n>&f=md`.
// Exercises: std-ui router (@searchParam), signals, async resource, markdown-it, Web Awesome components.
import '../ui/components.ts';
import { tag, t, unsafeHtml, UIElement } from '@std-ui/core';
import { searchParam } from '@std-ui/router';
import { getDocRaw } from '../github/client.ts';
import { renderMarkdown } from '../markdown/render.ts';
import { resource, type Resource } from '../lib/resource.ts';

@tag('iam-doc-view')
export class DocView extends UIElement {
	@searchParam('id') readonly docId?: string;
	@searchParam('f') readonly format?: string;

	#doc?: Resource<ReturnType<typeof renderMarkdown>>;

	protected override connect(): void {
		this.#doc = resource(
			() => (this.docId ? { id: this.docId, format: this.format ?? 'md' } : undefined),
			async ({ id, format }, signal) => {
				const { content } = await getDocRaw(id, format, signal);
				return renderMarkdown(content);
			},
		);
	}

	protected override disconnect(): void {
		this.#doc?.dispose();
	}

	protected override template() {
		const doc = this.#doc;
		if (!this.docId) return t`<wa-callout variant="warning">Missing <code>?id=</code>.</wa-callout>`;
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
