<script lang="ts">
    let { style = $bindable(), addStyle = '', text = $bindable(), ...props } = $props()
    let styleValue = $state('')

    $effect(() => {
        switch(style) {
            case 'heading':                
                styleValue = 'font-exo text-2xl font-semibold'
                break;
            case 'plain':
                styleValue = 'font-exo font-regular'
            default:
                break;
        }
    })
</script>

<textarea class="w-full border-0 p-0.5 {styleValue} {addStyle} field-sizing-content resize-none overflow-hidden" contenteditable="true" bind:value={text} {...props}></textarea>