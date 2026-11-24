// Replaces `i-tag` (view part): the tags of a doc as colored chips, each a link to the search for that tag. Colors and
// descriptions come from the repository's labels (the store's tags); a tag the store does not know is shown plain.
// Editing the tags (add, remove, reorder) belongs to the editor, Phase 5.
import { attribute, css, state, t, tag, UIElement } from '@std-ui/core';
import type { Tag } from '../store/doc-store.ts';

/** `#rrggbb` for a label color (GitHub gives it without the `#`); anything else is not used as a color. */
export function labelColor(color: string | undefined): string | undefined {
	return color && /^[0-9a-f]{6}$/i.test(color) ? `#${color}` : undefined;
}

@tag('iam-tags')
export class Tags extends UIElement {
	static override shadowRootOptions = { mode: 'open' } as const;
	static override styles = css`
		:host { display: block; }
		nav { display: flex; flex-wrap: wrap; gap: var(--wa-space-xs); }
		a { padding: 0 var(--wa-space-s); border: 1px solid var(--tag-color, var(--wa-color-neutral-border-normal)); border-radius: 999px;
			font-size: var(--wa-font-size-s); text-decoration: none; color: var(--tag-color, inherit);
			background: color-mix(in srgb, var(--tag-color, transparent) 13%, transparent); }
		a:hover { text-decoration: underline; }
	`;

	/** The tags to show; set with a `.names=` binding (or a JSON `names` attribute). */
	@attribute() readonly names = state<string[]>([]);

	/** Finds the label of a tag; read inside the template, so a tag list that loads later updates the chips. */
	lookup: (name: string) => Tag | undefined = () => undefined;

	protected override template() {
		const names = this.names();
		if (!names.length) return;
		return t`<nav aria-label="Tags">${names.map((name) => {
			const info = this.lookup(name);
			const color = labelColor(info?.color);
			return t`<a href=${`/search?tag=${encodeURIComponent(name)}`} title=${info?.description ?? name} style=${color ? `--tag-color: ${color}` : ''}>${name}</a>`;
		})}</nav>`;
	}
}
