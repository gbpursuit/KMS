<script>
	import '../app.css';
	import { page } from '$app/state';
	import Header from '../lib/Header.svelte';
	import Footer from '../lib/Footer.svelte';

	let { children } = $props();
	const currentPath = $derived(page.url.pathname);
	const status = page.status;
</script>

{#if currentPath !== '/auth' && status < 400}
	<Header currentPath={currentPath}/>
{/if}
{@render children()}
{#if currentPath !== '/auth' && status < 400}
	<Footer />
{/if}
