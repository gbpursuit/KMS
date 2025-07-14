<script lang="ts">
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
	import { faMinus } from "@fortawesome/free-solid-svg-icons";
	import { tooltip as tooltipv1 } from '$lib/functions/tooltip.v1';
    import UploadFile from '../Upload.svelte';
	import Button from "../Button.svelte";
	import type { EditableContent } from '$lib/functions/tab-content';
	let { editable, currentContent = $bindable(), initContent = $bindable(), title, activeTab = $bindable() }: { editable: boolean, currentContent: EditableContent | null, initContent: EditableContent | null, title: string, activeTab: string } = $props();

	$effect(() => {
		if (currentContent && currentContent.type !== 'csv') {
			currentContent.type = 'csv';
			if (initContent) {
				initContent.type = 'csv';
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
		<UploadFile bind:activeTab title={title} style="csv" bind:filePath={currentContent.content} editable={editable} />
		{#if currentContent.content}
			<Button addStyle="transition duration-500 hover:text-red-500 {editable ? 'opacity-100': 'opacity-0 pointer-events-none'}" onclick={deleteItem} disabled={!editable && (currentContent.prev || currentContent.next)}>
				<span title="Remove Evaluation CSV" use:tooltipv1>
					<FontAwesomeIcon icon={faMinus} />
				</span>
			</Button>
		{/if}
	</div>
{/if}