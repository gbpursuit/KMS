<script lang="ts">
    import '@fortawesome/fontawesome-svg-core/styles.css';
    import type { PageProps } from './$types';
    import { onMount } from 'svelte';
	import Tab from '$lib/svelte/professional-development/Tab.svelte';
	import TabContent from '$lib/svelte/professional-development/TabContent.svelte';
	import GenerateContent from '$lib/svelte/professional-development/GenerateContent.svelte';
	import type { TabInterface } from '$lib/functions/tab-content'
	import tabContentJSON from '$lib/data/tab-content.json'

	import { getData } from '$lib/functions/database';
	import HeroBanner from '$lib/svelte/professional-development/HeroBanner.svelte';
	
    let { data }: PageProps = $props();
	let pageLoaded = $state(false)
    
	let tabs: string[] = $state(['Overview', 'Participants', 'Personnel', 'Highlights', 'Evaluation', 'Appendix'])
	let activeTab: string = $state('Overview')
	let tabContent: TabInterface = $state(tabContentJSON)
	let canEdit = $state(data.user?.permission?.includes('can_edit'))

	let recentlyEdited: boolean = $state(false)
	let recentlySaved: boolean = $state(false)

	let item = $state({ id: -1, title: '', leader: '', numParticipants: -1, training: [{}], trainingId: -1, date: ''})

	onMount(async () => {
		if (!data || !data.selectedItem) return;

		item.id = data.selectedItem.id
		item.title = data.selectedItem.title
		item.training = data.training
		item.leader = data.selectedItem.leader
		item.numParticipants = data.selectedItem.numParticipants
		item.trainingId = data.selectedItem.trainingId
		item.date = data.selectedItem.date

		tabContent = await updateTabContent(data.selectedItem.id);
		pageLoaded = true
	});

	
	$effect(() => {
		if (!data || !data.selectedItem) return;

		if(data.selectedItem.title != item.title) data.selectedItem.title = item.title
		if(data.selectedItem.leader != item.leader) data.selectedItem.leader = item.leader
		if(data.selectedItem.date != item.date) data.selectedItem.date = item.date
		if(data.selectedItem.trainingId != item.trainingId) data.selectedItem.trainingId = item.trainingId
		if(data.selectedItem.numParticipants != item.numParticipants) data.selectedItem.numParticipants = item.numParticipants
	})

	function handleDate(date: string) {
		return new Date(date).toLocaleDateString('en-PH', {
			year: 'numeric', month: 'long', day: 'numeric'
		})
	}
	
	async function updateTabContent(id: number | string){
		if(!data.selectedItem) return;

		let temp = await getData('pd', fetch, data.selectedItem.id);

		if (!temp?.content) return tabContentJSON;	// Return defaults if database is empty
		return temp.content;						// Return the items inside database

	}

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
			<HeroBanner bind:item bind:canEdit />
		{/if}
	</div>

	<!-- Content Area -->
	<div class="flex w-full justify-center px-4 flex-col items-center gap-10 mb-10">
		<div class="flex flex-col w-full max-w-[900px]">
			<!-- Tabs + Content Box -->
			<div class=" bg-white border border-black/10 rounded-xl shadow-sm overflow-hidden">
				<!-- Tabs -->
				<Tab bind:tabs bind:activeTab/>

				<!-- Tab Content -->
				{#if !pageLoaded}
					<div class="p-4 text-[15px] text-gray-800 leading-relaxed bg-[#F7F7F7] text-center">
						Loading Contents
					</div>
				{:else}
					<TabContent bind:activeTab data={data} bind:item bind:tabContent bind:recentlyEdited bind:recentlySaved/>
				{/if}
			</div>
			<div>
				<GenerateContent bind:tabContent bind:selectedItem = {data.selectedItem} bind:training = {data.training}/>
			</div>
		</div>

		<!-- Comment Section -->
		<!-- <div class="w-full max-w-[900px] px-6">
			<h3 class="font-semibold mb-1">Leave A Comment</h3>
			<p class="text-sm text-gray-600 mb-4">Let us know your thoughts about the Module.</p>

			<form class="flex flex-col gap-3">
				<input type="text" placeholder="Name*" class="p-2 border border-gray-300 rounded" />
				<textarea placeholder="Comment" rows="4" class="p-2 border border-gray-300 rounded min-h-[45px] max-h-[300px]"></textarea>
				<button type="submit" class="w-max px-5 py-2 bg-orange-400 text-white rounded hover:bg-[#FF782D] transition mb-5">
					Post Comment
				</button>
			</form>
		</div> -->
	</div>
</div>
{/if}

<style>

</style>