<script lang="ts">
    import '@fortawesome/fontawesome-svg-core/styles.css';
    import { faFileCircleExclamation, faFolderMinus, faMagnifyingGlass, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons'; 
	import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
	import { faChartSimple, faGraduationCap, faFile, faClock} from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

	import { onMount, tick } from 'svelte';

	import { currentModule, selectedModuleItem } from '$lib/functions/module';
	import type { PageProps } from './$types';

	import type { Training } from '@prisma/client';
	import { smoothScrollTo } from '$lib/functions/function';
	import { addData, getData } from '$lib/functions/database';
	import { addImageData } from '$lib/functions/media';
	import Select from '$lib/svelte/Select.svelte';
	import Label from '$lib/svelte/Label.svelte';
	import Input from '$lib/svelte/Input.svelte';
	import Button from '$lib/svelte/Button.svelte';

	import { VIEW_CLIENT } from '$lib/functions/env';
	import Modal from '$lib/svelte/program/Modal.svelte';
	import Heading from '$lib/svelte/Heading.svelte';
	import Paragraph from '$lib/svelte/Paragraph.svelte';

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

	let training: any = $state([]);
	let allAccounts: Array<string> = $state([])

	$effect(() => {
		if($currentModule !== data.pd) currentModule.set(data.pd);
		if ($selectedModuleItem !== data.selectedItem) selectedModuleItem.set(data.selectedItem);
		// if (!$selectedModuleItem) setTimeout(() => observer_func(), 0);
	});

	let rawToken: any;

	onMount(async () => {
		rawToken = VIEW_CLIENT;
		for(let i = 0; i < data.training.length; i++) training = training.concat(data.training[i].type)
		let error: any = await getData(rawToken, 'account').then((v: Array<any>) => {for(let i = 0; i < v.length; i++) allAccounts[i] = v[i].acctName })
		if(error) console.error('Error: Failed to get all accounts')
		pageLoaded = true;
	});


	function openItem(id:string) {
		let url = new URL(window.location.href);
		// console.log('hi');
		window.location.href = `${url}/module-${id}`;
	}

	let showModal: boolean = $state(false);
	let imageUrl: File | null = null;
	let pageLoaded = $state(false)

	function handleFileChange(event: Event): void {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
		imageUrl = target.files[0];
		}
	}

	async function handleSubmit(e: Event) {
		e?.preventDefault();
		let form = e.target as HTMLFormElement;
		let formData = new FormData(form);
		let item = Object.fromEntries(formData) as Record<string, any>;
	
		item.numParticipants = parseInt(item.numParticipants);
		item.trainingId = parseInt(item.trainingId);
		item.programId = data.programId;
		item.leader = allAccounts[item.leader - 1]
		

		console.log(item, formData)

		if (Object.values(item).some(value => !value)) {
			alert("Please fill in all required fields");
		}

		let PATH = await addImageData(imageUrl, item.leader);
		item.imageUrl = PATH;

		let result = await addData(rawToken, 'pd', item);
		if(result.ok) {
			form.reset();
			imageUrl = null;
			window.location.reload();
		} else {
			throw new Error(result.result.error);
		}
	}

	const fieldClass = "flex flex-col gap-1 transition-all duration-300";

	function handleDate(date: string) {
		return new Date(date).toLocaleDateString('en-PH', {
			year: 'numeric', month: 'long', day: 'numeric'
		})
	}

	let currentPage = $state(1);
	let tasksPerPage = 5;
	let totalPages = $state(0);
	let startIndex = $state(0);
	let endIndex = $state(0);
	let searchQuery = $state('');
	let visibleTasks: any[] = $state([]);
	let pageButtons: number[] = $state([]);
	let selectedFilter = $state('All');
	let filterOptions = $state(['All', 'Online', 'Face-to-Face', 'Hybrid']);
	let filteredItems: typeof data.pd.items;
	let searchTimeout: ReturnType<typeof setTimeout>;

	function updateVisibleTasks() {
		if (!data.selectedItem) {
			if (selectedFilter === 'All') {
				filteredItems = data.pd.items;
			} else {
				const matchedTraining = data.training.find(t => t.type === selectedFilter);
				if (matchedTraining) {
					const selectedId = matchedTraining.id;
					filteredItems = data.pd.items.filter(item => item.trainingId === selectedId);
				} else {
					filteredItems = [];
				}
			}

			// Filter by search query
			const query = searchQuery.toLowerCase().trim();
			if (query.length > 0) {
				filteredItems = filteredItems.filter(item =>
					item.title.toLowerCase().includes(query) ||
					item.leader.toLowerCase().includes(query)
				);
			}

			// Pagination
			totalPages = Math.max(1, Math.ceil(filteredItems.length / tasksPerPage));

			if (currentPage > totalPages) currentPage = totalPages;
			if (currentPage < 1) currentPage = 1;

			startIndex = (currentPage - 1) * tasksPerPage;
			endIndex = startIndex + tasksPerPage;
			visibleTasks = filteredItems.slice(startIndex, endIndex);

			// Page buttons
			pageButtons = getPageButtons(currentPage, totalPages);
		}
	}

	$effect(() => {
		updateVisibleTasks();
	});

	async function goToPage(page: number) {
		currentPage = page;
		await tick();
		smoothScrollTo('buttons');
	}

	function getPageButtons(current: number, total: number, max = 3): number[] {
		let start = Math.max(current - Math.floor(max/2), 1);
		let end  = Math.min(start + max - 1, total);

		if( end - start < max - 1) {
			start = Math.max(end - max + 1, 1);
		}
		return Array.from ({ length: end - start + 1 }, (_, i) => start + i);
	}

</script>

<svelte:head>
	<title>{data.name}</title> 
</svelte:head>

<Modal programId={data.programId} bind:training bind:allAccounts bind:showModal/>

{#if !data.selectedItem}
<div class="flex flex-col w-full min-h-[calc(100dvh-120px)] mt-[120px] justify-center items-center">
	<div class="flex flex-col w-[65%] flex-grow gap-10 py-20">
		<div class="flex w-full items-center justify-between border-b-2 border-[var(--font-green)]/20 pb-4">
			<!-- Title -->
			<Heading>All Training Modules</Heading>

			<div class="flex-grow"></div>

			<!-- Filter + Search Row -->
			<div class="flex items-center gap-3">
				<!-- Filter Dropdown -->
				<div class="relative">
					<Select style="modal-select" options={filterOptions} bind:selected={selectedFilter} />
				</div>

				<!-- Search Bar -->
				<div class="flex items-center gap-2 px-3 py-1 border border-[var(--font-green)] rounded-full shadow-sm bg-white transition duration-200 focus-within:ring-2 focus-within:ring-[var(--font-green)]">
					<Input style="module-search" type="text" placeholder="Search modules..." bind:text={searchQuery}
						oninput={() => {
							clearTimeout(searchTimeout);
							searchTimeout = setTimeout(() => {
								currentPage = 1; 
								updateVisibleTasks();
							}, 300); 
						}}/>
					<Button style="search" type="button" onclick={() => { clearTimeout(searchTimeout); searchTimeout = setTimeout(() => { currentPage = 1; updateVisibleTasks(); }, 10); }}>
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</Button>
				</div>
			</div>
		</div>
		<div class="flex w-full h-[90%]">
			<div id="griditems" class="grid grid-cols-1 grid-flow-row w-full h-full gap-7">
				{#if !pageLoaded}
					<div class="flex w-full h-full items-center justify-center text-[var(--font-green)]">
						Loading Modules
					</div>
				{:else if visibleTasks.length > 0 || (!searchQuery && selectedFilter == "All")}
					{#each visibleTasks as item}
						<div class="scroll-card flex w-full rounded-3xl gap-2 border-2 border-gray-100">
							<div
								class="flex h-full w-[45%] border-r border-gray-200 rounded-l-3xl rounded-r-none"
								style={`background: ${item.imageUrl ? `url('${item.imageUrl}') center/cover no-repeat` : 'var(--font-green)'}`}
							></div>
							<div class="flex h-full w-[55%] p-2 pr-5">
								<div class="flex flex-col w-full h-full rounded-3xl gap-3">
									<Heading style="modules-title">{item.title}</Heading>
									<div class="flex flex-col w-full h-full gap-1">
										<div class="flex gap-2 items-center mt-4">
											<FontAwesomeIcon icon = {faChartSimple} class = "text-[var(--font-green)]"/>
											<Paragraph style="modules-content">{ 'leader' in item ? item.leader : 'Project Leader' }</Paragraph>
										</div>
										<div class="flex gap-1 items-center">
											<FontAwesomeIcon icon = {faGraduationCap} class = "text-[var(--font-green)]"/>
											<Paragraph style="modules-content">{item.numParticipants}</Paragraph>
										</div>
										<div class="flex gap-2 items-center">
											<FontAwesomeIcon icon = {faFile} class = "text-[var(--font-green)]"/>
											<Paragraph style="modules-content">{data.training.find(t => t.id === item.trainingId)?.type ?? 'Unknown'}</Paragraph>
										</div>
										<div class="flex gap-2">
											<div class="flex items-center gap-2">
												<FontAwesomeIcon icon={faClock} class="text-[var(--font-green)]" />
												<Paragraph style="modules-content">{handleDate(item.dateStart)}</Paragraph>
											</div>
											<div class="flex items-center gap-2">
												-
												<Paragraph style="modules-content">{handleDate(item.dateEnd)}</Paragraph>
											</div>
										</div>
									</div>
									<div class="relative flex w-full h-full border-t border-gray-200 justify-center items-center">
										<Button style="modules-view-more" onclick={() => openItem(item.id.toString())}>View More</Button>
									</div>
								</div>
							</div>		
						</div>
					{/each}
					{#if !searchQuery && selectedFilter == "All"}
						<div role="button" tabindex="0" aria-label="add module" onclick={() => showModal=true} 
							onkeydown={(e) => { e.preventDefault(); if (e.key === 'Enter' || e.key === 'Escape') showModal = true; }} 
							class="flex w-full p-20 justify-center items-center gap-4 scroll-card cursor-pointer rounded-3xl 
								border-dashed border-2 border-gray-400 text-gray-400 hover:border-[var(--font-green)] hover:text-[var(--font-green)] 
								hover:tracking-wide transition-all duration-300 ease-in-out">
							<FontAwesomeIcon icon={faPlusCircle} size="2x"/>
							<Heading type="h4" addStyle="text-inherit">Add Training Module</Heading>
						</div>
					{/if}
				{:else}
					<div class="flex flex-col w-full h-full justify-center items-center text-center text-gray-500 gap-4 py-26">
						<FontAwesomeIcon icon={faFileCircleExclamation} class="text-5xl text-[var(--font-green)]" />
						<Paragraph style="modules-not-found">No Training Modules currently available</Paragraph>
					</div>
				{/if}
			</div>
		</div>
		<!-- Fix pagination once data storage is available -->
		<div id="buttons" class="flex w-full flex-grow justify-center items-center">
			<div class="flex-grow"></div>
			<div class="grid grid-rows-1 grid-flow-col h-full gap-9">
					<button class="flex w-10 h-10 justify-center items-center p-1 rounded-full 
					{currentPage <= 1 ? 'pointer-events-none' : 'hover:scale-110 transition duration-300 ease-in-out'}"
					onclick={() => goToPage(currentPage - 1)}
					><FontAwesomeIcon icon={faAngleLeft} /></button>
				{#each pageButtons as page} 
					<button class="flex w-10 h-10 justify-center items-center p-1 rounded-full border border-black 
					{page === currentPage ? 'selectedButton' : 'button'}"
					onclick={() => goToPage(page)}
					>{page}</button>
				{/each}
					<button class="flex w-10 h-10 justify-center items-center p-1 rounded-full
					{currentPage >= totalPages ? 'pointer-events-none' : 'hover:scale-110 transition duration-300 ease-in-out'}"
					onclick={() => goToPage(currentPage + 1)}
					><FontAwesomeIcon icon={faAngleRight} /></button>
			</div>
			<div class="flex-grow"></div>
		</div>

	</div>
</div>
{/if}

<style>
	.button {
		transition: transform 0.3s ease;
	}

	.button:hover {
		transform: scale(1.02);
	}

	.button:active {
		transform: scale(0.98);
	}

	.selectedButton {
		background-color: #1B663E;
		color: white;
		border-color: white;
		transition: transform 0.3s ease, color 0.3s ease;
	}

	.selectedButton:hover {
		background-color: #1c7747;
		transform: scale(1.02);
	}

	.selectedButton:active {
		transform: scale(0.98);
	}

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