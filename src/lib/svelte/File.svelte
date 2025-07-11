<script lang="ts">
    import Media from '$lib/svelte/Media.svelte';

    let { style = $bindable(), filePath = $bindable(), type = $bindable(), addStyle = '', ...props } = $props()
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

</script>

<div class={style} {...props}>
    <Media style={type} bind:filePath={filePath} />
</div>