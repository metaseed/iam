// Replaces the `Media` class: GitHub `Accept` header values, e.g. `application/vnd.github.v3.raw`.
export function media(type = '', format = '', version = 'v3'): string {
	return `application/vnd.github.${version}${type ? '.' + type : ''}${format ? '+' + format : ''}`;
}

export const Media = {
	default: media('', 'json'),
	html: media('html', 'json'),
	text: media('text', 'json'),
	full: media('full', 'json'),
	raw: media('raw', 'json'),
	/** raw file bytes, no JSON wrapper */
	rawContent: media('raw'),
	/** search results with the matching fragments */
	textMatch: media('text-match', 'json'),
};
