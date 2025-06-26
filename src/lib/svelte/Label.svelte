<script lang="ts">
    let { required = false, forLabel, children } = $props()
</script>

{#if required}
<label for="{forLabel}">{@render children()}<span class="text-red-500"> *</span></label>
{:else}
<label for="{forLabel}">{@render children()}</label>
{/if}