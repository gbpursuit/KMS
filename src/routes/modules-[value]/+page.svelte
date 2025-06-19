<script lang="ts">
	import type { PageProps } from './$types';
	let { data } : PageProps = $props();
	import value from "$lib/data/value.json";

	import {onMount} from 'svelte';

	interface valueString {
		[key: string]: { 
			title: string;
		};
	}

	const v: valueString = value;

	onMount(() => {
		console.log( data );
	})

</script>
<!-- CHeck pa ng titleContent.title -->
<svelte:head>
	<title>{data.title}</title> 
</svelte:head>

<div class="flex w-full min-h-[150dvh] bg-red-500">
	g
</div>

<style>

</style>