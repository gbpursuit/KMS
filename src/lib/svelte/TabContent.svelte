<script lang="ts">
	import { derived, writable, type Writable } from "svelte/store";
	import Overview from "./Overview.svelte";
	import Participants from "./Participants.svelte";
	import Personnel from "./Personnel.svelte";
	import Highlights from "./Highlights.svelte";
	import Evaluation from "./Evaluation.svelte";
	import Button from "./Button.svelte";
	import Paragraph from "./Paragraph.svelte";
	import Appendix from "./Appendix.svelte";
	import type { EditableContent } from "$lib/functions/tab-content";
	import ActiveTab from "./ActiveTab.svelte";

    let { activeTab = writable('Overview'), editable = $bindable(false) }: { activeTab: Writable<string>, editable?: boolean} = $props()
    
	// const CurrentComponent = derived(activeTab, ($activeTab) => tabContent[$activeTab]);

	let tabContent: Record<string, EditableContent> = $state({
		'Overview': {type: 'plain', prev: false, content: '', next: null},
		'Participants': {type: 'plain', prev: false, content: '', next: null},
		'Personnel': {type: 'plain', prev: false, content: '', next: null},
		'Highlights': {type: 'plain', prev: false, content: '', next: null},
		'Evaluation': {type: 'plain', prev: false, content: '', next: null},
		'Appendix': {type: 'plain', prev: false, content: '', next: null},
	})

    function toggleMode() {
        editable = !editable
    }
</script>

<div class="p-4 text-[15px] text-gray-800 leading-relaxed bg-[#F7F7F7]">

    <!-- Toggle Button -->
    <div class="flex rtl flex-row-reverse w-full gap-4">
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

    <ActiveTab bind:content={tabContent[$activeTab]} editable={editable} />

    <!-- {#if $CurrentComponent}
        {@const Component = $CurrentComponent}
        <Component bind:content={content} editable={editable}/>
    {/if} -->
</div>