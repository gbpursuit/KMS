<script lang="ts">
	import type { PageProps } from './$types';
	let { data } : PageProps = $props();
	import value from "$lib/value.json";

	import {onMount} from 'svelte';

	onMount(() => {
		console.log(data);
	})

	interface valueString {
		[key: string]: { 
			title: string;
		};
	}

	const v: valueString = value;

</script>
<!-- CHeck pa ng titleContent.title -->
<svelte:head>
	<title>{data.titleContent.title}</title> 
</svelte:head>

<div class="flex w-full min-h-[150dvh] bg-red-500">
	g
</div>

<style>

</style>