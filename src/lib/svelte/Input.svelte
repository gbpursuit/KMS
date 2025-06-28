<script lang="ts">
	import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

    let { text = $bindable(),  password = $bindable(), required = false, style = '', addStyle = '', type, ...props } = $props()
    let showPassword = $state(false)
    let styleValue = $state('')

    $effect(() => {
        switch(style) {
            case 'error':
                styleValue = "w-full py-1 px-3 border-2 border-red-500 animate-red-shake rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
                break;
            case 'title':
                styleValue = "flex w-full border-0 text-center text-2xl font-bold mb-2 text-[#1B663E]"
                break;
            default:
                styleValue = "w-full py-1 px-3 border-2 border-[#C5C5C5] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
                break;
        }
    })

</script>

{#if type === 'password'}
<div class="relative">
    <input bind:value={password} type={showPassword ? 'text' : 'password'} class="{styleValue} {addStyle}" {...props}/>

    <button type="button"
        class={`absolute right-3 bottom-2 text-sm text-[#C5C5C5] transition duration-300 ${password ? 'opacity-100' : 'opacity-0'}`}
        onclick={() => showPassword = !showPassword}>
        {#if showPassword}
            <FontAwesomeIcon icon={faEyeSlash} />
        {:else}
            <FontAwesomeIcon icon={faEye} />
        {/if}
    </button>
</div>
{:else}
<input bind:value={text} type={type} class="{styleValue} {addStyle}" required={required} {...props}/>

{/if}

<style>
    .animate-red-shake {
        animation: shakeRed 0.5s ease-in-out infinite;
    }

    @keyframes shakeRed {
        0%, 100% {
            transform: translateX(0);
        }
        25% {
            transform: translateX(-5px);
        }
        75% {
            transform: translateX(5px);
        }
    }
</style>