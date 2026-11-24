// Replaces `i-subpage` (view part): links to the sub pages of a doc, titled from the cache when the title is known.
import { css, t, tag, UIElement } from '@std-ui/core';

@tag('iam-subpage')
export class SubPage extends UIElement {
	static override shadowRootOptions = { mode: 'open' } as const;
	static override styles = css`
		:host { display: block; }
		h2 { font-size: var(--wa-font-size-m); margin: 0 0 var(--wa-space-xs); }
		ul { margin: 0; padding-left: var(--wa-space-l); }
	`;

	/** Ids of the sub pages; set with a `.ids=` binding. */
	ids: readonly number[] = [];
	/** Format of a doc (its own, as the old widget navigated with doc.format); md until the meta is known. */
	formatOf: (id: number) => string | undefined = () => undefined;
	/** Title of a doc; read in the template, so titles that load later update the list. */
	titleOf: (id: number) => string | undefined = () => undefined;

	protected override template() {
		if (!this.ids.length) return;
		return t`<nav aria-label="Sub pages"><h2>Sub pages</h2><ul>${this.ids.map(
			(id) => t`<li><a href=${`/doc?id=${id}&f=${this.formatOf(id) || 'md'}`}>${this.titleOf(id) || `#${id}`}</a></li>`,
		)}</ul></nav>`;
	}
}
