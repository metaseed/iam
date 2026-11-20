// Component gallery: every Phase 1 building block in one place, for manual keyboard / ARIA / theming checks.
import '../ui/components.ts';
import '../ui/float-button.ts';
import { tag, t, UIElement, signal } from '@std-ui/core';
import { snackbar } from '../ui/snackbar.ts';
import { alert, confirm, bottomSheet, busy } from '../ui/dialogs.ts';
import { isHandset } from '../ui/media.ts';
import { setTheme, themeChoice, theme } from '../ui/theme.ts';

@tag('iam-gallery')
export class Gallery extends UIElement {
	readonly #answer = signal('(none yet)');
	readonly #handset = isHandset();

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

	protected override template() {
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
				<h2>Form controls</h2>
				<wa-input label="Title" placeholder="Document title"></wa-input>
				<wa-switch>Enable TOC</wa-switch>
				<div><wa-tag variant="brand">javascript</wa-tag> <wa-tag removable>css</wa-tag></div>
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
