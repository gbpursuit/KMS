<script lang="ts">
    let { type='h1', style = '', children, addStyle='' } = $props()
    let styleValue = $state('')

    switch(style) {
        case 'form':
            styleValue = "font-semibold text-3xl"
            break;
        case 'error':
            styleValue =  "font-medium text-sm text-red-500"
            break;
        case 'home-title':
            styleValue =  "relative text-white text-[8vw] md:text-5xl font-extrabold text-center px-4 py-2 animate-fade-in-up transition-all duration-1000 ease-out tracking-wide drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
            break;
        case 'tab-content':
            styleValue = "flex justify-center text-2xl font-bold mb-2 text-[#1B663E]"
            break;
        case 'table':
            styleValue = "text-xl font-bold text-[#1B663E] mb-2 flex items-center gap-2"
            break;
        case 'saved':
            styleValue = "text-xl font-semibold text-[#1B663E]";
            break;
        case 'modal':
            styleValue = "text-2xl font-extrabold text-center text-[#185A37] mb-1 transition-colors duration-300"
            break;
        case 'modules-title':
            styleValue = "text-lg font-semibold"
            break;
        default:
            styleValue = "text-3xl font-semibold text-[var(--font-green)] text-shadow-[0_2px_5px_rgb(0_0_0_/_0.1)]"
            break;
    }
</script>

{#if type === 'h1'}
<h1 class="{styleValue} {addStyle}">
    {@render children()}
</h1>
{:else if type === 'h2'}
<h2 class="{styleValue} {addStyle}">
    {@render children()}
</h2>
{:else if type === 'h3'}
<h3 class="{styleValue} {addStyle}">
    {@render children()}
</h3>
{:else if type === 'h4'}
<h4 class="{styleValue} {addStyle}">
    {@render children()}
</h4>
{:else if type === 'h5'}
<h5 class="{styleValue} {addStyle}">
    {@render children()}
</h5>
{:else if type === 'h6'}
<h6 class="{styleValue} {addStyle}">
    {@render children()}
</h6>
{/if}