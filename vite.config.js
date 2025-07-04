import tailwindcss from '@tailwindcss/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'fs';

const USEHTTPS = fs.existsSync('./kms.local+1.pem') && fs.existsSync('./kms.local+1-key.pem');

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	// server: {
	// 	host: '0.0.0.0',
	// 	https: USEHTTPS ? {
	// 		key: fs.readFileSync('./kms.local+1-key.pem'),
	// 		cert: fs.readFileSync('./kms.local+1.pem')
	// 	}: undefined
	// },
	server: {
		allowedHosts: true,
		headers: {
			"bypass-tunnel-reminder": "localtunnel",
			"user-agent": "localtunnel"
		}
		
	},
	test: {
		projects: [
			{
				extends: './vite.config.js',
				plugins: [svelteTesting()],
				test: {
					name: 'client',
					environment: 'jsdom',
					clearMocks: true,
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
					setupFiles: ['./vitest-setup-client.js']
				}
			},
			{
				extends: './vite.config.js',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
