import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { esbuildTs } from './scripts/esbuild-ts.ts';

const stdUi = (p: string) => fileURLToPath(new URL(`../../../std-ui/src/${p}`, import.meta.url));

export default defineConfig({
	resolve: {
		alias: {
			'@std-ui/core': stdUi('core/src/index.ts'),
			'@std-ui/ext': stdUi('ext/src/index.ts'),
			'@std-ui/router': stdUi('router/src/index.ts'),
		},
	},
	plugins: [esbuildTs()],
	server: { port: 5180 },
	test: { environment: 'jsdom' },
});
