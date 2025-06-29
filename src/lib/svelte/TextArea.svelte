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

    // function onPointerEnter(e: Event) {
    //     console.log(e)
    // }
</script>

<textarea class="w-full border-0 p-0.5 {styleValue} {addStyle} field-sizing-content resize-none overflow-hidden" contenteditable="true" bind:value={text} {...props} onkeypress={onKeyDown}></textarea>