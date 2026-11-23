// Placeholder for the home page (doc list, Phase 6). The route is `keepAlive`: the same element instance is shown
// again when you come back, so its state (here a counter, later the list, filters and scroll) survives navigation.
import '../ui/components.ts';
import { t, tag, state, UIElement } from '@std-ui/core';

@tag('iam-home')
export class HomePage extends UIElement {
	readonly #visits = state(0);
	readonly #clicks = state(0);

	protected override connect(): void {
		this.#visits.update((n) => n + 1); // connect runs again on every return, the instance stays
	}

	protected override template() {
		return t`
			<h1>Home</h1>
			<p>Doc list comes in Phase 6.</p>
			<p>
				Shown <strong id="visits">${String(this.#visits())}</strong> time(s).
				<wa-button id="count" @click=${() => this.#clicks.update((n) => n + 1)}>Clicked ${String(this.#clicks())}</wa-button>
			</p>`;
	}
}
