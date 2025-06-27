<script lang="ts">
	import Heading from "./Heading.svelte";
	import Content from "./Content.svelte";

	let { editable, content = $bindable() } = $props();
</script>

<div class="flex w-full">
	<div class="w-full text-sm bg-white p-6 rounded-lg border border-[#AFAFAF] shadow-md">
		<Heading style="tab-content">Training Overview</Heading>
		<div class="h-[1px] bg-[rgb(175,175,175)] mb-4"></div>
		<Content editable={editable} bind:currentContent={content}/>
    </div>
</div>
