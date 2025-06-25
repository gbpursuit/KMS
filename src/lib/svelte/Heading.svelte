<script lang="ts">
    let { style = '', children } = $props()
    let styleValue = $state('')

    switch(style) {
        case 'form':
            styleValue = "font-semibold text-3xl"
            break;
        default:
            styleValue = "text-3xl font-semibold text-[var(--font-green)] text-shadow-[0_2px_5px_rgb(0_0_0_/_0.1)]"
            break;
    }
</script>

<h1 class={styleValue}>
    {@render children()}
</h1>