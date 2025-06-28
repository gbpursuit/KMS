<script lang="ts">
	import Heading from "./Heading.svelte";
	import Content from "./Content.svelte";
	import Input from "./Input.svelte";

	let { editable, content = $bindable(), title = $bindable() } = $props();
</script>

<div class="flex w-full">
	<div class="w-full text-sm bg-white p-6 rounded-lg border border-[#AFAFAF] shadow-md">
        <Input style="title" type="text" disabled={!editable} bind:value={title}/>
		<div class="h-[1px] bg-[rgb(175,175,175)] mb-4"></div>
		<Content editable={editable} bind:currentContent={content}/>
    </div>
</div>
