<script>
	import Label from "../Label.svelte";


</script>

<!-- Backdrop -->
<!-- <div role="button" tabindex="0" aria-label="Close modal"
    class="fixed inset-0 bg-[#030B07]/70 z-40 transition-opacity duration-300 ease-in-out"
    onclick={() => showModal = false}
    onkeydown={(e) => { if (e.key === 'Enter' || e.key === 'Escape') showModal = false; }}
></div> -->

<!-- Modal -->
<!-- <div class="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl border-2 border-[#1B663E] shadow-[3px_4px_0px_1px_#1B663E] w-[85%] max-w-xl px-10 py-10 transition-all duration-300 ease-in-out">
    <h2 class="text-2xl font-extrabold text-center text-[#185A37] mb-1 transition-colors duration-300">Add Training Module</h2>
    <p class="text-sm text-center font-semibold text-[#1B663E] mb-4 transition-opacity duration-300">Complete the form below</p>
    <div class="h-[1px] bg-[#AFAFAF] mb-6"></div>

    <form class="flex flex-col gap-5">
        <div class={fieldClass}>
            <Label type=''>Project Leader</Label>
            <input type="text" bind:value={projectLeader} class={inputClass} />
        </div>

        <div class={fieldClass}>
            <label class={labelClass}>Number of Participants</label>
            <input type="number" bind:value={participants} class={inputClass} />
        </div>

        <div class={fieldClass}>
            <label class={labelClass}>Type of Training</label>
            <input type="text" bind:value={trainingType} class={inputClass} />
        </div>

        <div class={fieldClass}>
            <label class={labelClass}>Date</label>
            <input type="date" bind:value={trainingDate} class={inputClass} />
        </div>

        <div class={fieldClass}>
            <label class={labelClass}>Upload Image</label>
            <input type="file" accept="image/*" onchange={handleFileChange}
                class="file:border-0 file:py-2 file:px-4 file:rounded file:bg-[#1B663E] file:text-white file:font-semibold text-sm transition-all duration-300" />
        </div>

        <div class="flex justify-end gap-3 pt-4">
            <button type="button" onclick={() => showModal = false}
                class="bg-[#AFAFAF] text-black font-semibold px-4 py-2 rounded-lg hover:bg-[#999999] transition-all duration-200">Cancel</button>
            <button type="button" onclick={handleSubmit}
                class="bg-[#185A37] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#0C2D1C] transition-all duration-200">Submit</button>
        </div>
    </form>
</div> -->