<script lang="ts">
    import Media from '$lib/svelte/Media.svelte';

    let { style = $bindable(), filePath = $bindable(), type = $bindable(), addStyle = '', activeTab = $bindable(), ...props } = $props()
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
    <Media style={type} bind:activeTab filePath={filePath}></Media>
</div>