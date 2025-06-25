<script lang="ts">
    let { style = '', children } = $props()
    let styleValue = $state('')

    switch (style) {
        default:
            styleValue = "font-light text-[var(--font-green)] text-shadow-[0_2px_5px_rgb(0_0_0_/_0.1)]"
            break;
    }

</script>

<p class={styleValue}>
    {@render children()}
</p>