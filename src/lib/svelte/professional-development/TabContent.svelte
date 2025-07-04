<script lang="ts">
	import { writable, type Writable } from "svelte/store";
	import Button from "../Button.svelte";
	import Paragraph from "../Paragraph.svelte";
	import type { TabInterface } from "$lib/functions/tab-content";
	import ActiveTab from "./ActiveTab.svelte";
    import Heading from '$lib/svelte/Heading.svelte';
    import { type User } from '$lib/functions/module';
    import { getData, addContent } from '$lib/functions/database';
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

    let { activeTab, editable = $bindable(false), tabContent = $bindable(), item }: { activeTab: string, editable?: boolean, tabContent: TabInterface, item: Record<string, any> } = $props()
    
	// const CurrentComponent = derived(activeTab, ($activeTab) => tabContent[$activeTab]);

    async function toggleMode() {
        let wasEditable = editable; // if button is initially on, we save it afterwards
        editable = !editable;

        // if (wasEditable) {
        //     await callAdd();
        // }
    }

    let clicked: boolean = $state(false);

	async function callAdd() {
		let result = await addContent(item.selectedItem, tabContent);
        clicked = true;

        setTimeout(() => {
            clicked = false;
        }, 3000);

		return result;
	}

    let canEdit = item.user?.permission?.includes('can_edit');

</script>

<div class="p-4 text-[15px] text-gray-800 leading-relaxed bg-[#F7F7F7]">

    <!-- Toggle Button -->
    <div class="{canEdit ? 'flex' : 'hidden'} flex-row-reverse w-full gap-2">
        <div class="flex w-full justify-between items-center px-2">
            <div class="flex gap-3 items-center">
                <Button style="save" onclick={callAdd} addStyle={editable? 'opacity-100 shadow-lg': 'opacity-0'}>
                    <div class="w-full h-full flex items-center justify-center text-[8px] font-bold">
                        {clicked ? 'CHANGES SAVED SUCCESSFULLY' : 'SAVE CHANGES'}
                    </div>
                </Button>
            </div>
            <div class="relative flex items-center w-22 h-5.5 px-1 rounded-full transition-colors duration-300 ease-in-out shadow-inner" class:bg-green-300={editable} class:bg-red-300={!editable}>
                <Button style="editor-mode" onclick={toggleMode} addStyle={editable? 'translate-x-4 bg-green-500 scale-100 shadow-lg': 'bg-red-500 scale-100 shadow-md'}>
                    <div class="w-full h-full flex items-center justify-center text-[8px] font-bold text-white">
                        {editable ? 'EDITOR ON' : 'EDITOR OFF'}
                    </div>
                </Button>
            </div>
        </div>

    </div>

    <div class="flex-row w-full text-sm bg-white p-6 rounded-lg border border-[#AFAFAF] shadow-md mt-5">
        <ActiveTab bind:title={tabContent[activeTab].title} bind:content={tabContent[activeTab].content} editable={editable} />
    </div>
</div>