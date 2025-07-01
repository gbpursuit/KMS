<script lang="ts">
	import { writable, type Writable } from "svelte/store";
	import Button from "../Button.svelte";
	import Paragraph from "../Paragraph.svelte";
	import type { TabInterface } from "$lib/functions/tab-content";
	import ActiveTab from "./ActiveTab.svelte";
    import { type User } from '$lib/functions/module';


    let { activeTab, editable = $bindable(false), tabContent = $bindable(), user }: { activeTab: string, editable?: boolean, tabContent: TabInterface, user: User | null} = $props()
    
	// const CurrentComponent = derived(activeTab, ($activeTab) => tabContent[$activeTab]);

    function toggleMode() {
        editable = !editable
    }

    let canEdit = user?.permission?.includes('can_edit');

</script>

<div class="p-4 text-[15px] text-gray-800 leading-relaxed bg-[#F7F7F7]">

    
    <!-- Toggle Button -->
    <div class="{canEdit ? 'flex' : 'hidden'} flex-row-reverse w-full gap-4">
        <div class="flex items-center">
            <div class="flex items-center w-8 h-2 bg-blue-400 rounded-2xl">
                <Button style="editor-mode" onclick={toggleMode} addStyle={editable? 'translate-x-4 bg-green-300': 'bg-red-300'}>
                    <div></div>
                </Button>
            </div>
        </div>
        <div class="h-full">
            <Paragraph>Editor Mode</Paragraph>
        </div>
    </div>

    <div class="flex-row w-full text-sm bg-white p-6 rounded-lg border border-[#AFAFAF] shadow-md">
        <ActiveTab bind:title={tabContent[activeTab].title} bind:content={tabContent[activeTab].content} editable={editable} />
    </div>
</div>