<script lang="ts">
	import type { CSVSummary } from "$lib/functions/tab-content";

    let { summarizedTable }: { summarizedTable: CSVSummary } = $props()

</script>

{#if JSON.stringify(summarizedTable) != JSON.stringify({})}
<div class="mt-6 p-5 bg-white border border-gray-300 rounded-lg shadow-sm space-y-6">
    {#each Object.entries(summarizedTable) as [group, categories]}
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