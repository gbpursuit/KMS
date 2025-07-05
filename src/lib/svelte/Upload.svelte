<script lang="ts">
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faArrowUpFromBracket, faFileImage, faFileVideo, faFilePdf  } from '@fortawesome/free-solid-svg-icons';
    import Heading from '$lib/svelte/Heading.svelte';
    import Button from '$lib/svelte/Button.svelte';
	import Border from '$lib/svelte/Border.svelte';
	import FileType from '$lib/svelte/File.svelte';
    import { addImageData, uploadFileWithProgress } from '$lib/functions/database';

    let { style = $bindable(), addStyle = '', filePath = $bindable(), ...props } = $props()
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
				originalDescription = 'Click or drag a PDF to upload';
				textDescription = originalDescription;
				styleIcon = faFilePdf;
				break;
			default:
				break;
		}
    })

    let inputFile: HTMLInputElement | null = $state(null);
    let selectedFile: File | null = $state(null);
    let uploadProgress: number = $state(0);
	let uploading: boolean = $state(false);
	let isError: boolean = $state(false);

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

	function handleFileChange(event: Event): void {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
		    let file = target.files[0];

			if (style === 'image' && !file.type.startsWith('image/')) {
				showError('Only image files are allowed');
				return;
			}
			if (style === 'video' && !file.type.startsWith('video/')) {
				showError('Only video files are allowed');
				return;
			}
			if (style === 'pdf' && file.type !== 'application/pdf') {
				showError('Only PDF files are allowed');
				return;
			}

			selectedFile = file;
		}
	}

	$effect(() => {
		if (selectedFile) {
			uploading = true;
			(async () => {
				let uploadedPath = await uploadFileWithProgress(selectedFile, 'uncategorized', (percent) => {
					console.log('Percent: ', percent);
					uploadProgress = percent;
				});
				filePath = uploadedPath;
				uploading = false;
			})();
		}
	});

</script>

<div class="relative w-full group">
	{#if (selectedFile && !uploading) || filePath} 
		<FileType style="upload" filePath={filePath}></FileType>
	{:else}
		<input type="file" accept="image/*,video/*,application/pdf" bind:this={inputFile} onchange={handleFileChange} class="hidden"/>
		<Border style = "upload" uploadProgress={uploadProgress} isError={isError}></Border>
		<Button style="upload" onclick={triggerFileSelect} {...props}>
			{#key styleIcon}
				<span class="{isError ? 'text-red-500' : 'text-black'} text-lg animate-bounce-slow transition duration-200 ease-in-out">
					<FontAwesomeIcon icon={styleIcon} />
				</span>
			{/key}
			<p class = "{isError ? 'text-red-500' : ''} transition duration-200 ease-in-out">{uploading ? `Uploading... ${uploadProgress}%` : textDescription}</p>
		</Button>
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