<script lang="ts">
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faArrowUpFromBracket, faFileImage, faFileVideo, faFilePdf, faFileCsv  } from '@fortawesome/free-solid-svg-icons';
    import Heading from '$lib/svelte/Heading.svelte';
    import Button from '$lib/svelte/Button.svelte';
	import Border from '$lib/svelte/Border.svelte';
	import FileType from '$lib/svelte/File.svelte';
    import { removeFile } from '$lib/functions/media';
	import { onMount, onDestroy } from 'svelte';
	import Papa from 'papaparse';
	import { getSampleHeaders, arraysMatch } from '$lib/functions/csv';

    let { style = $bindable(), editable = false, addStyle = '', filePath = $bindable(), title, activeTab = $bindable(), selectedFile = $bindable(), ...props} = $props()
    let textDescription = $state('');
	let originalDescription = '';
    let styleIcon = $state(faArrowUpFromBracket);
	let fileType = $state('')

    $effect(() => {
		switch (style) {
			case 'video':
				originalDescription = 'Choose or drop a video for upload';
				textDescription = originalDescription;
				styleIcon = faFileVideo;
				break;
			case 'image':
				originalDescription = 'Drop or select an image file';
				textDescription = originalDescription;
				styleIcon = faFileImage;
				break;
			case 'pdf':
				originalDescription = 'Click or drag a PDF file to upload';
				textDescription = originalDescription;
				styleIcon = faFilePdf;
				break;
			case 'csv':
				originalDescription = 'Click or drag a CSV file to upload';
				textDescription = originalDescription;
				styleIcon = faFileCsv;
			default:
				break;
		}
    })

    let inputFile: HTMLInputElement | null = $state(null);
    // let selectedFile: File | null = $state(null);
    let uploadProgress: number = $state(0);
	let uploading: boolean = $state(false);
	let isError: boolean = $state(false);

	let _filePath: string = $state('')

	let isDragging = $state(false);

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		isDragging = true;
		textDescription = 'Release to upload file';
	}

	function handleDragLeave() {
		isDragging = false;
		textDescription = originalDescription;
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		isDragging = false;
		textDescription = originalDescription;

		const droppedFiles = event.dataTransfer?.files;
		if (droppedFiles && droppedFiles.length > 0) {
			const multipleFiles = { target: { files: droppedFiles } } as unknown as Event; // turn to Event
			handleFileChange(multipleFiles); // handle the first file 
		}
	}

	function triggerFileSelect() {
        if(inputFile) {
		    inputFile.click();
        }
	}

	function showError(message: string) {
		isError = true;
		textDescription = message;

		setTimeout(() => {
			textDescription = originalDescription;
			isError = false;
		}, 3000); 
	}

	let parsedCSV: Map<string, Record<string, string>[]> = $state(new Map());

	async function handleFileChange(event: Event): Promise<void> {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
		    let file = target.files[0];
			let sizeMB = file.size / (1024 * 1024);
			let maxSizeMB = 5;

			switch (style) {
				case 'image':
					maxSizeMB = 5;
					if (!file.type.startsWith('image/')) {
						showError('Only image files are allowed');
						return;
					}
					break;
				case 'video':
					maxSizeMB = 75;
					if (!file.type.startsWith('video/')) {
						showError('Only video files are allowed');
						return;
					}
					break;
				case 'pdf':
					maxSizeMB = 10;
					if (file.type !== 'application/pdf') {
						showError('Only PDF files are allowed');
						return;
					}
					break;
				case 'csv':
					maxSizeMB = 10;
					if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
						showError('Only CSV files are allowed');
						return;
					}

					try {
						const text = await file.text();
						const parsed = Papa.parse<Record<string, string>>(text, { header: true, skipEmptyLines: true });
						const uploadedHeaders = parsed.meta.fields?.map(h => h.trim()) ?? [];

						let path = activeTab === 'Participants' ? '/standardCSVFile/registration.csv' : '/standardCSVFile/evaluation.csv';

						const expectedHeaders = await getSampleHeaders(path);
						const headersMatch = arraysMatch(uploadedHeaders, expectedHeaders);
						if (!headersMatch) {
							showError('The uploaded CSV is incorrect. Please try again.');
							return;
						}

						const parsedData = parsed.data;
						parsedCSV.set(activeTab, parsedData);
					} catch(err) {
						console.error('Failed to parse csv', err);
					}
				}

			if (sizeMB > maxSizeMB) {
				showError(`File too large. (${Math.round(sizeMB)}MB) Max allowed is ${maxSizeMB}MB.`);
				return;
			}

			// selectedFile = file;
			selectedFile.set(activeTab, file);
			selectedFile = new Map(selectedFile);
		}
	}

	// $effect(() => {
		// if (_filePath !== '' && filePath === '') {
		// 	console.log('REMOVING FILE:', selectedFile?.name);
		// 	(async () => {
		// 		await removeFile(selectedFile, title);
		// 		_filePath = ''
		// 		selectedFile = null
		// 	})();
		// } else if (selectedFile) {
		// 	uploading = true;
		// 	(async () => {
		// 		let uploadedPath = await uploadFileWithProgress(selectedFile, title, (percent) => {
		// 			console.log('Percent: ', percent);
		// 			uploadProgress = percent;
		// 		});
		// 		filePath = uploadedPath;
		// 		_filePath = uploadedPath;
		// 		uploading = false;
		// 	})();
		// }
	// });

	let previewURL: string = '';
	$effect(() => {
		if (!selectedFile.has(activeTab)) return;

		const file = selectedFile.get(activeTab);
		if (!file) return;
		
		if (previewURL) URL.revokeObjectURL(previewURL);

		previewURL = URL.createObjectURL(file);
		filePath = previewURL;
	});

	onDestroy(() => {
		if (previewURL) URL.revokeObjectURL(previewURL);
	});

	$effect(() => {
		if ((!filePath || filePath === '') && selectedFile.has(activeTab)) {
			selectedFile.delete(activeTab);
			selectedFile = new Map(selectedFile);
		}
	});

</script>

<div class="relative w-full group">
	<!-- Display Media -->
	{#if (selectedFile.has(activeTab) && !uploading) || filePath}
		<FileType style="upload" bind:activeTab filePath={filePath} type={style} parsedCSV={parsedCSV.get(activeTab)}  />

	<!-- Upload Media -->
	{:else if editable && (!selectedFile.has(activeTab) && !filePath)}
		<input type="file" accept="image/*,video/*,application/pdf,text/csv,.csv" bind:this={inputFile} onchange={handleFileChange} class="hidden"/>
		<Border style = "upload" uploadProgress={uploadProgress} isError={isError}></Border>
		<Button style="upload" onclick={triggerFileSelect} ondragover={handleDragOver} 
		ondragleave={handleDragLeave} ondrop={handleDrop} {...props}>
			{#key styleIcon}
				<span class="{isError ? 'text-red-500' : 'text-black'} text-lg animate-bounce-slow transition duration-200 ease-in-out">
					<FontAwesomeIcon icon={styleIcon} />
				</span>
			{/key}
			<p class = "{isError ? 'text-red-500' : ''} transition duration-200 ease-in-out">{uploading ? `Uploading... ${uploadProgress}%` : textDescription}</p>
		</Button>
		
	<!-- View Media w/o content -->
	{:else}
		<div class="text-gray-500 italic text-sm border px-4 py-2 rounded-xl">
			No {style} file uploaded.
		</div>
	{/if}
</div>


<style>
	@keyframes bounce-slow {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-6px); }
	}

	:global(.animate-bounce-slow) {
		animation: bounce-slow 2s infinite;
	}
    
</style>