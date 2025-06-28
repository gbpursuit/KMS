<!-- This is called after +page.ts -->
<script lang='ts'>
    import { smoothScrollTo } from '$lib/functions/function';
    import { goto } from '$app/navigation';
	import { ROUTE } from '../routes';
	import AuthForm from '$lib/svelte/AuthForm.svelte';
	import Heading from '$lib/svelte/Heading.svelte';
    import { addData } from '$lib/functions/database';
    import { onMount } from 'svelte';
	import type { PageProps } from './$types';

    // export let data: { 
    //     id: string | null;
    //     view: string;
    // }

	let { data }: PageProps = $props();

    let leaving = $state(false);
    let formType: 'login' | 'signup' = $state('login');


    let isError: boolean = $state(false);
    let errorMessage: string = $state('');


	function switchForm() {
        leaving = true;
        setTimeout(() => {
            leaving = false;
            formType = formType === 'login' ? 'signup' : 'login';
            setTimeout(() => {
                const form = document.getElementById(formType) as HTMLFormElement | null;
                form?.reset();
            }, 0);
        }, 250);
	}   

    async function submitForm(e: Event) {
        e?.preventDefault();
        let form = e.target as HTMLFormElement;

        try {
            let formData = new FormData(form);
            let item = Object.fromEntries(formData) as Record<string, string>;
            let endpoint = formType === 'login' ? 'auth/login' : 'auth/register';

            if (Object.values(item).some(value => !value)) {
                console.log(item);
                errorMessage = "Please fill in all fields"
                throw new Error (errorMessage);
            }

            let result = await addData(endpoint, item);
            console.log(result)

            if (result.ok) {
                form.reset();
                if(data && data.id) {
                    // goto(`${ROUTE.MODULES}-${data.id}`)
                    window.location.href = `${ROUTE.ROOT}-${data.id}`;
                } else {
                    window.location.href = `${ROUTE.ROOT}?scroll=modules`;
                }
            } else {
                errorMessage = result.result.error
                throw new Error (errorMessage);
            }
        } catch(err) {
            console.error(err);

            isError = true;
            setTimeout(() => {
                isError = false;
                errorMessage = '';
            }, 1500);
        }

    }
    
    onMount(() => {

        let validViews = ['login', 'register'];
        if (data.view && !validViews.includes(data.view)) {
            let url = new URL(window.location.href);
            url.searchParams.set('view', 'login');
            window.history.replaceState({}, '', url);
        }

        let url = new URL(window.location.href)
        if (url.searchParams.get('view') === 'login') formType = 'login'
        else formType = 'signup'

    })

    // $effect(() => {
    //     let logo = $state(document.getElementById('logo'))
    //     let heading = $state(document.getElementById('heading'))
    //     formTest = document.getElementById('form')
    //     let toggle = $state(document.getElementById('toggle'))

    //     function sumHeight(elements: HTMLElement[]) {
    //         let val = 0
    //         for(let i = 0; i < elements.length; i++) {
    //             val += elements[i].getBoundingClientRect().height
    //         }
    //         return val
    //     }

    //     if((logo && heading && formTest && toggle) || (isError && (logo && heading && formTest && toggle))) {
    //         formTest = document.getElementById('form')
    //         formHeight = sumHeight([logo, heading, formTest, toggle])
    //         console.log('update', formHeight)
    //     }
    // })

</script>

<svelte:head>
	<title>Get Started</title>
</svelte:head>

<div class="relative flex w-full h-screen justify-center items-center bg-cover bg-center bg-no-repeat" style="background-image: url({'/NISMEDfrontpage.jpg'})">
    <div class="absolute inset-0 z-0 bg-black/50"></div>
	<div class="custom-morph z-15 w-[400px] {formType === 'signup'? 'h-[590px]': 'h-[460px]'} bg-white rounded-2xl shadow-xl px-8 py-8 transition-all ease-in-out duration-500 overflow-hidden">
		<!-- Logo -->
		<div id="logo" class="flex justify-center gap-2 mb-6">
			<img src="/UPD.png" alt="UPD Logo" class="h-[60px] object-contain">
			<img src="/NISMED.png" alt="NISMED Logo" class="h-[60px] object-contain">
		</div>

		<!-- Title -->
        <div id="heading" class="h-[40px] mb-5 w-full flex">
            <Heading style="form">
                <span class={leaving ? "morph-leave" : "morph-enter"}>
                    {formType === 'signup' ? 'Signup' : 'Login'}
                </span>
            </Heading>
        </div>
        
        <AuthForm bind:type={formType} bind:isError={isError} errorMessage={errorMessage} onSubmit={submitForm}></AuthForm>

        <!-- Switch Forms -->
        <div id="toggle" class="text-center text-sm text-black p-1 {leaving ? "morph-leave" : "morph-enter"}">
            {formType === 'signup' ? 'Already have an account?' : 'Don\'t have an account yet?'}
            <button type="button" class="custom-underline middle"
            onclick={switchForm}
            >{formType === 'signup' ? 'Login' : 'Signup'}</button>
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
