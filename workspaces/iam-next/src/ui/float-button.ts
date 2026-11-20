// Replaces `float-button` (ngc-float-button): a floating action button that expands slotted action buttons (speed dial).
//
//   <iam-float-button>
//     <wa-button variant="neutral" pill>Edit</wa-button>
//     <wa-button variant="neutral" pill>Share</wa-button>
//   </iam-float-button>
import './components.ts';
import { attribute, css, state, t, tag, UIElement } from '@std-ui/core';

@tag('iam-float-button')
export class FloatButton extends UIElement {
	static override shadowRootOptions = { mode: 'open' } as const;
	static override styles = css`
		:host {
			position: fixed;
			right: var(--iam-float-right, 1.25rem);
			bottom: var(--iam-float-bottom, 1.25rem);
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			gap: var(--wa-space-s);
			z-index: 10;
		}
		.items { display: none; flex-direction: column; align-items: flex-end; gap: var(--wa-space-s); }
		:host([open]) .items { display: flex; }
		.fab::part(base) { width: 3.5rem; height: 3.5rem; border-radius: 50%; box-shadow: var(--wa-shadow-l); }
	`;

	/** Reflected as the `open` attribute. */
	@attribute({ type: Boolean, reflect: true }) readonly open = state(false);

	protected override connect(): void {
		const onKey = (e: KeyboardEvent): void => {
			if (e.key === 'Escape') this.open.set(false);
		};
		// Clicking an action closes the speed dial.
		const onItem = (e: Event): void => {
			if (e.target !== this) this.open.set(false);
		};
		document.addEventListener('keydown', onKey);
		this.addEventListener('click', onItem);
		this.#off = () => {
			document.removeEventListener('keydown', onKey);
			this.removeEventListener('click', onItem);
		};
	}

	#off?: () => void;
	protected override disconnect(): void {
		this.#off?.();
	}

	protected override template() {
		const open = this.open();
		return t`
			<div class="items"><slot></slot></div>
			<wa-button
				class="fab"
				variant="brand"
				aria-label=${open ? 'Close actions' : 'Open actions'}
				aria-expanded=${String(open)}
				@click=${(e: Event) => {
					e.stopPropagation();
					this.open.set(!this.open.peek());
				}}
			>${open ? '×' : '+'}</wa-button>`;
	}
}
