// Replaces `CanDeactivateGuard`: ask before leaving a page with unsaved work. Uses the router's `beforeLeave` hook
// (async, so the app's own `confirm()` dialog works) and its `unload` check (the browser's prompt on tab close).
import type { Router } from '@std-ui/router';
import { confirm } from '../ui/dialogs.ts';

export interface LeaveGuardOptions {
	message?: string;
	/** Custom prompt, mostly for tests. Default: the app's confirm dialog. */
	ask?: (message: string) => Promise<boolean>;
}

/**
 * While `isDirty()` is true, navigating away asks for confirmation, and closing the tab shows the browser prompt.
 * Returns the unregister function; call it when the page goes away (for example in `disconnect()`).
 */
export function guardUnsaved(router: Router, isDirty: () => boolean, options: LeaveGuardOptions = {}): () => void {
	const { message = 'You have unsaved changes. Leave this page?', ask = (m) => confirm(m, { title: 'Unsaved changes', ok: 'Leave', variant: 'danger' }) } = options;
	return router.beforeLeave(async () => (isDirty() ? await ask(message) : true), { unload: isDirty });
}
