<script lang="ts">
	import Heading from "../Heading.svelte";
	import type { EditableContent } from "$lib/functions/tab-content";
	import Content from "./Content.svelte";

	let { editable } = $props();
	let content: EditableContent = $state({type: 'plain', prev: false, content: '', next: null})
</script>

<div class="flex w-full">
	<div class="w-full text-sm text-[#0F3923] space-y-6 bg-white p-6 rounded-lg border border-[#AFAFAF] shadow-md">
		<Heading style="tab-content">Training Participants</Heading>
		<div class="h-[1px] bg-[#AFAFAF] mb-4"></div>
		<Content editable={editable} bind:currentContent={content}/>
    </div>
</div>
