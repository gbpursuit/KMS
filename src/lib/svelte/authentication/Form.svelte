<script lang="ts">
	import { onMount } from "svelte";
    import Button from "../Button.svelte";
    import Input from "../Input.svelte";
    import Label from "../Label.svelte";
    import Heading from '$lib/svelte/Heading.svelte';

    let { additionalStyle = $bindable(), type = $bindable(), isError = $bindable(), errorMessage = '', onSubmit } = $props()

    let loginUsername = $state('')
    let loginPassword = $state('')
    let maxCharacters = '64'
    
    // function toggleMode() {
    //     const loginForm = document.getElementById('login')
    //     const registerForm = document.getElementById('register')

    //     if(loginForm && registerForm)
    //     switch(type) {
    //         case 'login':
    //             loginForm.hidden = false
    //             registerForm.hidden = true
    //             break;
    //         case 'register':
    //             loginForm.hidden = true
    //             registerForm.hidden = false
    //             break;
    //         default:
    //             break;
    //     }
    // }

    onMount(() => {
        let username = document.getElementById('username')
        let firstName = document.getElementById('firstName')
        let lastName = document.getElementById('lastName')
        let registerUsername = document.getElementById('registerUsername')
        let loginForm = document.getElementById('login')
        let registerForm = document.getElementById('register')

        const letters = new RegExp("^[A-Za-z]*$")
        const lettersNumbers = new RegExp("^[A-Za-z0-9]*$")

        $effect(() => {
            if(loginForm && registerForm){
                switch(type) {
                    case 'login':
                        loginForm.hidden = false
                        registerForm.hidden = true
                        break;
                    case 'register':
                        loginForm.hidden = true
                        registerForm.hidden = false
                        break;
                    default:
                        break;
                }
            }
        })


        function addListener(input: HTMLElement, regExp: RegExp) {
            input.addEventListener("beforeinput", (event) => {
                if (event.data != null && !regExp.test(event.data)) {
                    event.preventDefault();
                }
            });
        }

        if(username) addListener(username, lettersNumbers)
        if(firstName) addListener(firstName, letters)
        if(lastName) addListener(lastName, letters)
        if(registerUsername) addListener(registerUsername, lettersNumbers)

    });

</script>

<div id="form">
    <div class="{additionalStyle} transition-[height] ease-in duration-200 {type === 'login'? `h-[224px] morph-enter`: 'h-0 morph-leave'}">
        <form id="login" class="flex flex-col" onsubmit={onSubmit}>
            <div>
                <div class="flex flex-col gap-1 bg-transarent">
                    <Label forLabel="username" required> Username </Label>
                    <Input bind:text={loginUsername} style={isError? 'error': ''} type="text" id="username" name="username" maxlength={maxCharacters}/>
                </div>

                <div class="flex flex-col gap-1">
                    <Label forLabel="password" required> Password </Label>
                    <Input bind:password={loginPassword} style={isError? 'error': ''} type="password" id="password" name="password" maxlength={maxCharacters}/>
                </div>
            </div>

            <div class="{isError? 'flex py-4' : 'hidden'} justify-center">
                <Heading style="error">Invalid {type}: {errorMessage}</Heading>
            </div>

            <div class="flex-row {isError? '': 'pt-13'}">
                <Button style="submit" type="submit">Login</Button>
            </div>
        </form>
    </div>

    <div class="{additionalStyle} transition-[height] ease-in duration-200 {type === 'login'? 'h-0 morph-leave': `h-[354px] morph-enter`}">
        <form id="register" class="flex flex-col" onsubmit={onSubmit}>
            <div>
                <div class="flex flex-row gap-4">
                    <div class="flex flex-col gap-1">
                        <Label forLabel="firstName" required> First Name </Label>
                        <Input style={isError? 'error': ''} type="text" id="firstName" name="firstName" maxlength={maxCharacters}/>
                    </div>

                    <div class="flex flex-col gap-1">
                        <Label forLabel="lastName" required> Last Name </Label>
                        <Input style={isError? 'error': ''} type="text" id="lastName" name="lastName" maxlength={maxCharacters}/>
                    </div>
                </div>

                <div class="flex flex-col gap-1">
                    <Label forLabel="username" required> Username </Label>
                    <Input style={isError? 'error': ''} type="text" id="registerUsername" name="username" maxlength={maxCharacters}/>
                </div>

                <div class="flex flex-col gap-1">
                    <Label forLabel="password" required> Password </Label>
                    <Input style={isError? 'error': ''} type="password" id="registerPassword" name="password" maxlength={maxCharacters}/>
                </div>
                
                <div class="flex flex-col gap-1">
                    <Label forLabel="confirmPassword" required> Confirm Password </Label>
                    <Input style={isError? 'error': ''} type="password" id="confirmPassword" name="confirmPassword" maxlength={maxCharacters}/>
                </div>
            </div>

            <div class="{isError ? 'flex py-4' : 'hidden'} justify-center">
                <Heading style="error">Invalid {type}: {errorMessage}</Heading>
            </div>

            <div class="flex-row {isError? '': 'pt-13'}">
                <Button style="submit" type="submit">Register</Button>
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
        animation: morphIn 250ms ease-in forwards;
    }

    .morph-leave {
        animation: morphOut 250ms ease-in forwards;
    }
</style>