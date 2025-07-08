<script lang="ts">
    import Papa from 'papaparse';
    import Select from '../Select.svelte';
    import { onMount } from 'svelte';
	import type { EditableContent } from '$lib/functions/tab-content';
	let { filePath }: { filePath: string } = $props();

    let selectedName: string = $state("");

    let csvData: Record<string, string>[] = $state([]); // or $state<Record<string, string>[]>([]);
    let csvHeaders: string[] = $state([]);
    let nameGrouped: Record<string, Record<string, string>> = $state({});

	async function parseCSV(path: string) {
		try {
			let res = await fetch(path);
			let text = await res.text();

			let parsed = Papa.parse<Record<string, string>>(text, {
				header: true,
				skipEmptyLines: true,
			});

			csvData = parsed.data;
            csvData.forEach(entry => {
                let nameField = "Name (Last Name, First Name, Middle Initial) ";
                let  name = entry[nameField];
                if (name) {
                    let { [nameField]: _, ...rest } = entry;
                    nameGrouped[name] = rest;
                }
            });
            csvHeaders = parsed.meta.fields ?? [];

			console.log(csvData); 
            console.log(nameGrouped);
		} catch (err) {
			console.error('Failed to parse CSV:', err);
		}
	}

    function regexShi(headers: Record<string, Record<string, string>>) {
        let grouped: Record<string, Record<string, Record<string, string>>> = {};

        Object.entries(headers).forEach(([name, answers]) => {
            Object.entries(answers).forEach(([key, value]) => {
                let match = key.match(/^(.*?)(?:\s*\[([^\]]+)\])?$/);
                if(!match) return;

                // Group -- match[1]
                // Categories under group -- match[2]
                // Create Record<match[1]:string, Record<match[2]:string, value:string>>
                // Map record to their respective names

                let group = match[1].trim();
                let category = match[2]?.trim() || "Unknown";

                if(!grouped[name]) grouped[name] = {};
                if(!grouped[name][group]) grouped[name][group] = {};
                grouped[name][group][category] = value;
            })
        })

        return grouped;
    }
    let cleanCSV = $derived(() => regexShi(nameGrouped));

    $effect(() => {
		if (filePath) {
			parseCSV(filePath);
		}
	});

    let allCSV = $derived(() => [...Object.keys(cleanCSV()), 'All']);

</script>

<Select style = 'evaluation' options={allCSV().sort()} disabled={false} bind:selected={selectedName} placeholder="a respondent" />

{#if selectedName}
    {#if selectedName === 'All'}
        <div class="flex flex-col mt-4">
            hi
        </div>
    {:else}
        <h1 class="mt-4 font-bold text-2xl">{selectedName}'s response</h1>
        <div class="flex flex-col gap-1 p-4 ">
            {#each Object.entries(cleanCSV()[selectedName]) as [group, items]}
                <h2 class="font-bold text-xl">{group}</h2>
                <table class="w-full border border-black rounded overflow-hidden">
                    <tbody>
                        {#each Object.entries(items) as [category, value]}
                            <tr class="border-t">
                                {#if category !== 'Unknown'}
                                    <td class="p-2 font-medium w-1/2">{category}</td>
                                    <td class="p-2">{value}</td>
                                {:else}
                                    <td class="p-2" colspan="2">{value}</td>
                                {/if}
                            </tr>
                        {/each}
                    </tbody>
                </table>
            {/each}
        </div>
    {/if}
{/if}

<!-- {#each Object.entries(allValues()[selectedName]) as [key, value]}
    <p><strong>{key}:</strong> {value}</p>
{/each} -->
<!-- {#if selectedName} 
    {#if selectedName === 'combined'}
        <h3 class="mt-4 font-bold">Every</h3>
        <div class="border rounded mt-2">
            {#each combined() as entry, i}
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
            {#each Object.entries(allValues()[selectedName]) as [key, value]}
                <p><strong>{key}:</strong> {value}</p>
            {/each}
        </div>
    {/if}
{/if} -->