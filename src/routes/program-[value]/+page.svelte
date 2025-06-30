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

	import Tab from '$lib/svelte/professional-development/Tab.svelte';
	import TabContent from '$lib/svelte/professional-development/TabContent.svelte';
	import GenerateContent from '$lib/svelte/professional-development/GenerateContent.svelte';
	import type { TabInterface } from '$lib/functions/tab-content'
	import tabContentJSON from '$lib/data/tab-content.json'

	import type { Training } from '@prisma/client';
	import { getData, addData } from '$lib/functions/database';

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
		if ($currentModule !== data.program) {
			$currentModule = data.program;
		}
		if ($selectedModuleItem !== data.selectedItem) {
			$selectedModuleItem = data.selectedItem;
		}
		if (!$selectedModuleItem) {
			setTimeout(() => observer_func(), 0);
		}
	});

	let training: Training[] = $state([]);
	onMount(async () => {
		console.log(data);
		if (!$selectedModuleItem) observer_func();
		training = await getData('pd/training');
	})

	function open_item(id:string) {
		goto(`?itemId=${id}`);
	}

	let editable: boolean = $state(false)
	let tabs: string[] = $state(['Overview', 'Participants', 'Personnel', 'Highlights', 'Evaluation', 'Appendix'])
	let activeTab: string = $state(tabs[0])
	let tabContent: TabInterface = $state(tabContentJSON)

	let showModal: boolean = $state(false);

	let title: string = $state('');
	let leader: string = $state('');
	let numParticipants: number | '' = $state('');
	let trainingId: number = $state(0);
	let date: string = $state('');
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
	
		item['numParticipants'] = parseInt(item['numParticipants']);
		item['trainingId'] = parseInt(item['trainingId']);
		item['programId'] = parseInt(data.programId);

		if (Object.values(item).some(value => !value)) {
			alert("Please fill in all required fields");
		}

		item['imageUrl'] = imageUrl;

		let result = await addData('pd', item);
		if(result.ok) {
			form.reset();
			window.location.reload();
			// showModal = false;
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
</script>

<svelte:head>
	<title>{data.program.name}</title> 
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
				<input type="text" bind:value={title} name="title" class={inputClass} />
			</div>

			<div class={fieldClass}>
				<label class={labelClass} for="leader">Project Leader<span class="text-red-500"> *</span></label>
				<input type="text" bind:value={leader} name="leader" class={inputClass} />
			</div>

			<div class={fieldClass}>
				<label class={labelClass} for="numParticipants">Number of Participants<span class="text-red-500"> *</span></label>
				<input type="number" bind:value={numParticipants} name="numParticipants" class={inputClass} />
			</div>

			<div class={fieldClass}>
				<label class={labelClass} for="trainingId">Type of Training<span class="text-red-500"> *</span></label>
				<select bind:value={trainingId} name="trainingId" class={inputClass}>
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
				<input type="date" bind:value={date} name="date" class={inputClass} />
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
					{#each data.program.items as item}
						<div class="scroll-card opacity-0 flex w-full rounded-3xl gap-2 border-2 border-gray-100">
							<div
								class="flex h-full w-[45%] border-r border-gray-200 rounded-l-3xl rounded-r-none"
								style={`background: ${item.imageUrl ? `url('${item.imageUrl}') center/cover no-repeat` : 'var(--font-green)'}`}
							></div>
							<div class="flex h-full flex-grow p-2 pr-5">
								<div class="flex flex-col w-full h-full rounded-3xl gap-2">
									<h1 class="text-lg font-semibold">{item.title}</h1>
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
			<button onclick={() => showModal = true} class="w-full bg-[#185A37] text-white rounded-xl p-2 mt-4 transition duration-300 ease-in-out hover:bg-[#146e47] hover:scale-[1.01]">
				Add Training Module
			</button>

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
			{data.selectedItem.title}
		</h1>

		<!-- Metadata icons -->
		<div class="flex flex-wrap items-center gap-6 mt-8 text-sm text-white">
			<div class="flex items-center gap-2">
				<FontAwesomeIcon icon={faGraduationCap} class="text-yellow-400" />
				<!-- This is still fixed -->
				<span>Participants: {data.selectedItem.numParticipants}</span>
			</div>
			<div class="flex items-center gap-2">
				<FontAwesomeIcon icon={faChartSimple} class="text-yellow-400" />
				<!-- This is still fixed -->
				<span>{data.selectedItem.leader}</span>
			</div>
			<div class="flex items-center gap-2">
				<FontAwesomeIcon icon={faFile} class="text-yellow-400" />
				<!-- This is still fixed -->
				<span>{training.find(t => t.id === data.selectedItem.trainingId)?.type}</span>
			</div>
			<div class="flex items-center gap-2">
				<FontAwesomeIcon icon={faClock} class="text-yellow-400" />
				<!-- This is still fixed -->
				<span>{handleDate(data.selectedItem.date)}</span>
			</div>
		</div>
	</div>

	<!-- Content Area -->
	<div class="flex w-full justify-center px-4 flex-col items-center gap-10">
		<div class="flex flex-col w-full max-w-[900px]">
			<!-- Tabs + Content Box -->
			<div class=" bg-white border border-black/10 rounded-xl shadow-sm overflow-hidden">
				<!-- Tabs -->
				<Tab tabs={tabs} bind:activeTab/>
		<div class="flex flex-col w-full max-w-[900px]">
			<!-- Tabs + Content Box -->
			<div class=" bg-white border border-black/10 rounded-xl shadow-sm overflow-hidden">
				<!-- Tabs -->
				<Tab tabs={tabs} bind:activeTab/>

				<!-- Tab Content -->
				<TabContent user={data.user} bind:tabContent bind:editable/>
			</div>
			<div>
				<GenerateContent bind:tabContent />
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