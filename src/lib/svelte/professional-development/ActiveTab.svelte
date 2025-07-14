<script lang="ts">
	import Content from "./Content.svelte";
	import Input from "../Input.svelte";
    import EvaluationUpload from "./EvaluationUpload.svelte";
    import Participants from "./Participants.svelte";

	let { editable, activeTab = $bindable(), content = $bindable(), title = $bindable(), initContent = $bindable(), moduleTitle, leader = $bindable(), allAccounts = $bindable() } = $props();
    let _moduleTitle = $state(`${moduleTitle}/${activeTab.toLowerCase().replace(' ', '-')}`)
    $effect(() => {
        _moduleTitle = `${moduleTitle}/${activeTab.toLowerCase().replace(' ', '-')}`
    })
</script>

<div class="flex-row w-full gap-100">
    <Input style="title" type="text" disabled={!editable} bind:text={title}/>
    <div class="h-[1px] bg-[rgb(175,175,175)] mb-4"></div>
    {#if activeTab.toLowerCase() === 'evaluation'}
        <EvaluationUpload bind:activeTab title={_moduleTitle} editable={editable} bind:currentContent={content} bind:initContent />
    {:else if activeTab.toLowerCase() === 'participants'}
        <Participants bind:activeTab title={_moduleTitle} editable={editable} bind:currentContent={content} bind:initContent />
    {:else}
        <Content title={_moduleTitle} editable={editable} bind:currentContent={content} bind:leader bind:allAccounts />
    {/if}
</div>