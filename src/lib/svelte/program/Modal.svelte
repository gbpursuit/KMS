<script lang="ts">
	import Label from "../Label.svelte";
    import Input from "../Input.svelte";
    import Select from "../Select.svelte";
	import { addImageData } from "$lib/functions/media";
	import { addData } from "$lib/functions/database";
	import Heading from "../Heading.svelte";
	import Paragraph from "../Paragraph.svelte";
    import { VIEW_CLIENT  } from "$lib/functions/env";
	import Button from "../Button.svelte";

    let { programId, allAccounts = $bindable(), training = $bindable(), showModal = $bindable() } = $props()

	let imageUrl: File | null = null;

	function handleFileChange(event: Event): void {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
		imageUrl = target.files[0];
		}
	}

	async function handleSubmit(e: Event) {
		e?.preventDefault();
		let form = e.target as HTMLFormElement;
		let formData = new FormData(form);
		let item = Object.fromEntries(formData) as Record<string, any>;
	
		item.numParticipants = parseInt(item.numParticipants);
		item.trainingId = parseInt(item.trainingId);
		item.programId = programId;
		item.leader = allAccounts[item.leader - 1]
		

		console.log(item, formData)

		if (Object.values(item).some(value => !value)) {
			alert("Please fill in all required fields");
		}

		let PATH = await addImageData(imageUrl, item.leader);
		item.imageUrl = PATH;

		let result = await addData(VIEW_CLIENT, 'pd', item);
		if(result.ok) {
			form.reset();
			imageUrl = null;
			window.location.reload();
		} else {
			throw new Error(result.result.error);
		}
	}

</script>

{#if showModal}
	<!-- Backdrop -->
	<div role="button" tabindex="-1" aria-label="Close modal"
		class="fixed inset-0 bg-[#030B07]/70 z-40 transition-opacity duration-300 ease-in-out"
		onclick={() => showModal = false}
		onkeydown={(e) => { e.preventDefault(); if (e.key === 'Enter' || e.key === 'Escape') showModal = false; }}
	></div>

	<!-- Modal -->
	<div class="flex flex-col overflow-y-scroll custom-scrollbar w-[85%] h-[85%] fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl border-2 border-[#1B663E] shadow-[0px_4px_1px_0px_#1B663E] max-w-xl px-10 py-10 transition-all duration-300 ease-in-out">
        <Heading type="h2" style="modal">Add Training Module</Heading>
        <Paragraph style="modal">Complete the form below</Paragraph>
		<div class="h-[1px] bg-[#002e14] mb-6"></div>
 
		<form class="flex flex-col gap-5" onsubmit={handleSubmit}>
			<div class="flex flex-col gap-1 transition-all duration-300">
				<Label style="modal" for="title" required>Title</Label>
				<Input style="modal" name="title"/>
			</div>

			<div class="flex flex-col gap-1 transition-all duration-300">
				<Label style="modal" for="leader" required>Project Leader</Label>
				<Select style="modal" name="leader" options={allAccounts} placeholder="Project Leader"/>
			</div>

			<div class="flex flex-col gap-1 transition-all duration-300">
				<Label style="modal" for="numParticipants" required>Number of Participants</Label>
				<Input type="number" style="modal" name="numParticipants"/>
			</div>

			<div class="flex flex-col gap-1 transition-all duration-300">
				<Label style="modal" for="trainingId" required>Type of Training</Label>
				<Select style="modal" name="trainingId" options={training} placeholder="Training Type"/>
			</div>

			<div class="flex w-full gap-2">
				<div class={"flex flex-col gap-1 transition-all duration-300 w-1/2"}>
					<Label style="modal" for="dateStart" required>Date Start</Label>
					<Input type="date" style="modal" name="dateStart"/>
				</div>

				<div class={"flex flex-col gap-1 transition-all duration-300 w-1/2"}>
					<Label style="modal" for="dateEnd" required>Date End</Label>
					<Input type="date" style="modal" name="dateEnd"/>
				</div>
			</div>

			<div class="flex flex-col gap-1 transition-all duration-300">
				<Label style="modal" for="imageUrl">Upload Image</Label>
				<Input type="file" accept="image/*" onchange={handleFileChange} name="imageUrl" style="modal-file" />
			</div>

			<div class="flex justify-end gap-3 pt-4">
				<Button style="modal-cancel" onclick={() => showModal = false}>Cancel</Button>
				<Button style="modal-submit" type="submit">Submit</Button>
			</div>
		</form>
	</div>
{/if}

<style>
    .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: #185A37 white;
    }
</style>