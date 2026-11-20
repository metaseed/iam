// Component gallery: every Phase 1 building block in one place, for manual keyboard / ARIA / theming checks.
import '../ui/components.ts';
import '../ui/float-button.ts';
import '../ui/iam-input.ts';
import { tag, t, UIElement, signal, state } from '@std-ui/core';
import { check, formBind, formUi, minLength, required } from '@std-ui/ext';
import { snackbar } from '../ui/snackbar.ts';
import { alert, confirm, bottomSheet, busy } from '../ui/dialogs.ts';
import { isHandset } from '../ui/media.ts';
import { setTheme, themeChoice, theme } from '../ui/theme.ts';
import { getCommands } from '../lib/app-commands.ts';
import { copyText } from '../lib/copier.ts';
import { scrollToTop } from '../lib/scroll.ts';

@tag('iam-gallery')
export class Gallery extends UIElement {
	readonly #answer = signal('(none yet)');
	readonly #handset = isHandset();
	readonly #copied = signal('');
	readonly #lastCommand = signal('(press Ctrl+B, or Ctrl+M then F)');
	readonly #form = (() => {
		const form = state({ title: '' }).with(check).with(formUi);
		form.title.check.validators.set([required(), minLength(3, 'At least 3 characters')]);
		return form;
	})();
	#offCommands: Array<() => void> = [];

	protected override connect(): void {
		let disposed = false;
		void getCommands().then((commands) => {
			if (disposed) return;
			for (const name of ['Bold', 'Focus']) {
				this.#offCommands.push(commands.on(name, (c) => { this.#lastCommand.set(`${c.name} (${c.combo})`); return false; }));
			}
		});
		this.#offCommands.push(() => (disposed = true));
	}

	protected override disconnect(): void {
		this.#offCommands.forEach((off) => off());
		this.#offCommands = [];
	}

	async #askConfirm(): Promise<void> {
		this.#answer.set(String(await confirm('Delete this document?', { title: 'Confirm', ok: 'Delete', variant: 'danger' })));
	}

	#sheet(): void {
		const body = document.createElement('div');
		body.innerHTML = '<p>Bottom sheet content.</p>';
		const close = document.createElement('wa-button');
		close.textContent = 'Close';
		const sheet = bottomSheet(body, 'Sheet');
		close.addEventListener('click', () => sheet.close());
		body.append(close);
	}

	#busy(): void {
		const done = busy('Working...');
		setTimeout(done, 1500);
	}

	async #copy(): Promise<void> {
		this.#copied.set((await copyText('Copied from iam-next')) ? 'copied' : 'failed');
	}

	protected override template() {
		const title = this.#form.title;
		return t`
			<h1>Gallery</h1>

			<section>
				<h2>Theme (${theme()}; choice: ${themeChoice()})</h2>
				<wa-button @click=${() => setTheme('light')}>Light</wa-button>
				<wa-button @click=${() => setTheme('dark')}>Dark</wa-button>
				<wa-button @click=${() => setTheme('system')}>System</wa-button>
			</section>

			<section>
				<h2>Snackbar</h2>
				<wa-button @click=${() => snackbar('Saved', { variant: 'success' })}>Success</wa-button>
				<wa-button @click=${() => snackbar('Something failed', { variant: 'danger', duration: 0 })}>Sticky error</wa-button>
				<wa-button @click=${() => snackbar('Document deleted', { action: { label: 'Undo', run: () => void snackbar('Restored') } })}>With action</wa-button>
			</section>

			<section>
				<h2>Dialogs</h2>
				<wa-button @click=${() => void alert('Hello from alert()', 'Alert')}>alert()</wa-button>
				<wa-button @click=${() => void this.#askConfirm()}>confirm()</wa-button>
				<span id="answer">Last answer: ${this.#answer()}</span>
				<wa-button @click=${() => this.#sheet()}>Bottom sheet</wa-button>
				<wa-button @click=${() => this.#busy()}>Busy (1.5 s)</wa-button>
			</section>

			<section>
				<h2>Form: iam-input + formBind (required, min length 3)</h2>
				<iam-input id="title-input" label="Title" hint="Bound to a state() node" .value=${formBind(title)}></iam-input>
				<p id="form-state">value: "${title()}" - valid: ${String(title.check.valid())} - touched: ${String(title.formUi.touched())}</p>
				<wa-button @click=${() => title.formUi.disabled.own.set(!title.formUi.disabled.own.peek())}>Toggle disabled</wa-button>
				<wa-button @click=${() => title.formUi.touchAll()}>Touch all (submit)</wa-button>
				<wa-switch>Enable TOC</wa-switch>
				<div><wa-tag variant="brand">javascript</wa-tag> <wa-tag removable>css</wa-tag></div>
			</section>

			<section>
				<h2>Hotkeys, clipboard, scroll</h2>
				<span id="last-command">Last command: ${this.#lastCommand()}</span>
				<wa-button @click=${() => void this.#copy()}>Copy text</wa-button>
				<span id="copied">${this.#copied()}</span>
				<wa-button @click=${() => scrollToTop()}>Scroll to top</wa-button>
			</section>

			<section>
				<h2>Tabs</h2>
				<wa-tab-group>
					<wa-tab panel="a">Viewer</wa-tab>
					<wa-tab panel="b">Editor</wa-tab>
					<wa-tab-panel name="a">Viewer panel</wa-tab-panel>
					<wa-tab-panel name="b">Editor panel</wa-tab-panel>
				</wa-tab-group>
			</section>

			<section>
				<h2>Split panel (replaces split-pane)</h2>
				<wa-split-panel style="height: 8rem; --min: 20%; --max: 80%;">
					<div slot="start" style="padding: 0.5rem">Editor</div>
					<div slot="end" style="padding: 0.5rem">Preview</div>
				</wa-split-panel>
			</section>

			<section>
				<h2>Media query</h2>
				<p>Handset layout: <strong>${String(this.#handset())}</strong> (resize the window)</p>
			</section>

			<iam-float-button>
				<wa-button variant="neutral" pill>Edit</wa-button>
				<wa-button variant="neutral" pill>Share</wa-button>
			</iam-float-button>`;
	}
}
