<script lang="ts">
	import Content from "./Content.svelte";
	import Input from "../Input.svelte";
    import EvaluationUpload from "./EvaluationUpload.svelte";

	let { editable, activeTab = $bindable(), content = $bindable(), title = $bindable(), initContent = $bindable() } = $props();
</script>

<div class="flex-row w-full gap-100">
    <Input style="title" type="text" disabled={!editable} bind:text={title}/>
    <div class="h-[1px] bg-[rgb(175,175,175)] mb-4"></div>
    {#if activeTab.toLowerCase() === 'evaluation'}
        <EvaluationUpload editable={editable} bind:currentContent={content} bind:initialContent={initContent} />
    {:else}
        <Content editable={editable} bind:currentContent={content}/>
    {/if}
</div>