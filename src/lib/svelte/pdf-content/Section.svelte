<script lang="ts">
	import type { EditableContent } from "$lib/functions/tab-content";
	import SummaryTable from "../professional-development/SummaryTable.svelte";
  let { origin, index, title, content, summarizedTable, pdfSummary, summaryLabels } = $props()

</script>

{#snippet CONTENT(_content: EditableContent)}
  {#if _content.type == 'plain' || _content.type == 'select-leader' || _content.type == 'select-account'} <p> {_content.content} </p>
  {:else if _content.type == 'heading'} <h2> {_content.content} </h2>
  {:else if _content.type == 'image'} <img src="{origin}{_content.content}" alt=""/>
  {:else} <p> {_content.type} format is not yet supported. :( </p>
   {/if}
  {#if _content.next}
    {@render CONTENT(_content.next)}
  {/if}
{/snippet}

<h1>{index}. {title}</h1>
{#if title == 'Evaluation'}
<SummaryTable summarizedTable={summarizedTable} />
{:else if title == 'Training Participants'}
  {#if JSON.stringify(pdfSummary) != '{}'}
    <h2>In Summary</h2>
    {#each Object.entries(pdfSummary) as [label, value]}
        <div class="flex items-center">
            <p> {summaryLabels[label as keyof typeof summaryLabels]}: {value}</p>
        </div>                        
    {/each}
  {/if}
{:else}
{@render CONTENT(content)}
{/if}

<style>

  h1 {
    color: #0b3d2e;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #ccc;
    padding-bottom: 0.5rem;
  }

  h2 {
    color: #0b3d2e;
    font-weight: 300;
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.6;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
</style>
