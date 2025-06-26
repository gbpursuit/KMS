<script lang='ts'>
    import '@fortawesome/fontawesome-svg-core/styles.css';
    import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
    import { smoothScrollTo } from '$lib/functions/function';
    import { goto } from '$app/navigation';
	import { ROUTE } from '../routes';
	import Form from '$lib/svelte/Form.svelte';
	import Heading from '$lib/svelte/Heading.svelte';

    let isSigningUp = false;
    let leaving = false;
    let formType = "login";

	function toggleMode() {
        leaving = true;
		setTimeout(() => {
			isSigningUp = !isSigningUp;
            leaving = false;
		}, 250);
        if(formType == 'login') formType = 'signup'
        else formType = 'login'
        console.log('From page', formType)
	}   

    export let data: { id: string | null }

    // Mano - mano pa
    let dataString: string = '';
    function submitForm(e: Event) {
        e?.preventDefault();
        if(data && data.id) {
            goto(`${ROUTE.MODULES}-${data.id}`)
        } else {
            // goto(`/modules-${data.id}`)
            goto(ROUTE.ROOT).then(() => {
                setTimeout(() => smoothScrollTo('modules'), 100);
            });
        }
    }

</script>

<svelte:head>
	<title>Get Started</title>
</svelte:head>

<div class="relative flex w-full h-screen justify-center items-center bg-cover bg-center bg-no-repeat" style="background-image: url({'/NISMEDfrontpage.jpg'})">
    <div class="absolute inset-0 z-0 bg-black/50"></div>
	<div class="custom-morph z-15 w-[400px] {isSigningUp? 'h-[620px]': 'h-[450px]'} bg-white rounded-2xl shadow-xl px-8 py-8 transition-all ease-in-out duration-500 overflow-hidden">

		<!-- Logo -->
		<div class="flex justify-center gap-2 mb-6">
			<img src="/UPD.png" alt="UPD Logo" class="h-[60px] object-contain">
			<img src="/NISMED.png" alt="NISMED Logo" class="h-[60px] object-contain">
		</div>

		<!-- Title -->
        <div class="h-[40px] mb-5 w-full flex">
            <Heading style="form">
                <span class={leaving ? "morph-leave" : "morph-enter"}>
                    {isSigningUp ? 'Signup' : 'Login'}
                </span>
            </Heading>
        </div>
        
        <Form bind:type="{formType}" onSubmit={submitForm}></Form>

        <!-- Switch Forms -->
        <div class="text-center text-sm text-black p-1 {leaving ? "morph-leave" : "morph-enter"}">
            {isSigningUp ? 'Already have an account?' : 'Don\'t have an account yet?'}
            <button type="button" class="underline-container"
            on:click={toggleMode}
            >{isSigningUp ? 'Login' : 'Signup'}</button>
        </div>
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
        animation: morphIn 300ms ease forwards;
    }

    .morph-leave {
        animation: morphOut 300ms ease forwards;
    }

    .custom-morph {
        animation: morphIn 600ms ease-in forwards;
    }
</style>
