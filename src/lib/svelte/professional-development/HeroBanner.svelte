<script lang="ts">
	import Input from "../Input.svelte";
	import Select from "../Select.svelte";
	import Button from "../Button.svelte";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
	import { faChartSimple, faClock, faFile, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
	import { onMount } from "svelte";
	import { deleteData, getData } from "$lib/functions/database";
    import { VIEW_CLIENT } from '$lib/functions/env';

    let { item = $bindable(), canEdit = $bindable(), allAccounts = $bindable() } = $props()

	let allTraining: Array<string> = $state([])
    let editable: boolean = $state(false)

    let rawToken: any;

    let pageLoaded = $state(false)

    onMount(async() => {
        rawToken = VIEW_CLIENT;

        let error: any | null = null

        error = await getData(rawToken, 'pd/training').then((v: Array<any>) => { for(let i = 0; i < v.length; i++) allTraining[i] = v[i].type })
        if(error) console.error('Error: Failed to get all training types', error)
        
        pageLoaded = true;

        let savedEditorState = localStorage.getItem('editor-banner');
        editable = savedEditorState === 'true';
    })

	function handleDate(date: string) {
		return new Date(date).toLocaleDateString('en-PH', {
			year: 'numeric', month: 'long', day: 'numeric'
		})
    }
    
	async function deleteModule(id: number | undefined = undefined) {
		const confirmed = confirm('Are you sure you want to delete this module?');
		if (!confirmed) return;

		try {
			if(id) {
				let isDeleted = await deleteData(rawToken, 'pd', id);
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

    async function toggleMode() {
        editable = !editable;
        localStorage.setItem('editor-banner', editable.toString());
    }

</script>

{#if pageLoaded}

<div class="flex-row w-full">
    <!-- Page title -->
    <Input style="module-title" bind:text={item.title} disabled={!editable} addStyle={editable? "border-[0px_0px_2px_0px] border-white focus:ring-0": ""} />

    <!-- Metadata icons -->
    <div class="flex flex-wrap items-center gap-6 mt-8 text-sm text-white">
        <div class="flex items-center gap-2">
            <FontAwesomeIcon icon={faGraduationCap} class="text-yellow-400" />
            Participants:<span hidden={editable}>{item.numParticipants}</span> 
            <Input disabled={!editable} hidden={!editable} type="number" style="module-details" bind:text={item.numParticipants} addStyle={editable? "border-[0px_0px_2px_0px] border-white focus:ring-0": ""}/>
        </div>
        <div class="flex items-center gap-2">
            <FontAwesomeIcon icon={faChartSimple} class="text-yellow-400" />
            <span hidden={editable}>{item.leader}</span>
            <Select disabled={!editable} hidden={!editable} options={allAccounts} bind:selected={item.leader} addStyle={editable? "border-[0px_0px_2px_0px] border-white" : "border-0"} />
        </div>
        <div class="flex items-center gap-2">
            <FontAwesomeIcon icon={faFile} class="text-yellow-400" />
            <span hidden={editable}>{item.training.find((t: { id: any; }) => t.id === item.trainingId)?.type}</span>
            <Select disabled={!editable} hidden={!editable} options={allTraining} bind:value={item.trainingId} addStyle={editable? "border-[0px_0px_2px_0px] border-white" : "border-0"} />
        </div>
        <div class="flex gap-2">
            <div class="flex items-center gap-2">
                <FontAwesomeIcon icon={faClock} class="text-yellow-400" />
                <span hidden={editable}>{handleDate(item.dateStart)}</span>
                <Input disabled={!editable} inverted hidden={!editable} type="date" style="module-details" bind:text={item.dateStart} addStyle={editable? "border-[0px_0px_2px_0px] border-white focus:ring-0": ""}/>
            </div>
            <div class="flex items-center gap-2">
                -
                <span hidden={editable}>{handleDate(item.dateEnd)}</span>
                <Input disabled={!editable} inverted hidden={!editable} type="date" style="module-details" bind:text={item.dateEnd} addStyle={editable? "border-[0px_0px_2px_0px] border-white focus:ring-0": ""}/>
            </div>
        </div>
    </div>
</div>

<!-- Editor Toggle Button -->
<div class="{canEdit ? 'flex' : 'hidden'} flex flex-row w-full gap-2 mt-4 items-center justify-between">
    <div class="flex items-center w-22 h-5.5 px-1 rounded-full transition-colors duration-300 ease-in-out" class:bg-green-300={editable} class:bg-red-300={!editable}>
        <Button style="editor-mode" onclick={toggleMode} addStyle={editable? 'translate-x-4 bg-green-500': 'bg-red-500'}>
            <div class="w-full h-full flex items-center justify-center text-[8px] font-bold text-white">
                {editable ? 'EDITOR ON' : 'EDITOR OFF'}
            </div>
        </Button>
    </div>
    <Button style="delete" onclick={() => deleteModule(item.id)} addStyle={editable? 'opacity-100 shadow-lg w-[150px]': 'opacity-0 w-0'}>
        <div class="w-full h-full flex items-center justify-center text-[12px] font-bold overflow-hidden whitespace-nowrap"> 
            DELETE MODULE
        </div>
    </Button>
</div>
{/if}