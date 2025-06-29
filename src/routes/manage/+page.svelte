<script lang="ts">
	import { onMount } from 'svelte';
	import { getData } from '$lib/functions/database';
	import type { Account } from '@prisma/client';

	let accounts: Account[] = [];
	let searchUser = "";
	let searchAdmin = "";
	let showUserInfo = false;
	let showAdminInfo = false;

	onMount(async () => {
		accounts = await getData('account');
	});

    // BACKENDERS
	async function changeRole(id: number, currentRole: number) {
	}

	async function removeAccount(id: number) {
		const confirmDelete = confirm("Are you sure you want to permanently remove this account?");
		if (!confirmDelete) return;
	}

	$: userCount = accounts.filter(a => a.roleId === 1).length;
	$: adminCount = accounts.filter(a => a.roleId === 2).length;
</script>

<div class="min-h-screen mt-28 px-6 py-10 bg-[#f9fafb] text-[#1B1B1B] space-y-8">
    <!-- IDK IF LALAGAY KO BA ITO OR MAS BETTER YUNG ASA BABA -->
    <!-- <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <h3 class="text-sm font-medium text-gray-500">Total Users</h3>
            <p class="text-2xl font-bold text-[#1B663E]">{userCount}</p>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <h3 class="text-sm font-medium text-gray-500">Total Admins</h3>
            <p class="text-2xl font-bold text-[#1B663E]">{adminCount}</p>
        </div>
    </div> -->

	<div class="flex flex-col md:flex-row gap-8">
		
        <!-- Users Table -->
		<div class="flex-1">
            <h2 class="text-xl font-bold text-[#1B663E] mb-2 flex items-center gap-2">
                <i class="fas fa-user text-[#1B663E]"></i>
                    Users (Total Users: {userCount})
                <button on:click={() => showUserInfo = !showUserInfo} class="text-sm text-[#1B663E] underline ml-auto hover:text-green-800">
                    {showUserInfo ? 'Hide' : 'What can Users do?'}
                </button>
            </h2>
            
            <!-- User info Link -->
            {#if showUserInfo}
                <div class="text-sm text-gray-600 bg-white border border-gray-200 rounded-md p-4 mb-4">
                    <p><i class="fas fa-eye text-[#1B663E] mr-2"></i><strong>View-only Access:</strong> Users can view all <span class="font-medium">UP NISMED Programs</span> and detailed <span class="font-medium">Training Modules</span>.</p>
                    <p class="mt-1"><i class="fas fa-ban text-red-500 mr-2"></i>Users cannot add, edit, or delete training content.</p>
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
                                        <button
                                            class="px-3 py-1 text-sm rounded bg-[#1B663E] text-white hover:bg-[#155b32] transition flex items-center justify-center gap-2"
                                            on:click={() => changeRole(user.id, user.roleId)}>
                                            <i class="fas fa-user-shield"></i> Make Admin
                                        </button>
                                        <button
                                            aria-label="Remove user"
                                            class="px-3 py-2 text-sm rounded bg-[#800000] text-white hover:bg-[#a00000] transition flex items-center justify-center"
                                            on:click={() => removeAccount(user.id)}>
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
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
            <h2 class="text-xl font-bold text-[#1B663E] mb-2 flex items-center gap-2">
                <i class="fas fa-user-shield text-[#1B663E]"></i>
                    Admins (Total Admins: {adminCount})
                <button on:click={() => showAdminInfo = !showAdminInfo} class="text-sm text-[#1B663E] underline ml-auto hover:text-green-800">
                    {showAdminInfo ? 'Hide' : 'What can Admins do?'}
                </button>
            </h2>
            
            <!-- Admin Info Link -->
            {#if showAdminInfo}
                <div class="text-sm text-gray-600 bg-white border border-gray-200 rounded-md p-4 mb-4">
                    <p><i class="fas fa-plus-circle text-[#1B663E] mr-2"></i><strong>Manage Content:</strong> Admins can add, edit, and delete <span class="font-medium">Training Modules</span>.</p>
                    <p class="mt-1"><i class="fas fa-tools text-[#1B663E] mr-2"></i><strong>Customization:</strong> Admins have access to customize module information and manage related data.</p>
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
                                        <button
                                            class="px-3 py-1 text-sm rounded bg-gray-300 text-black hover:bg-gray-400 transition flex items-center justify-center gap-2"
                                            on:click={() => changeRole(admin.id, admin.roleId)}>
                                            <i class="fas fa-user-shield"></i> Make User
                                        </button>
                                        <button
                                            aria-label="Remove user"
                                            class="px-3 py-2 text-sm rounded bg-[#800000] text-white hover:bg-[#a00000] transition flex items-center justify-center"
                                            on:click={() => removeAccount(admin.id)}>
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            {/each}
                        {:else}
                            <tr>
                                <td colspan="4" class="px-4 py-4 text-center text-gray-500 italic">
                                    <i class="fas fa-user-slash mr-2 text-[#1B663E]"></i> No admins found.
                                </td>
                            </tr>
                        {/if}
                    </tbody>
				</table>
			</div>
		</div>
	</div>
</div>


<style>


</style>