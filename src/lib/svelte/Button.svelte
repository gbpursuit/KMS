<script lang="ts">
    let { style, type, children } = $props()
    let styleValue = $state('')

    switch(style) {
        case 'submit':
            styleValue = 'w-full bg-[#185A37] text-white rounded-xl p-2 mt-4 transition duration-300 ease-in-out hover:bg-[#146e47] hover:scale-[1.01]'
            break;
        default:
            break;
    }
</script>

<button type={type} class={styleValue}>
    {@render children()}
</button>