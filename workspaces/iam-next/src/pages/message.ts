// Placeholder for the Messages page; the real page is ported in a later phase.
import { t, tag, UIElement } from '@std-ui/core';

@tag('iam-message')
export class MessagePage extends UIElement {
	protected override template() {
		return t`<h1>Messages</h1><p>Not ported yet.</p>`;
	}
}
