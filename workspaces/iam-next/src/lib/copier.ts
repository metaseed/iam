// Replaces core/services/copier.service (execCommand + hidden textarea). Uses the async Clipboard API and falls back to
// the old textarea trick where it is unavailable (insecure context, older browsers).

/** Decodes base64 holding UTF-8 text (the old viewer stored code-fence content that way). */
export function base64ToText(b64: string): string {
	const bin = atob(b64);
	return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
}

function legacyCopy(text: string): boolean {
	const area = document.createElement('textarea');
	area.value = text;
	area.setAttribute('readonly', '');
	area.style.cssText = 'position:fixed;top:0;left:-9999px;font-size:12pt;border:0;padding:0;margin:0';
	document.body.append(area);
	try {
		area.select();
		area.setSelectionRange(0, text.length);
		return document.execCommand('copy');
	} catch {
		return false;
	} finally {
		area.remove();
	}
}

/** Copies `text` to the clipboard; resolves whether it worked. */
export async function copyText(text: string, options: { base64?: boolean } = {}): Promise<boolean> {
	let value: string;
	try {
		value = options.base64 ? base64ToText(text) : text;
	} catch {
		return false; // invalid base64
	}
	if (navigator.clipboard?.writeText) {
		try {
			await navigator.clipboard.writeText(value);
			return true;
		} catch {
			/* permission denied or document not focused: try the legacy path */
		}
	}
	return legacyCopy(value);
}
