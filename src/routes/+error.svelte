<script lang="ts">
	import { page } from '$app/state';
	// export let error: Error;
	// export let status: number;

	// import { onMount } from 'svelte';

	// onMount(() => {
	// 	console.log(error);
	// 	console.log(status);
	// })
 
</script>


<div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 text-center animate-fadeIn">
	<div class="max-w-md">
		<div class="bg-green-200 dark:bg-green-900 p-4 rounded-full inline-block mb-6 animate-bounce-slow">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M12 5a7 7 0 100 14 7 7 0 000-14z" />
			</svg>
		</div>

		<h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-2">{page.status}</h1>

		<p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
			{page.error?.message || 'An unknown error occurred'}
		</p>

		<input type='button' onclick={() => history.back()} class="inline-block px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow transition transform hover:-translate-y-0.5 hover:shadow-lg " value='Go to Homepage'/>
	</div>
</div>

<style>
	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(20px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.animate-fadeIn {
		animation: fadeIn 0.5s ease-out;
	}
	@keyframes bounce-slow {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-6px); }
	}
	.animate-bounce-slow {
		animation: bounce-slow 1.5s infinite;
	}
</style>