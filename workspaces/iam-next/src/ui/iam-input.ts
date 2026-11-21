// `<iam-input>`: `<wa-input>` as a form control for std-ui's `formBind()`.
//
// `formBind` shows validation only on native controls or on elements with `setErrors()`, and `<wa-input>` is neither, so
// this thin element implements the contract and forwards everything to the inner `<wa-input>`:
//
//   const form = state({ title: '' }).with(check).with(formUi);
//   form.title.check.validators.set([required()]);
//   t`<iam-input label="Title" .value=${formBind(form.title)}></iam-input>`
//
// `value` is a signal-valued property: `bind` reads it and calls `.set()` on it, and listens for `value-change`.
import './components.ts';
import { attribute, state, signal, t, tag, UIElement } from '@std-ui/core';
import type { ValidationError } from '@std-ui/ext';

/** One message for the errors of all bound properties (de-duplicated, in order). */
export function mergeErrors(byProperty: ReadonlyMap<string, readonly ValidationError[]>): string {
	const messages: string[] = [];
	for (const errors of byProperty.values()) {
		for (const { message } of errors) if (message && !messages.includes(message)) messages.push(message);
	}
	return messages.join('\n');
}

interface InnerInput extends HTMLElement {
	value: string;
	validity: ValidityState;
	setCustomValidity(message: string): void;
	focus(): void;
}

@tag('iam-input')
export class IamInput extends UIElement {
	@attribute() readonly label = state('');
	@attribute() readonly type = state('text');
	@attribute() readonly placeholder = state('');
	@attribute() readonly hint = state('');
	@attribute({ name: 'disabled', reflect: true }) readonly isDisabled = state(false);
	@attribute({ name: 'readonly', reflect: true }) readonly isReadonly = state(false);

	/** The model value. Bind with `formBind(node)` / `bind(node, { event: 'value-change' })`. */
	readonly value = state('');

	readonly #errors = signal<ReadonlyMap<string, readonly ValidationError[]>>(new Map());
	readonly #touched = signal(false);

	/** Called by `formBind` with the errors of one bound property (merged across properties here). */
	setErrors(property: string, errors: readonly ValidationError[]): void {
		const next = new Map(this.#errors.peek());
		if (errors.length) next.set(property, errors);
		else next.delete(property);
		this.#errors.set(next);
		this.#inner?.setCustomValidity(mergeErrors(next)); // keep the native validity in step right away
	}

	get validationMessage(): string {
		return mergeErrors(this.#errors.peek());
	}

	get validity(): ValidityState {
		return this.#inner?.validity ?? ({ valid: this.#errors.peek().size === 0 } as ValidityState);
	}

	override focus(options?: FocusOptions): void {
		this.#inner?.focus();
		if (!this.#inner) super.focus(options);
	}

	get #inner(): InnerInput | null {
		return this.renderRoot.querySelector<InnerInput>('wa-input');
	}

	protected override connect(): void {
		const touch = (): void => this.#touched.set(true);
		this.addEventListener('focusout', touch);
		this.#untouch = () => this.removeEventListener('focusout', touch);
	}
	#untouch?: () => void;
	protected override disconnect(): void {
		this.#untouch?.();
	}

	protected override updated(): void {
		this.#inner?.setCustomValidity(mergeErrors(this.#errors.peek())); // the inner input exists only after the first render
	}

	protected override template() {
		const error = this.#touched() ? mergeErrors(this.#errors()) : '';
		return t`<wa-input
			label=${this.label()}
			type=${this.type()}
			placeholder=${this.placeholder()}
			hint=${error || this.hint()}
			.value=${this.value()}
			.disabled=${this.isDisabled()}
			.readonly=${this.isReadonly()}
			aria-invalid=${error ? 'true' : null}
			@input=${(e: Event) => {
				this.value.set((e.target as InnerInput).value);
				this.dispatchEvent(new Event('value-change', { bubbles: true }));
			}}
		></wa-input>`;
	}
}
