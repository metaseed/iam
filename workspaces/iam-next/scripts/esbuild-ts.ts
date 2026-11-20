// Vite 8 transforms TS with oxc, which does not lower stage-3 decorators (used by std-ui and by this app).
// Keep esbuild (target es2022) as the TS transformer. Copied from std-ui/scripts/esbuild-ts.ts.
import { transform } from 'esbuild';
import type { Plugin } from 'vite';

export const esbuildTs = (): Plugin => ({
	name: 'esbuild-ts',
	enforce: 'pre',
	async transform(code, id) {
		const file = id.split('?')[0]!;
		if (!/\.ts$/.test(file) || file.includes('node_modules')) return null;
		const out = await transform(code, {
			loader: 'ts',
			target: 'es2022',
			sourcefile: file,
			sourcemap: true,
			tsconfigRaw: { compilerOptions: { useDefineForClassFields: true } },
		});
		return { code: out.code, map: out.map };
	},
});
