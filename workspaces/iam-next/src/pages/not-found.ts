// Placeholder for the Not found page; the real page is ported in a later phase.
import { t, tag, UIElement } from '@std-ui/core';

@tag('iam-not-found')
export class NotFoundPage extends UIElement {
	protected override template() {
		return t`<h1>Not found</h1><p>This page does not exist. <a href="/home">Go home</a>.</p>`;
	}
}
