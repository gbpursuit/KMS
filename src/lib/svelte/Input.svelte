<script lang="ts">
	import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

    let { text = $bindable(),  password = $bindable(), required = false, style = '', addStyle = '', type = 'text', ...props } = $props()
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
            default:
                styleValue = "flex w-full py-1 px-3 border-2 border-[#C5C5C5] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
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
<input bind:value={text} contenteditable="true" type={type} class="{styleValue} {addStyle}" required={required} {...props}/>

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
    input[type="date"]::-webkit-calendar-picker-indicator {
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