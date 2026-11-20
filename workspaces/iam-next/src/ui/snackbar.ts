// Replaces MatSnackBar. One `<wa-toast>` stack for the whole app, created on first use.
import './components.ts';

export interface SnackbarOptions {
	variant?: 'brand' | 'success' | 'warning' | 'danger' | 'neutral';
	/** ms before auto-dismiss; 0 keeps it until dismissed. Default 4000. */
	duration?: number;
	/** Optional action button (MatSnackBar's `action`). Runs `run`, then dismisses the toast. */
	action?: { label: string; run: () => void };
}

type ToastHost = HTMLElement & {
	placement: string;
	create(message: string, options?: object): Promise<HTMLElement & { hide(): Promise<void> }>;
};

let host: ToastHost | undefined;

function ensureHost(): ToastHost {
	if (!host || !host.isConnected) {
		host = document.createElement('wa-toast') as ToastHost;
		host.placement = 'bottom-center';
		document.body.append(host);
	}
	return host;
}

export async function snackbar(message: string, options: SnackbarOptions = {}): Promise<void> {
	const item = await ensureHost().create(message, {
		variant: options.variant ?? 'neutral',
		duration: options.duration ?? 4000,
	});
	const { action } = options;
	if (action) {
		const button = document.createElement('wa-button');
		button.setAttribute('appearance', 'plain');
		button.setAttribute('size', 's');
		button.textContent = action.label;
		button.addEventListener('click', () => {
			action.run();
			void item.hide();
		});
		item.append(button);
	}
}
