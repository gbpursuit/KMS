<script lang="ts">
    let { required = false, style = '', addStyle = '', children, ...props } = $props()
    let styleValue = $state('')
    $effect(() => {
        switch(style) {
            case 'modal':
                styleValue = "font-semibold text-[#0C2D1C]"
                break;
            default:
                break;
        }
    })
</script>

{#if required}
<label class="{styleValue} {addStyle}" {...props}>{@render children()}<span class="text-red-500"> *</span></label>
{:else}
<label class="{styleValue} {addStyle}" {...props}>{@render children()}</label>
{/if}