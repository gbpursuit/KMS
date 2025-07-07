<script lang="ts">
    import Select from '../Select.svelte';
    import { onMount } from 'svelte';
	import type { EditableContent } from '$lib/functions/tab-content';
	let { nameGrouped = $bindable(), csvData = $bindable() }: { nameGrouped: Record<string, Record<string, string> | Record<string, string>[]>, csvData: Record<string,string>[] } = $props();

    let selectedName: string = $state("");
    let combined: Record<string, string>[] = [];

    onMount(() => {

        for (const [_, value] of Object.entries(nameGrouped)) {
            if (Array.isArray(value)) continue;
            combined.push(value);
        }

        nameGrouped = {
            ...nameGrouped,
            combined
        };

        console.log(nameGrouped);
    });


</script>

<Select style = 'evaluation' options={Object.keys(nameGrouped)} disabled={false} bind:selected={selectedName} placeholder="a respondent" />

{#if selectedName} 
    {#if selectedName === 'combined'}
        <h3 class="mt-4 font-bold">Every</h3>
        <div class="border rounded mt-2">
            {#each combined as entry, i}
                <div class="mb-4 border-b p-2">
                    <h4 class="font-semibold">Entry {i + 1}</h4>
                    {#each Object.entries(entry) as [key, value]}
                        <p><strong>{key}:</strong> {value}</p>
                    {/each}
                </div>
            {/each}
        </div>
    {:else}
        <h3 class="mt-4 font-bold">{selectedName}'s Response</h3>
        <div class="p-4 border rounded mt-2">
            {#each Object.entries(nameGrouped[selectedName]) as [key, value]}
                <p><strong>{key}:</strong> {value}</p>
            {/each}
        </div>
    {/if}
{/if}