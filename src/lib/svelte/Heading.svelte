<script lang="ts">
    let { style = '', children } = $props()
    let styleValue = $state('')

    switch(style) {
        case 'form':
            styleValue = "font-semibold text-3xl"
            break;
        case 'home-title':
            styleValue =  "relative text-white text-[8vw] md:text-5xl font-extrabold text-center px-4 py-2 animate-fade-in-up transition-all duration-1000 ease-out tracking-wide drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
            break;
        default:
            styleValue = "text-3xl font-semibold text-[var(--font-green)] text-shadow-[0_2px_5px_rgb(0_0_0_/_0.1)]"
            break;
    }
</script>

<h1 class={styleValue}>
    {@render children()}
</h1>