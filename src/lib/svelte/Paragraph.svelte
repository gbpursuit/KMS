<script lang="ts">
    let { style = 'default', children, addStyle = '' } = $props()
    let styleValue = $state('')

    switch (style) {
        case 'default':
            styleValue = "font-light text-[var(--font-green)] text-shadow-[0_2px_5px_rgb(0_0_0_/_0.1)]"
        default:
            styleValue = ''
            break;
    }

</script>

<p class="{styleValue} {addStyle}">
    {@render children()}
</p>