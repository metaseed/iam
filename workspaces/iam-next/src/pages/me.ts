// Placeholder for the Me page; the real page is ported in a later phase.
import { t, tag, UIElement } from '@std-ui/core';

@tag('iam-me')
export class MePage extends UIElement {
	protected override template() {
		return t`<h1>Me</h1><p>Not ported yet.</p>`;
	}
}
