<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import Header from '../lib/svelte/Header.svelte';
	import Footer from '../lib/svelte/Footer.svelte';
	import { ROUTE } from './routes';


	let { children, data } = $props();
	const currentPath = $derived(page.url.pathname);
	const status = page.status;
	
</script>

{#if currentPath !== ROUTE.AUTH && status < 400}
	<Header currentPath={currentPath} data = {data}/>
{/if}
{@render children()}
{#if currentPath !== ROUTE.AUTH && status < 400}
	<Footer />
{/if}
