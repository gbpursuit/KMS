<script lang="ts">
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
    import Heading from '$lib/svelte/Heading.svelte';
    import Button from '$lib/svelte/Button.svelte';

    let { style = $bindable(), addStyle = '', text = $bindable(), ...props } = $props()
    let styleValue = $state('')

    $effect(() => {
        switch(style) {
            case 'heading':                
                styleValue = 'font-exo text-2xl font-semibold px-2 rounded-lg'
                break;
            case 'plain':
                styleValue = 'font-exo font-regular px-2 rounded-lg'
            default:
                break;
        }
    })

    function onKeyDown(e: KeyboardEvent) {
        console.log(e)
        if(e.key == 'Tab') {
            e.preventDefault()
            console.log()

        }
        if(e.ctrlKey && e.shiftKey && e.key == 'E') {
            console.log('meow')
        }
    }

</script>

<textarea class="w-full border-0 p-0.5 {styleValue} {addStyle} field-sizing-content resize-none overflow-hidden" contenteditable="true" bind:value={text} {...props} onkeypress={onKeyDown}></textarea>