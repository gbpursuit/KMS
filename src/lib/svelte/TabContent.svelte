<script lang="ts">
	import { writable, type Writable } from "svelte/store";
	import Button from "./Button.svelte";
	import Paragraph from "./Paragraph.svelte";
	import type { EditableContent } from "$lib/functions/tab-content";
	import ActiveTab from "./ActiveTab.svelte";

    type Tab = {
        title: string,
        content: EditableContent
    }

    let { activeTab = writable('Overview'), editable = $bindable(false) }: { activeTab: Writable<string>, editable?: boolean} = $props()
    
	// const CurrentComponent = derived(activeTab, ($activeTab) => tabContent[$activeTab]);

	let tabContent: Record<string, Tab> = $state({
		'Overview': {
            title: 'Training Overview',
            content:{type: 'plain', prev: false, content: '', next: null}
        },
		'Participants': {
            title: 'Training Participants',
            content:{type: 'plain', prev: false, content: '', next: null}
        },
		'Personnel': {
            title: 'Personnel',
            content:{type: 'plain', prev: false, content: '', next: null}
        },
		'Highlights': {
            title: 'Highlights',
            content:{type: 'plain', prev: false, content: '', next: null}
        },
		'Evaluation': {
            title: 'Evaluation',
            content:{type: 'plain', prev: false, content: '', next: null}
        },
		'Appendix': {
            title: 'Appendix',
            content:{type: 'plain', prev: false, content: '', next: null}
        },
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

    <ActiveTab bind:title={tabContent[$activeTab].title} bind:content={tabContent[$activeTab].content} editable={editable} />

    <!-- {#if $CurrentComponent}
        {@const Component = $CurrentComponent}
        <Component bind:content={content} editable={editable}/>
    {/if} -->
</div>