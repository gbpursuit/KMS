<script lang="ts">
	import { onMount } from "svelte";
    import Button from "./Button.svelte";
    import Input from "./Input.svelte";
    import Label from "./Label.svelte";
    import Heading from '$lib/svelte/Heading.svelte';

    let { additionalStyle = $bindable(), type = $bindable(), errorStyle = false, errorMessage = '', onSubmit } = $props()


    let loginUsername = $state('')
    let loginPassword = $state('')
    let maxCharacters = '64'
    
    function toggleMode() {
        const loginForm = document.getElementById('login')
        const signupForm = document.getElementById('signup')

        if(loginForm && signupForm)
        switch(type) {
            case 'login':
                loginForm.hidden = false
                signupForm.hidden = true
                break;
            case 'signup':
                loginForm.hidden = true
                signupForm.hidden = false
                break;
            default:
                break;
        }
    }

    onMount(() => {
        let username = document.getElementById('username')
        let firstName = document.getElementById('firstName')
        let lastName = document.getElementById('lastName')
        let signupUsername = document.getElementById('signupUsername')

        const letters = new RegExp("^[A-Za-z]*$")
        const lettersNumbers = new RegExp("^[A-Za-z0-9]*$")

        const signupForm = document.getElementById('signup')
        if(signupForm) signupForm.hidden = true

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
        if(signupUsername) addListener(signupUsername, lettersNumbers)

    });

</script>

<div  class="{additionalStyle} transition-[height] ease-in duration-200 {type === 'login'? 'h-[220px] morph-enter': 'h-0 morph-leave'}" onanimationend={toggleMode}>
    <form id="login" class="flex flex-col gap-3" onsubmit={onSubmit}>
        <div class="flex flex-col gap-1 bg-transarent">
            <Label forLabel="username" required> Username </Label>
            <Input bind:text={loginUsername} style={errorStyle} type="text" id="username" name="username" maxlength={maxCharacters}/>
        </div>

        <div class="flex flex-col gap-1">
            <Label forLabel="password" required> Password </Label>
            <Input bind:password={loginPassword} style={errorStyle} type="password" id="password" name="password" maxlength={maxCharacters}/>
        </div>

        <!-- Ayusin nalang tong part na to since ayoko magtagal masyado sa frontend HAHAHA pwede ring maging asset if gusto mo -->
        <!-- <div class="{errorStyle ? 'flex' : 'hidden'} justify-center">
            <Heading style="error">Invalid {type}: {errorMessage}</Heading>
        </div> -->

        <Button style="submit" type="submit">Login</Button>
    </form>
</div>

<div class="{additionalStyle} transition-[height] ease-in duration-200 {type === 'login'? 'h-0 morph-leave': 'h-[368px] morph-enter'}" onanimationend={toggleMode}>
    <form id="signup" class="flex flex-col gap-3" onsubmit={onSubmit}>
        <div class="flex flex-row gap-4">
            <div class="flex flex-col gap-1">
                <Label forLabel="firstName" required> First Name </Label>
                <Input style={errorStyle} type="text" id="firstName" name="firstName" maxlength={maxCharacters}/>
            </div>

            <div class="flex flex-col gap-1">
                <Label forLabel="lastName" required> Last Name </Label>
                <Input style={errorStyle} type="text" id="lastName" name="lastName" maxlength={maxCharacters}/>
            </div>
        </div>

        <div class="flex flex-col gap-1">
            <Label forLabel="username" required> Username </Label>
            <Input style={errorStyle} type="text" id="signupUsername" name="username" maxlength={maxCharacters}/>
        </div>

        <div class="flex flex-col gap-1">
            <Label forLabel="password" required> Password </Label>
            <Input style={errorStyle} type="password" id="signupPassword" name="password" maxlength={maxCharacters}/>
        </div>
        
        <div class="flex flex-col gap-1">
            <Label forLabel="confirmPassword" required> Confirm Password </Label>
            <Input style={errorStyle} type="password" id="confirmPassword" name="confirmPassword" maxlength={maxCharacters}/>
        </div>

        <!-- Ayusin nalang tong part na to since ayoko magtagal masyado sa frontend HAHAHA pwede ring maging asset if gusto mo -->
        <!-- <div class="{errorStyle ? 'flex' : 'hidden'} justify-center">
            <Heading style="error">Invalid {type}: {errorMessage}</Heading>
        </div> -->
        
        <Button style="submit" type="submit">Signup</Button>
    </form>
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