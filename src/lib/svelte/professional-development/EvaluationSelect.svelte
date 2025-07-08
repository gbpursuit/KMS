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
        <div class="max-w-3xl mx-auto mt-6 p-5 bg-white border border-gray-300 rounded-lg shadow-sm space-y-6">

            <h1 class="text-2xl font-bold text-[var(--font-green)] border-b border-gray-200 pb-2">
                {selectedName}'s Response
            </h1>

            <div class="space-y-6">
                {#each Object.entries(cleanCSV()[selectedName]) as [group, items]}
                    <div class="border-l-4 border-[var(--font-green)] bg-gray-50 rounded-md p-4 shadow-sm transition-shadow]">

                        <h2 class="text-lg font-semibold text-gray-800 mb-3">
                            {group}
                        </h2>

                        <div class="flex flex-col gap-5">
                            {#each Object.entries(items) as [category, value]}
                                {#if category !== 'Unknown'}
                                    <div class="flex flex-col md:flex-row md:items-start justify-between gap-3 p-3 border border-transparent rounded-md transition-all duration-200
                                        hover:border-[var(--font-green)] hover:bg-[rgba(27,102,62,0.05)]">

                                        <div class="md:w-1/2 font-semibold text-[var(--font-green)]">
                                            {category}
                                        </div>

                                        <div class="md:w-1/2 text-gray-900 bg-[rgba(0,0,0,0.04)] px-3 py-2 rounded">
                                            {value}
                                        </div>
                                    </div>
                                {:else}
                                    <div class="italic text-gray-600 text-sm px-2 py-1">
                                        {value}
                                    </div>
                                {/if}
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
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