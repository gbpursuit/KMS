<script lang="ts">
	import { onMount } from 'svelte';
	import { getData } from '$lib/functions/database';
	import type { Account } from '@prisma/client';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
    import { faEye, faLock, faPlusCircle, faTrashAlt, faUser, faUserCheck, faUserShield, faUserSlash } from '@fortawesome/free-solid-svg-icons';
	import type { PageProps } from '../$types';

    import Button from '$lib/svelte/Button.svelte';
	import Heading from '$lib/svelte/Heading.svelte';
	import Paragraph from '$lib/svelte/Paragraph.svelte';

	let accounts: Account[] = $state([]);
    let { data }: PageProps = $props()
    
    let button1Text = $state('SWITCH TO USER') // REMOVE AFTER TESTING
    let button2Text = $state('SWITCH TO ADMIN') // REMOVE AFTER TESTING
    let button3Text = $state('SWITCH TO SUPER USER') // REMOVE AFTER TESTING
    let roleId = $state(3) // REMOVE AFTER TESTING

	let searchUser = $state("");
	let searchAdmin = $state("");
	let showUserInfo = $state(false);
	let showAdminInfo = $state(false);
    let userCount = $state(0)
    let adminCount = $state(0)
    let superCount = $state(0)
    let testing = $state(false)

    $effect( ()=> {
	    userCount = accounts.filter(a => a.roleId === 1).length;
	    adminCount = accounts.filter(a => a.roleId === 2).length;
        superCount = accounts.filter(a => a.roleId === 3).length;
        
        if(!data.user) return; // REMOVE AFTER TESTING
        button1Text = roleId == 1? 'CURRENTLY A USER': 'SWITCH TO USER' // REMOVE AFTER TESTING
        button2Text = roleId == 2? 'CURRENTLY AN ADMIN': 'SWITCH TO ADMIN' // REMOVE AFTER TESTING
        button3Text = roleId == 3? 'CURRENTLY A SUPER USER': 'SWITCH TO SUPER USER' // REMOVE AFTER TESTING

        if(roleId == 1 || roleId == 2) window.location.pathname = '/' // REMOVE AFTER TESTING
    })

	onMount(async () => {
		accounts = await getData('account');

        if(!data.user) return; // REMOVE AFTER TESTING
        roleId = data.user.roleId // REMOVE AFTER TESTING
        button1Text = roleId == 1? 'CURRENTLY A USER': 'SWITCH TO USER' // REMOVE AFTER TESTING
        button2Text = roleId == 2? 'CURRENTLY AN ADMIN': 'SWITCH TO ADMIN' // REMOVE AFTER TESTING
        button3Text = roleId == 3? 'CURRENTLY A SUPER USER': 'SWITCH TO SUPER USER' // REMOVE AFTER TESTING
	});

    async function changeRole(id: number, currentRole: number, targetRole: number) {
        try {
            const res = await fetch(`/api/account/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ roleId: targetRole })
            });

            const data = await res.json();

            if (res.ok) {
                roleId = targetRole // REMOVE AFTER TESTING
                accounts = accounts.map(acc =>
                    acc.id === id ? { ...acc, roleId: targetRole } : acc
                );
            } else {
                alert(data.error || 'Failed to change role.');
            }
        } catch (error) {
            console.error('Error changing role:', error);
            alert('An error occurred while changing role.');
        }
    }

    async function removeAccount(id: number) {
        const account = accounts.find(acc => acc.id === id);
        if (!account) return;

        let confirmDelete = confirm("Are you sure you want to permanently remove this account?");
        if (!confirmDelete) return;

        // If superuser, prompt for password before deleting
        if (account.roleId === 3) {
            const specialPass = prompt("Enter the special password to delete this Superuser account:");
            if (specialPass !== 'password') {
                alert('Incorrect password. Deletion cancelled.');
                return;
            }
        }

        try {
            const res = await fetch(`/api/account/${id}`, {
                method: 'DELETE'
            });

            const data = await res.json();

            if (res.ok) {
                accounts = accounts.filter(acc => acc.id !== id);
            } else {
                alert(data.error || 'Failed to delete account.');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('An error occurred while deleting account.');
        }
    }
</script>

<div class="min-h-screen mt-28 px-6 py-10 space-y-10">
	<div class="flex flex-col md:flex-row gap-8">
		
        <!-- Users Table -->
		<div class="flex-1">
            <Heading type='h2' style='table'>
                <FontAwesomeIcon icon={faUser}/>
                Users (Total Users: {userCount})
                <Button
                    style="underline"
                    onclick={() => showUserInfo = !showUserInfo}> 
                    {showUserInfo ? 'Hide' : 'What can Users do?'}
                </Button>
            </Heading>
            
            <!-- User info Link -->
            {#if showUserInfo}
                <div class="text-sm text-gray-600 bg-white border border-gray-200 rounded-md p-4 mb-4">
                    <FontAwesomeIcon icon={faEye} class='text-[#1B663E] mr-2'/><strong>View-only Access:</strong> Users can view all <span class="font-medium">UP NISMED Programs</span> and detailed <span class="font-medium">Training Modules</span>.
                    <Paragraph addStyle="mt-1"><i class="fas fa-ban text-red-500 mr-2"></i>Users cannot add, edit, or delete training content.</Paragraph>
                </div>
            {/if}
            
            <!-- User Search -->
			<input
				class="w-full mb-4 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B663E]"
				type="text"
				placeholder="Search users..."
				bind:value={searchUser} />
            
            <!-- User Table Content -->
			<div class="bg-white border border-gray-200 rounded-xl overflow-x-auto">
				<table class="w-full text-sm">
					<thead class="bg-[#1B663E] text-white text-left">
						<tr>
							<th class="px-4 py-2">First Name</th>
							<th class="px-4 py-2">Last Name</th>
							<th class="px-4 py-2">Username</th>
							<th class="px-4 py-2 text-center">Actions</th>
						</tr>
					</thead>
                    <tbody>
                        {#if accounts.filter(a => a.roleId === 1 && (
                            a.firstName.toLowerCase().includes(searchUser.toLowerCase()) ||
                            a.lastName.toLowerCase().includes(searchUser.toLowerCase()) ||
                            a.username.toLowerCase().includes(searchUser.toLowerCase())
                        )).length > 0}
                            {#each accounts
                                .filter(a => a.roleId === 1)
                                .filter(a =>
                                    a.firstName.toLowerCase().includes(searchUser.toLowerCase()) ||
                                    a.lastName.toLowerCase().includes(searchUser.toLowerCase()) ||
                                    a.username.toLowerCase().includes(searchUser.toLowerCase())
                                ) as user}
                                <tr class="border-b odd:bg-white even:bg-gray-50 hover:bg-green-50 text-[#0C2D1C]">
                                    <td class="px-4 py-2">{user.firstName}</td>
                                    <td class="px-4 py-2">{user.lastName}</td>
                                    <td class="px-4 py-2">{user.username}</td>
                                    <td class="px-4 py-2 text-center space-x-2 flex items-center justify-center">
                                        <Button 
                                            style="make-admin" 
                                            onclick={() => changeRole(user.id, user.roleId, 2)}>
                                            <FontAwesomeIcon icon={faUserShield}/> Make Admin
                                        </Button>
                                        <Button 
                                            style="remove" 
                                            onclick={() => removeAccount(user.id)}>
                                            <FontAwesomeIcon icon={faTrashAlt}/>
                                        </Button>
                                    </td>
                                </tr>
                            {/each}
                        {:else}
                            <tr>
                                <td colspan="4" class="px-4 py-4 text-center text-gray-500 italic">
                                    <i class="fas fa-user-times mr-2 text-[#1B663E]"></i> No users found.
                                </td>
                            </tr>
                        {/if}
                    </tbody>
				</table>
			</div>
		</div>

		<!-- Admins Table -->
		<div class="flex-1">
            <Heading type='h2' style='table'>
                <FontAwesomeIcon icon={faUserShield}/>
                Admins (Total Admins: {adminCount})
                <Button
                    style="underline"
                    onclick={() => showAdminInfo = !showAdminInfo}> 
                    {showAdminInfo ? 'Hide' : 'What can Admins do?'}
                </Button>
            </Heading>
            
            <!-- Admin Info Link -->
            {#if showAdminInfo}
                <div class="text-sm text-gray-600 bg-white border border-gray-200 rounded-md p-4 mb-4">
                    <FontAwesomeIcon icon={faPlusCircle} class='text-[#1B663E] mr-2'/><strong>Manage Content:</strong> Admins can add, edit, and delete <span class="font-medium">Training Modules</span>.
                    <Paragraph addStyle="mt-1"><i class="fas fa-tools text-[#1B663E] mr-2"></i><strong>Customization:</strong> Admins have access to customize module information and manage related data.</Paragraph>
                </div>
            {/if}
            
            <!-- Admin Search -->
			<input
				class="w-full mb-4 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B663E]"
				type="text"
				placeholder="Search admins..."
				bind:value={searchAdmin} />
            
            <!-- Admin Table Content -->
			<div class="bg-white border border-gray-200 rounded-xl overflow-x-auto">
				<table class="w-full text-sm">
					<thead class="bg-[#1B663E] text-white text-left">
						<tr>
							<th class="px-4 py-2">First Name</th>
							<th class="px-4 py-2">Last Name</th>
							<th class="px-4 py-2">Username</th>
							<th class="px-4 py-2 text-center">Actions</th>
						</tr>
					</thead>
                    <tbody>
                        {#if accounts.filter(a => a.roleId === 2 && (
                            a.firstName.toLowerCase().includes(searchAdmin.toLowerCase()) ||
                            a.lastName.toLowerCase().includes(searchAdmin.toLowerCase()) ||
                            a.username.toLowerCase().includes(searchAdmin.toLowerCase())
                        )).length > 0}
                            {#each accounts
                                .filter(a => a.roleId === 2)
                                .filter(a =>
                                    a.firstName.toLowerCase().includes(searchAdmin.toLowerCase()) ||
                                    a.lastName.toLowerCase().includes(searchAdmin.toLowerCase()) ||
                                    a.username.toLowerCase().includes(searchAdmin.toLowerCase())
                                ) as admin}
                                <tr class="border-b odd:bg-white even:bg-gray-50 hover:bg-green-50 text-[#0C2D1C]">
                                    <td class="px-4 py-2">{admin.firstName}</td>
                                    <td class="px-4 py-2">{admin.lastName}</td>
                                    <td class="px-4 py-2">{admin.username}</td>
                                    <td class="px-4 py-2 text-center space-x-2 flex items-center justify-center">
                                        <Button 
                                            style="make-user" 
                                            onclick={() => changeRole(admin.id, admin.roleId, 1)}>
                                            <FontAwesomeIcon icon={faUser}/> Make User
                                        </Button>
                                        {#if testing}
                                            <Button 
                                                style="make-admin" 
                                                onclick={() => changeRole(admin.id, admin.roleId, 3)}>
                                                <FontAwesomeIcon icon={faUserShield}/> Make SuperUser
                                            </Button>                                            
                                        {/if}
                                        <Button 
                                            style="remove" 
                                            onclick={() => removeAccount(admin.id)}>
                                            <FontAwesomeIcon icon={faTrashAlt}/>
                                        </Button>
                                    </td>
                                </tr>
                            {/each}
                        {:else}
                            <tr>
                                <td colspan="4" class="px-4 py-4 text-center text-gray-500 italic">
                                    <FontAwesomeIcon icon={faUserSlash} class='text-[#1B663E] mr-2'/> No admins found.
                                </td>
                            </tr>
                        {/if}
                    </tbody>
				</table>
			</div>
		</div>
	</div>
    <!-- Superusers Table -->
    <div class="flex-1">
        <Heading type='h2' style='table'>
            <FontAwesomeIcon icon={faUserCheck} class='text-[#1B663E] mr-2'/>
            Superusers (Total: {superCount})
        </Heading>

        <div class="bg-white border border-gray-200 rounded-xl overflow-x-auto">
            <table class="w-full text-sm">
                <thead class="bg-[#1B663E] text-white text-left">
                    <tr>
                        <th class="px-4 py-2">First Name</th>
                        <th class="px-4 py-2">Last Name</th>
                        <th class="px-4 py-2">Username</th>
                        <th class="px-4 py-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {#if accounts.filter(a => a.roleId === 3).length > 0}
                        {#each accounts.filter(a => a.roleId === 3) as superuser}
                            <tr class="border-b odd:bg-white even:bg-gray-50 hover:bg-green-50 text-[#0C2D1C]">
                                <td class="px-4 py-2">{superuser.firstName}</td>
                                <td class="px-4 py-2">{superuser.lastName}</td>
                                <td class="px-4 py-2">{superuser.username}</td>
                                <td class="px-4 py-2 text-center space-x-2 flex items-center justify-center">
                                    {#if testing}
                                        <Button 
                                            style="make-user" 
                                            onclick={() => changeRole(superuser.id, superuser.roleId, 1)}>
                                            <FontAwesomeIcon icon={faUser}/> Make User
                                        </Button>
                                        <Button 
                                            style="make-admin" 
                                            onclick={() => changeRole(superuser.id, superuser.roleId, 2)}>
                                            <FontAwesomeIcon icon={faUserShield}/> Make Admin
                                        </Button>
                                        <Button 
                                            style="remove" 
                                            onclick={() => removeAccount(superuser.id)}>
                                            <FontAwesomeIcon icon={faTrashAlt}/>
                                        </Button>
                                    {:else}
                                        <div class="bg-gray-100 border border-gray-300 text-gray-500 italic text-xs px-4 py-2 rounded-sm">
                                            <FontAwesomeIcon icon={faLock}/> Not allowed to change roles
                                        </div>
                                    {/if}
                                </td>
                            </tr>
                        {/each}
                    {:else}
                        <tr>
                            <td colspan="4" class="px-4 py-4 text-center text-gray-500 italic">
                                <i class="fas fa-user-lock mr-2 text-[#1B663E]"></i> No superusers found.
                            </td>
                        </tr>
                    {/if}
                </tbody>
            </table>
        </div>
    </div>
    
    <div class="flex col w-full gap-8">
    <Button style="submit" onclick={() => {if(data.user) changeRole(data.user.id, data.user.roleId, 1)}}>
        {button1Text}
    </Button>
    <Button style="submit" onclick={() => {if(data.user) changeRole(data.user.id, data.user.roleId, 2)}}>
        {button2Text}
    </Button>
    <Button style="submit" onclick={() => {if(data.user) changeRole(data.user.id, data.user.roleId, 3)}}>
        {button3Text}
    </Button>
    </div>
</div>


<style>


</style>