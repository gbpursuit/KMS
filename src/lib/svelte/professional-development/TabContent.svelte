<script lang="ts">
	import Button from "../Button.svelte";
	import type { TabInterface } from "$lib/functions/tab-content";
	import ActiveTab from "./ActiveTab.svelte";
    import { getData, addContent } from '$lib/functions/database';

    let { activeTab, editable = $bindable(false), tabContent = $bindable(), item }: { activeTab: string, editable?: boolean, tabContent: TabInterface, item: Record<string, any> } = $props()
    
	// const CurrentComponent = derived(activeTab, ($activeTab) => tabContent[$activeTab]);

    async function toggleMode() {
        let wasEditable = editable; // if button is initially on, we save it afterwards
        editable = !editable;

        // if (wasEditable) {
        //     await callAdd();
        // }
    }

    let saved: boolean = $state(false);
    let reverted: boolean = $state(false);

	async function callAdd() {

        try {
            let result = await addContent(item.selectedItem, tabContent);

            if (!result) throw new Error('Error saving module content to database');

            if(result.ok) {
                saved = true;

                setTimeout(() => {
                    saved = false;
                }, 3000);

                return result;
            } 

        } catch(err) {
            console.error('Error:', err);
            alert('Error:' + err);
        }
	}

    let canEdit = item.user?.permission?.includes('can_edit');

</script>

<div class="p-4 text-[15px] text-gray-800 leading-relaxed bg-[#F7F7F7]">

    <!-- Toggle Button -->
    <div class="{canEdit ? 'flex' : 'hidden'} flex-row-reverse w-full gap-2">
        <div class="flex w-full justify-between items-center px-2">
            <div class="flex gap-3 items-center">
                <Button style="save-revert" onclick={callAdd} addStyle={editable? 'opacity-100 shadow-lg w-[100px]': 'opacity-0 w-0'}>
                    <div class="w-full h-full flex items-center justify-center text-[8px] font-bold overflow-hidden whitespace-nowrap">
                        {saved ? 'SAVE SUCCESSFUL' : 'SAVE CHANGES'}
                    </div>
                </Button>
                <Button style="save-revert" addStyle={editable? 'opacity-100 shadow-lg w-[100px]': 'opacity-0 w-0'}>
                    <div class="w-full h-full flex items-center justify-center text-[8px] font-bold overflow-hidden whitespace-nowrap">
                        {reverted ? 'REVERT SUCCESSFUL' : 'REVERT CHANGES'}
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