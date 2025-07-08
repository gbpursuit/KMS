<script lang="ts">
    import "@fortawesome/free-solid-svg-icons"
	import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

    let { text = $bindable(),  password = $bindable(), required = false, inverted = false, style = '', addStyle = '', type = 'text', ...props } = $props()
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
            case 'module-title':
                styleValue = "flex w-full px-0 py-1 border-0 text-3xl font-semibold text-white bg-transparent"
                break;
            case 'module-details':
                styleValue = "flex p-0 border-0 bg-transparent field-sizing-content"
                break;
            case 'modal':
                styleValue = "transition-all duration-300 outline-none border-2 border-[#1B663E] shadow-[0px_4px_2px_0px_#1B663E] px-3 py-2 rounded text-sm text-black focus:translate-y-1 focus:shadow-[0px_2px_0px_0px_#1B663E]"
                break;
            case 'modal-file':
                styleValue = "file:border-0 file:py-2 file:px-4 file:rounded file:bg-[#1B663E] file:text-white file:font-semibold text-sm transition-all duration-300"
                break;
            default:
                styleValue = "flex w-full py-1 px-3 border-2 border-[#C5C5C5] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
                break;
        }
    })

</script>

{#if type === 'password'}
<div class="flex flex-col w-full relative">
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
<input bind:value={text} contenteditable="true" type={type} class="{inverted? 'inverted': ''} {styleValue} {addStyle}" required={required} {...props} />

{/if}


<style>
    input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* input[type="date"]::-webkit-calendar-picker-indicator {
        position: absolute;
        opacity: 1;
        display: block;
        background: url('../../../static/favicon.png') no-repeat;
        width: 20px;
        height: 20px;
        border-width: thin;
    } */

    /* input[type="date"]::-webkit-calendar-picker-indicator {
        color: rgba(0, 0, 0, 0);
        opacity: 1;
        display: block;
        background-repeat:  no-repeat;
        width: 25px;
        height: 25px;
        border-width: thin
    } */
    input[type="date"].inverted::-webkit-calendar-picker-indicator {
        filter: invert(1);
    }
    /* input::-webkit-datetime-edit-fields-wrapper {
        position: relative;
        left: 10%;
    } */
    /* input::-webkit-datetime-edit {
        position: relative;
        left: 10%;
    } */

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