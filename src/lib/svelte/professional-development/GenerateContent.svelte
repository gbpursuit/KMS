<script lang="ts">
	import type { EditableContent, TabInterface } from "$lib/functions/tab-content";
	import type { Training } from '@prisma/client';

	import Button from "../Button.svelte";
	import Heading from "../Heading.svelte";

	let { tabContent = $bindable(), selectedItem = $bindable(), training = $bindable() }: {
		tabContent: TabInterface,
		selectedItem: Record<string, any>,
		training: Training[]
	} = $props();

	let hideContent = $state(true);
	let showPrintButton = $state(false);
	let downloadURL = $state('');

	async function generatePDF() {
		hideContent = false;
		showPrintButton = false;
		downloadURL = ''

		console.log('Selected item being sent:', selectedItem);

		const response = await fetch('/api/pdf', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				tabContent,
				selectedItem,
				trainingTypes: training
			})
		});

		const { success, filename, base64, mimeType } = await response.json();

		if (success && base64) {
			// Decode base64 string into a Uint8Array
			const binary = atob(base64);
			const bytes = new Uint8Array(binary.length);
			for (let i = 0; i < binary.length; i++) {
				bytes[i] = binary.charCodeAt(i);
			}

			// Create Blob and URL
			const blob = new Blob([bytes], { type: mimeType });
			downloadURL = URL.createObjectURL(blob);

			// Set iframe preview
			const preview = document.getElementById('pdf-preview') as HTMLIFrameElement;
			if (preview) {
				preview.src = downloadURL;
				showPrintButton = true;
			}
		}
	}
	
	function printPDF() {
		const iframe = document.getElementById('pdf-preview') as HTMLIFrameElement;
		if (iframe?.contentWindow) {
			iframe.contentWindow.focus();
			iframe.contentWindow.print();
		}
	}
</script>

<!-- PDF Button -->
<div class="w-full flex justify-center mt-10">
	<Button style="submit" addStyle="max-w-[400px]" onclick={generatePDF}>
		<div>Generate Training Report PDF</div>
	</Button>
</div>

<!-- PDF Preview -->
{#if !hideContent}
	<div class="w-full mt-10">
		<Heading type="h2">PDF Preview</Heading>

		{#if showPrintButton}
			<div class="flex justify-center mt-4 gap-4">
				<Button style="underline" onclick={printPDF}>
					<div class="font-bold text-lg tracking-wide">Print PDF</div>
				</Button>

				{#if downloadURL}
					<a href={downloadURL} download="Training_Report.pdf">
						<Button style="underline">
							<div class="font-bold text-lg tracking-wide">Download PDF</div>
						</Button>
					</a>
				{/if}
			</div>
		{/if}

		<iframe
			id="pdf-preview"
			class="w-full h-[600px] border mt-4"
			title="PDF Preview of Training Report">
		</iframe>
	</div>
{/if}