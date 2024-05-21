import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import mkcert from 'vite-plugin-mkcert';
import { defineConfig } from 'vitest/config';
import { manifest } from './manifest';

export default defineConfig({
	plugins: [mkcert(),
	sveltekit(),
	SvelteKitPWA({
		registerType: 'autoUpdate',
		devOptions: {
			enabled: true
		},
		workbox: {
			globPatterns: ['**/*.{js,css,html,ico,png,svg}']
		},
		manifest: manifest,
		pwaAssets: {
			config: 'pwa-assets.config.ts'
		}
	})],
	server: {
		https: true
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
