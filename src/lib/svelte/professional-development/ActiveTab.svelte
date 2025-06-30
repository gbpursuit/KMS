<script lang="ts">
	import Content from "./Content.svelte";
	import Input from "../Input.svelte";

	let { editable, content = $bindable(), title = $bindable() } = $props();
</script>

<div class="flex-row w-full gap-100">
    <Input style="title" type="text" disabled={!editable} bind:text={title}/>
    <div class="h-[1px] bg-[rgb(175,175,175)] mb-4"></div>
    <Content editable={editable} bind:currentContent={content}/>
</div>