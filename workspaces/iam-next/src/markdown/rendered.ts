import { computed } from '@std-ui/core';
import { renderMarkdown } from './render.ts';

/**
 * The rendered doc for a content source. `content` usually reads a store that holds every doc, whose map is swapped
 * on any change, so this re-runs often; when the text is the same as last time, the previous result is returned as is:
 * no markdown render, and (same object, `Object.is`) no notification downstream.
 */
export function renderedDoc(content: () => string | undefined, render: typeof renderMarkdown = renderMarkdown) {
	let lastSource: string | undefined;
	let lastResult: ReturnType<typeof renderMarkdown> | undefined;
	return computed(() => {
		const source = content();
		if (source !== lastSource) {
			lastSource = source;
			lastResult = source === undefined ? undefined : render(source);
		}
		return lastResult;
	});
}
