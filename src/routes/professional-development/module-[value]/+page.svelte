<script lang="ts">
    import type { PageProps } from './$types';
    import '@fortawesome/fontawesome-svg-core/styles.css';
	import { faChartSimple, faGraduationCap, faFile, faClock} from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
    import type { Training } from '@prisma/client';
	import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

	import Tab from '$lib/svelte/professional-development/Tab.svelte';
	import TabContent from '$lib/svelte/professional-development/TabContent.svelte';
	import GenerateContent from '$lib/svelte/professional-development/GenerateContent.svelte';
	import type { TabInterface } from '$lib/functions/tab-content'
	import tabContentJSON from '$lib/data/tab-content.json'
	import Input from '$lib/svelte/Input.svelte';
	import Button from '$lib/svelte/Button.svelte';
	import Select from '$lib/svelte/Select.svelte';

	import { getData, deleteData } from '$lib/functions/database';
    
	let editable: boolean = $state(false)
	let editBanner: boolean = $state(false)
	let tabs: string[] = $state(['Overview', 'Participants', 'Personnel', 'Highlights', 'Evaluation', 'Appendix'])
	let activeTab: string = $state(tabs[0])
	let tabContent: TabInterface = $state(tabContentJSON)
	let accountsPromise = $state()
	let allAccounts: Array<string> = $state([])
	let allTraining: Array<string> = $state(['Online', 'Hybrid', 'Face-to-Face'])

	let moduleDate: string = $state('')
	let leader: string = $state('')
    
    let training: Training[] = $state([]);
    let { data }: PageProps = $props();
	let pageLoaded = $state(false)

	onMount(async () => {
		if (!data || !data.selectedItem) return;

		let temp = []
		training = data.training;	
		moduleDate = data.selectedItem.date ?? ''
		leader = data.selectedItem.leader ?? ''
		accountsPromise = await getData('account').then((v: Array<any>) => {	for(let i = 0; i < v.length; i++) allAccounts[i] = v[i].acctName	})
		tabContent = await updateTabContent(data.selectedItem.id);
		pageLoaded = true
	});

	function handleDate(date: string) {
		return new Date(date).toLocaleDateString('en-PH', {
			year: 'numeric', month: 'long', day: 'numeric'
		})
	}
	
	async function updateTabContent(id: number | string){
		if(!data.selectedItem) return;

		let item = await getData('pd', fetch, data.selectedItem.id);

		if (!item?.content) return tabContentJSON;	// Return defaults if database is empty
		return item.content;						// Return the items inside database

	}

	async function deleteModule(id: number | undefined = undefined) {
		const confirmed = confirm('Are you sure you want to delete this module?');
		if (!confirmed) return;

		try {
			if(id) {
				let isDeleted = await deleteData('pd', id);
				if (isDeleted) {
					alert('Module deleted successfully!');
					window.location.href = '/professional-development'
				} 
			}
		} catch (error) {
			console.error('Delete failed:', error);
			alert('An error occurred during deletion.');
		}
	}


	let canEdit = data.user?.permission?.includes('can_edit');

</script>

<svelte:head>
	{#if data.selectedItem}
		<title>{data.name} | {data.selectedItem.id}</title>
	{/if}
</svelte:head>

{#if data.selectedItem}
<div class="flex flex-col w-full min-h-[calc(100dvh-120px)] mt-[120px] items-center">
	<div class="flex flex-col justify-center w-full h-[245px] bg-cover bg-center bg-no-reoeat text-white px-6 py-4 mb-10 bg-[#1B663E]">
	<!-- <div class="flex flex-col justify-center w-full h-[245px] bg-cover bg-center bg-no-reoeat text-white px-6 py-4 mb-10" style="{data.selectedItem.imageUrl ? `background-image: url(${data.selectedItem.imageUrl})` : 'background-color: #1B663E;'}"> -->
		<!-- Progress Bar -->
		<!-- This is still fixed -->
		{#if !pageLoaded}
			<div class="flex items-center text-lg text-white">
				Loading Contents
			</div>
		{:else}
			<div class="flex items-center gap-3 text-sm font-light text-yellow-400 mb-2">
				<p class="text-sm font-semibold">23 of 50</p>
				<div class="relative w-40 h-[6px] bg-gray-200 rounded-full overflow-hidden">
					<div class="absolute top-0 left-0 h-full bg-yellow-500" style="width: 46%"></div>
				</div>
			</div>

			<div class="flex-row w-full">
				<!-- div.flex.flex-row. -->
				<!-- Page title -->
				<!-- This is still fixed -->
				<Input style="module-title" bind:text={data.selectedItem.title} disabled={!editBanner} addStyle={editBanner? "border-[0px_0px_2px_0px] border-white focus:ring-0": ""} />

				<!-- Metadata icons -->
				<div class="flex flex-wrap items-center gap-6 mt-8 text-sm text-white">
					<div class="flex items-center gap-2">
						<FontAwesomeIcon icon={faGraduationCap} class="text-yellow-400" />
						<!-- This is still fixed -->
						Participants:<span hidden={editBanner}>{data.selectedItem.numParticipants}</span> 
						<Input disabled={!editBanner} hidden={!editBanner} type="number" style="module-details" bind:text={data.selectedItem.numParticipants} addStyle={editBanner? "border-[0px_0px_2px_0px] border-white focus:ring-0": ""}/>
					</div>
					<div class="flex items-center gap-2">
						<FontAwesomeIcon icon={faChartSimple} class="text-yellow-400" />
						<span hidden={editBanner}>{data.selectedItem.leader}</span>
						<Select disabled={!editBanner} hidden={!editBanner} bind:options={allAccounts} bind:selected={leader} addStyle={editBanner? "border-[0px_0px_2px_0px] border-white" : "border-0"} />
					</div>
					<div class="flex items-center gap-2">
						<FontAwesomeIcon icon={faFile} class="text-yellow-400" />
						<span hidden={editBanner}>{training.find(t => t.id === data?.selectedItem?.trainingId)?.type}</span>
						<Select disabled={!editBanner} hidden={!editBanner} bind:options={allTraining} bind:selected={data.selectedItem.trainingId} addStyle={editBanner? "border-[0px_0px_2px_0px] border-white" : "border-0"} />
					</div>
					<div class="flex items-center gap-2">
						<FontAwesomeIcon icon={faClock} class="text-yellow-400" />
						<span hidden={editBanner}>{handleDate(data.selectedItem.date)}</span>
						<Input disabled={!editBanner} hidden={!editBanner} type="date" style="module-details" bind:text={moduleDate} addStyle={editBanner? "border-[0px_0px_2px_0px] border-white focus:ring-0": ""}/>
						<!-- <input type="date" value="{data.selectedItem.trainingId}"/> -->
					</div>
				</div>
			</div>

			<!-- Editor Toggle Button -->
			<div class="{canEdit ? 'flex' : 'hidden'} flex flex-row w-full gap-2 mt-4 items-center justify-between">
				<div class="flex items-center w-22 h-5.5 px-1 rounded-full transition-colors duration-300 ease-in-out" class:bg-green-300={editBanner} class:bg-red-300={!editBanner}>
					<Button style="editor-mode" onclick={() => editBanner = !editBanner} addStyle={editBanner? 'translate-x-4 bg-green-500': 'bg-red-500'}>
						<div class="w-full h-full flex items-center justify-center text-[8px] font-bold text-white">
							{editBanner ? 'EDITOR ON' : 'EDITOR OFF'}
						</div>
					</Button>
				</div>
				<Button style="delete" onclick={() => deleteModule(data?.selectedItem?.id)} addStyle={editBanner? 'opacity-100 shadow-lg w-[150px]': 'opacity-0 w-0'}>
					<div class="w-full h-full flex items-center justify-center text-[12px] font-bold overflow-hidden whitespace-nowrap"> 
						DELETE MODULE
					</div>
				</Button>
			</div>
		{/if}
	</div>

	<!-- Content Area -->
	<div class="flex w-full justify-center px-4 flex-col items-center gap-10">
		<div class="flex flex-col w-full max-w-[900px]">
			<!-- Tabs + Content Box -->
			<div class=" bg-white border border-black/10 rounded-xl shadow-sm overflow-hidden">
				<!-- Tabs -->
				<Tab tabs={tabs} bind:activeTab/>

				<!-- Tab Content -->
				{#if !pageLoaded}
					<div class="p-4 text-[15px] text-gray-800 leading-relaxed bg-[#F7F7F7] text-center">
						Loading Contents
					</div>
				{:else}
					<TabContent item={data} activeTab={activeTab} bind:tabContent bind:editable/>
				{/if}
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

</style>