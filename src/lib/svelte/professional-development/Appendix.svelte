<script lang="ts">
	import Heading from "../Heading.svelte";

	let { mode = $bindable(), editable } = $props();
</script>

<div class="flex w-full">
	<div class="w-full text-sm text-[#0F3923] space-y-6 bg-white p-6 rounded-lg border border-[#AFAFAF] shadow-md">
		<Heading style="tab-content">Appendix</Heading>
		<div class="h-[1px] bg-[#AFAFAF] mb-4"></div>
		
    </div>
</div>
