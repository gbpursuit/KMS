<script lang="ts">
	import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

    let { text = $bindable(),  password = $bindable(), required = false, style = '', type, ...props } = $props()
    let showPassword = $state(false)
    let styleValue = $state('')

    switch(style) {
        default:
            styleValue = "w-full py-1 px-3 border-2 border-[#C5C5C5] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
            break;
    }
</script>

{#if type === 'text'}
<input value={text} type="text" class="{styleValue}" required={required} {...props}/> <span></span>

{:else if type === 'password'}
<input bind:value={password} type={showPassword ? 'text' : 'password'} class={styleValue} {...props}/>

<button type="button"
    class={`absolute right-3 bottom-2 text-sm text-[#C5C5C5] transition duration-300 ${password ? 'opacity-100' : 'opacity-0'}`}
    onclick={() => showPassword = !showPassword}>
    {#if showPassword}
        <FontAwesomeIcon icon={faEyeSlash} />
    {:else}
        <FontAwesomeIcon icon={faEye} />
    {/if}
</button>
{/if}

<style>
    input:invalid + span::before {
        border: 2px red solid
    }
</style>