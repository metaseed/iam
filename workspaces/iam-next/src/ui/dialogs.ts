// Replaces MatDialog (alert/confirm), MatBottomSheet and the old `dialog-spinner`. Built on <wa-dialog> / <wa-drawer>.
// Each helper creates its element on demand and removes it after it has closed.
import './components.ts';

type Overlay = HTMLElement & { open: boolean; label: string };

function mount<T extends Overlay>(tagName: string, label: string): T {
	const el = document.createElement(tagName) as T;
	el.label = label;
	document.body.append(el);
	// wa-after-hide also fires for light-dismiss and Escape.
	el.addEventListener('wa-after-hide', (e) => {
		if (e.target === el) el.remove();
	});
	return el;
}

function button(label: string, variant: string, onClick: () => void): HTMLElement {
	const b = document.createElement('wa-button');
	b.slot = 'footer';
	b.setAttribute('variant', variant);
	b.textContent = label;
	b.addEventListener('click', onClick);
	return b;
}

export interface ConfirmOptions {
	title?: string;
	ok?: string;
	cancel?: string;
	/** `danger` styles the OK button as destructive. */
	variant?: 'brand' | 'danger';
}

/** Resolves `true` on OK, `false` on Cancel, Escape or clicking outside. */
export function confirm(message: string, { title = '', ok = 'OK', cancel = 'Cancel', variant = 'brand' }: ConfirmOptions = {}): Promise<boolean> {
	return new Promise((resolve) => {
		const dialog = mount<Overlay>('wa-dialog', title);
		dialog.append(message, button(cancel, 'neutral', () => (dialog.open = false)), button(ok, variant, () => {
			resolve(true);
			dialog.open = false;
		}));
		dialog.addEventListener('wa-after-hide', () => resolve(false)); // no-op once resolved
		dialog.open = true;
	});
}

/** A message with a single OK button. */
export function alert(message: string, title = ''): Promise<void> {
	return new Promise((resolve) => {
		const dialog = mount<Overlay>('wa-dialog', title);
		dialog.append(message, button('OK', 'brand', () => (dialog.open = false)));
		dialog.addEventListener('wa-after-hide', () => resolve());
		dialog.open = true;
	});
}

export interface Sheet {
	/** Resolves after the sheet has closed. */
	closed: Promise<void>;
	close(): void;
}

/** MatBottomSheet: a drawer sliding up from the bottom. `content` is moved into the sheet. */
export function bottomSheet(content: Node | string, label = ''): Sheet {
	const drawer = mount<Overlay>('wa-drawer', label);
	drawer.setAttribute('placement', 'bottom');
	drawer.append(content);
	const closed = new Promise<void>((resolve) => drawer.addEventListener('wa-after-hide', () => resolve(), { once: true }));
	drawer.open = true;
	return { closed, close: () => (drawer.open = false) };
}

/** Replaces `dialog-spinner`: a blocking spinner with a message. Call the result to dismiss. */
export function busy(message = ''): () => void {
	const dialog = mount<Overlay>('wa-dialog', '');
	dialog.setAttribute('without-header', '');
	dialog.addEventListener('wa-hide', (e) => {
		if (e.target === dialog && !dismissed) e.preventDefault(); // no Escape / outside click dismissal
	});
	let dismissed = false;
	const spinner = document.createElement('wa-spinner');
	spinner.style.fontSize = '2rem';
	dialog.append(spinner, ` ${message}`);
	dialog.open = true;
	return () => {
		dismissed = true;
		dialog.open = false;
	};
}
