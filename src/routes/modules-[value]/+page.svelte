<script lang="ts">
    import '@fortawesome/fontawesome-svg-core/styles.css';
    import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'; // button
	import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
	import { faChartSimple, faGraduationCap, faFile, faClock} from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

	import type { PageProps } from './$types';
	let { data } : PageProps = $props();

	import {onMount} from 'svelte';

	// Possible type of database content
	// interface databaseTrainingModules {
	// 	[key:string]: {
	// 		title: string;
	// 		content: string[]
	// 	}
	// }

	onMount(() => {
		console.log( data );
	})

	// let searchButton: boolean = false;

	// let searchTerm: string = '';
	// $: filteredItems = search

	function toggleAnimation(el:Element, appear:string, disappear:string, show:boolean) {
		console.log('hi')
		el.classList.toggle(appear, show);
		el.classList.toggle(disappear, !show);
	}

	onMount(() => {
		const scrollObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				const el = entry.target as HTMLElement;
				const show = entry.isIntersecting;
				toggleAnimation(el, 'animate-appear', 'animate-disappear', show);
			})
		}, {
			threshold: 0.1
		});

		
		const grid = document.getElementById('griditems');
		if (grid) {
			const items = grid.querySelectorAll('.scroll-card');
			items.forEach((el) => scrollObserver.observe(el));
		}

	})


</script>

<svelte:head>
	<title>{data.title}</title> 
</svelte:head>

<!-- bind:value={searchTerm} -->

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
				{#each data.items as item}
					<div class="scroll-card opacity-0 flex w-full rounded-3xl gap-2 border-2 border-gray-100">
						<div class="flex h-full w-[45%] border-r border-gray-200 bg-cover bg-center bg-no-repeat rounded-l-3xl rounded-r-none " style="background-image: url({'/NISMEDfrontpage.jpg'})"></div>
						<div class="flex h-full flex-grow p-2 pr-5">
							<div class="flex flex-col w-full h-full rounded-3xl gap-2">
								<h1 class="text-lg font-semibold">{item.name}</h1>
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
									<button class="flex h-full p-1 font-medium hover:text-[var(--font-green)] hover:tracking-wide transition-all duration-300 ease-in-out cursor-pointer">View More</button>
								</div>
							</div>
						</div>		
					</div>
				{/each}
				<!-- <div class="scroll-card opacity-0 flex w-full rounded-3xl gap-2 border-2 border-gray-100">
					<div class="flex h-full w-[45%] border-r border-gray-200 bg-cover bg-center bg-no-repeat rounded-l-3xl rounded-r-none " style="background-image: url({'/NISMEDfrontpage.jpg'})"></div>
					<div class="flex h-full flex-grow p-2 pr-5">
						<div class="flex flex-col w-full h-full rounded-3xl gap-2">
							<h1 class="text-lg font-semibold">Sample Training Module</h1>
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
								<button class="flex h-full p-1 font-medium hover:text-[var(--font-green)] hover:tracking-wide transition-all duration-300 ease-in-out cursor-pointer">View More</button>
							</div>
						</div>
					</div>
				</div>
				<div class="scroll-card opacity-0 flex w-full rounded-3xl gap-2 border-2 border-gray-100">
					<div class="flex h-full w-[45%] border-r border-gray-200 bg-cover bg-center bg-no-repeat rounded-l-3xl rounded-r-none " style="background-image: url({'/NISMEDfrontpage.jpg'})"></div>
					<div class="flex h-full flex-grow p-2 pr-5">
						<div class="flex flex-col w-full h-full rounded-3xl gap-2">
							<h1 class="text-lg font-semibold">Sample Training Module</h1>
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
								<button class="flex h-full p-1 font-medium hover:text-[var(--font-green)] hover:tracking-wide transition-all duration-300 ease-in-out cursor-pointer">View More</button>
							</div>
						</div>
					</div>
				</div>
				<div class="scroll-card opacity-0 flex w-full rounded-3xl gap-2 border-2 border-gray-100">
					<div class="flex h-full w-[45%] border-r border-gray-200 bg-cover bg-center bg-no-repeat rounded-l-3xl rounded-r-none " style="background-image: url({'/NISMEDfrontpage.jpg'})"></div>
					<div class="flex h-full flex-grow p-2 pr-5">
						<div class="flex flex-col w-full h-full rounded-3xl gap-2">
							<h1 class="text-lg font-semibold">Sample Training Module</h1>
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
								<button class="flex h-full p-1 font-medium hover:text-[var(--font-green)] hover:tracking-wide transition-all duration-300 ease-in-out cursor-pointer">View More</button>
							</div>
						</div>
					</div>
				</div>
				<div class="scroll-card opacity-0 flex w-full rounded-3xl gap-2 border-2 border-gray-100 ">
					<div class="flex h-full w-[45%] border-r border-gray-200 bg-cover bg-center bg-no-repeat rounded-l-3xl rounded-r-none " style="background-image: url({'/NISMEDfrontpage.jpg'})"></div>
					<div class="flex h-full flex-grow p-2 pr-5">
						<div class="flex flex-col w-full h-full rounded-3xl gap-2">
							<h1 class="text-lg font-semibold">Sample Training Module</h1>
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
								<button class="flex h-full p-1 font-medium hover:text-[var(--font-green)] hover:tracking-wide transition-all duration-300 ease-in-out cursor-pointer">View More</button>
							</div>
						</div>
					</div>
				</div>
				<div class="scroll-card opacity-0 flex w-full rounded-3xl gap-2 border-2 border-gray-100">
					<div class="flex h-full w-[45%] border-r border-gray-200 bg-cover bg-center bg-no-repeat rounded-l-3xl rounded-r-none " style="background-image: url({'/NISMEDfrontpage.jpg'})"></div>
					<div class="flex h-full flex-grow p-2 pr-5">
						<div class="flex flex-col w-full h-full rounded-3xl gap-2">
							<h1 class="text-lg font-semibold">Sample Training Module</h1>
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
								<button class="flex h-full p-1 font-medium hover:text-[var(--font-green)] hover:tracking-wide transition-all duration-300 ease-in-out cursor-pointer">View More</button>
							</div>
						</div>
					</div>
				</div> -->
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