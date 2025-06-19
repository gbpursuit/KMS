<script lang="ts">
    import '@fortawesome/fontawesome-svg-core/styles.css';
    import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

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

	// let searchButton: boolean = false;

	// let searchTerm: string = '';
	// $: filteredItems = search

</script>

<svelte:head>
	<title>{data.title}</title> 
</svelte:head>

<!-- bind:value={searchTerm} -->

<div class="flex w-full h-[calc(150dvh-120px)] mt-[120px] justify-center items-center">
	<div class="flex flex-col w-[65%] h-[90%]">
		<div class="flex w-full h-[5%] justify-center items-center">
			<h1 class="text-4xl font-semibold">All Training Modules</h1>
			<div class="flex-grow"></div>

			<div class="flex h-[30px] justify-center items-center border-b border-black">
				<input 
				type="text" 
				placeholder="Search" 
				class="w-[23ch] p-0 bg-transparent text-sm text-black placeholder-[rgb(0,0,0,0.5)] border-none focus:ring-0"
				>
				<button type = "button" class = "flex justify-center items-center w-10 h-10 p-1"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
			</div>
		</div>
		<div class="flex w-full h-[80%]">
			<div class="grid grid-cols-1 grid-flow-row w-full h-full gap-9">
				<div class="flex w-full bg-red-500 rounded-3xl p-2">
					<div class="flex h-full w-[45%] ">g</div>
					<div class="flex h-full flex-grow">g</div>
				</div>
				<div class="flex w-full bg-red-500 rounded-3xl p-2">
					<div class="flex h-full w-[45%] ">g</div>
					<div class="flex h-full flex-grow">g</div>
				</div>
				<div class="flex w-full bg-red-500 rounded-3xl p-2">
					<div class="flex h-full w-[45%] ">g</div>
					<div class="flex h-full flex-grow">g</div>
				</div>
				<div class="flex w-full bg-red-500 rounded-3xl p-2">
					<div class="flex h-full w-[45%] ">g</div>
					<div class="flex h-full flex-grow">g</div>
				</div>
				<div class="flex w-full bg-red-500 rounded-3xl p-2">
					<div class="flex h-full w-[45%] ">g</div>
					<div class="flex h-full flex-grow">g</div>
				</div>
			</div>
		</div>

	</div>
</div>

<style>

</style>