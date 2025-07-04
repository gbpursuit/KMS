<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import Header from '../lib/svelte/Header.svelte';
	import Footer from '../lib/svelte/Footer.svelte';
	import { ROUTE } from './routes';


	let { children, data } = $props();
	const currentPath = $derived(page.url.pathname);
	const sessionExpired = $derived(() => !data.user);
	const status = page.status;
	
</script>

{#if currentPath !== ROUTE.AUTH && status < 400}
	<Header currentPath={currentPath} data = {data}/>
{/if}
{@render children()}
{#if sessionExpired() && currentPath !== ROUTE.AUTH}
	<div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
		<div class="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
			<h2 class="text-xl font-bold text-red-600">Session Expired</h2>
			<p class="mt-2 text-gray-700">Please log in again to continue.</p>
			<a href="/auth" class="mt-4 inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
				Go to Login
			</a>
		</div>
	</div>
{/if}
{#if currentPath !== ROUTE.AUTH && status < 400}
	<Footer />
{/if}
