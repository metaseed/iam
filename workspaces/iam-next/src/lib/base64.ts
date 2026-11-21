// UTF-8 safe base64 (the old app used `base64Encode`/`base64Decode` from `core`).

export function textToBase64(text: string): string {
	let bin = '';
	for (const byte of new TextEncoder().encode(text)) bin += String.fromCharCode(byte);
	return btoa(bin);
}

/** Decodes base64 holding UTF-8 text. GitHub wraps its base64 in newlines, which `atob` ignores. */
export function base64ToText(b64: string): string {
	const bin = atob(b64);
	return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
}
