<script lang="ts">
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
	import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
    import UploadFile from '../Upload.svelte';
	import Button from "../Button.svelte";
	import type { EditableContent } from '$lib/functions/tab-content';
	let { editable, currentContent = $bindable(), initialContent = $bindable(), title }: { editable: boolean, currentContent: EditableContent | null, initialContent: EditableContent | null, title: string } = $props();

	$effect(() => {
		if (currentContent && currentContent.type !== 'csv') {
			currentContent.type = 'csv';
			if (initialContent) {
				initialContent.type = 'csv';
			}
		}
	});

	function deleteItem(e: PointerEvent) {
		if (editable && currentContent) {
			currentContent.content = '';
		}
	}

</script>

{#if currentContent}
	<div class="flex flex-row w-full items-start">
		<UploadFile title={title} style="csv" bind:filePath={currentContent.content} editable={editable} />
		{#if currentContent.content}
			<Button addStyle="transition duration-500 hover:text-red-500 {editable ? 'opacity-100': 'opacity-0 pointer-events-none'}" onclick={deleteItem} disabled={!editable && (currentContent.prev || currentContent.next)}>
				<FontAwesomeIcon icon={faMinus}/>
			</Button>
		{/if}
	</div>
{/if}