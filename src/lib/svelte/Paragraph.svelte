<script lang="ts">
    let { style = 'default', children, addStyle = '' } = $props()
    let styleValue = $state('')

    switch (style) {
        case 'default':
            styleValue = "font-light text-[var(--font-green)] text-shadow-[0_2px_5px_rgb(0_0_0_/_0.1)]"
            break;
        case 'modal':
            styleValue = "text-sm text-center font-semibold text-[#1B663E] mb-4 transition-opacity duration-300"
            break;
        default:
            styleValue = ''
            break;
    }

</script>

<p class="{styleValue} {addStyle}">
    {@render children()}
</p>