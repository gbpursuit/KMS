<script lang="ts">
	import Button from "../Button.svelte";

    let { tabs = $bindable(), activeTab = $bindable('Overview') } = $props()

</script>

<!-- Tabs -->
<div class="flex w-full">
    {#each tabs as tab}
        {#if activeTab === tab}
            <Button style='tab' onclick={() => activeTab = tab} addStyle="text-[#185A37] bg-[#F7F7F7] border-b-0 border-[#AFAFAF]/50">
                {tab}
            </Button>
        {:else}
            <Button style='tab' onclick={() => activeTab = tab} addStyle="text-black border-t-0 border border-black/10">
                {tab}
            </Button>
        {/if}
    {/each}
</div>