import { sveltekit } from '@sveltejs/kit/vite';
import mkcert from 'vite-plugin-mkcert';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		mkcert(),
		sveltekit(),
		nodePolyfills(),
	],
	server: {
		https: true
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
