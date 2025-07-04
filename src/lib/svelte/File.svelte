<script lang="ts">
    import Media from '$lib/svelte/Media.svelte';
    let { style = $bindable(), filePath = $bindable(), addStyle = '', ...props } = $props()
    let styleValue = $state('');


    $effect(() => {
		switch (style) {
			case 'upload':
                styleValue = 'flex w-full h-auto justify-center items-center';
                break;
			default:
				break;
		}
    })

	function getFileType(path: string): 'image' | 'video' | 'pdf' | null {
		if (!path) return null;
		if (path.endsWith('.mp4') || path.endsWith('.mov')) return 'video';
		if (path.endsWith('.pdf')) return 'pdf';
		return 'image';
	}

</script>

<div class={style} {...props}>
    <Media style={getFileType(filePath)} filePath={filePath}></Media>
</div>