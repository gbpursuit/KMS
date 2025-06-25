<script lang="ts">
	let { children } = $props();
</script>

<div class="flex w-full">
	<div class="w-full text-sm text-[#0F3923] space-y-6 bg-white p-6 rounded-lg border border-[#AFAFAF] shadow-md">
		<h1 class="flex justify-center text-2xl font-bold mb-2 text-[#1B663E]">Highlights</h1>
		<div class="h-[1px] bg-[#AFAFAF] mb-4"></div>

    </div>
	{@render children?.()}
</div>
