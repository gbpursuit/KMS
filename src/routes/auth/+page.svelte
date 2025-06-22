<script lang='ts'>
    import '@fortawesome/fontawesome-svg-core/styles.css';
    import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
    import { smoothScrollTo } from '$lib/functions/function';
    import { goto } from '$app/navigation';

    let isRegistering = false;
    let leaving = false;

    let showPassword: boolean = false;
    let showconfirmpassword: boolean = false;
    let password: string = '';
    let confirmpassword : string = '';

	$: if (password === '' && showPassword) {
		setTimeout(() => {
			showPassword = false;
		}, 300);
	}

    $: if (confirmpassword === '' && showconfirmpassword) {
		setTimeout(() => {
			showconfirmpassword = false;
		}, 300);
	}

	function toggle_mode() {
        leaving = true;
		setTimeout(() => {
			isRegistering = !isRegistering;
            leaving = false;
		}, 250); 
	}

    export let data: { id: string | null }

    // Mano - mano pa
    let dataString: string = '';
    function submit_form(e: Event) {
        e?.preventDefault();
        if(data && data.id) {
            goto(`/modules-${data.id}`)
        } else {
            // goto(`/modules-${data.id}`)
            goto('/').then(() => {
                setTimeout(() => smoothScrollTo('modules'), 100);
            });
        }
    }

</script>

<svelte:head>
	<title>Get Started</title>
</svelte:head>

<div class="relative flex w-full h-screen justify-center items-center bg-cover bg-center bg-no-repeat" style="background-image: url({'/NISMEDfrontpage.jpg'})">
    <div class="absolute inset-0 z-0 bg-black/50">g</div>
	<div class="z-15 w-[400px] bg-white rounded-2xl shadow-xl px-6 py-10 transition-all duration-500 {isRegistering ? 'h-[650px]' : 'h-[520px]'} overflow-hidden">

		<!-- Logo -->
		<div class="flex justify-center gap-2 mb-6">
			<img src="/UPD.png" alt="UPD Logo" class="h-[60px] object-contain">
			<img src="/NISMED.png" alt="NISMED Logo" class="h-[60px] object-contain">
		</div>

		<!-- Title -->
        <div class="h-[40px] mb-5 w-full flex">
            <h1 class="font-semibold text-3xl {leaving ? "morph-leave" : "morph-enter"}">{isRegistering ? 'Register' : 'Login'}</h1>
        </div>

		<!-- Form -->
		<form class="flex flex-col gap-3" on:submit={submit_form}>
            <div class="flex flex-col gap-1 {isRegistering ? "morph-enter" : "absolute opacity-0"}">
                <label for="email">Email<span class="text-red-500 "> *</span></label>
                <input type="text" id="email" name="email" class="w-full py-1 px-3 border-2 border-[#C5C5C5] rounded-lg shadow-[0_4px_2px_rgba(0,0,0,0.2)]" />
            </div>

			<div class="flex flex-col gap-1">
				<label for="username">Username<span class="text-red-500"> *</span></label>
                <input type="text" id='username' name='username' class="w-full py-1 px-3 border-2 border-[#C5C5C5] rounded-lg shadow-[0_4px_2px_rgba(0,0,0,0.2)]">
			</div>

			<div class="flex flex-col gap-1 relative">
				<label for="password">Password<span class="text-red-500"> *</span></label>
				<input bind:value={password} type={showPassword ? 'text' : 'password'} id="password" name="password"
					class="w-full py-1 px-3 pr-10 border-2 border-[#C5C5C5] rounded-lg shadow-[0_4px_2px_rgba(0,0,0,0.2)]" />

				<button type="button"
					class={`absolute right-3 bottom-2 text-sm text-[#C5C5C5] transition duration-300 ${password ? 'opacity-100' : 'opacity-0'}`}
					on:click={() => showPassword = !showPassword}>
					{#if showPassword}
						<FontAwesomeIcon icon={faEyeSlash} />
					{:else}
						<FontAwesomeIcon icon={faEye} />
					{/if}
				</button>
			</div>

            <div class="flex flex-col gap-1 {isRegistering ? "relative morph-enter" : "absolute opacity-0"}">
                <label for="confirmpassword">Confirm Password<span class="text-red-500"> *</span></label>
                <input bind:value={confirmpassword} type={showconfirmpassword ? 'text' : 'password'}
                    id="confirmpassword" name="confirmpassword"
                    class="w-full py-1 px-3 pr-10 border-2 border-[#C5C5C5] rounded-lg shadow-[0_4px_2px_rgba(0,0,0,0.2)]" />
                    

                <button type="button"
                    class={`absolute right-3 bottom-2 text-sm text-[#C5C5C5] transition duration-300 ${confirmpassword ? 'opacity-100' : 'opacity-0'}`}
                    on:click={() => showconfirmpassword = !showconfirmpassword}>
                    {#if showconfirmpassword}
                        <FontAwesomeIcon icon={faEyeSlash} />
                    {:else}
                        <FontAwesomeIcon icon={faEye} />
                    {/if}
                </button>
            </div>

			<!-- Submit -->
			<button type="submit"
				class="w-full bg-[#185A37] text-white rounded-xl p-2 mt-4 transition duration-300 ease-in-out hover:bg-[#146e47] hover:scale-[1.01]">
				{isRegistering ? 'Register' : 'Log In'}
			</button>

			<!-- <button type="submit"
				class="w-full bg-[#185A37] text-white rounded-xl p-2 mt-4 hover:bg-[#146e47] group overflow-hidden h-[40px]">
                <span class="flex flex-col transition-transform duration-300 group-hover:-translate-y-[65px] gap-10">
                    <span class="block">{isRegistering ? 'Register' : 'Log In'}</span>
                    <span class="block">{isRegistering ? 'Log In' : 'Register'}</span>
                </span>
			</button> -->

            <!-- Switch Forms -->
            <div class="text-center text-sm text-black p-1 {leaving ? "morph-leave" : "morph-enter"}">
                {isRegistering ? 'Already have an account?' : 'Don\'t have an account yet?'}
                <button type="button" class="underline-container"
                on:click={toggle_mode}
                >{isRegistering ? 'Login' : 'Signup'}</button>
            </div>
		</form>
	</div>
</div>


<style>
    @keyframes morphIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes morphOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    .morph-enter {
        animation: morphIn 500ms ease forwards;
    }

    .morph-leave {
        animation: morphOut 500ms ease forwards;
    }
</style>
