<script lang="ts">
    import Papa from 'papaparse';
    import Select from '../Select.svelte';
    import { onMount } from 'svelte';
	import type { EditableContent } from '$lib/functions/tab-content';
	let { filePath }: { filePath: string } = $props();

    let selectedName: string = $state("Summary"); // default summary

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

    $effect(() => {
		if (filePath) {
			parseCSV(filePath);
		}
	});

    function cleanRegex(headers: Record<string, Record<string, string>>) {
        let grouped: Record<string, Record<string, Record<string, string>>> = {};
    
        const skipFields = [
            "Timestamp",
            "Email Address",
            "Grade Level(s) Taught",
            "Read and understand the Data Privacy Notice in accomplishing the evaluation form for this training workshop."
        ];

        Object.entries(headers).forEach(([name, answers]) => {
            Object.entries(answers).forEach(([key, value]) => {
                if (skipFields.includes(key.trim())) return;

                let match = key.match(/^(.*?)(?:\s*\[([^\]]+)\])?$/);
                if(!match) return;

                // Group -- match[1]
                // Categories under group -- match[2]
                // Create Record<match[1]:string, Record<match[2]:string, value:string>>
                // Map record to their respective names

                let group = match[1].trim();
                let category = match[2]?.trim() || "--";

                if(!grouped[name]) grouped[name] = {};
                if(!grouped[name][group]) grouped[name][group] = {};
                grouped[name][group][category] = value;
            })
        })

        return grouped;
    }
    
    let filteredCSV = $derived(() => cleanRegex(nameGrouped));
    let selectOptions = $derived(() => ['Summary', ...Object.keys(filteredCSV()).sort()]);

    function summarizeByLabelIndex(
        groupedData: Record<string, Record<string, Record<string, string>>>
    ) {
        let result: Record<string,Record<string,
                {
                    rawCount: number;
                    totalCount: number;
                    totalIndex: number;
                    labelIndex: Record<string, number>;
                    indexLabel: string[];
                    labelCounts: Record<string, number>;
                }
            >
        > = {};

        for (let [, groups] of Object.entries(groupedData)) {
            for (let [group, items] of Object.entries(groups)) {
                for (let [category, rawValue] of Object.entries(items)) {
                    let value = rawValue.trim();

                    if (!result[group]) result[group] = {};
                    if (!result[group][category]) {
                        result[group][category] = {
                            rawCount: 0,
                            totalCount: 0,
                            totalIndex: 0,
                            labelIndex: {},
                            indexLabel: [],
                            labelCounts: {}
                        };
                    }

                    let data = result[group][category];

                    if (!(value in data.labelIndex)) {
                        data.labelIndex[value] = data.indexLabel.length;
                        data.indexLabel.push(value);
                    }

                    let index = data.labelIndex[value];
                    data.totalIndex += index;
                    data.totalCount += 1;
                    data.labelCounts[value] = (data.labelCounts[value] || 0) + 1;
                }
            }
        }

        let summarized: Record<string, Record<string, { averageLabel: string; rawCount: number; totalCount: number }>> = {};

        for (let [group, categories] of Object.entries(result)) {
            summarized[group] = {};

            for (let [category, data] of Object.entries(categories)) {
                let avg = data.totalIndex / data.totalCount;

                let distances = data.indexLabel.map((_, i) => Math.abs(i - avg));
                let minDistance = Math.min(...distances);
                let candidateIndices = distances
                    .map((d, i) => (d === minDistance ? i : -1))
                    .filter(i => i !== -1);

                let allCounts = Object.values(data.labelCounts);
                let firstCount = allCounts[0];
                let allEqual = allCounts.every(count => count === firstCount);

                let label: string;
                let rawCount: number;

                if (allEqual && allCounts.length > 1) {
                    label = "All Tied";
                    rawCount = 0;
                } else {
                    // Pick label closest to avg, most frequent if multiple
                    let bestIndex = candidateIndices[0];
                    let bestCount = data.labelCounts[data.indexLabel[bestIndex]] ?? 0;

                    for (let i = 1; i < candidateIndices.length; i++) {
                        let candidate = candidateIndices[i];
                        let lbl = data.indexLabel[candidate];
                        let count = data.labelCounts[lbl] ?? 0;

                        if (count > bestCount) {
                            bestIndex = candidate;
                            bestCount = count;
                        }
                    }

                    label = data.indexLabel[bestIndex];
                    rawCount = data.labelCounts[label] ?? 0;
                }

                summarized[group][category] = {
                    averageLabel: label,
                    rawCount,
                    totalCount: data.totalCount,
                };
            }
        }

        return summarized;
    }

    let summarizedTable = $derived(() => summarizeByLabelIndex(filteredCSV()));
</script>

<Select style = 'evaluation' options={selectOptions()} disabled={false} bind:selected={selectedName} placeholder="a respondent" />

{#if selectedName}
    {#if selectedName === 'Summary'}
        <div class="mt-6 p-5 bg-white border border-gray-300 rounded-lg shadow-sm space-y-6">
            {#each Object.entries(summarizedTable()) as [group, categories]}
                <div class="overflow-x-auto scrollbarTheme border-l-4 border-[var(--font-green)] bg-gray-50 rounded-md p-4 shadow-sm transition-shadow">
                    <h2 class="text-lg font-semibold text-gray-800 mb-3">{group}</h2>
                    <table class="w-full min-w-[500px]  table-fixed text-sm border rounded overflow-hidden shadow-md">
                        <thead class="bg-[var(--font-green)] text-white">
                            <tr>
                                <th class="text-center p-2 w-1/2">Category</th>
                                <th class="text-center p-2 w-1/4">Most Representative Answer</th>
                                <th class="text-center p-2 w-1/4">Respondents</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each Object.entries(categories) as [category, data]}
                                <tr class="odd:bg-white even:bg-gray-100 font-normal hover:text-[var(--hover-green)]
                                    transition-all duration-300 ease-in-out ">
                                    <td class="text-left px-4 py-2">{category}</td>
                                    <td class="text-center p-2">
                                        {data.averageLabel || ' - '}
                                    </td>

                                    <td class="text-center p-2">
                                        {data.averageLabel !== 'All Tied'
                                            ? `${data.rawCount} / ${data.totalCount}`
                                            : ' - '}
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            {/each}
        </div>
    {:else}
        <div class="max-w-3xl mx-auto mt-6 p-5 bg-white border border-gray-300 rounded-lg shadow-sm space-y-6">

            <h1 class="text-2xl font-bold text-[var(--font-green)] border-b border-gray-200 pb-2">
                {selectedName}'s Response
            </h1>

            <div class="space-y-6">
                {#each Object.entries(filteredCSV()[selectedName]) as [group, items]}
                    <div class="border-l-4 border-[var(--font-green)] bg-gray-50 rounded-md p-4 shadow-sm transition-shadow">

                        <h2 class="text-lg font-semibold text-gray-800 mb-3">
                            {group}
                        </h2>

                        <div class="flex flex-col gap-5">
                            {#each Object.entries(items) as [category, value]}
                                {#if category !== '--'}
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

<style>
    .scrollbarTheme {
        scrollbar-width: none; /* Firefox */
    }

    .scrollbarTheme:hover {
        scrollbar-width: thin;
        scrollbar-color: var(--font-green) transparent;
    }
</style>