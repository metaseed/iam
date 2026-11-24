// Replaces `i-version` (view part): when the doc was created and last updated. The commit history list needs the GitHub
// commits API and comes later.
import { css, t, tag, UIElement } from '@std-ui/core';

const fmt = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' });

export function formatDate(date: Date | undefined): string {
	return date && !Number.isNaN(date.getTime()) ? fmt.format(date) : '';
}

@tag('iam-version')
export class Version extends UIElement {
	static override shadowRootOptions = { mode: 'open' } as const;
	static override styles = css`
		:host { display: block; color: var(--wa-color-neutral-text-quiet, gray); font-size: var(--wa-font-size-s); }
	`;

	/** Set with `.createdAt=` / `.updatedAt=` bindings; read through functions so late-loading metas update the text. */
	createdAt: () => Date | undefined = () => undefined;
	updatedAt: () => Date | undefined = () => undefined;

	protected override template() {
		const created = formatDate(this.createdAt());
		const updated = formatDate(this.updatedAt());
		if (!created && !updated) return;
		return t`<p>${created ? t`Created ${created}` : null}${created && updated && created !== updated ? ' · ' : null}${updated && updated !== created ? t`Updated ${updated}` : null}</p>`;
	}
}
