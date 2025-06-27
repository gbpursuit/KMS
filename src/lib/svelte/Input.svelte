<script lang="ts">
	import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

    let { text = $bindable(),  password = $bindable(), required = false, style = false, type, ...props } = $props()
    let showPassword = $state(false)
    let styleValue = $state('')

    // Reactive styleValue
    $effect(() => {
        styleValue = style
        ? "w-full py-1 px-3 border-2 border-red-500 animate-red-shake rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
        : "w-full py-1 px-3 border-2 border-[#C5C5C5] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.2)]";
    })

    // switch(style) {
    //     case 'false':
    //         styleValue = "w-full py-1 px-3 border-2 border-white animate-red-shake rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
    //         break;
    //     default:
    //         styleValue = "w-full py-1 px-3 border-2 border-[#C5C5C5] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
    //         break;
    // }
</script>

{#if type === 'text'}
<input value={text} type="text" class="{styleValue}" required={required} {...props}/> <span></span>

{:else if type === 'password'}
<div class="relative">
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
</div>
{/if}

<style>
    input:invalid + span::before {
        border: 2px red solid
    }

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