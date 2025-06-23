<script lang="ts">
    import '@fortawesome/fontawesome-svg-core/styles.css';
    import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'; 
	import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
	import { faChartSimple, faGraduationCap, faFile, faClock} from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { currentModule, selectedModuleItem } from '$lib/functions/module';
	import type { PageProps } from './$types';

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

	let activeTab: string = $state('Overview');
	const tabs = ['Overview', 'Participants', 'Personnel', 'Materials', 'Evaluation'];

	const tabContent: Record<string, string> = {
		'Overview': 'No data yet for Overview.',
		'Participants': 'No data yet for Participants.',
		'Personnel': 'No data yet for Personnel.',
		'Materials': `No data yet for Materials`,
		'Evaluation': 'No data yet for Evaluation.'
	};
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
	<div class="flex w-full justify-center min-h-[calc(100dvh-120px)] mt-[120px] px-4 flex-col items-center gap-10">
		<!-- Tabs + Content Box -->
		<div class="w-full max-w-[900px] bg-white border border-black/10 rounded-xl shadow-sm overflow-hidden">
			<!-- Tabs -->
			<div class="flex border-b border-gray-200 w-full">
				{#each tabs as tab, i}
					<button 
						onclick={() => activeTab = tab}
						class="font-exo flex-1 flex justify-center items-center px-4 py-3 text-sm transition-all duration-200 ease-in-out 
						{activeTab === tab
							? 'text-[#185A37] bg-[#F7F7F7] border-[#AFAFAF] font-bold'
							: 'text-black-500 font-semibold hover:text-[#185A37] border-transparent'}"	
					>
						{tab}
					</button>
				{/each}
			</div>


			<!-- Content Area -->
			<div class="p-6 text-[15px] text-gray-800 leading-relaxed bg-[#F7F7F7]">
				{@html tabContent[activeTab]}
			</div>
		</div>

		<!-- Comment Section (Outside Tab Container) -->
		<div class="w-full max-w-[900px] px-6">
			<h3 class="font-semibold mb-1">Leave A Comment</h3>
			<p class="text-sm text-gray-600 mb-4">Let us know your thoughts about the Module.</p>

			<form class="flex flex-col gap-3">
				<input type="text" placeholder="Name*" class="p-2 border border-gray-300 rounded" />
				<textarea placeholder="Comment" rows="4" class="p-2 border border-gray-300 rounded min-h-[45px]"></textarea>
 
				<!-- <label class="flex gap-2 items-start text-sm text-gray-700">
					<input type="checkbox" />
					<span>Save my name, email in this browser for the next time I comment</span>
				</label> -->

				<button type="submit" class="w-max px-5 py-2 bg-orange-400 text-white rounded hover:bg-[#FF782D] transition mb-5">
					Post Comment
				</button>
			</form>
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