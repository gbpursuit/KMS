<script lang="ts">
    import '@fortawesome/fontawesome-svg-core/styles.css';
    import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'; 
	import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
	import { faChartSimple, faGraduationCap, faFile, faClock} from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { writable, derived } from 'svelte/store';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { currentModule, selectedModuleItem } from '$lib/functions/module';
	import type { PageProps } from './$types';

	import Overview from '$lib/svelte/Overview.svelte';
	import Participants from '$lib/svelte/Participants.svelte';
	import Personnel from '$lib/svelte/Personnel.svelte';
	import Highlights from '$lib/svelte/Highlights.svelte';
	import Evaluation from '$lib/svelte/Evaluation.svelte';

	let { data } : PageProps = $props();

	function observer_func() {
		const scrollObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				const el = entry.target as HTMLElement;
				const show = entry.isIntersecting;
				el.classList.toggle('animate-appear', show);
				el.classList.toggle('animate-disappear', !show);
			});
		}, { threshold: 0.1 });

		const grid = document.getElementById('griditems');
		if (grid) {
			const items = grid.querySelectorAll('.scroll-card');
			items.forEach((el) => scrollObserver.observe(el));
		}
	}

	$effect(() => {
		$currentModule = data.module;
		$selectedModuleItem = data.selectedItem;
		if (!$selectedModuleItem) {
			setTimeout(() => observer_func(), 0);
		}
	})

	onMount(() => {
		if (!$selectedModuleItem) observer_func();
	})

	function open_item(id:string) {
		goto(`?itemId=${id}`);
	}

	const tabs = ['Overview', 'Participants', 'Personnel', 'Highlights', 'Evaluation'];
	const activeTab = writable('Overview');

	const tabContent: Record<string, any> = {
		'Overview': Overview,
		'Participants': Participants,
		'Personnel': Personnel,
		'Highlights': Highlights,
		'Evaluation': Evaluation
	};

	const CurrentComponent = derived(activeTab, ($activeTab) => tabContent[$activeTab]);
	onMount(() => {
		console.log(CurrentComponent);
	})
</script>

<svelte:head>
	<title>{data.module.path}</title> 
</svelte:head>

<!-- bind:value={searchTerm} -->

{#if !data.selectedItem}
	<div class="flex flex-col w-full min-h-[calc(100dvh-120px)] mt-[120px] justify-center items-center">
		<div class="flex flex-col w-[65%] flex-grow gap-10 py-20">
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
			<div class="flex w-full h-[90%]">
				<!-- Populate dynamically once we have data storage -->
				<div id="griditems" class="grid grid-cols-1 grid-flow-row w-full h-full gap-7">
					{#each data.module.items as item}
						<div class="scroll-card opacity-0 flex w-full rounded-3xl gap-2 border-2 border-gray-100">
							<div class="flex h-full w-[45%] border-r border-gray-200 bg-cover bg-center bg-no-repeat rounded-l-3xl rounded-r-none " style="background-image: url({'/NISMEDfrontpage.jpg'})"></div>
							<div class="flex h-full flex-grow p-2 pr-5">
								<div class="flex flex-col w-full h-full rounded-3xl gap-2">
									<h1 class="text-lg font-semibold">{item.path}</h1>
									<div class="flex flex-col w-full h-full gap-1">
										<div class="flex gap-2 items-center">
											<p class = "font-light text-sm">Module Completeness</p>
										</div>
										<div class="flex gap-2 items-center">
											<FontAwesomeIcon icon = {faChartSimple} class = "text-[var(--font-green)]"/>
											<p class="font-light text-sm">Project Leader</p>
										</div>
										<div class="flex gap-2 items-center">
											<FontAwesomeIcon icon = {faGraduationCap} class = "text-[var(--font-green)]"/>
											<p class="font-light text-sm">Number of total Participants</p>
										</div>
										<div class="flex gap-2 items-center">
											<FontAwesomeIcon icon = {faFile} class = "text-[var(--font-green)]"/>
											<p class="font-light text-sm">Type of Training</p>
										</div>
										<div class="flex gap-2 items-center">
											<FontAwesomeIcon icon = {faClock} class = "text-[var(--font-green)]"/>
											<p class="font-light text-sm">Date</p>
										</div>
									</div>
									<div class="relative flex w-full h-full border-t border-gray-200 justify-center items-center">
										<button class="flex h-full p-1 font-medium hover:text-[var(--font-green)] hover:tracking-wide transition-all duration-300 ease-in-out cursor-pointer"
										onclick={() => open_item(item.id)}
										>View More</button>
									</div>
								</div>
							</div>		
						</div>
					{/each}
				</div>
			</div>
			<!-- Fix pagination once data storage is available -->
			<div class="flex w-full flex-grow justify-center items-center">
				<div class="flex-grow"></div>
				<div class="grid grid-rows-1 grid-flow-col h-full gap-9">
					<button class="flex w-10 h-10 justify-center items-center p-1 rounded-full border border-black "><FontAwesomeIcon icon={faAngleLeft} /></button>
					<button class="flex w-10 h-10 justify-center items-center p-1 rounded-full border border-black">1</button>
					<button class="flex w-10 h-10 justify-center items-center p-1 rounded-full border border-black">2</button>
					<button class="flex w-10 h-10 justify-center items-center p-1 rounded-full border border-black">3</button>
					<button class="flex w-10 h-10 justify-center items-center p-1 rounded-full border border-black">4</button>
					<button class="flex w-10 h-10 justify-center items-center p-1 rounded-full border border-black "><FontAwesomeIcon icon={faAngleRight} /></button>
				</div>
				<div class="flex-grow"></div>
			</div>
		</div>
	</div>

{:else}
<!-- Top Bar -->
<div class="flex flex-col w-full min-h-[calc(100dvh-120px)] mt-[120px] items-center">
	<div class="flex flex-col justify-center w-full h-[245px] bg-[#1B663E] text-white px-6 py-4 mb-10">
		<!-- Progress Bar -->
		<!-- This is still fixed -->
		<div class="flex items-center gap-3 text-sm font-light text-yellow-400 mb-2">
			<p class="text-sm font-semibold">23 of 50</p>
			<div class="relative w-40 h-[6px] bg-gray-200 rounded-full overflow-hidden">
				<div class="absolute top-0 left-0 h-full bg-yellow-500" style="width: 46%"></div>
			</div>
		</div>

		<!-- Page title -->
		<!-- This is still fixed -->
		<h1 class="text-3xl font-semibold text-white max-w-[700px]">
			The Ultimate Guide To The Best WordPress LMS Plugin
		</h1>

		<!-- Metadata icons -->
		<div class="flex flex-wrap items-center gap-6 mt-3 text-sm text-white mt-6">
			<div class="flex items-center gap-2">
				<FontAwesomeIcon icon={faGraduationCap} class="text-yellow-400" />
				<!-- This is still fixed -->
				<span>Number of Total Participants</span>
			</div>
			<div class="flex items-center gap-2">
				<FontAwesomeIcon icon={faChartSimple} class="text-yellow-400" />
				<!-- This is still fixed -->
				<span>Project Leader</span>
			</div>
			<div class="flex items-center gap-2">
				<FontAwesomeIcon icon={faFile} class="text-yellow-400" />
				<!-- This is still fixed -->
				<span>Type of Training</span>
			</div>
			<div class="flex items-center gap-2">
				<FontAwesomeIcon icon={faClock} class="text-yellow-400" />
				<!-- This is still fixed -->
				<span>Date</span>
			</div>
		</div>
	</div>

	<!-- Content Area -->
	<div class="flex w-full justify-center px-4 flex-col items-center gap-10">
		<!-- Tabs + Content Box -->
		<div class="flex flex-col w-full max-w-[900px] bg-white border border-black/10 rounded-xl shadow-sm overflow-hidden">
			<!-- Tabs -->
			<div class="flex w-full">
				{#each tabs as tab}
					{#if $activeTab === tab}
						<button
							onclick={() => activeTab.set(tab)}
							class="font-exo flex-1 flex justify-center items-center px-4 py-3 text-sm transition-colors duration-300 ease-in-out font-semibold text-[#185A37] bg-[#F7F7F7] border-b-0 border-[#AFAFAF]/50"
						>
							{tab}
						</button>
					{:else}
						<button
							onclick={() => activeTab.set(tab)}
							class="font-exo flex-1 flex justify-center items-center px-4 py-3 text-sm transition-colors duration-300 ease-in-out font-semibold text-black border-t-0 border border-black/10"
						>
							{tab}
						</button>
					{/if}
				{/each}
			</div>

			<!-- Tab Content -->
			<div class="p-6 text-[15px] text-gray-800 leading-relaxed bg-[#F7F7F7]">
				{#if $CurrentComponent}
					{@const Comp = $CurrentComponent}
					<Comp />
				{/if}
			</div>
		</div>

		<!-- Comment Section -->
		<div class="w-full max-w-[900px] px-6">
			<h3 class="font-semibold mb-1">Leave A Comment</h3>
			<p class="text-sm text-gray-600 mb-4">Let us know your thoughts about the Module.</p>

			<form class="flex flex-col gap-3">
				<input type="text" placeholder="Name*" class="p-2 border border-gray-300 rounded" />
				<textarea placeholder="Comment" rows="4" class="p-2 border border-gray-300 rounded min-h-[45px] max-h-[300px]"></textarea>
				<button type="submit" class="w-max px-5 py-2 bg-orange-400 text-white rounded hover:bg-[#FF782D] transition mb-5">
					Post Comment
				</button>
			</form>
		</div>
	</div>
</div>
{/if}

<style>
    :global(.animate-appear) {
        animation: appear 800ms ease-out forwards;
    }

    :global(.animate-disappear) {
        animation: disappear 800ms ease-in forwards;
    }

    @keyframes appear {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes disappear {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.8);
        }
    }

</style>