<script lang="ts">
    import '@fortawesome/fontawesome-svg-core/styles.css';
    import { faFileCircleExclamation, faFolderMinus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'; 
	import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
	import { faChartSimple, faGraduationCap, faFile, faClock} from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

	import { onMount, tick } from 'svelte';

	import { currentModule, selectedModuleItem } from '$lib/functions/module';
	import type { PageProps } from './$types';

	import type { Training } from '@prisma/client';
	import { smoothScrollTo } from '$lib/functions/function';
	import { addData, addImageData } from '$lib/functions/database';

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

	let training: Training[] = $state([]);
	$effect(() => {
		if($currentModule !== data.pd) currentModule.set(data.pd);
		if ($selectedModuleItem !== data.selectedItem) selectedModuleItem.set(data.selectedItem);
		// if (!$selectedModuleItem) setTimeout(() => observer_func(), 0);
	});

	onMount(() => {
		training = data.training;
	});


	function open_item(id:string) {
		let url = new URL(window.location.href);
		// console.log('hi');
		window.location.href = `${url}/module-${id}`;
	}

	let tabs: string[] = $state(['Overview', 'Participants', 'Personnel', 'Highlights', 'Evaluation', 'Appendix'])

	let showModal: boolean = $state(false);
	let imageUrl: File | null = null;

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

		if (Object.values(item).some(value => !value)) {
			alert("Please fill in all required fields");
		}

		let PATH = await addImageData(imageUrl, item.leader);
		item.imageUrl = PATH;

		let result = await addData('pd', item);
		if(result.ok) {
			form.reset();
			imageUrl = null;
			window.location.reload();
		} else {
			throw new Error(result.result.error);
		}
	}

	const inputClass = "transition-all duration-300 outline-none border-2 border-[#1B663E] shadow-[0px_4px_2px_0px_#1B663E] px-3 py-2 rounded text-sm text-black focus:translate-y-1 focus:shadow-[0px_2px_0px_0px_#1B663E]";
	const labelClass = "font-semibold text-[#0C2D1C]";
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
	let visibleTasks: any[] = $state([]);
	let pageButtons: number[] = $state([]);
	let selectedFilter = $state('All');
	let filterOptions = $state(['All', 'Online', 'Face-to-Face', 'Hybrid']);

	$effect(() => {
		if(!data.selectedItem) {
			totalPages = Math.max(1, Math.ceil(data.pd.items.length / tasksPerPage));

			if (currentPage > totalPages) currentPage = totalPages;
			if (currentPage < 1) currentPage = 1;

			startIndex = (currentPage - 1) * tasksPerPage;
			endIndex = startIndex + tasksPerPage;
			visibleTasks = data.pd.items.slice(startIndex, endIndex);

			pageButtons = getPageButtons(currentPage, totalPages);
		}
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

{#if showModal}
	<!-- Backdrop -->
	<div role="button" tabindex="0" aria-label="Close modal"
		class="fixed inset-0 bg-[#030B07]/70 z-40 transition-opacity duration-300 ease-in-out"
		onclick={() => showModal = false}
		onkeydown={(e) => { if (e.key === 'Enter' || e.key === 'Escape') showModal = false; }}
	></div>

	<!-- Modal -->
	<div class="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl border-2 border-[#1B663E] shadow-[0px_4px_1px_0px_#1B663E] w-[85%] max-w-xl px-10 py-10 transition-all duration-300 ease-in-out">
		<h2 class="text-2xl font-extrabold text-center text-[#185A37] mb-1 transition-colors duration-300">Add Training Module</h2>
		<p class="text-sm text-center font-semibold text-[#1B663E] mb-4 transition-opacity duration-300">Complete the form below</p>
		<div class="h-[1px] bg-[#002e14] mb-6"></div>
 
		<form class="flex flex-col gap-5" onsubmit={handleSubmit}>
			<div class={fieldClass}>
				<label class={labelClass} for="title">Title<span class="text-red-500"> *</span></label>
				<input type="text" name="title" class={inputClass} />
			</div>

			<div class={fieldClass}>
				<label class={labelClass} for="leader">Project Leader<span class="text-red-500"> *</span></label>
				<input type="text" name="leader" class={inputClass} />
			</div>

			<div class={fieldClass}>
				<label class={labelClass} for="numParticipants">Number of Participants<span class="text-red-500"> *</span></label>
				<input type="number" name="numParticipants" class={inputClass} />
			</div>

			<div class={fieldClass}>
				<label class={labelClass} for="trainingId">Type of Training<span class="text-red-500"> *</span></label>
				<select name="trainingId" class={inputClass}>
					<option value="" disabled selected>Select training type</option>
					{#each training as t}
					<option value={t.id}>{t.type}</option>
					{/each}
				</select>
			</div>
			<!-- <div class={fieldClass}>
				<label class={labelClass} for="trainingType">Type of Training<span class="text-red-500"> *</span></label>
				<input type="text" bind:value={trainingType} class={inputClass} />
			</div> -->

			<div class={fieldClass}>
				<label class={labelClass} for="date">Date<span class="text-red-500"> *</span></label>
				<input type="date" name="date" class={inputClass} />
			</div>

			<div class={fieldClass}>
				<label class={labelClass} for="imageUrl">Upload Image</label>
				<input type="file" accept="image/*" onchange={handleFileChange}
					class="file:border-0 file:py-2 file:px-4 file:rounded file:bg-[#1B663E] file:text-white file:font-semibold text-sm transition-all duration-300" />
			</div>

			<div class="flex justify-end gap-3 pt-4">
				<button type="button" onclick={() => showModal = false}
					class="bg-[#AFAFAF] text-black font-semibold px-4 py-2 rounded-lg hover:bg-[#999999] transition-all duration-200">Cancel</button>
				<button type="submit"
					class="bg-[#185A37] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#0C2D1C] transition-all duration-200">Submit</button>
			</div>
		</form>
	</div>
{/if}

{#if !data.selectedItem}
<div class="flex flex-col w-full min-h-[calc(100dvh-120px)] mt-[120px] justify-center items-center">
	<div class="flex flex-col w-[65%] flex-grow gap-10 py-20">
		<div class="flex w-full items-center justify-between border-b-2 border-[var(--font-green)]/20 pb-4">
			<!-- Title -->
			<h1 class="text-4xl font-semibold text-[var(--font-green)]">All Training Modules</h1>

			<div class="flex-grow"></div>

			<!-- Filter + Search Row -->
			<div class="flex items-center gap-3">
				<!-- Filter Dropdown -->
				<div class="relative">
					<select
						bind:value={selectedFilter}
						class="text-sm py-3 px-3 w-[120px] border border-[var(--font-green)] rounded-full text-[var(--font-green)] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--font-green)] transition duration-200"
					>
						{#each filterOptions as option}
							<option value={option}>{option}</option>
						{/each}
					</select>
				</div>

				<!-- Search Bar -->
				<div class="flex items-center gap-2 px-3 py-1 border border-[var(--font-green)] rounded-full shadow-sm bg-white transition duration-200 focus-within:ring-2 focus-within:ring-[var(--font-green)]">
					<input type="text" placeholder="Search modules..." class="w-[23ch] text-sm text-black placeholder-gray-400 bg-transparent border-none focus:outline-none focus:ring-0">
					<button type="button" class="flex justify-center items-center text-[var(--font-green)] hover:scale-110 transition-transform duration-200">
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</button>
				</div>
			</div>
		</div>
		<div class="flex w-full h-[90%]">
			<div id="griditems" class="grid grid-cols-1 grid-flow-row w-full h-full gap-7">
				{#if visibleTasks.length > 0}
					{#each visibleTasks as item}
						<div class="scroll-card flex w-full rounded-3xl gap-2 border-2 border-gray-100">
							<div
								class="flex h-full w-[45%] border-r border-gray-200 rounded-l-3xl rounded-r-none"
								style={`background: ${item.imageUrl ? `url('${item.imageUrl}') center/cover no-repeat` : 'var(--font-green)'}`}
							></div>
							<div class="flex h-full w-[55%] p-2 pr-5">
								<div class="flex flex-col w-full h-full rounded-3xl gap-2">
									<h1 class="text-lg font-semibold ">{item.title}</h1>
									<div class="flex flex-col w-full h-full gap-1">
										<div class="flex gap-2 items-center">
											<p class = "font-light text-sm">Module Completeness</p>
										</div>
										<div class="flex gap-2 items-center">
											<FontAwesomeIcon icon = {faChartSimple} class = "text-[var(--font-green)]"/>
											<p class="font-light text-sm">{ 'leader' in item ? item.leader : 'Project Leader' }</p>
										</div>
										<div class="flex gap-1 items-center">
											<FontAwesomeIcon icon = {faGraduationCap} class = "text-[var(--font-green)]"/>
											<p class="font-light text-sm">{item.numParticipants}</p>
										</div>
										<div class="flex gap-2 items-center">
											<FontAwesomeIcon icon = {faFile} class = "text-[var(--font-green)]"/>
											<p class="font-light text-sm">
												{training.find(t => t.id === item.trainingId)?.type ?? 'Unknown'}
											</p>
										</div>
										<div class="flex gap-2 items-center">
											<FontAwesomeIcon icon = {faClock} class = "text-[var(--font-green)]"/>
											<p class="font-light text-sm">{handleDate(item.date)}</p>
										</div>
									</div>
									<div class="relative flex w-full h-full border-t border-gray-200 justify-center items-center">
										<button class="flex h-full p-1 font-medium hover:text-[var(--font-green)] hover:tracking-wide transition-all duration-300 ease-in-out cursor-pointer"
										onclick={() => open_item(item.id.toString())}
										>View More</button>
									</div>
								</div>
							</div>		
						</div>
					{/each}
				{:else}
					<div class="flex flex-col w-full h-full justify-center items-center text-center text-gray-500 gap-4 py-26">
						<FontAwesomeIcon icon={faFileCircleExclamation} class="text-5xl text-[var(--font-green)]" />
						<p class="text-xl font-medium">No training modules currently available</p>
						<p class="text-sm text-gray-400">Please add a new module using the button below</p>
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
		<button onclick={() => showModal = true} class="w-full bg-[#185A37] text-white rounded-xl p-2 mt-4 transition duration-300 ease-in-out hover:bg-[#146e47] hover:scale-[1.01]">
			Add Training Module
		</button>

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